"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOfflineNodeProcessor = makeOfflineNodeProcessor;

/**
 * Creates a processor for offline stanza nodes that:
 * - Queues nodes for sequential processing
 * - Yields to the event loop periodically to avoid blocking
 * - Catches handler errors to prevent the processing loop from crashing
 */
function makeOfflineNodeProcessor(nodeProcessorMap, deps = {}, batchSize = 10) {
    const nodes = [];
    let isProcessing = false;
    const isWsOpen = typeof deps.isWsOpen === 'function' ? deps.isWsOpen : () => true;

    const enqueue = (type, node) => {
        nodes.push({ type, node });
        if (isProcessing) {
            return;
        }
        isProcessing = true;
        const promise = async () => {
            let processedInBatch = 0;
            while (nodes.length && isWsOpen()) {
                const item = nodes.shift();
                if (!item) break;
                const { type: itemType, node: itemNode } = item;
                const nodeProcessor = typeof nodeProcessorMap.get === 'function'
                    ? nodeProcessorMap.get(itemType)
                    : nodeProcessorMap[itemType];
                if (!nodeProcessor) {
                    deps.logger?.warn?.({ type: itemType }, 'no node processor found for offline node');
                    continue;
                }
                try {
                    await nodeProcessor(itemNode);
                }
                catch (error) {
                    deps.logger?.error?.({ error, node: itemNode }, 'failed to process offline node');
                }
                processedInBatch++;
                if (processedInBatch >= batchSize) {
                    processedInBatch = 0;
                    await new Promise((resolve) => setImmediate(resolve));
                }
            }
            isProcessing = false;
        };
        promise().catch((error) => {
            deps.logger?.error?.({ error }, 'unexpected error in offline node processing loop');
            isProcessing = false;
        });
    };
    return { enqueue };
}
