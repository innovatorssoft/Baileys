"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSteps = exports.sendMetaComposited = exports.metaTyping = exports.buildPlainPlaceholder = exports.buildCompositingPlaceholder = exports.buildProgressIndicator = exports.supportsMetaRendering = exports.PlanningStepStatus = void 0;

const crypto = require("crypto");
const WAProto_1 = require("../../WAProto");
const rich_message_utils_1 = require("./rich-message-utils");
const Defaults_1 = require("../Defaults");
const generics_1 = require("./generics");

// ─── Step status enum ───
exports.PlanningStepStatus = {
    IN_PROGRESS: 0,
    DONE: 1,
    FAILED: 2
};

/**
 * Check whether the socket explicitly allows native Meta AI progress rendering.
 */
const supportsMetaRendering = (_jid, config = {}) => {
    return config.forceMetaRendering === true;
};
exports.supportsMetaRendering = supportsMetaRendering;

/**
 * Build a BotProgressIndicatorMetadata object.
 */
const buildProgressIndicator = (description, steps = [], estimatedMs) => {
    const stepsMetadata = steps.map((step) => {
        const s = {
            statusTitle: step.title,
            status: step.status ?? exports.PlanningStepStatus.IN_PROGRESS
        };
        if (step.body) s.statusBody = step.body;
        if (step.isReasoning) s.isReasoning = true;
        if (step.isEnhancedSearch) s.isEnhancedSearch = true;
        return s;
    });

    const indicator = { stepsMetadata };
    if (description) indicator.progressDescription = description;
    if (estimatedMs != null) indicator.estimatedCompletionTime = estimatedMs;
    return indicator;
};
exports.buildProgressIndicator = buildProgressIndicator;

/**
 * Build the native Meta AI compositing placeholder.
 */
const buildCompositingPlaceholder = ({
    description = 'Thinking…',
    steps = [],
    estimatedMs,
    placeholderText = ''
} = {}) => {
    const progressIndicatorMetadata = (0, exports.buildProgressIndicator)(description, steps, estimatedMs);
    const textEncoder = new TextEncoder();
    const unifiedData = textEncoder.encode(JSON.stringify({
        response_id: crypto.randomUUID(),
        sections: placeholderText ? [{
            view_model: {
                primitive: {
                    text: placeholderText,
                    inline_entities: [],
                    __typename: 'GenAIMarkdownTextUXPrimitive'
                },
                __typename: 'GenAISingleLayoutViewModel'
            }
        }] : []
    }));

    const richResponseMessage = {
        messageType: WAProto_1.proto.AIRichResponseMessageType?.AI_RICH_RESPONSE_TYPE_STANDARD ?? 1,
        unifiedResponse: { data: unifiedData },
        submessages: [],
        contextInfo: {
            isForwarded: true,
            forwardingScore: 1,
            forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
            forwardOrigin: 4
        }
    };

    return {
        messageContextInfo: {
            botMetadata: {
                pluginMetadata: {},
                progressIndicatorMetadata,
                verificationMetadata: {
                    proofs: [{
                        certificateChain: [
                            (0, rich_message_utils_1.botMetadataCertificate)(684),
                            (0, rich_message_utils_1.botMetadataCertificate)(892)
                        ],
                        version: 1,
                        useCase: 1,
                        signature: (0, rich_message_utils_1.botMetadataSignature)()
                    }]
                },
                botRenderingConfigMetadata: Defaults_1.BOT_RENDERING_CONFIG_METADATA
            }
        },
        botForwardedMessage: {
            message: { richResponseMessage }
        }
    };
};
exports.buildCompositingPlaceholder = buildCompositingPlaceholder;

/**
 * Build a plain-text placeholder that works across all clients.
 */
const buildPlainPlaceholder = (description = 'Thinking…', steps = [], placeholderText = '') => {
    const stepLines = steps.map((step) => {
        const icon = step.status === exports.PlanningStepStatus.DONE ? '✓' :
            step.status === exports.PlanningStepStatus.FAILED ? '✗' : '○';
        return `${icon} ${step.title}`;
    }).join('\n');

    let text = `_${description}_`;
    if (stepLines) text += `\n\n${stepLines}`;
    if (placeholderText) text += `\n\n${placeholderText}`;

    return { text };
};
exports.buildPlainPlaceholder = buildPlainPlaceholder;

/**
 * metaTyping — sends the progress/compositing indicator.
 */
const metaTyping = async (sock, jid, {
    description = 'Thinking…',
    steps = [],
    estimatedMs,
    placeholderText = '',
    useNativeMeta = false
} = {}) => {
    await sock.sendPresenceUpdate('composing', jid);

    if (useNativeMeta && (0, exports.supportsMetaRendering)(jid, sock.config)) {
        const placeholder = (0, exports.buildCompositingPlaceholder)({
            description, steps, estimatedMs, placeholderText
        });
        return sock.sendMessage(jid, { raw: true, ...placeholder });
    }

    const plainSteps = steps.map((s) => ({ ...s, status: exports.PlanningStepStatus.IN_PROGRESS }));
    const placeholder = (0, exports.buildPlainPlaceholder)(description, plainSteps, placeholderText);
    return sock.sendMessage(jid, placeholder);
};
exports.metaTyping = metaTyping;

/**
 * sendMetaComposited — full Meta AI flow.
 */
const sendMetaComposited = async (sock, jid, content, {
    thinkingMs = 2000,
    description = 'Thinking…',
    steps = [],
    placeholderText = '',
    sendOptions = {},
    useNativeMeta = false
} = {}) => {
    const placeholder = await (0, exports.metaTyping)(sock, jid, {
        description, steps, estimatedMs: thinkingMs, placeholderText, useNativeMeta
    });

    try {
        await (0, generics_1.delay)(thinkingMs);
        if (placeholder?.key) {
            await sock.sendMessage(jid, { delete: placeholder.key });
        }
    } catch (_) {}

    await sock.sendPresenceUpdate('paused', jid);
    return sock.sendMessage(jid, content, sendOptions);
};
exports.sendMetaComposited = sendMetaComposited;

/**
 * Build a steps array from plain strings.
 */
const buildSteps = (titles, status = exports.PlanningStepStatus.IN_PROGRESS) =>
    titles.map((title) => ({ title, status }));
exports.buildSteps = buildSteps;
