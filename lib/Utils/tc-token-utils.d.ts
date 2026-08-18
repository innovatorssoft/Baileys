import { AuthenticationState, SignalKeyStore } from '../Types';
import { BinaryNode } from '../WABinary';

export declare const TC_TOKEN_INDEX_KEY = "__index";

export declare function readTcTokenIndex(keys: SignalKeyStore): Promise<string[]>;

export declare function buildMergedTcTokenIndexWrite(
    keys: SignalKeyStore,
    addedJids: string[]
): Promise<Record<string, { token: Buffer }>>;

export declare function isTcTokenExpired(timestamp: string | number | null | undefined): boolean;

export declare function shouldSendNewTcToken(senderTimestamp: number | undefined): boolean;

export declare function resolveTcTokenJid(
    jid: string,
    getLIDForPN: (jid: string) => Promise<string | undefined>
): Promise<string>;

export declare function resolveIssuanceJid(
    jid: string,
    issueToLid: boolean,
    getLIDForPN: (jid: string) => Promise<string | undefined>,
    getPNForLID?: (jid: string) => Promise<string | undefined>
): Promise<string>;

export declare function buildTcTokenFromJid(params: {
    authState: AuthenticationState;
    jid: string;
    baseContent?: BinaryNode[];
    getLIDForPN: (jid: string) => Promise<string | undefined>;
}): Promise<BinaryNode[] | undefined>;

export declare function storeTcTokensFromIqResult(params: {
    result: BinaryNode;
    fallbackJid?: string;
    keys: SignalKeyStore;
    getLIDForPN: (jid: string) => Promise<string | undefined>;
    onNewJidStored?: (jid: string) => void;
}): Promise<void>;
