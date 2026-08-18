import { proto } from '../../WAProto'
import { GroupMetadata, ParticipantAction, SocketConfig, ContactAction } from '../Types'
import { BinaryNode } from '../WABinary'

export declare const makeCommunitiesSocket: (config: SocketConfig) => {
    communityQuery: (jid: string, type: string, content: BinaryNode) => Promise<BinaryNode>
    communityMetadata: (jid: string) => Promise<GroupMetadata>
    communityCreate: (subject: string, participants: string[]) => Promise<GroupMetadata>
    communityCreateGroup: (subject: string, participants: string[], parentCommunityJid: string) => Promise<GroupMetadata>
    communityLinkGroup: (groupJid: string, parentCommunityJid: string) => Promise<void>
    communityUnlinkGroup: (groupJid: string, parentCommunityJid: string) => Promise<void>
    communityFetchLinkedGroups: (jid: string) => Promise<{ communityJid: string; isCommunity: boolean; linkedGroups: any[] }>
    communityLeave: (id: string) => Promise<void>
    communityUpdateSubject: (jid: string, subject: string) => Promise<void>
    communityRequestParticipantsList: (jid: string) => Promise<{
        [key: string]: string
    }[]>
    communityRequestParticipantsUpdate: (jid: string, participants: string[], action: 'approve' | 'reject') => Promise<{
        status: string
        jid: string
    }[]>
    communityParticipantsUpdate: (jid: string, participants: string[], action: ParticipantAction) => Promise<{
        status: string
        jid: string
        content: BinaryNode
    }[]>
    communityUpdateDescription: (jid: string, description?: string) => Promise<void>
    communityInviteCode: (jid: string) => Promise<string | undefined>
    communityRevokeInvite: (jid: string) => Promise<string | undefined>
    communityAcceptInvite: (code: string) => Promise<string | undefined>
    /**
     * revoke a v4 invite for someone
     * @param communityJid community jid
     * @param invitedJid jid of person you invited
     * @returns true if successful
     */
    communityRevokeInviteV4: (communityJid: string, invitedJid: string) => Promise<boolean>
    /**
     * accept a GroupInviteMessage
     * @param key the key of the invite message, or optionally only provide the jid of the person who sent the invite
     * @param inviteMessage the message to accept
     */
    communityAcceptInviteV4: (key: string | proto.IMessageKey, inviteMessage: proto.Message.IGroupInviteMessage) => Promise<string>
    communityGetInviteInfo: (code: string) => Promise<GroupMetadata>
    communityToggleEphemeral: (jid: string, ephemeralExpiration: number) => Promise<void>
    communitySettingUpdate: (jid: string, setting: 'announcement' | 'not_announcement' | 'locked' | 'unlocked') => Promise<void>
    communityMemberAddMode: (jid: string, mode: 'admin_add' | 'all_member_add') => Promise<void>
    communityJoinApprovalMode: (jid: string, mode: 'on' | 'off') => Promise<void>
    communityFetchAllParticipating: () => Promise<{
        [_: string]: GroupMetadata
    }>
    processingMutex: {
        mutex<T>(code: () => T | Promise<T>): Promise<T>
    }
    fetchPrivacySettings: (force?: boolean) => Promise<{
        [_: string]: string
    }>
    upsertMessage: (msg: proto.IWebMessageInfo, type: import("../Types").MessageUpsertType) => Promise<void>
    appPatch: (patchCreate: import("../Types").WAPatchCreate) => Promise<void>
    sendPresenceUpdate: (type: import("../Types").WAPresence, toJid?: string | undefined, options?: { simulateTyping?: boolean; typingDuration?: number }) => Promise<void>
    presenceSubscribe: (toJid: string, tcToken?: Buffer | undefined) => Promise<void>    
    getLidUser: (jid: string) => Promise<{
    	lid: string
        id: string
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
    updatecommunitysAddPrivacy: (value: import("../Types").WAPrivacycommunityAddValue) => Promise<void>
    updateDefaultDisappearingMode: (duration: number) => Promise<void>
    updateDisableLinkPreviewsPrivacy: (isPreviewsDisabled: boolean) => Promise<void>
    getBusinessProfile: (jid: string) => Promise<void | import("../Types").WABusinessProfile>
    resyncAppState: (collections: readonly ("critical_block" | "critical_unblock_low" | "regular_high" | "regular_low" | "regular")[], isInitialSync: boolean) => Promise<void>
    chatModify: (mod: import("../Types").ChatModification, jid: string) => Promise<void>
    cleanDirtyBits: (type: "account_sync" | "communitys", fromTimestamp?: string | number | undefined) => Promise<void>
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
    addOrEditQuickReply: (quickReply: import("../Types/Bussines").QuickReplyAction) => Promise<void>
    removeQuickReply: (timestamp: string) => Promise<void>
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

export declare const extractCommunityMetadata: (result: BinaryNode) => GroupMetadata