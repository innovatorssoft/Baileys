"use strict";

const { makeMessagesSocket } = require("../lib/Socket/messages-send");
const { DEFAULT_CONNECTION_CONFIG } = require("../lib/Defaults");
const { UsernameNotFoundError } = require("../lib/Types/Username");
const node_cache_1 = require("@cacheable/node-cache");
const NodeCache = node_cache_1.default || node_cache_1;

let mockNewsletterSocket;

jest.mock("../lib/Socket/newsletter", () => ({
    makeNewsletterSocket: jest.fn(() => mockNewsletterSocket)
}));

describe("Group Message with Username Participants - Complete Test Suite", () => {
    let mockKeys;
    let mockSignalRepo;
    let sentNodes;
    let usyncQueriesExecuted;
    let usernameCache;

    beforeEach(() => {
        sentNodes = [];
        usyncQueriesExecuted = [];
        mockKeys = {};
        usernameCache = new NodeCache({ stdTTL: 300, useClones: false });

        mockSignalRepo = {
            encryptGroupMessage: jest.fn(async ({ group, meId, data }) => ({
                ciphertext: Buffer.from("group-ciphertext"),
                senderKeyDistributionMessage: Buffer.from("skdm-payload")
            })),
            encryptMessage: jest.fn(async ({ jid, data }) => ({
                type: "msg",
                ciphertext: Buffer.from(`direct-ciphertext-for-${jid}`)
            })),
            lidMapping: {
                getLIDForPN: jest.fn(async (pn) => null),
                getPNForLID: jest.fn(async (lid) => null),
                storeLIDPNMappings: jest.fn(async (mappings) => {
                    for (const { lid, pn } of mappings) {
                        mockKeys[`lid-mapping-${pn}`] = lid;
                        mockKeys[`lid-mapping-${lid}`] = pn;
                    }
                })
            },
            jidToSignalProtocolAddress: jest.fn((jid) => {
                const sepIdx = jid ? jid.indexOf("@") : -1;
                if (sepIdx < 0) {
                    throw new Error(`jidToSignalProtocolAddress failed: invalid JID "${jid}"`);
                }
                const user = jid.slice(0, sepIdx).split(":")[0];
                if (!user) {
                    throw new Error(`JID decoded but user is empty: "${jid}"`);
                }
                return `${user}.0`;
            }),
            migrateSession: jest.fn(async () => ({ migrated: false })),
            deleteSession: jest.fn(async () => {})
        };

        mockNewsletterSocket = {
            query: jest.fn(),
            generateMessageTag: jest.fn(() => "test-tag"),
            executeUSyncQuery: jest.fn(async (usyncQuery) => {
                usyncQueriesExecuted.push(usyncQuery);
                const list = [];
                const isUsernameQuery = usyncQuery.protocols.some(p => p.name === "username");
                const isDeviceQuery = usyncQuery.protocols.some(p => p.name === "devices");

                for (const u of usyncQuery.users) {
                    const id = u.id || u.phone;
                    const username = u.username;

                    if (isUsernameQuery) {
                        if (username === "javed" || id === "@javed" || id === "javed") {
                            list.push({
                                id: "444444444@lid",
                                lid: "444444444@lid",
                                pn: "923004444444@s.whatsapp.net",
                                username: "javed"
                            });
                        } else if (username === "sarah" || id === "@sarah" || id === "sarah") {
                            list.push({
                                id: "555555555@lid",
                                lid: "555555555@lid",
                                pn: "923005555555@s.whatsapp.net",
                                username: "sarah"
                            });
                        } else {
                            list.push({
                                id: undefined,
                                error: { code: "404", text: "item-not-found" }
                            });
                        }
                    }

                    if (isDeviceQuery) {
                        if (
                            id === "111111111@s.whatsapp.net" ||
                            id === "222222222@lid" ||
                            id === "333333333@s.whatsapp.net" ||
                            id === "444444444@lid" ||
                            id === "923004444444@s.whatsapp.net" ||
                            id === "555555555@lid" ||
                            id === "923005555555@s.whatsapp.net"
                        ) {
                            list.push({
                                id,
                                devices: {
                                    deviceList: [{ id: 0, keyIndex: 0 }]
                                }
                            });
                        } else {
                            // Non-canonical JIDs fail device lookup
                            list.push({
                                id,
                                error: { code: "404", text: "item-not-found" }
                            });
                        }
                    }
                }
                return { list, sideList: [] };
            }),
            signalRepository: mockSignalRepo,
            logger: (() => {
                const l = {
                    trace: jest.fn(),
                    debug: jest.fn(),
                    info: jest.fn(),
                    warn: jest.fn(),
                    error: jest.fn(),
                    child: jest.fn(() => l)
                };
                return l;
            })(),
            authState: {
                creds: {
                    me: { id: "923000000000:1@s.whatsapp.net", lid: "100000000@lid" },
                    account: {}
                },
                keys: {
                    get: jest.fn(async (type, ids) => {
                        const result = {};
                        for (const id of ids) {
                            if (mockKeys[`${type}-${id}`]) {
                                result[id] = mockKeys[`${type}-${id}`];
                            }
                        }
                        return result;
                    }),
                    set: jest.fn(async (data) => {
                        for (const key in data) {
                            for (const id in data[key]) {
                                mockKeys[`${key}-${id}`] = data[key][id];
                            }
                        }
                    }),
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
            sendNode: jest.fn(async (node) => {
                sentNodes.push(node);
                return { tag: "ack", attrs: { id: node.attrs?.id } };
            }),
            groupQuery: jest.fn(async () => ({
                tag: "result",
                attrs: {},
                content: [
                    {
                        tag: "group",
                        attrs: {},
                        content: []
                    }
                ]
            })),
            groupMetadata: jest.fn(),
            groupToggleEphemeral: jest.fn(),
            newsletterWMexQuery: jest.fn()
        };
    });

    function createSock(groupData) {
        const sock = makeMessagesSocket({
            ...DEFAULT_CONNECTION_CONFIG,
            signalRepository: mockSignalRepo,
            cachedGroupMetadata: jest.fn(async () => groupData),
            patchMessageBeforeSending: (msg) => msg,
            usernameCache,
            ...mockNewsletterSocket
        });
        Object.assign(sock, {
            sendNode: mockNewsletterSocket.sendNode,
            executeUSyncQuery: mockNewsletterSocket.executeUSyncQuery
        });
        return sock;
    }

    test("Test 1: Group with only PN participants must send successfully", async () => {
        const groupJid = "123456789-987654@g.us";
        const groupData = {
            id: groupJid,
            subject: "All PN Group",
            addressingMode: "pn",
            participants: [
                { id: "111111111@s.whatsapp.net", admin: null },
                { id: "333333333@s.whatsapp.net", admin: null }
            ]
        };

        const sock = createSock(groupData);
        await sock.sendMessage(groupJid, { text: "Hello PN participants" });

        expect(sentNodes.length).toBe(1);
        expect(sentNodes[0].attrs.to).toBe(groupJid);
        const participantsNode = sentNodes[0].content.find(c => c.tag === "participants");
        expect(participantsNode).toBeDefined();
        const recipientJids = participantsNode.content.map(toNode => toNode.attrs.jid);
        expect(recipientJids).toContain("111111111@s.whatsapp.net");
        expect(recipientJids).toContain("333333333@s.whatsapp.net");
    });

    test("Test 2: Group with only LID participants must send successfully", async () => {
        const groupJid = "123456789-987654@g.us";
        const groupData = {
            id: groupJid,
            subject: "All LID Group",
            addressingMode: "lid",
            participants: [
                { id: "222222222@lid", lid: "222222222@lid", admin: null },
                { id: "444444444@lid", lid: "444444444@lid", admin: null }
            ]
        };

        const sock = createSock(groupData);
        await sock.sendMessage(groupJid, { text: "Hello LID participants" });

        expect(sentNodes.length).toBe(1);
        expect(sentNodes[0].attrs.to).toBe(groupJid);
        const participantsNode = sentNodes[0].content.find(c => c.tag === "participants");
        expect(participantsNode).toBeDefined();
        const recipientJids = participantsNode.content.map(toNode => toNode.attrs.jid);
        expect(recipientJids).toContain("222222222@lid");
        expect(recipientJids).toContain("444444444@lid");
    });

    test("Test 3: Group with mixed PN + LID participants must send successfully", async () => {
        const groupJid = "123456789-987654@g.us";
        const groupData = {
            id: groupJid,
            subject: "Mixed PN/LID Group",
            participants: [
                { id: "111111111@s.whatsapp.net", admin: null },
                { id: "222222222@lid", lid: "222222222@lid", admin: null },
                { id: "333333333@s.whatsapp.net", admin: null }
            ]
        };

        const sock = createSock(groupData);
        await sock.sendMessage(groupJid, { text: "Hello Mixed group" });

        expect(sentNodes.length).toBe(1);
        expect(sentNodes[0].attrs.to).toBe(groupJid);
        const participantsNode = sentNodes[0].content.find(c => c.tag === "participants");
        const recipientJids = participantsNode.content.map(toNode => toNode.attrs.jid);
        expect(recipientJids).toContain("111111111@s.whatsapp.net");
        expect(recipientJids).toContain("222222222@lid");
        expect(recipientJids).toContain("333333333@s.whatsapp.net");
    });

    test("Test 4: Group with username participant must resolve username and send successfully", async () => {
        const groupJid = "123456789-987654@g.us";
        const groupData = {
            id: groupJid,
            subject: "Group with Username Participant",
            addressingMode: "lid",
            participants: [
                { id: "111111111@s.whatsapp.net", admin: null },
                { id: "222222222@lid", lid: "222222222@lid", admin: null },
                { id: "@javed", admin: null } // username identity
            ]
        };

        const sock = createSock(groupData);
        await sock.sendMessage(groupJid, { text: "Hello to group with @javed" });

        expect(sentNodes.length).toBe(1);
        const participantsNode = sentNodes[0].content.find(c => c.tag === "participants");
        expect(participantsNode).toBeDefined();
        const recipientJids = participantsNode.content.map(toNode => toNode.attrs.jid);

        // In LID mode, @javed was resolved to 444444444@lid
        expect(recipientJids).toContain("444444444@lid");
        expect(recipientJids).toContain("111111111@s.whatsapp.net");
        expect(recipientJids).toContain("222222222@lid");

        // Verify username protocol was queried
        const usernameQueries = usyncQueriesExecuted.filter(q => q.protocols.some(p => p.name === "username"));
        expect(usernameQueries.length).toBe(1);
        expect(usernameQueries[0].users.map(u => u.username)).toContain("javed");
    });

    test("Test 5: Group with multiple username participants resolves all required participants correctly", async () => {
        const groupJid = "123456789-987654@g.us";
        const groupData = {
            id: groupJid,
            subject: "Multiple Username Participants Group",
            addressingMode: "lid",
            participants: [
                { id: "@javed", admin: null },
                { id: "@sarah", admin: null },
                { id: "111111111@s.whatsapp.net", admin: null }
            ]
        };

        const sock = createSock(groupData);
        await sock.sendMessage(groupJid, { text: "Hello @javed and @sarah" });

        expect(sentNodes.length).toBe(1);
        const participantsNode = sentNodes[0].content.find(c => c.tag === "participants");
        const recipientJids = participantsNode.content.map(toNode => toNode.attrs.jid);

        expect(recipientJids).toContain("444444444@lid");
        expect(recipientJids).toContain("555555555@lid");
        expect(recipientJids).toContain("111111111@s.whatsapp.net");
    });

    test("Test 6: Username participant -> LID + PN mapping correctly populates existing LID mapping", async () => {
        const groupJid = "123456789-987654@g.us";
        const groupData = {
            id: groupJid,
            subject: "LID Mapping Population Group",
            addressingMode: "lid",
            participants: [
                { id: "@javed", admin: null }
            ]
        };

        const sock = createSock(groupData);
        await sock.sendMessage(groupJid, { text: "Mapping test" });

        expect(mockSignalRepo.lidMapping.storeLIDPNMappings).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    lid: "444444444@lid",
                    pn: "923004444444@s.whatsapp.net"
                })
            ])
        );
    });

    test("Test 7: Username resolution fails produces meaningful UsernameNotFoundError", async () => {
        const groupJid = "123456789-987654@g.us";
        const groupData = {
            id: groupJid,
            subject: "Ghost User Group",
            participants: [
                { id: "111111111@s.whatsapp.net", admin: null },
                { id: "@unknown_user", admin: null }
            ]
        };

        const sock = createSock(groupData);

        await expect(
            sock.sendMessage(groupJid, { text: "Failing message" })
        ).rejects.toThrow(UsernameNotFoundError);
    });

    test("Test 8: Username participant already cached does not issue unnecessary USync requests", async () => {
        const groupJid = "123456789-987654@g.us";

        // Pre-populate username cache for 'javed'
        usernameCache.set("user:javed", {
            username: "javed",
            lid: "444444444@lid",
            pn: "923004444444@s.whatsapp.net",
            jid: "444444444@lid",
            resolvedAt: Date.now()
        });

        const groupData = {
            id: groupJid,
            subject: "Cached Username Group",
            addressingMode: "lid",
            participants: [
                { id: "@javed", admin: null }
            ]
        };

        const sock = createSock(groupData);
        await sock.sendMessage(groupJid, { text: "Cached lookup test" });

        // Verify that NO username USync queries were executed
        const usernameQueries = usyncQueriesExecuted.filter(q => q.protocols.some(p => p.name === "username"));
        expect(usernameQueries.length).toBe(0);

        // But devices query was executed for the cached LID
        const deviceQueries = usyncQueriesExecuted.filter(q => q.protocols.some(p => p.name === "devices"));
        expect(deviceQueries.length).toBe(1);
        expect(deviceQueries[0].users.map(u => u.id)).toContain("444444444@lid");
    });
});
