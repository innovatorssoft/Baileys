"use strict";

const EventEmitter = require('events');

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

const { proto } = require('../WAProto');
const { DEFAULT_CONNECTION_CONFIG } = require('../lib/Defaults');
const { processSyncAction } = require('../lib/Utils/chat-utils');
const { processMessage } = require('../lib/Utils/process-message');
const { makeChatsSocket } = require('../lib/Socket/chats');
const { monitorPresence } = require('../lib/Utils/presence-tracker');

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

function createMemCache() {
    const map = new Map();
    return {
        get: (k) => map.get(k),
        set: (k, v) => { map.set(k, v); return true; },
        del: (k) => map.delete(k),
        flushAll: () => map.clear()
    };
}

function createChatsTestSocket(overrides = {}) {
    const logger = overrides.logger || createSilentLogger();
    const keyStoreData = {
        tctoken: {},
        'lid-mapping': {},
        ...(overrides.keyStoreData || {})
    };
    const mockLidMapping = {
        mappingCache: new Map(overrides.lidCacheEntries || []),
        getLIDForPN: jest.fn(async (pn) => overrides.lidMap?.[pn] || null),
        getPNForLID: jest.fn(async (lid) => {
            if (overrides.pnMap?.[lid]) return overrides.pnMap[lid];
            const user = String(lid).split('@')[0].split(':')[0];
            const rev = keyStoreData['lid-mapping']?.[`${user}_reverse`];
            return rev ? `${rev}@s.whatsapp.net` : null;
        }),
        storeLIDPNMappings: jest.fn(async (pairs) => {
            for (const { lid, pn } of pairs || []) {
                const lidUser = String(lid).split('@')[0].split(':')[0];
                const pnUser = String(pn).split('@')[0].split(':')[0];
                if (lidUser && pnUser) {
                    mockLidMapping.mappingCache.set(`lid:${lidUser}`, pnUser);
                    mockLidMapping.mappingCache.set(`pn:${pnUser}`, lidUser);
                    keyStoreData['lid-mapping'][pnUser] = lidUser;
                    keyStoreData['lid-mapping'][`${lidUser}_reverse`] = pnUser;
                }
            }
        })
    };

    const config = {
        ...DEFAULT_CONNECTION_CONFIG,
        logger,
        markOnlineOnConnect: false,
        fireInitQueries: false,
        enableVoip: false,
        voip: false,
        shouldSyncHistoryMessage: () => false,
        placeholderResendCache: createMemCache(),
        msgRetryCounterCache: createMemCache(),
        callOfferCache: createMemCache(),
        userDevicesCache: createMemCache(),
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
                set: jest.fn(async (data) => {
                    for (const [category, entries] of Object.entries(data || {})) {
                        if (!keyStoreData[category]) keyStoreData[category] = {};
                        Object.assign(keyStoreData[category], entries);
                    }
                }),
                transaction: jest.fn(async (cb) => cb())
            }
        },
        makeSignalRepository: jest.fn(() => ({
            lidMapping: mockLidMapping,
            migrateSession: jest.fn(async () => ({ migrated: 0, skipped: 0, total: 0 }))
        }))
    };

    const sock = makeChatsSocket(config);
    return { sock, logger, mockLidMapping, keyStoreData };
}

function findLogs(logger, eventName) {
    return logger.entries.filter((e) => e.args[0] && e.args[0].event === eventName);
}

describe('Locked Chats vs Regular Chats Presence Subscription Suite', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('1. Chat Lock App-State Sync Action Parsing (LockChatAction)', () => {
        test('processSyncAction parses lockChatAction (locked=true and locked=false) and emits chats.lock + chats.update', () => {
            const ev = new EventEmitter();
            const logger = createSilentLogger();
            const lockEvents = [];
            const chatUpdates = [];
            ev.on('chats.lock', (e) => lockEvents.push(e));
            ev.on('chats.update', (u) => chatUpdates.push(u));

            const jid = '923001234567@s.whatsapp.net';

            // Verify WAProto round-trip encoding uses lockChatAction
            const rawLockValue = proto.SyncActionValue.decode(
                proto.SyncActionValue.encode({ lockChatAction: { locked: true } }).finish()
            );
            processSyncAction(
                { syncAction: { value: rawLockValue }, index: ['lock', jid] },
                ev,
                { id: '923000000000@s.whatsapp.net', name: 'Me' },
                undefined,
                logger
            );

            const rawUnlockValue = proto.SyncActionValue.decode(
                proto.SyncActionValue.encode({ lockChatAction: { locked: false } }).finish()
            );
            processSyncAction(
                { syncAction: { value: rawUnlockValue }, index: ['lock', jid] },
                ev,
                { id: '923000000000@s.whatsapp.net', name: 'Me' },
                undefined,
                logger
            );

            expect(lockEvents).toEqual([
                { id: jid, locked: true },
                { id: jid, locked: false }
            ]);
            expect(chatUpdates).toEqual([
                [{ id: jid, locked: true }],
                [{ id: jid, locked: false }]
            ]);
            expect(logger.entries.filter((e) => e.args[1] === 'unprocessable update')).toHaveLength(0);
        });
    });

    describe('2. Normalized & Dual-Indexed tcToken Storage (History Sync + privacy_token)', () => {
        test('processMessage stores HistorySync tcToken under normalized c.id, pnJid, and lidJid', async () => {
            const zlib = require('zlib');
            const ev = new EventEmitter();
            const logger = createSilentLogger();
            const storedTokens = {};
            const keyStore = {
                get: jest.fn(async () => ({})),
                set: jest.fn(async (data) => {
                    if (data?.tctoken) Object.assign(storedTokens, data.tctoken);
                }),
                transaction: jest.fn(async (cb) => cb())
            };

            const tokenBuf = Buffer.from([9, 8, 7, 6, 5, 4]);
            const histProto = proto.HistorySync.encode({
                syncType: proto.HistorySync.HistorySyncType.INITIAL_BOOTSTRAP,
                conversations: [
                    {
                        id: '923005551234:0@s.whatsapp.net',
                        pnJid: '923005551234@s.whatsapp.net',
                        lidJid: '555123400000001:0@lid',
                        tcToken: tokenBuf,
                        tcTokenTimestamp: 1763800000
                    }
                ]
            }).finish();
            const compressed = zlib.deflateSync(histProto);

            await processMessage(
                {
                    key: { remoteJid: '923000000000@s.whatsapp.net', id: 'HIST_1', fromMe: true },
                    messageTimestamp: 1763800000,
                    message: {
                        protocolMessage: {
                            type: proto.Message.ProtocolMessage.Type.HISTORY_SYNC_NOTIFICATION,
                            historySyncNotification: {
                                syncType: proto.HistorySync.HistorySyncType.INITIAL_BOOTSTRAP,
                                initialHistBootstrapInlinePayload: compressed
                            }
                        }
                    }
                },
                {
                    shouldProcessHistoryMsg: true,
                    signalRepository: {
                        lidMapping: { storeLIDPNMappings: jest.fn(async () => {}) }
                    },
                    ev,
                    creds: {
                        me: { id: '923000000000:1@s.whatsapp.net', lid: '100000000@lid' },
                        processedHistoryMessages: []
                    },
                    keyStore,
                    logger,
                    options: {}
                }
            );

            expect(storedTokens['923005551234@s.whatsapp.net']?.token).toEqual(tokenBuf);
            expect(storedTokens['555123400000001@lid']?.token).toEqual(tokenBuf);
        });

        test('privacy_token notification persists normalized tcToken under both LID and mapped PN', async () => {
            const NodeCacheMod = require('@cacheable/node-cache');
            const NodeCacheCtor = NodeCacheMod.default || NodeCacheMod;
            const intervalSpy = jest.spyOn(NodeCacheCtor.prototype, 'startInterval').mockImplementation(() => {});

            try {
                const { makeMessagesRecvSocket } = require('../lib/Socket/messages-recv');
                const logger = createSilentLogger();
                const tctokenStore = {};
                const lid = '777888999000111@lid';
                const pn = '923007778889@s.whatsapp.net';

                const sock = makeMessagesRecvSocket({
                    ...DEFAULT_CONNECTION_CONFIG,
                    logger,
                    markOnlineOnConnect: false,
                    fireInitQueries: false,
                    enableVoip: false,
                    voip: false,
                    shouldSyncHistoryMessage: () => false,
                    placeholderResendCache: createMemCache(),
                    msgRetryCounterCache: createMemCache(),
                    callOfferCache: createMemCache(),
                    userDevicesCache: createMemCache(),
                    auth: {
                        creds: {
                            me: { id: '923000000000:1@s.whatsapp.net', lid: '100000000@lid', name: 'TestUser' }
                        },
                        keys: {
                            get: jest.fn(async (type, ids) => {
                                const out = {};
                                if (type === 'lid-mapping') {
                                    for (const id of ids) {
                                        if (id === '777888999000111_reverse') out[id] = '923007778889';
                                    }
                                } else if (type === 'tctoken') {
                                    for (const id of ids) {
                                        if (tctokenStore[id]) out[id] = tctokenStore[id];
                                    }
                                }
                                return out;
                            }),
                            set: jest.fn(async (data) => {
                                if (data?.tctoken) Object.assign(tctokenStore, data.tctoken);
                            }),
                            transaction: jest.fn(async (cb) => cb())
                        }
                    },
                    makeSignalRepository: jest.fn(() => ({
                        lidMapping: {
                            mappingCache: new Map([
                                ['lid:777888999000111', '923007778889'],
                                ['pn:923007778889', '777888999000111']
                            ]),
                            getLIDForPN: jest.fn(async () => `${lid}`),
                            getPNForLID: jest.fn(async () => `${pn}`),
                            storeLIDPNMappings: jest.fn(async () => {})
                        },
                        migrateSession: jest.fn(async () => ({ migrated: 0, skipped: 0, total: 0 }))
                    }))
                });

                const tokenBuf = Buffer.from([10, 20, 30, 40]);
                sock.ws.emit('CB:notification', {
                    tag: 'notification',
                    attrs: {
                        id: 'PRIV_NOTIF_1',
                        from: 's.whatsapp.net',
                        type: 'privacy_token',
                        t: '1763800100'
                    },
                    content: [
                        {
                            tag: 'tokens',
                            attrs: {},
                            content: [
                                {
                                    tag: 'token',
                                    attrs: { jid: '777888999000111:0@lid', type: 'trusted_contact', t: '1763800100' },
                                    content: tokenBuf
                                }
                            ]
                        }
                    ]
                });

                await new Promise((r) => setTimeout(r, 30));

                expect(tctokenStore[lid]?.token).toEqual(tokenBuf);
                expect(tctokenStore[pn]?.token).toEqual(tokenBuf);

                // Even if subscribing by PN later, presenceSubscribe finds the LID/PN tcToken!
                const sentBefore = sock.ws.sentFrames.length;
                await sock.presenceSubscribe(pn);
                expect(sock.ws.sentFrames.length).toBe(sentBefore + 1);
                expect(sock.ws.sentFrames[sentBefore].includes(tokenBuf)).toBe(true);

                sock.end(undefined);
            } finally {
                intervalSpy.mockRestore();
            }
        });
    });

    describe('3. Side-by-Side Comparison: Regular Contact vs Locked Contact in chats.js', () => {
        test('regular chat attaches tcToken and receives presence while locked chat logs missing tcToken, ack error, server error, and last=deny without disconnect', async () => {
            const regularPn = '923001111111@s.whatsapp.net';
            const regularLid = '111111111111111@lid';
            const regularToken = Buffer.from([1, 3, 5, 7, 9]);

            const lockedPn = '923002222222@s.whatsapp.net';
            const lockedLid = '222222222222222@lid';

            const { sock, logger, keyStoreData } = createChatsTestSocket({
                keyStoreData: {
                    tctoken: {
                        [regularPn]: { token: regularToken, timestamp: '1763800000' }
                    }
                },
                lidCacheEntries: [
                    ['pn:923001111111', '111111111111111'],
                    ['lid:111111111111111', '923001111111'],
                    ['pn:923002222222', '222222222222222'],
                    ['lid:222222222222222', '923002222222']
                ]
            });

            const disconnectSpy = jest.fn();
            sock.ev.on('connection.update', (u) => {
                if (u.connection === 'close') disconnectSpy(u);
            });

            // Mark lockedPn as locked via chats.lock event (as emitted by lockChatAction)
            sock.ev.emit('chats.lock', { id: lockedPn, locked: true });
            expect(sock.isChatLocked(regularPn)).toBe(false);
            expect(sock.isChatLocked(lockedPn)).toBe(true);
            expect(sock.isChatLocked(lockedLid)).toBe(true);

            // --- Regular contact subscription ---
            await sock.presenceSubscribe(regularPn);
            const regularReqLog = findLogs(logger, 'presence_subscribe_request')
                .find((l) => l.args[0].targetJid === regularPn);
            expect(regularReqLog).toBeDefined();
            expect(regularReqLog.args[0].isLocked).toBe(false);
            expect(regularReqLog.args[0].hasTcToken).toBe(true);
            expect(regularReqLog.args[0].tcTokenSource).toBe('stored_exact');
            expect(regularReqLog.args[0].missingTcTokenWarning).toBe(false);
            expect(regularReqLog.args[0].payloadStructure.childTags).toEqual(['tctoken']);
            expect(sock.ws.sentFrames[0].includes(regularToken)).toBe(true);

            // Simulate server positive ack for regular subscription
            sock.ws.emit('CB:ack,class:presence', {
                tag: 'ack',
                attrs: {
                    id: regularReqLog.args[0].stanzaId,
                    class: 'presence',
                    from: regularPn
                }
            });
            const ackOkLogs = findLogs(logger, 'presence_subscribe_ack_ok');
            expect(ackOkLogs).toHaveLength(1);
            expect(ackOkLogs[0].args[0].isLocked).toBe(false);

            // --- Locked contact subscription (no tcToken synced due to Chat Lock) ---
            await sock.presenceSubscribe(lockedPn);
            const lockedReqLog = findLogs(logger, 'presence_subscribe_request')
                .find((l) => l.args[0].targetJid === lockedPn);
            expect(lockedReqLog).toBeDefined();
            expect(lockedReqLog.level).toBe('info');
            expect(lockedReqLog.args[0].isLocked).toBe(true);
            expect(lockedReqLog.args[0].hasTcToken).toBe(false);
            expect(lockedReqLog.args[0].tcTokenSource).toBe('none');
            expect(lockedReqLog.args[0].missingTcTokenWarning).toBe(true);
            expect(lockedReqLog.args[0].payloadStructure.childTags).toEqual([]);

            // Simulate server rejecting locked contact subscribe via ack error="403"
            sock.ws.emit('CB:ack,class:presence', {
                tag: 'ack',
                attrs: {
                    id: lockedReqLog.args[0].stanzaId,
                    class: 'presence',
                    from: lockedPn,
                    type: 'error',
                    error: '403'
                }
            });
            const ackErrLogs = findLogs(logger, 'presence_subscribe_ack_error');
            expect(ackErrLogs).toHaveLength(1);
            expect(ackErrLogs[0].args[0].isLocked).toBe(true);
            expect(ackErrLogs[0].args[0].errorCode).toBe('403');
            expect(ackErrLogs[0].args[0].hasTcToken).toBe(false);

            // Simulate server <presence type="error"> for locked contact -> must log warning and NOT disconnect or emit online!
            const presenceUpdates = [];
            sock.ev.on('presence.update', (p) => presenceUpdates.push(p));

            sock.ws.emit('CB:presence', {
                tag: 'presence',
                attrs: { from: lockedPn, type: 'error' },
                content: [{ tag: 'error', attrs: { code: '403', text: 'not-authorized' } }]
            });
            const serverErrLogs = findLogs(logger, 'presence_server_error');
            expect(serverErrLogs).toHaveLength(1);
            expect(serverErrLogs[0].args[0].isLocked).toBe(true);
            expect(serverErrLogs[0].args[0].errCode).toBe('403');
            expect(serverErrLogs[0].args[0].errText).toBe('not-authorized');
            expect(presenceUpdates).toHaveLength(0);

            // Simulate <presence type="unavailable" last="deny" from_pn="..."> -> must flag lastDenied without throwing
            sock.ws.emit('CB:presence', {
                tag: 'presence',
                attrs: { from: lockedLid, from_pn: lockedPn, type: 'unavailable', last: 'deny' }
            });
            const recvLogs = findLogs(logger, 'presence_update_received')
                .filter((l) => l.args[0].contactJid === lockedLid);
            expect(recvLogs).toHaveLength(1);
            expect(recvLogs[0].args[0].isLocked).toBe(true);
            expect(recvLogs[0].args[0].lastDenied).toBe(true);
            expect(presenceUpdates).toHaveLength(1);
            expect(presenceUpdates[0].presences[lockedLid]).toEqual({
                lastKnownPresence: 'unavailable',
                lastSeen: undefined
            });

            // Once a tcToken arrives later for lockedLid, subscribing via lockedPn finds & attaches it
            const lateToken = Buffer.from([42, 43, 44, 45]);
            keyStoreData.tctoken[lockedLid] = { token: lateToken, timestamp: '1763800200' };
            await sock.presenceSubscribe(lockedPn);
            const secondLockedLog = findLogs(logger, 'presence_subscribe_request')
                .filter((l) => l.args[0].targetJid === lockedPn)[1];
            expect(secondLockedLog.args[0].hasTcToken).toBe(true);
            expect(secondLockedLog.args[0].tcTokenSource).toBe('stored_lid');
            expect(sock.ws.sentFrames[sock.ws.sentFrames.length - 1].includes(lateToken)).toBe(true);

            // Never leak raw tokens
            const logStr = JSON.stringify(logger.entries);
            expect(logStr).not.toContain(regularToken.toString('base64'));
            expect(logStr).not.toContain(lateToken.toString('base64'));

            // Socket stayed completely healthy
            expect(disconnectSpy).not.toHaveBeenCalled();
            expect(sock.ws.isOpen).toBe(true);

            sock.end(undefined);
        });
    });

    describe('4. PresenceTracker Bidirectional LID<->PN Resolution & Locked-Chat Recovery', () => {
        test('subscribing by @lid resolves PN via getPNForLID/onWhatsApp, tracks lock state, and recovers late LID presence updates', async () => {
            const lockedPn = '923009998887@s.whatsapp.net';
            const lockedLid = '999888777666555@lid';

            const { sock, mockLidMapping } = createChatsTestSocket();
            sock.onWhatsApp = jest.fn(async (jid) => {
                if (jid === lockedLid) {
                    return [{ jid: lockedPn, pn: lockedPn, lid: lockedLid, exists: true }];
                }
                return [{ jid: lockedPn, lid: lockedLid, exists: true }];
            });

            // Start with chat already marked locked via messaging-history.set (e.g. Conversation.locked = true)
            sock.ev.emit('messaging-history.set', {
                chats: [{ id: lockedPn, lidJid: lockedLid, locked: true }],
                contacts: [],
                messages: []
            });
            if (sock.ev.isBuffering()) sock.ev.flush();

            const subscribeSpy = jest.spyOn(sock, 'presenceSubscribe');
            const tracker = monitorPresence(sock, lockedLid, {
                logToConsole: false,
                resolveLid: true
            });

            await new Promise((r) => setTimeout(r, 30));

            // Should resolve PN, persist mapping, subscribe to BOTH LID and PN, and track isLocked
            expect(mockLidMapping.storeLIDPNMappings).toHaveBeenCalledWith([{ pn: lockedPn, lid: lockedLid }]);
            expect(subscribeSpy).toHaveBeenCalledWith(lockedLid);
            expect(subscribeSpy).toHaveBeenCalledWith(lockedPn);
            expect(tracker.getStatus(lockedLid)?.isLocked).toBe(true);
            expect(tracker.getStatus(lockedPn)?.isLocked).toBe(true);
            expect(tracker.getStatus(lockedPn)?.subscriptionState).toBe('subscribed');

            const diagEvents = tracker.getDiagnostics().map((d) => d.event);
            expect(diagEvents).toContain('pn_resolved_for_lid');

            // Late-mapping recovery test: new locked contact monitored by PN only (resolveLid=false),
            // where lidMapping learns the LID afterward without prior tracker.linkAliases
            const lockedPn2 = '923003334445@s.whatsapp.net';
            const lockedLid2 = '333444555666777@lid';
            await tracker.subscribe(lockedPn2); // Note: resolveLid is true, onWhatsApp only mocks lockedLid -> won't find lockedLid2 yet

            // Store mapping in signalRepository directly (simulating out-of-band sync/storage)
            await mockLidMapping.storeLIDPNMappings([{ pn: lockedPn2, lid: lockedLid2 }]);

            const onlineEvents = [];
            tracker.on('online', (d) => onlineEvents.push(d));

            // Presence update arrives addressed only by lockedLid2 -> recovers via mappingCache and emits online!
            sock.ws.emit('CB:presence', {
                tag: 'presence',
                attrs: { from: lockedLid2 }
            });
            if (sock.ev.isBuffering()) sock.ev.flush();

            await new Promise((r) => setTimeout(r, 20));
            expect(onlineEvents.some((e) => e.jid === lockedPn2 && e.lid === lockedLid2)).toBe(true);

            // Unlock event updates state.isLocked dynamically
            sock.ev.emit('chats.lock', { id: lockedPn, locked: false });
            expect(tracker.getStatus(lockedPn)?.isLocked).toBe(false);
            expect(tracker.getDiagnostics().map((d) => d.event)).toContain('chat_lock_state_changed');

            expect(sock.ws.isOpen).toBe(true);
            tracker.destroy();
            sock.end(undefined);
        });
    });
});
