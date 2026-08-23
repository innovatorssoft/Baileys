"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPairingQRData = exports.getCompanionPlatformId = exports.getCompanionWebClientType = exports.CompanionWebClientType = void 0;

exports.CompanionWebClientType = {
    UNKNOWN: 0,
    CHROME: 1,
    EDGE: 2,
    FIREFOX: 3,
    IE: 4,
    OPERA: 5,
    SAFARI: 6,
    ELECTRON: 7,
    UWP: 8,
    OTHER_WEB_CLIENT: 9
};

const BROWSER_TO_COMPANION_WEB_CLIENT = {
    Chrome: exports.CompanionWebClientType.CHROME,
    Edge: exports.CompanionWebClientType.EDGE,
    Firefox: exports.CompanionWebClientType.FIREFOX,
    IE: exports.CompanionWebClientType.IE,
    Opera: exports.CompanionWebClientType.OPERA,
    Safari: exports.CompanionWebClientType.SAFARI
};

const getCompanionWebClientType = ([os, browserName]) => {
    if (browserName === 'Desktop') {
        return os === 'Windows' ? exports.CompanionWebClientType.UWP : exports.CompanionWebClientType.ELECTRON;
    }
    return BROWSER_TO_COMPANION_WEB_CLIENT[browserName] || exports.CompanionWebClientType.OTHER_WEB_CLIENT;
};
exports.getCompanionWebClientType = getCompanionWebClientType;

const getCompanionPlatformId = (browser) => {
    return (0, exports.getCompanionWebClientType)(browser).toString();
};
exports.getCompanionPlatformId = getCompanionPlatformId;

const buildPairingQRData = (ref, noiseKeyB64, identityKeyB64, advB64, browser) => {
    return [ref, noiseKeyB64, identityKeyB64, advB64, (0, exports.getCompanionPlatformId)(browser)].join(',');
};
exports.buildPairingQRData = buildPairingQRData;
