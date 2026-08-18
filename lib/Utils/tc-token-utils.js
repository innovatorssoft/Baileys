"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeTcTokensFromIqResult = exports.buildTcTokenFromJid = exports.resolveIssuanceJid = exports.resolveTcTokenJid = exports.shouldSendNewTcToken = exports.isTcTokenExpired = exports.buildMergedTcTokenIndexWrite = exports.readTcTokenIndex = exports.TC_TOKEN_INDEX_KEY = void 0;

const WABinary_1 = require("../WABinary");

const BOT_PHONE_REGEX = /^1313555\d{4}$|^131655500\d{2}$/;

function isRegularUser(jid) {
    if (!jid)
        return false;
    const user = jid.split('@')[0] ?? '';
    if (user === '0')
        return false; // PSA
    if (BOT_PHONE_REGEX.test(user))
        return false; // Bot by phone pattern
    if ((0, WABinary_1.isJidMetaAI)(jid))
        return false; // MetaAI (@bot server)
    return !!((0, WABinary_1.isPnUser)(jid) || (0, WABinary_1.isLidUser)(jid) || (0, WABinary_1.isHostedPnUser)(jid) || (0, WABinary_1.isHostedLidUser)(jid) || jid.endsWith('@c.us'));
}

const TC_TOKEN_BUCKET_DURATION = 604800; // 7 days
const TC_TOKEN_NUM_BUCKETS = 4; // ~28-day rolling window

/** Sentinel key under `tctoken` store holding a JSON array of tracked storage JIDs for cross-session pruning. */
exports.TC_TOKEN_INDEX_KEY = '__index';

/** Read the persisted tctoken JID index and return its entries (never contains the sentinel key itself). */
async function readTcTokenIndex(keys) {
    const data = await keys.get('tctoken', [exports.TC_TOKEN_INDEX_KEY]);
    const entry = data[exports.TC_TOKEN_INDEX_KEY];
    if (!entry?.token?.length)
        return [];
    try {
        const parsed = JSON.parse(Buffer.from(entry.token).toString());
        if (!Array.isArray(parsed))
            return [];
        return parsed.filter((j) => typeof j === 'string' && j.length > 0 && j !== exports.TC_TOKEN_INDEX_KEY);
    }
    catch {
        return [];
    }
}
exports.readTcTokenIndex = readTcTokenIndex;

/** Build a SignalDataSet fragment that writes the merged index (persisted ∪ added) under the sentinel key. */
async function buildMergedTcTokenIndexWrite(keys, addedJids) {
    const persisted = await readTcTokenIndex(keys);
    const merged = new Set(persisted);
    for (const jid of addedJids) {
        if (jid && jid !== exports.TC_TOKEN_INDEX_KEY)
            merged.add(jid);
    }
    return {
        [exports.TC_TOKEN_INDEX_KEY]: { token: Buffer.from(JSON.stringify([...merged])) }
    };
}
exports.buildMergedTcTokenIndexWrite = buildMergedTcTokenIndexWrite;

function isTcTokenExpired(timestamp) {
    if (timestamp === null || timestamp === undefined)
        return true;
    const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
    if (isNaN(ts))
        return true;
    const now = Math.floor(Date.now() / 1000);
    const currentBucket = Math.floor(now / TC_TOKEN_BUCKET_DURATION);
    const cutoffBucket = currentBucket - (TC_TOKEN_NUM_BUCKETS - 1);
    const cutoffTimestamp = cutoffBucket * TC_TOKEN_BUCKET_DURATION;
    return ts < cutoffTimestamp;
}
exports.isTcTokenExpired = isTcTokenExpired;

function shouldSendNewTcToken(senderTimestamp) {
    if (senderTimestamp === undefined)
        return true;
    const now = Math.floor(Date.now() / 1000);
    const currentBucket = Math.floor(now / TC_TOKEN_BUCKET_DURATION);
    const senderBucket = Math.floor(senderTimestamp / TC_TOKEN_BUCKET_DURATION);
    return currentBucket > senderBucket;
}
exports.shouldSendNewTcToken = shouldSendNewTcToken;

/** Resolve JID to LID for tctoken storage (WA Web stores under LID) */
async function resolveTcTokenJid(jid, getLIDForPN) {
    if ((0, WABinary_1.isLidUser)(jid))
        return jid;
    const lid = await getLIDForPN(jid);
    return lid ?? jid;
}
exports.resolveTcTokenJid = resolveTcTokenJid;

/** Resolve target JID for issuing privacy token based on AB prop 14303 */
async function resolveIssuanceJid(jid, issueToLid, getLIDForPN, getPNForLID) {
    if (issueToLid) {
        if ((0, WABinary_1.isLidUser)(jid))
            return jid;
        const lid = await getLIDForPN(jid);
        return lid ?? jid;
    }
    if (!(0, WABinary_1.isLidUser)(jid))
        return jid;
    if (getPNForLID) {
        const pn = await getPNForLID(jid);
        return pn ?? jid;
    }
    return jid;
}
exports.resolveIssuanceJid = resolveIssuanceJid;

async function buildTcTokenFromJid({ authState, jid, baseContent = [], getLIDForPN }) {
    try {
        const storageJid = await resolveTcTokenJid(jid, getLIDForPN);
        const tcTokenData = await authState.keys.get('tctoken', [storageJid]);
        const entry = tcTokenData?.[storageJid];
        const tcTokenBuffer = entry?.token;
        if (!tcTokenBuffer?.length || isTcTokenExpired(entry?.timestamp)) {
            if (tcTokenBuffer) {
                const cleared = entry?.senderTimestamp !== undefined
                    ? { token: Buffer.alloc(0), senderTimestamp: entry.senderTimestamp }
                    : null;
                await authState.keys.set({ tctoken: { [storageJid]: cleared } });
            }
            return baseContent.length > 0 ? baseContent : undefined;
        }
        baseContent.push({
            tag: 'tctoken',
            attrs: {},
            content: tcTokenBuffer
        });
        return baseContent;
    }
    catch (error) {
        return baseContent.length > 0 ? baseContent : undefined;
    }
}
exports.buildTcTokenFromJid = buildTcTokenFromJid;

async function storeTcTokensFromIqResult({ result, fallbackJid, keys, getLIDForPN, onNewJidStored }) {
    const tokensNode = (0, WABinary_1.getBinaryNodeChild)(result, 'tokens');
    if (!tokensNode)
        return;
    const tokenNodes = (0, WABinary_1.getBinaryNodeChildren)(tokensNode, 'token');
    for (const tokenNode of tokenNodes) {
        if (tokenNode.attrs.type !== 'trusted_contact' || !(tokenNode.content instanceof Uint8Array)) {
            continue;
        }
        const rawJid = (0, WABinary_1.jidNormalizedUser)(tokenNode.attrs.jid || fallbackJid);
        if (!isRegularUser(rawJid))
            continue;
        const storageJid = await resolveTcTokenJid(rawJid, getLIDForPN);
        const existingTcData = await keys.get('tctoken', [storageJid]);
        const existingEntry = existingTcData[storageJid];
        const existingTs = existingEntry?.timestamp ? Number(existingEntry.timestamp) : 0;
        const incomingTs = tokenNode.attrs.t ? Number(tokenNode.attrs.t) : 0;
        if (!incomingTs)
            continue;
        if (existingTs > 0 && existingTs > incomingTs)
            continue;
        await keys.set({
            tctoken: {
                [storageJid]: {
                    ...existingEntry,
                    token: Buffer.from(tokenNode.content),
                    timestamp: tokenNode.attrs.t
                }
            }
        });
        onNewJidStored?.(storageJid);
    }
}
exports.storeTcTokensFromIqResult = storeTcTokensFromIqResult;
