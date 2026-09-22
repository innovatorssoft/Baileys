/**
 * Unified VoIP Call Session.
 *
 * Represents an active, ringing, or terminating VoIP call session (incoming or outgoing).
 * Manages media feeders, WASM engine callbacks, state transitions, and deterministic cleanup.
 *
 * @author InnovatorsSoft
 */
import { EventEmitter } from "node:events";
import { CallDirection, CallMediaType, CallState } from "./types.mjs";
import { AudioFeeder } from "./audio-feeder.mjs";
import { VideoFeeder } from "./video-feeder.mjs";

const DEFAULT_PRE_RINGING_TIMEOUT_MS = 20_000;
const DEFAULT_INCOMING_TIMEOUT_MS = 30_000;

export class CallSession extends EventEmitter {
    callId;
    peerJid;
    callCreator;
    phoneNumber;
    callerPn = "";
    direction = CallDirection.Outgoing;
    mediaType = CallMediaType.Audio;

    engine = null;
    relay = null;
    manager = null;
    options = {};

    startedAt;
    connectedAt = null;
    endedAt = null;

    #state = CallState.Idle;
    #status = "initiating";
    #endResolver;
    #endPromise;
    #endTimer = null;
    #ringingTimer = null;
    #ended = false;
    #isWaiting = false;

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
    isHorizontal = false;
    /** @internal */
    _videoOrientation = 0;
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

    /** @internal */
    _captureReady = false;
    /** @internal */
    _videoReady = false;
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

    constructor(callIdOrInit, peerJid, engine, options = {}, phoneNumber = "") {
        super();
        this.startedAt = Date.now();
        this.#endPromise = new Promise((res) => { this.#endResolver = res; });

        if (typeof callIdOrInit === "object" && callIdOrInit !== null) {
            const init = callIdOrInit;
            this.callId = init.callId;
            this.peerJid = init.peerJid;
            this.callCreator = init.callCreator || init.peerJid;
            this.phoneNumber = init.phoneNumber || init.peerJid;
            this.callerPn = init.callerPn || "";
            this.direction = init.direction || CallDirection.Outgoing;
            this.mediaType = init.mediaType || (init.isVideo ? CallMediaType.Video : CallMediaType.Audio);
            this.engine = init.engine ?? null;
            this.relay = init.relay ?? null;
            this.manager = init.manager ?? null;
            this.options = init.options || {};
            this.#isWaiting = Boolean(init.isWaiting);
        } else {
            this.callId = String(callIdOrInit);
            this.peerJid = String(peerJid);
            this.phoneNumber = phoneNumber || peerJid;
            this.callCreator = peerJid;
            this.engine = engine;
            this.options = options;
            this.direction = options.direction || CallDirection.Outgoing;
            this.mediaType = options.isVideo ? CallMediaType.Video : CallMediaType.Audio;
        }

        this.isVideo = this.mediaType === CallMediaType.Video || Boolean(this.options.isVideo);
        this.isHorizontal = Boolean(this.options.isHorizontal ?? this.options.horizontal ?? false);
        this._videoOrientation = Number(
            this.options.orientation ??
            this.options.videoOrientation ??
            (this.isHorizontal ? 2 : 0)
        );
        this._durationMs = Number(this.options.durationMs ?? this.options.durationMS ?? 120_000);
        this._audioSource = this.options.audioSource ?? "silence";
        this._repeatAudio = Boolean(this.options.repeatAudio ?? this.options.repeat ?? false);

        this._videoSource = this.options.videoSource ?? null;
        this._videoLoop = Boolean(this.options.videoLoop ?? this.options.repeatVideo ?? false);
        this._videoWidth = Number(this.options.videoWidth ?? this.options.width ?? 640);
        this._videoHeight = Number(this.options.videoHeight ?? this.options.height ?? 480);
        this._videoFps = Number(this.options.videoFps ?? this.options.fps ?? 15);

        if (this.direction === CallDirection.Incoming) {
            this.#state = CallState.ReceivedCall;
            this.#status = this.#isWaiting ? "waiting" : "incoming_ringing";
            const timeoutMs = Number(this.options.incomingCallTimeoutMs ?? DEFAULT_INCOMING_TIMEOUT_MS);
            if (timeoutMs > 0) {
                this.#ringingTimer = setTimeout(() => this.#handleRingTimeout(), timeoutMs);
                if (this.#ringingTimer?.unref) this.#ringingTimer.unref();
            }
        } else {
            this.#state = CallState.Calling;
            this.#status = "initiating";
            if (this.isVideo && !this._videoSource) {
                throw new Error("videoSource is required for an outbound video call");
            }
            if (this._durationMs > 0) {
                this.#endTimer = setTimeout(() => this.end("completed"), this._durationMs);
                if (this.#endTimer?.unref) this.#endTimer.unref();
            }
            const preRingingTimeoutMs = Number(this.options.preRingingTimeoutMs ?? DEFAULT_PRE_RINGING_TIMEOUT_MS);
            if (preRingingTimeoutMs > 0) {
                this.#ringingTimer = setTimeout(() => this.#handlePreRingingTimeout(preRingingTimeoutMs), preRingingTimeoutMs);
                if (this.#ringingTimer?.unref) this.#ringingTimer.unref();
            }
        }
    }

    get state() { return this.#state; }
    get status() { return this.#status; }
    get ended() { return this.#ended; }
    get isWaiting() { return this.#isWaiting; }
    get isIncoming() { return this.direction === CallDirection.Incoming; }
    get isOutgoing() { return this.direction === CallDirection.Outgoing; }
    get canAccept() { return this.isIncoming && !this.#ended && (this.#status === "incoming_ringing" || this.#status === "ringing" || this.#status === "waiting"); }

    getSummary = () => ({
        id: this.callId,
        jid: this.peerJid,
        direction: this.direction,
        mediaType: this.mediaType,
        callCreator: this.callCreator,
        callerPn: this.callerPn,
        status: this.#status,
        state: this.#state,
        startedAt: this.startedAt,
        connectedAt: this.connectedAt,
        endedAt: this.endedAt,
        durationMs: this._durationMs,
        audioSource: this._audioSource,
        repeatAudio: this._repeatAudio,
        isVideo: this.isVideo,
        isHorizontal: this.isHorizontal,
        videoOrientation: this._videoOrientation,
        videoSource: this._videoSource,
    });

    /**
     * Accept an incoming call.
     */
    accept = async (opts = {}) => {
        if (!this.isIncoming) {
            throw new Error(`Cannot accept an outgoing call (${this.callId})`);
        }
        if (this.#ended) {
            throw new Error(`Cannot accept an already ended call (${this.callId})`);
        }
        if (this.manager) {
            return this.manager.acceptCall(this.callId, opts);
        }
        this._confirmAccepted();
    };

    /**
     * Reject an incoming or ringing call.
     */
    reject = async (reason = "declined") => {
        if (this.#ended) return;
        if (this.manager && this.isIncoming) {
            return this.manager.rejectCall(this.callId, reason);
        }
        this._handleRejected(reason);
    };

    /**
     * End the active call.
     */
    end = async (reason = "completed") => {
        if (this.#ended)
            return;
        if (this.manager) {
            return this.manager.endCall(this.callId, reason);
        }
        this._forceEnd(reason);
    };

    mute = (muted = true) => {
        try {
            this.engine?.setMute?.(Boolean(muted));
        }
        catch { }
    };

    unmute = () => {
        return this.mute(false);
    };

    waitForEnd = () => this.#endPromise;

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
        }
    };

    startVideo = (sendVideoFrameFn) => {
        if (this.#ended || this.videoFeeder || !this._videoSource)
            return;
        this.emit("videoStarted");
        try {
            this.videoFeeder = new VideoFeeder(
                this._videoSource,
                (frameBuf, width, height, fps) => {
                    if (!this.#ended) {
                        sendVideoFrameFn(frameBuf, width, height, fps);
                    }
                },
                () => {
                    if (!this.#ended) {
                        this.emit("videoEnded");
                    }
                },
                (err) => {
                    if (!this.#ended) {
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
            this.emit("videoError", err);
        }
    };

    stopVideo = () => {
        if (this.videoFeeder) {
            this.videoFeeder.stop();
            this.videoFeeder = null;
        }
    };

    /** @internal */
    _setStatus = (status) => {
        if (this.#status === status)
            return;
        if (this.#ended && status !== "ended")
            return;
        this.#status = status;
        this.emit("stateChange", status);
    };

    /** @internal */
    _confirmRinging = () => {
        if (this.#ended)
            return;
        this.#clearRingingTimer();
        this.#isWaiting = false;
        const activeStatuses = ["ringing", "incoming_ringing", "accepted", "connected", "audio_ready", "streaming"];
        if (!activeStatuses.includes(this.#status) || this.#status === "waiting") {
            const nextStatus = this.isIncoming ? "incoming_ringing" : "ringing";
            this._setStatus(nextStatus);
            this.emit("ringing");
        }
    };

    /** @internal */
    _unblock = () => {
        if (this.#ended)
            return;
        this.#isWaiting = false;
        this._confirmRinging();
    };

    /** @internal */
    _confirmAccepted = () => {
        if (this.#ended)
            return;
        this.#clearRingingTimer();
        const connectedStatuses = ["accepted", "connected", "audio_ready", "streaming"];
        if (!connectedStatuses.includes(this.#status)) {
            this._setStatus("accepted");
            this.emit("accepted");
        }
    };

    /** @internal */
    _confirmConnected = () => {
        if (this.#ended)
            return;
        this.#clearRingingTimer();
        const streamingStatuses = ["connected", "audio_ready", "streaming"];
        if (!streamingStatuses.includes(this.#status)) {
            this.connectedAt = Date.now();
            this._setStatus("connected");
            this.emit("connected");
        }
    };

    /** @internal */
    _confirmAudioReady = () => {
        if (this.#ended)
            return;
        if (this.#status !== "audio_ready" && this.#status !== "streaming") {
            this._setStatus("audio_ready");
            this.emit("audioReady");
        }
    };

    /** @internal */
    _confirmStreaming = () => {
        if (this.#ended)
            return;
        if (this.#status !== "streaming") {
            this._setStatus("streaming");
            this.emit("streaming");
        }
    };

    /** @internal */
    _updateState = (state) => {
        this.#state = state;
        if (state === CallState.PreacceptReceived) {
            this._confirmRinging();
        }
        else if (state === CallState.AcceptReceived || state === CallState.AcceptSent) {
            this._confirmAccepted();
        }
        else if (state === CallState.Active) {
            this._confirmConnected();
        }
        else if (state === CallState.Idle || state === CallState.Ending) {
            this._forceEnd("ended");
        }
    };

    /** @internal */
    _handleSignalingEvent = (tag, reason) => {
        if (this.#ended)
            return;
        if (tag === "terminate") {
            const normalized = String(reason || "").toLowerCase();
            // Multi-device notification: another device accepted this call elsewhere.
            // If we are the accepting device (already accepted/connected/streaming), ignore it.
            if (normalized === "accepted_elsewhere") {
                const activeStatuses = ["accepted", "connected", "audio_ready", "streaming"];
                if (activeStatuses.includes(this.#status)) {
                    return;
                }
            }
            if (normalized.includes("unavailable") || normalized.includes("peer_offline")) {
                this._handleUnreachable("recipient is unavailable");
            }
            else if (normalized.includes("timeout")) {
                this._handleTimeout("no response from recipient");
            }
            else if (normalized.includes("reject") || normalized.includes("declined")) {
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

    /** @internal */
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
        this._setStatus("unreachable");
        this._forceEnd("unreachable");
    };

    /** @internal */
    _handleRejected = (detail = "call rejected") => {
        if (this.#ended)
            return;
        this._setStatus("rejected");
        this._forceEnd("rejected");
    };

    /** @internal */
    _handleTimeout = (detail = "timed out") => {
        if (this.#ended)
            return;
        this._setStatus("timeout");
        this._forceEnd("timeout");
    };

    /** @internal */
    _forceFail = (reason) => {
        if (this.#ended)
            return;
        this._setStatus("failed");
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
        this.stopVideo();

        const terminalStatuses = ["unreachable", "rejected", "timeout", "failed"];
        if (!terminalStatuses.includes(this.#status)) {
            this._setStatus("ended");
        }
        this.emit("ended", reason);
        this.#endResolver(reason);
    };

    #handlePreRingingTimeout = (timeoutMs) => {
        if (this.#ended) return;
        const activeStatuses = ["ringing", "accepted", "connected", "audio_ready", "streaming"];
        if (!activeStatuses.includes(this.#status)) {
            this._handleUnreachable("recipient unreachable or unavailable");
        }
    };

    #handleRingTimeout = () => {
        if (this.#ended) return;
        const connectedStatuses = ["accepted", "connected", "audio_ready", "streaming"];
        if (!connectedStatuses.includes(this.#status)) {
            this._handleTimeout("incoming call ring timeout");
        }
    };

    #clearRingingTimer = () => {
        if (this.#ringingTimer) {
            clearTimeout(this.#ringingTimer);
            this.#ringingTimer = null;
        }
    };

    #clearTimers = () => {
        if (this.#endTimer) {
            clearTimeout(this.#endTimer);
            this.#endTimer = null;
        }
        this.#clearRingingTimer();
    };
}

/** Backwards-compatible alias for ActiveCall */
export const ActiveCall = CallSession;
