export declare const CompanionWebClientType: {
    readonly UNKNOWN: 0;
    readonly CHROME: 1;
    readonly EDGE: 2;
    readonly FIREFOX: 3;
    readonly IE: 4;
    readonly OPERA: 5;
    readonly SAFARI: 6;
    readonly ELECTRON: 7;
    readonly UWP: 8;
    readonly OTHER_WEB_CLIENT: 9;
};

export declare const getCompanionWebClientType: ([os, browserName]: [string, string, ...string[]]) => number;

export declare const getCompanionPlatformId: (browser: [string, string, ...string[]]) => string;

export declare const buildPairingQRData: (
    ref: string,
    noiseKeyB64: string,
    identityKeyB64: string,
    advB64: string,
    browser: [string, string, ...string[]]
) => string;
