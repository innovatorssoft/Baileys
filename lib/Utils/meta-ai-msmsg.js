"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeDecryptedMsmsgMessage = exports.decryptMsmsgBotMessage = void 0;

const WAProto_1 = require("../../WAProto");
const crypto_1 = require("./crypto");

const BOT_MESSAGE_INFO = 'Bot Message';
const KEY_LENGTH = 32;

const unpadRandomMax16 = (value) => {
    const bytes = new Uint8Array(value);
    if (!bytes.length) {
        throw new Error('unpadPkcs7 given empty bytes');
    }
    const padLength = bytes[bytes.length - 1];
    if (padLength === 0 || padLength > 16 || padLength > bytes.length) {
        throw new Error(`unpad given ${bytes.length} bytes, but pad is ${padLength}`);
    }
    return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.length - padLength);
};

const toBuffer = (value) => {
    if (Buffer.isBuffer(value)) return value;
    if (value instanceof Uint8Array) return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
    return Buffer.from(value);
};

const normalizeLidJid = (jid) => {
    if (!jid || !jid.endsWith('@lid') || !jid.includes(':')) return jid;
    return `${jid.split(':')[0]}@lid`;
};

const selectMsgIdCandidates = (messageKey) => {
    const seen = new Set();
    const result = [];
    for (const id of [messageKey?.botEditTargetId, messageKey?.stanzaId, messageKey?.metaTargetId]) {
        const s = id ? String(id) : '';
        if (s && !seen.has(s)) {
            seen.add(s);
            result.push(s);
        }
    }
    return result;
};

const selectTargetJidCandidates = (messageKey) => {
    const seen = new Set();
    const result = [];
    for (const jid of [normalizeLidJid(messageKey?.meId), normalizeLidJid(messageKey?.meLid)]) {
        const s = jid ? String(jid) : '';
        if (s && !seen.has(s)) {
            seen.add(s);
            result.push(s);
        }
    }
    return result;
};

const decodeDecryptedMsmsgMessage = (decrypted) => {
    const buf = toBuffer(decrypted);
    try {
        const unpadded = Buffer.from(unpadRandomMax16(buf));
        const decoded = WAProto_1.proto.Message.decode(unpadded);
        const hasContent = Object.keys(decoded).some((k) => k !== 'messageContextInfo' && decoded[k] != null);
        if (hasContent) return decoded;
    }
    catch {}
    return WAProto_1.proto.Message.decode(buf);
};
exports.decodeDecryptedMsmsgMessage = decodeDecryptedMsmsgMessage;

const decryptMsmsgBotMessage = async (messageSecret, messageKey, msMsg) => {
    if (!messageSecret || (messageSecret instanceof Uint8Array && !messageSecret.byteLength)) {
        throw new Error('Missing required messageSecret for msmsg decryption');
    }
    if (!messageKey?.participant) throw new Error('Missing required participant for msmsg decryption');
    if (!messageKey?.meId) throw new Error('Missing required meId for msmsg decryption');
    if (!msMsg?.encIv) throw new Error('Missing required encIv for msmsg decryption');
    if (!msMsg?.encPayload) throw new Error('Missing required encPayload for msmsg decryption');

    const msgIdCandidates = selectMsgIdCandidates(messageKey);
    if (!msgIdCandidates.length) throw new Error('Missing required target message id for msmsg decryption');

    const targetJidCandidates = selectTargetJidCandidates(messageKey);
    if (!targetJidCandidates.length) throw new Error('Missing required target JID for msmsg decryption');

    const botJidBuf = Buffer.from(String(messageKey.participant));
    const payload = toBuffer(msMsg.encPayload);
    const iv = toBuffer(msMsg.encIv);

    const baseKey = Buffer.from(await (0, crypto_1.hkdf)(toBuffer(messageSecret), KEY_LENGTH, { info: BOT_MESSAGE_INFO }));

    let lastError;
    for (const msgId of msgIdCandidates) {
        const idBuf = Buffer.from(msgId);
        for (const targetJid of targetJidCandidates) {
            const info = Buffer.concat([idBuf, Buffer.from(targetJid), botJidBuf]);
            const key = Buffer.from(await (0, crypto_1.hkdf)(baseKey, KEY_LENGTH, { info }));
            const aad = Buffer.concat([idBuf, Buffer.from([0x00]), botJidBuf]);
            try {
                return Buffer.from((0, crypto_1.aesDecryptGCM)(payload, key, iv, aad));
            }
            catch (e) {
                lastError = e;
            }
        }
    }

    const err = new Error('msmsg decryption failed: all key derivation candidates exhausted');
    err.cause = lastError;
    throw err;
};
exports.decryptMsmsgBotMessage = decryptMsmsgBotMessage;
