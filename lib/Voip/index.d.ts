import { EventEmitter } from "node:events";
import { WasmEngine } from "./wasm-engine.mjs";
import { CallState, CallStatus, CallSummary, CallRequest, VoipConfigOptions, VoipSdkConfig, CallOptions, CallDirection, CallMediaType, CallEvents } from "./types";
export type { VoipSdkConfig, CallOptions, CallEvents, AudioConfig, CallStatus, CallSummary, CallRequest, VoipConfigOptions } from "./types";
export { CallState, CallDirection, CallMediaType } from "./types";

export declare class CallSession extends EventEmitter {
    #private;
    readonly callId: string;
    readonly peerJid: string;
    readonly callCreator: string;
    readonly phoneNumber: string;
    readonly callerPn: string;
    readonly direction: CallDirection;
    readonly mediaType: CallMediaType;
    readonly isVideo: boolean;
    readonly isHorizontal: boolean;
    readonly startedAt: number;
    readonly connectedAt: number | null;
    readonly endedAt: number | null;

    constructor(callIdOrInit: any, peerJid?: string, engine?: any, options?: CallOptions, phoneNumber?: string);
    get state(): CallState;
    get status(): CallStatus;
    get ended(): boolean;
    get isWaiting(): boolean;
    get isIncoming(): boolean;
    get isOutgoing(): boolean;
    get canAccept(): boolean;
    getSummary(): CallSummary;
    accept(opts?: { audioSource?: string; videoSource?: string; repeatAudio?: boolean; isMicEnabled?: boolean; isCameraEnabled?: boolean }): Promise<void>;
    reject(reason?: string): Promise<void>;
    end(reason?: string): Promise<void>;
    mute(muted: boolean): void;
    waitForEnd(): Promise<string>;
    startAudio(sampleRate: number, channels: number, framesPerChunk: number, sendAudioChunkFn: (chunk: Float32Array) => void): void;
    stopAudio(): void;
    startVideo(sendVideoFrameFn: (frameBuf: ArrayBuffer | Uint8Array, width: number, height: number, fps: number) => void): void;
    stopVideo(): void;
    _updateState(state: number): void;
    _handleSignalingEvent(tag: string, reason: string): void;
    _handleSignalingError(tag: string, errorType: string): void;
    _emitAudio(pcm: Float32Array): void;
    _forceEnd(reason: string): void;
}

export declare const ActiveCall: typeof CallSession;
export type ActiveCall = CallSession;

export declare class VoipClient extends EventEmitter {
    #private;
    constructor(config?: VoipSdkConfig);
    setOptions: (options: VoipConfigOptions) => void;
    getActiveCalls: () => CallSummary[];
    getCall: (callId: string) => CallSession | undefined;
    getActiveCallCount: () => number;
    acceptCall: (callId: string, options?: { audioSource?: string; videoSource?: string; repeatAudio?: boolean; isMicEnabled?: boolean; isCameraEnabled?: boolean; pthreadPoolSize?: number | "auto" }) => Promise<CallSession>;
    rejectCall: (callId: string, reason?: string) => Promise<void>;
    getMemoryStats: () => any;
    endCall: (callId: string, reason?: string) => void;
    endAllCalls: () => void;
    callMany: (requests: CallRequest[]) => Promise<CallSession[]>;
    connect: () => Promise<void>;
    initWithSocket: (sock: any) => Promise<void>;
    call: (phoneNumber: string, opts?: CallOptions) => Promise<CallSession>;
    disconnect: () => void;
}
