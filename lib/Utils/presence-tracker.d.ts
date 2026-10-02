import { EventEmitter } from 'events';
import type { BaileysEventEmitter, WAPresence } from '../Types';
export interface PresenceTrackerLogger {
    info?: (...args: any[]) => void;
    warn?: (...args: any[]) => void;
    error?: (...args: any[]) => void;
    debug?: (...args: any[]) => void;
}
export interface PresenceTrackerOptions {
    /** Enable console logging for presence transitions according to specification (default: true) */
    logToConsole?: boolean;
    /** Auto resubscribe on socket reconnect (default: true) */
    autoResubscribe?: boolean;
    /** Automatically resolve LID via USync onWhatsApp if not known (default: true) */
    resolveLid?: boolean;
    /** Infer online presence when an incoming message is received from the contact (default: true) */
    trackMessagesAsPresence?: boolean;
    /** Custom timezone or UTC offset (e.g. '+05:00', '+5', 5, 'Asia/Karachi') - default: '+05:00' */
    timeZone?: string | number;
    /** Alias for timeZone */
    timezone?: string | number;
    /** Custom logger */
    logger?: PresenceTrackerLogger;
}
export interface PresenceSession {
    onlineAt: Date;
    offlineAt: Date;
    durationMs: number;
    duration: string;
}
export interface ContactPresenceState {
    jid: string;
    lid?: string;
    currentStatus: 'online' | 'offline' | 'unknown';
    lastKnownPresence?: WAPresence;
    currentSessionStart?: Date;
    lastOnlineAt?: Date;
    lastOfflineAt?: Date;
    lastOnlineAtFormatted?: string;
    lastOfflineAtFormatted?: string;
    lastDurationMs?: number;
    lastDuration?: string;
    lastSeen?: Date;
    lastSeenTimestamp?: number;
    lastSeenFormatted?: string;
    serverLastSeen?: Date;
    serverLastSeenTimestamp?: number;
    serverLastSeenFormatted?: string;
    sessions: PresenceSession[];
}
export interface PresenceEventData {
    jid: string;
    lid?: string;
    status: 'online' | 'offline';
    onlineAt?: Date;
    offlineAt?: Date;
    duration?: string;
    rawPresence?: WAPresence;
    lastSeen?: Date;
    lastSeenTimestamp?: number;
}
export interface PresenceTrackerSocket {
    ev: BaileysEventEmitter;
    presenceSubscribe: (toJid: string, tcToken?: Buffer) => Promise<void>;
    onWhatsApp?: (...jids: string[]) => Promise<{
        jid: string;
        exists: boolean;
        lid?: string;
        pn?: string;
    }[] | undefined>;
    signalRepository?: {
        lidMapping?: {
            getLIDForPN?: (pn: string) => Promise<string | null>;
            getPNForLID?: (lid: string) => Promise<string | null>;
        };
    };
}
/**
 * Get current default timezone
 */
export declare function getDefaultTimezone(): string | number;
/**
 * Dynamically set the global default timezone (e.g., '+05:00', '+5', 5, 'Asia/Karachi', 'UTC')
 */
export declare function setDefaultTimezone(zone: string | number): void;
export declare const setTimezone: typeof setDefaultTimezone;
export declare const getTimezone: typeof getDefaultTimezone;
/**
 * Parse timezone into offset info or IANA time zone identifier
 */
export declare function parseTimezone(zone?: string | number): {
    isOffset: boolean;
    offsetMs: number;
    ianaZone?: string;
    label: string;
};
/**
 * Format milliseconds into HH:MM:SS duration string
 */
export declare function formatDuration(ms: number): string;
/**
 * Format Date into HH:MM:SS time string in specified or configured timezone
 */
export declare function formatTime(date: Date | number, zone?: string | number): string;
/**
 * Format Date into YYYY-MM-DD HH:MM:SS in specified or configured timezone
 */
export declare function formatDateTime(date: Date | number, zone?: string | number): string;
/**
 * Format timestamp into human-readable relative time (e.g. "2m ago")
 */
export declare function formatTimeAgo(date: Date | number): string;
/**
 * Normalize input string into valid WhatsApp user JID or LID
 */
export declare function normalizeContactJid(jid: string): string;
/**
 * Determine if a WAPresence status indicates an active online state
 */
export declare function isOnlinePresence(presence?: WAPresence): boolean;
/**
 * Determine if a WAPresence status indicates offline / unavailable
 */
export declare function isOfflinePresence(presence?: WAPresence): boolean;
/**
 * PresenceTracker monitors online/offline presence transitions for specified WhatsApp contacts,
 * supporting both traditional Phone Number JIDs (@s.whatsapp.net) and modern Linked Identity JIDs (@lid).
 */
export declare class PresenceTracker extends EventEmitter {
    private sock;
    private options;
    private monitoredJids;
    private contactStates;
    private aliasMap;
    private isDestroyed;
    private timeZone;
    private boundPresenceUpdate;
    private boundConnectionUpdate;
    private boundLidMappingUpdate?;
    private boundMessagesUpsert?;
    constructor(sock: PresenceTrackerSocket, targetsOrOptions?: PresenceTrackerOptions | string | string[], options?: PresenceTrackerOptions);
    /**
     * Link Phone Number JID and LID aliases together.
     * Strictly verifies that one is a LID and one is a Phone Number to prevent cross-linking contacts.
     */
    linkAliases(jidA: string, jidB: string): void;
    /**
     * Resolve any JID (PN or LID) to the canonical ContactPresenceState key
     */
    resolveCanonicalJid(jid: string): string | undefined;
    /**
     * Subscribe to presence updates for one or more contacts
     */
    subscribe(jid: string | string[]): Promise<void>;
    /**
     * Discover and link LID for a given phone number JID
     */
    private discoverLid;
    /**
     * Force a presence subscription request to refresh current state on demand
     */
    resubscribe(jid: string): Promise<void>;
    /**
     * Unsubscribe and stop monitoring presence for one or more contacts
     */
    unsubscribe(jid: string | string[]): void;
    /**
     * Get current presence tracking state for a specific contact
     */
    getStatus(jid: string): ContactPresenceState | undefined;
    /**
     * Get all unique monitored contacts' states
     */
    getAllStatuses(): Map<string, ContactPresenceState>;
    /**
     * Get list of currently monitored JIDs
     */
    getMonitoredJids(): string[];
    /**
     * Dynamically change the timezone for this PresenceTracker instance (e.g. '+5', '+05:00', 'Asia/Karachi')
     */
    setTimezone(zone: string | number): void;
    /**
     * Get the current timezone of this PresenceTracker instance
     */
    getTimezone(): string | number;
    /**
     * Format time with this tracker's configured timezone
     */
    formatTime(date: Date | number): string;
    /**
     * Format date & time with this tracker's configured timezone
     */
    formatDateTime(date: Date | number): string;
    /**
     * Stop tracking and clean up event listeners
     */
    destroy(): void;
    stop(): void;
    /**
     * Start method for lifecycle compatibility. Monitoring begins upon instantiation / subscription.
     */
    start(): Promise<void>;
    /**
     * Compatibility alias for getStatus / getAllStatuses
     */
    getState(jid?: string): ContactPresenceState | {
        [key: string]: ContactPresenceState;
    };
    /**
     * Compatibility helper to get the latest session for a contact
     */
    getSession(jid: string): PresenceSession | null;
    /**
     * Compatibility helper to get sessions
     */
    getSessions(jid?: string): PresenceSession[];
    /**
     * Check if a contact JID is currently being monitored
     */
    isMonitoring(jid: string): boolean;
    private handleConnectionUpdate;
    private handleMessagesUpsert;
    private handlePresenceUpdate;
    private processContactPresence;
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
export declare function monitorPresence(sock: PresenceTrackerSocket, jid?: string | string[], options?: PresenceTrackerOptions): PresenceTracker;
export declare const createPresenceTracker: typeof monitorPresence;
export declare const PresenceMonitor: typeof PresenceTracker;
export type PresenceMonitor = PresenceTracker;
export type PresenceMonitorOptions = PresenceTrackerOptions;
