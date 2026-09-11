/**
 * Shared type definitions for baileys-caller.
 *
 * @author ShellTear
 */
/** Audio stream configuration reported by the WASM. */
export type AudioConfig = {
    sampleRate: number;
    channels: number;
    bitsPerSample: number;
    framesPerChunk: number;
};
/** Options for placing a call. */
export type CallOptions = {
    /** Phone number, digits only (e.g. `"12345678901"`), or JID format. */
    to?: string;
    /** Audio source: file path to MP3/WAV, or `"silence"` for an empty uplink. */
    audioSource?: string;
    /** Video source: file path to MP4/MKV/MOV/AVI video file. */
    videoSource?: string;
    /** Whether this is a video call (default: false). */
    isVideo?: boolean;
    /** Repeat/loop the video source continuously until durationMs is reached. */
    videoLoop?: boolean;
    repeatVideo?: boolean;
    loop?: boolean;
    /** Video resolution width (default: 640). */
    videoWidth?: number;
    width?: number;
    /** Video resolution height (default: 480). */
    videoHeight?: number;
    height?: number;
    /** Video frame rate (default: 15). */
    videoFps?: number;
    fps?: number;
    /** Stream video in horizontal (landscape) orientation if true. (default: false / portrait) */
    isHorizontal?: boolean;
    horizontal?: boolean;
    /** Explicit raw device/video orientation (0 = vertical/portrait, 2 = horizontal/landscape, etc.). */
    orientation?: number;
    videoOrientation?: number;
    /** Auto-hangup after N ms (default: 120000). */
    durationMs?: number;
    durationMS?: number;
    /** Repeat/loop the audio source continuously until durationMs is reached. */
    repeatAudio?: boolean;
    repeat?: boolean;
    /** Timeout waiting for remote device to confirm ringing in ms (default: 20000). */
    preRingingTimeoutMs?: number;
};
/** High-level deterministic call status strings. */
export type CallStatus =
    | "idle"
    | "initiating"
    | "signaling"
    | "ringing"
    | "accepted"
    | "media_connecting"
    | "connected"
    | "audio_ready"
    | "streaming"
    | "ending"
    | "ended"
    | "failed"
    | "unreachable"
    | "rejected"
    | "timeout";
/** Safe public descriptor of an active or recent call. */
export type CallSummary = {
    id: string;
    jid: string;
    status: CallStatus;
    state: CallState;
    startedAt: number;
    connectedAt?: number;
    endedAt?: number;
    durationMs: number;
    audioSource: string;
    repeatAudio: boolean;
    isVideo?: boolean;
    isHorizontal?: boolean;
    videoOrientation?: number;
    videoSource?: string | null;
};
/** Request object for batch call initiation. */
export type CallRequest = {
    jid: string;
    options?: CallOptions;
};
/** VoIP Manager configuration options. */
export type VoipConfigOptions = {
    maxConcurrentCalls?: number;
    onLimit?: "reject" | "queue";
};
/** Events emitted by an `ActiveCall`. */
export type CallEvents = {
    ringing: () => void;
    accepted: () => void;
    connected: () => void;
    audioReady: () => void;
    streaming: () => void;
    videoStarted: () => void;
    videoEnded: () => void;
    videoError: (err: Error) => void;
    stateChange: (status: CallStatus) => void;
    /** 16 kHz mono Float32 PCM frame from the remote peer. */
    audio: (pcm: Float32Array) => void;
    /** Reason: `"completed"` | `"hangup"` | `"timeout"` | `"unreachable"` | `"rejected"` | `"remote_end"` | `"disconnect"` | etc. */
    ended: (reason: string) => void;
    error: (err: Error) => void;
};
/** Top-level SDK configuration. */
export type VoipSdkConfig = {
    /** Path to a Baileys multi-file auth state directory. */
    authDir?: string;
    /** Optional maximum simultaneous outgoing calls limit. */
    maxConcurrentCalls?: number;
};
/** Mirrors the WhatsApp WASM `CallState` enum. */
export declare const CallState: {
    readonly Idle: 0;
    readonly Calling: 1;
    readonly PreacceptReceived: 2;
    readonly ReceivedCall: 3;
    readonly AcceptSent: 4;
    readonly AcceptReceived: 5;
    readonly Active: 6;
    readonly ActiveElsewhere: 7;
    readonly Ending: 13;
};
export type CallState = (typeof CallState)[keyof typeof CallState];
/** Relay list update payload from WASM call event 156. */
export type RelayListUpdate = {
    relay_key: string;
    relay_tokens: string[];
    auth_tokens?: string[];
    enable_edgeray_dtls_active_mode?: boolean;
    relays: ReadonlyArray<{
        relay_id: number;
        relay_name: string;
        token_id: number;
        auth_token_id?: number;
        addresses: ReadonlyArray<{
            protocol: number;
            ipv4?: string;
            ipv6?: string;
            port?: number;
            port_v6?: number;
        }>;
    }>;
};
