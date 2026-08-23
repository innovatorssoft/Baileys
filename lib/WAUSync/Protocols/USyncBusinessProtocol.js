"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USyncBusinessProtocol = void 0;

const WABinary_1 = require("../../WABinary");

class USyncBusinessProtocol {
    constructor(profileVersion = '2') {
        this.name = 'business';
        this.profileVersion = profileVersion;
    }

    getQueryElement() {
        return {
            tag: 'business',
            attrs: {},
            content: [
                { tag: 'verified_name', attrs: {} },
                { tag: 'profile', attrs: { v: this.profileVersion } }
            ]
        };
    }

    getUserElement(user) {
        const children = [];
        if (user.verifiedNameSerial) {
            children.push({ tag: 'verified_name', attrs: { serial: user.verifiedNameSerial } });
        }
        if (user.businessProfileTag) {
            children.push({ tag: 'profile', attrs: { tag: user.businessProfileTag } });
        }
        return children.length > 0 ? { tag: 'business', attrs: {}, content: children } : null;
    }

    parser(node) {
        if (node.tag !== 'business') return null;
        (0, WABinary_1.assertNodeErrorFree)(node);
        const verifiedNameNode = (0, WABinary_1.getBinaryNodeChild)(node, 'verified_name');
        const profileNode = (0, WABinary_1.getBinaryNodeChild)(node, 'profile');

        let businessHours = undefined;
        if (profileNode) {
            const businessHoursNode = (0, WABinary_1.getBinaryNodeChild)(profileNode, 'business_hours');
            if (businessHoursNode) {
                const configs = (0, WABinary_1.getBinaryNodeChildren)(businessHoursNode, 'business_hours_config');
                businessHours = {
                    timezone: businessHoursNode.attrs?.timezone ?? null,
                    config: configs.map(({ attrs }) => ({
                        dayOfWeek: attrs?.day_of_week ?? null,
                        openTime: attrs?.open_time ?? null,
                        closeTime: attrs?.close_time ?? null,
                        mode: attrs?.mode ?? null
                    }))
                };
            }
        }

        const addressNode = profileNode ? (0, WABinary_1.getBinaryNodeChild)(profileNode, 'address') : null;
        const businessAddress = addressNode?.content
            ? Buffer.isBuffer(addressNode.content)
                ? addressNode.content.toString()
                : String(addressNode.content)
            : (profileNode?.attrs?.address ?? null);

        const catalogStatus = profileNode
            ? {
                exists: profileNode.attrs?.catalog_exists === 'true' || profileNode.attrs?.catalog_exists === true,
                sendAll: profileNode.attrs?.catalog_send_all === 'true' || profileNode.attrs?.catalog_send_all === true
            }
            : null;

        const cartEnabled =
            profileNode?.attrs?.cart_enabled !== undefined
                ? profileNode.attrs.cart_enabled === 'true' || profileNode.attrs.cart_enabled === true
                : null;
        const webCartEnabled =
            profileNode?.attrs?.web_cart_enabled !== undefined
                ? profileNode.attrs.web_cart_enabled === 'true' || profileNode.attrs.web_cart_enabled === true
                : null;
        const webCartOnOff = profileNode?.attrs?.web_cart_on_off ?? null;
        const commerceExperience = profileNode?.attrs?.commerce_experience ?? null;

        return {
            verifiedName: verifiedNameNode?.content ?? null,
            verifiedLevel: verifiedNameNode?.attrs?.verified_level ?? null,
            verifiedNameLevel: verifiedNameNode?.attrs?.verified_level ?? null,
            profileTag: profileNode?.attrs?.tag ?? null,
            pnJid: node.attrs?.pn_jid ?? null,
            businessHours: businessHours ?? null,
            businessAddress,
            catalogStatus,
            cartEnabled,
            webCartEnabled,
            webCartOnOff,
            commerceExperience
        };
    }
}
exports.USyncBusinessProtocol = USyncBusinessProtocol;
