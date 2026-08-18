"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeMessageForDisplayJids = exports.normalizeMentionedJidsForSend = exports.createLidPnDebug = void 0;

const WABinary_1 = require("../WABinary");

const createLidPnDebug = (logger) => {
    const enabled = process.env.LID_PN_DEBUG === '1' || process.env.LID_PN_DEBUG === 'true';
    return (phase, payload) => {
        if (!enabled) {
            return;
        }
        logger?.debug?.({ ...payload, phase }, 'lid->pn normalization trace');
    };
};
exports.createLidPnDebug = createLidPnDebug;

const fallbackPnFromLidJid = (jid) => {
    const decoded = (0, WABinary_1.jidDecode)(jid);
    const rawUser = decoded?.user || (typeof jid === 'string' ? jid.split('@')[0] : '');
    const user = rawUser.split(':')[0];
    if (!user) {
        return jid;
    }
    return `${user}@s.whatsapp.net`;
};

const toDisplayPnJid = (jid) => {
    if (!jid || typeof jid !== 'string') {
        return jid;
    }
    const decoded = (0, WABinary_1.jidDecode)(jid);
    if (!decoded?.user) {
        return jid;
    }
    if (!(0, WABinary_1.isPnUser)(jid) && !(0, WABinary_1.isHostedPnUser)(jid)) {
        return jid;
    }
    const user = decoded.user.split(':')[0];
    if (!user) {
        return jid;
    }
    const server = decoded.server === 'hosted' ? 'hosted' : 's.whatsapp.net';
    return `${user}@${server}`;
};

const buildLidPnHints = (key) => {
    const hints = new Map();
    if (!key) {
        return hints;
    }
    const addHint = (lid, pn) => {
        if (!(0, WABinary_1.isLidUser)(lid) && !(0, WABinary_1.isHostedLidUser)(lid)) {
            return;
        }
        if (!(0, WABinary_1.isPnUser)(pn) && !(0, WABinary_1.isHostedPnUser)(pn)) {
            return;
        }
        hints.set(lid, pn);
        const lidDecoded = (0, WABinary_1.jidDecode)(lid);
        const pnDecoded = (0, WABinary_1.jidDecode)(pn);
        if (lidDecoded?.user && pnDecoded?.user) {
            hints.set(`${lidDecoded.user}@lid`, `${pnDecoded.user}@s.whatsapp.net`);
        }
    };
    addHint(key.participant, key.participantAlt);
    addHint(key.remoteJid, key.remoteJidAlt);
    addHint(key.participantAlt, key.participant);
    addHint(key.remoteJidAlt, key.remoteJid);
    return hints;
};

const mergeGroupDataHints = (hints, groupData, debug) => {
    if (!groupData?.participants?.length) {
        return;
    }
    debug?.('groupData-size', { participants: groupData.participants.length });
    for (const participant of groupData.participants) {
        const lidCandidate = participant?.lid;
        const idCandidate = participant?.id;
        const pnCandidate = participant?.phoneNumber;
        const lid =
            (((0, WABinary_1.isLidUser)(lidCandidate) || (0, WABinary_1.isHostedLidUser)(lidCandidate)
                ? lidCandidate
                : undefined)) ||
            (((0, WABinary_1.isLidUser)(idCandidate) || (0, WABinary_1.isHostedLidUser)(idCandidate) ? idCandidate : undefined));
        const pn =
            (((0, WABinary_1.isPnUser)(pnCandidate) || (0, WABinary_1.isHostedPnUser)(pnCandidate)
                ? pnCandidate
                : undefined)) ||
            (((0, WABinary_1.isPnUser)(idCandidate) || (0, WABinary_1.isHostedPnUser)(idCandidate) ? idCandidate : undefined));
        if (!lid || !pn) {
            continue;
        }
        if (
            ((0, WABinary_1.isLidUser)(lid) || (0, WABinary_1.isHostedLidUser)(lid)) &&
            ((0, WABinary_1.isPnUser)(pn) || (0, WABinary_1.isHostedPnUser)(pn))
        ) {
            const displayPn = toDisplayPnJid(pn);
            hints.set(lid, displayPn);
            const lidDecoded = (0, WABinary_1.jidDecode)(lid);
            if (lidDecoded?.user) {
                hints.set(`${lidDecoded.user}@lid`, displayPn);
            }
            debug?.('group-hint', { lid, pn: displayPn });
        }
    }
};

const normalizeToPnJid = async (jid, hints, signalRepository, debug) => {
    if (!jid || typeof jid !== 'string') {
        return jid;
    }
    if (!(0, WABinary_1.isLidUser)(jid) && !(0, WABinary_1.isHostedLidUser)(jid)) {
        return jid;
    }
    debug?.('input', { lid: jid });
    const hinted = hints.get(jid);
    if (hinted) {
        const normalized = toDisplayPnJid(hinted);
        debug?.('hint-exact', { lid: jid, hinted, normalized });
        return normalized;
    }
    const decoded = (0, WABinary_1.jidDecode)(jid);
    if (decoded?.user) {
        const userHint = hints.get(`${decoded.user}@lid`);
        if (userHint) {
            const normalized = toDisplayPnJid(userHint);
            debug?.('hint-user', { lid: jid, userHint, normalized });
            return normalized;
        }
    }
    const mapped = await signalRepository?.lidMapping?.getPNForLID?.(jid);
    if (mapped) {
        const normalized = toDisplayPnJid(mapped);
        debug?.('mapping', { lid: jid, mapped, normalized });
        return normalized;
    }
    debug?.('unmapped-lid', { lid: jid });
    return jid;
};

const normalizeMentionedJidsToPn = async (node, hints, signalRepository, debug) => {
    if (!node || typeof node !== 'object') {
        return;
    }
    if (Array.isArray(node)) {
        for (const item of node) {
            await normalizeMentionedJidsToPn(item, hints, signalRepository, debug);
        }
        return;
    }
    if (Array.isArray(node.mentionedJid)) {
        const before = [...node.mentionedJid];
        node.mentionedJid = await Promise.all(
            node.mentionedJid.map((jid) => normalizeToPnJid(jid, hints, signalRepository, debug))
        );
        debug?.('mentions', { before, after: node.mentionedJid });
    }
    if (typeof node.participant === 'string') {
        const before = node.participant;
        node.participant = await normalizeToPnJid(node.participant, hints, signalRepository, debug);
        if (before !== node.participant) {
            debug?.('participant-field', { before, after: node.participant });
        }
    }
    if (typeof node.remoteJid === 'string') {
        const before = node.remoteJid;
        node.remoteJid = await normalizeToPnJid(node.remoteJid, hints, signalRepository, debug);
        if (before !== node.remoteJid) {
            debug?.('remoteJid-field', { before, after: node.remoteJid });
        }
    }
    for (const value of Object.values(node)) {
        if (value && typeof value === 'object') {
            await normalizeMentionedJidsToPn(value, hints, signalRepository, debug);
        }
    }
};

const normalizeMentionedJidsForSend = async (mentions, groupData, signalRepository, logger) => {
    if (!Array.isArray(mentions)) {
        return mentions;
    }
    const debug = createLidPnDebug(logger);
    const hints = new Map();
    mergeGroupDataHints(hints, groupData, debug);
    const normalized = await Promise.all(mentions.map((jid) => normalizeToPnJid(jid, hints, signalRepository, debug)));
    debug('send-mentions-result', { before: mentions, after: normalized });
    return normalized;
};
exports.normalizeMentionedJidsForSend = normalizeMentionedJidsForSend;

const normalizeMessageForDisplayJids = async (messageInfo, signalRepository, logger, groupData) => {
    if (!messageInfo?.key) {
        return messageInfo;
    }
    const debug = createLidPnDebug(logger);
    const hints = buildLidPnHints(messageInfo.key);
    mergeGroupDataHints(hints, groupData, debug);
    const beforeKey = { ...messageInfo.key };
    messageInfo.key.participant = await normalizeToPnJid(messageInfo.key.participant, hints, signalRepository, debug);
    messageInfo.key.participantAlt = await normalizeToPnJid(
        messageInfo.key.participantAlt,
        hints,
        signalRepository,
        debug
    );
    messageInfo.key.remoteJid = await normalizeToPnJid(messageInfo.key.remoteJid, hints, signalRepository, debug);
    messageInfo.key.remoteJidAlt = await normalizeToPnJid(messageInfo.key.remoteJidAlt, hints, signalRepository, debug);
    await normalizeMentionedJidsToPn(messageInfo.message, hints, signalRepository, debug);
    debug('display-key-result', { before: beforeKey, after: messageInfo.key });
    return messageInfo;
};
exports.normalizeMessageForDisplayJids = normalizeMessageForDisplayJids;
