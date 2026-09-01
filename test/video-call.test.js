const { ActiveCall } = require("../lib/Voip");

describe("Video Call Lifecycle & Concurrency Unit Tests", () => {
    jest.setTimeout(15000);

    const createMockEngine = () => ({
        malloc: jest.fn(() => 1000),
        free: jest.fn(),
        sendAudioData: jest.fn(),
        sendVideoFrame: jest.fn(),
        endCall: jest.fn(),
        setMute: jest.fn(),
    });

    test("Test 1 — ActiveCall throws if isVideo is true but videoSource is missing", () => {
        const engine = createMockEngine();
        expect(() => {
            new ActiveCall("CALL_VID_ERR", "123@s.whatsapp.net", engine, {
                isVideo: true,
            });
        }).toThrow("videoSource is required for a video call");
    });

    test("Test 2 — ActiveCall instantiates cleanly for video call with valid videoSource", () => {
        const engine = createMockEngine();
        const call = new ActiveCall("CALL_VID_OK", "123@s.whatsapp.net", engine, {
            isVideo: true,
            videoSource: "lavfi:testsrc=size=320x240:rate=15",
            audioSource: "silence",
            durationMs: 5000,
        });

        expect(call.isVideo).toBe(true);
        expect(call.getSummary().isVideo).toBe(true);
        expect(call.getSummary().videoSource).toBe("lavfi:testsrc=size=320x240:rate=15");
        call.end();
    });

    test("Test 3 — ActiveCall streams video frames to engine and emits video events", (done) => {
        const engine = createMockEngine();
        const call = new ActiveCall("CALL_VID_STREAM", "123@s.whatsapp.net", engine, {
            isVideo: true,
            videoSource: "lavfi:testsrc=size=320x240:rate=15",
            videoFps: 15,
            width: 320,
            height: 240,
            durationMs: 5000,
        });

        let videoStartedFired = false;
        call.on("videoStarted", () => {
            videoStartedFired = true;
        });

        call.startVideo((frameBuf, w, h, fps) => {
            expect(videoStartedFired).toBe(true);
            expect(Buffer.isBuffer(frameBuf)).toBe(true);
            expect(w).toBe(320);
            expect(h).toBe(240);

            call.stopVideo();
            expect(call.videoFeeder).toBeNull();
            call.end("completed");
            done();
        });
    });

    test("Test 4 — Concurrent video calls have isolated VideoFeeders and state", () => {
        const engine1 = createMockEngine();
        const engine2 = createMockEngine();

        const call1 = new ActiveCall("CALL_VID_1", "111@s.whatsapp.net", engine1, {
            isVideo: true,
            videoSource: "lavfi:testsrc=size=320x240:rate=15",
            audioSource: "silence",
            width: 320,
            height: 240,
        });

        const call2 = new ActiveCall("CALL_VID_2", "222@s.whatsapp.net", engine2, {
            isVideo: true,
            videoSource: "lavfi:testsrc=size=640x480:rate=15",
            audioSource: "silence",
            width: 640,
            height: 480,
        });

        expect(call1.callId).toBe("CALL_VID_1");
        expect(call2.callId).toBe("CALL_VID_2");
        expect(call1._videoWidth).toBe(320);
        expect(call2._videoWidth).toBe(640);

        call1.startVideo((buf) => engine1.sendVideoFrame(buf, 320, 240));
        call2.startVideo((buf) => engine2.sendVideoFrame(buf, 640, 480));

        expect(call1.videoFeeder).not.toBe(call2.videoFeeder);

        call1.end("completed");
        call2.end("completed");

        expect(call1.ended).toBe(true);
        expect(call2.ended).toBe(true);
    });
});
