/**
 * Audio feeder.
 *
 * Spawns ffmpeg to decode `source` into f32le PCM at the requested rate, then
 * meters frames out at chunk-cadence to the WASM uplink.
 * Supports looping (repeatAudio) and accurate duration limiting (durationMs).
 *
 * @author ShellTear
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const LOW_WATERMARK_CHUNKS = 16;
const MAX_QUEUED_CHUNKS = 1024;
const DEFAULT_WARMUP_MS = 500;

export class AudioFeeder {
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
            if (!existsSync(resolvedSource)) {
                const cwdResolved = resolve(process.cwd(), resolvedSource);
                if (existsSync(cwdResolved)) {
                    resolvedSource = cwdResolved;
                }
                else {
                    process.stderr.write(`[AudioFeeder] Audio file '${resolvedSource}' not found, streaming silence\n`);
                    resolvedSource = "silence";
                }
            }
        }
        this.source = resolvedSource;
    }

    start = () => {
        if (this.#proc)
            return;
        this.#finished = false;
        this.chunksEmitted = 0;
        this.emittedDurationMs = 0;

        const chunkSamples = this.framesPerChunk * this.channels;
        const chunkBytes = chunkSamples * Float32Array.BYTES_PER_ELEMENT;
        const chunkIntervalMs = (this.framesPerChunk / this.sampleRate) * 1000;
        const inputArgs = this.#resolveInputArgs();

        try {
            this.#proc = spawn("ffmpeg", [
                "-hide_banner",
                "-loglevel", "error",
                "-thread_queue_size", "512",
                ...inputArgs,
                "-f", "f32le",
                "-ac", String(this.channels),
                "-ar", String(this.sampleRate),
                "pipe:1",
            ]);
        }
        catch (err) {
            process.stderr.write(`[AudioFeeder] Failed to spawn ffmpeg: ${err?.message || err}\n`);
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

        this.#proc.stderr.on("data", (chunk) => {
            process.stderr.write(`[AudioFeeder] ${chunk.toString().trim()}\n`);
        });

        this.#proc.on("error", (err) => {
            process.stderr.write(`[AudioFeeder] ffmpeg process error: ${err?.message || err}\n`);
        });

        this.#proc.on("exit", (code) => {
            if (code !== 0 && code !== null) {
                process.stderr.write(`[AudioFeeder] ffmpeg exited with code=${code}\n`);
            }
            this.#proc = null;
        });

        this.#nextEmitAtMs = 0;
        this.#warmupUntilMs = Date.now() + DEFAULT_WARMUP_MS;
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
            }
            catch { }
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
        if (this.#nextEmitAtMs === 0)
            this.#nextEmitAtMs = now;
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
        if (this.#finished)
            return;

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
            process.stderr.write(`[VOIP] Duration ${this.durationMs}ms reached\n`);
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
