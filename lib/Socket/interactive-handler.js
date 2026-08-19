"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Baron = exports.Zenbo = void 0;

const crypto_1 = require("crypto");
const WAProto_1 = require("../../WAProto");
const Utils_1 = require("../Utils");
const link_preview_1 = require("../Utils/link-preview");
const WABinary_1 = require("../WABinary");

class Zenbo {
    constructor(waUploadToServer, relayMessageFn, config, sock) {
        if (waUploadToServer && typeof waUploadToServer === 'object' && waUploadToServer.relayMessage) {
            const socket = waUploadToServer;
            this.waUploadToServer = socket.waUploadToServer ? socket.waUploadToServer.bind(socket) : undefined;
            this.relayMessage = socket.relayMessage ? socket.relayMessage.bind(socket) : undefined;
            this.config = socket.config || {};
            this.sock = socket;
        } else {
            this.waUploadToServer = waUploadToServer && sock ? waUploadToServer.bind(sock) : waUploadToServer;
            this.relayMessage = relayMessageFn && sock ? relayMessageFn.bind(sock) : relayMessageFn;
            this.config = config || sock?.config || {};
            this.sock = sock;
        }
    }

    detectType(content) {
        if (content.requestPaymentMessage) return 'PAYMENT';
        if (content.productMessage) return 'PRODUCT';
        if (content.interactiveButtons) return 'INTERACTIVE_BUTTONS';
        if (content.interactiveMessage) return 'INTERACTIVE';
        if (content.albumMessage || content.album) return 'ALBUM';
        if (content.eventMessage) return 'EVENT';
        if (content.pollResultMessage) return 'POLL_RESULT';
        if (content.groupStatusMessage) return 'GROUP_STORY';
        return null;
    }

    async handlePayment(content, quoted) {
        const data = content.requestPaymentMessage;
        let notes = {};
        if (data.sticker?.stickerMessage) {
            notes = {
                stickerMessage: {
                    ...data.sticker.stickerMessage,
                    contextInfo: {
                        stanzaId: quoted?.key?.id,
                        participant: quoted?.key?.participant || content.sender,
                        quotedMessage: quoted?.message
                    }
                }
            };
        }
        else if (data.note) {
            notes = {
                extendedTextMessage: {
                    text: data.note,
                    contextInfo: {
                        stanzaId: quoted?.key?.id,
                        participant: quoted?.key?.participant || content.sender,
                        quotedMessage: quoted?.message
                    }
                }
            };
        }
        return {
            requestPaymentMessage: WAProto_1.proto.Message.RequestPaymentMessage.fromObject({
                expiryTimestamp: data.expiry || 0,
                amount1000: data.amount || 0,
                currencyCodeIso4217: data.currency || 'IDR',
                requestFrom: data.from || '0@s.whatsapp.net',
                noteMessage: notes,
                background: data.background ?? {
                    id: 'DEFAULT',
                    placeholderArgb: 0xfff0f0f0
                }
            })
        };
    }

    async handleProduct(content, _jid, _quoted) {
        const {
            title,
            description,
            thumbnail,
            productId,
            retailerId,
            url,
            body = '',
            footer = '',
            buttons = [],
            priceAmount1000 = null,
            currencyCode = 'IDR'
        } = content.productMessage;
        let productImage;
        if (Buffer.isBuffer(thumbnail)) {
            const { imageMessage } = await (0, Utils_1.generateWAMessageContent)({ image: thumbnail }, { upload: this.waUploadToServer });
            productImage = imageMessage;
        }
        else if (typeof thumbnail === 'object' && thumbnail.url) {
            const { imageMessage } = await (0, Utils_1.generateWAMessageContent)(
                { image: { url: thumbnail.url } },
                { upload: this.waUploadToServer }
            );
            productImage = imageMessage;
        }
        return {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { text: body },
                        footer: { text: footer },
                        header: {
                            title,
                            hasMediaAttachment: true,
                            productMessage: {
                                product: {
                                    productImage,
                                    productId,
                                    title,
                                    description,
                                    currencyCode,
                                    priceAmount1000,
                                    retailerId,
                                    url,
                                    productImageCount: 1
                                },
                                businessOwnerJid: '0@s.whatsapp.net'
                            }
                        },
                        nativeFlowMessage: { buttons }
                    }
                }
            }
        };
    }

    async handleInteractive(content, _jid, _quoted) {
        const {
            title,
            footer,
            thumbnail,
            image,
            video,
            document,
            mimetype,
            fileName,
            jpegThumbnail,
            contextInfo,
            externalAdReply,
            buttons = [],
            nativeFlowMessage,
            header
        } = content.interactiveMessage;
        let media = null;
        let _mediaType = null;
        if (thumbnail) {
            media = await (0, Utils_1.prepareWAMessageMedia)({ image: { url: thumbnail } }, { upload: this.waUploadToServer });
            _mediaType = 'image';
        }
        else if (image) {
            const src = typeof image === 'object' && image.url ? { image: { url: image.url } } : { image };
            media = await (0, Utils_1.prepareWAMessageMedia)(src, { upload: this.waUploadToServer });
            _mediaType = 'image';
        }
        else if (video) {
            const src = typeof video === 'object' && video.url ? { video: { url: video.url } } : { video };
            media = await (0, Utils_1.prepareWAMessageMedia)(src, { upload: this.waUploadToServer });
            _mediaType = 'video';
        }
        else if (document) {
            const docPayload = { document };
            if (jpegThumbnail) {
                docPayload.jpegThumbnail =
                    typeof jpegThumbnail === 'object' && jpegThumbnail.url ? { url: jpegThumbnail.url } : jpegThumbnail;
            }
            media = await (0, Utils_1.prepareWAMessageMedia)(docPayload, { upload: this.waUploadToServer });
            if (fileName && media?.documentMessage) media.documentMessage.fileName = fileName;
            if (mimetype && media?.documentMessage) media.documentMessage.mimetype = mimetype;
            _mediaType = 'document';
        }
        const interactiveMessage = {
            body: { text: title || '' },
            footer: { text: footer || '' }
        };
        if (buttons && buttons.length > 0) {
            interactiveMessage.nativeFlowMessage = { buttons };
            if (nativeFlowMessage) {
                interactiveMessage.nativeFlowMessage = {
                    ...interactiveMessage.nativeFlowMessage,
                    ...nativeFlowMessage
                };
            }
        }
        else if (nativeFlowMessage) {
            interactiveMessage.nativeFlowMessage = nativeFlowMessage;
        }
        if (media) {
            interactiveMessage.header = {
                title: header || '',
                hasMediaAttachment: true,
                ...media
            };
        }
        else {
            interactiveMessage.header = {
                title: header || '',
                hasMediaAttachment: false
            };
        }
        const finalContextInfo = {};
        if (contextInfo) {
            Object.assign(finalContextInfo, {
                mentionedJid: contextInfo.mentionedJid || [],
                forwardingScore: contextInfo.forwardingScore || 0,
                isForwarded: contextInfo.isForwarded || false,
                ...contextInfo
            });
        }
        if (externalAdReply) {
            finalContextInfo.externalAdReply = {
                title: externalAdReply.title || '',
                body: externalAdReply.body || '',
                mediaType: externalAdReply.mediaType || 1,
                thumbnailUrl: externalAdReply.thumbnailUrl || '',
                mediaUrl: externalAdReply.mediaUrl || '',
                sourceUrl: externalAdReply.sourceUrl || '',
                showAdAttribution: externalAdReply.showAdAttribution || false,
                renderLargerThumbnail: externalAdReply.renderLargerThumbnail || false,
                ...externalAdReply
            };
        }
        if (Object.keys(finalContextInfo).length > 0) {
            interactiveMessage.contextInfo = finalContextInfo;
        }
        return { interactiveMessage };
    }

    async handleInteractiveButtons(content, _jid, _quoted) {
        const {
            text,
            caption,
            title,
            subtitle,
            footer,
            interactiveButtons,
            hasMediaAttachment,
            image,
            video,
            document,
            mimetype,
            jpegThumbnail,
            location,
            product,
            businessOwnerJid
        } = content;
        const bodyText = text || caption || '';
        const buttons = interactiveButtons.map((btn) => ({
            name: btn.name,
            buttonParamsJson:
                typeof btn.buttonParamsJson === 'string' ? btn.buttonParamsJson : JSON.stringify(btn.buttonParamsJson)
        }));
        let headerContent = {};
        let mediaAttached = typeof hasMediaAttachment === 'boolean' ? hasMediaAttachment : false;
        if (image) {
            const src = typeof image === 'object' && image.url ? { image: { url: image.url } } : { image };
            const uploaded = await (0, Utils_1.prepareWAMessageMedia)(src, { upload: this.waUploadToServer });
            headerContent = { ...uploaded };
            mediaAttached = typeof hasMediaAttachment === 'boolean' ? hasMediaAttachment : true;
        }
        else if (video) {
            const src = typeof video === 'object' && video.url ? { video: { url: video.url } } : { video };
            const uploaded = await (0, Utils_1.prepareWAMessageMedia)(src, { upload: this.waUploadToServer });
            headerContent = { ...uploaded };
            mediaAttached = typeof hasMediaAttachment === 'boolean' ? hasMediaAttachment : true;
        }
        else if (document) {
            const docPayload =
                typeof document === 'object' && document.url ? { document: { url: document.url } } : { document };
            if (mimetype) docPayload.mimetype = mimetype;
            const uploaded = await (0, Utils_1.prepareWAMessageMedia)(docPayload, { upload: this.waUploadToServer });
            if (jpegThumbnail && uploaded?.documentMessage) {
                uploaded.documentMessage.jpegThumbnail =
                    typeof jpegThumbnail === 'string' ? Buffer.from(jpegThumbnail, 'base64') : jpegThumbnail;
            }
            headerContent = { ...uploaded };
            mediaAttached = typeof hasMediaAttachment === 'boolean' ? hasMediaAttachment : true;
        }
        else if (location) {
            headerContent = {
                locationMessage: {
                    degreesLatitude: location.degressLatitude || location.degreesLatitude || 0,
                    degreesLongitude: location.degressLongitude || location.degreesLongitude || 0,
                    name: location.name || ''
                }
            };
            mediaAttached = typeof hasMediaAttachment === 'boolean' ? hasMediaAttachment : true;
        }
        else if (product) {
            let productImage;
            if (product.productImage) {
                const imgSrc =
                    typeof product.productImage === 'object' && product.productImage.url
                        ? { image: { url: product.productImage.url } }
                        : { image: product.productImage };
                const uploaded = await (0, Utils_1.prepareWAMessageMedia)(imgSrc, { upload: this.waUploadToServer });
                productImage = uploaded.imageMessage;
            }
            headerContent = {
                productMessage: {
                    product: {
                        productImage,
                        productId: product.productId,
                        title: product.title,
                        description: product.description,
                        currencyCode: product.currencyCode || 'IDR',
                        priceAmount1000: product.priceAmount1000,
                        retailerId: product.retailerId,
                        url: product.url,
                        productImageCount: product.productImageCount || 1
                    },
                    businessOwnerJid: businessOwnerJid || '0@s.whatsapp.net'
                }
            };
            mediaAttached = typeof hasMediaAttachment === 'boolean' ? hasMediaAttachment : true;
        }
        const interactiveMessage = {
            body: { text: bodyText },
            footer: { text: footer || '' },
            header: {
                title: title || '',
                subtitle: subtitle || '',
                hasMediaAttachment: mediaAttached,
                ...headerContent
            },
            nativeFlowMessage: { buttons }
        };
        return {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2,
                        messageSecret: (0, crypto_1.randomBytes)(32)
                    },
                    interactiveMessage
                }
            }
        };
    }

    async handleAlbum(content, jid, _quoted) {
        const array = content.albumMessage || content.album;
        const ctxInfo = content.contextInfo || {};
        const album = await (0, Utils_1.generateWAMessageFromContent)(
            jid,
            {
                messageContextInfo: {
                    messageSecret: (0, crypto_1.randomBytes)(32)
                },
                albumMessage: {
                    expectedImageCount: array.filter((a) => 'image' in a).length,
                    expectedVideoCount: array.filter((a) => 'video' in a).length
                }
            },
            { userJid: (0, WABinary_1.jidNormalizedUser)(this.sock?.authState?.creds?.me?.id || '') }
        );
        await this.relayMessage(jid, album.message, {
            messageId: album.key.id
        });
        for (let item of array) {
            if (ctxInfo && Object.keys(ctxInfo).length > 0 && !item.contextInfo) {
                item = { ...item, contextInfo: ctxInfo };
            }
            const img = await (0, Utils_1.generateWAMessage)(jid, item, {
                upload: this.waUploadToServer,
                userJid: (0, WABinary_1.jidNormalizedUser)(this.sock?.authState?.creds?.me?.id || '')
            });
            if (img.message) {
                img.message.messageContextInfo = {
                    messageSecret: (0, crypto_1.randomBytes)(32),
                    messageAssociation: {
                        associationType: 1,
                        parentMessageKey: album.key
                    }
                };
                await this.relayMessage(jid, img.message, {
                    messageId: img.key.id
                });
            }
        }
        return album;
    }

    async handleEvent(content, jid, quoted) {
        const eventData = content.eventMessage;
        const msg = await (0, Utils_1.generateWAMessageFromContent)(
            jid,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2,
                            messageSecret: (0, crypto_1.randomBytes)(32)
                        },
                        eventMessage: {
                            isCanceled: eventData.isCanceled || false,
                            name: eventData.name,
                            description: eventData.description,
                            location: eventData.location || {
                                degreesLatitude: 0,
                                degreesLongitude: 0,
                                name: 'Location'
                            },
                            joinLink: eventData.joinLink || '',
                            startTime:
                                typeof eventData.startTime === 'string'
                                    ? parseInt(eventData.startTime, 10)
                                    : eventData.startTime || Math.floor(Date.now() / 1000),
                            endTime:
                                typeof eventData.endTime === 'string'
                                    ? parseInt(eventData.endTime, 10)
                                    : eventData.endTime || (Math.floor(Date.now() / 1000) + 3600),
                            extraGuestsAllowed: eventData.extraGuestsAllowed !== false
                        }
                    }
                }
            },
            { quoted, userJid: (0, WABinary_1.jidNormalizedUser)(this.sock?.authState?.creds?.me?.id || '') }
        );
        await this.relayMessage(jid, msg.message, {
            messageId: msg.key.id
        });
        return msg;
    }

    async handlePollResult(content, jid, quoted) {
        const pollData = content.pollResultMessage;
        const msg = await (0, Utils_1.generateWAMessageFromContent)(
            jid,
            {
                pollResultSnapshotMessage: {
                    name: pollData.name,
Construct with a default: pollVotes: (pollData.pollVotes || []).map((vote) => ({ optionName: vote.optionName, optionVoteCount: typeof vote.optionVoteCount === 'number' ? vote.optionVoteCount.toString() : vote.optionVoteCount }))
                }
            },
            { quoted, userJid: (0, WABinary_1.jidNormalizedUser)(this.sock?.authState?.creds?.me?.id || '') }
        );
        await this.relayMessage(jid, msg.message, {
            messageId: msg.key.id
        });
        return msg;
    }

    async handleGroupStory(content, jid, _quoted) {
        const storyData = content.groupStatusMessage;
        let waMsgContent;
        if (storyData.message) {
            waMsgContent = storyData;
        }
        else {
            waMsgContent = await (0, Utils_1.generateWAMessageContent)(storyData, {
                upload: this.waUploadToServer
            });
        }
        const msg = {
            message: {
                groupStatusMessageV2: {
                    message: waMsgContent.message || waMsgContent
                }
            }
        };
        return await this.relayMessage(jid, msg.message, {
            messageId: (0, Utils_1.generateMessageID)()
        });
    }

    async sendStatusWhatsApp(content, jids = []) {
        const userJid = (0, WABinary_1.jidNormalizedUser)(this.sock?.authState?.creds?.me?.id || '');
        const allUsers = new Set();
        allUsers.add(userJid);
        for (const id of jids) {
            if ((0, WABinary_1.isJidGroup)(id)) {
                try {
                    const metadata = await this.sock.groupMetadata(id);
                    metadata.participants.forEach((p) => allUsers.add((0, WABinary_1.jidNormalizedUser)(p.id)));
                }
                catch (error) {
                    this.config?.logger?.error?.(`Error getting metadata for group ${id}: ${error}`);
                }
            }
            else if ((0, WABinary_1.isPnUser)(id)) {
                allUsers.add((0, WABinary_1.jidNormalizedUser)(id));
            }
        }
        const uniqueUsers = Array.from(allUsers);
        const getRandomHexColor = () =>
            '#' +
            Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, '0');
        const isMedia = content.image || content.video || content.audio;
        const isAudio = !!content.audio;
        const messageContent = { ...content };
        if (isMedia && !isAudio) {
            if (messageContent.text) {
                messageContent.caption = messageContent.text;
                delete messageContent.text;
            }
            delete messageContent.ptt;
            delete messageContent.font;
            delete messageContent.backgroundColor;
            delete messageContent.textColor;
        }
        if (isAudio) {
            delete messageContent.text;
            delete messageContent.caption;
            delete messageContent.font;
            delete messageContent.textColor;
        }
        const font = !isMedia ? content.font || Math.floor(Math.random() * 9) : undefined;
        const textColor = !isMedia ? content.textColor || getRandomHexColor() : undefined;
        const backgroundColor = !isMedia || isAudio ? content.backgroundColor || getRandomHexColor() : undefined;
        const ptt = isAudio ? (typeof content.ptt === 'boolean' ? content.ptt : true) : undefined;
        const msg = await (0, Utils_1.generateWAMessage)(WABinary_1.STORIES_JID, messageContent, {
            logger: this.config?.logger,
            userJid,
            getUrlInfo: (text) =>
                (0, link_preview_1.getUrlInfo)(text, {
                    thumbnailWidth: this.config?.linkPreviewImageThumbnailWidth,
                    fetchOpts: { timeout: 3000, ...(this.config?.options || {}) },
                    logger: this.config?.logger,
                    uploadImage: this.config?.generateHighQualityLinkPreview ? this.waUploadToServer : undefined
                }),
            upload: this.waUploadToServer,
            mediaCache: this.config?.mediaCache,
            options: this.config?.options,
            font,
            textColor,
            backgroundColor,
            ptt
        });
        await this.relayMessage(WABinary_1.STORIES_JID, msg.message, {
            messageId: msg.key.id,
            statusJidList: uniqueUsers,
            additionalNodes: [
                {
                    tag: 'meta',
                    attrs: {},
                    content: [
                        {
                            tag: 'mentioned_users',
                            attrs: {},
                            content: jids.map((jid) => ({
                                tag: 'to',
                                attrs: { jid: (0, WABinary_1.jidNormalizedUser)(jid) }
                            }))
                        }
                    ]
                }
            ]
        });
        for (const id of jids) {
            try {
                const normalizedId = (0, WABinary_1.jidNormalizedUser)(id);
                const isPrivate = (0, WABinary_1.isPnUser)(normalizedId);
                const type = isPrivate ? 'statusMentionMessage' : 'groupStatusMentionMessage';
                const protocolMessage = {
                    [type]: {
                        message: {
                            protocolMessage: {
                                key: msg.key,
                                type: 25
                            }
                        }
                    },
                    messageContextInfo: {
                        messageSecret: (0, crypto_1.randomBytes)(32)
                    }
                };
                const statusMsg = await (0, Utils_1.generateWAMessageFromContent)(normalizedId, protocolMessage, {
                    userJid: (0, WABinary_1.jidNormalizedUser)(this.sock?.authState?.creds?.me?.id || '')
                });
                await this.relayMessage(normalizedId, statusMsg.message, {
                    additionalNodes: [
                        {
                            tag: 'meta',
                            attrs: isPrivate ? { is_status_mention: 'true' } : { is_group_status_mention: 'true' }
                        }
                    ]
                });
                await (0, Utils_1.delay)(2000);
            }
            catch (error) {
                this.config?.logger?.error?.(`Error sending to ${id}: ${error}`);
            }
        }
        return msg;
    }
}
exports.Zenbo = Zenbo;
/** @deprecated Use Zenbo instead */
exports.Baron = Zenbo;
