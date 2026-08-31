/**
 * Signaling bridge.
 *
 * Glues the WASM VoIP stack to Baileys: encrypts outbound `offer` / `enc_rekey`
 * stanzas, decrypts inbound ones, manages TC tokens, multi-device JID routing,
 * and signal-session refresh.
 *
 * @author ShellTear
 */
export type BaileysSocket = {
    authState: any;
    signalRepository: any;
    generateMessageTag: () => string;
    query: (node: any) => Promise<any>;
    sendNode: (node: any) => Promise<void>;
    waitForMessage: (tag: string, timeoutMs: number) => Promise<any>;
    getUSyncDevices: (jids: string[], ignoreZeroDevices: boolean, forceQuery: boolean) => Promise<any[]>;
    presenceSubscribe: (jid: string) => Promise<void>;
    ws: any;
    ev: any;
};
export type SignalingBridgeConfig = {
    sock: BaileysSocket;
};
export declare class SignalingBridge {
    #private;
    constructor(config: SignalingBridgeConfig);
    /** Hand the WASM engine in so we can dispatch ack callbacks back to it. */
    attachEngine: (voip: any) => void;
    setSignalingEventListener: (listener: (tag: string, reason: string, callId?: string, peerJid?: string) => void) => void;
    setSignalingErrorListener: (listener: (tag: string, errorType: string, peerJid?: string, callId?: string) => void) => void;
    init: () => Promise<void>;
    sendSignaling: (peerJid: string, callId: string, xmlPayload: Uint8Array) => void;
    processIncomingCall: (node: any, voip: any, activeCallId?: string) => void;
    processIncomingReceipt: (node: any, voip: any, activeCallId?: string) => void;
    cleanupCall: (callId: string) => void;
    sendTerminate: (peerJid: string, callId: string, reason?: string) => Promise<void>;
    requestTcToken: (jid: string) => Promise<Uint8Array | undefined>;
    ensureTcToken: (...jids: string[]) => Promise<Uint8Array | undefined>;
    discoverPeerDevices: (peerLidJid: string) => Promise<string[]>;
    ensureSessionsForPeers: (jids: string[]) => Promise<void>;
    resolveLid: (pnJid: string) => Promise<string | undefined>;
    issueTcToken: (jid: string) => Promise<boolean>;
    getRemoteDeviceJid: (callId: string) => string | undefined;
}
