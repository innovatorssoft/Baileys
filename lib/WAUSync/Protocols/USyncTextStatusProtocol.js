"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USyncTextStatusProtocol = void 0;

const WABinary_1 = require("../../WABinary");

class USyncTextStatusProtocol {
    constructor() {
        this.name = 'text_status';
    }

    getQueryElement() {
        return {
            tag: 'text_status',
            attrs: {}
        };
    }

    getUserElement() {
        return null;
    }

    parser(node) {
        if (node.tag !== 'text_status') return null;
        (0, WABinary_1.assertNodeErrorFree)(node);
        const lastUpdateTimeSec = node.attrs?.last_update_time ? +node.attrs.last_update_time : 0;
        const ephemeralDurationSec = node.attrs?.ephemeral_duration_sec ? +node.attrs.ephemeral_duration_sec : 0;
        const text = node.attrs?.text ?? null;
        const emojiNode = (0, WABinary_1.getBinaryNodeChild)(node, 'emoji');
        const emoji = emojiNode?.attrs?.content ?? null;
        const expiresAt = ephemeralDurationSec > 0
            ? new Date((lastUpdateTimeSec + ephemeralDurationSec) * 1000)
            : null;
        return {
            text,
            emoji,
            setAt: new Date(lastUpdateTimeSec * 1000),
            expiresAt
        };
    }
}
exports.USyncTextStatusProtocol = USyncTextStatusProtocol;
