"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSenderLid = exports.toJid = exports.getPollCorrectAnswer = exports.getMessageAddOns = exports.getMessageCommentMetadata = exports.getMessagePaymentInfo = exports.getScheduledMessageTime = exports.isScheduledMessage = void 0;

const WAProto_1 = require("../../WAProto");
const WABinary_1 = require("../WABinary");

/** Check if a WebMessageInfo has a scheduled reveal time */
const isScheduledMessage = (msg) => !!msg?.scheduledMessageMetadata?.scheduledTime;
exports.isScheduledMessage = isScheduledMessage;

/** Get scheduled reveal time of a message as a Date, or null */
const getScheduledMessageTime = (msg) => {
    const t = msg?.scheduledMessageMetadata?.scheduledTime;
    if (!t) return null;
    return new Date(Number(t) * 1000);
};
exports.getScheduledMessageTime = getScheduledMessageTime;

/** Extract PaymentInfo from a WebMessageInfo */
const getMessagePaymentInfo = (msg) => msg?.paymentInfo || msg?.quotedPaymentInfo || null;
exports.getMessagePaymentInfo = getMessagePaymentInfo;

/** Get all comment metadata from a WebMessageInfo */
const getMessageCommentMetadata = (msg) => msg?.commentMetadata || null;
exports.getMessageCommentMetadata = getMessageCommentMetadata;

/** Get all message add-ons from a WebMessageInfo */
const getMessageAddOns = (msg) => msg?.messageAddOns || [];
exports.getMessageAddOns = getMessageAddOns;

/** Get the quiz correct answer from a poll creation message, if it's a quiz */
const getPollCorrectAnswer = (pollMsg) => {
    const poll =
        pollMsg?.pollCreationMessage ||
        pollMsg?.pollCreationMessageV2 ||
        pollMsg?.pollCreationMessageV3 ||
        pollMsg?.pollCreationMessageV5 ||
        pollMsg?.pollCreationMessageV6;
    if (!poll) return null;
    const isQuiz = poll.pollType === WAProto_1.proto.Message.PollType?.QUIZ || poll.pollType === 1;
    return isQuiz ? poll.correctAnswer?.optionName || null : null;
};
exports.getPollCorrectAnswer = getPollCorrectAnswer;

/** Normalizes a bare user id to @s.whatsapp.net */
const toJid = (id) => {
    if (!id) return '';
    if (id.includes('@')) return id;
    return `${id}@s.whatsapp.net`;
};
exports.toJid = toJid;

/** Returns the peer LID JID when the key is LID-primary */
const getSenderLid = (message) => {
    const k = message?.key;
    if (!k) {
        return { jid: '', lid: '' };
    }
    const jid = k.participant || k.remoteJid || '';
    if (jid.endsWith('@lid') || jid.endsWith('@hosted.lid')) {
        return { jid, lid: jid };
    }
    if (k.lid && typeof k.lid === 'string') {
        const lid = k.lid.includes('@') ? k.lid : (0, WABinary_1.jidEncode)(k.lid, 'lid');
        return { jid, lid };
    }
    if (k.participantLid && (0, WABinary_1.isLidUser)(k.participantLid)) {
        return { jid, lid: k.participantLid };
    }
    return { jid, lid: '' };
};
exports.getSenderLid = getSenderLid;
