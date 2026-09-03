const { generateWAMessageContent, generateWAMessage } = require('../lib/Utils/messages')

const testLogger = {
    trace: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    child: jest.fn(() => testLogger)
}

describe('generateWAMessageContent Buttons Parsing', () => {
    test('should parse mixed native flow and response buttons correctly', async () => {
        const message = {
            text: 'Buttons message test',
            buttons: [
                {
                    text: '👋🏻 Rating',
                    id: '#Rating'
                },
                {
                    text: '📋 Select',
                    sections: [
                        {
                            title: '✨ Section 1',
                            rows: [
                                {
                                    header: '',
                                    title: '💭 Secret Ingredient',
                                    description: '',
                                    id: '#SecretIngredient'
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        const options = { logger: testLogger }

        const result = await generateWAMessageContent(message, options)

        expect(result).toBeDefined()
        expect(result.buttonsMessage).toBeDefined()
        expect(result.buttonsMessage.buttons).toHaveLength(2)

        // Verify button 1 (Response button)
        const btn1 = result.buttonsMessage.buttons[0]
        expect(btn1.buttonId).toBe('#Rating')
        expect(btn1.buttonText.displayText).toBe('👋🏻 Rating')
        expect(btn1.type).toBe(1) // RESPONSE

        // Verify button 2 (Native Flow button with sections)
        const btn2 = result.buttonsMessage.buttons[1]
        expect(btn2.type).toBe(2) // NATIVE_FLOW
        expect(btn2.nativeFlowInfo).toBeDefined()
        expect(btn2.nativeFlowInfo.name).toBe('single_select')
        
        const params = JSON.parse(btn2.nativeFlowInfo.paramsJson)
        expect(params.title).toBe('📋 Select')
        expect(params.sections).toBeDefined()
        expect(params.sections).toHaveLength(1)
        expect(params.sections[0].title).toBe('✨ Section 1')
        expect(params.sections[0].rows[0].id).toBe('#SecretIngredient')
    })
})

describe('generateWAMessageContent Raw Mode', () => {
    test('should serialize raw extendedTextMessage payload', async () => {
        const message = {
            raw: true,
            extendedTextMessage: {
                text: 'Raw payload',
                contextInfo: {
                    externalAdReply: {
                        title: '@itsliaaa/baileys',
                        sourceApp: 'whatsapp',
                        showAdAttribution: true,
                        mediaType: 1
                    }
                }
            }
        }

        const result = await generateWAMessageContent(message, { logger: testLogger })

        expect(result.extendedTextMessage).toBeDefined()
        expect(result.extendedTextMessage.text).toBe('Raw payload')
        expect(result.extendedTextMessage.contextInfo.externalAdReply.title).toBe('@itsliaaa/baileys')
    })

    test('should preserve raw contextInfo and still attach quoted metadata', async () => {
        const jid = '1234567890@s.whatsapp.net'
        const quoted = {
            key: {
                remoteJid: jid,
                fromMe: false,
                id: 'quoted-message-id',
                participant: '1111111111@s.whatsapp.net'
            },
            message: {
                conversation: 'quoted text'
            }
        }

        const result = await generateWAMessage(jid, {
            raw: true,
            extendedTextMessage: {
                text: 'Raw with quote',
                contextInfo: {
                    externalAdReply: {
                        title: '@itsliaaa/baileys',
                        sourceApp: 'whatsapp',
                        showAdAttribution: true,
                        mediaType: 1
                    }
                }
            }
        }, {
            userJid: '9999999999@s.whatsapp.net',
            quoted,
            logger: testLogger
        })

        const contextInfo = result.message.extendedTextMessage.contextInfo
        expect(contextInfo.externalAdReply.title).toBe('@itsliaaa/baileys')
        expect(contextInfo.stanzaId).toBe('quoted-message-id')
        expect(contextInfo.participant).toBe('1111111111@s.whatsapp.net')
        expect(contextInfo.quotedMessage).toBeDefined()
    })

    test('should reject mixed helper and raw payload fields', async () => {
        await expect(generateWAMessageContent({
            raw: true,
            text: 'hello',
            extendedTextMessage: {
                text: 'Raw payload'
            }
        }, { logger: testLogger }))
            .rejects
            .toThrow('Raw mode does not support helper fields: text')
    })

    test('should reject invalid raw top-level keys', async () => {
        await expect(generateWAMessageContent({
            raw: true,
            notAProtoField: {
                value: 'x'
            }
        }, { logger: testLogger }))
            .rejects
            .toThrow('Raw mode payload contains unsupported top-level keys: notAProtoField')
    })

    test('should reject raw payload keys inherited from proto functions', async () => {
        await expect(generateWAMessageContent({
            raw: true,
            toJSON: {
                value: 'x'
            }
        }, { logger: testLogger }))
            .rejects
            .toThrow('Raw mode payload contains unsupported top-level keys: toJSON')
    })

    test('should allow raw proto keys that overlap helper names', async () => {
        const result = await generateWAMessageContent({
            raw: true,
            call: {
                callKey: 'abc'
            }
        }, { logger: testLogger })

        expect(result.call).toBeDefined()
    })
})

describe('Interactive Carousel Biz Node', () => {
    const { shouldIncludeBizBinaryNode } = require('../lib/Utils/messages')
    const { getBizBinaryNode } = require('../lib/WABinary/generic-utils')

    test('shouldIncludeBizBinaryNode returns true for interactive carouselMessage', () => {
        const message = {
            interactiveMessage: {
                carouselMessage: {
                    cards: [
                        {
                            nativeFlowMessage: {
                                buttons: [{ name: 'quick_reply' }]
                            }
                        }
                    ]
                }
            }
        }
        expect(shouldIncludeBizBinaryNode(message)).toBe(true)
    })

    test('getBizBinaryNode returns biz binary node for carouselMessage', () => {
        const message = {
            interactiveMessage: {
                carouselMessage: {
                    cards: [
                        {
                            nativeFlowMessage: {
                                buttons: [{ name: 'cta_url' }]
                            }
                        }
                    ]
                }
            }
        }
        const bizNode = getBizBinaryNode(message)
        expect(bizNode).toBeDefined()
        expect(bizNode.tag).toBe('biz')
        expect(bizNode.content).toBeDefined()
    })
})
