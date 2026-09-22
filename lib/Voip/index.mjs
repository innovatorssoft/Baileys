/**
 * WhatsApp VoIP Client.
 *
 * High-level voice call client. Handles WASM lifecycle, relay connection,
 * signaling encryption via Baileys, multi-device routing, and bidirectional PCM audio.
 * Supports concurrent outgoing VoIP calls with fully isolated call contexts and dedicated WASM stacks.
 *
 * @author InnovatorsSoft
 */
import { EventEmitter } from "node:events";
import { resolve } from "node:path";
import { createHmac, randomBytes } from "node:crypto";
import { WasmEngine, ensureWasmAssets } from "./wasm-engine.mjs";
import { RelayRtcTransport } from "./relay-transport.mjs";
import { SignalingBridge } from "./signaling.mjs";
import { AudioFeeder } from "./audio-feeder.mjs";
import { VideoFeeder } from "./video-feeder.mjs";
import { CallState, CallDirection, CallMediaType } from "./types.mjs";
import { CallSession, ActiveCall } from "./call-session.mjs";
import { CallManager } from "./call-manager.mjs";
import { VoipResourceManager } from "./resource-manager.mjs";

export { CallState, CallDirection, CallMediaType } from "./types.mjs";
export { AudioFeeder } from "./audio-feeder.mjs";
export { VideoFeeder } from "./video-feeder.mjs";
export { SignalingBridge } from "./signaling.mjs";
export { RelayRtcTransport } from "./relay-transport.mjs";
export { WasmEngine, ensureWasmAssets } from "./wasm-engine.mjs";
export { CallSession, ActiveCall } from "./call-session.mjs";
export { CallManager } from "./call-manager.mjs";
export { VoipResourceManager } from "./resource-manager.mjs";

const DEFAULT_PRE_RINGING_TIMEOUT_MS = 20_000;
const SHA256_LEN = 32;

const loadBaileys = async () => {
    try {
        return await import("../index.js");
    }
    catch {
        return await import("@innovatorssoft/baileys");
    }
};

const toBareJid = (jid) => {
    if (!jid)
        return "";
    const [user, serverPart] = jid.split("@");
    if (!serverPart)
        return jid;
    const [bareUser] = user.split(":");
    return `${bareUser}@${serverPart}`;
};

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

const isCallReceiptNode = (node) => {
    if (node?.tag !== "receipt")
        return false;
    const child = Array.isArray(node.content) ? node.content[0] : null;
    return !!(child?.attrs?.["call-id"] || child?.attrs?.call_id);
};

/** Top-level client. Connects to WhatsApp and lets you place calls. */
export class VoipClient extends EventEmitter {
    #config;
    #signaling = null;
    #sock = null;
    #callManager = null;
    #activeCalls = new Map();
    #baileys = null;
    #maxConcurrentCalls = 1;
    #onLimit = "reject";
    #pthreadPoolSize = 4;
    #initialized = false;

    constructor(config = {}) {
        super();
        this.#config = config;
        this.#maxConcurrentCalls = Number(config.maxConcurrentCalls ?? 1);
        if (config.onLimit) this.#onLimit = config.onLimit;
        if (config.pthreadPoolSize) this.#pthreadPoolSize = config.pthreadPoolSize;
    }

    get callManager() {
        return this.#callManager;
    }

    get calls() {
        return this.#callManager?.calls || this.#activeCalls;
    }

    setOptions = (options = {}) => {
        if (options.maxConcurrentCalls !== undefined) {
            this.#maxConcurrentCalls = Number(options.maxConcurrentCalls);
        }
        if (options.onLimit) {
            this.#onLimit = options.onLimit;
        }
        if (options.pthreadPoolSize) {
            this.#pthreadPoolSize = options.pthreadPoolSize;
        }
        if (this.#callManager) {
            this.#callManager.maxConcurrentCalls = this.#maxConcurrentCalls;
            this.#callManager.onLimit = this.#onLimit;
            this.#callManager.pthreadPoolSize = this.#pthreadPoolSize;
        }
    };

    getActiveCalls = () => {
        if (this.#callManager) {
            return this.#callManager.getActiveCalls();
        }
        return Array.from(this.#activeCalls.values()).map(call => call.getSummary());
    };

    getCall = (callId) => {
        if (this.#callManager) {
            return this.#callManager.getCall(callId);
        }
        return this.#activeCalls.get(callId);
    };

    getActiveCallCount = () => {
        if (this.#callManager) {
            return this.#callManager.activeCallCount;
        }
        return this.#activeCalls.size;
    };

    getMemoryStats = () => {
        if (this.#callManager) {
            return this.#callManager.getMemoryStats();
        }
        return VoipResourceManager.getMemoryStats();
    };

    /** Accept an incoming call */
    acceptCall = async (callId, options = {}) => {
        if (!this.#callManager) {
            throw new Error("VoIP client not initialized");
        }
        return this.#callManager.acceptCall(callId, options);
    };

    /** Reject an incoming call */
    rejectCall = async (callId, reason = "declined") => {
        if (!this.#callManager) {
            throw new Error("VoIP client not initialized");
        }
        return this.#callManager.rejectCall(callId, reason);
    };

    /** Mute an active call */
    muteCall = (callId, muted = true) => {
        if (this.#callManager) {
            return this.#callManager.muteCall(callId, muted);
        }
        const call = this.#activeCalls.get(callId);
        if (call) {
            call.mute?.(muted);
            return true;
        }
        return false;
    };

    /** Unmute an active call */
    unmuteCall = (callId) => {
        return this.muteCall(callId, false);
    };

    endCall = (callId, reason = "completed") => {
        if (!callId) {
            throw new Error("callId is required for endCall. Use endAllCalls() to end all calls.");
        }
        if (this.#callManager) {
            return this.#callManager.endCall(callId, reason);
        }
        const call = this.#activeCalls.get(callId);
        if (call) {
            call.end(reason);
        }
    };

    endAllCalls = () => {
        if (this.#callManager) {
            for (const session of this.#callManager.calls.values()) {
                try { session.end("completed"); } catch { }
            }
        }
        for (const call of this.#activeCalls.values()) {
            try { call.end("completed"); } catch { }
        }
    };

    callMany = async (requests) => {
        if (!Array.isArray(requests)) {
            throw new Error("requests must be an array of { jid, options }");
        }
        return Promise.all(requests.map(r => this.call(r.jid, r.options)));
    };

    /** Connect to WhatsApp and bring up the WASM VoIP stack. */
    connect = async () => {
        this.#baileys = await loadBaileys();
        const { useMultiFileAuthState, default: makeWASocket, DisconnectReason } = this.#baileys;
        const makeSocket = makeWASocket ?? this.#baileys.makeWASocket ?? this.#baileys;
        const authDir = resolve(this.#config.authDir);
        const { state, saveCreds } = await useMultiFileAuthState(authDir);
        const silentLogger = {
            level: "silent",
            child: () => silentLogger,
            trace: () => { },
            debug: () => { },
            info: () => { },
            warn: () => { },
            error: () => { },
        };
        const sock = makeSocket({
            auth: state,
            logger: silentLogger,
            printQRInTerminal: true,
        });
        sock.ev.on("creds.update", saveCreds);
        await new Promise((resolveConnect, rejectConnect) => {
            sock.ev.on("connection.update", (update) => {
                const { connection, lastDisconnect } = update;
                if (connection === "open")
                    resolveConnect(undefined);
                else if (connection === "close") {
                    const statusCode = lastDisconnect?.error?.output?.statusCode;
                    if (statusCode === DisconnectReason.loggedOut) {
                        rejectConnect(new Error("WhatsApp session logged out. Re-authenticate."));
                    }
                }
            });
        });
        this.#sock = sock;
        ensureWasmAssets();
        this.#signaling = new SignalingBridge({ sock: this.#sock });
        await this.#signaling.init();
        this.#setupSignalingListeners();
        this.#initCallManager();
        this.#initialized = true;

        this.#sock.ws.on("CB:call", (node) => {
            this.#signaling?.processIncomingCall(node);
        });
        this.#sock.ws.on("CB:receipt", (node) => {
            if (!isCallReceiptNode(node))
                return;
            this.#signaling?.processIncomingReceipt(node);
        });
        this.#sock.ws.on("CB:relay", (node) => {
            this.#callManager?.handleRelayNode(node);
        });
    };

    /** Attach an already connected Baileys socket directly. */
    initWithSocket = async (sock) => {
        this.#sock = sock;
        ensureWasmAssets();
        this.#baileys = await loadBaileys();
        this.#signaling = new SignalingBridge({ sock: this.#sock });
        await this.#signaling.init();
        this.#setupSignalingListeners();
        this.#initCallManager();
        this.#initialized = true;

        this.#sock.ws.on("CB:call", (node) => {
            this.#signaling?.processIncomingCall(node);
        });
        this.#sock.ws.on("CB:receipt", (node) => {
            if (!isCallReceiptNode(node))
                return;
            this.#signaling?.processIncomingReceipt(node);
        });
        this.#sock.ws.on("CB:relay", (node) => {
            this.#callManager?.handleRelayNode(node);
        });
    };

    #initCallManager = () => {
        this.#callManager = new CallManager({
            sock: this.#sock,
            signaling: this.#signaling,
            maxConcurrentCalls: this.#maxConcurrentCalls,
            onLimit: this.#onLimit,
            pthreadPoolSize: this.#pthreadPoolSize,
            options: this.#config.options || {},
        });

        this.#callManager.on("call_incoming", (session) => this.emit("call_incoming", session));
        this.#callManager.on("call_accepted", (session) => this.emit("call_accepted", session));
        this.#callManager.on("call_ended", (session, reason) => this.emit("call_ended", session, reason));
        this.#callManager.on("call_waiting", (session) => this.emit("call_waiting", session));
        this.#callManager.on("call_unblocked", (session) => this.emit("call_unblocked", session));
        this.#callManager.on("call_rejected_capacity", (data) => this.emit("call_rejected_capacity", data));

        this.#signaling?.setIncomingOfferListener((node, peerJid, callId, offerSignalingMsg) => {
            this.#callManager?.handleIncomingOffer(node, peerJid, offerSignalingMsg);
        });
    };

    /** Place an outbound voice call. */
    call = async (phoneNumber, opts = {}) => {
        if (!this.#initialized || !this.#signaling || !this.#sock)
            throw new Error("Not connected. Call connect() first.");

        if (this.#maxConcurrentCalls > 0 && this.#activeCalls.size >= this.#maxConcurrentCalls) {
            throw new Error(`Max concurrent calls limit (${this.#maxConcurrentCalls}) reached.`);
        }

        let targetPnJid = "";
        let peerLid = "";

        if (phoneNumber.includes("@lid")) {
            peerLid = toBareJid(phoneNumber.trim());
            targetPnJid = peerLid;
        } else {
            const bareUser = phoneNumber.split("@")[0].split(":")[0];
            const digits = bareUser.replace(/\D/g, "");
            targetPnJid = `${digits}@s.whatsapp.net`;
            const resolved = await this.#signaling.resolveLid(targetPnJid);
            peerLid = resolved ? toBareJid(resolved) : targetPnJid;
        }

        // Duplicate call check
        for (const existing of this.#activeCalls.values()) {
            if (!existing.ended && (existing.peerJid === targetPnJid || existing.peerJid === peerLid || existing.phoneNumber === phoneNumber)) {
                throw new Error(`A call to recipient ${phoneNumber} is already active.`);
            }
        }

        const isLidCall = peerLid.endsWith("@lid");

        for (const jid of [targetPnJid, peerLid]) {
            try {
                await this.#sock.presenceSubscribe(jid);
            }
            catch { }
        }
        await new Promise((r) => setTimeout(r, 750));

        const peerDeviceJids = await this.#signaling.discoverPeerDevices(peerLid);
        const deviceList = peerDeviceJids.length ? peerDeviceJids : [toBareJid(peerLid)];
        await this.#signaling.ensureSessionsForPeers(deviceList);
        await new Promise((r) => setTimeout(r, 500));

        await this.#signaling.issueTcToken(peerLid);
        const tcToken = await this.#signaling.ensureTcToken(peerLid, targetPnJid);

        const callId = ("00" + randomBytes(16).toString("hex").slice(2)).toUpperCase();

        let callEngine = null;
        const callRelay = new RelayRtcTransport({
            onTransportMessage: (data, ip, port) => {
                try { callEngine?.handleOnTransportMessage(data, ip, port); } catch { }
            },
            onIceRtt: (rttMs, ip, port) => {
                try { callEngine?.updateIceRtt(rttMs, ip, port); } catch { }
            },
        });

        callEngine = new WasmEngine({
            callbacks: {
                onSignalingXmpp: (peerJid, cid, xmlPayload) => this.#signaling?.sendSignaling(peerJid, cid || callId, xmlPayload),
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
            },
        });

        await callEngine.initialize();
        const selfPnJid = this.#sock.authState?.creds?.me?.id || "";
        const selfLidJid = this.#sock.authState?.creds?.me?.lid || "";
        callEngine.initVoipStack(selfPnJid, toBareJid(selfPnJid), selfLidJid);
        await callEngine.waitForVoipStackReady();
        try {
            callEngine.updateNetworkMedium(2, 0);
        }
        catch { }

        this.#signaling.registerEngine(callId, callEngine);

        const call = new ActiveCall(callId, targetPnJid, callEngine, opts, phoneNumber);
        call.relay = callRelay;
        this.#activeCalls.set(callId, call);
        this.#callManager?.registerCall(call);

        call.on("ended", (reason) => {
            this.#activeCalls.delete(callId);
            if (reason !== "remote_end" && reason !== "rejected") {
                try { call.engine?.endCall(0, true); } catch { }
                this.#signaling?.sendTerminate(targetPnJid, callId, reason);
            }
            setTimeout(() => {
                this.#signaling?.unregisterEngine(callId);
                this.#signaling?.cleanupCall(callId);
                try { call.relay?.closeAll(); } catch { }
                try { call.engine?.destroy(); } catch { }
            }, 1000).unref?.();
        });

        callEngine.startCall({
            peerJid: peerLid,
            peerPn: targetPnJid,
            peerList: deviceList,
            callId,
            isVideo: Boolean(opts.isVideo),
            isLidCall: isLidCall,
            isFromDialer: false,
            extraData: tcToken,
        });

        return call;
    };

    /** Tear down the WhatsApp socket and release resources. */
    disconnect = () => {
        this.endAllCalls();
        this.#callManager?.cleanup();
        for (const call of this.#activeCalls.values()) {
            try { call.engine?.destroy(); } catch { }
            try { call.relay?.closeAll(); } catch { }
        }
        this.#activeCalls.clear();
        this.#sock?.end?.();
        this.#signaling = null;
        this.#sock = null;
        this.#initialized = false;
    };

    // ─── private ──────────────────────────────────────────────────────────────
    #setupSignalingListeners = () => {
        if (!this.#signaling) return;
        this.#signaling.setSignalingEventListener((tag, reason, callId, peerJid) => {
            if (callId) {
                const call = this.#activeCalls.get(callId);
                if (call) {
                    call._handleSignalingEvent(tag, reason);
                }
                return;
            }
            if (peerJid) {
                const bare = toBareJid(peerJid);
                const selfPn = toBareJid(this.#sock?.authState?.creds?.me?.id || "");
                const selfLid = toBareJid(this.#sock?.authState?.creds?.me?.lid || "");
                if (bare && bare !== selfPn && bare !== selfLid) {
                    for (const call of this.#activeCalls.values()) {
                        if (call.peerJid === bare || call.phoneNumber === bare) {
                            call._handleSignalingEvent(tag, reason);
                            return;
                        }
                    }
                }
            }
        });
        this.#signaling.setSignalingErrorListener((tag, errorType, peerJid, callId) => {
            if (callId) {
                const call = this.#activeCalls.get(callId);
                if (call) {
                    call._handleSignalingError(tag, errorType);
                }
                return;
            }
            if (peerJid) {
                const bare = toBareJid(peerJid);
                const selfPn = toBareJid(this.#sock?.authState?.creds?.me?.id || "");
                const selfLid = toBareJid(this.#sock?.authState?.creds?.me?.lid || "");
                if (bare && bare !== selfPn && bare !== selfLid) {
                    for (const call of this.#activeCalls.values()) {
                        if (call.peerJid === bare || call.phoneNumber === bare) {
                            call._handleSignalingError(tag, errorType);
                            return;
                        }
                    }
                }
            }
        });
    };

    #handleCallEvent = (eventType, eventData, engineCallId) => {
        if (eventType === 16 && eventData) {
            try {
                const parsed = JSON.parse(eventData);
                const info = parsed.call_info ?? parsed.callInfo ?? {};
                const callState = Number(info.call_state ?? info.callState ?? 0);
                const callId = info.call_id ?? info.callId ?? parsed.call_id ?? parsed.callId ?? engineCallId;
                if (callId) {
                    const call = this.#activeCalls.get(callId);
                    if (call) {
                        call._updateState(callState);
                        if (callState === CallState.Active) {
                            this.#maybeStartAudioForCall(call);
                            this.#maybeStartVideoForCall(call);
                        }
                    }
                }
            }
            catch { }
        }
        else if (eventType === 156 && eventData) {
            try {
                const update = JSON.parse(eventData);
                const targetCall = engineCallId ? this.#activeCalls.get(engineCallId) : null;
                if (targetCall?.relay) {
                    targetCall.relay.updateRelayList(update);
                }
            }
            catch { }
        }
        else if (eventType === 2) {
            try {
                const parsed = JSON.parse(eventData || "{}");
                const callId = parsed.call_id ?? parsed.callId ?? engineCallId;
                if (callId && this.#activeCalls.has(callId)) {
                    this.#activeCalls.get(callId)._forceEnd("remote_end");
                }
            }
            catch { }
        }
    };

    #handleAudioCaptureInit = (config, callId) => {
        const call = callId ? this.#activeCalls.get(callId) : null;
        if (!call || !call.engine)
            return;
        call._captureSampleRate = config.sampleRate || 16000;
        call._captureChannels = config.channels || 1;
        call._captureFramesPerChunk = config.framesPerChunk || 320;
        const chunkSamples = call._captureFramesPerChunk * call._captureChannels;
        call._captureChunkBytes = chunkSamples * Float32Array.BYTES_PER_ELEMENT;
        if (!call._capturePtr) {
            call._capturePtr = call.engine.malloc(call._captureChunkBytes);
        }
    };

    #handleAudioCaptureStart = (callId) => {
        const call = callId ? this.#activeCalls.get(callId) : null;
        if (!call) return;
        call._captureReady = true;
        this.#maybeStartAudioForCall(call);
    };

    #maybeStartAudioForCall = (call) => {
        if (!call || call.ended || call.state !== CallState.Active)
            return;
        if (!call._captureReady || !call._capturePtr || !call.engine)
            return;
        if (call.audioFeeder)
            return;

        call.startAudio(
            call._captureSampleRate,
            call._captureChannels,
            call._captureFramesPerChunk,
            (chunk) => {
                if (call.engine && call._capturePtr && !call.ended) {
                    call.engine.sendAudioData(chunk, call._capturePtr);
                }
            }
        );
    };

    #handleAudioCaptureStop = (callId) => {
        if (callId) {
            const call = this.#activeCalls.get(callId);
            if (call) {
                call._captureReady = false;
                call.stopAudio();
                if (call.engine && call._capturePtr) {
                    try {
                        call.engine.free(call._capturePtr);
                    }
                    catch { }
                    call._capturePtr = 0;
                }
            }
        }
    };

    #handleAudioPlayback = (audioData, callId) => {
        if (callId) {
            const call = this.#activeCalls.get(callId);
            if (call && !call.ended) {
                call._emitAudio(audioData);
            }
        }
    };

    #handleVideoCaptureStart = (data, callId) => {
        const call = callId ? this.#activeCalls.get(callId) : null;
        if (!call) return;
        call._videoReady = true;
        this.#maybeStartVideoForCall(call);
    };

    #handleVideoCaptureStop = (callId) => {
        if (callId) {
            const call = this.#activeCalls.get(callId);
            if (call) {
                call._videoReady = false;
                call.stopVideo();
            }
        }
    };

    #maybeStartVideoForCall = (call) => {
        if (!call || call.ended || call.state !== CallState.Active)
            return;
        if (!call.isVideo || !call._videoSource || call.videoFeeder || !call.engine)
            return;

        call.startVideo((frameBuf, width, height, fps) => {
            if (call.engine && !call.ended) {
                call.engine.sendVideoFrame(frameBuf, width, height, fps, 1, call._videoOrientation);
            }
        });
    };
}
