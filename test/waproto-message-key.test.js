const { proto } = require('../WAProto')

describe('WebMessageInfo key', () => {
    const key = {
        remoteJid: '201016610000@s.whatsapp.net',
        fromMe: true,
        id: 'SUKIE90CB7A9B161060A'
    }

    test('should round trip the chat message key', () => {
        const encoded = proto.WebMessageInfo.encode({ key }).finish()
        const decoded = proto.WebMessageInfo.decode(encoded)

        expect(decoded.key.remoteJid).toBe(key.remoteJid)
        expect(decoded.key.fromMe).toBe(key.fromMe)
        expect(decoded.key.id).toBe(key.id)
    })

    test('should use Protocol.MessageKey and not the signal storage one', () => {
        const message = proto.WebMessageInfo.fromObject({
            key: { ...key, participant: '201016610001@s.whatsapp.net', cipherKey: 'AAAA' }
        })

        expect(message.key.participant).toBe('201016610001@s.whatsapp.net')
        expect(message.key.cipherKey).toBeUndefined()
    })

    test('should round trip reactionMessage.key with participant', () => {
        const reactionKey = {
            remoteJid: '120363000000000000@g.us',
            fromMe: false,
            id: '3EB0ABCDEF',
            participant: '1@lid'
        }
        const encoded = proto.Message.encode({
            reactionMessage: {
                key: reactionKey,
                text: '👍'
            }
        }).finish()
        const decoded = proto.Message.decode(encoded)

        expect(decoded.reactionMessage.key.remoteJid).toBe(reactionKey.remoteJid)
        expect(decoded.reactionMessage.key.fromMe).toBe(reactionKey.fromMe)
        expect(decoded.reactionMessage.key.id).toBe(reactionKey.id)
        expect(decoded.reactionMessage.key.participant).toBe(reactionKey.participant)
    })
})
