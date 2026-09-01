/**
 * Video feeder.
 *
 * Spawns ffmpeg to decode `source` into raw YUV420p frames at the requested
 * resolution and frame rate, metering frames at real-time playback cadence
 * to the WhatsApp VoIP/WASM uplink.
 * Supports looping (videoLoop) and accurate duration limiting.
 *
 * @author ShellTear
 */
import { spawn, execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const FFMPEG_BIN = "ffmpeg";
const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;
const DEFAULT_FPS = 15;
const MAX_STDERR_CHARS = 16 * 1024;

let ffmpegAvailableCache = null;

export function checkFfmpegAvailable(bin = FFMPEG_BIN) {
    if (ffmpegAvailableCache !== null) {
        return Promise.resolve(ffmpegAvailableCache);
    }
    return new Promise((res) => {
        execFile(bin, ["-version"], { timeout: 5000 }, (err) => {
            ffmpegAvailableCache = !err;
            res(ffmpegAvailableCache);
        });
    });
}

export class VideoFeeder {
    source;
    width;
    height;
    fps;
    frameDurationMs;
    frameSizeBytes;
    onFrame;
    onEnd;
    onError;
    loop;
    durationMs;

    #running = false;
    #proc = null;
    #pending = Buffer.alloc(0);
    #stderr = "";

    framesProduced = 0;
    framesEmitted = 0;
    bytesProduced = 0;

    constructor(
        source,
        onFrame,
        onEnd = null,
        onError = null,
        options = {}
    ) {
        if (!source) {
            throw new Error("Video source is required");
        }

        let resolvedSource = source;
        if (!resolvedSource.startsWith("lavfi:")) {
            if (!existsSync(resolvedSource)) {
                const cwdResolved = resolve(process.cwd(), resolvedSource);
                if (existsSync(cwdResolved)) {
                    resolvedSource = cwdResolved;
                }
                else {
                    throw new Error(`Video source file not found: ${source}`);
                }
            }
        }

        this.source = resolvedSource;
        this.onFrame = onFrame;
        this.onEnd = onEnd;
        this.onError = onError;

        this.width = Number(options.width || options.videoWidth || DEFAULT_WIDTH);
        this.height = Number(options.height || options.videoHeight || DEFAULT_HEIGHT);
        // Ensure even dimensions for YUV420p
        if (this.width % 2 !== 0) this.width += 1;
        if (this.height % 2 !== 0) this.height += 1;

        this.fps = Math.max(1, Math.min(60, Number(options.fps || options.videoFps || DEFAULT_FPS)));
        this.frameDurationMs = 1000 / this.fps;
        // YUV420p frame size = width * height * 1.5 bytes (Y plane + U plane + V plane)
        this.frameSizeBytes = Math.floor(this.width * this.height * 1.5);

        this.loop = Boolean(options.loop || options.videoLoop || options.repeatVideo || false);
        this.durationMs = Number(options.durationMs ?? options.durationMS ?? 0);
    }

    get isRunning() {
        return this.#running;
    }

    start = () => {
        if (this.#proc || this.#running)
            return;
        this.#running = true;
        this.framesProduced = 0;
        this.framesEmitted = 0;
        this.bytesProduced = 0;
        this.#pending = Buffer.alloc(0);
        this.#stderr = "";

        const scaleFilter = `scale=${this.width}:${this.height}:force_original_aspect_ratio=decrease,pad=${this.width}:${this.height}:(ow-iw)/2:(oh-ih)/2`;

        const args = [
            "-hide_banner",
            "-loglevel", "error",
        ];

        if (this.loop && !this.source.startsWith("lavfi:")) {
            args.push("-stream_loop", "-1");
        }

        if (this.source.startsWith("lavfi:")) {
            args.push("-f", "lavfi", "-re", "-i", this.source.slice(6));
        }
        else {
            args.push("-re", "-i", this.source);
        }

        args.push(
            "-an",
            "-vf", scaleFilter,
            "-r", String(this.fps),
            "-pix_fmt", "yuv420p",
            "-f", "rawvideo",
            "pipe:1"
        );

        try {
            this.#proc = spawn(FFMPEG_BIN, args, { stdio: ["ignore", "pipe", "pipe"] });
        }
        catch (err) {
            this.#running = false;
            process.stderr.write(`[VideoFeeder] Failed to spawn ffmpeg: ${err?.message || err}\n`);
            this.onError?.(err);
            return;
        }

        const proc = this.#proc;

        proc.stdout?.on("data", (chunk) => {
            if (!this.#running)
                return;
            this.#handleData(chunk);
        });

        proc.stderr?.on("data", (chunk) => {
            this.#stderr = (this.#stderr + chunk.toString()).slice(-MAX_STDERR_CHARS);
        });

        proc.on("error", (err) => {
            this.#running = false;
            process.stderr.write(`[VideoFeeder] FFmpeg process error: ${err?.message || err}\n`);
            this.onError?.(err);
        });

        proc.on("close", (code) => {
            if (this.#proc === proc) {
                this.#proc = null;
            }
            const wasRunning = this.#running;
            this.#running = false;

            if (code !== 0 && code !== null && wasRunning) {
                const errMsg = this.#stderr.trim() || `FFmpeg exited with code ${code}`;
                process.stderr.write(`[VideoFeeder] FFmpeg exited: ${errMsg}\n`);
                this.onError?.(new Error(errMsg));
            }
            else if (wasRunning) {
                this.onEnd?.();
            }
        });
    };

    #handleData = (chunk) => {
        this.bytesProduced += chunk.length;
        this.#pending = Buffer.concat([this.#pending, chunk]);

        while (this.#pending.length >= this.frameSizeBytes) {
            const frameBuf = this.#pending.subarray(0, this.frameSizeBytes);
            this.#pending = this.#pending.subarray(this.frameSizeBytes);

            this.framesProduced += 1;
            this.framesEmitted += 1;

            try {
                this.onFrame?.(frameBuf, this.width, this.height, this.fps);
            }
            catch (err) {
                this.onError?.(err);
            }
        }
    };

    stop = () => {
        this.#running = false;
        if (this.#proc) {
            try {
                this.#proc.kill("SIGKILL");
            }
            catch { }
            this.#proc = null;
        }
        this.#pending = Buffer.alloc(0);
    };
}
