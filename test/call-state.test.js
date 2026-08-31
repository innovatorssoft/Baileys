const { ActiveCall, CallState } = require("../lib/Voip/index.js");

describe("ActiveCall Lifecycle & State Synchronization Tests", () => {
    jest.setTimeout(10000);

    const createMockEngine = () => ({
        endCall: jest.fn(),
        setMute: jest.fn(),
        malloc: jest.fn(() => 1024),
        free: jest.fn(),
        sendAudioData: jest.fn(),
        startCall: jest.fn(),
    });

    test("Deterministic state flow: ringing -> accepted -> connected -> ended", (done) => {
        const engine = createMockEngine();
        const call = new ActiveCall("CALL123", "1234567890@s.whatsapp.net", engine, {
            durationMs: 5000,
            preRingingTimeoutMs: 5000,
        });

        const stateHistory = [];
        call.on("stateChange", (st) => stateHistory.push(st));

        let ringingEmitted = false;
        let acceptedEmitted = false;
        let connectedEmitted = false;

        call.on("ringing", () => { ringingEmitted = true; });
        call.on("accepted", () => { acceptedEmitted = true; });
        call.on("connected", () => { connectedEmitted = true; });
        call.on("ended", (reason) => {
            expect(reason).toBe("completed");
            expect(ringingEmitted).toBe(true);
            expect(acceptedEmitted).toBe(true);
            expect(connectedEmitted).toBe(true);
            expect(call.ended).toBe(true);
            expect(call.status).toBe("ended");
            done();
        });

        // 1. Remote ringing confirmed
        call._updateState(CallState.PreacceptReceived);
        expect(call.status).toBe("ringing");

        // 2. Remote answer confirmed
        call._updateState(CallState.AcceptReceived);
        expect(call.status).toBe("accepted");

        // 3. Media connection confirmed
        call._updateState(CallState.Active);
        expect(call.status).toBe("connected");

        // 4. End call
        call.end();
    });

    test("Unreachable recipient fails without emitting ringing or connected", (done) => {
        const engine = createMockEngine();
        const call = new ActiveCall("CALL456", "9999999999@s.whatsapp.net", engine, {
            durationMs: 5000,
            preRingingTimeoutMs: 5000,
        });

        let ringingEmitted = false;
        let connectedEmitted = false;
        let audioReadyEmitted = false;
        let streamingEmitted = false;

        call.on("ringing", () => { ringingEmitted = true; });
        call.on("connected", () => { connectedEmitted = true; });
        call.on("audioReady", () => { audioReadyEmitted = true; });
        call.on("streaming", () => { streamingEmitted = true; });

        call.on("ended", (reason) => {
            expect(reason).toBe("unreachable");
            expect(call.status).toBe("unreachable");
            expect(ringingEmitted).toBe(false);
            expect(connectedEmitted).toBe(false);
            expect(audioReadyEmitted).toBe(false);
            expect(streamingEmitted).toBe(false);
            done();
        });

        // WhatsApp server returns 480 or 404 (unavailable)
        call._handleSignalingError("offer", "unreachable");
    });

    test("Pre-ringing timeout triggers if remote never rings", (done) => {
        const engine = createMockEngine();
        const call = new ActiveCall("CALL789", "8888888888@s.whatsapp.net", engine, {
            durationMs: 5000,
            preRingingTimeoutMs: 100, // Short timeout for test
        });

        let ringingEmitted = false;
        let connectedEmitted = false;

        call.on("ringing", () => { ringingEmitted = true; });
        call.on("connected", () => { connectedEmitted = true; });

        call.on("ended", (reason) => {
            expect(reason).toBe("unreachable");
            expect(call.status).toBe("unreachable");
            expect(ringingEmitted).toBe(false);
            expect(connectedEmitted).toBe(false);
            done();
        });
    });

    test("Call rejection transitions to rejected without connected or streaming", (done) => {
        const engine = createMockEngine();
        const call = new ActiveCall("CALL_REJ", "7777777777@s.whatsapp.net", engine, {
            durationMs: 5000,
            preRingingTimeoutMs: 5000,
        });

        let connectedEmitted = false;
        let streamingEmitted = false;

        call.on("connected", () => { connectedEmitted = true; });
        call.on("streaming", () => { streamingEmitted = true; });

        call.on("ended", (reason) => {
            expect(reason).toBe("rejected");
            expect(call.status).toBe("rejected");
            expect(connectedEmitted).toBe(false);
            expect(streamingEmitted).toBe(false);
            done();
        });

        // Remote device rings then rejects
        call._confirmRinging();
        call._handleSignalingEvent("reject", "rejected");
    });

    test("Consecutive calls do not leak timers or state", async () => {
        const engine = createMockEngine();

        // First call
        const call1 = new ActiveCall("CALL_1", "111@s.whatsapp.net", engine, { durationMs: 50 });
        call1._confirmRinging();
        call1._confirmConnected();
        call1.end();
        await call1.waitForEnd();
        expect(call1.ended).toBe(true);

        // Second call starts fresh
        const call2 = new ActiveCall("CALL_2", "222@s.whatsapp.net", engine, { durationMs: 50 });
        expect(call2.ended).toBe(false);
        expect(call2.status).toBe("initiating");
        expect(call2.callId).toBe("CALL_2");
        call2.end();
        await call2.waitForEnd();
        expect(call2.ended).toBe(true);
    });
});
