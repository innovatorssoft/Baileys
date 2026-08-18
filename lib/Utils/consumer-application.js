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
                imageMessage: { mediaPayload: content.imageMessage?.image, caption: textOf(content.imageMessage?.caption) }
            };
        case 'videoMessage':
            return {
                videoMessage: { mediaPayload: content.videoMessage?.video, caption: textOf(content.videoMessage?.caption) }
            };
        case 'audioMessage':
            return { audioMessage: { mediaPayload: content.audioMessage?.audio, ptt: content.audioMessage?.ptt } };
        case 'documentMessage':
            return {
                documentMessage: { mediaPayload: content.documentMessage?.document, fileName: content.documentMessage?.fileName }
            };
        case 'stickerMessage':
            return { stickerMessage: { mediaPayload: content.stickerMessage?.sticker } };
        case 'contactMessage':
            return { contactMessage: { mediaPayload: content.contactMessage?.contact } };
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
