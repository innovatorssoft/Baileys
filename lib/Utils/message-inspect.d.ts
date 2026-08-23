import { proto } from '../../WAProto';

export declare const isScheduledMessage: (msg: proto.IWebMessageInfo) => boolean;

export declare const getScheduledMessageTime: (msg: proto.IWebMessageInfo) => Date | null;

export declare const getMessagePaymentInfo: (msg: proto.IWebMessageInfo) => any;

export declare const getMessageCommentMetadata: (msg: proto.IWebMessageInfo) => any;

export declare const getMessageAddOns: (msg: proto.IWebMessageInfo) => any[];

export declare const getPollCorrectAnswer: (pollMsg: proto.IMessage) => string | null;

export declare const toJid: (id: string | undefined) => string;

export declare const getSenderLid: (message: proto.IWebMessageInfo) => { jid: string; lid: string };
