const { VideoFeeder, checkFfmpegAvailable } = require("../lib/Voip/video-feeder");

describe("VideoFeeder Unit Tests", () => {
    jest.setTimeout(15000);

    test("Test 1 — VideoFeeder validates input and calculates YUV420p dimensions", () => {
        expect(() => new VideoFeeder("", () => {})).toThrow("Video source is required");
        expect(() => new VideoFeeder("./nonexistent_video_file_123.mp4", () => {})).toThrow("Video source file not found");

        const feeder = new VideoFeeder("lavfi:testsrc=size=320x240:rate=15", () => {}, null, null, {
            width: 320,
            height: 240,
            fps: 15,
        });

        expect(feeder.width).toBe(320);
        expect(feeder.height).toBe(240);
        expect(feeder.fps).toBe(15);
        expect(feeder.frameSizeBytes).toBe(320 * 240 * 1.5); // 115200 bytes
        expect(feeder.frameDurationMs).toBeCloseTo(1000 / 15);
    });

    test("Test 2 — VideoFeeder aligns odd width/height dimensions for YUV420p", () => {
        const feeder = new VideoFeeder("lavfi:testsrc=size=321x241:rate=15", () => {}, null, null, {
            width: 321,
            height: 241,
        });

        expect(feeder.width % 2).toBe(0);
        expect(feeder.height % 2).toBe(0);
        expect(feeder.width).toBe(322);
        expect(feeder.height).toBe(242);
        expect(feeder.frameSizeBytes).toBe(322 * 242 * 1.5);
    });

    test("Test 3 — VideoFeeder streams real YUV420p frames from synthetic source", async () => {
        const ffmpegAvailable = await checkFfmpegAvailable();
        if (!ffmpegAvailable) {
            console.log("FFmpeg not found on PATH, skipping live transcoding test");
            return;
        }

        return new Promise((resolve, reject) => {
            const width = 320;
            const height = 240;
            const expectedFrameSize = width * height * 1.5;
            let framesReceived = 0;

            const feeder = new VideoFeeder(
                "lavfi:testsrc=size=320x240:rate=15",
                (frameBuf, w, h, fps) => {
                    expect(Buffer.isBuffer(frameBuf)).toBe(true);
                    expect(frameBuf.length).toBe(expectedFrameSize);
                    expect(w).toBe(width);
                    expect(h).toBe(height);
                    expect(fps).toBe(15);

                    framesReceived++;
                    if (framesReceived >= 3) {
                        feeder.stop();
                        expect(feeder.framesEmitted).toBeGreaterThanOrEqual(3);
                        expect(feeder.isRunning).toBe(false);
                        resolve();
                    }
                },
                () => resolve(),
                (err) => reject(err),
                {
                    width,
                    height,
                    fps: 15,
                }
            );

            feeder.start();
        });
    });

    test("Test 4 — VideoFeeder stops cleanly and releases process", async () => {
        const feeder = new VideoFeeder("lavfi:testsrc=size=320x240:rate=15", () => {}, null, null, {
            width: 320,
            height: 240,
        });

        feeder.start();
        expect(feeder.isRunning).toBe(true);
        feeder.stop();
        expect(feeder.isRunning).toBe(false);
    });
});
