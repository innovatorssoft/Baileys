"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceMonitor = exports.createPresenceTracker = exports.PresenceTracker = exports.getTimezone = exports.setTimezone = void 0;
exports.getDefaultTimezone = getDefaultTimezone;
exports.setDefaultTimezone = setDefaultTimezone;
exports.parseTimezone = parseTimezone;
exports.formatDuration = formatDuration;
exports.formatTime = formatTime;
exports.formatDateTime = formatDateTime;
exports.formatTimeAgo = formatTimeAgo;
exports.normalizeContactJid = normalizeContactJid;
exports.isOnlinePresence = isOnlinePresence;
exports.isOfflinePresence = isOfflinePresence;
exports.monitorPresence = monitorPresence;
const events_1 = require("events");
const jid_utils_1 = require("../WABinary/jid-utils");
let defaultTimeZone = '+05:00';
let trackerCounter = 0;
/**
 * Get current default timezone
 */
function getDefaultTimezone() {
    return defaultTimeZone;
}
/**
 * Dynamically set the global default timezone (e.g., '+05:00', '+5', 5, 'Asia/Karachi', 'UTC')
 */
function setDefaultTimezone(zone) {
    defaultTimeZone = zone;
}
exports.setTimezone = setDefaultTimezone;
exports.getTimezone = getDefaultTimezone;
/**
 * Parse timezone into offset info or IANA time zone identifier
 */
function parseTimezone(zone) {
    const tz = (zone !== undefined && zone !== null && zone !== '') ? zone : defaultTimeZone;
    if (typeof tz === 'number') {
        const sign = tz >= 0 ? '+' : '-';
        const abs = Math.abs(tz);
        const hours = Math.floor(abs);
        const mins = Math.round((abs - hours) * 60);
        const label = `UTC${sign}${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        return { isOffset: true, offsetMs: tz * 60 * 60 * 1000, label };
    }
    const str = String(tz).trim();
    const offsetMatch = str.match(/^([+-])?(\d{1,2})(?::?(\d{2}))?$/);
    if (offsetMatch) {
        const sign = offsetMatch[1] === '-' ? -1 : 1;
        const hours = parseInt(offsetMatch[2], 10);
        const mins = parseInt(offsetMatch[3] || '0', 10);
        const totalMinutes = sign * (hours * 60 + mins);
        const label = `UTC${sign >= 0 ? '+' : '-'}${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        return { isOffset: true, offsetMs: totalMinutes * 60 * 1000, label };
    }
    // Try as IANA timezone string
    return { isOffset: false, offsetMs: 0, ianaZone: str, label: str };
}
/**
 * Format milliseconds into HH:MM:SS duration string
 */
function formatDuration(ms) {
    if (!ms || ms < 0 || isNaN(ms))
        return '00:00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
/**
 * Format Date into HH:MM:SS time string in specified or configured timezone
 */
function formatTime(date, zone) {
    if (!date)
        return 'N/A';
    const d = date instanceof Date ? date : new Date(date > 1e11 ? date : date * 1000);
    const tzInfo = parseTimezone(zone);
    if (tzInfo.isOffset) {
        const target = new Date(d.getTime() + tzInfo.offsetMs);
        const hh = String(target.getUTCHours()).padStart(2, '0');
        const mm = String(target.getUTCMinutes()).padStart(2, '0');
        const ss = String(target.getUTCSeconds()).padStart(2, '0');
        return `${hh}:${mm}:${ss}`;
    }
    try {
        return new Intl.DateTimeFormat('en-GB', {
            timeZone: tzInfo.ianaZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(d);
    }
    catch (_a) {
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    }
}
/**
 * Format Date into YYYY-MM-DD HH:MM:SS in specified or configured timezone
 */
function formatDateTime(date, zone) {
    if (!date)
        return 'N/A';
    const d = date instanceof Date ? date : new Date(date > 1e11 ? date : date * 1000);
    const tzInfo = parseTimezone(zone);
    if (tzInfo.isOffset) {
        const target = new Date(d.getTime() + tzInfo.offsetMs);
        const yyyy = target.getUTCFullYear();
        const mm = String(target.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(target.getUTCDate()).padStart(2, '0');
        const hh = String(target.getUTCHours()).padStart(2, '0');
        const min = String(target.getUTCMinutes()).padStart(2, '0');
        const ss = String(target.getUTCSeconds()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
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
        }).format(d);
        return parts.replace(/,/, '');
    }
    catch (_a) {
        return d.toLocaleString();
    }
}
/**
 * Format timestamp into human-readable relative time (e.g. "2m ago")
 */
function formatTimeAgo(date) {
    if (!date)
        return 'N/A';
    const time = date instanceof Date ? date.getTime() : (date > 1e11 ? date : date * 1000);
    const diffMs = Date.now() - time;
    if (diffMs < 0)
        return 'just now';
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60)
        return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60)
        return `${diffMin}m ago`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24)
        return `${diffHour}h ago`;
    const diffDays = Math.floor(diffHour / 24);
    return `${diffDays}d ago`;
}
/**
 * Normalize input string into valid WhatsApp user JID or LID
 */
function normalizeContactJid(jid) {
    if (!jid || typeof jid !== 'string')
        return '';
    let clean = jid.trim();
    if (clean.endsWith('@whatsapp.net')) {
        clean = clean.replace('@whatsapp.net', '@s.whatsapp.net');
    }
    else if (clean.endsWith('@c.us')) {
        clean = clean.replace('@c.us', '@s.whatsapp.net');
    }
    else if (!clean.includes('@')) {
        clean = `${clean}@s.whatsapp.net`;
    }
    if (clean.endsWith('@s.whatsapp.net')) {
        clean = clean.replace(/^\+/, '');
    }
    return (0, jid_utils_1.jidNormalizedUser)(clean) || clean;
}
/**
 * Determine if a WAPresence status indicates an active online state
 */
function isOnlinePresence(presence) {
    return presence === 'available' || presence === 'composing' || presence === 'recording' || presence === 'paused';
}
/**
 * Determine if a WAPresence status indicates offline / unavailable
 */
function isOfflinePresence(presence) {
    return presence === 'unavailable';
}
/**
 * PresenceTracker monitors online/offline presence transitions for specified WhatsApp contacts,
 * supporting both traditional Phone Number JIDs (@s.whatsapp.net) and modern Linked Identity JIDs (@lid).
 */
class PresenceTracker extends events_1.EventEmitter {
    constructor(sock, targetsOrOptions, options) {
        var _a, _b, _c, _d;
        super();
        this.monitoredJids = new Set();
        this.activeSubscribedJids = new Set();
        this.inFlightSubscriptions = new Map();
        this.inFlightLidLookups = new Map();
        this.contactStates = new Map();
        this.aliasMap = new Map(); // Bidirectional: PN <-> LID
        this.lockedJids = new Set();
        this.isDestroyed = false;
        this.isConnected = true;
        this.listenersAttached = false;
        this.resubscribeInProgress = false;
        this.opSeq = 0;
        this.diagnosticHistory = [];
        this.maxDiagnosticHistory = 200;
        this.sock = sock;
        this.trackerId = `pt-${Date.now().toString(36)}-${++trackerCounter}`;
        let resolvedOptions = {};
        let initialTargets;
        if (typeof targetsOrOptions === 'string' || Array.isArray(targetsOrOptions)) {
            initialTargets = targetsOrOptions;
            resolvedOptions = options || {};
        }
        else if (targetsOrOptions) {
            resolvedOptions = targetsOrOptions;
        }
        this.hasCustomLogger = !!resolvedOptions.logger;
        this.timeZone = (_b = (_a = resolvedOptions.timeZone) !== null && _a !== void 0 ? _a : resolvedOptions.timezone) !== null && _b !== void 0 ? _b : defaultTimeZone;
        const envDebug = typeof process !== 'undefined' && ((_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.BAILEYS_PRESENCE_DEBUG) === '1';
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
        };
        // Derive initial connectivity state from socket's ws if present
        this.isConnected = ((_d = this.sock) === null || _d === void 0 ? void 0 : _d.ws) ? this.sock.ws.isOpen !== false : true;
        this.boundPresenceUpdate = this.handlePresenceUpdate.bind(this);
        this.boundConnectionUpdate = this.handleConnectionUpdate.bind(this);
        this.boundLidMappingUpdate = this.handleLidMappingUpdate.bind(this);
        this.boundChatsLock = this.handleChatsLock.bind(this);
        this.boundChatsUpdate = this.handleChatsUpdate.bind(this);
        if (this.options.trackMessagesAsPresence) {
            this.boundMessagesUpsert = this.handleMessagesUpsert.bind(this);
        }
        this.attachSocketListeners();
        this.startResubscribeTimer();
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
        });
        if (initialTargets) {
            this.subscribe(initialTargets).catch(err => {
                var _a, _b;
                this.recordDiagnostic('error', 'initial_subscribe_error', {
                    operationId: this.nextOpId('init-sub'),
                    errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err),
                    socketStateAfter: this.getSocketState()
                });
                (_b = (_a = this.options.logger) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, { err }, 'Failed initial presence subscription');
            });
        }
    }
    nextOpId(prefix) {
        return `${prefix}-${this.trackerId}-${++this.opSeq}`;
    }
    getSocketState() {
        var _a;
        const ws = (_a = this.sock) === null || _a === void 0 ? void 0 : _a.ws;
        return Object.assign({ isConnected: this.isConnected, hasWs: !!ws }, (ws ? {
            wsIsOpen: !!ws.isOpen,
            wsIsConnecting: !!ws.isConnecting,
            wsIsClosing: !!ws.isClosing,
            wsIsClosed: !!ws.isClosed
        } : {}));
    }
    isSocketOpen() {
        if (this.isDestroyed || !this.isConnected || !this.sock)
            return false;
        if (this.sock.ws) {
            return !!this.sock.ws.isOpen;
        }
        return true;
    }
    resolveIdentityPair(jid) {
        const norm = normalizeContactJid(jid);
        if (!norm)
            return {};
        if (norm.endsWith('@lid')) {
            return { lid: norm, pn: this.aliasMap.get(norm) };
        }
        if (norm.endsWith('@s.whatsapp.net')) {
            const state = this.contactStates.get(norm);
            return { pn: norm, lid: (state === null || state === void 0 ? void 0 : state.lid) || this.aliasMap.get(norm) };
        }
        return {};
    }
    recordDiagnostic(level, event, fields = {}) {
        var _a, _b;
        const entry = Object.assign({ timestamp: new Date().toISOString(), trackerId: this.trackerId, operationId: fields.operationId || this.nextOpId('op'), level,
            event }, fields);
        this.diagnosticHistory.push(entry);
        if (this.diagnosticHistory.length > this.maxDiagnosticHistory) {
            this.diagnosticHistory.shift();
        }
        if (this.options.onDiagnostic) {
            try {
                this.options.onDiagnostic(entry);
            }
            catch (_c) { }
        }
        if (this.listenerCount('diagnostic') > 0) {
            this.safeEmit('diagnostic', entry, entry.operationId);
        }
        if (this.options.diagnosticLogging) {
            const logFn = ((_a = this.options.logger) === null || _a === void 0 ? void 0 : _a[level]) || ((_b = this.options.logger) === null || _b === void 0 ? void 0 : _b.info);
            if (typeof logFn === 'function') {
                try {
                    if (this.hasCustomLogger) {
                        logFn.call(this.options.logger, entry, `[PresenceTracker] ${event}`);
                    }
                    else {
                        logFn.call(this.options.logger, JSON.stringify(entry));
                    }
                }
                catch (_d) { }
            }
        }
        return entry;
    }
    /**
     * Safely invoke all listeners for an event without letting a listener
     * exception escape back into sock.ev / WebSocket frame processing.
     */
    safeEmit(event, payload, operationId) {
        const listeners = this.rawListeners(event);
        if (!listeners.length)
            return false;
        for (const listener of listeners) {
            try {
                listener.call(this, payload);
            }
            catch (err) {
                const errMsg = (err === null || err === void 0 ? void 0 : err.message) || String(err);
                if (event !== 'diagnostic') {
                    this.recordDiagnostic('error', 'presence_listener_exception', {
                        operationId: operationId || this.nextOpId('emit-err'),
                        contactJid: payload === null || payload === void 0 ? void 0 : payload.jid,
                        errorMessage: errMsg,
                        socketStateAfter: this.getSocketState(),
                        details: { listenerEvent: event }
                    });
                }
                if (event !== 'error') {
                    const errorListeners = this.rawListeners('error');
                    for (const errListener of errorListeners) {
                        try {
                            errListener.call(this, err);
                        }
                        catch (_a) { }
                    }
                }
            }
        }
        return true;
    }
    isContactLocked(jid) {
        var _a, _b, _c, _d, _e, _f;
        const norm = normalizeContactJid(jid);
        if (!norm)
            return false;
        if (this.lockedJids.has(norm))
            return true;
        const alias = this.aliasMap.get(norm);
        if (alias && this.lockedJids.has(alias))
            return true;
        const state = this.contactStates.get(norm);
        if (state === null || state === void 0 ? void 0 : state.isLocked)
            return true;
        if ((state === null || state === void 0 ? void 0 : state.lid) && this.lockedJids.has(state.lid))
            return true;
        try {
            if ((_b = (_a = this.sock) === null || _a === void 0 ? void 0 : _a.isChatLocked) === null || _b === void 0 ? void 0 : _b.call(_a, norm))
                return true;
            if (alias && ((_d = (_c = this.sock) === null || _c === void 0 ? void 0 : _c.isChatLocked) === null || _d === void 0 ? void 0 : _d.call(_c, alias)))
                return true;
            if ((state === null || state === void 0 ? void 0 : state.lid) && ((_f = (_e = this.sock) === null || _e === void 0 ? void 0 : _e.isChatLocked) === null || _f === void 0 ? void 0 : _f.call(_e, state.lid)))
                return true;
        }
        catch (_g) { }
        return false;
    }
    attachSocketListeners() {
        var _a;
        if (this.listenersAttached || !((_a = this.sock) === null || _a === void 0 ? void 0 : _a.ev))
            return;
        this.listenersAttached = true;
        this.sock.ev.on('presence.update', this.boundPresenceUpdate);
        this.sock.ev.on('connection.update', this.boundConnectionUpdate);
        this.sock.ev.on('chats.lock', this.boundChatsLock);
        this.sock.ev.on('chats.update', this.boundChatsUpdate);
        if (this.boundLidMappingUpdate) {
            this.sock.ev.on('lid-mapping.update', this.boundLidMappingUpdate);
        }
        if (this.boundMessagesUpsert) {
            this.sock.ev.on('messages.upsert', this.boundMessagesUpsert);
        }
    }
    detachSocketListeners() {
        var _a;
        if (!this.listenersAttached || !((_a = this.sock) === null || _a === void 0 ? void 0 : _a.ev))
            return;
        this.listenersAttached = false;
        this.sock.ev.off('presence.update', this.boundPresenceUpdate);
        this.sock.ev.off('connection.update', this.boundConnectionUpdate);
        this.sock.ev.off('chats.lock', this.boundChatsLock);
        this.sock.ev.off('chats.update', this.boundChatsUpdate);
        if (this.boundLidMappingUpdate) {
            this.sock.ev.off('lid-mapping.update', this.boundLidMappingUpdate);
        }
        if (this.boundMessagesUpsert) {
            this.sock.ev.off('messages.upsert', this.boundMessagesUpsert);
        }
    }
    startResubscribeTimer() {
        this.stopResubscribeTimer();
        if (this.isDestroyed || !this.options.autoResubscribe || !(this.options.resubscribeIntervalMs > 0)) {
            return;
        }
        if (!this.isSocketOpen()) {
            return;
        }
        this.resubscribeTimer = setInterval(() => {
            if (this.isDestroyed || !this.isSocketOpen())
                return;
            this.resubscribeAll('periodic_heartbeat').catch(err => {
                this.recordDiagnostic('warn', 'periodic_resubscribe_error', {
                    operationId: this.nextOpId('hb-err'),
                    errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err),
                    socketStateAfter: this.getSocketState()
                });
            });
        }, this.options.resubscribeIntervalMs);
        if (this.resubscribeTimer && typeof this.resubscribeTimer.unref === 'function') {
            this.resubscribeTimer.unref();
        }
    }
    stopResubscribeTimer() {
        if (this.resubscribeTimer) {
            clearInterval(this.resubscribeTimer);
            this.resubscribeTimer = undefined;
        }
    }
    /**
     * Get recent structured diagnostic log entries for inspection and testing.
     */
    getDiagnostics() {
        return this.diagnosticHistory.slice();
    }
    /**
     * Get unique tracker identifier for log correlation.
     */
    getTrackerId() {
        return this.trackerId;
    }
    /**
     * Reattach this tracker to a new socket instance after a genuine WhatsApp
     * reconnection without creating duplicate trackers or monitoring loops.
     */
    reattach(newSock) {
        if (this.isDestroyed || !newSock || !newSock.ev)
            return;
        const opId = this.nextOpId('reattach');
        const socketStateBefore = this.getSocketState();
        this.stopResubscribeTimer();
        this.detachSocketListeners();
        this.activeSubscribedJids.clear();
        this.inFlightSubscriptions.clear();
        this.inFlightLidLookups.clear();
        this.sock = newSock;
        this.isConnected = this.sock.ws ? this.sock.ws.isOpen !== false : true;
        this.attachSocketListeners();
        this.recordDiagnostic('info', 'tracker_reattached', {
            operationId: opId,
            socketStateBefore,
            socketStateAfter: this.getSocketState(),
            details: { monitoredCount: this.monitoredJids.size }
        });
        if (this.isSocketOpen() && this.options.autoResubscribe) {
            this.startResubscribeTimer();
            if (this.monitoredJids.size > 0) {
                this.resubscribeAll('socket_reattached').catch(err => {
                    this.recordDiagnostic('warn', 'reattach_resubscribe_error', {
                        operationId: opId,
                        errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err),
                        socketStateAfter: this.getSocketState()
                    });
                });
            }
        }
    }
    /**
     * Link Phone Number JID and LID aliases together.
     * Strictly verifies that one is a LID and one is a Phone Number to prevent cross-linking contacts.
     */
    linkAliases(jidA, jidB) {
        const normA = normalizeContactJid(jidA);
        const normB = normalizeContactJid(jidB);
        if (!normA || !normB || normA === normB)
            return;
        const isA_Lid = normA.endsWith('@lid');
        const isB_Lid = normB.endsWith('@lid');
        const isA_Pn = normA.endsWith('@s.whatsapp.net');
        const isB_Pn = normB.endsWith('@s.whatsapp.net');
        // STRICT VALIDATION: Exactly one must be a LID and one must be a PN!
        if (!((isA_Lid && isB_Pn) || (isB_Lid && isA_Pn))) {
            return;
        }
        const pn = isA_Pn ? normA : normB;
        const lid = isA_Lid ? normA : normB;
        // If this LID was previously associated with another PN, break that old association
        const existingPnForLid = this.aliasMap.get(lid);
        if (existingPnForLid && existingPnForLid !== pn) {
            const oldState = this.contactStates.get(existingPnForLid);
            if (oldState && oldState.lid === lid) {
                oldState.lid = undefined;
            }
            this.aliasMap.delete(existingPnForLid);
        }
        this.aliasMap.set(lid, pn);
        this.aliasMap.set(pn, lid);
        const existingLidState = this.contactStates.get(lid);
        // Find or create dedicated state for the PN
        let state = this.contactStates.get(pn);
        if (!state) {
            state = Object.assign(Object.assign(Object.assign({ jid: pn, lid, currentStatus: existingLidState ? existingLidState.currentStatus : 'unknown' }, ((existingLidState === null || existingLidState === void 0 ? void 0 : existingLidState.isLocked) !== undefined ? { isLocked: existingLidState.isLocked } : {})), ((existingLidState === null || existingLidState === void 0 ? void 0 : existingLidState.subscriptionState) !== undefined ? { subscriptionState: existingLidState.subscriptionState } : {})), { sessions: existingLidState ? existingLidState.sessions : [] });
            this.contactStates.set(pn, state);
        }
        else {
            state.lid = lid;
            if ((existingLidState === null || existingLidState === void 0 ? void 0 : existingLidState.isLocked) !== undefined && state.isLocked === undefined) {
                state.isLocked = existingLidState.isLocked;
            }
            if ((existingLidState === null || existingLidState === void 0 ? void 0 : existingLidState.subscriptionState) !== undefined && !state.subscriptionState) {
                state.subscriptionState = existingLidState.subscriptionState;
            }
        }
        this.contactStates.set(lid, state);
        // Ensure PN and LID stay paired in monitoredJids when either is monitored
        if (this.monitoredJids.has(pn)) {
            this.monitoredJids.add(lid);
        }
        else if (this.monitoredJids.has(lid)) {
            this.monitoredJids.add(pn);
        }
    }
    /**
     * Resolve any JID (PN or LID) to the canonical ContactPresenceState key
     */
    resolveCanonicalJid(jid) {
        const norm = normalizeContactJid(jid);
        if (!norm)
            return undefined;
        // If it's a LID, check if we have mapped PN
        if (norm.endsWith('@lid')) {
            const mappedPn = this.aliasMap.get(norm);
            if (mappedPn && this.contactStates.has(mappedPn)) {
                return mappedPn;
            }
        }
        if (this.contactStates.has(norm))
            return norm;
        const alias = this.aliasMap.get(norm);
        if (alias && this.contactStates.has(alias))
            return alias;
        return this.monitoredJids.has(norm) ? norm : undefined;
    }
    /**
     * Deduplicated, error-isolated single JID presence subscription.
     * Never modifies socket connection lifecycle.
     */
    subscribeTarget(targetJid_1, operationId_1) {
        return __awaiter(this, arguments, void 0, function* (targetJid, operationId, force = false) {
            const normalized = normalizeContactJid(targetJid);
            if (!normalized || this.isDestroyed)
                return;
            const identity = this.resolveIdentityPair(normalized);
            const isLocked = this.isContactLocked(normalized);
            const canonical = this.resolveCanonicalJid(normalized);
            const targetState = (canonical ? this.contactStates.get(canonical) : undefined) || this.contactStates.get(normalized);
            if (targetState) {
                targetState.isLocked = isLocked;
            }
            const socketStateBefore = this.getSocketState();
            if (!this.isSocketOpen()) {
                this.recordDiagnostic('debug', 'presence_subscribe_deferred_socket_closed', {
                    operationId,
                    contactJid: normalized,
                    resolvedPn: identity.pn,
                    resolvedLid: identity.lid,
                    isLocked,
                    subscriptionState: targetState === null || targetState === void 0 ? void 0 : targetState.subscriptionState,
                    socketStateBefore
                });
                return;
            }
            if (!force && this.activeSubscribedJids.has(normalized)) {
                this.recordDiagnostic('debug', 'presence_subscribe_deduplicated', {
                    operationId,
                    contactJid: normalized,
                    resolvedPn: identity.pn,
                    resolvedLid: identity.lid,
                    isLocked,
                    subscriptionState: targetState === null || targetState === void 0 ? void 0 : targetState.subscriptionState,
                    socketStateBefore
                });
                return;
            }
            const existingInFlight = this.inFlightSubscriptions.get(normalized);
            if (existingInFlight) {
                yield existingInFlight;
                return;
            }
            const subPromise = (() => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                if (targetState) {
                    targetState.subscriptionState = 'pending';
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
                });
                try {
                    yield this.sock.presenceSubscribe(normalized);
                    if (!this.isDestroyed && this.isConnected) {
                        this.activeSubscribedJids.add(normalized);
                    }
                    if (targetState) {
                        targetState.subscriptionState = 'subscribed';
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
                    });
                }
                catch (err) {
                    const errMsg = (err === null || err === void 0 ? void 0 : err.message) || String(err);
                    if (targetState) {
                        targetState.subscriptionState = 'failed';
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
                    });
                    if (normalized.endsWith('@lid')) {
                        (_b = (_a = this.options.logger) === null || _a === void 0 ? void 0 : _a.debug) === null || _b === void 0 ? void 0 : _b.call(_a, { err, lid: normalized }, 'Failed to subscribe to contact LID presence');
                    }
                    else {
                        (_d = (_c = this.options.logger) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.call(_c, { err, jid: normalized }, 'Failed to subscribe to contact presence');
                    }
                }
            }))();
            this.inFlightSubscriptions.set(normalized, subPromise);
            try {
                yield subPromise;
            }
            finally {
                if (this.inFlightSubscriptions.get(normalized) === subPromise) {
                    this.inFlightSubscriptions.delete(normalized);
                }
            }
        });
    }
    /**
     * Collect unique target JIDs (PN + resolved LID) for a given list of JIDs
     * so each target is subscribed at most once per cycle.
     */
    collectUniqueTargets(jids) {
        const unique = new Set();
        for (const raw of jids) {
            const normalized = normalizeContactJid(raw);
            if (!normalized)
                continue;
            unique.add(normalized);
            const alias = this.aliasMap.get(normalized);
            if (alias)
                unique.add(alias);
            const state = this.contactStates.get(normalized);
            if (state === null || state === void 0 ? void 0 : state.lid)
                unique.add(state.lid);
        }
        return Array.from(unique);
    }
    /**
     * Subscribe to presence updates for one or more contacts
     */
    subscribe(jid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDestroyed)
                return;
            const opId = this.nextOpId('sub');
            const socketStateBefore = this.getSocketState();
            // Opt-in only: do not emit connection.update / mutate socket presence unless explicitly requested
            if (this.options.announceAvailable && this.isSocketOpen() && this.sock && typeof this.sock.sendPresenceUpdate === 'function') {
                try {
                    yield this.sock.sendPresenceUpdate('available');
                }
                catch (err) {
                    this.recordDiagnostic('warn', 'announce_available_failed', {
                        operationId: opId,
                        errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err),
                        socketStateAfter: this.getSocketState()
                    });
                }
            }
            const jids = Array.isArray(jid) ? jid : [jid];
            const seenInBatch = new Set();
            for (const rawJid of jids) {
                if (this.isDestroyed)
                    return;
                const normalized = normalizeContactJid(rawJid);
                if (!normalized || seenInBatch.has(normalized))
                    continue;
                seenInBatch.add(normalized);
                const wasMonitored = this.monitoredJids.has(normalized);
                this.monitoredJids.add(normalized);
                let state = this.contactStates.get(normalized);
                if (!state) {
                    state = {
                        jid: normalized,
                        isLocked: this.isContactLocked(normalized),
                        currentStatus: 'unknown',
                        sessions: []
                    };
                    this.contactStates.set(normalized, state);
                }
                else {
                    state.isLocked = this.isContactLocked(normalized);
                }
                if (!wasMonitored) {
                    this.recordDiagnostic('info', 'subscription_created', {
                        operationId: opId,
                        contactJid: normalized,
                        resolvedPn: normalized.endsWith('@s.whatsapp.net') ? normalized : this.aliasMap.get(normalized),
                        resolvedLid: state.lid || (normalized.endsWith('@lid') ? normalized : this.aliasMap.get(normalized)),
                        isLocked: state.isLocked,
                        socketStateBefore
                    });
                }
                // Attempt bidirectional LID <-> PN resolution when socket is open
                let resolvedPn;
                if (this.options.resolveLid && normalized.endsWith('@s.whatsapp.net') && !state.lid && this.isSocketOpen()) {
                    yield this.discoverLid(normalized, state, opId);
                }
                else if (this.options.resolveLid && normalized.endsWith('@lid') && !this.aliasMap.get(normalized) && this.isSocketOpen()) {
                    resolvedPn = yield this.discoverPn(normalized, state, opId);
                }
                else if (normalized.endsWith('@lid')) {
                    const mappedPn = this.aliasMap.get(normalized);
                    if (mappedPn && mappedPn.endsWith('@s.whatsapp.net')) {
                        resolvedPn = mappedPn;
                    }
                }
                // Subscribe to primary JID (deduplicated)
                yield this.subscribeTarget(normalized, opId, false);
                // If paired PN or LID is known, subscribe to it as well (deduplicated)
                const activeState = this.contactStates.get(this.resolveCanonicalJid(normalized) || normalized) || state;
                if (activeState.lid && activeState.lid !== normalized) {
                    yield this.subscribeTarget(activeState.lid, opId, false);
                }
                if (resolvedPn && resolvedPn !== normalized) {
                    yield this.subscribeTarget(resolvedPn, opId, false);
                }
            }
        });
    }
    /**
     * Discover and link LID for a given phone number JID
     */
    discoverLid(pnJid, state, operationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const opId = operationId || this.nextOpId('lid');
            const existingLookup = this.inFlightLidLookups.get(pnJid);
            if (existingLookup) {
                const resolved = yield existingLookup;
                if (resolved && !state.lid) {
                    state.lid = resolved;
                    this.linkAliases(pnJid, resolved);
                }
                return;
            }
            const lookupPromise = (() => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                let lid;
                // 1. Check signalRepository lidMapping store
                if ((_b = (_a = this.sock.signalRepository) === null || _a === void 0 ? void 0 : _a.lidMapping) === null || _b === void 0 ? void 0 : _b.getLIDForPN) {
                    try {
                        const res = yield this.sock.signalRepository.lidMapping.getLIDForPN(pnJid);
                        if (res)
                            lid = normalizeContactJid(res);
                    }
                    catch (err) {
                        this.recordDiagnostic('debug', 'lid_cache_lookup_failed', {
                            operationId: opId,
                            contactJid: pnJid,
                            errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err)
                        });
                    }
                }
                // 2. Query via USync onWhatsApp if not yet in cache
                if (!lid && this.sock.onWhatsApp && this.isSocketOpen()) {
                    try {
                        const res = yield this.sock.onWhatsApp(pnJid);
                        const cleanPn = normalizeContactJid(pnJid);
                        const entry = res === null || res === void 0 ? void 0 : res.find(r => {
                            const rJid = normalizeContactJid((r === null || r === void 0 ? void 0 : r.jid) || '');
                            const rPn = normalizeContactJid((r === null || r === void 0 ? void 0 : r.pn) || '');
                            return rJid === cleanPn || rPn === cleanPn;
                        });
                        if (entry === null || entry === void 0 ? void 0 : entry.lid) {
                            lid = normalizeContactJid(entry.lid);
                        }
                    }
                    catch (err) {
                        this.recordDiagnostic('debug', 'lid_usync_lookup_failed', {
                            operationId: opId,
                            contactJid: pnJid,
                            errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err)
                        });
                    }
                }
                if (lid && lid.endsWith('@lid')) {
                    state.lid = lid;
                    if ((_d = (_c = this.sock.signalRepository) === null || _c === void 0 ? void 0 : _c.lidMapping) === null || _d === void 0 ? void 0 : _d.storeLIDPNMappings) {
                        yield this.sock.signalRepository.lidMapping.storeLIDPNMappings([{ pn: pnJid, lid }]).catch(() => { });
                    }
                    this.linkAliases(pnJid, lid);
                    this.recordDiagnostic('info', 'lid_resolved', {
                        operationId: opId,
                        contactJid: pnJid,
                        resolvedPn: pnJid,
                        resolvedLid: lid,
                        isLocked: this.isContactLocked(pnJid) || this.isContactLocked(lid),
                        socketStateAfter: this.getSocketState()
                    });
                    if (this.options.logToConsole) {
                        console.log(`[Presence] Resolved LID for ${pnJid} -> ${lid} (monitoring both)`);
                    }
                    return lid;
                }
                return undefined;
            }))();
            this.inFlightLidLookups.set(pnJid, lookupPromise);
            try {
                yield lookupPromise;
            }
            finally {
                if (this.inFlightLidLookups.get(pnJid) === lookupPromise) {
                    this.inFlightLidLookups.delete(pnJid);
                }
            }
        });
    }
    /**
     * Discover and link Phone Number JID for a given LID JID
     */
    discoverPn(lidJid, state, operationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const opId = operationId || this.nextOpId('pn');
            const existingLookup = this.inFlightLidLookups.get(lidJid);
            if (existingLookup) {
                const resolved = yield existingLookup;
                if (resolved) {
                    this.linkAliases(resolved, lidJid);
                }
                return resolved;
            }
            const lookupPromise = (() => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                let pn;
                // 1. Check signalRepository lidMapping reverse store
                if ((_b = (_a = this.sock.signalRepository) === null || _a === void 0 ? void 0 : _a.lidMapping) === null || _b === void 0 ? void 0 : _b.getPNForLID) {
                    try {
                        const res = yield this.sock.signalRepository.lidMapping.getPNForLID(lidJid);
                        if (res)
                            pn = normalizeContactJid(res);
                    }
                    catch (err) {
                        this.recordDiagnostic('debug', 'pn_cache_lookup_failed', {
                            operationId: opId,
                            contactJid: lidJid,
                            isLocked: this.isContactLocked(lidJid),
                            errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err)
                        });
                    }
                }
                // 2. Query via USync onWhatsApp if not yet in cache
                if (!pn && this.sock.onWhatsApp && this.isSocketOpen()) {
                    try {
                        const res = yield this.sock.onWhatsApp(lidJid);
                        const cleanLid = normalizeContactJid(lidJid);
                        const entry = res === null || res === void 0 ? void 0 : res.find(r => {
                            const rLid = normalizeContactJid((r === null || r === void 0 ? void 0 : r.lid) || '');
                            const rJid = normalizeContactJid((r === null || r === void 0 ? void 0 : r.jid) || '');
                            return rLid === cleanLid || rJid === cleanLid;
                        });
                        const candidate = (entry === null || entry === void 0 ? void 0 : entry.pn) || ((entry === null || entry === void 0 ? void 0 : entry.jid) && entry.jid.endsWith('@s.whatsapp.net') ? entry.jid : undefined);
                        if (candidate) {
                            pn = normalizeContactJid(candidate);
                        }
                    }
                    catch (err) {
                        this.recordDiagnostic('debug', 'pn_usync_lookup_failed', {
                            operationId: opId,
                            contactJid: lidJid,
                            isLocked: this.isContactLocked(lidJid),
                            errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err)
                        });
                    }
                }
                if (pn && pn.endsWith('@s.whatsapp.net')) {
                    state.lid = normalizeContactJid(lidJid);
                    if ((_d = (_c = this.sock.signalRepository) === null || _c === void 0 ? void 0 : _c.lidMapping) === null || _d === void 0 ? void 0 : _d.storeLIDPNMappings) {
                        yield this.sock.signalRepository.lidMapping.storeLIDPNMappings([{ pn, lid: lidJid }]).catch(() => { });
                    }
                    this.linkAliases(pn, lidJid);
                    this.recordDiagnostic('info', 'pn_resolved_for_lid', {
                        operationId: opId,
                        contactJid: lidJid,
                        resolvedPn: pn,
                        resolvedLid: lidJid,
                        isLocked: this.isContactLocked(pn) || this.isContactLocked(lidJid),
                        socketStateAfter: this.getSocketState()
                    });
                    return pn;
                }
                return undefined;
            }))();
            this.inFlightLidLookups.set(lidJid, lookupPromise);
            try {
                return yield lookupPromise;
            }
            finally {
                if (this.inFlightLidLookups.get(lidJid) === lookupPromise) {
                    this.inFlightLidLookups.delete(lidJid);
                }
            }
        });
    }
    /**
     * Force a deduplicated presence subscription request to refresh current state on demand
     */
    resubscribe(jid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDestroyed)
                return;
            const normalized = normalizeContactJid(jid);
            if (!normalized)
                return;
            const opId = this.nextOpId('resub');
            const targets = this.collectUniqueTargets([normalized]);
            for (const target of targets) {
                if (this.isDestroyed || !this.isSocketOpen())
                    break;
                yield this.subscribeTarget(target, opId, true);
            }
        });
    }
    /**
     * Sequentially and deduplicatedly re-subscribe all monitored contacts.
     * Guarded against overlapping invocations.
     */
    resubscribeAll(reason) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDestroyed || !this.isSocketOpen() || this.resubscribeInProgress) {
                return;
            }
            this.resubscribeInProgress = true;
            const opId = this.nextOpId('resub-all');
            const socketStateBefore = this.getSocketState();
            try {
                // Resolve any missing LIDs or PNs for monitored contacts first
                if (this.options.resolveLid) {
                    const pnSnapshot = Array.from(this.monitoredJids).filter(j => j.endsWith('@s.whatsapp.net'));
                    for (const pn of pnSnapshot) {
                        if (this.isDestroyed || !this.isSocketOpen())
                            return;
                        const state = this.contactStates.get(pn);
                        if (state && !state.lid) {
                            yield this.discoverLid(pn, state, opId);
                        }
                    }
                    const lidSnapshot = Array.from(this.monitoredJids).filter(j => j.endsWith('@lid'));
                    for (const lid of lidSnapshot) {
                        if (this.isDestroyed || !this.isSocketOpen())
                            return;
                        if (!this.aliasMap.get(lid)) {
                            const state = this.contactStates.get(lid) || {
                                jid: lid,
                                lid,
                                currentStatus: 'unknown',
                                sessions: []
                            };
                            yield this.discoverPn(lid, state, opId);
                        }
                    }
                }
                const targets = this.collectUniqueTargets(this.monitoredJids);
                this.recordDiagnostic('info', 'resubscribe_all_started', {
                    operationId: opId,
                    reason,
                    socketStateBefore,
                    details: { targetCount: targets.length }
                });
                for (const target of targets) {
                    if (this.isDestroyed || !this.isSocketOpen())
                        break;
                    yield this.subscribeTarget(target, opId, true);
                }
                this.recordDiagnostic('info', 'resubscribe_all_completed', {
                    operationId: opId,
                    reason,
                    socketStateBefore,
                    socketStateAfter: this.getSocketState(),
                    details: { targetCount: targets.length }
                });
            }
            finally {
                this.resubscribeInProgress = false;
            }
        });
    }
    /**
     * Unsubscribe and stop monitoring presence for one or more contacts
     */
    unsubscribe(jid) {
        const opId = this.nextOpId('unsub');
        const socketStateBefore = this.getSocketState();
        const jids = Array.isArray(jid) ? jid : [jid];
        for (const rawJid of jids) {
            const normalized = normalizeContactJid(rawJid);
            if (!normalized)
                continue;
            const alias = this.aliasMap.get(normalized);
            const state = this.contactStates.get(normalized) || (alias ? this.contactStates.get(alias) : undefined);
            const lid = (state === null || state === void 0 ? void 0 : state.lid) || (normalized.endsWith('@lid') ? normalized : alias);
            const pn = normalized.endsWith('@s.whatsapp.net') ? normalized : (alias && alias.endsWith('@s.whatsapp.net') ? alias : undefined);
            this.monitoredJids.delete(normalized);
            this.activeSubscribedJids.delete(normalized);
            if (alias) {
                this.monitoredJids.delete(alias);
                this.activeSubscribedJids.delete(alias);
            }
            if (lid) {
                this.monitoredJids.delete(lid);
                this.activeSubscribedJids.delete(lid);
            }
            this.recordDiagnostic('info', 'subscription_removed', {
                operationId: opId,
                contactJid: normalized,
                resolvedPn: pn,
                resolvedLid: lid,
                socketStateBefore,
                socketStateAfter: this.getSocketState()
            });
        }
    }
    /**
     * Get current presence tracking state for a specific contact
     */
    getStatus(jid) {
        const canonical = this.resolveCanonicalJid(jid);
        return canonical ? this.contactStates.get(canonical) : undefined;
    }
    /**
     * Get all unique monitored contacts' states
     */
    getAllStatuses() {
        const unique = new Map();
        for (const [, state] of this.contactStates.entries()) {
            if (!unique.has(state.jid)) {
                unique.set(state.jid, state);
            }
        }
        return unique;
    }
    /**
     * Get list of currently monitored JIDs
     */
    getMonitoredJids() {
        return Array.from(this.monitoredJids);
    }
    /**
     * Dynamically change the timezone for this PresenceTracker instance (e.g. '+5', '+05:00', 'Asia/Karachi')
     */
    setTimezone(zone) {
        this.timeZone = zone;
        this.options.timeZone = zone;
        this.options.timezone = zone;
    }
    /**
     * Get the current timezone of this PresenceTracker instance
     */
    getTimezone() {
        return this.timeZone;
    }
    /**
     * Format time with this tracker's configured timezone
     */
    formatTime(date) {
        return formatTime(date, this.timeZone);
    }
    /**
     * Format date & time with this tracker's configured timezone
     */
    formatDateTime(date) {
        return formatDateTime(date, this.timeZone);
    }
    /**
     * Format timestamp into human-readable relative time (e.g. "2m ago")
     */
    formatTimeAgo(date) {
        return formatTimeAgo(date);
    }
    /**
     * Stop tracking and clean up event listeners and timers
     */
    destroy() {
        if (this.isDestroyed)
            return;
        const opId = this.nextOpId('destroy');
        const socketStateBefore = this.getSocketState();
        this.isDestroyed = true;
        this.isConnected = false;
        this.detachSocketListeners();
        this.stopResubscribeTimer();
        this.monitoredJids.clear();
        this.activeSubscribedJids.clear();
        this.inFlightSubscriptions.clear();
        this.inFlightLidLookups.clear();
        this.lockedJids.clear();
        this.recordDiagnostic('info', 'tracker_destroyed', {
            operationId: opId,
            socketStateBefore,
            socketStateAfter: this.getSocketState()
        });
        this.removeAllListeners();
    }
    stop() {
        this.destroy();
    }
    /**
     * Start method for lifecycle compatibility. Monitoring begins upon instantiation / subscription.
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // No-op / resolves immediately
        });
    }
    /**
     * Compatibility alias for getStatus / getAllStatuses
     */
    getState(jid) {
        if (jid) {
            return this.getStatus(jid);
        }
        const map = this.getAllStatuses();
        const obj = {};
        for (const [k, v] of map.entries()) {
            obj[k] = v;
        }
        return obj;
    }
    /**
     * Compatibility helper to get the latest session for a contact
     */
    getSession(jid) {
        const state = this.getStatus(jid);
        if (!state || !state.sessions.length)
            return null;
        return state.sessions[state.sessions.length - 1];
    }
    /**
     * Compatibility helper to get sessions
     */
    getSessions(jid) {
        if (jid) {
            const state = this.getStatus(jid);
            return state ? state.sessions : [];
        }
        const all = [];
        const seen = new Set();
        for (const state of this.contactStates.values()) {
            if (seen.has(state))
                continue;
            seen.add(state);
            all.push(...state.sessions);
        }
        return all;
    }
    /**
     * Check if a contact JID is currently being monitored
     */
    isMonitoring(jid) {
        const norm = normalizeContactJid(jid);
        if (!norm)
            return false;
        if (this.monitoredJids.has(norm))
            return true;
        const alias = this.aliasMap.get(norm);
        return !!alias && this.monitoredJids.has(alias);
    }
    handleLidMappingUpdate(mapping) {
        try {
            if (this.isDestroyed || !(mapping === null || mapping === void 0 ? void 0 : mapping.lid) || !(mapping === null || mapping === void 0 ? void 0 : mapping.pn))
                return;
            const pn = normalizeContactJid(mapping.pn);
            const lid = normalizeContactJid(mapping.lid);
            const wasLidMonitored = this.monitoredJids.has(lid);
            this.linkAliases(pn, lid);
            // If PN is actively monitored and we just learned its LID, subscribe to LID once
            if (this.isMonitoring(pn) && !wasLidMonitored && !this.activeSubscribedJids.has(lid) && this.isSocketOpen()) {
                const opId = this.nextOpId('lid-map');
                this.subscribeTarget(lid, opId, false).catch(() => { });
            }
        }
        catch (err) {
            this.recordDiagnostic('error', 'lid_mapping_handler_error', {
                operationId: this.nextOpId('lid-err'),
                errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err),
                socketStateAfter: this.getSocketState()
            });
        }
    }
    handleConnectionUpdate(update) {
        var _a, _b, _c;
        try {
            if (this.isDestroyed || !update)
                return;
            const { connection, lastDisconnect } = update;
            if (!connection)
                return;
            const opId = this.nextOpId('conn');
            const socketStateBefore = this.getSocketState();
            if (connection === 'close') {
                this.isConnected = false;
                this.activeSubscribedJids.clear();
                this.stopResubscribeTimer();
                const err = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error;
                this.recordDiagnostic('info', 'connection_closed_monitoring_paused', {
                    operationId: opId,
                    reason: (err === null || err === void 0 ? void 0 : err.message) || 'connection closed',
                    socketStateBefore,
                    socketStateAfter: this.getSocketState(),
                    details: {
                        statusCode: (_a = err === null || err === void 0 ? void 0 : err.output) === null || _a === void 0 ? void 0 : _a.statusCode,
                        closeCode: (_b = err === null || err === void 0 ? void 0 : err.data) === null || _b === void 0 ? void 0 : _b.closeCode,
                        closeReason: (_c = err === null || err === void 0 ? void 0 : err.data) === null || _c === void 0 ? void 0 : _c.closeReason
                    }
                });
                return;
            }
            if (connection === 'connecting') {
                this.isConnected = false;
                this.stopResubscribeTimer();
                this.recordDiagnostic('debug', 'connection_connecting', {
                    operationId: opId,
                    socketStateBefore,
                    socketStateAfter: this.getSocketState()
                });
                return;
            }
            if (connection === 'open') {
                this.isConnected = true;
                this.recordDiagnostic('info', 'connection_opened_monitoring_resuming', {
                    operationId: opId,
                    socketStateBefore,
                    socketStateAfter: this.getSocketState(),
                    details: {
                        autoResubscribe: this.options.autoResubscribe,
                        monitoredCount: this.monitoredJids.size
                    }
                });
                if (this.options.autoResubscribe) {
                    this.startResubscribeTimer();
                    if (this.monitoredJids.size > 0) {
                        this.resubscribeAll('connection_open').catch(err => {
                            var _a, _b;
                            this.recordDiagnostic('warn', 'reconnect_resubscribe_error', {
                                operationId: opId,
                                errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err),
                                socketStateAfter: this.getSocketState()
                            });
                            (_b = (_a = this.options.logger) === null || _a === void 0 ? void 0 : _a.warn) === null || _b === void 0 ? void 0 : _b.call(_a, { err }, 'Failed to re-subscribe presence after reconnect');
                        });
                    }
                }
            }
        }
        catch (err) {
            this.recordDiagnostic('error', 'connection_update_handler_error', {
                operationId: this.nextOpId('conn-err'),
                errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err),
                socketStateAfter: this.getSocketState()
            });
        }
    }
    handleMessagesUpsert({ messages }) {
        var _a, _b, _c, _d, _e;
        try {
            if (!messages || this.isDestroyed)
                return;
            for (const msg of messages) {
                if (!msg || ((_a = msg.key) === null || _a === void 0 ? void 0 : _a.fromMe))
                    continue;
                const remoteJid = normalizeContactJid(((_b = msg.key) === null || _b === void 0 ? void 0 : _b.remoteJid) || '');
                const altJid = normalizeContactJid(((_c = msg.key) === null || _c === void 0 ? void 0 : _c.remoteJidAlt) || '');
                const participant = normalizeContactJid(((_d = msg.key) === null || _d === void 0 ? void 0 : _d.participant) || '');
                const participantAlt = normalizeContactJid(((_e = msg.key) === null || _e === void 0 ? void 0 : _e.participantAlt) || '');
                // Link any LID <-> PN mappings present in the message envelope
                if (remoteJid && altJid)
                    this.linkAliases(remoteJid, altJid);
                if (participant && participantAlt)
                    this.linkAliases(participant, participantAlt);
                // Determine if message is from a monitored contact
                const candidates = [remoteJid, altJid, participant, participantAlt].filter(Boolean);
                for (const c of candidates) {
                    const canonical = this.resolveCanonicalJid(c);
                    if (canonical && this.isMonitoring(canonical)) {
                        // Contact actively sent a message -> Definitely ONLINE
                        this.processContactPresence(canonical, { lastKnownPresence: 'available' });
                        break;
                    }
                }
            }
        }
        catch (err) {
            this.recordDiagnostic('error', 'messages_upsert_handler_error', {
                operationId: this.nextOpId('msg-err'),
                errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err),
                socketStateAfter: this.getSocketState()
            });
        }
    }
    updateContactLockState(rawJid, locked) {
        const norm = normalizeContactJid(rawJid);
        if (!norm)
            return;
        if (locked) {
            this.lockedJids.add(norm);
        }
        else {
            this.lockedJids.delete(norm);
        }
        const alias = this.aliasMap.get(norm);
        if (alias) {
            if (locked)
                this.lockedJids.add(alias);
            else
                this.lockedJids.delete(alias);
        }
        const canonical = this.resolveCanonicalJid(norm);
        if (canonical && this.isMonitoring(canonical)) {
            const state = this.contactStates.get(canonical);
            if (state) {
                state.isLocked = locked;
            }
            const identity = this.resolveIdentityPair(canonical);
            this.recordDiagnostic('info', 'chat_lock_state_changed', {
                operationId: this.nextOpId('lock'),
                contactJid: canonical,
                resolvedPn: identity.pn,
                resolvedLid: (state === null || state === void 0 ? void 0 : state.lid) || identity.lid,
                isLocked: locked,
                subscriptionState: state === null || state === void 0 ? void 0 : state.subscriptionState
            });
        }
    }
    handleChatsLock(update) {
        try {
            if (this.isDestroyed || !(update === null || update === void 0 ? void 0 : update.id) || typeof update.locked !== 'boolean')
                return;
            this.updateContactLockState(update.id, update.locked);
        }
        catch (_a) { }
    }
    handleChatsUpdate(updates) {
        try {
            if (this.isDestroyed || !Array.isArray(updates))
                return;
            for (const u of updates) {
                if ((u === null || u === void 0 ? void 0 : u.id) && typeof u.locked === 'boolean') {
                    this.updateContactLockState(u.id, u.locked);
                }
            }
        }
        catch (_a) { }
    }
    resolveViaCacheSync(jid) {
        var _a, _b, _c;
        if (!jid)
            return undefined;
        const mappingCache = (_c = (_b = (_a = this.sock) === null || _a === void 0 ? void 0 : _a.signalRepository) === null || _b === void 0 ? void 0 : _b.lidMapping) === null || _c === void 0 ? void 0 : _c.mappingCache;
        if (!(mappingCache === null || mappingCache === void 0 ? void 0 : mappingCache.get))
            return undefined;
        const atIdx = jid.indexOf('@');
        if (atIdx <= 0)
            return undefined;
        const user = jid.slice(0, atIdx);
        if (jid.endsWith('@lid')) {
            const pnUser = mappingCache.get(`lid:${user}`);
            if (pnUser) {
                const pn = `${pnUser}@s.whatsapp.net`;
                this.linkAliases(pn, jid);
                return this.resolveCanonicalJid(pn);
            }
        }
        else if (jid.endsWith('@s.whatsapp.net')) {
            const lidUser = mappingCache.get(`pn:${user}`);
            if (lidUser) {
                const lid = `${lidUser}@lid`;
                this.linkAliases(jid, lid);
                return this.resolveCanonicalJid(lid);
            }
        }
        return undefined;
    }
    recoverAndProcessPresence(normParticipant, normId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                if (this.isDestroyed)
                    return;
                const lidMapping = (_b = (_a = this.sock) === null || _a === void 0 ? void 0 : _a.signalRepository) === null || _b === void 0 ? void 0 : _b.lidMapping;
                let matchedJid;
                const candidates = [normParticipant, normId].filter(Boolean);
                if (lidMapping) {
                    for (const candidate of candidates) {
                        if (candidate.endsWith('@lid') && typeof lidMapping.getPNForLID === 'function') {
                            const pn = yield lidMapping.getPNForLID(candidate).catch(() => null);
                            if (pn) {
                                const normPn = normalizeContactJid(pn);
                                this.linkAliases(normPn, candidate);
                                const resolved = this.resolveCanonicalJid(normPn) || this.resolveCanonicalJid(candidate);
                                if (resolved && this.isMonitoring(resolved)) {
                                    matchedJid = resolved;
                                    break;
                                }
                            }
                        }
                        else if (candidate.endsWith('@s.whatsapp.net') && ((_c = lidMapping.mappingCache) === null || _c === void 0 ? void 0 : _c.get)) {
                            const user = candidate.split('@')[0];
                            const lidUser = lidMapping.mappingCache.get(`pn:${user}`);
                            if (lidUser) {
                                const lid = `${lidUser}@lid`;
                                this.linkAliases(candidate, lid);
                                const resolved = this.resolveCanonicalJid(candidate) || this.resolveCanonicalJid(lid);
                                if (resolved && this.isMonitoring(resolved)) {
                                    matchedJid = resolved;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (this.isDestroyed)
                    return;
                if (matchedJid) {
                    this.processContactPresence(matchedJid, data);
                }
                else {
                    const sampleJid = normParticipant || normId;
                    this.recordDiagnostic('debug', 'presence_update_unmatched', {
                        operationId: this.nextOpId('unmatched'),
                        contactJid: sampleJid,
                        isLocked: this.isContactLocked(sampleJid),
                        details: {
                            incomingId: normId,
                            incomingParticipant: normParticipant,
                            monitoredCount: this.monitoredJids.size
                        }
                    });
                }
            }
            catch (_d) { }
        });
    }
    handlePresenceUpdate(update) {
        var _a, _b;
        try {
            if (this.isDestroyed || !update || !update.presences)
                return;
            const { id, presences } = update;
            for (const [participant, data] of Object.entries(presences)) {
                if (!data)
                    continue;
                const normParticipant = normalizeContactJid(participant);
                const normId = normalizeContactJid(id);
                // Find matching monitored JID (checking participant first, then chat id, resolving aliases + sync cache)
                let matchedJid = this.resolveCanonicalJid(normParticipant)
                    || this.resolveCanonicalJid(normId)
                    || this.resolveViaCacheSync(normParticipant)
                    || (normId !== normParticipant ? this.resolveViaCacheSync(normId) : undefined);
                if (!matchedJid || !this.isMonitoring(matchedJid)) {
                    const lidMapping = (_b = (_a = this.sock) === null || _a === void 0 ? void 0 : _a.signalRepository) === null || _b === void 0 ? void 0 : _b.lidMapping;
                    if (lidMapping && (normParticipant.endsWith('@lid') || normId.endsWith('@lid') || lidMapping.mappingCache)) {
                        void this.recoverAndProcessPresence(normParticipant, normId, data);
                    }
                    else {
                        const sampleJid = normParticipant || normId;
                        this.recordDiagnostic('debug', 'presence_update_unmatched', {
                            operationId: this.nextOpId('unmatched'),
                            contactJid: sampleJid,
                            isLocked: this.isContactLocked(sampleJid),
                            details: {
                                incomingId: normId,
                                incomingParticipant: normParticipant,
                                monitoredCount: this.monitoredJids.size
                            }
                        });
                    }
                    continue;
                }
                this.processContactPresence(matchedJid, data);
            }
        }
        catch (err) {
            this.recordDiagnostic('error', 'presence_update_handler_error', {
                operationId: this.nextOpId('pres-err'),
                contactJid: update === null || update === void 0 ? void 0 : update.id,
                errorMessage: (err === null || err === void 0 ? void 0 : err.message) || String(err),
                socketStateAfter: this.getSocketState()
            });
        }
    }
    processContactPresence(jid, data) {
        var _a;
        const opId = this.nextOpId('pres');
        const socketStateBefore = this.getSocketState();
        let state = this.contactStates.get(jid);
        if (!state) {
            state = {
                jid,
                isLocked: this.isContactLocked(jid),
                currentStatus: 'unknown',
                sessions: []
            };
            this.contactStates.set(jid, state);
        }
        else if (state.isLocked === undefined) {
            state.isLocked = this.isContactLocked(jid);
        }
        const isLocked = (_a = state.isLocked) !== null && _a !== void 0 ? _a : this.isContactLocked(state.jid);
        const previousStatus = state.currentStatus;
        const previousPresence = state.lastKnownPresence;
        const rawPresence = data.lastKnownPresence;
        const rawLastSeen = data.lastSeen;
        const hasExplicitLastSeen = typeof rawLastSeen === 'number' && !isNaN(rawLastSeen) && rawLastSeen > 0;
        const identity = this.resolveIdentityPair(state.jid);
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
        });
        if (hasExplicitLastSeen) {
            const ms = rawLastSeen > 1e11 ? rawLastSeen : rawLastSeen * 1000;
            state.serverLastSeen = new Date(ms);
            state.serverLastSeenTimestamp = ms;
            state.lastSeenTimestamp = ms;
            state.lastSeen = state.serverLastSeen;
        }
        if (isOnlinePresence(rawPresence)) {
            // Guard: Duplicate online events (e.g. available followed by composing/recording/paused or repeated available)
            if (state.currentStatus === 'online') {
                state.lastKnownPresence = rawPresence;
                if (previousPresence !== rawPresence && rawPresence) {
                    const chatstateEvent = {
                        jid: state.jid,
                        lid: state.lid,
                        status: 'online',
                        previousPresence,
                        rawPresence,
                        timestamp: new Date()
                    };
                    this.safeEmit('chatstate', chatstateEvent, opId);
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
                });
                return;
            }
            // ONLINE transition
            const now = new Date();
            state.currentStatus = 'online';
            state.currentSessionStart = now;
            state.lastOnlineAt = now;
            state.lastOnlineAtFormatted = this.formatDateTime(now);
            state.lastKnownPresence = rawPresence;
            state.lastSeenTimestamp = now.getTime();
            state.lastSeen = now;
            state.lastSeenFormatted = this.formatDateTime(now);
            if (state.serverLastSeen) {
                state.serverLastSeenFormatted = this.formatDateTime(state.serverLastSeen);
            }
            if (this.options.logToConsole) {
                console.log(`[Presence] ${state.jid} is ONLINE at ${this.formatTime(now)}`);
            }
            const eventData = Object.assign({ jid: state.jid, lid: state.lid, status: 'online', onlineAt: now, rawPresence }, (state.lastSeen ? {
                lastSeen: state.lastSeen,
                lastSeenTimestamp: state.lastSeenTimestamp
            } : {}));
            this.safeEmit('online', eventData, opId);
            this.safeEmit('presence', eventData, opId);
            if (rawPresence && rawPresence !== 'available') {
                this.safeEmit('chatstate', {
                    jid: state.jid,
                    lid: state.lid,
                    status: 'online',
                    previousPresence,
                    rawPresence,
                    timestamp: now
                }, opId);
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
            });
        }
        else if (isOfflinePresence(rawPresence)) {
            // Guard: Duplicate offline events
            if (state.currentStatus === 'offline') {
                state.lastKnownPresence = rawPresence;
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
                });
                return;
            }
            // OFFLINE transition from an active online session
            if (state.currentStatus === 'online' && state.currentSessionStart) {
                const now = new Date();
                const onlineAt = state.currentSessionStart;
                const offlineAt = now;
                const durationMs = Math.max(0, offlineAt.getTime() - onlineAt.getTime());
                const duration = formatDuration(durationMs);
                const session = {
                    onlineAt,
                    offlineAt,
                    durationMs,
                    duration
                };
                state.sessions.push(session);
                state.currentStatus = 'offline';
                state.currentSessionStart = undefined;
                state.lastOfflineAt = offlineAt;
                state.lastOfflineAtFormatted = this.formatDateTime(offlineAt);
                state.lastDurationMs = durationMs;
                state.lastDuration = duration;
                state.lastKnownPresence = rawPresence;
                // When transitioning offline without an explicit server timestamp, use offlineAt
                if (!hasExplicitLastSeen) {
                    state.lastSeenTimestamp = offlineAt.getTime();
                    state.lastSeen = offlineAt;
                }
                state.lastSeenFormatted = state.lastSeen ? this.formatDateTime(state.lastSeen) : undefined;
                if (state.serverLastSeen) {
                    state.serverLastSeenFormatted = this.formatDateTime(state.serverLastSeen);
                }
                if (this.options.logToConsole) {
                    console.log(`[Presence] ${state.jid} is OFFLINE at ${this.formatTime(offlineAt)}`);
                    console.log(`ONLINE  : ${this.formatTime(onlineAt)}`);
                    console.log(`OFFLINE : ${this.formatTime(offlineAt)}`);
                    console.log(`Duration: ${duration}`);
                    console.log(`[Presence] Online duration: ${duration}`);
                }
                const eventData = Object.assign({ jid: state.jid, lid: state.lid, status: 'offline', onlineAt,
                    offlineAt,
                    duration,
                    rawPresence }, (state.lastSeen ? {
                    lastSeen: state.lastSeen,
                    lastSeenTimestamp: state.lastSeenTimestamp
                } : {}));
                this.safeEmit('offline', eventData, opId);
                this.safeEmit('session', Object.assign(Object.assign({}, session), { jid: state.jid }), opId);
                this.safeEmit('presence', eventData, opId);
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
                });
            }
            else {
                // Initial offline state received without a prior tracked online start
                state.currentStatus = 'offline';
                state.lastKnownPresence = rawPresence;
                if (!hasExplicitLastSeen && !state.lastOfflineAt) {
                    state.lastOfflineAt = state.lastSeen || new Date();
                }
                else if (state.lastSeen) {
                    state.lastOfflineAt = state.lastSeen;
                }
                state.lastOfflineAtFormatted = state.lastOfflineAt ? this.formatDateTime(state.lastOfflineAt) : undefined;
                state.lastSeenFormatted = state.lastSeen ? this.formatDateTime(state.lastSeen) : undefined;
                if (state.serverLastSeen) {
                    state.serverLastSeenFormatted = this.formatDateTime(state.serverLastSeen);
                }
                const eventData = Object.assign(Object.assign({ jid: state.jid, lid: state.lid, status: 'offline', rawPresence }, (state.lastOfflineAt ? {
                    offlineAt: state.lastOfflineAt
                } : {})), (state.lastSeen ? {
                    lastSeen: state.lastSeen,
                    lastSeenTimestamp: state.lastSeenTimestamp
                } : {}));
                this.safeEmit('offline', eventData, opId);
                this.safeEmit('presence', eventData, opId);
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
                });
            }
        }
    }
}
exports.PresenceTracker = PresenceTracker;
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
function monitorPresence(sock, jid, options) {
    const tracker = new PresenceTracker(sock, options);
    if (jid) {
        tracker.subscribe(jid).catch(err => {
            var _a, _b;
            (_b = (_a = options === null || options === void 0 ? void 0 : options.logger) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, { err }, 'Failed initial presence subscription');
        });
    }
    return tracker;
}
exports.createPresenceTracker = monitorPresence;
// Compatibility aliases for PresenceMonitor
exports.PresenceMonitor = PresenceTracker;
