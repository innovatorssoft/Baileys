"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

const crypto = require("crypto")
const Defaults = require("../Defaults")
const constants = require("../WABinary/constants")
const RichType = require("../Types/RichType")
const WAProto = require("../../WAProto")
const generics = require("./generics")
const { Boom } = require("@hapi/boom")

const DEFAULT_GRID_IMAGE_WIDTH = 600
const DEFAULT_GRID_IMAGE_HEIGHT = 400
const DEFAULT_GRID_ASSET_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000

const getGridAssetExpiration = (ttlMs = DEFAULT_GRID_ASSET_EXPIRATION_MS) => Date.now() + ttlMs

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
            case RichType.RichSubMessageType.GRID_IMAGE:
                const gridMetadata = submessage.gridImageMetadata
                const exp = getGridAssetExpiration()
                const gridPrimitives = (gridMetadata?.imageUrls || []).map(imgUrl => {
                    const preview = imgUrl.imagePreviewUrl || imgUrl.sourceUrl || ''
                    const full = imgUrl.imageHighResUrl || imgUrl.imagePreviewUrl || imgUrl.sourceUrl || ''
                    return {
                        preview_image: {
                            url: preview,
                            mime_type: 'image/jpeg',
                            expiration_timestamp_ms: exp,
                            width: DEFAULT_GRID_IMAGE_WIDTH,
                            height: DEFAULT_GRID_IMAGE_HEIGHT
                        },
                        full_image: {
                            url: full,
                            mime_type: 'image/jpeg',
                            expiration_timestamp_ms: exp,
                            width: DEFAULT_GRID_IMAGE_WIDTH,
                            height: DEFAULT_GRID_IMAGE_HEIGHT
                        },
                        dark_mode_preview_image: {
                            url: preview,
                            mime_type: 'image/jpeg',
                            expiration_timestamp_ms: exp,
                            width: DEFAULT_GRID_IMAGE_WIDTH,
                            height: DEFAULT_GRID_IMAGE_HEIGHT
                        },
                        dark_mode_full_image: {
                            url: full,
                            mime_type: 'image/jpeg',
                            expiration_timestamp_ms: exp,
                            width: DEFAULT_GRID_IMAGE_WIDTH,
                            height: DEFAULT_GRID_IMAGE_HEIGHT
                        },
                        asset_query_status: 'FETCHED',
                        __typename: 'GenAIImagePrimitive'
                    }
                })
                return {
                    view_model: {
                        primitives: gridPrimitives,
                        __typename: 'GenAIGridLayoutViewModel'
                    }
                }
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
        messageType: WAProto.proto.AICommonDeprecated?.AIRichResponseMessageType?.AI_RICH_RESPONSE_TYPE_STANDARD || 1,
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

const wrapToBotForwardedMessage = (richResponseMessage, botMetadata = {}) => ({
    messageContextInfo: {
        botMetadata: {
            ...botMetadata
        }
    },
    botForwardedMessage: {
        message: { richResponseMessage }
    }
})

const prepareGridImageMessageContent = async (jid, album, options = {}) => {
    if (!Array.isArray(album) || album.length === 0) {
        throw new Boom('Grid image messages require at least one image.', { statusCode: 400 })
    }

    for (const item of album) {
        if (!item || typeof item !== 'object') {
            throw new Boom('Grid image mode requires a valid image source for each album item.', { statusCode: 400 })
        }
        if ('video' in item || item.video) {
            throw new Boom('Grid image mode currently supports image media only; video items are not supported.', { statusCode: 400 })
        }
    }

    const { uploadUnencryptedToWA } = require('./message-composer')
    const expiration = getGridAssetExpiration()
    const primitives = []
    const gridImageUrls = []

    for (const item of album) {
        let resolvedMediaUrl = undefined

        if (item.image) {
            if (typeof item.image === 'string') {
                if (item.image.startsWith('http://') || item.image.startsWith('https://')) {
                    resolvedMediaUrl = item.image
                } else {
                    const fs = require('fs')
                    const buf = await fs.promises.readFile(item.image)
                    const uploadFn = options.upload || options.suki?.waUploadToServer || options.waUploadToServer
                    if (!uploadFn) {
                        throw new Boom('Media upload function not provided for local image file in grid mode', { statusCode: 400 })
                    }
                    const up = await uploadUnencryptedToWA(buf, uploadFn)
                    resolvedMediaUrl = up.url || up.directPath
                }
            } else if (Buffer.isBuffer(item.image)) {
                const uploadFn = options.upload || options.suki?.waUploadToServer || options.waUploadToServer
                if (!uploadFn) {
                    throw new Boom('Media upload function not provided for image Buffer in grid mode', { statusCode: 400 })
                }
                const up = await uploadUnencryptedToWA(item.image, uploadFn)
                resolvedMediaUrl = up.url || up.directPath
            } else if (typeof item.image === 'object' && item.image.url) {
                if (typeof item.image.url === 'string' && (item.image.url.startsWith('http://') || item.image.url.startsWith('https://'))) {
                    resolvedMediaUrl = item.image.url
                } else if (typeof item.image.url === 'string') {
                    const fs = require('fs')
                    const buf = await fs.promises.readFile(item.image.url)
                    const uploadFn = options.upload || options.suki?.waUploadToServer || options.waUploadToServer
                    if (!uploadFn) {
                        throw new Boom('Media upload function not provided for local image file in grid mode', { statusCode: 400 })
                    }
                    const up = await uploadUnencryptedToWA(buf, uploadFn)
                    resolvedMediaUrl = up.url || up.directPath
                }
            } else if (typeof item.image === 'object' && item.image.stream) {
                const chunks = []
                for await (const chunk of item.image.stream) {
                    chunks.push(chunk)
                }
                const buf = Buffer.concat(chunks)
                const uploadFn = options.upload || options.suki?.waUploadToServer || options.waUploadToServer
                if (!uploadFn) {
                    throw new Boom('Media upload function not provided for image stream in grid mode', { statusCode: 400 })
                }
                const up = await uploadUnencryptedToWA(buf, uploadFn)
                resolvedMediaUrl = up.url || up.directPath
            }
        }

        const previewUrl = item.imagePreviewUrl || item.sourceUrl || resolvedMediaUrl
        const fullUrl = item.imageHighResUrl || item.imagePreviewUrl || item.sourceUrl || resolvedMediaUrl

        if (!previewUrl && !fullUrl) {
            throw new Boom('Grid image mode requires a valid image source for each album item.', { statusCode: 400 })
        }

        const finalPreviewUrl = previewUrl || fullUrl
        const finalFullUrl = fullUrl || previewUrl

        const darkPreviewUrl = item.darkModePreviewUrl || finalPreviewUrl
        const darkFullUrl = item.darkModeHighResUrl || item.darkModePreviewUrl || finalFullUrl

        const width = Number(item.width) || DEFAULT_GRID_IMAGE_WIDTH
        const height = Number(item.height) || DEFAULT_GRID_IMAGE_HEIGHT
        const darkWidth = Number(item.darkWidth) || width
        const darkHeight = Number(item.darkHeight) || height

        let mimeType = item.mimeType || item.mimetype
        if (!mimeType) {
            const src = typeof item.image === 'string' ? item.image : (item.image?.url || finalFullUrl || '')
            if (src.includes('.png')) {
                mimeType = 'image/png'
            } else if (src.includes('.webp')) {
                mimeType = 'image/webp'
            } else {
                mimeType = 'image/jpeg'
            }
        }

        primitives.push({
            preview_image: {
                url: finalPreviewUrl,
                mime_type: mimeType,
                expiration_timestamp_ms: expiration,
                width,
                height
            },
            full_image: {
                url: finalFullUrl,
                mime_type: mimeType,
                expiration_timestamp_ms: expiration,
                width,
                height
            },
            dark_mode_preview_image: {
                url: darkPreviewUrl,
                mime_type: mimeType,
                expiration_timestamp_ms: expiration,
                width: darkWidth,
                height: darkHeight
            },
            dark_mode_full_image: {
                url: darkFullUrl,
                mime_type: mimeType,
                expiration_timestamp_ms: expiration,
                width: darkWidth,
                height: darkHeight
            },
            asset_query_status: 'FETCHED',
            __typename: 'GenAIImagePrimitive'
        })

        gridImageUrls.push({
            imagePreviewUrl: finalPreviewUrl,
            imageHighResUrl: finalFullUrl,
            sourceUrl: item.sourceUrl || finalFullUrl
        })
    }

    let captionText = options.caption || options.text || ''
    if (!captionText && Array.isArray(album)) {
        const itemCaptions = album
            .map(item => (typeof item?.caption === 'string' ? item.caption.trim() : ''))
            .filter(Boolean)

        if (itemCaptions.length > 0) {
            const uniqueCaptions = [...new Set(itemCaptions)]
            captionText = uniqueCaptions.join('\n')
        }
    }

    const uuid = crypto.randomUUID()
    const sections = []

    if (captionText) {
        sections.push({
            view_model: {
                primitive: {
                    text: captionText,
                    __typename: 'GenAIMarkdownTextUXPrimitive'
                },
                __typename: 'GenAISingleLayoutViewModel'
            }
        })
    }

    sections.push({
        view_model: {
            primitives,
            __typename: 'GenAIGridLayoutViewModel'
        }
    })

    const unified = {
        response_id: uuid,
        sections
    }

    const submessages = []

    if (captionText) {
        submessages.push({
            messageType: RichType.RichSubMessageType.TEXT,
            messageText: captionText
        })
    }

    submessages.push({
        messageType: RichType.RichSubMessageType.GRID_IMAGE,
        gridImageMetadata: {
            gridImageUrl: gridImageUrls[0] || null,
            imageUrls: gridImageUrls
        }
    })

    const quoted = options.quoted
    const richContextInfo = {
        isForwarded: true,
        forwardingScore: 1,
        forwardedAiBotMessageInfo: { botJid: options.botJid || '867051314767696@bot' },
        forwardOrigin: 4,
        ...(options.mentions ? { mentionedJid: options.mentions } : {}),
        ...(options.contextInfo || {})
    }

    if (quoted?.key) {
        richContextInfo.stanzaId = quoted.key.id
        richContextInfo.participant = quoted.key.participant || quoted.sender || quoted.key.remoteJid
        richContextInfo.quotedMessage = quoted.message
    }

    const richResponseMessage = WAProto.proto.AIRichResponseMessage.create({
        submessages,
        messageType: WAProto.proto.AICommonDeprecated?.AIRichResponseMessageType?.AI_RICH_RESPONSE_TYPE_STANDARD || 1,
        unifiedResponse: {
            data: Buffer.from(JSON.stringify(unified))
        },
        contextInfo: richContextInfo
    })

    const wrappedMsg = wrapToBotForwardedMessage(richResponseMessage, {
        botResponseId: uuid
    })
    return wrappedMsg
}

module.exports = {
    DEFAULT_GRID_IMAGE_WIDTH,
    DEFAULT_GRID_IMAGE_HEIGHT,
    DEFAULT_GRID_ASSET_EXPIRATION_MS,
    getGridAssetExpiration,
    prepareGridImageMessageContent,
    tokenizeCode,
    toUnified,
    prepareRichResponseMessage,
    botMetadataSignature,
    botMetadataCertificate,
    wrapToBotForwardedMessage
}
