const EventEmitter = require('events')
const {
    PresenceTracker,
    PresenceMonitor,
    monitorPresence,
    createPresenceTracker,
    formatDuration,
    formatTime,
    formatDateTime,
    formatTimeAgo,
    setTimezone,
    getTimezone,
    parseTimezone,
    normalizeContactJid,
    isOnlinePresence,
    isOfflinePresence
} = require('../lib/Utils/presence-tracker')

describe('Presence Tracker & Monitor Implementation', () => {
    let mockEv
    let mockSock
    let subscribeCalls

    beforeEach(() => {
        mockEv = new EventEmitter()
        subscribeCalls = []
        mockSock = {
            ev: mockEv,
            presenceSubscribe: jest.fn(async (jid) => {
                subscribeCalls.push(jid)
            })
        }
    })

    describe('Helper Functions', () => {
        test('formatDuration should correctly format milliseconds into HH:MM:SS', () => {
            expect(formatDuration(0)).toBe('00:00:00')
            expect(formatDuration(5000)).toBe('00:00:05')
            expect(formatDuration(65000)).toBe('00:01:05')
            expect(formatDuration(3665000)).toBe('01:01:05')
            // Example from requirements: 12 minutes 13 seconds
            const twelveMins13Secs = (12 * 60 + 13) * 1000
            expect(formatDuration(twelveMins13Secs)).toBe('00:12:13')
        })

        test('normalizeContactJid should handle various JID formats', () => {
            expect(normalizeContactJid('923001234567')).toBe('923001234567@s.whatsapp.net')
            expect(normalizeContactJid('923001234567@s.whatsapp.net')).toBe('923001234567@s.whatsapp.net')
            expect(normalizeContactJid('923014434335@whatsapp.net')).toBe('923014434335@s.whatsapp.net')
            expect(normalizeContactJid('923001234567@c.us')).toBe('923001234567@s.whatsapp.net')
            expect(normalizeContactJid('923001234567:1@s.whatsapp.net')).toBe('923001234567@s.whatsapp.net')
            expect(normalizeContactJid('123456@lid')).toBe('123456@lid')
            expect(normalizeContactJid('')).toBe('')
        })

        test('isOnlinePresence and isOfflinePresence checks', () => {
            expect(isOnlinePresence('available')).toBe(true)
            expect(isOnlinePresence('composing')).toBe(true)
            expect(isOnlinePresence('recording')).toBe(true)
            expect(isOnlinePresence('paused')).toBe(true)
            expect(isOnlinePresence('unavailable')).toBe(false)

            expect(isOfflinePresence('unavailable')).toBe(true)
            expect(isOfflinePresence('available')).toBe(false)
        })

        test('formatTime and formatDateTime should format correctly with custom and dynamic timezones', () => {
            // Epoch 1790319142000 = 2026-09-25 06:52:22 UTC
            const utcEpoch = 1790319142000

            // UTC
            expect(formatTime(utcEpoch, 'UTC')).toBe('06:52:22')
            expect(formatDateTime(utcEpoch, 'UTC')).toBe('2026-09-25 06:52:22')

            // +5 / Asia/Karachi (+5 hours -> 11:52:22)
            expect(formatTime(utcEpoch, 5)).toBe('11:52:22')
            expect(formatTime(utcEpoch, '+5')).toBe('11:52:22')
            expect(formatTime(utcEpoch, '+05:00')).toBe('11:52:22')
            expect(formatTime(utcEpoch, 'Asia/Karachi')).toBe('11:52:22')
            expect(formatDateTime(utcEpoch, '+05:00')).toBe('2026-09-25 11:52:22')

            // Global setTimezone
            setTimezone('+05:00')
            expect(getTimezone()).toBe('+05:00')
            expect(formatTime(utcEpoch)).toBe('11:52:22')

            setTimezone('UTC')
            expect(formatTime(utcEpoch)).toBe('06:52:22')

            // Reset back to +05:00
            setTimezone('+05:00')
        })

        test('PresenceTracker instance should allow changing timezone dynamically', () => {
            const tracker = new PresenceTracker(mockSock, { logToConsole: false, timezone: 'UTC' })
            expect(tracker.getTimezone()).toBe('UTC')

            const utcEpoch = 1790319142000
            expect(tracker.formatTime(utcEpoch)).toBe('06:52:22')

            // Dynamically change timezone to +5
            tracker.setTimezone('+05:00')
            expect(tracker.getTimezone()).toBe('+05:00')
            expect(tracker.formatTime(utcEpoch)).toBe('11:52:22')
            expect(tracker.formatDateTime(utcEpoch)).toBe('2026-09-25 11:52:22')

            // Dynamically change timezone to Asia/Karachi
            tracker.setTimezone('Asia/Karachi')
            expect(tracker.getTimezone()).toBe('Asia/Karachi')
            expect(tracker.formatTime(utcEpoch)).toBe('11:52:22')

            tracker.destroy()
        })
    })

    describe('Single Contact Monitoring Flow', () => {
        const jid = '923001234567@s.whatsapp.net'

        test('should subscribe to contact and track online -> offline session with duration', async () => {
            const monitor = monitorPresence(mockSock, jid, { logToConsole: false })
            await new Promise(resolve => setTimeout(resolve, 10))

            expect(mockSock.presenceSubscribe).toHaveBeenCalledWith(jid)

            const onlineSpy = jest.fn()
            const offlineSpy = jest.fn()
            const sessionSpy = jest.fn()

            monitor.on('online', onlineSpy)
            monitor.on('offline', offlineSpy)
            monitor.on('session', sessionSpy)

            // Step 1: Contact comes ONLINE
            const startTime = Date.now()
            mockEv.emit('presence.update', {
                id: jid,
                presences: {
                    [jid]: { lastKnownPresence: 'available' }
                }
            })

            expect(onlineSpy).toHaveBeenCalledTimes(1)
            const onlineData = onlineSpy.mock.calls[0][0]
            expect(onlineData.jid).toBe(jid)
            expect(onlineData.status).toBe('online')
            expect(onlineData.onlineAt).toBeInstanceOf(Date)
            expect(onlineData.onlineAtFormatted).toBeUndefined()
            expect(onlineData.lastSeenFormatted).toBeUndefined()
            expect(onlineData.serverLastSeen).toBeUndefined()
            expect(onlineData.serverLastSeenTimestamp).toBeUndefined()
            expect(onlineData.serverLastSeenFormatted).toBeUndefined()
            expect(monitor.getStatus(jid).currentStatus).toBe('online')

            // Advance clock artificially for duration test
            const fakeSessionDurationMs = 12 * 60 * 1000 + 13 * 1000 // 00:12:13
            const originalSessionStart = monitor.getStatus(jid).currentSessionStart
            monitor.getStatus(jid).currentSessionStart = new Date(Date.now() - fakeSessionDurationMs)

            // Step 2: Contact goes OFFLINE
            const lastSeenSeconds = Math.floor(Date.now() / 1000)
            mockEv.emit('presence.update', {
                id: jid,
                presences: {
                    [jid]: {
                        lastKnownPresence: 'unavailable',
                        lastSeen: lastSeenSeconds
                    }
                }
            })

            expect(offlineSpy).toHaveBeenCalledTimes(1)
            const offlineData = offlineSpy.mock.calls[0][0]
            expect(offlineData.jid).toBe(jid)
            expect(offlineData.status).toBe('offline')
            expect(offlineData.onlineAt).toBeInstanceOf(Date)
            expect(offlineData.offlineAt).toBeInstanceOf(Date)
            expect(offlineData.duration).toBe('00:12:13')
            expect(offlineData.onlineAtFormatted).toBeUndefined()
            expect(offlineData.offlineAtFormatted).toBeUndefined()
            expect(offlineData.durationMs).toBeUndefined()
            expect(offlineData.session).toBeUndefined()
            expect(offlineData.lastSeenFormatted).toBeUndefined()
            expect(offlineData.serverLastSeen).toBeUndefined()
            expect(offlineData.serverLastSeenTimestamp).toBeUndefined()
            expect(offlineData.serverLastSeenFormatted).toBeUndefined()
            expect(offlineData.lastSeen).toEqual(new Date(lastSeenSeconds * 1000))

            expect(sessionSpy).toHaveBeenCalledTimes(1)
            expect(sessionSpy.mock.calls[0][0].duration).toBe('00:12:13')

            const status = monitor.getStatus(jid)
            expect(status.currentStatus).toBe('offline')
            expect(status.sessions).toHaveLength(1)
            expect(status.sessions[0].duration).toBe('00:12:13')

            monitor.destroy()
        })

        test('should prevent duplicate online events and false transitions', async () => {
            const monitor = monitorPresence(mockSock, jid, { logToConsole: false })
            await new Promise(resolve => setTimeout(resolve, 10))

            const onlineSpy = jest.fn()
            monitor.on('online', onlineSpy)

            // 1. Initial available
            mockEv.emit('presence.update', {
                id: jid,
                presences: {
                    [jid]: { lastKnownPresence: 'available' }
                }
            })
            expect(onlineSpy).toHaveBeenCalledTimes(1)
            const firstOnlineAt = monitor.getStatus(jid).currentSessionStart

            // 2. Subsequent composing while still online
            mockEv.emit('presence.update', {
                id: jid,
                presences: {
                    [jid]: { lastKnownPresence: 'composing' }
                }
            })
            // Should NOT trigger another online event
            expect(onlineSpy).toHaveBeenCalledTimes(1)
            expect(monitor.getStatus(jid).currentSessionStart).toBe(firstOnlineAt)
            expect(monitor.getStatus(jid).lastKnownPresence).toBe('composing')

            // 3. Repeated available while online
            mockEv.emit('presence.update', {
                id: jid,
                presences: {
                    [jid]: { lastKnownPresence: 'available' }
                }
            })
            expect(onlineSpy).toHaveBeenCalledTimes(1)

            monitor.destroy()
        })

        test('should prevent duplicate offline events', async () => {
            const monitor = monitorPresence(mockSock, jid, { logToConsole: false })
            await new Promise(resolve => setTimeout(resolve, 10))

            // Come online
            mockEv.emit('presence.update', {
                id: jid,
                presences: { [jid]: { lastKnownPresence: 'available' } }
            })

            const offlineSpy = jest.fn()
            monitor.on('offline', offlineSpy)

            // First unavailable
            mockEv.emit('presence.update', {
                id: jid,
                presences: { [jid]: { lastKnownPresence: 'unavailable' } }
            })
            expect(offlineSpy).toHaveBeenCalledTimes(1)

            // Duplicate unavailable
            mockEv.emit('presence.update', {
                id: jid,
                presences: { [jid]: { lastKnownPresence: 'unavailable' } }
            })
            // Should NOT trigger another offline event or add another session
            expect(offlineSpy).toHaveBeenCalledTimes(1)
            expect(monitor.getStatus(jid).sessions).toHaveLength(1)

            monitor.destroy()
        })

        test('should handle initial offline event without prior online timestamp gracefully', async () => {
            const monitor = monitorPresence(mockSock, jid, { logToConsole: false })
            await new Promise(resolve => setTimeout(resolve, 10))

            const offlineSpy = jest.fn()
            const sessionSpy = jest.fn()
            monitor.on('offline', offlineSpy)
            monitor.on('session', sessionSpy)

            const lastSeenSec = 1716000000
            // Initial offline response from server upon subscription
            mockEv.emit('presence.update', {
                id: jid,
                presences: {
                    [jid]: { lastKnownPresence: 'unavailable', lastSeen: lastSeenSec }
                }
            })

            expect(offlineSpy).toHaveBeenCalledTimes(1)
            const data = offlineSpy.mock.calls[0][0]
            expect(data.status).toBe('offline')
            expect(data.lastSeen).toEqual(new Date(lastSeenSec * 1000))
            expect(data.onlineAt).toBeUndefined()
            expect(data.duration).toBeUndefined()

            // No session should be recorded because online was never observed
            expect(sessionSpy).not.toHaveBeenCalled()
            expect(monitor.getStatus(jid).sessions).toHaveLength(0)

            monitor.destroy()
        })
    })

    describe('Multiple Contacts Monitoring', () => {
        const jid1 = '923001111111@s.whatsapp.net'
        const jid2 = '923002222222@s.whatsapp.net'

        test('should independently track multiple contacts', async () => {
            const tracker = new PresenceTracker(mockSock, { logToConsole: false })
            await tracker.subscribe([jid1, jid2])

            expect(mockSock.presenceSubscribe).toHaveBeenCalledWith(jid1)
            expect(mockSock.presenceSubscribe).toHaveBeenCalledWith(jid2)

            const onlineEvents = []
            const offlineEvents = []

            tracker.on('online', d => onlineEvents.push(d))
            tracker.on('offline', d => offlineEvents.push(d))

            // User 1 goes online
            mockEv.emit('presence.update', {
                id: jid1,
                presences: { [jid1]: { lastKnownPresence: 'available' } }
            })

            expect(tracker.getStatus(jid1).currentStatus).toBe('online')
            expect(tracker.getStatus(jid2).currentStatus).toBe('unknown')

            // User 2 goes online
            mockEv.emit('presence.update', {
                id: jid2,
                presences: { [jid2]: { lastKnownPresence: 'available' } }
            })

            expect(tracker.getStatus(jid2).currentStatus).toBe('online')
            expect(onlineEvents).toHaveLength(2)

            // User 1 goes offline
            mockEv.emit('presence.update', {
                id: jid1,
                presences: { [jid1]: { lastKnownPresence: 'unavailable' } }
            })

            expect(tracker.getStatus(jid1).currentStatus).toBe('offline')
            expect(tracker.getStatus(jid2).currentStatus).toBe('online')
            expect(offlineEvents).toHaveLength(1)
            expect(offlineEvents[0].jid).toBe(jid1)

            tracker.destroy()
        })

        test('should guarantee complete state isolation and distinct status objects across contacts', async () => {
            const tracker = new PresenceTracker(mockSock, { logToConsole: false })
            await tracker.subscribe([jid1, jid2])

            const status1 = tracker.getStatus(jid1)
            const status2 = tracker.getStatus(jid2)
            expect(status1).not.toBe(status2)
            expect(status1.jid).toBe(jid1)
            expect(status2.jid).toBe(jid2)

            const all = tracker.getAllStatuses()
            expect(all.size).toBe(2)
            expect(all.get(jid1)).toBe(status1)
            expect(all.get(jid2)).toBe(status2)

            tracker.destroy()
        })
    })

    describe('Connection Reconnect Resubscription', () => {
        const jid = '923003333333@s.whatsapp.net'

        test('should automatically re-subscribe when connection opens', async () => {
            const monitor = monitorPresence(mockSock, jid, { logToConsole: false, autoResubscribe: true })
            await new Promise(resolve => setTimeout(resolve, 10))

            expect(mockSock.presenceSubscribe).toHaveBeenCalledTimes(1)

            // Simulate socket reconnect
            mockEv.emit('connection.update', { connection: 'open' })
            await new Promise(resolve => setTimeout(resolve, 10))

            expect(mockSock.presenceSubscribe).toHaveBeenCalledTimes(2)

            monitor.destroy()
        })
    })

    describe('LID Resolution and Message Activity Tracking', () => {
        const pn = '923014434335@s.whatsapp.net'
        const lid = '174281585643715@lid'

        test('should resolve LID via onWhatsApp and map incoming presence updates from LID to PN', async () => {
            mockSock.onWhatsApp = jest.fn(async (targetJid) => [
                { jid: targetJid, exists: true, lid }
            ])

            const monitor = monitorPresence(mockSock, pn, { logToConsole: false })
            await new Promise(resolve => setTimeout(resolve, 20))

            expect(mockSock.onWhatsApp).toHaveBeenCalledWith(pn)
            expect(mockSock.presenceSubscribe).toHaveBeenCalledWith(pn)
            expect(mockSock.presenceSubscribe).toHaveBeenCalledWith(lid)

            const onlineSpy = jest.fn()
            monitor.on('online', onlineSpy)

            // WhatsApp sends presence update addressed to the LID
            mockEv.emit('presence.update', {
                id: lid,
                presences: {
                    [lid]: { lastKnownPresence: 'available' }
                }
            })

            expect(onlineSpy).toHaveBeenCalledTimes(1)
            const data = onlineSpy.mock.calls[0][0]
            expect(data.jid).toBe(pn)
            expect(data.lid).toBe(lid)
            expect(data.status).toBe('online')

            monitor.destroy()
        })

        test('should detect active presence and link LID when message is received from contact', async () => {
            const monitor = monitorPresence(mockSock, pn, { logToConsole: false, resolveLid: false })
            await new Promise(resolve => setTimeout(resolve, 10))

            const onlineSpy = jest.fn()
            monitor.on('online', onlineSpy)

            // Contact sends a message with LID as remoteJid and PN as remoteJidAlt
            mockEv.emit('messages.upsert', {
                messages: [
                    {
                        key: {
                            fromMe: false,
                            remoteJid: lid,
                            remoteJidAlt: pn
                        },
                        message: { conversation: '!hi' }
                    }
                ]
            })

            expect(onlineSpy).toHaveBeenCalledTimes(1)
            expect(monitor.getStatus(pn).currentStatus).toBe('online')
            expect(monitor.getStatus(lid).currentStatus).toBe('online')
            expect(monitor.getStatus(pn).lid).toBe(lid)

            monitor.destroy()
        })
    })

    describe('PresenceMonitor Compatibility & Extended API', () => {
        const jid1 = '923007777777@s.whatsapp.net'
        const jid2 = '923008888888@s.whatsapp.net'

        test('should instantiate PresenceMonitor as an alias to PresenceTracker with target array', async () => {
            const monitor = new PresenceMonitor(mockSock, [jid1, jid2], { logToConsole: false })
            await new Promise(resolve => setTimeout(resolve, 20))

            expect(mockSock.presenceSubscribe).toHaveBeenCalledWith(jid1)
            expect(mockSock.presenceSubscribe).toHaveBeenCalledWith(jid2)
            expect(monitor.isMonitoring(jid1)).toBe(true)
            expect(monitor.isMonitoring(jid2)).toBe(true)

            // Online transition
            mockEv.emit('presence.update', {
                id: jid1,
                presences: { [jid1]: { lastKnownPresence: 'available' } }
            })

            const state = monitor.getState(jid1)
            expect(state.currentStatus).toBe('online')
            expect(monitor.getState()[jid1].currentStatus).toBe('online')

            // Offline transition
            mockEv.emit('presence.update', {
                id: jid1,
                presences: { [jid1]: { lastKnownPresence: 'unavailable' } }
            })

            const session = monitor.getSession(jid1)
            expect(session).toBeDefined()
            expect(session.duration).toBeDefined()
            expect(monitor.getSessions(jid1)).toHaveLength(1)

            // start() compatibility
            await expect(monitor.start()).resolves.toBeUndefined()

            // unsubscribe
            monitor.unsubscribe(jid1)
            expect(monitor.isMonitoring(jid1)).toBe(false)

            // stop()
            monitor.stop()
        })

        test('should verify export from main library index', () => {
            const baileys = require('../lib/index.js')
            expect(typeof baileys.monitorPresence).toBe('function')
            expect(typeof baileys.createPresenceTracker).toBe('function')
            expect(typeof baileys.PresenceTracker).toBe('function')
            expect(typeof baileys.PresenceMonitor).toBe('function')
            expect(baileys.PresenceMonitor).toBe(baileys.PresenceTracker)
        })
    })
})
