/**
 * VoIP Call Manager.
 *
 * Authoritative manager for incoming and outgoing VoIP call lifecycles.
 * Handles concurrency enforcement (rejection or queueing), signaling dispatch,
 * relay routing, audio/video feeding, and deterministic resource cleanup.
 *
 * @author InnovatorsSoft
 */
import { EventEmitter } from "node:events";
import { randomBytes, createHmac } from "node:crypto";
import { CallDirection, CallMediaType, CallState } from "./types.mjs";
import { CallSession } from "./call-session.mjs";
import { WasmEngine } from "./wasm-engine.mjs";
import { RelayRtcTransport } from "./relay-transport.mjs";
import { VoipResourceManager } from "./resource-manager.mjs";

const DEFAULT_MAX_CONCURRENT_CALLS = 1;
const DEFAULT_PTHREAD_POOL_SIZE = 4;
const SHA256_LEN = 32;

const computeHkdf = (key, salt, info, length) => {
    const effectiveSalt = salt && salt.length > 0 ? Buffer.from(salt) : Buffer.alloc(SHA256_LEN, 0);
    const prk = createHmac("sha256", effectiveSalt).update(key).digest();
    const blocks = Math.ceil(length / SHA256_LEN);
    const okm = Buffer.alloc(blocks * SHA256_LEN);
    let prev = Buffer.alloc(0);
    for (let i = 1; i <= blocks; i += 1) {
        prev = createHmac("sha256", prk)
            .update(prev)
            .update(info)
            .update(Buffer.from([i]))
            .digest();
        prev.copy(okm, (i - 1) * SHA256_LEN);
    }
    return new Uint8Array(okm.buffer, okm.byteOffset, length);
};

const computeHmacSha256 = (data, key) => {
    const result = createHmac("sha256", Buffer.from(key)).update(data).digest();
    return new Uint8Array(result.buffer, result.byteOffset, result.byteLength);
};

const toBareJid = (jid) => {
    if (!jid) return "";
    const [user, serverPart] = jid.split("@");
    if (!serverPart) return jid;
    const [bareUser] = user.split(":");
    return `${bareUser}@${serverPart}`;
};

const generateStanzaId = () => randomBytes(16).toString("hex").toUpperCase();

/**
 * Internal session end reasons -> the `reason` values WhatsApp understands on `<terminate>`.
 * In WhatsApp protocol:
 * - A normal call hangup / natural completion MUST OMIT the `reason` attribute completely.
 *   Sending an unrecognized reason (like "hangup" or "completed") causes the WhatsApp client
 *   to reject/ignore the terminate stanza, leaving the caller stuck in "Reconnecting...".
 * - Non-standard termination reasons ("rejected", "declined", "busy", "timeout", "accepted_elsewhere")
 *   are preserved.
 */
const normalizeTerminateReason = (reason) => {
    if (!reason) return undefined;
    const key = String(reason).trim().toLowerCase();
    if (["completed", "ended", "hangup", "user_ended", "normal", "destroyed", "remote_end"].includes(key)) {
        return undefined;
    }
    if (["rejected", "declined"].includes(key)) {
        return "rejected";
    }
    if (key === "busy") {
        return "busy";
    }
    if (key === "timeout") {
        return "timeout";
    }
    if (key === "accepted_elsewhere") {
        return "accepted_elsewhere";
    }
    return undefined;
};

/** Parse relay endpoints from an offer or relay XML binary node */
export function parseRelayEndpoints(node) {
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

export class CallManager extends EventEmitter {
    sock;
    signaling;
    logger = null;
    maxConcurrentCalls = DEFAULT_MAX_CONCURRENT_CALLS;
    onLimit = "reject"; // "reject" | "queue"
    pthreadPoolSize = DEFAULT_PTHREAD_POOL_SIZE;
    options = {};

    calls = new Map(); // callId -> CallSession
    waitingCalls = []; // CallSession[]

    #cleanedUp = false;

    constructor(config = {}) {
        super();
        this.sock = config.sock ?? null;
        this.signaling = config.signaling ?? null;
        this.logger = config.logger ?? null;
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
        return VoipResourceManager.getMemoryStats({
            activeCalls: this.activeCallCount,
            waitingCalls: this.waitingCallCount,
            totalManagedCalls: this.calls.size
        });
    };

    #log = (level, message, data = {}) => {
        try {
            const fn = this.logger?.[level];
            if (typeof fn === "function") fn.call(this.logger, data, message);
        }
        catch { }
    };

    /**
     * Single handler for every session "ended" event.
     *
     * Guarantees that a locally-driven end always emits `<terminate>` to WhatsApp,
     * even when the session was torn down by a path that bypasses `endCall()`
     * (WASM state -> Idle/Ending, engine failures, ring timeouts, audio exhaustion
     * reached through `_forceEnd`, ...). Without this safety net Baileys drops the
     * call locally while the caller's phone keeps the call alive.
     */
    #onSessionEnded = (session, reason) => {
        if (!session._endSignalSent && !session._peerInitiatedEnd) {
            this.#ensureTerminateSent(session, reason);
            setTimeout(() => {
                this.cleanupCall(session.callId);
                this.maybeUnblockWaitingCalls();
            }, 400).unref?.();
        } else {
            this.cleanupCall(session.callId);
            this.maybeUnblockWaitingCalls();
        }
    };

    /** Resolve the `call-creator` attribute for an outbound terminate stanza. */
    #resolveCallCreator = (session) => {
        if (session?.isIncoming) {
            return session.callCreator || session.peerJid;
        }
        const me = this.sock?.authState?.creds?.me;
        return me?.id || me?.lid || session?.callCreator || "";
    };

    #ensureTerminateSent = (session, reason) => {
        if (!session || session._endSignalSent || session._peerInitiatedEnd) return;
        // sendTerminateStanza claims _endSignalSent synchronously on entry, so
        // concurrent end paths still cannot double-send — no pre-claim needed here
        // (a pre-claim that sticks after a failed send would block every retry).
        this.#log("debug", "baileys: local call end without terminate — sending one now", {
            callId: session.callId,
            reason,
        });
        const creator = this.#resolveCallCreator(session);
        this.sendTerminateStanza(session.callId, creator, session.peerJid, reason, session)
            .catch((err) => {
                this.#log("warn", "baileys: terminate send failed — retrying once", {
                    callId: session.callId,
                    error: err?.message,
                });
                // One delayed retry: the claim was released by the failed send, so
                // re-check the flags before attempting again.
                const timer = setTimeout(() => {
                    if (session._endSignalSent || session._peerInitiatedEnd) return;
                    this.sendTerminateStanza(session.callId, creator, session.peerJid, reason, session)
                        .catch((retryErr) => {
                            this.#log("error", "baileys: terminate retry failed", {
                                callId: session.callId,
                                error: retryErr?.message,
                            });
                        });
                }, 1500);
                if (typeof timer.unref === "function") timer.unref();
            });
    };

    /** Register an externally initiated call (e.g. outgoing call from VoipClient) */
    registerCall = (session) => {
        if (!session?.callId) return;
        session.manager = this;
        this.calls.set(session.callId, session);
        session.on("ended", (reason) => this.#onSessionEnded(session, reason));
    };

    #ensureSessionEngine = async (session, options = {}) => {
        if (!session || session.ended) return null;
        if (session.engine) return session.engine;
        if (session._enginePromise) return session._enginePromise;

        session._enginePromise = (async () => {
            const callId = session.callId;
            const callRelay = new RelayRtcTransport({
                onTransportMessage: (data, ip, port) => {
                    try { session.engine?.handleOnTransportMessage(data, ip, port); } catch { }
                },
                onIceRtt: (rttMs, ip, port) => {
                    try { session.engine?.updateIceRtt(rttMs, ip, port); } catch { }
                }
            });

            const callEngine = new WasmEngine({
                pthreadPoolSize: options.pthreadPoolSize ?? this.pthreadPoolSize,
                callbacks: {
                    onSignalingXmpp: (peerJid, cid, xmlPayload) => this.signaling?.sendSignaling(peerJid, cid || callId, xmlPayload),
                    onCallEvent: (eventType, eventData) => this.#handleCallEvent(eventType, eventData, callId),
                    sendDataToRelay: (data, ip, port) => callRelay.send(data, ip, port),
                    onAudioCaptureInit: (config) => this.#handleAudioCaptureInit(config, callId),
                    onAudioCaptureStart: () => this.#handleAudioCaptureStart(callId),
                    onAudioCaptureStop: () => this.#handleAudioCaptureStop(callId),
                    onAudioPlaybackData: (audioData) => this.#handleAudioPlayback(audioData, callId),
                    onVideoCaptureStart: (data) => this.#handleVideoCaptureStart(data, callId),
                    onVideoCaptureStop: () => this.#handleVideoCaptureStop(callId),
                    cryptoHkdf: computeHkdf,
                    hmacSha256: computeHmacSha256,
                }
            });

            await callEngine.initialize();
            if (session.ended) {
                try { callEngine.destroy(); } catch { }
                return null;
            }
            const selfPnJid = this.sock?.authState?.creds?.me?.id || "";
            const selfLidJid = this.sock?.authState?.creds?.me?.lid || "";
            callEngine.initVoipStack(selfPnJid, toBareJid(selfPnJid), selfLidJid);
            await callEngine.waitForVoipStackReady();
            if (session.ended) {
                try { callEngine.destroy(); } catch { }
                return null;
            }
            try {
                callEngine.updateNetworkMedium(2, 0);
            } catch { }

            session.engine = callEngine;
            session.relay = callRelay;
            this.signaling?.registerEngine(callId, callEngine);

            // Feed offer signaling to engine eagerly if already available
            if (session._offerSignalingMsg) {
                try { session.engine?.handleSignalingOffer(session._offerSignalingMsg); } catch { }
            }

            // Connect relay transport if endpoints exist
            if (session._relayEndpoints && session._relayEndpoints.length > 0) {
                try { session.relay?.connectRelays(session._relayEndpoints); } catch { }
            }

            return callEngine;
        })();

        return session._enginePromise;
    };

    /**
     * Handle an incoming call offer stanza from WhatsApp.
     * Parses the offer, checks concurrency limits, creates a CallSession, and emits "call_incoming".
     */
    handleIncomingOffer = async (node, fallbackPeerJid = "", offerSignalingMsg = null) => {
        if (!node || this.#cleanedUp) return null;

        // Extract inner offer node if wrapped in <call>
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

        // Duplicate check
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

        // Parse relays if present in the offer
        const { relays, participantJids } = parseRelayEndpoints(node);

        const atCapacity = this.maxConcurrentCalls > 0 && this.activeCallCount >= this.maxConcurrentCalls;

        if (atCapacity && this.onLimit === "reject") {
            // Auto-reject call due to capacity
            await this.sendRejectStanza(callId, callCreator, callerJid, "busy");
            this.emit("call_rejected_capacity", { callId, peerJid: callerJid, reason: "busy" });
            return null;
        }

        const isWaiting = atCapacity && this.onLimit === "queue";

        const session = new CallSession({
            callId,
            peerJid: callerJid,
            callCreator,
            callerPn,
            direction: CallDirection.Incoming,
            mediaType: isVideo ? CallMediaType.Video : CallMediaType.Audio,
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
        session._callKey = offerNode._callKey || this.signaling?.getCallKey(callId);

        if (!session._callKey && this.signaling?.maybeDecryptEnc) {
            try {
                const decrypted = await this.signaling.maybeDecryptEnc(offerNode, callerJid);
                if (decrypted?._callKey) {
                    session._callKey = decrypted._callKey;
                }
            } catch { }
        }
        if (!session._callKey) {
            session._callKey = this.signaling?.getCallKey(callId);
        }

        if (!offerSignalingMsg) {
            try {
                const { encodeBinaryNode } = await loadBaileys();
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

        session.on("ended", (reason) => this.#onSessionEnded(session, reason));

        if (isWaiting) {
            this.waitingCalls.push(session);
            this.emit("call_waiting", session);
            this.emit("call_incoming", session);
            return session;
        }

        // Eagerly pre-warm WASM media engine in the background so acceptCall executes instantly on the first ring
        void this.#ensureSessionEngine(session).catch(() => {});

        // Send preaccept stanza to remote caller to indicate ringing & codec compatibility
        try {
            await this.sendPreacceptStanza(callId, callCreator, callerJid, isVideo);
        } catch { }

        // Send relay latency stanza to satisfy WhatsApp relay election
        if (relays.length > 0) {
            try {
                await this.sendRelayLatencyStanza(callId, callCreator, callerJid, relays, participantJids);
            } catch { }
        }

        session._confirmRinging();
        this.emit("call_incoming", session);
        return session;
    };

    /**
     * Accept (answer) an incoming call.
     */
    acceptCall = async (callId, options = {}) => {
        const session = this.calls.get(callId);
        if (!session) {
            throw new Error(`Call session not found: ${callId}`);
        }
        if (session.ended) {
            throw new Error(`Cannot accept call ${callId}: call has already ended.`);
        }
        if (!session.canAccept) {
            throw new Error(`Call ${callId} cannot be accepted in state: ${session.status}`);
        }
        if (session.isWaiting) {
            throw new Error(`Cannot accept call ${callId} while waiting in queue.`);
        }

        // Eagerly mark accepted NOW — before any async awaits — so that concurrent
        // `accepted_elsewhere` terminates that WhatsApp echoes back during the stanza
        // handshake don't kill this session while we are still in the async setup.
        session._confirmAccepted();

        if (!session.engine) {
            await this.#ensureSessionEngine(session, options);
        }

        if (session.ended) {
            return session;
        }

        // Apply media options
        const audioSource = options.audioSource || options.audio;
        if (audioSource) session._audioSource = audioSource;
        if (options.repeatAudio !== undefined) session._repeatAudio = Boolean(options.repeatAudio);
        const videoSource = options.videoSource || options.video;
        if (videoSource) session._videoSource = videoSource;

        // Feed incoming offer signaling into WASM engine
        if (!session._offerSignalingMsg && session._offerNode) {
            try {
                const { encodeBinaryNode } = await loadBaileys();
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
                session.engine?.handleSignalingOffer(session._offerSignalingMsg);
            } catch { }
        }

        // Connect relay transport if endpoints exist
        if (session._relayEndpoints && session._relayEndpoints.length > 0) {
            try {
                session.relay?.connectRelays(session._relayEndpoints);
            } catch { }
        }

        // Send protocol acceptance stanzas
        if (session.ended) {
            return session;
        }
        try {
            await this.sendMuteV2Stanza(callId, session.callCreator, session.peerJid);
            await this.sendTransportStanza(callId, session.callCreator, session.peerJid);
        } catch (err) {
            this.emit("error", new Error(`Failed sending accept signaling for ${callId}: ${err.message}`));
            throw err;
        }

        if (session.ended) {
            return session;
        }

        // Ordering matters on the wire: our raw <accept> must be the FIRST accept
        // signal that reaches the caller's phone (proven order from HEAD). If the
        // WASM engine accepts first, its own accept (routed through signaling.mjs to
        // the caller's DEVICE jid) arrives before ours; the follow-up raw <accept>
        // (re-encrypted enc, count=0) then conflicts with it and the caller's phone
        // never settles out of the ringing state.
        // Start the media engine right AFTER our accept so the caller's phone flips
        // to "answered" (accept stanza) with media already spinning up — not after
        // the accepted_elsewhere fan-out like the original code.
        try {
            await this.sendAcceptStanza(callId, session.callCreator, session.peerJid, session.isVideo, session._callKey);
        } catch (err) {
            // The accept never reached the peer — the engine has not accepted yet
            // (it runs after this stanza), so there is nothing to roll back.
            this.emit("error", new Error(`Failed sending accept signaling for ${callId}: ${err.message}`));
            throw err;
        }
        this.#log("debug", "baileys: accept signaling sent", { callId });

        if (session.ended) {
            return session;
        }

        // Start the WASM media path now that the peer has our accept on the wire.
        this.#log("debug", "baileys: starting media engine after accept signaling", { callId });
        try {
            session.engine?.acceptCall(options.isMicEnabled ?? true, options.isCameraEnabled ?? session.isVideo);
        } catch { }

        // Fan out accepted_elsewhere to all other linked devices that also received this call.
        // WhatsApp's server-side echo is too slow — we send it explicitly so the phone drops
        // the call immediately and the media relay routes audio exclusively to Baileys.
        await this.#notifyAcceptedElsewhere(session);

        session._confirmAccepted();
        this.emit("call_accepted", session);

        return session;
    };

    /**
     * Reject an incoming or ringing call.
     */
    rejectCall = async (callId, reason = "declined") => {
        const session = this.calls.get(callId);
        if (!session) {
            // Send standalone rejection if call creator or peer is known from cache or arguments
            await this.sendRejectStanza(callId, "", "", reason);
            return;
        }

        // Remove from waiting queue if queued
        const waitIndex = this.waitingCalls.indexOf(session);
        if (waitIndex >= 0) {
            this.waitingCalls.splice(waitIndex, 1);
        }

        try {
            await this.sendRejectStanza(callId, session.callCreator, session.peerJid, reason);
            session._endSignalSent = true;
        } catch { }

        try {
            session.engine?.rejectCall();
        } catch { }

        session._handleRejected(reason);
        this.cleanupCall(callId);
        await this.maybeUnblockWaitingCalls();
    };

    /**
     * Terminate / hang up an active call.
     */
    endCall = async (callId, reason = "completed") => {
        const session = this.calls.get(callId);
        if (!session || session.ended) return;

        // Remove from waiting queue if queued
        const waitIndex = this.waitingCalls.indexOf(session);
        if (waitIndex >= 0) {
            this.waitingCalls.splice(waitIndex, 1);
        }

        this.#log("debug", "baileys: ending call", { callId, reason });
        try {
            await this.sendTerminateStanza(callId, this.#resolveCallCreator(session), session.peerJid, reason, session);
        } catch (err) {
            this.#log("warn", "baileys: failed to send terminate stanza", { callId, reason, err: String(err?.message || err) });
        }

        try {
            // sendTerminate=true: the WASM also emits its own terminate (different
            // addressing/reason path). Redundant terminates are deduplicated by the
            // peer on call-id, and this keeps a working fallback if ours is dropped.
            session.engine?.endCall(0, true);
        } catch { }

        // Graceful delay: allow the terminate stanza to reach WhatsApp server & peer
        // before tearing down the relay sockets and session
        await new Promise((resolve) => setTimeout(resolve, 400));

        session._forceEnd(reason);
        this.cleanupCall(callId);
        await this.maybeUnblockWaitingCalls();
    };

    /**
     * Handle incoming terminate/reject received from peer or WhatsApp server.
     */
    handleIncomingTerminate = (callId, reason = "remote_end") => {
        const session = this.calls.get(callId);
        if (!session || session.ended) return;

        this.#log("debug", "baileys: handle incoming terminate", { callId, reason, status: session.status });

        // When WhatsApp accepts a call on this device, it sends accepted_elsewhere terminates
        // to all other linked devices. If we receive one while already accepted/connected/streaming,
        // it is a benign multi-device notification — do NOT kill the active call.
        const acceptedStatuses = ["accepted", "connected", "audio_ready", "streaming"];
        if (reason === "accepted_elsewhere" && acceptedStatuses.includes(session.status)) {
            return;
        }

        const waitIndex = this.waitingCalls.indexOf(session);
        if (waitIndex >= 0) {
            this.waitingCalls.splice(waitIndex, 1);
        }

        // The end signal came from the peer/server — never echo a terminate back.
        session._peerInitiatedEnd = true;

        try {
            session.engine?.endCall(0, true);
        } catch { }

        session._forceEnd(reason);
        this.cleanupCall(callId);
        this.maybeUnblockWaitingCalls();
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

    /**
     * Promote the next waiting call from the queue when an active call ends.
     */
    maybeUnblockWaitingCalls = async () => {
        if (this.#cleanedUp) return;
        while (this.activeCallCount < this.maxConcurrentCalls && this.waitingCalls.length > 0) {
            const nextSession = this.waitingCalls.shift();
            if (!nextSession || nextSession.ended) continue;

            // Transition from waiting to incoming ringing
            try {
                await this.sendPreacceptStanza(nextSession.callId, nextSession.callCreator, nextSession.peerJid, nextSession.isVideo);
            } catch { }

            nextSession._unblock?.() ?? nextSession._confirmRinging();
            this.emit("call_unblocked", nextSession);
            break;
        }
    };

    /**
     * Clean up a single call session and free all its allocated resources.
     */
    cleanupCall = (callId) => {
        const session = this.calls.get(callId);
        if (!session) return;

        this.calls.delete(callId);
        this.signaling?.unregisterEngine(callId);
        this.signaling?.cleanupCall(callId);

        try { session.stopAudio(); } catch { }
        try { session.stopVideo(); } catch { }
        try { session.relay?.closeAll(); } catch { }

        setTimeout(() => {
            try { session.engine?.destroy(); } catch { }
        }, 500).unref?.();
    };

    /**
     * Clean up all calls and release all resources.
     */
    cleanup = () => {
        this.#cleanedUp = true;
        this.waitingCalls = [];
        for (const [callId, session] of this.calls.entries()) {
            try { session.end("destroyed"); } catch { }
            try { session.engine?.destroy(); } catch { }
            try { session.relay?.closeAll(); } catch { }
        }
        this.calls.clear();
        this.removeAllListeners();
    };

    // ─── Signaling Stanza Senders ─────────────────────────────────────────────

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

        const target = toJid || callCreator;
        const stanza = {
            tag: "call",
            attrs: { to: target, id: generateStanzaId() },
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

        let effectiveKey = rawCallKey || this.calls.get(callId)?._callKey || this.signaling?.getCallKey(callId);
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
            const targets = [toJid, callCreator, this.calls.get(callId)?.callerPn].filter(Boolean);
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

        const stanzaId = generateStanzaId();
        const stanza = {
            tag: "call",
            attrs: {
                // Keep the caller's DEVICE jid (":N@…") like preaccept/transport/mute/
                // terminate — a bare address never registers on the caller's phone.
                to: toJid || toBareJid(callCreator),
                id: stanzaId
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

        // Pipe server ack to WASM engine for fast relay confirmation
        if (this.sock?.waitForMessage) {
            (async () => {
                try {
                    const ackNode = await this.sock.waitForMessage(stanzaId, 5000);
                    if (ackNode) {
                        const { encodeBinaryNode } = await loadBaileys();
                        const ackPayload = Buffer.from(encodeBinaryNode(ackNode)).toString("base64");
                        const session = this.calls.get(callId);
                        const tcToken = await this.signaling?.ensureTcToken?.(toJid, callCreator);
                        session?.engine?.handleSignalingAck?.({
                            payload: ackPayload,
                            ackError: ackNode.attrs?.error ?? "0",
                            msgType: "accept",
                            peerJid: toJid || callCreator,
                            extraData: tcToken
                        });
                    }
                } catch { }
            })();
        }
    };

    sendRejectStanza = async (callId, callCreator, toJid, reason = "declined") => {
        if (!this.sock) return;
        const stanza = {
            tag: "call",
            attrs: {
                // Device jid like accept/terminate — bare never reaches the phone.
                to: toJid || toBareJid(callCreator),
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

    sendTerminateStanza = async (callId, callCreator, toJid, reason = "completed", session = null) => {
        if (!this.sock) return;
        const targetSession = session || this.calls.get(callId) || null;
        // Mark before the send so an "ended" fired mid-send cannot duplicate it.
        if (targetSession) targetSession._endSignalSent = true;

        const effectiveCreator = callCreator || targetSession?.callCreator || (toJid ? toBareJid(toJid) : "");
        const attrs = {
            "call-id": callId,
            "call-creator": effectiveCreator,
        };
        const normalizedReason = normalizeTerminateReason(reason);
        if (normalizedReason) {
            attrs.reason = normalizedReason;
        }

        if (targetSession?.connectedAt) {
            const durationMs = Math.max(0, Date.now() - targetSession.connectedAt);
            attrs.duration = String(durationMs);
            attrs.audio_duration = String(durationMs);
        }

        const target = toJid || toBareJid(callCreator);
        const stanza = {
            tag: "call",
            attrs: { to: target, id: generateStanzaId() },
            content: [{
                tag: "terminate",
                attrs,
                content: undefined
            }]
        };
        if (this.sock.sendNode) {
            try {
                await this.sock.sendNode(stanza);
            } catch (err) {
                if (targetSession) targetSession._endSignalSent = false;
                throw err;
            }
        } else if (this.sock.query) {
            try {
                await this.sock.query(stanza);
            } catch (err) {
                if (targetSession) targetSession._endSignalSent = false;
                throw err;
            }
        }

        this.#log("debug", "baileys: terminate stanza sent", {
            callId,
            to: target,
            reason: attrs.reason,
            duration: attrs.duration,
        });
        this.emit("call_terminate_sent", {
            callId,
            to: target,
            reason: attrs.reason,
            duration: attrs.duration,
        });
    };

    // ─── Multi-device Call Preemption ─────────────────────────────────────────

    /**
     * After Baileys accepts a call, explicitly send `<terminate reason="accepted_elsewhere">`
     * to every other device JID that also received the call offer (e.g. the primary phone).
     *
     * WhatsApp server sends this automatically, but too slowly — the phone's ringing UI stays
     * active, the phone answers the call, and its ICE path wins over Baileys. By sending this
     * ourselves immediately after `sendAcceptStanza`, we force the phone to drop out of the
     * call before it can claim the media relay.
     *
     * Only targets OTHER devices of the callee (same base JID as Baileys, but different device
     * suffix). Never targets the caller JID.
     */
    #notifyAcceptedElsewhere = async (session) => {
        // Disabled: In WhatsApp VoIP protocol, callee devices do not send
        // <terminate reason="accepted_elsewhere"> to other devices. The WhatsApp server
        // natively dismisses other devices once <accept> is processed. Sending it from
        // the callee risks the server treating the call as terminated.
        return;
    };

    // ─── WASM Engine Callbacks ────────────────────────────────────────────────

    #handleCallEvent = (eventType, eventData, engineCallId) => {
        if (eventType === 16 && eventData) {
            try {
                const parsed = JSON.parse(eventData);
                const info = parsed.call_info ?? parsed.callInfo ?? {};
                const callState = Number(info.call_state ?? info.callState ?? 0);
                const callId = info.call_id ?? info.callId ?? parsed.call_id ?? parsed.callId ?? engineCallId;
                const session = this.calls.get(callId);
                if (session) {
                    session._updateState(callState);
                    if (callState === 6 && !session.audioFeeder && session._audioSource && session._audioSource !== "silence") {
                        this.#handleAudioCaptureStart(callId);
                    }
                }
            } catch { }
        } else if (eventType === 156 && eventData) {
            try {
                const update = JSON.parse(eventData);
                const session = engineCallId ? this.calls.get(engineCallId) : null;
                if (session?.relay) {
                    session.relay.updateRelayList(update);
                }
            } catch { }
        } else if (eventType === 2) {
            try {
                const parsed = JSON.parse(eventData || "{}");
                const callId = parsed.call_id ?? parsed.callId ?? engineCallId;
                const session = callId ? this.calls.get(callId) : null;
                if (session) {
                    // Don't tear down an already-accepted/streaming call via a generic WASM end event.
                    const activeStatuses = ["accepted", "connected", "audio_ready", "streaming"];
                    if (!activeStatuses.includes(session.status)) {
                        this.#log("debug", "baileys: wasm event 2 killing call", { callId, status: session.status });
                        session._forceEnd("remote_end");
                    }
                }
            } catch { }
        }
    };

    #handleAudioCaptureInit = (config, callId) => {
        const session = this.calls.get(callId);
        if (session) {
            session._captureSampleRate = config.sampleRate || 16000;
            session._captureChannels = config.channels || 1;
            session._captureFramesPerChunk = config.framesPerChunk || 320;
            const chunkSamples = session._captureFramesPerChunk * session._captureChannels;
            session._captureChunkBytes = chunkSamples * Float32Array.BYTES_PER_ELEMENT;
            if (!session._capturePtr && session.engine) {
                session._capturePtr = session.engine.malloc(session._captureChunkBytes);
            }
        }
    };

    #handleAudioCaptureStart = (callId) => {
        const session = this.calls.get(callId);
        if (session && !session.audioFeeder && session.engine) {
            this.#log("debug", "baileys: audio capture started (feeding call audio)", { callId });
            const sampleRate = session._captureSampleRate || 16000;
            const channels = session._captureChannels || 1;
            const framesPerChunk = session._captureFramesPerChunk || 320;
            const chunkSamples = framesPerChunk * channels;
            const chunkBytes = chunkSamples * Float32Array.BYTES_PER_ELEMENT;
            if (!session._capturePtr) {
                try {
                    session._capturePtr = session.engine.malloc(chunkBytes);
                } catch { }
            }
            session.startAudio(
                sampleRate,
                channels,
                framesPerChunk,
                (chunk) => {
                    if (session.engine && session._capturePtr && !session.ended) {
                        session.engine.sendAudioData(chunk, session._capturePtr);
                    }
                }
            );
        }
    };

    #handleAudioCaptureStop = (callId) => {
        const session = this.calls.get(callId);
        if (session) {
            session.stopAudio();
            if (session.engine && session._capturePtr) {
                try { session.engine.free(session._capturePtr); } catch { }
                session._capturePtr = 0;
            }
        }
    };

    #handleAudioPlayback = (audioData, callId) => {
        const session = this.calls.get(callId);
        if (session) {
            session._emitAudio(audioData);
        }
    };

    #handleVideoCaptureStart = (data, callId) => {
        const session = this.calls.get(callId);
        if (session && !session.videoFeeder && session._videoSource && session.engine) {
            session.startVideo((frameBuf, width, height, fps) => {
                if (session.engine && !session.ended) {
                    session.engine.sendVideoFrame(frameBuf, width, height, fps, 1, session._videoOrientation);
                }
            });
        }
    };

    #handleVideoCaptureStop = (callId) => {
        const session = this.calls.get(callId);
        session?.stopVideo();
    };
}
