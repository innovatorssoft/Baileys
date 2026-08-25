/**
 * baileys-caller — WhatsApp voice calling for Node.js.
 *
 * Wraps WhatsApp Web's official VoIP WASM stack and routes signaling through
 * Baileys. Public surface:
 *
 *   const client = new VoipClient({ authDir })
 *   await client.connect()
 *   const call = await client.call("12345678901", { audioSource: "./hi.mp3", durationMs: 30000, repeatAudio: true })
 *
 * @author ShellTear
 */
import { EventEmitter } from "node:events";
import { randomBytes, createHmac } from "node:crypto";
import { resolve } from "node:path";
import { WasmEngine, ensureWasmAssets } from "./wasm-engine.mjs";
import { RelayRtcTransport } from "./relay-transport.mjs";
import { SignalingBridge } from "./signaling.mjs";
import { AudioFeeder } from "./audio-feeder.mjs";
import { CallState } from "./types.mjs";

export { CallState } from "./types.mjs";
export { ensureWasmAssets } from "./wasm-engine.mjs";

const SHA256_LEN = 32;
const DEFAULT_PRE_RINGING_TIMEOUT_MS = 20_000;

const loadBaileys = async () => {
    try {
        return await import("@whiskeysockets/baileys");
    }
    catch {
        try {
            return await import("../index.js");
        }
        catch {
            throw new Error("Could not import Baileys module.");
        }
    }
};

const toBareJid = (jid) => {
    if (!jid)
        return jid;
    const at = jid.indexOf("@");
    if (at < 0)
        return jid;
    const user = jid.slice(0, at).split(":")[0];
    return `${user}@${jid.slice(at + 1)}`;
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
    engine;
    options;

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

    constructor(callId, peerJid, engine, options = {}) {
        super();
        this.callId = callId;
        this.peerJid = peerJid;
        this.engine = engine;
        this.options = options;

        this._durationMs = Number(options.durationMs ?? options.durationMS ?? 120_000);
        this._audioSource = options.audioSource ?? "silence";
        this._repeatAudio = Boolean(options.repeatAudio ?? options.repeat ?? false);

        this.#endPromise = new Promise((res) => { this.#endResolver = res; });

        if (this._durationMs > 0) {
            this.#endTimer = setTimeout(() => this.end(), this._durationMs);
        }

        const preRingingTimeoutMs = Number(options.preRingingTimeoutMs ?? DEFAULT_PRE_RINGING_TIMEOUT_MS);
        if (preRingingTimeoutMs > 0) {
            this.#preRingingTimer = setTimeout(() => this.#handlePreRingingTimeout(preRingingTimeoutMs), preRingingTimeoutMs);
        }
    }

    get state() { return this.#state; }
    get status() { return this.#status; }
    get ended() { return this.#ended; }

    end = () => {
        if (this.#ended)
            return;
        this.#ended = true;
        this.#clearTimers();
        this.#setStatus("ending");
        try {
            this.engine.endCall(0, true);
        }
        catch { }
        process.stderr.write(`[VOIP] Call ended: completed\n`);
        this.#setStatus("ended");
        this.emit("ended", "completed");
        this.#endResolver("completed");
    };

    mute = (muted) => {
        try {
            this.engine.setMute(muted);
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
            process.stderr.write(`[VOIP] Remote device ringing\n`);
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
            process.stderr.write(`[VOIP] Call accepted\n`);
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
            process.stderr.write(`[VOIP] Media connection established\n`);
            this.#setStatus("connected");
            this.emit("connected");
        }
    };

    /** @internal */
    _confirmAudioReady = () => {
        if (this.#status !== "audio_ready" && this.#status !== "streaming") {
            process.stderr.write(`[VOIP] Audio pipeline ready\n`);
            this.#setStatus("audio_ready");
            this.emit("audioReady");
        }
    };

    /** @internal */
    _confirmStreaming = () => {
        if (this.#status !== "streaming") {
            process.stderr.write(`[VOIP] Starting audio stream (source: ${this._audioSource}, repeat: ${this._repeatAudio}, duration: ${this._durationMs}ms)\n`);
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
        else if (tag === "preaccept" || tag === "ringing") {
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
        process.stderr.write(`[VOIP] Recipient unreachable\n`);
        process.stderr.write(`[VOIP] Call failed: ${detail}\n`);
        this.#setStatus("unreachable");
        this._forceEnd("unreachable");
    };

    /** @internal */
    _handleRejected = (detail = "call rejected") => {
        if (this.#ended)
            return;
        process.stderr.write(`[VOIP] Call rejected: ${detail}\n`);
        this.#setStatus("rejected");
        this._forceEnd("rejected");
    };

    /** @internal */
    _handleTimeout = (detail = "timed out") => {
        if (this.#ended)
            return;
        process.stderr.write(`[VOIP] Call timed out: ${detail}\n`);
        this.#setStatus("timeout");
        this._forceEnd("timeout");
    };

    /** @internal */
    _forceFail = (reason) => {
        if (this.#ended)
            return;
        process.stderr.write(`[VOIP] Call failed: ${reason}\n`);
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
        this.#clearTimers();
        try {
            this.engine.endCall(0, true);
        }
        catch { }
        process.stderr.write(`[VOIP] Call ended: ${reason}\n`);
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
        process.stderr.write(`[VOIP] No ringing state received (timed out after ${timeoutMs}ms)\n`);
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
    #engine = null;
    #relay = null;
    #signaling = null;
    #sock = null;
    #activeCall = null;
    #baileys = null;

    // Capture state populated when WASM negotiates audio params
    #captureReady = false;
    #capturePtr = 0;
    #captureChunkBytes = 0;
    #captureSampleRate = 16000;
    #captureChannels = 1;
    #captureFramesPerChunk = 320;
    #feeder = null;

    constructor(config) {
        this.#config = config;
    }

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
            fatal: () => { },
        };
        const createSocket = () => makeSocket({
            auth: state,
            emitOwnEvents: true,
            logger: silentLogger,
        });

        await new Promise((resolveOpen, rejectOpen) => {
            let opened = false;
            let retries = 0;
            const maxRetries = 5;
            const connectSocket = () => {
                this.#sock = createSocket();
                this.#sock.ev.on("creds.update", saveCreds);
                process.removeAllListeners("uncaughtException");
                process.on("uncaughtException", (err) => {
                    const code = err?.output?.statusCode ?? err?.data?.attrs?.code;
                    if ((code === 515 || code === "515") && !opened && retries < maxRetries) {
                        retries += 1;
                        setTimeout(connectSocket, 1500);
                    }
                    else if (!opened) {
                        rejectOpen(err);
                    }
                });
                this.#sock.ev.on("connection.update", (update) => {
                    if (update.qr) {
                        void import("qrcode-terminal")
                            .then((qrt) => (qrt.default ?? qrt).generate(update.qr, { small: true }))
                            .catch(() => {
                            console.log("Scan this QR code in WhatsApp > Linked Devices:");
                            console.log(update.qr);
                        });
                    }
                    if (update.connection === "open") {
                        opened = true;
                        process.removeAllListeners("uncaughtException");
                        resolveOpen();
                        return;
                    }
                    if (update.connection === "close" && !opened) {
                        const statusCode = update.lastDisconnect?.error?.output?.statusCode;
                        const shouldReconnect = statusCode === 515 || statusCode === DisconnectReason?.restartRequired;
                        if (shouldReconnect && retries < maxRetries) {
                            retries += 1;
                            setTimeout(connectSocket, 1000);
                        }
                        else {
                            rejectOpen(update.lastDisconnect?.error ?? new Error("socket closed before open"));
                        }
                    }
                });
            };
            connectSocket();
        });

        await this.#setupVoipComponents();
        process.stderr.write(`[VOIP] Signaling established\n`);
    };

    /** Attach an already connected Baileys socket directly. */
    initWithSocket = async (sock) => {
        this.#sock = sock;
        ensureWasmAssets();
        this.#baileys = await loadBaileys();
        await this.#setupVoipComponents();
        process.stderr.write(`[VOIP] Signaling established\n`);
    };

    #setupVoipComponents = async () => {
        this.#signaling = new SignalingBridge({ sock: this.#sock });
        await this.#signaling.init();

        this.#signaling.setSignalingEventListener((tag, reason, callId, peerJid) => {
            if (this.#activeCall && (!callId || this.#activeCall.callId === callId)) {
                this.#activeCall._handleSignalingEvent(tag, reason);
            }
        });

        this.#signaling.setSignalingErrorListener((signalingTag, errorType, peerJid) => {
            if (this.#activeCall) {
                this.#activeCall._handleSignalingError(signalingTag, errorType);
            }
        });

        this.#relay = new RelayRtcTransport({
            onTransportMessage: (data, ip, port) => this.#engine?.handleOnTransportMessage(data, ip, port),
            onIceRtt: (rttMs, ip, port) => this.#engine?.updateIceRtt(rttMs, ip, port),
        });

        this.#engine = new WasmEngine({
            callbacks: {
                onSignalingXmpp: (peerJid, callId, xmlPayload) => this.#signaling.sendSignaling(peerJid, callId, xmlPayload),
                onCallEvent: (eventType, eventData) => this.#handleCallEvent(eventType, eventData),
                sendDataToRelay: (data, ip, port) => this.#relay.send(data, ip, port),
                onAudioCaptureInit: (config) => this.#handleAudioCaptureInit(config),
                onAudioCaptureStart: () => this.#handleAudioCaptureStart(),
                onAudioCaptureStop: () => this.#handleAudioCaptureStop(),
                onAudioPlaybackData: (audioData) => this.#activeCall?._emitAudio(audioData),
                cryptoHkdf: computeHkdf,
                hmacSha256: computeHmacSha256,
            },
        });

        await this.#engine.initialize();
        this.#signaling.attachEngine(this.#engine);

        const selfPnJid = this.#sock.authState.creds.me?.id;
        const selfLidJid = this.#sock.authState.creds.me?.lid;
        this.#engine.initVoipStack(selfPnJid, toBareJid(selfPnJid), selfLidJid);
        await this.#engine.waitForVoipStackReady();

        try {
            this.#engine.updateNetworkMedium(2, 0);
        }
        catch { }

        this.#sock.ws.on("CB:call", (node) => {
            this.#signaling.processIncomingCall(node, this.#engine, this.#activeCall?.callId ?? "");
        });

        this.#sock.ws.on("CB:receipt", (node) => {
            if (!isCallReceiptNode(node))
                return;
            this.#signaling.processIncomingReceipt(node, this.#engine, this.#activeCall?.callId ?? "");
        });
    };

    /** Place an outbound voice call. */
    call = async (phoneNumber, opts = {}) => {
        if (!this.#engine || !this.#signaling)
            throw new Error("Not connected. Call connect() first.");
        if (this.#activeCall && !this.#activeCall.ended)
            throw new Error("A call is already active.");

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

        process.stderr.write(`[VOIP] Call initiated to ${phoneNumber}\n`);
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
        const call = new ActiveCall(callId, targetPnJid, this.#engine, opts);
        this.#activeCall = call;

        call.on("ended", () => {
            if (this.#activeCall === call) {
                this.#handleAudioCaptureStop();
                this.#relay?.closeAll();
                this.#activeCall = null;
            }
        });

        process.stderr.write(`[VOIP] Waiting for remote ringing state...\n`);
        this.#engine.startCall({
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
        this.#activeCall?._forceEnd("disconnect");
        this.#handleAudioCaptureStop();
        this.#activeCall = null;
        this.#relay?.closeAll();
        this.#engine?.destroy();
        this.#sock?.end?.();
        this.#engine = null;
        this.#relay = null;
        this.#signaling = null;
        this.#sock = null;
    };

    // ─── private ──────────────────────────────────────────────────────────────
    #handleCallEvent = (eventType, eventData) => {
        if (eventType === 16 && eventData) {
            try {
                const parsed = JSON.parse(eventData);
                const info = parsed.call_info ?? parsed.callInfo ?? {};
                const callState = Number(info.call_state ?? info.callState ?? 0);
                this.#activeCall?._updateState(callState);
                if (callState === CallState.Active) {
                    this.#maybeStartAudio();
                }
            }
            catch { }
        }
        else if (eventType === 156 && eventData) {
            try {
                const update = JSON.parse(eventData);
                this.#relay?.updateRelayList(update);
            }
            catch { }
        }
        else if (eventType === 2) {
            this.#activeCall?._forceEnd("remote_end");
        }
    };

    #handleAudioCaptureInit = (config) => {
        if (!this.#engine)
            return;
        this.#captureSampleRate = config.sampleRate || 16000;
        this.#captureChannels = config.channels || 1;
        this.#captureFramesPerChunk = config.framesPerChunk || 320;
        const chunkSamples = this.#captureFramesPerChunk * this.#captureChannels;
        this.#captureChunkBytes = chunkSamples * Float32Array.BYTES_PER_ELEMENT;
        if (!this.#capturePtr) {
            this.#capturePtr = this.#engine.malloc(this.#captureChunkBytes);
        }
    };

    #handleAudioCaptureStart = () => {
        this.#captureReady = true;
        this.#maybeStartAudio();
    };

    #maybeStartAudio = () => {
        if (!this.#activeCall || this.#activeCall.ended)
            return;
        if (this.#activeCall.state !== CallState.Active)
            return; // Must be connected
        if (!this.#captureReady || !this.#capturePtr || !this.#engine)
            return; // Capture pipeline must be initialized
        if (this.#feeder)
            return; // Already streaming

        this.#activeCall._confirmAudioReady();
        this.#activeCall._confirmStreaming();

        const audioSource = this.#activeCall._audioSource;
        this.#feeder = new AudioFeeder(
            this.#captureSampleRate,
            this.#captureChannels,
            this.#captureFramesPerChunk,
            (chunk) => {
                if (this.#engine && this.#capturePtr && this.#activeCall && !this.#activeCall.ended) {
                    this.#engine.sendAudioData(chunk, this.#capturePtr);
                }
            },
            audioSource,
            () => {
                if (this.#activeCall && !this.#activeCall.ended && audioSource !== "silence") {
                    process.stderr.write(`[VOIP] Audio playback completed\n`);
                    this.#activeCall.end();
                }
            },
            {
                repeat: this.#activeCall._repeatAudio,
                durationMs: this.#activeCall._durationMs,
            }
        );
        this.#feeder.start();
    };

    #handleAudioCaptureStop = () => {
        this.#captureReady = false;
        if (this.#feeder) {
            this.#feeder.stop();
            this.#feeder = null;
            process.stderr.write(`[VOIP] Audio stream stopped\n`);
        }
        if (this.#engine && this.#capturePtr) {
            try {
                this.#engine.free(this.#capturePtr);
            }
            catch { }
            this.#capturePtr = 0;
        }
    };
}
