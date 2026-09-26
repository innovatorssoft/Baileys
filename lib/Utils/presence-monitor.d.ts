import type { PresenceData, WAPresence } from '../Types/Chat'
import type { BaileysEventEmitter, BaileysEventMap } from '../Types/Events'
import type { LIDMappingStore } from '../Signal/lid-mapping'

export type PresenceStatus = 'online' | 'offline'

export interface PresenceMonitorOptions {
    /**
     * Log transitions to console in the format:
     * `[Presence] <jid> is ONLINE/OFFLINE at <time>` / `[Presence] Online duration: HH:MM:SS`
     *
     * @default false
     */
    logToConsole?: boolean
    /**
     * Automatically re-subscribe presence after the socket reconnects
     * (when `connection.update` fires with `connection === 'open'`).
     *
     * @default false
     */
    autoResubscribe?: boolean
    /**
     * Optional timezone for display formatting, e.g. `'+05:00'` or `'-03:00'`.
     * Only affects presentation formatting; timestamps remain as reliable epoch values.
     */
    timezone?: string
}

export interface PresenceOnlineEvent {
    /** The JID as originally requested by the caller */
    jid: string
    status: 'online'
    /** Epoch ms when the online transition was observed */
    onlineAt: number
    /**
     * If the underlying presence payload carried an actual WhatsApp `lastSeen` timestamp
     * (unix seconds), it is exposed here. Otherwise the property is omitted.
     *
     * This field is controlled by WhatsApp privacy settings and may not be available.
     * It is NEVER inferred from `offlineAt`.
     */
    lastSeen?: number
}

export interface PresenceOfflineEvent {
    /** The JID as originally requested by the caller */
    jid: string
    status: 'offline'
    onlineAt: number
    /** Epoch ms when the offline transition was observed */
    offlineAt: number
    /** Session duration in milliseconds */
    durationMs: number
    /** Session duration formatted as `HH:MM:SS` (hours do not wrap at 24) */
    duration: string
    /** Actual WhatsApp lastSeen if present on the underlying event; otherwise omitted */
    lastSeen?: number
}

export interface PresenceSessionSummary extends PresenceOfflineEvent {
    status: 'offline'
}

export interface PresenceStateView {
    jid: string
    status: PresenceStatus
    onlineAt: number | null
    offlineAt: number | null
    durationMs: number | null
    duration: string | null
    lastSeen: number | null
}

export type PresenceMonitorEvents = {
    online: PresenceOnlineEvent
    offline: PresenceOfflineEvent
    session: PresenceSessionSummary
    error: Error
}

export interface MinimalSocket {
    ev: Pick<BaileysEventEmitter, 'on' | 'off'>
    presenceSubscribe?: (toJid: string, tcToken?: Buffer | undefined) => Promise<void> | void
    signalRepository?: {
        lidMapping?: LIDMappingStore
    }
}

/**
 * Format a duration in milliseconds as `HH:MM:SS`. Hours are not wrapped at 24,
 * so a 27-hour session is correctly formatted as `27:15:04`.
 *
 * @param durationMs Duration in milliseconds
 */
export declare function formatDuration(durationMs: number): string

/**
 * Monitor online/offline presence transitions for one or more WhatsApp contacts.
 *
 * The monitor consumes the existing `presence.update` event emitted by the socket
 * and automatically calls `sock.presenceSubscribe` on start (and on reconnect, if
 * `autoResubscribe` is enabled). No polling, no duplicate low-level WS listeners.
 *
 * PN/LID behavior:
 *   - Tries PN subscription first.
 *   - If a `signalRepository.lidMapping` is available, uses `getLIDForPN(pn)` as
 *     the documented fallback mechanism for PN→LID resolution.
 *   - Also listens for `lid-mapping.update` events to re-subscribe with the newly
 *     resolved LID when a mapping arrives asynchronously.
 *   - Matches presence event participants with `areJidsSameUser` so updates arrive
 *     for the same user whether emitted as a PN or a LID.
 *
 * Last-seen:
 *   - Only exposed via `lastSeen` when the underlying `PresenceData` actually
 *     includes a numeric `lastSeen` value (WhatsApp protocol / privacy permitting).
 *   - `offlineAt` is NEVER reported as `lastSeen`.
 *
 * Session semantics:
 *   - A session is `available → unavailable` only.
 *   - Duplicate `available` or `unavailable` events are idempotent (no duplicate
 *     online/offline/session emissions).
 *   - Receiving `unavailable` with no prior online state is a no-op for session
 *     bookkeeping (status updates to offline but no fake duration / no session event).
 *   - Socket reconnects do NOT fabricate fake transitions; subscriptions are
 *     renewed (if configured) and the monitor waits for the next real event.
 *
 * @example
 * ```ts
 * const monitor = monitorPresence(sock, '923001234567@s.whatsapp.net', {
 *     logToConsole: true,
 *     autoResubscribe: true,
 *     timezone: '+05:00'
 * })
 *
 * monitor.on('online',  data => console.log('ONLINE ', data))
 * monitor.on('offline', data => console.log('OFFLINE', data))
 * monitor.on('session', s    => console.log('SESSION', s))
 * monitor.on('error',   err  => console.error(err))
 *
 * // Later:
 * // monitor.stop()
 * ```
 */
export declare class PresenceMonitor {
    constructor(
        sock: MinimalSocket,
        targets: string | string[],
        options?: PresenceMonitorOptions
    )

    /** Register an event listener */
    on<E extends keyof PresenceMonitorEvents>(event: E, listener: (arg: PresenceMonitorEvents[E]) => void): this
    /** Remove an event listener */
    off<E extends keyof PresenceMonitorEvents>(event: E, listener: (arg: PresenceMonitorEvents[E]) => void): this
    /** Remove all listeners (optionally scoped to a single event) */
    removeAllListeners(event?: keyof PresenceMonitorEvents): this

    /**
     * Start monitoring: attach listeners and subscribe presence for the target JIDs.
     * Called implicitly by the `monitorPresence(...)` factory.
     */
    start(): Promise<this>
    /**
     * Stop monitoring: detach all socket event listeners and clear subscription bookkeeping.
     * After `stop()` the monitor cannot be restarted — create a new instance instead.
     */
    stop(): void

    /**
     * Return the current presence state for a single monitored JID, or `null` if unknown.
     * If called without arguments, returns a map `{ [jid]: PresenceStateView }` keyed by
     * the originally requested JIDs.
     */
    getState(jid?: string): PresenceStateView | null | { [jid: string]: PresenceStateView }

    /**
     * Return the most recent completed session for `jid`, or `null` if no session has
     * completed yet.
     */
    getSession(jid: string): PresenceSessionSummary | null

    /**
     * Return all completed sessions for `jid`, or — if `jid` is omitted — a map
     * `{ [jid]: PresenceSessionSummary[] }` for every monitored contact.
     */
    getSessions(jid?: string): PresenceSessionSummary[] | { [jid: string]: PresenceSessionSummary[] }

    /** True if the given JID (or its user) is being monitored */
    isMonitoring(jid: string): boolean
    /** The list of JIDs originally passed to `monitorPresence(...)` */
    getMonitoredJids(): string[]
}

/**
 * Factory helper. Creates a {@link PresenceMonitor} and begins monitoring
 * (async subscriptions fire in the microtask queue so errors route to the
 * `error` event rather than throwing synchronously at the call-site).
 */
export declare function monitorPresence(
    sock: MinimalSocket,
    targets: string | string[],
    options?: PresenceMonitorOptions
): PresenceMonitor
