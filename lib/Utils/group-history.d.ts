import { proto } from '../../WAProto';

export interface DecodeGroupHistoryOptions {
    inflate?: boolean;
    withMessageBytes?: boolean;
}

export interface ProcessedGroupHistory {
    messages: any[];
    commentMessages: any[];
    outOfWindowPinnedMessages: any[];
    uncountedAssociatedMessageLists: any[];
}

export declare const decodeGroupHistory: (
    buffer: Buffer | Uint8Array,
    options?: DecodeGroupHistoryOptions
) => any;

export declare const processGroupHistory: (groupHistory: any) => ProcessedGroupHistory;
