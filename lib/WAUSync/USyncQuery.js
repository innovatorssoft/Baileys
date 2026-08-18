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
                    const parser = protocolMap[protocol] || (protocol === 'side_list' ? protocolMap['sidelist'] : undefined)
                    if (parser) {
                        return [protocol, parser(content)]
                    }
                    else {
                        return [protocol, null]
                    }
                }).filter(([, b]) => b !== null)) : {}
                return { ...data, id }
            })
        }
        const sideListNode = WABinary_1.getBinaryNodeChild(usyncNode, 'side_list') || WABinary_1.getBinaryNodeChild(usyncNode, 'sideList')
        if (Array.isArray(sideListNode?.content) && typeof sideListNode !== 'undefined') {
            queryResult.sideList = sideListNode.content.map((node) => {
                const id = node?.attrs?.jid
                const data = Array.isArray(node?.content) ? Object.fromEntries(node.content.map((content) => {
                    const protocol = content.tag
                    const parser = protocolMap[protocol] || (protocol === 'side_list' ? protocolMap['sidelist'] : undefined)
                    if (parser) {
                        return [protocol, parser(content)]
                    }
                    else {
                        return [protocol, null]
                    }
                }).filter(([, b]) => b !== null)) : {}
                return { ...data, id }
            })
        }
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
    withBusinessProtocol(profileVersion) {
        this.protocols.push(new Protocols_1.USyncBusinessProtocol(profileVersion))
        return this
    }
    withFeatureProtocol(features) {
        this.protocols.push(new Protocols_1.USyncFeatureProtocol(features))
        return this
    }
    withPictureProtocol(type) {
        this.protocols.push(new Protocols_1.USyncPictureProtocol(type))
        return this
    }
    withSidelistProtocol(useLidAddressing) {
        this.protocols.push(new Protocols_1.USyncSidelistProtocol(useLidAddressing))
        return this
    }
    withTextStatusProtocol() {
        this.protocols.push(new Protocols_1.USyncTextStatusProtocol())
        return this
    }
    withProtocol(protocol) {
        this.protocols.push(protocol)
        return this
    }
}

module.exports = {
  USyncQuery
}