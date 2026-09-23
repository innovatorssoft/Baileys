const { CallManager } = require("../lib/Voip/call-manager.js");
const { CallSession } = require("../lib/Voip/call-session.js");
const { CallDirection, CallState } = require("../lib/Voip/types.js");

describe("VoIP terminate delivery & accept ordering", () => {

    const createMockSocket = () => ({
        sendNode: jest.fn(async () => {}),
        query: jest.fn(async () => {}),
        authState: {
            creds: {
                me: { id: "self_jid@s.whatsapp.net", lid: "self_lid@lid" }
            }
        }
    });

    const incomingOffer = (callId, from) => ({
        tag: "call",
        attrs: { from },
        content: [{
            tag: "offer",
            attrs: { "call-id": callId, "call-creator": from.replace(/:\d+@/, "@") },
            content: []
        }]
    });

    test("1. sendTerminateStanza keeps the caller DEVICE jid and normalizes the reason", async () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock });
        const terminateEvents = [];
        manager.on("call_terminate_sent", (info) => terminateEvents.push(info));

        await manager.sendTerminateStanza(
            "TERM_CALL_1",
            "72993388666967@lid",
            "72993388666967:1@lid",
            "completed"
        );

        expect(sock.sendNode).toHaveBeenCalledTimes(1);
        const stanza = sock.sendNode.mock.calls[0][0];
        expect(stanza.tag).toBe("call");
        // Device JID must survive — the caller's phone ignores bare-JID terminates.
        expect(stanza.attrs.to).toBe("72993388666967:1@lid");

        const terminate = stanza.content[0];
        expect(terminate.tag).toBe("terminate");
        expect(terminate.attrs["call-id"]).toBe("TERM_CALL_1");
        expect(terminate.attrs["call-creator"]).toBe("72993388666967@lid");
        // Normal call completion / hangup must omit reason attribute in WhatsApp
        expect(terminate.attrs.reason).toBeUndefined();

        expect(terminateEvents).toHaveLength(1);
        expect(terminateEvents[0]).toMatchObject({
            callId: "TERM_CALL_1",
            to: "72993388666967:1@lid",
        });
        expect(terminateEvents[0].reason).toBeUndefined();

        manager.cleanup();
    });

    test("2. engine-driven local end (WASM state -> Idle) still sends terminate to WhatsApp", async () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock });

        const session = await manager.handleIncomingOffer(
            incomingOffer("TERM_LOCAL_1", "72993388666967:1@lid"),
            "72993388666967:1@lid"
        );
        expect(session).not.toBeNull();
        sock.sendNode.mockClear();

        // Simulate the WASM tearing the call down locally — this path used to end
        // the session in Baileys WITHOUT any terminate reaching the server.
        session._confirmConnected();
        session._updateState(CallState.Idle);

        expect(session.ended).toBe(true);
        expect(sock.sendNode).toHaveBeenCalled();

        const terminateStanza = sock.sendNode.mock.calls
            .map((call) => call[0])
            .find((node) => node.content?.[0]?.tag === "terminate");

        expect(terminateStanza).toBeDefined();
        expect(terminateStanza.attrs.to).toBe("72993388666967:1@lid");
        expect(terminateStanza.content[0].attrs["call-id"]).toBe("TERM_LOCAL_1");
        expect(terminateStanza.content[0].attrs.reason).toBeUndefined();
        // Connected -> duration/audio_duration accompany the terminate.
        expect(terminateStanza.content[0].attrs.duration).toBeDefined();

        manager.cleanup();
    });

    test("3. audio exhausted -> session.end() sends exactly one terminate", async () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock });

        const session = await manager.handleIncomingOffer(
            incomingOffer("TERM_AUDIO_1", "72993388666967:1@lid"),
            "72993388666967:1@lid"
        );
        sock.sendNode.mockClear();

        // AudioFeeder onEnd -> session.end("completed") -> manager.endCall
        await session.end("completed");

        const terminates = sock.sendNode.mock.calls
            .map((call) => call[0])
            .filter((node) => node.content?.[0]?.tag === "terminate");
        expect(terminates).toHaveLength(1);
        expect(terminates[0].attrs.to).toBe("72993388666967:1@lid");
        expect(terminates[0].content[0].attrs.reason).toBeUndefined();
        expect(session.ended).toBe(true);

        manager.cleanup();
    });

    test("4. peer-initiated terminate is never echoed back to the server", async () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock });

        const session = await manager.handleIncomingOffer(
            incomingOffer("TERM_PEER_1", "72993388666967:1@lid"),
            "72993388666967:1@lid"
        );
        sock.sendNode.mockClear();

        manager.handleIncomingTerminate("TERM_PEER_1", "hangup");

        expect(session.ended).toBe(true);
        const terminates = sock.sendNode.mock.calls
            .map((call) => call[0])
            .filter((node) => node.content?.[0]?.tag === "terminate");
        expect(terminates).toHaveLength(0);

        manager.cleanup();
    });

    test("5. signaling terminate from the peer marks the session peer-initiated", async () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock });

        const session = await manager.handleIncomingOffer(
            incomingOffer("TERM_PEER_2", "72993388666967:1@lid"),
            "72993388666967:1@lid"
        );
        sock.sendNode.mockClear();

        session._handleSignalingEvent("terminate", "hangup");
        expect(session.ended).toBe(true);
        expect(session._peerInitiatedEnd).toBe(true);

        const terminates = sock.sendNode.mock.calls
            .map((call) => call[0])
            .filter((node) => node.content?.[0]?.tag === "terminate");
        expect(terminates).toHaveLength(0);

        manager.cleanup();
    });

    test("6. accept ordering — <accept> stanza is sent BEFORE the media engine accepts", async () => {
        const sock = createMockSocket();
        const order = [];
        sock.sendNode = jest.fn(async (node) => {
            order.push(`stanza:${node.content?.[0]?.tag}`);
        });

        const mockSignaling = {
            getCallKey: jest.fn(() => Buffer.alloc(32, 1)),
            encryptCallKey: jest.fn(async (target, key, count) => ({
                encNode: { tag: "enc", attrs: { v: "2", type: "msg", count: String(count) }, content: Buffer.from("enc") },
                shouldIncludeDeviceIdentity: false
            })),
            getDeviceIdentity: jest.fn(() => undefined),
            maybeDecryptEnc: jest.fn(async () => ({ _callKey: Buffer.alloc(32, 1) })),
            ensureTcToken: jest.fn(async () => undefined),
            registerEngine: jest.fn(),
            unregisterEngine: jest.fn(),
            cleanupCall: jest.fn()
        };

        const manager = new CallManager({ sock, signaling: mockSignaling });
        const session = await manager.handleIncomingOffer(
            incomingOffer("ACCEPT_ORDER_1", "72993388666967:1@lid"),
            "72993388666967:1@lid"
        );

        session.engine = {
            acceptCall: jest.fn(() => order.push("engine:accept")),
            endCall: jest.fn(),
            handleSignalingOffer: jest.fn()
        };

        await manager.acceptCall("ACCEPT_ORDER_1", { audioSource: "silence" });

        const engineIdx = order.indexOf("engine:accept");
        const acceptIdx = order.indexOf("stanza:accept");
        expect(engineIdx).toBeGreaterThanOrEqual(0);
        expect(acceptIdx).toBeGreaterThanOrEqual(0);
        // Our raw <accept> must reach the caller's phone FIRST — if the WASM
        // engine's own accept goes out first, the follow-up raw <accept> conflicts
        // with it and the caller's phone never leaves the ringing state.
        expect(acceptIdx).toBeLessThan(engineIdx);

        expect(session.status).toBe("accepted");
        expect(session.engine.acceptCall).toHaveBeenCalledTimes(1);

        manager.cleanup();
    });

    test("7. rejectCall marks the end signal so no duplicate terminate follows", async () => {
        const sock = createMockSocket();
        const manager = new CallManager({ sock });

        const session = await manager.handleIncomingOffer(
            incomingOffer("REJECT_DUP_1", "72993388666967:1@lid"),
            "72993388666967:1@lid"
        );
        sock.sendNode.mockClear();

        await manager.rejectCall("REJECT_DUP_1", "declined");

        const rejects = sock.sendNode.mock.calls
            .map((call) => call[0])
            .filter((node) => node.content?.[0]?.tag === "reject");
        const terminates = sock.sendNode.mock.calls
            .map((call) => call[0])
            .filter((node) => node.content?.[0]?.tag === "terminate");
        expect(rejects).toHaveLength(1);
        expect(terminates).toHaveLength(0);
        // Reject must target the caller's DEVICE jid — bare never reaches the phone.
        expect(rejects[0].attrs.to).toBe("72993388666967:1@lid");
        expect(session.ended).toBe(true);

        manager.cleanup();
    });

    test("8. failed terminate send releases the claim so the safety net retries", async () => {
        const sock = createMockSocket();
        let terminateAttempts = 0;
        sock.sendNode = jest.fn(async (node) => {
            if (node.content?.[0]?.tag === "terminate") {
                terminateAttempts += 1;
                if (terminateAttempts === 1) throw new Error("socket write failed");
            }
        });

        const manager = new CallManager({ sock });
        const terminateEvents = [];
        manager.on("call_terminate_sent", (info) => terminateEvents.push(info));

        const session = await manager.handleIncomingOffer(
            incomingOffer("TERM_RETRY_1", "72993388666967:1@lid"),
            "72993388666967:1@lid"
        );

        // endCall's own terminate send fails; the claim must be released so the
        // "ended" safety net can send it again instead of silently dropping it.
        await manager.endCall("TERM_RETRY_1", "completed");
        // Flush the async safety-net send fired from the "ended" listener.
        await new Promise((resolve) => setImmediate(resolve));

        expect(terminateAttempts).toBe(2);
        expect(terminateEvents).toHaveLength(1);
        expect(terminateEvents[0]).toMatchObject({
            callId: "TERM_RETRY_1",
        });
        expect(terminateEvents[0].reason).toBeUndefined();
        expect(session._endSignalSent).toBe(true);

        manager.cleanup();
    });
});
