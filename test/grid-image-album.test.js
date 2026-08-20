const { generateWAMessageContent } = require('../lib/Utils/messages')
const { prepareGridImageMessageContent } = require('../lib/Utils/rich-message-utils')
const { RichSubMessageType } = require('../lib/Types/RichType')
const path = require('path')
const axios = require('axios')

// ── Module-level mocks ────────────────────────────────────────────────────────
jest.mock('../lib/Utils/messages-media', () => {
    const actual = jest.requireActual('../lib/Utils/messages-media')
    return { ...actual, extractImageThumb: jest.fn() }
})
jest.mock('axios')

const { extractImageThumb } = require('../lib/Utils/messages-media')

const MOCK_CDN_URL = 'https://mmg.whatsapp.net/v/t62.7119-24/mock_thumb.jpg'
const MOCK_THUMB_BUFFER = Buffer.from('fake-jpeg-thumbnail-bytes')

describe('ShowAsGrid Album Messages', () => {
    const mockOptions = {
        logger: {
            trace: jest.fn(), debug: jest.fn(), info: jest.fn(),
            warn: jest.fn(), error: jest.fn(), child: jest.fn().mockReturnThis()
        },
        userJid: '1234567890@s.whatsapp.net'
    }

    const getGridSection = (unifiedJson) =>
        unifiedJson.sections.find(s => s.view_model && s.view_model.__typename === 'GenAIGridLayoutViewModel')

    const getTextSection = (unifiedJson) =>
        unifiedJson.sections.find(s => s.view_model && s.view_model.__typename === 'GenAISingleLayoutViewModel')

    beforeEach(() => {
        jest.clearAllMocks()
        extractImageThumb.mockResolvedValue({ buffer: MOCK_THUMB_BUFFER, original: { width: 800, height: 800 } })
        axios.post.mockResolvedValue({ data: MOCK_CDN_URL })
    })

    // ── Grid Detection & Routing ──────────────────────────────────────────────
    describe('Grid Detection & Routing', () => {
        test('ShowAsGrid: undefined routes to normal album', async () => {
            const message = { album: [{ image: { url: 'https://example.com/1.jpg' }, caption: 'Image 1' }, { image: { url: 'https://example.com/2.jpg' }, caption: 'Image 2' }] }
            const result = await generateWAMessageContent(message, mockOptions)
            expect(result.albumMessage).toBeDefined()
            expect(result.albumMessage.expectedImageCount).toBe(2)
            expect(result.albumMessage.expectedVideoCount).toBe(0)
            expect(result.botForwardedMessage).toBeFalsy()
        })

        test('ShowAsGrid: false routes to normal album', async () => {
            const message = { album: [{ image: { url: 'https://example.com/1.jpg' } }, { video: { url: 'https://example.com/2.mp4' } }], ShowAsGrid: false }
            const result = await generateWAMessageContent(message, mockOptions)
            expect(result.albumMessage).toBeDefined()
            expect(result.albumMessage.expectedImageCount).toBe(1)
            expect(result.albumMessage.expectedVideoCount).toBe(1)
            expect(result.botForwardedMessage).toBeFalsy()
        })

        test('ShowAsGrid: true routes to grid representation and avoids invalid verification metadata', async () => {
            const message = { album: [{ image: { url: 'https://example.com/1.jpg' } }, { image: { url: 'https://example.com/2.jpg' } }], ShowAsGrid: true }
            const result = await generateWAMessageContent(message, mockOptions)
            expect(result.albumMessage).toBeFalsy()
            expect(result.botForwardedMessage).toBeDefined()
            expect(result.botForwardedMessage.message?.richResponseMessage).toBeDefined()
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

    // ── Captions & Text Support ───────────────────────────────────────────────
    describe('Captions & Text Support', () => {
        test('sends caption from item captions or main caption as text submessage and markdown section', async () => {
            const message = {
                caption: '🌟 Highlights from event',
                album: [{ image: { url: 'https://example.com/1.jpg' }, caption: 'Photo 1' }, { image: { url: 'https://example.com/2.jpg' }, caption: 'Photo 2' }],
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
            const album = [{ image: { url: 'https://example.com/1.jpg' }, caption: '🖼️ First Image' }, { image: { url: 'https://example.com/2.jpg' }, caption: '🖼️ Second Image' }]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            const rich = result.botForwardedMessage.message.richResponseMessage
            const textSubmessage = rich.submessages.find(sm => sm.messageType === RichSubMessageType.TEXT)
            expect(textSubmessage).toBeDefined()
            expect(textSubmessage.messageText).toContain('🖼️ First Image')
            expect(textSubmessage.messageText).toContain('🖼️ Second Image')
        })
    })

    // ── Multiple Images & Ordering ────────────────────────────────────────────
    describe('Multiple Images & Ordering', () => {
        test('handles 1, 2, 3, and 10 images with preserved ordering and primitive structure', async () => {
            for (const count of [1, 2, 3, 10]) {
                const album = Array.from({ length: count }, (_, i) => ({ image: { url: 'https://example.com/img_' + (i + 1) + '.jpg' } }))
                const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
                const rich = result.botForwardedMessage.message.richResponseMessage
                const unified = JSON.parse(rich.unifiedResponse.data.toString())
                const primitives = getGridSection(unified).view_model.primitives
                expect(primitives).toHaveLength(count)
                for (let i = 0; i < count; i++) {
                    const expectedUrl = 'https://example.com/img_' + (i + 1) + '.jpg'
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

    // ── URL Resolution & Fallbacks ────────────────────────────────────────────
    describe('URL Resolution & Fallbacks', () => {
        test('resolves URLs with fallback priority: imageHighResUrl -> imagePreviewUrl -> sourceUrl -> image.url', async () => {
            const album = [
                { imagePreviewUrl: 'https://example.com/preview1.jpg', imageHighResUrl: 'https://example.com/high1.jpg', sourceUrl: 'https://example.com/src1.jpg' },
                { sourceUrl: 'https://example.com/src2.jpg' },
                { imagePreviewUrl: 'https://example.com/preview3.jpg' },
                { image: { url: 'https://example.com/direct4.jpg' } }
            ]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const primitives = getGridSection(unified).view_model.primitives
            expect(primitives[0].preview_image.url).toBe('https://example.com/preview1.jpg')
            expect(primitives[0].full_image.url).toBe('https://example.com/high1.jpg')
            expect(primitives[1].preview_image.url).toBe('https://example.com/src2.jpg')
            expect(primitives[1].full_image.url).toBe('https://example.com/src2.jpg')
            expect(primitives[2].preview_image.url).toBe('https://example.com/preview3.jpg')
            expect(primitives[2].full_image.url).toBe('https://example.com/preview3.jpg')
            expect(primitives[3].preview_image.url).toBe('https://example.com/direct4.jpg')
            expect(primitives[3].full_image.url).toBe('https://example.com/direct4.jpg')
        })
    })

    // ── Dark Mode & Dimensions ────────────────────────────────────────────────
    describe('Dark Mode & Dimensions', () => {
        test('preserves custom dimensions and dark mode assets with fallbacks', async () => {
            const album = [
                { image: { url: 'https://example.com/light.jpg' }, darkModePreviewUrl: 'https://example.com/dark-prev.jpg', darkModeHighResUrl: 'https://example.com/dark-full.jpg', width: 1200, height: 800, darkWidth: 1280, darkHeight: 720 },
                { image: { url: 'https://example.com/light2.jpg' }, width: 1024, height: 768 }
            ]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const primitives = getGridSection(unified).view_model.primitives
            expect(primitives[0].preview_image.width).toBe(1200)
            expect(primitives[0].preview_image.height).toBe(800)
            expect(primitives[0].dark_mode_preview_image.url).toBe('https://example.com/dark-prev.jpg')
            expect(primitives[0].dark_mode_full_image.url).toBe('https://example.com/dark-full.jpg')
            expect(primitives[0].dark_mode_preview_image.width).toBe(1280)
            expect(primitives[0].dark_mode_preview_image.height).toBe(720)
            expect(primitives[1].preview_image.width).toBe(1024)
            expect(primitives[1].preview_image.height).toBe(768)
            expect(primitives[1].dark_mode_preview_image.url).toBe('https://example.com/light2.jpg')
            expect(primitives[1].dark_mode_full_image.url).toBe('https://example.com/light2.jpg')
            expect(primitives[1].dark_mode_preview_image.width).toBe(1024)
            expect(primitives[1].dark_mode_preview_image.height).toBe(768)
        })
    })

    // ── Expiration Timestamp Consistency ─────────────────────────────────────
    describe('Expiration Timestamp Consistency', () => {
        test('all primitives in a grid share the exact same expiration timestamp', async () => {
            const album = [{ image: { url: 'https://example.com/1.jpg' } }, { image: { url: 'https://example.com/2.jpg' } }, { image: { url: 'https://example.com/3.jpg' } }]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const primitives = getGridSection(unified).view_model.primitives
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

    // ── Local Media Thumbnail Upload ──────────────────────────────────────────
    describe('Local Media Thumbnail Upload', () => {
        beforeEach(() => {
            extractImageThumb.mockClear()
            axios.post.mockClear()

            extractImageThumb.mockResolvedValue({
                buffer: MOCK_THUMB_BUFFER,
                original: {}
            })

            axios.post.mockResolvedValue({
                data: MOCK_CDN_URL
            })
        })

        test('[Buffer] generates thumbnail, uploads it, and uses CDN URL in all primitive fields', async () => {
            const imageBuffer = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00])
            const album = [{ image: imageBuffer, width: 800, height: 800 }]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            expect(extractImageThumb).toHaveBeenCalledTimes(1)
            expect(axios.post).toHaveBeenCalledTimes(1)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const primitives = getGridSection(unified).view_model.primitives
            expect(primitives[0].preview_image.url).toBe(MOCK_CDN_URL)
            expect(primitives[0].full_image.url).toBe(MOCK_CDN_URL)
            expect(primitives[0].dark_mode_preview_image.url).toBe(MOCK_CDN_URL)
            expect(primitives[0].dark_mode_full_image.url).toBe(MOCK_CDN_URL)
            expect(primitives[0].preview_image.mime_type).toBe('image/jpeg')
            expect(primitives[0].asset_query_status).toBe('FETCHED')
            expect(primitives[0].__typename).toBe('GenAIImagePrimitive')
        })

        test('[Buffer] without upload function falls back to data URI (backward compatibility)', async () => {
            const imageBuffer = Buffer.from('fake-png-bytes')
            const album = [{ image: imageBuffer }]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, { ...mockOptions, useDataUri: true })
            expect(extractImageThumb).not.toHaveBeenCalled()
            expect(axios.post).not.toHaveBeenCalled()
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const primitives = getGridSection(unified).view_model.primitives
            expect(primitives[0].preview_image.url).toMatch(/^data:/)
        })

        test('[Local file path string] generates thumbnail, uploads it, and uses CDN URL', async () => {
            const fakeFileBuffer = Buffer.from('fake-image-file-content')
            jest.spyOn(require('fs').promises, 'readFile').mockResolvedValueOnce(fakeFileBuffer)
            const localPath = path.join(__dirname, 'fixtures', 'logo.png')
            const album = [{ image: localPath, width: 800, height: 800 }]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            expect(extractImageThumb).toHaveBeenCalledTimes(1)
            expect(axios.post).toHaveBeenCalledTimes(1)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const primitives = getGridSection(unified).view_model.primitives
            expect(primitives[0].preview_image.url).toBe(MOCK_CDN_URL)
            expect(primitives[0].full_image.url).toBe(MOCK_CDN_URL)
            expect(primitives[0].preview_image.mime_type).toBe('image/jpeg')
        })

        test('[Local {url: localPath}] generates thumbnail, uploads it, and uses CDN URL', async () => {
            const fakeFileBuffer = Buffer.from('fake-image-via-url-object')
            jest.spyOn(require('fs').promises, 'readFile').mockResolvedValueOnce(fakeFileBuffer)
            const localPath = path.join(__dirname, 'fixtures', 'logo.png')
            const album = [{ image: { url: localPath }, width: 800, height: 800 }]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            expect(extractImageThumb).toHaveBeenCalledTimes(1)
            expect(axios.post).toHaveBeenCalledTimes(1)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const primitives = getGridSection(unified).view_model.primitives
            expect(primitives[0].preview_image.url).toBe(MOCK_CDN_URL)
            expect(primitives[0].full_image.url).toBe(MOCK_CDN_URL)
        })

        test('[Mixed album] remote URL + Buffer + local path produce correct ordered CDN URLs', async () => {
            const bufferItem = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0])
            const fakeFileBuffer = Buffer.from('fake-local-file')
            jest.spyOn(require('fs').promises, 'readFile').mockResolvedValueOnce(fakeFileBuffer)
            const cdnUrl1 = 'https://files.catbox.moe/thumb1.jpg'
            const cdnUrl2 = 'https://files.catbox.moe/thumb2.jpg'
            axios.post.mockResolvedValueOnce({ data: cdnUrl1 }).mockResolvedValueOnce({ data: cdnUrl2 })
            const localPath = path.join(__dirname, 'fixtures', 'logo.png')
            const album = [
                { image: { url: 'https://example.com/remote.jpg' }, width: 800, height: 600 },
                { image: bufferItem },
                { image: localPath }
            ]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const primitives = getGridSection(unified).view_model.primitives
            expect(primitives).toHaveLength(3)
            expect(primitives[0].preview_image.url).toBe('https://example.com/remote.jpg')
            expect(primitives[1].preview_image.url).toBe(cdnUrl1)
            expect(primitives[2].preview_image.url).toBe(cdnUrl2)
            expect(extractImageThumb).toHaveBeenCalledTimes(2)
            expect(axios.post).toHaveBeenCalledTimes(2)
        })

        test('[Upload error fallback] falls back to data URI when upload throws', async () => {
            axios.post.mockRejectedValue(new Error('CDN upload failed'))
            const imageBuffer = Buffer.from('fake-image-bytes')
            const album = [{ image: imageBuffer }]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const primitives = getGridSection(unified).view_model.primitives
            expect(primitives[0].preview_image.url).toMatch(/^data:/)
        })

        test('[Remote URL] never calls extractImageThumb or uploadUnencryptedToWA', async () => {
            const album = [
                { image: { url: 'https://images.unsplash.com/photo-1.jpg' }, width: 800, height: 800 },
                { image: { url: 'https://images.unsplash.com/photo-2.jpg' }, width: 800, height: 800 },
                { image: { url: 'https://images.unsplash.com/photo-3.jpg' }, width: 800, height: 800 }
            ]
            const result = await prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions)
            expect(extractImageThumb).not.toHaveBeenCalled()
            expect(axios.post).not.toHaveBeenCalled()
            const unified = JSON.parse(result.botForwardedMessage.message.richResponseMessage.unifiedResponse.data.toString())
            const primitives = getGridSection(unified).view_model.primitives
            expect(primitives[0].preview_image.url).toBe('https://images.unsplash.com/photo-1.jpg')
            expect(primitives[1].preview_image.url).toBe('https://images.unsplash.com/photo-2.jpg')
            expect(primitives[2].preview_image.url).toBe('https://images.unsplash.com/photo-3.jpg')
        })
    })

    // ── Validation & Error Handling ───────────────────────────────────────────
    describe('Validation & Error Handling', () => {
        test('throws error for empty album array', async () => {
            await expect(prepareGridImageMessageContent('test@s.whatsapp.net', [], mockOptions))
                .rejects.toThrow('Grid image messages require at least one image.')
        })

        test('throws error when video is included in grid album', async () => {
            const album = [{ image: { url: 'https://example.com/1.jpg' } }, { video: { url: 'https://example.com/2.mp4' } }]
            await expect(prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions))
                .rejects.toThrow('Grid image mode currently supports image media only; video items are not supported.')
        })

        test('throws error when album item has no usable image source', async () => {
            const album = [{ caption: 'No image source provided' }]
            await expect(prepareGridImageMessageContent('test@s.whatsapp.net', album, mockOptions))
                .rejects.toThrow('Grid image mode requires a valid image source for each album item.')
        })
    })
})
