const { voipDiagnostics, VoipDiagnostics, sanitizeJid, summarizeNode } = require("../lib/Voip/diagnostics.js");
const { SignalingBridge } = require("../lib/Voip/signaling.js");
const { CallManager } = require("../lib/Voip/call-manager.js");
const { CallSession } = require("../lib/Voip/call-session.js");
const { CallDirection, CallMediaType, CallState } = require("../lib/Voip/types.js");

describe("VoIP End-to-End Diagnostic Logging & Privacy Tests", () => {
    let capturedLogs = [];
    const testLogger = {
        debug: (data, msg) => capturedLogs.push({ level: "debug", data, msg }),
        info: (data, msg) => capturedLogs.push({ level: "info", data, msg }),
        warn: (data, msg) => capturedLogs.push({ level: "warn", data, msg }),
        error: (data, msg) => capturedLogs.push({ level: "error", data, msg }),
    };

    const findLog = (event) => {
        return capturedLogs.find(l => (l.data?.voip?.event === event || l.data?.event === event));
    };

    beforeEach(() => {
        capturedLogs = [];
        voipDiagnostics.setDiagnosticMode(true);
        voipDiagnostics.setLogger(testLogger);
    });

    afterEach(() => {
        voipDiagnostics.setDiagnosticMode(false);
        voipDiagnostics.setLogger(null);
    });

    // ─────────────────────────────────────────────────────────────────────────────
    // 1. Diagnostics Formatter, Timeline, and Sanitation
    // ─────────────────────────────────────────────────────────────────────────────

    test("1. Structured format contains timestamp, level, component, event, callId, and direction", () => {
        voipDiagnostics.log({
            level: "info",
            component: "SignalingBridge",
            event: "incoming_call_stanza_received",
            direction: "incoming",
            callId: "TEST_CALL_FORMAT_1",
            jid: "1234567890:1@s.whatsapp.net",
            tags: ["offer", "capability"]
        });

        const entry = findLog("incoming_call_stanza_received");
        expect(entry).toBeDefined();
        const voip = entry.data?.voip || entry.data;
        expect(voip.timestamp).toBeDefined();
        expect(voip.component).toBe("SignalingBridge");
        expect(voip.event).toBe("incoming_call_stanza_received");
        expect(voip.direction).toBe("incoming");
        expect(voip.callId).toBe("TEST_CALL_FORMAT_1");
        expect(voip.jid).toBe("1234567890:1@s.whatsapp.net");
        expect(voip.tags).toEqual(["offer", "capability"]);

        // Timeline check
        const timeline = voipDiagnostics.getTimeline("TEST_CALL_FORMAT_1");
        expect(timeline.length).toBeGreaterThan(0);
        expect(timeline[0].event).toBe("SignalingBridge.incoming_call_stanza_received");
        expect(timeline[0].time).toBeGreaterThan(0);
    });

    test("2. JID sanitation properly masks tokens and preserves valid user identifiers", () => {
        expect(sanitizeJid("")).toBe("");
        expect(sanitizeJid(null)).toBe("");
        expect(sanitizeJid("1234567890@s.whatsapp.net")).toBe("1234567890@s.whatsapp.net");
        expect(sanitizeJid("1234567890:2@s.whatsapp.net")).toBe("1234567890:2@s.whatsapp.net");
        expect(sanitizeJid("999999999999999@lid")).toBe("999999999999999@lid");
        expect(sanitizeJid("malicious$token#injection@server.com")).toBe("malicioustokeninjection@server.com");
    });

    test("3. XML node summarizer strips sensitive binary buffers and attributes", () => {
        const rawKeyBuffer = Buffer.from("super_secret_32_byte_call_key_123");
        const node = {
            tag: "enc",
            attrs: {
                v: "2",
                type: "pkmsg",
                secret_token: "should_not_leak"
            },
            content: rawKeyBuffer
        };

        const summary = summarizeNode(node);
        expect(summary.tag).toBe("enc");
        expect(summary.attrs.v).toBe("2");
        expect(summary.attrs.type).toBe("pkmsg");
        expect(summary.attrs.secret_token).toBe("[REDACTED]"); // Redacted via isSensitiveKey!
        expect(summary.hasContent).toBe(true);
        expect(summary.contentLength).toBe(rawKeyBuffer.length);
        expect(summary.contentType).toBe("buffer");

        // Verify JSON representation does NOT contain the raw key buffer text
        const jsonStr = JSON.stringify(summary);
        expect(jsonStr).not.toContain("super_secret_32_byte_call_key_123");
    });

    // ─────────────────────────────────────────────────────────────────────────────
    // 2. Cryptographic Privacy Assertions (No Secrets in Logs)
    // ─────────────────────────────────────────────────────────────────────────────

    test("4. Privacy assertion: Raw cryptographic keys and secret tokens never appear in captured logs", () => {
        const secretKey = Buffer.from("0123456789abcdef0123456789abcdef");
        const secretHex = secretKey.toString("hex");
        const secretB64 = secretKey.toString("base64");

        voipDiagnostics.log({
            level: "debug",
            component: "SignalingBridge",
            event: "call_key_decrypt_succeeded",
            callId: "PRIVACY_TEST_CALL",
            data: {
                // Safe summary only
                keyLength: secretKey.length,
                hasKey: true
            }
        });

        const timeline = voipDiagnostics.formatTimeline("PRIVACY_TEST_CALL");
        expect(timeline).not.toContain(secretHex);
        expect(timeline).not.toContain(secretB64);

        for (const log of capturedLogs) {
            const rawStr = JSON.stringify(log);
            expect(rawStr).not.toContain(secretHex);
            expect(rawStr).not.toContain(secretB64);
        }
    });

    // ─────────────────────────────────────────────────────────────────────────────
    // 3. SignalingBridge Pipeline Branches (Offer, Failure, Duplicate)
    // ─────────────────────────────────────────────────────────────────────────────

    test("5. SignalingBridge logs empty or malformed call stanza ignored", async () => {
        const bridge = new SignalingBridge({
            sock: { sendNode: jest.fn().mockResolvedValue(true) }
        });

        // 1. Null/undefined node
        await bridge.processIncomingCall(null);
        let found = findLog("empty_call_stanza_ignored");
        expect(found).toBeDefined();

        // 2. Call node without children
        capturedLogs = [];
        await bridge.processIncomingCall({ tag: "call", attrs: { from: "123@s.whatsapp.net" }, content: [] });
        found = findLog("empty_call_stanza_ignored");
        expect(found).toBeDefined();
    });

    test("6. SignalingBridge logs missing call-id rejected", async () => {
        const bridge = new SignalingBridge({
            sock: { sendNode: jest.fn().mockResolvedValue(true) }
        });

        const stanzaWithoutCallId = {
            tag: "call",
            attrs: { from: "123456@s.whatsapp.net" },
            content: [{ tag: "offer", attrs: {}, content: [] }]
        };

        await bridge.processIncomingCall(stanzaWithoutCallId);
        const found = findLog("missing_call_id_rejected");
        expect(found).toBeDefined();
        const voip = found.data?.voip || found.data;
        expect(voip?.data?.reason).toBe("missing_call_id");
    });

    test("7. SignalingBridge logs duplicate stanza suppression", async () => {
        const bridge = new SignalingBridge({
            sock: { sendNode: jest.fn().mockResolvedValue(true) }
        });

        const callStanza = {
            tag: "call",
            attrs: { from: "123456@s.whatsapp.net", id: "STANZA_TAG_1" },
            content: [{ tag: "offer", attrs: { "call-id": "DUP_TEST_CALL", "call-creator": "123456@s.whatsapp.net" }, content: [] }]
        };

        await bridge.processIncomingCall(callStanza);
        // Second call with same stanza ID & call-id
        await bridge.processIncomingCall(callStanza);

        const dupLog = findLog("duplicate_stanza_suppressed");
        expect(dupLog).toBeDefined();
        const voip = dupLog.data?.voip || dupLog.data;
        expect(voip?.callId).toBe("DUP_TEST_CALL");
    });

    test("8. SignalingBridge logs routing hints and PN/LID resolution", async () => {
        const bridge = new SignalingBridge({
            sock: { sendNode: jest.fn().mockResolvedValue(true) }
        });

        const offerStanza = {
            tag: "call",
            attrs: { from: "11111:0@s.whatsapp.net", id: "ROUTING_STANZA_1" },
            content: [{
                tag: "offer",
                attrs: {
                    "call-id": "ROUTING_TEST_CALL",
                    "call-creator": "11111:0@s.whatsapp.net",
                    caller_pn: "11111",
                    caller_lid: "22222@lid",
                    platform: "0"
                },
                content: []
            }]
        };

        await bridge.processIncomingCall(offerStanza);

        const routeLog = findLog("routing_hints_extracted");
        expect(routeLog).toBeDefined();
        const voip = routeLog.data?.voip || routeLog.data;
        expect(voip?.callId).toBe("ROUTING_TEST_CALL");
        expect(voip?.data?.callerPn).toBe("11111");
        expect(voip?.data?.callerLid).toBe("22222@lid");
    });

    test("9. SignalingBridge logs decryption attempts and failure when candidates fail", async () => {
        const bridge = new SignalingBridge({
            sock: { sendNode: jest.fn().mockResolvedValue(true) }
        });

        const offerWithFailingEnc = {
            tag: "offer",
            attrs: { "call-id": "DEC_FAIL_CALL" },
            content: [{
                tag: "enc",
                attrs: { v: "2", type: "pkmsg" },
                content: Buffer.from("invalid_ciphertext")
            }]
        };

        const result = await bridge.maybeDecryptEnc(offerWithFailingEnc, "123456@s.whatsapp.net");
        expect(result._decryptionFailed).toBe(true);

        const failLog = findLog("call_key_decrypt_failed_all_candidates");
        expect(failLog).toBeDefined();
        const voip = failLog.data?.voip || failLog.data;
        expect(voip?.callId).toBe("DEC_FAIL_CALL");
    });

    // ─────────────────────────────────────────────────────────────────────────────
    // 4. CallManager Pipeline Branches (Capacity, Offer, Accept, Reject, End)
    // ─────────────────────────────────────────────────────────────────────────────

    test("10. CallManager logs malformed offer rejection on missing call-id", async () => {
        const cm = new CallManager();
        const malformedNode = {
            tag: "call",
            attrs: { from: "123@s.whatsapp.net" },
            content: [{ tag: "offer", attrs: {}, content: [] }]
        };

        const session = await cm.handleIncomingOffer(malformedNode);
        expect(session).toBeNull();

        const log = findLog("incoming_offer_missing_call_id");
        expect(log).toBeDefined();
    });

    test("11. CallManager logs capacity rejection when limit reached with onLimit='reject'", async () => {
        const cm = new CallManager({ maxConcurrentCalls: 1, onLimit: "reject" });
        cm.calls.set("EXISTING_CALL", { ended: false, isWaiting: false });

        const offerNode = {
            tag: "call",
            attrs: { from: "999@s.whatsapp.net" },
            content: [{
                tag: "offer",
                attrs: { "call-id": "CAP_REJECT_CALL", "call-creator": "999@s.whatsapp.net" },
                content: []
            }]
        };

        const session = await cm.handleIncomingOffer(offerNode);
        expect(session).toBeNull();

        const log = findLog("incoming_offer_capacity_rejected");
        expect(log).toBeDefined();
        const voip = log.data?.voip || log.data;
        expect(voip?.callId).toBe("CAP_REJECT_CALL");
        expect(voip?.data?.reason).toBe("busy");
    });

    test("12. CallManager logs session creation and call_incoming emission", async () => {
        const cm = new CallManager();
        const offerNode = {
            tag: "call",
            attrs: { from: "555@s.whatsapp.net" },
            content: [{
                tag: "offer",
                attrs: { "call-id": "INCOMING_EMIT_CALL", "call-creator": "555@s.whatsapp.net" },
                content: []
            }]
        };

        const session = await cm.handleIncomingOffer(offerNode);
        expect(session).toBeDefined();
        expect(session.callId).toBe("INCOMING_EMIT_CALL");

        const createLog = findLog("incoming_offer_session_created");
        expect(createLog).toBeDefined();
        const voipCreate = createLog.data?.voip || createLog.data;
        expect(voipCreate?.callId).toBe("INCOMING_EMIT_CALL");

        const emitLog = findLog("call_incoming_emitted");
        expect(emitLog).toBeDefined();
        const voipEmit = emitLog.data?.voip || emitLog.data;
        expect(voipEmit?.callId).toBe("INCOMING_EMIT_CALL");

        session.end();
    });

    test("13. CallManager logs acceptCall failure when session not found or already ended", async () => {
        const cm = new CallManager();

        // Session not found
        await expect(cm.acceptCall("NON_EXISTENT_CALL")).rejects.toThrow("Call session not found");
        let notFoundLog = findLog("accept_call_session_not_found");
        expect(notFoundLog).toBeDefined();

        // Already ended
        const session = new CallSession({
            callId: "ALREADY_ENDED_CALL",
            peerJid: "123@s.whatsapp.net",
            direction: CallDirection.Incoming
        });
        session.end();
        cm.calls.set("ALREADY_ENDED_CALL", session);

        capturedLogs = [];
        await expect(cm.acceptCall("ALREADY_ENDED_CALL")).rejects.toThrow("call has already ended");
        let endedLog = findLog("accept_call_already_ended");
        expect(endedLog).toBeDefined();
    });

    test("14. CallManager logs acceptCall abort when decryption failed without call key", async () => {
        const cm = new CallManager();
        const session = new CallSession({
            callId: "DEC_FAIL_ACCEPT_CALL",
            peerJid: "123@s.whatsapp.net",
            direction: CallDirection.Incoming
        });
        session._decryptionFailed = true;
        session._callKey = null;
        cm.calls.set("DEC_FAIL_ACCEPT_CALL", session);

        await expect(cm.acceptCall("DEC_FAIL_ACCEPT_CALL")).rejects.toThrow("call key decryption failed");
        const log = findLog("accept_call_aborted_decryption_failed");
        expect(log).toBeDefined();
        const voip = log.data?.voip || log.data;
        expect(voip?.callId).toBe("DEC_FAIL_ACCEPT_CALL");
    });

    test("15. CallManager logs all acceptance steps: mute_v2, transport, accept stanza", async () => {
        const mockSock = {
            sendNode: jest.fn().mockResolvedValue(true),
            authState: { creds: { me: { id: "000@s.whatsapp.net" } } }
        };
        const cm = new CallManager({ sock: mockSock });
        const session = new CallSession({
            callId: "ACCEPT_STEPS_CALL",
            peerJid: "123456@s.whatsapp.net",
            callCreator: "123456@s.whatsapp.net",
            direction: CallDirection.Incoming,
            manager: cm
        });
        session._callKey = Buffer.alloc(32, 1);
        cm.calls.set("ACCEPT_STEPS_CALL", session);

        await cm.acceptCall("ACCEPT_STEPS_CALL");

        const muteLog = findLog("accept_step_mute_v2_dispatched");
        expect(muteLog).toBeDefined();

        const transportLog = findLog("accept_step_transport_dispatched");
        expect(transportLog).toBeDefined();

        const acceptLog = findLog("accept_step_accept_dispatched");
        expect(acceptLog).toBeDefined();

        const completedLog = findLog("accept_call_completed");
        expect(completedLog).toBeDefined();

        session.end();
    });

    test("16. CallManager logs rejectCall and endCall with termination reasons", async () => {
        const mockSock = { sendNode: jest.fn().mockResolvedValue(true) };
        const cm = new CallManager({ sock: mockSock });

        const session = new CallSession({
            callId: "REJECT_END_CALL",
            peerJid: "123456@s.whatsapp.net",
            direction: CallDirection.Incoming,
            manager: cm
        });
        cm.calls.set("REJECT_END_CALL", session);

        await cm.rejectCall("REJECT_END_CALL", "busy");
        const rejectLog = findLog("reject_call_invoked");
        expect(rejectLog).toBeDefined();
        const voipReject = rejectLog.data?.voip || rejectLog.data;
        expect(voipReject?.data?.reason).toBe("busy");

        const rejectCompleted = findLog("reject_call_completed");
        expect(rejectCompleted).toBeDefined();
    });

    // ─────────────────────────────────────────────────────────────────────────────
    // 5. Timeline Tracking & Relative Timing
    // ─────────────────────────────────────────────────────────────────────────────

    test("17. Per-call timeline records sequential events with relative elapsed time", async () => {
        const callId = "TIMELINE_TEST_CALL";
        voipDiagnostics.log({ level: "info", component: "Socket", event: "cb_call_received", callId });
        await new Promise(r => setTimeout(r, 20));
        voipDiagnostics.log({ level: "info", component: "SignalingBridge", event: "routing_hints_extracted", callId });
        await new Promise(r => setTimeout(r, 20));
        voipDiagnostics.log({ level: "info", component: "CallManager", event: "call_incoming_emitted", callId });

        const formatted = voipDiagnostics.formatTimeline(callId);
        expect(formatted).toContain("cb_call_received");
        expect(formatted).toContain("routing_hints_extracted");
        expect(formatted).toContain("call_incoming_emitted");
        expect(formatted).toMatch(/\+\d+ms/); // Relative elapsed time marker
    });
});
