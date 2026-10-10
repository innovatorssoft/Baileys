"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalingBridge = void 0;

/**
 * Signaling bridge.
 *
 * Glues the WASM VoIP stack to Baileys: encrypts outbound `offer` / `enc_rekey`
 * stanzas, decrypts inbound ones, manages TC tokens, multi-device JID routing,
 * and signal-session refresh.
 *
 * @author ShellTear
 */
const { voipDiagnostics, summarizeNode, sanitizeJid } = require("./diagnostics.js");

const S_WHATSAPP_NET = "@s.whatsapp.net";
const TC_TOKEN_REQUEST_TIMEOUT_MS = 3500;
const SESSION_CACHE_TTL_MS = 5 * 60_000;
const ACK_TIMEOUT_MS = 15_000;
let _baileysModule = null;
const loadBaileys = async () => {
    if (_baileysModule)
        return _baileysModule;
    try {
        _baileysModule = require("../index.js");
        return _baileysModule;
    }
    catch {
        try {
            _baileysModule = require("@whiskeysockets/baileys");
            return _baileysModule;
        }
        catch {
            throw new Error("Could not import Baileys module.");
        }
    }
};
const getNodeChildren = (node) => Array.isArray(node.content) ? node.content : [];
const setNodeChildren = (node, children) => {
    node.content = children.length ? children : undefined;
};
const replaceNodeChild = (node, tag, nextChild) => {
    const children = getNodeChildren(node);
    const index = children.findIndex((c) => c.tag === tag);
    if (index >= 0)
        children[index] = nextChild;
    else
        children.push(nextChild);
    setNodeChildren(node, children);
};
const removeNodeChildrenByTag = (node, tag) => {
    setNodeChildren(node, getNodeChildren(node).filter((c) => c.tag !== tag));
};
const parseCountAttr = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};
class SignalingBridge {
    #sock;
    #logger = null;
    #baileys = null;
    #voip = null;
    #enginesByCallId = new Map();
    #observedTcTokens = new Map();
    #pendingTcTokenWaiters = new Map();
    #ensuredSignalSessions = new Map();
    #remoteDevicePeerByCallId = new Map();
    #remoteObfuscatedPeerByCallId = new Map();
    #remoteXmppRoutePeerByCallId = new Map();
    #incomingCallPeerById = new Map();
    #callKeysById = new Map();
    #processedStanzas = new Map();
    #outgoingSignalingQueue = Promise.resolve(undefined);
    #incomingSignalingQueue = Promise.resolve(undefined);
    #signalingEventListener = null;
    #signalingErrorListener = null;
    #incomingOfferListener = null;
    constructor(config) {
        this.#sock = config.sock;
        this.#logger = config.logger || config.sock?.logger || null;
    }
    init = async () => {
        try {
            this.#baileys = await loadBaileys();
        } catch { }
    };
    #diag = (level, event, details = {}) => {
        try {
            const callId = details.callId;
            const jid = details.peerJid || details.jid || details.from || details.to || details.targetJid;
            const direction = details.direction || "internal";
            voipDiagnostics.log({
                level,
                component: "SignalingBridge",
                event,
                direction,
                callId,
                jid,
                tags: details.tags || (details.tag ? [details.tag] : undefined),
                error: details.error,
                data: details
            });
        } catch { }
    };
    #log = (level, message, data = {}) => {
        try {
            const fn = this.#logger?.[level];
            if (typeof fn === "function") fn.call(this.#logger, data, message);
            const event = String(message).replace(/^baileys:\s*/i, "").replace(/[^a-zA-Z0-9_]+/g, "_").toLowerCase();
            this.#diag(level, event, data);
        }
        catch { }
    };
    /** Hand the WASM engine in so we can dispatch ack callbacks back to it. */
    attachEngine = (voip) => {
        this.#voip = voip;
    };
    registerEngine = (callId, engine) => {
        if (callId && engine) {
            this.#enginesByCallId.set(callId, engine);
        }
    };
    unregisterEngine = (callId) => {
        if (callId) {
            this.#enginesByCallId.delete(callId);
        }
    };
    #getEngineForCall = (callId) => {
        return (callId && this.#enginesByCallId.get(callId)) || this.#voip;
    };
    setSignalingEventListener = (listener) => {
        this.#signalingEventListener = listener;
    };
    setSignalingErrorListener = (listener) => {
        this.#signalingErrorListener = listener;
    };
    setIncomingOfferListener = (listener) => {
        this.#incomingOfferListener = listener;
    };
    getCallKey = (callId) => {
        return callId ? this.#callKeysById.get(callId) : undefined;
    };
    storeCallKey = (callId, callKey) => {
        if (callId && callKey) {
            this.#callKeysById.set(callId, Buffer.isBuffer(callKey) ? callKey : Buffer.from(callKey));
        }
    };
    encryptCallKey = async (targetJid, rawCallKey, count = 0) => {
        return this.#encryptCallKey(targetJid, rawCallKey, count);
    };
    getDeviceIdentity = () => {
        const { encodeSignedDeviceIdentity } = this.#baileys;
        const account = this.#sock.authState?.creds?.account;
        if (!account) return undefined;
        return {
            tag: "device-identity",
            attrs: {},
            content: encodeSignedDeviceIdentity(account, true),
        };
    };
    maybeDecryptEnc = async (voipNode, peerJid) => {
        return this.#maybeDecryptEnc(voipNode, peerJid);
    };
    init = async () => {
        this.#baileys = await loadBaileys();
        // Hook auth-state writes so we observe TC tokens as they land.
        const originalKeysSet = this.#sock.authState.keys.set.bind(this.#sock.authState.keys);
        this.#sock.authState.keys.set = async (data) => {
            const result = await originalKeysSet(data);
            for (const [jid, entry] of Object.entries(data?.tctoken ?? {})) {
                if (entry?.token instanceof Uint8Array && entry.token.length > 0) {
                    this.#rememberTcToken(jid, entry.token, entry.timestamp);
                }
            }
            return result;
        };
    };
    sendSignaling = (peerJid, callId, xmlPayload) => {
        this.#outgoingSignalingQueue = this.#outgoingSignalingQueue
            .then(() => this.#doSendSignaling(peerJid, callId, xmlPayload))
            .catch(() => { });
    };
    processIncomingCall = (node, voip, activeCallId) => {
        this.#incomingSignalingQueue = this.#incomingSignalingQueue
            .then(() => this.#doProcessIncomingCall(node, voip, activeCallId))
            .catch(() => { });
        return this.#incomingSignalingQueue;
    };
    processIncomingReceipt = (node, voip, activeCallId) => {
        this.#incomingSignalingQueue = this.#incomingSignalingQueue
            .then(() => this.#doProcessIncomingReceipt(node, voip, activeCallId))
            .catch(() => { });
        return this.#incomingSignalingQueue;
    };
    requestTcToken = async (jid) => {
        const userJid = this.#toBareJid(jid);
        const cached = await this.#getTcToken(userJid);
        if (cached?.length)
            return cached;
        try {
            const response = await this.#sock.getPrivacyTokens([userJid]);
            const { getBinaryNodeChild, getAllBinaryNodeChildren } = this.#baileys;
            const tokensNode = getBinaryNodeChild(response, "tokens") ??
                getBinaryNodeChild(getBinaryNodeChild(response, "iq"), "tokens");
            const tokenNodes = tokensNode
                ? getAllBinaryNodeChildren(tokensNode).filter((c) => c.tag === "token")
                : [];
            for (const tokenNode of tokenNodes) {
                const tokenJid = String(tokenNode.attrs.jid ?? "");
                if (this.#baileys.jidNormalizedUser(tokenJid) !== this.#baileys.jidNormalizedUser(userJid))
                    continue;
                const content = tokenNode.content;
                if (content instanceof Uint8Array && content.length > 0) {
                    const token = Buffer.from(content);
                    await this.#sock.authState.keys.set({
                        tctoken: { [userJid]: { token, timestamp: String(tokenNode.attrs.t ?? "") } },
                    });
                    return token;
                }
            }
        }
        catch { }
        return this.#getTcToken(userJid);
    };
    ensureTcToken = async (...jids) => {
        const uniqueJids = [
            ...new Set(jids.map((j) => this.#toBareJid(String(j ?? "").trim())).filter(Boolean)),
        ];
        for (const jid of uniqueJids) {
            const cached = await this.#getTcToken(jid);
            if (cached?.length)
                return cached;
        }
        for (const jid of uniqueJids) {
            const fetched = await Promise.race([
                this.requestTcToken(jid),
                new Promise((r) => setTimeout(() => r(undefined), TC_TOKEN_REQUEST_TIMEOUT_MS)),
            ]);
            if (fetched?.length)
                return fetched;
        }
        return undefined;
    };
    discoverPeerDevices = async (peerLidJid) => {
        const devices = await this.#sock.getUSyncDevices([peerLidJid], true, false);
        const server = peerLidJid.endsWith("@lid") ? "lid" : "s.whatsapp.net";
        const peerJids = devices.map((d) => {
            if (d.jid) return d.jid;
            if (d.wireJid) return d.wireJid;
            if (d.user) return this.#baileys.jidEncode(d.user, server, d.device && d.device > 0 ? d.device : undefined);
            return null;
        }).filter(Boolean);
        return this.#normalizeStartCallPeerList(peerJids);
    };
    ensureSessionsForPeers = async (jids) => {
        const targets = this.#expandSignalSessionTargets(jids);
        if (targets.length)
            await this.#ensureSignalSessions(targets, true);
    };
    resolveLid = async (pnJid) => this.#sock.signalRepository.lidMapping?.getLIDForPN(pnJid);
    issueTcToken = async (jid) => {
        const userJid = this.#toBareJid(jid);
        const issuedAt = Math.floor(Date.now() / 1000);
        try {
            await this.#sock.query({
                tag: "iq",
                attrs: {
                    to: S_WHATSAPP_NET, type: "set", xmlns: "privacy",
                    id: this.#sock.generateMessageTag(),
                },
                content: [{
                        tag: "tokens", attrs: {},
                        content: [{
                                tag: "token",
                                attrs: { jid: userJid, t: String(issuedAt), type: "trusted_contact" },
                            }],
                    }],
            });
            return true;
        }
        catch {
            return false;
        }
    };
    getRemoteDeviceJid = (callId) => this.#remoteDevicePeerByCallId.get(callId);
    // ─── private — outbound signaling ─────────────────────────────────────────
    #doSendSignaling = async (peerJid, callId, xmlPayload) => {
        const { decodeBinaryNode, getBinaryNodeChild } = this.#baileys;
        const rawPayload = Buffer.from(xmlPayload);
        let voipNode;
        try {
            voipNode = await decodeBinaryNode(Buffer.concat([Buffer.from([0]), rawPayload]));
        }
        catch {
            voipNode = await decodeBinaryNode(rawPayload);
        }
        const signalingTag = String(voipNode.tag);
        const effectivePeerJid = this.#resolveOutboundPeerJid(callId, peerJid);
        if (!voipNode.attrs["call-creator"]) {
            const selfLid = this.#sock.authState.creds.me?.lid;
            const selfPn = this.#sock.authState.creds.me?.id;
            if (selfLid)
                voipNode.attrs["call-creator"] = selfLid;
            else if (selfPn)
                voipNode.attrs["call-creator"] = selfPn;
        }

        this.#diag("debug", "outbound_signaling_started", {
            direction: "outgoing",
            callId,
            signalingTag,
            peerJid: sanitizeJid(peerJid),
            effectivePeerJid: sanitizeJid(effectivePeerJid),
            node: summarizeNode(voipNode)
        });

        // Multi-destination encryption (offer/enc_rekey with <destination>).
        const destination = getBinaryNodeChild(voipNode, "destination");
        if (destination) {
            const destinations = getNodeChildren(destination);
            const destinationJids = destinations
                .map((n) => String(n.attrs.jid ?? "").trim())
                .filter(Boolean);
            this.#diag("debug", "outbound_multi_destination_encryption", {
                direction: "outgoing",
                callId,
                signalingTag,
                destinationCount: destinations.length,
                destinations: destinationJids.map(sanitizeJid)
            });
            const sessionTargets = this.#expandSignalSessionTargets(destinationJids);
            if (sessionTargets.length)
                await this.#ensureSignalSessions(sessionTargets, signalingTag === "offer");
            const rootEnc = getBinaryNodeChild(voipNode, "enc");
            const encCount = parseCountAttr(rootEnc?.attrs.count);
            let includeDeviceIdentity = false;
            for (const destNode of destinations) {
                const targetJid = String(destNode.attrs.jid ?? "").trim();
                const destEnc = getBinaryNodeChild(destNode, "enc");
                if (!targetJid || !destEnc || !(destEnc.content instanceof Uint8Array))
                    continue;
                try {
                    const encrypted = await this.#encryptCallKey(targetJid, destEnc.content, encCount);
                    includeDeviceIdentity = includeDeviceIdentity || encrypted.shouldIncludeDeviceIdentity;
                    setNodeChildren(destNode, [encrypted.encNode]);
                    this.#diag("debug", "outbound_destination_key_encrypted", {
                        direction: "outgoing",
                        callId,
                        targetJid: sanitizeJid(targetJid)
                    });
                }
                catch (encErr) {
                    this.#diag("warn", "outbound_destination_key_encrypt_failed", {
                        direction: "outgoing",
                        callId,
                        targetJid: sanitizeJid(targetJid),
                        error: encErr?.message
                    });
                    for (const d of destinations)
                        removeNodeChildrenByTag(d, "enc");
                    break;
                }
            }
            if (includeDeviceIdentity)
                this.#appendDeviceIdentity(voipNode);
            await this.#sendCallStanza(this.#toBareJid(peerJid), voipNode, signalingTag, effectivePeerJid, peerJid, callId);
            return;
        }
        // Single-target encryption.
        if (signalingTag === "offer" || signalingTag === "enc_rekey" || signalingTag === "accept") {
            const enc = getBinaryNodeChild(voipNode, "enc");
            if (enc && enc.content instanceof Uint8Array) {
                const targetJid = this.#toCallDeviceJid(effectivePeerJid);
                try {
                    const encrypted = await this.#encryptCallKey(targetJid, enc.content, parseCountAttr(enc.attrs.count));
                    replaceNodeChild(voipNode, "enc", encrypted.encNode);
                    if (encrypted.shouldIncludeDeviceIdentity)
                        this.#appendDeviceIdentity(voipNode);
                    this.#diag("debug", "outbound_single_target_key_encrypted", {
                        direction: "outgoing",
                        callId,
                        targetJid: sanitizeJid(targetJid),
                        includeDeviceIdentity: encrypted.shouldIncludeDeviceIdentity
                    });
                } catch (encErr) {
                    this.#diag("warn", "outbound_single_target_key_encrypt_failed", {
                        direction: "outgoing",
                        callId,
                        targetJid: sanitizeJid(targetJid),
                        error: encErr?.message
                    });
                }
                await this.#sendCallStanza(targetJid, voipNode, signalingTag, effectivePeerJid, peerJid, callId);
                return;
            }
        }
        // Non-encrypted signaling (accept without raw enc, transport, terminate, etc.).
        const routeTo = (signalingTag === "transport" || signalingTag === "mute_v2" || signalingTag === "offer" || signalingTag === "enc_rekey" || signalingTag === "terminate" || signalingTag === "accept")
            ? this.#toCallDeviceJid(effectivePeerJid)
            : this.#toBareJid(effectivePeerJid);
        await this.#sendCallStanza(routeTo, voipNode, signalingTag, effectivePeerJid, peerJid, callId);
    };
    cleanupCall = (callId) => {
        if (!callId) return;
        this.#incomingCallPeerById.delete(callId);
        this.#callKeysById.delete(callId);
        this.#remoteDevicePeerByCallId.delete(callId);
        this.#remoteObfuscatedPeerByCallId.delete(callId);
        this.#remoteXmppRoutePeerByCallId.delete(callId);
    };
    #getSelfJid = (target) => {
        const selfPn = this.#sock?.authState?.creds?.me?.id || "";
        const selfLid = this.#sock?.authState?.creds?.me?.lid || "";
        const isLid = String(target || "").endsWith("@lid");
        return (isLid && selfLid) ? selfLid : (selfPn || selfLid);
    };

    sendTerminate = async (peerJid, callId, reason = undefined) => {
        if (!peerJid || !callId) return;
        const stanzaId = this.#sock.generateMessageTag();
        const terminateAttrs = {
            "call-id": callId,
            "call-creator": this.#sock.authState?.creds?.me?.id || "",
        };
        if (reason && !["completed", "ended", "hangup", "user_ended", "normal"].includes(reason)) {
            terminateAttrs.reason = reason;
        }
        const terminateNode = {
            tag: "terminate",
            attrs: terminateAttrs,
            content: undefined,
        };
        this.#diag("info", "outbound_terminate_transmitting", {
            direction: "outgoing",
            callId,
            peerJid: sanitizeJid(peerJid),
            reason,
            stanzaId
        });
        try {
            await this.#sock.sendNode({
                tag: "call",
                attrs: {
                    to: peerJid,
                    id: stanzaId
                },
                content: [terminateNode],
            });
            this.#diag("debug", "outbound_terminate_sent_to_socket", {
                direction: "outgoing",
                callId,
                stanzaId
            });
        } catch (err) {
            this.#diag("warn", "outbound_terminate_failed", {
                direction: "outgoing",
                callId,
                stanzaId,
                error: err?.message
            });
        }
    };
    /**
     * Send a call stanza and feed the resulting server ack back to the WASM —
     * without this, the WASM stalls and never receives the relay-list update.
     */
    #sendCallStanza = async (routeTo, voipNode, signalingTag, effectivePeerJid, callbackPeerJid, callId) => {
        const stanzaId = this.#sock.generateMessageTag();
        this.#diag("info", "outbound_call_stanza_transmitting", {
            direction: "outgoing",
            callId,
            signalingTag,
            routeTo: sanitizeJid(routeTo),
            stanzaId,
            node: summarizeNode(voipNode)
        });
        await this.#sock.sendNode({
            tag: "call",
            attrs: {
                to: routeTo,
                id: stanzaId
            },
            content: [voipNode],
        });
        this.#diag("debug", "outbound_call_stanza_sent_to_socket", {
            direction: "outgoing",
            callId,
            signalingTag,
            stanzaId
        });
        void (async () => {
            try {
                const ackNode = await this.#sock.waitForMessage(stanzaId, ACK_TIMEOUT_MS);
                if (!ackNode) {
                    this.#diag("warn", "outbound_ack_timeout", {
                        direction: "incoming",
                        callId,
                        signalingTag,
                        stanzaId,
                        routeTo: sanitizeJid(routeTo)
                    });
                    this.#signalingErrorListener?.(signalingTag, "ack_timeout", effectivePeerJid, callId);
                    return;
                }
                const ackError = ackNode.attrs?.error;
                this.#diag("info", "outbound_ack_received", {
                    direction: "incoming",
                    callId,
                    signalingTag,
                    stanzaId,
                    ackError: ackError ?? "0",
                    ackNode: summarizeNode(ackNode)
                });
                if (ackError && ackError !== "0" && ackError !== 0) {
                    const errStr = String(ackError);
                    const errorDetail = (errStr === "404" || errStr === "480") ? "unreachable" : `error_${errStr}`;
                    this.#diag("warn", "outbound_ack_error_reported", {
                        direction: "incoming",
                        callId,
                        signalingTag,
                        stanzaId,
                        ackError: errStr,
                        errorDetail
                    });
                    this.#signalingErrorListener?.(signalingTag, errorDetail, effectivePeerJid, callId);
                }
                const targetVoip = this.#getEngineForCall(callId);
                if (!targetVoip)
                    return;
                const { encodeBinaryNode } = this.#baileys;
                const ackPayload = Buffer.from(encodeBinaryNode(ackNode)).toString("base64");
                const tcToken = await this.ensureTcToken(effectivePeerJid, callbackPeerJid);
                try {
                    targetVoip.handleSignalingAck({
                        payload: ackPayload,
                        ackError: ackNode.attrs?.error ?? "0",
                        msgType: ackNode.attrs?.type ?? signalingTag,
                        peerJid: effectivePeerJid,
                        extraData: tcToken,
                    });
                }
                catch { }
            }
            catch (ackErr) {
                this.#diag("warn", "outbound_ack_exception", {
                    direction: "incoming",
                    callId,
                    signalingTag,
                    stanzaId,
                    error: ackErr?.message
                });
            }
        })();
    };
    // ─── private — inbound signaling ──────────────────────────────────────────
    #doProcessIncomingCall = async (node, voip, activeCallId) => {
        if (!node || typeof node !== "object") {
            this.#diag("warn", "empty_call_stanza_ignored", {
                direction: "incoming",
                reason: "null_or_empty_node"
            });
            return;
        }
        if (!this.#baileys) {
            this.#baileys = await loadBaileys();
        }
        const { getAllBinaryNodeChildren, getBinaryNodeChild, encodeBinaryNode } = this.#baileys;
        const stanzaId = String(node.attrs?.id ?? "");
        const fromJid = String(node.attrs?.from ?? "");
        const children = getAllBinaryNodeChildren(node) || [];
        const childTags = children.map(c => c?.tag).filter(Boolean);

        this.#diag("debug", "incoming_call_stanza_received", {
            direction: "incoming",
            stanzaId,
            from: fromJid,
            childCount: children.length,
            childTags,
            node: summarizeNode(node)
        });

        if (!children.length) {
            this.#diag("warn", "empty_call_stanza_ignored", {
                direction: "incoming",
                stanzaId,
                from: fromJid,
                reason: "no_children"
            });
            return;
        }

        // Find the primary signaling child node:
        // Prioritize offer / offer_notice, then terminate, reject, accept, preaccept, transport, relaylatency
        let voipChild = children.find(c => c?.tag === "offer" || c?.tag === "offer_notice") ||
                        children.find(c => c?.tag && ["terminate", "reject", "accept", "preaccept", "transport", "relaylatency"].includes(c.tag)) ||
                        children[0];

        if (!voipChild) {
            this.#diag("warn", "signaling_child_missing", {
                direction: "incoming",
                stanzaId,
                from: fromJid,
                reason: "no_matching_signaling_child"
            });
            return;
        }

        const incomingCallId = String(voipChild.attrs?.["call-id"] ?? voipChild.attrs?.call_id ?? node.attrs?.["call-id"] ?? node.attrs?.call_id ?? "");
        const callIdForRouting = incomingCallId || activeCallId;

        if (!callIdForRouting) {
            this.#diag("warn", "missing_call_id_rejected", {
                direction: "incoming",
                stanzaId,
                from: fromJid,
                tag: voipChild.tag,
                reason: "missing_call_id"
            });
            return;
        }

        const dedupKey = stanzaId ? `stanza:${stanzaId}` : `call:${callIdForRouting}:${voipChild.tag}`;
        if (this.#processedStanzas.has(dedupKey)) {
            this.#diag("debug", "duplicate_stanza_suppressed", {
                direction: "incoming",
                callId: callIdForRouting,
                stanzaId,
                dedupKey,
                tag: voipChild.tag,
                reason: "already_processed"
            });
            return;
        }
        this.#processedStanzas.set(dedupKey, Date.now());
        if (this.#processedStanzas.size > 200) {
            const now = Date.now();
            for (const [k, ts] of this.#processedStanzas) {
                if (now - ts > 30000) this.#processedStanzas.delete(k);
            }
        }

        this.#diag("info", "incoming_call_stanza_accepted", {
            direction: "incoming",
            callId: callIdForRouting,
            tag: voipChild.tag,
            stanzaId,
            from: fromJid,
            childCount: children.length,
            attrs: summarizeNode(voipChild)?.attrs
        });

        const senderDeviceJid = this.#pickConcreteRouteHint(
            voipChild.attrs?.participant,
            node.attrs?.participant,
            voipChild.attrs?.["call-creator"],
            node.attrs?.from
        ) || String(voipChild.attrs?.participant ?? "") ||
            String(node.attrs?.participant ?? "") ||
            String(voipChild.attrs?.["call-creator"] ?? "") ||
            String(node.attrs?.from ?? "");
        const callbackPeerJid = this.#pickConcreteRouteHint(
            node.attrs?.participant,
            voipChild.attrs?.participant,
            voipChild.attrs?.["call-creator"],
            node.attrs?.from
        ) || String(node.attrs?.from ?? "") || senderDeviceJid;
        const platform = voipChild.attrs?.platform ?? node.attrs?.platform ?? "";
        const appVersion = voipChild.attrs?.version ?? node.attrs?.version ?? "";
        const epochId = voipChild.attrs?.e ?? node.attrs?.e ?? "0";
        const timestamp = voipChild.attrs?.t ?? node.attrs?.t ?? "0";
        const offline = !!(voipChild.attrs?.offline ?? node.attrs?.offline);

        this.#diag("debug", "routing_hints_extracted", {
            direction: "incoming",
            callId: callIdForRouting,
            tag: voipChild.tag,
            senderDeviceJid: sanitizeJid(senderDeviceJid),
            callbackPeerJid: sanitizeJid(callbackPeerJid),
            callerPn: voipChild.attrs?.caller_pn || node.attrs?.caller_pn || undefined,
            callerLid: voipChild.attrs?.caller_lid || node.attrs?.caller_lid || undefined,
            platform,
            appVersion,
            offline
        });

        let usableNode = voipChild;
        const hasEnc = Boolean(getBinaryNodeChild(voipChild, "enc") || getBinaryNodeChild(voipChild, "destination"));
        if (hasEnc) {
            this.#diag("debug", "offer_encryption_detected", {
                direction: "incoming",
                callId: callIdForRouting,
                tag: voipChild.tag,
                hasEncChild: Boolean(getBinaryNodeChild(voipChild, "enc")),
                hasDestChild: Boolean(getBinaryNodeChild(voipChild, "destination"))
            });
            usableNode = await this.#maybeDecryptEnc(voipChild, senderDeviceJid);
        }
        if (usableNode._callKey && callIdForRouting) {
            this.#callKeysById.set(callIdForRouting, usableNode._callKey);
            this.#diag("info", "call_key_cached", {
                direction: "internal",
                callId: callIdForRouting,
                keyLength: usableNode._callKey.length
            });
        }
        const storedPeerJid = callIdForRouting ? this.#incomingCallPeerById.get(callIdForRouting) : undefined;
        let mappedRemoteDeviceJid = callIdForRouting ? this.#remoteDevicePeerByCallId.get(callIdForRouting) : undefined;
        if (callIdForRouting && (callbackPeerJid || senderDeviceJid)) {
            this.#remoteXmppRoutePeerByCallId.set(callIdForRouting, callbackPeerJid || senderDeviceJid);
            const hinted = this.#pickConcreteRouteHint(senderDeviceJid, voipChild.attrs?.["call-creator"], callbackPeerJid);
            if (hinted && hinted !== mappedRemoteDeviceJid) {
                mappedRemoteDeviceJid = hinted;
                this.#remoteDevicePeerByCallId.set(callIdForRouting, hinted);
            }
        }

        const isOffer = usableNode.tag === "offer" || usableNode.tag === "offer_notice";
        const routedPeerJid = isOffer
            ? this.#preferDeviceRouteJid(senderDeviceJid, voipChild.attrs?.["call-creator"], callbackPeerJid, storedPeerJid)
            : this.#preferOrderedRouteJid(mappedRemoteDeviceJid, storedPeerJid, senderDeviceJid, callbackPeerJid);
        if (callIdForRouting && routedPeerJid) {
            this.#incomingCallPeerById.set(callIdForRouting, routedPeerJid);
        }

        this.#diag("info", "peer_route_selected", {
            direction: "internal",
            callId: callIdForRouting,
            isOffer,
            routedPeerJid: sanitizeJid(routedPeerJid)
        });

        if (!usableNode.attrs) usableNode.attrs = {};
        if (isOffer) {
            // WASM's WAWapReader decodes bare LID as domain 0 (@s.whatsapp.net),
            // which causes a fatal domain mismatch in WASM callee validation:
            // "mismatched peer id and creator id, ignore message, peer_id: ...@lid, creator_id: ...@s.whatsapp.net".
            // Explicitly normalizing call-creator to a device-qualified JID forces TAGS.AD_JID (domainType: 1)
            // serialization, ensuring creator_id matches routedPeerJid.
            const creatorCandidate = usableNode.attrs["call-creator"] || routedPeerJid;
            usableNode.attrs["call-creator"] = this.#toCallDeviceJid(creatorCandidate);
        } else if (usableNode.attrs["call-creator"]) {
            usableNode.attrs["call-creator"] = this.#toCallDeviceJid(usableNode.attrs["call-creator"]);
        }

        const b64 = Buffer.from(encodeBinaryNode(usableNode)).toString("base64");

        const tcToken = await this.ensureTcToken(routedPeerJid, callbackPeerJid);
        this.#diag("debug", "tc_token_evaluated", {
            direction: "internal",
            callId: callIdForRouting,
            hasTcToken: Boolean(tcToken?.length),
            routedPeerJid: sanitizeJid(routedPeerJid)
        });

        const targetVoip = this.#getEngineForCall(callIdForRouting) || voip;
        const offerSignalingMsg = isOffer ? {
            payload: b64,
            peerPlatform: Number(platform || 0),
            peerAppVersion: appVersion,
            epochId, timestamp,
            isOffline: offline,
            isOfferNotContact: false,
            peerJid: routedPeerJid,
            tcToken,
        } : null;

        if (isOffer && this.#incomingOfferListener) {
            this.#diag("debug", "dispatching_incoming_offer_listener", {
                direction: "internal",
                callId: callIdForRouting,
                routedPeerJid: sanitizeJid(routedPeerJid)
            });
            try {
                await this.#incomingOfferListener(usableNode, routedPeerJid, callIdForRouting, offerSignalingMsg);
                this.#diag("info", "incoming_offer_listener_completed", {
                    direction: "internal",
                    callId: callIdForRouting
                });
            } catch (err) {
                this.#diag("error", "incoming_offer_listener_failed", {
                    direction: "internal",
                    callId: callIdForRouting,
                    error: err?.message,
                    stack: err?.stack
                });
            }
        }
        if (targetVoip) {
            if (isOffer) {
                if (offerSignalingMsg) {
                    this.#diag("debug", "wasm_engine_offer_dispatched", {
                        direction: "internal",
                        callId: callIdForRouting,
                        routedPeerJid: sanitizeJid(routedPeerJid)
                    });
                    targetVoip.handleSignalingOffer(offerSignalingMsg);
                }
            } else if (usableNode.tag === "ack") {
                this.#diag("debug", "wasm_engine_ack_dispatched", {
                    direction: "internal",
                    callId: callIdForRouting,
                    ackError: usableNode.attrs?.error ?? "0",
                    msgType: usableNode.attrs?.type ?? ""
                });
                targetVoip.handleSignalingAck({
                    payload: b64,
                    ackError: usableNode.attrs?.error ?? "0",
                    msgType: usableNode.attrs?.type ?? "",
                    peerJid: routedPeerJid,
                    extraData: tcToken,
                });
            } else {
                this.#diag("debug", "wasm_engine_message_dispatched", {
                    direction: "internal",
                    callId: callIdForRouting,
                    tag: usableNode.tag
                });
                targetVoip.handleSignalingMessage({
                    payload: b64,
                    peerPlatform: platform,
                    peerAppVersion: appVersion,
                    epochId, timestamp,
                    isOffline: offline,
                    peerJid: routedPeerJid,
                    tcToken,
                });
            }
        } else {
            this.#diag("warn", "wasm_engine_unavailable_for_call", {
                direction: "internal",
                callId: callIdForRouting,
                tag: usableNode.tag
            });
        }
        if (!isOffer && usableNode.tag !== "ack") {
            if (this.#signalingEventListener) {
                this.#diag("info", "signaling_event_listener_dispatched", {
                    direction: "internal",
                    callId: callIdForRouting,
                    tag: usableNode.tag,
                    reason: usableNode.attrs?.reason ?? "",
                    routedPeerJid: sanitizeJid(routedPeerJid)
                });
                this.#signalingEventListener(
                    usableNode.tag,
                    usableNode.attrs?.reason ?? "",
                    callIdForRouting,
                    routedPeerJid
                );
            }
            if (callIdForRouting && (usableNode.tag === "terminate" || usableNode.tag === "reject")) {
                // Skip cleanup for accepted_elsewhere — this device accepted the call, so the engine
                // must remain active for ongoing WASM signaling (relay, transport, etc.)
                const skipCleanup = usableNode.tag === "terminate" &&
                    usableNode.attrs?.reason === "accepted_elsewhere";
                this.#diag("debug", "call_cleanup_evaluated", {
                    direction: "internal",
                    callId: callIdForRouting,
                    tag: usableNode.tag,
                    reason: usableNode.attrs?.reason,
                    skipCleanup
                });
                if (!skipCleanup) {
                    this.cleanupCall(callIdForRouting);
                }
            }
        }
    };
    #doProcessIncomingReceipt = async (node, voip, activeCallId) => {
        const { getAllBinaryNodeChildren, encodeBinaryNode } = this.#baileys;
        const receiptChild = getAllBinaryNodeChildren(node)[0];
        if (!receiptChild)
            return;
        const incomingCallId = String(receiptChild.attrs["call-id"] ?? receiptChild.attrs.call_id ?? "");
        const callIdForRouting = incomingCallId || activeCallId;
        const callbackPeerJid = String(node.attrs.from ?? receiptChild.attrs["call-creator"] ?? "");
        const storedPeerJid = callIdForRouting ? this.#incomingCallPeerById.get(callIdForRouting) : undefined;
        const routedPeerJid = this.#preferOrderedRouteJid(storedPeerJid, callbackPeerJid);
        if (callIdForRouting && routedPeerJid)
            this.#incomingCallPeerById.set(callIdForRouting, routedPeerJid);
        const tcToken = await this.ensureTcToken(routedPeerJid, callbackPeerJid);

        this.#diag("info", "incoming_receipt_received", {
            direction: "incoming",
            callId: callIdForRouting,
            receiptTag: receiptChild.tag,
            routedPeerJid: sanitizeJid(routedPeerJid)
        });

        const targetVoip = this.#getEngineForCall(callIdForRouting) || voip;
        if (targetVoip) {
            targetVoip.handleSignalingReceipt({
                payload: Buffer.from(encodeBinaryNode(node)).toString("base64"),
                peerJid: routedPeerJid,
                tcToken,
            });
        }
        if (this.#signalingEventListener && callIdForRouting) {
            this.#signalingEventListener("receipt", "ringing", callIdForRouting, routedPeerJid);
        }
    };
    #maybeDecryptEnc = async (voipNode, peerJid) => {
        if (!this.#baileys) {
            this.#baileys = await loadBaileys();
        }
        const { getBinaryNodeChild, unpadRandomMax16, proto, jidDecode, jidEncode } = this.#baileys;
        const callId = voipNode.attrs?.["call-id"] || voipNode.attrs?.call_id;
        const rootEnc = getBinaryNodeChild(voipNode, "enc");
        const encNodes = [];
        if (rootEnc && rootEnc.content instanceof Uint8Array) {
            encNodes.push(rootEnc);
        }
        const destination = getBinaryNodeChild(voipNode, "destination");
        if (destination) {
            const destChildren = Array.isArray(destination.content) ? destination.content : [];
            const myLid = String(this.#sock?.authState?.creds?.me?.lid || "").trim();
            const myPn = String(this.#sock?.authState?.creds?.me?.id || "").trim();
            const myDevice = myLid.split(":")[1]?.split("@")[0] || myPn.split(":")[1]?.split("@")[0] || "0";
            const myLidUser = myLid.split(":")[0]?.split("@")[0] || "";
            const myPnUser = myPn.split(":")[0]?.split("@")[0] || "";

            const toNodes = destChildren.filter((c) => c && c.tag === "to");
            const toJids = toNodes.map((child) => String(child.attrs?.jid ?? ""));

            // Match <to> nodes targeting OUR linked device
            let matchedToNodes = toNodes.filter((child) => {
                const toJid = String(child.attrs?.jid ?? "");
                if (!toJid) return false;
                if (toJid === myLid || toJid === myPn) return true;
                const decoded = jidDecode(toJid);
                if (!decoded?.user) return false;
                const dev = String(decoded.device ?? 0);
                const matchesUser = (myLidUser && decoded.user === myLidUser) || (myPnUser && decoded.user === myPnUser);
                return matchesUser && (dev === myDevice || dev === "0" || !myDevice);
            });

            // Fallback: match by user account regardless of device index
            if (matchedToNodes.length === 0) {
                matchedToNodes = toNodes.filter((child) => {
                    const toJid = String(child.attrs?.jid ?? "");
                    const decoded = jidDecode(toJid);
                    return Boolean(decoded?.user && ((myLidUser && decoded.user === myLidUser) || (myPnUser && decoded.user === myPnUser)));
                });
            }

            // Fallback: if no credentials available (e.g. mock test environment), examine all toNodes
            const targetNodes = matchedToNodes.length > 0 ? matchedToNodes : toNodes;
            for (const child of targetNodes) {
                const toEnc = getBinaryNodeChild(child, "enc");
                if (toEnc && toEnc.content instanceof Uint8Array) {
                    encNodes.push(toEnc);
                }
            }

            this.#diag("debug", "destination_nodes_evaluated", {
                callId,
                totalToNodes: toNodes.length,
                matchedToNodes: matchedToNodes.length,
                evaluatedToNodes: targetNodes.length,
                encNodesFound: encNodes.length,
                toJids: toJids.map(sanitizeJid),
                myLid: sanitizeJid(myLid),
                myPn: sanitizeJid(myPn),
                myDevice
            });
        }
        if (encNodes.length === 0) {
            this.#diag("warn", "no_enc_nodes_in_offer", {
                callId,
                reason: "no_matching_enc_nodes_in_root_or_destination"
            });
            return voipNode;
        }

        const creator = String(voipNode.attrs?.["call-creator"] ?? "").trim();
        const callerPnRaw = String(voipNode.attrs?.["caller_pn"] ?? "").trim();
        const participant = String(voipNode.attrs?.participant ?? "").trim();

        // Build candidate set of sender JIDs for Signal decryption
        const candidateSet = new Set();
        const addCandidate = (jid) => {
            if (!jid) return;
            const str = String(jid).trim();
            if (str && str.includes("@")) candidateSet.add(str);
        };

        // 1. Direct sender indicators
        addCandidate(creator);
        addCandidate(peerJid);
        addCandidate(participant);

        // Normalize raw digits caller_pn if provided
        if (callerPnRaw) {
            const normalizedPnJid = callerPnRaw.includes("@") ? callerPnRaw : `${callerPnRaw}@s.whatsapp.net`;
            addCandidate(normalizedPnJid);
            addCandidate(`${callerPnRaw}:0@s.whatsapp.net`);
        }

        // 2. Query LID mapping store bidirectionally
        const lidMapping = this.#sock?.signalRepository?.lidMapping;
        const currentCandidates = [...candidateSet];
        for (const cand of currentCandidates) {
            if (cand.endsWith("@lid")) {
                try {
                    const pn = await lidMapping?.getPNForLID?.(cand);
                    if (pn) addCandidate(pn);
                } catch { }
            } else if (cand.endsWith("@s.whatsapp.net")) {
                try {
                    const lid = await lidMapping?.getLIDForPN?.(cand);
                    if (lid) addCandidate(lid);
                } catch { }
            }
        }

        // 3. Store envelope mapping if both LID creator and caller_pn are present
        if (callerPnRaw && creator && creator.includes("@lid") && lidMapping?.storeLIDPNMappings) {
            try {
                const creatorBare = this.#toBareJid(creator);
                const pnBare = callerPnRaw.includes("@") ? this.#toBareJid(callerPnRaw) : `${callerPnRaw}@s.whatsapp.net`;
                await lidMapping.storeLIDPNMappings([{ lid: creatorBare, pn: pnBare }]);
                this.#diag("debug", "stored_lid_pn_mapping_from_envelope", {
                    callId,
                    lid: sanitizeJid(creatorBare),
                    pn: sanitizeJid(pnBare)
                });
            } catch { }
        }

        // 4. Ensure device variants for candidates
        const baseCandidates = [...candidateSet];
        for (const cand of baseCandidates) {
            const decoded = jidDecode(cand);
            if (decoded?.user && decoded?.server) {
                candidateSet.add(jidEncode(decoded.user, decoded.server, 0));
                candidateSet.add(jidEncode(decoded.user, decoded.server));
            }
        }

        // Prioritize candidates: creator device JID first, then other device-qualified JIDs, then bare JIDs
        const candidates = [...candidateSet].sort((a, b) => {
            if (creator && a === creator) return -1;
            if (creator && b === creator) return 1;
            const aHasDev = a.includes(":") && !a.includes(":0@");
            const bHasDev = b.includes(":") && !b.includes(":0@");
            if (aHasDev && !bHasDev) return -1;
            if (!aHasDev && bHasDev) return 1;
            return 0;
        });

        this.#diag("debug", "call_key_decrypt_started", {
            callId,
            encNodesCount: encNodes.length,
            candidatesCount: candidates.length,
            candidates: candidates.map(sanitizeJid)
        });

        let decryptedSuccessfully = false;
        for (const encNode of encNodes) {
            const type = encNode.attrs?.type;
            if (type !== "pkmsg" && type !== "msg")
                continue;
            for (const jid of candidates) {
                try {
                    const decrypted = await this.#sock.signalRepository.decryptMessage({
                        jid, type, ciphertext: encNode.content,
                    });
                    const parsed = proto.Message.decode(unpadRandomMax16(decrypted));
                    const callKey = parsed.call?.callKey;
                    if (callKey && callKey.length > 0) {
                        const rawKeyBuf = Buffer.isBuffer(callKey) ? callKey : Buffer.from(callKey);
                        encNode.content = rawKeyBuf;
                        voipNode._callKey = rawKeyBuf;
                        if (callId) {
                            this.#callKeysById.set(callId, rawKeyBuf);
                        }
                        if (!rootEnc) {
                            const nodeChildren = Array.isArray(voipNode.content) ? voipNode.content : [];
                            nodeChildren.push({
                                tag: "enc",
                                attrs: { v: "2", type: "msg", count: "0" },
                                content: rawKeyBuf
                            });
                            voipNode.content = nodeChildren;
                        }
                        decryptedSuccessfully = true;
                        this.#diag("info", "call_key_decrypt_succeeded", {
                            callId,
                            winningCandidate: sanitizeJid(jid),
                            keyLength: rawKeyBuf.length,
                            type
                        });
                        return voipNode;
                    }
                }
                catch (decErr) {
                    this.#diag("debug", "call_key_decrypt_candidate_attempt_failed", {
                        callId,
                        candidate: sanitizeJid(jid),
                        type,
                        error: decErr?.message
                    });
                }
            }
        }

        if (!decryptedSuccessfully) {
            this.#diag("error", "call_key_decrypt_failed_all_candidates", {
                callId,
                encNodesCount: encNodes.length,
                candidatesCount: candidates.length,
                candidates: candidates.map(sanitizeJid),
                reason: "all_signal_decryptions_failed"
            });
            voipNode._decryptionFailed = true;
        }

        return voipNode;
    };
    #encryptCallKey = async (targetJid, rawCallKey, count) => {
        const { encodeWAMessage } = this.#baileys;
        const primaryDeviceJid = this.#toPrimaryDeviceJid(targetJid);
        const sessionTargets = primaryDeviceJid && primaryDeviceJid !== targetJid
            ? [primaryDeviceJid, targetJid]
            : [targetJid];
        await this.#ensureSignalSessions(sessionTargets, false);
        const { type, ciphertext } = await this.#sock.signalRepository.encryptMessage({
            jid: targetJid,
            data: encodeWAMessage({ call: { callKey: Buffer.from(rawCallKey) } }),
        });
        return {
            encNode: {
                tag: "enc",
                attrs: { v: "2", type, count: String(count) },
                content: Buffer.from(ciphertext),
            },
            shouldIncludeDeviceIdentity: type === "pkmsg",
        };
    };
    #ensureSignalSessions = async (jids, refresh) => {
        const { parseAndInjectE2ESessions } = this.#baileys;
        const missing = [];
        for (const jid of [...new Set(jids.filter(Boolean))]) {
            const signalId = this.#sock.signalRepository.jidToSignalProtocolAddress(jid);
            const cachedAt = this.#ensuredSignalSessions.get(signalId);
            if (!refresh && cachedAt && Date.now() - cachedAt < SESSION_CACHE_TTL_MS)
                continue;
            if (!refresh) {
                const validation = await this.#sock.signalRepository.validateSession(jid);
                if (validation.exists) {
                    this.#ensuredSignalSessions.set(signalId, Date.now());
                    continue;
                }
            }
            missing.push(jid);
        }
        if (!missing.length)
            return;
        const sessionNode = await this.#sock.query({
            tag: "iq",
            attrs: { xmlns: "encrypt", type: "get", to: S_WHATSAPP_NET },
            content: [{
                    tag: "key", attrs: {},
                    content: missing.map((jid) => ({ tag: "user", attrs: { jid } })),
                }],
        });
        await parseAndInjectE2ESessions(sessionNode, this.#sock.signalRepository);
        for (const jid of missing) {
            this.#ensuredSignalSessions.set(this.#sock.signalRepository.jidToSignalProtocolAddress(jid), Date.now());
        }
    };
    #appendDeviceIdentity = (voipNode) => {
        const { getBinaryNodeChild, encodeSignedDeviceIdentity } = this.#baileys;
        if (getBinaryNodeChild(voipNode, "device-identity"))
            return;
        const account = this.#sock.authState.creds.account;
        if (!account)
            return;
        const children = getNodeChildren(voipNode);
        children.push({
            tag: "device-identity",
            attrs: {},
            content: encodeSignedDeviceIdentity(account, true),
        });
        setNodeChildren(voipNode, children);
    };
    // ─── private — JID utilities ──────────────────────────────────────────────
    #toBareJid = (jid) => {
        const { jidDecode, jidEncode } = this.#baileys;
        const decoded = jidDecode(jid);
        if (!decoded?.user)
            return jid;
        const server = jid.endsWith("@lid") ? "lid" : "s.whatsapp.net";
        return jidEncode(decoded.user, server);
    };
    #toCallDeviceJid = (jid) => {
        const { jidDecode } = this.#baileys;
        const decoded = jidDecode(jid);
        if (!decoded?.user)
            return jid;
        const server = jid.endsWith("@lid") ? "lid" : "s.whatsapp.net";
        const device = decoded.device ?? 0;
        return `${decoded.user}:${device}@${server}`;
    };
    #toPrimaryDeviceJid = (jid) => {
        const { jidDecode, jidEncode } = this.#baileys;
        const decoded = jidDecode(jid);
        if (!decoded?.user)
            return undefined;
        const device = decoded.device;
        if (device == null || device === 0)
            return undefined;
        const server = jid.endsWith("@lid") ? "lid" : "s.whatsapp.net";
        return jidEncode(decoded.user, server);
    };
    #hasConcreteDevice = (jid) => {
        const decoded = this.#baileys.jidDecode(jid);
        return !!decoded?.user && decoded.device != null;
    };
    #preferDeviceRouteJid = (...candidates) => {
        for (const c of candidates) {
            const jid = String(c ?? "").trim();
            if (jid && this.#hasConcreteDevice(jid))
                return jid;
        }
        for (const c of candidates) {
            const jid = String(c ?? "").trim();
            if (jid)
                return this.#toCallDeviceJid(jid);
        }
        return "";
    };
    #preferOrderedRouteJid = (...candidates) => {
        for (const c of candidates) {
            const jid = String(c ?? "").trim();
            if (jid)
                return this.#toCallDeviceJid(jid);
        }
        return "";
    };
    #pickConcreteRouteHint = (...candidates) => {
        for (const c of candidates) {
            const jid = String(c ?? "").trim();
            if (jid && this.#hasConcreteDevice(jid))
                return jid;
        }
        return "";
    };
    #resolveOutboundPeerJid = (callId, wasmPeerJid) => {
        const peerJid = String(wasmPeerJid ?? "").trim();
        if (!peerJid || !callId)
            return peerJid;
        return this.#remoteDevicePeerByCallId.get(callId) ?? peerJid;
    };
    #expandSignalSessionTargets = (jids) => [...new Set(jids.flatMap((jid) => {
            const primary = this.#toPrimaryDeviceJid(jid);
            return primary && primary !== jid ? [primary, jid] : [jid];
        }))];
    #normalizeStartCallPeerList = (jids) => {
        const { jidDecode, jidEncode } = this.#baileys;
        const result = new Set();
        for (const jid of jids) {
            const decoded = jidDecode(jid);
            if (!decoded?.user) {
                result.add(jid);
                continue;
            }
            const server = jid.endsWith("@lid") ? "lid" : "s.whatsapp.net";
            result.add(jidEncode(decoded.user, server));
            if (decoded.device != null && decoded.device > 0) {
                result.add(`${decoded.user}:${decoded.device}@${server}`);
            }
        }
        return [...result].slice(0, 5);
    };
    // ─── private — TC token ───────────────────────────────────────────────────
    #rememberTcToken = (jid, token, timestamp = "") => {
        const bareJid = this.#toBareJid(jid);
        if (!token.length)
            return;
        this.#observedTcTokens.set(bareJid, { token: Buffer.from(token), timestamp });
        const waiters = this.#pendingTcTokenWaiters.get(bareJid);
        if (waiters?.length) {
            this.#pendingTcTokenWaiters.delete(bareJid);
            for (const w of waiters)
                w(Buffer.from(token));
        }
    };
    #getTcToken = async (jid) => {
        const userJid = this.#toBareJid(jid);
        const observed = this.#observedTcTokens.get(userJid)?.token;
        if (observed?.length)
            return Buffer.from(observed);
        try {
            const data = await this.#sock.authState.keys.get("tctoken", [userJid]);
            const token = data[userJid]?.token;
            if (token && token.length > 0) {
                this.#rememberTcToken(userJid, token, data[userJid]?.timestamp);
                return token;
            }
        }
        catch { }
        return undefined;
    };
}

exports.SignalingBridge = SignalingBridge;
