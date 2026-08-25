export type AudioFeederOptions = {
    repeat?: boolean;
    repeatAudio?: boolean;
    durationMs?: number;
    durationMS?: number;
};

export declare class AudioFeeder {
    #private;
    readonly sampleRate: number;
    readonly channels: number;
    readonly framesPerChunk: number;
    readonly onChunk: (chunk: Float32Array) => void;
    readonly source: string;
    readonly onEnd: (() => void) | null;
    readonly repeat: boolean;
    readonly durationMs: number;
    droppedChunks: number;
    underflowChunks: number;
    bytesProduced: number;
    chunksEmitted: number;
    emittedDurationMs: number;
    constructor(sampleRate: number, channels: number, framesPerChunk: number, onChunk: (chunk: Float32Array) => void, source?: string, onEnd?: (() => void) | null, options?: AudioFeederOptions);
    start: () => void;
    stop: () => void;
}
