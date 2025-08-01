import { UserFacingSocketConfig, ContactAction } from '../Types'

declare const makeWASocket: (config: UserFacingSocketConfig) => {
    logger: import("../Utils/logger").ILogger
    getOrderDetails: (orderId: string, tokenBase64: string) => Promise<import("../Types").OrderDetails>
    getCatalog: ({ jid, limit, cursor }: import("../Types").GetCatalogOptions) => Promise<{
        products: import("../Types").Product[]
        nextPageCursor: string | undefined
    }>
    getCollections: (jid?: string | undefined, limit?: number) => Promise<{
        collections: import("../Types").CatalogCollection[]
    }>
    productCreate: (create: import("../Types").ProductCreate) => Promise<import("../Types").Product>
    productDelete: (productIds: string[]) => Promise<{
        deleted: number
    }>
    productUpdate: (productId: string, update: import("../Types").ProductUpdate) => Promise<import("../Types").Product>
    sendMessageAck: ({ tag, attrs, content }: import("..").BinaryNode, errorCode?: number | undefined) => Promise<void>
    sendRetryRequest: (node: import("..").BinaryNode, forceIncludeKeys?: boolean) => Promise<void>
    offerCall: (toJid: string, isVideo?: boolean) => Promise<{
        id: any
        to: string
    }>
    rejectCall: (callId: string, callFrom: string) => Promise<void>
    fetchMessageHistory: (count: number, oldestMsgKey: import("../Types").WAProto.IMessageKey, oldestMsgTimestamp: number | import("long").Long) => Promise<string>
    requestPlaceholderResend: (messageKey: import("../Types").WAProto.IMessageKey) => Promise<string | undefined>
    getPrivacyTokens: (jids: string[]) => Promise<import("..").BinaryNode>
    assertSessions: (jids: string[], force: boolean) => Promise<boolean>
    relayMessage: (jid: string, message: import("../Types").WAProto.IMessage, { messageId: msgId, participant, additionalAttributes, additionalNodes, useUserDevicesCache, useCachedGroupMetadata, statusJidList }: import("../Types").MessageRelayOptions) => Promise<string>
    sendReceipt: (jid: string, participant: string | undefined, messageIds: string[], type: import("../Types").MessageReceiptType) => Promise<void>
    sendReceipts: (keys: import("../Types").WAProto.IMessageKey[], type: import("../Types").MessageReceiptType) => Promise<void>
    readMessages: (keys: import("../Types").WAProto.IMessageKey[]) => Promise<void>
    refreshMediaConn: (forceGet?: boolean) => Promise<import("../Types").MediaConnInfo>
    waUploadToServer: import("../Types").WAMediaUploadFunction
    fetchPrivacySettings: (force?: boolean) => Promise<{
        [_: string]: string
    }>
    sendPeerDataOperationMessage: (pdoMessage: import("../Types").WAProto.Message.IPeerDataOperationRequestMessage) => Promise<string>
    createParticipantNodes: (jids: string[], message: import("../Types").WAProto.IMessage, extraAttrs?: {
        [key: string]: string
    } | undefined) => Promise<{
        nodes: import("..").BinaryNode[]
        shouldIncludeDeviceIdentity: boolean
    }>
    profilePictureUrl: (jids: string) => Promise<string>
    getUSyncDevices: (jids: string[], useCache: boolean, ignoreZeroDevices: boolean) => Promise<import("..").JidWithDevice[]>
    getEphemeralGroup: (jid: string) => Promise<number>
    updateMediaMessage: (message: import("../Types").WAProto.IWebMessageInfo) => Promise<import("../Types").WAProto.IWebMessageInfo>
    sendStatusMentions: (content: import("../Types").WAProto.IMessage, jid: string, Private?: boolean) => Promise<string>
    sendAlbumMessage: (jid: string, medias: import("../Types").WAProto.IMessage, options?: import("../Types").MiscMessageGenerationOptions) => Promise<string>
    sendMessage: (jid: string, content: import("../Types").AnyMessageContent, options?: import("../Types").MiscMessageGenerationOptions) => Promise<import("../Types").WAProto.WebMessageInfo | undefined>
    subscribeNewsletterUpdates: (jid: string) => Promise<{
        duration: string
    }>
    newsletterReactionMode: (jid: string, mode: import("../Types").NewsletterReactionMode) => Promise<void>
    newsletterUpdateDescription: (jid: string, description?: string | undefined) => Promise<void>
    newsletterUpdateName: (jid: string, name: string) => Promise<void>
    newsletterUpdatePicture: (jid: string, content: import("../Types").WAMediaUpload) => Promise<void>
    newsletterRemovePicture: (jid: string) => Promise<void>
    newsletterUnfollow: (jid: string) => Promise<void>
    newsletterFollow: (jid: string) => Promise<void>
    newsletterUnmute: (jid: string) => Promise<void>
    newsletterMute: (jid: string) => Promise<void>
    newsletterCreate: (name: string, description?: string, picture?: import("../Types").WAMediaUpload) => Promise<import("../Types").NewsletterMetadata>
    newsletterQuery: (jid: string, type: string, content: BinaryNode) => Promise<BinaryNode>
    newsletterWMexQuery: (jid?: string | undefined, query_id: number, content: BinaryNode) => Promise<BinaryNode>
    newsletterMetadata: (type: "invite" | "jid", key: string, role?: import("../Types").NewsletterViewRole | undefined) => Promise<import("../Types").NewsletterMetadata>
    newsletterAdminCount: (jid: string) => Promise<number>
    newsletterChangeOwner: (jid: string, userLid: string) => Promise<void>
    newsletterDemote: (jid: string, userLid: string) => Promise<void>
    newsletterDelete: (jid: string) => Promise<void>
    newsletterReactMessage: (jid: string, server_id: string, code?: string | undefined) => Promise<void>
    newsletterFetchMessages: (type: "invite" | "jid", key: string, count: number, after?: number | undefined) => Promise<import("../Types").NewsletterFetchedUpdate[]>
    newsletterFetchUpdates: (jid: string, count: number, after?: number | undefined, since?: number | undefined) => Promise<import("../Types").NewsletterFetchedUpdate[]>
    groupQuery: (jid: string, type: string, content: BinaryNode) => Promise<BinaryNode>
    groupMetadata: (jid: string) => Promise<import("../Types").GroupMetadata>
    groupCreate: (subject: string, participants: string[]) => Promise<import("../Types").GroupMetadata>
    groupLeave: (id: string) => Promise<void>
    groupUpdateSubject: (jid: string, subject: string) => Promise<void>
    groupRequestParticipantsList: (jid: string) => Promise<{
        [key: string]: string
    }[]>
    groupRequestParticipantsUpdate: (jid: string, participants: string[], action: "reject" | "approve") => Promise<{
        status: string
        jid: string
    }[]>
    groupParticipantsUpdate: (jid: string, participants: string[], action: import("../Types").ParticipantAction) => Promise<{
        status: string
        jid: string
        content: import("..").BinaryNode
    }[]>
    groupUpdateDescription: (jid: string, description?: string | undefined) => Promise<void>
    groupInviteCode: (jid: string) => Promise<string | undefined>
    groupRevokeInvite: (jid: string) => Promise<string | undefined>
    groupAcceptInvite: (code: string) => Promise<string | undefined>
    groupRevokeInviteV4: (groupJid: string, invitedJid: string) => Promise<boolean>
    groupAcceptInviteV4: (key: string | import("../Types").WAProto.IMessageKey, inviteMessage: import("../Types").WAProto.Message.IGroupInviteMessage) => Promise<string>
    groupGetInviteInfo: (code: string) => Promise<import("../Types").GroupMetadata>
    groupToggleEphemeral: (jid: string, ephemeralExpiration: number) => Promise<void>
    groupSettingUpdate: (jid: string, setting: "announcement" | "locked" | "not_announcement" | "unlocked") => Promise<void>
    groupMemberAddMode: (jid: string, mode: "all_member_add" | "admin_add") => Promise<void>
    groupJoinApprovalMode: (jid: string, mode: "on" | "off") => Promise<void>
    groupFetchAllParticipating: () => Promise<{
        [_: string]: import("../Types").GroupMetadata
    }>
    processingMutex: {
        mutex<T>(code: () => T | Promise<T>): Promise<T>
    }
    upsertMessage: (msg: import("../Types").WAProto.IWebMessageInfo, type: import("../Types").MessageUpsertType) => Promise<void>
    appPatch: (patchCreate: import("../Types").WAPatchCreate) => Promise<void>
    sendPresenceUpdate: (type: import("../Types").WAPresence, toJid?: string | undefined) => Promise<void>
    presenceSubscribe: (toJid: string, tcToken?: Buffer | undefined) => Promise<void>    
    getBotListV2: () => Promise<BotListInfo[]>
    getLidUser: (jid: string) => Promise<{
    	lid: string
        id: string
    }[] | undefined>
    onWhatsApp: (...jids: string[]) => Promise<{
        jid: string
        exists: unknown
    }[] | undefined>
    fetchBlocklist: () => Promise<string[]>
    fetchStatus: (...jids: string[]) => Promise<import("..").USyncQueryResultList[] | undefined>
    fetchDisappearingDuration: (...jids: string[]) => Promise<import("..").USyncQueryResultList[] | undefined>
    updateProfilePicture: (jid: string, content: import("../Types").WAMediaUpload) => Promise<void>
    removeProfilePicture: (jid: string) => Promise<void>
    updateProfileStatus: (status: string) => Promise<void>
    updateProfileName: (name: string) => Promise<void>
    updateBlockStatus: (jid: string, action: "block" | "unblock") => Promise<void>
    updateCallPrivacy: (value: import("../Types").WAPrivacyCallValue) => Promise<void>
    updateLastSeenPrivacy: (value: import("../Types").WAPrivacyValue) => Promise<void>
    updateOnlinePrivacy: (value: import("../Types").WAPrivacyOnlineValue) => Promise<void>
    updateProfilePicturePrivacy: (value: import("../Types").WAPrivacyValue) => Promise<void>
    updateStatusPrivacy: (value: import("../Types").WAPrivacyValue) => Promise<void>
    updateReadReceiptsPrivacy: (value: import("../Types").WAReadReceiptsValue) => Promise<void>
    updateGroupsAddPrivacy: (value: import("../Types").WAPrivacyGroupAddValue) => Promise<void>
    updateDefaultDisappearingMode: (duration: number) => Promise<void>
    getBusinessProfile: (jid: string) => Promise<void | import("../Types").WABusinessProfile>
    resyncAppState: (collections: readonly ("critical_block" | "critical_unblock_low" | "regular_high" | "regular_low" | "regular")[], isInitialSync: boolean) => Promise<void>
    chatModify: (mod: import("../Types").ChatModification, jid: string) => Promise<void>
    cleanDirtyBits: (type: "account_sync" | "groups", fromTimestamp?: string | number | undefined) => Promise<void>
    addLabel: (jid: string, labels: import("../Types/Label").LabelActionBody) => Promise<void>
    addChatLabel: (jid: string, labelId: string) => Promise<void>
    removeChatLabel: (jid: string, labelId: string) => Promise<void>
    addMessageLabel: (jid: string, messageId: string, labelId: string) => Promise<void>
    removeMessageLabel: (jid: string, messageId: string, labelId: string) => Promise<void>
    clearMessage: (jid: string, key: import("../Types").WAProto.IMessageKey, timeStamp: number | import("long").Long) => Promise<void>
    star: (jid: string, messages: {
        id: string
        fromMe?: boolean | undefined
    }[], star: boolean) => Promise<void>
    addOrEditContact: (jid: string, contact: ContactAction) => Promise<void>
    removeContact: (jid: string) => Promise<void>
    executeUSyncQuery: (usyncQuery: import("..").USyncQuery) => Promise<import("..").USyncQueryResult | undefined>
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
    query: (node: import("..").BinaryNode, timeoutMs?: number | undefined) => Promise<import("..").BinaryNode>
    waitForMessage: <T_2>(msgId: string, timeoutMs?: number | undefined) => Promise<T_2>
    waitForSocketOpen: () => Promise<void>
    sendRawMessage: (data: Uint8Array | Buffer) => Promise<void>
    sendNode: (frame: import("..").BinaryNode) => Promise<void>
    logout: (msg?: string | undefined) => Promise<void>
    end: (error: Error | undefined) => void
    onUnexpectedError: (err: Error | import("@hapi/boom").Boom<any>, msg: string) => void
    uploadPreKeys: (count?: number) => Promise<void>
    uploadPreKeysToServerIfRequired: () => Promise<void>
    requestPairingCode: (phoneNumber: string, code?: string) => Promise<string>
    waitForConnectionUpdate: (check: (u: Partial<import("../Types").ConnectionState>) => boolean | undefined, timeoutMs?: number | undefined) => Promise<void>
    sendWAMBuffer: (wamBuffer: Buffer) => Promise<import("..").BinaryNode>
}

export default makeWASocket