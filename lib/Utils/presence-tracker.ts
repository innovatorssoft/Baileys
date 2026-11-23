import { EventEmitter } from 'events'
import { jidNormalizedUser } from '../WABinary/jid-utils'
import type { BaileysEventEmitter, WAPresence, PresenceData, ConnectionState, WAMessage } from '../Types'

export interface PresenceTrackerLogger {
    info?: (...args: any[]) => void
    warn?: (...args: any[]) => void
    error?: (...args: any[]) => void
    debug?: (...args: any[]) => void
}

export interface PresenceSocketStateSnapshot {
    isConnected: boolean
    wsIsOpen?: boolean
    wsIsConnecting?: boolean
    wsIsClosing?: boolean
    wsIsClosed?: boolean
    hasWs: boolean
}

export interface PresenceDiagnosticEvent {
    timestamp: string
    trackerId: string
    operationId: string
    level: 'debug' | 'info' | 'warn' | 'error'
    event: string
    contactJid?: string
    resolvedPn?: string
    resolvedLid?: string
    isLocked?: boolean
    subscriptionState?: 'pending' | 'subscribed' | 'failed'
    previousStatus?: 'online' | 'offline' | 'unknown'
    currentStatus?: 'online' | 'offline' | 'unknown'
    previousPresence?: WAPresence
    currentPresence?: WAPresence
    socketStateBefore?: PresenceSocketStateSnapshot
    socketStateAfter?: PresenceSocketStateSnapshot
    reason?: string
    errorMessage?: string
    details?: Record<string, any>
}

export interface PresenceChatstateEventData {
    jid: string
    lid?: string
    status: 'online'
    previousPresence?: WAPresence
    rawPresence: WAPresence
    timestamp: Date
}

export interface PresenceTrackerOptions {
    /** Enable console logging for presence transitions according to specification (default: true) */
    logToConsole?: boolean
    /** Auto resubscribe on socket reconnect (default: true) */
    autoResubscribe?: boolean
    /** Automatically resolve LID via USync onWhatsApp if not known (default: true) */
    resolveLid?: boolean
    /** Infer online presence when an incoming message is received from the contact (default: true) */
    trackMessagesAsPresence?: boolean
    /** Custom timezone or UTC offset (e.g. '+05:00', '+5', 5, 'Asia/Karachi') - default: '+05:00' */
    timeZone?: string | number
    /** Alias for timeZone */
    timezone?: string | number
    /** Optional periodic heartbeat resubscription interval in ms (default: 0 = disabled; resubscribes on genuine reconnects) */
    resubscribeIntervalMs?: number
    /** Opt-in: announce own presence as available during subscribe() (default: false to avoid mutating connection state) */
    announceAvailable?: boolean
    /** Emit structured JSON diagnostic logs to logger (default: false; auto-enabled when custom logger is passed or BAILEYS_PRESENCE_DEBUG=1) */
    diagnosticLogging?: boolean
    /** Optional structured diagnostic callback */
    onDiagnostic?: (entry: PresenceDiagnosticEvent) => void
    /** Custom logger */
    logger?: PresenceTrackerLogger
}

export interface PresenceSession {
    onlineAt: Date
    offlineAt: Date
    durationMs: number
    duration: string // HH:MM:SS
}

export interface ContactPresenceState {
    jid: string
    lid?: string
    isLocked?: boolean
    subscriptionState?: 'pending' | 'subscribed' | 'failed'
    currentStatus: 'online' | 'offline' | 'unknown'
    lastKnownPresence?: WAPresence
    currentSessionStart?: Date
    lastOnlineAt?: Date
    lastOfflineAt?: Date
    lastOnlineAtFormatted?: string
    lastOfflineAtFormatted?: string
    lastDurationMs?: number
    lastDuration?: string
    lastSeen?: Date
    lastSeenTimestamp?: number
    lastSeenFormatted?: string
    serverLastSeen?: Date
    serverLastSeenTimestamp?: number
    serverLastSeenFormatted?: string
    sessions: PresenceSession[]
}

export interface PresenceEventData {
    jid: string
    lid?: string
    status: 'online' | 'offline'
    onlineAt?: Date
    offlineAt?: Date
    duration?: string
    rawPresence?: WAPresence
    lastSeen?: Date
    lastSeenTimestamp?: number
}

export interface PresenceTrackerSocket {
    ev: BaileysEventEmitter
    presenceSubscribe: (toJid: string, tcToken?: Buffer) => Promise<void>
    sendPresenceUpdate?: (type: WAPresence, toJid?: string) => Promise<void>
    isChatLocked?: (jid: string) => boolean
    ws?: {
        isOpen?: boolean
        isConnecting?: boolean
        isClosing?: boolean
        isClosed?: boolean
    }
    onWhatsApp?: (...jids: string[]) => Promise<{ jid: string; exists: boolean; lid?: string; pn?: string }[] | undefined>
    signalRepository?: {
        lidMapping?: {
            getLIDForPN?: (pn: string) => Promise<string | null>
            getPNForLID?: (lid: string) => Promise<string | null>
            storeLIDPNMappings?: (pairs: { lid: string; pn: string }[]) => Promise<void>
            mappingCache?: {
                get?: (key: string) => string | undefined
            }
        }
    }
}

let defaultTimeZone: string | number = '+05:00'
let trackerCounter = 0

/**
 * Get current default timezone
 */
export function getDefaultTimezone(): string | number {
    return defaultTimeZone
}

/**
 * Dynamically set the global default timezone (e.g., '+05:00', '+5', 5, 'Asia/Karachi', 'UTC')
 */
export function setDefaultTimezone(zone: string | number): void {
    defaultTimeZone = zone
}

export const setTimezone = setDefaultTimezone
export const getTimezone = getDefaultTimezone

/**
 * Parse timezone into offset info or IANA time zone identifier
 */
export function parseTimezone(zone?: string | number): { isOffset: boolean; offsetMs: number; ianaZone?: string; label: string } {
    const tz = (zone !== undefined && zone !== null && zone !== '') ? zone : defaultTimeZone

    if (typeof tz === 'number') {
        const sign = tz >= 0 ? '+' : '-'
        const abs = Math.abs(tz)
        const hours = Math.floor(abs)
        const mins = Math.round((abs - hours) * 60)
        const label = `UTC${sign}${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
        return { isOffset: true, offsetMs: tz * 60 * 60 * 1000, label }
    }

    const str = String(tz).trim()
    const offsetMatch = str.match(/^([+-])?(\d{1,2})(?::?(\d{2}))?$/)
    if (offsetMatch) {
        const sign = offsetMatch[1] === '-' ? -1 : 1
        const hours = parseInt(offsetMatch[2], 10)
        const mins = parseInt(offsetMatch[3] || '0', 10)
        const totalMinutes = sign * (hours * 60 + mins)
        const label = `UTC${sign >= 0 ? '+' : '-'}${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
        return { isOffset: true, offsetMs: totalMinutes * 60 * 1000, label }
    }

    // Try as IANA timezone string
    return { isOffset: false, offsetMs: 0, ianaZone: str, label: str }
}

/**
 * Format milliseconds into HH:MM:SS duration string
 */
export function formatDuration(ms: number): string {
    if (!ms || ms < 0 || isNaN(ms)) return '00:00:00'
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

/**
 * Format Date into HH:MM:SS time string in specified or configured timezone
 */
export function formatTime(date: Date | number, zone?: string | number): string {
    if (!date) return 'N/A'
    const d = date instanceof Date ? date : new Date(date > 1e11 ? date : date * 1000)
    const tzInfo = parseTimezone(zone)

    if (tzInfo.isOffset) {
        const target = new Date(d.getTime() + tzInfo.offsetMs)
        const hh = String(target.getUTCHours()).padStart(2, '0')
        const mm = String(target.getUTCMinutes()).padStart(2, '0')
        const ss = String(target.getUTCSeconds()).padStart(2, '0')
        return `${hh}:${mm}:${ss}`
    }

    try {
        return new Intl.DateTimeFormat('en-GB', {
            timeZone: tzInfo.ianaZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(d)
    } catch {
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
    }
}

/**
 * Format Date into YYYY-MM-DD HH:MM:SS in specified or configured timezone
 */
export function formatDateTime(date: Date | number, zone?: string | number): string {
    if (!date) return 'N/A'
    const d = date instanceof Date ? date : new Date(date > 1e11 ? date : date * 1000)
    const tzInfo = parseTimezone(zone)

    if (tzInfo.isOffset) {
        const target = new Date(d.getTime() + tzInfo.offsetMs)
        const yyyy = target.getUTCFullYear()
        const mm = String(target.getUTCMonth() + 1).padStart(2, '0')
        const dd = String(target.getUTCDate()).padStart(2, '0')
        const hh = String(target.getUTCHours()).padStart(2, '0')
        const min = String(target.getUTCMinutes()).padStart(2, '0')
        const ss = String(target.getUTCSeconds()).padStart(2, '0')
        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`
    }

    try {
        const parts = new Intl.DateTimeFormat('en-CA', {
            timeZone: tzInfo.ianaZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(d)
        return parts.replace(/,/, '')
    } catch {
        return d.toLocaleString()
    }
}

/**
 * Format timestamp into human-readable relative time (e.g. "2m ago")
 */
export function formatTimeAgo(date: Date | number): string {
    if (!date) return 'N/A'
    const time = date instanceof Date ? date.getTime() : (date > 1e11 ? date : date * 1000)
    const diffMs = Date.now() - time
    if (diffMs < 0) return 'just now'
    const diffSec = Math.floor(diffMs / 1000)
    if (diffSec < 60) return `${diffSec}s ago`
    const diffMin = Math.floor(diffSec / 60)
    if (diffMin < 60) return `${diffMin}m ago`
    const diffHour = Math.floor(diffMin / 60)
    if (diffHour < 24) return `${diffHour}h ago`
    const diffDays = Math.floor(diffHour / 24)
    return `${diffDays}d ago`
}

/**
 * Normalize input string into valid WhatsApp user JID or LID
 */
export function normalizeContactJid(jid: string): string {
    if (!jid || typeof jid !== 'string') return ''
    let clean = jid.trim()
    if (clean.endsWith('@whatsapp.net')) {
        clean = clean.replace('@whatsapp.net', '@s.whatsapp.net')
    } else if (clean.endsWith('@c.us')) {
        clean = clean.replace('@c.us', '@s.whatsapp.net')
    } else if (!clean.includes('@')) {
        clean = `${clean}@s.whatsapp.net`
    }
    if (clean.endsWith('@s.whatsapp.net')) {
        clean = clean.replace(/^\+/, '')
    }
    return jidNormalizedUser(clean) || clean
}

/**
 * Determine if a WAPresence status indicates an active online state
 */
export function isOnlinePresence(presence?: WAPresence): boolean {
    return presence === 'available' || presence === 'composing' || presence === 'recording' || presence === 'paused'
}

/**
 * Determine if a WAPresence status indicates offline / unavailable
 */
export function isOfflinePresence(presence?: WAPresence): boolean {
    return presence === 'unavailable'
}

/**
 * PresenceTracker monitors online/offline presence transitions for specified WhatsApp contacts,
 * supporting both traditional Phone Number JIDs (@s.whatsapp.net) and modern Linked Identity JIDs (@lid).
 */
export class PresenceTracker extends EventEmitter {
    private sock: PresenceTrackerSocket
    private options: {
        logToConsole: boolean
        autoResubscribe: boolean
        resolveLid: boolean
        trackMessagesAsPresence: boolean
        resubscribeIntervalMs: number
        announceAvailable: boolean
        diagnosticLogging: boolean
        onDiagnostic?: (entry: PresenceDiagnosticEvent) => void
        timeZone: string | number
        timezone: string | number
        logger: PresenceTrackerLogger
    }
    private hasCustomLogger: boolean
    private monitoredJids = new Set<string>()
    private activeSubscribedJids = new Set<string>()
    private inFlightSubscriptions = new Map<string, Promise<void>>()
    private inFlightLidLookups = new Map<string, Promise<string | undefined>>()
    private contactStates = new Map<string, ContactPresenceState>()
    private aliasMap = new Map<string, string>() // Bidirectional: PN <-> LID
    private lockedJids = new Set<string>()
    private isDestroyed = false
    private isConnected = true
    private listenersAttached = false
    private resubscribeInProgress = false
    private timeZone: string | number
    private trackerId: string
    private opSeq = 0
    private diagnosticHistory: PresenceDiagnosticEvent[] = []
    private readonly maxDiagnosticHistory = 200

    private boundPresenceUpdate: (update: { id: string; presences: { [participant: string]: PresenceData } }) => void
    private boundConnectionUpdate: (update: Partial<ConnectionState>) => void
    private boundLidMappingUpdate?: (mapping: { lid: string; pn: string }) => void
    private boundMessagesUpsert?: (update: { messages: WAMessage[] }) => void
    private boundChatsLock: (update: { id: string; locked: boolean }) => void
    private boundChatsUpdate: (updates: { id?: string; locked?: boolean }[]) => void
    private resubscribeTimer?: ReturnType<typeof setInterval>

    constructor(sock: PresenceTrackerSocket, targetsOrOptions?: PresenceTrackerOptions | string | string[], options?: PresenceTrackerOptions) {
        super()
        this.sock = sock
        this.trackerId = `pt-${Date.now().toString(36)}-${++trackerCounter}`

        let resolvedOptions: PresenceTrackerOptions = {}
        let initialTargets: string | string[] | undefined
        if (typeof targetsOrOptions === 'string' || Array.isArray(targetsOrOptions)) {
            initialTargets = targetsOrOptions
            resolvedOptions = options || {}
        } else if (targetsOrOptions) {
            resolvedOptions = targetsOrOptions
        }

        this.hasCustomLogger = !!resolvedOptions.logger
        this.timeZone = resolvedOptions.timeZone ?? resolvedOptions.timezone ?? defaultTimeZone
        const envDebug = typeof process !== 'undefined' && process?.env?.BAILEYS_PRESENCE_DEBUG === '1'
        this.options = {
            logToConsole: resolvedOptions.logToConsole !== false,
            autoResubscribe: resolvedOptions.autoResubscribe !== false,
            resolveLid: resolvedOptions.resolveLid !== false,
            trackMessagesAsPresence: resolvedOptions.trackMessagesAsPresence !== false,
            resubscribeIntervalMs: resolvedOptions.resubscribeIntervalMs !== undefined ? resolvedOptions.resubscribeIntervalMs : 0,
            announceAvailable: resolvedOptions.announceAvailable === true,
            diagnosticLogging: resolvedOptions.diagnosticLogging !== undefined ? resolvedOptions.diagnosticLogging : (this.hasCustomLogger || envDebug),
            onDiagnostic: resolvedOptions.onDiagnostic,
            timeZone: this.timeZone,
            timezone: this.timeZone,
            logger: resolvedOptions.logger || console
        }

        // Derive initial connectivity state from socket's ws if present
        this.isConnected = this.sock?.ws ? this.sock.ws.isOpen !== false : true

        this.boundPresenceUpdate = this.handlePresenceUpdate.bind(this)
        this.boundConnectionUpdate = this.handleConnectionUpdate.bind(this)
        this.boundLidMappingUpdate = this.handleLidMappingUpdate.bind(this)
        this.boundChatsLock = this.handleChatsLock.bind(this)
        this.boundChatsUpdate = this.handleChatsUpdate.bind(this)
        if (this.options.trackMessagesAsPresence) {
            this.boundMessagesUpsert = this.handleMessagesUpsert.bind(this)
        }

        this.attachSocketListeners()
        this.startResubscribeTimer()

        this.recordDiagnostic('debug', 'tracker_initialized', {
            operationId: this.nextOpId('init'),
            socketStateAfter: this.getSocketState(),
            details: {
                autoResubscribe: this.options.autoResubscribe,
                resolveLid: this.options.resolveLid,
                trackMessagesAsPresence: this.options.trackMessagesAsPresence,
                resubscribeIntervalMs: this.options.resubscribeIntervalMs,
                announceAvailable: this.options.announceAvailable
            }
        })

        if (initialTargets) {
            this.subscribe(initialTargets).catch(err => {
                this.recordDiagnostic('error', 'initial_subscribe_error', {
                    operationId: this.nextOpId('init-sub'),
                    errorMessage: err?.message || String(err),
                    socketStateAfter: this.getSocketState()
                })
                this.options.logger?.error?.({ err }, 'Failed initial presence subscription')
            })
        }
    }

    private nextOpId(prefix: string): string {
        return `${prefix}-${this.trackerId}-${++this.opSeq}`
    }

    private getSocketState(): PresenceSocketStateSnapshot {
        const ws = this.sock?.ws
        return {
            isConnected: this.isConnected,
            hasWs: !!ws,
            ...(ws ? {
                wsIsOpen: !!ws.isOpen,
                wsIsConnecting: !!ws.isConnecting,
                wsIsClosing: !!ws.isClosing,
                wsIsClosed: !!ws.isClosed
            } : {})
        }
    }

    private isSocketOpen(): boolean {
        if (this.isDestroyed || !this.isConnected || !this.sock) return false
        if (this.sock.ws) {
            return !!this.sock.ws.isOpen
        }
        return true
    }

    private resolveIdentityPair(jid: string): { pn?: string; lid?: string } {
        const norm = normalizeContactJid(jid)
        if (!norm) return {}
        if (norm.endsWith('@lid')) {
            return { lid: norm, pn: this.aliasMap.get(norm) }
        }
        if (norm.endsWith('@s.whatsapp.net')) {
            const state = this.contactStates.get(norm)
            return { pn: norm, lid: state?.lid || this.aliasMap.get(norm) }
        }
        return {}
    }

    private recordDiagnostic(
        level: 'debug' | 'info' | 'warn' | 'error',
        event: string,
        fields: Partial<Omit<PresenceDiagnosticEvent, 'timestamp' | 'trackerId' | 'level' | 'event'>> = {}
    ): PresenceDiagnosticEvent {
        const entry: PresenceDiagnosticEvent = {
            timestamp: new Date().toISOString(),
            trackerId: this.trackerId,
            operationId: fields.operationId || this.nextOpId('op'),
            level,
            event,
            ...fields
        }

        this.diagnosticHistory.push(entry)
        if (this.diagnosticHistory.length > this.maxDiagnosticHistory) {
            this.diagnosticHistory.shift()
        }

        if (this.options.onDiagnostic) {
            try {
                this.options.onDiagnostic(entry)
            } catch { }
        }

        if (this.listenerCount('diagnostic') > 0) {
            this.safeEmit('diagnostic', entry, entry.operationId)
        }

        if (this.options.diagnosticLogging) {
            const logFn = this.options.logger?.[level] || this.options.logger?.info
            if (typeof logFn === 'function') {
                try {
                    if (this.hasCustomLogger) {
                        logFn.call(this.options.logger, entry, `[PresenceTracker] ${event}`)
                    } else {
                        logFn.call(this.options.logger, JSON.stringify(entry))
                    }
                } catch { }
            }
        }

        return entry
    }

    /**
     * Safely invoke all listeners for an event without letting a listener
     * exception escape back into sock.ev / WebSocket frame processing.
     */
    private safeEmit(event: string, payload: any, operationId?: string): boolean {
        const listeners = this.rawListeners(event)
        if (!listeners.length) return false

        for (const listener of listeners) {
            try {
                (listener as (...args: any[]) => void).call(this, payload)
            } catch (err: any) {
                const errMsg = err?.message || String(err)
                if (event !== 'diagnostic') {
                    this.recordDiagnostic('error', 'presence_listener_exception', {
                        operationId: operationId || this.nextOpId('emit-err'),
                        contactJid: payload?.jid,
                        errorMessage: errMsg,
                        socketStateAfter: this.getSocketState(),
                        details: { listenerEvent: event }
                    })
                }
                if (event !== 'error') {
                    const errorListeners = this.rawListeners('error')
                    for (const errListener of errorListeners) {
                        try {
                            (errListener as (...args: any[]) => void).call(this, err)
                        } catch { }
                    }
                }
            }
        }
        return true
    }

    private isContactLocked(jid: string): boolean {
        const norm = normalizeContactJid(jid)
        if (!norm) return false
        if (this.lockedJids.has(norm)) return true
        const alias = this.aliasMap.get(norm)
        if (alias && this.lockedJids.has(alias)) return true
        const state = this.contactStates.get(norm)
        if (state?.isLocked) return true
        if (state?.lid && this.lockedJids.has(state.lid)) return true
        try {
            if (this.sock?.isChatLocked?.(norm)) return true
            if (alias && this.sock?.isChatLocked?.(alias)) return true
            if (state?.lid && this.sock?.isChatLocked?.(state.lid)) return true
        } catch { }
        return false
    }

    private attachSocketListeners(): void {
        if (this.listenersAttached || !this.sock?.ev) return
        this.listenersAttached = true

        this.sock.ev.on('presence.update', this.boundPresenceUpdate)
        this.sock.ev.on('connection.update', this.boundConnectionUpdate)
        ;(this.sock.ev as any).on('chats.lock', this.boundChatsLock)
        ;(this.sock.ev as any).on('chats.update', this.boundChatsUpdate)
        if (this.boundLidMappingUpdate) {
            this.sock.ev.on('lid-mapping.update' as any, this.boundLidMappingUpdate as any)
        }
        if (this.boundMessagesUpsert) {
            this.sock.ev.on('messages.upsert' as any, this.boundMessagesUpsert as any)
        }
    }

    private detachSocketListeners(): void {
        if (!this.listenersAttached || !this.sock?.ev) return
        this.listenersAttached = false

        this.sock.ev.off('presence.update', this.boundPresenceUpdate)
        this.sock.ev.off('connection.update', this.boundConnectionUpdate)
        ;(this.sock.ev as any).off('chats.lock', this.boundChatsLock)
        ;(this.sock.ev as any).off('chats.update', this.boundChatsUpdate)
        if (this.boundLidMappingUpdate) {
            this.sock.ev.off('lid-mapping.update' as any, this.boundLidMappingUpdate as any)
        }
        if (this.boundMessagesUpsert) {
            this.sock.ev.off('messages.upsert' as any, this.boundMessagesUpsert as any)
        }
    }

    private startResubscribeTimer(): void {
        this.stopResubscribeTimer()
        if (this.isDestroyed || !this.options.autoResubscribe || !(this.options.resubscribeIntervalMs > 0)) {
            return
        }
        if (!this.isSocketOpen()) {
            return
        }

        this.resubscribeTimer = setInterval(() => {
            if (this.isDestroyed || !this.isSocketOpen()) return
            this.resubscribeAll('periodic_heartbeat').catch(err => {
                this.recordDiagnostic('warn', 'periodic_resubscribe_error', {
                    operationId: this.nextOpId('hb-err'),
                    errorMessage: err?.message || String(err),
                    socketStateAfter: this.getSocketState()
                })
            })
        }, this.options.resubscribeIntervalMs)

        if (this.resubscribeTimer && typeof (this.resubscribeTimer as any).unref === 'function') {
            (this.resubscribeTimer as any).unref()
        }
    }

    private stopResubscribeTimer(): void {
        if (this.resubscribeTimer) {
            clearInterval(this.resubscribeTimer)
            this.resubscribeTimer = undefined
        }
    }

    /**
     * Get recent structured diagnostic log entries for inspection and testing.
     */
    getDiagnostics(): PresenceDiagnosticEvent[] {
        return this.diagnosticHistory.slice()
    }

    /**
     * Get unique tracker identifier for log correlation.
     */
    getTrackerId(): string {
        return this.trackerId
    }

    /**
     * Reattach this tracker to a new socket instance after a genuine WhatsApp
     * reconnection without creating duplicate trackers or monitoring loops.
     */
    reattach(newSock: PresenceTrackerSocket): void {
        if (this.isDestroyed || !newSock || !newSock.ev) return
        const opId = this.nextOpId('reattach')
        const socketStateBefore = this.getSocketState()

        this.stopResubscribeTimer()
        this.detachSocketListeners()
        this.activeSubscribedJids.clear()
        this.inFlightSubscriptions.clear()
        this.inFlightLidLookups.clear()

        this.sock = newSock
        this.isConnected = this.sock.ws ? this.sock.ws.isOpen !== false : true
        this.attachSocketListeners()

        this.recordDiagnostic('info', 'tracker_reattached', {
            operationId: opId,
            socketStateBefore,
            socketStateAfter: this.getSocketState(),
            details: { monitoredCount: this.monitoredJids.size }
        })

        if (this.isSocketOpen() && this.options.autoResubscribe) {
            this.startResubscribeTimer()
            if (this.monitoredJids.size > 0) {
                this.resubscribeAll('socket_reattached').catch(err => {
                    this.recordDiagnostic('warn', 'reattach_resubscribe_error', {
                        operationId: opId,
                        errorMessage: err?.message || String(err),
                        socketStateAfter: this.getSocketState()
                    })
                })
            }
        }
    }

    /**
     * Link Phone Number JID and LID aliases together.
     * Strictly verifies that one is a LID and one is a Phone Number to prevent cross-linking contacts.
     */
    linkAliases(jidA: string, jidB: string): void {
        const normA = normalizeContactJid(jidA)
        const normB = normalizeContactJid(jidB)
        if (!normA || !normB || normA === normB) return

        const isA_Lid = normA.endsWith('@lid')
        const isB_Lid = normB.endsWith('@lid')
        const isA_Pn = normA.endsWith('@s.whatsapp.net')
        const isB_Pn = normB.endsWith('@s.whatsapp.net')

        // STRICT VALIDATION: Exactly one must be a LID and one must be a PN!
        if (!((isA_Lid && isB_Pn) || (isB_Lid && isA_Pn))) {
            return
        }

        const pn = isA_Pn ? normA : normB
        const lid = isA_Lid ? normA : normB

        // If this LID was previously associated with another PN, break that old association
        const existingPnForLid = this.aliasMap.get(lid)
        if (existingPnForLid && existingPnForLid !== pn) {
            const oldState = this.contactStates.get(existingPnForLid)
            if (oldState && oldState.lid === lid) {
                oldState.lid = undefined
            }
            this.aliasMap.delete(existingPnForLid)
        }

        this.aliasMap.set(lid, pn)
        this.aliasMap.set(pn, lid)

        const existingLidState = this.contactStates.get(lid)

        // Find or create dedicated state for the PN
        let state = this.contactStates.get(pn)
        if (!state) {
            state = {
                jid: pn,
                lid,
                currentStatus: existingLidState ? existingLidState.currentStatus : 'unknown',
                ...(existingLidState?.isLocked !== undefined ? { isLocked: existingLidState.isLocked } : {}),
                ...(existingLidState?.subscriptionState !== undefined ? { subscriptionState: existingLidState.subscriptionState } : {}),
                sessions: existingLidState ? existingLidState.sessions : []
            }
            this.contactStates.set(pn, state)
        } else {
            state.lid = lid
            if (existingLidState?.isLocked !== undefined && state.isLocked === undefined) {
                state.isLocked = existingLidState.isLocked
            }
            if (existingLidState?.subscriptionState !== undefined && !state.subscriptionState) {
                state.subscriptionState = existingLidState.subscriptionState
            }
        }

        this.contactStates.set(lid, state)

        // Ensure PN and LID stay paired in monitoredJids when either is monitored
        if (this.monitoredJids.has(pn)) {
            this.monitoredJids.add(lid)
        } else if (this.monitoredJids.has(lid)) {
            this.monitoredJids.add(pn)
        }
    }

    /**
     * Resolve any JID (PN or LID) to the canonical ContactPresenceState key
     */
    resolveCanonicalJid(jid: string): string | undefined {
        const norm = normalizeContactJid(jid)
        if (!norm) return undefined

        // If it's a LID, check if we have mapped PN
        if (norm.endsWith('@lid')) {
            const mappedPn = this.aliasMap.get(norm)
            if (mappedPn && this.contactStates.has(mappedPn)) {
                return mappedPn
            }
        }

        if (this.contactStates.has(norm)) return norm
        const alias = this.aliasMap.get(norm)
        if (alias && this.contactStates.has(alias)) return alias

        return this.monitoredJids.has(norm) ? norm : undefined
    }

    /**
     * Deduplicated, error-isolated single JID presence subscription.
     * Never modifies socket connection lifecycle.
     */
    private async subscribeTarget(targetJid: string, operationId: string, force = false): Promise<void> {
        const normalized = normalizeContactJid(targetJid)
        if (!normalized || this.isDestroyed) return

        const identity = this.resolveIdentityPair(normalized)
        const isLocked = this.isContactLocked(normalized)
        const canonical = this.resolveCanonicalJid(normalized)
        const targetState = (canonical ? this.contactStates.get(canonical) : undefined) || this.contactStates.get(normalized)
        if (targetState) {
            targetState.isLocked = isLocked
        }
        const socketStateBefore = this.getSocketState()

        if (!this.isSocketOpen()) {
            this.recordDiagnostic('debug', 'presence_subscribe_deferred_socket_closed', {
                operationId,
                contactJid: normalized,
                resolvedPn: identity.pn,
                resolvedLid: identity.lid,
                isLocked,
                subscriptionState: targetState?.subscriptionState,
                socketStateBefore
            })
            return
        }

        if (!force && this.activeSubscribedJids.has(normalized)) {
            this.recordDiagnostic('debug', 'presence_subscribe_deduplicated', {
                operationId,
                contactJid: normalized,
                resolvedPn: identity.pn,
                resolvedLid: identity.lid,
                isLocked,
                subscriptionState: targetState?.subscriptionState,
                socketStateBefore
            })
            return
        }

        const existingInFlight = this.inFlightSubscriptions.get(normalized)
        if (existingInFlight) {
            await existingInFlight
            return
        }

        const subPromise = (async () => {
            if (targetState) {
                targetState.subscriptionState = 'pending'
            }
            this.recordDiagnostic(isLocked ? 'info' : 'debug', 'presence_subscribe_request', {
                operationId,
                contactJid: normalized,
                resolvedPn: identity.pn,
                resolvedLid: identity.lid,
                isLocked,
                subscriptionState: 'pending',
                socketStateBefore,
                details: { force }
            })

            try {
                await this.sock.presenceSubscribe(normalized)
                if (!this.isDestroyed && this.isConnected) {
                    this.activeSubscribedJids.add(normalized)
                }
                if (targetState) {
                    targetState.subscriptionState = 'subscribed'
                }
                this.recordDiagnostic(isLocked ? 'info' : 'debug', 'presence_subscribe_response', {
                    operationId,
                    contactJid: normalized,
                    resolvedPn: identity.pn,
                    resolvedLid: identity.lid,
                    isLocked,
                    subscriptionState: 'subscribed',
                    socketStateBefore,
                    socketStateAfter: this.getSocketState(),
                    details: { success: true }
                })
            } catch (err: any) {
                const errMsg = err?.message || String(err)
                if (targetState) {
                    targetState.subscriptionState = 'failed'
                }
                this.recordDiagnostic('warn', 'presence_subscribe_failed', {
                    operationId,
                    contactJid: normalized,
                    resolvedPn: identity.pn,
                    resolvedLid: identity.lid,
                    isLocked,
                    subscriptionState: 'failed',
                    errorMessage: errMsg,
                    socketStateBefore,
                    socketStateAfter: this.getSocketState()
                })
                if (normalized.endsWith('@lid')) {
                    this.options.logger?.debug?.({ err, lid: normalized }, 'Failed to subscribe to contact LID presence')
                } else {
                    this.options.logger?.error?.({ err, jid: normalized }, 'Failed to subscribe to contact presence')
                }
            }
        })()

        this.inFlightSubscriptions.set(normalized, subPromise)
        try {
            await subPromise
        } finally {
            if (this.inFlightSubscriptions.get(normalized) === subPromise) {
                this.inFlightSubscriptions.delete(normalized)
            }
        }
    }

    /**
     * Collect unique target JIDs (PN + resolved LID) for a given list of JIDs
     * so each target is subscribed at most once per cycle.
     */
    private collectUniqueTargets(jids: Iterable<string>): string[] {
        const unique = new Set<string>()
        for (const raw of jids) {
            const normalized = normalizeContactJid(raw)
            if (!normalized) continue
            unique.add(normalized)

            const alias = this.aliasMap.get(normalized)
            if (alias) unique.add(alias)

            const state = this.contactStates.get(normalized)
            if (state?.lid) unique.add(state.lid)
        }
        return Array.from(unique)
    }

    /**
     * Subscribe to presence updates for one or more contacts
     */
    async subscribe(jid: string | string[]): Promise<void> {
        if (this.isDestroyed) return

        const opId = this.nextOpId('sub')
        const socketStateBefore = this.getSocketState()

        // Opt-in only: do not emit connection.update / mutate socket presence unless explicitly requested
        if (this.options.announceAvailable && this.isSocketOpen() && this.sock && typeof this.sock.sendPresenceUpdate === 'function') {
            try {
                await this.sock.sendPresenceUpdate('available')
            } catch (err: any) {
                this.recordDiagnostic('warn', 'announce_available_failed', {
                    operationId: opId,
                    errorMessage: err?.message || String(err),
                    socketStateAfter: this.getSocketState()
                })
            }
        }

        const jids = Array.isArray(jid) ? jid : [jid]
        const seenInBatch = new Set<string>()

        for (const rawJid of jids) {
            if (this.isDestroyed) return
            const normalized = normalizeContactJid(rawJid)
            if (!normalized || seenInBatch.has(normalized)) continue
            seenInBatch.add(normalized)

            const wasMonitored = this.monitoredJids.has(normalized)
            this.monitoredJids.add(normalized)

            let state = this.contactStates.get(normalized)
            if (!state) {
                state = {
                    jid: normalized,
                    isLocked: this.isContactLocked(normalized),
                    currentStatus: 'unknown',
                    sessions: []
                }
                this.contactStates.set(normalized, state)
            } else {
                state.isLocked = this.isContactLocked(normalized)
            }

            if (!wasMonitored) {
                this.recordDiagnostic('info', 'subscription_created', {
                    operationId: opId,
                    contactJid: normalized,
                    resolvedPn: normalized.endsWith('@s.whatsapp.net') ? normalized : this.aliasMap.get(normalized),
                    resolvedLid: state.lid || (normalized.endsWith('@lid') ? normalized : this.aliasMap.get(normalized)),
                    isLocked: state.isLocked,
                    socketStateBefore
                })
            }

            // Attempt bidirectional LID <-> PN resolution when socket is open
            let resolvedPn: string | undefined
            if (this.options.resolveLid && normalized.endsWith('@s.whatsapp.net') && !state.lid && this.isSocketOpen()) {
                await this.discoverLid(normalized, state, opId)
            } else if (this.options.resolveLid && normalized.endsWith('@lid') && !this.aliasMap.get(normalized) && this.isSocketOpen()) {
                resolvedPn = await this.discoverPn(normalized, state, opId)
            } else if (normalized.endsWith('@lid')) {
                const mappedPn = this.aliasMap.get(normalized)
                if (mappedPn && mappedPn.endsWith('@s.whatsapp.net')) {
                    resolvedPn = mappedPn
                }
            }

            // Subscribe to primary JID (deduplicated)
            await this.subscribeTarget(normalized, opId, false)

            // If paired PN or LID is known, subscribe to it as well (deduplicated)
            const activeState = this.contactStates.get(this.resolveCanonicalJid(normalized) || normalized) || state
            if (activeState.lid && activeState.lid !== normalized) {
                await this.subscribeTarget(activeState.lid, opId, false)
            }
            if (resolvedPn && resolvedPn !== normalized) {
                await this.subscribeTarget(resolvedPn, opId, false)
            }
        }
    }

    /**
     * Discover and link LID for a given phone number JID
     */
    private async discoverLid(pnJid: string, state: ContactPresenceState, operationId?: string): Promise<void> {
        const opId = operationId || this.nextOpId('lid')
        const existingLookup = this.inFlightLidLookups.get(pnJid)
        if (existingLookup) {
            const resolved = await existingLookup
            if (resolved && !state.lid) {
                state.lid = resolved
                this.linkAliases(pnJid, resolved)
            }
            return
        }

        const lookupPromise = (async (): Promise<string | undefined> => {
            let lid: string | undefined

            // 1. Check signalRepository lidMapping store
            if (this.sock.signalRepository?.lidMapping?.getLIDForPN) {
                try {
                    const res = await this.sock.signalRepository.lidMapping.getLIDForPN(pnJid)
                    if (res) lid = normalizeContactJid(res)
                } catch (err: any) {
                    this.recordDiagnostic('debug', 'lid_cache_lookup_failed', {
                        operationId: opId,
                        contactJid: pnJid,
                        errorMessage: err?.message || String(err)
                    })
                }
            }

            // 2. Query via USync onWhatsApp if not yet in cache
            if (!lid && this.sock.onWhatsApp && this.isSocketOpen()) {
                try {
                    const res = await this.sock.onWhatsApp(pnJid)
                    const cleanPn = normalizeContactJid(pnJid)
                    const entry = res?.find(r => {
                        const rJid = normalizeContactJid(r?.jid || '')
                        const rPn = normalizeContactJid(r?.pn || '')
                        return rJid === cleanPn || rPn === cleanPn
                    })
                    if (entry?.lid) {
                        lid = normalizeContactJid(entry.lid)
                    }
                } catch (err: any) {
                    this.recordDiagnostic('debug', 'lid_usync_lookup_failed', {
                        operationId: opId,
                        contactJid: pnJid,
                        errorMessage: err?.message || String(err)
                    })
                }
            }

            if (lid && lid.endsWith('@lid')) {
                state.lid = lid
                if (this.sock.signalRepository?.lidMapping?.storeLIDPNMappings) {
                    await this.sock.signalRepository.lidMapping.storeLIDPNMappings([{ pn: pnJid, lid }]).catch(() => { })
                }
                this.linkAliases(pnJid, lid)
                this.recordDiagnostic('info', 'lid_resolved', {
                    operationId: opId,
                    contactJid: pnJid,
                    resolvedPn: pnJid,
                    resolvedLid: lid,
                    isLocked: this.isContactLocked(pnJid) || this.isContactLocked(lid),
                    socketStateAfter: this.getSocketState()
                })
                if (this.options.logToConsole) {
                    console.log(`[Presence] Resolved LID for ${pnJid} -> ${lid} (monitoring both)`)
                }
                return lid
            }

            return undefined
        })()

        this.inFlightLidLookups.set(pnJid, lookupPromise)
        try {
            await lookupPromise
        } finally {
            if (this.inFlightLidLookups.get(pnJid) === lookupPromise) {
                this.inFlightLidLookups.delete(pnJid)
            }
        }
    }

    /**
     * Discover and link Phone Number JID for a given LID JID
     */
    private async discoverPn(lidJid: string, state: ContactPresenceState, operationId?: string): Promise<string | undefined> {
        const opId = operationId || this.nextOpId('pn')
        const existingLookup = this.inFlightLidLookups.get(lidJid)
        if (existingLookup) {
            const resolved = await existingLookup
            if (resolved) {
                this.linkAliases(resolved, lidJid)
            }
            return resolved
        }

        const lookupPromise = (async (): Promise<string | undefined> => {
            let pn: string | undefined

            // 1. Check signalRepository lidMapping reverse store
            if (this.sock.signalRepository?.lidMapping?.getPNForLID) {
                try {
                    const res = await this.sock.signalRepository.lidMapping.getPNForLID(lidJid)
                    if (res) pn = normalizeContactJid(res)
                } catch (err: any) {
                    this.recordDiagnostic('debug', 'pn_cache_lookup_failed', {
                        operationId: opId,
                        contactJid: lidJid,
                        isLocked: this.isContactLocked(lidJid),
                        errorMessage: err?.message || String(err)
                    })
                }
            }

            // 2. Query via USync onWhatsApp if not yet in cache
            if (!pn && this.sock.onWhatsApp && this.isSocketOpen()) {
                try {
                    const res = await this.sock.onWhatsApp(lidJid)
                    const cleanLid = normalizeContactJid(lidJid)
                    const entry = res?.find(r => {
                        const rLid = normalizeContactJid(r?.lid || '')
                        const rJid = normalizeContactJid(r?.jid || '')
                        return rLid === cleanLid || rJid === cleanLid
                    })
                    const candidate = entry?.pn || (entry?.jid && entry.jid.endsWith('@s.whatsapp.net') ? entry.jid : undefined)
                    if (candidate) {
                        pn = normalizeContactJid(candidate)
                    }
                } catch (err: any) {
                    this.recordDiagnostic('debug', 'pn_usync_lookup_failed', {
                        operationId: opId,
                        contactJid: lidJid,
                        isLocked: this.isContactLocked(lidJid),
                        errorMessage: err?.message || String(err)
                    })
                }
            }

            if (pn && pn.endsWith('@s.whatsapp.net')) {
                state.lid = normalizeContactJid(lidJid)
                if (this.sock.signalRepository?.lidMapping?.storeLIDPNMappings) {
                    await this.sock.signalRepository.lidMapping.storeLIDPNMappings([{ pn, lid: lidJid }]).catch(() => { })
                }
                this.linkAliases(pn, lidJid)
                this.recordDiagnostic('info', 'pn_resolved_for_lid', {
                    operationId: opId,
                    contactJid: lidJid,
                    resolvedPn: pn,
                    resolvedLid: lidJid,
                    isLocked: this.isContactLocked(pn) || this.isContactLocked(lidJid),
                    socketStateAfter: this.getSocketState()
                })
                return pn
            }

            return undefined
        })()

        this.inFlightLidLookups.set(lidJid, lookupPromise)
        try {
            return await lookupPromise
        } finally {
            if (this.inFlightLidLookups.get(lidJid) === lookupPromise) {
                this.inFlightLidLookups.delete(lidJid)
            }
        }
    }

    /**
     * Force a deduplicated presence subscription request to refresh current state on demand
     */
    async resubscribe(jid: string): Promise<void> {
        if (this.isDestroyed) return
        const normalized = normalizeContactJid(jid)
        if (!normalized) return

        const opId = this.nextOpId('resub')
        const targets = this.collectUniqueTargets([normalized])
        for (const target of targets) {
            if (this.isDestroyed || !this.isSocketOpen()) break
            await this.subscribeTarget(target, opId, true)
        }
    }

    /**
     * Sequentially and deduplicatedly re-subscribe all monitored contacts.
     * Guarded against overlapping invocations.
     */
    private async resubscribeAll(reason: string): Promise<void> {
        if (this.isDestroyed || !this.isSocketOpen() || this.resubscribeInProgress) {
            return
        }

        this.resubscribeInProgress = true
        const opId = this.nextOpId('resub-all')
        const socketStateBefore = this.getSocketState()

        try {
            // Resolve any missing LIDs or PNs for monitored contacts first
            if (this.options.resolveLid) {
                const pnSnapshot = Array.from(this.monitoredJids).filter(j => j.endsWith('@s.whatsapp.net'))
                for (const pn of pnSnapshot) {
                    if (this.isDestroyed || !this.isSocketOpen()) return
                    const state = this.contactStates.get(pn)
                    if (state && !state.lid) {
                        await this.discoverLid(pn, state, opId)
                    }
                }
                const lidSnapshot = Array.from(this.monitoredJids).filter(j => j.endsWith('@lid'))
                for (const lid of lidSnapshot) {
                    if (this.isDestroyed || !this.isSocketOpen()) return
                    if (!this.aliasMap.get(lid)) {
                        const state = this.contactStates.get(lid) || {
                            jid: lid,
                            lid,
                            currentStatus: 'unknown',
                            sessions: []
                        }
                        await this.discoverPn(lid, state, opId)
                    }
                }
            }

            const targets = this.collectUniqueTargets(this.monitoredJids)
            this.recordDiagnostic('info', 'resubscribe_all_started', {
                operationId: opId,
                reason,
                socketStateBefore,
                details: { targetCount: targets.length }
            })

            for (const target of targets) {
                if (this.isDestroyed || !this.isSocketOpen()) break
                await this.subscribeTarget(target, opId, true)
            }

            this.recordDiagnostic('info', 'resubscribe_all_completed', {
                operationId: opId,
                reason,
                socketStateBefore,
                socketStateAfter: this.getSocketState(),
                details: { targetCount: targets.length }
            })
        } finally {
            this.resubscribeInProgress = false
        }
    }

    /**
     * Unsubscribe and stop monitoring presence for one or more contacts
     */
    unsubscribe(jid: string | string[]): void {
        const opId = this.nextOpId('unsub')
        const socketStateBefore = this.getSocketState()
        const jids = Array.isArray(jid) ? jid : [jid]

        for (const rawJid of jids) {
            const normalized = normalizeContactJid(rawJid)
            if (!normalized) continue

            const alias = this.aliasMap.get(normalized)
            const state = this.contactStates.get(normalized) || (alias ? this.contactStates.get(alias) : undefined)
            const lid = state?.lid || (normalized.endsWith('@lid') ? normalized : alias)
            const pn = normalized.endsWith('@s.whatsapp.net') ? normalized : (alias && alias.endsWith('@s.whatsapp.net') ? alias : undefined)

            this.monitoredJids.delete(normalized)
            this.activeSubscribedJids.delete(normalized)
            if (alias) {
                this.monitoredJids.delete(alias)
                this.activeSubscribedJids.delete(alias)
            }
            if (lid) {
                this.monitoredJids.delete(lid)
                this.activeSubscribedJids.delete(lid)
            }

            this.recordDiagnostic('info', 'subscription_removed', {
                operationId: opId,
                contactJid: normalized,
                resolvedPn: pn,
                resolvedLid: lid,
                socketStateBefore,
                socketStateAfter: this.getSocketState()
            })
        }
    }

    /**
     * Get current presence tracking state for a specific contact
     */
    getStatus(jid: string): ContactPresenceState | undefined {
        const canonical = this.resolveCanonicalJid(jid)
        return canonical ? this.contactStates.get(canonical) : undefined
    }

    /**
     * Get all unique monitored contacts' states
     */
    getAllStatuses(): Map<string, ContactPresenceState> {
        const unique = new Map<string, ContactPresenceState>()
        for (const [, state] of this.contactStates.entries()) {
            if (!unique.has(state.jid)) {
                unique.set(state.jid, state)
            }
        }
        return unique
    }

    /**
     * Get list of currently monitored JIDs
     */
    getMonitoredJids(): string[] {
        return Array.from(this.monitoredJids)
    }

    /**
     * Dynamically change the timezone for this PresenceTracker instance (e.g. '+5', '+05:00', 'Asia/Karachi')
     */
    setTimezone(zone: string | number): void {
        this.timeZone = zone
        this.options.timeZone = zone
        this.options.timezone = zone
    }

    /**
     * Get the current timezone of this PresenceTracker instance
     */
    getTimezone(): string | number {
        return this.timeZone
    }

    /**
     * Format time with this tracker's configured timezone
     */
    formatTime(date: Date | number): string {
        return formatTime(date, this.timeZone)
    }

    /**
     * Format date & time with this tracker's configured timezone
     */
    formatDateTime(date: Date | number): string {
        return formatDateTime(date, this.timeZone)
    }

    /**
     * Format timestamp into human-readable relative time (e.g. "2m ago")
     */
    formatTimeAgo(date: Date | number): string {
        return formatTimeAgo(date)
    }

    /**
     * Stop tracking and clean up event listeners and timers
     */
    destroy(): void {
        if (this.isDestroyed) return
        const opId = this.nextOpId('destroy')
        const socketStateBefore = this.getSocketState()

        this.isDestroyed = true
        this.isConnected = false

        this.detachSocketListeners()
        this.stopResubscribeTimer()

        this.monitoredJids.clear()
        this.activeSubscribedJids.clear()
        this.inFlightSubscriptions.clear()
        this.inFlightLidLookups.clear()
        this.lockedJids.clear()

        this.recordDiagnostic('info', 'tracker_destroyed', {
            operationId: opId,
            socketStateBefore,
            socketStateAfter: this.getSocketState()
        })

        this.removeAllListeners()
    }

    stop(): void {
        this.destroy()
    }

    /**
     * Start method for lifecycle compatibility. Monitoring begins upon instantiation / subscription.
     */
    async start(): Promise<void> {
        // No-op / resolves immediately
    }

    /**
     * Compatibility alias for getStatus / getAllStatuses
     */
    getState(jid?: string) {
        if (jid) {
            return this.getStatus(jid)
        }
        const map = this.getAllStatuses()
        const obj: { [key: string]: ContactPresenceState } = {}
        for (const [k, v] of map.entries()) {
            obj[k] = v
        }
        return obj
    }

    /**
     * Compatibility helper to get the latest session for a contact
     */
    getSession(jid: string): PresenceSession | null {
        const state = this.getStatus(jid)
        if (!state || !state.sessions.length) return null
        return state.sessions[state.sessions.length - 1]
    }

    /**
     * Compatibility helper to get sessions
     */
    getSessions(jid?: string): PresenceSession[] {
        if (jid) {
            const state = this.getStatus(jid)
            return state ? state.sessions : []
        }
        const all: PresenceSession[] = []
        const seen = new Set<ContactPresenceState>()
        for (const state of this.contactStates.values()) {
            if (seen.has(state)) continue
            seen.add(state)
            all.push(...state.sessions)
        }
        return all
    }

    /**
     * Check if a contact JID is currently being monitored
     */
    isMonitoring(jid: string): boolean {
        const norm = normalizeContactJid(jid)
        if (!norm) return false
        if (this.monitoredJids.has(norm)) return true
        const alias = this.aliasMap.get(norm)
        return !!alias && this.monitoredJids.has(alias)
    }

    private handleLidMappingUpdate(mapping: { lid: string; pn: string }): void {
        try {
            if (this.isDestroyed || !mapping?.lid || !mapping?.pn) return
            const pn = normalizeContactJid(mapping.pn)
            const lid = normalizeContactJid(mapping.lid)
            const wasLidMonitored = this.monitoredJids.has(lid)
            this.linkAliases(pn, lid)

            // If PN is actively monitored and we just learned its LID, subscribe to LID once
            if (this.isMonitoring(pn) && !wasLidMonitored && !this.activeSubscribedJids.has(lid) && this.isSocketOpen()) {
                const opId = this.nextOpId('lid-map')
                this.subscribeTarget(lid, opId, false).catch(() => { })
            }
        } catch (err: any) {
            this.recordDiagnostic('error', 'lid_mapping_handler_error', {
                operationId: this.nextOpId('lid-err'),
                errorMessage: err?.message || String(err),
                socketStateAfter: this.getSocketState()
            })
        }
    }

    private handleConnectionUpdate(update: Partial<ConnectionState>): void {
        try {
            if (this.isDestroyed || !update) return
            const { connection, lastDisconnect } = update
            if (!connection) return

            const opId = this.nextOpId('conn')
            const socketStateBefore = this.getSocketState()

            if (connection === 'close') {
                this.isConnected = false
                this.activeSubscribedJids.clear()
                this.stopResubscribeTimer()

                const err = lastDisconnect?.error as any
                this.recordDiagnostic('info', 'connection_closed_monitoring_paused', {
                    operationId: opId,
                    reason: err?.message || 'connection closed',
                    socketStateBefore,
                    socketStateAfter: this.getSocketState(),
                    details: {
                        statusCode: err?.output?.statusCode,
                        closeCode: err?.data?.closeCode,
                        closeReason: err?.data?.closeReason
                    }
                })
                return
            }

            if (connection === 'connecting') {
                this.isConnected = false
                this.stopResubscribeTimer()
                this.recordDiagnostic('debug', 'connection_connecting', {
                    operationId: opId,
                    socketStateBefore,
                    socketStateAfter: this.getSocketState()
                })
                return
            }

            if (connection === 'open') {
                this.isConnected = true
                this.recordDiagnostic('info', 'connection_opened_monitoring_resuming', {
                    operationId: opId,
                    socketStateBefore,
                    socketStateAfter: this.getSocketState(),
                    details: {
                        autoResubscribe: this.options.autoResubscribe,
                        monitoredCount: this.monitoredJids.size
                    }
                })

                if (this.options.autoResubscribe) {
                    this.startResubscribeTimer()
                    if (this.monitoredJids.size > 0) {
                        this.resubscribeAll('connection_open').catch(err => {
                            this.recordDiagnostic('warn', 'reconnect_resubscribe_error', {
                                operationId: opId,
                                errorMessage: err?.message || String(err),
                                socketStateAfter: this.getSocketState()
                            })
                            this.options.logger?.warn?.({ err }, 'Failed to re-subscribe presence after reconnect')
                        })
                    }
                }
            }
        } catch (err: any) {
            this.recordDiagnostic('error', 'connection_update_handler_error', {
                operationId: this.nextOpId('conn-err'),
                errorMessage: err?.message || String(err),
                socketStateAfter: this.getSocketState()
            })
        }
    }

    private handleMessagesUpsert({ messages }: { messages: WAMessage[] }): void {
        try {
            if (!messages || this.isDestroyed) return

            for (const msg of messages) {
                if (!msg || msg.key?.fromMe) continue

                const remoteJid = normalizeContactJid(msg.key?.remoteJid || '')
                const altJid = normalizeContactJid((msg.key as any)?.remoteJidAlt || '')
                const participant = normalizeContactJid(msg.key?.participant || '')
                const participantAlt = normalizeContactJid((msg.key as any)?.participantAlt || '')

                // Link any LID <-> PN mappings present in the message envelope
                if (remoteJid && altJid) this.linkAliases(remoteJid, altJid)
                if (participant && participantAlt) this.linkAliases(participant, participantAlt)

                // Determine if message is from a monitored contact
                const candidates = [remoteJid, altJid, participant, participantAlt].filter(Boolean)
                for (const c of candidates) {
                    const canonical = this.resolveCanonicalJid(c)
                    if (canonical && this.isMonitoring(canonical)) {
                        // Contact actively sent a message -> Definitely ONLINE
                        this.processContactPresence(canonical, { lastKnownPresence: 'available' })
                        break
                    }
                }
            }
        } catch (err: any) {
            this.recordDiagnostic('error', 'messages_upsert_handler_error', {
                operationId: this.nextOpId('msg-err'),
                errorMessage: err?.message || String(err),
                socketStateAfter: this.getSocketState()
            })
        }
    }

    private updateContactLockState(rawJid: string, locked: boolean): void {
        const norm = normalizeContactJid(rawJid)
        if (!norm) return
        if (locked) {
            this.lockedJids.add(norm)
        } else {
            this.lockedJids.delete(norm)
        }
        const alias = this.aliasMap.get(norm)
        if (alias) {
            if (locked) this.lockedJids.add(alias)
            else this.lockedJids.delete(alias)
        }
        const canonical = this.resolveCanonicalJid(norm)
        if (canonical && this.isMonitoring(canonical)) {
            const state = this.contactStates.get(canonical)
            if (state) {
                state.isLocked = locked
            }
            const identity = this.resolveIdentityPair(canonical)
            this.recordDiagnostic('info', 'chat_lock_state_changed', {
                operationId: this.nextOpId('lock'),
                contactJid: canonical,
                resolvedPn: identity.pn,
                resolvedLid: state?.lid || identity.lid,
                isLocked: locked,
                subscriptionState: state?.subscriptionState
            })
        }
    }

    private handleChatsLock(update: { id: string; locked: boolean }): void {
        try {
            if (this.isDestroyed || !update?.id || typeof update.locked !== 'boolean') return
            this.updateContactLockState(update.id, update.locked)
        } catch { }
    }

    private handleChatsUpdate(updates: { id?: string; locked?: boolean }[]): void {
        try {
            if (this.isDestroyed || !Array.isArray(updates)) return
            for (const u of updates) {
                if (u?.id && typeof u.locked === 'boolean') {
                    this.updateContactLockState(u.id, u.locked)
                }
            }
        } catch { }
    }

    private resolveViaCacheSync(jid: string): string | undefined {
        if (!jid) return undefined
        const mappingCache = this.sock?.signalRepository?.lidMapping?.mappingCache
        if (!mappingCache?.get) return undefined
        const atIdx = jid.indexOf('@')
        if (atIdx <= 0) return undefined
        const user = jid.slice(0, atIdx)
        if (jid.endsWith('@lid')) {
            const pnUser = mappingCache.get(`lid:${user}`)
            if (pnUser) {
                const pn = `${pnUser}@s.whatsapp.net`
                this.linkAliases(pn, jid)
                return this.resolveCanonicalJid(pn)
            }
        } else if (jid.endsWith('@s.whatsapp.net')) {
            const lidUser = mappingCache.get(`pn:${user}`)
            if (lidUser) {
                const lid = `${lidUser}@lid`
                this.linkAliases(jid, lid)
                return this.resolveCanonicalJid(lid)
            }
        }
        return undefined
    }

    private async recoverAndProcessPresence(normParticipant: string, normId: string, data: PresenceData): Promise<void> {
        try {
            if (this.isDestroyed) return
            const lidMapping = this.sock?.signalRepository?.lidMapping
            let matchedJid: string | undefined
            const candidates = [normParticipant, normId].filter(Boolean)

            if (lidMapping) {
                for (const candidate of candidates) {
                    if (candidate.endsWith('@lid') && typeof lidMapping.getPNForLID === 'function') {
                        const pn = await lidMapping.getPNForLID(candidate).catch(() => null)
                        if (pn) {
                            const normPn = normalizeContactJid(pn)
                            this.linkAliases(normPn, candidate)
                            const resolved = this.resolveCanonicalJid(normPn) || this.resolveCanonicalJid(candidate)
                            if (resolved && this.isMonitoring(resolved)) {
                                matchedJid = resolved
                                break
                            }
                        }
                    } else if (candidate.endsWith('@s.whatsapp.net') && lidMapping.mappingCache?.get) {
                        const user = candidate.split('@')[0]
                        const lidUser = lidMapping.mappingCache.get(`pn:${user}`)
                        if (lidUser) {
                            const lid = `${lidUser}@lid`
                            this.linkAliases(candidate, lid)
                            const resolved = this.resolveCanonicalJid(candidate) || this.resolveCanonicalJid(lid)
                            if (resolved && this.isMonitoring(resolved)) {
                                matchedJid = resolved
                                break
                            }
                        }
                    }
                }
            }

            if (this.isDestroyed) return

            if (matchedJid) {
                this.processContactPresence(matchedJid, data)
            } else {
                const sampleJid = normParticipant || normId
                this.recordDiagnostic('debug', 'presence_update_unmatched', {
                    operationId: this.nextOpId('unmatched'),
                    contactJid: sampleJid,
                    isLocked: this.isContactLocked(sampleJid),
                    details: {
                        incomingId: normId,
                        incomingParticipant: normParticipant,
                        monitoredCount: this.monitoredJids.size
                    }
                })
            }
        } catch { }
    }

    private handlePresenceUpdate(update: { id: string; presences: { [participant: string]: PresenceData } }): void {
        try {
            if (this.isDestroyed || !update || !update.presences) return
            const { id, presences } = update

            for (const [participant, data] of Object.entries(presences)) {
                if (!data) continue
                const normParticipant = normalizeContactJid(participant)
                const normId = normalizeContactJid(id)

                // Find matching monitored JID (checking participant first, then chat id, resolving aliases + sync cache)
                let matchedJid = this.resolveCanonicalJid(normParticipant)
                    || this.resolveCanonicalJid(normId)
                    || this.resolveViaCacheSync(normParticipant)
                    || (normId !== normParticipant ? this.resolveViaCacheSync(normId) : undefined)

                if (!matchedJid || !this.isMonitoring(matchedJid)) {
                    const lidMapping = this.sock?.signalRepository?.lidMapping
                    if (lidMapping && (normParticipant.endsWith('@lid') || normId.endsWith('@lid') || lidMapping.mappingCache)) {
                        void this.recoverAndProcessPresence(normParticipant, normId, data)
                    } else {
                        const sampleJid = normParticipant || normId
                        this.recordDiagnostic('debug', 'presence_update_unmatched', {
                            operationId: this.nextOpId('unmatched'),
                            contactJid: sampleJid,
                            isLocked: this.isContactLocked(sampleJid),
                            details: {
                                incomingId: normId,
                                incomingParticipant: normParticipant,
                                monitoredCount: this.monitoredJids.size
                            }
                        })
                    }
                    continue
                }

                this.processContactPresence(matchedJid, data)
            }
        } catch (err: any) {
            this.recordDiagnostic('error', 'presence_update_handler_error', {
                operationId: this.nextOpId('pres-err'),
                contactJid: update?.id,
                errorMessage: err?.message || String(err),
                socketStateAfter: this.getSocketState()
            })
        }
    }

    private processContactPresence(jid: string, data: PresenceData): void {
        const opId = this.nextOpId('pres')
        const socketStateBefore = this.getSocketState()

        let state = this.contactStates.get(jid)
        if (!state) {
            state = {
                jid,
                isLocked: this.isContactLocked(jid),
                currentStatus: 'unknown',
                sessions: []
            }
            this.contactStates.set(jid, state)
        } else if (state.isLocked === undefined) {
            state.isLocked = this.isContactLocked(jid)
        }

        const isLocked = state.isLocked ?? this.isContactLocked(state.jid)
        const previousStatus = state.currentStatus
        const previousPresence = state.lastKnownPresence
        const rawPresence = data.lastKnownPresence
        const rawLastSeen = data.lastSeen
        const hasExplicitLastSeen = typeof rawLastSeen === 'number' && !isNaN(rawLastSeen) && rawLastSeen > 0
        const identity = this.resolveIdentityPair(state.jid)

        this.recordDiagnostic('debug', 'presence_update_incoming', {
            operationId: opId,
            contactJid: state.jid,
            resolvedPn: identity.pn,
            resolvedLid: state.lid || identity.lid,
            isLocked,
            subscriptionState: state.subscriptionState,
            previousStatus,
            previousPresence,
            currentPresence: rawPresence,
            socketStateBefore,
            details: hasExplicitLastSeen ? { rawLastSeen } : undefined
        })

        if (hasExplicitLastSeen) {
            const ms = rawLastSeen > 1e11 ? rawLastSeen : rawLastSeen * 1000
            state.serverLastSeen = new Date(ms)
            state.serverLastSeenTimestamp = ms
            state.lastSeenTimestamp = ms
            state.lastSeen = state.serverLastSeen
        }

        if (isOnlinePresence(rawPresence)) {
            // Guard: Duplicate online events (e.g. available followed by composing/recording/paused or repeated available)
            if (state.currentStatus === 'online') {
                state.lastKnownPresence = rawPresence
                if (previousPresence !== rawPresence && rawPresence) {
                    const chatstateEvent: PresenceChatstateEventData = {
                        jid: state.jid,
                        lid: state.lid,
                        status: 'online',
                        previousPresence,
                        rawPresence,
                        timestamp: new Date()
                    }
                    this.safeEmit('chatstate', chatstateEvent, opId)
                }
                this.recordDiagnostic('debug', 'presence_active_state_updated', {
                    operationId: opId,
                    contactJid: state.jid,
                    resolvedPn: identity.pn,
                    resolvedLid: state.lid || identity.lid,
                    previousStatus,
                    currentStatus: state.currentStatus,
                    previousPresence,
                    currentPresence: rawPresence,
                    socketStateBefore,
                    socketStateAfter: this.getSocketState()
                })
                return
            }

            // ONLINE transition
            const now = new Date()
            state.currentStatus = 'online'
            state.currentSessionStart = now
            state.lastOnlineAt = now
            state.lastOnlineAtFormatted = this.formatDateTime(now)
            state.lastKnownPresence = rawPresence
            state.lastSeenTimestamp = now.getTime()
            state.lastSeen = now
            state.lastSeenFormatted = this.formatDateTime(now)
            if (state.serverLastSeen) {
                state.serverLastSeenFormatted = this.formatDateTime(state.serverLastSeen)
            }

            if (this.options.logToConsole) {
                console.log(`[Presence] ${state.jid} is ONLINE at ${this.formatTime(now)}`)
            }

            const eventData: PresenceEventData = {
                jid: state.jid,
                lid: state.lid,
                status: 'online',
                onlineAt: now,
                rawPresence,
                ...(state.lastSeen ? {
                    lastSeen: state.lastSeen,
                    lastSeenTimestamp: state.lastSeenTimestamp
                } : {})
            }

            this.safeEmit('online', eventData, opId)
            this.safeEmit('presence', eventData, opId)
            if (rawPresence && rawPresence !== 'available') {
                this.safeEmit('chatstate', {
                    jid: state.jid,
                    lid: state.lid,
                    status: 'online',
                    previousPresence,
                    rawPresence,
                    timestamp: now
                } as PresenceChatstateEventData, opId)
            }

            this.recordDiagnostic('info', 'presence_transition_online', {
                operationId: opId,
                contactJid: state.jid,
                resolvedPn: identity.pn,
                resolvedLid: state.lid || identity.lid,
                isLocked,
                subscriptionState: state.subscriptionState,
                previousStatus,
                currentStatus: state.currentStatus,
                previousPresence,
                currentPresence: rawPresence,
                socketStateBefore,
                socketStateAfter: this.getSocketState()
            })
        } else if (isOfflinePresence(rawPresence)) {
            // Guard: Duplicate offline events
            if (state.currentStatus === 'offline') {
                state.lastKnownPresence = rawPresence
                this.recordDiagnostic('debug', 'presence_duplicate_offline_ignored', {
                    operationId: opId,
                    contactJid: state.jid,
                    resolvedPn: identity.pn,
                    resolvedLid: state.lid || identity.lid,
                    previousStatus,
                    currentStatus: state.currentStatus,
                    previousPresence,
                    currentPresence: rawPresence,
                    socketStateBefore,
                    socketStateAfter: this.getSocketState()
                })
                return
            }

            // OFFLINE transition from an active online session
            if (state.currentStatus === 'online' && state.currentSessionStart) {
                const now = new Date()
                const onlineAt = state.currentSessionStart
                const offlineAt = now
                const durationMs = Math.max(0, offlineAt.getTime() - onlineAt.getTime())
                const duration = formatDuration(durationMs)

                const session: PresenceSession = {
                    onlineAt,
                    offlineAt,
                    durationMs,
                    duration
                }

                state.sessions.push(session)
                state.currentStatus = 'offline'
                state.currentSessionStart = undefined
                state.lastOfflineAt = offlineAt
                state.lastOfflineAtFormatted = this.formatDateTime(offlineAt)
                state.lastDurationMs = durationMs
                state.lastDuration = duration
                state.lastKnownPresence = rawPresence

                // When transitioning offline without an explicit server timestamp, use offlineAt
                if (!hasExplicitLastSeen) {
                    state.lastSeenTimestamp = offlineAt.getTime()
                    state.lastSeen = offlineAt
                }
                state.lastSeenFormatted = state.lastSeen ? this.formatDateTime(state.lastSeen) : undefined
                if (state.serverLastSeen) {
                    state.serverLastSeenFormatted = this.formatDateTime(state.serverLastSeen)
                }

                if (this.options.logToConsole) {
                    console.log(`[Presence] ${state.jid} is OFFLINE at ${this.formatTime(offlineAt)}`)
                    console.log(`ONLINE  : ${this.formatTime(onlineAt)}`)
                    console.log(`OFFLINE : ${this.formatTime(offlineAt)}`)
                    console.log(`Duration: ${duration}`)
                    console.log(`[Presence] Online duration: ${duration}`)
                }

                const eventData: PresenceEventData = {
                    jid: state.jid,
                    lid: state.lid,
                    status: 'offline',
                    onlineAt,
                    offlineAt,
                    duration,
                    rawPresence,
                    ...(state.lastSeen ? {
                        lastSeen: state.lastSeen,
                        lastSeenTimestamp: state.lastSeenTimestamp
                    } : {})
                }

                this.safeEmit('offline', eventData, opId)
                this.safeEmit('session', { ...session, jid: state.jid }, opId)
                this.safeEmit('presence', eventData, opId)

                this.recordDiagnostic('info', 'presence_transition_offline', {
                    operationId: opId,
                    contactJid: state.jid,
                    resolvedPn: identity.pn,
                    resolvedLid: state.lid || identity.lid,
                    isLocked,
                    subscriptionState: state.subscriptionState,
                    previousStatus,
                    currentStatus: state.currentStatus,
                    previousPresence,
                    currentPresence: rawPresence,
                    socketStateBefore,
                    socketStateAfter: this.getSocketState(),
                    details: { duration, durationMs }
                })
            } else {
                // Initial offline state received without a prior tracked online start
                state.currentStatus = 'offline'
                state.lastKnownPresence = rawPresence
                if (!hasExplicitLastSeen && !state.lastOfflineAt) {
                    state.lastOfflineAt = state.lastSeen || new Date()
                } else if (state.lastSeen) {
                    state.lastOfflineAt = state.lastSeen
                }
                state.lastOfflineAtFormatted = state.lastOfflineAt ? this.formatDateTime(state.lastOfflineAt) : undefined
                state.lastSeenFormatted = state.lastSeen ? this.formatDateTime(state.lastSeen) : undefined
                if (state.serverLastSeen) {
                    state.serverLastSeenFormatted = this.formatDateTime(state.serverLastSeen)
                }

                const eventData: PresenceEventData = {
                    jid: state.jid,
                    lid: state.lid,
                    status: 'offline',
                    rawPresence,
                    ...(state.lastOfflineAt ? {
                        offlineAt: state.lastOfflineAt
                    } : {}),
                    ...(state.lastSeen ? {
                        lastSeen: state.lastSeen,
                        lastSeenTimestamp: state.lastSeenTimestamp
                    } : {})
                }

                this.safeEmit('offline', eventData, opId)
                this.safeEmit('presence', eventData, opId)

                this.recordDiagnostic('info', 'presence_initial_offline', {
                    operationId: opId,
                    contactJid: state.jid,
                    resolvedPn: identity.pn,
                    resolvedLid: state.lid || identity.lid,
                    isLocked,
                    subscriptionState: state.subscriptionState,
                    previousStatus,
                    currentStatus: state.currentStatus,
                    previousPresence,
                    currentPresence: rawPresence,
                    socketStateBefore,
                    socketStateAfter: this.getSocketState()
                })
            }
        }
    }
}

/**
 * Helper to monitor presence for one or more contacts
 *
 * @example
 * const monitor = monitorPresence(sock, ['1234567890@s.whatsapp.net', '1234567890@s.whatsapp.net'])
 *
 * monitor.on('online', (data) => {
 *     console.log(data)
 * })
 *
 * monitor.on('offline', (data) => {
 *     console.log(data)
 * })
 */
export function monitorPresence(
    sock: PresenceTrackerSocket,
    jid?: string | string[],
    options?: PresenceTrackerOptions
): PresenceTracker {
    const tracker = new PresenceTracker(sock, options)
    if (jid) {
        tracker.subscribe(jid).catch(err => {
            options?.logger?.error?.({ err }, 'Failed initial presence subscription')
        })
    }
    return tracker
}

export const createPresenceTracker = monitorPresence

// Compatibility aliases for PresenceMonitor
export const PresenceMonitor = PresenceTracker
export type PresenceMonitor = PresenceTracker
export type PresenceMonitorOptions = PresenceTrackerOptions
