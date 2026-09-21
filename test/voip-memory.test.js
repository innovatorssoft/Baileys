const { VoipResourceManager, resolvePthreadPoolSize } = require("../lib/Voip/resource-manager.js");

describe("VoIP Memory Optimization Tests", () => {
    test("1. VoipResourceManager tracks system memory and process statistics", () => {
        const stats = VoipResourceManager.getMemoryStats();

        expect(stats).toHaveProperty("rss");
        expect(stats).toHaveProperty("heapUsed");
        expect(stats).toHaveProperty("heapTotal");
        expect(stats).toHaveProperty("activeWorkers");
        expect(stats).toHaveProperty("relayConnections");
        expect(stats).toHaveProperty("ffmpegProcesses");

        expect(typeof stats.rss).toBe("number");
        expect(stats.rss).toBeGreaterThan(0);
        expect(typeof stats.activeWorkers).toBe("number");
    });

    test("2. resolvePthreadPoolSize resolves auto and clamped numeric pool sizes", () => {
        // Explicit values
        expect(resolvePthreadPoolSize(2)).toBe(2);
        expect(resolvePthreadPoolSize(4)).toBe(4);
        expect(resolvePthreadPoolSize(8)).toBe(8);

        // Clamping to MIN_PTHREAD_POOL_SIZE (2) and MAX_PTHREAD_POOL_SIZE (16)
        expect(resolvePthreadPoolSize(0)).toBe(2);
        expect(resolvePthreadPoolSize(-5)).toBe(2);
        expect(resolvePthreadPoolSize(100)).toBe(16);

        // "auto" mode resolves to between 2 and 6
        const auto = resolvePthreadPoolSize("auto");
        expect(auto).toBeGreaterThanOrEqual(2);
        expect(auto).toBeLessThanOrEqual(6);

        // Undefined / fallback defaults to 4
        expect(resolvePthreadPoolSize(undefined)).toBe(4);
    });

    test("3. VoipResourceManager tracks worker lifecycle accurately", () => {
        const initialWorkers = VoipResourceManager.activeWorkers;

        VoipResourceManager.registerWorker();
        VoipResourceManager.registerWorker();
        expect(VoipResourceManager.activeWorkers).toBe(initialWorkers + 2);

        VoipResourceManager.unregisterWorker();
        expect(VoipResourceManager.activeWorkers).toBe(initialWorkers + 1);

        VoipResourceManager.unregisterWorker();
        expect(VoipResourceManager.activeWorkers).toBe(initialWorkers);

        // Negative guard
        VoipResourceManager.unregisterWorker();
        expect(VoipResourceManager.activeWorkers).toBe(0);
    });

    test("4. VoipResourceManager tracks relay connections and ffmpeg processes", () => {
        VoipResourceManager.registerRelayConnection();
        expect(VoipResourceManager.relayConnections).toBe(1);

        VoipResourceManager.unregisterRelayConnection();
        expect(VoipResourceManager.relayConnections).toBe(0);

        VoipResourceManager.registerFfmpegProcess();
        expect(VoipResourceManager.ffmpegProcesses).toBe(1);

        VoipResourceManager.unregisterFfmpegProcess();
        expect(VoipResourceManager.ffmpegProcesses).toBe(0);
    });

    test("5. WebAssembly.Module caching in VoipResourceManager", async () => {
        // Generate minimal valid WebAssembly binary (magic 0x00 0x61 0x73 0x6d, version 0x01 0x00 0x00 0x00)
        const minimalWasmBytes = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]);

        const mod1 = await VoipResourceManager.compileOrGetModule(minimalWasmBytes);
        expect(mod1).toBeInstanceOf(WebAssembly.Module);

        // Calling with same bytes returns cached instance
        const mod2 = await VoipResourceManager.compileOrGetModule(minimalWasmBytes);
        expect(mod2).toBe(mod1);
    });
});
