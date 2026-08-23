import { proto } from '../../WAProto';

export interface MsMsgMessageKey {
    participant?: string;
    meId?: string;
    meLid?: string;
    botEditTargetId?: string;
    stanzaId?: string;
    metaTargetId?: string;
}

export interface MsMsgEncryptedPayload {
    encIv: Uint8Array | Buffer;
    encPayload: Uint8Array | Buffer;
}

export declare const decodeDecryptedMsmsgMessage: (decrypted: Uint8Array | Buffer) => proto.IMessage;

export declare const decryptMsmsgBotMessage: (
    messageSecret: Uint8Array | Buffer,
    messageKey: MsMsgMessageKey,
    msMsg: MsMsgEncryptedPayload
) => Promise<Buffer>;
