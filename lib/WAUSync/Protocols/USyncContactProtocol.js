"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

const WABinary_1 = require("../../WABinary")

class USyncContactProtocol {
    constructor() {
        this.name = 'contact'
    }
    getQueryElement() {
        return {
            tag: 'contact',
            attrs: {},
        }
    }
    getUserElement(user) {
        if (user.phone) {
            return {
                tag: 'contact',
                attrs: {},
                content: user.phone
            }
        }
        if (user.username) {
            return {
                tag: 'contact',
                attrs: {
                    username: user.username,
                    ...(user.usernameKey ? { pin: user.usernameKey } : {}),
                    ...(user.lid ? { lid: user.lid } : {})
                }
            }
        }
        if (user.type) {
            return {
                tag: 'contact',
                attrs: {
                    type: user.type
                }
            }
        }
        return null
    }
    parser(node) {
        if (node.tag === 'contact') {
            WABinary_1.assertNodeErrorFree(node)
            return node?.attrs?.type === 'in'
        }
        return false
    }
}

module.exports = {
  USyncContactProtocol
}