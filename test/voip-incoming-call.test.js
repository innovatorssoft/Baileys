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
});


