"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

const boom_1 = require("@hapi/boom")
const WAProto_1 = require("../../WAProto")
const Defaults_1 = require("../Defaults")
const WABinary_1 = require("../WABinary")
const crypto_1 = require("./crypto")

const generateIV = (counter) => {
    const iv = new ArrayBuffer(12)
    new DataView(iv).setUint32(8, counter)
    return new Uint8Array(iv)
}

const makeNoiseHandler = ({ keyPair: { private: privateKey, public: publicKey }, NOISE_HEADER, logger, routingInfo }) => {
    logger = logger.child({ class: 'ns' })
    const authenticate = (data) => {
        if (!isFinished) {
            hash = crypto_1.sha256(Buffer.concat([hash, data]))
        }
    }
    const encrypt = (plaintext) => {
        const result = crypto_1.aesEncryptGCM(plaintext, encKey, generateIV(writeCounter), hash)
        writeCounter += 1
        authenticate(result)
        return result
    }
    const decrypt = (ciphertext) => {
        // before the handshake is finished, we use the same counter
        // after handshake, the counters are different
        const iv = generateIV(isFinished ? readCounter : writeCounter)
        const result = crypto_1.aesDecryptGCM(ciphertext, decKey, iv, hash)
        if (isFinished) {
            readCounter += 1
        }
        else {
            writeCounter += 1
        }
        authenticate(ciphertext)
        return result
    }
    const localHKDF = async (data) => {
        const key = await crypto_1.hkdf(Buffer.from(data), 64, { salt, info: '' })
        return [key.slice(0, 32), key.slice(32)]
    }
    const mixIntoKey = async (data) => {
        const [write, read] = await localHKDF(data)
        salt = write
        encKey = read
        decKey = read
        readCounter = 0
        writeCounter = 0
    }
    const finishInit = async () => {
        const [write, read] = await localHKDF(new Uint8Array(0))
        encKey = write
        decKey = read
        hash = Buffer.from([])
        readCounter = 0
        writeCounter = 0
        isFinished = true
    }
    const data = Buffer.from(Defaults_1.NOISE_MODE)
    let hash = data.byteLength === 32 ? data : crypto_1.sha256(data)
    let salt = hash
    let encKey = hash
    let decKey = hash
    let readCounter = 0
    let writeCounter = 0
    let isFinished = false
    let sentIntro = false
    let inBytes = Buffer.alloc(0)
    /**
     * CONNECTION STABILITY: Maximum size for the inBytes accumulation buffer.
     * If data arrives faster than it can be processed, this prevents
     * unbounded memory growth. 10MB should be generous for normal operation.
     */
    const MAX_BUFFER_SIZE = 10 * 1024 * 1024 // 10MB
    let isDestroyed = false
    let decodeQueue = Promise.resolve()
    authenticate(NOISE_HEADER)
    authenticate(publicKey)
    return {
        encrypt,
        decrypt,
        authenticate,
        mixIntoKey,
        finishInit,
        processHandshake: async ({ serverHello }, noiseKey) => {
            authenticate(serverHello.ephemeral)
            await mixIntoKey(crypto_1.Curve.sharedKey(privateKey, serverHello.ephemeral))
            const decStaticContent = decrypt(serverHello.static)
            await mixIntoKey(crypto_1.Curve.sharedKey(privateKey, decStaticContent))
            const certDecoded = decrypt(serverHello.payload)
            const { intermediate: certIntermediate } = WAProto_1.proto.CertChain.decode(certDecoded)
            const { issuerSerial } = WAProto_1.proto.CertChain.NoiseCertificate.Details.decode(certIntermediate.details)
            if (issuerSerial !== Defaults_1.WA_CERT_DETAILS.SERIAL) {
                throw new boom_1.Boom('certification match failed', { statusCode: 400 })
            }
            const keyEnc = encrypt(noiseKey.public)
            await mixIntoKey(crypto_1.Curve.sharedKey(noiseKey.private, serverHello.ephemeral))
            return keyEnc
        },
        encodeFrame: (data) => {
            if (isFinished) {
                data = encrypt(data)
            }
            let header
            if (routingInfo) {
                header = Buffer.alloc(7)
                header.write('ED', 0, 'utf8')
                header.writeUint8(0, 2)
                header.writeUint8(1, 3)
                header.writeUint8(routingInfo.byteLength >> 16, 4)
                header.writeUint16BE(routingInfo.byteLength & 65535, 5)
                header = Buffer.concat([header, routingInfo, NOISE_HEADER])
            }
            else {
                header = Buffer.from(NOISE_HEADER)
            }
            const introSize = sentIntro ? 0 : header.length
            const frame = Buffer.alloc(introSize + 3 + data.byteLength)
            if (!sentIntro) {
                frame.set(header)
                sentIntro = true
            }
            frame.writeUInt8(data.byteLength >> 16, introSize)
            frame.writeUInt16BE(65535 & data.byteLength, introSize + 1)
            frame.set(data, introSize + 3)
            return frame
        },
        decodeFrame: (newData, onFrame) => {
            if (isDestroyed) return Promise.resolve()
            // the binary protocol uses its own framing mechanism
            // on top of the WS frames
            // so we get this data and separate out the frames
            const getBytesSize = () => {
                if (inBytes.length >= 3) {
                    return (inBytes.readUInt8() << 16) | inBytes.readUInt16BE(1)
                }
            }
            inBytes = Buffer.concat([inBytes, newData])
            logger.trace(`recv ${newData.length} bytes, total recv ${inBytes.length} bytes`)

            /**
             * CONNECTION STABILITY: Guard against unbounded buffer growth.
             * If inBytes exceeds MAX_BUFFER_SIZE, the connection is in a
             * pathological state. Clear the buffer to prevent OOM.
             */
            if (inBytes.length > MAX_BUFFER_SIZE) {
                logger.error({ bufferSize: inBytes.length }, 'noise handler buffer exceeded max size, clearing')
                inBytes = Buffer.alloc(0)
                return Promise.resolve()
            }

            /**
             * CONNECTION STABILITY: Slice and decrypt all complete frames
             * synchronously in strict arrival order so concurrent WebSocket
             * message events cannot race on inBytes or Noise readCounter.
             */
            const decryptedFrames = []
            let size = getBytesSize()
            while (size && inBytes.length >= size + 3) {
                const frame = inBytes.slice(3, size + 3)
                inBytes = inBytes.slice(size + 3)
                if (!isFinished) {
                    logger.trace({ msg: undefined }, 'recv frame')
                    try {
                        onFrame(frame)
                    } catch (cbErr) {
                        logger.error({
                            timestamp: new Date().toISOString(),
                            event: 'handshake_frame_handler_error',
                            errorMessage: cbErr?.message || String(cbErr),
                            stack: cbErr?.stack
                        }, 'uncaught error in handshake frame handler')
                    }
                }
                else {
                    const decrypted = decrypt(frame)
                    decryptedFrames.push(decrypted)
                }
                size = getBytesSize()
            }

            if (!decryptedFrames.length) {
                return Promise.resolve()
            }

            // Serialize binary decoding & frame dispatch in strict FIFO order while
            // isolating per-frame decode or callback errors from the rest of the stream.
            const task = decodeQueue.then(async () => {
                for (const decrypted of decryptedFrames) {
                    if (isDestroyed) return
                    let decoded
                    try {
                        decoded = await WABinary_1.decodeBinaryNode(decrypted)
                    } catch (decodeErr) {
                        logger.error({
                            timestamp: new Date().toISOString(),
                            event: 'binary_node_decode_error',
                            errorMessage: decodeErr?.message || String(decodeErr),
                            stack: decodeErr?.stack
                        }, 'failed to decode binary node frame')
                        continue
                    }
                    logger.trace({ msg: decoded?.attrs?.id }, 'recv frame')
                    try {
                        onFrame(decoded)
                    } catch (cbErr) {
                        logger.error({
                            timestamp: new Date().toISOString(),
                            event: 'frame_handler_error',
                            tag: decoded?.tag,
                            stanzaId: decoded?.attrs?.id,
                            errorMessage: cbErr?.message || String(cbErr),
                            stack: cbErr?.stack
                        }, 'uncaught error in frame handler')
                    }
                }
            })

            decodeQueue = task.catch(() => { })
            return task
        },
        /**
         * CONNECTION STABILITY: Release all internal state so the noise
         * handler doesn't hold references after disconnect.
         */
        destroy: () => {
            isDestroyed = true
            inBytes = Buffer.alloc(0)
            decodeQueue = Promise.resolve()
        }
    }
}

module.exports = {
  makeNoiseHandler
}