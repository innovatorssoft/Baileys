"use strict"

const { proto } = require("../../WAProto")
const { generateMessageID } = require("./generics")
const { getUrlFromDirectPath } = require("./messages-media")

// ── JavaScript keywords ──────────────────────────────────────────────────────
const JS_KEYWORDS = new Set([
    'import', 'export', 'from', 'default', 'as',
    'const', 'let', 'var',
    'function', 'class', 'extends',
    'new', 'return',
    'if', 'else',
    'for', 'while', 'do',
    'switch', 'case', 'break', 'continue',
    'try', 'catch', 'finally', 'throw',
    'async', 'await', 'yield',
    'typeof', 'instanceof', 'in', 'of',
    'delete', 'void',
    'true', 'false', 'null', 'undefined',
    'NaN', 'Infinity',
    'this', 'super', 'static', 'get', 'set',
    'debugger', 'with'
])

// ── Python keywords ──────────────────────────────────────────────────────────
const PYTHON_KEYWORDS = new Set([
    'import', 'from', 'as',
    'def', 'class', 'return',
    'if', 'elif', 'else',
    'for', 'while', 'break', 'continue',
    'try', 'except', 'finally', 'raise',
    'with', 'yield', 'lambda', 'pass',
    'del', 'global', 'nonlocal', 'assert',
    'True', 'False', 'None',
    'and', 'or', 'not', 'in', 'is',
    'async', 'await', 'self', 'print'
])

const LANGUAGE_KEYWORDS = {
    javascript: JS_KEYWORDS,
    typescript: JS_KEYWORDS,
    js: JS_KEYWORDS,
    ts: JS_KEYWORDS,
    python: PYTHON_KEYWORDS,
    py: PYTHON_KEYWORDS
}

// ── Token type enum ──────────────────────────────────────────────────────────
const CodeHighlightType = {
    DEFAULT: 0,
    KEYWORD: 1,
    METHOD: 2,
    STRING: 3,
    NUMBER: 4,
    COMMENT: 5
}

// Reverse map for reference
CodeHighlightType[0] = 'DEFAULT'
CodeHighlightType[1] = 'KEYWORD'
CodeHighlightType[2] = 'METHOD'
CodeHighlightType[3] = 'STRING'
CodeHighlightType[4] = 'NUMBER'
CodeHighlightType[5] = 'COMMENT'

// ── Sub-message type enum ────────────────────────────────────────────────────
const RichSubMessageType = {
    UNKNOWN: 0,
    GRID_IMAGE: 1,
    TEXT: 2,
    INLINE_IMAGE: 3,
    TABLE: 4,
    CODE: 5,
    DYNAMIC: 6,
    MAP: 7,
    LATEX: 8,
    CONTENT_ITEMS: 9
}

// ── Tokenizer ────────────────────────────────────────────────────────────────
const tokenizeCode = (codeStr, language = 'javascript') => {
    const keywords = LANGUAGE_KEYWORDS[language] || JS_KEYWORDS
    const blocks = []
    const lines = codeStr.split('\n')

    for (let li = 0; li < lines.length; li++) {
        const line = lines[li]
        const isLast = li === lines.length - 1
        const nl = isLast ? '' : '\n'

        if (!line.trim()) {
            blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: line + nl })
            continue
        }

        if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
            blocks.push({ highlightType: CodeHighlightType.COMMENT, codeContent: line + nl })
            continue
        }

        const regex =
            /(\/\/.*$|#.*$)|(\"(?:[^\"\\]|\\.)*\")|('(?:[^'\\]|\\.)*')|(`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_$][\w$]*\b)|([^\s\w$\"'`]+)|(\s+)/g

        let match
        const tokens = []

        while ((match = regex.exec(line)) !== null) {
            const val = match[0]

            if (match[1]) {
                tokens.push({ highlightType: CodeHighlightType.COMMENT, codeContent: val })
            } else if (match[2] || match[3] || match[4]) {
                tokens.push({ highlightType: CodeHighlightType.STRING, codeContent: val })
            } else if (match[5]) {
                tokens.push({ highlightType: CodeHighlightType.NUMBER, codeContent: val })
            } else if (match[6]) {
                if (keywords.has(val)) {
                    tokens.push({ highlightType: CodeHighlightType.KEYWORD, codeContent: val })
                } else {
                    const after = line.slice(regex.lastIndex).trimStart()
                    if (after.startsWith('(')) {
                        tokens.push({ highlightType: CodeHighlightType.METHOD, codeContent: val })
                    } else {
                        tokens.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: val })
                    }
                }
            } else {
                tokens.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: val })
            }
        }

        if (tokens.length === 0) {
            blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: line + nl })
            continue
        }

        // Merge adjacent same-type tokens
        const merged = []
        for (const t of tokens) {
            const prev = merged.length > 0 ? merged[merged.length - 1] : undefined
            if (prev && prev.highlightType === t.highlightType) {
                prev.codeContent += t.codeContent
            } else {
                merged.push({ ...t })
            }
        }

        if (merged.length > 0) {
            merged[merged.length - 1].codeContent += nl
        }

        blocks.push(...merged)
    }

    return blocks
}

// ── Context / wrapper helpers ─────────────────────────────────────────────────

/**
 * Build a contextInfo object for botForwardedMessage payloads.
 * @param {object|null} quoted - optional quoted WAMessage
 */
const buildRichContextInfo = (quoted, options = {}) => {
    const ctxInfo = {
        forwardingScore: 1,
        isForwarded: true,
        forwardedAiBotMessageInfo: { botJid: options.botJid ? options.botJid : '867051314767696@bot' },
        forwardOrigin: 4,
        ...(options.mentions ? { mentionedJid: options.mentions } : {})
    }

    if (quoted?.key) {
        ctxInfo.stanzaId = quoted.key.id
        ctxInfo.participant = quoted.key.participant || quoted.sender || quoted.key.remoteJid
        ctxInfo.quotedMessage = quoted.message
    }

    return ctxInfo
}

/**
 * Wrap submessages into the botForwardedMessage → richResponseMessage proto structure.
 * @param {Array}  submessages
 * @param {object} contextInfo
 * @param {object|null} unifiedResponse - optional pre-captured unified response data
 */
const buildBotForwardedMessage = (submessages, contextInfo, unifiedResponse) => {
    const richResponse = {
        messageType: 1,
        submessages,
        contextInfo
    }

    if (unifiedResponse) {
        richResponse.unifiedResponse = unifiedResponse
    }

    return {
        botForwardedMessage: {
            message: {
                richResponseMessage: richResponse
            }
        }
    }
}

// ── Generators ───────────────────────────────────────────────────────────────

/**
 * Generate a rich table message.
 * @param {string}   title
 * @param {string[]} headers
 * @param {string[][]} rows
 * @param {object|null} quoted
 * @param {object}   options  - { headerText?, footer? }
 */
const generateTableContent = (title, headers, rows, quoted, options = {}) => {
    const { footer, headerText } = options
    const tableRows = [
        { items: headers, isHeading: true },
        ...rows.map(row => ({ items: row.map(String) }))
    ]

    const submessages = []
    if (headerText) {
        submessages.push({ messageType: 2, messageText: headerText })
    }
    submessages.push({ messageType: 4, tableMetadata: { title, rows: tableRows } })
    if (footer) {
        submessages.push({ messageType: 2, messageText: footer })
    }

    const ctxInfo = buildRichContextInfo(quoted)
    return {
        message: buildBotForwardedMessage(submessages, ctxInfo),
        messageId: generateMessageID()
    }
}

/**
 * Generate a rich list message.
 * @param {string}          title
 * @param {string[]|string[][]} items
 * @param {object|null}     quoted
 * @param {object}          options - { headerText?, footer? }
 */
const generateListContent = (title, items, quoted, options = {}) => {
    const { footer, headerText } = options
    const tableRows = items.map(item => ({
        items: Array.isArray(item) ? item.map(String) : [String(item)]
    }))

    const submessages = []
    if (headerText) {
        submessages.push({ messageType: 2, messageText: headerText })
    }
    submessages.push({ messageType: 4, tableMetadata: { title, rows: tableRows } })
    if (footer) {
        submessages.push({ messageType: 2, messageText: footer })
    }

    const ctxInfo = buildRichContextInfo(quoted)
    return {
        message: buildBotForwardedMessage(submessages, ctxInfo),
        messageId: generateMessageID()
    }
}

/**
 * Generate a rich code-block message with syntax highlighting.
 * @param {string}      code
 * @param {object|null} quoted
 * @param {object}      options - { title?, language?, footer? }
 */
const generateCodeBlockContent = (code, quoted, options = {}) => {
    const { title, footer, language = 'javascript' } = options
    const submessages = []

    if (title) {
        submessages.push({ messageType: 2, messageText: title })
    }
    submessages.push({
        messageType: 5,
        codeMetadata: {
            codeLanguage: language,
            codeBlocks: tokenizeCode(code, language)
        }
    })
    if (footer) {
        submessages.push({ messageType: 2, messageText: footer })
    }

    const ctxInfo = buildRichContextInfo(quoted)
    return {
        message: buildBotForwardedMessage(submessages, ctxInfo),
        messageId: generateMessageID()
    }
}

/**
 * Generate a LaTeX expression message (text only, no image rendering).
 * @param {object|null} quoted
 * @param {object}      options - { text?, expressions, headerText?, footer? }
 */
const generateLatexContent = (quoted, options) => {
    const { text, expressions, headerText, footer } = options
    const submessages = []

    if (headerText) {
        submessages.push({ messageType: 2, messageText: headerText })
    }

    const latexExpressions = expressions.map(expr => {
        const entry = {
            latexExpression: expr.latexExpression,
            url: expr.url,
            width: expr.width,
            height: expr.height
        }
        if (expr.fontHeight !== undefined) entry.fontHeight = expr.fontHeight
        if (expr.imageTopPadding !== undefined) entry.imageTopPadding = expr.imageTopPadding
        if (expr.imageLeadingPadding !== undefined) entry.imageLeadingPadding = expr.imageLeadingPadding
        if (expr.imageBottomPadding !== undefined) entry.imageBottomPadding = expr.imageBottomPadding
        if (expr.imageTrailingPadding !== undefined) entry.imageTrailingPadding = expr.imageTrailingPadding
        return entry
    })

    submessages.push({ messageType: 8, latexMetadata: { text: text || '', expressions: latexExpressions } })
    if (footer) {
        submessages.push({ messageType: 2, messageText: footer })
    }

    const ctxInfo = buildRichContextInfo(quoted)
    return {
        message: buildBotForwardedMessage(submessages, ctxInfo),
        messageId: generateMessageID()
    }
}

/**
 * Render LaTeX expressions to images, upload them, and build a latex message.
 * @param {object|null} quoted
 * @param {object}      options          - { text?, expressions, headerText?, footer? }
 * @param {Function}    uploadFn         - async (buffer, type) => { url, directPath }
 * @param {Function}    renderLatexToPng - async (latexExpr) => { buffer, width, height }
 */
const generateLatexImageContent = async (quoted, options, uploadFn, renderLatexToPng) => {
    const { text, expressions, headerText, footer } = options
    const submessages = []

    if (headerText) {
        submessages.push({ messageType: 2, messageText: headerText })
    }

    const latexExpressions = await Promise.all(
        expressions.map(async expr => {
            const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
            const uploadResult = await uploadFn(buffer, 'image')
            const imageUrl = uploadResult.url || uploadResult.directPath
            return { latexExpression: expr.latexExpression, url: imageUrl, width, height }
        })
    )

    submessages.push({ messageType: 8, latexMetadata: { text: text || '', expressions: latexExpressions } })
    if (footer) {
        submessages.push({ messageType: 2, messageText: footer })
    }

    const ctxInfo = buildRichContextInfo(quoted)
    return {
        message: buildBotForwardedMessage(submessages, ctxInfo),
        messageId: generateMessageID()
    }
}

/**
 * Render each LaTeX expression as an inline image block.
 * @param {object|null} quoted
 * @param {object}      options          - { text?, expressions, headerText?, footer? }
 * @param {Function}    uploadFn         - async (buffer, type) => { url, directPath }
 * @param {Function}    renderLatexToPng - async (latexExpr) => { buffer, width, height }
 */
const generateLatexInlineImageContent = async (quoted, options, uploadFn, renderLatexToPng) => {
    const { text, expressions, headerText, footer } = options
    const submessages = []

    if (headerText) {
        submessages.push({ messageType: 2, messageText: headerText })
    }
    if (text) {
        submessages.push({ messageType: 2, messageText: text })
    }

    for (const expr of expressions) {
        const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
        const uploadResult = await uploadFn(buffer, 'image')
        const imageUrl = uploadResult.url || uploadResult.directPath
        submessages.push({
            messageType: 3,
            imageMetadata: {
                imageUrl: {
                    imagePreviewUrl: imageUrl,
                    imageHighResUrl: imageUrl
                },
                imageText: expr.latexExpression,
                alignment: 2
            }
        })
    }

    if (footer) {
        submessages.push({ messageType: 2, messageText: footer })
    }

    const ctxInfo = buildRichContextInfo(quoted)
    return {
        message: buildBotForwardedMessage(submessages, ctxInfo),
        messageId: generateMessageID()
    }
}

/**
 * Generate a rich markdown message.
 * @param {string}      text
 * @param {object|null} quoted
 * @param {object}      options - { botJid?, mentions? }
 */
const generateMarkdownContent = (text, quoted, options = {}) => {
    const crypto = require('crypto')
    const submessages = [
        {
            messageType: 2,
            messageText: text
        }
    ]

    const sections = submessages.map(sm => {
        if (sm.messageType === 2) {
            return {
                view_model: {
                    primitive: {
                        text: sm.messageText,
                        __typename: "GenAIMarkdownTextUXPrimitive"
                    },
                    __typename: "GenAISingleLayoutViewModel"
                }
            }
        }
        return null
    }).filter(Boolean)

    const unifiedResponse = {
        data: Buffer.from(JSON.stringify({
            response_id: crypto.randomUUID(),
            sections
        })).toString("base64")
    }

    const ctxInfo = buildRichContextInfo(quoted, options)
    return {
        message: buildBotForwardedMessage(submessages, ctxInfo, unifiedResponse),
        messageId: generateMessageID()
    }
}

/**
 * Capture the unifiedResponse payload from an incoming Meta AI botForwardedMessage.
 * Returns null if the message is not a rich response.
 * @param {object} msg - the raw WAMessage.message object
 */
const captureUnifiedResponse = (msg) => {
    const botFwd = msg?.botForwardedMessage?.message
    if (!botFwd) return null
    const rich = botFwd.richResponseMessage
    if (!rich?.unifiedResponse?.data) return null
    return {
        unifiedResponse: { data: rich.unifiedResponse.data },
        submessages: rich.submessages || [],
        contextInfo: rich.contextInfo || {}
    }
}

/**
 * Re-send a previously captured unified response to a new JID.
 * @param {object|null} quoted
 * @param {object}      captured - result of captureUnifiedResponse()
 */
const generateUnifiedResponseContent = (quoted, captured) => {
    const ctxInfo = buildRichContextInfo(quoted)
    return {
        message: buildBotForwardedMessage(captured.submessages, ctxInfo, captured.unifiedResponse),
        messageId: generateMessageID()
    }
}

/**
 * Build a fully custom rich message from an arbitrary submessages array.
 * @param {Array}       submessages
 * @param {object|null} quoted
 * @param {object}      options - { botJid?, mentions?, useMarkdown?, unifiedResponse? }
 */
const generateRichMessageContent = (submessages, quoted, options = {}) => {
    const crypto = require('crypto')
    const ctxInfo = buildRichContextInfo(quoted, options)
    
    let unifiedResponse = options.unifiedResponse;
    if (options.useMarkdown && !unifiedResponse) {
        const sections = submessages.map(sm => {
            if (sm.messageType === 2) {
                return {
                    view_model: {
                        primitive: { text: sm.messageText, __typename: "GenAIMarkdownTextUXPrimitive" },
                        __typename: "GenAISingleLayoutViewModel"
                    }
                }
            }
            if (sm.messageType === 4 && sm.tableMetadata) {
                return {
                    view_model: {
                        primitive: { 
                            rows: sm.tableMetadata.rows.map(r => ({
                                is_header: !!r.isHeading,
                                cells: r.items
                            })), 
                            __typename: "GenATableUXPrimitive" 
                        },
                        __typename: "GenAISingleLayoutViewModel"
                    }
                }
            }
            if (sm.messageType === 5 && sm.codeMetadata) {
                return {
                    view_model: {
                        primitive: { 
                            language: sm.codeMetadata.codeLanguage || 'javascript', 
                            code_blocks: sm.codeMetadata.codeBlocks.map(cb => ({ content: cb.codeContent, type: "DEFAULT" })), 
                            __typename: "GenAICodeUXPrimitive" 
                        },
                        __typename: "GenAISingleLayoutViewModel"
                    }
                }
            }
            if (sm.messageType === 3 && sm.imageMetadata) {
                return {
                    view_model: {
                        primitive: { 
                            media: { url: sm.imageMetadata.imageUrl?.imageHighResUrl || sm.imageMetadata.imageUrl?.imagePreviewUrl, mime_type: 'image/png' }, 
                            imagine_type: 'IMAGE',
                            status: { status: 'READY' },
                            __typename: "GenAIImaginePrimitive" 
                        },
                        __typename: "GenAISingleLayoutViewModel"
                    }
                }
            }
            return null
        }).filter(Boolean)

        if (sections.length > 0) {
            unifiedResponse = {
                data: Buffer.from(JSON.stringify({
                    response_id: crypto.randomUUID(),
                    sections
                })).toString("base64")
            }
        }
    }

    return {
        message: buildBotForwardedMessage(submessages, ctxInfo, unifiedResponse),
        messageId: generateMessageID()
    }
}

/**
 * Render LaTeX to PNG image using online codecogs API.
 * @param {string} latexExpr
 */
async function renderLatexToPng(latexExpr) {
    const encoded = encodeURIComponent(latexExpr);
    const url = `https://latex.codecogs.com/png.image?%5Cdpi%7B1200%7D%5Cbg%7Bwhite%7D${encoded}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`[renderLatexToPng] HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    return { buffer, width: 1200, height: 600 };
}

/**
 * Helper to upload an unencrypted buffer to WhatsApp CDN.
 * @param {Buffer} buffer
 * @param {Function} waUploadToServer
 */
async function uploadUnencryptedToWA(buffer, waUploadToServer) {
    const crypto = require('crypto');
    const fs = require('fs');
    const path = require('path');
    const os = require('os');
    const sha256B64 = crypto.createHash('sha256').update(buffer).digest('base64');
    const tmpPath = path.join(os.tmpdir(), `wa_upload_${Date.now()}.png`);
    await fs.promises.writeFile(tmpPath, buffer);
    try {
        const result = await waUploadToServer(tmpPath, {
            mediaType: 'image',
            fileEncSha256B64: sha256B64,
            newsletter: true
        });
        return {
            url: result.mediaUrl || (result.directPath ? getUrlFromDirectPath(result.directPath) : undefined),
            directPath: result.directPath
        };
    } finally {
        try { await fs.promises.unlink(tmpPath); } catch (_) { }
    }
}

// ── Exports ───────────────────────────────────────────────────────────────────
module.exports = {
    JS_KEYWORDS,
    PYTHON_KEYWORDS,
    LANGUAGE_KEYWORDS,
    CodeHighlightType,
    RichSubMessageType,
    tokenizeCode,
    buildRichContextInfo,
    buildBotForwardedMessage,
    generateTableContent,
    generateListContent,
    generateCodeBlockContent,
    generateLatexContent,
    generateLatexImageContent,
    generateLatexInlineImageContent,
    generateMarkdownContent,
    captureUnifiedResponse,
    generateUnifiedResponseContent,
    generateRichMessageContent,
    renderLatexToPng,
    uploadUnencryptedToWA
}
