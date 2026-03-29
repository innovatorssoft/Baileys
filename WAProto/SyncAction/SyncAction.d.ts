import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace SyncAction. */
export namespace SyncAction {

    /** Properties of a PatchDebugData. */
    interface IPatchDebugData {

        /** PatchDebugData currentLthash */
        currentLthash?: (Uint8Array|null);

        /** PatchDebugData newLthash */
        newLthash?: (Uint8Array|null);

        /** PatchDebugData patchVersion */
        patchVersion?: (Uint8Array|null);

        /** PatchDebugData collectionName */
        collectionName?: (Uint8Array|null);

        /** PatchDebugData firstFourBytesFromAHashOfSnapshotMacKey */
        firstFourBytesFromAHashOfSnapshotMacKey?: (Uint8Array|null);

        /** PatchDebugData newLthashSubtract */
        newLthashSubtract?: (Uint8Array|null);

        /** PatchDebugData numberAdd */
        numberAdd?: (number|null);

        /** PatchDebugData numberRemove */
        numberRemove?: (number|null);

        /** PatchDebugData numberOverride */
        numberOverride?: (number|null);

        /** PatchDebugData senderPlatform */
        senderPlatform?: (SyncAction.PatchDebugData.Platform|null);

        /** PatchDebugData isSenderPrimary */
        isSenderPrimary?: (boolean|null);
    }

    /** Represents a PatchDebugData. */
    class PatchDebugData implements IPatchDebugData {

        /**
         * Constructs a new PatchDebugData.
         * @param [properties] Properties to set
         */
        constructor(properties?: SyncAction.IPatchDebugData);

        /** PatchDebugData currentLthash. */
        public currentLthash?: (Uint8Array|null);

        /** PatchDebugData newLthash. */
        public newLthash?: (Uint8Array|null);

        /** PatchDebugData patchVersion. */
        public patchVersion?: (Uint8Array|null);

        /** PatchDebugData collectionName. */
        public collectionName?: (Uint8Array|null);

        /** PatchDebugData firstFourBytesFromAHashOfSnapshotMacKey. */
        public firstFourBytesFromAHashOfSnapshotMacKey?: (Uint8Array|null);

        /** PatchDebugData newLthashSubtract. */
        public newLthashSubtract?: (Uint8Array|null);

        /** PatchDebugData numberAdd. */
        public numberAdd?: (number|null);

        /** PatchDebugData numberRemove. */
        public numberRemove?: (number|null);

        /** PatchDebugData numberOverride. */
        public numberOverride?: (number|null);

        /** PatchDebugData senderPlatform. */
        public senderPlatform?: (SyncAction.PatchDebugData.Platform|null);

        /** PatchDebugData isSenderPrimary. */
        public isSenderPrimary?: (boolean|null);

        /**
         * Creates a new PatchDebugData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PatchDebugData instance
         */
        public static create(properties?: SyncAction.IPatchDebugData): SyncAction.PatchDebugData;

        /**
         * Encodes the specified PatchDebugData message. Does not implicitly {@link SyncAction.PatchDebugData.verify|verify} messages.
         * @param message PatchDebugData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SyncAction.IPatchDebugData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PatchDebugData message, length delimited. Does not implicitly {@link SyncAction.PatchDebugData.verify|verify} messages.
         * @param message PatchDebugData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: SyncAction.IPatchDebugData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PatchDebugData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PatchDebugData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.PatchDebugData;

        /**
         * Decodes a PatchDebugData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PatchDebugData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.PatchDebugData;

        /**
         * Verifies a PatchDebugData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PatchDebugData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PatchDebugData
         */
        public static fromObject(object: { [k: string]: any }): SyncAction.PatchDebugData;

        /**
         * Creates a plain object from a PatchDebugData message. Also converts values to other types if specified.
         * @param message PatchDebugData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SyncAction.PatchDebugData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PatchDebugData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PatchDebugData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace PatchDebugData {

        /** Platform enum. */
        enum Platform {
            ANDROID = 0,
            SMBA = 1,
            IPHONE = 2,
            SMBI = 3,
            WEB = 4,
            UWP = 5,
            DARWIN = 6,
            IPAD = 7,
            WEAROS = 8,
            WASG = 9,
            WEARM = 10,
            CAPI = 11
        }
    }

    /** Properties of a SyncActionData. */
    interface ISyncActionData {

        /** SyncActionData index */
        index?: (Uint8Array|null);

        /** SyncActionData value */
        value?: (SyncAction.ISyncActionValue|null);

        /** SyncActionData padding */
        padding?: (Uint8Array|null);

        /** SyncActionData version */
        version?: (number|null);
    }

    /** Represents a SyncActionData. */
    class SyncActionData implements ISyncActionData {

        /**
         * Constructs a new SyncActionData.
         * @param [properties] Properties to set
         */
        constructor(properties?: SyncAction.ISyncActionData);

        /** SyncActionData index. */
        public index?: (Uint8Array|null);

        /** SyncActionData value. */
        public value?: (SyncAction.ISyncActionValue|null);

        /** SyncActionData padding. */
        public padding?: (Uint8Array|null);

        /** SyncActionData version. */
        public version?: (number|null);

        /**
         * Creates a new SyncActionData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncActionData instance
         */
        public static create(properties?: SyncAction.ISyncActionData): SyncAction.SyncActionData;

        /**
         * Encodes the specified SyncActionData message. Does not implicitly {@link SyncAction.SyncActionData.verify|verify} messages.
         * @param message SyncActionData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SyncAction.ISyncActionData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncActionData message, length delimited. Does not implicitly {@link SyncAction.SyncActionData.verify|verify} messages.
         * @param message SyncActionData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: SyncAction.ISyncActionData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncActionData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncActionData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionData;

        /**
         * Decodes a SyncActionData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncActionData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionData;

        /**
         * Verifies a SyncActionData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncActionData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncActionData
         */
        public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionData;

        /**
         * Creates a plain object from a SyncActionData message. Also converts values to other types if specified.
         * @param message SyncActionData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SyncAction.SyncActionData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncActionData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SyncActionData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SyncActionValue. */
    interface ISyncActionValue {

        /** SyncActionValue timestamp */
        timestamp?: (number|Long|null);

        /** SyncActionValue starAction */
        starAction?: (SyncAction.SyncActionValue.IStarAction|null);

        /** SyncActionValue contactAction */
        contactAction?: (SyncAction.SyncActionValue.IContactAction|null);

        /** SyncActionValue muteAction */
        muteAction?: (SyncAction.SyncActionValue.IMuteAction|null);

        /** SyncActionValue pinAction */
        pinAction?: (SyncAction.SyncActionValue.IPinAction|null);

        /** SyncActionValue pushNameSetting */
        pushNameSetting?: (SyncAction.SyncActionValue.IPushNameSetting|null);

        /** SyncActionValue quickReplyAction */
        quickReplyAction?: (SyncAction.SyncActionValue.IQuickReplyAction|null);

        /** SyncActionValue recentEmojiWeightsAction */
        recentEmojiWeightsAction?: (SyncAction.SyncActionValue.IRecentEmojiWeightsAction|null);

        /** SyncActionValue labelEditAction */
        labelEditAction?: (SyncAction.SyncActionValue.ILabelEditAction|null);

        /** SyncActionValue labelAssociationAction */
        labelAssociationAction?: (SyncAction.SyncActionValue.ILabelAssociationAction|null);

        /** SyncActionValue localeSetting */
        localeSetting?: (SyncAction.SyncActionValue.ILocaleSetting|null);

        /** SyncActionValue archiveChatAction */
        archiveChatAction?: (SyncAction.SyncActionValue.IArchiveChatAction|null);

        /** SyncActionValue deleteMessageForMeAction */
        deleteMessageForMeAction?: (SyncAction.SyncActionValue.IDeleteMessageForMeAction|null);

        /** SyncActionValue keyExpiration */
        keyExpiration?: (SyncAction.SyncActionValue.IKeyExpiration|null);

        /** SyncActionValue markChatAsReadAction */
        markChatAsReadAction?: (SyncAction.SyncActionValue.IMarkChatAsReadAction|null);

        /** SyncActionValue clearChatAction */
        clearChatAction?: (SyncAction.SyncActionValue.IClearChatAction|null);

        /** SyncActionValue deleteChatAction */
        deleteChatAction?: (SyncAction.SyncActionValue.IDeleteChatAction|null);

        /** SyncActionValue unarchiveChatsSetting */
        unarchiveChatsSetting?: (SyncAction.SyncActionValue.IUnarchiveChatsSetting|null);

        /** SyncActionValue primaryFeature */
        primaryFeature?: (SyncAction.SyncActionValue.IPrimaryFeature|null);

        /** SyncActionValue androidUnsupportedActions */
        androidUnsupportedActions?: (SyncAction.SyncActionValue.IAndroidUnsupportedActions|null);

        /** SyncActionValue agentAction */
        agentAction?: (SyncAction.SyncActionValue.IAgentAction|null);

        /** SyncActionValue subscriptionAction */
        subscriptionAction?: (SyncAction.SyncActionValue.ISubscriptionAction|null);

        /** SyncActionValue userStatusMuteAction */
        userStatusMuteAction?: (SyncAction.SyncActionValue.IUserStatusMuteAction|null);

        /** SyncActionValue timeFormatAction */
        timeFormatAction?: (SyncAction.SyncActionValue.ITimeFormatAction|null);

        /** SyncActionValue nuxAction */
        nuxAction?: (SyncAction.SyncActionValue.INuxAction|null);

        /** SyncActionValue primaryVersionAction */
        primaryVersionAction?: (SyncAction.SyncActionValue.IPrimaryVersionAction|null);

        /** SyncActionValue stickerAction */
        stickerAction?: (SyncAction.SyncActionValue.IStickerAction|null);

        /** SyncActionValue removeRecentStickerAction */
        removeRecentStickerAction?: (SyncAction.SyncActionValue.IRemoveRecentStickerAction|null);

        /** SyncActionValue chatAssignment */
        chatAssignment?: (SyncAction.SyncActionValue.IChatAssignmentAction|null);

        /** SyncActionValue chatAssignmentOpenedStatus */
        chatAssignmentOpenedStatus?: (SyncAction.SyncActionValue.IChatAssignmentOpenedStatusAction|null);

        /** SyncActionValue pnForLidChatAction */
        pnForLidChatAction?: (SyncAction.SyncActionValue.IPnForLidChatAction|null);

        /** SyncActionValue marketingMessageAction */
        marketingMessageAction?: (SyncAction.SyncActionValue.IMarketingMessageAction|null);

        /** SyncActionValue marketingMessageBroadcastAction */
        marketingMessageBroadcastAction?: (SyncAction.SyncActionValue.IMarketingMessageBroadcastAction|null);

        /** SyncActionValue externalWebBetaAction */
        externalWebBetaAction?: (SyncAction.SyncActionValue.IExternalWebBetaAction|null);

        /** SyncActionValue privacySettingRelayAllCalls */
        privacySettingRelayAllCalls?: (SyncAction.SyncActionValue.IPrivacySettingRelayAllCalls|null);

        /** SyncActionValue callLogAction */
        callLogAction?: (SyncAction.SyncActionValue.ICallLogAction|null);

        /** SyncActionValue ugcBot */
        ugcBot?: (SyncAction.SyncActionValue.IUGCBot|null);

        /** SyncActionValue statusPrivacy */
        statusPrivacy?: (SyncAction.SyncActionValue.IStatusPrivacyAction|null);

        /** SyncActionValue botWelcomeRequestAction */
        botWelcomeRequestAction?: (SyncAction.SyncActionValue.IBotWelcomeRequestAction|null);

        /** SyncActionValue deleteIndividualCallLog */
        deleteIndividualCallLog?: (SyncAction.SyncActionValue.IDeleteIndividualCallLogAction|null);

        /** SyncActionValue labelReorderingAction */
        labelReorderingAction?: (SyncAction.SyncActionValue.ILabelReorderingAction|null);

        /** SyncActionValue paymentInfoAction */
        paymentInfoAction?: (SyncAction.SyncActionValue.IPaymentInfoAction|null);

        /** SyncActionValue customPaymentMethodsAction */
        customPaymentMethodsAction?: (SyncAction.SyncActionValue.ICustomPaymentMethodsAction|null);

        /** SyncActionValue lockChatAction */
        lockChatAction?: (SyncAction.SyncActionValue.ILockChatAction|null);

        /** SyncActionValue chatLockSettings */
        chatLockSettings?: (ChatLockSettings.IChatLockSettings|null);

        /** SyncActionValue wamoUserIdentifierAction */
        wamoUserIdentifierAction?: (SyncAction.SyncActionValue.IWamoUserIdentifierAction|null);

        /** SyncActionValue privacySettingDisableLinkPreviewsAction */
        privacySettingDisableLinkPreviewsAction?: (SyncAction.SyncActionValue.IPrivacySettingDisableLinkPreviewsAction|null);

        /** SyncActionValue deviceCapabilities */
        deviceCapabilities?: (DeviceCapabilities.IDeviceCapabilities|null);

        /** SyncActionValue noteEditAction */
        noteEditAction?: (SyncAction.SyncActionValue.INoteEditAction|null);

        /** SyncActionValue favoritesAction */
        favoritesAction?: (SyncAction.SyncActionValue.IFavoritesAction|null);

        /** SyncActionValue merchantPaymentPartnerAction */
        merchantPaymentPartnerAction?: (SyncAction.SyncActionValue.IMerchantPaymentPartnerAction|null);

        /** SyncActionValue waffleAccountLinkStateAction */
        waffleAccountLinkStateAction?: (SyncAction.SyncActionValue.IWaffleAccountLinkStateAction|null);

        /** SyncActionValue usernameChatStartMode */
        usernameChatStartMode?: (SyncAction.SyncActionValue.IUsernameChatStartModeAction|null);

        /** SyncActionValue notificationActivitySettingAction */
        notificationActivitySettingAction?: (SyncAction.SyncActionValue.INotificationActivitySettingAction|null);

        /** SyncActionValue lidContactAction */
        lidContactAction?: (SyncAction.SyncActionValue.ILidContactAction|null);

        /** SyncActionValue ctwaPerCustomerDataSharingAction */
        ctwaPerCustomerDataSharingAction?: (SyncAction.SyncActionValue.ICtwaPerCustomerDataSharingAction|null);

        /** SyncActionValue paymentTosAction */
        paymentTosAction?: (SyncAction.SyncActionValue.IPaymentTosAction|null);

        /** SyncActionValue privacySettingChannelsPersonalisedRecommendationAction */
        privacySettingChannelsPersonalisedRecommendationAction?: (SyncAction.SyncActionValue.IPrivacySettingChannelsPersonalisedRecommendationAction|null);

        /** SyncActionValue detectedOutcomesStatusAction */
        detectedOutcomesStatusAction?: (SyncAction.SyncActionValue.IDetectedOutcomesStatusAction|null);

        /** SyncActionValue maibaAiFeaturesControlAction */
        maibaAiFeaturesControlAction?: (SyncAction.SyncActionValue.IMaibaAIFeaturesControlAction|null);

        /** SyncActionValue businessBroadcastListAction */
        businessBroadcastListAction?: (SyncAction.SyncActionValue.IBusinessBroadcastListAction|null);

        /** SyncActionValue musicUserIdAction */
        musicUserIdAction?: (SyncAction.SyncActionValue.IMusicUserIdAction|null);

        /** SyncActionValue statusPostOptInNotificationPreferencesAction */
        statusPostOptInNotificationPreferencesAction?: (SyncAction.SyncActionValue.IStatusPostOptInNotificationPreferencesAction|null);

        /** SyncActionValue avatarUpdatedAction */
        avatarUpdatedAction?: (SyncAction.SyncActionValue.IAvatarUpdatedAction|null);

        /** SyncActionValue privateProcessingSettingAction */
        privateProcessingSettingAction?: (SyncAction.SyncActionValue.IPrivateProcessingSettingAction|null);

        /** SyncActionValue newsletterSavedInterestsAction */
        newsletterSavedInterestsAction?: (SyncAction.SyncActionValue.INewsletterSavedInterestsAction|null);

        /** SyncActionValue aiThreadRenameAction */
        aiThreadRenameAction?: (SyncAction.SyncActionValue.IAiThreadRenameAction|null);

        /** SyncActionValue interactiveMessageAction */
        interactiveMessageAction?: (SyncAction.SyncActionValue.IInteractiveMessageAction|null);

        /** SyncActionValue settingsSyncAction */
        settingsSyncAction?: (SyncAction.SyncActionValue.ISettingsSyncAction|null);

        /** SyncActionValue outContactAction */
        outContactAction?: (SyncAction.SyncActionValue.IOutContactAction|null);

        /** SyncActionValue nctSaltSyncAction */
        nctSaltSyncAction?: (SyncAction.SyncActionValue.INctSaltSyncAction|null);

        /** SyncActionValue businessBroadcastCampaignAction */
        businessBroadcastCampaignAction?: (SyncAction.SyncActionValue.IBusinessBroadcastCampaignAction|null);

        /** SyncActionValue businessBroadcastInsightsAction */
        businessBroadcastInsightsAction?: (SyncAction.SyncActionValue.IBusinessBroadcastInsightsAction|null);

        /** SyncActionValue customerDataAction */
        customerDataAction?: (SyncAction.SyncActionValue.ICustomerDataAction|null);

        /** SyncActionValue subscriptionsSyncV2Action */
        subscriptionsSyncV2Action?: (SyncAction.SyncActionValue.ISubscriptionsSyncV2Action|null);

        /** SyncActionValue threadPinAction */
        threadPinAction?: (SyncAction.SyncActionValue.IThreadPinAction|null);
    }

    /** Represents a SyncActionValue. */
    class SyncActionValue implements ISyncActionValue {

        /**
         * Constructs a new SyncActionValue.
         * @param [properties] Properties to set
         */
        constructor(properties?: SyncAction.ISyncActionValue);

        /** SyncActionValue timestamp. */
        public timestamp?: (number|Long|null);

        /** SyncActionValue starAction. */
        public starAction?: (SyncAction.SyncActionValue.IStarAction|null);

        /** SyncActionValue contactAction. */
        public contactAction?: (SyncAction.SyncActionValue.IContactAction|null);

        /** SyncActionValue muteAction. */
        public muteAction?: (SyncAction.SyncActionValue.IMuteAction|null);

        /** SyncActionValue pinAction. */
        public pinAction?: (SyncAction.SyncActionValue.IPinAction|null);

        /** SyncActionValue pushNameSetting. */
        public pushNameSetting?: (SyncAction.SyncActionValue.IPushNameSetting|null);

        /** SyncActionValue quickReplyAction. */
        public quickReplyAction?: (SyncAction.SyncActionValue.IQuickReplyAction|null);

        /** SyncActionValue recentEmojiWeightsAction. */
        public recentEmojiWeightsAction?: (SyncAction.SyncActionValue.IRecentEmojiWeightsAction|null);

        /** SyncActionValue labelEditAction. */
        public labelEditAction?: (SyncAction.SyncActionValue.ILabelEditAction|null);

        /** SyncActionValue labelAssociationAction. */
        public labelAssociationAction?: (SyncAction.SyncActionValue.ILabelAssociationAction|null);

        /** SyncActionValue localeSetting. */
        public localeSetting?: (SyncAction.SyncActionValue.ILocaleSetting|null);

        /** SyncActionValue archiveChatAction. */
        public archiveChatAction?: (SyncAction.SyncActionValue.IArchiveChatAction|null);

        /** SyncActionValue deleteMessageForMeAction. */
        public deleteMessageForMeAction?: (SyncAction.SyncActionValue.IDeleteMessageForMeAction|null);

        /** SyncActionValue keyExpiration. */
        public keyExpiration?: (SyncAction.SyncActionValue.IKeyExpiration|null);

        /** SyncActionValue markChatAsReadAction. */
        public markChatAsReadAction?: (SyncAction.SyncActionValue.IMarkChatAsReadAction|null);

        /** SyncActionValue clearChatAction. */
        public clearChatAction?: (SyncAction.SyncActionValue.IClearChatAction|null);

        /** SyncActionValue deleteChatAction. */
        public deleteChatAction?: (SyncAction.SyncActionValue.IDeleteChatAction|null);

        /** SyncActionValue unarchiveChatsSetting. */
        public unarchiveChatsSetting?: (SyncAction.SyncActionValue.IUnarchiveChatsSetting|null);

        /** SyncActionValue primaryFeature. */
        public primaryFeature?: (SyncAction.SyncActionValue.IPrimaryFeature|null);

        /** SyncActionValue androidUnsupportedActions. */
        public androidUnsupportedActions?: (SyncAction.SyncActionValue.IAndroidUnsupportedActions|null);

        /** SyncActionValue agentAction. */
        public agentAction?: (SyncAction.SyncActionValue.IAgentAction|null);

        /** SyncActionValue subscriptionAction. */
        public subscriptionAction?: (SyncAction.SyncActionValue.ISubscriptionAction|null);

        /** SyncActionValue userStatusMuteAction. */
        public userStatusMuteAction?: (SyncAction.SyncActionValue.IUserStatusMuteAction|null);

        /** SyncActionValue timeFormatAction. */
        public timeFormatAction?: (SyncAction.SyncActionValue.ITimeFormatAction|null);

        /** SyncActionValue nuxAction. */
        public nuxAction?: (SyncAction.SyncActionValue.INuxAction|null);

        /** SyncActionValue primaryVersionAction. */
        public primaryVersionAction?: (SyncAction.SyncActionValue.IPrimaryVersionAction|null);

        /** SyncActionValue stickerAction. */
        public stickerAction?: (SyncAction.SyncActionValue.IStickerAction|null);

        /** SyncActionValue removeRecentStickerAction. */
        public removeRecentStickerAction?: (SyncAction.SyncActionValue.IRemoveRecentStickerAction|null);

        /** SyncActionValue chatAssignment. */
        public chatAssignment?: (SyncAction.SyncActionValue.IChatAssignmentAction|null);

        /** SyncActionValue chatAssignmentOpenedStatus. */
        public chatAssignmentOpenedStatus?: (SyncAction.SyncActionValue.IChatAssignmentOpenedStatusAction|null);

        /** SyncActionValue pnForLidChatAction. */
        public pnForLidChatAction?: (SyncAction.SyncActionValue.IPnForLidChatAction|null);

        /** SyncActionValue marketingMessageAction. */
        public marketingMessageAction?: (SyncAction.SyncActionValue.IMarketingMessageAction|null);

        /** SyncActionValue marketingMessageBroadcastAction. */
        public marketingMessageBroadcastAction?: (SyncAction.SyncActionValue.IMarketingMessageBroadcastAction|null);

        /** SyncActionValue externalWebBetaAction. */
        public externalWebBetaAction?: (SyncAction.SyncActionValue.IExternalWebBetaAction|null);

        /** SyncActionValue privacySettingRelayAllCalls. */
        public privacySettingRelayAllCalls?: (SyncAction.SyncActionValue.IPrivacySettingRelayAllCalls|null);

        /** SyncActionValue callLogAction. */
        public callLogAction?: (SyncAction.SyncActionValue.ICallLogAction|null);

        /** SyncActionValue ugcBot. */
        public ugcBot?: (SyncAction.SyncActionValue.IUGCBot|null);

        /** SyncActionValue statusPrivacy. */
        public statusPrivacy?: (SyncAction.SyncActionValue.IStatusPrivacyAction|null);

        /** SyncActionValue botWelcomeRequestAction. */
        public botWelcomeRequestAction?: (SyncAction.SyncActionValue.IBotWelcomeRequestAction|null);

        /** SyncActionValue deleteIndividualCallLog. */
        public deleteIndividualCallLog?: (SyncAction.SyncActionValue.IDeleteIndividualCallLogAction|null);

        /** SyncActionValue labelReorderingAction. */
        public labelReorderingAction?: (SyncAction.SyncActionValue.ILabelReorderingAction|null);

        /** SyncActionValue paymentInfoAction. */
        public paymentInfoAction?: (SyncAction.SyncActionValue.IPaymentInfoAction|null);

        /** SyncActionValue customPaymentMethodsAction. */
        public customPaymentMethodsAction?: (SyncAction.SyncActionValue.ICustomPaymentMethodsAction|null);

        /** SyncActionValue lockChatAction. */
        public lockChatAction?: (SyncAction.SyncActionValue.ILockChatAction|null);

        /** SyncActionValue chatLockSettings. */
        public chatLockSettings?: (ChatLockSettings.IChatLockSettings|null);

        /** SyncActionValue wamoUserIdentifierAction. */
        public wamoUserIdentifierAction?: (SyncAction.SyncActionValue.IWamoUserIdentifierAction|null);

        /** SyncActionValue privacySettingDisableLinkPreviewsAction. */
        public privacySettingDisableLinkPreviewsAction?: (SyncAction.SyncActionValue.IPrivacySettingDisableLinkPreviewsAction|null);

        /** SyncActionValue deviceCapabilities. */
        public deviceCapabilities?: (DeviceCapabilities.IDeviceCapabilities|null);

        /** SyncActionValue noteEditAction. */
        public noteEditAction?: (SyncAction.SyncActionValue.INoteEditAction|null);

        /** SyncActionValue favoritesAction. */
        public favoritesAction?: (SyncAction.SyncActionValue.IFavoritesAction|null);

        /** SyncActionValue merchantPaymentPartnerAction. */
        public merchantPaymentPartnerAction?: (SyncAction.SyncActionValue.IMerchantPaymentPartnerAction|null);

        /** SyncActionValue waffleAccountLinkStateAction. */
        public waffleAccountLinkStateAction?: (SyncAction.SyncActionValue.IWaffleAccountLinkStateAction|null);

        /** SyncActionValue usernameChatStartMode. */
        public usernameChatStartMode?: (SyncAction.SyncActionValue.IUsernameChatStartModeAction|null);

        /** SyncActionValue notificationActivitySettingAction. */
        public notificationActivitySettingAction?: (SyncAction.SyncActionValue.INotificationActivitySettingAction|null);

        /** SyncActionValue lidContactAction. */
        public lidContactAction?: (SyncAction.SyncActionValue.ILidContactAction|null);

        /** SyncActionValue ctwaPerCustomerDataSharingAction. */
        public ctwaPerCustomerDataSharingAction?: (SyncAction.SyncActionValue.ICtwaPerCustomerDataSharingAction|null);

        /** SyncActionValue paymentTosAction. */
        public paymentTosAction?: (SyncAction.SyncActionValue.IPaymentTosAction|null);

        /** SyncActionValue privacySettingChannelsPersonalisedRecommendationAction. */
        public privacySettingChannelsPersonalisedRecommendationAction?: (SyncAction.SyncActionValue.IPrivacySettingChannelsPersonalisedRecommendationAction|null);

        /** SyncActionValue detectedOutcomesStatusAction. */
        public detectedOutcomesStatusAction?: (SyncAction.SyncActionValue.IDetectedOutcomesStatusAction|null);

        /** SyncActionValue maibaAiFeaturesControlAction. */
        public maibaAiFeaturesControlAction?: (SyncAction.SyncActionValue.IMaibaAIFeaturesControlAction|null);

        /** SyncActionValue businessBroadcastListAction. */
        public businessBroadcastListAction?: (SyncAction.SyncActionValue.IBusinessBroadcastListAction|null);

        /** SyncActionValue musicUserIdAction. */
        public musicUserIdAction?: (SyncAction.SyncActionValue.IMusicUserIdAction|null);

        /** SyncActionValue statusPostOptInNotificationPreferencesAction. */
        public statusPostOptInNotificationPreferencesAction?: (SyncAction.SyncActionValue.IStatusPostOptInNotificationPreferencesAction|null);

        /** SyncActionValue avatarUpdatedAction. */
        public avatarUpdatedAction?: (SyncAction.SyncActionValue.IAvatarUpdatedAction|null);

        /** SyncActionValue privateProcessingSettingAction. */
        public privateProcessingSettingAction?: (SyncAction.SyncActionValue.IPrivateProcessingSettingAction|null);

        /** SyncActionValue newsletterSavedInterestsAction. */
        public newsletterSavedInterestsAction?: (SyncAction.SyncActionValue.INewsletterSavedInterestsAction|null);

        /** SyncActionValue aiThreadRenameAction. */
        public aiThreadRenameAction?: (SyncAction.SyncActionValue.IAiThreadRenameAction|null);

        /** SyncActionValue interactiveMessageAction. */
        public interactiveMessageAction?: (SyncAction.SyncActionValue.IInteractiveMessageAction|null);

        /** SyncActionValue settingsSyncAction. */
        public settingsSyncAction?: (SyncAction.SyncActionValue.ISettingsSyncAction|null);

        /** SyncActionValue outContactAction. */
        public outContactAction?: (SyncAction.SyncActionValue.IOutContactAction|null);

        /** SyncActionValue nctSaltSyncAction. */
        public nctSaltSyncAction?: (SyncAction.SyncActionValue.INctSaltSyncAction|null);

        /** SyncActionValue businessBroadcastCampaignAction. */
        public businessBroadcastCampaignAction?: (SyncAction.SyncActionValue.IBusinessBroadcastCampaignAction|null);

        /** SyncActionValue businessBroadcastInsightsAction. */
        public businessBroadcastInsightsAction?: (SyncAction.SyncActionValue.IBusinessBroadcastInsightsAction|null);

        /** SyncActionValue customerDataAction. */
        public customerDataAction?: (SyncAction.SyncActionValue.ICustomerDataAction|null);

        /** SyncActionValue subscriptionsSyncV2Action. */
        public subscriptionsSyncV2Action?: (SyncAction.SyncActionValue.ISubscriptionsSyncV2Action|null);

        /** SyncActionValue threadPinAction. */
        public threadPinAction?: (SyncAction.SyncActionValue.IThreadPinAction|null);

        /**
         * Creates a new SyncActionValue instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncActionValue instance
         */
        public static create(properties?: SyncAction.ISyncActionValue): SyncAction.SyncActionValue;

        /**
         * Encodes the specified SyncActionValue message. Does not implicitly {@link SyncAction.SyncActionValue.verify|verify} messages.
         * @param message SyncActionValue message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SyncAction.ISyncActionValue, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncActionValue message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.verify|verify} messages.
         * @param message SyncActionValue message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: SyncAction.ISyncActionValue, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncActionValue message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncActionValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue;

        /**
         * Decodes a SyncActionValue message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncActionValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue;

        /**
         * Verifies a SyncActionValue message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncActionValue message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncActionValue
         */
        public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue;

        /**
         * Creates a plain object from a SyncActionValue message. Also converts values to other types if specified.
         * @param message SyncActionValue
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SyncAction.SyncActionValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncActionValue to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SyncActionValue
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace SyncActionValue {

        /** Properties of an AgentAction. */
        interface IAgentAction {

            /** AgentAction name */
            name?: (string|null);

            /** AgentAction deviceID */
            deviceID?: (number|null);

            /** AgentAction isDeleted */
            isDeleted?: (boolean|null);
        }

        /** Represents an AgentAction. */
        class AgentAction implements IAgentAction {

            /**
             * Constructs a new AgentAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IAgentAction);

            /** AgentAction name. */
            public name?: (string|null);

            /** AgentAction deviceID. */
            public deviceID?: (number|null);

            /** AgentAction isDeleted. */
            public isDeleted?: (boolean|null);

            /**
             * Creates a new AgentAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AgentAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IAgentAction): SyncAction.SyncActionValue.AgentAction;

            /**
             * Encodes the specified AgentAction message. Does not implicitly {@link SyncAction.SyncActionValue.AgentAction.verify|verify} messages.
             * @param message AgentAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IAgentAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AgentAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.AgentAction.verify|verify} messages.
             * @param message AgentAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IAgentAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AgentAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AgentAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.AgentAction;

            /**
             * Decodes an AgentAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AgentAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.AgentAction;

            /**
             * Verifies an AgentAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AgentAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AgentAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.AgentAction;

            /**
             * Creates a plain object from an AgentAction message. Also converts values to other types if specified.
             * @param message AgentAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.AgentAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AgentAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AgentAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an AiThreadRenameAction. */
        interface IAiThreadRenameAction {

            /** AiThreadRenameAction newTitle */
            newTitle?: (string|null);
        }

        /** Represents an AiThreadRenameAction. */
        class AiThreadRenameAction implements IAiThreadRenameAction {

            /**
             * Constructs a new AiThreadRenameAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IAiThreadRenameAction);

            /** AiThreadRenameAction newTitle. */
            public newTitle?: (string|null);

            /**
             * Creates a new AiThreadRenameAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AiThreadRenameAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IAiThreadRenameAction): SyncAction.SyncActionValue.AiThreadRenameAction;

            /**
             * Encodes the specified AiThreadRenameAction message. Does not implicitly {@link SyncAction.SyncActionValue.AiThreadRenameAction.verify|verify} messages.
             * @param message AiThreadRenameAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IAiThreadRenameAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AiThreadRenameAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.AiThreadRenameAction.verify|verify} messages.
             * @param message AiThreadRenameAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IAiThreadRenameAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AiThreadRenameAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AiThreadRenameAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.AiThreadRenameAction;

            /**
             * Decodes an AiThreadRenameAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AiThreadRenameAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.AiThreadRenameAction;

            /**
             * Verifies an AiThreadRenameAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AiThreadRenameAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AiThreadRenameAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.AiThreadRenameAction;

            /**
             * Creates a plain object from an AiThreadRenameAction message. Also converts values to other types if specified.
             * @param message AiThreadRenameAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.AiThreadRenameAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AiThreadRenameAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AiThreadRenameAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an AndroidUnsupportedActions. */
        interface IAndroidUnsupportedActions {

            /** AndroidUnsupportedActions allowed */
            allowed?: (boolean|null);
        }

        /** Represents an AndroidUnsupportedActions. */
        class AndroidUnsupportedActions implements IAndroidUnsupportedActions {

            /**
             * Constructs a new AndroidUnsupportedActions.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IAndroidUnsupportedActions);

            /** AndroidUnsupportedActions allowed. */
            public allowed?: (boolean|null);

            /**
             * Creates a new AndroidUnsupportedActions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AndroidUnsupportedActions instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IAndroidUnsupportedActions): SyncAction.SyncActionValue.AndroidUnsupportedActions;

            /**
             * Encodes the specified AndroidUnsupportedActions message. Does not implicitly {@link SyncAction.SyncActionValue.AndroidUnsupportedActions.verify|verify} messages.
             * @param message AndroidUnsupportedActions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IAndroidUnsupportedActions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AndroidUnsupportedActions message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.AndroidUnsupportedActions.verify|verify} messages.
             * @param message AndroidUnsupportedActions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IAndroidUnsupportedActions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AndroidUnsupportedActions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AndroidUnsupportedActions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.AndroidUnsupportedActions;

            /**
             * Decodes an AndroidUnsupportedActions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AndroidUnsupportedActions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.AndroidUnsupportedActions;

            /**
             * Verifies an AndroidUnsupportedActions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AndroidUnsupportedActions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AndroidUnsupportedActions
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.AndroidUnsupportedActions;

            /**
             * Creates a plain object from an AndroidUnsupportedActions message. Also converts values to other types if specified.
             * @param message AndroidUnsupportedActions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.AndroidUnsupportedActions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AndroidUnsupportedActions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AndroidUnsupportedActions
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an ArchiveChatAction. */
        interface IArchiveChatAction {

            /** ArchiveChatAction archived */
            archived?: (boolean|null);

            /** ArchiveChatAction messageRange */
            messageRange?: (SyncAction.SyncActionValue.ISyncActionMessageRange|null);
        }

        /** Represents an ArchiveChatAction. */
        class ArchiveChatAction implements IArchiveChatAction {

            /**
             * Constructs a new ArchiveChatAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IArchiveChatAction);

            /** ArchiveChatAction archived. */
            public archived?: (boolean|null);

            /** ArchiveChatAction messageRange. */
            public messageRange?: (SyncAction.SyncActionValue.ISyncActionMessageRange|null);

            /**
             * Creates a new ArchiveChatAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ArchiveChatAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IArchiveChatAction): SyncAction.SyncActionValue.ArchiveChatAction;

            /**
             * Encodes the specified ArchiveChatAction message. Does not implicitly {@link SyncAction.SyncActionValue.ArchiveChatAction.verify|verify} messages.
             * @param message ArchiveChatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IArchiveChatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ArchiveChatAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.ArchiveChatAction.verify|verify} messages.
             * @param message ArchiveChatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IArchiveChatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ArchiveChatAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ArchiveChatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.ArchiveChatAction;

            /**
             * Decodes an ArchiveChatAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ArchiveChatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.ArchiveChatAction;

            /**
             * Verifies an ArchiveChatAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ArchiveChatAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ArchiveChatAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.ArchiveChatAction;

            /**
             * Creates a plain object from an ArchiveChatAction message. Also converts values to other types if specified.
             * @param message ArchiveChatAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.ArchiveChatAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ArchiveChatAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ArchiveChatAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an AvatarUpdatedAction. */
        interface IAvatarUpdatedAction {

            /** AvatarUpdatedAction eventType */
            eventType?: (SyncAction.SyncActionValue.AvatarUpdatedAction.AvatarEventType|null);

            /** AvatarUpdatedAction recentAvatarStickers */
            recentAvatarStickers?: (SyncAction.SyncActionValue.IStickerAction[]|null);
        }

        /** Represents an AvatarUpdatedAction. */
        class AvatarUpdatedAction implements IAvatarUpdatedAction {

            /**
             * Constructs a new AvatarUpdatedAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IAvatarUpdatedAction);

            /** AvatarUpdatedAction eventType. */
            public eventType?: (SyncAction.SyncActionValue.AvatarUpdatedAction.AvatarEventType|null);

            /** AvatarUpdatedAction recentAvatarStickers. */
            public recentAvatarStickers: SyncAction.SyncActionValue.IStickerAction[];

            /**
             * Creates a new AvatarUpdatedAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AvatarUpdatedAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IAvatarUpdatedAction): SyncAction.SyncActionValue.AvatarUpdatedAction;

            /**
             * Encodes the specified AvatarUpdatedAction message. Does not implicitly {@link SyncAction.SyncActionValue.AvatarUpdatedAction.verify|verify} messages.
             * @param message AvatarUpdatedAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IAvatarUpdatedAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AvatarUpdatedAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.AvatarUpdatedAction.verify|verify} messages.
             * @param message AvatarUpdatedAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IAvatarUpdatedAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AvatarUpdatedAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AvatarUpdatedAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.AvatarUpdatedAction;

            /**
             * Decodes an AvatarUpdatedAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AvatarUpdatedAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.AvatarUpdatedAction;

            /**
             * Verifies an AvatarUpdatedAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AvatarUpdatedAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AvatarUpdatedAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.AvatarUpdatedAction;

            /**
             * Creates a plain object from an AvatarUpdatedAction message. Also converts values to other types if specified.
             * @param message AvatarUpdatedAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.AvatarUpdatedAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AvatarUpdatedAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AvatarUpdatedAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace AvatarUpdatedAction {

            /** AvatarEventType enum. */
            enum AvatarEventType {
                UPDATED = 0,
                CREATED = 1,
                DELETED = 2
            }
        }

        /** Properties of a BotWelcomeRequestAction. */
        interface IBotWelcomeRequestAction {

            /** BotWelcomeRequestAction isSent */
            isSent?: (boolean|null);
        }

        /** Represents a BotWelcomeRequestAction. */
        class BotWelcomeRequestAction implements IBotWelcomeRequestAction {

            /**
             * Constructs a new BotWelcomeRequestAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IBotWelcomeRequestAction);

            /** BotWelcomeRequestAction isSent. */
            public isSent?: (boolean|null);

            /**
             * Creates a new BotWelcomeRequestAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BotWelcomeRequestAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IBotWelcomeRequestAction): SyncAction.SyncActionValue.BotWelcomeRequestAction;

            /**
             * Encodes the specified BotWelcomeRequestAction message. Does not implicitly {@link SyncAction.SyncActionValue.BotWelcomeRequestAction.verify|verify} messages.
             * @param message BotWelcomeRequestAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IBotWelcomeRequestAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BotWelcomeRequestAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.BotWelcomeRequestAction.verify|verify} messages.
             * @param message BotWelcomeRequestAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IBotWelcomeRequestAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BotWelcomeRequestAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BotWelcomeRequestAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.BotWelcomeRequestAction;

            /**
             * Decodes a BotWelcomeRequestAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BotWelcomeRequestAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.BotWelcomeRequestAction;

            /**
             * Verifies a BotWelcomeRequestAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BotWelcomeRequestAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BotWelcomeRequestAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.BotWelcomeRequestAction;

            /**
             * Creates a plain object from a BotWelcomeRequestAction message. Also converts values to other types if specified.
             * @param message BotWelcomeRequestAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.BotWelcomeRequestAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BotWelcomeRequestAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BotWelcomeRequestAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a BroadcastListParticipant. */
        interface IBroadcastListParticipant {

            /** BroadcastListParticipant lidJid */
            lidJid?: (string|null);

            /** BroadcastListParticipant pnJid */
            pnJid?: (string|null);
        }

        /** Represents a BroadcastListParticipant. */
        class BroadcastListParticipant implements IBroadcastListParticipant {

            /**
             * Constructs a new BroadcastListParticipant.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IBroadcastListParticipant);

            /** BroadcastListParticipant lidJid. */
            public lidJid?: (string|null);

            /** BroadcastListParticipant pnJid. */
            public pnJid?: (string|null);

            /**
             * Creates a new BroadcastListParticipant instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BroadcastListParticipant instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IBroadcastListParticipant): SyncAction.SyncActionValue.BroadcastListParticipant;

            /**
             * Encodes the specified BroadcastListParticipant message. Does not implicitly {@link SyncAction.SyncActionValue.BroadcastListParticipant.verify|verify} messages.
             * @param message BroadcastListParticipant message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IBroadcastListParticipant, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BroadcastListParticipant message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.BroadcastListParticipant.verify|verify} messages.
             * @param message BroadcastListParticipant message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IBroadcastListParticipant, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BroadcastListParticipant message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BroadcastListParticipant
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.BroadcastListParticipant;

            /**
             * Decodes a BroadcastListParticipant message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BroadcastListParticipant
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.BroadcastListParticipant;

            /**
             * Verifies a BroadcastListParticipant message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BroadcastListParticipant message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BroadcastListParticipant
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.BroadcastListParticipant;

            /**
             * Creates a plain object from a BroadcastListParticipant message. Also converts values to other types if specified.
             * @param message BroadcastListParticipant
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.BroadcastListParticipant, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BroadcastListParticipant to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BroadcastListParticipant
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a BusinessBroadcastAssociationAction. */
        interface IBusinessBroadcastAssociationAction {

            /** BusinessBroadcastAssociationAction deleted */
            deleted?: (boolean|null);
        }

        /** Represents a BusinessBroadcastAssociationAction. */
        class BusinessBroadcastAssociationAction implements IBusinessBroadcastAssociationAction {

            /**
             * Constructs a new BusinessBroadcastAssociationAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IBusinessBroadcastAssociationAction);

            /** BusinessBroadcastAssociationAction deleted. */
            public deleted?: (boolean|null);

            /**
             * Creates a new BusinessBroadcastAssociationAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BusinessBroadcastAssociationAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IBusinessBroadcastAssociationAction): SyncAction.SyncActionValue.BusinessBroadcastAssociationAction;

            /**
             * Encodes the specified BusinessBroadcastAssociationAction message. Does not implicitly {@link SyncAction.SyncActionValue.BusinessBroadcastAssociationAction.verify|verify} messages.
             * @param message BusinessBroadcastAssociationAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IBusinessBroadcastAssociationAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BusinessBroadcastAssociationAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.BusinessBroadcastAssociationAction.verify|verify} messages.
             * @param message BusinessBroadcastAssociationAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IBusinessBroadcastAssociationAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BusinessBroadcastAssociationAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BusinessBroadcastAssociationAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.BusinessBroadcastAssociationAction;

            /**
             * Decodes a BusinessBroadcastAssociationAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BusinessBroadcastAssociationAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.BusinessBroadcastAssociationAction;

            /**
             * Verifies a BusinessBroadcastAssociationAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BusinessBroadcastAssociationAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BusinessBroadcastAssociationAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.BusinessBroadcastAssociationAction;

            /**
             * Creates a plain object from a BusinessBroadcastAssociationAction message. Also converts values to other types if specified.
             * @param message BusinessBroadcastAssociationAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.BusinessBroadcastAssociationAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BusinessBroadcastAssociationAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BusinessBroadcastAssociationAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a BusinessBroadcastCampaignAction. */
        interface IBusinessBroadcastCampaignAction {

            /** BusinessBroadcastCampaignAction deviceId */
            deviceId?: (number|null);

            /** BusinessBroadcastCampaignAction adId */
            adId?: (string|null);

            /** BusinessBroadcastCampaignAction name */
            name?: (string|null);

            /** BusinessBroadcastCampaignAction msgId */
            msgId?: (string|null);

            /** BusinessBroadcastCampaignAction broadcastJid */
            broadcastJid?: (string|null);

            /** BusinessBroadcastCampaignAction reservedQuota */
            reservedQuota?: (number|null);

            /** BusinessBroadcastCampaignAction scheduledTimestamp */
            scheduledTimestamp?: (number|Long|null);

            /** BusinessBroadcastCampaignAction createTimestamp */
            createTimestamp?: (number|Long|null);

            /** BusinessBroadcastCampaignAction status */
            status?: (SyncAction.SyncActionValue.BusinessBroadcastCampaignStatus|null);
        }

        /** Represents a BusinessBroadcastCampaignAction. */
        class BusinessBroadcastCampaignAction implements IBusinessBroadcastCampaignAction {

            /**
             * Constructs a new BusinessBroadcastCampaignAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IBusinessBroadcastCampaignAction);

            /** BusinessBroadcastCampaignAction deviceId. */
            public deviceId?: (number|null);

            /** BusinessBroadcastCampaignAction adId. */
            public adId?: (string|null);

            /** BusinessBroadcastCampaignAction name. */
            public name?: (string|null);

            /** BusinessBroadcastCampaignAction msgId. */
            public msgId?: (string|null);

            /** BusinessBroadcastCampaignAction broadcastJid. */
            public broadcastJid?: (string|null);

            /** BusinessBroadcastCampaignAction reservedQuota. */
            public reservedQuota?: (number|null);

            /** BusinessBroadcastCampaignAction scheduledTimestamp. */
            public scheduledTimestamp?: (number|Long|null);

            /** BusinessBroadcastCampaignAction createTimestamp. */
            public createTimestamp?: (number|Long|null);

            /** BusinessBroadcastCampaignAction status. */
            public status?: (SyncAction.SyncActionValue.BusinessBroadcastCampaignStatus|null);

            /**
             * Creates a new BusinessBroadcastCampaignAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BusinessBroadcastCampaignAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IBusinessBroadcastCampaignAction): SyncAction.SyncActionValue.BusinessBroadcastCampaignAction;

            /**
             * Encodes the specified BusinessBroadcastCampaignAction message. Does not implicitly {@link SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.verify|verify} messages.
             * @param message BusinessBroadcastCampaignAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IBusinessBroadcastCampaignAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BusinessBroadcastCampaignAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.verify|verify} messages.
             * @param message BusinessBroadcastCampaignAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IBusinessBroadcastCampaignAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BusinessBroadcastCampaignAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BusinessBroadcastCampaignAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.BusinessBroadcastCampaignAction;

            /**
             * Decodes a BusinessBroadcastCampaignAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BusinessBroadcastCampaignAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.BusinessBroadcastCampaignAction;

            /**
             * Verifies a BusinessBroadcastCampaignAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BusinessBroadcastCampaignAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BusinessBroadcastCampaignAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.BusinessBroadcastCampaignAction;

            /**
             * Creates a plain object from a BusinessBroadcastCampaignAction message. Also converts values to other types if specified.
             * @param message BusinessBroadcastCampaignAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.BusinessBroadcastCampaignAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BusinessBroadcastCampaignAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BusinessBroadcastCampaignAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** BusinessBroadcastCampaignStatus enum. */
        enum BusinessBroadcastCampaignStatus {
            DRAFT = 1,
            SCHEDULED = 2,
            PROCESSING = 3,
            FAILED = 4,
            SENT = 5
        }

        /** Properties of a BusinessBroadcastInsightsAction. */
        interface IBusinessBroadcastInsightsAction {

            /** BusinessBroadcastInsightsAction recipientCount */
            recipientCount?: (number|null);

            /** BusinessBroadcastInsightsAction deliveredCount */
            deliveredCount?: (number|null);

            /** BusinessBroadcastInsightsAction readCount */
            readCount?: (number|null);

            /** BusinessBroadcastInsightsAction repliedCount */
            repliedCount?: (number|null);

            /** BusinessBroadcastInsightsAction quickReplyCount */
            quickReplyCount?: (number|null);
        }

        /** Represents a BusinessBroadcastInsightsAction. */
        class BusinessBroadcastInsightsAction implements IBusinessBroadcastInsightsAction {

            /**
             * Constructs a new BusinessBroadcastInsightsAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IBusinessBroadcastInsightsAction);

            /** BusinessBroadcastInsightsAction recipientCount. */
            public recipientCount?: (number|null);

            /** BusinessBroadcastInsightsAction deliveredCount. */
            public deliveredCount?: (number|null);

            /** BusinessBroadcastInsightsAction readCount. */
            public readCount?: (number|null);

            /** BusinessBroadcastInsightsAction repliedCount. */
            public repliedCount?: (number|null);

            /** BusinessBroadcastInsightsAction quickReplyCount. */
            public quickReplyCount?: (number|null);

            /**
             * Creates a new BusinessBroadcastInsightsAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BusinessBroadcastInsightsAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IBusinessBroadcastInsightsAction): SyncAction.SyncActionValue.BusinessBroadcastInsightsAction;

            /**
             * Encodes the specified BusinessBroadcastInsightsAction message. Does not implicitly {@link SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.verify|verify} messages.
             * @param message BusinessBroadcastInsightsAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IBusinessBroadcastInsightsAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BusinessBroadcastInsightsAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.verify|verify} messages.
             * @param message BusinessBroadcastInsightsAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IBusinessBroadcastInsightsAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BusinessBroadcastInsightsAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BusinessBroadcastInsightsAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.BusinessBroadcastInsightsAction;

            /**
             * Decodes a BusinessBroadcastInsightsAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BusinessBroadcastInsightsAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.BusinessBroadcastInsightsAction;

            /**
             * Verifies a BusinessBroadcastInsightsAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BusinessBroadcastInsightsAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BusinessBroadcastInsightsAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.BusinessBroadcastInsightsAction;

            /**
             * Creates a plain object from a BusinessBroadcastInsightsAction message. Also converts values to other types if specified.
             * @param message BusinessBroadcastInsightsAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.BusinessBroadcastInsightsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BusinessBroadcastInsightsAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BusinessBroadcastInsightsAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a BusinessBroadcastListAction. */
        interface IBusinessBroadcastListAction {

            /** BusinessBroadcastListAction deleted */
            deleted?: (boolean|null);

            /** BusinessBroadcastListAction participants */
            participants?: (SyncAction.SyncActionValue.IBroadcastListParticipant[]|null);

            /** BusinessBroadcastListAction listName */
            listName?: (string|null);

            /** BusinessBroadcastListAction labelIds */
            labelIds?: (string[]|null);

            /** BusinessBroadcastListAction audienceExpression */
            audienceExpression?: (string|null);
        }

        /** Represents a BusinessBroadcastListAction. */
        class BusinessBroadcastListAction implements IBusinessBroadcastListAction {

            /**
             * Constructs a new BusinessBroadcastListAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IBusinessBroadcastListAction);

            /** BusinessBroadcastListAction deleted. */
            public deleted?: (boolean|null);

            /** BusinessBroadcastListAction participants. */
            public participants: SyncAction.SyncActionValue.IBroadcastListParticipant[];

            /** BusinessBroadcastListAction listName. */
            public listName?: (string|null);

            /** BusinessBroadcastListAction labelIds. */
            public labelIds: string[];

            /** BusinessBroadcastListAction audienceExpression. */
            public audienceExpression?: (string|null);

            /**
             * Creates a new BusinessBroadcastListAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BusinessBroadcastListAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IBusinessBroadcastListAction): SyncAction.SyncActionValue.BusinessBroadcastListAction;

            /**
             * Encodes the specified BusinessBroadcastListAction message. Does not implicitly {@link SyncAction.SyncActionValue.BusinessBroadcastListAction.verify|verify} messages.
             * @param message BusinessBroadcastListAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IBusinessBroadcastListAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BusinessBroadcastListAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.BusinessBroadcastListAction.verify|verify} messages.
             * @param message BusinessBroadcastListAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IBusinessBroadcastListAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BusinessBroadcastListAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BusinessBroadcastListAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.BusinessBroadcastListAction;

            /**
             * Decodes a BusinessBroadcastListAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BusinessBroadcastListAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.BusinessBroadcastListAction;

            /**
             * Verifies a BusinessBroadcastListAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BusinessBroadcastListAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BusinessBroadcastListAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.BusinessBroadcastListAction;

            /**
             * Creates a plain object from a BusinessBroadcastListAction message. Also converts values to other types if specified.
             * @param message BusinessBroadcastListAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.BusinessBroadcastListAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BusinessBroadcastListAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BusinessBroadcastListAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CallLogAction. */
        interface ICallLogAction {

            /** CallLogAction callLogRecord */
            callLogRecord?: (SyncAction.ICallLogRecord|null);
        }

        /** Represents a CallLogAction. */
        class CallLogAction implements ICallLogAction {

            /**
             * Constructs a new CallLogAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ICallLogAction);

            /** CallLogAction callLogRecord. */
            public callLogRecord?: (SyncAction.ICallLogRecord|null);

            /**
             * Creates a new CallLogAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CallLogAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ICallLogAction): SyncAction.SyncActionValue.CallLogAction;

            /**
             * Encodes the specified CallLogAction message. Does not implicitly {@link SyncAction.SyncActionValue.CallLogAction.verify|verify} messages.
             * @param message CallLogAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ICallLogAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CallLogAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.CallLogAction.verify|verify} messages.
             * @param message CallLogAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ICallLogAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CallLogAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CallLogAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.CallLogAction;

            /**
             * Decodes a CallLogAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CallLogAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.CallLogAction;

            /**
             * Verifies a CallLogAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CallLogAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CallLogAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.CallLogAction;

            /**
             * Creates a plain object from a CallLogAction message. Also converts values to other types if specified.
             * @param message CallLogAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.CallLogAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CallLogAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CallLogAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ChatAssignmentAction. */
        interface IChatAssignmentAction {

            /** ChatAssignmentAction deviceAgentID */
            deviceAgentID?: (string|null);
        }

        /** Represents a ChatAssignmentAction. */
        class ChatAssignmentAction implements IChatAssignmentAction {

            /**
             * Constructs a new ChatAssignmentAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IChatAssignmentAction);

            /** ChatAssignmentAction deviceAgentID. */
            public deviceAgentID?: (string|null);

            /**
             * Creates a new ChatAssignmentAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ChatAssignmentAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IChatAssignmentAction): SyncAction.SyncActionValue.ChatAssignmentAction;

            /**
             * Encodes the specified ChatAssignmentAction message. Does not implicitly {@link SyncAction.SyncActionValue.ChatAssignmentAction.verify|verify} messages.
             * @param message ChatAssignmentAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IChatAssignmentAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ChatAssignmentAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.ChatAssignmentAction.verify|verify} messages.
             * @param message ChatAssignmentAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IChatAssignmentAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ChatAssignmentAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ChatAssignmentAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.ChatAssignmentAction;

            /**
             * Decodes a ChatAssignmentAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ChatAssignmentAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.ChatAssignmentAction;

            /**
             * Verifies a ChatAssignmentAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ChatAssignmentAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ChatAssignmentAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.ChatAssignmentAction;

            /**
             * Creates a plain object from a ChatAssignmentAction message. Also converts values to other types if specified.
             * @param message ChatAssignmentAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.ChatAssignmentAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ChatAssignmentAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ChatAssignmentAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ChatAssignmentOpenedStatusAction. */
        interface IChatAssignmentOpenedStatusAction {

            /** ChatAssignmentOpenedStatusAction chatOpened */
            chatOpened?: (boolean|null);
        }

        /** Represents a ChatAssignmentOpenedStatusAction. */
        class ChatAssignmentOpenedStatusAction implements IChatAssignmentOpenedStatusAction {

            /**
             * Constructs a new ChatAssignmentOpenedStatusAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IChatAssignmentOpenedStatusAction);

            /** ChatAssignmentOpenedStatusAction chatOpened. */
            public chatOpened?: (boolean|null);

            /**
             * Creates a new ChatAssignmentOpenedStatusAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ChatAssignmentOpenedStatusAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IChatAssignmentOpenedStatusAction): SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction;

            /**
             * Encodes the specified ChatAssignmentOpenedStatusAction message. Does not implicitly {@link SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.verify|verify} messages.
             * @param message ChatAssignmentOpenedStatusAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IChatAssignmentOpenedStatusAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ChatAssignmentOpenedStatusAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.verify|verify} messages.
             * @param message ChatAssignmentOpenedStatusAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IChatAssignmentOpenedStatusAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ChatAssignmentOpenedStatusAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ChatAssignmentOpenedStatusAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction;

            /**
             * Decodes a ChatAssignmentOpenedStatusAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ChatAssignmentOpenedStatusAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction;

            /**
             * Verifies a ChatAssignmentOpenedStatusAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ChatAssignmentOpenedStatusAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ChatAssignmentOpenedStatusAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction;

            /**
             * Creates a plain object from a ChatAssignmentOpenedStatusAction message. Also converts values to other types if specified.
             * @param message ChatAssignmentOpenedStatusAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ChatAssignmentOpenedStatusAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ChatAssignmentOpenedStatusAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ClearChatAction. */
        interface IClearChatAction {

            /** ClearChatAction messageRange */
            messageRange?: (SyncAction.SyncActionValue.ISyncActionMessageRange|null);
        }

        /** Represents a ClearChatAction. */
        class ClearChatAction implements IClearChatAction {

            /**
             * Constructs a new ClearChatAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IClearChatAction);

            /** ClearChatAction messageRange. */
            public messageRange?: (SyncAction.SyncActionValue.ISyncActionMessageRange|null);

            /**
             * Creates a new ClearChatAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClearChatAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IClearChatAction): SyncAction.SyncActionValue.ClearChatAction;

            /**
             * Encodes the specified ClearChatAction message. Does not implicitly {@link SyncAction.SyncActionValue.ClearChatAction.verify|verify} messages.
             * @param message ClearChatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IClearChatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClearChatAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.ClearChatAction.verify|verify} messages.
             * @param message ClearChatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IClearChatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClearChatAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClearChatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.ClearChatAction;

            /**
             * Decodes a ClearChatAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClearChatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.ClearChatAction;

            /**
             * Verifies a ClearChatAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClearChatAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClearChatAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.ClearChatAction;

            /**
             * Creates a plain object from a ClearChatAction message. Also converts values to other types if specified.
             * @param message ClearChatAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.ClearChatAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClearChatAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ClearChatAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ContactAction. */
        interface IContactAction {

            /** ContactAction fullName */
            fullName?: (string|null);

            /** ContactAction firstName */
            firstName?: (string|null);

            /** ContactAction lidJid */
            lidJid?: (string|null);

            /** ContactAction saveOnPrimaryAddressbook */
            saveOnPrimaryAddressbook?: (boolean|null);

            /** ContactAction pnJid */
            pnJid?: (string|null);

            /** ContactAction username */
            username?: (string|null);
        }

        /** Represents a ContactAction. */
        class ContactAction implements IContactAction {

            /**
             * Constructs a new ContactAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IContactAction);

            /** ContactAction fullName. */
            public fullName?: (string|null);

            /** ContactAction firstName. */
            public firstName?: (string|null);

            /** ContactAction lidJid. */
            public lidJid?: (string|null);

            /** ContactAction saveOnPrimaryAddressbook. */
            public saveOnPrimaryAddressbook?: (boolean|null);

            /** ContactAction pnJid. */
            public pnJid?: (string|null);

            /** ContactAction username. */
            public username?: (string|null);

            /**
             * Creates a new ContactAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ContactAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IContactAction): SyncAction.SyncActionValue.ContactAction;

            /**
             * Encodes the specified ContactAction message. Does not implicitly {@link SyncAction.SyncActionValue.ContactAction.verify|verify} messages.
             * @param message ContactAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IContactAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ContactAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.ContactAction.verify|verify} messages.
             * @param message ContactAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IContactAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ContactAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ContactAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.ContactAction;

            /**
             * Decodes a ContactAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ContactAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.ContactAction;

            /**
             * Verifies a ContactAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ContactAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ContactAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.ContactAction;

            /**
             * Creates a plain object from a ContactAction message. Also converts values to other types if specified.
             * @param message ContactAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.ContactAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ContactAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ContactAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CtwaPerCustomerDataSharingAction. */
        interface ICtwaPerCustomerDataSharingAction {

            /** CtwaPerCustomerDataSharingAction isCtwaPerCustomerDataSharingEnabled */
            isCtwaPerCustomerDataSharingEnabled?: (boolean|null);
        }

        /** Represents a CtwaPerCustomerDataSharingAction. */
        class CtwaPerCustomerDataSharingAction implements ICtwaPerCustomerDataSharingAction {

            /**
             * Constructs a new CtwaPerCustomerDataSharingAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ICtwaPerCustomerDataSharingAction);

            /** CtwaPerCustomerDataSharingAction isCtwaPerCustomerDataSharingEnabled. */
            public isCtwaPerCustomerDataSharingEnabled?: (boolean|null);

            /**
             * Creates a new CtwaPerCustomerDataSharingAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CtwaPerCustomerDataSharingAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ICtwaPerCustomerDataSharingAction): SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction;

            /**
             * Encodes the specified CtwaPerCustomerDataSharingAction message. Does not implicitly {@link SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.verify|verify} messages.
             * @param message CtwaPerCustomerDataSharingAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ICtwaPerCustomerDataSharingAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CtwaPerCustomerDataSharingAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.verify|verify} messages.
             * @param message CtwaPerCustomerDataSharingAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ICtwaPerCustomerDataSharingAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CtwaPerCustomerDataSharingAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CtwaPerCustomerDataSharingAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction;

            /**
             * Decodes a CtwaPerCustomerDataSharingAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CtwaPerCustomerDataSharingAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction;

            /**
             * Verifies a CtwaPerCustomerDataSharingAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CtwaPerCustomerDataSharingAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CtwaPerCustomerDataSharingAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction;

            /**
             * Creates a plain object from a CtwaPerCustomerDataSharingAction message. Also converts values to other types if specified.
             * @param message CtwaPerCustomerDataSharingAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CtwaPerCustomerDataSharingAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CtwaPerCustomerDataSharingAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CustomPaymentMethod. */
        interface ICustomPaymentMethod {

            /** CustomPaymentMethod credentialId */
            credentialId?: (string|null);

            /** CustomPaymentMethod country */
            country?: (string|null);

            /** CustomPaymentMethod type */
            type?: (string|null);

            /** CustomPaymentMethod metadata */
            metadata?: (SyncAction.SyncActionValue.ICustomPaymentMethodMetadata[]|null);
        }

        /** Represents a CustomPaymentMethod. */
        class CustomPaymentMethod implements ICustomPaymentMethod {

            /**
             * Constructs a new CustomPaymentMethod.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ICustomPaymentMethod);

            /** CustomPaymentMethod credentialId. */
            public credentialId?: (string|null);

            /** CustomPaymentMethod country. */
            public country?: (string|null);

            /** CustomPaymentMethod type. */
            public type?: (string|null);

            /** CustomPaymentMethod metadata. */
            public metadata: SyncAction.SyncActionValue.ICustomPaymentMethodMetadata[];

            /**
             * Creates a new CustomPaymentMethod instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CustomPaymentMethod instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ICustomPaymentMethod): SyncAction.SyncActionValue.CustomPaymentMethod;

            /**
             * Encodes the specified CustomPaymentMethod message. Does not implicitly {@link SyncAction.SyncActionValue.CustomPaymentMethod.verify|verify} messages.
             * @param message CustomPaymentMethod message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ICustomPaymentMethod, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CustomPaymentMethod message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.CustomPaymentMethod.verify|verify} messages.
             * @param message CustomPaymentMethod message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ICustomPaymentMethod, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CustomPaymentMethod message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CustomPaymentMethod
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.CustomPaymentMethod;

            /**
             * Decodes a CustomPaymentMethod message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CustomPaymentMethod
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.CustomPaymentMethod;

            /**
             * Verifies a CustomPaymentMethod message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CustomPaymentMethod message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CustomPaymentMethod
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.CustomPaymentMethod;

            /**
             * Creates a plain object from a CustomPaymentMethod message. Also converts values to other types if specified.
             * @param message CustomPaymentMethod
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.CustomPaymentMethod, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CustomPaymentMethod to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CustomPaymentMethod
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CustomPaymentMethodMetadata. */
        interface ICustomPaymentMethodMetadata {

            /** CustomPaymentMethodMetadata key */
            key?: (string|null);

            /** CustomPaymentMethodMetadata value */
            value?: (string|null);
        }

        /** Represents a CustomPaymentMethodMetadata. */
        class CustomPaymentMethodMetadata implements ICustomPaymentMethodMetadata {

            /**
             * Constructs a new CustomPaymentMethodMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ICustomPaymentMethodMetadata);

            /** CustomPaymentMethodMetadata key. */
            public key?: (string|null);

            /** CustomPaymentMethodMetadata value. */
            public value?: (string|null);

            /**
             * Creates a new CustomPaymentMethodMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CustomPaymentMethodMetadata instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ICustomPaymentMethodMetadata): SyncAction.SyncActionValue.CustomPaymentMethodMetadata;

            /**
             * Encodes the specified CustomPaymentMethodMetadata message. Does not implicitly {@link SyncAction.SyncActionValue.CustomPaymentMethodMetadata.verify|verify} messages.
             * @param message CustomPaymentMethodMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ICustomPaymentMethodMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CustomPaymentMethodMetadata message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.CustomPaymentMethodMetadata.verify|verify} messages.
             * @param message CustomPaymentMethodMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ICustomPaymentMethodMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CustomPaymentMethodMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CustomPaymentMethodMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.CustomPaymentMethodMetadata;

            /**
             * Decodes a CustomPaymentMethodMetadata message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CustomPaymentMethodMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.CustomPaymentMethodMetadata;

            /**
             * Verifies a CustomPaymentMethodMetadata message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CustomPaymentMethodMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CustomPaymentMethodMetadata
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.CustomPaymentMethodMetadata;

            /**
             * Creates a plain object from a CustomPaymentMethodMetadata message. Also converts values to other types if specified.
             * @param message CustomPaymentMethodMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.CustomPaymentMethodMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CustomPaymentMethodMetadata to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CustomPaymentMethodMetadata
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CustomPaymentMethodsAction. */
        interface ICustomPaymentMethodsAction {

            /** CustomPaymentMethodsAction customPaymentMethods */
            customPaymentMethods?: (SyncAction.SyncActionValue.ICustomPaymentMethod[]|null);
        }

        /** Represents a CustomPaymentMethodsAction. */
        class CustomPaymentMethodsAction implements ICustomPaymentMethodsAction {

            /**
             * Constructs a new CustomPaymentMethodsAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ICustomPaymentMethodsAction);

            /** CustomPaymentMethodsAction customPaymentMethods. */
            public customPaymentMethods: SyncAction.SyncActionValue.ICustomPaymentMethod[];

            /**
             * Creates a new CustomPaymentMethodsAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CustomPaymentMethodsAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ICustomPaymentMethodsAction): SyncAction.SyncActionValue.CustomPaymentMethodsAction;

            /**
             * Encodes the specified CustomPaymentMethodsAction message. Does not implicitly {@link SyncAction.SyncActionValue.CustomPaymentMethodsAction.verify|verify} messages.
             * @param message CustomPaymentMethodsAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ICustomPaymentMethodsAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CustomPaymentMethodsAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.CustomPaymentMethodsAction.verify|verify} messages.
             * @param message CustomPaymentMethodsAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ICustomPaymentMethodsAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CustomPaymentMethodsAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CustomPaymentMethodsAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.CustomPaymentMethodsAction;

            /**
             * Decodes a CustomPaymentMethodsAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CustomPaymentMethodsAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.CustomPaymentMethodsAction;

            /**
             * Verifies a CustomPaymentMethodsAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CustomPaymentMethodsAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CustomPaymentMethodsAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.CustomPaymentMethodsAction;

            /**
             * Creates a plain object from a CustomPaymentMethodsAction message. Also converts values to other types if specified.
             * @param message CustomPaymentMethodsAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.CustomPaymentMethodsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CustomPaymentMethodsAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CustomPaymentMethodsAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CustomerDataAction. */
        interface ICustomerDataAction {

            /** CustomerDataAction chatJid */
            chatJid?: (string|null);

            /** CustomerDataAction contactType */
            contactType?: (number|null);

            /** CustomerDataAction email */
            email?: (string|null);

            /** CustomerDataAction altPhoneNumbers */
            altPhoneNumbers?: (string|null);

            /** CustomerDataAction birthday */
            birthday?: (number|Long|null);

            /** CustomerDataAction address */
            address?: (string|null);

            /** CustomerDataAction acquisitionSource */
            acquisitionSource?: (number|null);

            /** CustomerDataAction leadStage */
            leadStage?: (number|null);

            /** CustomerDataAction lastOrder */
            lastOrder?: (number|Long|null);

            /** CustomerDataAction createdAt */
            createdAt?: (number|Long|null);

            /** CustomerDataAction modifiedAt */
            modifiedAt?: (number|Long|null);
        }

        /** Represents a CustomerDataAction. */
        class CustomerDataAction implements ICustomerDataAction {

            /**
             * Constructs a new CustomerDataAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ICustomerDataAction);

            /** CustomerDataAction chatJid. */
            public chatJid?: (string|null);

            /** CustomerDataAction contactType. */
            public contactType?: (number|null);

            /** CustomerDataAction email. */
            public email?: (string|null);

            /** CustomerDataAction altPhoneNumbers. */
            public altPhoneNumbers?: (string|null);

            /** CustomerDataAction birthday. */
            public birthday?: (number|Long|null);

            /** CustomerDataAction address. */
            public address?: (string|null);

            /** CustomerDataAction acquisitionSource. */
            public acquisitionSource?: (number|null);

            /** CustomerDataAction leadStage. */
            public leadStage?: (number|null);

            /** CustomerDataAction lastOrder. */
            public lastOrder?: (number|Long|null);

            /** CustomerDataAction createdAt. */
            public createdAt?: (number|Long|null);

            /** CustomerDataAction modifiedAt. */
            public modifiedAt?: (number|Long|null);

            /**
             * Creates a new CustomerDataAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CustomerDataAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ICustomerDataAction): SyncAction.SyncActionValue.CustomerDataAction;

            /**
             * Encodes the specified CustomerDataAction message. Does not implicitly {@link SyncAction.SyncActionValue.CustomerDataAction.verify|verify} messages.
             * @param message CustomerDataAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ICustomerDataAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CustomerDataAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.CustomerDataAction.verify|verify} messages.
             * @param message CustomerDataAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ICustomerDataAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CustomerDataAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CustomerDataAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.CustomerDataAction;

            /**
             * Decodes a CustomerDataAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CustomerDataAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.CustomerDataAction;

            /**
             * Verifies a CustomerDataAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CustomerDataAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CustomerDataAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.CustomerDataAction;

            /**
             * Creates a plain object from a CustomerDataAction message. Also converts values to other types if specified.
             * @param message CustomerDataAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.CustomerDataAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CustomerDataAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CustomerDataAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DeleteChatAction. */
        interface IDeleteChatAction {

            /** DeleteChatAction messageRange */
            messageRange?: (SyncAction.SyncActionValue.ISyncActionMessageRange|null);
        }

        /** Represents a DeleteChatAction. */
        class DeleteChatAction implements IDeleteChatAction {

            /**
             * Constructs a new DeleteChatAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IDeleteChatAction);

            /** DeleteChatAction messageRange. */
            public messageRange?: (SyncAction.SyncActionValue.ISyncActionMessageRange|null);

            /**
             * Creates a new DeleteChatAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeleteChatAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IDeleteChatAction): SyncAction.SyncActionValue.DeleteChatAction;

            /**
             * Encodes the specified DeleteChatAction message. Does not implicitly {@link SyncAction.SyncActionValue.DeleteChatAction.verify|verify} messages.
             * @param message DeleteChatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IDeleteChatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeleteChatAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.DeleteChatAction.verify|verify} messages.
             * @param message DeleteChatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IDeleteChatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeleteChatAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeleteChatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.DeleteChatAction;

            /**
             * Decodes a DeleteChatAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeleteChatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.DeleteChatAction;

            /**
             * Verifies a DeleteChatAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeleteChatAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeleteChatAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.DeleteChatAction;

            /**
             * Creates a plain object from a DeleteChatAction message. Also converts values to other types if specified.
             * @param message DeleteChatAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.DeleteChatAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeleteChatAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DeleteChatAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DeleteIndividualCallLogAction. */
        interface IDeleteIndividualCallLogAction {

            /** DeleteIndividualCallLogAction peerJid */
            peerJid?: (string|null);

            /** DeleteIndividualCallLogAction isIncoming */
            isIncoming?: (boolean|null);
        }

        /** Represents a DeleteIndividualCallLogAction. */
        class DeleteIndividualCallLogAction implements IDeleteIndividualCallLogAction {

            /**
             * Constructs a new DeleteIndividualCallLogAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IDeleteIndividualCallLogAction);

            /** DeleteIndividualCallLogAction peerJid. */
            public peerJid?: (string|null);

            /** DeleteIndividualCallLogAction isIncoming. */
            public isIncoming?: (boolean|null);

            /**
             * Creates a new DeleteIndividualCallLogAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeleteIndividualCallLogAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IDeleteIndividualCallLogAction): SyncAction.SyncActionValue.DeleteIndividualCallLogAction;

            /**
             * Encodes the specified DeleteIndividualCallLogAction message. Does not implicitly {@link SyncAction.SyncActionValue.DeleteIndividualCallLogAction.verify|verify} messages.
             * @param message DeleteIndividualCallLogAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IDeleteIndividualCallLogAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeleteIndividualCallLogAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.DeleteIndividualCallLogAction.verify|verify} messages.
             * @param message DeleteIndividualCallLogAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IDeleteIndividualCallLogAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeleteIndividualCallLogAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeleteIndividualCallLogAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.DeleteIndividualCallLogAction;

            /**
             * Decodes a DeleteIndividualCallLogAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeleteIndividualCallLogAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.DeleteIndividualCallLogAction;

            /**
             * Verifies a DeleteIndividualCallLogAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeleteIndividualCallLogAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeleteIndividualCallLogAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.DeleteIndividualCallLogAction;

            /**
             * Creates a plain object from a DeleteIndividualCallLogAction message. Also converts values to other types if specified.
             * @param message DeleteIndividualCallLogAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.DeleteIndividualCallLogAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeleteIndividualCallLogAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DeleteIndividualCallLogAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DeleteMessageForMeAction. */
        interface IDeleteMessageForMeAction {

            /** DeleteMessageForMeAction deleteMedia */
            deleteMedia?: (boolean|null);

            /** DeleteMessageForMeAction messageTimestamp */
            messageTimestamp?: (number|Long|null);
        }

        /** Represents a DeleteMessageForMeAction. */
        class DeleteMessageForMeAction implements IDeleteMessageForMeAction {

            /**
             * Constructs a new DeleteMessageForMeAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IDeleteMessageForMeAction);

            /** DeleteMessageForMeAction deleteMedia. */
            public deleteMedia?: (boolean|null);

            /** DeleteMessageForMeAction messageTimestamp. */
            public messageTimestamp?: (number|Long|null);

            /**
             * Creates a new DeleteMessageForMeAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeleteMessageForMeAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IDeleteMessageForMeAction): SyncAction.SyncActionValue.DeleteMessageForMeAction;

            /**
             * Encodes the specified DeleteMessageForMeAction message. Does not implicitly {@link SyncAction.SyncActionValue.DeleteMessageForMeAction.verify|verify} messages.
             * @param message DeleteMessageForMeAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IDeleteMessageForMeAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeleteMessageForMeAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.DeleteMessageForMeAction.verify|verify} messages.
             * @param message DeleteMessageForMeAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IDeleteMessageForMeAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeleteMessageForMeAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeleteMessageForMeAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.DeleteMessageForMeAction;

            /**
             * Decodes a DeleteMessageForMeAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeleteMessageForMeAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.DeleteMessageForMeAction;

            /**
             * Verifies a DeleteMessageForMeAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeleteMessageForMeAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeleteMessageForMeAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.DeleteMessageForMeAction;

            /**
             * Creates a plain object from a DeleteMessageForMeAction message. Also converts values to other types if specified.
             * @param message DeleteMessageForMeAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.DeleteMessageForMeAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeleteMessageForMeAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DeleteMessageForMeAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DetectedOutcomesStatusAction. */
        interface IDetectedOutcomesStatusAction {

            /** DetectedOutcomesStatusAction isEnabled */
            isEnabled?: (boolean|null);
        }

        /** Represents a DetectedOutcomesStatusAction. */
        class DetectedOutcomesStatusAction implements IDetectedOutcomesStatusAction {

            /**
             * Constructs a new DetectedOutcomesStatusAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IDetectedOutcomesStatusAction);

            /** DetectedOutcomesStatusAction isEnabled. */
            public isEnabled?: (boolean|null);

            /**
             * Creates a new DetectedOutcomesStatusAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DetectedOutcomesStatusAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IDetectedOutcomesStatusAction): SyncAction.SyncActionValue.DetectedOutcomesStatusAction;

            /**
             * Encodes the specified DetectedOutcomesStatusAction message. Does not implicitly {@link SyncAction.SyncActionValue.DetectedOutcomesStatusAction.verify|verify} messages.
             * @param message DetectedOutcomesStatusAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IDetectedOutcomesStatusAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DetectedOutcomesStatusAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.DetectedOutcomesStatusAction.verify|verify} messages.
             * @param message DetectedOutcomesStatusAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IDetectedOutcomesStatusAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DetectedOutcomesStatusAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DetectedOutcomesStatusAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.DetectedOutcomesStatusAction;

            /**
             * Decodes a DetectedOutcomesStatusAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DetectedOutcomesStatusAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.DetectedOutcomesStatusAction;

            /**
             * Verifies a DetectedOutcomesStatusAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DetectedOutcomesStatusAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DetectedOutcomesStatusAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.DetectedOutcomesStatusAction;

            /**
             * Creates a plain object from a DetectedOutcomesStatusAction message. Also converts values to other types if specified.
             * @param message DetectedOutcomesStatusAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.DetectedOutcomesStatusAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DetectedOutcomesStatusAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DetectedOutcomesStatusAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an ExternalWebBetaAction. */
        interface IExternalWebBetaAction {

            /** ExternalWebBetaAction isOptIn */
            isOptIn?: (boolean|null);
        }

        /** Represents an ExternalWebBetaAction. */
        class ExternalWebBetaAction implements IExternalWebBetaAction {

            /**
             * Constructs a new ExternalWebBetaAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IExternalWebBetaAction);

            /** ExternalWebBetaAction isOptIn. */
            public isOptIn?: (boolean|null);

            /**
             * Creates a new ExternalWebBetaAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExternalWebBetaAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IExternalWebBetaAction): SyncAction.SyncActionValue.ExternalWebBetaAction;

            /**
             * Encodes the specified ExternalWebBetaAction message. Does not implicitly {@link SyncAction.SyncActionValue.ExternalWebBetaAction.verify|verify} messages.
             * @param message ExternalWebBetaAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IExternalWebBetaAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExternalWebBetaAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.ExternalWebBetaAction.verify|verify} messages.
             * @param message ExternalWebBetaAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IExternalWebBetaAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExternalWebBetaAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExternalWebBetaAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.ExternalWebBetaAction;

            /**
             * Decodes an ExternalWebBetaAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExternalWebBetaAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.ExternalWebBetaAction;

            /**
             * Verifies an ExternalWebBetaAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExternalWebBetaAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExternalWebBetaAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.ExternalWebBetaAction;

            /**
             * Creates a plain object from an ExternalWebBetaAction message. Also converts values to other types if specified.
             * @param message ExternalWebBetaAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.ExternalWebBetaAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExternalWebBetaAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ExternalWebBetaAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a FavoritesAction. */
        interface IFavoritesAction {

            /** FavoritesAction favorites */
            favorites?: (SyncAction.SyncActionValue.FavoritesAction.IFavorite[]|null);
        }

        /** Represents a FavoritesAction. */
        class FavoritesAction implements IFavoritesAction {

            /**
             * Constructs a new FavoritesAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IFavoritesAction);

            /** FavoritesAction favorites. */
            public favorites: SyncAction.SyncActionValue.FavoritesAction.IFavorite[];

            /**
             * Creates a new FavoritesAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FavoritesAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IFavoritesAction): SyncAction.SyncActionValue.FavoritesAction;

            /**
             * Encodes the specified FavoritesAction message. Does not implicitly {@link SyncAction.SyncActionValue.FavoritesAction.verify|verify} messages.
             * @param message FavoritesAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IFavoritesAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FavoritesAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.FavoritesAction.verify|verify} messages.
             * @param message FavoritesAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IFavoritesAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FavoritesAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FavoritesAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.FavoritesAction;

            /**
             * Decodes a FavoritesAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FavoritesAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.FavoritesAction;

            /**
             * Verifies a FavoritesAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FavoritesAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FavoritesAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.FavoritesAction;

            /**
             * Creates a plain object from a FavoritesAction message. Also converts values to other types if specified.
             * @param message FavoritesAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.FavoritesAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FavoritesAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for FavoritesAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace FavoritesAction {

            /** Properties of a Favorite. */
            interface IFavorite {

                /** Favorite id */
                id?: (string|null);
            }

            /** Represents a Favorite. */
            class Favorite implements IFavorite {

                /**
                 * Constructs a new Favorite.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: SyncAction.SyncActionValue.FavoritesAction.IFavorite);

                /** Favorite id. */
                public id?: (string|null);

                /**
                 * Creates a new Favorite instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Favorite instance
                 */
                public static create(properties?: SyncAction.SyncActionValue.FavoritesAction.IFavorite): SyncAction.SyncActionValue.FavoritesAction.Favorite;

                /**
                 * Encodes the specified Favorite message. Does not implicitly {@link SyncAction.SyncActionValue.FavoritesAction.Favorite.verify|verify} messages.
                 * @param message Favorite message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: SyncAction.SyncActionValue.FavoritesAction.IFavorite, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Favorite message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.FavoritesAction.Favorite.verify|verify} messages.
                 * @param message Favorite message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: SyncAction.SyncActionValue.FavoritesAction.IFavorite, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Favorite message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Favorite
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.FavoritesAction.Favorite;

                /**
                 * Decodes a Favorite message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Favorite
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.FavoritesAction.Favorite;

                /**
                 * Verifies a Favorite message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Favorite message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Favorite
                 */
                public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.FavoritesAction.Favorite;

                /**
                 * Creates a plain object from a Favorite message. Also converts values to other types if specified.
                 * @param message Favorite
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: SyncAction.SyncActionValue.FavoritesAction.Favorite, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Favorite to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Favorite
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of an InteractiveMessageAction. */
        interface IInteractiveMessageAction {

            /** InteractiveMessageAction type */
            type?: (SyncAction.SyncActionValue.InteractiveMessageAction.InteractiveMessageActionMode|null);

            /** InteractiveMessageAction agmId */
            agmId?: (string|null);
        }

        /** Represents an InteractiveMessageAction. */
        class InteractiveMessageAction implements IInteractiveMessageAction {

            /**
             * Constructs a new InteractiveMessageAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IInteractiveMessageAction);

            /** InteractiveMessageAction type. */
            public type?: (SyncAction.SyncActionValue.InteractiveMessageAction.InteractiveMessageActionMode|null);

            /** InteractiveMessageAction agmId. */
            public agmId?: (string|null);

            /**
             * Creates a new InteractiveMessageAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns InteractiveMessageAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IInteractiveMessageAction): SyncAction.SyncActionValue.InteractiveMessageAction;

            /**
             * Encodes the specified InteractiveMessageAction message. Does not implicitly {@link SyncAction.SyncActionValue.InteractiveMessageAction.verify|verify} messages.
             * @param message InteractiveMessageAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IInteractiveMessageAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified InteractiveMessageAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.InteractiveMessageAction.verify|verify} messages.
             * @param message InteractiveMessageAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IInteractiveMessageAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InteractiveMessageAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InteractiveMessageAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.InteractiveMessageAction;

            /**
             * Decodes an InteractiveMessageAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InteractiveMessageAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.InteractiveMessageAction;

            /**
             * Verifies an InteractiveMessageAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an InteractiveMessageAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns InteractiveMessageAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.InteractiveMessageAction;

            /**
             * Creates a plain object from an InteractiveMessageAction message. Also converts values to other types if specified.
             * @param message InteractiveMessageAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.InteractiveMessageAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this InteractiveMessageAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for InteractiveMessageAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace InteractiveMessageAction {

            /** InteractiveMessageActionMode enum. */
            enum InteractiveMessageActionMode {
                DISABLE_CTA = 1
            }
        }

        /** Properties of a KeyExpiration. */
        interface IKeyExpiration {

            /** KeyExpiration expiredKeyEpoch */
            expiredKeyEpoch?: (number|null);
        }

        /** Represents a KeyExpiration. */
        class KeyExpiration implements IKeyExpiration {

            /**
             * Constructs a new KeyExpiration.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IKeyExpiration);

            /** KeyExpiration expiredKeyEpoch. */
            public expiredKeyEpoch?: (number|null);

            /**
             * Creates a new KeyExpiration instance using the specified properties.
             * @param [properties] Properties to set
             * @returns KeyExpiration instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IKeyExpiration): SyncAction.SyncActionValue.KeyExpiration;

            /**
             * Encodes the specified KeyExpiration message. Does not implicitly {@link SyncAction.SyncActionValue.KeyExpiration.verify|verify} messages.
             * @param message KeyExpiration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IKeyExpiration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified KeyExpiration message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.KeyExpiration.verify|verify} messages.
             * @param message KeyExpiration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IKeyExpiration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a KeyExpiration message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns KeyExpiration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.KeyExpiration;

            /**
             * Decodes a KeyExpiration message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns KeyExpiration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.KeyExpiration;

            /**
             * Verifies a KeyExpiration message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a KeyExpiration message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns KeyExpiration
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.KeyExpiration;

            /**
             * Creates a plain object from a KeyExpiration message. Also converts values to other types if specified.
             * @param message KeyExpiration
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.KeyExpiration, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this KeyExpiration to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for KeyExpiration
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a LabelAssociationAction. */
        interface ILabelAssociationAction {

            /** LabelAssociationAction labeled */
            labeled?: (boolean|null);
        }

        /** Represents a LabelAssociationAction. */
        class LabelAssociationAction implements ILabelAssociationAction {

            /**
             * Constructs a new LabelAssociationAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ILabelAssociationAction);

            /** LabelAssociationAction labeled. */
            public labeled?: (boolean|null);

            /**
             * Creates a new LabelAssociationAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LabelAssociationAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ILabelAssociationAction): SyncAction.SyncActionValue.LabelAssociationAction;

            /**
             * Encodes the specified LabelAssociationAction message. Does not implicitly {@link SyncAction.SyncActionValue.LabelAssociationAction.verify|verify} messages.
             * @param message LabelAssociationAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ILabelAssociationAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LabelAssociationAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.LabelAssociationAction.verify|verify} messages.
             * @param message LabelAssociationAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ILabelAssociationAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LabelAssociationAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LabelAssociationAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.LabelAssociationAction;

            /**
             * Decodes a LabelAssociationAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LabelAssociationAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.LabelAssociationAction;

            /**
             * Verifies a LabelAssociationAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LabelAssociationAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LabelAssociationAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.LabelAssociationAction;

            /**
             * Creates a plain object from a LabelAssociationAction message. Also converts values to other types if specified.
             * @param message LabelAssociationAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.LabelAssociationAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LabelAssociationAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LabelAssociationAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a LabelEditAction. */
        interface ILabelEditAction {

            /** LabelEditAction name */
            name?: (string|null);

            /** LabelEditAction color */
            color?: (number|null);

            /** LabelEditAction predefinedId */
            predefinedId?: (number|null);

            /** LabelEditAction deleted */
            deleted?: (boolean|null);

            /** LabelEditAction orderIndex */
            orderIndex?: (number|null);

            /** LabelEditAction isActive */
            isActive?: (boolean|null);

            /** LabelEditAction type */
            type?: (SyncAction.SyncActionValue.LabelEditAction.ListType|null);

            /** LabelEditAction isImmutable */
            isImmutable?: (boolean|null);

            /** LabelEditAction muteEndTimeMs */
            muteEndTimeMs?: (number|Long|null);
        }

        /** Represents a LabelEditAction. */
        class LabelEditAction implements ILabelEditAction {

            /**
             * Constructs a new LabelEditAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ILabelEditAction);

            /** LabelEditAction name. */
            public name?: (string|null);

            /** LabelEditAction color. */
            public color?: (number|null);

            /** LabelEditAction predefinedId. */
            public predefinedId?: (number|null);

            /** LabelEditAction deleted. */
            public deleted?: (boolean|null);

            /** LabelEditAction orderIndex. */
            public orderIndex?: (number|null);

            /** LabelEditAction isActive. */
            public isActive?: (boolean|null);

            /** LabelEditAction type. */
            public type?: (SyncAction.SyncActionValue.LabelEditAction.ListType|null);

            /** LabelEditAction isImmutable. */
            public isImmutable?: (boolean|null);

            /** LabelEditAction muteEndTimeMs. */
            public muteEndTimeMs?: (number|Long|null);

            /**
             * Creates a new LabelEditAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LabelEditAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ILabelEditAction): SyncAction.SyncActionValue.LabelEditAction;

            /**
             * Encodes the specified LabelEditAction message. Does not implicitly {@link SyncAction.SyncActionValue.LabelEditAction.verify|verify} messages.
             * @param message LabelEditAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ILabelEditAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LabelEditAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.LabelEditAction.verify|verify} messages.
             * @param message LabelEditAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ILabelEditAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LabelEditAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LabelEditAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.LabelEditAction;

            /**
             * Decodes a LabelEditAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LabelEditAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.LabelEditAction;

            /**
             * Verifies a LabelEditAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LabelEditAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LabelEditAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.LabelEditAction;

            /**
             * Creates a plain object from a LabelEditAction message. Also converts values to other types if specified.
             * @param message LabelEditAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.LabelEditAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LabelEditAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LabelEditAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace LabelEditAction {

            /** ListType enum. */
            enum ListType {
                NONE = 0,
                UNREAD = 1,
                GROUPS = 2,
                FAVORITES = 3,
                PREDEFINED = 4,
                CUSTOM = 5,
                COMMUNITY = 6,
                SERVER_ASSIGNED = 7,
                DRAFTED = 8,
                AI_HANDOFF = 9,
                CHANNELS = 10,
                AI_RESPONDING = 11
            }
        }

        /** Properties of a LabelReorderingAction. */
        interface ILabelReorderingAction {

            /** LabelReorderingAction sortedLabelIds */
            sortedLabelIds?: (number[]|null);
        }

        /** Represents a LabelReorderingAction. */
        class LabelReorderingAction implements ILabelReorderingAction {

            /**
             * Constructs a new LabelReorderingAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ILabelReorderingAction);

            /** LabelReorderingAction sortedLabelIds. */
            public sortedLabelIds: number[];

            /**
             * Creates a new LabelReorderingAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LabelReorderingAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ILabelReorderingAction): SyncAction.SyncActionValue.LabelReorderingAction;

            /**
             * Encodes the specified LabelReorderingAction message. Does not implicitly {@link SyncAction.SyncActionValue.LabelReorderingAction.verify|verify} messages.
             * @param message LabelReorderingAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ILabelReorderingAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LabelReorderingAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.LabelReorderingAction.verify|verify} messages.
             * @param message LabelReorderingAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ILabelReorderingAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LabelReorderingAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LabelReorderingAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.LabelReorderingAction;

            /**
             * Decodes a LabelReorderingAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LabelReorderingAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.LabelReorderingAction;

            /**
             * Verifies a LabelReorderingAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LabelReorderingAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LabelReorderingAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.LabelReorderingAction;

            /**
             * Creates a plain object from a LabelReorderingAction message. Also converts values to other types if specified.
             * @param message LabelReorderingAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.LabelReorderingAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LabelReorderingAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LabelReorderingAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a LidContactAction. */
        interface ILidContactAction {

            /** LidContactAction fullName */
            fullName?: (string|null);

            /** LidContactAction firstName */
            firstName?: (string|null);

            /** LidContactAction username */
            username?: (string|null);
        }

        /** Represents a LidContactAction. */
        class LidContactAction implements ILidContactAction {

            /**
             * Constructs a new LidContactAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ILidContactAction);

            /** LidContactAction fullName. */
            public fullName?: (string|null);

            /** LidContactAction firstName. */
            public firstName?: (string|null);

            /** LidContactAction username. */
            public username?: (string|null);

            /**
             * Creates a new LidContactAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LidContactAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ILidContactAction): SyncAction.SyncActionValue.LidContactAction;

            /**
             * Encodes the specified LidContactAction message. Does not implicitly {@link SyncAction.SyncActionValue.LidContactAction.verify|verify} messages.
             * @param message LidContactAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ILidContactAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LidContactAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.LidContactAction.verify|verify} messages.
             * @param message LidContactAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ILidContactAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LidContactAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LidContactAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.LidContactAction;

            /**
             * Decodes a LidContactAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LidContactAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.LidContactAction;

            /**
             * Verifies a LidContactAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LidContactAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LidContactAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.LidContactAction;

            /**
             * Creates a plain object from a LidContactAction message. Also converts values to other types if specified.
             * @param message LidContactAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.LidContactAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LidContactAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LidContactAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a LocaleSetting. */
        interface ILocaleSetting {

            /** LocaleSetting locale */
            locale?: (string|null);
        }

        /** Represents a LocaleSetting. */
        class LocaleSetting implements ILocaleSetting {

            /**
             * Constructs a new LocaleSetting.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ILocaleSetting);

            /** LocaleSetting locale. */
            public locale?: (string|null);

            /**
             * Creates a new LocaleSetting instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LocaleSetting instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ILocaleSetting): SyncAction.SyncActionValue.LocaleSetting;

            /**
             * Encodes the specified LocaleSetting message. Does not implicitly {@link SyncAction.SyncActionValue.LocaleSetting.verify|verify} messages.
             * @param message LocaleSetting message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ILocaleSetting, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LocaleSetting message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.LocaleSetting.verify|verify} messages.
             * @param message LocaleSetting message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ILocaleSetting, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LocaleSetting message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LocaleSetting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.LocaleSetting;

            /**
             * Decodes a LocaleSetting message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LocaleSetting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.LocaleSetting;

            /**
             * Verifies a LocaleSetting message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LocaleSetting message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LocaleSetting
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.LocaleSetting;

            /**
             * Creates a plain object from a LocaleSetting message. Also converts values to other types if specified.
             * @param message LocaleSetting
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.LocaleSetting, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LocaleSetting to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LocaleSetting
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a LockChatAction. */
        interface ILockChatAction {

            /** LockChatAction locked */
            locked?: (boolean|null);
        }

        /** Represents a LockChatAction. */
        class LockChatAction implements ILockChatAction {

            /**
             * Constructs a new LockChatAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ILockChatAction);

            /** LockChatAction locked. */
            public locked?: (boolean|null);

            /**
             * Creates a new LockChatAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LockChatAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ILockChatAction): SyncAction.SyncActionValue.LockChatAction;

            /**
             * Encodes the specified LockChatAction message. Does not implicitly {@link SyncAction.SyncActionValue.LockChatAction.verify|verify} messages.
             * @param message LockChatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ILockChatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LockChatAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.LockChatAction.verify|verify} messages.
             * @param message LockChatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ILockChatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LockChatAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LockChatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.LockChatAction;

            /**
             * Decodes a LockChatAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LockChatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.LockChatAction;

            /**
             * Verifies a LockChatAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LockChatAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LockChatAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.LockChatAction;

            /**
             * Creates a plain object from a LockChatAction message. Also converts values to other types if specified.
             * @param message LockChatAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.LockChatAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LockChatAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LockChatAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MaibaAIFeaturesControlAction. */
        interface IMaibaAIFeaturesControlAction {

            /** MaibaAIFeaturesControlAction aiFeatureStatus */
            aiFeatureStatus?: (SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.MaibaAIFeatureStatus|null);
        }

        /** Represents a MaibaAIFeaturesControlAction. */
        class MaibaAIFeaturesControlAction implements IMaibaAIFeaturesControlAction {

            /**
             * Constructs a new MaibaAIFeaturesControlAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IMaibaAIFeaturesControlAction);

            /** MaibaAIFeaturesControlAction aiFeatureStatus. */
            public aiFeatureStatus?: (SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.MaibaAIFeatureStatus|null);

            /**
             * Creates a new MaibaAIFeaturesControlAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MaibaAIFeaturesControlAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IMaibaAIFeaturesControlAction): SyncAction.SyncActionValue.MaibaAIFeaturesControlAction;

            /**
             * Encodes the specified MaibaAIFeaturesControlAction message. Does not implicitly {@link SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.verify|verify} messages.
             * @param message MaibaAIFeaturesControlAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IMaibaAIFeaturesControlAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MaibaAIFeaturesControlAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.verify|verify} messages.
             * @param message MaibaAIFeaturesControlAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IMaibaAIFeaturesControlAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MaibaAIFeaturesControlAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MaibaAIFeaturesControlAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.MaibaAIFeaturesControlAction;

            /**
             * Decodes a MaibaAIFeaturesControlAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MaibaAIFeaturesControlAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.MaibaAIFeaturesControlAction;

            /**
             * Verifies a MaibaAIFeaturesControlAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MaibaAIFeaturesControlAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MaibaAIFeaturesControlAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.MaibaAIFeaturesControlAction;

            /**
             * Creates a plain object from a MaibaAIFeaturesControlAction message. Also converts values to other types if specified.
             * @param message MaibaAIFeaturesControlAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.MaibaAIFeaturesControlAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MaibaAIFeaturesControlAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MaibaAIFeaturesControlAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace MaibaAIFeaturesControlAction {

            /** MaibaAIFeatureStatus enum. */
            enum MaibaAIFeatureStatus {
                ENABLED = 0,
                ENABLED_HAS_LEARNING = 1,
                DISABLED = 2
            }
        }

        /** Properties of a MarkChatAsReadAction. */
        interface IMarkChatAsReadAction {

            /** MarkChatAsReadAction read */
            read?: (boolean|null);

            /** MarkChatAsReadAction messageRange */
            messageRange?: (SyncAction.SyncActionValue.ISyncActionMessageRange|null);
        }

        /** Represents a MarkChatAsReadAction. */
        class MarkChatAsReadAction implements IMarkChatAsReadAction {

            /**
             * Constructs a new MarkChatAsReadAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IMarkChatAsReadAction);

            /** MarkChatAsReadAction read. */
            public read?: (boolean|null);

            /** MarkChatAsReadAction messageRange. */
            public messageRange?: (SyncAction.SyncActionValue.ISyncActionMessageRange|null);

            /**
             * Creates a new MarkChatAsReadAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MarkChatAsReadAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IMarkChatAsReadAction): SyncAction.SyncActionValue.MarkChatAsReadAction;

            /**
             * Encodes the specified MarkChatAsReadAction message. Does not implicitly {@link SyncAction.SyncActionValue.MarkChatAsReadAction.verify|verify} messages.
             * @param message MarkChatAsReadAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IMarkChatAsReadAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MarkChatAsReadAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.MarkChatAsReadAction.verify|verify} messages.
             * @param message MarkChatAsReadAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IMarkChatAsReadAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MarkChatAsReadAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MarkChatAsReadAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.MarkChatAsReadAction;

            /**
             * Decodes a MarkChatAsReadAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MarkChatAsReadAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.MarkChatAsReadAction;

            /**
             * Verifies a MarkChatAsReadAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MarkChatAsReadAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MarkChatAsReadAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.MarkChatAsReadAction;

            /**
             * Creates a plain object from a MarkChatAsReadAction message. Also converts values to other types if specified.
             * @param message MarkChatAsReadAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.MarkChatAsReadAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MarkChatAsReadAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MarkChatAsReadAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MarketingMessageAction. */
        interface IMarketingMessageAction {

            /** MarketingMessageAction name */
            name?: (string|null);

            /** MarketingMessageAction message */
            message?: (string|null);

            /** MarketingMessageAction type */
            type?: (SyncAction.SyncActionValue.MarketingMessageAction.MarketingMessagePrototypeType|null);

            /** MarketingMessageAction createdAt */
            createdAt?: (number|Long|null);

            /** MarketingMessageAction lastSentAt */
            lastSentAt?: (number|Long|null);

            /** MarketingMessageAction isDeleted */
            isDeleted?: (boolean|null);

            /** MarketingMessageAction mediaId */
            mediaId?: (string|null);
        }

        /** Represents a MarketingMessageAction. */
        class MarketingMessageAction implements IMarketingMessageAction {

            /**
             * Constructs a new MarketingMessageAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IMarketingMessageAction);

            /** MarketingMessageAction name. */
            public name?: (string|null);

            /** MarketingMessageAction message. */
            public message?: (string|null);

            /** MarketingMessageAction type. */
            public type?: (SyncAction.SyncActionValue.MarketingMessageAction.MarketingMessagePrototypeType|null);

            /** MarketingMessageAction createdAt. */
            public createdAt?: (number|Long|null);

            /** MarketingMessageAction lastSentAt. */
            public lastSentAt?: (number|Long|null);

            /** MarketingMessageAction isDeleted. */
            public isDeleted?: (boolean|null);

            /** MarketingMessageAction mediaId. */
            public mediaId?: (string|null);

            /**
             * Creates a new MarketingMessageAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MarketingMessageAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IMarketingMessageAction): SyncAction.SyncActionValue.MarketingMessageAction;

            /**
             * Encodes the specified MarketingMessageAction message. Does not implicitly {@link SyncAction.SyncActionValue.MarketingMessageAction.verify|verify} messages.
             * @param message MarketingMessageAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IMarketingMessageAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MarketingMessageAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.MarketingMessageAction.verify|verify} messages.
             * @param message MarketingMessageAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IMarketingMessageAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MarketingMessageAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MarketingMessageAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.MarketingMessageAction;

            /**
             * Decodes a MarketingMessageAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MarketingMessageAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.MarketingMessageAction;

            /**
             * Verifies a MarketingMessageAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MarketingMessageAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MarketingMessageAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.MarketingMessageAction;

            /**
             * Creates a plain object from a MarketingMessageAction message. Also converts values to other types if specified.
             * @param message MarketingMessageAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.MarketingMessageAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MarketingMessageAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MarketingMessageAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace MarketingMessageAction {

            /** MarketingMessagePrototypeType enum. */
            enum MarketingMessagePrototypeType {
                PERSONALIZED = 0
            }
        }

        /** Properties of a MarketingMessageBroadcastAction. */
        interface IMarketingMessageBroadcastAction {

            /** MarketingMessageBroadcastAction repliedCount */
            repliedCount?: (number|null);
        }

        /** Represents a MarketingMessageBroadcastAction. */
        class MarketingMessageBroadcastAction implements IMarketingMessageBroadcastAction {

            /**
             * Constructs a new MarketingMessageBroadcastAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IMarketingMessageBroadcastAction);

            /** MarketingMessageBroadcastAction repliedCount. */
            public repliedCount?: (number|null);

            /**
             * Creates a new MarketingMessageBroadcastAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MarketingMessageBroadcastAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IMarketingMessageBroadcastAction): SyncAction.SyncActionValue.MarketingMessageBroadcastAction;

            /**
             * Encodes the specified MarketingMessageBroadcastAction message. Does not implicitly {@link SyncAction.SyncActionValue.MarketingMessageBroadcastAction.verify|verify} messages.
             * @param message MarketingMessageBroadcastAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IMarketingMessageBroadcastAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MarketingMessageBroadcastAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.MarketingMessageBroadcastAction.verify|verify} messages.
             * @param message MarketingMessageBroadcastAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IMarketingMessageBroadcastAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MarketingMessageBroadcastAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MarketingMessageBroadcastAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.MarketingMessageBroadcastAction;

            /**
             * Decodes a MarketingMessageBroadcastAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MarketingMessageBroadcastAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.MarketingMessageBroadcastAction;

            /**
             * Verifies a MarketingMessageBroadcastAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MarketingMessageBroadcastAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MarketingMessageBroadcastAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.MarketingMessageBroadcastAction;

            /**
             * Creates a plain object from a MarketingMessageBroadcastAction message. Also converts values to other types if specified.
             * @param message MarketingMessageBroadcastAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.MarketingMessageBroadcastAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MarketingMessageBroadcastAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MarketingMessageBroadcastAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MerchantPaymentPartnerAction. */
        interface IMerchantPaymentPartnerAction {

            /** MerchantPaymentPartnerAction status */
            status?: (SyncAction.SyncActionValue.MerchantPaymentPartnerAction.Status|null);

            /** MerchantPaymentPartnerAction country */
            country?: (string|null);

            /** MerchantPaymentPartnerAction gatewayName */
            gatewayName?: (string|null);

            /** MerchantPaymentPartnerAction credentialId */
            credentialId?: (string|null);
        }

        /** Represents a MerchantPaymentPartnerAction. */
        class MerchantPaymentPartnerAction implements IMerchantPaymentPartnerAction {

            /**
             * Constructs a new MerchantPaymentPartnerAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IMerchantPaymentPartnerAction);

            /** MerchantPaymentPartnerAction status. */
            public status?: (SyncAction.SyncActionValue.MerchantPaymentPartnerAction.Status|null);

            /** MerchantPaymentPartnerAction country. */
            public country?: (string|null);

            /** MerchantPaymentPartnerAction gatewayName. */
            public gatewayName?: (string|null);

            /** MerchantPaymentPartnerAction credentialId. */
            public credentialId?: (string|null);

            /**
             * Creates a new MerchantPaymentPartnerAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MerchantPaymentPartnerAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IMerchantPaymentPartnerAction): SyncAction.SyncActionValue.MerchantPaymentPartnerAction;

            /**
             * Encodes the specified MerchantPaymentPartnerAction message. Does not implicitly {@link SyncAction.SyncActionValue.MerchantPaymentPartnerAction.verify|verify} messages.
             * @param message MerchantPaymentPartnerAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IMerchantPaymentPartnerAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MerchantPaymentPartnerAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.MerchantPaymentPartnerAction.verify|verify} messages.
             * @param message MerchantPaymentPartnerAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IMerchantPaymentPartnerAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MerchantPaymentPartnerAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MerchantPaymentPartnerAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.MerchantPaymentPartnerAction;

            /**
             * Decodes a MerchantPaymentPartnerAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MerchantPaymentPartnerAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.MerchantPaymentPartnerAction;

            /**
             * Verifies a MerchantPaymentPartnerAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MerchantPaymentPartnerAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MerchantPaymentPartnerAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.MerchantPaymentPartnerAction;

            /**
             * Creates a plain object from a MerchantPaymentPartnerAction message. Also converts values to other types if specified.
             * @param message MerchantPaymentPartnerAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.MerchantPaymentPartnerAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MerchantPaymentPartnerAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MerchantPaymentPartnerAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace MerchantPaymentPartnerAction {

            /** Status enum. */
            enum Status {
                ACTIVE = 0,
                INACTIVE = 1
            }
        }

        /** Properties of a MusicUserIdAction. */
        interface IMusicUserIdAction {

            /** MusicUserIdAction musicUserId */
            musicUserId?: (string|null);

            /** MusicUserIdAction musicUserIdMap */
            musicUserIdMap?: ({ [k: string]: string }|null);
        }

        /** Represents a MusicUserIdAction. */
        class MusicUserIdAction implements IMusicUserIdAction {

            /**
             * Constructs a new MusicUserIdAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IMusicUserIdAction);

            /** MusicUserIdAction musicUserId. */
            public musicUserId?: (string|null);

            /** MusicUserIdAction musicUserIdMap. */
            public musicUserIdMap: { [k: string]: string };

            /**
             * Creates a new MusicUserIdAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MusicUserIdAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IMusicUserIdAction): SyncAction.SyncActionValue.MusicUserIdAction;

            /**
             * Encodes the specified MusicUserIdAction message. Does not implicitly {@link SyncAction.SyncActionValue.MusicUserIdAction.verify|verify} messages.
             * @param message MusicUserIdAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IMusicUserIdAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MusicUserIdAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.MusicUserIdAction.verify|verify} messages.
             * @param message MusicUserIdAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IMusicUserIdAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MusicUserIdAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MusicUserIdAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.MusicUserIdAction;

            /**
             * Decodes a MusicUserIdAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MusicUserIdAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.MusicUserIdAction;

            /**
             * Verifies a MusicUserIdAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MusicUserIdAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MusicUserIdAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.MusicUserIdAction;

            /**
             * Creates a plain object from a MusicUserIdAction message. Also converts values to other types if specified.
             * @param message MusicUserIdAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.MusicUserIdAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MusicUserIdAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MusicUserIdAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MuteAction. */
        interface IMuteAction {

            /** MuteAction muted */
            muted?: (boolean|null);

            /** MuteAction muteEndTimestamp */
            muteEndTimestamp?: (number|Long|null);

            /** MuteAction autoMuted */
            autoMuted?: (boolean|null);

            /** MuteAction muteEveryoneMentionEndTimestamp */
            muteEveryoneMentionEndTimestamp?: (number|Long|null);
        }

        /** Represents a MuteAction. */
        class MuteAction implements IMuteAction {

            /**
             * Constructs a new MuteAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IMuteAction);

            /** MuteAction muted. */
            public muted?: (boolean|null);

            /** MuteAction muteEndTimestamp. */
            public muteEndTimestamp?: (number|Long|null);

            /** MuteAction autoMuted. */
            public autoMuted?: (boolean|null);

            /** MuteAction muteEveryoneMentionEndTimestamp. */
            public muteEveryoneMentionEndTimestamp?: (number|Long|null);

            /**
             * Creates a new MuteAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MuteAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IMuteAction): SyncAction.SyncActionValue.MuteAction;

            /**
             * Encodes the specified MuteAction message. Does not implicitly {@link SyncAction.SyncActionValue.MuteAction.verify|verify} messages.
             * @param message MuteAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IMuteAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MuteAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.MuteAction.verify|verify} messages.
             * @param message MuteAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IMuteAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MuteAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MuteAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.MuteAction;

            /**
             * Decodes a MuteAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MuteAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.MuteAction;

            /**
             * Verifies a MuteAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MuteAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MuteAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.MuteAction;

            /**
             * Creates a plain object from a MuteAction message. Also converts values to other types if specified.
             * @param message MuteAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.MuteAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MuteAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MuteAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a NctSaltSyncAction. */
        interface INctSaltSyncAction {

            /** NctSaltSyncAction salt */
            salt?: (Uint8Array|null);
        }

        /** Represents a NctSaltSyncAction. */
        class NctSaltSyncAction implements INctSaltSyncAction {

            /**
             * Constructs a new NctSaltSyncAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.INctSaltSyncAction);

            /** NctSaltSyncAction salt. */
            public salt?: (Uint8Array|null);

            /**
             * Creates a new NctSaltSyncAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NctSaltSyncAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.INctSaltSyncAction): SyncAction.SyncActionValue.NctSaltSyncAction;

            /**
             * Encodes the specified NctSaltSyncAction message. Does not implicitly {@link SyncAction.SyncActionValue.NctSaltSyncAction.verify|verify} messages.
             * @param message NctSaltSyncAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.INctSaltSyncAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NctSaltSyncAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.NctSaltSyncAction.verify|verify} messages.
             * @param message NctSaltSyncAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.INctSaltSyncAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NctSaltSyncAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NctSaltSyncAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.NctSaltSyncAction;

            /**
             * Decodes a NctSaltSyncAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NctSaltSyncAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.NctSaltSyncAction;

            /**
             * Verifies a NctSaltSyncAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NctSaltSyncAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NctSaltSyncAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.NctSaltSyncAction;

            /**
             * Creates a plain object from a NctSaltSyncAction message. Also converts values to other types if specified.
             * @param message NctSaltSyncAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.NctSaltSyncAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NctSaltSyncAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for NctSaltSyncAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a NewsletterSavedInterestsAction. */
        interface INewsletterSavedInterestsAction {

            /** NewsletterSavedInterestsAction newsletterSavedInterests */
            newsletterSavedInterests?: (string|null);
        }

        /** Represents a NewsletterSavedInterestsAction. */
        class NewsletterSavedInterestsAction implements INewsletterSavedInterestsAction {

            /**
             * Constructs a new NewsletterSavedInterestsAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.INewsletterSavedInterestsAction);

            /** NewsletterSavedInterestsAction newsletterSavedInterests. */
            public newsletterSavedInterests?: (string|null);

            /**
             * Creates a new NewsletterSavedInterestsAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NewsletterSavedInterestsAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.INewsletterSavedInterestsAction): SyncAction.SyncActionValue.NewsletterSavedInterestsAction;

            /**
             * Encodes the specified NewsletterSavedInterestsAction message. Does not implicitly {@link SyncAction.SyncActionValue.NewsletterSavedInterestsAction.verify|verify} messages.
             * @param message NewsletterSavedInterestsAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.INewsletterSavedInterestsAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NewsletterSavedInterestsAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.NewsletterSavedInterestsAction.verify|verify} messages.
             * @param message NewsletterSavedInterestsAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.INewsletterSavedInterestsAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NewsletterSavedInterestsAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NewsletterSavedInterestsAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.NewsletterSavedInterestsAction;

            /**
             * Decodes a NewsletterSavedInterestsAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NewsletterSavedInterestsAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.NewsletterSavedInterestsAction;

            /**
             * Verifies a NewsletterSavedInterestsAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NewsletterSavedInterestsAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NewsletterSavedInterestsAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.NewsletterSavedInterestsAction;

            /**
             * Creates a plain object from a NewsletterSavedInterestsAction message. Also converts values to other types if specified.
             * @param message NewsletterSavedInterestsAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.NewsletterSavedInterestsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NewsletterSavedInterestsAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for NewsletterSavedInterestsAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a NoteEditAction. */
        interface INoteEditAction {

            /** NoteEditAction type */
            type?: (SyncAction.SyncActionValue.NoteEditAction.NoteType|null);

            /** NoteEditAction chatJid */
            chatJid?: (string|null);

            /** NoteEditAction createdAt */
            createdAt?: (number|Long|null);

            /** NoteEditAction deleted */
            deleted?: (boolean|null);

            /** NoteEditAction unstructuredContent */
            unstructuredContent?: (string|null);
        }

        /** Represents a NoteEditAction. */
        class NoteEditAction implements INoteEditAction {

            /**
             * Constructs a new NoteEditAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.INoteEditAction);

            /** NoteEditAction type. */
            public type?: (SyncAction.SyncActionValue.NoteEditAction.NoteType|null);

            /** NoteEditAction chatJid. */
            public chatJid?: (string|null);

            /** NoteEditAction createdAt. */
            public createdAt?: (number|Long|null);

            /** NoteEditAction deleted. */
            public deleted?: (boolean|null);

            /** NoteEditAction unstructuredContent. */
            public unstructuredContent?: (string|null);

            /**
             * Creates a new NoteEditAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NoteEditAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.INoteEditAction): SyncAction.SyncActionValue.NoteEditAction;

            /**
             * Encodes the specified NoteEditAction message. Does not implicitly {@link SyncAction.SyncActionValue.NoteEditAction.verify|verify} messages.
             * @param message NoteEditAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.INoteEditAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NoteEditAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.NoteEditAction.verify|verify} messages.
             * @param message NoteEditAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.INoteEditAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NoteEditAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NoteEditAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.NoteEditAction;

            /**
             * Decodes a NoteEditAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NoteEditAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.NoteEditAction;

            /**
             * Verifies a NoteEditAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NoteEditAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NoteEditAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.NoteEditAction;

            /**
             * Creates a plain object from a NoteEditAction message. Also converts values to other types if specified.
             * @param message NoteEditAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.NoteEditAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NoteEditAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for NoteEditAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace NoteEditAction {

            /** NoteType enum. */
            enum NoteType {
                UNSTRUCTURED = 1,
                STRUCTURED = 2
            }
        }

        /** Properties of a NotificationActivitySettingAction. */
        interface INotificationActivitySettingAction {

            /** NotificationActivitySettingAction notificationActivitySetting */
            notificationActivitySetting?: (SyncAction.SyncActionValue.NotificationActivitySettingAction.NotificationActivitySetting|null);
        }

        /** Represents a NotificationActivitySettingAction. */
        class NotificationActivitySettingAction implements INotificationActivitySettingAction {

            /**
             * Constructs a new NotificationActivitySettingAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.INotificationActivitySettingAction);

            /** NotificationActivitySettingAction notificationActivitySetting. */
            public notificationActivitySetting?: (SyncAction.SyncActionValue.NotificationActivitySettingAction.NotificationActivitySetting|null);

            /**
             * Creates a new NotificationActivitySettingAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NotificationActivitySettingAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.INotificationActivitySettingAction): SyncAction.SyncActionValue.NotificationActivitySettingAction;

            /**
             * Encodes the specified NotificationActivitySettingAction message. Does not implicitly {@link SyncAction.SyncActionValue.NotificationActivitySettingAction.verify|verify} messages.
             * @param message NotificationActivitySettingAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.INotificationActivitySettingAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NotificationActivitySettingAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.NotificationActivitySettingAction.verify|verify} messages.
             * @param message NotificationActivitySettingAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.INotificationActivitySettingAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NotificationActivitySettingAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NotificationActivitySettingAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.NotificationActivitySettingAction;

            /**
             * Decodes a NotificationActivitySettingAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NotificationActivitySettingAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.NotificationActivitySettingAction;

            /**
             * Verifies a NotificationActivitySettingAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NotificationActivitySettingAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NotificationActivitySettingAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.NotificationActivitySettingAction;

            /**
             * Creates a plain object from a NotificationActivitySettingAction message. Also converts values to other types if specified.
             * @param message NotificationActivitySettingAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.NotificationActivitySettingAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NotificationActivitySettingAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for NotificationActivitySettingAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace NotificationActivitySettingAction {

            /** NotificationActivitySetting enum. */
            enum NotificationActivitySetting {
                DEFAULT_ALL_MESSAGES = 0,
                ALL_MESSAGES = 1,
                HIGHLIGHTS = 2,
                DEFAULT_HIGHLIGHTS = 3
            }
        }

        /** Properties of a NuxAction. */
        interface INuxAction {

            /** NuxAction acknowledged */
            acknowledged?: (boolean|null);
        }

        /** Represents a NuxAction. */
        class NuxAction implements INuxAction {

            /**
             * Constructs a new NuxAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.INuxAction);

            /** NuxAction acknowledged. */
            public acknowledged?: (boolean|null);

            /**
             * Creates a new NuxAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NuxAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.INuxAction): SyncAction.SyncActionValue.NuxAction;

            /**
             * Encodes the specified NuxAction message. Does not implicitly {@link SyncAction.SyncActionValue.NuxAction.verify|verify} messages.
             * @param message NuxAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.INuxAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NuxAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.NuxAction.verify|verify} messages.
             * @param message NuxAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.INuxAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NuxAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NuxAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.NuxAction;

            /**
             * Decodes a NuxAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NuxAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.NuxAction;

            /**
             * Verifies a NuxAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NuxAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NuxAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.NuxAction;

            /**
             * Creates a plain object from a NuxAction message. Also converts values to other types if specified.
             * @param message NuxAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.NuxAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NuxAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for NuxAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an OutContactAction. */
        interface IOutContactAction {

            /** OutContactAction fullName */
            fullName?: (string|null);

            /** OutContactAction firstName */
            firstName?: (string|null);
        }

        /** Represents an OutContactAction. */
        class OutContactAction implements IOutContactAction {

            /**
             * Constructs a new OutContactAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IOutContactAction);

            /** OutContactAction fullName. */
            public fullName?: (string|null);

            /** OutContactAction firstName. */
            public firstName?: (string|null);

            /**
             * Creates a new OutContactAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OutContactAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IOutContactAction): SyncAction.SyncActionValue.OutContactAction;

            /**
             * Encodes the specified OutContactAction message. Does not implicitly {@link SyncAction.SyncActionValue.OutContactAction.verify|verify} messages.
             * @param message OutContactAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IOutContactAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OutContactAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.OutContactAction.verify|verify} messages.
             * @param message OutContactAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IOutContactAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OutContactAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OutContactAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.OutContactAction;

            /**
             * Decodes an OutContactAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OutContactAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.OutContactAction;

            /**
             * Verifies an OutContactAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OutContactAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OutContactAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.OutContactAction;

            /**
             * Creates a plain object from an OutContactAction message. Also converts values to other types if specified.
             * @param message OutContactAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.OutContactAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OutContactAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for OutContactAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PaymentInfoAction. */
        interface IPaymentInfoAction {

            /** PaymentInfoAction cpi */
            cpi?: (string|null);
        }

        /** Represents a PaymentInfoAction. */
        class PaymentInfoAction implements IPaymentInfoAction {

            /**
             * Constructs a new PaymentInfoAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPaymentInfoAction);

            /** PaymentInfoAction cpi. */
            public cpi?: (string|null);

            /**
             * Creates a new PaymentInfoAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PaymentInfoAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPaymentInfoAction): SyncAction.SyncActionValue.PaymentInfoAction;

            /**
             * Encodes the specified PaymentInfoAction message. Does not implicitly {@link SyncAction.SyncActionValue.PaymentInfoAction.verify|verify} messages.
             * @param message PaymentInfoAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPaymentInfoAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PaymentInfoAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PaymentInfoAction.verify|verify} messages.
             * @param message PaymentInfoAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPaymentInfoAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PaymentInfoAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PaymentInfoAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PaymentInfoAction;

            /**
             * Decodes a PaymentInfoAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PaymentInfoAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PaymentInfoAction;

            /**
             * Verifies a PaymentInfoAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PaymentInfoAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PaymentInfoAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PaymentInfoAction;

            /**
             * Creates a plain object from a PaymentInfoAction message. Also converts values to other types if specified.
             * @param message PaymentInfoAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PaymentInfoAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PaymentInfoAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PaymentInfoAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PaymentTosAction. */
        interface IPaymentTosAction {

            /** PaymentTosAction paymentNotice */
            paymentNotice?: (SyncAction.SyncActionValue.PaymentTosAction.PaymentNotice|null);

            /** PaymentTosAction accepted */
            accepted?: (boolean|null);
        }

        /** Represents a PaymentTosAction. */
        class PaymentTosAction implements IPaymentTosAction {

            /**
             * Constructs a new PaymentTosAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPaymentTosAction);

            /** PaymentTosAction paymentNotice. */
            public paymentNotice?: (SyncAction.SyncActionValue.PaymentTosAction.PaymentNotice|null);

            /** PaymentTosAction accepted. */
            public accepted?: (boolean|null);

            /**
             * Creates a new PaymentTosAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PaymentTosAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPaymentTosAction): SyncAction.SyncActionValue.PaymentTosAction;

            /**
             * Encodes the specified PaymentTosAction message. Does not implicitly {@link SyncAction.SyncActionValue.PaymentTosAction.verify|verify} messages.
             * @param message PaymentTosAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPaymentTosAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PaymentTosAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PaymentTosAction.verify|verify} messages.
             * @param message PaymentTosAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPaymentTosAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PaymentTosAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PaymentTosAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PaymentTosAction;

            /**
             * Decodes a PaymentTosAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PaymentTosAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PaymentTosAction;

            /**
             * Verifies a PaymentTosAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PaymentTosAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PaymentTosAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PaymentTosAction;

            /**
             * Creates a plain object from a PaymentTosAction message. Also converts values to other types if specified.
             * @param message PaymentTosAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PaymentTosAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PaymentTosAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PaymentTosAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace PaymentTosAction {

            /** PaymentNotice enum. */
            enum PaymentNotice {
                BR_PAY_PRIVACY_POLICY = 0
            }
        }

        /** Properties of a PinAction. */
        interface IPinAction {

            /** PinAction pinned */
            pinned?: (boolean|null);
        }

        /** Represents a PinAction. */
        class PinAction implements IPinAction {

            /**
             * Constructs a new PinAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPinAction);

            /** PinAction pinned. */
            public pinned?: (boolean|null);

            /**
             * Creates a new PinAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PinAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPinAction): SyncAction.SyncActionValue.PinAction;

            /**
             * Encodes the specified PinAction message. Does not implicitly {@link SyncAction.SyncActionValue.PinAction.verify|verify} messages.
             * @param message PinAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPinAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PinAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PinAction.verify|verify} messages.
             * @param message PinAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPinAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PinAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PinAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PinAction;

            /**
             * Decodes a PinAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PinAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PinAction;

            /**
             * Verifies a PinAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PinAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PinAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PinAction;

            /**
             * Creates a plain object from a PinAction message. Also converts values to other types if specified.
             * @param message PinAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PinAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PinAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PinAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PnForLidChatAction. */
        interface IPnForLidChatAction {

            /** PnForLidChatAction pnJid */
            pnJid?: (string|null);
        }

        /** Represents a PnForLidChatAction. */
        class PnForLidChatAction implements IPnForLidChatAction {

            /**
             * Constructs a new PnForLidChatAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPnForLidChatAction);

            /** PnForLidChatAction pnJid. */
            public pnJid?: (string|null);

            /**
             * Creates a new PnForLidChatAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PnForLidChatAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPnForLidChatAction): SyncAction.SyncActionValue.PnForLidChatAction;

            /**
             * Encodes the specified PnForLidChatAction message. Does not implicitly {@link SyncAction.SyncActionValue.PnForLidChatAction.verify|verify} messages.
             * @param message PnForLidChatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPnForLidChatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PnForLidChatAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PnForLidChatAction.verify|verify} messages.
             * @param message PnForLidChatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPnForLidChatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PnForLidChatAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PnForLidChatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PnForLidChatAction;

            /**
             * Decodes a PnForLidChatAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PnForLidChatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PnForLidChatAction;

            /**
             * Verifies a PnForLidChatAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PnForLidChatAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PnForLidChatAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PnForLidChatAction;

            /**
             * Creates a plain object from a PnForLidChatAction message. Also converts values to other types if specified.
             * @param message PnForLidChatAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PnForLidChatAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PnForLidChatAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PnForLidChatAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PrimaryFeature. */
        interface IPrimaryFeature {

            /** PrimaryFeature flags */
            flags?: (string[]|null);
        }

        /** Represents a PrimaryFeature. */
        class PrimaryFeature implements IPrimaryFeature {

            /**
             * Constructs a new PrimaryFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPrimaryFeature);

            /** PrimaryFeature flags. */
            public flags: string[];

            /**
             * Creates a new PrimaryFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PrimaryFeature instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPrimaryFeature): SyncAction.SyncActionValue.PrimaryFeature;

            /**
             * Encodes the specified PrimaryFeature message. Does not implicitly {@link SyncAction.SyncActionValue.PrimaryFeature.verify|verify} messages.
             * @param message PrimaryFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPrimaryFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PrimaryFeature message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PrimaryFeature.verify|verify} messages.
             * @param message PrimaryFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPrimaryFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PrimaryFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PrimaryFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PrimaryFeature;

            /**
             * Decodes a PrimaryFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PrimaryFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PrimaryFeature;

            /**
             * Verifies a PrimaryFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PrimaryFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PrimaryFeature
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PrimaryFeature;

            /**
             * Creates a plain object from a PrimaryFeature message. Also converts values to other types if specified.
             * @param message PrimaryFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PrimaryFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PrimaryFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PrimaryFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PrimaryVersionAction. */
        interface IPrimaryVersionAction {

            /** PrimaryVersionAction version */
            version?: (string|null);
        }

        /** Represents a PrimaryVersionAction. */
        class PrimaryVersionAction implements IPrimaryVersionAction {

            /**
             * Constructs a new PrimaryVersionAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPrimaryVersionAction);

            /** PrimaryVersionAction version. */
            public version?: (string|null);

            /**
             * Creates a new PrimaryVersionAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PrimaryVersionAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPrimaryVersionAction): SyncAction.SyncActionValue.PrimaryVersionAction;

            /**
             * Encodes the specified PrimaryVersionAction message. Does not implicitly {@link SyncAction.SyncActionValue.PrimaryVersionAction.verify|verify} messages.
             * @param message PrimaryVersionAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPrimaryVersionAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PrimaryVersionAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PrimaryVersionAction.verify|verify} messages.
             * @param message PrimaryVersionAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPrimaryVersionAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PrimaryVersionAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PrimaryVersionAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PrimaryVersionAction;

            /**
             * Decodes a PrimaryVersionAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PrimaryVersionAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PrimaryVersionAction;

            /**
             * Verifies a PrimaryVersionAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PrimaryVersionAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PrimaryVersionAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PrimaryVersionAction;

            /**
             * Creates a plain object from a PrimaryVersionAction message. Also converts values to other types if specified.
             * @param message PrimaryVersionAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PrimaryVersionAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PrimaryVersionAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PrimaryVersionAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PrivacySettingChannelsPersonalisedRecommendationAction. */
        interface IPrivacySettingChannelsPersonalisedRecommendationAction {

            /** PrivacySettingChannelsPersonalisedRecommendationAction isUserOptedOut */
            isUserOptedOut?: (boolean|null);
        }

        /** Represents a PrivacySettingChannelsPersonalisedRecommendationAction. */
        class PrivacySettingChannelsPersonalisedRecommendationAction implements IPrivacySettingChannelsPersonalisedRecommendationAction {

            /**
             * Constructs a new PrivacySettingChannelsPersonalisedRecommendationAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPrivacySettingChannelsPersonalisedRecommendationAction);

            /** PrivacySettingChannelsPersonalisedRecommendationAction isUserOptedOut. */
            public isUserOptedOut?: (boolean|null);

            /**
             * Creates a new PrivacySettingChannelsPersonalisedRecommendationAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PrivacySettingChannelsPersonalisedRecommendationAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPrivacySettingChannelsPersonalisedRecommendationAction): SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction;

            /**
             * Encodes the specified PrivacySettingChannelsPersonalisedRecommendationAction message. Does not implicitly {@link SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.verify|verify} messages.
             * @param message PrivacySettingChannelsPersonalisedRecommendationAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPrivacySettingChannelsPersonalisedRecommendationAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PrivacySettingChannelsPersonalisedRecommendationAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.verify|verify} messages.
             * @param message PrivacySettingChannelsPersonalisedRecommendationAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPrivacySettingChannelsPersonalisedRecommendationAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PrivacySettingChannelsPersonalisedRecommendationAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PrivacySettingChannelsPersonalisedRecommendationAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction;

            /**
             * Decodes a PrivacySettingChannelsPersonalisedRecommendationAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PrivacySettingChannelsPersonalisedRecommendationAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction;

            /**
             * Verifies a PrivacySettingChannelsPersonalisedRecommendationAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PrivacySettingChannelsPersonalisedRecommendationAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PrivacySettingChannelsPersonalisedRecommendationAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction;

            /**
             * Creates a plain object from a PrivacySettingChannelsPersonalisedRecommendationAction message. Also converts values to other types if specified.
             * @param message PrivacySettingChannelsPersonalisedRecommendationAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PrivacySettingChannelsPersonalisedRecommendationAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PrivacySettingChannelsPersonalisedRecommendationAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PrivacySettingDisableLinkPreviewsAction. */
        interface IPrivacySettingDisableLinkPreviewsAction {

            /** PrivacySettingDisableLinkPreviewsAction isPreviewsDisabled */
            isPreviewsDisabled?: (boolean|null);
        }

        /** Represents a PrivacySettingDisableLinkPreviewsAction. */
        class PrivacySettingDisableLinkPreviewsAction implements IPrivacySettingDisableLinkPreviewsAction {

            /**
             * Constructs a new PrivacySettingDisableLinkPreviewsAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPrivacySettingDisableLinkPreviewsAction);

            /** PrivacySettingDisableLinkPreviewsAction isPreviewsDisabled. */
            public isPreviewsDisabled?: (boolean|null);

            /**
             * Creates a new PrivacySettingDisableLinkPreviewsAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PrivacySettingDisableLinkPreviewsAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPrivacySettingDisableLinkPreviewsAction): SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction;

            /**
             * Encodes the specified PrivacySettingDisableLinkPreviewsAction message. Does not implicitly {@link SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.verify|verify} messages.
             * @param message PrivacySettingDisableLinkPreviewsAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPrivacySettingDisableLinkPreviewsAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PrivacySettingDisableLinkPreviewsAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.verify|verify} messages.
             * @param message PrivacySettingDisableLinkPreviewsAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPrivacySettingDisableLinkPreviewsAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PrivacySettingDisableLinkPreviewsAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PrivacySettingDisableLinkPreviewsAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction;

            /**
             * Decodes a PrivacySettingDisableLinkPreviewsAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PrivacySettingDisableLinkPreviewsAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction;

            /**
             * Verifies a PrivacySettingDisableLinkPreviewsAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PrivacySettingDisableLinkPreviewsAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PrivacySettingDisableLinkPreviewsAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction;

            /**
             * Creates a plain object from a PrivacySettingDisableLinkPreviewsAction message. Also converts values to other types if specified.
             * @param message PrivacySettingDisableLinkPreviewsAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PrivacySettingDisableLinkPreviewsAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PrivacySettingDisableLinkPreviewsAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PrivacySettingRelayAllCalls. */
        interface IPrivacySettingRelayAllCalls {

            /** PrivacySettingRelayAllCalls isEnabled */
            isEnabled?: (boolean|null);
        }

        /** Represents a PrivacySettingRelayAllCalls. */
        class PrivacySettingRelayAllCalls implements IPrivacySettingRelayAllCalls {

            /**
             * Constructs a new PrivacySettingRelayAllCalls.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPrivacySettingRelayAllCalls);

            /** PrivacySettingRelayAllCalls isEnabled. */
            public isEnabled?: (boolean|null);

            /**
             * Creates a new PrivacySettingRelayAllCalls instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PrivacySettingRelayAllCalls instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPrivacySettingRelayAllCalls): SyncAction.SyncActionValue.PrivacySettingRelayAllCalls;

            /**
             * Encodes the specified PrivacySettingRelayAllCalls message. Does not implicitly {@link SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.verify|verify} messages.
             * @param message PrivacySettingRelayAllCalls message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPrivacySettingRelayAllCalls, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PrivacySettingRelayAllCalls message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.verify|verify} messages.
             * @param message PrivacySettingRelayAllCalls message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPrivacySettingRelayAllCalls, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PrivacySettingRelayAllCalls message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PrivacySettingRelayAllCalls
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PrivacySettingRelayAllCalls;

            /**
             * Decodes a PrivacySettingRelayAllCalls message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PrivacySettingRelayAllCalls
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PrivacySettingRelayAllCalls;

            /**
             * Verifies a PrivacySettingRelayAllCalls message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PrivacySettingRelayAllCalls message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PrivacySettingRelayAllCalls
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PrivacySettingRelayAllCalls;

            /**
             * Creates a plain object from a PrivacySettingRelayAllCalls message. Also converts values to other types if specified.
             * @param message PrivacySettingRelayAllCalls
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PrivacySettingRelayAllCalls, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PrivacySettingRelayAllCalls to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PrivacySettingRelayAllCalls
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PrivateProcessingSettingAction. */
        interface IPrivateProcessingSettingAction {

            /** PrivateProcessingSettingAction privateProcessingStatus */
            privateProcessingStatus?: (SyncAction.SyncActionValue.PrivateProcessingSettingAction.PrivateProcessingStatus|null);
        }

        /** Represents a PrivateProcessingSettingAction. */
        class PrivateProcessingSettingAction implements IPrivateProcessingSettingAction {

            /**
             * Constructs a new PrivateProcessingSettingAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPrivateProcessingSettingAction);

            /** PrivateProcessingSettingAction privateProcessingStatus. */
            public privateProcessingStatus?: (SyncAction.SyncActionValue.PrivateProcessingSettingAction.PrivateProcessingStatus|null);

            /**
             * Creates a new PrivateProcessingSettingAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PrivateProcessingSettingAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPrivateProcessingSettingAction): SyncAction.SyncActionValue.PrivateProcessingSettingAction;

            /**
             * Encodes the specified PrivateProcessingSettingAction message. Does not implicitly {@link SyncAction.SyncActionValue.PrivateProcessingSettingAction.verify|verify} messages.
             * @param message PrivateProcessingSettingAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPrivateProcessingSettingAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PrivateProcessingSettingAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PrivateProcessingSettingAction.verify|verify} messages.
             * @param message PrivateProcessingSettingAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPrivateProcessingSettingAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PrivateProcessingSettingAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PrivateProcessingSettingAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PrivateProcessingSettingAction;

            /**
             * Decodes a PrivateProcessingSettingAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PrivateProcessingSettingAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PrivateProcessingSettingAction;

            /**
             * Verifies a PrivateProcessingSettingAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PrivateProcessingSettingAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PrivateProcessingSettingAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PrivateProcessingSettingAction;

            /**
             * Creates a plain object from a PrivateProcessingSettingAction message. Also converts values to other types if specified.
             * @param message PrivateProcessingSettingAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PrivateProcessingSettingAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PrivateProcessingSettingAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PrivateProcessingSettingAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace PrivateProcessingSettingAction {

            /** PrivateProcessingStatus enum. */
            enum PrivateProcessingStatus {
                UNDEFINED = 0,
                ENABLED = 1,
                DISABLED = 2
            }
        }

        /** Properties of a PushNameSetting. */
        interface IPushNameSetting {

            /** PushNameSetting name */
            name?: (string|null);
        }

        /** Represents a PushNameSetting. */
        class PushNameSetting implements IPushNameSetting {

            /**
             * Constructs a new PushNameSetting.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IPushNameSetting);

            /** PushNameSetting name. */
            public name?: (string|null);

            /**
             * Creates a new PushNameSetting instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PushNameSetting instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IPushNameSetting): SyncAction.SyncActionValue.PushNameSetting;

            /**
             * Encodes the specified PushNameSetting message. Does not implicitly {@link SyncAction.SyncActionValue.PushNameSetting.verify|verify} messages.
             * @param message PushNameSetting message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IPushNameSetting, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PushNameSetting message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.PushNameSetting.verify|verify} messages.
             * @param message PushNameSetting message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IPushNameSetting, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PushNameSetting message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PushNameSetting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.PushNameSetting;

            /**
             * Decodes a PushNameSetting message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PushNameSetting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.PushNameSetting;

            /**
             * Verifies a PushNameSetting message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PushNameSetting message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PushNameSetting
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.PushNameSetting;

            /**
             * Creates a plain object from a PushNameSetting message. Also converts values to other types if specified.
             * @param message PushNameSetting
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.PushNameSetting, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PushNameSetting to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PushNameSetting
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a QuickReplyAction. */
        interface IQuickReplyAction {

            /** QuickReplyAction shortcut */
            shortcut?: (string|null);

            /** QuickReplyAction message */
            message?: (string|null);

            /** QuickReplyAction keywords */
            keywords?: (string[]|null);

            /** QuickReplyAction count */
            count?: (number|null);

            /** QuickReplyAction deleted */
            deleted?: (boolean|null);
        }

        /** Represents a QuickReplyAction. */
        class QuickReplyAction implements IQuickReplyAction {

            /**
             * Constructs a new QuickReplyAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IQuickReplyAction);

            /** QuickReplyAction shortcut. */
            public shortcut?: (string|null);

            /** QuickReplyAction message. */
            public message?: (string|null);

            /** QuickReplyAction keywords. */
            public keywords: string[];

            /** QuickReplyAction count. */
            public count?: (number|null);

            /** QuickReplyAction deleted. */
            public deleted?: (boolean|null);

            /**
             * Creates a new QuickReplyAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns QuickReplyAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IQuickReplyAction): SyncAction.SyncActionValue.QuickReplyAction;

            /**
             * Encodes the specified QuickReplyAction message. Does not implicitly {@link SyncAction.SyncActionValue.QuickReplyAction.verify|verify} messages.
             * @param message QuickReplyAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IQuickReplyAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified QuickReplyAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.QuickReplyAction.verify|verify} messages.
             * @param message QuickReplyAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IQuickReplyAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a QuickReplyAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns QuickReplyAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.QuickReplyAction;

            /**
             * Decodes a QuickReplyAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns QuickReplyAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.QuickReplyAction;

            /**
             * Verifies a QuickReplyAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a QuickReplyAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns QuickReplyAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.QuickReplyAction;

            /**
             * Creates a plain object from a QuickReplyAction message. Also converts values to other types if specified.
             * @param message QuickReplyAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.QuickReplyAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this QuickReplyAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for QuickReplyAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RecentEmojiWeightsAction. */
        interface IRecentEmojiWeightsAction {

            /** RecentEmojiWeightsAction weights */
            weights?: (SyncAction.IRecentEmojiWeight[]|null);
        }

        /** Represents a RecentEmojiWeightsAction. */
        class RecentEmojiWeightsAction implements IRecentEmojiWeightsAction {

            /**
             * Constructs a new RecentEmojiWeightsAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IRecentEmojiWeightsAction);

            /** RecentEmojiWeightsAction weights. */
            public weights: SyncAction.IRecentEmojiWeight[];

            /**
             * Creates a new RecentEmojiWeightsAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RecentEmojiWeightsAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IRecentEmojiWeightsAction): SyncAction.SyncActionValue.RecentEmojiWeightsAction;

            /**
             * Encodes the specified RecentEmojiWeightsAction message. Does not implicitly {@link SyncAction.SyncActionValue.RecentEmojiWeightsAction.verify|verify} messages.
             * @param message RecentEmojiWeightsAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IRecentEmojiWeightsAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RecentEmojiWeightsAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.RecentEmojiWeightsAction.verify|verify} messages.
             * @param message RecentEmojiWeightsAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IRecentEmojiWeightsAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RecentEmojiWeightsAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RecentEmojiWeightsAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.RecentEmojiWeightsAction;

            /**
             * Decodes a RecentEmojiWeightsAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RecentEmojiWeightsAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.RecentEmojiWeightsAction;

            /**
             * Verifies a RecentEmojiWeightsAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RecentEmojiWeightsAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RecentEmojiWeightsAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.RecentEmojiWeightsAction;

            /**
             * Creates a plain object from a RecentEmojiWeightsAction message. Also converts values to other types if specified.
             * @param message RecentEmojiWeightsAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.RecentEmojiWeightsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RecentEmojiWeightsAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RecentEmojiWeightsAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RemoveRecentStickerAction. */
        interface IRemoveRecentStickerAction {

            /** RemoveRecentStickerAction lastStickerSentTs */
            lastStickerSentTs?: (number|Long|null);
        }

        /** Represents a RemoveRecentStickerAction. */
        class RemoveRecentStickerAction implements IRemoveRecentStickerAction {

            /**
             * Constructs a new RemoveRecentStickerAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IRemoveRecentStickerAction);

            /** RemoveRecentStickerAction lastStickerSentTs. */
            public lastStickerSentTs?: (number|Long|null);

            /**
             * Creates a new RemoveRecentStickerAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RemoveRecentStickerAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IRemoveRecentStickerAction): SyncAction.SyncActionValue.RemoveRecentStickerAction;

            /**
             * Encodes the specified RemoveRecentStickerAction message. Does not implicitly {@link SyncAction.SyncActionValue.RemoveRecentStickerAction.verify|verify} messages.
             * @param message RemoveRecentStickerAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IRemoveRecentStickerAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RemoveRecentStickerAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.RemoveRecentStickerAction.verify|verify} messages.
             * @param message RemoveRecentStickerAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IRemoveRecentStickerAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RemoveRecentStickerAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RemoveRecentStickerAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.RemoveRecentStickerAction;

            /**
             * Decodes a RemoveRecentStickerAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RemoveRecentStickerAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.RemoveRecentStickerAction;

            /**
             * Verifies a RemoveRecentStickerAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RemoveRecentStickerAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RemoveRecentStickerAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.RemoveRecentStickerAction;

            /**
             * Creates a plain object from a RemoveRecentStickerAction message. Also converts values to other types if specified.
             * @param message RemoveRecentStickerAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.RemoveRecentStickerAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RemoveRecentStickerAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RemoveRecentStickerAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SettingsSyncAction. */
        interface ISettingsSyncAction {

            /** SettingsSyncAction startAtLogin */
            startAtLogin?: (boolean|null);

            /** SettingsSyncAction minimizeToTray */
            minimizeToTray?: (boolean|null);

            /** SettingsSyncAction language */
            language?: (string|null);

            /** SettingsSyncAction replaceTextWithEmoji */
            replaceTextWithEmoji?: (boolean|null);

            /** SettingsSyncAction bannerNotificationDisplayMode */
            bannerNotificationDisplayMode?: (SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode|null);

            /** SettingsSyncAction unreadCounterBadgeDisplayMode */
            unreadCounterBadgeDisplayMode?: (SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode|null);

            /** SettingsSyncAction isMessagesNotificationEnabled */
            isMessagesNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isCallsNotificationEnabled */
            isCallsNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isReactionsNotificationEnabled */
            isReactionsNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isStatusReactionsNotificationEnabled */
            isStatusReactionsNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isTextPreviewForNotificationEnabled */
            isTextPreviewForNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction defaultNotificationToneId */
            defaultNotificationToneId?: (number|null);

            /** SettingsSyncAction groupDefaultNotificationToneId */
            groupDefaultNotificationToneId?: (number|null);

            /** SettingsSyncAction appTheme */
            appTheme?: (number|null);

            /** SettingsSyncAction wallpaperId */
            wallpaperId?: (number|null);

            /** SettingsSyncAction isDoodleWallpaperEnabled */
            isDoodleWallpaperEnabled?: (boolean|null);

            /** SettingsSyncAction fontSize */
            fontSize?: (number|null);

            /** SettingsSyncAction isPhotosAutodownloadEnabled */
            isPhotosAutodownloadEnabled?: (boolean|null);

            /** SettingsSyncAction isAudiosAutodownloadEnabled */
            isAudiosAutodownloadEnabled?: (boolean|null);

            /** SettingsSyncAction isVideosAutodownloadEnabled */
            isVideosAutodownloadEnabled?: (boolean|null);

            /** SettingsSyncAction isDocumentsAutodownloadEnabled */
            isDocumentsAutodownloadEnabled?: (boolean|null);

            /** SettingsSyncAction disableLinkPreviews */
            disableLinkPreviews?: (boolean|null);

            /** SettingsSyncAction notificationToneId */
            notificationToneId?: (number|null);

            /** SettingsSyncAction mediaUploadQuality */
            mediaUploadQuality?: (SyncAction.SyncActionValue.SettingsSyncAction.MediaQualitySetting|null);

            /** SettingsSyncAction isSpellCheckEnabled */
            isSpellCheckEnabled?: (boolean|null);

            /** SettingsSyncAction isEnterToSendEnabled */
            isEnterToSendEnabled?: (boolean|null);

            /** SettingsSyncAction isGroupMessageNotificationEnabled */
            isGroupMessageNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isGroupReactionsNotificationEnabled */
            isGroupReactionsNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isStatusNotificationEnabled */
            isStatusNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction statusNotificationToneId */
            statusNotificationToneId?: (number|null);

            /** SettingsSyncAction shouldPlaySoundForCallNotification */
            shouldPlaySoundForCallNotification?: (boolean|null);

            /** SettingsSyncAction chatThemeId */
            chatThemeId?: (string|null);

            /** SettingsSyncAction colorSchemeId */
            colorSchemeId?: (string|null);
        }

        /** Represents a SettingsSyncAction. */
        class SettingsSyncAction implements ISettingsSyncAction {

            /**
             * Constructs a new SettingsSyncAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ISettingsSyncAction);

            /** SettingsSyncAction startAtLogin. */
            public startAtLogin?: (boolean|null);

            /** SettingsSyncAction minimizeToTray. */
            public minimizeToTray?: (boolean|null);

            /** SettingsSyncAction language. */
            public language?: (string|null);

            /** SettingsSyncAction replaceTextWithEmoji. */
            public replaceTextWithEmoji?: (boolean|null);

            /** SettingsSyncAction bannerNotificationDisplayMode. */
            public bannerNotificationDisplayMode?: (SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode|null);

            /** SettingsSyncAction unreadCounterBadgeDisplayMode. */
            public unreadCounterBadgeDisplayMode?: (SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode|null);

            /** SettingsSyncAction isMessagesNotificationEnabled. */
            public isMessagesNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isCallsNotificationEnabled. */
            public isCallsNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isReactionsNotificationEnabled. */
            public isReactionsNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isStatusReactionsNotificationEnabled. */
            public isStatusReactionsNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isTextPreviewForNotificationEnabled. */
            public isTextPreviewForNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction defaultNotificationToneId. */
            public defaultNotificationToneId?: (number|null);

            /** SettingsSyncAction groupDefaultNotificationToneId. */
            public groupDefaultNotificationToneId?: (number|null);

            /** SettingsSyncAction appTheme. */
            public appTheme?: (number|null);

            /** SettingsSyncAction wallpaperId. */
            public wallpaperId?: (number|null);

            /** SettingsSyncAction isDoodleWallpaperEnabled. */
            public isDoodleWallpaperEnabled?: (boolean|null);

            /** SettingsSyncAction fontSize. */
            public fontSize?: (number|null);

            /** SettingsSyncAction isPhotosAutodownloadEnabled. */
            public isPhotosAutodownloadEnabled?: (boolean|null);

            /** SettingsSyncAction isAudiosAutodownloadEnabled. */
            public isAudiosAutodownloadEnabled?: (boolean|null);

            /** SettingsSyncAction isVideosAutodownloadEnabled. */
            public isVideosAutodownloadEnabled?: (boolean|null);

            /** SettingsSyncAction isDocumentsAutodownloadEnabled. */
            public isDocumentsAutodownloadEnabled?: (boolean|null);

            /** SettingsSyncAction disableLinkPreviews. */
            public disableLinkPreviews?: (boolean|null);

            /** SettingsSyncAction notificationToneId. */
            public notificationToneId?: (number|null);

            /** SettingsSyncAction mediaUploadQuality. */
            public mediaUploadQuality?: (SyncAction.SyncActionValue.SettingsSyncAction.MediaQualitySetting|null);

            /** SettingsSyncAction isSpellCheckEnabled. */
            public isSpellCheckEnabled?: (boolean|null);

            /** SettingsSyncAction isEnterToSendEnabled. */
            public isEnterToSendEnabled?: (boolean|null);

            /** SettingsSyncAction isGroupMessageNotificationEnabled. */
            public isGroupMessageNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isGroupReactionsNotificationEnabled. */
            public isGroupReactionsNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction isStatusNotificationEnabled. */
            public isStatusNotificationEnabled?: (boolean|null);

            /** SettingsSyncAction statusNotificationToneId. */
            public statusNotificationToneId?: (number|null);

            /** SettingsSyncAction shouldPlaySoundForCallNotification. */
            public shouldPlaySoundForCallNotification?: (boolean|null);

            /** SettingsSyncAction chatThemeId. */
            public chatThemeId?: (string|null);

            /** SettingsSyncAction colorSchemeId. */
            public colorSchemeId?: (string|null);

            /**
             * Creates a new SettingsSyncAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SettingsSyncAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ISettingsSyncAction): SyncAction.SyncActionValue.SettingsSyncAction;

            /**
             * Encodes the specified SettingsSyncAction message. Does not implicitly {@link SyncAction.SyncActionValue.SettingsSyncAction.verify|verify} messages.
             * @param message SettingsSyncAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ISettingsSyncAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SettingsSyncAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.SettingsSyncAction.verify|verify} messages.
             * @param message SettingsSyncAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ISettingsSyncAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SettingsSyncAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SettingsSyncAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.SettingsSyncAction;

            /**
             * Decodes a SettingsSyncAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SettingsSyncAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.SettingsSyncAction;

            /**
             * Verifies a SettingsSyncAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SettingsSyncAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SettingsSyncAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.SettingsSyncAction;

            /**
             * Creates a plain object from a SettingsSyncAction message. Also converts values to other types if specified.
             * @param message SettingsSyncAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.SettingsSyncAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SettingsSyncAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SettingsSyncAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace SettingsSyncAction {

            /** DisplayMode enum. */
            enum DisplayMode {
                DISPLAY_MODE_UNKNOWN = 0,
                ALWAYS = 1,
                NEVER = 2,
                ONLY_WHEN_APP_IS_OPEN = 3
            }

            /** MediaQualitySetting enum. */
            enum MediaQualitySetting {
                MEDIA_QUALITY_UNKNOWN = 0,
                STANDARD = 1,
                HD = 2
            }

            /** SettingKey enum. */
            enum SettingKey {
                SETTING_KEY_UNKNOWN = 0,
                START_AT_LOGIN = 1,
                MINIMIZE_TO_TRAY = 2,
                LANGUAGE = 3,
                REPLACE_TEXT_WITH_EMOJI = 4,
                BANNER_NOTIFICATION_DISPLAY_MODE = 5,
                UNREAD_COUNTER_BADGE_DISPLAY_MODE = 6,
                IS_MESSAGES_NOTIFICATION_ENABLED = 7,
                IS_CALLS_NOTIFICATION_ENABLED = 8,
                IS_REACTIONS_NOTIFICATION_ENABLED = 9,
                IS_STATUS_REACTIONS_NOTIFICATION_ENABLED = 10,
                IS_TEXT_PREVIEW_FOR_NOTIFICATION_ENABLED = 11,
                DEFAULT_NOTIFICATION_TONE_ID = 12,
                GROUP_DEFAULT_NOTIFICATION_TONE_ID = 13,
                APP_THEME = 14,
                WALLPAPER_ID = 15,
                IS_DOODLE_WALLPAPER_ENABLED = 16,
                FONT_SIZE = 17,
                IS_PHOTOS_AUTODOWNLOAD_ENABLED = 18,
                IS_AUDIOS_AUTODOWNLOAD_ENABLED = 19,
                IS_VIDEOS_AUTODOWNLOAD_ENABLED = 20,
                IS_DOCUMENTS_AUTODOWNLOAD_ENABLED = 21,
                DISABLE_LINK_PREVIEWS = 22,
                NOTIFICATION_TONE_ID = 23,
                MEDIA_UPLOAD_QUALITY = 24,
                IS_SPELL_CHECK_ENABLED = 25,
                IS_ENTER_TO_SEND_ENABLED = 26,
                IS_GROUP_MESSAGE_NOTIFICATION_ENABLED = 27,
                IS_GROUP_REACTIONS_NOTIFICATION_ENABLED = 28,
                IS_STATUS_NOTIFICATION_ENABLED = 29,
                STATUS_NOTIFICATION_TONE_ID = 30,
                SHOULD_PLAY_SOUND_FOR_CALL_NOTIFICATION = 31,
                CHAT_THEME_ID = 32,
                COLOR_SCHEME_ID = 33
            }

            /** SettingPlatform enum. */
            enum SettingPlatform {
                PLATFORM_UNKNOWN = 0,
                WEB = 1,
                HYBRID = 2,
                WINDOWS = 3,
                MAC = 4
            }
        }

        /** Properties of a StarAction. */
        interface IStarAction {

            /** StarAction starred */
            starred?: (boolean|null);
        }

        /** Represents a StarAction. */
        class StarAction implements IStarAction {

            /**
             * Constructs a new StarAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IStarAction);

            /** StarAction starred. */
            public starred?: (boolean|null);

            /**
             * Creates a new StarAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StarAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IStarAction): SyncAction.SyncActionValue.StarAction;

            /**
             * Encodes the specified StarAction message. Does not implicitly {@link SyncAction.SyncActionValue.StarAction.verify|verify} messages.
             * @param message StarAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IStarAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StarAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.StarAction.verify|verify} messages.
             * @param message StarAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IStarAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StarAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StarAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.StarAction;

            /**
             * Decodes a StarAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StarAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.StarAction;

            /**
             * Verifies a StarAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StarAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StarAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.StarAction;

            /**
             * Creates a plain object from a StarAction message. Also converts values to other types if specified.
             * @param message StarAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.StarAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StarAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StarAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a StatusPostOptInNotificationPreferencesAction. */
        interface IStatusPostOptInNotificationPreferencesAction {

            /** StatusPostOptInNotificationPreferencesAction enabled */
            enabled?: (boolean|null);
        }

        /** Represents a StatusPostOptInNotificationPreferencesAction. */
        class StatusPostOptInNotificationPreferencesAction implements IStatusPostOptInNotificationPreferencesAction {

            /**
             * Constructs a new StatusPostOptInNotificationPreferencesAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IStatusPostOptInNotificationPreferencesAction);

            /** StatusPostOptInNotificationPreferencesAction enabled. */
            public enabled?: (boolean|null);

            /**
             * Creates a new StatusPostOptInNotificationPreferencesAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StatusPostOptInNotificationPreferencesAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IStatusPostOptInNotificationPreferencesAction): SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction;

            /**
             * Encodes the specified StatusPostOptInNotificationPreferencesAction message. Does not implicitly {@link SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.verify|verify} messages.
             * @param message StatusPostOptInNotificationPreferencesAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IStatusPostOptInNotificationPreferencesAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StatusPostOptInNotificationPreferencesAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.verify|verify} messages.
             * @param message StatusPostOptInNotificationPreferencesAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IStatusPostOptInNotificationPreferencesAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StatusPostOptInNotificationPreferencesAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StatusPostOptInNotificationPreferencesAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction;

            /**
             * Decodes a StatusPostOptInNotificationPreferencesAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StatusPostOptInNotificationPreferencesAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction;

            /**
             * Verifies a StatusPostOptInNotificationPreferencesAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StatusPostOptInNotificationPreferencesAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StatusPostOptInNotificationPreferencesAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction;

            /**
             * Creates a plain object from a StatusPostOptInNotificationPreferencesAction message. Also converts values to other types if specified.
             * @param message StatusPostOptInNotificationPreferencesAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StatusPostOptInNotificationPreferencesAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StatusPostOptInNotificationPreferencesAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a StatusPrivacyAction. */
        interface IStatusPrivacyAction {

            /** StatusPrivacyAction mode */
            mode?: (SyncAction.SyncActionValue.StatusPrivacyAction.StatusDistributionMode|null);

            /** StatusPrivacyAction userJid */
            userJid?: (string[]|null);

            /** StatusPrivacyAction shareToFB */
            shareToFB?: (boolean|null);

            /** StatusPrivacyAction shareToIG */
            shareToIG?: (boolean|null);

            /** StatusPrivacyAction customLists */
            customLists?: (SyncAction.SyncActionValue.StatusPrivacyAction.ICustomList[]|null);
        }

        /** Represents a StatusPrivacyAction. */
        class StatusPrivacyAction implements IStatusPrivacyAction {

            /**
             * Constructs a new StatusPrivacyAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IStatusPrivacyAction);

            /** StatusPrivacyAction mode. */
            public mode?: (SyncAction.SyncActionValue.StatusPrivacyAction.StatusDistributionMode|null);

            /** StatusPrivacyAction userJid. */
            public userJid: string[];

            /** StatusPrivacyAction shareToFB. */
            public shareToFB?: (boolean|null);

            /** StatusPrivacyAction shareToIG. */
            public shareToIG?: (boolean|null);

            /** StatusPrivacyAction customLists. */
            public customLists: SyncAction.SyncActionValue.StatusPrivacyAction.ICustomList[];

            /**
             * Creates a new StatusPrivacyAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StatusPrivacyAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IStatusPrivacyAction): SyncAction.SyncActionValue.StatusPrivacyAction;

            /**
             * Encodes the specified StatusPrivacyAction message. Does not implicitly {@link SyncAction.SyncActionValue.StatusPrivacyAction.verify|verify} messages.
             * @param message StatusPrivacyAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IStatusPrivacyAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StatusPrivacyAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.StatusPrivacyAction.verify|verify} messages.
             * @param message StatusPrivacyAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IStatusPrivacyAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StatusPrivacyAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StatusPrivacyAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.StatusPrivacyAction;

            /**
             * Decodes a StatusPrivacyAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StatusPrivacyAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.StatusPrivacyAction;

            /**
             * Verifies a StatusPrivacyAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StatusPrivacyAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StatusPrivacyAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.StatusPrivacyAction;

            /**
             * Creates a plain object from a StatusPrivacyAction message. Also converts values to other types if specified.
             * @param message StatusPrivacyAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.StatusPrivacyAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StatusPrivacyAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StatusPrivacyAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace StatusPrivacyAction {

            /** Properties of a CustomList. */
            interface ICustomList {

                /** CustomList listId */
                listId?: (string|null);

                /** CustomList name */
                name?: (string|null);

                /** CustomList emoji */
                emoji?: (string|null);

                /** CustomList isSelected */
                isSelected?: (boolean|null);

                /** CustomList userJid */
                userJid?: (string[]|null);
            }

            /** Represents a CustomList. */
            class CustomList implements ICustomList {

                /**
                 * Constructs a new CustomList.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: SyncAction.SyncActionValue.StatusPrivacyAction.ICustomList);

                /** CustomList listId. */
                public listId?: (string|null);

                /** CustomList name. */
                public name?: (string|null);

                /** CustomList emoji. */
                public emoji?: (string|null);

                /** CustomList isSelected. */
                public isSelected?: (boolean|null);

                /** CustomList userJid. */
                public userJid: string[];

                /**
                 * Creates a new CustomList instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CustomList instance
                 */
                public static create(properties?: SyncAction.SyncActionValue.StatusPrivacyAction.ICustomList): SyncAction.SyncActionValue.StatusPrivacyAction.CustomList;

                /**
                 * Encodes the specified CustomList message. Does not implicitly {@link SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.verify|verify} messages.
                 * @param message CustomList message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: SyncAction.SyncActionValue.StatusPrivacyAction.ICustomList, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CustomList message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.verify|verify} messages.
                 * @param message CustomList message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: SyncAction.SyncActionValue.StatusPrivacyAction.ICustomList, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CustomList message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CustomList
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.StatusPrivacyAction.CustomList;

                /**
                 * Decodes a CustomList message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CustomList
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.StatusPrivacyAction.CustomList;

                /**
                 * Verifies a CustomList message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CustomList message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CustomList
                 */
                public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.StatusPrivacyAction.CustomList;

                /**
                 * Creates a plain object from a CustomList message. Also converts values to other types if specified.
                 * @param message CustomList
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: SyncAction.SyncActionValue.StatusPrivacyAction.CustomList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CustomList to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for CustomList
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** StatusDistributionMode enum. */
            enum StatusDistributionMode {
                ALLOW_LIST = 0,
                DENY_LIST = 1,
                CONTACTS = 2,
                CLOSE_FRIENDS = 3,
                CUSTOM_LIST = 4
            }
        }

        /** Properties of a StickerAction. */
        interface IStickerAction {

            /** StickerAction url */
            url?: (string|null);

            /** StickerAction fileEncSha256 */
            fileEncSha256?: (Uint8Array|null);

            /** StickerAction mediaKey */
            mediaKey?: (Uint8Array|null);

            /** StickerAction mimetype */
            mimetype?: (string|null);

            /** StickerAction height */
            height?: (number|null);

            /** StickerAction width */
            width?: (number|null);

            /** StickerAction directPath */
            directPath?: (string|null);

            /** StickerAction fileLength */
            fileLength?: (number|Long|null);

            /** StickerAction isFavorite */
            isFavorite?: (boolean|null);

            /** StickerAction deviceIdHint */
            deviceIdHint?: (number|null);

            /** StickerAction isLottie */
            isLottie?: (boolean|null);

            /** StickerAction imageHash */
            imageHash?: (string|null);

            /** StickerAction isAvatarSticker */
            isAvatarSticker?: (boolean|null);
        }

        /** Represents a StickerAction. */
        class StickerAction implements IStickerAction {

            /**
             * Constructs a new StickerAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IStickerAction);

            /** StickerAction url. */
            public url?: (string|null);

            /** StickerAction fileEncSha256. */
            public fileEncSha256?: (Uint8Array|null);

            /** StickerAction mediaKey. */
            public mediaKey?: (Uint8Array|null);

            /** StickerAction mimetype. */
            public mimetype?: (string|null);

            /** StickerAction height. */
            public height?: (number|null);

            /** StickerAction width. */
            public width?: (number|null);

            /** StickerAction directPath. */
            public directPath?: (string|null);

            /** StickerAction fileLength. */
            public fileLength?: (number|Long|null);

            /** StickerAction isFavorite. */
            public isFavorite?: (boolean|null);

            /** StickerAction deviceIdHint. */
            public deviceIdHint?: (number|null);

            /** StickerAction isLottie. */
            public isLottie?: (boolean|null);

            /** StickerAction imageHash. */
            public imageHash?: (string|null);

            /** StickerAction isAvatarSticker. */
            public isAvatarSticker?: (boolean|null);

            /**
             * Creates a new StickerAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StickerAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IStickerAction): SyncAction.SyncActionValue.StickerAction;

            /**
             * Encodes the specified StickerAction message. Does not implicitly {@link SyncAction.SyncActionValue.StickerAction.verify|verify} messages.
             * @param message StickerAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IStickerAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StickerAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.StickerAction.verify|verify} messages.
             * @param message StickerAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IStickerAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StickerAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StickerAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.StickerAction;

            /**
             * Decodes a StickerAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StickerAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.StickerAction;

            /**
             * Verifies a StickerAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StickerAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StickerAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.StickerAction;

            /**
             * Creates a plain object from a StickerAction message. Also converts values to other types if specified.
             * @param message StickerAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.StickerAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StickerAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StickerAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SubscriptionAction. */
        interface ISubscriptionAction {

            /** SubscriptionAction isDeactivated */
            isDeactivated?: (boolean|null);

            /** SubscriptionAction isAutoRenewing */
            isAutoRenewing?: (boolean|null);

            /** SubscriptionAction expirationDate */
            expirationDate?: (number|Long|null);
        }

        /** Represents a SubscriptionAction. */
        class SubscriptionAction implements ISubscriptionAction {

            /**
             * Constructs a new SubscriptionAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ISubscriptionAction);

            /** SubscriptionAction isDeactivated. */
            public isDeactivated?: (boolean|null);

            /** SubscriptionAction isAutoRenewing. */
            public isAutoRenewing?: (boolean|null);

            /** SubscriptionAction expirationDate. */
            public expirationDate?: (number|Long|null);

            /**
             * Creates a new SubscriptionAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SubscriptionAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ISubscriptionAction): SyncAction.SyncActionValue.SubscriptionAction;

            /**
             * Encodes the specified SubscriptionAction message. Does not implicitly {@link SyncAction.SyncActionValue.SubscriptionAction.verify|verify} messages.
             * @param message SubscriptionAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ISubscriptionAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SubscriptionAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.SubscriptionAction.verify|verify} messages.
             * @param message SubscriptionAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ISubscriptionAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SubscriptionAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SubscriptionAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.SubscriptionAction;

            /**
             * Decodes a SubscriptionAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SubscriptionAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.SubscriptionAction;

            /**
             * Verifies a SubscriptionAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SubscriptionAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SubscriptionAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.SubscriptionAction;

            /**
             * Creates a plain object from a SubscriptionAction message. Also converts values to other types if specified.
             * @param message SubscriptionAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.SubscriptionAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SubscriptionAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SubscriptionAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SubscriptionsSyncV2Action. */
        interface ISubscriptionsSyncV2Action {

            /** SubscriptionsSyncV2Action subscriptions */
            subscriptions?: (SyncAction.SyncActionValue.SubscriptionsSyncV2Action.ISubscriptionInfo[]|null);

            /** SubscriptionsSyncV2Action paidFeature */
            paidFeature?: (SyncAction.SyncActionValue.SubscriptionsSyncV2Action.IPaidFeature[]|null);
        }

        /** Represents a SubscriptionsSyncV2Action. */
        class SubscriptionsSyncV2Action implements ISubscriptionsSyncV2Action {

            /**
             * Constructs a new SubscriptionsSyncV2Action.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ISubscriptionsSyncV2Action);

            /** SubscriptionsSyncV2Action subscriptions. */
            public subscriptions: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.ISubscriptionInfo[];

            /** SubscriptionsSyncV2Action paidFeature. */
            public paidFeature: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.IPaidFeature[];

            /**
             * Creates a new SubscriptionsSyncV2Action instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SubscriptionsSyncV2Action instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ISubscriptionsSyncV2Action): SyncAction.SyncActionValue.SubscriptionsSyncV2Action;

            /**
             * Encodes the specified SubscriptionsSyncV2Action message. Does not implicitly {@link SyncAction.SyncActionValue.SubscriptionsSyncV2Action.verify|verify} messages.
             * @param message SubscriptionsSyncV2Action message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ISubscriptionsSyncV2Action, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SubscriptionsSyncV2Action message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.SubscriptionsSyncV2Action.verify|verify} messages.
             * @param message SubscriptionsSyncV2Action message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ISubscriptionsSyncV2Action, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SubscriptionsSyncV2Action message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SubscriptionsSyncV2Action
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.SubscriptionsSyncV2Action;

            /**
             * Decodes a SubscriptionsSyncV2Action message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SubscriptionsSyncV2Action
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.SubscriptionsSyncV2Action;

            /**
             * Verifies a SubscriptionsSyncV2Action message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SubscriptionsSyncV2Action message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SubscriptionsSyncV2Action
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.SubscriptionsSyncV2Action;

            /**
             * Creates a plain object from a SubscriptionsSyncV2Action message. Also converts values to other types if specified.
             * @param message SubscriptionsSyncV2Action
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.SubscriptionsSyncV2Action, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SubscriptionsSyncV2Action to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SubscriptionsSyncV2Action
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace SubscriptionsSyncV2Action {

            /** Properties of a PaidFeature. */
            interface IPaidFeature {

                /** PaidFeature name */
                name?: (string|null);

                /** PaidFeature enabled */
                enabled?: (boolean|null);

                /** PaidFeature limit */
                limit?: (number|null);

                /** PaidFeature expirationTime */
                expirationTime?: (number|Long|null);
            }

            /** Represents a PaidFeature. */
            class PaidFeature implements IPaidFeature {

                /**
                 * Constructs a new PaidFeature.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.IPaidFeature);

                /** PaidFeature name. */
                public name?: (string|null);

                /** PaidFeature enabled. */
                public enabled?: (boolean|null);

                /** PaidFeature limit. */
                public limit?: (number|null);

                /** PaidFeature expirationTime. */
                public expirationTime?: (number|Long|null);

                /**
                 * Creates a new PaidFeature instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PaidFeature instance
                 */
                public static create(properties?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.IPaidFeature): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature;

                /**
                 * Encodes the specified PaidFeature message. Does not implicitly {@link SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.verify|verify} messages.
                 * @param message PaidFeature message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.IPaidFeature, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PaidFeature message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.verify|verify} messages.
                 * @param message PaidFeature message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.IPaidFeature, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PaidFeature message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PaidFeature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature;

                /**
                 * Decodes a PaidFeature message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PaidFeature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature;

                /**
                 * Verifies a PaidFeature message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PaidFeature message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PaidFeature
                 */
                public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature;

                /**
                 * Creates a plain object from a PaidFeature message. Also converts values to other types if specified.
                 * @param message PaidFeature
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PaidFeature to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PaidFeature
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a SubscriptionInfo. */
            interface ISubscriptionInfo {

                /** SubscriptionInfo id */
                id?: (string|null);

                /** SubscriptionInfo tier */
                tier?: (number|null);

                /** SubscriptionInfo status */
                status?: (string|null);

                /** SubscriptionInfo startTime */
                startTime?: (number|Long|null);

                /** SubscriptionInfo endTime */
                endTime?: (number|Long|null);

                /** SubscriptionInfo isPlatformChanged */
                isPlatformChanged?: (boolean|null);

                /** SubscriptionInfo source */
                source?: (string|null);

                /** SubscriptionInfo creationTime */
                creationTime?: (number|Long|null);
            }

            /** Represents a SubscriptionInfo. */
            class SubscriptionInfo implements ISubscriptionInfo {

                /**
                 * Constructs a new SubscriptionInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.ISubscriptionInfo);

                /** SubscriptionInfo id. */
                public id?: (string|null);

                /** SubscriptionInfo tier. */
                public tier?: (number|null);

                /** SubscriptionInfo status. */
                public status?: (string|null);

                /** SubscriptionInfo startTime. */
                public startTime?: (number|Long|null);

                /** SubscriptionInfo endTime. */
                public endTime?: (number|Long|null);

                /** SubscriptionInfo isPlatformChanged. */
                public isPlatformChanged?: (boolean|null);

                /** SubscriptionInfo source. */
                public source?: (string|null);

                /** SubscriptionInfo creationTime. */
                public creationTime?: (number|Long|null);

                /**
                 * Creates a new SubscriptionInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SubscriptionInfo instance
                 */
                public static create(properties?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.ISubscriptionInfo): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo;

                /**
                 * Encodes the specified SubscriptionInfo message. Does not implicitly {@link SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.verify|verify} messages.
                 * @param message SubscriptionInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.ISubscriptionInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SubscriptionInfo message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.verify|verify} messages.
                 * @param message SubscriptionInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.ISubscriptionInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SubscriptionInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SubscriptionInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo;

                /**
                 * Decodes a SubscriptionInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SubscriptionInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo;

                /**
                 * Verifies a SubscriptionInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SubscriptionInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SubscriptionInfo
                 */
                public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo;

                /**
                 * Creates a plain object from a SubscriptionInfo message. Also converts values to other types if specified.
                 * @param message SubscriptionInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SubscriptionInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SubscriptionInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a SyncActionMessage. */
        interface ISyncActionMessage {

            /** SyncActionMessage key */
            key?: (Protocol.IMessageKey|null);

            /** SyncActionMessage timestamp */
            timestamp?: (number|Long|null);
        }

        /** Represents a SyncActionMessage. */
        class SyncActionMessage implements ISyncActionMessage {

            /**
             * Constructs a new SyncActionMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ISyncActionMessage);

            /** SyncActionMessage key. */
            public key?: (Protocol.IMessageKey|null);

            /** SyncActionMessage timestamp. */
            public timestamp?: (number|Long|null);

            /**
             * Creates a new SyncActionMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SyncActionMessage instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ISyncActionMessage): SyncAction.SyncActionValue.SyncActionMessage;

            /**
             * Encodes the specified SyncActionMessage message. Does not implicitly {@link SyncAction.SyncActionValue.SyncActionMessage.verify|verify} messages.
             * @param message SyncActionMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ISyncActionMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SyncActionMessage message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.SyncActionMessage.verify|verify} messages.
             * @param message SyncActionMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ISyncActionMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SyncActionMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SyncActionMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.SyncActionMessage;

            /**
             * Decodes a SyncActionMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SyncActionMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.SyncActionMessage;

            /**
             * Verifies a SyncActionMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SyncActionMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SyncActionMessage
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.SyncActionMessage;

            /**
             * Creates a plain object from a SyncActionMessage message. Also converts values to other types if specified.
             * @param message SyncActionMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.SyncActionMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SyncActionMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SyncActionMessage
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SyncActionMessageRange. */
        interface ISyncActionMessageRange {

            /** SyncActionMessageRange lastMessageTimestamp */
            lastMessageTimestamp?: (number|Long|null);

            /** SyncActionMessageRange lastSystemMessageTimestamp */
            lastSystemMessageTimestamp?: (number|Long|null);

            /** SyncActionMessageRange messages */
            messages?: (SyncAction.SyncActionValue.ISyncActionMessage[]|null);
        }

        /** Represents a SyncActionMessageRange. */
        class SyncActionMessageRange implements ISyncActionMessageRange {

            /**
             * Constructs a new SyncActionMessageRange.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ISyncActionMessageRange);

            /** SyncActionMessageRange lastMessageTimestamp. */
            public lastMessageTimestamp?: (number|Long|null);

            /** SyncActionMessageRange lastSystemMessageTimestamp. */
            public lastSystemMessageTimestamp?: (number|Long|null);

            /** SyncActionMessageRange messages. */
            public messages: SyncAction.SyncActionValue.ISyncActionMessage[];

            /**
             * Creates a new SyncActionMessageRange instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SyncActionMessageRange instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ISyncActionMessageRange): SyncAction.SyncActionValue.SyncActionMessageRange;

            /**
             * Encodes the specified SyncActionMessageRange message. Does not implicitly {@link SyncAction.SyncActionValue.SyncActionMessageRange.verify|verify} messages.
             * @param message SyncActionMessageRange message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ISyncActionMessageRange, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SyncActionMessageRange message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.SyncActionMessageRange.verify|verify} messages.
             * @param message SyncActionMessageRange message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ISyncActionMessageRange, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SyncActionMessageRange message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SyncActionMessageRange
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.SyncActionMessageRange;

            /**
             * Decodes a SyncActionMessageRange message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SyncActionMessageRange
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.SyncActionMessageRange;

            /**
             * Verifies a SyncActionMessageRange message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SyncActionMessageRange message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SyncActionMessageRange
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.SyncActionMessageRange;

            /**
             * Creates a plain object from a SyncActionMessageRange message. Also converts values to other types if specified.
             * @param message SyncActionMessageRange
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.SyncActionMessageRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SyncActionMessageRange to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SyncActionMessageRange
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ThreadPinAction. */
        interface IThreadPinAction {

            /** ThreadPinAction pinned */
            pinned?: (boolean|null);
        }

        /** Represents a ThreadPinAction. */
        class ThreadPinAction implements IThreadPinAction {

            /**
             * Constructs a new ThreadPinAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IThreadPinAction);

            /** ThreadPinAction pinned. */
            public pinned?: (boolean|null);

            /**
             * Creates a new ThreadPinAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ThreadPinAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IThreadPinAction): SyncAction.SyncActionValue.ThreadPinAction;

            /**
             * Encodes the specified ThreadPinAction message. Does not implicitly {@link SyncAction.SyncActionValue.ThreadPinAction.verify|verify} messages.
             * @param message ThreadPinAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IThreadPinAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ThreadPinAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.ThreadPinAction.verify|verify} messages.
             * @param message ThreadPinAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IThreadPinAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ThreadPinAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ThreadPinAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.ThreadPinAction;

            /**
             * Decodes a ThreadPinAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ThreadPinAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.ThreadPinAction;

            /**
             * Verifies a ThreadPinAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ThreadPinAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ThreadPinAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.ThreadPinAction;

            /**
             * Creates a plain object from a ThreadPinAction message. Also converts values to other types if specified.
             * @param message ThreadPinAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.ThreadPinAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ThreadPinAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ThreadPinAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a TimeFormatAction. */
        interface ITimeFormatAction {

            /** TimeFormatAction isTwentyFourHourFormatEnabled */
            isTwentyFourHourFormatEnabled?: (boolean|null);
        }

        /** Represents a TimeFormatAction. */
        class TimeFormatAction implements ITimeFormatAction {

            /**
             * Constructs a new TimeFormatAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.ITimeFormatAction);

            /** TimeFormatAction isTwentyFourHourFormatEnabled. */
            public isTwentyFourHourFormatEnabled?: (boolean|null);

            /**
             * Creates a new TimeFormatAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TimeFormatAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.ITimeFormatAction): SyncAction.SyncActionValue.TimeFormatAction;

            /**
             * Encodes the specified TimeFormatAction message. Does not implicitly {@link SyncAction.SyncActionValue.TimeFormatAction.verify|verify} messages.
             * @param message TimeFormatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.ITimeFormatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TimeFormatAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.TimeFormatAction.verify|verify} messages.
             * @param message TimeFormatAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.ITimeFormatAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TimeFormatAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TimeFormatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.TimeFormatAction;

            /**
             * Decodes a TimeFormatAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TimeFormatAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.TimeFormatAction;

            /**
             * Verifies a TimeFormatAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TimeFormatAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TimeFormatAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.TimeFormatAction;

            /**
             * Creates a plain object from a TimeFormatAction message. Also converts values to other types if specified.
             * @param message TimeFormatAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.TimeFormatAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TimeFormatAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for TimeFormatAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a UGCBot. */
        interface IUGCBot {

            /** UGCBot definition */
            definition?: (Uint8Array|null);
        }

        /** Represents a UGCBot. */
        class UGCBot implements IUGCBot {

            /**
             * Constructs a new UGCBot.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IUGCBot);

            /** UGCBot definition. */
            public definition?: (Uint8Array|null);

            /**
             * Creates a new UGCBot instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UGCBot instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IUGCBot): SyncAction.SyncActionValue.UGCBot;

            /**
             * Encodes the specified UGCBot message. Does not implicitly {@link SyncAction.SyncActionValue.UGCBot.verify|verify} messages.
             * @param message UGCBot message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IUGCBot, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UGCBot message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.UGCBot.verify|verify} messages.
             * @param message UGCBot message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IUGCBot, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UGCBot message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UGCBot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.UGCBot;

            /**
             * Decodes a UGCBot message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UGCBot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.UGCBot;

            /**
             * Verifies a UGCBot message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UGCBot message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UGCBot
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.UGCBot;

            /**
             * Creates a plain object from a UGCBot message. Also converts values to other types if specified.
             * @param message UGCBot
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.UGCBot, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UGCBot to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UGCBot
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an UnarchiveChatsSetting. */
        interface IUnarchiveChatsSetting {

            /** UnarchiveChatsSetting unarchiveChats */
            unarchiveChats?: (boolean|null);
        }

        /** Represents an UnarchiveChatsSetting. */
        class UnarchiveChatsSetting implements IUnarchiveChatsSetting {

            /**
             * Constructs a new UnarchiveChatsSetting.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IUnarchiveChatsSetting);

            /** UnarchiveChatsSetting unarchiveChats. */
            public unarchiveChats?: (boolean|null);

            /**
             * Creates a new UnarchiveChatsSetting instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UnarchiveChatsSetting instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IUnarchiveChatsSetting): SyncAction.SyncActionValue.UnarchiveChatsSetting;

            /**
             * Encodes the specified UnarchiveChatsSetting message. Does not implicitly {@link SyncAction.SyncActionValue.UnarchiveChatsSetting.verify|verify} messages.
             * @param message UnarchiveChatsSetting message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IUnarchiveChatsSetting, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UnarchiveChatsSetting message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.UnarchiveChatsSetting.verify|verify} messages.
             * @param message UnarchiveChatsSetting message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IUnarchiveChatsSetting, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UnarchiveChatsSetting message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UnarchiveChatsSetting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.UnarchiveChatsSetting;

            /**
             * Decodes an UnarchiveChatsSetting message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UnarchiveChatsSetting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.UnarchiveChatsSetting;

            /**
             * Verifies an UnarchiveChatsSetting message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UnarchiveChatsSetting message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnarchiveChatsSetting
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.UnarchiveChatsSetting;

            /**
             * Creates a plain object from an UnarchiveChatsSetting message. Also converts values to other types if specified.
             * @param message UnarchiveChatsSetting
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.UnarchiveChatsSetting, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UnarchiveChatsSetting to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UnarchiveChatsSetting
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a UserStatusMuteAction. */
        interface IUserStatusMuteAction {

            /** UserStatusMuteAction muted */
            muted?: (boolean|null);
        }

        /** Represents a UserStatusMuteAction. */
        class UserStatusMuteAction implements IUserStatusMuteAction {

            /**
             * Constructs a new UserStatusMuteAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IUserStatusMuteAction);

            /** UserStatusMuteAction muted. */
            public muted?: (boolean|null);

            /**
             * Creates a new UserStatusMuteAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserStatusMuteAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IUserStatusMuteAction): SyncAction.SyncActionValue.UserStatusMuteAction;

            /**
             * Encodes the specified UserStatusMuteAction message. Does not implicitly {@link SyncAction.SyncActionValue.UserStatusMuteAction.verify|verify} messages.
             * @param message UserStatusMuteAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IUserStatusMuteAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UserStatusMuteAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.UserStatusMuteAction.verify|verify} messages.
             * @param message UserStatusMuteAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IUserStatusMuteAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UserStatusMuteAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserStatusMuteAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.UserStatusMuteAction;

            /**
             * Decodes a UserStatusMuteAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserStatusMuteAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.UserStatusMuteAction;

            /**
             * Verifies a UserStatusMuteAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UserStatusMuteAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserStatusMuteAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.UserStatusMuteAction;

            /**
             * Creates a plain object from a UserStatusMuteAction message. Also converts values to other types if specified.
             * @param message UserStatusMuteAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.UserStatusMuteAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UserStatusMuteAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UserStatusMuteAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a UsernameChatStartModeAction. */
        interface IUsernameChatStartModeAction {

            /** UsernameChatStartModeAction chatStartMode */
            chatStartMode?: (SyncAction.SyncActionValue.UsernameChatStartModeAction.ChatStartMode|null);
        }

        /** Represents a UsernameChatStartModeAction. */
        class UsernameChatStartModeAction implements IUsernameChatStartModeAction {

            /**
             * Constructs a new UsernameChatStartModeAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IUsernameChatStartModeAction);

            /** UsernameChatStartModeAction chatStartMode. */
            public chatStartMode?: (SyncAction.SyncActionValue.UsernameChatStartModeAction.ChatStartMode|null);

            /**
             * Creates a new UsernameChatStartModeAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UsernameChatStartModeAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IUsernameChatStartModeAction): SyncAction.SyncActionValue.UsernameChatStartModeAction;

            /**
             * Encodes the specified UsernameChatStartModeAction message. Does not implicitly {@link SyncAction.SyncActionValue.UsernameChatStartModeAction.verify|verify} messages.
             * @param message UsernameChatStartModeAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IUsernameChatStartModeAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UsernameChatStartModeAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.UsernameChatStartModeAction.verify|verify} messages.
             * @param message UsernameChatStartModeAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IUsernameChatStartModeAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UsernameChatStartModeAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UsernameChatStartModeAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.UsernameChatStartModeAction;

            /**
             * Decodes a UsernameChatStartModeAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UsernameChatStartModeAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.UsernameChatStartModeAction;

            /**
             * Verifies a UsernameChatStartModeAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UsernameChatStartModeAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UsernameChatStartModeAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.UsernameChatStartModeAction;

            /**
             * Creates a plain object from a UsernameChatStartModeAction message. Also converts values to other types if specified.
             * @param message UsernameChatStartModeAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.UsernameChatStartModeAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UsernameChatStartModeAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UsernameChatStartModeAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace UsernameChatStartModeAction {

            /** ChatStartMode enum. */
            enum ChatStartMode {
                LID = 1,
                PN = 2
            }
        }

        /** Properties of a WaffleAccountLinkStateAction. */
        interface IWaffleAccountLinkStateAction {

            /** WaffleAccountLinkStateAction linkState */
            linkState?: (SyncAction.SyncActionValue.WaffleAccountLinkStateAction.AccountLinkState|null);
        }

        /** Represents a WaffleAccountLinkStateAction. */
        class WaffleAccountLinkStateAction implements IWaffleAccountLinkStateAction {

            /**
             * Constructs a new WaffleAccountLinkStateAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IWaffleAccountLinkStateAction);

            /** WaffleAccountLinkStateAction linkState. */
            public linkState?: (SyncAction.SyncActionValue.WaffleAccountLinkStateAction.AccountLinkState|null);

            /**
             * Creates a new WaffleAccountLinkStateAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WaffleAccountLinkStateAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IWaffleAccountLinkStateAction): SyncAction.SyncActionValue.WaffleAccountLinkStateAction;

            /**
             * Encodes the specified WaffleAccountLinkStateAction message. Does not implicitly {@link SyncAction.SyncActionValue.WaffleAccountLinkStateAction.verify|verify} messages.
             * @param message WaffleAccountLinkStateAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IWaffleAccountLinkStateAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WaffleAccountLinkStateAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.WaffleAccountLinkStateAction.verify|verify} messages.
             * @param message WaffleAccountLinkStateAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IWaffleAccountLinkStateAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WaffleAccountLinkStateAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WaffleAccountLinkStateAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.WaffleAccountLinkStateAction;

            /**
             * Decodes a WaffleAccountLinkStateAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WaffleAccountLinkStateAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.WaffleAccountLinkStateAction;

            /**
             * Verifies a WaffleAccountLinkStateAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WaffleAccountLinkStateAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WaffleAccountLinkStateAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.WaffleAccountLinkStateAction;

            /**
             * Creates a plain object from a WaffleAccountLinkStateAction message. Also converts values to other types if specified.
             * @param message WaffleAccountLinkStateAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.WaffleAccountLinkStateAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WaffleAccountLinkStateAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for WaffleAccountLinkStateAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace WaffleAccountLinkStateAction {

            /** AccountLinkState enum. */
            enum AccountLinkState {
                ACTIVE = 0,
                PAUSED = 1,
                UNLINKED = 2
            }
        }

        /** Properties of a WamoUserIdentifierAction. */
        interface IWamoUserIdentifierAction {

            /** WamoUserIdentifierAction identifier */
            identifier?: (string|null);
        }

        /** Represents a WamoUserIdentifierAction. */
        class WamoUserIdentifierAction implements IWamoUserIdentifierAction {

            /**
             * Constructs a new WamoUserIdentifierAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.SyncActionValue.IWamoUserIdentifierAction);

            /** WamoUserIdentifierAction identifier. */
            public identifier?: (string|null);

            /**
             * Creates a new WamoUserIdentifierAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WamoUserIdentifierAction instance
             */
            public static create(properties?: SyncAction.SyncActionValue.IWamoUserIdentifierAction): SyncAction.SyncActionValue.WamoUserIdentifierAction;

            /**
             * Encodes the specified WamoUserIdentifierAction message. Does not implicitly {@link SyncAction.SyncActionValue.WamoUserIdentifierAction.verify|verify} messages.
             * @param message WamoUserIdentifierAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.SyncActionValue.IWamoUserIdentifierAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WamoUserIdentifierAction message, length delimited. Does not implicitly {@link SyncAction.SyncActionValue.WamoUserIdentifierAction.verify|verify} messages.
             * @param message WamoUserIdentifierAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.SyncActionValue.IWamoUserIdentifierAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WamoUserIdentifierAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WamoUserIdentifierAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.SyncActionValue.WamoUserIdentifierAction;

            /**
             * Decodes a WamoUserIdentifierAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WamoUserIdentifierAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.SyncActionValue.WamoUserIdentifierAction;

            /**
             * Verifies a WamoUserIdentifierAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WamoUserIdentifierAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WamoUserIdentifierAction
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.SyncActionValue.WamoUserIdentifierAction;

            /**
             * Creates a plain object from a WamoUserIdentifierAction message. Also converts values to other types if specified.
             * @param message WamoUserIdentifierAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.SyncActionValue.WamoUserIdentifierAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WamoUserIdentifierAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for WamoUserIdentifierAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a CallLogRecord. */
    interface ICallLogRecord {

        /** CallLogRecord callResult */
        callResult?: (SyncAction.CallLogRecord.CallResult|null);

        /** CallLogRecord isDndMode */
        isDndMode?: (boolean|null);

        /** CallLogRecord silenceReason */
        silenceReason?: (SyncAction.CallLogRecord.SilenceReason|null);

        /** CallLogRecord duration */
        duration?: (number|Long|null);

        /** CallLogRecord startTime */
        startTime?: (number|Long|null);

        /** CallLogRecord isIncoming */
        isIncoming?: (boolean|null);

        /** CallLogRecord isVideo */
        isVideo?: (boolean|null);

        /** CallLogRecord isCallLink */
        isCallLink?: (boolean|null);

        /** CallLogRecord callLinkToken */
        callLinkToken?: (string|null);

        /** CallLogRecord scheduledCallId */
        scheduledCallId?: (string|null);

        /** CallLogRecord callId */
        callId?: (string|null);

        /** CallLogRecord callCreatorJid */
        callCreatorJid?: (string|null);

        /** CallLogRecord groupJid */
        groupJid?: (string|null);

        /** CallLogRecord participants */
        participants?: (SyncAction.CallLogRecord.IParticipantInfo[]|null);

        /** CallLogRecord callType */
        callType?: (SyncAction.CallLogRecord.CallType|null);
    }

    /** Represents a CallLogRecord. */
    class CallLogRecord implements ICallLogRecord {

        /**
         * Constructs a new CallLogRecord.
         * @param [properties] Properties to set
         */
        constructor(properties?: SyncAction.ICallLogRecord);

        /** CallLogRecord callResult. */
        public callResult?: (SyncAction.CallLogRecord.CallResult|null);

        /** CallLogRecord isDndMode. */
        public isDndMode?: (boolean|null);

        /** CallLogRecord silenceReason. */
        public silenceReason?: (SyncAction.CallLogRecord.SilenceReason|null);

        /** CallLogRecord duration. */
        public duration?: (number|Long|null);

        /** CallLogRecord startTime. */
        public startTime?: (number|Long|null);

        /** CallLogRecord isIncoming. */
        public isIncoming?: (boolean|null);

        /** CallLogRecord isVideo. */
        public isVideo?: (boolean|null);

        /** CallLogRecord isCallLink. */
        public isCallLink?: (boolean|null);

        /** CallLogRecord callLinkToken. */
        public callLinkToken?: (string|null);

        /** CallLogRecord scheduledCallId. */
        public scheduledCallId?: (string|null);

        /** CallLogRecord callId. */
        public callId?: (string|null);

        /** CallLogRecord callCreatorJid. */
        public callCreatorJid?: (string|null);

        /** CallLogRecord groupJid. */
        public groupJid?: (string|null);

        /** CallLogRecord participants. */
        public participants: SyncAction.CallLogRecord.IParticipantInfo[];

        /** CallLogRecord callType. */
        public callType?: (SyncAction.CallLogRecord.CallType|null);

        /**
         * Creates a new CallLogRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CallLogRecord instance
         */
        public static create(properties?: SyncAction.ICallLogRecord): SyncAction.CallLogRecord;

        /**
         * Encodes the specified CallLogRecord message. Does not implicitly {@link SyncAction.CallLogRecord.verify|verify} messages.
         * @param message CallLogRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SyncAction.ICallLogRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CallLogRecord message, length delimited. Does not implicitly {@link SyncAction.CallLogRecord.verify|verify} messages.
         * @param message CallLogRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: SyncAction.ICallLogRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CallLogRecord message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CallLogRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.CallLogRecord;

        /**
         * Decodes a CallLogRecord message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CallLogRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.CallLogRecord;

        /**
         * Verifies a CallLogRecord message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CallLogRecord message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CallLogRecord
         */
        public static fromObject(object: { [k: string]: any }): SyncAction.CallLogRecord;

        /**
         * Creates a plain object from a CallLogRecord message. Also converts values to other types if specified.
         * @param message CallLogRecord
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SyncAction.CallLogRecord, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CallLogRecord to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CallLogRecord
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CallLogRecord {

        /** CallResult enum. */
        enum CallResult {
            CONNECTED = 0,
            REJECTED = 1,
            CANCELLED = 2,
            ACCEPTEDELSEWHERE = 3,
            MISSED = 4,
            INVALID = 5,
            UNAVAILABLE = 6,
            UPCOMING = 7,
            FAILED = 8,
            ABANDONED = 9,
            ONGOING = 10
        }

        /** CallType enum. */
        enum CallType {
            REGULAR = 0,
            SCHEDULED_CALL = 1,
            VOICE_CHAT = 2
        }

        /** Properties of a ParticipantInfo. */
        interface IParticipantInfo {

            /** ParticipantInfo userJid */
            userJid?: (string|null);

            /** ParticipantInfo callResult */
            callResult?: (SyncAction.CallLogRecord.CallResult|null);
        }

        /** Represents a ParticipantInfo. */
        class ParticipantInfo implements IParticipantInfo {

            /**
             * Constructs a new ParticipantInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: SyncAction.CallLogRecord.IParticipantInfo);

            /** ParticipantInfo userJid. */
            public userJid?: (string|null);

            /** ParticipantInfo callResult. */
            public callResult?: (SyncAction.CallLogRecord.CallResult|null);

            /**
             * Creates a new ParticipantInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ParticipantInfo instance
             */
            public static create(properties?: SyncAction.CallLogRecord.IParticipantInfo): SyncAction.CallLogRecord.ParticipantInfo;

            /**
             * Encodes the specified ParticipantInfo message. Does not implicitly {@link SyncAction.CallLogRecord.ParticipantInfo.verify|verify} messages.
             * @param message ParticipantInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: SyncAction.CallLogRecord.IParticipantInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ParticipantInfo message, length delimited. Does not implicitly {@link SyncAction.CallLogRecord.ParticipantInfo.verify|verify} messages.
             * @param message ParticipantInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: SyncAction.CallLogRecord.IParticipantInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ParticipantInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ParticipantInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.CallLogRecord.ParticipantInfo;

            /**
             * Decodes a ParticipantInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ParticipantInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.CallLogRecord.ParticipantInfo;

            /**
             * Verifies a ParticipantInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ParticipantInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ParticipantInfo
             */
            public static fromObject(object: { [k: string]: any }): SyncAction.CallLogRecord.ParticipantInfo;

            /**
             * Creates a plain object from a ParticipantInfo message. Also converts values to other types if specified.
             * @param message ParticipantInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: SyncAction.CallLogRecord.ParticipantInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ParticipantInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ParticipantInfo
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** SilenceReason enum. */
        enum SilenceReason {
            NONE = 0,
            SCHEDULED = 1,
            PRIVACY = 2,
            LIGHTWEIGHT = 3
        }
    }

    /** Properties of a RecentEmojiWeight. */
    interface IRecentEmojiWeight {

        /** RecentEmojiWeight emoji */
        emoji?: (string|null);

        /** RecentEmojiWeight weight */
        weight?: (number|null);
    }

    /** Represents a RecentEmojiWeight. */
    class RecentEmojiWeight implements IRecentEmojiWeight {

        /**
         * Constructs a new RecentEmojiWeight.
         * @param [properties] Properties to set
         */
        constructor(properties?: SyncAction.IRecentEmojiWeight);

        /** RecentEmojiWeight emoji. */
        public emoji?: (string|null);

        /** RecentEmojiWeight weight. */
        public weight?: (number|null);

        /**
         * Creates a new RecentEmojiWeight instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RecentEmojiWeight instance
         */
        public static create(properties?: SyncAction.IRecentEmojiWeight): SyncAction.RecentEmojiWeight;

        /**
         * Encodes the specified RecentEmojiWeight message. Does not implicitly {@link SyncAction.RecentEmojiWeight.verify|verify} messages.
         * @param message RecentEmojiWeight message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SyncAction.IRecentEmojiWeight, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RecentEmojiWeight message, length delimited. Does not implicitly {@link SyncAction.RecentEmojiWeight.verify|verify} messages.
         * @param message RecentEmojiWeight message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: SyncAction.IRecentEmojiWeight, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RecentEmojiWeight message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RecentEmojiWeight
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SyncAction.RecentEmojiWeight;

        /**
         * Decodes a RecentEmojiWeight message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RecentEmojiWeight
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SyncAction.RecentEmojiWeight;

        /**
         * Verifies a RecentEmojiWeight message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RecentEmojiWeight message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RecentEmojiWeight
         */
        public static fromObject(object: { [k: string]: any }): SyncAction.RecentEmojiWeight;

        /**
         * Creates a plain object from a RecentEmojiWeight message. Also converts values to other types if specified.
         * @param message RecentEmojiWeight
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SyncAction.RecentEmojiWeight, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RecentEmojiWeight to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RecentEmojiWeight
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** MutationProps enum. */
    enum MutationProps {
        STAR_ACTION = 2,
        CONTACT_ACTION = 3,
        MUTE_ACTION = 4,
        PIN_ACTION = 5,
        SECURITY_NOTIFICATION_SETTING = 6,
        PUSH_NAME_SETTING = 7,
        QUICK_REPLY_ACTION = 8,
        RECENT_EMOJI_WEIGHTS_ACTION = 11,
        LABEL_MESSAGE_ACTION = 13,
        LABEL_EDIT_ACTION = 14,
        LABEL_ASSOCIATION_ACTION = 15,
        LOCALE_SETTING = 16,
        ARCHIVE_CHAT_ACTION = 17,
        DELETE_MESSAGE_FOR_ME_ACTION = 18,
        KEY_EXPIRATION = 19,
        MARK_CHAT_AS_READ_ACTION = 20,
        CLEAR_CHAT_ACTION = 21,
        DELETE_CHAT_ACTION = 22,
        UNARCHIVE_CHATS_SETTING = 23,
        PRIMARY_FEATURE = 24,
        ANDROID_UNSUPPORTED_ACTIONS = 26,
        AGENT_ACTION = 27,
        SUBSCRIPTION_ACTION = 28,
        USER_STATUS_MUTE_ACTION = 29,
        TIME_FORMAT_ACTION = 30,
        NUX_ACTION = 31,
        PRIMARY_VERSION_ACTION = 32,
        STICKER_ACTION = 33,
        REMOVE_RECENT_STICKER_ACTION = 34,
        CHAT_ASSIGNMENT = 35,
        CHAT_ASSIGNMENT_OPENED_STATUS = 36,
        PN_FOR_LID_CHAT_ACTION = 37,
        MARKETING_MESSAGE_ACTION = 38,
        MARKETING_MESSAGE_BROADCAST_ACTION = 39,
        EXTERNAL_WEB_BETA_ACTION = 40,
        PRIVACY_SETTING_RELAY_ALL_CALLS = 41,
        CALL_LOG_ACTION = 42,
        UGC_BOT = 43,
        STATUS_PRIVACY = 44,
        BOT_WELCOME_REQUEST_ACTION = 45,
        DELETE_INDIVIDUAL_CALL_LOG = 46,
        LABEL_REORDERING_ACTION = 47,
        PAYMENT_INFO_ACTION = 48,
        CUSTOM_PAYMENT_METHODS_ACTION = 49,
        LOCK_CHAT_ACTION = 50,
        CHAT_LOCK_SETTINGS = 51,
        WAMO_USER_IDENTIFIER_ACTION = 52,
        PRIVACY_SETTING_DISABLE_LINK_PREVIEWS_ACTION = 53,
        DEVICE_CAPABILITIES = 54,
        NOTE_EDIT_ACTION = 55,
        FAVORITES_ACTION = 56,
        MERCHANT_PAYMENT_PARTNER_ACTION = 57,
        WAFFLE_ACCOUNT_LINK_STATE_ACTION = 58,
        USERNAME_CHAT_START_MODE = 59,
        NOTIFICATION_ACTIVITY_SETTING_ACTION = 60,
        LID_CONTACT_ACTION = 61,
        CTWA_PER_CUSTOMER_DATA_SHARING_ACTION = 62,
        PAYMENT_TOS_ACTION = 63,
        PRIVACY_SETTING_CHANNELS_PERSONALISED_RECOMMENDATION_ACTION = 64,
        BUSINESS_BROADCAST_ASSOCIATION_ACTION = 65,
        DETECTED_OUTCOMES_STATUS_ACTION = 66,
        MAIBA_AI_FEATURES_CONTROL_ACTION = 68,
        BUSINESS_BROADCAST_LIST_ACTION = 69,
        MUSIC_USER_ID_ACTION = 70,
        STATUS_POST_OPT_IN_NOTIFICATION_PREFERENCES_ACTION = 71,
        AVATAR_UPDATED_ACTION = 72,
        GALAXY_FLOW_ACTION = 73,
        PRIVATE_PROCESSING_SETTING_ACTION = 74,
        NEWSLETTER_SAVED_INTERESTS_ACTION = 75,
        AI_THREAD_RENAME_ACTION = 76,
        INTERACTIVE_MESSAGE_ACTION = 77,
        SETTINGS_SYNC_ACTION = 78,
        OUT_CONTACT_ACTION = 79,
        NCT_SALT_SYNC_ACTION = 80,
        BUSINESS_BROADCAST_CAMPAIGN_ACTION = 81,
        BUSINESS_BROADCAST_INSIGHTS_ACTION = 82,
        CUSTOMER_DATA_ACTION = 83,
        SUBSCRIPTIONS_SYNC_V2_ACTION = 84,
        THREAD_PIN_ACTION = 85,
        SHARE_OWN_PN = 10001,
        BUSINESS_BROADCAST_ACTION = 10002,
        AI_THREAD_DELETE_ACTION = 10003
    }

    /** CollectionName enum. */
    enum CollectionName {
        COLLECTION_NAME_UNKNOWN = 0,
        REGULAR = 1,
        REGULAR_LOW = 2,
        REGULAR_HIGH = 3,
        CRITICAL_BLOCK = 4,
        CRITICAL_UNBLOCK_LOW = 5
    }
}

/** Namespace ChatLockSettings. */
export namespace ChatLockSettings {

    /** Properties of a ChatLockSettings. */
    interface IChatLockSettings {

        /** ChatLockSettings hideLockedChats */
        hideLockedChats?: (boolean|null);

        /** ChatLockSettings secretCode */
        secretCode?: (UserPassword.IUserPassword|null);
    }

    /** Represents a ChatLockSettings. */
    class ChatLockSettings implements IChatLockSettings {

        /**
         * Constructs a new ChatLockSettings.
         * @param [properties] Properties to set
         */
        constructor(properties?: ChatLockSettings.IChatLockSettings);

        /** ChatLockSettings hideLockedChats. */
        public hideLockedChats?: (boolean|null);

        /** ChatLockSettings secretCode. */
        public secretCode?: (UserPassword.IUserPassword|null);

        /**
         * Creates a new ChatLockSettings instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatLockSettings instance
         */
        public static create(properties?: ChatLockSettings.IChatLockSettings): ChatLockSettings.ChatLockSettings;

        /**
         * Encodes the specified ChatLockSettings message. Does not implicitly {@link ChatLockSettings.ChatLockSettings.verify|verify} messages.
         * @param message ChatLockSettings message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ChatLockSettings.IChatLockSettings, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatLockSettings message, length delimited. Does not implicitly {@link ChatLockSettings.ChatLockSettings.verify|verify} messages.
         * @param message ChatLockSettings message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ChatLockSettings.IChatLockSettings, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatLockSettings message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatLockSettings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChatLockSettings.ChatLockSettings;

        /**
         * Decodes a ChatLockSettings message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatLockSettings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ChatLockSettings.ChatLockSettings;

        /**
         * Verifies a ChatLockSettings message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatLockSettings message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatLockSettings
         */
        public static fromObject(object: { [k: string]: any }): ChatLockSettings.ChatLockSettings;

        /**
         * Creates a plain object from a ChatLockSettings message. Also converts values to other types if specified.
         * @param message ChatLockSettings
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ChatLockSettings.ChatLockSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatLockSettings to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ChatLockSettings
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace UserPassword. */
export namespace UserPassword {

    /** Properties of a UserPassword. */
    interface IUserPassword {

        /** UserPassword encoding */
        encoding?: (UserPassword.UserPassword.Encoding|null);

        /** UserPassword transformer */
        transformer?: (UserPassword.UserPassword.Transformer|null);

        /** UserPassword transformerArg */
        transformerArg?: (UserPassword.UserPassword.ITransformerArg[]|null);

        /** UserPassword transformedData */
        transformedData?: (Uint8Array|null);
    }

    /** Represents a UserPassword. */
    class UserPassword implements IUserPassword {

        /**
         * Constructs a new UserPassword.
         * @param [properties] Properties to set
         */
        constructor(properties?: UserPassword.IUserPassword);

        /** UserPassword encoding. */
        public encoding?: (UserPassword.UserPassword.Encoding|null);

        /** UserPassword transformer. */
        public transformer?: (UserPassword.UserPassword.Transformer|null);

        /** UserPassword transformerArg. */
        public transformerArg: UserPassword.UserPassword.ITransformerArg[];

        /** UserPassword transformedData. */
        public transformedData?: (Uint8Array|null);

        /**
         * Creates a new UserPassword instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserPassword instance
         */
        public static create(properties?: UserPassword.IUserPassword): UserPassword.UserPassword;

        /**
         * Encodes the specified UserPassword message. Does not implicitly {@link UserPassword.UserPassword.verify|verify} messages.
         * @param message UserPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: UserPassword.IUserPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserPassword message, length delimited. Does not implicitly {@link UserPassword.UserPassword.verify|verify} messages.
         * @param message UserPassword message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: UserPassword.IUserPassword, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserPassword message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UserPassword.UserPassword;

        /**
         * Decodes a UserPassword message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UserPassword.UserPassword;

        /**
         * Verifies a UserPassword message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserPassword message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserPassword
         */
        public static fromObject(object: { [k: string]: any }): UserPassword.UserPassword;

        /**
         * Creates a plain object from a UserPassword message. Also converts values to other types if specified.
         * @param message UserPassword
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UserPassword.UserPassword, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserPassword to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UserPassword
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace UserPassword {

        /** Encoding enum. */
        enum Encoding {
            UTF8 = 0,
            UTF8_BROKEN = 1
        }

        /** Transformer enum. */
        enum Transformer {
            NONE = 0,
            PBKDF2_HMAC_SHA512 = 1,
            PBKDF2_HMAC_SHA384 = 2
        }

        /** Properties of a TransformerArg. */
        interface ITransformerArg {

            /** TransformerArg key */
            key?: (string|null);

            /** TransformerArg value */
            value?: (UserPassword.UserPassword.TransformerArg.IValue|null);
        }

        /** Represents a TransformerArg. */
        class TransformerArg implements ITransformerArg {

            /**
             * Constructs a new TransformerArg.
             * @param [properties] Properties to set
             */
            constructor(properties?: UserPassword.UserPassword.ITransformerArg);

            /** TransformerArg key. */
            public key?: (string|null);

            /** TransformerArg value. */
            public value?: (UserPassword.UserPassword.TransformerArg.IValue|null);

            /**
             * Creates a new TransformerArg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TransformerArg instance
             */
            public static create(properties?: UserPassword.UserPassword.ITransformerArg): UserPassword.UserPassword.TransformerArg;

            /**
             * Encodes the specified TransformerArg message. Does not implicitly {@link UserPassword.UserPassword.TransformerArg.verify|verify} messages.
             * @param message TransformerArg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: UserPassword.UserPassword.ITransformerArg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TransformerArg message, length delimited. Does not implicitly {@link UserPassword.UserPassword.TransformerArg.verify|verify} messages.
             * @param message TransformerArg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: UserPassword.UserPassword.ITransformerArg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TransformerArg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TransformerArg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UserPassword.UserPassword.TransformerArg;

            /**
             * Decodes a TransformerArg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TransformerArg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UserPassword.UserPassword.TransformerArg;

            /**
             * Verifies a TransformerArg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TransformerArg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TransformerArg
             */
            public static fromObject(object: { [k: string]: any }): UserPassword.UserPassword.TransformerArg;

            /**
             * Creates a plain object from a TransformerArg message. Also converts values to other types if specified.
             * @param message TransformerArg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: UserPassword.UserPassword.TransformerArg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TransformerArg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for TransformerArg
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace TransformerArg {

            /** Properties of a Value. */
            interface IValue {

                /** Value asBlob */
                asBlob?: (Uint8Array|null);

                /** Value asUnsignedInteger */
                asUnsignedInteger?: (number|null);
            }

            /** Represents a Value. */
            class Value implements IValue {

                /**
                 * Constructs a new Value.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: UserPassword.UserPassword.TransformerArg.IValue);

                /** Value asBlob. */
                public asBlob?: (Uint8Array|null);

                /** Value asUnsignedInteger. */
                public asUnsignedInteger?: (number|null);

                /** Value value. */
                public value?: ("asBlob"|"asUnsignedInteger");

                /**
                 * Creates a new Value instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Value instance
                 */
                public static create(properties?: UserPassword.UserPassword.TransformerArg.IValue): UserPassword.UserPassword.TransformerArg.Value;

                /**
                 * Encodes the specified Value message. Does not implicitly {@link UserPassword.UserPassword.TransformerArg.Value.verify|verify} messages.
                 * @param message Value message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: UserPassword.UserPassword.TransformerArg.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Value message, length delimited. Does not implicitly {@link UserPassword.UserPassword.TransformerArg.Value.verify|verify} messages.
                 * @param message Value message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: UserPassword.UserPassword.TransformerArg.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Value message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UserPassword.UserPassword.TransformerArg.Value;

                /**
                 * Decodes a Value message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UserPassword.UserPassword.TransformerArg.Value;

                /**
                 * Verifies a Value message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Value message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Value
                 */
                public static fromObject(object: { [k: string]: any }): UserPassword.UserPassword.TransformerArg.Value;

                /**
                 * Creates a plain object from a Value message. Also converts values to other types if specified.
                 * @param message Value
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: UserPassword.UserPassword.TransformerArg.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Value to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Value
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }
}

/** Namespace DeviceCapabilities. */
export namespace DeviceCapabilities {

    /** Properties of a DeviceCapabilities. */
    interface IDeviceCapabilities {

        /** DeviceCapabilities chatLockSupportLevel */
        chatLockSupportLevel?: (DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel|null);

        /** DeviceCapabilities lidMigration */
        lidMigration?: (DeviceCapabilities.DeviceCapabilities.ILIDMigration|null);

        /** DeviceCapabilities businessBroadcast */
        businessBroadcast?: (DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast|null);

        /** DeviceCapabilities userHasAvatar */
        userHasAvatar?: (DeviceCapabilities.DeviceCapabilities.IUserHasAvatar|null);

        /** DeviceCapabilities memberNameTagPrimarySupport */
        memberNameTagPrimarySupport?: (DeviceCapabilities.DeviceCapabilities.MemberNameTagPrimarySupport|null);

        /** DeviceCapabilities aiThread */
        aiThread?: (DeviceCapabilities.DeviceCapabilities.IAiThread|null);
    }

    /** Represents a DeviceCapabilities. */
    class DeviceCapabilities implements IDeviceCapabilities {

        /**
         * Constructs a new DeviceCapabilities.
         * @param [properties] Properties to set
         */
        constructor(properties?: DeviceCapabilities.IDeviceCapabilities);

        /** DeviceCapabilities chatLockSupportLevel. */
        public chatLockSupportLevel?: (DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel|null);

        /** DeviceCapabilities lidMigration. */
        public lidMigration?: (DeviceCapabilities.DeviceCapabilities.ILIDMigration|null);

        /** DeviceCapabilities businessBroadcast. */
        public businessBroadcast?: (DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast|null);

        /** DeviceCapabilities userHasAvatar. */
        public userHasAvatar?: (DeviceCapabilities.DeviceCapabilities.IUserHasAvatar|null);

        /** DeviceCapabilities memberNameTagPrimarySupport. */
        public memberNameTagPrimarySupport?: (DeviceCapabilities.DeviceCapabilities.MemberNameTagPrimarySupport|null);

        /** DeviceCapabilities aiThread. */
        public aiThread?: (DeviceCapabilities.DeviceCapabilities.IAiThread|null);

        /**
         * Creates a new DeviceCapabilities instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeviceCapabilities instance
         */
        public static create(properties?: DeviceCapabilities.IDeviceCapabilities): DeviceCapabilities.DeviceCapabilities;

        /**
         * Encodes the specified DeviceCapabilities message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.verify|verify} messages.
         * @param message DeviceCapabilities message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: DeviceCapabilities.IDeviceCapabilities, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeviceCapabilities message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.verify|verify} messages.
         * @param message DeviceCapabilities message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: DeviceCapabilities.IDeviceCapabilities, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeviceCapabilities message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeviceCapabilities
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeviceCapabilities.DeviceCapabilities;

        /**
         * Decodes a DeviceCapabilities message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeviceCapabilities
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeviceCapabilities.DeviceCapabilities;

        /**
         * Verifies a DeviceCapabilities message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeviceCapabilities message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeviceCapabilities
         */
        public static fromObject(object: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities;

        /**
         * Creates a plain object from a DeviceCapabilities message. Also converts values to other types if specified.
         * @param message DeviceCapabilities
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: DeviceCapabilities.DeviceCapabilities, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeviceCapabilities to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DeviceCapabilities
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace DeviceCapabilities {

        /** Properties of an AiThread. */
        interface IAiThread {

            /** AiThread supportLevel */
            supportLevel?: (DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel|null);
        }

        /** Represents an AiThread. */
        class AiThread implements IAiThread {

            /**
             * Constructs a new AiThread.
             * @param [properties] Properties to set
             */
            constructor(properties?: DeviceCapabilities.DeviceCapabilities.IAiThread);

            /** AiThread supportLevel. */
            public supportLevel?: (DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel|null);

            /**
             * Creates a new AiThread instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AiThread instance
             */
            public static create(properties?: DeviceCapabilities.DeviceCapabilities.IAiThread): DeviceCapabilities.DeviceCapabilities.AiThread;

            /**
             * Encodes the specified AiThread message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.AiThread.verify|verify} messages.
             * @param message AiThread message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DeviceCapabilities.DeviceCapabilities.IAiThread, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AiThread message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.AiThread.verify|verify} messages.
             * @param message AiThread message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DeviceCapabilities.DeviceCapabilities.IAiThread, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AiThread message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AiThread
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeviceCapabilities.DeviceCapabilities.AiThread;

            /**
             * Decodes an AiThread message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AiThread
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeviceCapabilities.DeviceCapabilities.AiThread;

            /**
             * Verifies an AiThread message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AiThread message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AiThread
             */
            public static fromObject(object: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.AiThread;

            /**
             * Creates a plain object from an AiThread message. Also converts values to other types if specified.
             * @param message AiThread
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: DeviceCapabilities.DeviceCapabilities.AiThread, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AiThread to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AiThread
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace AiThread {

            /** SupportLevel enum. */
            enum SupportLevel {
                NONE = 0,
                INFRA = 1,
                FULL = 2
            }
        }

        /** Properties of a BusinessBroadcast. */
        interface IBusinessBroadcast {

            /** BusinessBroadcast importListEnabled */
            importListEnabled?: (boolean|null);

            /** BusinessBroadcast companionSupportEnabled */
            companionSupportEnabled?: (boolean|null);

            /** BusinessBroadcast campaignSyncEnabled */
            campaignSyncEnabled?: (boolean|null);

            /** BusinessBroadcast insightsSyncEnabled */
            insightsSyncEnabled?: (boolean|null);
        }

        /** Represents a BusinessBroadcast. */
        class BusinessBroadcast implements IBusinessBroadcast {

            /**
             * Constructs a new BusinessBroadcast.
             * @param [properties] Properties to set
             */
            constructor(properties?: DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast);

            /** BusinessBroadcast importListEnabled. */
            public importListEnabled?: (boolean|null);

            /** BusinessBroadcast companionSupportEnabled. */
            public companionSupportEnabled?: (boolean|null);

            /** BusinessBroadcast campaignSyncEnabled. */
            public campaignSyncEnabled?: (boolean|null);

            /** BusinessBroadcast insightsSyncEnabled. */
            public insightsSyncEnabled?: (boolean|null);

            /**
             * Creates a new BusinessBroadcast instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BusinessBroadcast instance
             */
            public static create(properties?: DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast): DeviceCapabilities.DeviceCapabilities.BusinessBroadcast;

            /**
             * Encodes the specified BusinessBroadcast message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.verify|verify} messages.
             * @param message BusinessBroadcast message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BusinessBroadcast message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.verify|verify} messages.
             * @param message BusinessBroadcast message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BusinessBroadcast message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BusinessBroadcast
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeviceCapabilities.DeviceCapabilities.BusinessBroadcast;

            /**
             * Decodes a BusinessBroadcast message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BusinessBroadcast
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeviceCapabilities.DeviceCapabilities.BusinessBroadcast;

            /**
             * Verifies a BusinessBroadcast message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BusinessBroadcast message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BusinessBroadcast
             */
            public static fromObject(object: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.BusinessBroadcast;

            /**
             * Creates a plain object from a BusinessBroadcast message. Also converts values to other types if specified.
             * @param message BusinessBroadcast
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: DeviceCapabilities.DeviceCapabilities.BusinessBroadcast, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BusinessBroadcast to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BusinessBroadcast
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** ChatLockSupportLevel enum. */
        enum ChatLockSupportLevel {
            NONE = 0,
            MINIMAL = 1,
            FULL = 2
        }

        /** Properties of a LIDMigration. */
        interface ILIDMigration {

            /** LIDMigration chatDbMigrationTimestamp */
            chatDbMigrationTimestamp?: (number|Long|null);
        }

        /** Represents a LIDMigration. */
        class LIDMigration implements ILIDMigration {

            /**
             * Constructs a new LIDMigration.
             * @param [properties] Properties to set
             */
            constructor(properties?: DeviceCapabilities.DeviceCapabilities.ILIDMigration);

            /** LIDMigration chatDbMigrationTimestamp. */
            public chatDbMigrationTimestamp?: (number|Long|null);

            /**
             * Creates a new LIDMigration instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LIDMigration instance
             */
            public static create(properties?: DeviceCapabilities.DeviceCapabilities.ILIDMigration): DeviceCapabilities.DeviceCapabilities.LIDMigration;

            /**
             * Encodes the specified LIDMigration message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.LIDMigration.verify|verify} messages.
             * @param message LIDMigration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DeviceCapabilities.DeviceCapabilities.ILIDMigration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LIDMigration message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.LIDMigration.verify|verify} messages.
             * @param message LIDMigration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DeviceCapabilities.DeviceCapabilities.ILIDMigration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LIDMigration message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LIDMigration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeviceCapabilities.DeviceCapabilities.LIDMigration;

            /**
             * Decodes a LIDMigration message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LIDMigration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeviceCapabilities.DeviceCapabilities.LIDMigration;

            /**
             * Verifies a LIDMigration message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LIDMigration message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LIDMigration
             */
            public static fromObject(object: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.LIDMigration;

            /**
             * Creates a plain object from a LIDMigration message. Also converts values to other types if specified.
             * @param message LIDMigration
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: DeviceCapabilities.DeviceCapabilities.LIDMigration, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LIDMigration to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LIDMigration
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** MemberNameTagPrimarySupport enum. */
        enum MemberNameTagPrimarySupport {
            DISABLED = 0,
            RECEIVER_ENABLED = 1,
            SENDER_ENABLED = 2
        }

        /** Properties of a UserHasAvatar. */
        interface IUserHasAvatar {

            /** UserHasAvatar userHasAvatar */
            userHasAvatar?: (boolean|null);
        }

        /** Represents a UserHasAvatar. */
        class UserHasAvatar implements IUserHasAvatar {

            /**
             * Constructs a new UserHasAvatar.
             * @param [properties] Properties to set
             */
            constructor(properties?: DeviceCapabilities.DeviceCapabilities.IUserHasAvatar);

            /** UserHasAvatar userHasAvatar. */
            public userHasAvatar?: (boolean|null);

            /**
             * Creates a new UserHasAvatar instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserHasAvatar instance
             */
            public static create(properties?: DeviceCapabilities.DeviceCapabilities.IUserHasAvatar): DeviceCapabilities.DeviceCapabilities.UserHasAvatar;

            /**
             * Encodes the specified UserHasAvatar message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.UserHasAvatar.verify|verify} messages.
             * @param message UserHasAvatar message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DeviceCapabilities.DeviceCapabilities.IUserHasAvatar, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UserHasAvatar message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.UserHasAvatar.verify|verify} messages.
             * @param message UserHasAvatar message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DeviceCapabilities.DeviceCapabilities.IUserHasAvatar, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UserHasAvatar message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserHasAvatar
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeviceCapabilities.DeviceCapabilities.UserHasAvatar;

            /**
             * Decodes a UserHasAvatar message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserHasAvatar
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeviceCapabilities.DeviceCapabilities.UserHasAvatar;

            /**
             * Verifies a UserHasAvatar message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UserHasAvatar message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserHasAvatar
             */
            public static fromObject(object: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.UserHasAvatar;

            /**
             * Creates a plain object from a UserHasAvatar message. Also converts values to other types if specified.
             * @param message UserHasAvatar
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: DeviceCapabilities.DeviceCapabilities.UserHasAvatar, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UserHasAvatar to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UserHasAvatar
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}

/** Namespace Protocol. */
export namespace Protocol {

    /** Properties of a LimitSharing. */
    interface ILimitSharing {

        /** LimitSharing sharingLimited */
        sharingLimited?: (boolean|null);

        /** LimitSharing trigger */
        trigger?: (Protocol.LimitSharing.TriggerType|null);

        /** LimitSharing limitSharingSettingTimestamp */
        limitSharingSettingTimestamp?: (number|Long|null);

        /** LimitSharing initiatedByMe */
        initiatedByMe?: (boolean|null);
    }

    /** Represents a LimitSharing. */
    class LimitSharing implements ILimitSharing {

        /**
         * Constructs a new LimitSharing.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protocol.ILimitSharing);

        /** LimitSharing sharingLimited. */
        public sharingLimited?: (boolean|null);

        /** LimitSharing trigger. */
        public trigger?: (Protocol.LimitSharing.TriggerType|null);

        /** LimitSharing limitSharingSettingTimestamp. */
        public limitSharingSettingTimestamp?: (number|Long|null);

        /** LimitSharing initiatedByMe. */
        public initiatedByMe?: (boolean|null);

        /**
         * Creates a new LimitSharing instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LimitSharing instance
         */
        public static create(properties?: Protocol.ILimitSharing): Protocol.LimitSharing;

        /**
         * Encodes the specified LimitSharing message. Does not implicitly {@link Protocol.LimitSharing.verify|verify} messages.
         * @param message LimitSharing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protocol.ILimitSharing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LimitSharing message, length delimited. Does not implicitly {@link Protocol.LimitSharing.verify|verify} messages.
         * @param message LimitSharing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protocol.ILimitSharing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LimitSharing message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LimitSharing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protocol.LimitSharing;

        /**
         * Decodes a LimitSharing message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LimitSharing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protocol.LimitSharing;

        /**
         * Verifies a LimitSharing message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LimitSharing message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LimitSharing
         */
        public static fromObject(object: { [k: string]: any }): Protocol.LimitSharing;

        /**
         * Creates a plain object from a LimitSharing message. Also converts values to other types if specified.
         * @param message LimitSharing
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protocol.LimitSharing, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LimitSharing to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LimitSharing
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace LimitSharing {

        /** TriggerType enum. */
        enum TriggerType {
            UNKNOWN = 0,
            CHAT_SETTING = 1,
            BIZ_SUPPORTS_FB_HOSTING = 2,
            UNKNOWN_GROUP = 3
        }
    }

    /** Properties of a MessageKey. */
    interface IMessageKey {

        /** MessageKey remoteJid */
        remoteJid?: (string|null);

        /** MessageKey fromMe */
        fromMe?: (boolean|null);

        /** MessageKey id */
        id?: (string|null);

        /** MessageKey participant */
        participant?: (string|null);
    }

    /** Represents a MessageKey. */
    class MessageKey implements IMessageKey {

        /**
         * Constructs a new MessageKey.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protocol.IMessageKey);

        /** MessageKey remoteJid. */
        public remoteJid?: (string|null);

        /** MessageKey fromMe. */
        public fromMe?: (boolean|null);

        /** MessageKey id. */
        public id?: (string|null);

        /** MessageKey participant. */
        public participant?: (string|null);

        /**
         * Creates a new MessageKey instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MessageKey instance
         */
        public static create(properties?: Protocol.IMessageKey): Protocol.MessageKey;

        /**
         * Encodes the specified MessageKey message. Does not implicitly {@link Protocol.MessageKey.verify|verify} messages.
         * @param message MessageKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protocol.IMessageKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessageKey message, length delimited. Does not implicitly {@link Protocol.MessageKey.verify|verify} messages.
         * @param message MessageKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protocol.IMessageKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessageKey message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessageKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protocol.MessageKey;

        /**
         * Decodes a MessageKey message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessageKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protocol.MessageKey;

        /**
         * Verifies a MessageKey message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MessageKey message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MessageKey
         */
        public static fromObject(object: { [k: string]: any }): Protocol.MessageKey;

        /**
         * Creates a plain object from a MessageKey message. Also converts values to other types if specified.
         * @param message MessageKey
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protocol.MessageKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MessageKey to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MessageKey
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
