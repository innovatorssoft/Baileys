"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USyncPictureProtocol = void 0;

const WABinary_1 = require("../../WABinary");

class USyncPictureProtocol {
    constructor(type = 'image') {
        this.name = 'picture';
        this.type = type;
    }

    getQueryElement() {
        return {
            tag: 'picture',
            attrs: { type: this.type }
        };
    }

    getUserElement(user) {
        const attrs = {};
        if (user.pictureId != null) attrs.id = String(user.pictureId);
        return Object.keys(attrs).length > 0 ? { tag: 'picture', attrs } : null;
    }

    parser(node) {
        if (node.tag !== 'picture') return null;
        (0, WABinary_1.assertNodeErrorFree)(node);
        const id = node.attrs?.id ?? null;
        const directPath = node.attrs?.direct_path ?? null;
        const hash = node.attrs?.hash ?? null;
        if (!id && !directPath) return null;
        return { id, directPath, hash };
    }
}
exports.USyncPictureProtocol = USyncPictureProtocol;
