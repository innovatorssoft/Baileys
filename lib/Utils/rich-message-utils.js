"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

const crypto = require("crypto")
const Defaults = require("../Defaults")
const constants = require("../WABinary/constants")
const RichType = require("../Types/RichType")
const WAProto = require("../../WAProto")
const generics = require("./generics")

const DONATE_URL = ""
const NOOP = new Set([])

const tokenizeCode = (code, language = 'javascript') => {
    const keywords = constants.LANGUAGE_KEYWORDS[language] || NOOP
    const blocks = []
    Defaults.LEXER_REGEX.lastIndex = 0
    let match
    while ((match = Defaults.LEXER_REGEX.exec(code)) !== null) {
        if (match[1]) {
            blocks.push({ highlightType: RichType.CodeHighlightType.COMMENT, codeContent: match[1] })
        }
        else if (match[2]) {
            blocks.push({ highlightType: RichType.CodeHighlightType.STRING, codeContent: match[2] })
        }
        else if (match[3]) {
            blocks.push({
                highlightType: keywords.has(match[3]) ? RichType.CodeHighlightType.KEYWORD : RichType.CodeHighlightType.METHOD,
                codeContent: match[3],
            })
        }
        else if (match[4]) {
            blocks.push({
                highlightType: keywords.has(match[4]) ? RichType.CodeHighlightType.KEYWORD : RichType.CodeHighlightType.DEFAULT,
                codeContent: match[4],
            })
        }
        else if (match[5]) {
            blocks.push({ highlightType: RichType.CodeHighlightType.NUMBER, codeContent: match[5] })
        }
        else {
            blocks.push({ highlightType: RichType.CodeHighlightType.DEFAULT, codeContent: match[6] })
        }
    }
    return blocks
}

const toUnified = (submessages, uuid) => ({
    response_id: uuid || crypto.randomUUID(),
    sections: submessages.map((submessage) => {
        switch (submessage.messageType) {
            case RichType.RichSubMessageType.CODE:
                const codeMetadata = submessage.codeMetadata
                return {
                    view_model: {
                        primitive: {
                            language: codeMetadata.codeLanguage,
                            code_blocks: codeMetadata.codeBlocks.map((block) => ({
                                content: block.codeContent,
                                type: RichType.CodeHighlightType[block.highlightType] || 'DEFAULT'
                            })),
                            __typename: 'GenAICodeUXPrimitive'
                        },
                        __typename: 'GenAISingleLayoutViewModel'
                    }
                }
            case RichType.RichSubMessageType.CONTENT_ITEMS:
                return {}
            case RichType.RichSubMessageType.INLINE_IMAGE:
                return {}
            case RichType.RichSubMessageType.LATEX:
                return {}
            case RichType.RichSubMessageType.TABLE:
                const tableMetadata = submessage.tableMetadata
                return {
                    view_model: {
                        primitive: {
                            title: tableMetadata.title,
                            rows: tableMetadata.rows.map((row) => ({
                                is_header: row.isHeading,
                                cells: row.items,
                                markdown_cells: row.items.map((item) => ({ text: item }))
                            })),
                            __typename: 'GenATableUXPrimitive'
                        },
                        __typename: 'GenAISingleLayoutViewModel'
                    }
                }
            case RichType.RichSubMessageType.TEXT:
                return {
                    view_model: {
                        primitive: {
                            text: submessage.messageText,
                            inline_entities: submessage.inlineEntities || [],
                            __typename: 'GenAIMarkdownTextUXPrimitive'
                        },
                        __typename: 'GenAISingleLayoutViewModel'
                    }
                }
        }
        return submessage
    })
})

const prepareRichResponseMessage = (content) => {
    const {
        alignment, code, contentText, disclaimerText, footerText, headerText, imageText,
        inlineImage, inlineVideo, items, language, latex, links, noHeading, posts,
        products, suggested, richResponse, table, tapLinkUrl, title
    } = content
    let submessages = []
    if (Array.isArray(richResponse)) {
        submessages = richResponse.map((submessage) => {
            if (submessage.text) {
                return {
                    messageType: RichType.RichSubMessageType.TEXT,
                    messageText: submessage.text,
                    inlineEntities: submessage.inlineEntities
                }
            }
            else if (submessage.code) {
                return {
                    messageType: RichType.RichSubMessageType.CODE,
                    codeMetadata: {
                        codeLanguage: submessage.language,
                        codeBlocks: submessage.code
                    }
                }
            }
            else if (submessage.items) {
                return {
                    messageType: RichType.RichSubMessageType.CONTENT_ITEMS,
                    contentItemsMetadata: {
                        itemsMetadata: submessage.items,
                        contentType: WAProto.proto.AIRichResponseContentItemsMetadata.ContentType.CAROUSEL
                    }
                }
            }
            else if (submessage.inlineImage) {
                return {
                    messageType: RichType.RichSubMessageType.INLINE_IMAGE,
                    imageMetadata: {
                        imageUrl: submessage.inlineImage,
                        imageText: submessage.imageText,
                        alignment: submessage.alignment,
                        tapLinkUrl: submessage.tapLinkUrl
                    }
                }
            }
            else if (submessage.inlineVideo) {
                return {
                    messageType: RichType.RichSubMessageType.TEXT,
                    messageText: 'INLINE_VIDEO'
                }
            }
            else if (submessage.latex) {
                return {
                    messageType: RichType.RichSubMessageType.LATEX,
                    latexMetadata: {
                        text: submessage.text,
                        expressions: submessage.latex
                    }
                }
            }
            else if (submessage.posts) {
                return {
                    messageType: RichType.RichSubMessageType.TEXT,
                    messageText: 'POSTS'
                }
            }
            else if (submessage.products) {
                return {
                    messageType: RichType.RichSubMessageType.TEXT,
                    messageText: 'PRODUCTS'
                }
            }
            else if (submessage.suggested) {
                return {
                    messageType: RichType.RichSubMessageType.TEXT,
                    messageText: 'SUGGESTED_PROMPT'
                }
            }
            else if (submessage.table) {
                return {
                    messageType: RichType.RichSubMessageType.TABLE,
                    tableMetadata: {
                        title: submessage.title,
                        rows: submessage.table
                    }
                }
            }
            return submessage
        })
    }
    else {
        if (headerText) {
            submessages.push({
                messageType: RichType.RichSubMessageType.TEXT,
                messageText: headerText
            })
        }
        if (contentText) {
            submessages.push({
                messageType: RichType.RichSubMessageType.TEXT,
                messageText: contentText
            })
        }
        if (code) {
            const lang = language || 'javascript'
            submessages.push({
                messageType: RichType.RichSubMessageType.CODE,
                codeMetadata: {
                    codeLanguage: lang,
                    codeBlocks: tokenizeCode(code, lang)
                }
            })
        }
        if (items) {
            submessages.push({
                messageType: RichType.RichSubMessageType.CONTENT_ITEMS,
                contentItemsMetadata: {
                    itemsMetadata: items,
                    contentType: WAProto.proto.AIRichResponseContentItemsMetadata.ContentType.CAROUSEL
                }
            })
        }
        if (inlineImage) {
            submessages.push({
                messageType: RichType.RichSubMessageType.INLINE_IMAGE,
                imageMetadata: {
                    imageUrl: inlineImage,
                    imageText,
                    alignment,
                    tapLinkUrl
                }
            })
        }
        if (inlineVideo) {
            submessages.push({
                messageType: RichType.RichSubMessageType.TEXT,
                messageText: 'INLINE_VIDEO'
            })
        }
        if (latex) {
            submessages.push({
                messageType: RichType.RichSubMessageType.LATEX,
                latexMetadata: {
                    text: content.text,
                    expressions: latex
                }
            })
        }
        if (links) {
            links.forEach((linkField, index) => {
                const prefix = 'SS_' + index
                const url = linkField.url || DONATE_URL
                const sources = linkField.sources?.map((sourceField) => ({
                    source_type: 'THIRD_PARTY',
                    source_display_name: sourceField.displayName || 'Donate',
                    source_subtitle: sourceField.subtitle || '',
                    source_url: sourceField.url || url
                }))
                submessages.push({
                    messageType: RichType.RichSubMessageType.TEXT,
                    messageText: linkField.text + ` {{${prefix}}}¹{{/${prefix}}} `,
                    inlineEntities: [{
                        key: prefix,
                        metadata: {
                            reference_id: index + 1,
                            reference_url: url,
                            reference_title: linkField.title || 'Citation Reference',
                            reference_display_name: linkField.displayName || 'Reference',
                            sources: sources || [],
                            __typename: 'GenAISearchCitationItem'
                        }
                    }]
                })
            })
        }
        if (posts) {
            submessages.push({
                messageType: RichType.RichSubMessageType.TEXT,
                messageText: 'POSTS'
            })
        }
        if (products) {
            submessages.push({
                messageType: RichType.RichSubMessageType.TEXT,
                messageText: 'PRODUCTS'
            })
        }
        if (suggested) {
            submessages.push({
                messageType: RichType.RichSubMessageType.TEXT,
                messageText: 'SUGGESTED_PROMPT'
            })
        }
        if (table) {
            submessages.push({
                messageType: RichType.RichSubMessageType.TABLE,
                tableMetadata: {
                    title,
                    rows: table.map((rowItems, index) => ({
                        isHeading: !noHeading && index == 0,
                        items: rowItems
                    }))
                }
            })
        }
        if (footerText) {
            submessages.push({
                messageType: RichType.RichSubMessageType.TEXT,
                messageText: footerText
            })
        }
    }
    const uuid = crypto.randomUUID()
    const unified = toUnified(submessages, uuid)
    const richResponseMessage = WAProto.proto.AIRichResponseMessage.create({
        submessages,
        messageType: WAProto.proto.AIRichResponseMessageType.AI_RICH_RESPONSE_TYPE_STANDARD,
        unifiedResponse: {
            data: Buffer.from(JSON.stringify(unified))
        },
        contextInfo: {
            isForwarded: true,
            forwardingScore: 1,
            forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
            forwardOrigin: 4
        }
    })
    const wrappedMsg = wrapToBotForwardedMessage(richResponseMessage)
    const botMetadata = wrappedMsg.messageContextInfo.botMetadata
    if (disclaimerText) {
        botMetadata.messageDisclaimerText = disclaimerText
    }
    botMetadata.botResponseId = uuid
    return wrappedMsg
}

const botMetadataSignature = () => {
    const signature = new Uint8Array(64)
    crypto.randomFillSync(signature)
    return signature
}

const botMetadataCertificate = (length = 685) => {
    const certificate = new Uint8Array(length)
    certificate[0] = 48
    certificate[1] = 130
    crypto.randomFillSync(certificate.subarray(2))
    return certificate
}

const wrapToBotForwardedMessage = (richResponseMessage) => ({
    messageContextInfo: {
        botMetadata: {
            verificationMetadata: {
                proofs: [
                    {
                        certificateChain: [
                            botMetadataCertificate(),
                            botMetadataCertificate(892)
                        ],
                        version: 1,
                        useCase: 1,
                        signature: botMetadataSignature()
                    }
                ]
            }
        }
    },
    botForwardedMessage: {
        message: { richResponseMessage }
    }
})

const buildAdditionalBotMetadataContext = (content) => {
    const additionalBotMetadataContext = {}
    if (content.richResponseSourcesMetadata) {
        additionalBotMetadataContext.richResponseSourcesMetadata = content.richResponseSourcesMetadata
    }
    if (content.unifiedResponseMutation?.mediaDetailsMetadataList) {
        additionalBotMetadataContext.unifiedResponseMutation = {
            mediaDetailsMetadataList: content.unifiedResponseMutation.mediaDetailsMetadataList
        }
    }
    return Object.keys(additionalBotMetadataContext).length > 0 ? additionalBotMetadataContext : undefined
}

module.exports = {
    tokenizeCode,
    toUnified,
    prepareRichResponseMessage,
    botMetadataSignature,
    botMetadataCertificate,
    wrapToBotForwardedMessage,
    buildAdditionalBotMetadataContext
}

