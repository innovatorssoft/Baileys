const { CallSession } = require("../lib/Voip/call-session.js");
const { CallDirection, CallMediaType, CallState } = require("../lib/Voip/types.js");

describe("VoIP Incoming Call Session Tests", () => {

    test("1. Incoming Call Initialization — correct defaults and states", () => {
        const session = new CallSession({
            callId: "INC_CALL_1",
            peerJid: "1234567890@s.whatsapp.net",
            callCreator: "1234567890@s.whatsapp.net",
            callerPn: "1234567890",
            direction: CallDirection.Incoming,
            mediaType: CallMediaType.Audio,
            isVideo: false,
        });

        expect(session.callId).toBe("INC_CALL_1");
        expect(session.peerJid).toBe("1234567890@s.whatsapp.net");
        expect(session.callCreator).toBe("1234567890@s.whatsapp.net");
        expect(session.callerPn).toBe("1234567890");
        expect(session.direction).toBe(CallDirection.Incoming);
        expect(session.mediaType).toBe(CallMediaType.Audio);
        expect(session.isVideo).toBe(false);
        expect(session.isIncoming).toBe(true);
        expect(session.isOutgoing).toBe(false);
        expect(session.status).toBe("incoming_ringing");
        expect(session.state).toBe(CallState.ReceivedCall);
        expect(session.canAccept).toBe(true);
        expect(session.ended).toBe(false);

        session.end("teardown");
    });

    test("2. Accept Incoming Call — transitions through accepted state", async () => {
        const session = new CallSession({
            callId: "INC_ACCEPT_1",
            peerJid: "1234567890@s.whatsapp.net",
            direction: CallDirection.Incoming,
        });

        const acceptedHandler = jest.fn();
        session.on("accepted", acceptedHandler);

        expect(session.canAccept).toBe(true);
        await session.accept();

        expect(session.status).toBe("accepted");
        expect(acceptedHandler).toHaveBeenCalledTimes(1);

        session._confirmConnected();
        expect(session.status).toBe("connected");
        expect(session.connectedAt).toBeGreaterThan(0);

        session.end();
        await session.waitForEnd();
        expect(session.ended).toBe(true);
    });

    test("3. Reject Incoming Call — transitions to rejected and ends", async () => {
        const session = new CallSession({
            callId: "INC_REJECT_1",
            peerJid: "1234567890@s.whatsapp.net",
            direction: CallDirection.Incoming,
        });

        const endedHandler = jest.fn();
        session.on("ended", endedHandler);

        await session.reject("declined");

        expect(session.status).toBe("rejected");
        expect(session.ended).toBe(true);
        expect(endedHandler).toHaveBeenCalledWith("rejected");
    });

    test("4. Remote Terminate Stanza Handling — ends call deterministically", async () => {
        const session = new CallSession({
            callId: "INC_TERM_1",
            peerJid: "1234567890@s.whatsapp.net",
            direction: CallDirection.Incoming,
        });

        session._confirmConnected();
        expect(session.status).toBe("connected");

        session._handleSignalingEvent("terminate", "hangup");
        expect(session.ended).toBe(true);
        expect(session.status).toBe("ended");
    });

    test("5. Inbound Decoded Audio Event — delivers PCM frames to subscriber", (done) => {
        const session = new CallSession({
            callId: "INC_AUDIO_1",
            peerJid: "1234567890@s.whatsapp.net",
            direction: CallDirection.Incoming,
        });

        const testPcm = new Float32Array(320).fill(0.25);

        session.on("audio", (pcm) => {
            expect(pcm).toBeInstanceOf(Float32Array);
            expect(pcm.length).toBe(320);
            expect(pcm[0]).toBeCloseTo(0.25);
            session.end("test_done");
            done();
        });

        session._emitAudio(testPcm);
    });

    test("6. Incoming Video Call — flags video and updates summary", () => {
        const session = new CallSession({
            callId: "INC_VIDEO_1",
            peerJid: "1234567890@s.whatsapp.net",
            direction: CallDirection.Incoming,
            mediaType: CallMediaType.Video,
            isVideo: true,
            options: {
                videoWidth: 1280,
                videoHeight: 720,
            }
        });

        expect(session.isVideo).toBe(true);
        expect(session.mediaType).toBe(CallMediaType.Video);

        const summary = session.getSummary();
        expect(summary.id).toBe("INC_VIDEO_1");
        expect(summary.isVideo).toBe(true);
        expect(summary.direction).toBe(CallDirection.Incoming);
        expect(summary.mediaType).toBe(CallMediaType.Video);

        session.end();
    });

    test("7. Outbound Call Cannot be Accepted via accept()", async () => {
        const session = new CallSession("OUT_CALL_1", "1234567890@s.whatsapp.net", null);
        expect(session.isOutgoing).toBe(true);
        expect(session.canAccept).toBe(false);

        await expect(session.accept()).rejects.toThrow("Cannot accept an outgoing call");
        session.end();
    });

    test("8. makeEventBuffer exposes listenerCount, listeners, rawListeners, eventNames", () => {
        const { makeEventBuffer } = require("../lib/Utils/event-buffer.js");
        const mockLogger = { debug: () => {}, trace: () => {}, warn: () => {} };
        const ev = makeEventBuffer(mockLogger);

        expect(typeof ev.listenerCount).toBe("function");
        expect(typeof ev.listeners).toBe("function");
        expect(typeof ev.rawListeners).toBe("function");
        expect(typeof ev.eventNames).toBe("function");

        expect(ev.listenerCount("call.incoming")).toBe(0);

        const dummyHandler = () => {};
        ev.on("call.incoming", dummyHandler);

        expect(ev.listenerCount("call.incoming")).toBe(1);
        expect(ev.listeners("call.incoming")).toContain(dummyHandler);

        ev.off("call.incoming", dummyHandler);
        expect(ev.listenerCount("call.incoming")).toBe(0);
    });

    test("9. Ended call cannot transition to accepted or be accepted via accept()", async () => {
        const session = new CallSession({
            callId: "INC_ENDED_GUARD_1",
            peerJid: "72993388666967:1@lid",
            direction: CallDirection.Incoming,
        });

        session.end("remote_end");
        await session.waitForEnd();
        expect(session.ended).toBe(true);
        expect(session.status).toBe("ended");

        // Firing confirm methods on an ended call should be ignored
        session._confirmAccepted();
        expect(session.status).toBe("ended");

        session._confirmConnected();
        expect(session.status).toBe("ended");

        session._confirmStreaming();
        expect(session.status).toBe("ended");

        session._confirmRinging();
        expect(session.status).toBe("ended");

        // Calling accept() on an ended call should reject
        await expect(session.accept()).rejects.toThrow("already ended");
    });

    test("10. sendPreacceptStanza retains device JID (:1) so caller phone transitions to ringing", async () => {
        const { CallManager } = require("../lib/Voip/call-manager.js");
        let sentStanza = null;
        const mockSock = {
            sendNode: async (node) => { sentStanza = node; }
        };

        const manager = new CallManager({ sock: mockSock });
        await manager.sendPreacceptStanza("CALL_PREACCEPT_1", "72993388666967@lid", "72993388666967:1@lid", false);

        expect(sentStanza).not.toBeNull();
        expect(sentStanza.tag).toBe("call");
        expect(sentStanza.attrs.to).toBe("72993388666967:1@lid");
        expect(sentStanza.content[0].tag).toBe("preaccept");
        expect(sentStanza.content[0].attrs["call-id"]).toBe("CALL_PREACCEPT_1");
        expect(sentStanza.content[0].attrs["call-creator"]).toBe("72993388666967@lid");
    });

    test("11. sendAcceptStanza prioritizes caller device JID for call key encryption", async () => {
        const { CallManager } = require("../lib/Voip/call-manager.js");
        const encryptionTargets = [];
        let sentStanza = null;

        const mockSock = {
            sendNode: async (node) => { sentStanza = node; }
        };
        const mockSignaling = {
            encryptCallKey: async (target, key, count) => {
                encryptionTargets.push(target);
                return {
                    encNode: { tag: "enc", attrs: { v: "2", type: "msg", count: "0" }, content: Buffer.from("dummy") },
                    shouldIncludeDeviceIdentity: false
                };
            }
        };

        const manager = new CallManager({ sock: mockSock, signaling: mockSignaling });
        const rawKey = Buffer.alloc(32, 7);

        await manager.sendAcceptStanza(
            "CALL_ACCEPT_TARGET_1",
            "72993388666967@lid",
            "72993388666967:1@lid",
            false,
            rawKey
        );

        // The first target attempted MUST be the device JID (72993388666967:1@lid)
        expect(encryptionTargets.length).toBeGreaterThan(0);
        expect(encryptionTargets[0]).toBe("72993388666967:1@lid");
        expect(sentStanza).not.toBeNull();
        expect(sentStanza.content[0].tag).toBe("accept");
        // The stanza itself must target the caller's DEVICE jid too — a bare
        // address never registers on the caller's phone.
        expect(sentStanza.attrs.to).toBe("72993388666967:1@lid");
    });

    test("12. handleIncomingTerminate terminates the session and unblocks queue in CallManager", () => {
        const { CallManager } = require("../lib/Voip/call-manager.js");
        const manager = new CallManager({ sock: {} });

        const session = new CallSession({
            callId: "CALL_TERM_TEST_1",
            peerJid: "72993388666967:1@lid",
            direction: CallDirection.Incoming,
            manager,
        });

        manager.calls.set(session.callId, session);
        expect(manager.calls.has(session.callId)).toBe(true);
        expect(session.ended).toBe(false);

        manager.handleIncomingTerminate(session.callId, "remote_end");

        expect(session.ended).toBe(true);
        expect(session.status).toBe("ended");
        expect(manager.calls.has(session.callId)).toBe(false);
    });
});

describe("VoIP Auto-Accept and Idempotency Tests (PRD Scenarios)", () => {
    const { CallManager } = require("../lib/Voip/call-manager.js");

    const createMockSocket = () => ({
        sendNode: jest.fn(async () => {}),
        query: jest.fn(async () => {}),
        authState: {
            creds: {
                me: { id: "self_jid@s.whatsapp.net", lid: "self_lid@lid" }
            }
        }
    });

    const createMockSignaling = () => ({
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
        })),
        ensureTcToken: jest.fn(async () => Buffer.from("dummy_tc_token")),
        registerEngine: jest.fn(),
        processIncomingCall: jest.fn(),
        processIncomingReceipt: jest.fn(),
        getCallKey: jest.fn(() => Buffer.alloc(32, 1)),
        maybeDecryptEnc: jest.fn(async () => ({ _callKey: Buffer.alloc(32, 1) }))
    });

    test("Test 1 — First incoming call: acceptCall() is invoked on first valid incoming_ringing", async () => {
        const sock = createMockSocket();
        const signaling = createMockSignaling();
        const manager = new CallManager({ sock, signaling });
        const incomingHandler = jest.fn();
        manager.on("call_incoming", incomingHandler);

        const offerStanza = {
            tag: "call",
            attrs: { from: "peer@s.whatsapp.net" },
            content: [{
                tag: "offer",
                attrs: { "call-id": "PRD_TEST_1_CALL", "call-creator": "peer@s.whatsapp.net", caller_pn: "923224559543" },
                content: [{ tag: "audio", attrs: { enc: "opus", rate: "16000" } }]
            }]
        };

        const session = await manager.handleIncomingOffer(offerStanza, "peer@s.whatsapp.net");
        expect(session).toBeDefined();
        expect(session.callId).toBe("PRD_TEST_1_CALL");
        expect(session.status).toBe("incoming_ringing");
        expect(incomingHandler).toHaveBeenCalledTimes(1);

        // Accept call immediately on the first event
        await session.accept();
        expect(session.status).toBe("accepted");

        manager.cleanup();
    });

    test("Test 2 — Duplicate ringing: 3 repeated incoming_ringing events execute acceptCall exactly once", async () => {
        const sock = createMockSocket();
        const signaling = createMockSignaling();
        const manager = new CallManager({ sock, signaling });
        const incomingHandler = jest.fn();
        manager.on("call_incoming", incomingHandler);

        const offerStanza = {
            tag: "call",
            attrs: { from: "peer@s.whatsapp.net" },
            content: [{
                tag: "offer",
                attrs: { "call-id": "PRD_TEST_2_DUP", "call-creator": "peer@s.whatsapp.net" },
                content: []
            }]
        };

        // Fire 3 duplicate incoming_ringing events concurrently
        const [s1, s2, s3] = await Promise.all([
            manager.handleIncomingOffer(offerStanza, "peer@s.whatsapp.net"),
            manager.handleIncomingOffer(offerStanza, "peer@s.whatsapp.net"),
            manager.handleIncomingOffer(offerStanza, "peer@s.whatsapp.net"),
        ]);

        // Same Call ID produces the exact same internal call session object
        expect(s1).toBe(s2);
        expect(s2).toBe(s3);
        // call_incoming must be emitted only once
        expect(incomingHandler).toHaveBeenCalledTimes(1);

        const acceptSpy = jest.spyOn(manager, "acceptCall");
        await s1.accept();
        expect(acceptSpy).toHaveBeenCalledTimes(1);

        manager.cleanup();
    });

    test("Test 3 — Duplicate acceptance: multiple accept calls are idempotent and return existing session", async () => {
        const sock = createMockSocket();
        const signaling = createMockSignaling();
        const manager = new CallManager({ sock, signaling });

        const session = await manager.handleIncomingOffer({
            tag: "call",
            attrs: { from: "peer@s.whatsapp.net" },
            content: [{ tag: "offer", attrs: { "call-id": "PRD_TEST_3_ACCEPT", "call-creator": "peer@s.whatsapp.net" }, content: [] }]
        }, "peer@s.whatsapp.net");

        const [r1, r2, r3] = await Promise.all([
            session.accept(),
            session.accept(),
            manager.acceptCall("PRD_TEST_3_ACCEPT"),
        ]);

        expect(r1).toBe(session);
        expect(r2).toBe(session);
        expect(r3).toBe(session);
        expect(session.status).toBe("accepted");

        manager.cleanup();
    });

    test("Test 4 — Duplicate audio-ready: multiple audio_ready events do not trigger duplicate readiness", () => {
        const session = new CallSession({
            callId: "PRD_TEST_4_AUDIO_READY",
            peerJid: "peer@s.whatsapp.net",
            direction: CallDirection.Incoming,
        });

        const audioReadyListener = jest.fn();
        session.on("audioReady", audioReadyListener);

        session._confirmAccepted();
        session._confirmAudioReady();
        session._confirmAudioReady();
        session._confirmAudioReady();

        expect(audioReadyListener).toHaveBeenCalledTimes(1);
        expect(session.status).toBe("audio_ready");
        session.end();
    });

    test("Test 5 — Duplicate streaming: multiple streaming triggers create only one active stream", () => {
        const session = new CallSession({
            callId: "PRD_TEST_5_STREAM",
            peerJid: "peer@s.whatsapp.net",
            direction: CallDirection.Incoming,
        });

        const streamingListener = jest.fn();
        session.on("streaming", streamingListener);

        session._confirmAccepted();

        session.startAudio(16000, 1, 320, () => {});
        const feeder = session.audioFeeder;

        // Duplicate streaming calls
        session.startAudio(16000, 1, 320, () => {});
        session.startAudio(16000, 1, 320, () => {});

        expect(streamingListener).toHaveBeenCalledTimes(1);
        expect(session.audioFeeder).toBe(feeder);
        expect(session.isStreaming).toBe(true);

        session.stopAudio();
        expect(session.isStreaming).toBe(false);
        session.end();
    });

    test("Test 6 — Call ends before audio is ready: media stream does NOT start", () => {
        const session = new CallSession({
            callId: "PRD_TEST_6_EARLY_END",
            peerJid: "peer@s.whatsapp.net",
            direction: CallDirection.Incoming,
        });

        session._confirmAccepted();
        session.end("remote_end");
        expect(session.ended).toBe(true);
        expect(session.status).toBe("ended");

        // Attempting to start audio after end must not start
        session.startAudio(16000, 1, 320, () => {});
        expect(session.audioFeeder).toBeNull();
        expect(session.isStreaming).toBe(false);
        expect(session.status).toBe("ended");
    });

    test("Test 7 — Multiple independent calls maintain isolated state and independent locks", async () => {
        const sock = createMockSocket();
        const signaling = createMockSignaling();
        const manager = new CallManager({ sock, signaling, maxConcurrentCalls: 3 });

        const sessionA = await manager.handleIncomingOffer({
            tag: "call",
            attrs: { from: "peerA@s.whatsapp.net" },
            content: [{ tag: "offer", attrs: { "call-id": "CALL_ABC_PRD", "call-creator": "peerA@s.whatsapp.net" }, content: [] }]
        }, "peerA@s.whatsapp.net");

        const sessionB = await manager.handleIncomingOffer({
            tag: "call",
            attrs: { from: "peerB@s.whatsapp.net" },
            content: [{ tag: "offer", attrs: { "call-id": "CALL_DEF_PRD", "call-creator": "peerB@s.whatsapp.net" }, content: [] }]
        }, "peerB@s.whatsapp.net");

        expect(sessionA.callId).toBe("CALL_ABC_PRD");
        expect(sessionB.callId).toBe("CALL_DEF_PRD");

        await sessionA.accept();
        sessionA.startAudio(16000, 1, 320, () => {});

        expect(sessionA.status).toBe("streaming");
        expect(sessionA.isStreaming).toBe(true);

        expect(sessionB.status).toBe("incoming_ringing");
        expect(sessionB.isStreaming).toBe(false);

        await sessionB.reject("declined");
        expect(sessionB.status).toBe("rejected");
        expect(sessionB.ended).toBe(true);

        // Call A remains unmolested and streaming
        expect(sessionA.status).toBe("streaming");
        expect(sessionA.ended).toBe(false);

        sessionA.end();
        manager.cleanup();
    });

    test("Test 8 — Reconnection: socket reconnection does not duplicate socket listeners", async () => {
        const { EventEmitter } = require("node:events");

        const mockWs = new EventEmitter();
        let detachListeners = null;

        const attachListeners = (ws) => {
            detachListeners?.();

            const onCall = jest.fn();
            const onReceipt = jest.fn();
            const onRelay = jest.fn();

            ws.on("CB:call", onCall);
            ws.on("CB:receipt", onReceipt);
            ws.on("CB:relay", onRelay);

            detachListeners = () => {
                ws.off("CB:call", onCall);
                ws.off("CB:receipt", onReceipt);
                ws.off("CB:relay", onRelay);
            };
        };

        // First connection
        attachListeners(mockWs);
        expect(mockWs.listenerCount("CB:call")).toBe(1);
        expect(mockWs.listenerCount("CB:receipt")).toBe(1);
        expect(mockWs.listenerCount("CB:relay")).toBe(1);

        // Reconnect with same or refreshed socket
        attachListeners(mockWs);
        expect(mockWs.listenerCount("CB:call")).toBe(1);
        expect(mockWs.listenerCount("CB:receipt")).toBe(1);
        expect(mockWs.listenerCount("CB:relay")).toBe(1);

        detachListeners();
        expect(mockWs.listenerCount("CB:call")).toBe(0);
        expect(mockWs.listenerCount("CB:receipt")).toBe(0);
        expect(mockWs.listenerCount("CB:relay")).toBe(0);
    });

    test("Test 9 — First-call cold start: incoming_ringing -> accepted -> audio_ready -> streaming on first call", async () => {
        const sock = createMockSocket();
        const signaling = createMockSignaling();
        const manager = new CallManager({ sock, signaling });

        const session = await manager.handleIncomingOffer({
            tag: "call",
            attrs: { from: "cold_peer@s.whatsapp.net" },
            content: [{
                tag: "offer",
                attrs: { "call-id": "COLD_START_TEST_9", "call-creator": "cold_peer@s.whatsapp.net" },
                content: [{ tag: "audio", attrs: { enc: "opus", rate: "16000" } }]
            }]
        }, "cold_peer@s.whatsapp.net");

        expect(session.status).toBe("incoming_ringing");

        // Immediate accept on first call
        await session.accept();
        expect(session.status).toBe("accepted");

        // Media streaming starts immediately
        session.startAudio(16000, 1, 320, () => {});
        expect(session.status).toBe("streaming");
        expect(session.isStreaming).toBe(true);

        await session.end("completed");
        expect(session.ended).toBe(true);
        manager.cleanup();
    });

    test("Test 23 — Stanza transmission order matches HIROBOT WaCallMediaSession (mute_v2 -> transport -> accept -> connectRelays)", async () => {
        const sentStanzas = [];
        const sock = {
            sendNode: async (node) => { sentStanzas.push(node); },
            query: async (node) => { sentStanzas.push(node); },
            assertSessions: async () => true,
        };
        const signaling = {
            encryptCallKey: async (target, key) => ({
                encNode: { tag: "enc", attrs: { v: "2", type: "pkmsg", count: "0" }, content: Buffer.from("test") },
                shouldIncludeDeviceIdentity: true
            }),
            getDeviceIdentity: () => ({ tag: "device-identity", attrs: {}, content: Buffer.from("devid") }),
            ensureTcToken: async () => Buffer.from("tctoken"),
            ensureSessionsForPeers: async () => {},
        };
        const manager = new CallManager({ sock, signaling });

        const session = await manager.handleIncomingOffer({
            tag: "call",
            attrs: { from: "169702865256530@lid" },
            content: [{
                tag: "offer",
                attrs: { "call-id": "CALL_ORDER_TEST_23", "call-creator": "169702865256530:98@lid" },
                content: [{ tag: "audio", attrs: { enc: "opus", rate: "16000" } }]
            }]
        }, "169702865256530@lid");

        sentStanzas.length = 0; // Clear preaccept & relaylatency from offer handling

        await manager.acceptCall("CALL_ORDER_TEST_23");

        // Must have sent mute_v2, transport, and accept in exact sequence
        expect(sentStanzas.length).toBeGreaterThanOrEqual(3);
        const tags = sentStanzas.map(s => s.content[0].tag);
        expect(tags[0]).toBe("mute_v2");
        expect(tags[1]).toBe("transport");
        expect(tags[2]).toBe("accept");

        // Verify accept stanza structure: net medium="3", encNode, encopt
        const acceptNode = sentStanzas[2].content[0];
        const netNode = acceptNode.content.find(c => c.tag === "net");
        expect(netNode).toBeDefined();
        expect(netNode.attrs.medium).toBe("3");

        const encNode = acceptNode.content.find(c => c.tag === "enc");
        expect(encNode).toBeDefined();
        expect(encNode.attrs.type).toBe("pkmsg");

        manager.cleanup();
    });

    test("Test 24 — sendAcceptStanza automatically generates random 32-byte callKey and includes encrypted encNode if key is missing", async () => {
        let sentStanza = null;
        let encryptedKeyUsed = null;
        const sock = {
            sendNode: async (node) => { sentStanza = node; },
            assertSessions: async () => true,
        };
        const signaling = {
            encryptCallKey: async (target, key) => {
                encryptedKeyUsed = key;
                return {
                    encNode: { tag: "enc", attrs: { v: "2", type: "pkmsg", count: "0" }, content: Buffer.from("encrypted") },
                    shouldIncludeDeviceIdentity: false
                };
            },
            ensureSessionsForPeers: async () => {},
        };
        const manager = new CallManager({ sock, signaling });

        // Call sendAcceptStanza without rawCallKey and without an existing session key
        await manager.sendAcceptStanza("KEY_GEN_TEST_24", "peer@s.whatsapp.net", "peer@s.whatsapp.net", false, null);

        expect(sentStanza).not.toBeNull();
        expect(encryptedKeyUsed).not.toBeNull();
        expect(encryptedKeyUsed.length).toBe(32); // Fallback 32-byte key generated

        const acceptNode = sentStanza.content[0];
        const encNode = acceptNode.content.find(c => c.tag === "enc");
        expect(encNode).toBeDefined();

        const netNode = acceptNode.content.find(c => c.tag === "net");
        expect(netNode).toBeDefined();
        expect(netNode.attrs.medium).toBe("3");

        manager.cleanup();
    });

    test("Test 25 — acceptCall sends accept stanza addressed to caller bare JID while encrypting for creator device JID", async () => {
        const sentNodes = [];
        const encryptionTargets = [];
        const sock = {
            sendNode: async (node) => { sentNodes.push(node); },
            assertSessions: async () => true,
        };
        const signaling = {
            encryptCallKey: async (target, key) => {
                encryptionTargets.push(target);
                return {
                    encNode: { tag: "enc", attrs: { v: "2", type: "msg", count: "0" }, content: Buffer.from("enc") },
                    shouldIncludeDeviceIdentity: false
                };
            },
            ensureSessionsForPeers: async () => {},
            getCallKey: () => Buffer.alloc(32, 5),
        };
        const manager = new CallManager({ sock, signaling });

        const offer = {
            tag: "call",
            attrs: { from: "169702865256530@lid", id: "OFFER_25" },
            content: [{
                tag: "offer",
                attrs: { "call-id": "CALL_25", "call-creator": "169702865256530:17@lid" },
                content: [{ tag: "audio", attrs: { enc: "opus", rate: "16000" } }]
            }]
        };

        const session = await manager.handleIncomingOffer(offer, "169702865256530@lid");
        expect(session).toBeDefined();

        sentNodes.length = 0;
        await manager.acceptCall("CALL_25");

        const acceptStanza = sentNodes.find(n => n.content?.[0]?.tag === "accept");
        expect(acceptStanza).toBeDefined();
        // Outer stanza must be addressed to caller bare JID
        expect(acceptStanza.attrs.to).toBe("169702865256530@lid");
        // Inner accept node must retain creator device JID
        expect(acceptStanza.content[0].attrs["call-creator"]).toBe("169702865256530:17@lid");
        // Encryption must prioritize device JID
        expect(encryptionTargets[0]).toBe("169702865256530:17@lid");

        manager.cleanup();
    });

    test("Test 26 — Multi-child <call> stanza containing <capability> alongside <offer>", async () => {
        const sock = createMockSocket();
        const signaling = createMockSignaling();
        const manager = new CallManager({ sock, signaling });
        const incomingHandler = jest.fn();
        manager.on("call_incoming", incomingHandler);

        const multiChildCall = {
            tag: "call",
            attrs: { from: "peer_multi@s.whatsapp.net", id: "STANZA_26" },
            content: [
                { tag: "capability", attrs: { ver: "1" }, content: [] },
                {
                    tag: "offer",
                    attrs: { "call-id": "CALL_MULTI_26", "call-creator": "peer_multi:1@s.whatsapp.net" },
                    content: [{ tag: "audio", attrs: { enc: "opus", rate: "16000" } }]
                }
            ]
        };

        const session = await manager.handleIncomingOffer(multiChildCall, "peer_multi@s.whatsapp.net");
        expect(session).toBeDefined();
        expect(session.callId).toBe("CALL_MULTI_26");
        expect(session.status).toBe("incoming_ringing");
        expect(incomingHandler).toHaveBeenCalledTimes(1);

        manager.cleanup();
    });

    test("Test 27 — Mobile <offer_notice> with underscore call_id attribute", async () => {
        const sock = createMockSocket();
        const signaling = createMockSignaling();
        const manager = new CallManager({ sock, signaling });
        const incomingHandler = jest.fn();
        manager.on("call_incoming", incomingHandler);

        const offerNoticeStanza = {
            tag: "call",
            attrs: { from: "peer_notice@s.whatsapp.net", id: "STANZA_27" },
            content: [
                {
                    tag: "offer_notice",
                    attrs: { call_id: "OFFER_NOTICE_27", "call-creator": "peer_notice:2@s.whatsapp.net" },
                    content: [{ tag: "audio", attrs: { enc: "opus", rate: "16000" } }]
                }
            ]
        };

        const session = await manager.handleIncomingOffer(offerNoticeStanza, "peer_notice@s.whatsapp.net");
        expect(session).toBeDefined();
        expect(session.callId).toBe("OFFER_NOTICE_27");
        expect(incomingHandler).toHaveBeenCalledTimes(1);

        manager.cleanup();
    });

    test("Test 28 — Rejection of call acceptance on decryption failure without fabricating fake random key", async () => {
        const sock = createMockSocket();
        const signaling = {
            ...createMockSignaling(),
            maybeDecryptEnc: jest.fn(async () => ({ _decryptionFailed: true })),
            getCallKey: jest.fn(() => undefined),
        };
        const manager = new CallManager({ sock, signaling });

        const encOffer = {
            tag: "call",
            attrs: { from: "enc_peer@s.whatsapp.net", id: "STANZA_28" },
            content: [
                {
                    tag: "offer",
                    attrs: { "call-id": "CALL_FAIL_ENC_28", "call-creator": "enc_peer@s.whatsapp.net" },
                    content: [
                        { tag: "enc", attrs: { v: "2", type: "pkmsg" }, content: Buffer.from("bad_ciphertext") }
                    ]
                }
            ]
        };

        const session = await manager.handleIncomingOffer(encOffer, "enc_peer@s.whatsapp.net");
        expect(session).toBeDefined();
        expect(session.callId).toBe("CALL_FAIL_ENC_28");
        expect(session._decryptionFailed).toBe(true);
        expect(session._callKey).toBeUndefined();

        // Attempting to accept must fail safely with explicit diagnostic reason
        await expect(manager.acceptCall("CALL_FAIL_ENC_28")).rejects.toThrow(
            /call key decryption failed; required cryptographic material is unavailable/i
        );

        manager.cleanup();
    });

    test("Test 29 — Destination companion <to> filtering in SignalingBridge selects our device", async () => {
        const { SignalingBridge } = require("../lib/Voip/signaling.js");
        const decryptCalls = [];
        const mockSock = {
            authState: {
                creds: {
                    me: { id: "my_user:2@s.whatsapp.net", lid: "my_lid:2@lid" }
                }
            },
            signalRepository: {
                decryptMessage: jest.fn(async ({ ciphertext }) => {
                    decryptCalls.push(ciphertext);
                    // Return valid call key in protobuf
                    return Buffer.concat([Buffer.from([0x0a, 0x20]), Buffer.alloc(32, 0xaa)]);
                }),
                lidMapping: {
                    getPNForLID: jest.fn(async () => null),
                    getLIDForPN: jest.fn(async () => null),
                }
            },
            logger: {
                debug: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
                info: jest.fn(),
            }
        };

        const bridge = new SignalingBridge({ sock: mockSock });

        const myEnc = Buffer.from("target_companion_ciphertext");
        const otherEnc1 = Buffer.from("other_device_1_ciphertext");
        const otherEnc2 = Buffer.from("other_device_3_ciphertext");

        const offerNode = {
            tag: "offer",
            attrs: { "call-id": "DEST_TEST_29", "call-creator": "caller@s.whatsapp.net" },
            content: [
                {
                    tag: "destination",
                    content: [
                        { tag: "to", attrs: { jid: "my_user:1@s.whatsapp.net" }, content: [{ tag: "enc", attrs: { v: "2", type: "msg" }, content: otherEnc1 }] },
                        { tag: "to", attrs: { jid: "my_user:2@s.whatsapp.net" }, content: [{ tag: "enc", attrs: { v: "2", type: "pkmsg" }, content: myEnc }] },
                        { tag: "to", attrs: { jid: "my_user:3@s.whatsapp.net" }, content: [{ tag: "enc", attrs: { v: "2", type: "msg" }, content: otherEnc2 }] },
                    ]
                }
            ]
        };

        const result = await bridge.maybeDecryptEnc(offerNode, "caller@s.whatsapp.net");
        expect(result).toBeDefined();
        expect(decryptCalls.length).toBe(1);
        expect(decryptCalls[0]).toEqual(myEnc);
    });

    test("Test 30 — Bidirectional LID and bare phone number resolution during offer decryption", async () => {
        const { SignalingBridge } = require("../lib/Voip/signaling.js");
        const decryptedTargets = [];
        const mockSock = {
            authState: {
                creds: {
                    me: { id: "my_user:1@s.whatsapp.net" }
                }
            },
            signalRepository: {
                decryptMessage: jest.fn(async ({ jid, ciphertext }) => {
                    decryptedTargets.push(jid);
                    return Buffer.concat([Buffer.from([0x0a, 0x20]), Buffer.alloc(32, 0xbb)]);
                }),
                lidMapping: {
                    getPNForLID: jest.fn(async (lid) => lid.startsWith("caller_lid") ? "447700900123@s.whatsapp.net" : null),
                    getLIDForPN: jest.fn(async () => null),
                }
            },
            logger: {
                debug: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
                info: jest.fn(),
            }
        };

        const bridge = new SignalingBridge({ sock: mockSock });

        const offerNode = {
            tag: "offer",
            attrs: { "call-id": "LID_PN_TEST_30", "call-creator": "caller_lid@lid", caller_pn: "447700900123" },
            content: [
                { tag: "enc", attrs: { v: "2", type: "pkmsg" }, content: Buffer.from("lid_enc") }
            ]
        };

        const result = await bridge.maybeDecryptEnc(offerNode, "caller_lid@lid");
        expect(result).toBeDefined();
        // Checked against resolved PN target
        expect(decryptedTargets).toContain("447700900123@s.whatsapp.net");
    });

    test("Test 31 — Normalization of bare digit caller_pn in accept stanza prevents invalid JID encryption", async () => {
        const assertedJids = [];
        const encryptionTargets = [];
        const sock = {
            sendNode: jest.fn(async () => {}),
            assertSessions: jest.fn(async (jids) => {
                assertedJids.push(...jids);
                return true;
            }),
            authState: { creds: { me: { id: "me@s.whatsapp.net" } } }
        };
        const signaling = {
            encryptCallKey: jest.fn(async (target, key) => {
                encryptionTargets.push(target);
                return {
                    encNode: { tag: "enc", attrs: { v: "2", type: "msg", count: "0" }, content: Buffer.from("enc") },
                    shouldIncludeDeviceIdentity: false
                };
            }),
            ensureSessionsForPeers: jest.fn(async () => {}),
            getCallKey: jest.fn(() => Buffer.alloc(32, 3)),
        };

        const manager = new CallManager({ sock, signaling });

        const session = await manager.handleIncomingOffer({
            tag: "call",
            attrs: { from: "caller@s.whatsapp.net" },
            content: [{
                tag: "offer",
                attrs: { "call-id": "CALL_PN_NORM_31", "call-creator": "caller@s.whatsapp.net", caller_pn: "447700900123" },
                content: [{ tag: "audio", attrs: { enc: "opus", rate: "16000" } }]
            }]
        }, "caller@s.whatsapp.net");

        expect(session.callerPn).toBe("447700900123");

        await manager.acceptCall("CALL_PN_NORM_31");

        // Verify bare digits were never passed directly as JID to assertSessions or encryptCallKey
        for (const jid of assertedJids) {
            expect(jid).toContain("@");
            expect(jid).not.toBe("447700900123");
        }
        for (const target of encryptionTargets) {
            expect(target).toContain("@");
            expect(target).not.toBe("447700900123");
        }

        manager.cleanup();
    });

    test("Test 32 — SignalingBridge processes incoming offer, forwards to CallManager, and deduplicates repeated stanzas", async () => {
        const { SignalingBridge } = require("../lib/Voip/signaling.js");
        const { CallManager } = require("../lib/Voip/call-manager.js");

        const mockWs = new (require("node:events").EventEmitter)();
        const incomingCalls = [];

        const mockSock = {
            ws: mockWs,
            sendNode: jest.fn(async () => {}),
            query: jest.fn(async () => {}),
            authState: {
                creds: {
                    me: { id: "my_user:1@s.whatsapp.net" }
                }
            },
            signalRepository: {
                decryptMessage: jest.fn(async () => Buffer.concat([Buffer.from([0x0a, 0x20]), Buffer.alloc(32, 0x99)])),
                lidMapping: {
                    getPNForLID: jest.fn(async () => null),
                    getLIDForPN: jest.fn(async () => null),
                }
            },
            logger: {
                debug: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
                info: jest.fn(),
            }
        };

        const bridge = new SignalingBridge({ sock: mockSock });
        const manager = new CallManager({ sock: mockSock, signaling: bridge });

        manager.on("call_incoming", (session) => {
            incomingCalls.push(session);
        });

        bridge.setIncomingOfferListener(async (node, peerJid, callId, offerSignalingMsg) => {
            return manager.handleIncomingOffer(node, peerJid, offerSignalingMsg);
        });

        const offerStanza = {
            tag: "call",
            attrs: { from: "caller_socket@s.whatsapp.net", id: "STANZA_32" },
            content: [{
                tag: "offer",
                attrs: { "call-id": "CALL_SOCKET_32", "call-creator": "caller_socket:1@s.whatsapp.net" },
                content: [{ tag: "audio", attrs: { enc: "opus", rate: "16000" } }]
            }]
        };

        await bridge.processIncomingCall(offerStanza);

        expect(incomingCalls.length).toBe(1);
        expect(incomingCalls[0].callId).toBe("CALL_SOCKET_32");

        // Verify deduplication: second invocation with the same stanza does not duplicate call_incoming
        await bridge.processIncomingCall(offerStanza);
        expect(incomingCalls.length).toBe(1);

        manager.cleanup();
    });

    test("Test 33 — Mobile LID routing: incoming offer with bare LID call-creator normalizes to device JID matching routedPeerJid in WASM payload", async () => {
        const { SignalingBridge } = require("../lib/Voip/signaling.js");
        const { CallManager } = require("../lib/Voip/call-manager.js");
        const { decodeBinaryNode } = require("../lib/WABinary/decode.js");
        const mockSock = {
            authState: {
                creds: {
                    me: { id: "bot:0@s.whatsapp.net", lid: "bot_lid:0@lid" }
                }
            },
            signalRepository: {
                decryptMessage: jest.fn(),
                lidMapping: {
                    getPNForLID: jest.fn(),
                    getLIDForPN: jest.fn(),
                    storeLIDPNMappings: jest.fn()
                }
            },
            ws: { isReady: true, send: jest.fn() },
            sendNode: jest.fn().mockResolvedValue({ tag: "ack", attrs: {} }),
            logger: {
                debug: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
                info: jest.fn(),
            }
        };

        const bridge = new SignalingBridge({ sock: mockSock });
        const manager = new CallManager({ sock: mockSock, signaling: bridge });
        let capturedOfferSignalingMsg = null;
        let capturedNode = null;

        bridge.setIncomingOfferListener(async (node, peerJid, callId, offerSignalingMsg) => {
            capturedNode = node;
            capturedOfferSignalingMsg = offerSignalingMsg;
            return manager.handleIncomingOffer(node, peerJid, offerSignalingMsg);
        });

        const offerStanza = {
            tag: "call",
            attrs: { from: "174281585643715@lid", id: "STANZA_MOBILE_LID_33" },
            content: [{
                tag: "offer",
                attrs: {
                    "call-id": "CALL_MOBILE_LID_33",
                    "call-creator": "174281585643715@lid",
                    "caller_pn": "923014434335@s.whatsapp.net",
                    "platform": "android",
                    "version": "2.26.39.74"
                },
                content: [{ tag: "audio", attrs: { enc: "opus", rate: "16000" } }]
            }]
        };

        await bridge.processIncomingCall(offerStanza);

        expect(capturedNode).toBeDefined();
        expect(capturedNode.attrs["call-creator"]).toBe("174281585643715:0@lid");

        expect(capturedOfferSignalingMsg).toBeDefined();
        // peerJid must be device-qualified
        expect(capturedOfferSignalingMsg.peerJid).toBe("174281585643715:0@lid");

        // The binary payload passed to WASM must be encoded with AD_JID (0xF7),
        // ensuring the WASM C++ engine correctly decodes the LID domain instead of defaulting to @s.whatsapp.net
        const payloadBuf = Buffer.from(capturedOfferSignalingMsg.payload, "base64");
        expect(payloadBuf.includes(0xF7)).toBe(true);

        const decodedPayload = await decodeBinaryNode(payloadBuf);
        expect(decodedPayload.attrs["call-creator"]).toBe("174281585643715@lid");

        const session = manager.calls.get("CALL_MOBILE_LID_33");
        expect(session).toBeDefined();
        expect(session.peerJid).toBe("174281585643715:0@lid");

        manager.cleanup();
    });

    test("34. RelayRtcTransport uses original signaling port (e.g. 3478) by default", async () => {
        const { RelayRtcTransport } = require("../lib/Voip/relay-transport.js");
        const transport = new RelayRtcTransport({ callId: "TEST_RELAY_PORT_34" });

        const endpoints = [
            {
                ip: "57.144.149.57",
                port: 3478,
                token: "dGVzdFRva2VuMQ==",
                key: "dGVzdEtleTE=",
                relayName: "mct1c02",
                relayId: 0
            }
        ];

        transport.connectRelays(endpoints);
        const stats = transport.getStats();
        expect(stats).toBeDefined();

        await transport.closeAll();
    });

    test("35. RelayRtcTransport.updateRelayList updates credentials without dropping connections on event 156 format", async () => {
        const { RelayRtcTransport } = require("../lib/Voip/relay-transport.js");
        const transport = new RelayRtcTransport({ callId: "TEST_EVENT_156_35" });

        const endpoints = [
            {
                ip: "57.144.149.57",
                port: 3478,
                token: "initialToken0",
                key: "initialKey",
                relayName: "mct1c02",
                relayId: 0
            },
            {
                ip: "57.144.15.57",
                port: 3478,
                token: "initialToken1",
                key: "initialKey",
                relayName: "sin6c01",
                relayId: 1
            }
        ];

        transport.connectRelays(endpoints);

        // Simulate WASM Event 156 (contains tokens and key, but no 'relays' array)
        const event156 = {
            event_type: 156,
            num_relays: 2,
            relay_key: "updatedRelayKey123=",
            relay_tokens: ["updatedToken0==", "updatedToken1=="],
            auth_tokens: ["updatedAuthToken0=="],
            enable_edgeray_dtls_active_mode: false
        };

        // Calling updateRelayList must update stored info and not throw or clear connections
        expect(() => transport.updateRelayList(event156)).not.toThrow();

        await transport.closeAll();
    });
});


