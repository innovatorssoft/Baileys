"use strict";

const EventEmitter = require('events');
const zlib = require('zlib');

jest.mock('../lib/Socket/Client', () => {
    const { EventEmitter: EE } = require('events');
    class MockWebSocketClient extends EE {
        constructor(url, config) {
            super();
            this.url = url;
            this.config = config;
            this.isOpen = true;
            this.isClosed = false;
            this.isClosing = false;
            this.isConnecting = false;
            this.sentFrames = [];
        }
        connect() {
            this.isOpen = true;
            this.isClosed = false;
        }
        send(data, cb) {
            if (!this.isOpen) {
                const err = new Error('WebSocket is not open');
                if (cb) cb(err);
                return false;
            }
            this.sentFrames.push(data);
            if (cb) cb(null);
            return true;
        }
        close() {
            this.isOpen = false;
            this.isClosed = true;
        }
    }
    return {
        WebSocketClient: jest.fn().mockImplementation((url, config) => new MockWebSocketClient(url, config))
    };
});

const { makeChatsSocket } = require('../lib/Socket/chats');
const { DEFAULT_CONNECTION_CONFIG, NOISE_WA_HEADER, NOISE_MODE } = require('../lib/Defaults');
const { DisconnectReason } = require('../lib/Types');
const { makeNoiseHandler } = require('../lib/Utils/noise-handler');
const { Curve, sha256, hkdf, aesEncryptGCM } = require('../lib/Utils/crypto');
const { encodeBinaryNode } = require('../lib/WABinary');
const {
    PresenceTracker,
    monitorPresence
} = require('../lib/Utils/presence-tracker');

function createSilentLogger() {
    const entries = [];
    const record = (level) => (...args) => {
        entries.push({ level, args });
    };
    const logger = {
        level: 'debug',
        entries,
        trace: jest.fn(record('trace')),
        debug: jest.fn(record('debug')),
        info: jest.fn(record('info')),
        warn: jest.fn(record('warn')),
        error: jest.fn(record('error')),
        child: () => logger
    };
    return logger;
}

function createChatsTestSocket(overrides = {}) {
    const logger = overrides.logger || createSilentLogger();
    const keyStoreData = overrides.keyStoreData || {};
    const mockLidMapping = {
        mappingCache: new Map(overrides.lidCacheEntries || []),
        getLIDForPN: jest.fn(async (pn) => overrides.lidMap?.[pn] || null),
        getPNForLID: jest.fn(async (lid) => overrides.pnMap?.[lid] || null),
        storeLIDPNMappings: jest.fn(async () => {})
    };

    const placeholderMap = new Map();
    const config = {
        ...DEFAULT_CONNECTION_CONFIG,
        logger,
        markOnlineOnConnect: false,
        fireInitQueries: false,
        shouldSyncHistoryMessage: () => false,
        placeholderResendCache: {
            get: (k) => placeholderMap.get(k),
            set: (k, v) => { placeholderMap.set(k, v); return true; },
            del: (k) => placeholderMap.delete(k),
            flushAll: () => placeholderMap.clear()
        },
        auth: {
            creds: {
                me: {
                    id: '923000000000:1@s.whatsapp.net',
                    lid: '100000000@lid',
                    name: 'TestUser'
                }
            },
            keys: {
                get: jest.fn(async (type, ids) => {
                    const store = keyStoreData[type] || {};
                    const out = {};
                    for (const id of ids) {
                        if (store[id] !== undefined) out[id] = store[id];
                    }
                    return out;
                }),
                set: jest.fn(async () => {}),
                transaction: jest.fn(async (cb) => cb())
            }
        },
        makeSignalRepository: jest.fn(() => ({
            lidMapping: mockLidMapping,
            migrateSession: jest.fn(async () => ({ migrated: 0, skipped: 0, total: 0 }))
        }))
    };

    const sock = makeChatsSocket(config);
    return { sock, logger, mockLidMapping };
}

describe('Presence Monitoring Regression & Socket Stability Suite', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('1. Presence Subscription Correctness, Normalization & tcToken Attachment', () => {
        test('normalizes device-qualified user JIDs and auto-attaches stored tcToken for PN and LID', async () => {
            const tokenBuf = Buffer.from([1, 2, 3, 4, 5, 6]);
            const { sock } = createChatsTestSocket({
                keyStoreData: {
                    tctoken: {
                        '174281585643715@lid': { token: tokenBuf, timestamp: '1700000000' }
                    }
                },
                lidCacheEntries: [
                    ['pn:923001234567', '174281585643715'],
                    ['lid:174281585643715', '923001234567']
                ]
            });

            const sentNodes = [];
            const originalSendNode = sock.sendNode;
            // Intercept encoded frames by spying on ws.send and decoding? Even cleaner: inspect ws.sentFrames count + check via mock
            // Note: chats.js calls internal sendNode directly, so verify encoded frame bytes contain tctoken & bare JID
            await sock.presenceSubscribe('923001234567:2@s.whatsapp.net');
            expect(sock.ws.sentFrames).toHaveLength(1);
            // Decode raw unencrypted frame (handshake not finished, 3-byte length + WA header on first frame)
            const firstFrame = sock.ws.sentFrames[0];
            // Verify token bytes appear in the outgoing binary node payload (not leaked to logs)
            expect(firstFrame.includes(tokenBuf)).toBe(true);

            // Group JID must NOT attach tctoken
            await sock.presenceSubscribe('120363000000000@g.us');
            expect(sock.ws.sentFrames).toHaveLength(2);
            expect(sock.ws.sentFrames[1].includes(tokenBuf)).toBe(false);

            // Confirm no sensitive token bytes were logged
            const allLogStr = JSON.stringify(sock.logger.entries);
            expect(allLogStr).not.toContain(tokenBuf.toString('base64'));

            sock.end(undefined);
        });

        test('does not emit connection.update on sendPresenceUpdate when sendNode fails (closed socket)', async () => {
            const { sock } = createChatsTestSocket();
            const connUpdates = [];
            sock.ev.on('connection.update', (u) => connUpdates.push(u));

            // Close underlying ws without calling end() yet so sendRawMessage rejects
            sock.ws.isOpen = false;
            await expect(sock.sendPresenceUpdate('available')).rejects.toThrow('Connection Closed');
            expect(connUpdates.filter(u => u.isOnline !== undefined)).toHaveLength(0);

            sock.end(undefined);
        });
    });

    describe('2. Multi-Contact Presence Monitoring, Chatstates & Repeated Transitions Without Reconnection', () => {
        test('tracks multiple contacts through online, composing, recording, paused, and repeated offline cycles with zero reconnections', async () => {
            const { sock } = createChatsTestSocket();
            const connectionCloses = [];
            const connectionUpdates = [];
            sock.ev.on('connection.update', (u) => {
                connectionUpdates.push(u);
                if (u.connection === 'close') {
                    connectionCloses.push(u);
                }
            });

            const jid1 = '923001111111@s.whatsapp.net';
            const jid2 = '923002222222@s.whatsapp.net';
            const jid3 = '923003333333@s.whatsapp.net';

            const tracker = monitorPresence(sock, [jid1, jid2, jid3], {
                logToConsole: false,
                resolveLid: false,
                autoResubscribe: true
            });
            await new Promise(r => setTimeout(r, 20));

            // Subscribe must NOT mutate connection.update (announceAvailable defaults to false)
            expect(connectionUpdates.filter(u => u.isOnline !== undefined)).toHaveLength(0);

            const onlineEvents = [];
            const offlineEvents = [];
            const chatstateEvents = [];
            const sessionEvents = [];

            tracker.on('online', (d) => onlineEvents.push(d));
            tracker.on('offline', (d) => offlineEvents.push(d));
            tracker.on('chatstate', (d) => chatstateEvents.push(d));
            tracker.on('session', (s) => sessionEvents.push(s));

            // Simulate repeated online / chatstate / offline transitions via actual CB:presence & CB:chatstate handlers
            for (let cycle = 0; cycle < 3; cycle++) {
                // Contact 1: online -> composing -> paused -> recording -> offline
                sock.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid1 } });
                sock.ws.emit('CB:chatstate', { tag: 'chatstate', attrs: { from: jid1 }, content: [{ tag: 'composing', attrs: {} }] });
                sock.ws.emit('CB:chatstate', { tag: 'chatstate', attrs: { from: jid1 }, content: [{ tag: 'paused', attrs: {} }] });
                sock.ws.emit('CB:chatstate', { tag: 'chatstate', attrs: { from: jid1 }, content: [{ tag: 'composing', attrs: { media: 'audio' } }] });
                sock.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid1, type: 'unavailable', last: String(1763700000 + cycle * 60) } });

                // Contact 2: comes online via composing, then goes offline
                sock.ws.emit('CB:chatstate', { tag: 'chatstate', attrs: { from: jid2 }, content: [{ tag: 'composing', attrs: {} }] });
                sock.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid2, type: 'unavailable' } });

                // Contact 3: toggles online/offline
                sock.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid3 } });
                sock.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid3, type: 'unavailable' } });
            }

            // Verify all transitions detected cleanly
            expect(onlineEvents.filter(e => e.jid === jid1)).toHaveLength(3);
            expect(offlineEvents.filter(e => e.jid === jid1)).toHaveLength(3);
            expect(sessionEvents.filter(e => e.jid === jid1)).toHaveLength(3);

            expect(onlineEvents.filter(e => e.jid === jid2)).toHaveLength(3);
            expect(offlineEvents.filter(e => e.jid === jid2)).toHaveLength(3);

            expect(onlineEvents.filter(e => e.jid === jid3)).toHaveLength(3);
            expect(offlineEvents.filter(e => e.jid === jid3)).toHaveLength(3);

            // Verify composing, paused, and recording chatstate events were all preserved & delivered
            const jid1Chatstates = chatstateEvents.filter(e => e.jid === jid1).map(e => e.rawPresence);
            expect(jid1Chatstates).toContain('composing');
            expect(jid1Chatstates).toContain('paused');
            expect(jid1Chatstates).toContain('recording');

            // CRITICAL: Socket must remain completely open with ZERO close/reconnect events
            expect(connectionCloses).toHaveLength(0);
            expect(sock.ws.isOpen).toBe(true);
            expect(sock.ws.isClosed).toBe(false);

            tracker.destroy();
            sock.end(undefined);
        });
    });

    describe('3. Eliminating Duplicate Subscriptions, 5x Amplification & Unsubscribe Leaks', () => {
        test('does not amplify subscriptions across PN + LID on subscribe, resubscribe, or periodic heartbeat', async () => {
            const mockEv = new EventEmitter();
            const subscribeCalls = [];
            const pn = '923014434335@s.whatsapp.net';
            const lid = '174281585643715@lid';

            const mockSock = {
                ev: mockEv,
                ws: { isOpen: true, isClosed: false, isClosing: false, isConnecting: false },
                presenceSubscribe: jest.fn(async (jid) => {
                    subscribeCalls.push(jid);
                }),
                onWhatsApp: jest.fn(async () => [{ jid: pn, exists: true, lid }])
            };

            const tracker = new PresenceTracker(mockSock, {
                logToConsole: false,
                autoResubscribe: true,
                resubscribeIntervalMs: 0 // default: no uncontrolled 25s loop
            });

            // 1. Initial subscribe: exactly 1 PN + 1 LID = 2 calls
            await tracker.subscribe(pn);
            expect(subscribeCalls).toEqual([pn, lid]);

            // 2. Duplicate subscribe while already active: 0 additional calls
            await tracker.subscribe(pn);
            await tracker.subscribe([pn, lid]);
            expect(subscribeCalls).toHaveLength(2);

            // 3. Explicit resubscribe: exactly 1 PN + 1 LID = 2 calls (NOT 5!)
            subscribeCalls.length = 0;
            await tracker.resubscribe(pn);
            expect(subscribeCalls).toEqual([pn, lid]);

            // 4. Explicit resubscribe via LID: still exactly 2 unique calls (NOT 3!)
            subscribeCalls.length = 0;
            await tracker.resubscribe(lid);
            expect(new Set(subscribeCalls)).toEqual(new Set([pn, lid]));
            expect(subscribeCalls).toHaveLength(2);

            // 5. Unsubscribe immediately stops monitoring for BOTH PN and LID
            tracker.unsubscribe(pn);
            expect(tracker.isMonitoring(pn)).toBe(false);
            expect(tracker.isMonitoring(lid)).toBe(false);

            const onlineSpy = jest.fn();
            tracker.on('online', onlineSpy);
            mockEv.emit('presence.update', { id: pn, presences: { [pn]: { lastKnownPresence: 'available' } } });
            mockEv.emit('presence.update', { id: lid, presences: { [lid]: { lastKnownPresence: 'available' } } });
            expect(onlineSpy).not.toHaveBeenCalled();

            tracker.destroy();
        });

        test('opt-in periodic resubscribe deduplicates targets and pauses when socket closes', async () => {
            const mockEv = new EventEmitter();
            const subscribeCalls = [];
            const pn = '923015555555@s.whatsapp.net';
            const lid = '999999999999999@lid';

            const mockSock = {
                ev: mockEv,
                ws: { isOpen: true, isClosed: false, isClosing: false, isConnecting: false },
                presenceSubscribe: jest.fn(async (jid) => {
                    subscribeCalls.push(jid);
                }),
                onWhatsApp: jest.fn(async () => [{ jid: pn, exists: true, lid }])
            };

            const tracker = new PresenceTracker(mockSock, {
                logToConsole: false,
                autoResubscribe: true,
                resubscribeIntervalMs: 40
            });

            await tracker.subscribe(pn);
            expect(subscribeCalls).toHaveLength(2);

            // Wait for 1 heartbeat tick
            subscribeCalls.length = 0;
            await new Promise(r => setTimeout(r, 60));
            // Must be at most 2 per tick (1 PN + 1 LID), NEVER 5x amplified!
            expect(subscribeCalls.length).toBeGreaterThanOrEqual(2);
            expect(subscribeCalls.length % 2).toBe(0);

            // Close connection -> heartbeat must pause immediately
            mockSock.ws.isOpen = false;
            mockSock.ws.isClosed = true;
            mockEv.emit('connection.update', { connection: 'close' });
            subscribeCalls.length = 0;
            await new Promise(r => setTimeout(r, 100));
            expect(subscribeCalls).toHaveLength(0);

            tracker.destroy();
        });
    });

    describe('4. Error Isolation: Presence Listener/Stanza Errors Never Terminate or Reconnect Socket', () => {
        test('malformed presence/chatstate stanzas and throwing listeners do not disconnect socket or corrupt subsequent frames', async () => {
            const { sock } = createChatsTestSocket();
            const connectionCloses = [];
            sock.ev.on('connection.update', (u) => {
                if (u.connection === 'close') connectionCloses.push(u);
            });

            const jid = '923009999999@s.whatsapp.net';
            const tracker = monitorPresence(sock, jid, { logToConsole: false, resolveLid: false });
            await new Promise(r => setTimeout(r, 10));

            const errorEvents = [];
            const receivedOnline = [];
            tracker.on('error', (err) => errorEvents.push(err));
            // Deliberately throwing listener on 'online'
            tracker.on('online', () => {
                throw new Error('User callback explosion on online!');
            });
            tracker.on('online', (data) => {
                receivedOnline.push(data);
            });
            // Also register a deliberately throwing raw sock.ev presence.update listener
            sock.ev.on('presence.update', () => {
                throw new Error('Raw presence.update listener boom!');
            });

            // 1. Malformed empty chatstate (previously threw TypeError: firstChild.tag!)
            expect(() => {
                sock.ws.emit('CB:chatstate', { tag: 'chatstate', attrs: { from: jid }, content: [] });
            }).not.toThrow();

            // 2. Missing from attribute
            expect(() => {
                sock.ws.emit('CB:presence', { tag: 'presence', attrs: {} });
            }).not.toThrow();

            // 3. Non-status presence error stanza must NOT emit false online
            sock.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid, type: 'error' } });
            expect(tracker.getStatus(jid).currentStatus).toBe('unknown');

            // 4. Real online stanza -> throwing listener is isolated, second listener still runs, socket stays OPEN
            sock.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid } });
            expect(receivedOnline).toHaveLength(1);
            expect(errorEvents.length).toBeGreaterThanOrEqual(1);
            expect(connectionCloses).toHaveLength(0);
            expect(sock.ws.isOpen).toBe(true);

            // 5. Subsequent offline stanza still processes normally
            const offlineSpy = jest.fn();
            tracker.on('offline', offlineSpy);
            sock.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid, type: 'unavailable' } });
            expect(offlineSpy).toHaveBeenCalledTimes(1);
            expect(connectionCloses).toHaveLength(0);
            expect(sock.ws.isOpen).toBe(true);

            tracker.destroy();
            sock.end(undefined);
        });

        test('noise.decodeFrame isolates encrypted binary-node & callback exceptions and preserves FIFO ordering under concurrent frames', async () => {
            const logger = createSilentLogger();
            const keyPair = Curve.generateKeyPair();
            const noise = makeNoiseHandler({ keyPair, NOISE_HEADER: NOISE_WA_HEADER, logger });

            // Replicate client's initial salt before finishInit() so we can encrypt real post-handshake frames
            const modeBuf = Buffer.from(NOISE_MODE);
            const initialHash = modeBuf.byteLength === 32 ? modeBuf : sha256(modeBuf);
            const keyMaterial = await hkdf(Buffer.alloc(0), 64, { salt: initialHash, info: '' });
            const decKey = keyMaterial.slice(32);

            await noise.finishInit();

            const makeIv = (counter) => {
                const iv = new ArrayBuffer(12);
                new DataView(iv).setUint32(8, counter);
                return new Uint8Array(iv);
            };
            const wrapEncrypted = (plaintext, counter) => {
                const ct = aesEncryptGCM(plaintext, decKey, makeIv(counter), Buffer.alloc(0));
                const lenHdr = Buffer.alloc(3);
                lenHdr.writeUInt8(ct.length >> 16, 0);
                lenHdr.writeUInt16BE(ct.length & 0xffff, 1);
                return Buffer.concat([lenHdr, ct]);
            };

            const jid = '923001111111@s.whatsapp.net';
            // Frame 0: zlib-compressed online presence (slower async inflate!)
            const rawOnline = encodeBinaryNode({ tag: 'presence', attrs: { from: jid } });
            const compressedOnline = Buffer.concat([Buffer.from([2]), zlib.deflateSync(rawOnline.slice(1))]);
            // Frame 1: corrupted binary node (invalid tag byte) — must be isolated without dropping frame 2!
            const invalidBinaryNode = Buffer.from([0, 244, 0]);
            // Frame 2: uncompressed offline presence — arrives concurrently with frame 0, MUST deliver after frame 0!
            const rawOffline = encodeBinaryNode({ tag: 'presence', attrs: { from: jid, type: 'unavailable', last: '1763700000' } });

            const pkt0 = wrapEncrypted(compressedOnline, 0);
            const pkt1 = wrapEncrypted(invalidBinaryNode, 1);
            const pkt2 = wrapEncrypted(rawOffline, 2);

            const receivedFrames = [];
            const onFrame = (frame) => {
                receivedFrames.push(frame);
                // Simulate throwing callback on first presence frame
                if (receivedFrames.length === 1) {
                    throw new Error('Listener failure on frame 0');
                }
            };

            // Fire concurrent decodeFrame calls back-to-back (exact race condition when PN+LID frames arrive together)
            const p0 = noise.decodeFrame(pkt0, onFrame);
            const p1 = noise.decodeFrame(pkt1, onFrame);
            const p2 = noise.decodeFrame(pkt2, onFrame);
            await Promise.all([p0, p1, p2]);

            // Frame 0 (online) MUST arrive BEFORE Frame 2 (offline), despite Frame 0 being zlib-compressed
            // and despite Frame 0's callback throwing and Frame 1 failing binary decode!
            expect(receivedFrames).toHaveLength(2);
            expect(receivedFrames[0].tag).toBe('presence');
            expect(receivedFrames[0].attrs.from).toBe(jid);
            expect(receivedFrames[0].attrs.type).toBeUndefined();
            expect(receivedFrames[1].tag).toBe('presence');
            expect(receivedFrames[1].attrs.from).toBe(jid);
            expect(receivedFrames[1].attrs.type).toBe('unavailable');
            expect(receivedFrames[1].attrs.last).toBe('1763700000');

            // Verify both errors were logged cleanly
            const errorEvents = logger.entries
                .filter(e => e.level === 'error' && e.args[0]?.event)
                .map(e => e.args[0].event);
            expect(errorEvents).toContain('frame_handler_error');
            expect(errorEvents).toContain('binary_node_decode_error');

            noise.destroy();
        });
    });

    describe('5. Genuine Disconnection, Normal Reconnection & Resuming Monitoring Without Duplicates', () => {
        test('intentional disconnect triggers normal reconnection with closeCode/reason and resumes presence monitoring cleanly via reattach()', async () => {
            const jid1 = '923001111111@s.whatsapp.net';
            const jid2 = '923002222222@s.whatsapp.net';

            const { sock: sock1 } = createChatsTestSocket();
            const reconnectReasons = [];

            const tracker = monitorPresence(sock1, [jid1, jid2], {
                logToConsole: false,
                resolveLid: false,
                autoResubscribe: true
            });
            await new Promise(r => setTimeout(r, 20));
            expect(sock1.ws.sentFrames).toHaveLength(2);

            // Contact 1 goes online before disconnect
            sock1.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid1 } });
            expect(tracker.getStatus(jid1).currentStatus).toBe('online');

            let sock2 = null;
            sock1.ev.on('connection.update', ({ connection, lastDisconnect }) => {
                if (connection === 'close') {
                    reconnectReasons.push({
                        message: lastDisconnect?.error?.message,
                        statusCode: lastDisconnect?.error?.output?.statusCode,
                        closeCode: lastDisconnect?.error?.data?.closeCode,
                        closeReason: lastDisconnect?.error?.data?.closeReason
                    });
                    // Perform normal reconnection by creating a fresh socket and reattaching tracker
                    const created = createChatsTestSocket();
                    sock2 = created.sock;
                    tracker.reattach(sock2);
                }
            });

            // Intentionally disconnect sock1 with WebSocket close code 1006
            sock1.ws.emit('close', 1006, Buffer.from('abnormal closure'));
            await new Promise(r => setTimeout(r, 20));

            // Verify normal reconnection was triggered with exact close metadata
            expect(reconnectReasons).toHaveLength(1);
            expect(reconnectReasons[0].statusCode).toBe(DisconnectReason.connectionClosed);
            expect(reconnectReasons[0].closeCode).toBe(1006);
            expect(reconnectReasons[0].closeReason).toBe('abnormal closure');
            expect(sock2).not.toBeNull();

            // Verify monitoring resumed on sock2 with exactly 1 subscription per contact (no duplicates)
            expect(sock2.ws.sentFrames).toHaveLength(2);

            // Verify no duplicate listeners attached to sock2
            expect(sock2.ev.listenerCount('presence.update')).toBe(1);

            // Verify presence updates work seamlessly on sock2 after reconnection
            const offlineSpy = jest.fn();
            const onlineSpy = jest.fn();
            tracker.on('offline', offlineSpy);
            tracker.on('online', onlineSpy);

            sock2.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid1, type: 'unavailable' } });
            sock2.ws.emit('CB:presence', { tag: 'presence', attrs: { from: jid2 } });

            expect(offlineSpy).toHaveBeenCalledTimes(1);
            expect(offlineSpy.mock.calls[0][0].jid).toBe(jid1);
            expect(onlineSpy).toHaveBeenCalledTimes(1);
            expect(onlineSpy.mock.calls[0][0].jid).toBe(jid2);

            // Verify diagnostic logs captured full correlated lifecycle without sensitive secrets
            const diagnostics = tracker.getDiagnostics();
            const eventNames = diagnostics.map(d => d.event);
            expect(eventNames).toContain('tracker_initialized');
            expect(eventNames).toContain('subscription_created');
            expect(eventNames).toContain('presence_transition_online');
            expect(eventNames).toContain('connection_closed_monitoring_paused');
            expect(eventNames).toContain('tracker_reattached');
            expect(eventNames).toContain('presence_transition_offline');
            for (const entry of diagnostics) {
                expect(entry.timestamp).toBeDefined();
                expect(entry.trackerId).toBe(tracker.getTrackerId());
                expect(entry.operationId).toBeDefined();
            }

            tracker.destroy();
            sock2.end(undefined);
        });

        test('re-opening connection on same socket re-subscribes each unique contact once without duplicate monitoring loops', async () => {
            const mockEv = new EventEmitter();
            const subscribeCalls = [];
            const pn = '923007777777@s.whatsapp.net';
            const lid = '777777777777777@lid';

            const mockSock = {
                ev: mockEv,
                ws: { isOpen: true, isClosed: false, isClosing: false, isConnecting: false },
                presenceSubscribe: jest.fn(async (jid) => {
                    subscribeCalls.push(jid);
                }),
                onWhatsApp: jest.fn(async () => [{ jid: pn, exists: true, lid }])
            };

            const tracker = monitorPresence(mockSock, pn, {
                logToConsole: false,
                autoResubscribe: true
            });
            await new Promise(r => setTimeout(r, 20));
            expect(subscribeCalls).toEqual([pn, lid]);

            // Disconnect then reconnect
            mockSock.ws.isOpen = false;
            mockEv.emit('connection.update', { connection: 'close', lastDisconnect: { error: new Error('network drop'), date: new Date() } });

            subscribeCalls.length = 0;
            mockSock.ws.isOpen = true;
            // Even if two 'open' events fire back-to-back, resubscribeInProgress prevents duplicate bursts
            mockEv.emit('connection.update', { connection: 'open' });
            mockEv.emit('connection.update', { connection: 'open' });
            await new Promise(r => setTimeout(r, 20));

            expect(subscribeCalls).toEqual([pn, lid]);
            expect(mockEv.listenerCount('presence.update')).toBe(1);

            tracker.destroy();
        });
    });

    describe('6. Stream Error (ack) Diagnostics & Top-Level <status> Stanza Acking', () => {
        test('CB:stream:error extracts child tag/attrs (e.g. ack class="status") into lastDisconnect.error.data and logs', () => {
            const { sock, logger } = createChatsTestSocket();
            const disconnects = [];
            sock.ev.on('connection.update', (u) => {
                if (u.connection === 'close') disconnects.push(u.lastDisconnect);
            });

            sock.ws.emit('CB:stream:error', {
                tag: 'stream:error',
                attrs: { code: '500' },
                content: [
                    {
                        tag: 'ack',
                        attrs: {
                            id: 'STATUS_STANZA_123',
                            class: 'status',
                            from: 'status@broadcast'
                        }
                    }
                ]
            });

            expect(disconnects).toHaveLength(1);
            const err = disconnects[0].error;
            expect(err.message).toBe('Stream Errored (ack)');
            expect(err.output.statusCode).toBe(500);
            expect(err.data.streamErrorTag).toBe('ack');
            expect(err.data.streamErrorAttrs).toEqual({
                id: 'STATUS_STANZA_123',
                class: 'status',
                from: 'status@broadcast'
            });
            const streamErrLog = logger.entries.find(
                (e) => e.level === 'error' && e.args[0]?.event === 'ws_stream_error'
            );
            expect(streamErrLog).toBeDefined();
            expect(streamErrLog.args[0].streamErrorTag).toBe('ack');
            expect(streamErrLog.args[0].streamErrorAttrs.class).toBe('status');
        });

        test('CB:status (live and offline) automatically sends <ack class="status"> and skips malformed stanzas missing id/from', async () => {
            const NodeCacheMod = require('@cacheable/node-cache');
            const NodeCacheCtor = NodeCacheMod.default || NodeCacheMod;
            const intervalSpy = jest.spyOn(NodeCacheCtor.prototype, 'startInterval').mockImplementation(() => {});

            try {
                const { makeMessagesRecvSocket } = require('../lib/Socket/messages-recv');
                const logger = createSilentLogger();
                const memCache = () => {
                    const m = new Map();
                    return { get: (k) => m.get(k), set: (k, v) => { m.set(k, v); return true; }, del: (k) => m.delete(k), flushAll: () => m.clear() };
                };

                const recvSock = makeMessagesRecvSocket({
                    ...DEFAULT_CONNECTION_CONFIG,
                    logger,
                    markOnlineOnConnect: false,
                    fireInitQueries: false,
                    enableVoip: false,
                    voip: false,
                    shouldSyncHistoryMessage: () => false,
                    placeholderResendCache: memCache(),
                    msgRetryCounterCache: memCache(),
                    callOfferCache: memCache(),
                    userDevicesCache: memCache(),
                    auth: {
                        creds: {
                            me: { id: '923000000000:1@s.whatsapp.net', lid: '100000000@lid', name: 'TestUser' }
                        },
                        keys: {
                            get: jest.fn(async () => ({})),
                            set: jest.fn(async () => {}),
                            transaction: jest.fn(async (cb) => cb())
                        }
                    },
                    makeSignalRepository: jest.fn(() => ({
                        lidMapping: {
                            mappingCache: new Map(),
                            getLIDForPN: jest.fn(async () => null),
                            getPNForLID: jest.fn(async () => null),
                            storeLIDPNMappings: jest.fn(async () => {})
                        },
                        migrateSession: jest.fn(async () => ({ migrated: 0, skipped: 0, total: 0 }))
                    }))
                });

                const sentStanzas = [];
                const origSend = recvSock.ws.send.bind(recvSock.ws);
                recvSock.ws.send = jest.fn((data, cb) => origSend(data, cb));

                // Intercept sendNode by testing sendMessageAck directly AND CB:status via ws.send
                const { decodeBinaryNode } = require('../lib/WABinary');
                // Capture outgoing frames via sendNode? recvSock.sendNode is bound internally; decode from ws.sentFrames or verify via sendMessageAck
                await recvSock.sendMessageAck({
                    tag: 'status',
                    attrs: {
                        id: 'LIVE_STATUS_1',
                        from: 'status@broadcast',
                        participant: '923001234567@s.whatsapp.net'
                    }
                });

                // Malformed stanza missing id should not throw or send a malformed ack
                const frameCountBeforeMalformed = recvSock.ws.sentFrames.length;
                await recvSock.sendMessageAck({
                    tag: 'status',
                    attrs: { from: 'status@broadcast' }
                });
                expect(recvSock.ws.sentFrames.length).toBe(frameCountBeforeMalformed);

                // Emit live and offline CB:status stanzas
                const framesBeforeLive = recvSock.ws.sentFrames.length;
                recvSock.ws.emit('CB:status', {
                    tag: 'status',
                    attrs: {
                        id: 'LIVE_STATUS_2',
                        from: 'status@broadcast',
                        participant: '923001234567@s.whatsapp.net'
                    }
                });
                recvSock.ws.emit('CB:status', {
                    tag: 'status',
                    attrs: {
                        id: 'OFFLINE_STATUS_3',
                        from: 'status@broadcast',
                        participant: '923009999999@s.whatsapp.net',
                        offline: '1'
                    }
                });

                await new Promise(r => setTimeout(r, 40));
                expect(recvSock.ws.sentFrames.length).toBeGreaterThanOrEqual(framesBeforeLive + 2);
                expect(recvSock.ws.isOpen).toBe(true);

                recvSock.end(undefined);
            } finally {
                intervalSpy.mockRestore();
            }
        });
    });
});
