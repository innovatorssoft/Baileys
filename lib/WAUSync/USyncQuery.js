"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

const WABinary_1 = require("../WABinary")
const Protocols_1 = require("./Protocols")

class USyncQuery {
    constructor() {
        this.protocols = []
        this.users = []
        this.context = 'interactive'
        this.mode = 'query'
    }
    withMode(mode) {
        this.mode = mode
        return this
    }
    withContext(context) {
        this.context = context
        return this
    }
    withUser(user) {
        this.users.push(user)
        return this
    }
    parseUSyncQueryResult(result) {
        if (result?.attrs?.type !== 'result') {
            return
        }
        const protocolMap = Object.fromEntries(this.protocols.map((protocol) => {
            return [protocol.name, protocol.parser]
        }))
        const queryResult = {
            // TODO: implement errors etc.
            list: [],
            sideList: [],
        }
        const usyncNode = WABinary_1.getBinaryNodeChild(result, 'usync')
        //TODO: implement error backoff, refresh etc.
        //TODO: see if there are any errors in the result node
        //const resultNode = getBinaryNodeChild(usyncNode, 'result')
        const listNode = WABinary_1.getBinaryNodeChild(usyncNode, 'list')
        if (Array.isArray(listNode?.content) && typeof listNode !== 'undefined') {
            queryResult.list = listNode.content.map((node) => {
                const id = node?.attrs?.jid
                const data = Array.isArray(node?.content) ? Object.fromEntries(node.content.map((content) => {
                    const protocol = content.tag
                    const parser = protocolMap[protocol]
                    if (parser) {
                        return [protocol, parser(content)]
                    }
                    else {
                        return [protocol, null]
                    }
                }).filter(([, b]) => b !== null)) : {}
                const errNode = Array.isArray(node?.content) ? node.content.find(c => c?.tag === 'error') : undefined
                const error = errNode?.attrs
                let rawLid = node?.attrs?.lid || data?.lid
                let lid = rawLid ? (rawLid.includes('@') ? rawLid : `${rawLid}@lid`) : undefined
                if (!lid && id && WABinary_1.isLidUser(id)) {
                    lid = id
                }

                let rawPn = node?.attrs?.pn_jid || node?.attrs?.pn || node?.attrs?.phone_number || node?.attrs?.phone
                if (!rawPn && Array.isArray(node?.content)) {
                    for (const child of node.content) {
                        const childPn = child?.attrs?.phone_number || child?.attrs?.pn || child?.attrs?.pn_jid || child?.attrs?.phone
                        if (childPn) {
                            rawPn = childPn
                            break
                        }
                        if (child?.tag === 'contact' && child?.attrs?.jid && WABinary_1.isJidUser(child.attrs.jid)) {
                            rawPn = child.attrs.jid
                            break
                        }
                    }
                }
                if (!rawPn && id && WABinary_1.isJidUser(id)) {
                    rawPn = id
                }
                const pn = rawPn ? (0, WABinary_1.jidNormalizedUser)(rawPn.includes('@') ? rawPn : `${rawPn}@s.whatsapp.net`) : undefined

                return {
                    ...data,
                    id,
                    ...(lid ? { lid } : {}),
                    ...(pn ? { pn } : {}),
                    ...(error ? { error } : {})
                }
            })
        }
        //TODO: implement side list
        //const sideListNode = getBinaryNodeChild(usyncNode, 'side_list')
        return queryResult
    }
    withLIDProtocol() {
    	this.protocols.push(new Protocols_1.USyncLIDProtocol()) 
        return this
    }
    withDeviceProtocol() {
        this.protocols.push(new Protocols_1.USyncDeviceProtocol())
        return this
    }
    withContactProtocol() {
        this.protocols.push(new Protocols_1.USyncContactProtocol())
        return this
    }
    withStatusProtocol() {
        this.protocols.push(new Protocols_1.USyncStatusProtocol())
        return this
    }
    withBotProfileProtocol() {
    	this.protocols.push(new Protocols_1.USyncBotProfileProtocol())
        return this
    }
    withDisappearingModeProtocol() {
        this.protocols.push(new Protocols_1.USyncDisappearingModeProtocol())
        return this
    }
    withUsernameProtocol() {
        this.protocols.push(new Protocols_1.USyncUsernameProtocol())
        return this
    }
}

module.exports = {
  USyncQuery
}