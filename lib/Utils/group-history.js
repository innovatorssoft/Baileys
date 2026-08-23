"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processGroupHistory = exports.decodeGroupHistory = void 0;

const fflate_1 = require("fflate");
const WAProto_1 = require("../../WAProto");

const decodeGroupHistory = (buffer, options = {}) => {
    const { inflate = true, withMessageBytes = false } = options;
    if (!Buffer.isBuffer(buffer) && !(buffer instanceof Uint8Array)) {
        throw new TypeError('decodeGroupHistory: buffer must be Buffer or Uint8Array');
    }
    let data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    if (inflate) {
        try {
            data = Buffer.from((0, fflate_1.decompressSync)(data));
        }
        catch {
            try {
                const zlib = require('zlib');
                data = zlib.inflateSync(data);
            } catch {
                // not zlib/deflate-compressed — use raw bytes
            }
        }
    }
    if (withMessageBytes && WAProto_1.proto.GroupHistoryWithMessageBytes) {
        const decoded = WAProto_1.proto.GroupHistoryWithMessageBytes.decode(data);
        const expand = (list) =>
            (list || []).map((entry) =>
                entry?.messageBytes ? WAProto_1.proto.WebMessageInfo.decode(entry.messageBytes) : { key: entry?.key }
            );
        return {
            messages: expand(decoded.messages),
            commentMessages: expand(decoded.commentMessages),
            outOfWindowPinnedMessages: expand(decoded.outOfWindowPinnedMessages),
            uncountedAssociatedMessageLists: (decoded.uncountedAssociatedMessageLists || []).map((l) => ({
                parentMessage: l.parentMessage,
                messages: expand(l.messages)
            }))
        };
    }
    if (WAProto_1.proto.GroupHistory) {
        return WAProto_1.proto.GroupHistory.decode(data);
    }
    return { data };
};
exports.decodeGroupHistory = decodeGroupHistory;

const processGroupHistory = (groupHistory) => {
    const gh = groupHistory || {};
    return {
        messages: gh.messages || [],
        commentMessages: gh.commentMessages || [],
        outOfWindowPinnedMessages: gh.outOfWindowPinnedMessages || [],
        uncountedAssociatedMessageLists: gh.uncountedAssociatedMessageLists || []
    };
};
exports.processGroupHistory = processGroupHistory;
