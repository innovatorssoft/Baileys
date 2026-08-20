const { generateWAMessageContent, prepareGridImageMessageContent } = require('../lib/Utils/messages')
const { RichSubMessageType } = require('../lib/Types/RichType')

describe('ShowAsGrid Album Messages', () => {
    const mockOptions = {
        logger: {
            trace: jest.fn(),
            debug: jest.fn(),
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
            child: jest.fn().mockReturnThis()
        },
        userJid: '1234567890@s.whatsapp.net'
    }

    const getGridSection = (unifiedJson) => {
        return unifiedJson.sections.find(s => s.view_model && s.view_model.__typename === 'GenAIGridLayoutViewModel')
    }

    const getTextSection = (unifiedJson) => {
        return unifiedJson.sections.find(s => s.view_model && s.view_model.__typename === 'GenAISingleLayoutViewModel')
    }

    describe('Grid Detection & Routing', () => {
        test('ShowAsGrid: undefined routes to normal album', async () => {
            const message = {
                album: [
                    { image: { url: 'https://example.com/1.jpg' }, caption: 'Image 1' },
                    { image: { url: 'https://example.com/2.jpg' }, caption: 'Image 2' }
                ]
            }

            const result = await generateWAMessageContent(message, mockOptions)
            expect(result.albumMessage).toBeDefined()
            expect(result.albumMessage.expectedImageCount).toBe(2)
            expect(result.albumMessage.expectedVideoCount).toBe(0)
            expect(result.botForwardedMessage).toBeFalsy()
        })

        test('ShowAsGrid: false routes to normal album', async () => {
            const message = {
                album: [
                    { image: { url: 'https://example.com/1.jpg' } },
                    { video: { url: 'https://example.com/2.mp4' } }
                ],
                ShowAsGrid: false
            }

            const result = await generateWAMessageContent(message, mockOptions)
            expect(result.albumMessage).toBeDefined()
            expect(result.albumMessage.expectedImageCount).toBe(1)
            expect(result.albumMessage.expectedVideoCount).toBe(1)
            expect(result.botForwardedMessage).toBeFalsy()
        })

        test('ShowAsGrid: true routes to grid representation and avoids invalid verification metadata', async () => {
            const message = {
                album: [
                    { image: { url: 'https://example.com/1.jpg' } },
                    { image: { url: 'https://example.com/2.jpg' } }
                ],
                ShowAsGrid: true
            }

            const result = await generateWAMessageContent(message, mockOptions)
            expect(result.albumMessage).toBeFalsy()
            expect(result.botForwardedMessage).toBeDefined()
            expect(result.botForwardedMessage.message?.richResponseMessage).toBeDefined()
            
            // Verification metadata should not contain invalid random proofs
            const botMeta = result.messageContextInfo?.botMetadata
            expect(botMeta?.verificationMetadata).toBeFalsy()

            const rich = result.botForwardedMessage.message.richResponseMessage
            const gridSubmessage = rich.submessages.find(sm => sm.messageType === RichSubMessageType.GRID_IMAGE)
            expect(gridSubmessage).toBeDefined()
            expect(gridSubmessage.gridImageMetadata.imageUrls).toHaveLength(2)

            const unifiedJson = JSON.parse(rich.unifiedResponse.data.toString())
            const gridSection = getGridSection(unifiedJson)
            expect(gridSection).toBeDefined()
            expect(gridSection.view_model.primitives).toHaveLength(2)
        })
    })

    describe('Captions & Text Support', () => {
        test('sends caption from item captions or main caption as text submessage and markdown section', async () => {
            const message = {
                caption: '🌟 Highlights from event',
                album: [
                    { image: { url: 'https://example.com/1.jpg' }, caption: 'Photo 1' },
                    { image: { url: 'https://example.com/2.jpg' }, caption: 'Photo 2' }
                ],
                ShowAsGrid: true
            }

            const result = await generateWAMessageContent(message, mockOptions)
            const rich = result.botForwardedMessage.message.richResponseMessage

            const textSubmessage = rich.submessages.find(sm => sm.messageType === RichSubMessageType.TEXT)
            expect(textSubmessage).toBeDefined()
            expect(textSubmessage.messageText).toBe('🌟 Highlights from event')

            const unifiedJson = JSON.parse(rich.unifiedResponse.data.toString())
            const textSection = getTextSection(unifiedJson)
            expect(textSection).toBeDefined()
            expect(textSection.view_model.primitive.text).toBe('🌟 Highlights from event')
            expect(textSection.view_model.primitive.__typename).toBe('GenAIMarkdownTextUXPrimitive')
        })

        test('aggregates item captions when no top-level caption is provided', async () => {
            const album = [
                { image: { url: 'https://example.com/1.jpg' }, caption: '🖼️ First Image' },
                { image: { url: 'https://example.com/2.jpg' }, caption: '🖼️ Second Image' }
            ]

            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            const rich = result.botForwardedMessage.message.richResponseMessage
            const textSubmessage = rich.submessages.find(sm => sm.messageType === RichSubMessageType.TEXT)
            expect(textSubmessage).toBeDefined()
            expect(textSubmessage.messageText).toContain('🖼️ First Image')
            expect(textSubmessage.messageText).toContain('🖼️ Second Image')
        })
    })

    describe('Multiple Images & Ordering', () => {
        test('handles 1, 2, 3, and 10 images with preserved ordering and primitive structure', async () => {
            for (const count of [1, 2, 3, 10]) {
                const album = Array.from({ length: count }, (_, i) => ({
                    image: { url: `https://example.com/img_${i + 1}.jpg` }
                }))

                const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
                const rich = result.botForwardedMessage.message.richResponseMessage
                const unified = JSON.parse(rich.unifiedResponse.data.toString())
                const gridSection = getGridSection(unified)
                const primitives = gridSection.view_model.primitives

                expect(primitives).toHaveLength(count)
                for (let i = 0; i < count; i++) {
                    const expectedUrl = `https://example.com/img_${i + 1}.jpg`
                    expect(primitives[i].__typename).toBe('GenAIImagePrimitive')
                    expect(primitives[i].asset_query_status).toBe('FETCHED')
                    expect(primitives[i].preview_image.url).toBe(expectedUrl)
                    expect(primitives[i].full_image.url).toBe(expectedUrl)
                    expect(primitives[i].dark_mode_preview_image.url).toBe(expectedUrl)
                    expect(primitives[i].dark_mode_full_image.url).toBe(expectedUrl)
                    expect(primitives[i].preview_image.width).toBe(600)
                    expect(primitives[i].preview_image.height).toBe(400)
                }
            }
        })
    })

    describe('URL Resolution & Fallbacks', () => {
        test('resolves URLs with fallback priority: imageHighResUrl -> imagePreviewUrl -> sourceUrl -> image.url', async () => {
            const album = [
                // 1. Explicit highRes and preview
                {
                    imagePreviewUrl: 'https://example.com/preview1.jpg',
                    imageHighResUrl: 'https://example.com/high1.jpg',
                    sourceUrl: 'https://example.com/src1.jpg'
                },
                // 2. Only sourceUrl provided
                {
                    sourceUrl: 'https://example.com/src2.jpg'
                },
                // 3. Only imagePreviewUrl provided
                {
                    imagePreviewUrl: 'https://example.com/preview3.jpg'
                },
                // 4. image object URL
                {
                    image: { url: 'https://example.com/direct4.jpg' }
                }
            ]

            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const gridSection = getGridSection(unified)
            const primitives = gridSection.view_model.primitives

            // Item 1
            expect(primitives[0].preview_image.url).toBe('https://example.com/preview1.jpg')
            expect(primitives[0].full_image.url).toBe('https://example.com/high1.jpg')

            // Item 2 (fallback to sourceUrl)
            expect(primitives[1].preview_image.url).toBe('https://example.com/src2.jpg')
            expect(primitives[1].full_image.url).toBe('https://example.com/src2.jpg')

            // Item 3 (fallback to previewUrl)
            expect(primitives[2].preview_image.url).toBe('https://example.com/preview3.jpg')
            expect(primitives[2].full_image.url).toBe('https://example.com/preview3.jpg')

            // Item 4 (resolved from image.url)
            expect(primitives[3].preview_image.url).toBe('https://example.com/direct4.jpg')
            expect(primitives[3].full_image.url).toBe('https://example.com/direct4.jpg')
        })
    })

    describe('Dark Mode & Dimensions', () => {
        test('preserves custom dimensions and dark mode assets with fallbacks', async () => {
            const album = [
                {
                    image: { url: 'https://example.com/light.jpg' },
                    darkModePreviewUrl: 'https://example.com/dark-prev.jpg',
                    darkModeHighResUrl: 'https://example.com/dark-full.jpg',
                    width: 1200,
                    height: 800,
                    darkWidth: 1280,
                    darkHeight: 720
                },
                {
                    image: { url: 'https://example.com/light2.jpg' },
                    width: 1024,
                    height: 768
                }
            ]

            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const gridSection = getGridSection(unified)
            const primitives = gridSection.view_model.primitives

            // Item 1 with explicit dark mode assets and custom dimensions
            expect(primitives[0].preview_image.width).toBe(1200)
            expect(primitives[0].preview_image.height).toBe(800)
            expect(primitives[0].dark_mode_preview_image.url).toBe('https://example.com/dark-prev.jpg')
            expect(primitives[0].dark_mode_full_image.url).toBe('https://example.com/dark-full.jpg')
            expect(primitives[0].dark_mode_preview_image.width).toBe(1280)
            expect(primitives[0].dark_mode_preview_image.height).toBe(720)

            // Item 2 with fallback dark mode assets and default dark dimensions
            expect(primitives[1].preview_image.width).toBe(1024)
            expect(primitives[1].preview_image.height).toBe(768)
            expect(primitives[1].dark_mode_preview_image.url).toBe('https://example.com/light2.jpg')
            expect(primitives[1].dark_mode_full_image.url).toBe('https://example.com/light2.jpg')
            expect(primitives[1].dark_mode_preview_image.width).toBe(1024)
            expect(primitives[1].dark_mode_preview_image.height).toBe(768)
        })
    })

    describe('Expiration Timestamp Consistency', () => {
        test('all primitives in a grid share the exact same expiration timestamp', async () => {
            const album = [
                { image: { url: 'https://example.com/1.jpg' } },
                { image: { url: 'https://example.com/2.jpg' } },
                { image: { url: 'https://example.com/3.jpg' } }
            ]

            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const gridSection = getGridSection(unified)
            const primitives = gridSection.view_model.primitives

            const exp0 = primitives[0].preview_image.expiration_timestamp_ms
            expect(typeof exp0).toBe('number')
            expect(exp0).toBeGreaterThan(Date.now())

            for (const prim of primitives) {
                expect(prim.preview_image.expiration_timestamp_ms).toBe(exp0)
                expect(prim.full_image.expiration_timestamp_ms).toBe(exp0)
                expect(prim.dark_mode_preview_image.expiration_timestamp_ms).toBe(exp0)
                expect(prim.dark_mode_full_image.expiration_timestamp_ms).toBe(exp0)
            }
        })
    })

    describe('Buffer Handling', () => {
        test('uploads image buffers and uses returned URL in grid primitives', async () => {
            const mockUpload = jest.fn().mockResolvedValue({
                mediaUrl: 'https://mmg.whatsapp.net/v/mock_uploaded.jpg',
                directPath: '/v/mock_uploaded.jpg'
            })

            const album = [
                {
                    image: Buffer.from('fake-image-bytes-1')
                },
                {
                    image: Buffer.from('fake-image-bytes-2')
                }
            ]

            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, {
                ...mockOptions,
                upload: mockUpload
            })

            expect(mockUpload).toHaveBeenCalledTimes(2)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const gridSection = getGridSection(unified)
            const primitives = gridSection.view_model.primitives

            expect(primitives[0].preview_image.url).toBe('https://mmg.whatsapp.net/v/mock_uploaded.jpg')
            expect(primitives[1].preview_image.url).toBe('https://mmg.whatsapp.net/v/mock_uploaded.jpg')
        })
    })

    describe('Validation & Error Handling', () => {
        test('throws error for empty album array', async () => {
            await expect(prepareGridImageMessageContent('test@s.whatsapp.net', [], mockOptions))
                .rejects.toThrow('Grid image messages require at least one image.')
        })

        test('throws error when video is included in grid album', async () => {
            const album = [
                { image: { url: 'https://example.com/1.jpg' } },
                { video: { url: 'https://example.com/2.mp4' } }
            ]

            await expect(prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions))
                .rejects.toThrow('Grid image mode currently supports image media only; video items are not supported.')
        })

        test('throws error when album item has no usable image source', async () => {
            const album = [
                { caption: 'No image source provided' }
            ]

            await expect(prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions))
                .rejects.toThrow('Grid image mode requires a valid image source for each album item.')
        })
    })
})
