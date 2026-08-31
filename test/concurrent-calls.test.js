const { ActiveCall, VoipClient, CallState } = require("../lib/Voip/index.js");

describe("Concurrent Outgoing VoIP Calls Tests", () => {
    jest.setTimeout(15000);

    const createMockEngine = () => ({
        endCall: jest.fn(),
        setMute: jest.fn(),
        malloc: jest.fn(() => 1024),
        free: jest.fn(),
        sendAudioData: jest.fn(),
        startCall: jest.fn(),
        startVoipCall: jest.fn(),
    });

    test("1. Single Call Baseline — behaves consistently with isolated context", async () => {
        const engine = createMockEngine();
        const call = new ActiveCall("CALL_SINGLE", "1111111111@s.whatsapp.net", engine, {
            durationMs: 2000,
            preRingingTimeoutMs: 2000,
        });

        expect(call.callId).toBe("CALL_SINGLE");
        expect(call.status).toBe("initiating");
        expect(call.ended).toBe(false);

        call._confirmRinging();
        expect(call.status).toBe("ringing");

        call._confirmConnected();
        expect(call.status).toBe("connected");
        expect(call.connectedAt).toBeGreaterThan(0);

        const summary = call.getSummary();
        expect(summary.id).toBe("CALL_SINGLE");
        expect(summary.status).toBe("connected");

        call.end();
        await call.waitForEnd();
        expect(call.ended).toBe(true);
        expect(call.status).toBe("ended");
    });

    test("2. Two Concurrent Calls — progress through states independently", async () => {
        const engine = createMockEngine();
        const callA = new ActiveCall("CALL_A", "1000000001@s.whatsapp.net", engine, { durationMs: 5000 });
        const callB = new ActiveCall("CALL_B", "1000000002@s.whatsapp.net", engine, { durationMs: 5000 });

        expect(callA.status).toBe("initiating");
        expect(callB.status).toBe("initiating");

        // Call A reaches ringing, Call B is still initiating
        callA._confirmRinging();
        expect(callA.status).toBe("ringing");
        expect(callB.status).toBe("initiating");

        // Call B reaches connected directly, Call A is still ringing
        callB._confirmConnected();
        expect(callA.status).toBe("ringing");
        expect(callB.status).toBe("connected");

        // Call A reaches connected
        callA._confirmConnected();
        expect(callA.status).toBe("connected");
        expect(callB.status).toBe("connected");

        callA.end();
        await callA.waitForEnd();

        expect(callA.ended).toBe(true);
        expect(callB.ended).toBe(false);

        callB.end();
        await callB.waitForEnd();
        expect(callB.ended).toBe(true);
    });

    test("3. Five Concurrent Calls — Rapid initiation and tracking", async () => {
        const engine = createMockEngine();
        const calls = [];
        for (let i = 1; i <= 5; i++) {
            const call = new ActiveCall(`CALL_${i}`, `900000000${i}@s.whatsapp.net`, engine, { durationMs: 5000 });
            calls.push(call);
        }

        expect(calls.length).toBe(5);
        calls.forEach((c, idx) => {
            expect(c.callId).toBe(`CALL_${idx + 1}`);
            expect(c.ended).toBe(false);
        });

        // Update each call to a distinct state
        calls[0]._confirmRinging();
        calls[1]._confirmAccepted();
        calls[2]._confirmConnected();
        calls[3]._handleSignalingError("offer", "unreachable");
        // calls[4] remains initiating

        expect(calls[0].status).toBe("ringing");
        expect(calls[1].status).toBe("accepted");
        expect(calls[2].status).toBe("connected");
        expect(calls[3].status).toBe("unreachable");
        expect(calls[4].status).toBe("initiating");

        // Clean up remaining
        calls[0].end();
        calls[1].end();
        calls[2].end();
        calls[4].end();
    });

    test("4. Failure Isolation — One call fails, other concurrent calls remain active", async () => {
        const engine = createMockEngine();
        const callA = new ActiveCall("CALL_FAIL_A", "2000000001@s.whatsapp.net", engine, { durationMs: 5000 });
        const callB = new ActiveCall("CALL_ACTIVE_B", "2000000002@s.whatsapp.net", engine, { durationMs: 5000 });
        const callC = new ActiveCall("CALL_ACTIVE_C", "2000000003@s.whatsapp.net", engine, { durationMs: 5000 });

        callA._confirmRinging();
        callB._confirmConnected();
        callC._confirmConnected();

        let callAEndedReason = null;
        callA.on("ended", (reason) => { callAEndedReason = reason; });

        // Call A fails with unreachable
        callA._handleSignalingError("offer", "unreachable");

        expect(callA.ended).toBe(true);
        expect(callAEndedReason).toBe("unreachable");
        expect(callA.status).toBe("unreachable");

        // Call B and Call C MUST remain unaffected
        expect(callB.ended).toBe(false);
        expect(callB.status).toBe("connected");
        expect(callC.ended).toBe(false);
        expect(callC.status).toBe("connected");

        callB.end();
        callC.end();
    });

    test("5. Early Termination Isolation — Call A ending does not affect Call B or C", async () => {
        const engine = createMockEngine();
        const callA = new ActiveCall("CALL_END_A", "3000000001@s.whatsapp.net", engine, { durationMs: 5000 });
        const callB = new ActiveCall("CALL_CONT_B", "3000000002@s.whatsapp.net", engine, { durationMs: 5000 });

        callA._confirmConnected();
        callB._confirmConnected();

        callA.end("completed");
        await callA.waitForEnd();

        expect(callA.ended).toBe(true);
        expect(callB.ended).toBe(false);
        expect(callB.status).toBe("connected");

        callB.end("completed");
        await callB.waitForEnd();
        expect(callB.ended).toBe(true);
    });

    test("6. Cross-Call Audio Isolation — Independent AudioFeeders and durations", async () => {
        const engine = createMockEngine();
        const sentChunksA = [];
        const sentChunksB = [];

        const callA = new ActiveCall("CALL_AUD_A", "4000000001@s.whatsapp.net", engine, {
            audioSource: "silence",
            durationMs: 150,
        });

        const callB = new ActiveCall("CALL_AUD_B", "4000000002@s.whatsapp.net", engine, {
            audioSource: "silence",
            durationMs: 400,
        });

        callA._confirmConnected();
        callB._confirmConnected();

        callA.startAudio(16000, 1, 320, (chunk) => sentChunksA.push(chunk));
        callB.startAudio(16000, 1, 320, (chunk) => sentChunksB.push(chunk));

        expect(callA.status).toBe("streaming");
        expect(callB.status).toBe("streaming");

        // Wait for call A duration (150ms) to complete
        await callA.waitForEnd();
        expect(callA.ended).toBe(true);
        expect(callA.status).toBe("ended");

        // Call B must STILL be active and streaming
        expect(callB.ended).toBe(false);
        expect(callB.status).toBe("streaming");

        // Wait for call B duration (400ms) to complete
        await callB.waitForEnd();
        expect(callB.ended).toBe(true);
        expect(callB.status).toBe("ended");

        expect(sentChunksA.length).toBeGreaterThan(0);
        expect(sentChunksB.length).toBeGreaterThan(sentChunksA.length);
    });

    test("7. Repeat Audio Isolation — Repeat settings operate independently per call", async () => {
        const engine = createMockEngine();
        const callRepeat = new ActiveCall("CALL_REP", "5000000001@s.whatsapp.net", engine, {
            audioSource: "silence",
            durationMs: 200,
            repeatAudio: true,
        });

        const callNoRepeat = new ActiveCall("CALL_NOREP", "5000000002@s.whatsapp.net", engine, {
            audioSource: "silence",
            durationMs: 200,
            repeatAudio: false,
        });

        expect(callRepeat.getSummary().repeatAudio).toBe(true);
        expect(callNoRepeat.getSummary().repeatAudio).toBe(false);

        callRepeat._confirmConnected();
        callNoRepeat._confirmConnected();

        callRepeat.startAudio(16000, 1, 320, () => {});
        callNoRepeat.startAudio(16000, 1, 320, () => {});

        await Promise.all([callRepeat.waitForEnd(), callNoRepeat.waitForEnd()]);
        expect(callRepeat.ended).toBe(true);
        expect(callNoRepeat.ended).toBe(true);
    });

    test("8. Safe Summary API — getSummary() returns safe public descriptors", () => {
        const engine = createMockEngine();
        const call = new ActiveCall("CALL_SAFE", "6000000001@s.whatsapp.net", engine, {
            audioSource: "./test.mp3",
            durationMs: 45000,
            repeatAudio: true,
        });

        const summary = call.getSummary();
        expect(summary.id).toBe("CALL_SAFE");
        expect(summary.jid).toBe("6000000001@s.whatsapp.net");
        expect(summary.status).toBe("initiating");
        expect(summary.state).toBe(CallState.Idle);
        expect(summary.audioSource).toBe("./test.mp3");
        expect(summary.durationMs).toBe(45000);
        expect(summary.repeatAudio).toBe(true);
        expect(summary.startedAt).toBeGreaterThan(0);
        expect(summary.connectedAt).toBeNull();
        expect(summary.endedAt).toBeNull();

        // Ensure private internal handles are not leaked on summary
        expect(summary.engine).toBeUndefined();
        expect(summary.audioFeeder).toBeUndefined();
        expect(summary.timers).toBeUndefined();
    });

    test("9. VoipClient Active Calls Registry and Termination Methods", async () => {
        const client = new VoipClient({ maxConcurrentCalls: 5 });
        const engine = createMockEngine();

        // Inject active calls directly to test registry operations
        const call1 = new ActiveCall("CALL_REG_1", "7000000001@s.whatsapp.net", engine, { durationMs: 10000 });
        const call2 = new ActiveCall("CALL_REG_2", "7000000002@s.whatsapp.net", engine, { durationMs: 10000 });

        expect(typeof client.getActiveCalls).toBe("function");
        expect(typeof client.getCall).toBe("function");
        expect(typeof client.getActiveCallCount).toBe("function");
        expect(typeof client.endCall).toBe("function");
        expect(typeof client.endAllCalls).toBe("function");
    });
});
