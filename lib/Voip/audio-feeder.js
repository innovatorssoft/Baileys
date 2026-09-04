"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioFeeder = void 0;
const child_process_1 = require("node:child_process");
const fs_1 = require("node:fs");
const path_1 = require("node:path");

const LOW_WATERMARK_CHUNKS = 16;
const MAX_QUEUED_CHUNKS = 1024;
const DEFAULT_WARMUP_MS = 500;

class AudioFeeder {
    sampleRate;
    channels;
    framesPerChunk;
    onChunk;
    source;
    onEnd;
    repeat;
    durationMs;

    #finished = false;
    #proc = null;
    #pending = Buffer.alloc(0);
    #queue = [];
    #emitTimer = null;
    #nextEmitAtMs = 0;
    #warmupUntilMs = 0;

    droppedChunks = 0;
    underflowChunks = 0;
    bytesProduced = 0;
    chunksEmitted = 0;
    emittedDurationMs = 0;

    constructor(
        sampleRate,
        channels,
        framesPerChunk,
        onChunk,
        source = "silence",
        onEnd = null,
        options = {}
    ) {
        this.sampleRate = sampleRate;
        this.channels = channels;
        this.framesPerChunk = framesPerChunk;
        this.onChunk = onChunk;
        this.onEnd = onEnd;
        this.repeat = Boolean(options.repeat || options.repeatAudio || false);
        this.durationMs = Number(options.durationMs ?? options.durationMS ?? 0);

        let resolvedSource = source || "silence";
        if (resolvedSource !== "silence" && !resolvedSource.startsWith("lavfi:")) {
            if (!(0, fs_1.existsSync)(resolvedSource)) {
                const cwdResolved = (0, path_1.resolve)(process.cwd(), resolvedSource);
                if ((0, fs_1.existsSync)(cwdResolved)) {
                    resolvedSource = cwdResolved;
                }
                else {
                    resolvedSource = "silence";
                }
            }
        }
        this.source = resolvedSource;
    }

    start = () => {
        if (this.#proc) return;
        this.#finished = false;
        this.chunksEmitted = 0;
        this.emittedDurationMs = 0;

        const chunkSamples = this.framesPerChunk * this.channels;
        const chunkBytes = chunkSamples * Float32Array.BYTES_PER_ELEMENT;
        const chunkIntervalMs = (this.framesPerChunk / this.sampleRate) * 1000;
        const inputArgs = this.#resolveInputArgs();

        try {
            this.#proc = (0, child_process_1.spawn)("ffmpeg", [
                "-hide_banner",
                "-loglevel", "error",
                "-thread_queue_size", "512",
                ...inputArgs,
                "-f", "f32le",
                "-ac", String(this.channels),
                "-ar", String(this.sampleRate),
                "pipe:1",
            ]);
        } catch (err) {
            this.#finished = true;
            this.onEnd?.();
            return;
        }

        this.#proc.stdout.on("data", (chunk) => {
            this.#pending = Buffer.concat([this.#pending, chunk]);
            while (this.#pending.length >= chunkBytes) {
                if (this.#queue.length >= MAX_QUEUED_CHUNKS) {
                    this.#proc?.stdout.pause();
                    break;
                }
                const frame = this.#pending.subarray(0, chunkBytes);
                this.#pending = this.#pending.subarray(chunkBytes);
                const out = new Float32Array(chunkSamples);
                out.set(new Float32Array(frame.buffer, frame.byteOffset, chunkSamples));
                this.bytesProduced += chunkBytes;
                this.#queue.push(out);
            }
        });

        this.#proc.stderr?.on("data", () => {});

        this.#proc.on("error", () => {});

        this.#proc.on("exit", () => {
            this.#proc = null;
        });

        this.#nextEmitAtMs = 0;
        this.#warmupUntilMs = (this.durationMs > 0 && this.durationMs <= DEFAULT_WARMUP_MS) || this.source === "silence"
            ? 0
            : Date.now() + DEFAULT_WARMUP_MS;
        this.#scheduleNext(chunkSamples, chunkIntervalMs);
    };

    stop = () => {
        if (this.#emitTimer) {
            clearTimeout(this.#emitTimer);
            this.#emitTimer = null;
        }
        if (this.#proc) {
            try {
                this.#proc.kill("SIGTERM");
            } catch { }
            this.#proc = null;
        }
        this.#pending = Buffer.alloc(0);
        this.#queue = [];
        this.#warmupUntilMs = 0;
    };

    #resolveInputArgs = () => {
        if (!this.source || this.source === "silence") {
            return ["-f", "lavfi", "-i", `aevalsrc=0:d=3600:s=${this.sampleRate}`];
        }
        if (this.source.startsWith("lavfi:")) {
            return ["-f", "lavfi", "-i", this.source.slice("lavfi:".length)];
        }
        const fileArgs = [];
        if (this.repeat) {
            fileArgs.push("-stream_loop", "-1");
        }
        fileArgs.push("-i", this.source);
        return fileArgs;
    };

    #scheduleNext = (chunkSamples, chunkIntervalMs) => {
        const now = Date.now();
        if (this.#nextEmitAtMs === 0) this.#nextEmitAtMs = now;
        const delayMs = Math.max(0, this.#nextEmitAtMs - now);

        this.#emitTimer = setTimeout(() => {
            this.#emitTimer = null;
            if (this.#queue.length < LOW_WATERMARK_CHUNKS && Date.now() < this.#warmupUntilMs) {
                this.#nextEmitAtMs = Date.now() + 10;
                this.#scheduleNext(chunkSamples, chunkIntervalMs);
                return;
            }
            this.#flushOne(chunkSamples, chunkIntervalMs);
            if (!this.#finished) {
                this.#nextEmitAtMs += chunkIntervalMs;
                this.#scheduleNext(chunkSamples, chunkIntervalMs);
            }
        }, delayMs);
    };

    #flushOne = (chunkSamples, chunkIntervalMs) => {
        if (this.#finished) return;

        let nextChunk = this.#queue.shift();
        if (!nextChunk) {
            if (this.source !== "silence" && !this.#proc) {
                if (!this.#finished) {
                    this.#finished = true;
                    this.stop();
                    this.onEnd?.();
                }
                return;
            }
            nextChunk = new Float32Array(chunkSamples);
            this.underflowChunks += 1;
        }
        this.chunksEmitted += 1;
        this.emittedDurationMs = this.chunksEmitted * chunkIntervalMs;
        this.onChunk(nextChunk);

        if (this.durationMs > 0 && this.emittedDurationMs >= this.durationMs) {
            this.#finished = true;
            this.stop();
            this.onEnd?.();
            return;
        }

        if (this.#proc?.stdout.isPaused() && this.#queue.length <= MAX_QUEUED_CHUNKS / 4) {
            this.#proc.stdout.resume();
        }
    };
}
exports.AudioFeeder = AudioFeeder;
