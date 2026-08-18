import { proto } from '../../WAProto';

export declare const createLidPnDebug: (logger: any) => (phase: string, payload: any) => void;

export declare const normalizeMentionedJidsForSend: (
    mentions: string[] | undefined,
    groupData: any,
    signalRepository: any,
    logger: any
) => Promise<string[] | undefined>;

export declare const normalizeMessageForDisplayJids: (
    messageInfo: proto.IWebMessageInfo,
    signalRepository: any,
    logger: any,
    groupData?: any
) => Promise<proto.IWebMessageInfo>;
