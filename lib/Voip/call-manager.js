"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallManager = exports.parseRelayEndpoints = void 0;

const node_events_1 = require("node:events");
const node_crypto_1 = require("node:crypto");
const types_1 = require("./types");
const call_session_1 = require("./call-session");
const resource_manager_1 = require("./resource-manager");

const DEFAULT_MAX_CONCURRENT_CALLS = 1;
const DEFAULT_PTHREAD_POOL_SIZE = 4;

const toBareJid = (jid) => {
    if (!jid) return "";
    const [user, serverPart] = jid.split("@");
    if (!serverPart) return jid;
    const [bareUser] = user.split(":");
    return `${bareUser}@${serverPart}`;
};

const generateStanzaId = () => (0, node_crypto_1.randomBytes)(16).toString("hex").toUpperCase();

function parseRelayEndpoints(node) {
    const relays = [];
    const participantJids = [];
    const seenParticipants = new Set();
    let uuid = "";
    let selfPid;
    let peerPid;

    if (!node) return { relays, participantJids, uuid };

    const relayNodes = [];
    const scanContainer = (container) => {
        if (!container || typeof container !== "object") return;
        if (container.tag === "relay") {
            relayNodes.push(container);
        }
        if (container.tag === "user" && Array.isArray(container.content)) {
            for (const dev of container.content) {
                const jid = dev?.attrs?.jid;
                if (jid && !seenParticipants.has(jid)) {
                    seenParticipants.add(jid);
                    participantJids.push(jid);
                }
            }
        }
        if (Array.isArray(container.content)) {
            for (const child of container.content) {
                if (!child || typeof child !== "object") continue;
                if (child.tag === "relay") {
                    relayNodes.push(child);
                } else if (child.tag === "user" && Array.isArray(child.content)) {
                    for (const dev of child.content) {
                        const jid = dev?.attrs?.jid;
                        if (jid && !seenParticipants.has(jid)) {
                            seenParticipants.add(jid);
                            participantJids.push(jid);
                        }
                    }
                } else if (child.tag === "offer" && Array.isArray(child.content)) {
                    scanContainer(child);
                }
            }
        }
    };
    scanContainer(node);

    for (const relayNode of relayNodes) {
        uuid = relayNode.attrs?.uuid || uuid;
        if (relayNode.attrs?.self_pid) selfPid = parseInt(relayNode.attrs.self_pid, 10);
        if (relayNode.attrs?.peer_pid) peerPid = parseInt(relayNode.attrs.peer_pid, 10);

        const relayChildren = Array.isArray(relayNode.content) ? relayNode.content : [];
        const tokens = new Map();
        const authTokens = new Map();
        let relayKey = "";

        for (const rc of relayChildren) {
            if (!rc || typeof rc !== "object") continue;
            if (rc.tag === "participant" && rc.attrs?.jid) {
                if (!seenParticipants.has(rc.attrs.jid)) {
                    seenParticipants.add(rc.attrs.jid);
                    participantJids.push(rc.attrs.jid);
                }
            } else if (rc.tag === "key" && rc.content) {
                relayKey = String(rc.content);
            } else if (rc.tag === "token" && rc.content) {
                const id = rc.attrs?.id || "0";
                tokens.set(id, rc.content instanceof Uint8Array ? Buffer.from(rc.content).toString("base64") : String(rc.content));
            } else if (rc.tag === "auth_token" && rc.content) {
                const id = rc.attrs?.id || "0";
                authTokens.set(id, rc.content instanceof Uint8Array ? Buffer.from(rc.content).toString("base64") : String(rc.content));
            }
        }

        for (const rc of relayChildren) {
            if (rc?.tag === "te2" && rc.content instanceof Uint8Array && rc.content.length >= 6) {
                const addrBytes = rc.content;
                const ip = `${addrBytes[0]}.${addrBytes[1]}.${addrBytes[2]}.${addrBytes[3]}`;
                const port = (addrBytes[4] << 8) | addrBytes[5];
                const tokenId = rc.attrs?.token_id || "0";
                const authTokenId = rc.attrs?.auth_token_id || "";
                relays.push({
                    ip,
                    port,
                    token: tokens.get(tokenId) || "",
                    authToken: authTokenId ? authTokens.get(authTokenId) : undefined,
                    key: relayKey,
                    relayId: parseInt(rc.attrs?.relay_id || "0", 10),
                    protocol: rc.attrs?.protocol ? parseInt(rc.attrs.protocol, 10) : 0,
                    c2rRtt: rc.attrs?.c2r_rtt ? parseInt(rc.attrs.c2r_rtt, 10) : undefined,
                    relayName: rc.attrs?.relay_name || "",
                    isFna: rc.attrs?.is_fna === "1",
                    addressBytes: addrBytes
                });
            }
        }
    }

    relays.sort((a, b) => {
        if (!!a.isFna !== !!b.isFna) return a.isFna ? 1 : -1;
        return (a.c2rRtt ?? Infinity) - (b.c2rRtt ?? Infinity);
    });

    return { relays, participantJids, uuid, selfPid, peerPid };
}
exports.parseRelayEndpoints = parseRelayEndpoints;

class CallManager extends node_events_1.EventEmitter {
    sock;
    signaling;
    maxConcurrentCalls = DEFAULT_MAX_CONCURRENT_CALLS;
    onLimit = "reject";
    pthreadPoolSize = DEFAULT_PTHREAD_POOL_SIZE;
    options = {};

    calls = new Map();
    waitingCalls = [];

    #cleanedUp = false;

    constructor(config = {}) {
        super();
        this.sock = config.sock ?? null;
        this.signaling = config.signaling ?? null;
        if (config.maxConcurrentCalls !== undefined) {
            this.maxConcurrentCalls = Number(config.maxConcurrentCalls);
        }
        if (config.onLimit === "queue" || config.onLimit === "reject") {
            this.onLimit = config.onLimit;
        }
        if (config.pthreadPoolSize) {
            this.pthreadPoolSize = config.pthreadPoolSize;
        }
        this.options = config.options || {};
    }

    get activeCallCount() {
        let count = 0;
        for (const session of this.calls.values()) {
            if (!session.ended && !session.isWaiting) {
                count++;
            }
        }
        return count;
    }

    get waitingCallCount() {
        return this.waitingCalls.length;
    }

    getCall = (callId) => this.calls.get(callId);

    getActiveCalls = () => {
        const result = [];
        for (const session of this.calls.values()) {
            if (!session.ended && !session.isWaiting) {
                result.push(session.getSummary());
            }
        }
        return result;
    };

    getWaitingCalls = () => {
        return this.waitingCalls.filter(s => !s.ended).map(s => s.getSummary());
    };

    getMemoryStats = () => {
        const resourceStats = resource_manager_1.VoipResourceManager.getMemoryStats();
        return {
            ...resourceStats,
            activeCalls: this.activeCallCount,
            waitingCalls: this.waitingCallCount,
            totalManagedCalls: this.calls.size
        };
    };

    registerCall = (session) => {
        if (!session?.callId) return;
        session.manager = this;
        this.calls.set(session.callId, session);
        session.on("ended", () => {
            this.cleanupCall(session.callId);
            this.maybeUnblockWaitingCalls();
        });
    };

    handleIncomingOffer = async (node, fallbackPeerJid = "", offerSignalingMsg = null) => {
        if (!node || this.#cleanedUp) return null;

        let offerNode = node;
        let callerJid = node.attrs?.from || fallbackPeerJid;
        if (node.tag === "call") {
            const children = Array.isArray(node.content) ? node.content : [];
            const found = children.find(c => c?.tag === "offer");
            if (found) {
                offerNode = found;
            }
        }

        const callId = offerNode.attrs?.["call-id"] || offerNode.attrs?.call_id;
        if (!callId) return null;

        const existing = this.calls.get(callId);
        if (existing && !existing.ended) {
            if (offerSignalingMsg && !existing._offerSignalingMsg) {
                existing._offerSignalingMsg = offerSignalingMsg;
            }
            if (offerNode._callKey && !existing._callKey) {
                existing._callKey = offerNode._callKey;
            }
            return existing;
        }

        const callCreator = offerNode.attrs?.["call-creator"] || callerJid;
        const callerPn = offerNode.attrs?.caller_pn || "";
        const children = Array.isArray(offerNode.content) ? offerNode.content : [];
        const isVideo = children.some(c => c?.tag === "video");

        const { relays, participantJids } = parseRelayEndpoints(node);

        const atCapacity = this.maxConcurrentCalls > 0 && this.activeCallCount >= this.maxConcurrentCalls;

        if (atCapacity && this.onLimit === "reject") {
            await this.sendRejectStanza(callId, callCreator, callerJid, "busy");
            this.emit("call_rejected_capacity", { callId, peerJid: callerJid, reason: "busy" });
            return null;
        }

        const isWaiting = atCapacity && this.onLimit === "queue";

        const session = new call_session_1.CallSession({
            callId,
            peerJid: callerJid,
            callCreator,
            callerPn,
            direction: types_1.CallDirection.Incoming,
            mediaType: isVideo ? types_1.CallMediaType.Video : types_1.CallMediaType.Audio,
            isVideo,
            isWaiting,
            manager: this,
            options: {
                ...this.options,
                isVideo
            }
        });

        session._relayEndpoints = relays;
        session._participantJids = participantJids;
        session._offerNode = offerNode;
        session._callKey = offerNode._callKey || this.signaling?.getCallKey?.(callId);

        if (!session._callKey && this.signaling?.maybeDecryptEnc) {
            try {
                const decrypted = await this.signaling.maybeDecryptEnc(offerNode, callerJid);
                if (decrypted?._callKey) {
                    session._callKey = decrypted._callKey;
                }
            } catch { }
        }
        if (!session._callKey) {
            session._callKey = this.signaling?.getCallKey?.(callId);
        }

        if (!offerSignalingMsg) {
            try {
                const { encodeBinaryNode } = require("../WABinary");
                const b64 = Buffer.from(encodeBinaryNode(offerNode)).toString("base64");
                const tcToken = await this.signaling?.ensureTcToken?.(callerJid, callCreator);
                offerSignalingMsg = {
                    payload: b64,
                    peerPlatform: Number(offerNode.attrs?.platform || 0),
                    peerAppVersion: String(offerNode.attrs?.version || "0"),
                    epochId: String(offerNode.attrs?.e || "0"),
                    timestamp: String(offerNode.attrs?.t || Math.floor(Date.now() / 1000)),
                    isOffline: !!offerNode.attrs?.offline,
                    isOfferNotContact: false,
                    peerJid: callerJid,
                    tcToken
                };
            } catch { }
        }
        session._offerSignalingMsg = offerSignalingMsg;

        this.calls.set(callId, session);

        session.on("ended", () => {
            this.cleanupCall(callId);
            this.maybeUnblockWaitingCalls();
        });

        if (isWaiting) {
            this.waitingCalls.push(session);
            this.emit("call_waiting", session);
            this.emit("call_incoming", session);
            return session;
        }

        try {
            await this.sendPreacceptStanza(callId, callCreator, callerJid, isVideo);
        } catch { }

        if (relays.length > 0) {
            try {
                await this.sendRelayLatencyStanza(callId, callCreator, callerJid, relays, participantJids);
            } catch { }
        }

        session._confirmRinging();
        this.emit("call_incoming", session);
        return session;
    };

    acceptCall = async (callId, options = {}) => {
        const session = this.calls.get(callId);
        if (!session) {
            throw new Error(`Call session not found: ${callId}`);
        }
        if (!session.canAccept) {
            throw new Error(`Call ${callId} cannot be accepted in state: ${session.status}`);
        }
        if (session.isWaiting) {
            throw new Error(`Cannot accept call ${callId} while waiting in queue.`);
        }

        const audioSource = options.audioSource || options.audio;
        if (audioSource) session._audioSource = audioSource;
        if (options.repeatAudio !== undefined) session._repeatAudio = Boolean(options.repeatAudio);
        const videoSource = options.videoSource || options.video;
        if (videoSource) session._videoSource = videoSource;

        if (!session._offerSignalingMsg && session._offerNode) {
            try {
                const { encodeBinaryNode } = require("../WABinary");
                const b64 = Buffer.from(encodeBinaryNode(session._offerNode)).toString("base64");
                const tcToken = await this.signaling?.ensureTcToken?.(session.peerJid, session.callCreator);
                session._offerSignalingMsg = {
                    payload: b64,
                    peerPlatform: Number(session._offerNode.attrs?.platform || 0),
                    peerAppVersion: String(session._offerNode.attrs?.version || "0"),
                    epochId: String(session._offerNode.attrs?.e || "0"),
                    timestamp: String(session._offerNode.attrs?.t || Math.floor(Date.now() / 1000)),
                    isOffline: !!session._offerNode.attrs?.offline,
                    isOfferNotContact: false,
                    peerJid: session.peerJid,
                    tcToken
                };
            } catch { }
        }
        if (session._offerSignalingMsg && !session._offerSignalingMsg.tcToken) {
            try {
                session._offerSignalingMsg.tcToken = await this.signaling?.ensureTcToken?.(session.peerJid, session.callCreator);
            } catch { }
        }

        if (session._offerSignalingMsg) {
            try {
                session.engine?.handleSignalingOffer?.(session._offerSignalingMsg);
            } catch { }
        }

        if (session._relayEndpoints && session._relayEndpoints.length > 0) {
            try {
                session.relay?.connectRelays?.(session._relayEndpoints);
            } catch { }
        }

        try {
            await this.sendMuteV2Stanza(callId, session.callCreator, session.peerJid);
            await this.sendTransportStanza(callId, session.callCreator, session.peerJid);
            await this.sendAcceptStanza(callId, session.callCreator, session.peerJid, session.isVideo, session._callKey);
        } catch (err) {
            this.emit("error", new Error(`Failed sending accept signaling for ${callId}: ${err.message}`));
            throw err;
        }

        try {
            session.engine?.acceptCall?.(options.isMicEnabled ?? true, options.isCameraEnabled ?? session.isVideo);
        } catch { }

        session._confirmAccepted();
        this.emit("call_accepted", session);
        return session;
    };

    rejectCall = async (callId, reason = "declined") => {
        const session = this.calls.get(callId);
        if (!session) {
            await this.sendRejectStanza(callId, "", "", reason);
            return;
        }

        const waitIndex = this.waitingCalls.indexOf(session);
        if (waitIndex >= 0) {
            this.waitingCalls.splice(waitIndex, 1);
        }

        try {
            await this.sendRejectStanza(callId, session.callCreator, session.peerJid, reason);
        } catch { }

        try {
            session.engine?.rejectCall?.();
        } catch { }

        session._handleRejected(reason);
        this.cleanupCall(callId);
        await this.maybeUnblockWaitingCalls();
    };

    endCall = async (callId, reason = "completed") => {
        const session = this.calls.get(callId);
        if (!session || session.ended) return;

        const waitIndex = this.waitingCalls.indexOf(session);
        if (waitIndex >= 0) {
            this.waitingCalls.splice(waitIndex, 1);
        }

        try {
            await this.sendTerminateStanza(callId, session.callCreator, session.peerJid, reason);
        } catch { }

        try {
            session.engine?.endCall?.(0, true);
        } catch { }

        session._forceEnd(reason);
        this.cleanupCall(callId);
        await this.maybeUnblockWaitingCalls();
    };

    /**
     * Handle an incoming standalone <relay> node to update relay connections.
     */
    handleRelayNode = (node) => {
        const callId = node?.attrs?.["call-id"] || node?.attrs?.call_id;
        const session = callId ? this.calls.get(callId) : null;
        const { relays } = parseRelayEndpoints(node);
        if (session && relays.length > 0) {
            session._relayEndpoints = [...(session._relayEndpoints || []), ...relays];
            if (session.relay) {
                session.relay.connectRelays(relays);
            }
        }
    };

    /**
     * Mute or unmute an active call.
     */
    muteCall = (callId, muted = true) => {
        const session = this.calls.get(callId);
        if (session) {
            session.mute(muted);
            return true;
        }
        return false;
    };

    /**
     * Unmute an active call.
     */
    unmuteCall = (callId) => {
        return this.muteCall(callId, false);
    };

    maybeUnblockWaitingCalls = async () => {
        if (this.#cleanedUp) return;
        while (this.activeCallCount < this.maxConcurrentCalls && this.waitingCalls.length > 0) {
            const nextSession = this.waitingCalls.shift();
            if (!nextSession || nextSession.ended) continue;

            try {
                await this.sendPreacceptStanza(nextSession.callId, nextSession.callCreator, nextSession.peerJid, nextSession.isVideo);
            } catch { }

            nextSession._unblock?.() ?? nextSession._confirmRinging();
            this.emit("call_unblocked", nextSession);
            break;
        }
    };

    cleanupCall = (callId) => {
        const session = this.calls.get(callId);
        if (!session) return;

        this.calls.delete(callId);
        this.signaling?.unregisterEngine?.(callId);
        this.signaling?.cleanupCall?.(callId);

        try { session.stopAudio(); } catch { }
        try { session.stopVideo(); } catch { }
        try { session.relay?.closeAll?.(); } catch { }

        setTimeout(() => {
            try { session.engine?.destroy?.(); } catch { }
        }, 500).unref?.();
    };

    cleanup = () => {
        this.#cleanedUp = true;
        this.waitingCalls = [];
        for (const [callId, session] of this.calls.entries()) {
            try { session.end("destroyed"); } catch { }
            try { session.engine?.destroy?.(); } catch { }
            try { session.relay?.closeAll?.(); } catch { }
        }
        this.calls.clear();
        this.removeAllListeners();
    };

    sendPreacceptStanza = async (callId, callCreator, toJid, isVideo = false) => {
        if (!this.sock) return;
        const CAPABILITY_PREACCEPT = new Uint8Array([0x01, 0x05, 0xff, 0x09, 0xe4, 0xbb, 0x07]);
        const preacceptContent = [
            { tag: "audio", attrs: { enc: "opus", rate: "16000" }, content: undefined }
        ];
        if (isVideo) {
            preacceptContent.push({
                tag: "video",
                attrs: { screen_width: "1080", screen_height: "2400", dec: "H264,H265,AV1", device_orientation: "0" },
                content: undefined
            });
        }
        preacceptContent.push(
            { tag: "encopt", attrs: { keygen: "2" }, content: undefined },
            { tag: "capability", attrs: { ver: "1" }, content: CAPABILITY_PREACCEPT }
        );

        const stanza = {
            tag: "call",
            attrs: { to: toBareJid(toJid || callCreator), id: generateStanzaId() },
            content: [{
                tag: "preaccept",
                attrs: { "call-id": callId, "call-creator": callCreator },
                content: preacceptContent
            }]
        };

        if (this.sock.sendNode) {
            await this.sock.sendNode(stanza);
        } else if (this.sock.query) {
            await this.sock.query(stanza);
        }
    };

    sendRelayLatencyStanza = async (callId, callCreator, toJid, relays, destinationJids = []) => {
        if (!this.sock || !relays || relays.length === 0) return;
        const seenRelays = new Set();
        const teNodes = [];
        for (const relay of relays) {
            const name = relay.relayName || relay.name;
            if (!name || seenRelays.has(name)) continue;
            seenRelays.add(name);
            const encodedLatency = 0x2000000 + (relay.latency || relay.c2rRtt || 0);
            teNodes.push({
                tag: "te",
                attrs: {
                    latency: String(encodedLatency),
                    relay_name: name
                },
                content: relay.addressBytes || undefined
            });
        }
        const destinationContent = (destinationJids || []).map((jid) => ({
            tag: "to",
            attrs: { jid },
            content: undefined
        }));
        const relayLatencyContent = [...teNodes];
        if (destinationContent.length > 0) {
            relayLatencyContent.push({
                tag: "destination",
                attrs: {},
                content: destinationContent
            });
        }
        const stanza = {
            tag: "call",
            attrs: { to: toBareJid(toJid || callCreator), id: generateStanzaId() },
            content: [{
                tag: "relaylatency",
                attrs: { "call-id": callId, "call-creator": callCreator },
                content: relayLatencyContent
            }]
        };
        if (this.sock.sendNode) {
            await this.sock.sendNode(stanza);
        } else if (this.sock.query) {
            await this.sock.query(stanza);
        }
    };

    sendMuteV2Stanza = async (callId, callCreator, toJid) => {
        if (!this.sock) return;
        const target = toJid || callCreator;
        const stanza = {
            tag: "call",
            attrs: { to: target, id: generateStanzaId() },
            content: [{
                tag: "mute_v2",
                attrs: { "call-id": callId, "call-creator": callCreator, "mute-state": "0" },
                content: undefined
            }]
        };
        if (this.sock.sendNode) {
            await this.sock.sendNode(stanza);
        } else if (this.sock.query) {
            await this.sock.query(stanza);
        }
    };

    sendTransportStanza = async (callId, callCreator, toJid) => {
        if (!this.sock) return;
        const target = toJid || callCreator;
        const stanza = {
            tag: "call",
            attrs: { to: target, id: generateStanzaId() },
            content: [{
                tag: "transport",
                attrs: {
                    "call-id": callId,
                    "call-creator": callCreator,
                    "transport-message-type": "1",
                    "p2p-cand-round": "1"
                },
                content: [
                    { tag: "net", attrs: { medium: "2", protocol: "0" }, content: undefined }
                ]
            }]
        };
        if (this.sock.sendNode) {
            await this.sock.sendNode(stanza);
        } else if (this.sock.query) {
            await this.sock.query(stanza);
        }
    };

    sendAcceptStanza = async (callId, callCreator, toJid, isVideo = false, rawCallKey = null) => {
        if (!this.sock) return;
        const acceptContent = [
            { tag: "audio", attrs: { enc: "opus", rate: "16000" }, content: undefined },
            { tag: "net", attrs: { medium: "3" }, content: undefined }
        ];

        let encNode = null;
        let shouldIncludeDeviceIdentity = false;

        let effectiveKey = rawCallKey || this.calls.get(callId)?._callKey || this.signaling?.getCallKey?.(callId);
        if (!effectiveKey && this.calls.get(callId)?._offerNode && this.signaling?.maybeDecryptEnc) {
            try {
                const session = this.calls.get(callId);
                const decrypted = await this.signaling.maybeDecryptEnc(session._offerNode, toJid || callCreator);
                if (decrypted?._callKey) {
                    effectiveKey = decrypted._callKey;
                    session._callKey = effectiveKey;
                }
            } catch { }
        }

        if (effectiveKey && this.signaling?.encryptCallKey) {
            const targets = [callCreator, toJid, this.calls.get(callId)?.callerPn].filter(Boolean);
            for (const target of targets) {
                try {
                    const encrypted = await this.signaling.encryptCallKey(target, effectiveKey, 0);
                    if (encrypted?.encNode) {
                        encNode = encrypted.encNode;
                        shouldIncludeDeviceIdentity = encrypted.shouldIncludeDeviceIdentity;
                        break;
                    }
                } catch { }
            }
        }

        if (!encNode) {
            throw new Error(`Failed to encrypt accept stanza for call ${callId}: call key is missing or could not be encrypted.`);
        }

        acceptContent.push(encNode);
        acceptContent.push({ tag: "encopt", attrs: { keygen: "2" }, content: undefined });

        if (shouldIncludeDeviceIdentity && this.signaling?.getDeviceIdentity) {
            const devId = this.signaling.getDeviceIdentity();
            if (devId) acceptContent.push(devId);
        }

        if (isVideo) {
            acceptContent.push({
                tag: "video",
                attrs: { dec: "H264", device_orientation: "0" },
                content: undefined
            });
        }

        const stanza = {
            tag: "call",
            attrs: {
                to: toBareJid(toJid || callCreator),
                id: generateStanzaId()
            },
            content: [{
                tag: "accept",
                attrs: { "call-id": callId, "call-creator": callCreator },
                content: acceptContent
            }]
        };

        if (this.sock.sendNode) {
            await this.sock.sendNode(stanza);
        } else if (this.sock.query) {
            await this.sock.query(stanza);
        }
    };

    sendRejectStanza = async (callId, callCreator, toJid, reason = "declined") => {
        if (!this.sock) return;
        const stanza = {
            tag: "call",
            attrs: {
                to: toBareJid(toJid || callCreator),
                id: generateStanzaId()
            },
            content: [{
                tag: "reject",
                attrs: {
                    "call-id": callId,
                    "call-creator": callCreator || toJid,
                    count: "0",
                    reason
                },
                content: undefined
            }]
        };
        if (this.sock.sendNode) {
            await this.sock.sendNode(stanza);
        } else if (this.sock.query) {
            await this.sock.query(stanza);
        }
    };

    sendTerminateStanza = async (callId, callCreator, toJid, reason = "completed") => {
        if (!this.sock) return;
        const stanza = {
            tag: "call",
            attrs: {
                to: toBareJid(toJid || callCreator),
                id: generateStanzaId()
            },
            content: [{
                tag: "terminate",
                attrs: {
                    "call-id": callId,
                    "call-creator": callCreator || toJid,
                    reason
                },
                content: undefined
            }]
        };
        if (this.sock.sendNode) {
            await this.sock.sendNode(stanza);
        } else if (this.sock.query) {
            await this.sock.query(stanza);
        }
    };
}
exports.CallManager = CallManager;
