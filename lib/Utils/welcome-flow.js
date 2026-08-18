"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWelcomeFlow = void 0;

const fs_1 = require("fs");
const WABinary_1 = require("../WABinary");
const generics_1 = require("./generics");

const DEFAULT_CONFIG = {
    greeting: '👋 Welcome! How can I help you today?',
    footer: 'Powered by Baileys',
    buttonText: '📋 Choose an option',
    faqs: [
        { id: 'faq_1', title: '📦 Track my order', description: 'Check order status' },
        { id: 'faq_2', title: '💳 Billing & payments', description: 'Payment issues & invoices' },
        { id: 'faq_3', title: '🛠️ Technical support', description: 'Get help with a problem' },
        { id: 'faq_4', title: '📞 Talk to a human', description: 'Connect with support staff' },
    ],
    sectionTitle: 'How can we help?',
    typingDelayMs: 1200,
    persistPath: null,
    ignoreGroups: true,
    ignoreNewsletter: true,
    ignoreBroadcast: true,
    onGreet: null,
    onFaqReply: null,
};

const createSeenStore = (persistPath) => {
    const seen = new Set();

    if (persistPath && (0, fs_1.existsSync)(persistPath)) {
        try {
            const data = JSON.parse((0, fs_1.readFileSync)(persistPath, 'utf8'));
            if (Array.isArray(data)) data.forEach((jid) => seen.add(jid));
        } catch (_) {}
    }

    const save = () => {
        if (!persistPath) return;
        try {
            (0, fs_1.writeFileSync)(persistPath, JSON.stringify([...seen]), 'utf8');
        } catch (_) {}
    };

    return {
        has: (jid) => seen.has(jid),
        add: (jid) => { seen.add(jid); save(); },
        delete: (jid) => { seen.delete(jid); save(); },
        clear: () => { seen.clear(); save(); }
    };
};

const buildWelcomeMessage = (config, quotedMsg = null) => {
    const { greeting, footer, buttonText, faqs, sectionTitle } = config;

    const content = {
        text: greeting,
        footer,
        buttonText,
        sections: [
            {
                title: sectionTitle,
                rows: faqs.map((faq) => ({
                    title: faq.title,
                    description: faq.description || '',
                    rowId: faq.id
                }))
            }
        ]
    };

    return content;
};

/**
 * createWelcomeFlow — attach a Meta Business-style welcome template to a socket.
 */
const createWelcomeFlow = (sock, config = {}) => {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const seen = createSeenStore(cfg.persistPath);
    const inFlight = new Set();

    const handleFaqReply = async (msg) => {
        if (typeof cfg.onFaqReply !== 'function') return;
        const reply = msg.message?.listResponseMessage;
        if (!reply) return;
        const faqId = reply.singleSelectReply?.selectedRowId;
        const jid = (0, WABinary_1.jidNormalizedUser)(msg.key.remoteJid);
        if (faqId) {
            await cfg.onFaqReply(jid, faqId, msg);
        }
    };

    const handleMessage = async ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
            try {
                const jid = msg.key?.remoteJid;
                if (!jid || msg.key?.fromMe) continue;

                if (cfg.ignoreGroups && (0, WABinary_1.isJidGroup)(jid)) continue;
                if (cfg.ignoreNewsletter && (0, WABinary_1.isJidNewsletter)(jid)) continue;
                if (cfg.ignoreBroadcast && (0, WABinary_1.isJidBroadcast)(jid)) continue;

                const normalizedJid = (0, WABinary_1.jidNormalizedUser)(jid);

                if (msg.message?.listResponseMessage) {
                    await handleFaqReply(msg);
                    continue;
                }

                if (seen.has(normalizedJid) || inFlight.has(normalizedJid)) continue;

                inFlight.add(normalizedJid);
                try {
                    if (cfg.typingDelayMs > 0) {
                        await sock.sendPresenceUpdate('composing', jid);
                        await (0, generics_1.delay)(cfg.typingDelayMs);
                        await sock.sendPresenceUpdate('paused', jid);
                    }

                    const welcomeContent = buildWelcomeMessage(cfg, msg);
                    await sock.sendMessage(jid, welcomeContent, { quoted: msg });
                    seen.add(normalizedJid);

                    if (typeof cfg.onGreet === 'function') {
                        await cfg.onGreet(normalizedJid, msg).catch(() => {});
                    }
                } finally {
                    inFlight.delete(normalizedJid);
                }
            } catch (_) {}
        }
    };

    return {
        listen() {
            sock.ev.on('messages.upsert', handleMessage);
        },
        stop() {
            sock.ev.off('messages.upsert', handleMessage);
        },
        reset(jid) {
            seen.delete((0, WABinary_1.jidNormalizedUser)(jid));
        },
        resetAll() {
            seen.clear();
        },
        hasGreeted(jid) {
            return seen.has((0, WABinary_1.jidNormalizedUser)(jid));
        }
    };
};
exports.createWelcomeFlow = createWelcomeFlow;
