/**
 * Video feeder declarations.
 */
export type VideoFeederOptions = {
    width?: number;
    height?: number;
    fps?: number;
    videoWidth?: number;
    videoHeight?: number;
    videoFps?: number;
    loop?: boolean;
    videoLoop?: boolean;
    repeatVideo?: boolean;
    durationMs?: number;
    durationMS?: number;
};

export declare function checkFfmpegAvailable(bin?: string): Promise<boolean>;

export declare class VideoFeeder {
    readonly source: string;
    readonly width: number;
    readonly height: number;
    readonly fps: number;
    readonly frameDurationMs: number;
    readonly frameSizeBytes: number;
    readonly loop: boolean;
    readonly durationMs: number;

    framesProduced: number;
    framesEmitted: number;
    bytesProduced: number;

    constructor(
        source: string,
        onFrame: (frameBuffer: Buffer | Uint8Array, width: number, height: number, fps: number) => void,
        onEnd?: (() => void) | null,
        onError?: ((err: Error) => void) | null,
        options?: VideoFeederOptions
    );

    get isRunning(): boolean;
    start: () => void;
    stop: () => void;
}
