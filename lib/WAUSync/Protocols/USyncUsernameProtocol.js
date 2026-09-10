"use strict"

Object.defineProperty(exports, "__esModule", { value: true })
exports.USyncUsernameProtocol = void 0

const WABinary_1 = require("../../WABinary")

class USyncUsernameProtocol {
    constructor() {
        this.name = 'username'
    }
    getQueryElement() {
        return {
            tag: 'username',
            attrs: {}
        }
    }
    getUserElement(user) {
        if (user.username) {
            return {
                tag: 'username',
                attrs: {
                    ...(user.usernameKey ? { pin: user.usernameKey } : {})
                },
                content: user.username
            }
        }
        return null
    }
    parser(node) {
        if (node.tag === 'username') {
            const errNode = WABinary_1.getBinaryNodeChild(node, 'error')
            if (errNode) {
                return null
            }
            WABinary_1.assertNodeErrorFree(node)
            const content = node.content
            if (Buffer.isBuffer(content) || content instanceof Uint8Array) return Buffer.from(content).toString('utf-8')
            if (typeof content === 'string') return content
            if (node.attrs?.val) return node.attrs.val
            if (node.attrs?.username) return node.attrs.username
            return null
        }
        return null
    }
}

exports.USyncUsernameProtocol = USyncUsernameProtocol
module.exports = {
    USyncUsernameProtocol
}
