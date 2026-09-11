import { EventEmitter } from "node:events";
import { WasmEngine } from "./wasm-engine.mjs";
import { CallState, CallStatus, CallSummary, CallRequest, VoipConfigOptions, VoipSdkConfig, CallOptions } from "./types";
export type { VoipSdkConfig, CallOptions, CallEvents, AudioConfig, CallStatus, CallSummary, CallRequest, VoipConfigOptions } from "./types";
export { CallState } from "./types";

export declare class ActiveCall extends EventEmitter {
    #private;
    readonly callId: string;
    readonly peerJid: string;
    readonly phoneNumber: string;
    readonly startedAt: number;
    readonly connectedAt: number | null;
    readonly endedAt: number | null;

    constructor(callId: string, peerJid: string, engine: WasmEngine, options?: CallOptions, phoneNumber?: string);
    get state(): CallState;
    get status(): CallStatus;
    get ended(): boolean;
    getSummary(): CallSummary;
    end: (reason?: string) => void;
    mute: (muted: boolean) => void;
    waitForEnd: () => Promise<string>;
    _updateState: (state: number) => void;
    _handleSignalingEvent: (tag: string, reason: string) => void;
    _handleSignalingError: (tag: string, errorType: string) => void;
    _emitAudio: (pcm: Float32Array) => void;
    _forceEnd: (reason: string) => void;
}

export declare class VoipClient {
    #private;
    constructor(config?: VoipSdkConfig);
    setOptions: (options: VoipConfigOptions) => void;
    getActiveCalls: () => CallSummary[];
    getCall: (callId: string) => ActiveCall | undefined;
    getActiveCallCount: () => number;
    endCall: (callId: string) => void;
    endAllCalls: () => void;
    callMany: (requests: CallRequest[]) => Promise<ActiveCall[]>;
    connect: () => Promise<void>;
    initWithSocket: (sock: any) => Promise<void>;
    call: (phoneNumber: string, opts?: CallOptions) => Promise<ActiveCall>;
    disconnect: () => void;
}
