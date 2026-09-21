"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoipResourceManager = void 0;

const fs = require("node:fs");
const path = require("node:path");

class VoipResourceManager {
    static #wasmModuleCache = new Map();
    static #assetPaths = new Map();
    static #activeWorkers = 0;
    static #relayConnections = 0;
    static #ffmpegProcesses = 0;

    static get activeWorkers() {
        return this.#activeWorkers;
    }

    static get relayConnections() {
        return this.#relayConnections;
    }

    static get ffmpegProcesses() {
        return this.#ffmpegProcesses;
    }

    static registerWorker() {
        this.#activeWorkers++;
    }

    static unregisterWorker() {
        if (this.#activeWorkers > 0) {
            this.#activeWorkers--;
        }
    }

    static registerRelayConnection() {
        this.#relayConnections++;
    }

    static unregisterRelayConnection() {
        if (this.#relayConnections > 0) {
            this.#relayConnections--;
        }
    }

    static registerFfmpegProcess() {
        this.#ffmpegProcesses++;
    }

    static unregisterFfmpegProcess() {
        if (this.#ffmpegProcesses > 0) {
            this.#ffmpegProcesses--;
        }
    }

    static async compileOrGetModule(wasmBinary, cacheKey = "default") {
        if (this.#wasmModuleCache.has(cacheKey)) {
            return this.#wasmModuleCache.get(cacheKey);
        }
        const wasmModule = await WebAssembly.compile(wasmBinary);
        this.#wasmModuleCache.set(cacheKey, wasmModule);
        return wasmModule;
    }

    static getCachedModule(cacheKey = "default") {
        return this.#wasmModuleCache.get(cacheKey);
    }

    static setCachedModule(cacheKey, wasmModule) {
        this.#wasmModuleCache.set(cacheKey, wasmModule);
    }

    static clearModuleCache() {
        this.#wasmModuleCache.clear();
    }

    static getAssetPath(filename) {
        if (this.#assetPaths.has(filename)) {
            return this.#assetPaths.get(filename);
        }
        const resolved = path.resolve(__dirname, "../Assets/Wasm", filename);
        if (fs.existsSync(resolved)) {
            this.#assetPaths.set(filename, resolved);
            return resolved;
        }
        return resolved;
    }

    static getMemoryStats() {
        const mem = process.memoryUsage();
        return {
            rss: mem.rss,
            heapUsed: mem.heapUsed,
            heapTotal: mem.heapTotal,
            external: mem.external,
            arrayBuffers: mem.arrayBuffers,
            activeWorkers: this.#activeWorkers,
            relayConnections: this.#relayConnections,
            ffmpegProcesses: this.#ffmpegProcesses,
            cachedModules: this.#wasmModuleCache.size
        };
    }

    static resolvePthreadPoolSize(value) {
        if (value === "auto") {
            const os = require("node:os");
            const cpus = os.cpus().length || 4;
            return Math.min(6, Math.max(2, Math.floor(cpus / 2)));
        }
        if (typeof value === "number" && !isNaN(value)) {
            return Math.min(16, Math.max(2, Math.floor(value)));
        }
        return 4;
    }
}

exports.VoipResourceManager = VoipResourceManager;
exports.resolvePthreadPoolSize = VoipResourceManager.resolvePthreadPoolSize;
