/**
 * VoIP Diagnostics and Event Timeline Tracer.
 *
 * Provides structured diagnostic logging and a per-call timeline for the VoIP subsystem.
 * Formats events uniformly across Socket, SignalingBridge, CallManager, and CallSession,
 * while preventing sensitive cryptographic leaks.
 *
 * @author InnovatorsSoft
 */

import { appendFileSync } from "node:fs";

const SENSITIVE_ATTR_KEYS = new Set([
    "enc", "token", "secret", "key", "password", "auth", "private", "credential"
]);

const isSensitiveKey = (key) => {
    const k = String(key || "").toLowerCase();
    for (const s of SENSITIVE_ATTR_KEYS) {
        if (k.includes(s)) return true;
    }
    return false;
};

/** Sanitize JID string to prevent accidental token or credential leakage. */
export const sanitizeJid = (jid) => {
    if (!jid || typeof jid !== "string") return "";
    const clean = jid.trim();
    if (!clean.includes("@")) return clean;
    const [userPart, serverPart] = clean.split("@");
    const [user] = userPart.split(":");
    const device = userPart.includes(":") ? userPart.split(":")[1] : null;
    const safeUser = user.replace(/[^a-zA-Z0-9._+-]/g, "");
    const safeDevice = device ? device.replace(/[^0-9]/g, "") : null;
    const safeServer = serverPart.replace(/[^a-zA-Z0-9.-]/g, "");
    return safeDevice ? `${safeUser}:${safeDevice}@${safeServer}` : `${safeUser}@${safeServer}`;
};

/** Extract non-sensitive attribute summaries from a BinaryNode. */
export const summarizeAttrs = (attrs = {}) => {
    if (!attrs || typeof attrs !== "object") return {};
    const safe = {};
    for (const [k, v] of Object.entries(attrs)) {
        if (isSensitiveKey(k)) {
            safe[k] = "[REDACTED]";
        } else if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
            safe[k] = v;
        }
    }
    return safe;
};

/** Summarize a BinaryNode structure without dumping binary buffers or sensitive keys. */
export const summarizeNode = (node) => {
    if (!node || typeof node !== "object") return null;
    const childTags = Array.isArray(node.content)
        ? node.content.map(c => c && typeof c === "object" ? c.tag : null).filter(Boolean)
        : [];
    const isBufferContent = node.content instanceof Uint8Array || Buffer.isBuffer(node.content);
    return {
        tag: node.tag || "",
        attrs: summarizeAttrs(node.attrs),
        children: childTags,
        childCount: childTags.length,
        hasContent: Boolean(node.content),
        contentType: isBufferContent ? "buffer" : typeof node.content,
        contentLength: isBufferContent ? node.content.length : undefined
    };
};

class CallTimelineStore {
    #timelines = new Map(); // callId -> Array<{ time: number, iso: string, event: string, elapsedMs: number, details: object }>
    #startTimes = new Map(); // callId -> number
    #maxEntriesPerCall = 120;
    #maxCalls = 300;
    #ttlMs = 5 * 60_000; // 5 minutes

    record(callId, event, details = {}) {
        if (!callId) return;
        const now = Date.now();
        this.#cleanupStale(now);

        if (!this.#startTimes.has(callId)) {
            this.#startTimes.set(callId, now);
            this.#timelines.set(callId, []);
        }

        const entries = this.#timelines.get(callId);
        const startTime = this.#startTimes.get(callId);
        const elapsedMs = now - startTime;

        if (entries.length >= this.#maxEntriesPerCall) {
            entries.shift(); // keep bounded
        }

        entries.push({
            time: now,
            iso: new Date(now).toISOString(),
            event,
            elapsedMs,
            details: details ? { ...details } : {}
        });
    }

    get(callId) {
        return this.#timelines.get(callId) || [];
    }

    format(callId) {
        const entries = this.get(callId);
        if (!entries.length) {
            return `[VOIP TIMELINE] callId=${callId} (no recorded events)`;
        }
        const lines = [`=== VoIP Call Timeline: ${callId} ===`];
        for (const e of entries) {
            const timeStr = e.iso.substring(11, 23); // HH:mm:ss.sss
            const elapsedStr = `(+${e.elapsedMs}ms)`.padEnd(10);
            const detailStr = Object.keys(e.details).length ? ` ${JSON.stringify(e.details)}` : "";
            lines.push(`${timeStr} ${elapsedStr} ${e.event}${detailStr}`);
        }
        return lines.join("\n");
    }

    clear(callId) {
        this.#timelines.delete(callId);
        this.#startTimes.delete(callId);
    }

    #cleanupStale(now) {
        if (this.#timelines.size <= this.#maxCalls) return;
        for (const [id, start] of this.#startTimes.entries()) {
            if (now - start > this.#ttlMs) {
                this.clear(id);
            }
        }
    }
}

export class VoipDiagnostics {
    #logger = null;
    #diagnosticMode = false;
    #timeline = new CallTimelineStore();

    constructor(logger = null, options = {}) {
        this.#logger = logger;
        this.#diagnosticMode = Boolean(
            options.diagnostic ??
            options.debugVoip ??
            (typeof process !== "undefined" && process.env?.DEBUG_VOIP)
        );
    }

    setLogger(logger) {
        this.#logger = logger;
    }

    getLogger() {
        return this.#logger;
    }

    setDiagnosticMode(enabled) {
        this.#diagnosticMode = Boolean(enabled);
    }

    isDiagnosticMode() {
        return this.#diagnosticMode;
    }

    /**
     * Format and log a structured VoIP event across components.
     */
    log({
        level = "debug",
        component = "VoIP",
        event = "event",
        direction = "internal",
        callId = "",
        correlationId = "",
        jid = "",
        tags = null,
        state = "",
        durationMs = undefined,
        error = null,
        data = {}
    }) {
        const effectiveCallId = callId || correlationId;
        const nowIso = new Date().toISOString();
        const safeJid = sanitizeJid(jid);

        // Record in timeline
        if (effectiveCallId) {
            const timelineDetails = {
                component,
                direction,
                ...(state ? { state } : {}),
                ...(safeJid ? { jid: safeJid } : {}),
                ...(tags?.length ? { tags } : {}),
                ...(durationMs !== undefined ? { durationMs } : {}),
                ...(error ? { error: error?.message || String(error) } : {}),
                ...(data && Object.keys(data).length ? data : {}),
            };
            this.#timeline.record(effectiveCallId, `${component}.${event}`, timelineDetails);
        }

        // Build human-readable formatted string
        const parts = [
            `[VOIP][${nowIso}][${level.toUpperCase()}]`,
            `component=${component}`,
            `event=${event}`,
            `dir=${direction}`,
        ];

        if (callId) parts.push(`callId=${callId}`);
        else if (correlationId) parts.push(`corrId=${correlationId}`);

        if (safeJid) parts.push(`jid=${safeJid}`);
        if (state) parts.push(`state=${state}`);
        if (tags && tags.length) parts.push(`tags=[${tags.join(",")}]`);
        if (durationMs !== undefined) parts.push(`duration=${durationMs}ms`);

        if (error) {
            const errStr = error instanceof Error ? (error.stack || error.message) : String(error);
            parts.push(`error="${errStr}"`);
        }

        if (data && typeof data === "object") {
            const safeData = summarizeAttrs(data);
            const extraKeys = Object.keys(safeData);
            if (extraKeys.length > 0) {
                parts.push(`data=${JSON.stringify(safeData)}`);
            }
        }

        const formattedMsg = parts.join(" ");

        // Structured object for JSON/Pino loggers
        const structuredLog = {
            voip: {
                timestamp: nowIso,
                component,
                event,
                direction,
                callId: callId || undefined,
                correlationId: correlationId || undefined,
                jid: safeJid || undefined,
                tags: tags?.length ? tags : undefined,
                state: state || undefined,
                durationMs,
                error: error ? (error?.message || String(error)) : undefined,
                data: data && Object.keys(data).length ? summarizeAttrs(data) : undefined,
            }
        };

        // If diagnostic mode is on, elevate debug logs to info so they surface in production console
        const targetLevel = (this.#diagnosticMode && level === "debug") ? "info" : level;

        try {
            if (this.#logger) {
                const logFn = this.#logger[targetLevel] || this.#logger[level] || this.#logger.info || this.#logger.log;
                if (typeof logFn === "function") {
                    logFn.call(this.#logger, structuredLog, formattedMsg);
                    try { appendFileSync("voip-debug.log", formattedMsg + "\n"); } catch { }
                    return;
                }
            }
            if (this.#diagnosticMode || level === "warn" || level === "error") {
                const consoleFn = console[targetLevel] || console[level] || console.log;
                consoleFn.call(console, formattedMsg);
            }
            try { appendFileSync("voip-debug.log", formattedMsg + "\n"); } catch { }
        } catch { }
    }

    recordTimeline(callId, step, details = {}) {
        this.#timeline.record(callId, step, details);
    }

    getTimeline(callId) {
        return this.#timeline.get(callId);
    }

    formatTimeline(callId) {
        return this.#timeline.format(callId);
    }

    dumpTimeline(callId, level = "info") {
        const text = this.formatTimeline(callId);
        this.log({
            level,
            component: "Timeline",
            event: "call_timeline_dump",
            callId,
            data: { timelineSummary: text }
        });
        return text;
    }

    clearTimeline(callId) {
        this.#timeline.clear(callId);
    }
}

/** Global default diagnostics instance shared across CommonJS and ESM boundaries */
const GLOBAL_DIAGNOSTICS_KEY = Symbol.for("baileys.voip.diagnostics");
export const voipDiagnostics = globalThis[GLOBAL_DIAGNOSTICS_KEY] || (globalThis[GLOBAL_DIAGNOSTICS_KEY] = new VoipDiagnostics());
