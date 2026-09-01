"use strict"

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod }
}

Object.defineProperty(exports, "__esModule", { value: true })

const node_cache_1 = __importDefault(require("@cacheable/node-cache"))
const boom_1 = require("@hapi/boom")
const crypto_1 = require("crypto")
const WAProto_1 = require("../../WAProto")
const Defaults_1 = require("../Defaults")
const Types_1 = require("../Types")
const Utils_1 = require("../Utils")
const WABinary_1 = require("../WABinary")
const groups_1 = require("./groups")
const make_mutex_1 = require("../Utils/make-mutex")
const messages_send_1 = require("./messages-send")

const makeMessagesRecvSocket = (config) => {
    const { logger, retryRequestDelayMs, maxMsgRetryCount, getMessage, shouldIgnoreJid, enableAutoSessionRecreation } = config
    const suki = messages_send_1.makeMessagesSocket(config)
    const { ev, authState, ws, processingMutex, signalRepository, query, upsertMessage, resyncAppState, onUnexpectedError, assertSessions, sendNode, relayMessage, sendReceipt, uploadPreKeys, groupMetadata, getUSyncDevices, createParticipantNodes, messageRetryManager, sendPeerDataOperationMessage } = suki

    /** this mutex ensures that each retryRequest will wait for the previous one to finish */
    const retryMutex = make_mutex_1.makeMutex()

    const msgRetryCache = config.msgRetryCounterCache || new node_cache_1.default({
        stdTTL: Defaults_1.DEFAULT_CACHE_TTLS.MSG_RETRY,
        useClones: false
    })

    const callOfferCache = config.callOfferCache || new node_cache_1.default({
        stdTTL: Defaults_1.DEFAULT_CACHE_TTLS.CALL_OFFER,
        useClones: false
    })

    const placeholderResendCache = config.placeholderResendCache || new node_cache_1.default({
        stdTTL: Defaults_1.DEFAULT_CACHE_TTLS.MSG_RETRY,
        useClones: false
    })

    // Debounce identity-change session refreshes per JID to avoid bursts
    const identityAssertDebounce = new node_cache_1.default({ stdTTL: 5, useClones: false })

    let sendActiveReceipts = false

    const sendMessageAck = async ({ tag, attrs, content }, errorCode) => {
        const stanza = {
            tag: 'ack',
            attrs: {
                id: attrs.id,
                to: attrs.from,
                class: tag
            }
        }

        if (!!errorCode) {
            stanza.attrs.error = errorCode.toString()
        }

        if (!!attrs.participant) {
            stanza.attrs.participant = attrs.participant
        }

        if (!!attrs.recipient) {
            stanza.attrs.recipient = attrs.recipient
        }

        if (!!attrs.type && (tag !== 'message' || WABinary_1.getBinaryNodeChild({ tag, attrs, content }, 'unavailable') || errorCode !== 0)) {
            stanza.attrs.type = attrs.type
        }

        if (tag === 'message' && WABinary_1.getBinaryNodeChild({ tag, attrs, content }, 'unavailable')) {
            stanza.attrs.from = authState.creds.me.id
        }

        logger.debug({ recv: { tag, attrs }, sent: stanza.attrs }, 'sent ack')
        await sendNode(stanza)
    }

    let voipClient = null
    const getVoipClient = async () => {
        if (!voipClient) {
            const { VoipClient } = await import('../Voip/index.mjs')
            voipClient = new VoipClient({})
            const currentSock = {
                ...suki,
                sendNode,
                query,
                authState,
                signalRepository,
                ws,
                ev,
                getUSyncDevices,
                presenceSubscribe: suki.presenceSubscribe || (async () => {})
            }
            await voipClient.initWithSocket(currentSock)
        }
        return voipClient
    }

    const offerCall = async (toJid, isVideo = false, options = {}) => {
        if (typeof isVideo === 'object') {
            options = isVideo
            isVideo = !!options.isVideo
        }
        if (options && options.audioSource) {
            const client = await getVoipClient()
            return await client.call(toJid, {
                audioSource: options.audioSource,
                durationMs: options.durationMs ?? options.durationMS,
                repeatAudio: options.repeatAudio ?? options.repeat,
                preRingingTimeoutMs: options.preRingingTimeoutMs
            })
        }

        const callId = crypto_1.randomBytes(16).toString('hex').toUpperCase().substring(0, 64)
        const offerContent = []

        if (isVideo) {
            offerContent.push({
                tag: 'video',
                attrs: { enc: 'vp8', dec: 'vp8', orientation: '0', 'screen_width': '1920', 'screen_height': '1080', 'device_orientation': '0' },
                content: undefined
            })
        }

        offerContent.push({ tag: 'audio', attrs: { enc: 'opus', rate: '16000' }, content: undefined })
        offerContent.push({ tag: 'audio', attrs: { enc: 'opus', rate: '8000' }, content: undefined })

        offerContent.push({ tag: 'net', attrs: { medium: '3' }, content: undefined })
        offerContent.push({ tag: 'capability', attrs: { ver: '1' }, content: new Uint8Array([1, 4, 255, 131, 207, 4]) })
        offerContent.push({ tag: 'encopt', attrs: { keygen: '2' }, content: undefined })

        const encKey = crypto_1.randomBytes(32)
        const devices = (await getUSyncDevices([toJid], true, false)).map(({ user, device }) => WABinary_1.jidEncode(user, 's.whatsapp.net', device))
        await assertSessions(devices, true)

        const { nodes: destinations, shouldIncludeDeviceIdentity } = await createParticipantNodes(devices, {
            call: {
                callKey: new Uint8Array(encKey)
            }
        }, { count: '0' })
        offerContent.push({ tag: 'destination', attrs: {}, content: destinations })

        if (shouldIncludeDeviceIdentity) {
            offerContent.push({
                tag: 'device-identity',
                attrs: {},
                content: Utils_1.encodeSignedDeviceIdentity(authState.creds.account, true)
            })
        }

        const stanza = ({
            tag: 'call',
            attrs: {
                id: Utils_1.generateMessageID(),
                to: toJid,
            },
            content: [{
                tag: 'offer',
                attrs: {
                    'call-id': callId,
                    'call-creator': authState.creds.me.id,
                },
                content: offerContent,
            }],
        })

        await query(stanza)

        return {
            id: callId,
            to: toJid
        }
    }

    const rejectCall = async (callId, callFrom) => {
        const stanza = ({
            tag: 'call',
            attrs: {
                from: authState.creds.me.id,
                to: callFrom,
            },
            content: [{
                tag: 'reject',
                attrs: {
                    'call-id': callId,
                    'call-creator': callFrom,
                    count: '0',
                },
                content: undefined,
            }],
        })

        await query(stanza)
    }

    const initiateCall = async (jid, options = {}) => {
        var _a;
        const meId = (_a = authState.creds.me) === null || _a === void 0 ? void 0 : _a.id;
        if (!meId) {
            throw new boom_1.Boom('Not authenticated');
        }
        const isVideo = !!options.isVideo;
        const isGroup = (0, WABinary_1.isJidGroup)(jid);

        if (options.audioSource || options.videoSource || isVideo) {
            const client = await getVoipClient();
            const call = await client.call(jid, {
                audioSource: options.audioSource,
                videoSource: options.videoSource,
                isVideo: isVideo,
                videoLoop: options.videoLoop ?? options.repeatVideo ?? options.loop,
                videoWidth: options.videoWidth ?? options.width,
                videoHeight: options.videoHeight ?? options.height,
                videoFps: options.videoFps ?? options.fps,
                durationMs: options.durationMs ?? options.durationMS,
                repeatAudio: options.repeatAudio ?? options.repeat,
                preRingingTimeoutMs: options.preRingingTimeoutMs
            });
            await callOfferCache.set(call.callId, {
                chatId: jid,
                from: meId,
                id: call.callId,
                date: new Date(),
                offline: false,
                status: 'offer',
                isVideo,
                isGroup,
                groupJid: isGroup ? jid : undefined
            });
            return call;
        }

        const result = await offerCall(jid, isVideo, options);
        const callId = result.id || result.callId;
        await callOfferCache.set(callId, {
            chatId: jid,
            from: meId,
            id: callId,
            date: new Date(),
            offline: false,
            status: 'offer',
            isVideo,
            isGroup,
            groupJid: isGroup ? jid : undefined
        });
        return result.callId ? result : { callId, to: jid, isVideo };
    };

    const getActiveCalls = async () => {
        const client = await getVoipClient();
        return client.getActiveCalls();
    };

    const getCall = async (callId) => {
        const client = await getVoipClient();
        return client.getCall(callId);
    };

    const getActiveCallCount = async () => {
        const client = await getVoipClient();
        return client.getActiveCallCount();
    };

    const endCall = async (callId) => {
        const client = await getVoipClient();
        return client.endCall(callId);
    };

    const endAllCalls = async () => {
        const client = await getVoipClient();
        return client.endAllCalls();
    };

    const initiateCalls = async (callRequests) => {
        const client = await getVoipClient();
        return client.callMany(callRequests);
    };

    const setVoipOptions = async (options) => {
        const client = await getVoipClient();
        return client.setOptions(options);
    };

    const cancelCall = async (callId, callTo) => {
        return terminateCall(callId, callTo)
    };

    /** Accept (answer) an incoming call. */
    const acceptCall = async (callId, callFrom, isVideo) => {
        const meId = authState.creds.me && authState.creds.me.id;
        if (!meId) throw new boom_1.Boom('Not authenticated', { statusCode: 401 });
        const acceptContent = [
            { tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }
        ];
        if (isVideo) {
            acceptContent.push({ tag: 'video', attrs: { dec: 'H264,AV1', device_orientation: '1' }, content: undefined });
        }
        acceptContent.push(
            { tag: 'net', attrs: { medium: '2' }, content: undefined },
            { tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
        );
        const stanza = {
            tag: 'call',
            attrs: { from: meId, to: callFrom, id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [{ tag: 'accept', attrs: { 'call-id': callId, 'call-creator': callFrom }, content: acceptContent }]
        };
        await query(stanza);
    };

    /** Send preaccept signal (codec capabilities) for an incoming call. */
    const preacceptCall = async (callId, callCreator, isVideo) => {
        const preacceptContent = [
            { tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }
        ];
        if (isVideo) {
            preacceptContent.push({
                tag: 'video',
                attrs: { screen_width: '1080', screen_height: '2400', dec: 'H264,H265,AV1', device_orientation: '0' },
                content: undefined
            });
        }
        preacceptContent.push(
            { tag: 'encopt', attrs: { keygen: '2' }, content: undefined },
            { tag: 'capability', attrs: { ver: '1' }, content: undefined }
        );
        const stanza = {
            tag: 'call',
            attrs: { to: callCreator, id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [{ tag: 'preaccept', attrs: { 'call-id': callId, 'call-creator': callCreator }, content: preacceptContent }]
        };
        await query(stanza);
    };

    /** Terminate (hang up) an active or ringing call. */
    const terminateCall = async (callId, callTo, callCreator, reason, duration) => {
        const meId = authState.creds.me && authState.creds.me.id;
        if (!meId) throw new boom_1.Boom('Not authenticated', { statusCode: 401 });
        const terminateAttrs = {
            'call-id': callId,
            'call-creator': callCreator || meId
        };
        if (reason) terminateAttrs.reason = reason;
        if (typeof duration === 'number') {
            terminateAttrs.duration = String(duration);
            terminateAttrs.audio_duration = String(duration);
        }
        const stanza = {
            tag: 'call',
            attrs: { to: callTo, id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [{ tag: 'terminate', attrs: terminateAttrs, content: undefined }]
        };
        await query(stanza);
        await callOfferCache.del(callId);
    };

    /** Report relay latency measurements to the server. */
    const sendRelayLatency = async (callId, callCreator, relays, transactionId) => {
        const attrs = { 'call-id': callId, 'call-creator': callCreator };
        if (transactionId) attrs['transaction-id'] = transactionId;
        const teChildren = relays.map(r => {
            const teAttrs = {};
            if (r.relayName) teAttrs.relay_name = r.relayName;
            teAttrs.latency = String(r.latency);
            if (r.relayId) teAttrs.relay_id = r.relayId;
            if (r.dlBw !== undefined) teAttrs.dl_bw = String(r.dlBw);
            if (r.ulBw !== undefined) teAttrs.ul_bw = String(r.ulBw);
            return { tag: 'te', attrs: teAttrs, content: undefined };
        });
        await sendNode({
            tag: 'call',
            attrs: { to: callCreator, id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [{ tag: 'relaylatency', attrs, content: teChildren }]
        });
    };

    /** Send transport (p2p/ICE) candidates for a call. */
    const sendTransport = async (callId, callCreator, to, candidates, round) => {
        const attrs = {
            'call-id': callId,
            'call-creator': callCreator,
            'transport-message-type': '1'
        };
        if (round !== undefined) attrs['p2p-cand-round'] = String(round);
        await sendNode({
            tag: 'call',
            attrs: { to, id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [
                {
                    tag: 'transport',
                    attrs,
                    content: candidates.map(c => ({ tag: 'te', attrs: { priority: c.priority }, content: c.data }))
                }
            ]
        });
    };

    /** Send call duration log to the server after a call ends. */
    const sendCallDuration = async (callId, callCreator, peer, audioDuration, callType = '1x1') => {
        await sendNode({
            tag: 'call',
            attrs: { to: 'call', id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [
                {
                    tag: 'duration',
                    attrs: {
                        'call-id': callId,
                        'call-creator': callCreator,
                        peer,
                        audio_duration: String(audioDuration),
                        type: callType
                    },
                    content: undefined
                }
            ]
        });
    };

    /** Mute or unmute during a call. */
    const muteCall = async (callId, callCreator, to, muted) => {
        await sendNode({
            tag: 'call',
            attrs: { to, id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [
                {
                    tag: 'mute_v2',
                    attrs: { 'mute-state': muted ? '1' : '0', 'call-id': callId, 'call-creator': callCreator },
                    content: undefined
                }
            ]
        });
    };

    /** Send heartbeat to keep a group/link call alive. */
    const sendHeartbeat = async (callId, callCreator) => {
        await sendNode({
            tag: 'call',
            attrs: { to: `${callId}@call`, id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [{ tag: 'heartbeat', attrs: { 'call-id': callId, 'call-creator': callCreator }, content: undefined }]
        });
    };

    /** Send encryption re-key during a call. */
    const sendEncRekey = async (callId, callCreator, to, transactionId) => {
        await sendNode({
            tag: 'call',
            attrs: { to, id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [
                {
                    tag: 'enc_rekey',
                    attrs: { 'transaction-id': transactionId, 'call-id': callId, 'call-creator': callCreator },
                    content: [
                        { tag: 'encopt', attrs: { keygen: '2' }, content: undefined },
                        { tag: 'enc', attrs: { v: '2', type: 'msg' }, content: undefined }
                    ]
                }
            ]
        });
    };

    /** Send video state change during a call. */
    const sendVideoState = async (callId, callCreator, to, enabled, orientation = '1') => {
        await sendNode({
            tag: 'call',
            attrs: { to, id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [
                {
                    tag: 'video',
                    attrs: {
                        'call-id': callId,
                        'call-creator': callCreator,
                        state: enabled ? '1' : '0',
                        device_orientation: orientation
                    },
                    content: undefined
                }
            ]
        });
    };

    /** Query info about a call link before joining. */
    const queryCallLink = async (token, media = 'video') => {
        return await query({
            tag: 'call',
            attrs: { to: 'call', id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [{ tag: 'link_query', attrs: { media, token }, content: undefined }]
        });
    };

    /** Join a call via its link token. */
    const joinCallLink = async (token, media = 'video') => {
        const joinContent = [
            { tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined },
            { tag: 'net', attrs: { medium: '2' }, content: undefined },
            { tag: 'capability', attrs: { ver: '1' }, content: undefined }
        ];
        if (media === 'video') {
            joinContent.splice(1, 0, {
                tag: 'video',
                attrs: { screen_width: '1080', screen_height: '2400', dec: 'H264,H265,AV1', device_orientation: '0' },
                content: undefined
            });
        }
        return await query({
            tag: 'call',
            attrs: { to: 'call', id: crypto_1.randomBytes(16).toString('hex').toUpperCase() },
            content: [{ tag: 'link_join', attrs: { media, token }, content: joinContent }]
        });
    };

    const sendRetryRequest = async (node, forceIncludeKeys = false) => {
        const { fullMessage } = Utils_1.decodeMessageNode(node, authState.creds.me.id, authState.creds.me.lid || '')
        const { key: msgKey } = fullMessage
        const msgId = msgKey.id

        if (messageRetryManager) {
            // Check if we've exceeded max retries using the new system
            if (messageRetryManager.hasExceededMaxRetries(msgId)) {
                logger.debug({ msgId }, 'reached retry limit with new retry manager, clearing')
                messageRetryManager.markRetryFailed(msgId)
                return
            }

            // Increment retry count using new system
            const retryCount = messageRetryManager.incrementRetryCount(msgId)

            // Use the new retry count for the rest of the logic
            const key = `${msgId}:${msgKey?.participant}`
            msgRetryCache.set(key, retryCount)
        }
        else {
            // Fallback to old system
            const key = `${msgId}:${msgKey?.participant}`
            let retryCount = (await msgRetryCache.get(key)) || 0

            if (retryCount >= maxMsgRetryCount) {
                logger.debug({ retryCount, msgId }, 'reached retry limit, clearing')
                msgRetryCache.del(key)
                return
            }

            retryCount += 1
            await msgRetryCache.set(key, retryCount)
        }

        const key = `${msgId}:${msgKey?.participant}`
        const retryCount = (await msgRetryCache.get(key)) || 1
        const { account, signedPreKey, signedIdentityKey: identityKey } = authState.creds
        const fromJid = node.attrs.from

        // Check if we should recreate the session
        let shouldRecreateSession = false
        let recreateReason = ''

        if (enableAutoSessionRecreation && messageRetryManager && retryCount > 1) {
            try {
                // Check if we have a session with this JID
                const sessionId = signalRepository.jidToSignalProtocolAddress(fromJid)
                const hasSession = await signalRepository.validateSession(fromJid)
                const result = messageRetryManager.shouldRecreateSession(fromJid, retryCount, hasSession.exists)

                shouldRecreateSession = result.recreate
                recreateReason = result.reason

                if (shouldRecreateSession) {
                    logger.info({ fromJid, retryCount, reason: recreateReason }, 'recreating session for retry')
                    // Delete existing session to force recreation
                    await authState.keys.set({ session: { [sessionId]: null } })
                    forceIncludeKeys = true
                }
            }
            catch (error) {
                logger.warn({ error, fromJid }, 'failed to check session recreation')
            }
        }

        if (retryCount <= 2) {
            // Use new retry manager for phone requests if available
            if (messageRetryManager) {
                // Schedule phone request with delay (like whatsmeow)
                messageRetryManager.schedulePhoneRequest(msgId, async () => {
                    try {
                        const msgId = await requestPlaceholderResend(msgKey)
                        logger.debug(`sendRetryRequest: requested placeholder resend for message ${msgId} (scheduled)`)
                    }
                    catch (error) {
                        logger.warn({ error, msgId }, 'failed to send scheduled phone request');
                    }
                })
            }
            else {
                // Fallback to immediate request
                const msgId = await requestPlaceholderResend(msgKey)
                logger.debug(`sendRetryRequest: requested placeholder resend for message ${msgId}`)
            }
        }

        const deviceIdentity = Utils_1.encodeSignedDeviceIdentity(account, true)
        await authState.keys.transaction(async () => {
            const receipt = {
                tag: 'receipt',
                attrs: {
                    id: msgId,
                    type: 'retry',
                    to: node.attrs.from
                },
                content: [
                    {
                        tag: 'retry',
                        attrs: {
                            count: retryCount.toString(),
                            id: node.attrs.id,
                            t: node.attrs.t,
                            v: '1',
                            error: '0'
                        }
                    },
                    {
                        tag: 'registration',
                        attrs: {},
                        content: Utils_1.encodeBigEndian(authState.creds.registrationId)
                    }
                ]
            }

            if (node.attrs.recipient) {
                receipt.attrs.recipient = node.attrs.recipient
            }

            if (node.attrs.participant) {
                receipt.attrs.participant = node.attrs.participant
            }

            if (retryCount > 1 || forceIncludeKeys || shouldRecreateSession) {
                const { update, preKeys } = await Utils_1.getNextPreKeys(authState, 1)
                const [keyId] = Object.keys(preKeys)
                const key = preKeys[+keyId]
                const content = receipt.content

                content.push({
                    tag: 'keys',
                    attrs: {},
                    content: [
                        { tag: 'type', attrs: {}, content: Buffer.from(Defaults_1.KEY_BUNDLE_TYPE) },
                        { tag: 'identity', attrs: {}, content: identityKey.public },
                        Utils_1.xmppPreKey(key, +keyId),
                        Utils_1.xmppSignedPreKey(signedPreKey),
                        { tag: 'device-identity', attrs: {}, content: deviceIdentity }
                    ]
                });
                ev.emit('creds.update', update)
            }
            await sendNode(receipt)
            logger.info({ msgAttrs: node.attrs, retryCount }, 'sent retry receipt')
        }, authState?.creds?.me?.id || 'sendRetryRequest')
    }

    const handleEncryptNotification = async (node) => {
        const from = node.attrs.from
        if (from === WABinary_1.S_WHATSAPP_NET) {
            const countChild = WABinary_1.getBinaryNodeChild(node, 'count')
            const count = +countChild.attrs.value
            const shouldUploadMorePreKeys = count < Defaults_1.MIN_PREKEY_COUNT
            logger.debug({ count, shouldUploadMorePreKeys }, 'recv pre-key count')

            if (shouldUploadMorePreKeys) {
                await uploadPreKeys()
            }
        }
        else {
            const result = await Utils_1.handleIdentityChange(node, {
                meId: authState.creds.me?.id,
                meLid: authState.creds.me?.lid,
                validateSession: signalRepository.validateSession,
                assertSessions,
                debounceCache: identityAssertDebounce,
                logger
            })

            if (result.action === 'no_identity_node') {
                logger.info({ node }, 'unknown encrypt notification')
            }
        }
    }

    const handleGroupNotification = (fullNode, child, msg) => {
        // TODO: Support PN/LID (Here is only LID now)

        const actingParticipantLid = fullNode.attrs.participant
        const actingParticipantPn = fullNode.attrs.participant_pn

        const affectedParticipantLid = WABinary_1.getBinaryNodeChild(child, 'participant')?.attrs?.jid || actingParticipantLid
        const affectedParticipantPn = WABinary_1.getBinaryNodeChild(child, 'participant')?.attrs?.phone_number || actingParticipantPn

        switch (child?.tag) {
            case 'create':
                const metadata = groups_1.extractGroupMetadata(child)
                msg.messageStubType = Types_1.WAMessageStubType.GROUP_CREATE
                msg.messageStubParameters = [metadata.subject]
                msg.key = { participant: metadata.owner, participantAlt: metadata.ownerPn }
                ev.emit('chats.upsert', [{
                    id: metadata.id,
                    name: metadata.subject,
                    conversationTimestamp: metadata.creation,
                }])
                ev.emit('groups.upsert', [{
                    ...metadata,
                    author: actingParticipantLid,
                    authorPn: actingParticipantPn
                }])
                break
            case 'delete':
                msg.messageStubType = Types_1.WAMessageStubType.COMMUNITY_PARENT_GROUP_DELETED
                msg.messageStubParameters = [affectedParticipantLid, 'delete']
                break
            case 'ephemeral':
            case 'not_ephemeral':
                msg.message = {
                    protocolMessage: {
                        type: WAProto_1.proto.Message.ProtocolMessage.Type.EPHEMERAL_SETTING,
                        ephemeralExpiration: +(child.attrs.expiration || 0)
                    }
                }
                break
            case 'modify':
                const oldNumber = WABinary_1.getBinaryNodeChildren(child, 'participant').map(p => p.attrs.jid)
                msg.messageStubParameters = oldNumber || []
                msg.messageStubType = Types_1.WAMessageStubType.GROUP_PARTICIPANT_CHANGE_NUMBER
                break
            case 'promote':
            case 'demote':
            case 'remove':
            case 'add':
            case 'leave':
                const stubType = `GROUP_PARTICIPANT_${child.tag.toUpperCase()}`
                msg.messageStubType = Types_1.WAMessageStubType[stubType]

                const participants = WABinary_1.getBinaryNodeChildren(child, 'participant').map(({ attrs }) => {
                    // TODO: Store LID MAPPINGS
                    return {
                        id: attrs.jid,
                        phoneNumber: WABinary_1.isLidUser(attrs.jid) && WABinary_1.isPnUser(attrs.phone_number) ? attrs.phone_number : undefined,
                        lid: WABinary_1.isPnUser(attrs.jid) && WABinary_1.isLidUser(attrs.lid) ? attrs.lid : undefined,
                        admin: attrs.type || null,
                        notify: attrs.notify
                    }
                })

                if (participants.length === 1 &&
                    // if recv. "remove" message and sender removed themselves
                    // mark as left
                    (WABinary_1.areJidsSameUser(participants[0].id, actingParticipantLid) ||
                        WABinary_1.areJidsSameUser(participants[0].id, actingParticipantPn)) &&
                    child.tag === 'remove') {
                    msg.messageStubType = Types_1.WAMessageStubType.GROUP_PARTICIPANT_LEAVE
                }

                msg.messageStubParameters = participants.map(a => JSON.stringify(a))
                break
            case 'subject':
                msg.messageStubType = Types_1.WAMessageStubType.GROUP_CHANGE_SUBJECT
                msg.messageStubParameters = [child.attrs.subject]
                break
            case 'description':
                const description = WABinary_1.getBinaryNodeChild(child, 'body')?.content?.toString()
                msg.messageStubType = Types_1.WAMessageStubType.GROUP_CHANGE_DESCRIPTION
                msg.messageStubParameters = description ? [description] : undefined
                break
            case 'announcement':
            case 'not_announcement':
                msg.messageStubType = Types_1.WAMessageStubType.GROUP_CHANGE_ANNOUNCE
                msg.messageStubParameters = [(child.tag === 'announcement') ? 'on' : 'off']
                break
            case 'locked':
            case 'unlocked':
                msg.messageStubType = Types_1.WAMessageStubType.GROUP_CHANGE_RESTRICT
                msg.messageStubParameters = [(child.tag === 'locked') ? 'on' : 'off']
                break
            case 'invite':
                msg.messageStubType = Types_1.WAMessageStubType.GROUP_CHANGE_INVITE_LINK
                msg.messageStubParameters = [child.attrs.code]
                break
            case 'member_add_mode':
                const addMode = child.content
                if (addMode) {
                    msg.messageStubType = Types_1.WAMessageStubType.GROUP_MEMBER_ADD_MODE
                    msg.messageStubParameters = [addMode.toString()]
                }
                break
            case 'membership_approval_mode':
                const approvalMode = WABinary_1.getBinaryNodeChild(child, 'group_join')
                if (approvalMode) {
                    msg.messageStubType = Types_1.WAMessageStubType.GROUP_MEMBERSHIP_JOIN_APPROVAL_MODE
                    msg.messageStubParameters = [approvalMode.attrs.state]
                }
                break
            case 'created_membership_requests':
                msg.messageStubType = Types_1.WAMessageStubType.GROUP_MEMBERSHIP_JOIN_APPROVAL_REQUEST_NON_ADMIN_ADD
                msg.messageStubParameters = [
                    JSON.stringify({ lid: affectedParticipantLid, pn: affectedParticipantPn }),
                    'created',
                    child.attrs.request_method
                ]
                break
            case 'revoked_membership_requests':
                const isDenied = WABinary_1.areJidsSameUser(affectedParticipantLid, actingParticipantLid)
                // TODO: LIDMAPPING SUPPORT
                msg.messageStubType = Types_1.WAMessageStubType.GROUP_MEMBERSHIP_JOIN_APPROVAL_REQUEST_NON_ADMIN_ADD
                msg.messageStubParameters = [
                    JSON.stringify({ lid: affectedParticipantLid, pn: affectedParticipantPn }),
                    isDenied ? 'revoked' : 'rejected'
                ]
                break
            case 'link':
            case 'unlink':
                const type = child.attrs?.unlink_type || child.attrs?.link_type
                const stubMap = {
                    parent_group: Types_1.WAMessageStubType[`COMMUNITY_${child.tag.toUpperCase()}_PARENT_GROUP`],
                    sibling_group: Types_1.WAMessageStubType[`COMMUNITY_${child.tag.toUpperCase()}_SIBLING_GROUP`],
                    sub_group: Types_1.WAMessageStubType[`COMMUNITY_${child.tag.toUpperCase()}_SUB_GROUP`]
                }
                const groups = WABinary_1.getBinaryNodeChildren(child, 'group')
                    .map(g => g.attrs?.jid || g.attrs?.subject || '')
                    .filter(x => x)
                msg.messageStubType = stubMap?.[type] || Types_1.WAMessageStubType[`COMMUNITY_${child.tag.toUpperCase()}_PARENT_GROUP`]
                msg.messageStubParameters = [affectedParticipantLid, child.tag, groups]
                break
            case 'linked_group_promote':
            case 'linked_group_demote':
                const stubtype = `COMMUNITY_PARTICIPANT_${child.tag.split('_')[2].toUpperCase()}`
                const participantS = WABinary_1.getBinaryNodeChildren(child, 'participant').map(p => p.attrs.jid)
                msg.messageStubType = Types_1.WAMessageStubType[stubtype]
                msg.messageStubParameters = participantS
                break
            case 'created_sub_group_suggestion':
                msg.messageStubType = Types_1.WAMessageStubType.SUGGESTED_SUBGROUP_ANNOUNCE
                msg.messageStubParameters = [affectedParticipantLid, 'add']
                break
            case 'revoked_sub_group_suggestions':
                const res = WABinary_1.getBinaryNodeChildren(child, 'sub_group_suggestions')
                const reason = res.attrs?.reason
                if (reason === 'approved') msg.messageStubType = Types_1.WAMessageStubType.GROUP_CREATE
                else msg.messageStubType = Types_1.WAMessageStubType.GENERIC_NOTIFICATION
                msg.messageStubParameters = [affectedParticipantLid, reason]
                break
            default:
                logger.warn(child.tag, 'Unhandled group node')
                break
        }
    }

    const handleNewsletterNotification = (id, node) => {
        const messages = WABinary_1.getBinaryNodeChild(node, 'messages')
        const message = WABinary_1.getBinaryNodeChild(node, 'message')
        const serverId = node.attrs.server_id

        const reactionsList = WABinary_1.getBinaryNodeChild(node, 'reactions')
        const viewsList = WABinary_1.getBinaryNodeChild(node, 'views_count')

        if (reactionsList) {
            const reactions = WABinary_1.getBinaryNodeChild(reactionsList, 'reaction')

            if (reactions.length === 0) {
                ev.emit('newsletter.reaction', {
                    id,
                    newsletter_server_id: serverId,
                    reaction: {
                        removed: true
                    }
                })
            }

            reactions.forEach(item => {
                ev.emit('newsletter.reaction', {
                    id,
                    newsletter_server_id: serverId,
                    reaction: {
                        code: item.attrs?.code,
                        count: +item.attrs.count
                    }
                })
            })
        }

        if (viewsList.length) {
            viewsList.forEach(item => {
                ev.emit('newsletter.view', {
                    id,
                    newsletter_server_id: serverId,
                    count: +item.attrs.count
                })
            })
        }
    }

    const handleMexNotification = (id, node) => {
        try {
            const operation = node?.attrs?.op_name
            const content = node?.content ? JSON.parse(node.content.toString()) : null
            if (!content) {
                return
            }

            let contentPath
            let action

            if (operation === Types_1.MexOperations.UPDATE) {
                contentPath = content.data?.[Types_1.XWAPaths.METADATA_UPDATE]
                if (contentPath) {
                    ev.emit('newsletter-settings.update', {
                        id,
                        update: contentPath.thread_metadata?.settings
                    })
                }
            }
            else if (operation === Types_1.MexUpdatesOperations.GROUP_MEMBER_LINK) {
                contentPath = content.data?.[Types_1.XWAPathsMexUpdates.GROUP_SHARING_CHANGE]
                if (contentPath) {
                    ev.emit('groups.update', [{
                        id,
                        author: contentPath.updated_by?.id,
                        member_link_mode: contentPath.properties?.member_link_mode
                    }])
                }
            }
            else if (operation === Types_1.MexUpdatesOperations.GROUP_LIMIT_SHARING) {
                contentPath = content.data?.[Types_1.XWAPathsMexUpdates.GROUP_SHARING_CHANGE]
                if (contentPath) {
                    ev.emit('limit-sharing.update', {
                        id,
                        author: contentPath.updated_by?.pn || contentPath.updated_by?.id,
                        action: `${contentPath.properties?.limit_sharing?.limit_sharing_enabled ? 'on' : 'off'}`,
                        trigger: contentPath.properties?.limit_sharing?.limit_sharing_trigger,
                        update_time: contentPath.update_time
                    })
                }
            }
            else if (operation === Types_1.MexUpdatesOperations.OWNER_COMMUNITY) {
                contentPath = content.data?.[Types_1.XWAPathsMexUpdates.COMMUNITY_OWNER_CHANGE]
                if (contentPath) {
                    ev.emit('community-owner.update', {
                        id,
                        author: contentPath.updated_by?.pn || contentPath.updated_by?.id,
                        user: contentPath.role_updates?.[0]?.user?.pn || contentPath.role_updates?.[0]?.user?.jid,
                        new_role: contentPath.role_updates?.[0]?.new_role,
                        update_time: contentPath.update_time
                    })
                }
            }
            else if (operation === Types_1.MexOperations.PROMOTE || operation === Types_1.MexOperations.DEMOTE) {
                if (operation === Types_1.MexOperations.PROMOTE) {
                    action = 'promote'
                    contentPath = content.data?.[Types_1.XWAPaths.PROMOTE]
                }
                else {
                    action = 'demote'
                    contentPath = content.data?.[Types_1.XWAPaths.DEMOTE]
                }

                if (contentPath) {
                    ev.emit('newsletter-participants.update', {
                        id,
                        author: contentPath.actor?.pn || contentPath.actor?.id || '',
                        user: contentPath.user?.pn || contentPath.user?.id || '',
                        new_role: contentPath.user_new_role,
                        action
                    })
                }
                else {
                    logger.debug({ id, operation, content }, 'unknown or malformed mex notification')
                }
            }
        }
        catch (error) {
            logger.error({ id, node, error }, 'error in handleMexNotification')
        }
    }

    const processNotification = async (node) => {
        const result = {}
        const [child] = WABinary_1.getAllBinaryNodeChildren(node)
        const nodeType = node.attrs.type
        const from = WABinary_1.jidNormalizedUser(node.attrs.from)

        switch (nodeType) {
            case 'privacy_token':
                const tokenList = WABinary_1.getBinaryNodeChildren(child, 'token')
                {
                    // patch auto-persist tcToken to keystore for 463 prevention
                    const tctokenSet = {}
                    for (const { attrs, content } of tokenList) {
                        const jid = attrs.jid
                        ev.emit('chats.update', [
                            {
                                id: jid,
                                tcToken: content
                            }
                        ])
                        const token = Buffer.isBuffer(content)
                            ? content
                            : content instanceof Uint8Array
                                ? Buffer.from(content)
                                : undefined
                        if (token) {
                            tctokenSet[jid] = { token, timestamp: attrs.t || String(Math.floor(Date.now() / 1000)) }
                        }
                        logger.debug({ jid }, 'got privacy token update')
                    }
                    if (Object.keys(tctokenSet).length) {
                        try {
                            await authState.keys.set({ 'tctoken': tctokenSet })
                        } catch (err) {
                            logger.warn({ err: err?.message }, '[wsapme] failed to persist tctoken from privacy_token notification')
                        }
                    }
                }
                break
            case 'w:gp2':
                // TODO: HANDLE PARTICIPANT_PN
                handleGroupNotification(node, child, result)
                break
            case 'newsletter':
                handleNewsletterNotification(node.attrs.from, child)
                break
            case 'mex':
                handleMexNotification(node.attrs.from, child, result)
                break
            case 'mediaretry':
                const event = Utils_1.decodeMediaRetryNode(node)
                ev.emit('messages.media-update', [event])
                break
            case 'encrypt':
                await handleEncryptNotification(node)
                break
            case 'devices':
                const devices = WABinary_1.getBinaryNodeChildren(child, 'device')
                if (WABinary_1.areJidsSameUser(child.attrs.jid, authState.creds.me.id) ||
                    WABinary_1.areJidsSameUser(child.attrs.lid, authState.creds.me.lid)) {
                    const deviceData = devices.map(d => ({ id: d.attrs.jid, lid: d.attrs.lid }))
                    logger.info({ deviceData }, 'my own devices changed')
                }
                //TODO: drop a new event, add hashes
                break
            case 'server_sync':
                const update = WABinary_1.getBinaryNodeChild(node, 'collection')
                if (update) {
                    const name = update.attrs.name
                    await resyncAppState([name], false)
                }
                break
            case 'picture':
                const setPicture = WABinary_1.getBinaryNodeChild(node, 'set')
                const delPicture = WABinary_1.getBinaryNodeChild(node, 'delete')
                ev.emit('contacts.update', [{
                    id: WABinary_1.jidNormalizedUser(node?.attrs?.from) || (setPicture || delPicture)?.attrs?.hash || '',
                    imgUrl: setPicture ? 'changed' : 'removed'
                }])
                if (WABinary_1.isJidGroup(from)) {
                    const node = setPicture || delPicture
                    result.messageStubType = Types_1.WAMessageStubType.GROUP_CHANGE_ICON
                    if (setPicture) {
                        result.messageStubParameters = [setPicture.attrs.id]
                    }
                    result.participant = node?.attrs?.author
                    result.key = {
                        ...result.key || {},
                        participant: setPicture?.attrs?.author
                    }
                }
                break
            case 'account_sync':
                if (child.tag === 'disappearing_mode') {
                    const newDuration = +child.attrs.duration
                    const timestamp = +child.attrs.t
                    logger.info({ newDuration }, 'updated account disappearing mode')
                    ev.emit('creds.update', {
                        accountSettings: {
                            ...authState.creds.accountSettings,
                            defaultDisappearingMode: {
                                ephemeralExpiration: newDuration,
                                ephemeralSettingTimestamp: timestamp,
                            },
                        }
                    })
                }
                else if (child.tag === 'blocklist') {
                    const blocklists = WABinary_1.getBinaryNodeChildren(child, 'item')
                    for (const { attrs } of blocklists) {
                        const blocklist = [attrs.jid]
                        const type = (attrs.action === 'block') ? 'add' : 'remove'
                        ev.emit('blocklist.update', { blocklist, type })
                    }
                }
                break
            case 'link_code_companion_reg':
                const linkCodeCompanionReg = WABinary_1.getBinaryNodeChild(node, 'link_code_companion_reg')
                const ref = toRequiredBuffer(WABinary_1.getBinaryNodeChildBuffer(linkCodeCompanionReg, 'link_code_pairing_ref'))
                const primaryIdentityPublicKey = toRequiredBuffer(WABinary_1.getBinaryNodeChildBuffer(linkCodeCompanionReg, 'primary_identity_pub'))
                const primaryEphemeralPublicKeyWrapped = toRequiredBuffer(WABinary_1.getBinaryNodeChildBuffer(linkCodeCompanionReg, 'link_code_pairing_wrapped_primary_ephemeral_pub'))
                const codePairingPublicKey = await decipherLinkPublicKey(primaryEphemeralPublicKeyWrapped)
                const companionSharedKey = Utils_1.Curve.sharedKey(authState.creds.pairingEphemeralKeyPair.private, codePairingPublicKey)
                const random = crypto_1.randomBytes(32)
                const linkCodeSalt = crypto_1.randomBytes(32)

                const linkCodePairingExpanded = await Utils_1.hkdf(companionSharedKey, 32, {
                    salt: linkCodeSalt,
                    info: 'link_code_pairing_key_bundle_encryption_key'
                })

                const encryptPayload = Buffer.concat([Buffer.from(authState.creds.signedIdentityKey.public), primaryIdentityPublicKey, random])
                const encryptIv = crypto_1.randomBytes(12)
                const encrypted = Utils_1.aesEncryptGCM(encryptPayload, linkCodePairingExpanded, encryptIv, Buffer.alloc(0))
                const encryptedPayload = Buffer.concat([linkCodeSalt, encryptIv, encrypted])
                const identitySharedKey = Utils_1.Curve.sharedKey(authState.creds.signedIdentityKey.private, primaryIdentityPublicKey)
                const identityPayload = Buffer.concat([companionSharedKey, identitySharedKey, random])

                authState.creds.advSecretKey = (await Utils_1.hkdf(identityPayload, 32, { info: 'adv_secret' })).toString('base64')

                await query({
                    tag: 'iq',
                    attrs: {
                        to: WABinary_1.S_WHATSAPP_NET,
                        type: 'set',
                        id: suki.generateMessageTag(),
                        xmlns: 'md'
                    },
                    content: [
                        {
                            tag: 'link_code_companion_reg',
                            attrs: {
                                jid: authState.creds.me.id,
                                stage: 'companion_finish',
                            },
                            content: [
                                {
                                    tag: 'link_code_pairing_wrapped_key_bundle',
                                    attrs: {},
                                    content: encryptedPayload
                                },
                                {
                                    tag: 'companion_identity_public',
                                    attrs: {},
                                    content: authState.creds.signedIdentityKey.public
                                },
                                {
                                    tag: 'link_code_pairing_ref',
                                    attrs: {},
                                    content: ref
                                }
                            ]
                        }
                    ]
                })

                authState.creds.registered = true
                ev.emit('creds.update', authState.creds)
        }

        if (Object.keys(result).length) {
            return result
        }
    }

    async function decipherLinkPublicKey(data) {
        const buffer = toRequiredBuffer(data)
        const salt = buffer.slice(0, 32)
        const secretKey = await Utils_1.derivePairingCodeKey(authState.creds.pairingCode, salt)
        const iv = buffer.slice(32, 48)
        const payload = buffer.slice(48, 80)
        return Utils_1.aesDecryptCTR(payload, secretKey, iv)
    }

    function toRequiredBuffer(data) {
        if (data === undefined) {
            throw new boom_1.Boom('Invalid buffer', { statusCode: 400 })
        }
        return data instanceof Buffer ? data : Buffer.from(data)
    }

    const willSendMessageAgain = async (id, participant) => {
        const key = `${id}:${participant}`
        const retryCount = (await msgRetryCache.get(key)) || 0
        return retryCount < maxMsgRetryCount
    }

    const updateSendMessageAgainCount = async (id, participant) => {
        const key = `${id}:${participant}`
        const newValue = ((await msgRetryCache.get(key)) || 0) + 1
        await msgRetryCache.set(key, newValue)
    }

    const sendMessagesAgain = async (key, ids, retryNode) => {
        const remoteJid = key.remoteJid
        const participant = key.participant || remoteJid
        const retryCount = +retryNode.attrs.count || 1

        // Try to get messages from cache first, then fallback to getMessage
        const msgs = []

        for (const id of ids) {
            let msg

            // Try to get from retry cache first if enabled
            if (messageRetryManager) {
                const cachedMsg = messageRetryManager.getRecentMessage(remoteJid, id)
                if (cachedMsg) {
                    msg = cachedMsg.message
                    logger.debug({ jid: remoteJid, id }, 'found message in retry cache')

                    // Mark retry as successful since we found the message
                    messageRetryManager.markRetrySuccess(id)
                }
            }

            // Fallback to getMessage if not found in cache
            if (!msg) {
                msg = await getMessage({ ...key, id })
                if (msg) {
                    logger.debug({ jid: remoteJid, id }, 'found message via getMessage')

                    // Also mark as successful if found via getMessage
                    if (messageRetryManager) {
                        messageRetryManager.markRetrySuccess(id);
                    }
                }
            }
            msgs.push(msg)
        }

        // if it's the primary jid sending the request
        // just re-send the message to everyone
        // prevents the first message decryption failure
        const sendToAll = !WABinary_1.jidDecode(participant)?.device

        // Check if we should recreate session for this retry
        let shouldRecreateSession = false
        let recreateReason = ''

        if (enableAutoSessionRecreation && messageRetryManager) {
            try {
                const sessionId = signalRepository.jidToSignalProtocolAddress(participant)
                const hasSession = await signalRepository.validateSession(participant)
                const result = messageRetryManager.shouldRecreateSession(participant, retryCount, hasSession.exists)

                shouldRecreateSession = result.recreate
                recreateReason = result.reason

                if (shouldRecreateSession) {
                    logger.info({ participant, retryCount, reason: recreateReason }, 'recreating session for outgoing retry')
                    await authState.keys.set({ session: { [sessionId]: null } });
                }
            }
            catch (error) {
                logger.warn({ error, participant }, 'failed to check session recreation for outgoing retry')
            }
        }

        await assertSessions([participant], shouldRecreateSession)

        if (WABinary_1.isJidGroup(remoteJid)) {
            await authState.keys.set({ 'sender-key-memory': { [remoteJid]: null } });
        }
        logger.debug({ participant, sendToAll, shouldRecreateSession, recreateReason }, 'forced new session for retry recp')

        for (const [i, msg] of msgs.entries()) {
            if (!ids[i])
                continue

            if (msg && (await willSendMessageAgain(ids[i], participant))) {
                updateSendMessageAgainCount(ids[i], participant)
                const msgRelayOpts = { messageId: ids[i] }

                if (sendToAll) {
                    msgRelayOpts.useUserDevicesCache = false
                }
                else {
                    msgRelayOpts.participant = {
                        jid: participant,
                        count: +retryNode.attrs.count
                    }
                }
                await relayMessage(key.remoteJid, msg, msgRelayOpts)
            }
            else {
                logger.debug({ jid: key.remoteJid, id: ids[i] }, 'recv retry request, but message not available')
            }
        }
    }

    const handleReceipt = async (node) => {
        const { attrs } = node
        const isNodeFromMe = attrs.fromMe === 'true'
        const remoteJid = WABinary_1.jidNormalizedUser(attrs.from)
        const fromMe = !isNodeFromMe
        const ids = [attrs.id, ...(WABinary_1.getBinaryNodeChild(node, 'list')?.content || []).map(i => i.attrs.id)].filter(id => !!id)

        if (shouldIgnoreJid(remoteJid) && remoteJid !== WABinary_1.S_WHATSAPP_NET) {
            logger.debug({ remoteJid, id: attrs.id }, 'ignored receipt')
            await sendMessageAck(node)
            return
        }

        try {
            await Promise.all([
                processingMutex.mutex(async () => {
                    const status = Utils_1.getStatusFromReceiptType(attrs.type)
                    const key = {
                        remoteJid,
                        fromMe,
                        participant: attrs.participant,
                        id: attrs.id
                    }

                    if (typeof status !== 'undefined' && (
                        // basically, we only want to know when a message from us has been delivered to/read by the other person
                        // or another device of ours has read some messages
                        status >= WAProto_1.proto.WebMessageInfo.Status.SERVER_ACK ||
                        !isNodeFromMe)) {
                        if (WABinary_1.isJidGroup(remoteJid) || WABinary_1.isJidStatusBroadcast(remoteJid)) {
                            if (attrs.participant) {
                                const updateKey = status === WAProto_1.proto.WebMessageInfo.Status.DELIVERY_ACK ? 'receiptTimestamp' : 'readTimestamp'
                                ev.emit('message-receipt.update', ids.map(id => ({
                                    key: { ...key, id },
                                    receipt: {
                                        userJid: WABinary_1.jidNormalizedUser(attrs.participant),
                                        [updateKey]: +attrs.t
                                    }
                                })))
                            }
                        }

                        else {
                            ev.emit('messages.update', ids.map(id => ({
                                key: { ...key, id },
                                update: { status, messageTimestamp: Utils_1.toNumber(+(attrs.t ?? 0)) }
                            })))
                        }
                    }

                    if (attrs.type === 'retry') {
                        // correctly set who is asking for the retry
                        key.participant = key.participant || attrs.from
                        const retryNode = WABinary_1.getBinaryNodeChild(node, 'retry')

                        if (ids[0] && key.participant && (await willSendMessageAgain(ids[0], key.participant))) {
                            if (key.fromMe) {
                                try {
                                    updateSendMessageAgainCount(ids[0], key.participant)
                                    logger.debug({ attrs, key }, 'recv retry request')
                                    await sendMessagesAgain(key, ids, retryNode)
                                }

                                catch (error) {
                                    logger.error({ key, ids, trace: error instanceof Error ? error.stack : 'Unknown error' }, 'error in sending message again')
                                }
                            }

                            else {
                                logger.info({ attrs, key }, 'recv retry for not fromMe message')
                            }
                        }

                        else {
                            logger.info({ attrs, key }, 'will not send message again, as sent too many times')
                        }
                    }
                })
            ])
        }
        finally {
            await sendMessageAck(node)
        }
    }

    const handleNotification = async (node) => {
        const remoteJid = node.attrs.from

        if (shouldIgnoreJid(remoteJid) && remoteJid !== WABinary_1.S_WHATSAPP_NET) {
            logger.debug({ remoteJid, id: node.attrs.id }, 'ignored notification')
            await sendMessageAck(node)
            return
        }

        try {
            await Promise.all([
                processingMutex.mutex(async () => {
                    const msg = await processNotification(node)

                    if (msg) {
                        const fromMe = WABinary_1.areJidsSameUser(node.attrs.participant || remoteJid, authState.creds.me.id)
                        const { senderAlt: participantAlt, addressingMode } = Utils_1.extractAddressingContext(node)
                        msg.key = {
                            remoteJid,
                            fromMe,
                            participant: node.attrs.participant,
                            participantAlt,
                            addressingMode,
                            id: node.attrs.id,
                            ...(msg.key || {})
                        }
                        msg.participant ??= node.attrs.participant
                        msg.messageTimestamp = +node.attrs.t
                        const fullMsg = WAProto_1.proto.WebMessageInfo.fromObject(msg)
                        await upsertMessage(fullMsg, 'append')
                    }
                })
            ])
        }
        finally {
            await sendMessageAck(node)
        }
    }

    const handleMessage = async (node) => {
        if (shouldIgnoreJid(node.attrs.from) && node.attrs.from !== WABinary_1.S_WHATSAPP_NET) {
            logger.debug({ key: node.attrs.key }, 'ignored message')
            await sendMessageAck(node, Utils_1.NACK_REASONS.UnhandledError)
            return
        }

        const encNode = WABinary_1.getBinaryNodeChild(node, 'enc')

        // TODO: temporary fix for crashes and issues resulting of failed msmsg decryption
        if (encNode?.attrs.type === 'msmsg') {
            logger.debug({ key: node.attrs.key }, 'ignored msmsg')
            await sendMessageAck(node, Utils_1.NACK_REASONS.MissingMessageSecret)
            return
        }

        // Handle unavailable messages by requesting placeholder resend
        if (WABinary_1.getBinaryNodeChild(node, 'unavailable') && !encNode) {
            const { key } = Utils_1.decodeMessageNode(node, authState.creds.me.id, authState.creds.me.lid || '').fullMessage

            // Fire-and-forget: don't block message handling with the 5s delay in requestPlaceholderResend
            void requestPlaceholderResend(key)
                .then(resendResponse => {
                    if (resendResponse === 'RESOLVED') {
                        logger.debug('unavailable message resolved via placeholder resend')
                    } else {
                        logger.debug('received unavailable message, requested resend from phone')
                    }
                })
                .catch(error => {
                    logger.error({ error, key }, 'failed to request placeholder resend')
                })

            // ACK immediately and return - don't proceed to decrypt path to avoid duplicate ACK
            await sendMessageAck(node)
            return
        } else {
            if (placeholderResendCache.get(node.attrs.id)) {
                await placeholderResendCache.del(node.attrs.id)
            }
        }

        const {
            fullMessage: msg,
            category,
            author,
            decrypt
        } = Utils_1.decryptMessageNode(node, authState.creds.me.id, authState.creds.me.lid || '', signalRepository, logger)

        const alt = msg.key.participantAlt || msg.key.remoteJidAlt
        // store new mappings we didn't have before
        if (!!alt) {
            const altServer = WABinary_1.jidDecode(alt)?.server
            const primaryJid = msg.key.participant || msg.key.remoteJid
            if (altServer === 'lid') {
                if (!(await signalRepository.lidMapping.getPNForLID(alt))) {
                    await signalRepository.lidMapping.storeLIDPNMappings([{ lid: alt, pn: primaryJid }])
                    await signalRepository.migrateSession(primaryJid, alt)
                }
            } else {
                if (!(await signalRepository.lidMapping.getLIDForPN(alt))) {
                    await signalRepository.lidMapping.storeLIDPNMappings([{ lid: primaryJid, pn: alt }])
                    await signalRepository.migrateSession(alt, primaryJid)
                }
            }
        }

        if (msg.key?.remoteJid && msg.key?.id && messageRetryManager) {
            messageRetryManager.addRecentMessage(msg.key.remoteJid, msg.key.id, msg.message)
            logger.debug(
                {
                    jid: msg.key.remoteJid,
                    id: msg.key.id
                },
                'Added message to recent cache for retry receipts'
            )
        }

        let didSendMessageAck = false
        const sendMessageAckOnce = async (reason) => {
            didSendMessageAck = true
            await sendMessageAck(node, reason)
        }

        try {
            await processingMutex.mutex(async () => {
                await decrypt()
                // message failed to decrypt
                if (msg.messageStubType === WAProto_1.proto.WebMessageInfo.StubType.CIPHERTEXT && msg.category !== 'peer') {
                    if (msg?.messageStubParameters?.[0] === Utils_1.MISSING_KEYS_ERROR_TEXT) {
                        return sendMessageAckOnce(Utils_1.NACK_REASONS.ParsingError)
                    }

                    if (msg.messageStubParameters?.[0] === Utils_1.NO_MESSAGE_FOUND_ERROR_TEXT) {
                        return sendMessageAckOnce()
                    }

                    // Skip retry for expired status messages (>24h old)
                    if (WABinary_1.isJidStatusBroadcast(msg.key.remoteJid)) {
                        const messageAge = Utils_1.unixTimestampSeconds() - Utils_1.toNumber(msg.messageTimestamp)
                        if (messageAge > Defaults_1.STATUS_EXPIRY_SECONDS) {
                            logger.debug(
                                { msgId: msg.key.id, messageAge, remoteJid: msg.key.remoteJid },
                                'skipping retry for expired status message'
                            )
                            return sendMessageAckOnce()
                        }
                    }

                    const errorMessage = msg?.messageStubParameters?.[0] || ''
                    const isPreKeyError = errorMessage.includes('PreKey')

                    logger.debug(`[handleMessage] Attempting retry request for failed decryption`)

                    // Handle both pre-key and normal retries in single mutex
                    await retryMutex.mutex(async () => {
                        try {
                            if (!ws.isOpen) {
                                logger.debug({ node }, 'Connection closed, skipping retry')
                                return
                            }

                            // Handle pre-key errors with upload and delay
                            if (isPreKeyError) {
                                logger.info({ error: errorMessage }, 'PreKey error detected, uploading and retrying')

                                try {
                                    logger.debug('Uploading pre-keys for error recovery')
                                    await uploadPreKeys(5)
                                    logger.debug('Waiting for server to process new pre-keys')
                                    await Utils_1.delay(1000)
                                } catch (uploadErr) {
                                    logger.error({ uploadErr }, 'Pre-key upload failed, proceeding with retry anyway')
                                }
                            }

                            const encNode = WABinary_1.getBinaryNodeChild(node, 'enc')
                            await sendRetryRequest(node, !encNode)
                            if (retryRequestDelayMs) {
                                await Utils_1.delay(retryRequestDelayMs)
                            }
                        } catch (err) {
                            logger.error({ err, isPreKeyError }, 'Failed to handle retry, attempting basic retry')
                            // Still attempt retry even if pre-key upload failed
                            try {
                                const encNode = WABinary_1.getBinaryNodeChild(node, 'enc')
                                await sendRetryRequest(node, !encNode)
                            } catch (retryErr) {
                                logger.error({ retryErr }, 'Failed to send retry after error handling')
                            }
                        }

                        await sendMessageAckOnce(Utils_1.NACK_REASONS.UnhandledError)
                    })
                } else {
                    if (messageRetryManager && msg.key.id) {
                        messageRetryManager.cancelPendingPhoneRequest(msg.key.id)
                    }

                    const isNewsletter = WABinary_1.isJidNewsletter(msg.key.remoteJid)
                    if (!isNewsletter) {
                        // no type in the receipt => message delivered
                        let type = undefined
                        let participant = msg.key.participant
                        if (category === 'peer') {
                            // special peer message
                            type = 'peer_msg'
                        } else if (msg.key.fromMe) {
                            // message was sent by us from a different device
                            type = 'sender'
                            // need to specially handle this case
                            if (WABinary_1.isLidUser(msg.key.remoteJid) || WABinary_1.isLidUser(msg.key.remoteJidAlt)) {
                                participant = author // TODO: investigate sending receipts to LIDs and not PNs
                            }
                        } else if (!sendActiveReceipts) {
                            type = 'inactive'
                        }

                        // Always send the regular delivery receipt first
                        await sendReceipt(msg.key.remoteJid, participant, [msg.key.id], type)

                        // Additionally send hist_sync receipt for history messages
                        const isAnyHistoryMsg = Utils_1.getHistoryMsg(msg.message)
                        if (isAnyHistoryMsg) {
                            const jid = WABinary_1.jidNormalizedUser(msg.key.remoteJid)
                            await sendReceipt(jid, undefined, [msg.key.id], 'hist_sync')
                        }
                    } else {
                        logger.debug({ key: msg.key }, 'processed newsletter message without receipts')
                    }
                }

                Utils_1.cleanMessage(msg, authState.creds.me.id, authState.creds.me.lid)
                if (!didSendMessageAck) {
                    await sendMessageAckOnce()
                }

                await upsertMessage(msg, node.attrs.offline ? 'append' : 'notify')
            })
        } catch (error) {
            logger.error({ error, node: WABinary_1.binaryNodeToString(node) }, 'error in handling message')
        }
    }

    const fetchMessageHistory = async (count, oldestMsgKey, oldestMsgTimestamp) => {
        if (!authState.creds.me?.id) {
            throw new boom_1.Boom('Not authenticated')
        }

        const pdoMessage = {
            historySyncOnDemandRequest: {
                chatJid: oldestMsgKey.remoteJid,
                oldestMsgFromMe: oldestMsgKey.fromMe,
                oldestMsgId: oldestMsgKey.id,
                oldestMsgTimestampMs: oldestMsgTimestamp,
                onDemandMsgCount: count
            },
            peerDataOperationRequestType: WAProto_1.proto.Message.PeerDataOperationRequestType.HISTORY_SYNC_ON_DEMAND
        }

        return sendPeerDataOperationMessage(pdoMessage)
    }

    const requestPlaceholderResend = async (messageKey) => {
        if (!authState.creds.me?.id) {
            throw new boom_1.Boom('Not authenticated')
        }

        if (placeholderResendCache.get(messageKey?.id)) {
            logger.debug({ messageKey }, 'already requested resend')
            return
        }

        else {
            placeholderResendCache.set(messageKey?.id, true)
        }

        await Utils_1.delay(5000)

        if (!placeholderResendCache.get(messageKey?.id)) {
            logger.debug({ messageKey }, 'message received while resend requested')
            return 'RESOLVED'
        }

        const pdoMessage = {
            placeholderMessageResendRequest: [{
                messageKey
            }],
            peerDataOperationRequestType: WAProto_1.proto.Message.PeerDataOperationRequestType.PLACEHOLDER_MESSAGE_RESEND
        }

        setTimeout(() => {
            if (placeholderResendCache.get(messageKey?.id)) {
                logger.debug({ messageKey }, 'PDO message without response after 15 seconds. Phone possibly offline')
                placeholderResendCache.del(messageKey?.id)
            }
        }, 15000)

        return sendPeerDataOperationMessage(pdoMessage)
    }

    /**
     * Sanitize Brazilian landline phone numbers from caller_pn.
     * WhatsApp decoder may append a trailing zero to 12-digit landlines.
     */
    const sanitizeCallerPn = (pn) => {
        if (!pn) return undefined
        if (!pn.startsWith('55')) return pn
        if (pn.length === 13) {
            const firstDigitAfterDDD = pn.charAt(4)
            if (['2', '3', '4', '5'].includes(firstDigitAfterDDD) && pn.endsWith('0')) {
                return pn.slice(0, -1)
            }
        }
        return pn
    }

    /** Extract participants from a node containing <user> children */
    const extractParticipants = (parentNode) => {
        const userNodes = WABinary_1.getBinaryNodeChildren(parentNode, 'user')
        if (!userNodes.length) return undefined
        return userNodes.map(u => ({
            jid: u.attrs.jid,
            state: u.attrs.state,
            userPn: u.attrs.user_pn,
            type: u.attrs.type
        }))
    }

    const handleCall = async (node) => {
        const { attrs } = node
        const children = WABinary_1.getAllBinaryNodeChildren(node)

        if (!children.length) {
            throw new boom_1.Boom('Missing call info in call node')
        }

        // Process ALL children — a <call> node can carry multiple sibling stanzas
        for (const infoChild of children) {
            const status = Utils_1.getCallStatusFromNode(infoChild)
            const callId = infoChild.attrs['call-id']
            const from = infoChild.attrs.from || infoChild.attrs['call-creator']

            const call = {
                chatId: attrs.from,
                from,
                id: callId,
                date: new Date(+attrs.t * 1000),
                offline: !!attrs.offline,
                status
            }

            if (status === 'offer') {
                call.isVideo = !!WABinary_1.getBinaryNodeChild(infoChild, 'video')
                call.isGroup = infoChild.attrs.type === 'group' || !!infoChild.attrs['group-jid']
                call.groupJid = infoChild.attrs['group-jid']
                call.callerPn = sanitizeCallerPn(infoChild.attrs['caller_pn'])

                const groupInfo = WABinary_1.getBinaryNodeChild(infoChild, 'group_info')
                if (groupInfo) {
                    call.isGroup = true
                    call.linkToken = groupInfo.attrs['link-token']
                    call.media = groupInfo.attrs.media
                    call.connectedLimit = groupInfo.attrs['connected-limit']
                        ? Number(groupInfo.attrs['connected-limit'])
                        : undefined
                    call.participants = extractParticipants(groupInfo)
                }

                const linkInfo = WABinary_1.getBinaryNodeChild(infoChild, 'link_info')
                if (linkInfo) {
                    call.linkCreator = linkInfo.attrs.link_creator
                    call.linkCreatorPn = linkInfo.attrs.link_creator_pn
                }

                await callOfferCache.set(call.id, call)
            }

            if (status === 'group_update') {
                const groupInfo = WABinary_1.getBinaryNodeChild(infoChild, 'group_info')
                if (groupInfo) {
                    call.isGroup = true
                    call.linkToken = groupInfo.attrs['link-token']
                    call.media = groupInfo.attrs.media
                    call.connectedLimit = groupInfo.attrs['connected-limit']
                        ? Number(groupInfo.attrs['connected-limit'])
                        : undefined
                    call.participants = extractParticipants(groupInfo)
                }
            }

            if (status === 'reminder') {
                const groupInfo = WABinary_1.getBinaryNodeChild(infoChild, 'group_info')
                if (groupInfo) {
                    call.isGroup = true
                    call.linkToken = groupInfo.attrs['link-token']
                    call.media = groupInfo.attrs.media
                }
            }

            if (status === 'terminate') {
                call.terminateReason = infoChild.attrs.reason
                const callSummary = WABinary_1.getBinaryNodeChild(infoChild, 'call_summary')
                if (callSummary) {
                    call.media = callSummary.attrs.media
                    call.duration = callSummary.attrs.call_duration ? Number(callSummary.attrs.call_duration) : undefined
                    call.participants = extractParticipants(callSummary)
                }
            }

            if (status === 'accept' || status === 'preaccept') {
                call.isVideo = !!WABinary_1.getBinaryNodeChild(infoChild, 'video')
            }

            const existingCall = await callOfferCache.get(call.id)
            if (existingCall) {
                call.isVideo = call.isVideo !== undefined ? call.isVideo : existingCall.isVideo
                call.isGroup = call.isGroup !== undefined ? call.isGroup : existingCall.isGroup
                call.groupJid = call.groupJid !== undefined ? call.groupJid : existingCall.groupJid
                call.callerPn = call.callerPn || existingCall.callerPn
                call.linkToken = call.linkToken || existingCall.linkToken
                call.linkCreator = call.linkCreator || existingCall.linkCreator
                call.linkCreatorPn = call.linkCreatorPn || existingCall.linkCreatorPn
                call.media = call.media || existingCall.media
                call.connectedLimit = call.connectedLimit !== undefined ? call.connectedLimit : existingCall.connectedLimit
            }

            if (status === 'reject' || status === 'accept' || status === 'timeout' || status === 'terminate') {
                await callOfferCache.del(call.id)
            }

            ev.emit('call', [call])
        }

        await sendMessageAck(node)
    }

    const handleBadAck = async ({ attrs }) => {
        const key = { remoteJid: attrs.from, fromMe: true, id: attrs.id, newsletter_server_id: attrs?.server_id }
        // WARNING: REFRAIN FROM ENABLING THIS FOR NOW. IT WILL CAUSE A LOOP
        // // current hypothesis is that if pash is sent in the ack
        // // it means -- the message hasn't reached all devices yet
        // // we'll retry sending the message here
        // if(attrs.phash) {
        // 	logger.info({ attrs }, 'received phash in ack, resending message...')
        // 	const msg = await getMessage(key)
        // 	if(msg) {
        // 		await relayMessage(key.remoteJid!, msg, { messageId: key.id!, useUserDevicesCache: false })
        // 	} else {
        // 		logger.warn({ attrs }, 'could not send message again, as it was not found')
        // 	}
        // }
        // error in acknowledgement,
        // device could not display the message
        if (attrs.error) {
            logger.warn({ attrs }, 'received error in ack')
            ev.emit('messages.update', [
                {
                    key,
                    update: {
                        status: Types_1.WAMessageStatus.ERROR,
                        messageStubParameters: [
                            attrs.error
                        ]
                    }
                }
            ])
        }
    }

    /// processes a node with the given function
    /// and adds the task to the existing buffer if we're buffering events
    const processNodeWithBuffer = async (node, identifier, exec) => {
        ev.buffer()
        await execTask()
        ev.flush()
        function execTask() {
            return exec(node, false)
                .catch(err => onUnexpectedError(err, identifier))
        }
    }

    const makeOfflineNodeProcessor = () => {
        const nodeProcessorMap = new Map([
            ['message', handleMessage],
            ['call', handleCall],
            ['receipt', handleReceipt],
            ['notification', handleNotification]
        ])

        const nodes = []
        let isProcessing = false

        const enqueue = async (type, node) => {
            nodes.push({ type, node })

            if (isProcessing) {
                return
            }

            isProcessing = true
            const BATCH_SIZE = 10

            try {
                while (nodes.length && ws.isOpen) {
                    const iterationSize = Math.min(nodes.length, BATCH_SIZE)
                    for (let i = 0; i < iterationSize; i++) {
                        const { type, node } = nodes.shift()
                        const nodeProcessor = nodeProcessorMap.get(type)
                        if (!nodeProcessor) {
                            onUnexpectedError(new Error(`unknown offline node type: ${type}`), 'processing offline node')
                            continue
                        }
                        await nodeProcessor(node)
                    }
                    if (nodes.length > 0) {
                        await Utils_1.delay(0)
                    }
                }
            }
            finally {
                isProcessing = false
            }
        }

        return { enqueue }
    }

    const offlineNodeProcessor = makeOfflineNodeProcessor()

    const processNode = (type, node, identifier, exec) => {
        const isOffline = !!node.attrs.offline

        if (isOffline) {
            offlineNodeProcessor.enqueue(type, node)
        }

        else {
            processNodeWithBuffer(node, identifier, exec)
        }
    }

    // recv a message
    ws.on('CB:message', (node) => {
        processNode('message', node, 'processing message', handleMessage)
    })
    ws.on('CB:call', async (node) => {
        processNode('call', node, 'handling call', handleCall)
    })

    // Top-level <relay> stanzas carry TURN server info, tokens and crypto keys
    ws.on('CB:relay', async (node) => {
        const callId = node.attrs['call-id']
        const callCreator = node.attrs['call-creator']
        if (callId && callCreator) {
            logger.debug({ callId, callCreator, uuid: node.attrs.uuid }, 'received relay info')
            ev.emit('call', [
                {
                    chatId: callCreator,
                    from: callCreator,
                    id: callId,
                    date: new Date(),
                    offline: false,
                    status: 'relay'
                }
            ])
        } else {
            logger.debug({ attrs: node.attrs }, 'received relay stanza without call-id/call-creator')
        }
    })
    ws.on('CB:receipt', node => {
        processNode('receipt', node, 'handling receipt', handleReceipt)
    })
    ws.on('CB:notification', async (node) => {
        processNode('notification', node, 'handling notification', handleNotification)
    })
    ws.on('CB:ack,class:message', (node) => {
        handleBadAck(node)
            .catch(error => onUnexpectedError(error, 'handling bad ack'))
    })
    ev.on('call', ([call]) => {
        // missed call + group call notification message generation
        if (call.status === 'timeout' || (call.status === 'offer' && call.isGroup)) {
            const msg = {
                key: {
                    remoteJid: call.chatId,
                    id: call.id,
                    fromMe: false
                },
                messageTimestamp: Utils_1.unixTimestampSeconds(call.date),
            }

            if (call.status === 'timeout') {
                if (call.isGroup) {
                    msg.messageStubType = call.isVideo ? Types_1.WAMessageStubType.CALL_MISSED_GROUP_VIDEO : Types_1.WAMessageStubType.CALL_MISSED_GROUP_VOICE
                }

                else {
                    msg.messageStubType = call.isVideo ? Types_1.WAMessageStubType.CALL_MISSED_VIDEO : Types_1.WAMessageStubType.CALL_MISSED_VOICE
                }
            }

            else {
                msg.message = { call: { callKey: Buffer.from(call.id) } }
            }

            const protoMsg = WAProto_1.proto.WebMessageInfo.fromObject(msg)
            upsertMessage(protoMsg, call.offline ? 'append' : 'notify')
        }
    })

    ev.on('connection.update', ({ isOnline }) => {
        if (typeof isOnline !== 'undefined') {
            sendActiveReceipts = isOnline
            logger.trace(`sendActiveReceipts set to "${sendActiveReceipts}"`)
        }
    })

    return {
        ...suki,
        sendMessageAck,
        sendRetryRequest,
        offerCall,
        initiateCall,
        initiateCalls,
        getActiveCalls,
        getCall,
        getActiveCallCount,
        endCall,
        endAllCalls,
        setVoipOptions,
        cancelCall,
        rejectCall,
        acceptCall,
        preacceptCall,
        terminateCall,
        sendRelayLatency,
        sendTransport,
        sendCallDuration,
        muteCall,
        sendHeartbeat,
        sendEncRekey,
        sendVideoState,
        queryCallLink,
        joinCallLink,
        fetchMessageHistory,
        requestPlaceholderResend,
        messageRetryManager
    }
}

module.exports = {
    makeMessagesRecvSocket
}