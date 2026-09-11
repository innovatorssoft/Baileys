/**
 * baileys-caller — WhatsApp voice calling for Node.js.
 *
 * Wraps WhatsApp Web's official VoIP WASM stack and routes signaling through
 * Baileys. Public surface:
 *
 *   const client = new VoipClient({ authDir })
 *   await client.connect()
 *   const call = await client.call("12345678901", { audioSource: "./hi.mp3" })
 *
 * @author ShellTear
 */
import { EventEmitter } from "node:events";
import { WasmEngine } from "./wasm-engine.mjs";
import { CallState, CallStatus, CallSummary, CallRequest, VoipConfigOptions, type VoipSdkConfig, type CallOptions } from "./types.mjs";
export type { VoipSdkConfig, CallOptions, CallEvents, AudioConfig, CallStatus, CallSummary, CallRequest, VoipConfigOptions } from "./types.mjs";
export { CallState } from "./types.mjs";

/** A live or recently-ended call. */
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
    /** @internal */
    _updateState: (state: number) => void;
    /** @internal */
    _handleSignalingEvent: (tag: string, reason: string) => void;
    /** @internal */
    _handleSignalingError: (tag: string, errorType: string) => void;
    /** @internal */
    _emitAudio: (pcm: Float32Array) => void;
    /** @internal */
    _forceEnd: (reason: string) => void;
}

/** Top-level client. Connects to WhatsApp and lets you place calls. */
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
    /** Connect to WhatsApp and bring up the WASM VoIP stack. */
    connect: () => Promise<void>;
    /** Attach an already connected Baileys socket directly. */
    initWithSocket: (sock: any) => Promise<void>;
    /** Place an outbound voice call. */
    call: (phoneNumber: string, opts?: CallOptions) => Promise<ActiveCall>;
    /** Tear down the WhatsApp socket and release resources. */
    disconnect: () => void;
}
