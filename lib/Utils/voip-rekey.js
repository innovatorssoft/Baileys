"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeE2eRekeyPayload = void 0;

const WAProto_1 = require("../../WAProto");

const REKEY_TYPE_NAMES = {
    0: 'REKEY_KEY_AUDIO',
    1: 'REKEY_KEY_VIDEO',
    2: 'REKEY_KEY_APPDATA'
};

const decodeE2eRekeyPayload = (buffer) => {
    if (!Buffer.isBuffer(buffer) && !(buffer instanceof Uint8Array)) {
        throw new TypeError('decodeE2eRekeyPayload: buffer must be Buffer or Uint8Array');
    }
    const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    if (WAProto_1.proto.E2eRekeyPayload) {
        const decoded = WAProto_1.proto.E2eRekeyPayload.decode(buf);
        return {
            keys: (decoded.keys || []).map((entry) => ({
                type: REKEY_TYPE_NAMES[entry.type] ?? entry.type,
                key: entry.key ? Buffer.from(entry.key) : Buffer.alloc(0)
            }))
        };
    }
    // Fallback protobuf decoder for E2eRekeyPayload { repeated { type, bytes key } }
    const keys = [];
    let offset = 0;
    while (offset < buf.length) {
        const tag = buf[offset++];
        const wire = tag & 7;
        const field = tag >> 3;
        if (field === 1 && wire === 2) {
            const len = buf[offset++];
            const end = offset + len;
            let type = 'REKEY_KEY_AUDIO';
            let key = Buffer.alloc(0);
            while (offset < end) {
                const subTag = buf[offset++];
                const subField = subTag >> 3;
                if (subField === 1) {
                    const typeVal = buf[offset++];
                    type = REKEY_TYPE_NAMES[typeVal] || String(typeVal);
                } else if (subField === 2) {
                    const keyLen = buf[offset++];
                    key = buf.subarray(offset, offset + keyLen);
                    offset += keyLen;
                }
            }
            keys.push({ type, key: Buffer.from(key) });
        }
    }
    return { keys };
};
exports.decodeE2eRekeyPayload = decodeE2eRekeyPayload;
