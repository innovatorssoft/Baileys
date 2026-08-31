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
import { CallState } from "./types.mjs";

export { CallState } from "./types.mjs";
export { AudioFeeder } from "./audio-feeder.mjs";
export { SignalingBridge } from "./signaling.mjs";
export { RelayRtcTransport } from "./relay-transport.mjs";
export { WasmEngine } from "./wasm-engine.mjs";

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

/** A live or recently-ended call. */
export class ActiveCall extends EventEmitter {
    callId;
    peerJid;
    phoneNumber;
    engine;
    options;
    startedAt;
    connectedAt = null;
    endedAt = null;
    relay = null;

    #state = CallState.Idle;
    #status = "initiating";
    #endResolver;
    #endPromise;
    #endTimer = null;
    #preRingingTimer = null;
    #ended = false;

    /** @internal */
    _audioSource = "silence";
    /** @internal */
    _repeatAudio = false;
    /** @internal */
    _durationMs = 120_000;
    /** @internal */
    audioFeeder = null;

    /** @internal */
    _captureReady = false;
    /** @internal */
    _capturePtr = 0;
    /** @internal */
    _captureChunkBytes = 0;
    /** @internal */
    _captureSampleRate = 16000;
    /** @internal */
    _captureChannels = 1;
    /** @internal */
    _captureFramesPerChunk = 320;

    constructor(callId, peerJid, engine, options = {}, phoneNumber = "") {
        super();
        this.callId = callId;
        this.peerJid = peerJid;
        this.phoneNumber = phoneNumber || peerJid;
        this.engine = engine;
        this.options = options;
        this.startedAt = Date.now();

        this._durationMs = Number(options.durationMs ?? options.durationMS ?? 120_000);
        this._audioSource = options.audioSource ?? "silence";
        this._repeatAudio = Boolean(options.repeatAudio ?? options.repeat ?? false);

        this.#endPromise = new Promise((res) => { this.#endResolver = res; });

        if (this._durationMs > 0) {
            this.#endTimer = setTimeout(() => this.end("completed"), this._durationMs);
            if (this.#endTimer?.unref) this.#endTimer.unref();
        }

        const preRingingTimeoutMs = Number(options.preRingingTimeoutMs ?? DEFAULT_PRE_RINGING_TIMEOUT_MS);
        if (preRingingTimeoutMs > 0) {
            this.#preRingingTimer = setTimeout(() => this.#handlePreRingingTimeout(preRingingTimeoutMs), preRingingTimeoutMs);
            if (this.#preRingingTimer?.unref) this.#preRingingTimer.unref();
        }
    }

    get state() { return this.#state; }
    get status() { return this.#status; }
    get ended() { return this.#ended; }

    getSummary = () => ({
        id: this.callId,
        jid: this.peerJid,
        status: this.#status,
        state: this.#state,
        startedAt: this.startedAt,
        connectedAt: this.connectedAt,
        endedAt: this.endedAt,
        durationMs: this._durationMs,
        audioSource: this._audioSource,
        repeatAudio: this._repeatAudio,
    });

    startAudio = (sampleRate, channels, framesPerChunk, sendAudioChunkFn) => {
        if (this.#ended || this.audioFeeder)
            return;
        this._confirmAudioReady();
        this._confirmStreaming();
        this.audioFeeder = new AudioFeeder(
            sampleRate,
            channels,
            framesPerChunk,
            (chunk) => {
                if (!this.#ended) {
                    sendAudioChunkFn(chunk);
                }
            },
            this._audioSource,
            () => {
                if (!this.#ended && this._audioSource !== "silence") {
                    process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Audio playback completed\n`);
                    this.end("completed");
                }
            },
            {
                repeat: this._repeatAudio,
                durationMs: this._durationMs,
            }
        );
        this.audioFeeder.start();
    };

    stopAudio = () => {
        if (this.audioFeeder) {
            this.audioFeeder.stop();
            this.audioFeeder = null;
            process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Audio stream stopped\n`);
        }
    };

    end = (reason = "completed") => {
        if (this.#ended)
            return;
        this.#ended = true;
        this.endedAt = Date.now();
        this.#clearTimers();
        this.stopAudio();
        this.#setStatus("ending");
        if (this.engine && reason !== "remote_end" && reason !== "rejected") {
            try {
                this.engine.endCall(0, true);
            } catch { }
        }
        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Call ended: ${reason}\n`);
        this.#setStatus("ended");
        this.emit("ended", reason);
        this.#endResolver(reason);
    };

    mute = (muted) => {
        try {
            this.engine?.setMute?.(muted);
        }
        catch { }
    };

    waitForEnd = () => this.#endPromise;

    /** @internal */
    _setStatus = (status) => {
        if (this.#status === status)
            return;
        this.#status = status;
        this.emit("stateChange", status);
    };

    /** @internal */
    _confirmRinging = () => {
        if (this.#preRingingTimer) {
            clearTimeout(this.#preRingingTimer);
            this.#preRingingTimer = null;
        }
        if (this.#status !== "ringing" && this.#status !== "accepted" && this.#status !== "connected" && this.#status !== "audio_ready" && this.#status !== "streaming") {
            process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Remote device ringing\n`);
            this.#setStatus("ringing");
            this.emit("ringing");
        }
    };

    /** @internal */
    _confirmAccepted = () => {
        if (this.#preRingingTimer) {
            clearTimeout(this.#preRingingTimer);
            this.#preRingingTimer = null;
        }
        if (this.#status !== "accepted" && this.#status !== "connected" && this.#status !== "audio_ready" && this.#status !== "streaming") {
            process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Call accepted\n`);
            this.#setStatus("accepted");
            this.emit("accepted");
        }
    };

    /** @internal */
    _confirmConnected = () => {
        if (this.#preRingingTimer) {
            clearTimeout(this.#preRingingTimer);
            this.#preRingingTimer = null;
        }
        if (this.#status !== "connected" && this.#status !== "audio_ready" && this.#status !== "streaming") {
            this.connectedAt = Date.now();
            process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Media connection established\n`);
            this.#setStatus("connected");
            this.emit("connected");
        }
    };

    /** @internal */
    _confirmAudioReady = () => {
        if (this.#status !== "audio_ready" && this.#status !== "streaming") {
            process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Audio pipeline ready\n`);
            this.#setStatus("audio_ready");
            this.emit("audioReady");
        }
    };

    /** @internal */
    _confirmStreaming = () => {
        if (this.#status !== "streaming") {
            process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Starting audio stream (source: ${this._audioSource}, repeat: ${this._repeatAudio}, duration: ${this._durationMs}ms)\n`);
            this.#setStatus("streaming");
            this.emit("streaming");
        }
    };

    /** @internal — called by VoipClient on WASM call-state change */
    _updateState = (state) => {
        this.#state = state;
        if (state === CallState.PreacceptReceived) {
            this._confirmRinging();
        }
        else if (state === CallState.AcceptReceived) {
            this._confirmAccepted();
        }
        else if (state === CallState.Active) {
            this._confirmConnected();
        }
        else if (state === CallState.Idle || state === CallState.Ending) {
            this._forceEnd("ended");
        }
    };

    /** @internal — called by VoipClient on signaling events */
    _handleSignalingEvent = (tag, reason) => {
        if (this.#ended)
            return;
        if (tag === "terminate") {
            const normalizedReason = String(reason || "").toLowerCase();
            if (normalizedReason.includes("unavailable") || normalizedReason.includes("peer_offline")) {
                this._handleUnreachable("recipient is unavailable");
            }
            else if (normalizedReason.includes("timeout")) {
                this._handleTimeout("no response from recipient");
            }
            else if (normalizedReason.includes("reject") || normalizedReason.includes("declined")) {
                this._handleRejected("call rejected by remote device");
            }
            else {
                this._forceEnd(reason || "remote_end");
            }
        }
        else if (tag === "reject") {
            this._handleRejected("call rejected by remote device");
        }
        else if (tag === "preaccept" || tag === "ringing" || tag === "receipt") {
            this._confirmRinging();
        }
        else if (tag === "accept") {
            this._confirmAccepted();
        }
    };

    /** @internal — called by VoipClient on signaling errors */
    _handleSignalingError = (signalingTag, errorType) => {
        if (this.#ended)
            return;
        if (errorType === "unreachable" || errorType === "error_404" || errorType === "error_480") {
            this._handleUnreachable("recipient is unreachable");
        }
        else if (errorType === "ack_timeout") {
            this._handleTimeout("signaling ack timed out");
        }
        else {
            this._forceFail(`signaling error (${errorType})`);
        }
    };

    /** @internal */
    _handleUnreachable = (detail = "recipient is unavailable") => {
        if (this.#ended)
            return;
        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Recipient unreachable\n`);
        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Call failed: ${detail}\n`);
        this.#setStatus("unreachable");
        this._forceEnd("unreachable");
    };

    /** @internal */
    _handleRejected = (detail = "call rejected") => {
        if (this.#ended)
            return;
        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Call rejected: ${detail}\n`);
        this.#setStatus("rejected");
        this._forceEnd("rejected");
    };

    /** @internal */
    _handleTimeout = (detail = "timed out") => {
        if (this.#ended)
            return;
        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Call timed out: ${detail}\n`);
        this.#setStatus("timeout");
        this._forceEnd("timeout");
    };

    /** @internal */
    _forceFail = (reason) => {
        if (this.#ended)
            return;
        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Call failed: ${reason}\n`);
        this.#setStatus("failed");
        this.emit("error", new Error(`VoIP call failed: ${reason}`));
        this._forceEnd(reason);
    };

    /** @internal */
    _emitAudio = (pcm) => { this.emit("audio", pcm); };

    /** @internal */
    _forceEnd = (reason) => {
        if (this.#ended)
            return;
        this.#ended = true;
        this.endedAt = Date.now();
        this.#clearTimers();
        this.stopAudio();
        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Call ended: ${reason}\n`);
        if (this.#status !== "unreachable" && this.#status !== "rejected" && this.#status !== "timeout" && this.#status !== "failed") {
            this.#setStatus("ended");
        }
        this.emit("ended", reason);
        this.#endResolver(reason);
    };

    #handlePreRingingTimeout = (timeoutMs) => {
        if (this.#ended || this.#status === "ringing" || this.#status === "accepted" || this.#status === "connected" || this.#status === "audio_ready" || this.#status === "streaming") {
            return;
        }
        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] No ringing state received (timed out after ${timeoutMs}ms)\n`);
        this._handleUnreachable("recipient unreachable or unavailable");
    };

    #clearTimers = () => {
        if (this.#endTimer) {
            clearTimeout(this.#endTimer);
            this.#endTimer = null;
        }
        if (this.#preRingingTimer) {
            clearTimeout(this.#preRingingTimer);
            this.#preRingingTimer = null;
        }
    };

    #setStatus = (status) => {
        this._setStatus(status);
    };
}

/** Top-level client. Connects to WhatsApp and lets you place calls. */
export class VoipClient {
    #config;
    #signaling = null;
    #sock = null;
    #activeCalls = new Map();
    #baileys = null;
    #maxConcurrentCalls = 0;
    #initialized = false;

    constructor(config = {}) {
        this.#config = config;
        this.#maxConcurrentCalls = Number(config.maxConcurrentCalls ?? 0);
    }

    setOptions = (options = {}) => {
        if (options.maxConcurrentCalls !== undefined) {
            this.#maxConcurrentCalls = Number(options.maxConcurrentCalls);
        }
    };

    getActiveCalls = () => Array.from(this.#activeCalls.values()).map(call => call.getSummary());

    getCall = (callId) => this.#activeCalls.get(callId);

    getActiveCallCount = () => this.#activeCalls.size;

    endCall = (callId) => {
        if (!callId) {
            throw new Error("callId is required for endCall. Use endAllCalls() to end all calls.");
        }
        const call = this.#activeCalls.get(callId);
        if (call) {
            call.end("completed");
        }
    };

    endAllCalls = () => {
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
        process.stderr.write(`[VOIP] Call stack initializing...\n`);
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
        this.#initialized = true;

        this.#sock.ws.on("CB:call", (node) => {
            this.#signaling?.processIncomingCall(node);
        });
        this.#sock.ws.on("CB:receipt", (node) => {
            if (!isCallReceiptNode(node))
                return;
            this.#signaling?.processIncomingReceipt(node);
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
        this.#initialized = true;

        this.#sock.ws.on("CB:call", (node) => {
            this.#signaling?.processIncomingCall(node);
        });
        this.#sock.ws.on("CB:receipt", (node) => {
            if (!isCallReceiptNode(node))
                return;
            this.#signaling?.processIncomingReceipt(node);
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
        process.stderr.write(`[VOIP][call:${callId.slice(0, 8)}] Call initiated to ${phoneNumber}\n`);

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

        process.stderr.write(`[VOIP][call:${callId.slice(0, 8)}] Waiting for remote ringing state...\n`);
        callEngine.startCall({
            peerJid: peerLid,
            peerPn: targetPnJid,
            peerList: deviceList,
            callId,
            isVideo: false,
            isLidCall: isLidCall,
            isFromDialer: false,
            extraData: tcToken,
        });

        return call;
    };

    /** Tear down the WhatsApp socket and release resources. */
    disconnect = () => {
        this.endAllCalls();
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
}
