import { Boom } from '@hapi/boom'
import { proto } from '../../WAProto'
import { BotListInfo, ChatModification, ContactAction, MessageUpsertType, SocketConfig, WABusinessProfile, WAMediaUpload, WAPatchCreate, WAPresence, WAPrivacyCallValue, WAPrivacyGroupAddValue, WAPrivacyMessagesValue, WAPrivacyOnlineValue, WAPrivacyValue, WAReadReceiptsValue } from '../Types'
import { LabelActionBody } from '../Types/Label'
import { QuickReplyAction } from '../Types/Bussines'
import { BinaryNode } from '../WABinary'
import { USyncQuery } from '../WAUSync'

export declare const makeChatsSocket: (config: SocketConfig) => {
    processingMutex: {
        mutex<T>(code: () => T | Promise<T>): Promise<T>
    }
    fetchPrivacySettings: (force?: boolean) => Promise<{
        [_: string]: string
    }>
    upsertMessage: (msg: proto.IWebMessageInfo, type: MessageUpsertType) => Promise<void>
    appPatch: (patchCreate: WAPatchCreate) => Promise<void>
    createCallLink: (type: 'audio' | 'video', event?: number, timeoutMs?: number) => Promise<void>
    sendPresenceUpdate: (type: WAPresence, toJid?: string, options?: { simulateTyping?: boolean; typingDuration?: number }) => Promise<void>
    presenceSubscribe: (toJid: string, tcToken?: Buffer) => Promise<void>
    getBotListV2: () => Promise<BotListInfo[]>
    getLidUser: (jid: string) => Promise<{
    	lid: string
        id: string
    }[] | undefined>
    fetchBlocklist: () => Promise<string[]>
    fetchStatus: (...jids: string[]) => Promise<import("../WAUSync").USyncQueryResultList[] | undefined>
    fetchDisappearingDuration: (...jids: string[]) => Promise<import("../WAUSync").USyncQueryResultList[] | undefined>
    updateProfilePicture: (jid: string, content: WAMediaUpload) => Promise<void>
    updatePanoramaProfilePicture: (jid: string, content: WAMediaUpload, options?: { maxWidth?: number; quality?: number }) => Promise<void>
    removeProfilePicture: (jid: string) => Promise<void>
    updateProfileStatus: (status: string) => Promise<void>
    updateProfileName: (name: string) => Promise<void>
    updateBlockStatus: (jid: string, action: 'block' | 'unblock') => Promise<void>
    updateCallPrivacy: (value: WAPrivacyCallValue) => Promise<void>
    updateMessagesPrivacy: (value: WAPrivacyMessagesValue) => Promise<void>
    updateLastSeenPrivacy: (value: WAPrivacyValue) => Promise<void>
    updateOnlinePrivacy: (value: WAPrivacyOnlineValue) => Promise<void>
    updateProfilePicturePrivacy: (value: WAPrivacyValue) => Promise<void>
    updateStatusPrivacy: (value: WAPrivacyValue) => Promise<void>
    updateReadReceiptsPrivacy: (value: WAReadReceiptsValue) => Promise<void>
    updateGroupsAddPrivacy: (value: WAPrivacyGroupAddValue) => Promise<void>
    updateDefaultDisappearingMode: (duration: number) => Promise<void>
    updateDisableLinkPreviewsPrivacy: (isPreviewsDisabled: boolean) => Promise<void>
    getBusinessProfile: (jid: string) => Promise<WABusinessProfile | void>
    resyncAppState: (collections: readonly ("critical_block" | "critical_unblock_low" | "regular_high" | "regular_low" | "regular")[], isInitialSync: boolean) => Promise<void>
    chatModify: (mod: ChatModification, jid: string) => Promise<void>
    cleanDirtyBits: (type: 'account_sync' | 'groups', fromTimestamp?: number | string) => Promise<void>
    addLabel: (jid: string, labels: LabelActionBody) => Promise<void>
    addChatLabel: (jid: string, labelId: string) => Promise<void>
    removeChatLabel: (jid: string, labelId: string) => Promise<void>
    addMessageLabel: (jid: string, messageId: string, labelId: string) => Promise<void>
    removeMessageLabel: (jid: string, messageId: string, labelId: string) => Promise<void>
    clearMessage: (jid: string, key: import("../Types").WAProto.IMessageKey, timeStamp: number | import("long").Long) => Promise<void>
    star: (jid: string, messages: {
        id: string
        fromMe?: boolean
    }[], star: boolean) => Promise<void>
    addOrEditQuickReply: (quickReply: QuickReplyAction) => Promise<void>
    removeQuickReply: (timestamp: string) => Promise<void>
    fetchBroadcastListQuota: () => Promise<any>
    getChatBlockingStatus: () => Promise<'blocked' | 'unblocked' | undefined>
    updateChatBlockingStatus: (action: 'block' | 'unblock') => Promise<'blocked' | 'unblocked' | undefined>
    getUserDisclosures: (t?: number) => Promise<Array<Record<string, string>>>
    acceptTosNotice: (noticeId: string, result?: string | number) => Promise<void>
    reportSpam: (jid: string, messages?: Array<{ id: string; from: string; t: number }>, spamFlow?: string, subject?: string) => Promise<void>
    getOptOutList: () => Promise<BinaryNode>
    signPrivateCredential: (blindedCredential: Buffer) => Promise<Buffer | undefined>
    getPushConfig: () => Promise<BinaryNode | undefined>
    setPushConfig: (config: Record<string, string>) => Promise<void>
    toggleCallLinkWaitingRoom: (linkToken: string, enabled: boolean, media?: string) => Promise<any>
    updateBioPrivacy: (value: WAPrivacyValue) => Promise<void>
    blockBot: (botJid: string) => Promise<void>
    unblockBot: (botJid: string) => Promise<void>
    getBotProfile: (botJid: string) => Promise<any>
    fetchABProps: (protocol?: string, hash?: string, refreshId?: string | null, group?: string | null) => Promise<Record<string, string>>
    removeCompanionDevice: (jid: string, reason?: string) => Promise<void>
    updateKeyIndexList: (ts: number | string, content: Buffer) => Promise<void>
    sendKeyIndexList: () => Promise<void>
    fetchMediaConn: (lastId?: string | null) => Promise<BinaryNode | null>
    deleteBroadcastList: (listId: string) => Promise<void>
    fetchQRCode: (code: string, addressingMode?: 'lid' | null) => Promise<BinaryNode | null>
    confirmDeviceLogout: (id: string | number, approve?: boolean) => Promise<void>
    findUserId: (pnLid: string) => Promise<{ lid?: string; phoneNumber?: string }>
    addOrEditContact: (jid: string, contact: ContactAction) => Promise<void>
    removeContact: (jid: string) => Promise<void>
    executeUSyncQuery: (usyncQuery: USyncQuery) => Promise<import("../WAUSync").USyncQueryResult | undefined>
    type: "md"
    ws: import("./Client").WebSocketClient
    ev: import("../Types").BaileysEventEmitter & {
        process(handler: (events: Partial<import("../Types").BaileysEventMap>) => void | Promise<void>): () => void
        buffer(): void
        createBufferedFunction<A extends any[], T_1>(work: (...args: A) => Promise<T_1>): (...args: A) => Promise<T_1>
        flush(force?: boolean | undefined): boolean
        isBuffering(): boolean
    }
    authState: {
        creds: import("../Types").AuthenticationCreds
        keys: import("../Types").SignalKeyStoreWithTransaction
    }
    signalRepository: import("../Types").SignalRepository
    user: import("../Types").Contact | undefined
    generateMessageTag: () => string
    query: (node: BinaryNode, timeoutMs?: number | undefined) => Promise<BinaryNode>
    waitForMessage: <T_2>(msgId: string, timeoutMs?: number | undefined) => Promise<T_2>
    waitForSocketOpen: () => Promise<void>
    sendRawMessage: (data: Uint8Array | Buffer) => Promise<void>
    sendNode: (frame: BinaryNode) => Promise<void>
    logout: (msg?: string | undefined) => Promise<void>
    end: (error: Error | undefined) => void
    onUnexpectedError: (err: Error | Boom<any>, msg: string) => void
    uploadPreKeys: (count?: number) => Promise<void>
    uploadPreKeysToServerIfRequired: () => Promise<void>
    requestPairingCode: (phoneNumber: string, code?: string) => Promise<string>
    waitForConnectionUpdate: (check: (u: Partial<import("../Types").ConnectionState>) => boolean | undefined, timeoutMs?: number | undefined) => Promise<void>
    /**
     * modify a chat -- mark unread, read etc.
     * lastMessages must be sorted in reverse chronologically
     * requires the last messages till the last message received required for archive & unread
    */
    sendWAMBuffer: (wamBuffer: Buffer) => Promise<BinaryNode>
}