const { CallManager, parseRelayEndpoints } = require("../lib/Voip/call-manager.js");
const { CallDirection, CallMediaType } = require("../lib/Voip/types.js");

describe("VoIP CallManager Tests", () => {

    const createMockSocket = () => ({
        sendNode: jest.fn(async () => {}),
        query: jest.fn(async () => {}),
        authState: {
            creds: {
                me: { id: "self_jid@s.whatsapp.net", lid: "self_lid@lid" }
            }
        }
    });

    test("1. CallManager Initialization & default settings", () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock, maxConcurrentCalls: 2 });

        expect(manager.maxConcurrentCalls).toBe(2);
        expect(manager.onLimit).toBe("reject");
        expect(manager.activeCallCount).toBe(0);
        expect(manager.waitingCallCount).toBe(0);

        manager.cleanup();
    });

    test("2. handleIncomingOffer — parses offer, creates session, emits call_incoming", async () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock, maxConcurrentCalls: 2 });

        const incomingHandler = jest.fn();
        manager.on("call_incoming", incomingHandler);

        const offerStanza = {
            tag: "call",
            attrs: { from: "1234567890@s.whatsapp.net" },
            content: [
                {
                    tag: "offer",
                    attrs: { "call-id": "MGR_OFFER_1", "call-creator": "1234567890@s.whatsapp.net", caller_pn: "1234567890" },
                    content: [
                        { tag: "audio", attrs: { enc: "opus", rate: "16000" } }
                    ]
                }
            ]
        };

        const session = await manager.handleIncomingOffer(offerStanza, "1234567890@s.whatsapp.net");

        expect(session).not.toBeNull();
        expect(session.callId).toBe("MGR_OFFER_1");
        expect(session.direction).toBe(CallDirection.Incoming);
        expect(session.mediaType).toBe(CallMediaType.Audio);
        expect(manager.activeCallCount).toBe(1);
        expect(incomingHandler).toHaveBeenCalledTimes(1);
        expect(sock.sendNode).toHaveBeenCalled();

        manager.cleanup();
    });

    test("3. Concurrency Limit (onLimit = 'reject') — auto-rejects when at capacity", async () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock, maxConcurrentCalls: 1, onLimit: "reject" });

        const rejectedHandler = jest.fn();
        manager.on("call_rejected_capacity", rejectedHandler);

        // First call fills the capacity
        const call1 = await manager.handleIncomingOffer({
            tag: "call",
            attrs: { from: "peer1@s.whatsapp.net" },
            content: [{ tag: "offer", attrs: { "call-id": "CALL_1", "call-creator": "peer1@s.whatsapp.net" }, content: [] }]
        });
        expect(call1).not.toBeNull();
        expect(manager.activeCallCount).toBe(1);

        // Second call should be auto-rejected
        const call2 = await manager.handleIncomingOffer({
            tag: "call",
            attrs: { from: "peer2@s.whatsapp.net" },
            content: [{ tag: "offer", attrs: { "call-id": "CALL_2", "call-creator": "peer2@s.whatsapp.net" }, content: [] }]
        });

        expect(call2).toBeNull();
        expect(rejectedHandler).toHaveBeenCalledTimes(1);
        expect(rejectedHandler).toHaveBeenCalledWith({
            callId: "CALL_2",
            peerJid: "peer2@s.whatsapp.net",
            reason: "busy"
        });

        manager.cleanup();
    });

    test("4. Concurrency Limit (onLimit = 'queue') — queues call and unblocks on completion", async () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock, maxConcurrentCalls: 1, onLimit: "queue" });

        const waitingHandler = jest.fn();
        const unblockedHandler = jest.fn();
        manager.on("call_waiting", waitingHandler);
        manager.on("call_unblocked", unblockedHandler);

        // First call is active
        const call1 = await manager.handleIncomingOffer({
            tag: "call",
            attrs: { from: "peer1@s.whatsapp.net" },
            content: [{ tag: "offer", attrs: { "call-id": "Q_CALL_1", "call-creator": "peer1@s.whatsapp.net" } }]
        });
        expect(manager.activeCallCount).toBe(1);
        expect(manager.waitingCallCount).toBe(0);

        // Second call is queued
        const call2 = await manager.handleIncomingOffer({
            tag: "call",
            attrs: { from: "peer2@s.whatsapp.net" },
            content: [{ tag: "offer", attrs: { "call-id": "Q_CALL_2", "call-creator": "peer2@s.whatsapp.net" } }]
        });

        expect(call2).not.toBeNull();
        expect(call2.isWaiting).toBe(true);
        expect(manager.waitingCallCount).toBe(1);
        expect(waitingHandler).toHaveBeenCalledTimes(1);

        // End first call -> unblocks second call
        await manager.endCall("Q_CALL_1");
        expect(unblockedHandler).toHaveBeenCalledTimes(1);
        expect(call2.isWaiting).toBe(false);
        expect(call2.status).toBe("incoming_ringing");

        manager.cleanup();
    });

    test("5. parseRelayEndpoints — parses and sorts relay endpoints from binary node", () => {
        const relayNode = {
            tag: "relay",
            attrs: { uuid: "RELAY_UUID_123" },
            content: [
                {
                    tag: "te2",
                    attrs: { relay_name: "relay_fast", c2r_rtt: "45", token_id: "1" },
                    content: new Uint8Array([192, 168, 1, 10, 0x1f, 0x90]) // 192.168.1.10:8080
                },
                {
                    tag: "te2",
                    attrs: { relay_name: "relay_slow", c2r_rtt: "120", token_id: "2" },
                    content: new Uint8Array([10, 0, 0, 1, 0x01, 0xbb]) // 10.0.0.1:443
                }
            ]
        };

        const parentNode = {
            tag: "call",
            content: [relayNode]
        };

        const { relays, uuid } = parseRelayEndpoints(parentNode);

        expect(uuid).toBe("RELAY_UUID_123");
        expect(relays.length).toBe(2);
        // Sorted by c2rRtt ascending: 45ms before 120ms
        expect(relays[0].relayName).toBe("relay_fast");
        expect(relays[0].ip).toBe("192.168.1.10");
        expect(relays[0].port).toBe(8080);
        expect(relays[0].c2rRtt).toBe(45);

        expect(relays[1].relayName).toBe("relay_slow");
        expect(relays[1].ip).toBe("10.0.0.1");
        expect(relays[1].port).toBe(443);
    });

    test("6. getMemoryStats includes active calls and resource metrics", () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock, maxConcurrentCalls: 3 });

        const stats = manager.getMemoryStats();

        expect(stats).toHaveProperty("activeCalls", 0);
        expect(stats).toHaveProperty("waitingCalls", 0);
        expect(stats).toHaveProperty("totalManagedCalls", 0);
        expect(stats).toHaveProperty("rss");
        expect(stats).toHaveProperty("heapUsed");

        manager.cleanup();
    });

    test("7. sendAcceptStanza encrypts raw callKey and includes device-identity when pkmsg", async () => {
        const sock = createMockSocket();
        const mockSignaling = {
            encryptCallKey: jest.fn(async (target, key, count) => ({
                encNode: {
                    tag: "enc",
                    attrs: { v: "2", type: "pkmsg", count: String(count) },
                    content: Buffer.from("encrypted_ciphertext")
                },
                shouldIncludeDeviceIdentity: true
            })),
            getDeviceIdentity: jest.fn(() => ({
                tag: "device-identity",
                attrs: {},
                content: Buffer.from("device_identity_bytes")
            }))
        };

        const manager = new CallManager({ sock, signaling: mockSignaling });
        const rawCallKey = Buffer.alloc(32, 0x42);

        await manager.sendAcceptStanza("CALL_ENC_1", "caller@s.whatsapp.net", "caller@s.whatsapp.net", false, rawCallKey);

        expect(mockSignaling.encryptCallKey).toHaveBeenCalledWith("caller@s.whatsapp.net", rawCallKey, 0);
        expect(mockSignaling.getDeviceIdentity).toHaveBeenCalled();
        expect(sock.sendNode).toHaveBeenCalled();

        const sentStanza = sock.sendNode.mock.calls[0][0];
        expect(sentStanza.tag).toBe("call");
        expect(sentStanza.attrs.to).toBe("caller@s.whatsapp.net");
        expect(sentStanza.attrs.from).toBeUndefined(); // Should NOT set 'from' on call stanzas!

        const acceptNode = sentStanza.content[0];
        expect(acceptNode.tag).toBe("accept");
        expect(acceptNode.attrs["call-id"]).toBe("CALL_ENC_1");

        const encNode = acceptNode.content.find(c => c.tag === "enc");
        expect(encNode).toBeDefined();
        expect(encNode.attrs.type).toBe("pkmsg");

        const devIdNode = acceptNode.content.find(c => c.tag === "device-identity");
        expect(devIdNode).toBeDefined();

        manager.cleanup();
    });

    test("8. sendTransportStanza & sendPreacceptStanza adhere to VoIP specification", async () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock });

        await manager.sendTransportStanza("TRANS_CALL_1", "caller@s.whatsapp.net", "caller@s.whatsapp.net");

        const transportStanza = sock.sendNode.mock.calls[0][0];
        expect(transportStanza.attrs.from).toBeUndefined();
        const transportNode = transportStanza.content[0];
        expect(transportNode.tag).toBe("transport");
        expect(transportNode.attrs["transport-message-type"]).toBe("1");
        expect(transportNode.attrs["p2p-cand-round"]).toBe("1");
        expect(transportNode.content[0].tag).toBe("net");
        expect(transportNode.content[0].attrs.medium).toBe("2");

        await manager.sendPreacceptStanza("PRE_CALL_1", "caller@s.whatsapp.net", "caller@s.whatsapp.net");

        const preacceptStanza = sock.sendNode.mock.calls[1][0];
        const preacceptNode = preacceptStanza.content[0];
        expect(preacceptNode.tag).toBe("preaccept");
        const capNode = preacceptNode.content.find(c => c.tag === "capability");
        expect(capNode).toBeDefined();
        expect(capNode.content).toBeInstanceOf(Uint8Array);

        manager.cleanup();
    });
});
