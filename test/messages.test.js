const { generateWAMessageContent } = require('../lib/Utils/messages')

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

        const options = {
            logger: {
                trace: jest.fn(),
                debug: jest.fn(),
                info: jest.fn(),
                warn: jest.fn(),
                error: jest.fn()
            }
        }

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

describe('Verified Badge Media (verifiedMe)', () => {
    const { generateWAMessageContent, generateWAMessage } = require('../lib/Utils/messages')

    const mockUpload = jest.fn().mockResolvedValue({
        url: 'https://example.com/media',
        directPath: '/v/t62.7118-24/media.enc',
        mediaKey: Buffer.alloc(32),
        fileEncSha256: Buffer.alloc(32),
        fileSha256: Buffer.alloc(32),
        fileLength: 1024
    })

    const mockLogger = {
        trace: jest.fn(),
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
        child: () => mockLogger
    }

    const samplePng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64')

    test('attaches verified badge context to image message and injects synthetic quoted fallback', async () => {
        const options = {
            upload: mockUpload,
            logger: mockLogger
        }

        const content = await generateWAMessageContent({
            image: samplePng,
            caption: 'Verified Image',
            verifiedMe: true
        }, options)

        expect(content.imageMessage).toBeDefined()
        expect(content.imageMessage.caption).toBe('Verified Image')
        expect(content.imageMessage.contextInfo).toBeDefined()
        expect(content.imageMessage.contextInfo.isForwarded).toBe(true)
        expect(content.imageMessage.contextInfo.participant).toBe('0@s.whatsapp.net')
        expect(content.imageMessage.contextInfo.remoteJid).toBe('0@s.whatsapp.net')
        expect(options.quoted).toBeDefined()
        expect(options.quoted.key.participant).toBe('0@s.whatsapp.net')
        expect(options.quoted.message.conversation).toBe('Verified Image')
    })

    test('attaches verified badge context to video message', async () => {
        const { Readable } = require('stream')
        const options = {
            upload: mockUpload,
            logger: mockLogger
        }

        const content = await generateWAMessageContent({
            video: { stream: Readable.from([Buffer.from('fake-video-data')]) },
            caption: 'Verified Video',
            verifiedMe: true
        }, options)

        expect(content.videoMessage).toBeDefined()
        expect(content.videoMessage.caption).toBe('Verified Video')
        expect(content.videoMessage.contextInfo).toBeDefined()
        expect(content.videoMessage.contextInfo.isForwarded).toBe(true)
        expect(content.videoMessage.contextInfo.participant).toBe('0@s.whatsapp.net')
        expect(content.videoMessage.contextInfo.remoteJid).toBe('0@s.whatsapp.net')
    })

    test('preserves user quoted message when verifiedMe is used', async () => {
        const customQuoted = {
            key: {
                remoteJid: '1234567890@s.whatsapp.net',
                fromMe: false,
                id: 'CUSTOM_ID'
            },
            message: {
                conversation: 'Custom Quoted Text'
            }
        }
        const options = {
            upload: mockUpload,
            logger: mockLogger,
            quoted: customQuoted
        }

        const content = await generateWAMessageContent({
            image: samplePng,
            caption: 'Verified With Custom Quote',
            verifiedMe: true
        }, options)

        expect(content.imageMessage.contextInfo.isForwarded).toBe(true)
        expect(content.imageMessage.contextInfo.participant).toBe('0@s.whatsapp.net')
        expect(options.quoted).toBe(customQuoted)
    })

    test('safely ignores verifiedMe on non-media messages', async () => {
        const options = {
            logger: mockLogger
        }

        const content = await generateWAMessageContent({
            text: 'Just plain text',
            verifiedMe: true
        }, options)

        expect(content.extendedTextMessage?.text || content.conversation).toBe('Just plain text')
        expect(options.quoted).toBeUndefined()
    })

    test('generates full WebMessageInfo with verified badge via generateWAMessage', async () => {
        const options = {
            upload: mockUpload,
            logger: mockLogger,
            userJid: '1111111111@s.whatsapp.net'
        }

        const fullMsg = await generateWAMessage('1234567890@s.whatsapp.net', {
            image: samplePng,
            caption: 'Full verified message',
            verifiedMe: true
        }, options)

        expect(fullMsg.message?.imageMessage).toBeDefined()
        expect(fullMsg.message.imageMessage.contextInfo?.isForwarded).toBe(true)
        expect(fullMsg.message.imageMessage.contextInfo?.participant).toBe('0@s.whatsapp.net')
        expect(fullMsg.message.imageMessage.contextInfo?.quotedMessage).toBeDefined()
    })
})

