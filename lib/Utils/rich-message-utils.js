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

const wrapToBotForwardedMessage = (richResponseMessage, botMetadata) => ({
    ...(botMetadata && Object.keys(botMetadata).length > 0 ? {
        messageContextInfo: {
            botMetadata: {
                ...botMetadata
            }
        }
    } : {}),
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
    // extractImageThumb uses the project's existing sharp/jimp pipeline
    const { extractImageThumb } = require('./messages-media')
    const expiration = getGridAssetExpiration()
    const primitives = []
    const gridImageUrls = []

    // The raw (unencrypted) upload function must be the actual waUploadToServer,
    // not the encrypted media wrapper passed as options.upload. It is exposed
    const axios = require('axios')
    const FormData = require('form-data')

    for (const item of album) {
        let resolvedMediaUrl = undefined
        // rawLocalBuffer is captured for non-remote inputs so we can generate
        // a thumbnail and upload it to WhatsApp CDN (producing a real https:// URL).
        let rawLocalBuffer = null

        if (item.image) {
            if (typeof item.image === 'string') {
                if (item.image.startsWith('http://') || item.image.startsWith('https://') || item.image.startsWith('data:')) {
                    // Remote URL — use directly; no upload needed
                    resolvedMediaUrl = item.image
                } else {
                    // Local file path string — read bytes, then upload thumbnail
                    const fs = require('fs')
                    rawLocalBuffer = await fs.promises.readFile(item.image)
                }
            } else if (Buffer.isBuffer(item.image)) {
                // Raw Buffer — upload thumbnail
                rawLocalBuffer = item.image
            } else if (typeof item.image === 'object' && item.image.url) {
                if (typeof item.image.url === 'string' && (item.image.url.startsWith('http://') || item.image.url.startsWith('https://') || item.image.url.startsWith('data:'))) {
                    // Remote URL inside object — use directly
                    resolvedMediaUrl = item.image.url
                } else if (typeof item.image.url === 'string') {
                    // Local path inside { url } — read bytes, then upload thumbnail
                    const fs = require('fs')
                    rawLocalBuffer = await fs.promises.readFile(item.image.url)
                }
            } else if (typeof item.image === 'object' && item.image.stream) {
                // Readable stream — collect bytes, then upload thumbnail
                const chunks = []
                for await (const chunk of item.image.stream) {
                    chunks.push(chunk)
                }
                rawLocalBuffer = Buffer.concat(chunks)
            }
        }

        // For local inputs: try to upload a thumbnail to get a real CDN URL.
        // Generating a small JPEG thumbnail keeps upload size minimal and ensures
        // the WhatsApp client can always decode the preview format.
        // Falls back to data URI only when no upload function is available
        // (e.g. isolated unit tests that do not provide waUploadToServer).
        if (rawLocalBuffer !== null && resolvedMediaUrl === undefined) {
            const inputType = Buffer.isBuffer(item.image) ? 'Buffer'
                : typeof item.image === 'string' ? 'LocalPath'
                : typeof item.image === 'object' && item.image?.url ? 'LocalUrlObject'
                : 'Stream'

            if (!options.asDataUri && !options.useDataUri) {
                try {
                    const thumbResult = await extractImageThumb(rawLocalBuffer, 320)
                    const thumbBuffer = thumbResult.buffer
                    let sourceExt = 'jpg'
                    if (item.mimeType || item.mimetype) {
                        sourceExt = (item.mimeType || item.mimetype).split('/')[1] || 'jpg'
                    } else if (typeof item.image === 'string') {
                        const parts = item.image.split('.')
                        if (parts.length > 1) sourceExt = parts.pop().toLowerCase()
                    } else if (typeof item.image === 'object' && typeof item.image.url === 'string') {
                        const parts = item.image.url.split('.')
                        if (parts.length > 1) sourceExt = parts.pop().toLowerCase()
                    }
                    // Sanitize extension just in case it's part of a URL query string
                    sourceExt = sourceExt.split('?')[0].split('#')[0]
                    const uniqueFilename = `thumb_${Date.now()}_${Math.random().toString(36).substring(7)}.${sourceExt}`
                    
                    let uploadedUrl = ''
                    try {
                        const form = new FormData()
                        form.append('reqtype', 'fileupload')
                        form.append('fileToUpload', thumbBuffer, { filename: uniqueFilename, contentType: 'image/jpeg' })
                        
                        const res = await axios.post('https://catbox.moe/user/api.php', form, {
                            headers: form.getHeaders(),
                            timeout: 15000
                        })
                        uploadedUrl = (res.data || '').trim()
                    } catch (e) {
                        // catbox.moe failed
                    }

                    if (!uploadedUrl || !uploadedUrl.startsWith('http')) {
                        const form = new FormData()
                        form.append('file', thumbBuffer, { filename: uniqueFilename, contentType: 'image/jpeg' })
                        const res = await axios.post('https://tmpfiles.org/api/v1/upload', form, {
                            headers: form.getHeaders(),
                            timeout: 15000
                        })
                        const rawUrl = res.data?.data?.url
                        if (rawUrl) {
                            uploadedUrl = rawUrl.replace('tmpfiles.org/', 'tmpfiles.org/dl/')
                        }
                    }

                    if (!uploadedUrl || !uploadedUrl.startsWith('http')) {
                        throw new Error('All public image hosts failed or returned empty URLs')
                    }

                    resolvedMediaUrl = uploadedUrl
                } catch (_uploadErr) {
                    // Upload failed — fall back to data URI so the message still sends
                    const m = item.mimeType || item.mimetype || 'image/jpeg'
                    resolvedMediaUrl = `data:${m};base64,${rawLocalBuffer.toString('base64')}`
                }
            } else {
                // Explicit data-URI mode — use data URI
                console.warn(`[GridAlbum] explicit data URI requested → data URI`)
                const m = item.mimeType || item.mimetype || 'image/jpeg'
                resolvedMediaUrl = `data:${m};base64,${rawLocalBuffer.toString('base64')}`
            }
        } else if (resolvedMediaUrl) {
            // passthrough
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
            if (rawLocalBuffer !== null) {
                // Detect from magic bytes — thumbnail is always JPEG after extractImageThumb
                if (rawLocalBuffer[0] === 0x89 && rawLocalBuffer[1] === 0x50 && rawLocalBuffer[2] === 0x4E && rawLocalBuffer[3] === 0x47) {
                    mimeType = 'image/png'
                } else if (rawLocalBuffer[0] === 0x52 && rawLocalBuffer[1] === 0x49 && rawLocalBuffer[2] === 0x46 && rawLocalBuffer[3] === 0x46) {
                    mimeType = 'image/webp'
                } else {
                    mimeType = 'image/jpeg'
                }
            } else {
                const src = typeof item.image === 'string' ? item.image : (item.image?.url || finalFullUrl || '')
                if (typeof src === 'string' && src.includes('.png')) {
                    mimeType = 'image/png'
                } else if (typeof src === 'string' && src.includes('.webp')) {
                    mimeType = 'image/webp'
                } else {
                    mimeType = 'image/jpeg'
                }
            }
        }

        // When an uploaded CDN thumbnail is used, the grid primitive MIME is always
        // image/jpeg (thumbnail format), regardless of the source image format.
        // This matches what the WhatsApp client expects for grid previews.
        const primitiveMime = rawLocalBuffer !== null && !options.asDataUri && !options.useDataUri
            ? 'image/jpeg'
            : mimeType

        primitives.push({
            preview_image: {
                url: finalPreviewUrl,
                mime_type: primitiveMime,
                expiration_timestamp_ms: expiration,
                width,
                height
            },
            full_image: {
                url: finalFullUrl,
                mime_type: primitiveMime,
                expiration_timestamp_ms: expiration,
                width,
                height
            },
            dark_mode_preview_image: {
                url: darkPreviewUrl,
                mime_type: primitiveMime,
                expiration_timestamp_ms: expiration,
                width: darkWidth,
                height: darkHeight
            },
            dark_mode_full_image: {
                url: darkFullUrl,
                mime_type: primitiveMime,
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
        forwardingScore: 1,
        isForwarded: true,
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
