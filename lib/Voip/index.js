"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoipClient = exports.ActiveCall = exports.VideoFeeder = exports.AudioFeeder = exports.CallState = exports.ensureWasmAssets = void 0;

const node_events_1 = require("node:events");
const types_1 = require("./types");
const audio_feeder_1 = require("./audio-feeder");
const video_feeder_1 = require("./video-feeder");
Object.defineProperty(exports, "CallState", { enumerable: true, get: function () { return types_1.CallState; } });
Object.defineProperty(exports, "AudioFeeder", { enumerable: true, get: function () { return audio_feeder_1.AudioFeeder; } });
Object.defineProperty(exports, "VideoFeeder", { enumerable: true, get: function () { return video_feeder_1.VideoFeeder; } });

const DEFAULT_PRE_RINGING_TIMEOUT_MS = 20_000;

let voipModulePromise = null;
const getVoipModule = async () => {
    if (!voipModulePromise) {
        voipModulePromise = import("./index.mjs");
    }
    return voipModulePromise;
};

const ensureWasmAssets = async () => {
    const mod = await getVoipModule();
    return mod.ensureWasmAssets();
};
exports.ensureWasmAssets = ensureWasmAssets;

class ActiveCall extends node_events_1.EventEmitter {
    callId;
    peerJid;
    phoneNumber;
    engine;
    options;
    startedAt;
    connectedAt = null;
    endedAt = null;
    relay = null;
    isPrimaryEngine = false;

    #state = types_1.CallState.Idle;
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
    isVideo = false;
    /** @internal */
    _videoSource = null;
    /** @internal */
    _videoLoop = false;
    /** @internal */
    _videoWidth = 640;
    /** @internal */
    _videoHeight = 480;
    /** @internal */
    _videoFps = 15;
    /** @internal */
    videoFeeder = null;

    constructor(callId, peerJid, engine, options = {}, phoneNumber = "") {
        super();
        this.callId = callId;
        this.peerJid = peerJid;
        this.phoneNumber = phoneNumber || peerJid;
        this.engine = engine;
        this.options = options;
        this.startedAt = Date.now();

        this.isVideo = Boolean(options.isVideo);
        this._durationMs = Number(options.durationMs ?? options.durationMS ?? 120_000);
        this._audioSource = options.audioSource ?? "silence";
        this._repeatAudio = Boolean(options.repeatAudio ?? options.repeat ?? false);

        this._videoSource = options.videoSource ?? null;
        this._videoLoop = Boolean(options.videoLoop ?? options.repeatVideo ?? false);
        this._videoWidth = Number(options.videoWidth ?? options.width ?? 640);
        this._videoHeight = Number(options.videoHeight ?? options.height ?? 480);
        this._videoFps = Number(options.videoFps ?? options.fps ?? 15);

        if (this.isVideo && !this._videoSource) {
            throw new Error("videoSource is required for a video call");
        }

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
        isVideo: this.isVideo,
        videoSource: this._videoSource,
    });

    startAudio = (sampleRate, channels, framesPerChunk, sendAudioChunkFn) => {
        if (this.#ended || this.audioFeeder)
            return;
        this._confirmAudioReady();
        this._confirmStreaming();
        this.audioFeeder = new audio_feeder_1.AudioFeeder(
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

    startVideo = (sendVideoFrameFn) => {
        if (this.#ended || this.videoFeeder || !this._videoSource)
            return;
        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Starting video stream (source: ${this._videoSource}, loop: ${this._videoLoop}, fps: ${this._videoFps})\n`);
        this.emit("videoStarted");
        try {
            this.videoFeeder = new video_feeder_1.VideoFeeder(
                this._videoSource,
                (frameBuf, width, height, fps) => {
                    if (!this.#ended) {
                        sendVideoFrameFn(frameBuf, width, height, fps);
                    }
                },
                () => {
                    if (!this.#ended) {
                        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Video playback completed (EOF)\n`);
                        this.emit("videoEnded");
                    }
                },
                (err) => {
                    if (!this.#ended) {
                        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Video playback error: ${err?.message || err}\n`);
                        this.emit("videoError", err);
                    }
                },
                {
                    width: this._videoWidth,
                    height: this._videoHeight,
                    fps: this._videoFps,
                    loop: this._videoLoop,
                    durationMs: this._durationMs,
                }
            );
            this.videoFeeder.start();
        }
        catch (err) {
            process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Failed to initialize VideoFeeder: ${err?.message || err}\n`);
            this.emit("videoError", err);
        }
    };

    stopVideo = () => {
        if (this.videoFeeder) {
            this.videoFeeder.stop();
            this.videoFeeder = null;
            process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Video stream stopped\n`);
        }
    };

    end = (reason = "completed") => {
        if (this.#ended)
            return;
        this.#ended = true;
        this.endedAt = Date.now();
        this.#clearTimers();
        this.stopAudio();
        this.stopVideo();
        this.#setStatus("ending");
        process.stderr.write(`[VOIP][call:${this.callId.slice(0, 8)}] Call ended: ${reason}\n`);
        if (this.#status !== "unreachable" && this.#status !== "rejected" && this.#status !== "timeout" && this.#status !== "failed") {
            this.#setStatus("ended");
        }
        this.emit("ended", reason);
        this.#endResolver(reason);
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
        if (state === types_1.CallState.PreacceptReceived) {
            this._confirmRinging();
        }
        else if (state === types_1.CallState.AcceptReceived) {
            this._confirmAccepted();
        }
        else if (state === types_1.CallState.Active) {
            this._confirmConnected();
        }
        else if (state === types_1.CallState.Idle || state === types_1.CallState.Ending) {
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
exports.ActiveCall = ActiveCall;

class VoipClient {
    constructor(config = {}) {
        this.config = config;
        this.clientPromise = null;
    }

    #getClient = async () => {
        if (!this.clientPromise) {
            this.clientPromise = (async () => {
                const mod = await getVoipModule();
                return new mod.VoipClient(this.config);
            })();
        }
        return this.clientPromise;
    };

    async setOptions(options) {
        const client = await this.#getClient();
        return client.setOptions(options);
    }

    async getActiveCalls() {
        const client = await this.#getClient();
        return client.getActiveCalls();
    }

    async getCall(callId) {
        const client = await this.#getClient();
        return client.getCall(callId);
    }

    async getActiveCallCount() {
        const client = await this.#getClient();
        return client.getActiveCallCount();
    }

    async endCall(callId) {
        const client = await this.#getClient();
        return client.endCall(callId);
    }

    async endAllCalls() {
        const client = await this.#getClient();
        return client.endAllCalls();
    }

    async callMany(requests) {
        const client = await this.#getClient();
        return client.callMany(requests);
    }

    async connect() {
        const client = await this.#getClient();
        return client.connect();
    }

    async initWithSocket(sock) {
        const client = await this.#getClient();
        return client.initWithSocket(sock);
    }

    async call(phoneNumber, opts) {
        const client = await this.#getClient();
        return client.call(phoneNumber, opts);
    }

    async disconnect() {
        const client = await this.#getClient();
        return client.disconnect();
    }
}
exports.VoipClient = VoipClient;
