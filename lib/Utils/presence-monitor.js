"use strict"

Object.defineProperty(exports, "__esModule", { value: true })
exports.monitorPresence = exports.PresenceMonitor = exports.formatDuration = void 0

const WABinary_1 = require("../WABinary")

const ONLINE_PRESENCES = new Set(['available', 'composing', 'recording', 'paused'])

const formatDuration = (durationMs) => {
    if (typeof durationMs !== 'number' || durationMs < 0 || !isFinite(durationMs)) {
        return '00:00:00'
    }
    const totalSeconds = Math.floor(durationMs / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    const pad = (n) => n.toString().padStart(2, '0')
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}
exports.formatDuration = formatDuration

const formatTimestamp = (timestampMs, timezone) => {
    const date = new Date(timestampMs)
    const pad = (n) => n.toString().padStart(2, '0')
    if (timezone) {
        try {
            const match = /^([+-])(\d{2}):(\d{2})$/.exec(timezone)
            if (match) {
                const sign = match[1] === '+' ? 1 : -1
                const tzHours = parseInt(match[2], 10)
                const tzMinutes = parseInt(match[3], 10)
                const offsetMs = sign * (tzHours * 3600 + tzMinutes * 60) * 1000
                const utcMs = date.getTime() + date.getTimezoneOffset() * 60000
                const localMs = utcMs + offsetMs
                const d = new Date(localMs)
                return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} ${timezone}`
            }
        } catch (_) { /* fallthrough */ }
    }
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const formatTimeOnly = (timestampMs, timezone) => {
    const full = formatTimestamp(timestampMs, timezone)
    const parts = full.split(' ')
    return parts.length >= 2 ? parts[1].split(' ')[0] : full
}

class PresenceMonitor {
    constructor(sock, targets, options = {}) {
        if (!sock || !sock.ev || typeof sock.ev.on !== 'function') {
            throw new Error('PresenceMonitor requires a socket with ev (BaileysEventEmitter)')
        }

        this.sock = sock
        this.options = {
            logToConsole: !!options.logToConsole,
            autoResubscribe: !!options.autoResubscribe,
            timezone: options.timezone || undefined,
            ...options
        }

        const rawTargets = Array.isArray(targets) ? targets.slice() : [targets]
        const normalizedRequested = new Map()
        for (const t of rawTargets) {
            if (typeof t !== 'string' || !t) continue
            const normalized = WABinary_1.jidNormalizedUser(t) || t
            normalizedRequested.set(normalized, t)
        }

        this.requestedJids = normalizedRequested

        this.states = new Map()
        this.sessions = new Map()
        this.subscribedJids = new Set()
        this.listeners = new Map()
        this.eventHandlers = new Map()
        this.started = false
        this.stopped = false
        this.pnLidPairs = new Map() // normalized pnUser → normalized lidUser (and reverse)

        for (const [internalJid] of normalizedRequested) {
            this.states.set(internalJid, {
                jid: internalJid,
                requestedJid: normalizedRequested.get(internalJid),
                status: 'offline',
                onlineAt: null,
                offlineAt: null,
                durationMs: null,
                lastSeen: null
            })
            this.sessions.set(internalJid, [])
        }

        this._onPresenceUpdate = this._onPresenceUpdate.bind(this)
        this._onConnectionUpdate = this._onConnectionUpdate.bind(this)
        this._onLidMappingUpdate = this._onLidMappingUpdate.bind(this)

        this._listenersAttached = false
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set())
        }
        this.listeners.get(event).add(listener)
        return this
    }

    off(event, listener) {
        const set = this.listeners.get(event)
        if (set) set.delete(listener)
        return this
    }

    removeAllListeners(event) {
        if (event === undefined) {
            this.listeners.clear()
        } else {
            this.listeners.delete(event)
        }
        return this
    }

    _emit(event, payload) {
        const set = this.listeners.get(event)
        if (!set) return
        for (const fn of set) {
            try { fn(payload) }
            catch (err) {
                const errSet = this.listeners.get('error')
                if (errSet) { for (const efn of errSet) { try { efn(err) } catch (_) { /* ignore */ } } }
            }
        }
    }

    _logOnline(publicJid, timestampMs) {
        if (!this.options.logToConsole) return
        const t = formatTimeOnly(timestampMs, this.options.timezone)
        console.log(`[Presence] ${publicJid} is ONLINE at ${t}`)
    }

    _logOffline(publicJid, timestampMs, durationMs) {
        if (!this.options.logToConsole) return
        const t = formatTimeOnly(timestampMs, this.options.timezone)
        console.log(`[Presence] ${publicJid} is OFFLINE at ${t}`)
        if (typeof durationMs === 'number' && durationMs >= 0) {
            console.log(`[Presence] Online duration: ${formatDuration(durationMs)}`)
        }
    }

    async start() {
        if (this.started && !this.stopped) return this
        if (this.stopped) {
            throw new Error('PresenceMonitor cannot be restarted after stop(); create a new instance instead.')
        }
        this.started = true
        this._attachListeners()
        await this._subscribeAll()
        return this
    }

    stop() {
        if (this.stopped) return
        this.stopped = true
        this._detachListeners()
        this.subscribedJids.clear()
    }

    _attachListeners() {
        if (this._listenersAttached) return
        this._listenersAttached = true
        this.sock.ev.on('presence.update', this._onPresenceUpdate)
        if (this.options.autoResubscribe) {
            this.sock.ev.on('connection.update', this._onConnectionUpdate)
        }
        if (typeof this.sock.ev.on === 'function') {
            this.sock.ev.on('lid-mapping.update', this._onLidMappingUpdate)
        }
    }

    _detachListeners() {
        if (!this._listenersAttached) return
        this._listenersAttached = false
        this.sock.ev.off('presence.update', this._onPresenceUpdate)
        this.sock.ev.off('connection.update', this._onConnectionUpdate)
        this.sock.ev.off('lid-mapping.update', this._onLidMappingUpdate)
    }

    async _subscribeAll() {
        const jids = Array.from(this.requestedJids.keys())
        for (const jid of jids) {
            await this._subscribeOne(jid).catch((err) => this._emit('error', err))
        }
    }

    /**
     * Subscribe to presence for a contact, proactively resolving and subscribing
     * to both PN and LID (mirroring the working reference implementation).
     */
    async _subscribeOne(jid) {
        if (this.subscribedJids.has(jid)) return
        const normalized = WABinary_1.jidNormalizedUser(jid) || jid
        let pnError = null

        // Try primary PN subscription
        try {
            if (typeof this.sock.presenceSubscribe === 'function') {
                await this.sock.presenceSubscribe(normalized)
            }
            this.subscribedJids.add(normalized)
        } catch (err) {
            pnError = err
        }

        // Proactively discover and subscribe to LID (same strategy as reference)
        let lidFound = false
        if (WABinary_1.isPnUser(normalized)) {
            let lid = null
            // 1. Check signalRepository lidMapping cache
            if (this.sock.signalRepository && this.sock.signalRepository.lidMapping && typeof this.sock.signalRepository.lidMapping.getLIDForPN === 'function') {
                try {
                    lid = await this.sock.signalRepository.lidMapping.getLIDForPN(normalized)
                } catch (_) { /* swallow */ }
            }
            // 2. Fallback: query via onWhatsApp
            if (!lid && this.sock.onWhatsApp && typeof this.sock.onWhatsApp === 'function') {
                try {
                    const res = await this.sock.onWhatsApp(normalized)
                    const entry = res?.find(r => WABinary_1.jidNormalizedUser(r.jid) === normalized || WABinary_1.jidNormalizedUser(r.pn || '') === normalized)
                    if (entry?.lid) lid = WABinary_1.jidNormalizedUser(entry.lid) || entry.lid
                } catch (_) { /* swallow */ }
            }
            if (lid) {
                lidFound = true
                this._recordPnLidPair(normalized, lid)
                if (!this.states.has(lid)) {
                    this._mirrorStateForAlternateJid(normalized, lid)
                }
                try {
                    if (typeof this.sock.presenceSubscribe === 'function') {
                        await this.sock.presenceSubscribe(lid)
                    }
                    this.subscribedJids.add(lid)
                } catch (_) { /* log silently; PN subscription already tried */ }
            }
        }

        // If PN failed and no LID was found, re-emit the original error
        if (pnError && !lidFound) {
            this._emit('error', pnError)
        }
    }

    /** Store bidirectional PN↔LID mapping for cross-JID presence correlation */
    _recordPnLidPair(pn, lid) {
        const pnNorm = WABinary_1.jidNormalizedUser(pn) || pn
        const lidNorm = WABinary_1.jidNormalizedUser(lid) || lid
        this.pnLidPairs.set(pnNorm, lidNorm)
        this.pnLidPairs.set(lidNorm, pnNorm)
    }

    _mirrorStateForAlternateJid(canonicalJid, altJid) {
        if (!this.states.has(canonicalJid)) return
        const canonicalState = this.states.get(canonicalJid)
        this.states.set(altJid, canonicalState)
        if (!this.sessions.has(altJid)) {
            this.sessions.set(altJid, this.sessions.get(canonicalJid) || [])
        }
    }

    /** Find the canonical (requested) JID for a participant matching by user or PN↔LID pair */
    _findCanonicalForParticipant(participantJid) {
        const normalized = WABinary_1.jidNormalizedUser(participantJid) || participantJid
        // Direct match
        if (this.requestedJids.has(normalized)) return normalized
        // Same-user match
        for (const internal of this.requestedJids.keys()) {
            if (WABinary_1.areJidsSameUser(participantJid, internal)) return internal
        }
        // PN↔LID pair match
        const partner = this.pnLidPairs.get(normalized)
        if (partner && this.requestedJids.has(partner)) return partner
        return null
    }

    _onConnectionUpdate(update) {
        if (update.connection === 'open' && this.options.autoResubscribe && !this.stopped) {
            if (this.subscribedJids.size > 0) {
                const previous = Array.from(this.subscribedJids)
                this.subscribedJids.clear()
                for (const jid of previous) {
                    this._subscribeOne(jid).catch((err) => this._emit('error', err))
                }
            }
        }
    }

    _onLidMappingUpdate(mapping) {
        if (!mapping || !mapping.pn || !mapping.lid) return
        const pn = WABinary_1.jidNormalizedUser(mapping.pn) || mapping.pn
        const lid = WABinary_1.jidNormalizedUser(mapping.lid) || mapping.lid
        this._recordPnLidPair(pn, lid)
        // linkAliases: enable cross-JID matching for presence events (mirrors reference behavior)
        if (this.requestedJids.has(pn)) this._mirrorStateForAlternateJid(pn, lid)
        if (this.requestedJids.has(lid)) this._mirrorStateForAlternateJid(lid, pn)
        if (!this.started || this.stopped || typeof this.sock.presenceSubscribe !== 'function') return
        // Subscribe to any missing counterpart
        if (this.requestedJids.has(pn) && !this.subscribedJids.has(lid)) {
            this.sock.presenceSubscribe(lid).then(() => this.subscribedJids.add(lid)).catch(() => {})
        }
        if (this.requestedJids.has(lid) && !this.subscribedJids.has(pn)) {
            this.sock.presenceSubscribe(pn).then(() => this.subscribedJids.add(pn)).catch(() => {})
        }
    }

    _resolvePublicJid(participantJid) {
        for (const [internal, requested] of this.requestedJids) {
            if (participantJid === internal) return requested || internal
            if (WABinary_1.areJidsSameUser(participantJid, internal)) return requested || internal
        }
        const altStates = this.states.get(participantJid)
        if (altStates && altStates.requestedJid) return altStates.requestedJid
        return participantJid
    }

    _isWatched(participantJid) {
        if (!participantJid) return false
        const normalized = WABinary_1.jidNormalizedUser(participantJid) || participantJid
        if (this.requestedJids.has(normalized)) return true
        for (const internal of this.requestedJids.keys()) {
            if (WABinary_1.areJidsSameUser(participantJid, internal)) return true
        }
        // Check PN↔LID pairs — a LID participant is watched if its paired PN is requested
        const partner = this.pnLidPairs.get(normalized)
        if (partner && this.requestedJids.has(partner)) return true
        return false
    }

    _onPresenceUpdate(update) {
        if (!update || !update.presences) return
        // Match by participant JID OR by the event's top-level id (WhatsApp sometimes sends
        // presence addressed to the LID even when we subscribed to the PN)
        const normId = update.id ? (WABinary_1.jidNormalizedUser(update.id) || update.id) : null
        for (const [participant, data] of Object.entries(update.presences)) {
            const normParticipant = WABinary_1.jidNormalizedUser(participant) || participant
            // Check participant first, then fall back to event id
            const keyToCheck = normParticipant || normId
            if (!keyToCheck || !this._isWatched(keyToCheck)) continue
            this._handlePresenceForParticipant(keyToCheck, data)
        }
    }

    _handlePresenceForParticipant(participant, data) {
        const normalized = WABinary_1.jidNormalizedUser(participant) || participant
        let state = this.states.get(normalized)
        if (!state) {
            // Check if participant is an alternate JID for any requested JID
            const canonical = this._findCanonicalForParticipant(normalized)
            if (canonical) {
                // Create a permanent mirror so future lookups work via either JID
                state = this.states.get(canonical)
                this.states.set(normalized, state)
            } else {
                return
            }
        }

        const lastKnownPresence = data && data.lastKnownPresence
        const lastSeen = data && typeof data.lastSeen === 'number' ? data.lastSeen : (state.lastSeen || null)
        const isOnline = ONLINE_PRESENCES.has(lastKnownPresence)

        if (isOnline) {
            this._transitionOnline(state, normalized, lastSeen)
        } else if (lastKnownPresence === 'unavailable') {
            this._transitionOffline(state, normalized, lastSeen)
        } else {
            if (lastSeen !== null && lastSeen !== undefined) {
                state.lastSeen = lastSeen
            }
        }
    }

    _transitionOnline(state, participantJid, lastSeen) {
        if (lastSeen !== null && lastSeen !== undefined) state.lastSeen = lastSeen
        if (state.status === 'online') return

        const now = Date.now()
        state.status = 'online'
        state.onlineAt = now
        state.offlineAt = null
        state.durationMs = null

        const publicJid = this._resolvePublicJid(participantJid)
        this._logOnline(publicJid, now)

        const payload = {
            jid: publicJid,
            status: 'online',
            onlineAt: now
        }
        if (state.lastSeen !== null && state.lastSeen !== undefined) {
            payload.lastSeen = state.lastSeen
        }
        this._emit('online', payload)
    }

    _transitionOffline(state, participantJid, lastSeen) {
        const hadActiveSession = state.status === 'online' && state.onlineAt !== null
        if (lastSeen !== null && lastSeen !== undefined) state.lastSeen = lastSeen

        const now = Date.now()
        state.status = 'offline'

        if (!hadActiveSession) return

        state.offlineAt = now

        const durationMs = state.offlineAt - state.onlineAt
        state.durationMs = durationMs
        const duration = formatDuration(durationMs)

        const publicJid = this._resolvePublicJid(participantJid)
        this._logOffline(publicJid, now, durationMs)

        const offlinePayload = {
            jid: publicJid,
            status: 'offline',
            onlineAt: state.onlineAt,
            offlineAt: state.offlineAt,
            durationMs,
            duration
        }
        if (state.lastSeen !== null && state.lastSeen !== undefined) {
            offlinePayload.lastSeen = state.lastSeen
        }
        this._emit('offline', offlinePayload)

        const sessionPayload = { ...offlinePayload }
        const sessionsList = this.sessions.get(state.jid) || this.sessions.get(participantJid)
        if (sessionsList) sessionsList.push(sessionPayload)
        this._emit('session', sessionPayload)
    }

    getState(jid) {
        if (jid) {
            const normalized = WABinary_1.jidNormalizedUser(jid) || jid
            const state = this.states.get(normalized) || this._findStateByUser(normalized)
            if (!state) return null
            return this._publicState(state, jid)
        }
        const result = {}
        for (const [internal, state] of this.states) {
            if (this.requestedJids.has(internal)) {
                const pub = this.requestedJids.get(internal) || internal
                result[pub] = this._publicState(state, pub)
            }
        }
        return result
    }

    _findStateByUser(jid) {
        for (const state of this.states.values()) {
            if (WABinary_1.areJidsSameUser(state.jid, jid)) return state
        }
        return null
    }

    _publicState(state, publicJid) {
        return {
            jid: publicJid || state.requestedJid || state.jid,
            status: state.status,
            onlineAt: state.onlineAt,
            offlineAt: state.offlineAt,
            durationMs: state.durationMs,
            duration: typeof state.durationMs === 'number' ? formatDuration(state.durationMs) : null,
            lastSeen: state.lastSeen
        }
    }

    getSession(jid) {
        if (!jid) return null
        const normalized = WABinary_1.jidNormalizedUser(jid) || jid
        let sessions = this.sessions.get(normalized)
        if (!sessions) {
            for (const internal of this.requestedJids.keys()) {
                if (WABinary_1.areJidsSameUser(normalized, internal)) {
                    sessions = this.sessions.get(internal)
                    break
                }
            }
        }
        if (!sessions) return null
        return sessions.length ? sessions[sessions.length - 1] : null
    }

    getSessions(jid) {
        if (jid) {
            const normalized = WABinary_1.jidNormalizedUser(jid) || jid
            let sessions = this.sessions.get(normalized)
            if (!sessions) {
                for (const internal of this.requestedJids.keys()) {
                    if (WABinary_1.areJidsSameUser(normalized, internal)) {
                        sessions = this.sessions.get(internal)
                        break
                    }
                }
            }
            return sessions ? sessions.slice() : []
        }
        const out = {}
        for (const [internal, sessionsList] of this.sessions) {
            if (this.requestedJids.has(internal)) {
                const pub = this.requestedJids.get(internal) || internal
                out[pub] = sessionsList.slice()
            }
        }
        return out
    }

    isMonitoring(jid) {
        if (!jid) return false
        const normalized = WABinary_1.jidNormalizedUser(jid) || jid
        if (this.requestedJids.has(normalized)) return true
        for (const internal of this.requestedJids.keys()) {
            if (WABinary_1.areJidsSameUser(normalized, internal)) return true
        }
        return false
    }

    getMonitoredJids() {
        return Array.from(this.requestedJids.values())
    }
}

exports.PresenceMonitor = PresenceMonitor

const monitorPresence = (sock, targets, options) => {
    const monitor = new PresenceMonitor(sock, targets, options)
    Promise.resolve().then(() => monitor.start()).catch((err) => {
        if (monitor.listeners.get('error')) {
            monitor._emit('error', err)
        }
    })
    return monitor
}
exports.monitorPresence = monitorPresence
