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

