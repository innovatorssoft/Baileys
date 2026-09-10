import { SocketConfig, UsernameResolutionResult } from '../Types'
import { BinaryNode } from '../WABinary'

export declare const makeUsernameSocket: (config: SocketConfig) => {
    resolveUsername: (username: string) => Promise<UsernameResolutionResult | null>
    resolveUsernames: (usernames: string[]) => Promise<(UsernameResolutionResult | null)[]>
    onWhatsAppUsername: (...usernames: string[]) => Promise<UsernameResolutionResult[]>
    invalidateUsername: (username: string) => Promise<void>
    refreshUsername: (username: string) => Promise<UsernameResolutionResult | null>
    checkUsername: (username: string, includeSuggestions?: boolean) => Promise<{
        available: boolean
        username: string
        suggestions?: string[]
        rejectionReasons?: string[]
        suggestionsEligible?: boolean
    }>
    checkUsernameMulti: (usernames: string[]) => Promise<any>
    setUsername: (username: string, options?: {
        source?: 'FB' | 'IG' | 'USER_INPUT' | 'SUGGESTION'
        sessionId?: string
        pin?: string
    }) => Promise<any>
    deleteUsername: () => Promise<any>
    getMyUsername: () => Promise<string | null>
    getUsernameRecommendations: (source?: string | null) => Promise<any>
    setUsernamePin: (pin: string | null) => Promise<any>
    findUserByUsername: (username: string, pin?: string) => Promise<{
        jid: string
        contact: boolean
    } | null>
    fetchContactUsernames: (...jids: string[]) => Promise<{
        id: string
        username: string | null
    }[]>
    USERNAME_QUERY_IDS: {
        CHECK: string
        CHECK_MULTI: string
        SET: string
        GET: string
        GET_RECOMMENDATIONS: string
        PIN_SET: string
    }
    USERNAME_CHECK_RESULT: {
        SUCCESS: string
        INVALID: string
    }
    USERNAME_SOURCE: {
        FB: string
        IG: string
        USER_INPUT: string
        SUGGESTION: string
    }
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
    newsletterFetchAllParticipating: () => Promise<{
        [_: string]: import("../Types").NewsletterMetadata
    }>
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
        content: BinaryNode
    }[]>
    groupUpdateDescription: (jid: string, description?: string | undefined) => Promise<void>
    groupInviteCode: (jid: string) => Promise<string | undefined>
    groupRevokeInvite: (jid: string) => Promise<string | undefined>
    groupAcceptInvite: (code: string) => Promise<string | undefined>
    groupRevokeInviteV4: (groupJid: string, invitedJid: string) => Promise<boolean>
    groupAcceptInviteV4: (key: string | import("../Types").WAMessageKey, inviteMessage: import("../Types").WAProto.Message.IGroupInviteMessage) => Promise<string>
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
    fetchPrivacySettings: (force?: boolean) => Promise<{
        [_: string]: string
    }>
    upsertMessage: (msg: import("../Types").WAProto.IWebMessageInfo, type: import("../Types").MessageUpsertType) => Promise<void>
    appPatch: (patchCreate: import("../Types").WAPatchCreate) => Promise<void>
    createCallLink: (type: 'audio' | 'video', event?: number, timeoutMs?: number) => Promise<void>
    sendPresenceUpdate: (type: import("../Types").WAPresence, toJid?: string | undefined, options?: { simulateTyping?: boolean; typingDuration?: number }) => Promise<void>
    presenceSubscribe: (toJid: string, tcToken?: Buffer | undefined) => Promise<void>
    getBotListV2: () => Promise<any>
    getLidUser: (jid: string) => Promise<{
        lid: string
        id: string
    }[] | undefined>
    fetchBlocklist: () => Promise<string[]>
    fetchDisappearingDuration: (...jids: string[]) => Promise<import("../index").USyncQueryResultList[] | undefined>
    fetchStatus: (...jids: string[]) => Promise<import("../index").USyncQueryResultList[] | undefined>
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
    updateDisableLinkPreviewsPrivacy: (isPreviewsDisabled: boolean) => Promise<void>
    getBusinessProfile: (jid: string) => Promise<void | import("../Types").WABusinessProfile>
    resyncAppState: (collections: readonly ("critical_block" | "critical_unblock_low" | "regular_high" | "regular_low" | "regular")[], isInitialSync: boolean) => Promise<void>
    chatModify: (mod: import("../Types").ChatModification, jid: string) => Promise<void>
    cleanDirtyBits: (type: "account_sync" | "groups", fromTimestamp?: string | number | undefined) => Promise<void>
    addChatLabel: (jid: string, labelId: string) => Promise<void>
    removeChatLabel: (jid: string, labelId: string) => Promise<void>
    addMessageLabel: (jid: string, messageId: string, labelId: string) => Promise<void>
    removeMessageLabel: (jid: string, messageId: string, labelId: string) => Promise<void>
    clearMessage: (jid: string, key: import("../Types").WAProto.IMessageKey, timeStamp: number | import("long").Long) => Promise<void>
    star: (jid: string, messages: {
        id: string
        fromMe?: boolean | undefined
    }[], star: boolean) => Promise<void>
    addOrEditQuickReply: (quickReply: import("../Types/Bussines").QuickReplyAction) => Promise<void>
    removeQuickReply: (timestamp: string) => Promise<void>
    addOrEditContact: (jid: string, contact: import("../Types").ContactAction) => Promise<void>
    removeContact: (jid: string) => Promise<void>
    executeUSyncQuery: (usyncQuery: import("../index").USyncQuery) => Promise<import("../index").USyncQueryResult | undefined>
    type: "md"
    ws: any
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
    onUnexpectedError: (err: Error | import("@hapi/boom").Boom<any>, msg: string) => void
    uploadPreKeys: (count?: number) => Promise<void>
    uploadPreKeysToServerIfRequired: () => Promise<void>
    requestPairingCode: (phoneNumber: string, code?: string) => Promise<string>
    waitForConnectionUpdate: (check: (u: Partial<import("../Types").ConnectionState>) => boolean | undefined, timeoutMs?: number | undefined) => Promise<void>
    sendWAMBuffer: (wamBuffer: Buffer) => Promise<BinaryNode>
}
