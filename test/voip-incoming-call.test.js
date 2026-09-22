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
});
