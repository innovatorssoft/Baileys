"use strict";

const { PRIVACY_MEX_IDS, makePrivacySocket } = require("../lib/Socket/privacy");
const { REGISTRATION_MEX_IDS, makeRegistrationSocket } = require("../lib/Socket/registration");
const { INTEROP_MEX_QUERY_IDS, makeInteropSocket } = require("../lib/Socket/interop");
const { MANAGED_ACCOUNT_MEX_IDS, makeManagedAccountSocket } = require("../lib/Socket/managed-account");

describe("Socket Extensions & MEX Query IDs", () => {
    it("should export well-formed PRIVACY_MEX_IDS", () => {
        expect(PRIVACY_MEX_IDS.GET_SETTINGS).toBeDefined();
        expect(PRIVACY_MEX_IDS.SET_SETTING).toBeDefined();
        expect(PRIVACY_MEX_IDS.ACCOUNT_LOGIN).toBeDefined();
    });

    it("should export well-formed REGISTRATION_MEX_IDS", () => {
        expect(REGISTRATION_MEX_IDS.REG_PASSKEY_START).toBeDefined();
        expect(REGISTRATION_MEX_IDS.GET_REGISTRATION_UPSELLS).toBeDefined();
    });

    it("should export well-formed INTEROP_MEX_QUERY_IDS", () => {
        expect(INTEROP_MEX_QUERY_IDS.CREATE_GROUP).toBeDefined();
        expect(INTEROP_MEX_QUERY_IDS.PRIVACY_SETTINGS_QUERY).toBeDefined();
    });

    it("should export well-formed MANAGED_ACCOUNT_MEX_IDS", () => {
        expect(MANAGED_ACCOUNT_MEX_IDS.QUERY).toBeDefined();
        expect(MANAGED_ACCOUNT_MEX_IDS.INITIATE_LINKING).toBeDefined();
    });

    it("should decorate socket with makePrivacySocket methods", () => {
        const mockSock = {
            ws: { on: jest.fn() },
            ev: { emit: jest.fn() },
            query: jest.fn()
        };
        const privacySock = makePrivacySocket(mockSock);
        expect(privacySock.getPrivacySettings).toBeInstanceOf(Function);
        expect(privacySock.setPrivacySetting).toBeInstanceOf(Function);
        expect(privacySock.accountLogin).toBeInstanceOf(Function);
    });
});
