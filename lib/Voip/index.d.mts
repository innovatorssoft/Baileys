/**
 * baileys-caller — WhatsApp voice calling for Node.js.
 *
 * Wraps WhatsApp Web's official VoIP WASM stack and routes signaling through
 * Baileys.
 *
 * @author InnovatorsSoft
 */
import { EventEmitter } from "node:events";
import { WasmEngine } from "./wasm-engine.mjs";
import { CallState, CallStatus, CallSummary, CallRequest, VoipConfigOptions, VoipSdkConfig, CallOptions, CallDirection, CallMediaType, CallEvents } from "./types.mjs";
export type { VoipSdkConfig, CallOptions, CallEvents, AudioConfig, CallStatus, CallSummary, CallRequest, VoipConfigOptions } from "./types.mjs";
export { CallState, CallDirection, CallMediaType } from "./types.mjs";
export { VoipResourceManager } from "./resource-manager.mjs";
export { CallManager } from "./call-manager.mjs";

/** A live or recently-ended call session. */
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
    mute(muted?: boolean): void;
    unmute(): void;
    waitForEnd(): Promise<string>;
    startAudio(sampleRate: number, channels: number, framesPerChunk: number, sendAudioChunkFn: (chunk: Float32Array) => void): void;
    stopAudio(): void;
    startVideo(sendVideoFrameFn: (frameBuf: ArrayBuffer | Uint8Array, width: number, height: number, fps: number) => void): void;
    stopVideo(): void;
    /** @internal */
    _updateState(state: number): void;
    /** @internal */
    _handleSignalingEvent(tag: string, reason: string): void;
    /** @internal */
    _handleSignalingError(tag: string, errorType: string): void;
    /** @internal */
    _emitAudio(pcm: Float32Array): void;
    /** @internal */
    _forceEnd(reason: string): void;
}

/** Backwards-compatible alias for CallSession */
export declare const ActiveCall: typeof CallSession;
export type ActiveCall = CallSession;

/** Top-level VoIP client. Connects to WhatsApp and manages VoIP calls. */
export declare class VoipClient extends EventEmitter {
    #private;
    constructor(config?: VoipSdkConfig);
    get callManager(): import("./call-manager.mjs").CallManager | null;
    get calls(): Map<string, CallSession>;
    setOptions: (options: VoipConfigOptions) => void;
    getActiveCalls: () => CallSummary[];
    getCall: (callId: string) => CallSession | undefined;
    getActiveCallCount: () => number;
    acceptCall: (callId: string, options?: { audioSource?: string; videoSource?: string; repeatAudio?: boolean; isMicEnabled?: boolean; isCameraEnabled?: boolean; pthreadPoolSize?: number | "auto" }) => Promise<CallSession>;
    rejectCall: (callId: string, reason?: string) => Promise<void>;
    muteCall: (callId: string, muted?: boolean) => boolean;
    unmuteCall: (callId: string) => boolean;
    getMemoryStats: () => any;
    endCall: (callId: string, reason?: string) => void;
    endAllCalls: () => void;
    callMany: (requests: CallRequest[]) => Promise<CallSession[]>;
    /** Connect to WhatsApp and bring up the WASM VoIP stack. */
    connect: () => Promise<void>;
    /** Attach an already connected Baileys socket directly. */
    initWithSocket: (sock: any) => Promise<void>;
    /** Place an outbound voice call. */
    call: (phoneNumber: string, opts?: CallOptions) => Promise<CallSession>;
    /** Tear down the WhatsApp socket and release resources. */
    disconnect: () => void;
}
