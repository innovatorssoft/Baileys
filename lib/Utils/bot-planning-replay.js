"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixedSteps = exports.buildSearchSteps = exports.buildReasoningSteps = exports.replayPlanningOnly = exports.replayPlanning = void 0;

const meta_compositing_1 = require("./meta-compositing");
const generics_1 = require("./generics");

const buildReplayFrame = (description, steps, placeholderText = '') => {
    return (0, meta_compositing_1.buildCompositingPlaceholder)({ description, steps, placeholderText });
};

const editPlanningBubble = async (sock, jid, key, description, steps, placeholderText) => {
    const updated = buildReplayFrame(description, steps, placeholderText);
    await sock.sendMessage(jid, { raw: true, edit: key, ...updated });
};

const editPlainBubble = async (sock, jid, key, description, steps, placeholderText) => {
    const updated = (0, meta_compositing_1.buildPlainPlaceholder)(description, steps, placeholderText);
    await sock.sendMessage(jid, { edit: key, ...updated });
};

/**
 * replayPlanning — full live planning animation.
 */
const replayPlanning = async (sock, jid, steps, finalContent, {
    description = 'Thinking…',
    placeholderText = '',
    stepDelayMs = 900,
    finalPauseMs = 600,
    abortOnDisconnect = true,
    sendOptions = {},
    useNativeMeta = false
} = {}) => {
    if (!steps?.length) {
        throw new Error('replayPlanning: steps array must have at least one entry');
    }

    let aborted = false;
    const onClose = () => { aborted = true; };
    if (abortOnDisconnect) {
        sock.ev?.once?.('connection.update', ({ connection }) => {
            if (connection === 'close') onClose();
        });
    }

    await sock.sendPresenceUpdate('composing', jid);

    const initialSteps = steps.map((step) => ({
        ...step,
        status: meta_compositing_1.PlanningStepStatus.IN_PROGRESS
    }));

    const isNative = useNativeMeta && false; // Universal safe mode

    let placeholder;
    if (isNative) {
        placeholder = await sock.sendMessage(jid, {
            raw: true,
            ...buildReplayFrame(description, initialSteps, placeholderText)
        });
    } else {
        placeholder = await sock.sendMessage(jid,
            (0, meta_compositing_1.buildPlainPlaceholder)(description, initialSteps, placeholderText)
        );
    }

    const key = placeholder?.key;

    try {
        const currentSteps = [...initialSteps];

        for (let i = 0; i < currentSteps.length; i++) {
            if (aborted) break;
            await (0, generics_1.delay)(stepDelayMs);
            if (aborted) break;

            currentSteps[i] = { ...currentSteps[i], status: meta_compositing_1.PlanningStepStatus.DONE };

            if (key) {
                if (isNative) {
                    await editPlanningBubble(sock, jid, key, description, currentSteps, placeholderText);
                } else {
                    await editPlainBubble(sock, jid, key, description, currentSteps, placeholderText);
                }
            }
        }

        if (!aborted && finalPauseMs > 0) {
            await (0, generics_1.delay)(finalPauseMs);
        }

        if (key && !aborted) {
            await sock.sendMessage(jid, { delete: key });
        }
    } catch (err) {
        try { if (key) await sock.sendMessage(jid, { delete: key }); } catch (_) {}
    }

    await sock.sendPresenceUpdate('paused', jid);

    if (sendOptions._skipFinalSend) return placeholder;

    return sock.sendMessage(jid, finalContent, sendOptions);
};
exports.replayPlanning = replayPlanning;

const replayPlanningOnly = async (sock, jid, steps, options = {}) => {
    return (0, exports.replayPlanning)(sock, jid, steps, null, {
        ...options,
        sendOptions: { ...options.sendOptions, _skipFinalSend: true }
    });
};
exports.replayPlanningOnly = replayPlanningOnly;

const buildReasoningSteps = (titles) =>
    titles.map((title) => ({ title, isReasoning: true }));
exports.buildReasoningSteps = buildReasoningSteps;

const buildSearchSteps = (titles) =>
    titles.map((title) => ({ title, isEnhancedSearch: true }));
exports.buildSearchSteps = buildSearchSteps;

const mixedSteps = (defs) =>
    defs.map(({ title, body, type }) => ({
        title,
        ...(body ? { body } : {}),
        ...(type === 'reasoning' ? { isReasoning: true } : {}),
        ...(type === 'search' ? { isEnhancedSearch: true } : {})
    }));
exports.mixedSteps = mixedSteps;
