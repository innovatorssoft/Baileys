"use strict"

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k
    var desc = Object.getOwnPropertyDescriptor(m, k)
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k] } }
    }
    Object.defineProperty(o, k2, desc)
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k
    o[k2] = m[k]
}))

var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v })
}) : function(o, v) {
    o["default"] = v
})

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
}

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod }
}

Object.defineProperty(exports, "__esModule", { value: true })

const boom_1 = require("@hapi/boom")
const axios_1 = __importDefault(require("axios"))
const child_process_1 = require("child_process")
const Crypto = __importStar(require("crypto"))
const events_1 = require("events")
const fs_1 = require("fs")
const os_1 = require("os")
const path_1 = require("path")
const stream_1 = require("stream")
const WAProto_1 = require("../../WAProto")
const Defaults_1 = require("../Defaults")
const WABinary_1 = require("../WABinary")
const crypto_1 = require("./crypto")
const generics_1 = require("./generics")

const getImageProcessingLibrary = async () => {
    const [_jimp, sharp] = await Promise.all([
        (async () => {
            const jimp = await (Promise.resolve().then(() => __importStar(require('jimp'))).catch(() => { }))
            return jimp
        })(),
        (async () => {
            const sharp = await (Promise.resolve().then(() => __importStar(require('sharp'))).catch(() => { }))
            return sharp
        })()
    ])
    if (sharp) {
        return { sharp }
    }
    const jimp = _jimp?.default || _jimp
    if (jimp) {
        return { jimp }
    }
    throw new boom_1.Boom('No image processing library available')
}

const hkdfInfoKey = (type) => {
    const hkdfInfo = Defaults_1.MEDIA_HKDF_KEY_MAPPING[type]
    return `WhatsApp ${hkdfInfo} Keys`
}

const getRawMediaUploadData = async (media, mediaType, logger) => {
    const { stream } = await getStream(media)
    
    logger?.debug('got stream for raw upload')
    
    const hasher = Crypto.createHash('sha256')
    const filePath = path_1.join(os_1.tmpdir(), mediaType + generics_1.generateMessageID())
    const fileWriteStream = fs_1.createWriteStream(filePath)
    
    let fileLength = 0
    
    try {
        for await (const data of stream) {
            fileLength += data.length
            hasher.update(data)
            
            if (!fileWriteStream.write(data)) {
                await events_1.once(fileWriteStream, 'drain')
            }
        }
        
        fileWriteStream.end()
        await events_1.once(fileWriteStream, 'finish')
        stream.destroy()
        
        const fileSha256 = hasher.digest()
        
        logger?.debug('hashed data for raw upload')
        
        return {
            filePath: filePath,
            fileSha256,
            fileLength
        }
    }
    catch (error) {
        fileWriteStream.destroy()
        stream.destroy()
        
        try {
            await fs_1.promises.unlink(filePath)
        }
        catch {
            //
        }
        throw error
    }
}

/** generates all the keys required to encrypt/decrypt & sign a media message */
async function getMediaKeys(buffer, mediaType) {
    if (!buffer) {
        throw new boom_1.Boom('Cannot derive from empty media key')
    }
    if (typeof buffer === 'string') {
        buffer = Buffer.from(buffer.replace('data:base64,', ''), 'base64')
    }
    // expand using HKDF to 112 bytes, also pass in the relevant app info
    const expandedMediaKey = await crypto_1.hkdf(buffer, 112, { info: hkdfInfoKey(mediaType) })
    return {
        iv: expandedMediaKey.slice(0, 16),
        cipherKey: expandedMediaKey.slice(16, 48),
        macKey: expandedMediaKey.slice(48, 80),
    }
}

/** Extracts video thumb using FFMPEG */
const extractVideoThumb = (videoPath, time = '00:00:00', size = { width: 320 }) => {
    return new Promise((resolve, reject) => {
        const args = [
            '-ss', time,
            '-i', videoPath,
            '-y',
            '-vf', `scale=${size.width}:-1`,
            '-vframes', '1',
            '-f', 'image2',
            '-vcodec', 'mjpeg',
            'pipe:1'
        ]

        const ffmpeg = child_process_1.spawn('ffmpeg', args)
        const chunks = []
        let errorOutput = ''

        ffmpeg.stdout.on('data', chunk => chunks.push(chunk))
        ffmpeg.stderr.on('data', data => {
            errorOutput += data.toString()
        })
        ffmpeg.on('error', reject)
        ffmpeg.on('close', code => {
            if (code === 0) return resolve(Buffer.concat(chunks))
            reject(new Error(`ffmpeg exited with code ${code}\n${errorOutput}`))
        })
    })
}

const extractImageThumb = async (bufferOrFilePath, widthOrHdMode = 32) => {
    // Determine width and quality based on parameter type
    // If boolean true (HD mode), use larger width for higher quality thumbnail
    const width = typeof widthOrHdMode === 'boolean'
        ? (widthOrHdMode ? 320 : 32)  // HD mode: 320px, normal: 32px
        : widthOrHdMode
    const quality = typeof widthOrHdMode === 'boolean' && widthOrHdMode ? 85 : 50  // HD mode: 85% quality

    if (typeof bufferOrFilePath === "string" && bufferOrFilePath.startsWith("http")) {
        const response = await axios_1.default.get(bufferOrFilePath, { responseType: "arraybuffer" })
        bufferOrFilePath = Buffer.from(response.data)
    }
    if (bufferOrFilePath instanceof stream_1.Readable) {
        bufferOrFilePath = await toBuffer(bufferOrFilePath)
    }
    const lib = await getImageProcessingLibrary()
    if ('sharp' in lib && typeof lib.sharp?.default === 'function') {
        const img = lib.sharp.default(bufferOrFilePath)
        const dimensions = await img.metadata()
        const buffer = await img
            .resize(width)
            .jpeg({ quality })
            .toBuffer()
        return {
            buffer,
            original: {
                width: dimensions.width,
                height: dimensions.height,
            },
        }
    }
    else if ('jimp' in lib && typeof lib.jimp?.read === 'function') {
        const { read, MIME_JPEG, RESIZE_BEZIER, AUTO } = lib.jimp
        const jimp = await read(bufferOrFilePath)
        const dimensions = {
            width: jimp.getWidth(),
            height: jimp.getHeight()
        }
        const buffer = await jimp
            .quality(quality)
            .resize(width, AUTO, RESIZE_BEZIER)
            .getBufferAsync(MIME_JPEG)
        return {
            buffer,
            original: dimensions
        }
    }
    else {
        throw new boom_1.Boom('No image processing library available')
    }
}

const encodeBase64EncodedStringForUpload = (b64) => (encodeURIComponent(b64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/\=+$/, '')))
    
const generateProfilePicture = async (mediaUpload) => {
    let bufferOrFilePath
    if (Buffer.isBuffer(mediaUpload)) {
        bufferOrFilePath = mediaUpload
    }
    else if ('url' in mediaUpload) {
        bufferOrFilePath = mediaUpload.url.toString()
    }
    else {
        bufferOrFilePath = await toBuffer(mediaUpload.stream)
    }
    const lib = await getImageProcessingLibrary()
    let img
    if ('sharp' in lib && typeof lib.sharp?.default === 'function') {
        img = await lib.sharp.default(bufferOrFilePath)
        .resize(720, 720, {
            fit: 'inside', 
        })
        .jpeg({ quality: 50 })
        .toBuffer()
    }
    else if ('jimp' in lib && typeof lib.jimp?.read === 'function') {
    	const { read, MIME_JPEG } = lib.jimp        
        const image = await read(bufferOrFilePath)
        const min = image.getWidth()
        const max = image.getHeight()
        const cropped = image.crop(0, 0, min, max)
        img = await cropped.scaleToFit(720, 720).getBufferAsync(MIME_JPEG)
    }
    else {
        throw new boom_1.Boom('No image processing library available')
    }
    return {
        img: await img,
    }
}

/**
 * Generate a panorama/wide profile picture without cropping.
 * Returns both a square preview (for circle/thumbnail display)
 * and a full-width image (for wide/banner display).
 * @param {Buffer|{url:string}|{stream:Readable}} mediaUpload - The image source
 * @param {{maxWidth?: number, quality?: number}} [options] - Panorama options
 */
const generatePanoramaProfilePicture = async (mediaUpload, options) => {
    let buffer
    const { maxWidth = 720, quality = 80 } = options || {}

    if (Buffer.isBuffer(mediaUpload)) {
        buffer = mediaUpload
    } else if ('url' in mediaUpload) {
        const urlStr = mediaUpload.url.toString()
        if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) {
            const response = await axios_1.default.get(urlStr, { responseType: 'arraybuffer' })
            buffer = Buffer.from(response.data)
        } else {
            buffer = await toBuffer(fs_1.createReadStream(urlStr))
        }
    } else {
        buffer = await toBuffer(mediaUpload.stream)
    }

    const lib = await getImageProcessingLibrary()
    let img
    let fullImg

    if ('sharp' in lib && typeof lib.sharp?.default === 'function') {
        const sharpInstance = lib.sharp.default(buffer)
        const metadata = await sharpInstance.metadata()

        const originalWidth = metadata.width || 640
        const originalHeight = metadata.height || 640

        // Calculate new dimensions maintaining aspect ratio
        const aspectRatio = originalWidth / originalHeight
        let newWidth = originalWidth
        let newHeight = originalHeight

        if (originalWidth > maxWidth) {
            newWidth = maxWidth
            newHeight = Math.round(maxWidth / aspectRatio)
        }

        // Full panorama image (for wide display)
        fullImg = await lib.sharp.default(buffer)
            .resize(newWidth, newHeight, { fit: 'inside' })
            .jpeg({ quality })
            .toBuffer()

        // Square preview (for thumbnail/circle view)
        img = await lib.sharp.default(buffer)
            .resize(640, 640, { fit: 'cover', position: 'center' })
            .jpeg({ quality: 50 })
            .toBuffer()

    } else if ('jimp' in lib && typeof lib.jimp?.read === 'function') {
        const { read, MIME_JPEG } = lib.jimp
        const jimp = await read(buffer)
        const originalWidth = jimp.getWidth()
        const originalHeight = jimp.getHeight()

        // Calculate dimensions
        const aspectRatio = originalWidth / originalHeight
        let newWidth = originalWidth
        let newHeight = originalHeight

        if (originalWidth > maxWidth) {
            newWidth = maxWidth
            newHeight = Math.round(maxWidth / aspectRatio)
        }

        // Full panorama
        const panoramaJimp = jimp.clone().resize(newWidth, newHeight)
        fullImg = await panoramaJimp.quality(quality).getBufferAsync(MIME_JPEG)

        // Square preview (crop center)
        const min = Math.min(originalWidth, originalHeight)
        const xOffset = Math.floor((originalWidth - min) / 2)
        const yOffset = Math.floor((originalHeight - min) / 2)
        const croppedJimp = jimp.clone().crop(xOffset, yOffset, min, min).resize(640, 640)
        img = await croppedJimp.quality(50).getBufferAsync(MIME_JPEG)

    } else {
        throw new boom_1.Boom('No image processing library available')
    }

    return { img, fullImg }
}


/** gets the SHA256 of the given media message */
const mediaMessageSHA256B64 = (message) => {
    const media = Object.values(message)[0]
    return (media === null || media === void 0 ? void 0 : media.fileSha256) && Buffer.from(media.fileSha256).toString('base64')
}

async function getAudioDuration(buffer) {
    const musicMetadata = await Promise.resolve().then(() => __importStar(require('music-metadata')))
    const options = {
    	duration: true
    }
    
    let metadata
    
    if (Buffer.isBuffer(buffer)) {
        metadata = await musicMetadata.parseBuffer(buffer, undefined, options)
    }
    else if (typeof buffer === 'string') {
        metadata = await musicMetadata.parseFile(buffer, options) 
    }
    else {
        metadata = await musicMetadata.parseStream(buffer, undefined, options) 
    }
    return metadata.format.duration
}

/**
  referenced from and modifying https://github.com/wppconnect-team/wa-js/blob/main/src/chat/functions/prepareAudioWaveform.ts
 */
async function getAudioWaveform(buffer, logger) {
    try {
        const { default: decoder } = await eval('import(\'audio-decode\')')
        let audioData
        if (Buffer.isBuffer(buffer)) {
            audioData = buffer
        }
        else if (typeof buffer === 'string') {
            const rStream = fs_1.createReadStream(buffer)
            audioData = await toBuffer(rStream)
        }
        else {
            audioData = await toBuffer(buffer)
        }
        const audioBuffer = await decoder(audioData)
        const rawData = audioBuffer.getChannelData(0) // We only need to work with one channel of data
        const samples = 64 // Number of samples we want to have in our final data set
        const blockSize = Math.floor(rawData.length / samples) // the number of samples in each subdivision
        const filteredData = []
        for (let i = 0; i < samples; i++) {
            const blockStart = blockSize * i // the location of the first sample in the block
            let sum = 0
            for (let j = 0; j < blockSize; j++) {
                sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
            }
            filteredData.push(sum / blockSize) // divide the sum by the block size to get the average
        }
        // This guarantees that the largest data point will be set to 1, and the rest of the data will scale proportionally.
        const multiplier = Math.pow(Math.max(...filteredData), -1)
        const normalizedData = filteredData.map((n) => n * multiplier)
        // Generate waveform like WhatsApp
        const waveform = new Uint8Array(normalizedData.map((n) => Math.floor(100 * n)))
        return waveform
    }
    catch (e) {
        logger?.debug('Failed to generate waveform: ' + e)
    }
}

const toReadable = (buffer) => {
    const readable = new stream_1.Readable({ read: () => { } })
    readable.push(buffer)
    readable.push(null)
    return readable
}

const toBuffer = async (stream) => {
    const chunks = []
    for await (const chunk of stream) {
        chunks.push(chunk)
    }
    stream.destroy()
    return Buffer.concat(chunks)
}

const getStream = async (item, opts) => {
    if (Buffer.isBuffer(item)) {
        return { stream: toReadable(item), type: 'buffer' }
    }
    
    if ('stream' in item) {
        return { stream: item.stream, type: 'readable' }
    }
    
    const urlStr = item.url.toString() 
    
    if (urlStr.startsWith('data:')) {
        const buffer = Buffer.from(urlStr.split(',')[1], 'base64') 
        return { stream: await toReadable(buffer), type: 'buffer' }
    }
    
    if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) {
        return { stream: await getHttpStream(item.url, opts), type: 'remote' }
    }
    
    return { stream: fs_1.createReadStream(item.url), type: 'file' }
}

/** generates a thumbnail for a given media, if required */
async function generateThumbnail(file, mediaType, options) {
    let thumbnail
    let originalImageDimensions

    // For HD mode, generate higher quality thumbnails
    const hdMode = options?.hdMode === true

    if (mediaType === 'image') {
        const { buffer, original } = await extractImageThumb(file, hdMode)
        thumbnail = buffer.toString('base64')
        if (original.width && original.height) {
            originalImageDimensions = {
                width: original.width,
                height: original.height,
            }
        }
    }
    else if (mediaType === 'video') {
        try {
            // For HD mode, use larger thumbnail size
            const thumbSize = hdMode ? { width: 320, height: 180 } : { width: 32, height: 32 }
            const buff = await extractVideoThumb(file, '00:00:00', thumbSize)
            thumbnail = buff.toString('base64')
        }
        catch (err) {
            options?.logger?.debug('could not generate video thumb: ' + err)
        }
    }
    return {
        thumbnail,
        originalImageDimensions
    }
}

const getHttpStream = async (url, options = {}) => {
    const fetched = await axios_1.default.get(url.toString(), { ...options, responseType: 'stream' })
    return fetched.data
}

const prepareStream = async (media, mediaType, { logger, saveOriginalFileIfRequired, opts } = {}) => {
    const { stream, type } = await getStream(media, opts)
    logger?.debug('fetched media stream')

    const encFilePath = path_1.join(os_1.tmpdir(), mediaType + generics_1.generateMessageID() + '-plain')
    const encFileWriteStream = fs_1.createWriteStream(encFilePath)

    let originalFilePath
    let originalFileStream

    if (type === 'file') {
        originalFilePath = media.url.toString()
    } else if (saveOriginalFileIfRequired) {
        originalFilePath = path_1.join(os_1.tmpdir(), mediaType + generics_1.generateMessageID() + '-original')
        originalFileStream = fs_1.createWriteStream(originalFilePath)
    }

    let fileLength = 0
    const sha256 = Crypto.createHash('sha256')

    try {
        for await (const data of stream) {
            fileLength += data.length

            if (type === 'remote'
                && opts?.maxContentLength
                && fileLength + data.length > opts.maxContentLength) {
                throw new boom_1.Boom(`content length exceeded when preparing "${type}"`, {
                    data: { media, type }
                })
            }

            sha256.update(data)
            encFileWriteStream.write(data)

            if (originalFileStream && !originalFileStream.write(data)) {
                await events_1.once(originalFileStream, 'drain')
            }
        }

        const fileSha256 = sha256.digest()
        encFileWriteStream.end()
        originalFileStream?.end?.call(originalFileStream)
        stream.destroy()

        logger?.debug('prepared plain stream successfully')

        return {
            mediaKey: undefined,
            originalFilePath,
            encFilePath,
            mac: undefined,
            fileEncSha256: undefined,
            fileSha256,
            fileLength
        }
    }
    catch (error) {
        encFileWriteStream.destroy()
        originalFileStream?.destroy?.call(originalFileStream)
        sha256.destroy()
        stream.destroy()
        try {
            await fs_1.promises.unlink(encFilePath)
            if (originalFilePath && didSaveToTmpPath) {
                await fs_1.promises.unlink(originalFilePath)
            }
        } catch (err) {
            logger?.error({ err }, 'failed deleting tmp files')
        }
        throw error
    }
}

const encryptedStream = async (media, mediaType, { logger, saveOriginalFileIfRequired, opts } = {}) => {
    const { stream, type } = await getStream(media, opts)
    logger?.debug('fetched media stream')
    const mediaKey = Crypto.randomBytes(32)
    const { cipherKey, iv, macKey } = await getMediaKeys(mediaKey, mediaType)
    const encFilePath = path_1.join(os_1.tmpdir(), mediaType + generics_1.generateMessageID() + '-enc')
    const encFileWriteStream = fs_1.createWriteStream(encFilePath)
    let originalFileStream
    let originalFilePath
    if (saveOriginalFileIfRequired) {
        originalFilePath = path_1.join(os_1.tmpdir(), mediaType + generics_1.generateMessageID() + '-original') 
        originalFileStream = fs_1.createWriteStream(originalFilePath)
    }
    let fileLength = 0
    const aes = Crypto.createCipheriv('aes-256-cbc', cipherKey, iv)
    const hmac = Crypto.createHmac('sha256', macKey).update(iv)
    const sha256Plain = Crypto.createHash('sha256')
    const sha256Enc = Crypto.createHash('sha256')
    const onChunk = (buff) => {
        sha256Enc.update(buff)
        hmac.update(buff)
        encFileWriteStream.write(buff)
    }
    try {
        for await (const data of stream) {
            fileLength += data.length
            if (type === 'remote'
                && opts?.maxContentLength
                && fileLength + data.length > opts.maxContentLength) {
                throw new boom_1.Boom(`content length exceeded when encrypting "${type}"`, {
                    data: { media, type }
                })
            }
            if (originalFileStream) {
                if (!originalFileStream.write(data)) {
                    await events_1.once(originalFileStream, 'drain')
                }
            }
            sha256Plain.update(data)
            onChunk(aes.update(data))
        }
        onChunk(aes.final())
        const mac = hmac.digest().slice(0, 10)
        sha256Enc.update(mac)
        const fileSha256 = sha256Plain.digest()
        const fileEncSha256 = sha256Enc.digest()
        encFileWriteStream.write(mac)
        encFileWriteStream.end()
        originalFileStream?.end?.call(originalFileStream)
        stream.destroy()
        logger?.debug('encrypted data successfully')
        return {
            mediaKey,
            originalFilePath,
            encFilePath,
            mac,
            fileEncSha256,
            fileSha256,
            fileLength
        }
    }
    catch (error) {
        // destroy all streams with error
        encFileWriteStream.destroy()
        originalFileStream?.destroy?.call(originalFileStream)
        aes.destroy()
        hmac.destroy()
        sha256Plain.destroy()
        sha256Enc.destroy()
        stream.destroy()
        try {
            await fs_1.promises.unlink(encFilePath)
            if (originalFilePath) {
                await fs_1.promises.unlink(originalFilePath)
            }
        }
        catch (err) {
            logger?.error({ err }, 'failed deleting tmp files')
        }
        throw error
    }
}

const DEF_HOST = 'mmg.whatsapp.net'

const AES_CHUNK_SIZE = 16

const toSmallestChunkSize = (num) => {
    return Math.floor(num / AES_CHUNK_SIZE) * AES_CHUNK_SIZE
}
const getUrlFromDirectPath = (directPath) => `https://${DEF_HOST}${directPath}`

const downloadContentFromMessage = async ({ mediaKey, directPath, url }, type, opts = {}) => {
	const isValidMediaUrl = url?.startsWith('https://mmg.whatsapp.net/') 
    const downloadUrl = isValidMediaUrl ? url : getUrlFromDirectPath(directPath)
    
    if (!downloadUrl) {
    	throw new boom_1.Boom('No valid media URL or directPath present in message', { statusCode: 400 }) 
    }
    
    const keys = await getMediaKeys(mediaKey, type)
    return downloadEncryptedContent(downloadUrl, keys, opts)
}

/**
 * Decrypts and downloads an AES256-CBC encrypted file given the keys.
 * Assumes the SHA256 of the plaintext is appended to the end of the ciphertext
 * */
const downloadEncryptedContent = async (downloadUrl, { cipherKey, iv }, { startByte, endByte, options } = {}) => {
    let bytesFetched = 0
    let startChunk = 0
    let firstBlockIsIV = false
    // if a start byte is specified -- then we need to fetch the previous chunk as that will form the IV
    if (startByte) {
        const chunk = toSmallestChunkSize(startByte || 0)
        if (chunk) {
            startChunk = chunk - AES_CHUNK_SIZE
            bytesFetched = chunk
            firstBlockIsIV = true
        }
    }
    const endChunk = endByte ? toSmallestChunkSize(endByte || 0) + AES_CHUNK_SIZE : undefined
    const headers = {
        ...(options?.headers) || {},
        Origin: Defaults_1.DEFAULT_ORIGIN,
    }
    if (startChunk || endChunk) {
        headers.Range = `bytes=${startChunk}-`
        if (endChunk) {
            headers.Range += endChunk
        }
    }
    // download the message
    const fetched = await getHttpStream(downloadUrl, {
        ...options || {},
        headers,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    })
    let remainingBytes = Buffer.from([])
    let aes
    const pushBytes = (bytes, push) => {
        if (startByte || endByte) {
            const start = bytesFetched >= startByte ? undefined : Math.max(startByte - bytesFetched, 0)
            const end = bytesFetched + bytes.length < endByte ? undefined : Math.max(endByte - bytesFetched, 0)
            push(bytes.slice(start, end))
            bytesFetched += bytes.length
        }
        else {
            push(bytes)
        }
    }
    const output = new stream_1.Transform({
        transform(chunk, _, callback) {
            let data = Buffer.concat([remainingBytes, chunk])
            const decryptLength = toSmallestChunkSize(data.length)
            remainingBytes = data.slice(decryptLength)
            data = data.slice(0, decryptLength)
            if (!aes) {
                let ivValue = iv
                if (firstBlockIsIV) {
                    ivValue = data.slice(0, AES_CHUNK_SIZE)
                    data = data.slice(AES_CHUNK_SIZE)
                }
                aes = Crypto.createDecipheriv('aes-256-cbc', cipherKey, ivValue)
                // if an end byte that is not EOF is specified
                // stop auto padding (PKCS7) -- otherwise throws an error for decryption
                if (endByte) {
                    aes.setAutoPadding(false)
                }
            }
            try {
                pushBytes(aes.update(data), b => this.push(b))
                callback()
            }
            catch (error) {
                callback(error)
            }
        },
        final(callback) {
            try {
                pushBytes(aes.final(), b => this.push(b))
                callback()
            }
            catch (error) {
                callback(error)
            }
        },
    })
    return fetched.pipe(output, { end: true })
}

function extensionForMediaMessage(message) {
    const getExtension = (mimetype) => mimetype.split('')[0].split('/')[1]
    const type = Object.keys(message)[0]
    let extension
    if (type === 'locationMessage' ||
        type === 'liveLocationMessage' ||
        type === 'productMessage') {
        extension = '.jpeg'
    }
    else {
        const messageContent = message[type]
        extension = getExtension(messageContent.mimetype)
    }
    return extension
}

const getWAUploadToServer = ({ customUploadHosts, fetchAgent, logger, options }, refreshMediaConn) => {
    return async (filePath, { mediaType, fileEncSha256B64, newsletter, timeoutMs }) => {
        // send a query JSON to obtain the url & auth token to upload our media
        let uploadInfo = await refreshMediaConn(false)
        let urls
        let media = Defaults_1.MEDIA_PATH_MAP[mediaType]
        const hosts = [...customUploadHosts, ...uploadInfo.hosts]
        fileEncSha256B64 = encodeBase64EncodedStringForUpload(fileEncSha256B64)
        if (newsletter) {
            media = media?.replace('/mms/', '/newsletter/newsletter-')
        }
        for (const { hostname } of hosts) {
            logger.debug(`uploading to "${hostname}"`)
            const auth = encodeURIComponent(uploadInfo.auth) // the auth token
            const url = `https://${hostname}${media}/${fileEncSha256B64}?auth=${auth}&token=${fileEncSha256B64}`
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let result
            try {
                const body = await axios_1.default.post(url, fs_1.createReadStream(filePath), {
                    ...options,
                    maxRedirects: 0,
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'Origin': Defaults_1.DEFAULT_ORIGIN,
                        ...(options.headers || {})
                    },
                    httpsAgent: fetchAgent,
                    timeout: timeoutMs,
                    responseType: 'json',
                    maxBodyLength: Infinity,
                    maxContentLength: Infinity,
                })
                result = body.data
                if (result?.url || result?.directPath) {
                    urls = {
                        mediaUrl: result.url,
                        directPath: result.direct_path, 
                        meta_hmac: result.meta_hmac,
                        fbid: result.fbid,
                        ts: result.ts
                    }
                    break
                }
                else {
                    uploadInfo = await refreshMediaConn(true)
                    throw new Error(`upload failed, reason: ${JSON.stringify(result)}`)
                }
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    result = error.response?.data
                }
                const isLast = hostname === hosts[uploadInfo.hosts.length - 1]?.hostname
                logger.warn({ trace: error.stack, uploadResult: result }, `Error in uploading to ${hostname} ${isLast ? '' : ', retrying...'}`)
            }
        }
        if (!urls) {
            throw new boom_1.Boom('Media upload failed on all hosts', { statusCode: 500 })
        }
        return urls
    }
}

const getMediaRetryKey = (mediaKey) => {
    return crypto_1.hkdf(mediaKey, 32, { info: 'WhatsApp Media Retry Notification' })
}
/**
 * Generate a binary node that will request the phone to re-upload the media & return the newly uploaded URL
 */
const encryptMediaRetryRequest = async (key, mediaKey, meId) => {
    const recp = { stanzaId: key.id }
    const recpBuffer = WAProto_1.proto.ServerErrorReceipt.encode(recp).finish()
    const iv = Crypto.randomBytes(12)
    const retryKey = await getMediaRetryKey(mediaKey)
    const ciphertext = crypto_1.aesEncryptGCM(recpBuffer, retryKey, iv, Buffer.from(key.id))
    const req = {
        tag: 'receipt',
        attrs: {
            id: key.id,
            to: WABinary_1.jidNormalizedUser(meId),
            type: 'server-error'
        },
        content: [
            // this encrypt node is actually pretty useless
            // the media is returned even without this node
            // keeping it here to maintain parity with WA Web
            {
                tag: 'encrypt',
                attrs: {},
                content: [
                    { tag: 'enc_p', attrs: {}, content: ciphertext },
                    { tag: 'enc_iv', attrs: {}, content: iv }
                ]
            },
            {
                tag: 'rmr',
                attrs: {
                    jid: key.remoteJid,
                    'from_me': (!!key.fromMe).toString(),
                    // @ts-ignore
                    participant: key.participant || undefined
                }
            }
        ]
    }
    return req
}

const decodeMediaRetryNode = (node) => {
    const rmrNode = WABinary_1.getBinaryNodeChild(node, 'rmr')
    const event = {
        key: {
            id: node.attrs.id,
            remoteJid: rmrNode.attrs.jid,
            fromMe: rmrNode.attrs.from_me === 'true',
            participant: rmrNode.attrs.participant
        }
    }
    const errorNode = WABinary_1.getBinaryNodeChild(node, 'error')
    if (errorNode) {
        const errorCode = +errorNode.attrs.code
        event.error = new boom_1.Boom(`Failed to re-upload media (${errorCode})`, { data: errorNode.attrs, statusCode: getStatusCodeForMediaRetry(errorCode) })
    }
    else {
        const encryptedInfoNode = WABinary_1.getBinaryNodeChild(node, 'encrypt')
        const ciphertext = WABinary_1.getBinaryNodeChildBuffer(encryptedInfoNode, 'enc_p')
        const iv = WABinary_1.getBinaryNodeChildBuffer(encryptedInfoNode, 'enc_iv')
        if (ciphertext && iv) {
            event.media = { ciphertext, iv }
        }
        else {
            event.error = new boom_1.Boom('Failed to re-upload media (missing ciphertext)', { statusCode: 404 })
        }
    }
    return event
}

const decryptMediaRetryData = async ({ ciphertext, iv }, mediaKey, msgId) => {
    const retryKey = await getMediaRetryKey(mediaKey)
    const plaintext = crypto_1.aesDecryptGCM(ciphertext, retryKey, iv, Buffer.from(msgId))
    return WAProto_1.proto.MediaRetryNotification.decode(plaintext)
}

const getStatusCodeForMediaRetry = (code) => MEDIA_RETRY_STATUS_MAP[code]

const MEDIA_RETRY_STATUS_MAP = {
    [WAProto_1.proto.MediaRetryNotification.ResultType.SUCCESS]: 200,
    [WAProto_1.proto.MediaRetryNotification.ResultType.DECRYPTION_ERROR]: 412,
    [WAProto_1.proto.MediaRetryNotification.ResultType.NOT_FOUND]: 404,
    [WAProto_1.proto.MediaRetryNotification.ResultType.GENERAL_ERROR]: 418,
}

module.exports = {
  hkdfInfoKey, 
  getMediaKeys, 
  extractVideoThumb, 
  extractImageThumb, 
  encodeBase64EncodedStringForUpload, 
  generateProfilePicture, 
  generatePanoramaProfilePicture,
  mediaMessageSHA256B64, 
  getAudioDuration, 
  getAudioWaveform, 
  toReadable, 
  toBuffer, 
  getStream, 
  generateThumbnail, 
  getHttpStream, 
  prepareStream, 
  encryptedStream, 
  getUrlFromDirectPath, 
  downloadContentFromMessage, 
  downloadEncryptedContent, 
  extensionForMediaMessage, 
  getRawMediaUploadData, 
  getWAUploadToServer, 
  getMediaRetryKey, 
  encryptMediaRetryRequest, 
  decodeMediaRetryNode, 
  decryptMediaRetryData, 
  getStatusCodeForMediaRetry, 
  MEDIA_RETRY_STATUS_MAP
}