"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USyncFeatureProtocol = exports.USYNC_FEATURES = void 0;

const WABinary_1 = require("../../WABinary");

exports.USYNC_FEATURES = [
    'document',
    'encrypt',
    'encrypt_blist',
    'encrypt_contact',
    'encrypt_group_gen2',
    'encrypt_image',
    'encrypt_location',
    'encrypt_url',
    'encrypt_v2',
    'voip',
    'voip_legacy',
    'multi_agent',
    'bot_eligible'
];

class USyncFeatureProtocol {
    constructor(features) {
        this.name = 'feature';
        this.features = features && features.length ? features : exports.USYNC_FEATURES;
    }

    getQueryElement() {
        return {
            tag: 'feature',
            attrs: {},
            content: this.features.map((feature) => ({ tag: feature, attrs: {} }))
        };
    }

    getUserElement() {
        return null;
    }

    parser(node) {
        if (node.tag !== 'feature') {
            return null;
        }
        const errorNode = (0, WABinary_1.getBinaryNodeChild)(node, 'error');
        if (errorNode) {
            return {
                errorCode: errorNode.attrs?.code ? +errorNode.attrs.code : undefined,
                errorText: errorNode.attrs?.text
            };
        }
        const CAMEL_MAP = {
            encrypt_v2: 'encryptV2',
            voip_legacy: 'voipLegacy',
            multi_agent: 'multiAgent',
            bot_eligible: 'botEligible',
            encrypt_blist: 'encryptBlist',
            encrypt_contact: 'encryptContact',
            encrypt_group_gen2: 'encryptGroupGen2',
            encrypt_image: 'encryptImage',
            encrypt_location: 'encryptLocation',
            encrypt_url: 'encryptUrl'
        };
        const features = {};
        const children = Array.isArray(node.content) ? node.content : [];
        for (const child of children) {
            if (child?.attrs && child.attrs.value !== undefined) {
                const key = CAMEL_MAP[child.tag] || child.tag;
                features[key] = child.attrs.value;
            }
        }
        return features;
    }
}
exports.USyncFeatureProtocol = USyncFeatureProtocol;
