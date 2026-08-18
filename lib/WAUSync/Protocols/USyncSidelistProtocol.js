"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USyncSidelistProtocol = void 0;

const WABinary_1 = require("../../WABinary");

class USyncSidelistProtocol {
    constructor(useLidAddressing = true) {
        this.name = 'sidelist';
        this.useLidAddressing = useLidAddressing;
    }

    getQueryElement() {
        const attrs = {};
        if (this.useLidAddressing) attrs.addressing_mode = 'lid';
        return { tag: 'sidelist', attrs };
    }

    getUserElement(user) {
        if (user.sidelistDelete) {
            return { tag: 'sidelist', attrs: { type: 'delete' } };
        }
        return null;
    }

    parser(node) {
        if (node.tag !== 'sidelist' && node.tag !== 'side_list') return null;
        (0, WABinary_1.assertNodeErrorFree)(node);
        return { type: node.attrs?.type ?? null };
    }
}
exports.USyncSidelistProtocol = USyncSidelistProtocol;
