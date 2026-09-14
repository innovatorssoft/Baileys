"use strict";

const mockNewsletterSocket = {
    query: jest.fn(),
    generateMessageTag: jest.fn(() => "test-tag"),
    executeUSyncQuery: jest.fn(),
    signalRepository: {
        lidMapping: {
            storeLIDPNMappings: jest.fn()
        }
    },
    logger: {
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn()
    },
    authState: {
        creds: {
            me: { id: "923000000000:1@s.whatsapp.net", lid: "100000000@lid" }
        },
        keys: {
            transaction: jest.fn(async (work) => work())
        }
    },
    ev: {
        on: jest.fn(),
        emit: jest.fn(),
        off: jest.fn()
    },
    ws: {
        isOpen: true
    },
    processingMutex: {
        mutex: jest.fn((work) => work())
    },
    upsertMessage: jest.fn(),
    createCallLink: jest.fn(),
    fetchPrivacySettings: jest.fn(),
    sendNode: jest.fn(),
    groupQuery: jest.fn(async () => ({ tag: "result", content: [] })),
    groupMetadata: jest.fn(),
    groupToggleEphemeral: jest.fn(),
    newsletterWMexQuery: jest.fn()
};

jest.mock("../lib/Socket/newsletter", () => ({
    makeNewsletterSocket: jest.fn(() => mockNewsletterSocket)
}));

const {
    normalizeUsername,
    isValidUsername,
    validateUsername,
    isUsernameTarget,
    isJidTarget,
    resolveMessageTarget
} = require("../lib/Utils/username");

const {
    UsernameError,
    UsernameNotFoundError,
    UsernameInvalidError,
    UsernameResolutionError
} = require("../lib/Types/Username");

const { USyncUsernameProtocol } = require("../lib/WAUSync/Protocols/USyncUsernameProtocol");
const { USyncQuery, USyncUser } = require("../lib/WAUSync");
const { makeUsernameSocket } = require("../lib/Socket/username");
const { makeMessagesSocket } = require("../lib/Socket/messages-send");
const { DEFAULT_CONNECTION_CONFIG } = require("../lib/Defaults");

describe("WhatsApp Username Support", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("Normalization & Validation", () => {
        test("normalizeUsername strips @, trims, and converts to lowercase", () => {
            expect(normalizeUsername("@Javed")).toBe("javed");
            expect(normalizeUsername("  @Javed  ")).toBe("javed");
            expect(normalizeUsername("javed")).toBe("javed");
            expect(normalizeUsername("@Javed_123.Dev")).toBe("javed_123.dev");
        });

        test("normalizeUsername throws on non-string input", () => {
            expect(() => normalizeUsername(null)).toThrow(UsernameInvalidError);
            expect(() => normalizeUsername(12345)).toThrow(UsernameInvalidError);
        });

        test("isValidUsername validates compliant usernames", () => {
            expect(isValidUsername("javed")).toBe(true);
            expect(isValidUsername("@javed")).toBe(true);
            expect(isValidUsername("javed_dev")).toBe(true);
            expect(isValidUsername("javed.dev")).toBe(true);
            expect(isValidUsername("user12345")).toBe(true);
            expect(isValidUsername("a1b2c3d4e5")).toBe(true);
        });

        test("isValidUsername rejects invalid usernames", () => {
            expect(isValidUsername("ab")).toBe(false); // too short
            expect(isValidUsername("a".repeat(31))).toBe(false); // too long
            expect(isValidUsername("1234567890")).toBe(false); // purely numeric
            expect(isValidUsername("javed..dev")).toBe(false); // consecutive dots
            expect(isValidUsername(".javed")).toBe(false); // starts with dot
            expect(isValidUsername("javed.")).toBe(false); // ends with dot
            expect(isValidUsername("_javed")).toBe(false); // starts with underscore
            expect(isValidUsername("javed_")).toBe(false); // ends with underscore
            expect(isValidUsername("javed@name")).toBe(false); // inner @
            expect(isValidUsername("")).toBe(false);
            expect(isValidUsername(null)).toBe(false);
        });

        test("validateUsername returns normalized username or throws UsernameInvalidError", () => {
            expect(validateUsername("@Javed.Official")).toBe("javed.official");
            expect(() => validateUsername("ab")).toThrow(UsernameInvalidError);
            expect(() => validateUsername("123456")).toThrow(UsernameInvalidError);
            expect(() => validateUsername("user..name")).toThrow(UsernameInvalidError);
        });
    });

    describe("Target Resolution & Unambiguous Detection", () => {
        test("isUsernameTarget only matches explicit @username and { type: 'username' }", () => {
            expect(isUsernameTarget("@javed")).toBe(true);
            expect(isUsernameTarget("  @javed  ")).toBe(true);
            expect(isUsernameTarget({ type: "username", username: "javed" })).toBe(true);

            // Plain strings without @ must NOT be detected as usernames (unambiguous rule)
            expect(isUsernameTarget("javed")).toBe(false);
            expect(isUsernameTarget("123456789@s.whatsapp.net")).toBe(false);
            expect(isUsernameTarget("987654321@lid")).toBe(false);
            expect(isUsernameTarget("123-456@g.us")).toBe(false);
            expect(isUsernameTarget("@")).toBe(false);
        });

        test("isJidTarget matches standard JID strings and { type: 'jid' }", () => {
            expect(isJidTarget("123456789@s.whatsapp.net")).toBe(true);
            expect(isJidTarget("987654321@lid")).toBe(true);
            expect(isJidTarget("123-456@g.us")).toBe(true);
            expect(isJidTarget("javed")).toBe(true);
            expect(isJidTarget({ type: "jid", jid: "123@s.whatsapp.net" })).toBe(true);
            expect(isJidTarget("@javed")).toBe(false);
        });

        test("resolveMessageTarget extracts normalized targets", () => {
            expect(resolveMessageTarget("@Javed")).toEqual({
                type: "username",
                username: "javed"
            });
            expect(resolveMessageTarget({ type: "username", username: "@Javed" })).toEqual({
                type: "username",
                username: "javed"
            });
            expect(resolveMessageTarget("123@s.whatsapp.net")).toEqual({
                type: "jid",
                jid: "123@s.whatsapp.net"
            });
            expect(resolveMessageTarget({ type: "jid", jid: "987@lid" })).toEqual({
                type: "jid",
                jid: "987@lid"
            });
        });
    });

    describe("USyncUsernameProtocol", () => {
        const protocol = new USyncUsernameProtocol();

        test("getQueryElement returns username query node", () => {
            expect(protocol.name).toBe("username");
            expect(protocol.getQueryElement()).toEqual({
                tag: "username",
                attrs: {}
            });
        });

        test("getUserElement returns username node when user has username", () => {
            const userWithUsername = new USyncUser().withUsername("javed");
            expect(protocol.getUserElement(userWithUsername)).toEqual({
                tag: "username",
                attrs: {},
                content: "javed"
            });

            const userWithPin = new USyncUser().withUsername("javed").withUsernameKey("1234");
            expect(protocol.getUserElement(userWithPin)).toEqual({
                tag: "username",
                attrs: { pin: "1234" },
                content: "javed"
            });
        });

        test("getUserElement returns null when user has no username", () => {
            const userWithId = new USyncUser().withId("123@s.whatsapp.net");
            expect(protocol.getUserElement(userWithId)).toBeNull();
        });

        test("parser parses string, buffer, or attribute content", () => {
            expect(protocol.parser({ tag: "username", attrs: {}, content: "javed" })).toBe("javed");
            expect(protocol.parser({ tag: "username", attrs: {}, content: Buffer.from("javed") })).toBe("javed");
            expect(protocol.parser({ tag: "username", attrs: { val: "javed" }, content: [] })).toBe("javed");
            expect(protocol.parser({ tag: "username", attrs: { username: "javed" }, content: [] })).toBe("javed");
        });

        test("parser gracefully returns null on error child", () => {
            const errorNode = {
                tag: "username",
                attrs: {},
                content: [
                    {
                        tag: "error",
                        attrs: { code: "404", text: "not-found" }
                    }
                ]
            };
            expect(protocol.parser(errorNode)).toBeNull();
        });
    });

    describe("USyncQuery username result parsing", () => {
        test("parseUSyncQueryResult preserves lid, pn, and protocol data", () => {
            const query = new USyncQuery()
                .withUsernameProtocol()
                .withLIDProtocol()
                .withContactProtocol();

            const mockIq = {
                tag: "iq",
                attrs: { type: "result" },
                content: [
                    {
                        tag: "usync",
                        attrs: {},
                        content: [
                            {
                                tag: "list",
                                attrs: {},
                                content: [
                                    {
                                        tag: "user",
                                        attrs: {
                                            jid: "987654321@lid",
                                            pn_jid: "923001234567@s.whatsapp.net"
                                        },
                                        content: [
                                            { tag: "username", attrs: {}, content: "javed" },
                                            { tag: "lid", attrs: { val: "987654321@lid" } },
                                            { tag: "contact", attrs: { type: "in" } }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            const parsed = query.parseUSyncQueryResult(mockIq);
            expect(parsed).toBeDefined();
            expect(parsed.list).toHaveLength(1);
            expect(parsed.list[0]).toMatchObject({
                id: "987654321@lid",
                lid: "987654321@lid",
                pn: "923001234567@s.whatsapp.net",
                username: "javed",
                contact: true
            });
        });
    });

    describe("Username Resolution & Caching APIs", () => {
        const createMockSocket = (usyncHandler) => {
            mockNewsletterSocket.executeUSyncQuery.mockImplementation(usyncHandler);
            const mockConfig = {
                ...DEFAULT_CONNECTION_CONFIG
            };

            return makeUsernameSocket(mockConfig);
        };

        test("resolveUsername returns resolution result on success and caches it", async () => {
            const mockUSync = jest.fn(async (query) => {
                return {
                    list: [
                        {
                            id: "987654321@lid",
                            lid: "987654321@lid",
                            pn: "923001234567@s.whatsapp.net",
                            username: "javed"
                        }
                    ]
                };
            });

            const sock = createMockSocket(mockUSync);

            // First call: Cache miss -> calls USync
            const result1 = await sock.resolveUsername("@javed");
            expect(result1).toEqual({
                username: "javed",
                jid: "923001234567@s.whatsapp.net",
                lid: "987654321@lid",
                pn: "923001234567@s.whatsapp.net"
            });
            expect(mockUSync).toHaveBeenCalledTimes(1);
            expect(mockNewsletterSocket.signalRepository.lidMapping.storeLIDPNMappings).toHaveBeenCalledWith([
                { pn: "923001234567@s.whatsapp.net", lid: "987654321@lid" }
            ]);

            // Second call: Cache hit -> does NOT call USync again
            const result2 = await sock.resolveUsername("javed");
            expect(result2).toEqual(result1);
            expect(mockUSync).toHaveBeenCalledTimes(1);

            // Invalidate cache
            await sock.invalidateUsername("javed");

            // Third call after invalidation: calls USync again
            const result3 = await sock.resolveUsername("javed");
            expect(result3).toEqual(result1);
            expect(mockUSync).toHaveBeenCalledTimes(2);
        });

        test("resolveUsername resolves PN via lidMapping when USync only returns LID", async () => {
            const mockUSync = jest.fn(async () => ({
                list: [
                    {
                        id: "259631444144377@lid",
                        lid: "259631444144377@lid"
                    }
                ]
            }));

            mockNewsletterSocket.signalRepository.lidMapping.getPNForLID = jest.fn(async (lid) => {
                if (lid === "259631444144377@lid") return "923224559543@s.whatsapp.net";
                return null;
            });

            const sock = createMockSocket(mockUSync);
            const res = await sock.resolveUsername("midsoune");
            expect(res).toEqual({
                username: "midsoune",
                jid: "923224559543@s.whatsapp.net",
                lid: "259631444144377@lid",
                pn: "923224559543@s.whatsapp.net"
            });
        });

        test("resolveUsername falls back to LID for JID when PN is hidden/unavailable", async () => {
            const mockUSync = jest.fn(async () => ({
                list: [
                    {
                        id: "259631444144377@lid",
                        lid: "259631444144377@lid"
                    }
                ]
            }));

            mockNewsletterSocket.signalRepository.lidMapping.getPNForLID = jest.fn(async () => null);

            const sock = createMockSocket(mockUSync);
            const res = await sock.resolveUsername("midsoune");
            expect(res).toEqual({
                username: "midsoune",
                jid: "259631444144377@lid",
                lid: "259631444144377@lid"
            });
            expect(res.pn).toBeUndefined();
        });

        test("resolveUsername returns null and caches negative result when user not found", async () => {
            const mockUSync = jest.fn(async () => {
                return {
                    list: [
                        {
                            id: undefined,
                            error: { code: "404", text: "not-found" }
                        }
                    ]
                };
            });

            const sock = createMockSocket(mockUSync);

            const result1 = await sock.resolveUsername("@unknown");
            expect(result1).toBeNull();
            expect(mockUSync).toHaveBeenCalledTimes(1);

            // Second call hits negative cache
            const result2 = await sock.resolveUsername("@unknown");
            expect(result2).toBeNull();
            expect(mockUSync).toHaveBeenCalledTimes(1);
        });

        test("resolveUsername throws UsernameInvalidError on invalid input", async () => {
            const sock = createMockSocket(jest.fn());
            await expect(sock.resolveUsername("ab")).rejects.toThrow(UsernameInvalidError);
            await expect(sock.resolveUsername("12345")).rejects.toThrow(UsernameInvalidError);
        });

        test("resolveUsernames performs batched lookup for uncached usernames", async () => {
            const mockUSync = jest.fn(async (query) => {
                return {
                    list: [
                        {
                            id: "111@lid",
                            lid: "111@lid",
                            pn: "923001111111@s.whatsapp.net",
                            username: "user1"
                        },
                        {
                            id: "222@lid",
                            lid: "222@lid",
                            pn: "923002222222@s.whatsapp.net",
                            username: "user2"
                        },
                        {
                            id: undefined,
                            error: { code: "404" }
                        }
                    ]
                };
            });

            const sock = createMockSocket(mockUSync);

            const results = await sock.resolveUsernames(["@user1", "user2", "@notfound"]);
            expect(results).toHaveLength(3);
            expect(results[0]).toMatchObject({ username: "user1", lid: "111@lid" });
            expect(results[1]).toMatchObject({ username: "user2", lid: "222@lid" });
            expect(results[2]).toBeNull();
            expect(mockUSync).toHaveBeenCalledTimes(1);

            // Next call for user1 should hit cache
            const single = await sock.resolveUsername("user1");
            expect(single).toMatchObject({ username: "user1", lid: "111@lid" });
            expect(mockUSync).toHaveBeenCalledTimes(1);
        });

        test("onWhatsAppUsername filters out unresolvable usernames", async () => {
            const mockUSync = jest.fn(async () => {
                return {
                    list: [
                        {
                            id: "111@lid",
                            lid: "111@lid",
                            username: "active_user"
                        },
                        {
                            id: undefined,
                            error: { code: "404" }
                        }
                    ]
                };
            });

            const sock = createMockSocket(mockUSync);
            const found = await sock.onWhatsAppUsername("@active_user", "@inactive_user");
            expect(found).toHaveLength(1);
            expect(found[0].username).toBe("active_user");
        });
    });

    describe("sendMessage() Integration", () => {
        test("sendMessage resolves @username and dispatches to resolved LID", async () => {
            const relayed = [];
            const mockConfig = {
                ...DEFAULT_CONNECTION_CONFIG
            };

            const messagesSocket = makeMessagesSocket(mockConfig);

            // Mock resolveUsername on the socket
            messagesSocket.resolveUsername = jest.fn(async (u) => {
                if (u === "javed" || u === "@javed") {
                    return {
                        username: "javed",
                        jid: "987654321@lid",
                        lid: "987654321@lid",
                        pn: "923001234567@s.whatsapp.net"
                    };
                }
                return null;
            });

            // Mock relayMessage on the socket
            messagesSocket.relayMessage = jest.fn(async (jid, msg, opts) => {
                relayed.push({ jid, msg, opts });
                return "msg-123";
            });

            // Send via @username string
            await messagesSocket.sendMessage("@javed", { text: "Hello from InnovatorsSoft!" });
            expect(messagesSocket.resolveUsername).toHaveBeenCalledWith("@javed");
            expect(messagesSocket.relayMessage).toHaveBeenCalled();
            expect(relayed[0].jid).toBe("987654321@lid");

            // Send via explicit { type: 'username' } object
            await messagesSocket.sendMessage({ type: "username", username: "javed" }, { text: "Hello object!" });
            expect(messagesSocket.resolveUsername).toHaveBeenCalledWith("javed");
            expect(relayed[1].jid).toBe("987654321@lid");
        });

        test("sendMessage throws UsernameNotFoundError when username cannot be resolved", async () => {
            const mockConfig = {
                ...DEFAULT_CONNECTION_CONFIG
            };

            const messagesSocket = makeMessagesSocket(mockConfig);
            messagesSocket.resolveUsername = jest.fn(async () => null);

            await expect(
                messagesSocket.sendMessage("@ghostuser", { text: "Hello" })
            ).rejects.toThrow(UsernameNotFoundError);

            await expect(
                messagesSocket.sendMessage({ type: "username", username: "ghostuser" }, { text: "Hello" })
            ).rejects.toThrow(UsernameNotFoundError);
        });

        test("sendMessage preserves standard JID path without resolving username", async () => {
            const relayed = [];
            const mockConfig = {
                ...DEFAULT_CONNECTION_CONFIG
            };

            const messagesSocket = makeMessagesSocket(mockConfig);
            messagesSocket.resolveUsername = jest.fn();
            messagesSocket.relayMessage = jest.fn(async (jid, msg, opts) => {
                relayed.push({ jid, msg, opts });
                return "msg-456";
            });

            // PN JID
            await messagesSocket.sendMessage("923001234567@s.whatsapp.net", { text: "Direct PN" });
            expect(messagesSocket.resolveUsername).not.toHaveBeenCalled();
            expect(relayed[0].jid).toBe("923001234567@s.whatsapp.net");

            // LID JID
            await messagesSocket.sendMessage("123456789@lid", { text: "Direct LID" });
            expect(messagesSocket.resolveUsername).not.toHaveBeenCalled();
            expect(relayed[1].jid).toBe("123456789@lid");

            // Group JID
            await messagesSocket.sendMessage("123-456@g.us", { text: "Direct Group" });
            expect(messagesSocket.resolveUsername).not.toHaveBeenCalled();
            expect(relayed[2].jid).toBe("123-456@g.us");
        });
    });
});
