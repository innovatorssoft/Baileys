"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

const boom_1 = require("@hapi/boom")
const WAProto_1 = require("../../WAProto")
const WABinary_1 = require("../WABinary")
const generics_1 = require("./generics")
const messages_1 = require("./messages") 

const NO_MESSAGE_FOUND_ERROR_TEXT = 'Message absent from node'

const MISSING_KEYS_ERROR_TEXT = 'Key used already or never filled'

// Retry configuration for failed decryption
const DECRYPTION_RETRY_CONFIG = {
    maxRetries: 3,
    baseDelayMs: 100,
    sessionRecordErrors: ['No session record', 'SessionError: No session record']
}

const NACK_REASONS = {
    ParsingError: 487,
    UnrecognizedStanza: 488,
    UnrecognizedStanzaClass: 489,
    UnrecognizedStanzaType: 490,
    InvalidProtobuf: 491,
    InvalidHostedCompanionStanza: 493,
    MissingMessageSecret: 495,
    SignalErrorOldCounter: 496,
    MessageDeletedOnPeer: 499,
    UnhandledError: 500,
    UnsupportedAdminRevoke: 550,
    UnsupportedLIDGroup: 551,
    DBOperationFailed: 552
}

const extractAddressingContext = (stanza) => {
    let senderAlt
    let recipientAlt
    
    const sender = stanza.attrs.participant || stanza.attrs.from
    const addressingMode = stanza.attrs.addressing_mode || (sender?.endsWith('lid') ? 'lid' : 'pn')
    
    if (WABinary_1.isLidUser(sender)) {
        // Message is LID-addressed: sender is LID, extract corresponding PN
        // without device data
        senderAlt = stanza.attrs.participant_pn || stanza.attrs.sender_pn || stanza.attrs.peer_recipient_pn
        recipientAlt = stanza.attrs.recipient_pn
        // with device data
        if (sender && senderAlt)
            senderAlt = WABinary_1.transferDevice(sender, senderAlt)
    }
    
    else if (WABinary_1.isJidUser(sender)) { 
        // Message is PN-addressed: sender is PN, extract corresponding LID
        // without device data
        senderAlt = stanza.attrs.participant_lid || stanza.attrs.sender_lid || stanza.attrs.peer_recipient_lid
        recipientAlt = stanza.attrs.recipient_lid
        //with device data
        if (sender && senderAlt)
            senderAlt = WABinary_1.transferDevice(sender, senderAlt)
    }
    return {
        addressingMode,
        senderAlt,
        recipientAlt
    }
}

const getDecryptionJid = async (sender, repository) => {
    if (!sender || !sender.includes('@s.whatsapp.net')) {
        return sender
    }
    try {
        const lid = await repository.lidMapping.getLIDForPN(sender)
        return lid || sender
    } catch (_) {
        return sender
    }
}

const storeMappingFromEnvelope = async (stanza, sender, decryptionJid, repository, logger) => {
    const { senderAlt } = extractAddressingContext(stanza)
    
    if (senderAlt && WABinary_1.isLidUser(senderAlt) && WABinary_1.isJidUser(sender)) {
        try {
            await repository.lidMapping.storeLIDPNMappings([{ lid: senderAlt, pn: sender }])
            logger.debug({ sender, senderAlt }, 'Stored LID mapping from envelope')
        }
        catch (error) {
            logger.warn({ sender, senderAlt, error }, 'Failed to store LID mapping')
        }
    } else if (senderAlt && WABinary_1.isJidUser(senderAlt) && WABinary_1.isLidUser(sender)) {
        try {
            await repository.lidMapping.storeLIDPNMappings([{ lid: sender, pn: senderAlt }])
            logger.debug({ sender, senderAlt }, 'Stored reverse LID-PN mapping from envelope')
        }
        catch (error) {
            logger.warn({ sender, senderAlt, error }, 'Failed to store reverse LID-PN mapping')
        }
    }
}

/**
 * Decode the received node as a message.
 * @note this will only parse the message, not decrypt it
 */
function decodeMessageNode(stanza, meId, meLid) {
    let msgType
    let chatId
    let author
    let fromMe = false
    const msgId = stanza.attrs.id
    const from = stanza.attrs.from
    const participant = stanza.attrs.participant
    const recipient = stanza.attrs.recipient
    const addressingContext = extractAddressingContext(stanza) 
    const isMe = (jid) => WABinary_1.areJidsSameUser(jid, meId)
    const isMeLid = (jid) => WABinary_1.areJidsSameUser(jid, meLid)
    if (WABinary_1.isJidUser(from) || WABinary_1.isLidUser(from)) {
        if (recipient && !WABinary_1.isJidMetaAI(recipient)) {
            if (!isMe(from) && !isMeLid(from)) {
                throw new boom_1.Boom('receipient present, but msg not from me', { data: stanza })
            }
            if (isMe(from) || isMeLid(from)) {
                fromMe = true
            }
            chatId = recipient
        }
        else {
            chatId = from
        }
        msgType = 'chat'
        author = from
    }
    else if (WABinary_1.isJidGroup(from)) {
        if (!participant) {
            throw new boom_1.Boom('No participant in group message')
        }
        if (isMe(participant) || isMeLid(participant)) {
            fromMe = true;
        }
        msgType = 'group'
        author = participant
        chatId = from
    }
    else if (WABinary_1.isJidBroadcast(from)) {
        if (!participant) {
            throw new boom_1.Boom('No participant in group message')
        }
        const isParticipantMe = isMe(participant)
        if (WABinary_1.isJidStatusBroadcast(from)) {
            msgType = isParticipantMe ? 'direct_peer_status' : 'other_status'
        }
        else {
            msgType = isParticipantMe ? 'peer_broadcast' : 'other_broadcast'
        }
        fromMe = isParticipantMe
        chatId = from
        author = participant
    }
    else if (WABinary_1.isJidNewsletter(from)) {
        msgType = 'newsletter'
        chatId = from
        author = from
        if (isMe(from) || isMeLid(from)) {
            fromMe = true;
        }
    }
    else {
        throw new boom_1.Boom('Unknown message type', { data: stanza })
    }
    
    const pushname = stanza?.attrs?.notify
    const key = {
        remoteJid: chatId,
        remoteJidAlt: !WABinary_1.isJidGroup(chatId) ? addressingContext.senderAlt : undefined,
        fromMe,
        id: msgId,
        participant,
        participantAlt: WABinary_1.isJidGroup(chatId) ? addressingContext.senderAlt : undefined,
    }
    const fullMessage = {
        key,
        messageTimestamp: +stanza.attrs.t,
        pushName: pushname,
        broadcast: WABinary_1.isJidBroadcast(from), 
        newsletter: WABinary_1.isJidNewsletter(from) 
    }
    if (msgType === 'newsletter') {
        fullMessage.newsletter_server_id  = +stanza.attrs?.server_id
    }
    if (key.fromMe) {
        fullMessage.status = WAProto_1.proto.WebMessageInfo.Status.SERVER_ACK
    }
    if (!key.fromMe) {
        fullMessage.platform = messages_1.getDevice(key.id) 
    }
    return {
        fullMessage,
        author,
        sender: msgType === 'chat' ? author : chatId
    }
}

const decryptMessageNode = (stanza, meId, meLid, repository, logger) => {
    const { fullMessage, author, sender } = decodeMessageNode(stanza, meId, meLid)
    return {
        fullMessage,
        category: stanza.attrs.category,
        author,
        async decrypt() {
            let decryptables = 0
            if (Array.isArray(stanza.content)) {
                for (const { tag, attrs, content } of stanza.content) {
                    if (tag === 'verified_name' && content instanceof Uint8Array) {
                        const cert = WAProto_1.proto.VerifiedNameCertificate.decode(content)
                        const details = WAProto_1.proto.VerifiedNameCertificate.Details.decode(cert.details)
                        fullMessage.verifiedBizName = details.verifiedName
                    }
                    if (tag === 'unavailable' && attrs.type === 'view_once') {
                        fullMessage.key.isViewOnce = true; // TODO: remove from here and add a STUB TYPE
                    }
                    if (tag !== 'enc' && tag !== 'plaintext') {
                        continue
                    }
                    if (!(content instanceof Uint8Array)) {
                        continue
                    }
                    decryptables += 1
                    let msgBuffer
                    const user = WABinary_1.isJidUser(sender) ? sender : author // TODO: flaky logic
                    if (tag !== 'plaintext') {
                        await storeMappingFromEnvelope(stanza, user, user, repository, logger)
                    }
                    const decryptionJid = (await getDecryptionJid(user, repository)) || user
                    try {
                        const e2eType = tag === 'plaintext' ? 'plaintext' : attrs.type
                        switch (e2eType) {
                            case 'skmsg':
                                msgBuffer = await repository.decryptGroupMessage({
                                    group: sender,
                                    authorJid: author,
                                    msg: content
                                })
                                break
                            case 'pkmsg':
                            case 'msg':
                                msgBuffer = await repository.decryptMessage({
                                    jid: decryptionJid,
                                    type: e2eType,
                                    ciphertext: content
                                })
                                break
                            case 'plaintext':
                                msgBuffer = content
                                break
                            default:
                                throw new Error(`Unknown e2e type: ${e2eType}`)
                        }
                        let msg = WAProto_1.proto.Message.decode(e2eType !== 'plaintext' ? generics_1.unpadRandomMax16(msgBuffer) : msgBuffer)
                        msg = msg.deviceSentMessage?.message || msg
                        if (msg.senderKeyDistributionMessage) {
                            //eslint-disable-next-line max-depth
                            try {
                                await repository.processSenderKeyDistributionMessage({
                                    authorJid: author,
                                    item: msg.senderKeyDistributionMessage
                                })
                            }
                            catch (err) {
                                logger.error({
                                    key: fullMessage.key,
                                    err,
                                    operation: 'processSenderKeyDistributionMessage',
                                    messageType: e2eType,
                                    sender,
                                    author,
                                    errorName: err?.name || 'Error',
                                    errorMessage: err?.message || String(err),
                                    stack: err?.stack || null
                                }, 'failed to process sender key distribution message')
                            }
                        }
                        if (fullMessage.message) {
                            Object.assign(fullMessage.message, msg)
                        }
                        else {
                            fullMessage.message = msg
                        }
                    }
                    catch (err) {
                        const e2eType = tag === 'plaintext' ? 'plaintext' : attrs.type
                        const errorContext = {
                            key: fullMessage.key,
                            err,
                            operation: e2eType === 'skmsg' ? 'decryptGroupMessage' : 'decryptMessage',
                            messageType: e2eType,
                            sender,
                            author,
                            decryptionJid,
                            errorName: err?.name || 'Error',
                            errorMessage: err?.message || String(err),
                            stack: err?.stack || null,
                            isSessionRecordError: isSessionRecordError(err)
                        }
                        logger.error(errorContext, 'failed to process sender key distribution message')
                        fullMessage.messageStubType = WAProto_1.proto.WebMessageInfo.StubType.CIPHERTEXT
                        fullMessage.messageStubParameters = [err.message.toString()]
                    }
                }
            }
            
            // if nothing was found to decrypt
            if (!decryptables) {
                fullMessage.messageStubType = WAProto_1.proto.WebMessageInfo.StubType.CIPHERTEXT
                fullMessage.messageStubParameters = [NO_MESSAGE_FOUND_ERROR_TEXT]
            }
        }
    }
}

/**
 * Utility function to check if an error is related to missing session record
 */
function isSessionRecordError(error) {
    const errorMessage = error?.message || error?.toString() || ''
    return DECRYPTION_RETRY_CONFIG.sessionRecordErrors.some(errorPattern => errorMessage.includes(errorPattern))
}

module.exports = {
  NACK_REASONS, 
  decodeMessageNode, 
  decryptMessageNode, 
  extractAddressingContext, 
  MISSING_KEYS_ERROR_TEXT, 
  DECRYPTION_RETRY_CONFIG, 
  NO_MESSAGE_FOUND_ERROR_TEXT
}