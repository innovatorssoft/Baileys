"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

const generics_1 = require("../../Utils/generics")
const sender_key_state_1 = require("./sender-key-state")

class SenderKeyRecord {
    constructor(serialized) {
        this.MAX_STATES = 5
        this.senderKeyStates = []
        if (serialized) {
            for (const structure of serialized) {
                this.senderKeyStates.push(new sender_key_state_1.SenderKeyState(null, null, null, null, null, null, structure))
            }
        }
    }
    isEmpty() {
        return this.senderKeyStates.length === 0
    }
    getSenderKeyState(keyId) {
        if (keyId === undefined && this.senderKeyStates.length) {
            return this.senderKeyStates[this.senderKeyStates.length - 1]
        }
        for (let i = this.senderKeyStates.length - 1; i >= 0; i--) {
            if (this.senderKeyStates[i].getKeyId() === keyId) {
                return this.senderKeyStates[i]
            }
        }
        return undefined
    }
    addSenderKeyState(id, iteration, chainKey, signatureKey) {
        const existingIdx = this.senderKeyStates.findIndex(state => state.getKeyId() === id)
        if (existingIdx !== -1) {
            const existingState = this.senderKeyStates[existingIdx]
            const existingIteration = existingState.getSenderChainKey().getIteration()
            if (existingIteration >= (iteration || 0)) {
                // Duplicate or delayed distribution message for an already-established or advanced chain:
                // preserve the existing advanced chain state and move it to the most-recent slot.
                this.senderKeyStates.splice(existingIdx, 1)
                this.senderKeyStates.push(existingState)
                return
            }
            // Newer iteration for the same keyId: preserve any cached out-of-order message keys
            const prevMsgKeys = Array.isArray(existingState.senderKeyStateStructure?.senderMessageKeys)
                ? existingState.senderKeyStateStructure.senderMessageKeys
                : []
            const updatedState = new sender_key_state_1.SenderKeyState(id, iteration, chainKey, null, signatureKey)
            if (prevMsgKeys.length > 0 && updatedState.senderKeyStateStructure) {
                updatedState.senderKeyStateStructure.senderMessageKeys = prevMsgKeys.slice(-updatedState.MAX_MESSAGE_KEYS)
            }
            this.senderKeyStates.splice(existingIdx, 1)
            this.senderKeyStates.push(updatedState)
            return
        }
        this.senderKeyStates.push(new sender_key_state_1.SenderKeyState(id, iteration, chainKey, null, signatureKey))
        if (this.senderKeyStates.length > this.MAX_STATES) {
            this.senderKeyStates.shift()
        }
    }
    setSenderKeyState(id, iteration, chainKey, keyPair) {
        this.senderKeyStates.length = 0
        this.senderKeyStates.push(new sender_key_state_1.SenderKeyState(id, iteration, chainKey, keyPair))
    }
    serialize() {
        return this.senderKeyStates.map(state => state.getStructure())
    }
    static deserialize(data) {
        let parsed
        if (typeof data === 'string') {
            parsed = JSON.parse(data, generics_1.BufferJSON.reviver)
        }
        else if (data instanceof Uint8Array) {
            const str = Buffer.from(data).toString('utf-8')
            parsed = JSON.parse(str, generics_1.BufferJSON.reviver)
        }
        else {
            parsed = data
        }
        return new SenderKeyRecord(parsed)
    }
}

module.exports = {
  SenderKeyRecord
}