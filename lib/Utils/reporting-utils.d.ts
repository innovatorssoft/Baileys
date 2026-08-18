import { proto } from '../../WAProto';
import { BinaryNode } from '../WABinary';

export declare const shouldIncludeReportingToken: (message: proto.IMessage) => boolean;

export declare const getMessageReportingToken: (
    msgProtobuf: Uint8Array | Buffer,
    message: proto.IMessage,
    key: proto.IMessageKey
) => Promise<BinaryNode | null>;
