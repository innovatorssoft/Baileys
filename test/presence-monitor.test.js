const EventEmitter = require('events')
const { PresenceMonitor, monitorPresence, formatDuration } = require('../lib/Utils/presence-monitor')

const makeMockSocket = (extra = {}) => {
    const ev = new EventEmitter()
    return {
        ev,
        presenceSubscribe: jest.fn().mockResolvedValue(undefined),
        signalRepository: {
            lidMapping: {
                getLIDForPN: jest.fn().mockResolvedValue(null),
                getPNForLID: jest.fn().mockResolvedValue(null),
                storeLIDPNMappings: jest.fn().mockResolvedValue(undefined)
            }
        },
        ...extra
    }
}

const JID_1 = '923001234567@s.whatsapp.net'
const JID_2 = '923009876543@s.whatsapp.net'
const LID_1 = '123456789012345@lid'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

describe('formatDuration', () => {
    test('zero duration', () => {
        expect(formatDuration(0)).toBe('00:00:00')
    })

    test('typical sub-hour duration', () => {
        expect(formatDuration(12 * 60 * 1000 + 13 * 1000)).toBe('00:12:13')
    })

    test('multi-hour duration does not wrap around 24h', () => {
        expect(formatDuration(27 * 3600 * 1000 + 15 * 60 * 1000 + 4 * 1000)).toBe('27:15:04')
    })

    test('negative / invalid inputs return 00:00:00 safely', () => {
        expect(formatDuration(-1000)).toBe('00:00:00')
        expect(formatDuration(NaN)).toBe('00:00:00')
        expect(formatDuration(undefined)).toBe('00:00:00')
    })
})

describe('PresenceMonitor', () => {
    describe('Test 1 — Online transition (offline → online)', () => {
        test('emits exactly one online event and records onlineAt', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1)
            await monitor.start()

            const onOnline = jest.fn()
            monitor.on('online', onOnline)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })

            expect(onOnline).toHaveBeenCalledTimes(1)
            const event = onOnline.mock.calls[0][0]
            expect(event.jid).toBe(JID_1)
            expect(event.status).toBe('online')
            expect(typeof event.onlineAt).toBe('number')
            expect(event.onlineAt).toBeGreaterThan(0)

            const state = monitor.getState(JID_1)
            expect(state.status).toBe('online')
            expect(state.onlineAt).toBe(event.onlineAt)

            monitor.stop()
        })
    })

    describe('Test 2 — Offline transition (online → offline)', () => {
        test('emits offline event + session with computed duration', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1)
            await monitor.start()

            const onOffline = jest.fn()
            const onSession = jest.fn()
            monitor.on('offline', onOffline)
            monitor.on('session', onSession)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })

            const onlineAt = monitor.getState(JID_1).onlineAt
            await sleep(50)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'unavailable' } }
            })

            expect(onOffline).toHaveBeenCalledTimes(1)
            const offlineEvent = onOffline.mock.calls[0][0]
            expect(offlineEvent.jid).toBe(JID_1)
            expect(offlineEvent.status).toBe('offline')
            expect(offlineEvent.onlineAt).toBe(onlineAt)
            expect(typeof offlineEvent.offlineAt).toBe('number')
            expect(typeof offlineEvent.durationMs).toBe('number')
            expect(offlineEvent.durationMs).toBeGreaterThanOrEqual(40)
            expect(offlineEvent.duration).toMatch(/^\d{2}:\d{2}:\d{2}$/)

            expect(onSession).toHaveBeenCalledTimes(1)
            expect(onSession.mock.calls[0][0]).toMatchObject({
                jid: JID_1,
                status: 'offline',
                onlineAt,
                durationMs: offlineEvent.durationMs,
                duration: offlineEvent.duration
            })

            const state = monitor.getState(JID_1)
            expect(state.status).toBe('offline')
            expect(state.durationMs).toBe(offlineEvent.durationMs)

            monitor.stop()
        })
    })

    describe('Test 3 — Duplicate online events are idempotent', () => {
        test('three consecutive available events = one online event, original onlineAt preserved', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1)
            await monitor.start()

            const onOnline = jest.fn()
            monitor.on('online', onOnline)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })
            const firstOnlineAt = onOnline.mock.calls[0][0].onlineAt

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'composing' } }
            })
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })

            expect(onOnline).toHaveBeenCalledTimes(1)
            expect(monitor.getState(JID_1).onlineAt).toBe(firstOnlineAt)

            monitor.stop()
        })
    })

    describe('Test 4 — Duplicate offline events are idempotent', () => {
        test('three consecutive unavailable events after online → one offline / one session', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1)
            await monitor.start()

            const onOffline = jest.fn()
            const onSession = jest.fn()
            monitor.on('offline', onOffline)
            monitor.on('session', onSession)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })
            await sleep(10)
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'unavailable' } }
            })
            const offlineAt = onOffline.mock.calls[0][0].offlineAt

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'unavailable' } }
            })
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'unavailable' } }
            })

            expect(onOffline).toHaveBeenCalledTimes(1)
            expect(onSession).toHaveBeenCalledTimes(1)
            expect(monitor.getState(JID_1).offlineAt).toBe(offlineAt)

            monitor.stop()
        })
    })

    describe('Test 5 — Offline without prior online is handled safely', () => {
        test('no duration, no fake session, no offline event', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1)
            await monitor.start()

            const onOffline = jest.fn()
            const onSession = jest.fn()
            const onOnline = jest.fn()
            monitor.on('offline', onOffline)
            monitor.on('session', onSession)
            monitor.on('online', onOnline)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'unavailable' } }
            })

            expect(onOnline).not.toHaveBeenCalled()
            expect(onOffline).not.toHaveBeenCalled()
            expect(onSession).not.toHaveBeenCalled()

            const state = monitor.getState(JID_1)
            expect(state.status).toBe('offline')
            expect(state.onlineAt).toBeNull()
            expect(state.durationMs).toBeNull()
            expect(state.duration).toBeNull()
            expect(monitor.getSession(JID_1)).toBeNull()

            monitor.stop()
        })
    })

    describe('Test 6 — Multiple sessions', () => {
        test('online→offline→online→offline produces exactly two sessions', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1)
            await monitor.start()

            const onOnline = jest.fn()
            const onOffline = jest.fn()
            const onSession = jest.fn()
            monitor.on('online', onOnline)
            monitor.on('offline', onOffline)
            monitor.on('session', onSession)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })
            await sleep(5)
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'unavailable' } }
            })
            await sleep(5)
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })
            await sleep(5)
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'unavailable' } }
            })

            expect(onOnline).toHaveBeenCalledTimes(2)
            expect(onOffline).toHaveBeenCalledTimes(2)
            expect(onSession).toHaveBeenCalledTimes(2)

            const sessions = monitor.getSessions(JID_1)
            expect(sessions).toHaveLength(2)
            expect(sessions[0].onlineAt).toBeLessThan(sessions[0].offlineAt)
            expect(sessions[1].onlineAt).toBeGreaterThan(sessions[0].offlineAt)
            expect(monitor.getSession(JID_1)).toEqual(sessions[1])

            monitor.stop()
        })
    })

    describe('Test 7 — Multiple contacts have independent state', () => {
        test('JID_1 online does not affect JID_2 state', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, [JID_1, JID_2])
            await monitor.start()

            const onlineByJid = {}
            monitor.on('online', (e) => { onlineByJid[e.jid] = (onlineByJid[e.jid] || 0) + 1 })

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })
            sock.ev.emit('presence.update', {
                id: JID_2,
                presences: { [JID_2]: { lastKnownPresence: 'unavailable' } }
            })

            expect(onlineByJid[JID_1]).toBe(1)
            expect(onlineByJid[JID_2]).toBeUndefined()

            expect(monitor.getState(JID_1).status).toBe('online')
            expect(monitor.getState(JID_2).status).toBe('offline')
            expect(monitor.getState(JID_1).onlineAt).not.toBeNull()
            expect(monitor.getState(JID_2).onlineAt).toBeNull()

            const allStates = monitor.getState()
            expect(allStates[JID_1].status).toBe('online')
            expect(allStates[JID_2].status).toBe('offline')

            monitor.stop()
        })

        test('presence event addressed to either JID updates only its own state', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, [JID_1, JID_2])
            await monitor.start()

            const onSession = jest.fn()
            monitor.on('session', onSession)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: {
                    [JID_1]: { lastKnownPresence: 'available' },
                    [JID_2]: { lastKnownPresence: 'unavailable' }
                }
            })
            await sleep(5)
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'unavailable' } }
            })

            expect(onSession).toHaveBeenCalledTimes(1)
            expect(onSession.mock.calls[0][0].jid).toBe(JID_1)
            expect(monitor.getSessions(JID_2)).toHaveLength(0)

            monitor.stop()
        })
    })

    describe('Test 8 — Reconnect does not fabricate transitions', () => {
        test('autoResubscribe=true: on connection open re-subscribes without emitting online/offline/session', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1, { autoResubscribe: true })
            await monitor.start()

            const callsBefore = sock.presenceSubscribe.mock.calls.length
            const onOnline = jest.fn()
            const onOffline = jest.fn()
            const onSession = jest.fn()
            monitor.on('online', onOnline)
            monitor.on('offline', onOffline)
            monitor.on('session', onSession)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })
            const onlineAt = monitor.getState(JID_1).onlineAt

            sock.ev.emit('connection.update', { connection: 'open' })
            await sleep(5)

            expect(sock.presenceSubscribe.mock.calls.length).toBeGreaterThan(callsBefore)
            expect(onOnline).toHaveBeenCalledTimes(1)
            expect(onOffline).not.toHaveBeenCalled()
            expect(onSession).not.toHaveBeenCalled()
            expect(monitor.getState(JID_1).onlineAt).toBe(onlineAt)

            monitor.stop()
        })

        test('autoResubscribe=false: connection open does not trigger re-subscribe', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1, { autoResubscribe: false })
            await monitor.start()

            const callsBefore = sock.presenceSubscribe.mock.calls.length
            sock.ev.emit('connection.update', { connection: 'open' })
            await sleep(5)

            expect(sock.presenceSubscribe.mock.calls.length).toBe(callsBefore)

            monitor.stop()
        })
    })

    describe('Test 9 — PN → LID fallback', () => {
        test('presenceSubscribe throws for PN → falls back to getLIDForPN and retries subscribe with LID', async () => {
            let callCount = 0
            const sock = makeMockSocket()
            sock.presenceSubscribe = jest.fn().mockImplementation(async (jid) => {
                callCount += 1
                if (jid.endsWith('@s.whatsapp.net')) {
                    throw new Error('PN subscribe failed')
                }
                return undefined
            })
            sock.signalRepository.lidMapping.getLIDForPN = jest.fn().mockResolvedValue(LID_1)

            const monitor = new PresenceMonitor(sock, JID_1)
            await expect(monitor.start()).resolves.toBeDefined()

            expect(sock.signalRepository.lidMapping.getLIDForPN).toHaveBeenCalledWith(JID_1)
            expect(callCount).toBeGreaterThanOrEqual(2)
            const subscribeArgs = sock.presenceSubscribe.mock.calls.map((c) => c[0])
            expect(subscribeArgs).toEqual(expect.arrayContaining([JID_1, LID_1]))

            sock.ev.emit('presence.update', {
                id: LID_1,
                presences: { [LID_1]: { lastKnownPresence: 'available' } }
            })
            const state = monitor.getState(JID_1)
            expect(state.status).toBe('online')

            monitor.stop()
        })

        test('lid-mapping.update event triggers re-subscribe for a PN-watched contact', async () => {
            const sock = makeMockSocket()
            const subscribed = new Set()
            sock.presenceSubscribe = jest.fn().mockImplementation(async (jid) => {
                subscribed.add(jid)
            })
            const monitor = new PresenceMonitor(sock, JID_1, { autoResubscribe: true })
            await monitor.start()
            expect(subscribed.has(JID_1)).toBe(true)

            sock.ev.emit('lid-mapping.update', { pn: JID_1, lid: LID_1 })
            await sleep(20)

            expect(subscribed.has(LID_1)).toBe(true)

            sock.ev.emit('presence.update', {
                id: LID_1,
                presences: { [LID_1]: { lastKnownPresence: 'available' } }
            })
            expect(monitor.getState(JID_1).status).toBe('online')

            monitor.stop()
        })

        test('areJidsSameUser matching: presence on alt-JID resolves back to requested JID', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1)
            await monitor.start()

            const onOnline = jest.fn()
            monitor.on('online', onOnline)

            sock.ev.emit('presence.update', {
                id: LID_1,
                presences: { [LID_1]: { lastKnownPresence: 'available' } }
            })
            expect(onOnline).not.toHaveBeenCalled()

            sock.ev.emit('lid-mapping.update', { pn: JID_1, lid: LID_1 })
            await sleep(5)

            sock.ev.emit('presence.update', {
                id: LID_1,
                presences: { [LID_1]: { lastKnownPresence: 'available' } }
            })

            expect(onOnline).toHaveBeenCalledTimes(1)
            expect(onOnline.mock.calls[0][0].jid).toBe(JID_1)

            monitor.stop()
        })
    })

    describe('Test 10 — Last seen behavior', () => {
        test('lastSeen present on underlying PresenceData → exposed on events', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1)
            await monitor.start()

            const onOnline = jest.fn()
            const onOffline = jest.fn()
            monitor.on('online', onOnline)
            monitor.on('offline', onOffline)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: {
                    [JID_1]: { lastKnownPresence: 'available', lastSeen: 1727349332 }
                }
            })
            await sleep(5)
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: {
                    [JID_1]: { lastKnownPresence: 'unavailable', lastSeen: 1727349340 }
                }
            })

            expect(onOnline.mock.calls[0][0].lastSeen).toBe(1727349332)
            expect(onOffline.mock.calls[0][0].lastSeen).toBe(1727349340)
            expect(monitor.getState(JID_1).lastSeen).toBe(1727349340)

            monitor.stop()
        })

        test('lastSeen absent → property omitted on events; never inferred from offlineAt', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1)
            await monitor.start()

            const onOnline = jest.fn()
            const onOffline = jest.fn()
            monitor.on('online', onOnline)
            monitor.on('offline', onOffline)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })
            await sleep(5)
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'unavailable' } }
            })

            expect(onOnline.mock.calls[0][0]).not.toHaveProperty('lastSeen')
            expect(onOffline.mock.calls[0][0]).not.toHaveProperty('lastSeen')
            expect(monitor.getState(JID_1).lastSeen).toBeNull()

            const session = monitor.getSession(JID_1)
            expect(session).not.toHaveProperty('lastSeen')

            monitor.stop()
        })
    })

    describe('Cleanup & misc', () => {
        test('stop() detaches listeners — further events do not change state', async () => {
            const sock = makeMockSocket()
            const monitor = new PresenceMonitor(sock, JID_1)
            await monitor.start()

            const onOnline = jest.fn()
            monitor.on('online', onOnline)

            monitor.stop()

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })

            expect(onOnline).not.toHaveBeenCalled()
            expect(monitor.getState(JID_1).status).toBe('offline')
        })

        test('monitorPresence factory wires events and begins monitoring', async () => {
            const sock = makeMockSocket()
            const monitor = monitorPresence(sock, JID_1)
            await sleep(10)

            const onOnline = jest.fn()
            monitor.on('online', onOnline)

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })

            expect(onOnline).toHaveBeenCalledTimes(1)
            expect(sock.presenceSubscribe).toHaveBeenCalled()

            monitor.stop()
        })

        test('logToConsole prints transitions (simple smoke)', async () => {
            const sock = makeMockSocket()
            const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
            const monitor = new PresenceMonitor(sock, JID_1, { logToConsole: true })
            await monitor.start()

            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'available' } }
            })
            await sleep(5)
            sock.ev.emit('presence.update', {
                id: JID_1,
                presences: { [JID_1]: { lastKnownPresence: 'unavailable' } }
            })

            const logs = logSpy.mock.calls.map((c) => c[0])
            expect(logs.some((l) => typeof l === 'string' && l.includes('ONLINE'))).toBe(true)
            expect(logs.some((l) => typeof l === 'string' && l.includes('OFFLINE'))).toBe(true)
            expect(logs.some((l) => typeof l === 'string' && l.includes('Online duration'))).toBe(true)

            logSpy.mockRestore()
            monitor.stop()
        })

        test('error listener receives subscribe errors instead of throwing', async () => {
            const sock = makeMockSocket()
            sock.presenceSubscribe = jest.fn().mockRejectedValue(new Error('boom'))
            sock.signalRepository.lidMapping.getLIDForPN = jest.fn().mockResolvedValue(null)

            const monitor = new PresenceMonitor(sock, JID_1)
            const errors = []
            monitor.on('error', (err) => errors.push(err))

            await expect(monitor.start()).resolves.toBeDefined()
            await sleep(20)

            expect(errors.length).toBeGreaterThanOrEqual(1)
            expect(errors[0]).toBeInstanceOf(Error)
            expect(errors[0].message).toBe('boom')

            monitor.stop()
        })
    })
})
