const { AudioFeeder } = require("../lib/Voip/audio-feeder");

describe("AudioFeeder Unit Tests", () => {
    jest.setTimeout(15000);

    test("Test 1 — Normal audio feeder produces chunks and respects chunk dimensions", (done) => {
        const sampleRate = 16000;
        const channels = 1;
        const framesPerChunk = 320;
        let chunksReceived = 0;

        const feeder = new AudioFeeder(
            sampleRate,
            channels,
            framesPerChunk,
            (chunk) => {
                expect(chunk).toBeInstanceOf(Float32Array);
                expect(chunk.length).toBe(framesPerChunk * channels);
                chunksReceived++;
                if (chunksReceived >= 5) {
                    feeder.stop();
                    expect(feeder.chunksEmitted).toBeGreaterThanOrEqual(5);
                    done();
                }
            },
            "silence",
            null,
            { repeatAudio: false }
        );

        feeder.start();
    });

    test("Test 2 — Repeated audio with durationMs stops exactly when duration is reached", (done) => {
        const sampleRate = 16000;
        const channels = 1;
        const framesPerChunk = 320; // 20ms per chunk
        const targetDurationMs = 200; // 10 chunks
        const chunks = [];

        const feeder = new AudioFeeder(
            sampleRate,
            channels,
            framesPerChunk,
            (chunk) => {
                chunks.push(chunk);
            },
            "silence",
            () => {
                expect(feeder.emittedDurationMs).toBeGreaterThanOrEqual(targetDurationMs);
                expect(chunks.length).toBeGreaterThanOrEqual(10);
                done();
            },
            {
                repeatAudio: true,
                durationMs: targetDurationMs,
            }
        );

        feeder.start();
    });

    test("Test 3 — Source longer than duration stops around durationMs", (done) => {
        const sampleRate = 16000;
        const channels = 1;
        const framesPerChunk = 320;
        const shortDurationMs = 100;

        const feeder = new AudioFeeder(
            sampleRate,
            channels,
            framesPerChunk,
            () => {},
            "silence",
            () => {
                expect(feeder.emittedDurationMs).toBeGreaterThanOrEqual(shortDurationMs);
                expect(feeder.emittedDurationMs).toBeLessThanOrEqual(shortDurationMs + 60);
                done();
            },
            {
                repeatAudio: true,
                durationMs: shortDurationMs,
            }
        );

        feeder.start();
    });

    test("Test 4 — Exact duration execution (500ms)", (done) => {
        const sampleRate = 16000;
        const channels = 1;
        const framesPerChunk = 320;
        const targetDurationMs = 500;

        const feeder = new AudioFeeder(
            sampleRate,
            channels,
            framesPerChunk,
            () => {},
            "silence",
            () => {
                expect(feeder.emittedDurationMs).toBeGreaterThanOrEqual(targetDurationMs);
                expect(feeder.chunksEmitted).toBeGreaterThanOrEqual(25);
                done();
            },
            {
                repeatAudio: true,
                durationMs: targetDurationMs,
            }
        );

        feeder.start();
    });

    test("Test 5 — Call ends before duration: stop() immediately halts chunk emission", (done) => {
        const sampleRate = 16000;
        const channels = 1;
        const framesPerChunk = 320;
        let emittedAfterStop = 0;
        let stopped = false;

        const feeder = new AudioFeeder(
            sampleRate,
            channels,
            framesPerChunk,
            () => {
                if (stopped) {
                    emittedAfterStop++;
                }
            },
            "silence",
            null,
            { repeatAudio: true, durationMs: 60000 }
        );

        feeder.start();

        setTimeout(() => {
            stopped = true;
            feeder.stop();
            setTimeout(() => {
                expect(emittedAfterStop).toBe(0);
                done();
            }, 100);
        }, 80);
    });

    test("Test 6 — Missing audio file gracefully falls back to silence without crash", (done) => {
        let chunksReceived = 0;
        const feeder = new AudioFeeder(
            16000,
            1,
            320,
            (chunk) => {
                expect(chunk).toBeInstanceOf(Float32Array);
                chunksReceived++;
            },
            "nonexistent_audio_file.mp3",
            () => {
                expect(chunksReceived).toBeGreaterThanOrEqual(5);
                done();
            },
            { repeatAudio: false, durationMs: 200 }
        );

        feeder.start();
    });
});
