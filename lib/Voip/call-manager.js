"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallManager = exports.parseRelayEndpoints = void 0;

const node_events_1 = require("node:events");
const node_crypto_1 = require("node:crypto");
const types_1 = require("./types");
const call_session_1 = require("./call-session");
const resource_manager_1 = require("./resource-manager");
const { voipDiagnostics, sanitizeJid, summarizeNode } = require("./diagnostics.js");

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
                relayKey = (Buffer.isBuffer(rc.content) || rc.content instanceof Uint8Array)
                    ? Buffer.from(rc.content)
                    : rc.content;
            } else if (rc.tag === "token" && rc.content) {
                const id = rc.attrs?.id || "0";
                tokens.set(id, (Buffer.isBuffer(rc.content) || rc.content instanceof Uint8Array)
                    ? Buffer.from(rc.content)
                    : rc.content);
            } else if (rc.tag === "auth_token" && rc.content) {
                const id = rc.attrs?.id || "0";
                authTokens.set(id, (Buffer.isBuffer(rc.content) || rc.content instanceof Uint8Array)
                    ? Buffer.from(rc.content)
                    : rc.content);
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
    logger = null;
    maxConcurrentCalls = DEFAULT_MAX_CONCURRENT_CALLS;
    onLimit = "reject";
    pthreadPoolSize = DEFAULT_PTHREAD_POOL_SIZE;
    options = {};

    calls = new Map();
    waitingCalls = [];

    #pendingOffers = new Map();
    #acceptingCalls = new Map();
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
        return resource_manager_1.VoipResourceManager.getMemoryStats({
            activeCalls: this.activeCallCount,
            waitingCalls: this.waitingCallCount,
            totalManagedCalls: this.calls.size
        });
    };

    #diag = (level, event, details = {}) => {
        try {
            const callId = details.callId;
            const jid = details.peerJid || details.jid || details.to || details.from || details.callCreator;
            const direction = details.direction || "internal";
            voipDiagnostics.log({
                level,
                component: "CallManager",
                event,
                direction,
                callId,
                jid,
                tags: details.tags || (details.tag ? [details.tag] : undefined),
                state: details.state || details.status,
                durationMs: details.durationMs,
                error: details.error,
                data: details
            });
        } catch { }
    };

    #log = (level, message, data = {}) => {
        try {
            const fn = this.logger?.[level];
            if (typeof fn === "function") fn.call(this.logger, data, message);
            const event = String(message).replace(/^baileys:\s*/i, "").replace(/[^a-zA-Z0-9_]+/g, "_").toLowerCase();
            this.#diag(level, event, data);
        }
        catch { }
    };

    /**
     * Single handler for every session "ended" event.
     *
     * Guarantees that a locally-driven end always emits `<terminate>` to WhatsApp,
     * even when the session was torn down by a path that bypasses `endCall()`.
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

    registerCall = (session) => {
        if (!session?.callId) return;
        session.manager = this;
        this.calls.set(session.callId, session);
        session.on("ended", (reason) => this.#onSessionEnded(session, reason));
    };

    handleIncomingOffer = async (node, fallbackPeerJid = "", offerSignalingMsg = null) => {
        if (!node || this.#cleanedUp) return null;

        let offerNode = node;
        let callerJid = node.attrs?.from || fallbackPeerJid;
        if (node.tag === "call") {
            const children = Array.isArray(node.content) ? node.content : [];
            const found = children.find(c => c?.tag === "offer" || c?.tag === "offer_notice");
            if (found) {
                offerNode = found;
            }
        }

        this.#diag("debug", "incoming_offer_node_received", {
            direction: "incoming",
            tag: node?.tag,
            from: sanitizeJid(callerJid)
        });

        const callId = offerNode.attrs?.["call-id"] || offerNode.attrs?.call_id || node.attrs?.["call-id"] || node.attrs?.call_id;
        if (!callId) {
            this.#diag("warn", "incoming_offer_missing_call_id", {
                direction: "incoming",
                tag: node?.tag,
                offerTag: offerNode?.tag,
                from: sanitizeJid(node?.attrs?.from)
            });
            this.#log("warn", "baileys: rejected malformed incoming call offer: missing call-id", {
                tag: node?.tag,
                offerTag: offerNode?.tag,
                from: node?.attrs?.from
            });
            return null;
        }

        // 1. If offer processing for this callId is already in-flight, await and return that session
        const inFlight = this.#pendingOffers.get(callId);
        if (inFlight) {
            this.#diag("debug", "incoming_offer_in_flight_joined", { direction: "incoming", callId });
            this.#log("debug", "baileys: duplicate offer while offer creation in flight, awaiting pending offer", { callId });
            const session = await inFlight;
            if (session && !session.ended) {
                if (offerSignalingMsg && !session._offerSignalingMsg) {
                    session._offerSignalingMsg = offerSignalingMsg;
                }
                if (session._offerSignalingMsg && !session._offerFedToEngine) {
                    try {
                        session.engine?.handleSignalingOffer?.(session._offerSignalingMsg);
                        session._offerFedToEngine = true;
                    } catch { }
                }
                if (offerNode._callKey && !session._callKey) {
                    session._callKey = offerNode._callKey;
                }
            }
            return session;
        }

        // 2. Duplicate check: if session already exists, update properties and return (do NOT re-emit call_incoming!)
        const existing = this.calls.get(callId);
        if (existing && !existing.ended) {
            this.#diag("debug", "incoming_offer_duplicate_for_existing_call", { direction: "incoming", callId });
            this.#log("debug", "baileys: duplicate offer for existing active call, returning existing session", { callId });
            if (offerSignalingMsg && !existing._offerSignalingMsg) {
                existing._offerSignalingMsg = offerSignalingMsg;
            }
            if (existing._offerSignalingMsg && !existing._offerFedToEngine) {
                try {
                    existing.engine?.handleSignalingOffer?.(existing._offerSignalingMsg);
                    existing._offerFedToEngine = true;
                } catch { }
            }
            if (offerNode._callKey && !existing._callKey) {
                existing._callKey = offerNode._callKey;
            }
            return existing;
        }

        const offerPromise = (async () => {
            try {
                const hasConcreteDevice = (jid) => Boolean(String(jid || "").match(/^[^:@]+:\d+@[^@]+$/));
                const pickDeviceJid = (...candidates) => {
                    for (const c of candidates) {
                        const jid = String(c ?? "").trim();
                        if (jid && hasConcreteDevice(jid)) return jid;
                    }
                    return "";
                };

                const { relays, participantJids } = parseRelayEndpoints(node);

                const callCreatorRaw = offerNode.attrs?.["call-creator"] || "";
                const toCallDeviceJid = (jid) => {
                    if (!jid) return "";
                    const str = String(jid).trim();
                    if (!str) return "";
                    if (str.includes(":")) return str;
                    const atIdx = str.indexOf("@");
                    if (atIdx === -1) return `${str}:0`;
                    return `${str.slice(0, atIdx)}:0${str.slice(atIdx)}`;
                };

                const rawCallerDevice = pickDeviceJid(
                    callCreatorRaw,
                    offerNode.attrs?.participant,
                    node.attrs?.participant,
                    ...(participantJids || []),
                    fallbackPeerJid,
                    callerJid
                ) || callCreatorRaw || fallbackPeerJid || callerJid;

                const callerDeviceJid = toCallDeviceJid(rawCallerDevice);
                const callerBareJid = toBareJid(rawCallerDevice || callerJid);
                const callCreator = callCreatorRaw || rawCallerDevice || callerJid;
                const effectiveCallerJid = rawCallerDevice || fallbackPeerJid || callerJid;
                if (!offerNode.attrs) offerNode.attrs = {};
                offerNode.attrs["call-creator"] = toCallDeviceJid(offerNode.attrs["call-creator"] || callerDeviceJid);
                const callerPn = offerNode.attrs?.caller_pn || "";
                const children = Array.isArray(offerNode.content) ? offerNode.content : [];
                const isVideo = children.some(c => c?.tag === "video");

                const atCapacity = this.maxConcurrentCalls > 0 && this.activeCallCount >= this.maxConcurrentCalls;

                if (atCapacity && this.onLimit === "reject") {
                    this.#diag("warn", "incoming_offer_capacity_rejected", {
                        direction: "internal",
                        callId,
                        reason: "busy",
                        activeCalls: this.activeCallCount,
                        max: this.maxConcurrentCalls
                    });
                    await this.sendRejectStanza(callId, callCreator, effectiveCallerJid, "busy");
                    this.emit("call_rejected_capacity", { callId, peerJid: effectiveCallerJid, reason: "busy" });
                    return null;
                }

                const isWaiting = atCapacity && this.onLimit === "queue";
                if (isWaiting) {
                    this.#diag("info", "incoming_offer_capacity_queued", {
                        direction: "internal",
                        callId,
                        activeCalls: this.activeCallCount,
                        max: this.maxConcurrentCalls
                    });
                }

                const session = new call_session_1.CallSession({
                    callId,
                    peerJid: effectiveCallerJid,
                    peerDeviceJid: callerDeviceJid,
                    peerBareJid: callerBareJid,
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

                // Register session SYNCHRONOUSLY before any async operations so subsequent lookups resolve to it
                this.calls.set(callId, session);
                session.on("ended", (reason) => this.#onSessionEnded(session, reason));

                this.#diag("info", "incoming_offer_session_created", {
                    direction: "internal",
                    callId,
                    peerJid: sanitizeJid(effectiveCallerJid),
                    isVideo,
                    isWaiting
                });

                const hasEnc = Boolean(
                    (offerNode.content && Array.isArray(offerNode.content) && offerNode.content.some(c => c?.tag === "enc" || c?.tag === "destination"))
                );

                if (!session._callKey && this.signaling?.maybeDecryptEnc) {
                    try {
                        const decrypted = await this.signaling.maybeDecryptEnc(offerNode, effectiveCallerJid);
                        if (decrypted?._callKey) {
                            session._callKey = decrypted._callKey;
                            this.signaling?.storeCallKey?.(callId, session._callKey);
                        } else if (decrypted?._decryptionFailed) {
                            session._decryptionFailed = true;
                        }
                    } catch (decErr) {
                        this.#diag("warn", "incoming_offer_decrypt_exception", { callId, error: decErr?.message });
                        this.#log("warn", "baileys: error invoking maybeDecryptEnc", { callId, err: decErr?.message });
                        session._decryptionFailed = true;
                    }
                }
                if (!session._callKey) {
                    session._callKey = this.signaling?.getCallKey?.(callId);
                }
                if (!session._callKey) {
                    if (hasEnc || offerNode._decryptionFailed || session._decryptionFailed) {
                        session._decryptionFailed = true;
                        this.#diag("warn", "incoming_offer_call_key_missing_encrypted", {
                            callId,
                            hasEnc,
                            offerDecryptionFailed: Boolean(offerNode._decryptionFailed),
                            sessionDecryptionFailed: Boolean(session._decryptionFailed)
                        });
                        this.#log("warn", "baileys: encrypted offer call key could not be decrypted; missing cryptographic material", { callId });
                    } else {
                        // Unencrypted offer without <enc> or <destination>: allow generating key for local media pipeline
                        try {
                            const crypto = require("crypto");
                            session._callKey = crypto.randomBytes(32);
                            this.signaling?.storeCallKey?.(callId, session._callKey);
                        } catch { }
                    }
                }

                this.#diag("debug", "incoming_offer_crypto_evaluated", {
                    direction: "incoming",
                    callId,
                    hasCallKey: Boolean(session._callKey),
                    decryptionFailed: Boolean(session._decryptionFailed),
                    hasEnc
                });

                if (!offerSignalingMsg) {
                    try {
                        const { encodeBinaryNode } = require("../WABinary");
                        if (!offerNode.attrs) offerNode.attrs = {};
                        offerNode.attrs["call-creator"] = toCallDeviceJid(offerNode.attrs["call-creator"] || callerDeviceJid);
                        const b64 = Buffer.from(encodeBinaryNode(offerNode)).toString("base64");
                        const tcToken = await this.signaling?.ensureTcToken?.(callerBareJid, callCreator);
                        offerSignalingMsg = {
                            payload: b64,
                            peerPlatform: Number(offerNode.attrs?.platform || 0),
                            peerAppVersion: String(offerNode.attrs?.version || "0"),
                            epochId: String(offerNode.attrs?.e || "0"),
                            timestamp: String(offerNode.attrs?.t || Math.floor(Date.now() / 1000)),
                            isOffline: !!offerNode.attrs?.offline,
                            isOfferNotContact: false,
                            peerJid: callerDeviceJid,
                            tcToken
                        };
                    } catch { }
                }
                session._offerSignalingMsg = offerSignalingMsg;

                if (session.ended) {
                    this.#diag("debug", "incoming_offer_session_ended_early", { callId });
                    return session;
                }

                if (isWaiting) {
                    this.waitingCalls.push(session);
                    this.emit("call_waiting", session);
                    if (!session._incomingEmitted) {
                        session._incomingEmitted = true;
                        this.#diag("info", "call_incoming_emitted", { direction: "internal", callId, peerJid: sanitizeJid(effectiveCallerJid), isWaiting: true });
                        this.emit("call_incoming", session);
                    }
                    return session;
                }

                try {
                    await this.sendPreacceptStanza(callId, callCreator, effectiveCallerJid, isVideo);
                } catch { }

                if (relays.length > 0) {
                    try {
                        await this.sendRelayLatencyStanza(callId, callCreator, callerBareJid, relays, participantJids);
                    } catch { }
                }

                if (!session.ended && !session._incomingEmitted) {
                    session._incomingEmitted = true;
                    session._confirmRinging();
                    this.#diag("info", "call_incoming_emitted", { direction: "internal", callId, peerJid: sanitizeJid(effectiveCallerJid), isWaiting: false });
                    this.emit("call_incoming", session);
                }
                return session;
            } finally {
                this.#pendingOffers.delete(callId);
            }
        })();

        this.#pendingOffers.set(callId, offerPromise);
        return offerPromise;
    };

    acceptCall = async (callId, options = {}) => {
        this.#diag("info", "accept_call_invoked", { direction: "internal", callId, options: Object.keys(options) });
        const session = this.calls.get(callId);
        if (!session) {
            this.#diag("error", "accept_call_session_not_found", { direction: "internal", callId });
            throw new Error(`Call session not found: ${callId}`);
        }
        if (session.ended) {
            this.#diag("error", "accept_call_already_ended", { direction: "internal", callId, endedAt: session.endedAt });
            throw new Error(`Cannot accept call ${callId}: call has already ended.`);
        }

        // Idempotency: if already accepted, connected, audio_ready or streaming, return session directly
        const acceptedStatuses = ["accepted", "connected", "audio_ready", "streaming"];
        if (acceptedStatuses.includes(session.status)) {
            this.#diag("info", "accept_call_already_accepted", { direction: "internal", callId, status: session.status });
            this.#log("debug", "baileys: call already accepted/streaming; ignoring duplicate acceptCall", { callId, status: session.status });
            return session;
        }

        // Idempotency: if acceptance is already in progress, await and return the existing promise
        const inFlightAccept = this.#acceptingCalls.get(callId);
        if (inFlightAccept) {
            this.#diag("info", "accept_call_in_flight_joined", { direction: "internal", callId });
            this.#log("debug", "baileys: acceptance already in progress; awaiting in-flight acceptCall", { callId });
            return inFlightAccept;
        }

        if (!session.canAccept) {
            this.#diag("error", "accept_call_invalid_state", { direction: "internal", callId, status: session.status });
            throw new Error(`Call ${callId} cannot be accepted in state: ${session.status}`);
        }
        if (session.isWaiting) {
            this.#diag("error", "accept_call_blocked_waiting", { direction: "internal", callId });
            throw new Error(`Cannot accept call ${callId} while waiting in queue.`);
        }
        if (session._decryptionFailed && !session._callKey) {
            this.#diag("error", "accept_call_aborted_decryption_failed", { direction: "internal", callId, reason: "missing_call_key" });
            this.#log("error", "baileys: cannot accept call due to decryption failure", { callId });
            throw new Error(`Cannot accept call ${callId}: call key decryption failed; required cryptographic material is unavailable.`);
        }

        const acceptPromise = (async () => {
            try {
                // Eagerly mark accepted NOW — before any async awaits — so that concurrent
                // `accepted_elsewhere` terminates that WhatsApp echoes back during the stanza
                // handshake don't kill this session while we are still in the async setup.
                session._confirmAccepted();

                const audioSource = options.audioSource || options.audio;
                if (audioSource) session._audioSource = audioSource;
                if (options.repeatAudio !== undefined) session._repeatAudio = Boolean(options.repeatAudio);
                const videoSource = options.videoSource || options.video;
                if (videoSource) session._videoSource = videoSource;

                if (!session._offerSignalingMsg && session._offerNode) {
                    try {
                        const { encodeBinaryNode } = require("../WABinary");
                        if (!session._offerNode.attrs) session._offerNode.attrs = {};
                        session._offerNode.attrs["call-creator"] = toCallDeviceJid(session._offerNode.attrs["call-creator"] || session.peerJid);
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
                            peerJid: toCallDeviceJid(session.peerJid),
                            tcToken
                        };
                    } catch { }
                }
                if (session._offerSignalingMsg && !session._offerSignalingMsg.tcToken) {
                    try {
                        session._offerSignalingMsg.tcToken = await this.signaling?.ensureTcToken?.(session.peerJid, session.callCreator);
                    } catch { }
                }

                if (session._offerSignalingMsg && !session._offerFedToEngine) {
                    try {
                        session.engine?.handleSignalingOffer?.(session._offerSignalingMsg);
                        session._offerFedToEngine = true;
                    } catch { }
                }

                // Send protocol acceptance stanzas (matching WhatsApp VoIP & HIROBOT specification):
                const peerBare = session.peerBareJid || toBareJid(session.peerJid);

                // 1. Send mute_v2 first
                try {
                    this.#diag("debug", "accept_step_mute_v2_dispatched", { direction: "outgoing", callId });
                    await this.sendMuteV2Stanza(callId, session.callCreator, peerBare);
                } catch (err) {
                    this.#diag("warn", "accept_step_mute_v2_failed", { direction: "outgoing", callId, error: err?.message });
                    this.#log("debug", "baileys: mute_v2 pre-accept warning", { callId, err: err?.message });
                }

                if (session.ended) {
                    return session;
                }

                // 2. Send transport second
                try {
                    this.#diag("debug", "accept_step_transport_dispatched", { direction: "outgoing", callId });
                    await this.sendTransportStanza(callId, session.callCreator, peerBare);
                } catch (err) {
                    this.#diag("warn", "accept_step_transport_failed", { direction: "outgoing", callId, error: err?.message });
                    this.#log("debug", "baileys: transport pre-accept warning", { callId, err: err?.message });
                }

                if (session.ended) {
                    return session;
                }

                // 3. Send accept third
                try {
                    this.#diag("info", "accept_step_accept_dispatched", { direction: "outgoing", callId, targetBare: sanitizeJid(peerBare), isVideo: session.isVideo });
                    await this.sendAcceptStanza(callId, session.callCreator, peerBare, session.isVideo, session._callKey);
                } catch (err) {
                    this.#diag("error", "accept_step_accept_failed", { direction: "outgoing", callId, error: err?.message });
                    this.emit("error", new Error(`Failed sending accept signaling for ${callId}: ${err.message}`));
                    throw err;
                }
                this.#log("debug", "baileys: accept signaling sent", { callId });

                if (session.ended) {
                    return session;
                }

                // 4. Connect relay transport if endpoints exist
                if (session._relayEndpoints && session._relayEndpoints.length > 0) {
                    try {
                        this.#diag("debug", "accept_step_connect_relays", { direction: "internal", callId, relayCount: session._relayEndpoints.length });
                        session.relay?.connectRelays?.(session._relayEndpoints);
                    } catch { }
                }

                if (session.ended) {
                    return session;
                }

                // Start the media engine now that the peer has our accept on the wire.
                this.#log("debug", "baileys: starting media engine after accept signaling", { callId });
                try {
                    session.engine?.acceptCall?.(options.isMicEnabled ?? true, options.isCameraEnabled ?? session.isVideo);
                } catch { }

                await this.#notifyAcceptedElsewhere(session);

                session._confirmAccepted();
                this.#diag("info", "accept_call_completed", { direction: "internal", callId });
                this.emit("call_accepted", session);
                return session;
            } finally {
                this.#acceptingCalls.delete(callId);
            }
        })();

        this.#acceptingCalls.set(callId, acceptPromise);
        return acceptPromise;
    };

    rejectCall = async (callId, reason = "declined") => {
        this.#diag("info", "reject_call_invoked", { direction: "internal", callId, reason });
        const session = this.calls.get(callId);
        if (!session) {
            this.#diag("warn", "reject_call_session_not_found_sending_standalone", { direction: "internal", callId, reason });
            await this.sendRejectStanza(callId, "", "", reason);
            return;
        }

        const waitIndex = this.waitingCalls.indexOf(session);
        if (waitIndex >= 0) {
            this.waitingCalls.splice(waitIndex, 1);
            this.#diag("debug", "reject_call_dequeued_waiting", { direction: "internal", callId });
        }

        try {
            await this.sendRejectStanza(callId, session.callCreator, session.peerJid, reason);
            session._endSignalSent = true;
        } catch (err) {
            this.#diag("error", "reject_call_send_stanza_failed", { direction: "outgoing", callId, error: err?.message });
        }

        try {
            session.engine?.rejectCall?.();
        } catch { }

        session._handleRejected(reason);
        this.cleanupCall(callId);
        await this.maybeUnblockWaitingCalls();
        this.#diag("info", "reject_call_completed", { direction: "internal", callId, reason });
    };

    endCall = async (callId, reason = "completed") => {
        this.#diag("info", "end_call_invoked", { direction: "internal", callId, reason });
        const session = this.calls.get(callId);
        if (!session || session.ended) {
            this.#diag("debug", "end_call_already_ended_or_missing", { direction: "internal", callId, sessionFound: Boolean(session) });
            return;
        }

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
            session.engine?.endCall?.(0, true);
        } catch { }

        // Graceful delay: allow the terminate stanza to reach WhatsApp server & peer
        // before tearing down the relay sockets and session
        await new Promise((resolve) => setTimeout(resolve, 400));

        session._forceEnd(reason);
        this.cleanupCall(callId);
        await this.maybeUnblockWaitingCalls();
        this.#diag("info", "end_call_completed", { direction: "internal", callId, reason });
    };

    handleIncomingTerminate = (callId, reason = "remote_end") => {
        this.#diag("info", "incoming_terminate_received", { direction: "incoming", callId, reason });
        const session = this.calls.get(callId);
        if (!session || session.ended) {
            this.#diag("debug", "incoming_terminate_ignored_no_session", { direction: "incoming", callId, reason });
            return;
        }

        // When WhatsApp accepts a call on this device, it sends accepted_elsewhere terminates
        // to all other linked devices. If we receive one while already accepted/connected/streaming,
        // it is a benign multi-device notification — do NOT kill the active call.
        const acceptedStatuses = ["accepted", "connected", "audio_ready", "streaming"];
        if (reason === "accepted_elsewhere" && acceptedStatuses.includes(session.status)) {
            this.#diag("debug", "incoming_terminate_accepted_elsewhere_ignored_for_active_call", { direction: "incoming", callId, status: session.status });
            return;
        }

        const waitIndex = this.waitingCalls.indexOf(session);
        if (waitIndex >= 0) {
            this.waitingCalls.splice(waitIndex, 1);
        }

        // The end signal came from the peer/server — never echo a terminate back.
        session._peerInitiatedEnd = true;

        try {
            session.engine?.endCall?.(0, true);
        } catch { }

        session._forceEnd(reason);
        this.cleanupCall(callId);
        this.maybeUnblockWaitingCalls();
        this.#diag("info", "incoming_terminate_processed", { direction: "internal", callId, reason });
    };

    /**
     * Handle an incoming standalone <relay> node to update relay connections.
     */
    handleRelayNode = (node) => {
        const callId = node?.attrs?.["call-id"] || node?.attrs?.call_id;
        const session = callId ? this.calls.get(callId) : null;
        const { relays } = parseRelayEndpoints(node);
        this.#diag("info", "incoming_relay_node_processed", {
            direction: "incoming",
            callId,
            relayCount: relays.length,
            sessionFound: Boolean(session)
        });
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
        this.#pendingOffers.delete(callId);
        this.#acceptingCalls.delete(callId);
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
        this.#pendingOffers.clear();
        this.#acceptingCalls.clear();
        this.waitingCalls = [];
        for (const [callId, session] of this.calls.entries()) {
            try { session.end("destroyed"); } catch { }
            try { session.engine?.destroy?.(); } catch { }
            try { session.relay?.closeAll?.(); } catch { }
        }
        this.calls.clear();
        this.removeAllListeners();
    };

    #getSelfJid = (target) => {
        const selfPn = this.sock?.authState?.creds?.me?.id || "";
        const selfLid = this.sock?.authState?.creds?.me?.lid || "";
        const isLid = String(target || "").endsWith("@lid");
        return (isLid && selfLid) ? selfLid : (selfPn || selfLid);
    };

    #resolveTargetJid = (...candidates) => {
        for (const c of candidates) {
            const j = String(c || "").trim();
            if (j) return j;
        }
        return "";
    };

    sendPreacceptStanza = async (callId, callCreator, toJid, isVideo = false) => {
        if (!this.sock) return;
        const target = toJid || toBareJid(callCreator);
        this.#diag("debug", "outbound_preaccept_stanza_sending", {
            direction: "outgoing",
            callId,
            callCreator: sanitizeJid(callCreator),
            target: sanitizeJid(target),
            isVideo
        });
        const CAPABILITY_PREACCEPT = new Uint8Array([0x01, 0x05, 0xff, 0x09, 0xe4, 0xbb, 0x07]);
        const preacceptContent = [
            { tag: "audio", attrs: { enc: "opus", rate: "16000" }, content: undefined },
            { tag: "net", attrs: { medium: "2" }, content: undefined }
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

        const session = this.calls.get(callId);
        const stanza = {
            tag: "call",
            attrs: {
                to: target,
                id: generateStanzaId()
            },
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
        const target = this.#resolveTargetJid(toJid, callCreator);
        this.#diag("debug", "outbound_relay_latency_stanza_sending", {
            direction: "outgoing",
            callId,
            relayCount: teNodes.length,
            target: sanitizeJid(target)
        });
        const stanza = {
            tag: "call",
            attrs: {
                to: toBareJid(target || callCreator),
                id: generateStanzaId()
            },
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
        const session = this.calls.get(callId);
        const target = toJid || toBareJid(callCreator);
        this.#diag("debug", "outbound_mute_v2_stanza_sending", {
            direction: "outgoing",
            callId,
            target: sanitizeJid(target)
        });
        const stanza = {
            tag: "call",
            attrs: {
                to: target,
                id: generateStanzaId()
            },
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
        const session = this.calls.get(callId);
        const target = toJid || toBareJid(callCreator);
        this.#diag("debug", "outbound_transport_stanza_sending", {
            direction: "outgoing",
            callId,
            target: sanitizeJid(target)
        });
        const stanza = {
            tag: "call",
            attrs: {
                to: target,
                id: generateStanzaId()
            },
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

        const session = this.calls.get(callId);
        let effectiveKey = rawCallKey || session?._callKey || this.signaling?.getCallKey?.(callId);
        if (!effectiveKey && session?._offerNode && this.signaling?.maybeDecryptEnc) {
            try {
                const decrypted = await this.signaling.maybeDecryptEnc(session._offerNode, toJid || callCreator);
                if (decrypted?._callKey) {
                    effectiveKey = decrypted._callKey;
                    session._callKey = effectiveKey;
                    this.signaling?.storeCallKey?.(callId, effectiveKey);
                }
            } catch { }
        }

        if (!effectiveKey || effectiveKey.length === 0) {
            try {
                const crypto = require("crypto");
                effectiveKey = crypto.randomBytes(32);
                if (session) session._callKey = effectiveKey;
                this.signaling?.storeCallKey?.(callId, effectiveKey);
            } catch { }
        }

        const target = toJid || toBareJid(callCreator);

        const normalizedCallerPn = session?.callerPn ? (session.callerPn.includes('@') ? session.callerPn : `${session.callerPn}@s.whatsapp.net`) : null;
        const candidateTargets = [
            session?.peerDeviceJid,
            callCreator,
            toJid,
            session?.peerJid,
            normalizedCallerPn,
            target
        ].filter(Boolean).filter(j => typeof j === 'string' && j.includes('@'));

        const encryptionTargets = [
            ...candidateTargets.filter(j => /^[^:@]+:\d+@[^@]+$/.test(j)),
            ...candidateTargets.filter(j => !/^[^:@]+:\d+@[^@]+$/.test(j))
        ];

        // Pre-synchronize Signal sessions with WhatsApp server if needed
        if (this.sock?.assertSessions) {
            try {
                await this.sock.assertSessions([...new Set(encryptionTargets)], false);
            } catch { }
        } else if (this.signaling?.ensureSessionsForPeers) {
            try {
                await this.signaling.ensureSessionsForPeers([...new Set(encryptionTargets)]);
            } catch { }
        }

        if (effectiveKey && this.signaling?.encryptCallKey) {
            for (const t of [...new Set(encryptionTargets)]) {
                try {
                    const encrypted = await this.signaling.encryptCallKey(t, effectiveKey, 0);
                    if (encrypted?.encNode) {
                        encNode = encrypted.encNode;
                        shouldIncludeDeviceIdentity = encrypted.shouldIncludeDeviceIdentity;
                        this.#diag("info", "accept_call_key_encrypted_candidate_success", {
                            direction: "internal",
                            callId,
                            target: sanitizeJid(t),
                            type: encNode?.attrs?.type
                        });
                        break;
                    }
                } catch (encErr) {
                    this.#diag("warn", "accept_call_key_encrypted_candidate_failed", {
                        direction: "internal",
                        callId,
                        target: sanitizeJid(t),
                        error: encErr?.message || String(encErr)
                    });
                }
            }
        }

        if (encNode) {
            acceptContent.push(encNode);
        } else {
            this.#diag("error", "accept_call_key_encryption_all_targets_failed", {
                direction: "internal",
                callId,
                targets: encryptionTargets.map(sanitizeJid)
            });
            this.#log("warn", "baileys: failed to encrypt call key for accept stanza", { callId, targets: encryptionTargets });
        }
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

        const stanzaId = this.sock?.generateMessageTag ? this.sock.generateMessageTag() : generateStanzaId();
        const stanza = {
            tag: "call",
            attrs: {
                to: target,
                id: stanzaId
            },
            content: [{
                tag: "accept",
                attrs: { "call-id": callId, "call-creator": callCreator },
                content: acceptContent
            }]
        };

        this.#diag("info", "outbound_accept_stanza_sending", {
            direction: "outgoing",
            callId,
            target: sanitizeJid(target),
            hasEncNode: Boolean(encNode),
            hasDeviceIdentity: Boolean(shouldIncludeDeviceIdentity && this.signaling?.getDeviceIdentity),
            isVideo
        });

        if (this.sock.sendNode) {
            try {
                await this.sock.sendNode(stanza);
                this.#diag("info", "outbound_accept_stanza_sent_success", { direction: "outgoing", callId, target: sanitizeJid(target) });
            } catch (sendErr) {
                this.#diag("error", "outbound_accept_stanza_sent_failed", { direction: "outgoing", callId, target: sanitizeJid(target), error: sendErr?.message });
                throw sendErr;
            }
        } else if (this.sock.query) {
            try {
                await this.sock.query(stanza);
                this.#diag("info", "outbound_accept_stanza_sent_success", { direction: "outgoing", callId, target: sanitizeJid(target) });
            } catch (sendErr) {
                this.#diag("error", "outbound_accept_stanza_sent_failed", { direction: "outgoing", callId, target: sanitizeJid(target), error: sendErr?.message });
                throw sendErr;
            }
        }

        // Pipe server ack to WASM engine for fast relay confirmation
        if (this.sock?.waitForMessage) {
            (async () => {
                try {
                    const ackNode = await this.sock.waitForMessage(stanzaId, 5000);
                    if (ackNode) {
                        const { encodeBinaryNode } = require("../WABinary");
                        const ackPayload = Buffer.from(encodeBinaryNode(ackNode)).toString("base64");
                        const currentSession = this.calls.get(callId);
                        const tcToken = await this.signaling?.ensureTcToken?.(target, callCreator);
                        currentSession?.engine?.handleSignalingAck?.({
                            payload: ackPayload,
                            ackError: ackNode.attrs?.error ?? "0",
                            msgType: "accept",
                            peerJid: target,
                            extraData: tcToken
                        });
                    }
                } catch { }
            })();
        }
    };

    sendRejectStanza = async (callId, callCreator, toJid, reason = "declined") => {
        if (!this.sock) return;
        const target = toJid || toBareJid(callCreator);
        this.#diag("info", "outbound_reject_stanza_sending", {
            direction: "outgoing",
            callId,
            target: sanitizeJid(target),
            reason
        });
        const stanza = {
            tag: "call",
            attrs: {
                to: target,
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

        const target = toJid || toBareJid(callCreator || targetSession?.callCreator);
        this.#diag("info", "outbound_terminate_stanza_sending", {
            direction: "outgoing",
            callId,
            target: sanitizeJid(target),
            reason: attrs.reason,
            duration: attrs.duration
        });
        const stanza = {
            tag: "call",
            attrs: {
                to: target,
                id: generateStanzaId()
            },
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
    /**
     * After Baileys accepts a call, explicitly send accepted_elsewhere terminates to every
     * other linked device that received the call offer (e.g. the primary phone). This forces
     * the phone to drop the call so the media relay routes audio exclusively to Baileys.
     */
    #notifyAcceptedElsewhere = async (session) => {
        // Disabled: In WhatsApp VoIP protocol, callee devices do not send
        // <terminate reason="accepted_elsewhere"> to other devices. The WhatsApp server
        // natively dismisses other devices once <accept> is processed. Sending it from
        // the callee risks the server treating the call as terminated.
        return;
    };
}
exports.CallManager = CallManager;
