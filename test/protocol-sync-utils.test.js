"use strict";

const {
    buildAckStanza,
    shouldIncludeReportingToken,
    getMessageReportingToken,
    isTcTokenExpired,
    shouldSendNewTcToken,
    decodeE2eRekeyPayload,
    decodeConsumerApplication,
    getCompanionWebClientType,
    getCompanionPlatformId,
    buildPairingQRData,
    CompanionWebClientType,
    makeOfflineNodeProcessor,
    PreKeyManager
} = require("../lib/Utils");

describe("Protocol & Sync Utilities", () => {
    describe("Stanza ACK", () => {
        it("should construct valid ACK stanza for message", () => {
            const incomingNode = {
                tag: "message",
                attrs: {
                    id: "msg123",
                    from: "sender@s.whatsapp.net",
                    participant: "participant@s.whatsapp.net",
                    type: "text",
                    t: "1700000000"
                }
            };
            const ack = buildAckStanza(incomingNode, undefined, "me@s.whatsapp.net");
            expect(ack.tag).toBe("ack");
            expect(ack.attrs.id).toBe("msg123");
            expect(ack.attrs.to).toBe("sender@s.whatsapp.net");
            expect(ack.attrs.class).toBe("message");
        });

        it("should construct error NACK stanza", () => {
            const incomingNode = {
                tag: "message",
                attrs: { id: "msg456", from: "sender@s.whatsapp.net" }
            };
            const nack = buildAckStanza(incomingNode, 400, "me@s.whatsapp.net");
            expect(nack.attrs.error).toBe("400");
        });
    });

    describe("Reporting Utils", () => {
        it("should filter allowed reporting fields", () => {
            expect(shouldIncludeReportingToken({ conversation: "hi" })).toBe(true);
            expect(shouldIncludeReportingToken({ imageMessage: {} })).toBe(true);
            expect(shouldIncludeReportingToken({ reactionMessage: {} })).toBe(false);
            expect(shouldIncludeReportingToken({ pollUpdateMessage: {} })).toBe(false);
        });

        it("should compute reporting token with HMAC", async () => {
            const message = {
                conversation: "Hello",
                messageContextInfo: {
                    messageSecret: Buffer.alloc(32, 1)
                }
            };
            const key = { id: "msg123", remoteJid: "sender@s.whatsapp.net", fromMe: false };
            const msgProtobuf = Buffer.from([0x0a, 0x05, 0x48, 0x65, 0x6c, 0x6c, 0x6f]); // conversation = "Hello" (field 1)
            const token = await getMessageReportingToken(msgProtobuf, message, key);
            expect(token).toBeDefined();
            expect(token.tag).toBe("reporting");
        });
    });

    describe("TC Token Utils", () => {
        it("should check TC token expiration correctly", () => {
            const fresh = Math.floor(Date.now() / 1000);
            expect(isTcTokenExpired(fresh)).toBe(false);

            const expired = Math.floor(Date.now() / 1000) - (86400 * 31);
            expect(isTcTokenExpired(expired)).toBe(true);
        });

        it("should determine if a new TC token should be sent", () => {
            expect(shouldSendNewTcToken(undefined)).toBe(true);
            expect(shouldSendNewTcToken(Math.floor(Date.now() / 1000))).toBe(false);
        });
    });

    describe("VOIP Rekey & Consumer Application", () => {
        it("should decode E2E rekey payload", () => {
            const payload = Buffer.concat([
                Buffer.from([0x0a, 0x05, 0x08, 0x00, 0x12, 0x01, 0xaa])
            ]);
            const decoded = decodeE2eRekeyPayload(payload);
            expect(decoded.keys).toBeDefined();
        });

        it("should decode consumer application payload", () => {
            const decoded = decodeConsumerApplication(Buffer.from([]));
            expect(decoded).toBeDefined();
        });
    });

    describe("Companion Platform Mappings", () => {
        it("should map web client types and platform IDs", () => {
            expect(getCompanionWebClientType(["Linux", "Chrome"])).toBe(CompanionWebClientType.CHROME);
            expect(getCompanionWebClientType(["Linux", "Firefox"])).toBe(CompanionWebClientType.FIREFOX);
            expect(getCompanionPlatformId(["Windows", "Desktop"])).toBe(String(CompanionWebClientType.UWP));
            expect(getCompanionPlatformId(["macOS", "Desktop"])).toBe(String(CompanionWebClientType.ELECTRON));
        });

        it("should format pairing QR data", () => {
            const qr = buildPairingQRData("ref123", "noiseKeyB64", "identityKeyB64", "advB64", ["Linux", "Chrome"]);
            expect(qr).toContain("ref123");
            expect(qr).toContain("noiseKeyB64");
            expect(qr).toContain(String(CompanionWebClientType.CHROME));
        });
    });

    describe("Offline Node Processor", () => {
        it("should process stanzas sequentially without dropping nodes", async () => {
            const processed = [];
            const map = new Map();
            map.set("message", async (node) => {
                processed.push(node.attrs.id);
            });
            const processor = makeOfflineNodeProcessor(map, { isWsOpen: () => true }, 2);

            processor.enqueue("message", { tag: "message", attrs: { id: "1" } });
            processor.enqueue("message", { tag: "message", attrs: { id: "2" } });
            processor.enqueue("message", { tag: "message", attrs: { id: "3" } });

            await new Promise((r) => setTimeout(r, 50));
            expect(processed).toEqual(["1", "2", "3"]);
        });
    });

    describe("PreKey Manager", () => {
        it("should instantiate and manage mutexes", () => {
            const mockStore = { get: jest.fn(), set: jest.fn() };
            const manager = new PreKeyManager(mockStore);
            expect(manager.getMutex("pre-key")).toBeDefined();
        });
    });
});
