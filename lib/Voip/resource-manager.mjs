/**
 * VoIP Shared Resource Manager.
 *
 * Manages shared, immutable VoIP assets across calls:
 * - Caches compiled WebAssembly.Module (compilation happens once rather than per call).
 * - Manages disk-backed asset paths to avoid copying multi-megabyte source strings into workers.
 * - Tracks active worker counts and provides VoIP memory metrics.
 *
 * @author InnovatorsSoft
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class VoipResourceManager {
    #compiledModule = null;
    #compiledModulePromise = null;
    #wasmBinaryCache = null;
    #loaderCodeCache = null;
    #workerModulesCodeCache = null;
    #activeWorkerCount = 0;
    #activeFfmpegProcesses = 0;
    #activeRelayConnections = 0;

    /**
     * Resolves the standard directory containing VoIP WASM assets.
     */
    resolveWasmDir(targetDir) {
        if (targetDir) {
            return path.isAbsolute(targetDir) ? targetDir : path.resolve(process.cwd(), targetDir);
        }
        const defaultWasmDir = path.resolve(__dirname, "../Wasm");
        if (fs.existsSync(path.join(defaultWasmDir, "whatsapp.wasm"))) {
            return defaultWasmDir;
        }
        const altWasmDir = path.resolve(process.cwd(), "lib/Wasm");
        if (fs.existsSync(path.join(altWasmDir, "whatsapp.wasm"))) {
            return altWasmDir;
        }
        const assetsWasmDir = path.resolve(__dirname, "../Assets/Wasm");
        if (fs.existsSync(path.join(assetsWasmDir, "whatsapp.wasm"))) {
            return assetsWasmDir;
        }
        return defaultWasmDir;
    }

    /**
     * Ensure WASM assets are present in destination directory, copying from Assets/Wasm if needed.
     */
    ensureWasmAssets(targetDir) {
        try {
            const wasmDir = this.resolveWasmDir(targetDir);
            if (!fs.existsSync(wasmDir)) {
                fs.mkdirSync(wasmDir, { recursive: true });
            }
            const sources = [
                path.resolve(__dirname, "../Assets/Wasm"),
                path.resolve(__dirname, "../../lib/Assets/Wasm"),
            ];
            const files = ["whatsapp.wasm", "loader.js", "worker-modules.js"];
            for (const file of files) {
                const dest = path.join(wasmDir, file);
                if (!fs.existsSync(dest)) {
                    for (const srcDir of sources) {
                        if (srcDir === wasmDir) continue;
                        const srcFile = path.join(srcDir, file);
                        if (fs.existsSync(srcFile)) {
                            try {
                                fs.copyFileSync(srcFile, dest);
                                break;
                            } catch { }
                        }
                    }
                }
            }
            return wasmDir;
        } catch {
            return null;
        }
    }

    /**
     * Get or load the raw WASM binary Buffer.
     */
    getWasmBinary(wasmPath, providedBinary) {
        if (providedBinary) {
            return Buffer.isBuffer(providedBinary) ? providedBinary : Buffer.from(providedBinary);
        }
        if (this.#wasmBinaryCache) {
            return this.#wasmBinaryCache;
        }
        if (!wasmPath || !fs.existsSync(wasmPath)) {
            throw new Error(`WASM file not found: ${wasmPath}`);
        }
        this.#wasmBinaryCache = fs.readFileSync(wasmPath);
        return this.#wasmBinaryCache;
    }

    /**
     * Get or asynchronously compile the WebAssembly.Module.
     * Caches the compiled module so subsequent calls reuse it immediately.
     */
    async getCompiledModule(wasmPath, providedBinary) {
        if (this.#compiledModule) {
            return this.#compiledModule;
        }
        if (this.#compiledModulePromise) {
            return this.#compiledModulePromise;
        }

        const buffer = this.getWasmBinary(wasmPath, providedBinary);
        this.#compiledModulePromise = WebAssembly.compile(buffer)
            .then((module) => {
                this.#compiledModule = module;
                this.#compiledModulePromise = null;
                return module;
            })
            .catch((err) => {
                this.#compiledModulePromise = null;
                throw err;
            });

        return this.#compiledModulePromise;
    }

    /**
     * Get the code or path for worker modules.
     */
    getWorkerModulesCode(wasmDir) {
        if (this.#workerModulesCodeCache) {
            return this.#workerModulesCodeCache;
        }
        const filePath = path.join(wasmDir, "worker-modules.js");
        if (fs.existsSync(filePath)) {
            this.#workerModulesCodeCache = fs.readFileSync(filePath, "utf8");
            return this.#workerModulesCodeCache;
        }
        return "";
    }

    /**
     * Get the code or path for loader.
     */
    getLoaderCode(wasmDir, workerBundleHasLoader = false) {
        if (workerBundleHasLoader) {
            return "";
        }
        if (this.#loaderCodeCache) {
            return this.#loaderCodeCache;
        }
        const filePath = path.join(wasmDir, "loader.js");
        if (fs.existsSync(filePath)) {
            this.#loaderCodeCache = fs.readFileSync(filePath, "utf8");
            return this.#loaderCodeCache;
        }
        return "";
    }

    // ─── Worker & Process Tracking ──────────────────────────────────────────

    registerWorkers(count = 1) {
        this.#activeWorkerCount = Math.max(0, this.#activeWorkerCount + count);
    }

    unregisterWorkers(count = 1) {
        this.#activeWorkerCount = Math.max(0, this.#activeWorkerCount - count);
    }

    get workerCount() {
        return this.#activeWorkerCount;
    }

    registerFfmpegProcess() {
        this.#activeFfmpegProcesses += 1;
    }

    unregisterFfmpegProcess() {
        this.#activeFfmpegProcesses = Math.max(0, this.#activeFfmpegProcesses - 1);
    }

    get ffmpegProcessCount() {
        return this.#activeFfmpegProcesses;
    }

    registerRelayConnection() {
        this.#activeRelayConnections += 1;
    }

    unregisterRelayConnection() {
        this.#activeRelayConnections = Math.max(0, this.#activeRelayConnections - 1);
    }

    get relayConnectionCount() {
        return this.#activeRelayConnections;
    }

    /**
     * Get system and VoIP memory metrics snapshot.
     */
    getMemoryStats(additional = {}) {
        const mem = process.memoryUsage();
        const activeWorkers = this.#activeWorkerCount;
        const relayConnections = additional.relayConnectionCount ?? additional.relayConnections ?? this.#activeRelayConnections;
        const ffmpegProcesses = additional.ffmpegProcessCount ?? additional.ffmpegProcesses ?? this.#activeFfmpegProcesses;
        const cachedModules = this.#compiledModule ? 1 : 0;
        const activeCalls = additional.activeCalls ?? additional.activeCallCount ?? 0;
        const waitingCalls = additional.waitingCalls ?? 0;
        const totalManagedCalls = additional.totalManagedCalls ?? activeCalls;

        return {
            rss: mem.rss,
            heapUsed: mem.heapUsed,
            heapTotal: mem.heapTotal,
            external: mem.external,
            arrayBuffers: mem.arrayBuffers ?? 0,
            workerCount: activeWorkers,
            activeWorkers: activeWorkers,
            activeCallCount: activeCalls,
            activeCalls: activeCalls,
            waitingCalls: waitingCalls,
            totalManagedCalls: totalManagedCalls,
            wasmMemoryBytes: additional.wasmMemoryBytes ?? 0,
            relayConnectionCount: relayConnections,
            relayConnections: relayConnections,
            ffmpegProcessCount: ffmpegProcesses,
            ffmpegProcesses: ffmpegProcesses,
            cachedModules: cachedModules,
            process: {
                rss: mem.rss,
                rssMb: Math.round(mem.rss / 1024 / 1024),
                heapUsed: mem.heapUsed,
                heapUsedMb: Math.round(mem.heapUsed / 1024 / 1024),
                heapTotal: mem.heapTotal,
                heapTotalMb: Math.round(mem.heapTotal / 1024 / 1024),
                external: mem.external,
                externalMb: Math.round(mem.external / 1024 / 1024),
                arrayBuffers: mem.arrayBuffers ?? 0,
                arrayBuffersMb: Math.round((mem.arrayBuffers ?? 0) / 1024 / 1024),
            },
            calls: {
                activeCalls: activeCalls,
                waitingCalls: waitingCalls,
                totalManagedCalls: totalManagedCalls,
            },
            resourceManager: {
                activeWorkers: activeWorkers,
                activeRelayConnections: relayConnections,
                activeFfmpegProcesses: ffmpegProcesses,
                compiledModulesCached: cachedModules,
            }
        };
    }

    /**
     * Clear cached module and buffers on full disconnect/cleanup.
     */
    clearCache() {
        this.#compiledModule = null;
        this.#compiledModulePromise = null;
        this.#wasmBinaryCache = null;
        this.#loaderCodeCache = null;
        this.#workerModulesCodeCache = null;
    }

    static get activeWorkers() { return defaultResourceManager.workerCount; }
    static get activeWorkerCount() { return defaultResourceManager.workerCount; }
    static get relayConnections() { return defaultResourceManager.relayConnectionCount; }
    static get ffmpegProcesses() { return defaultResourceManager.ffmpegProcessCount; }
    static registerWorker(count = 1) { defaultResourceManager.registerWorkers(count); }
    static unregisterWorker(count = 1) { defaultResourceManager.unregisterWorkers(count); }
    static registerRelayConnection() { defaultResourceManager.registerRelayConnection(); }
    static unregisterRelayConnection() { defaultResourceManager.unregisterRelayConnection(); }
    static registerFfmpegProcess() { defaultResourceManager.registerFfmpegProcess(); }
    static unregisterFfmpegProcess() { defaultResourceManager.unregisterFfmpegProcess(); }
    static getMemoryStats(additional = {}) { return defaultResourceManager.getMemoryStats(additional); }
    static compileOrGetModule(bytes) { return defaultResourceManager.getCompiledModule(bytes); }
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

/** Global shared instance of VoipResourceManager */
export const defaultResourceManager = new VoipResourceManager();
export const resolvePthreadPoolSize = VoipResourceManager.resolvePthreadPoolSize;
