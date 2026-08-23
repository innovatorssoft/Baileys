"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerApplicationToMessage = exports.decodeConsumerApplication = void 0;

const WAProto_1 = require("../../WAProto");

const decodeConsumerApplication = (buffer) => {
    if (!Buffer.isBuffer(buffer) && !(buffer instanceof Uint8Array)) {
        throw new TypeError('decodeConsumerApplication: buffer must be Buffer or Uint8Array');
    }
    const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    if (WAProto_1.proto.ConsumerApplication) {
        return WAProto_1.proto.ConsumerApplication.decode(buf);
    }
    return { buffer: buf };
};
exports.decodeConsumerApplication = decodeConsumerApplication;

const textOf = (mt) => (mt && typeof mt.text === 'string' ? mt.text : undefined);

const mapContent = (content) => {
    if (!content) return null;
    switch (content.content) {
        case 'messageText':
            return { conversation: textOf(content.messageText) ?? '' };
        case 'extendedTextMessage': {
            const e = content.extendedTextMessage;
            return {
                extendedTextMessage: {
                    text: textOf(e?.text),
                    matchedText: e?.matchedText,
                    canonicalUrl: e?.canonicalUrl,
                    description: e?.description,
                    title: e?.title
                }
            };
        }
        case 'imageMessage':
            return {
                imageMessage: {
                    url: content.imageMessage?.image?.url,
                    mimetype: content.imageMessage?.image?.mimetype || 'image/jpeg',
                    fileSha256: content.imageMessage?.image?.fileSha256,
                    fileLength: content.imageMessage?.image?.fileLength,
                    caption: textOf(content.imageMessage?.caption),
                    ...(typeof content.imageMessage?.image === 'object' ? content.imageMessage.image : {})
                }
            };
        case 'videoMessage':
            return {
                videoMessage: {
                    url: content.videoMessage?.video?.url,
                    mimetype: content.videoMessage?.video?.mimetype || 'video/mp4',
                    fileSha256: content.videoMessage?.video?.fileSha256,
                    fileLength: content.videoMessage?.video?.fileLength,
                    caption: textOf(content.videoMessage?.caption),
                    ...(typeof content.videoMessage?.video === 'object' ? content.videoMessage.video : {})
                }
            };
        case 'audioMessage':
            return {
                audioMessage: {
                    url: content.audioMessage?.audio?.url,
                    mimetype: content.audioMessage?.audio?.mimetype || 'audio/ogg; codecs=opus',
                    fileSha256: content.audioMessage?.audio?.fileSha256,
                    fileLength: content.audioMessage?.audio?.fileLength,
                    ptt: content.audioMessage?.ptt,
                    ...(typeof content.audioMessage?.audio === 'object' ? content.audioMessage.audio : {})
                }
            };
        case 'documentMessage':
            return {
                documentMessage: {
                    url: content.documentMessage?.document?.url,
                    mimetype: content.documentMessage?.document?.mimetype || 'application/octet-stream',
                    fileSha256: content.documentMessage?.document?.fileSha256,
                    fileLength: content.documentMessage?.document?.fileLength,
                    fileName: content.documentMessage?.fileName,
                    ...(typeof content.documentMessage?.document === 'object' ? content.documentMessage.document : {})
                }
            };
        case 'stickerMessage':
            return {
                stickerMessage: {
                    url: content.stickerMessage?.sticker?.url,
                    mimetype: content.stickerMessage?.sticker?.mimetype || 'image/webp',
                    fileSha256: content.stickerMessage?.sticker?.fileSha256,
                    fileLength: content.stickerMessage?.sticker?.fileLength,
                    ...(typeof content.stickerMessage?.sticker === 'object' ? content.stickerMessage.sticker : {})
                }
            };
        case 'contactMessage':
            return {
                contactMessage: {
                    displayName: content.contactMessage?.contact?.displayName,
                    vcard: content.contactMessage?.contact?.vcard,
                    ...(typeof content.contactMessage?.contact === 'object' ? content.contactMessage.contact : {})
                }
            };
        case 'contactsArrayMessage':
            return {
                contactsArrayMessage: {
                    displayName: content.contactsArrayMessage?.displayName,
                    contacts: content.contactsArrayMessage?.contacts || []
                }
            };
        case 'locationMessage': {
            const loc = content.locationMessage?.location || {};
            return {
                locationMessage: {
                    degreesLatitude: loc.degreesLatitude,
                    degreesLongitude: loc.degreesLongitude,
                    name: loc.name
                }
            };
        }
        case 'liveLocationMessage': {
            const loc = content.liveLocationMessage?.location || {};
            return {
                liveLocationMessage: {
                    degreesLatitude: loc.degreesLatitude,
                    degreesLongitude: loc.degreesLongitude,
                    caption: textOf(content.liveLocationMessage?.caption)
                }
            };
        }
        case 'reactionMessage':
            return { reactionMessage: content.reactionMessage };
        default:
            return null;
    }
};

const consumerApplicationToMessage = (app) => {
    const payload = app?.payload;
    if (!payload) return null;
    switch (payload.payload) {
        case 'content':
            return mapContent(payload.content);
        case 'applicationData': {
            const ad = payload.applicationData;
            if (ad?.applicationContent === 'revoke' && ad.revoke?.key) {
                return {
                    protocolMessage: {
                        key: ad.revoke.key,
                        type: WAProto_1.proto.Message?.ProtocolMessage?.Type?.REVOKE ?? 0
                    }
                };
            }
            return null;
        }
        default:
            return null;
    }
};
exports.consumerApplicationToMessage = consumerApplicationToMessage;
