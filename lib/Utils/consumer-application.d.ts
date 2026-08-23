import { proto } from '../../WAProto';

export declare const decodeConsumerApplication: (buffer: Buffer | Uint8Array) => any;

export declare const consumerApplicationToMessage: (app: any) => proto.IMessage | null;
