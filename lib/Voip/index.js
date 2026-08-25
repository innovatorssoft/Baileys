"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoipClient = exports.ActiveCall = exports.CallState = exports.ensureWasmAssets = void 0;

const node_events_1 = require("node:events");
const types_1 = require("./types");
Object.defineProperty(exports, "CallState", { enumerable: true, get: function () { return types_1.CallState; } });

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
    engine;
    options;

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
exports.ActiveCall = ActiveCall;

class VoipClient {
    constructor(config) {
        this.config = config;
        this.clientPromise = (async () => {
            const mod = await getVoipModule();
            return new mod.VoipClient(config);
        })();
    }

    async connect() {
        const client = await this.clientPromise;
        return client.connect();
    }

    async initWithSocket(sock) {
        const client = await this.clientPromise;
        return client.initWithSocket(sock);
    }

    async call(phoneNumber, opts) {
        const client = await this.clientPromise;
        return client.call(phoneNumber, opts);
    }

    async disconnect() {
        const client = await this.clientPromise;
        return client.disconnect();
    }
}
exports.VoipClient = VoipClient;
