/**
 * Shared type definitions for baileys-caller.
 *
 * @author ShellTear
 */
export type AudioConfig = {
    sampleRate: number;
    channels: number;
    bitsPerSample: number;
    framesPerChunk: number;
};
export type CallOptions = {
    to?: string;
    audioSource?: string;
    videoSource?: string;
    isVideo?: boolean;
    videoLoop?: boolean;
    repeatVideo?: boolean;
    loop?: boolean;
    videoWidth?: number;
    width?: number;
    videoHeight?: number;
    height?: number;
    videoFps?: number;
    fps?: number;
    isHorizontal?: boolean;
    horizontal?: boolean;
    orientation?: number;
    videoOrientation?: number;
    durationMs?: number;
    durationMS?: number;
    repeatAudio?: boolean;
    repeat?: boolean;
    preRingingTimeoutMs?: number;
};
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
export type CallRequest = {
    jid: string;
    options?: CallOptions;
};
export type VoipConfigOptions = {
    maxConcurrentCalls?: number;
    onLimit?: "reject" | "queue";
};
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
    audio: (pcm: Float32Array) => void;
    ended: (reason: string) => void;
    error: (err: Error) => void;
};
export type VoipSdkConfig = {
    authDir?: string;
    maxConcurrentCalls?: number;
};
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
