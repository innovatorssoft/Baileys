export type WasmAudioConfig = {
    sampleRate: number;
    channels: number;
    bitsPerSample: number;
    framesPerChunk: number;
};
export type WasmEngineCallbacks = {
    onSignalingXmpp?: (peerJid: string, callId: string, xmlPayload: Uint8Array) => void;
    onCallEvent?: (eventType: number, eventData?: string) => void;
    onVoipReady?: () => void;
    sendDataToRelay?: (data: Uint8Array, ip: string, port: number) => number;
    onLog?: (level: string, message: string) => void;
    onAudioCaptureInit?: (config: WasmAudioConfig) => void;
    onAudioCaptureStart?: () => void;
    onAudioCaptureStop?: () => void;
    onAudioPlaybackInit?: (config: WasmAudioConfig) => void;
    onAudioPlaybackStart?: () => void;
    onAudioPlaybackStop?: () => void;
    onAudioPlaybackData?: (audioData: Float32Array) => void;
    onVideoCaptureStart?: (data?: any) => void;
    onVideoCaptureStop?: (data?: any) => void;
    cryptoHkdf?: (key: Uint8Array, salt: Uint8Array | null, info: Uint8Array, length: number) => Uint8Array;
    hmacSha256?: (data: Uint8Array, key: Uint8Array) => Uint8Array;
};
export type WasmEngineConfig = {
    resourcesPath?: string;
    wasmPath?: string;
    wasmBinary?: Uint8Array;
    loaderCode?: string;
    workerModulesCode?: string;
    loaderModuleName?: string;
    callbacks?: WasmEngineCallbacks;
    enableLogs?: boolean;
    options?: {
        heartbeatInterval?: number;
        lobbyTimeout?: number;
        maxParticipantsScreenShare?: number;
        maxGroupSizeLongRingtone?: number;
        logLevel?: number;
    };
};
export declare class WasmEngine {
    #private;
    static registerGlobalCallbackListener: (callbackName: string, handler: (data: any) => void) => void;
    static notifyGlobalCallbackListeners: (callbackName: string, data: any) => void;
    constructor(config?: WasmEngineConfig);
    initialize: () => Promise<void>;
    isInitialized: () => boolean;
    destroy: () => void;
    initVoipStack: (selfJid: string, meUserJid: string, selfLid: string) => void;
    waitForVoipStackReady: () => Promise<void>;
    isVoipStackReady: () => boolean;
    startCall: (options: {
        peerJid: string;
        peerPn: string;
        peerList?: string[];
        callId: string;
        isVideo: boolean;
        isLidCall?: boolean;
        isFromDialer?: boolean;
        extraData?: Uint8Array;
    }) => unknown;
    endCall: (reason?: number, sendTerminate?: boolean) => void;
    setMute: (muted: boolean) => number;
    updateNetworkMedium: (networkMedium: number, networkMtu?: number) => void;
    handleSignalingOffer: (msg: {
        payload: string;
        peerPlatform?: number;
        peerAppVersion?: string;
        epochId?: string;
        timestamp?: string;
        isOffline?: boolean;
        isOfferNotContact?: boolean;
        peerJid: string;
        tcToken?: Uint8Array;
    }) => void;
    handleSignalingMessage: (msg: {
        payload: string;
        peerPlatform?: string | number;
        peerAppVersion?: string;
        epochId?: string;
        timestamp?: string;
        isOffline?: boolean;
        peerJid: string;
        tcToken?: Uint8Array;
    }) => void;
    handleSignalingAck: (msg: {
        payload: string;
        ackError?: string;
        msgType?: string;
        peerJid?: string;
        extraData?: Uint8Array;
    }) => void;
    handleSignalingReceipt: (msg: {
        payload: string;
        peerJid: string;
        tcToken?: Uint8Array;
    }) => void;
    handleOnTransportMessage: (data: Uint8Array, ip: string, port: number) => void;
    updateIceRtt: (rttMs: number, relayIp: string, relayPort: number) => void;
    sendAudioData: (data: Float32Array, ptr: number) => void;
    sendVideoFrame: (frameBuffer: ArrayBuffer | ArrayBufferView, width: number, height: number, fps?: number, format?: number, orientation?: number) => void;
    malloc: (size: number) => number;
    free: (ptr: number) => void;
}
export default WasmEngine;
