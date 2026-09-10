"use strict";

const mockWebSocketClient = {
    connect: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
    removeAllListeners: jest.fn(),
    isOpen: true
};

jest.mock("../lib/Socket/Client", () => ({
    WebSocketClient: jest.fn().mockImplementation(() => mockWebSocketClient)
}));

const { makeSocket } = require("../lib/Socket/socket");
const { DEFAULT_CONNECTION_CONFIG } = require("../lib/Defaults");

describe("Socket onWhatsApp Username Support", () => {
    let mockLidMapping;
    let mockUSync;
    let sock;

    afterEach(() => {
        sock.end(undefined);
        sock.ws.removeAllListeners();
    });

    beforeEach(() => {
        jest.clearAllMocks();

        mockLidMapping = {
            getPNForLID: jest.fn(),
            storeLIDPNMappings: jest.fn(async () => {})
        };

        mockUSync = jest.fn();

        const config = {
            ...DEFAULT_CONNECTION_CONFIG,
            auth: {
                creds: {
                    me: { id: "923000000000:1@s.whatsapp.net", lid: "100000000@lid" }
                },
                keys: {
                    get: jest.fn().mockResolvedValue({}),
                    set: jest.fn().mockResolvedValue(null),
                    transaction: jest.fn(async (cb) => cb())
                }
            },
            makeSignalRepository: jest.fn(() => ({
                lidMapping: mockLidMapping
            }))
        };

        sock = makeSocket(config);
        sock.executeUSyncQuery = mockUSync;
    });

    test("onWhatsApp handles @username and returns resolved LID & PN", async () => {
        mockUSync.mockImplementation(async (query) => {
            expect(query.users[0].username).toBe("midsoune");
            return {
                list: [
                    {
                        id: "259631444144377@lid",
                        lid: "259631444144377@lid",
                        pn: "923224559543@s.whatsapp.net",
                        username: "midsoune",
                        contact: true
                    }
                ]
            };
        });

        const results = await sock.onWhatsApp("@midsoune");

        expect(results).toHaveLength(1);
        expect(results[0]).toEqual({
            jid: "923224559543@s.whatsapp.net",
            exists: true,
            lid: "259631444144377@lid",
            pn: "923224559543@s.whatsapp.net",
            username: "midsoune"
        });

        expect(mockLidMapping.storeLIDPNMappings).toHaveBeenCalledWith([
            { pn: "923224559543@s.whatsapp.net", lid: "259631444144377@lid" }
        ]);
    });

    test("onWhatsApp handles username without @ (e.g. 'midsoune')", async () => {
        mockUSync.mockImplementation(async () => {
            return {
                list: [
                    {
                        id: "259631444144377@lid",
                        lid: "259631444144377@lid",
                        contact: true
                    }
                ]
            };
        });

        // PN found via lidMapping
        mockLidMapping.getPNForLID.mockResolvedValueOnce("923224559543@s.whatsapp.net");

        const results = await sock.onWhatsApp("midsoune");

        expect(results).toHaveLength(1);
        expect(results[0]).toEqual({
            jid: "923224559543@s.whatsapp.net",
            exists: true,
            lid: "259631444144377@lid",
            pn: "923224559543@s.whatsapp.net",
            username: "midsoune"
        });
    });

    test("onWhatsApp resolves PN via secondary LID query if not in lidMapping", async () => {
        let callCount = 0;
        mockUSync.mockImplementation(async (query) => {
            callCount++;
            if (callCount === 1) {
                // First query: username query returns LID only
                expect(query.users[0].username).toBe("midsoune");
                return {
                    list: [
                        {
                            id: "259631444144377@lid",
                            lid: "259631444144377@lid",
                            contact: true
                        }
                    ]
                };
            } else {
                // Second query: LID lookup returns PN
                expect(query.users[0].lid).toBe("259631444144377@lid");
                return {
                    list: [
                        {
                            id: "259631444144377@lid",
                            lid: "259631444144377@lid",
                            pn: "923224559543@s.whatsapp.net",
                            contact: true
                        }
                    ]
                };
            }
        });

        mockLidMapping.getPNForLID.mockResolvedValueOnce(null);

        const results = await sock.onWhatsApp("@midsoune");

        expect(results).toHaveLength(1);
        expect(results[0]).toEqual({
            jid: "923224559543@s.whatsapp.net",
            exists: true,
            lid: "259631444144377@lid",
            pn: "923224559543@s.whatsapp.net",
            username: "midsoune"
        });

        expect(callCount).toBe(2);
        expect(mockLidMapping.storeLIDPNMappings).toHaveBeenCalledWith([
            { pn: "923224559543@s.whatsapp.net", lid: "259631444144377@lid" }
        ]);
    });

    test("onWhatsApp falls back to LID for JID when PN is hidden/unavailable", async () => {
        mockUSync.mockImplementation(async () => {
            return {
                list: [
                    {
                        id: "259631444144377@lid",
                        lid: "259631444144377@lid",
                        contact: true
                    }
                ]
            };
        });

        mockLidMapping.getPNForLID.mockResolvedValueOnce(null);

        const results = await sock.onWhatsApp("@midsoune");

        expect(results).toHaveLength(1);
        expect(results[0]).toEqual({
            jid: "259631444144377@lid",
            exists: true,
            lid: "259631444144377@lid",
            username: "midsoune"
        });
        expect(results[0].pn).toBeUndefined();
    });

    test("onWhatsApp supports object format { type: 'username', username: 'midsoune' }", async () => {
        mockUSync.mockImplementation(async () => {
            return {
                list: [
                    {
                        id: "259631444144377@lid",
                        lid: "259631444144377@lid",
                        pn: "923224559543@s.whatsapp.net",
                        username: "midsoune",
                        contact: true
                    }
                ]
            };
        });

        const results = await sock.onWhatsApp({ type: "username", username: "midsoune" });
        expect(results).toHaveLength(1);
        expect(results[0].username).toBe("midsoune");
        expect(results[0].jid).toBe("923224559543@s.whatsapp.net");
    });

    test("onWhatsApp supports mixed targets (phone, LID, username)", async () => {
        mockUSync.mockImplementation(async (query) => {
            const user = query.users[0];
            if (user?.username) {
                // Username query
                return {
                    list: [
                        {
                            id: "259631444144377@lid",
                            lid: "259631444144377@lid",
                            pn: "923224559543@s.whatsapp.net",
                            username: user.username,
                            contact: true
                        }
                    ]
                };
            } else if (user?.lid) {
                // LID query
                return {
                    list: [
                        {
                            id: "100000001@lid",
                            lid: "100000001@lid"
                        }
                    ]
                };
            } else {
                // Phone query
                return {
                    list: [
                        {
                            id: "1234567890@s.whatsapp.net",
                            lid: "100000002@lid",
                            contact: true
                        }
                    ]
                };
            }
        });

        const results = await sock.onWhatsApp("+1234567890", "100000001@lid", "@midsoune");

        expect(results).toHaveLength(3);

        const phoneRes = results.find((r) => r.jid === "1234567890@s.whatsapp.net");
        const lidRes = results.find((r) => r.lid === "100000001@lid");
        const userRes = results.find((r) => r.username === "midsoune");

        expect(phoneRes).toBeDefined();
        expect(phoneRes.exists).toBe(true);
        expect(phoneRes.lid).toBe("100000002@lid");

        expect(lidRes).toBeDefined();
        expect(lidRes.exists).toBe(true);

        expect(userRes).toBeDefined();
        expect(userRes.jid).toBe("923224559543@s.whatsapp.net");
        expect(userRes.lid).toBe("259631444144377@lid");
        expect(userRes.pn).toBe("923224559543@s.whatsapp.net");
    });

    test("onWhatsApp handles direct LID query (e.g. '169702865256530@lid')", async () => {
        mockUSync.mockImplementation(async (query) => {
            expect(query.protocols[0].name).toBe("devices");
            expect(query.users[0].id).toBe("169702865256530@lid");
            return {
                list: [
                    {
                        id: "169702865256530@lid",
                        lid: "169702865256530@lid",
                        devices: {
                            deviceList: [{ id: 0, keyIndex: 0 }]
                        }
                    }
                ]
            };
        });

        const results = await sock.onWhatsApp("169702865256530@lid");

        expect(results).toHaveLength(1);
        expect(results[0]).toEqual({
            jid: "169702865256530@lid",
            exists: true,
            lid: "169702865256530@lid"
        });
    });

    test("onWhatsApp handles direct LID query with mapped PN", async () => {
        mockUSync.mockImplementation(async (query) => {
            expect(query.protocols[0].name).toBe("devices");
            expect(query.users[0].id).toBe("169702865256530@lid");
            return {
                list: [
                    {
                        id: "169702865256530@lid",
                        lid: "169702865256530@lid",
                        devices: {
                            deviceList: [{ id: 0, keyIndex: 0 }]
                        }
                    }
                ]
            };
        });

        mockLidMapping.getPNForLID.mockResolvedValueOnce("923001234567@s.whatsapp.net");

        const results = await sock.onWhatsApp("169702865256530@lid");

        expect(results).toHaveLength(1);
        expect(results[0]).toEqual({
            jid: "923001234567@s.whatsapp.net",
            exists: true,
            lid: "169702865256530@lid",
            pn: "923001234567@s.whatsapp.net"
        });
    });

    test("onWhatsApp handles object format with LID { type: 'lid', lid: '169702865256530@lid' }", async () => {
        mockUSync.mockImplementation(async (query) => {
            expect(query.protocols[0].name).toBe("devices");
            expect(query.users[0].id).toBe("169702865256530@lid");
            return {
                list: [
                    {
                        id: "169702865256530@lid",
                        lid: "169702865256530@lid",
                        devices: {
                            deviceList: [{ id: 0, keyIndex: 0 }]
                        }
                    }
                ]
            };
        });

        const results = await sock.onWhatsApp({ type: "lid", lid: "169702865256530@lid" });

        expect(results).toHaveLength(1);
        expect(results[0]).toEqual({
            jid: "169702865256530@lid",
            exists: true,
            lid: "169702865256530@lid"
        });
    });

    test("onWhatsApp filters out non-existent LID when error is returned", async () => {
        mockUSync.mockImplementation(async () => {
            return {
                list: [
                    {
                        id: "999999999999999@lid",
                        lid: "999999999999999@lid",
                        error: { code: "404", text: "item-not-found" }
                    }
                ]
            };
        });

        const results = await sock.onWhatsApp("999999999999999@lid");
        expect(results).toEqual([]);
    });
});
