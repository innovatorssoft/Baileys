import { BinaryNode } from '../WABinary';

export interface OfflineNodeProcessorDeps {
    isWsOpen: () => boolean;
    logger: any;
}

export type NodeProcessor = (node: BinaryNode) => Promise<void> | void;

export declare function makeOfflineNodeProcessor(
    nodeProcessorMap: Map<string, NodeProcessor>,
    deps: OfflineNodeProcessorDeps,
    batchSize?: number
): {
    enqueue: (type: string, node: BinaryNode) => void;
};
