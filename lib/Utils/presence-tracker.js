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
        var _a, _b;
        super();
        this.monitoredJids = new Set();
        this.contactStates = new Map();
        this.aliasMap = new Map(); // Bidirectional: PN <-> LID
        this.isDestroyed = false;
        this.sock = sock;
        let resolvedOptions = {};
        let initialTargets;
        if (typeof targetsOrOptions === 'string' || Array.isArray(targetsOrOptions)) {
            initialTargets = targetsOrOptions;
            resolvedOptions = options || {};
        }
        else if (targetsOrOptions) {
            resolvedOptions = targetsOrOptions;
        }
        this.timeZone = (_b = (_a = resolvedOptions.timeZone) !== null && _a !== void 0 ? _a : resolvedOptions.timezone) !== null && _b !== void 0 ? _b : defaultTimeZone;
        this.options = {
            logToConsole: resolvedOptions.logToConsole !== false,
            autoResubscribe: resolvedOptions.autoResubscribe !== false,
            resolveLid: resolvedOptions.resolveLid !== false,
            trackMessagesAsPresence: resolvedOptions.trackMessagesAsPresence !== false,
            resubscribeIntervalMs: resolvedOptions.resubscribeIntervalMs !== undefined ? resolvedOptions.resubscribeIntervalMs : 25000,
            timeZone: this.timeZone,
            timezone: this.timeZone,
            logger: resolvedOptions.logger || console
        };
        this.boundPresenceUpdate = this.handlePresenceUpdate.bind(this);
        this.boundConnectionUpdate = this.handleConnectionUpdate.bind(this);
        this.sock.ev.on('presence.update', this.boundPresenceUpdate);
        this.sock.ev.on('connection.update', this.boundConnectionUpdate);
        // Listen to LID mapping updates if supported
        this.boundLidMappingUpdate = (({ lid, pn }) => {
            if (lid && pn) {
                this.linkAliases(normalizeContactJid(pn), normalizeContactJid(lid));
            }
        }).bind(this);
        this.sock.ev.on('lid-mapping.update', this.boundLidMappingUpdate);
        // Track incoming messages as active presence signals
        if (this.options.trackMessagesAsPresence) {
            this.boundMessagesUpsert = this.handleMessagesUpsert.bind(this);
            this.sock.ev.on('messages.upsert', this.boundMessagesUpsert);
        }
        // Periodic presence resubscription heartbeat to prevent WhatsApp multi-device subscription expiration
        if (this.options.autoResubscribe && this.options.resubscribeIntervalMs > 0) {
            this.resubscribeTimer = setInterval(() => {
                if (this.isDestroyed)
                    return;
                for (const jid of this.monitoredJids) {
                    this.resubscribe(jid).catch(() => { });
                }
            }, this.options.resubscribeIntervalMs);
            if (this.resubscribeTimer && typeof this.resubscribeTimer.unref === 'function') {
                this.resubscribeTimer.unref();
            }
        }
        if (initialTargets) {
            this.subscribe(initialTargets).catch(err => {
                var _a, _b;
                (_b = (_a = this.options.logger) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, { err }, 'Failed initial presence subscription');
            });
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
        // Find or create dedicated state for the PN
        let state = this.contactStates.get(pn);
        if (!state) {
            state = {
                jid: pn,
                lid,
                currentStatus: 'unknown',
                sessions: []
            };
            this.contactStates.set(pn, state);
        }
        else {
            state.lid = lid;
        }
        this.contactStates.set(lid, state);
        // If PN was monitored, ensure LID is also in monitoredJids
        if (this.monitoredJids.has(pn)) {
            this.monitoredJids.add(lid);
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
     * Subscribe to presence updates for one or more contacts
     */
    subscribe(jid) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if (this.isDestroyed)
                return;
            // Ensure client presence is announced as available so WhatsApp delivers presence stanzas
            if (this.sock && typeof this.sock.sendPresenceUpdate === 'function') {
                try {
                    yield this.sock.sendPresenceUpdate('available');
                }
                catch (_) { }
            }
            const jids = Array.isArray(jid) ? jid : [jid];
            for (const rawJid of jids) {
                const normalized = normalizeContactJid(rawJid);
                if (!normalized)
                    continue;
                this.monitoredJids.add(normalized);
                let state = this.contactStates.get(normalized);
                if (!state) {
                    state = {
                        jid: normalized,
                        currentStatus: 'unknown',
                        sessions: []
                    };
                    this.contactStates.set(normalized, state);
                }
                // Attempt to resolve LID for phone number accounts
                if (this.options.resolveLid && normalized.endsWith('@s.whatsapp.net')) {
                    yield this.discoverLid(normalized, state);
                }
                // Subscribe to primary JID
                try {
                    yield this.sock.presenceSubscribe(normalized);
                }
                catch (err) {
                    (_b = (_a = this.options.logger) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, { err, jid: normalized }, 'Failed to subscribe to contact presence');
                }
                // If LID is known, subscribe to LID as well
                if (state.lid) {
                    try {
                        yield this.sock.presenceSubscribe(state.lid);
                    }
                    catch (err) {
                        (_d = (_c = this.options.logger) === null || _c === void 0 ? void 0 : _c.debug) === null || _d === void 0 ? void 0 : _c.call(_c, { err, lid: state.lid }, 'Failed to subscribe to contact LID presence');
                    }
                }
            }
        });
    }
    /**
     * Discover and link LID for a given phone number JID
     */
    discoverLid(pnJid, state) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let lid;
            // 1. Check signalRepository lidMapping store
            if ((_b = (_a = this.sock.signalRepository) === null || _a === void 0 ? void 0 : _a.lidMapping) === null || _b === void 0 ? void 0 : _b.getLIDForPN) {
                try {
                    const res = yield this.sock.signalRepository.lidMapping.getLIDForPN(pnJid);
                    if (res)
                        lid = normalizeContactJid(res);
                }
                catch (_c) { }
            }
            // 2. Query via USync onWhatsApp if not yet in cache
            if (!lid && this.sock.onWhatsApp) {
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
                catch (_d) { }
            }
            if (lid && lid.endsWith('@lid')) {
                state.lid = lid;
                this.linkAliases(pnJid, lid);
                if (this.options.logToConsole) {
                    console.log(`[Presence] Resolved LID for ${pnJid} -> ${lid} (monitoring both)`);
                }
            }
        });
    }
    /**
     * Force a presence subscription request to refresh current state on demand
     */
    resubscribe(jid) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalized = normalizeContactJid(jid);
            if (!normalized)
                return;
            try {
                yield this.sock.presenceSubscribe(normalized);
            }
            catch (_a) { }
            const alias = this.aliasMap.get(normalized);
            if (alias) {
                try {
                    yield this.sock.presenceSubscribe(alias);
                }
                catch (_b) { }
            }
            const state = this.contactStates.get(normalized);
            if (state && state.lid && state.lid !== alias) {
                try {
                    yield this.sock.presenceSubscribe(state.lid);
                }
                catch (_c) { }
            }
        });
    }
    /**
     * Unsubscribe and stop monitoring presence for one or more contacts
     */
    unsubscribe(jid) {
        const jids = Array.isArray(jid) ? jid : [jid];
        for (const rawJid of jids) {
            const normalized = normalizeContactJid(rawJid);
            this.monitoredJids.delete(normalized);
            const alias = this.aliasMap.get(normalized);
            if (alias)
                this.monitoredJids.delete(alias);
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
        for (const [key, state] of this.contactStates.entries()) {
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
     * Stop tracking and clean up event listeners
     */
    destroy() {
        if (this.isDestroyed)
            return;
        this.isDestroyed = true;
        this.sock.ev.off('presence.update', this.boundPresenceUpdate);
        this.sock.ev.off('connection.update', this.boundConnectionUpdate);
        if (this.boundLidMappingUpdate) {
            this.sock.ev.off('lid-mapping.update', this.boundLidMappingUpdate);
        }
        if (this.boundMessagesUpsert) {
            this.sock.ev.off('messages.upsert', this.boundMessagesUpsert);
        }
        if (this.resubscribeTimer) {
            clearInterval(this.resubscribeTimer);
            this.resubscribeTimer = undefined;
        }
        this.monitoredJids.clear();
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
        for (const state of this.contactStates.values()) {
            all.push(...state.sessions);
        }
        return all;
    }
    /**
     * Check if a contact JID is currently being monitored
     */
    isMonitoring(jid) {
        const norm = normalizeContactJid(jid);
        return this.monitoredJids.has(norm) || this.aliasMap.has(norm);
    }
    handleConnectionUpdate(_a) {
        return __awaiter(this, arguments, void 0, function* ({ connection }) {
            var _b, _c;
            if (connection === 'open' && this.options.autoResubscribe && !this.isDestroyed) {
                for (const jid of this.monitoredJids) {
                    try {
                        yield this.sock.presenceSubscribe(jid);
                    }
                    catch (err) {
                        (_c = (_b = this.options.logger) === null || _b === void 0 ? void 0 : _b.warn) === null || _c === void 0 ? void 0 : _c.call(_b, { err, jid }, 'Failed to re-subscribe presence after reconnect');
                    }
                }
            }
        });
    }
    handleMessagesUpsert({ messages }) {
        var _a, _b, _c, _d, _e;
        if (!messages || this.isDestroyed)
            return;
        for (const msg of messages) {
            if ((_a = msg.key) === null || _a === void 0 ? void 0 : _a.fromMe)
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
                if (canonical) {
                    // Contact actively sent a message -> Definitely ONLINE
                    this.processContactPresence(canonical, { lastKnownPresence: 'available' });
                    break;
                }
            }
        }
    }
    handlePresenceUpdate({ id, presences }) {
        if (this.isDestroyed || !presences)
            return;
        for (const [participant, data] of Object.entries(presences)) {
            const normParticipant = normalizeContactJid(participant);
            const normId = normalizeContactJid(id);
            // Find matching monitored JID (checking participant first, then chat id, resolving aliases)
            let matchedJid = this.resolveCanonicalJid(normParticipant) || this.resolveCanonicalJid(normId);
            if (!matchedJid)
                continue;
            this.processContactPresence(matchedJid, data);
        }
    }
    processContactPresence(jid, data) {
        let state = this.contactStates.get(jid);
        if (!state) {
            state = {
                jid,
                currentStatus: 'unknown',
                sessions: []
            };
            this.contactStates.set(jid, state);
        }
        const rawPresence = data.lastKnownPresence;
        const rawLastSeen = data.lastSeen;
        const hasExplicitLastSeen = typeof rawLastSeen === 'number' && !isNaN(rawLastSeen) && rawLastSeen > 0;
        if (hasExplicitLastSeen) {
            const ms = rawLastSeen > 1e11 ? rawLastSeen : rawLastSeen * 1000;
            state.serverLastSeen = new Date(ms);
            state.serverLastSeenTimestamp = ms;
            state.lastSeenTimestamp = ms;
            state.lastSeen = state.serverLastSeen;
        }
        if (isOnlinePresence(rawPresence)) {
            // Guard: Duplicate online events (e.g. available followed by composing or repeated available)
            if (state.currentStatus === 'online') {
                state.lastKnownPresence = rawPresence;
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
            this.emit('online', eventData);
            this.emit('presence', eventData);
        }
        else if (isOfflinePresence(rawPresence)) {
            // Guard: Duplicate offline events
            if (state.currentStatus === 'offline') {
                state.lastKnownPresence = rawPresence;
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
                this.emit('offline', eventData);
                this.emit('session', Object.assign(Object.assign({}, session), { jid: state.jid }));
                this.emit('presence', eventData);
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
                this.emit('offline', eventData);
                this.emit('presence', eventData);
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
