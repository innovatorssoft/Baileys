import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace BotMetadata. */
export namespace BotMetadata {

    /** Properties of a BotMetadata. */
    interface IBotMetadata {

        /** BotMetadata avatarMetadata */
        avatarMetadata?: (BotMetadata.IBotAvatarMetadata|null);

        /** BotMetadata personaId */
        personaId?: (string|null);

        /** BotMetadata pluginMetadata */
        pluginMetadata?: (BotMetadata.IBotPluginMetadata|null);

        /** BotMetadata suggestedPromptMetadata */
        suggestedPromptMetadata?: (BotMetadata.IBotSuggestedPromptMetadata|null);

        /** BotMetadata invokerJid */
        invokerJid?: (string|null);

        /** BotMetadata sessionMetadata */
        sessionMetadata?: (BotMetadata.IBotSessionMetadata|null);

        /** BotMetadata memuMetadata */
        memuMetadata?: (BotMetadata.IBotMemuMetadata|null);

        /** BotMetadata timezone */
        timezone?: (string|null);

        /** BotMetadata reminderMetadata */
        reminderMetadata?: (BotMetadata.IBotReminderMetadata|null);

        /** BotMetadata modelMetadata */
        modelMetadata?: (BotMetadata.IBotModelMetadata|null);

        /** BotMetadata messageDisclaimerText */
        messageDisclaimerText?: (string|null);

        /** BotMetadata progressIndicatorMetadata */
        progressIndicatorMetadata?: (BotMetadata.IBotProgressIndicatorMetadata|null);

        /** BotMetadata capabilityMetadata */
        capabilityMetadata?: (BotMetadata.IBotCapabilityMetadata|null);

        /** BotMetadata imagineMetadata */
        imagineMetadata?: (BotMetadata.IBotImagineMetadata|null);

        /** BotMetadata memoryMetadata */
        memoryMetadata?: (BotMetadata.IBotMemoryMetadata|null);

        /** BotMetadata renderingMetadata */
        renderingMetadata?: (BotMetadata.IBotRenderingMetadata|null);

        /** BotMetadata botMetricsMetadata */
        botMetricsMetadata?: (BotMetadata.IBotMetricsMetadata|null);

        /** BotMetadata botLinkedAccountsMetadata */
        botLinkedAccountsMetadata?: (BotMetadata.IBotLinkedAccountsMetadata|null);

        /** BotMetadata richResponseSourcesMetadata */
        richResponseSourcesMetadata?: (BotMetadata.IBotSourcesMetadata|null);

        /** BotMetadata aiConversationContext */
        aiConversationContext?: (Uint8Array|null);

        /** BotMetadata botPromotionMessageMetadata */
        botPromotionMessageMetadata?: (BotMetadata.IBotPromotionMessageMetadata|null);

        /** BotMetadata botModeSelectionMetadata */
        botModeSelectionMetadata?: (BotMetadata.IBotModeSelectionMetadata|null);

        /** BotMetadata botQuotaMetadata */
        botQuotaMetadata?: (BotMetadata.IBotQuotaMetadata|null);

        /** BotMetadata botAgeCollectionMetadata */
        botAgeCollectionMetadata?: (BotMetadata.IBotAgeCollectionMetadata|null);

        /** BotMetadata conversationStarterPromptId */
        conversationStarterPromptId?: (string|null);

        /** BotMetadata botResponseId */
        botResponseId?: (string|null);

        /** BotMetadata verificationMetadata */
        verificationMetadata?: (BotMetadata.IBotSignatureVerificationMetadata|null);

        /** BotMetadata unifiedResponseMutation */
        unifiedResponseMutation?: (BotMetadata.IBotUnifiedResponseMutation|null);

        /** BotMetadata botMessageOriginMetadata */
        botMessageOriginMetadata?: (BotMetadata.IBotMessageOriginMetadata|null);

        /** BotMetadata inThreadSurveyMetadata */
        inThreadSurveyMetadata?: (BotMetadata.IInThreadSurveyMetadata|null);

        /** BotMetadata botThreadInfo */
        botThreadInfo?: (BotMetadata.IAIThreadInfo|null);
    }

    /** Represents a BotMetadata. */
    class BotMetadata implements IBotMetadata {

        /**
         * Constructs a new BotMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotMetadata);

        /** BotMetadata avatarMetadata. */
        public avatarMetadata?: (BotMetadata.IBotAvatarMetadata|null);

        /** BotMetadata personaId. */
        public personaId?: (string|null);

        /** BotMetadata pluginMetadata. */
        public pluginMetadata?: (BotMetadata.IBotPluginMetadata|null);

        /** BotMetadata suggestedPromptMetadata. */
        public suggestedPromptMetadata?: (BotMetadata.IBotSuggestedPromptMetadata|null);

        /** BotMetadata invokerJid. */
        public invokerJid?: (string|null);

        /** BotMetadata sessionMetadata. */
        public sessionMetadata?: (BotMetadata.IBotSessionMetadata|null);

        /** BotMetadata memuMetadata. */
        public memuMetadata?: (BotMetadata.IBotMemuMetadata|null);

        /** BotMetadata timezone. */
        public timezone?: (string|null);

        /** BotMetadata reminderMetadata. */
        public reminderMetadata?: (BotMetadata.IBotReminderMetadata|null);

        /** BotMetadata modelMetadata. */
        public modelMetadata?: (BotMetadata.IBotModelMetadata|null);

        /** BotMetadata messageDisclaimerText. */
        public messageDisclaimerText?: (string|null);

        /** BotMetadata progressIndicatorMetadata. */
        public progressIndicatorMetadata?: (BotMetadata.IBotProgressIndicatorMetadata|null);

        /** BotMetadata capabilityMetadata. */
        public capabilityMetadata?: (BotMetadata.IBotCapabilityMetadata|null);

        /** BotMetadata imagineMetadata. */
        public imagineMetadata?: (BotMetadata.IBotImagineMetadata|null);

        /** BotMetadata memoryMetadata. */
        public memoryMetadata?: (BotMetadata.IBotMemoryMetadata|null);

        /** BotMetadata renderingMetadata. */
        public renderingMetadata?: (BotMetadata.IBotRenderingMetadata|null);

        /** BotMetadata botMetricsMetadata. */
        public botMetricsMetadata?: (BotMetadata.IBotMetricsMetadata|null);

        /** BotMetadata botLinkedAccountsMetadata. */
        public botLinkedAccountsMetadata?: (BotMetadata.IBotLinkedAccountsMetadata|null);

        /** BotMetadata richResponseSourcesMetadata. */
        public richResponseSourcesMetadata?: (BotMetadata.IBotSourcesMetadata|null);

        /** BotMetadata aiConversationContext. */
        public aiConversationContext?: (Uint8Array|null);

        /** BotMetadata botPromotionMessageMetadata. */
        public botPromotionMessageMetadata?: (BotMetadata.IBotPromotionMessageMetadata|null);

        /** BotMetadata botModeSelectionMetadata. */
        public botModeSelectionMetadata?: (BotMetadata.IBotModeSelectionMetadata|null);

        /** BotMetadata botQuotaMetadata. */
        public botQuotaMetadata?: (BotMetadata.IBotQuotaMetadata|null);

        /** BotMetadata botAgeCollectionMetadata. */
        public botAgeCollectionMetadata?: (BotMetadata.IBotAgeCollectionMetadata|null);

        /** BotMetadata conversationStarterPromptId. */
        public conversationStarterPromptId?: (string|null);

        /** BotMetadata botResponseId. */
        public botResponseId?: (string|null);

        /** BotMetadata verificationMetadata. */
        public verificationMetadata?: (BotMetadata.IBotSignatureVerificationMetadata|null);

        /** BotMetadata unifiedResponseMutation. */
        public unifiedResponseMutation?: (BotMetadata.IBotUnifiedResponseMutation|null);

        /** BotMetadata botMessageOriginMetadata. */
        public botMessageOriginMetadata?: (BotMetadata.IBotMessageOriginMetadata|null);

        /** BotMetadata inThreadSurveyMetadata. */
        public inThreadSurveyMetadata?: (BotMetadata.IInThreadSurveyMetadata|null);

        /** BotMetadata botThreadInfo. */
        public botThreadInfo?: (BotMetadata.IAIThreadInfo|null);

        /**
         * Creates a new BotMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMetadata instance
         */
        public static create(properties?: BotMetadata.IBotMetadata): BotMetadata.BotMetadata;

        /**
         * Encodes the specified BotMetadata message. Does not implicitly {@link BotMetadata.BotMetadata.verify|verify} messages.
         * @param message BotMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotMetadata.verify|verify} messages.
         * @param message BotMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotMetadata;

        /**
         * Decodes a BotMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotMetadata;

        /**
         * Verifies a BotMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotMetadata;

        /**
         * Creates a plain object from a BotMetadata message. Also converts values to other types if specified.
         * @param message BotMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a AIThreadInfo. */
    interface IAIThreadInfo {

        /** AIThreadInfo serverInfo */
        serverInfo?: (BotMetadata.AIThreadInfo.IAIThreadServerInfo|null);

        /** AIThreadInfo clientInfo */
        clientInfo?: (BotMetadata.AIThreadInfo.IAIThreadClientInfo|null);
    }

    /** Represents a AIThreadInfo. */
    class AIThreadInfo implements IAIThreadInfo {

        /**
         * Constructs a new AIThreadInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IAIThreadInfo);

        /** AIThreadInfo serverInfo. */
        public serverInfo?: (BotMetadata.AIThreadInfo.IAIThreadServerInfo|null);

        /** AIThreadInfo clientInfo. */
        public clientInfo?: (BotMetadata.AIThreadInfo.IAIThreadClientInfo|null);

        /**
         * Creates a new AIThreadInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AIThreadInfo instance
         */
        public static create(properties?: BotMetadata.IAIThreadInfo): BotMetadata.AIThreadInfo;

        /**
         * Encodes the specified AIThreadInfo message. Does not implicitly {@link BotMetadata.AIThreadInfo.verify|verify} messages.
         * @param message AIThreadInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IAIThreadInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AIThreadInfo message, length delimited. Does not implicitly {@link BotMetadata.AIThreadInfo.verify|verify} messages.
         * @param message AIThreadInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IAIThreadInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a AIThreadInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AIThreadInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.AIThreadInfo;

        /**
         * Decodes a AIThreadInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AIThreadInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.AIThreadInfo;

        /**
         * Verifies a AIThreadInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a AIThreadInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AIThreadInfo
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.AIThreadInfo;

        /**
         * Creates a plain object from a AIThreadInfo message. Also converts values to other types if specified.
         * @param message AIThreadInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.AIThreadInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AIThreadInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AIThreadInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace AIThreadInfo {

        /** Properties of a AIThreadClientInfo. */
        interface IAIThreadClientInfo {

            /** AIThreadClientInfo type */
            type?: (BotMetadata.AIThreadInfo.AIThreadClientInfo.AIThreadType|null);
        }

        /** Represents a AIThreadClientInfo. */
        class AIThreadClientInfo implements IAIThreadClientInfo {

            /**
             * Constructs a new AIThreadClientInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: BotMetadata.AIThreadInfo.IAIThreadClientInfo);

            /** AIThreadClientInfo type. */
            public type?: (BotMetadata.AIThreadInfo.AIThreadClientInfo.AIThreadType|null);

            /**
             * Creates a new AIThreadClientInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AIThreadClientInfo instance
             */
            public static create(properties?: BotMetadata.AIThreadInfo.IAIThreadClientInfo): BotMetadata.AIThreadInfo.AIThreadClientInfo;

            /**
             * Encodes the specified AIThreadClientInfo message. Does not implicitly {@link BotMetadata.AIThreadInfo.AIThreadClientInfo.verify|verify} messages.
             * @param message AIThreadClientInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BotMetadata.AIThreadInfo.IAIThreadClientInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AIThreadClientInfo message, length delimited. Does not implicitly {@link BotMetadata.AIThreadInfo.AIThreadClientInfo.verify|verify} messages.
             * @param message AIThreadClientInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BotMetadata.AIThreadInfo.IAIThreadClientInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AIThreadClientInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AIThreadClientInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.AIThreadInfo.AIThreadClientInfo;

            /**
             * Decodes a AIThreadClientInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AIThreadClientInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.AIThreadInfo.AIThreadClientInfo;

            /**
             * Verifies a AIThreadClientInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a AIThreadClientInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AIThreadClientInfo
             */
            public static fromObject(object: { [k: string]: any }): BotMetadata.AIThreadInfo.AIThreadClientInfo;

            /**
             * Creates a plain object from a AIThreadClientInfo message. Also converts values to other types if specified.
             * @param message AIThreadClientInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BotMetadata.AIThreadInfo.AIThreadClientInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AIThreadClientInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AIThreadClientInfo
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace AIThreadClientInfo {

            /** AIThreadType enum. */
            enum AIThreadType {
                UNKNOWN = 0,
                DEFAULT = 1,
                INCOGNITO = 2
            }
        }

        /** Properties of a AIThreadServerInfo. */
        interface IAIThreadServerInfo {

            /** AIThreadServerInfo title */
            title?: (string|null);
        }

        /** Represents a AIThreadServerInfo. */
        class AIThreadServerInfo implements IAIThreadServerInfo {

            /**
             * Constructs a new AIThreadServerInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: BotMetadata.AIThreadInfo.IAIThreadServerInfo);

            /** AIThreadServerInfo title. */
            public title?: (string|null);

            /**
             * Creates a new AIThreadServerInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AIThreadServerInfo instance
             */
            public static create(properties?: BotMetadata.AIThreadInfo.IAIThreadServerInfo): BotMetadata.AIThreadInfo.AIThreadServerInfo;

            /**
             * Encodes the specified AIThreadServerInfo message. Does not implicitly {@link BotMetadata.AIThreadInfo.AIThreadServerInfo.verify|verify} messages.
             * @param message AIThreadServerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BotMetadata.AIThreadInfo.IAIThreadServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AIThreadServerInfo message, length delimited. Does not implicitly {@link BotMetadata.AIThreadInfo.AIThreadServerInfo.verify|verify} messages.
             * @param message AIThreadServerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BotMetadata.AIThreadInfo.IAIThreadServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AIThreadServerInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AIThreadServerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.AIThreadInfo.AIThreadServerInfo;

            /**
             * Decodes a AIThreadServerInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AIThreadServerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.AIThreadInfo.AIThreadServerInfo;

            /**
             * Verifies a AIThreadServerInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a AIThreadServerInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AIThreadServerInfo
             */
            public static fromObject(object: { [k: string]: any }): BotMetadata.AIThreadInfo.AIThreadServerInfo;

            /**
             * Creates a plain object from a AIThreadServerInfo message. Also converts values to other types if specified.
             * @param message AIThreadServerInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BotMetadata.AIThreadInfo.AIThreadServerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AIThreadServerInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AIThreadServerInfo
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a BotUnifiedResponseMutation. */
    interface IBotUnifiedResponseMutation {

        /** BotUnifiedResponseMutation sbsMetadata */
        sbsMetadata?: (BotMetadata.BotUnifiedResponseMutation.ISideBySideMetadata|null);
    }

    /** Represents a BotUnifiedResponseMutation. */
    class BotUnifiedResponseMutation implements IBotUnifiedResponseMutation {

        /**
         * Constructs a new BotUnifiedResponseMutation.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotUnifiedResponseMutation);

        /** BotUnifiedResponseMutation sbsMetadata. */
        public sbsMetadata?: (BotMetadata.BotUnifiedResponseMutation.ISideBySideMetadata|null);

        /**
         * Creates a new BotUnifiedResponseMutation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotUnifiedResponseMutation instance
         */
        public static create(properties?: BotMetadata.IBotUnifiedResponseMutation): BotMetadata.BotUnifiedResponseMutation;

        /**
         * Encodes the specified BotUnifiedResponseMutation message. Does not implicitly {@link BotMetadata.BotUnifiedResponseMutation.verify|verify} messages.
         * @param message BotUnifiedResponseMutation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotUnifiedResponseMutation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotUnifiedResponseMutation message, length delimited. Does not implicitly {@link BotMetadata.BotUnifiedResponseMutation.verify|verify} messages.
         * @param message BotUnifiedResponseMutation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotUnifiedResponseMutation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotUnifiedResponseMutation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotUnifiedResponseMutation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotUnifiedResponseMutation;

        /**
         * Decodes a BotUnifiedResponseMutation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotUnifiedResponseMutation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotUnifiedResponseMutation;

        /**
         * Verifies a BotUnifiedResponseMutation message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotUnifiedResponseMutation message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotUnifiedResponseMutation
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotUnifiedResponseMutation;

        /**
         * Creates a plain object from a BotUnifiedResponseMutation message. Also converts values to other types if specified.
         * @param message BotUnifiedResponseMutation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotUnifiedResponseMutation, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotUnifiedResponseMutation to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotUnifiedResponseMutation
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotUnifiedResponseMutation {

        /** Properties of a SideBySideMetadata. */
        interface ISideBySideMetadata {

            /** SideBySideMetadata primaryResponseId */
            primaryResponseId?: (string|null);
        }

        /** Represents a SideBySideMetadata. */
        class SideBySideMetadata implements ISideBySideMetadata {

            /**
             * Constructs a new SideBySideMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: BotMetadata.BotUnifiedResponseMutation.ISideBySideMetadata);

            /** SideBySideMetadata primaryResponseId. */
            public primaryResponseId?: (string|null);

            /**
             * Creates a new SideBySideMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SideBySideMetadata instance
             */
            public static create(properties?: BotMetadata.BotUnifiedResponseMutation.ISideBySideMetadata): BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata;

            /**
             * Encodes the specified SideBySideMetadata message. Does not implicitly {@link BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.verify|verify} messages.
             * @param message SideBySideMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BotMetadata.BotUnifiedResponseMutation.ISideBySideMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SideBySideMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.verify|verify} messages.
             * @param message SideBySideMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BotMetadata.BotUnifiedResponseMutation.ISideBySideMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SideBySideMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SideBySideMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata;

            /**
             * Decodes a SideBySideMetadata message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SideBySideMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata;

            /**
             * Verifies a SideBySideMetadata message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SideBySideMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SideBySideMetadata
             */
            public static fromObject(object: { [k: string]: any }): BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata;

            /**
             * Creates a plain object from a SideBySideMetadata message. Also converts values to other types if specified.
             * @param message SideBySideMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SideBySideMetadata to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SideBySideMetadata
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a BotMessageOrigin. */
    interface IBotMessageOrigin {

        /** BotMessageOrigin type */
        type?: (BotMetadata.BotMessageOrigin.BotMessageOriginType|null);
    }

    /** Represents a BotMessageOrigin. */
    class BotMessageOrigin implements IBotMessageOrigin {

        /**
         * Constructs a new BotMessageOrigin.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotMessageOrigin);

        /** BotMessageOrigin type. */
        public type?: (BotMetadata.BotMessageOrigin.BotMessageOriginType|null);

        /**
         * Creates a new BotMessageOrigin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMessageOrigin instance
         */
        public static create(properties?: BotMetadata.IBotMessageOrigin): BotMetadata.BotMessageOrigin;

        /**
         * Encodes the specified BotMessageOrigin message. Does not implicitly {@link BotMetadata.BotMessageOrigin.verify|verify} messages.
         * @param message BotMessageOrigin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotMessageOrigin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMessageOrigin message, length delimited. Does not implicitly {@link BotMetadata.BotMessageOrigin.verify|verify} messages.
         * @param message BotMessageOrigin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotMessageOrigin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMessageOrigin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMessageOrigin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotMessageOrigin;

        /**
         * Decodes a BotMessageOrigin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMessageOrigin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotMessageOrigin;

        /**
         * Verifies a BotMessageOrigin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotMessageOrigin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotMessageOrigin
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotMessageOrigin;

        /**
         * Creates a plain object from a BotMessageOrigin message. Also converts values to other types if specified.
         * @param message BotMessageOrigin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotMessageOrigin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotMessageOrigin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotMessageOrigin
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotMessageOrigin {

        /** BotMessageOriginType enum. */
        enum BotMessageOriginType {
            BOT_MESSAGE_ORIGIN_TYPE_AI_INITIATED = 0
        }
    }

    /** Properties of a BotMessageOriginMetadata. */
    interface IBotMessageOriginMetadata {

        /** BotMessageOriginMetadata origins */
        origins?: (BotMetadata.IBotMessageOrigin[]|null);
    }

    /** Represents a BotMessageOriginMetadata. */
    class BotMessageOriginMetadata implements IBotMessageOriginMetadata {

        /**
         * Constructs a new BotMessageOriginMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotMessageOriginMetadata);

        /** BotMessageOriginMetadata origins. */
        public origins: BotMetadata.IBotMessageOrigin[];

        /**
         * Creates a new BotMessageOriginMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMessageOriginMetadata instance
         */
        public static create(properties?: BotMetadata.IBotMessageOriginMetadata): BotMetadata.BotMessageOriginMetadata;

        /**
         * Encodes the specified BotMessageOriginMetadata message. Does not implicitly {@link BotMetadata.BotMessageOriginMetadata.verify|verify} messages.
         * @param message BotMessageOriginMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotMessageOriginMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMessageOriginMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotMessageOriginMetadata.verify|verify} messages.
         * @param message BotMessageOriginMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotMessageOriginMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMessageOriginMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMessageOriginMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotMessageOriginMetadata;

        /**
         * Decodes a BotMessageOriginMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMessageOriginMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotMessageOriginMetadata;

        /**
         * Verifies a BotMessageOriginMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotMessageOriginMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotMessageOriginMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotMessageOriginMetadata;

        /**
         * Creates a plain object from a BotMessageOriginMetadata message. Also converts values to other types if specified.
         * @param message BotMessageOriginMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotMessageOriginMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotMessageOriginMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotMessageOriginMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an InThreadSurveyMetadata. */
    interface IInThreadSurveyMetadata {

        /** InThreadSurveyMetadata tessaSessionId */
        tessaSessionId?: (string|null);

        /** InThreadSurveyMetadata simonSessionId */
        simonSessionId?: (string|null);

        /** InThreadSurveyMetadata simonSurveyId */
        simonSurveyId?: (string|null);

        /** InThreadSurveyMetadata tessaRootId */
        tessaRootId?: (string|null);

        /** InThreadSurveyMetadata requestId */
        requestId?: (string|null);

        /** InThreadSurveyMetadata tessaEvent */
        tessaEvent?: (string|null);

        /** InThreadSurveyMetadata invitationHeaderText */
        invitationHeaderText?: (string|null);

        /** InThreadSurveyMetadata invitationBodyText */
        invitationBodyText?: (string|null);

        /** InThreadSurveyMetadata invitationCtaText */
        invitationCtaText?: (string|null);

        /** InThreadSurveyMetadata invitationCtaUrl */
        invitationCtaUrl?: (string|null);

        /** InThreadSurveyMetadata surveyTitle */
        surveyTitle?: (string|null);

        /** InThreadSurveyMetadata questions */
        questions?: (BotMetadata.InThreadSurveyMetadata.IInThreadSurveyQuestion[]|null);

        /** InThreadSurveyMetadata surveyContinueButtonText */
        surveyContinueButtonText?: (string|null);

        /** InThreadSurveyMetadata surveySubmitButtonText */
        surveySubmitButtonText?: (string|null);

        /** InThreadSurveyMetadata privacyStatementFull */
        privacyStatementFull?: (string|null);

        /** InThreadSurveyMetadata privacyStatementParts */
        privacyStatementParts?: (BotMetadata.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart[]|null);

        /** InThreadSurveyMetadata feedbackToastText */
        feedbackToastText?: (string|null);
    }

    /** Represents an InThreadSurveyMetadata. */
    class InThreadSurveyMetadata implements IInThreadSurveyMetadata {

        /**
         * Constructs a new InThreadSurveyMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IInThreadSurveyMetadata);

        /** InThreadSurveyMetadata tessaSessionId. */
        public tessaSessionId?: (string|null);

        /** InThreadSurveyMetadata simonSessionId. */
        public simonSessionId?: (string|null);

        /** InThreadSurveyMetadata simonSurveyId. */
        public simonSurveyId?: (string|null);

        /** InThreadSurveyMetadata tessaRootId. */
        public tessaRootId?: (string|null);

        /** InThreadSurveyMetadata requestId. */
        public requestId?: (string|null);

        /** InThreadSurveyMetadata tessaEvent. */
        public tessaEvent?: (string|null);

        /** InThreadSurveyMetadata invitationHeaderText. */
        public invitationHeaderText?: (string|null);

        /** InThreadSurveyMetadata invitationBodyText. */
        public invitationBodyText?: (string|null);

        /** InThreadSurveyMetadata invitationCtaText. */
        public invitationCtaText?: (string|null);

        /** InThreadSurveyMetadata invitationCtaUrl. */
        public invitationCtaUrl?: (string|null);

        /** InThreadSurveyMetadata surveyTitle. */
        public surveyTitle?: (string|null);

        /** InThreadSurveyMetadata questions. */
        public questions: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyQuestion[];

        /** InThreadSurveyMetadata surveyContinueButtonText. */
        public surveyContinueButtonText?: (string|null);

        /** InThreadSurveyMetadata surveySubmitButtonText. */
        public surveySubmitButtonText?: (string|null);

        /** InThreadSurveyMetadata privacyStatementFull. */
        public privacyStatementFull?: (string|null);

        /** InThreadSurveyMetadata privacyStatementParts. */
        public privacyStatementParts: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart[];

        /** InThreadSurveyMetadata feedbackToastText. */
        public feedbackToastText?: (string|null);

        /**
         * Creates a new InThreadSurveyMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InThreadSurveyMetadata instance
         */
        public static create(properties?: BotMetadata.IInThreadSurveyMetadata): BotMetadata.InThreadSurveyMetadata;

        /**
         * Encodes the specified InThreadSurveyMetadata message. Does not implicitly {@link BotMetadata.InThreadSurveyMetadata.verify|verify} messages.
         * @param message InThreadSurveyMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IInThreadSurveyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InThreadSurveyMetadata message, length delimited. Does not implicitly {@link BotMetadata.InThreadSurveyMetadata.verify|verify} messages.
         * @param message InThreadSurveyMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IInThreadSurveyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InThreadSurveyMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InThreadSurveyMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.InThreadSurveyMetadata;

        /**
         * Decodes an InThreadSurveyMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InThreadSurveyMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.InThreadSurveyMetadata;

        /**
         * Verifies an InThreadSurveyMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InThreadSurveyMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InThreadSurveyMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.InThreadSurveyMetadata;

        /**
         * Creates a plain object from an InThreadSurveyMetadata message. Also converts values to other types if specified.
         * @param message InThreadSurveyMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.InThreadSurveyMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InThreadSurveyMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for InThreadSurveyMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace InThreadSurveyMetadata {

        /** Properties of an InThreadSurveyOption. */
        interface IInThreadSurveyOption {

            /** InThreadSurveyOption stringValue */
            stringValue?: (string|null);

            /** InThreadSurveyOption numericValue */
            numericValue?: (number|null);

            /** InThreadSurveyOption textTranslated */
            textTranslated?: (string|null);
        }

        /** Represents an InThreadSurveyOption. */
        class InThreadSurveyOption implements IInThreadSurveyOption {

            /**
             * Constructs a new InThreadSurveyOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyOption);

            /** InThreadSurveyOption stringValue. */
            public stringValue?: (string|null);

            /** InThreadSurveyOption numericValue. */
            public numericValue?: (number|null);

            /** InThreadSurveyOption textTranslated. */
            public textTranslated?: (string|null);

            /**
             * Creates a new InThreadSurveyOption instance using the specified properties.
             * @param [properties] Properties to set
             * @returns InThreadSurveyOption instance
             */
            public static create(properties?: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyOption): BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption;

            /**
             * Encodes the specified InThreadSurveyOption message. Does not implicitly {@link BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.verify|verify} messages.
             * @param message InThreadSurveyOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified InThreadSurveyOption message, length delimited. Does not implicitly {@link BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.verify|verify} messages.
             * @param message InThreadSurveyOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InThreadSurveyOption message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InThreadSurveyOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption;

            /**
             * Decodes an InThreadSurveyOption message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InThreadSurveyOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption;

            /**
             * Verifies an InThreadSurveyOption message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an InThreadSurveyOption message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns InThreadSurveyOption
             */
            public static fromObject(object: { [k: string]: any }): BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption;

            /**
             * Creates a plain object from an InThreadSurveyOption message. Also converts values to other types if specified.
             * @param message InThreadSurveyOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this InThreadSurveyOption to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for InThreadSurveyOption
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an InThreadSurveyPrivacyStatementPart. */
        interface IInThreadSurveyPrivacyStatementPart {

            /** InThreadSurveyPrivacyStatementPart text */
            text?: (string|null);

            /** InThreadSurveyPrivacyStatementPart url */
            url?: (string|null);
        }

        /** Represents an InThreadSurveyPrivacyStatementPart. */
        class InThreadSurveyPrivacyStatementPart implements IInThreadSurveyPrivacyStatementPart {

            /**
             * Constructs a new InThreadSurveyPrivacyStatementPart.
             * @param [properties] Properties to set
             */
            constructor(properties?: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart);

            /** InThreadSurveyPrivacyStatementPart text. */
            public text?: (string|null);

            /** InThreadSurveyPrivacyStatementPart url. */
            public url?: (string|null);

            /**
             * Creates a new InThreadSurveyPrivacyStatementPart instance using the specified properties.
             * @param [properties] Properties to set
             * @returns InThreadSurveyPrivacyStatementPart instance
             */
            public static create(properties?: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart): BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;

            /**
             * Encodes the specified InThreadSurveyPrivacyStatementPart message. Does not implicitly {@link BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.verify|verify} messages.
             * @param message InThreadSurveyPrivacyStatementPart message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified InThreadSurveyPrivacyStatementPart message, length delimited. Does not implicitly {@link BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.verify|verify} messages.
             * @param message InThreadSurveyPrivacyStatementPart message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InThreadSurveyPrivacyStatementPart message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InThreadSurveyPrivacyStatementPart
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;

            /**
             * Decodes an InThreadSurveyPrivacyStatementPart message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InThreadSurveyPrivacyStatementPart
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;

            /**
             * Verifies an InThreadSurveyPrivacyStatementPart message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an InThreadSurveyPrivacyStatementPart message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns InThreadSurveyPrivacyStatementPart
             */
            public static fromObject(object: { [k: string]: any }): BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;

            /**
             * Creates a plain object from an InThreadSurveyPrivacyStatementPart message. Also converts values to other types if specified.
             * @param message InThreadSurveyPrivacyStatementPart
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this InThreadSurveyPrivacyStatementPart to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for InThreadSurveyPrivacyStatementPart
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an InThreadSurveyQuestion. */
        interface IInThreadSurveyQuestion {

            /** InThreadSurveyQuestion questionText */
            questionText?: (string|null);

            /** InThreadSurveyQuestion questionId */
            questionId?: (string|null);

            /** InThreadSurveyQuestion questionOptions */
            questionOptions?: (BotMetadata.InThreadSurveyMetadata.IInThreadSurveyOption[]|null);
        }

        /** Represents an InThreadSurveyQuestion. */
        class InThreadSurveyQuestion implements IInThreadSurveyQuestion {

            /**
             * Constructs a new InThreadSurveyQuestion.
             * @param [properties] Properties to set
             */
            constructor(properties?: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyQuestion);

            /** InThreadSurveyQuestion questionText. */
            public questionText?: (string|null);

            /** InThreadSurveyQuestion questionId. */
            public questionId?: (string|null);

            /** InThreadSurveyQuestion questionOptions. */
            public questionOptions: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyOption[];

            /**
             * Creates a new InThreadSurveyQuestion instance using the specified properties.
             * @param [properties] Properties to set
             * @returns InThreadSurveyQuestion instance
             */
            public static create(properties?: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyQuestion): BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion;

            /**
             * Encodes the specified InThreadSurveyQuestion message. Does not implicitly {@link BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.verify|verify} messages.
             * @param message InThreadSurveyQuestion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyQuestion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified InThreadSurveyQuestion message, length delimited. Does not implicitly {@link BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.verify|verify} messages.
             * @param message InThreadSurveyQuestion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BotMetadata.InThreadSurveyMetadata.IInThreadSurveyQuestion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InThreadSurveyQuestion message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InThreadSurveyQuestion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion;

            /**
             * Decodes an InThreadSurveyQuestion message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InThreadSurveyQuestion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion;

            /**
             * Verifies an InThreadSurveyQuestion message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an InThreadSurveyQuestion message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns InThreadSurveyQuestion
             */
            public static fromObject(object: { [k: string]: any }): BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion;

            /**
             * Creates a plain object from an InThreadSurveyQuestion message. Also converts values to other types if specified.
             * @param message InThreadSurveyQuestion
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this InThreadSurveyQuestion to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for InThreadSurveyQuestion
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a BotSourcesMetadata. */
    interface IBotSourcesMetadata {

        /** BotSourcesMetadata sources */
        sources?: (BotMetadata.BotSourcesMetadata.IBotSourceItem[]|null);
    }

    /** Represents a BotSourcesMetadata. */
    class BotSourcesMetadata implements IBotSourcesMetadata {

        /**
         * Constructs a new BotSourcesMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotSourcesMetadata);

        /** BotSourcesMetadata sources. */
        public sources: BotMetadata.BotSourcesMetadata.IBotSourceItem[];

        /**
         * Creates a new BotSourcesMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotSourcesMetadata instance
         */
        public static create(properties?: BotMetadata.IBotSourcesMetadata): BotMetadata.BotSourcesMetadata;

        /**
         * Encodes the specified BotSourcesMetadata message. Does not implicitly {@link BotMetadata.BotSourcesMetadata.verify|verify} messages.
         * @param message BotSourcesMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotSourcesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotSourcesMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotSourcesMetadata.verify|verify} messages.
         * @param message BotSourcesMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotSourcesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotSourcesMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotSourcesMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotSourcesMetadata;

        /**
         * Decodes a BotSourcesMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotSourcesMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotSourcesMetadata;

        /**
         * Verifies a BotSourcesMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotSourcesMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotSourcesMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotSourcesMetadata;

        /**
         * Creates a plain object from a BotSourcesMetadata message. Also converts values to other types if specified.
         * @param message BotSourcesMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotSourcesMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotSourcesMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotSourcesMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotSourcesMetadata {

        /** Properties of a BotSourceItem. */
        interface IBotSourceItem {

            /** BotSourceItem provider */
            provider?: (BotMetadata.BotSourcesMetadata.BotSourceItem.SourceProvider|null);

            /** BotSourceItem thumbnailCdnUrl */
            thumbnailCdnUrl?: (string|null);

            /** BotSourceItem sourceProviderUrl */
            sourceProviderUrl?: (string|null);

            /** BotSourceItem sourceQuery */
            sourceQuery?: (string|null);

            /** BotSourceItem faviconCdnUrl */
            faviconCdnUrl?: (string|null);

            /** BotSourceItem citationNumber */
            citationNumber?: (number|null);

            /** BotSourceItem sourceTitle */
            sourceTitle?: (string|null);
        }

        /** Represents a BotSourceItem. */
        class BotSourceItem implements IBotSourceItem {

            /**
             * Constructs a new BotSourceItem.
             * @param [properties] Properties to set
             */
            constructor(properties?: BotMetadata.BotSourcesMetadata.IBotSourceItem);

            /** BotSourceItem provider. */
            public provider?: (BotMetadata.BotSourcesMetadata.BotSourceItem.SourceProvider|null);

            /** BotSourceItem thumbnailCdnUrl. */
            public thumbnailCdnUrl?: (string|null);

            /** BotSourceItem sourceProviderUrl. */
            public sourceProviderUrl?: (string|null);

            /** BotSourceItem sourceQuery. */
            public sourceQuery?: (string|null);

            /** BotSourceItem faviconCdnUrl. */
            public faviconCdnUrl?: (string|null);

            /** BotSourceItem citationNumber. */
            public citationNumber?: (number|null);

            /** BotSourceItem sourceTitle. */
            public sourceTitle?: (string|null);

            /**
             * Creates a new BotSourceItem instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BotSourceItem instance
             */
            public static create(properties?: BotMetadata.BotSourcesMetadata.IBotSourceItem): BotMetadata.BotSourcesMetadata.BotSourceItem;

            /**
             * Encodes the specified BotSourceItem message. Does not implicitly {@link BotMetadata.BotSourcesMetadata.BotSourceItem.verify|verify} messages.
             * @param message BotSourceItem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BotMetadata.BotSourcesMetadata.IBotSourceItem, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BotSourceItem message, length delimited. Does not implicitly {@link BotMetadata.BotSourcesMetadata.BotSourceItem.verify|verify} messages.
             * @param message BotSourceItem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BotMetadata.BotSourcesMetadata.IBotSourceItem, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BotSourceItem message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BotSourceItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotSourcesMetadata.BotSourceItem;

            /**
             * Decodes a BotSourceItem message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BotSourceItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotSourcesMetadata.BotSourceItem;

            /**
             * Verifies a BotSourceItem message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BotSourceItem message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BotSourceItem
             */
            public static fromObject(object: { [k: string]: any }): BotMetadata.BotSourcesMetadata.BotSourceItem;

            /**
             * Creates a plain object from a BotSourceItem message. Also converts values to other types if specified.
             * @param message BotSourceItem
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BotMetadata.BotSourcesMetadata.BotSourceItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BotSourceItem to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BotSourceItem
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace BotSourceItem {

            /** SourceProvider enum. */
            enum SourceProvider {
                UNKNOWN = 0,
                BING = 1,
                GOOGLE = 2,
                SUPPORT = 3,
                OTHER = 4
            }
        }
    }

    /** Properties of a BotAgeCollectionMetadata. */
    interface IBotAgeCollectionMetadata {

        /** BotAgeCollectionMetadata ageCollectionEligible */
        ageCollectionEligible?: (boolean|null);

        /** BotAgeCollectionMetadata shouldTriggerAgeCollectionOnClient */
        shouldTriggerAgeCollectionOnClient?: (boolean|null);
    }

    /** Represents a BotAgeCollectionMetadata. */
    class BotAgeCollectionMetadata implements IBotAgeCollectionMetadata {

        /**
         * Constructs a new BotAgeCollectionMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotAgeCollectionMetadata);

        /** BotAgeCollectionMetadata ageCollectionEligible. */
        public ageCollectionEligible?: (boolean|null);

        /** BotAgeCollectionMetadata shouldTriggerAgeCollectionOnClient. */
        public shouldTriggerAgeCollectionOnClient?: (boolean|null);

        /**
         * Creates a new BotAgeCollectionMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotAgeCollectionMetadata instance
         */
        public static create(properties?: BotMetadata.IBotAgeCollectionMetadata): BotMetadata.BotAgeCollectionMetadata;

        /**
         * Encodes the specified BotAgeCollectionMetadata message. Does not implicitly {@link BotMetadata.BotAgeCollectionMetadata.verify|verify} messages.
         * @param message BotAgeCollectionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotAgeCollectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotAgeCollectionMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotAgeCollectionMetadata.verify|verify} messages.
         * @param message BotAgeCollectionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotAgeCollectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotAgeCollectionMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotAgeCollectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotAgeCollectionMetadata;

        /**
         * Decodes a BotAgeCollectionMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotAgeCollectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotAgeCollectionMetadata;

        /**
         * Verifies a BotAgeCollectionMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotAgeCollectionMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotAgeCollectionMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotAgeCollectionMetadata;

        /**
         * Creates a plain object from a BotAgeCollectionMetadata message. Also converts values to other types if specified.
         * @param message BotAgeCollectionMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotAgeCollectionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotAgeCollectionMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotAgeCollectionMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotImagineMetadata. */
    interface IBotImagineMetadata {

        /** BotImagineMetadata imagineType */
        imagineType?: (BotMetadata.BotImagineMetadata.ImagineType|null);
    }

    /** Represents a BotImagineMetadata. */
    class BotImagineMetadata implements IBotImagineMetadata {

        /**
         * Constructs a new BotImagineMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotImagineMetadata);

        /** BotImagineMetadata imagineType. */
        public imagineType?: (BotMetadata.BotImagineMetadata.ImagineType|null);

        /**
         * Creates a new BotImagineMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotImagineMetadata instance
         */
        public static create(properties?: BotMetadata.IBotImagineMetadata): BotMetadata.BotImagineMetadata;

        /**
         * Encodes the specified BotImagineMetadata message. Does not implicitly {@link BotMetadata.BotImagineMetadata.verify|verify} messages.
         * @param message BotImagineMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotImagineMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotImagineMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotImagineMetadata.verify|verify} messages.
         * @param message BotImagineMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotImagineMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotImagineMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotImagineMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotImagineMetadata;

        /**
         * Decodes a BotImagineMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotImagineMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotImagineMetadata;

        /**
         * Verifies a BotImagineMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotImagineMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotImagineMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotImagineMetadata;

        /**
         * Creates a plain object from a BotImagineMetadata message. Also converts values to other types if specified.
         * @param message BotImagineMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotImagineMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotImagineMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotImagineMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotImagineMetadata {

        /** ImagineType enum. */
        enum ImagineType {
            UNKNOWN = 0,
            IMAGINE = 1,
            MEMU = 2,
            FLASH = 3,
            EDIT = 4
        }
    }

    /** Properties of a BotQuotaMetadata. */
    interface IBotQuotaMetadata {

        /** BotQuotaMetadata botFeatureQuotaMetadata */
        botFeatureQuotaMetadata?: (BotMetadata.BotQuotaMetadata.IBotFeatureQuotaMetadata[]|null);
    }

    /** Represents a BotQuotaMetadata. */
    class BotQuotaMetadata implements IBotQuotaMetadata {

        /**
         * Constructs a new BotQuotaMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotQuotaMetadata);

        /** BotQuotaMetadata botFeatureQuotaMetadata. */
        public botFeatureQuotaMetadata: BotMetadata.BotQuotaMetadata.IBotFeatureQuotaMetadata[];

        /**
         * Creates a new BotQuotaMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotQuotaMetadata instance
         */
        public static create(properties?: BotMetadata.IBotQuotaMetadata): BotMetadata.BotQuotaMetadata;

        /**
         * Encodes the specified BotQuotaMetadata message. Does not implicitly {@link BotMetadata.BotQuotaMetadata.verify|verify} messages.
         * @param message BotQuotaMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotQuotaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotQuotaMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotQuotaMetadata.verify|verify} messages.
         * @param message BotQuotaMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotQuotaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotQuotaMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotQuotaMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotQuotaMetadata;

        /**
         * Decodes a BotQuotaMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotQuotaMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotQuotaMetadata;

        /**
         * Verifies a BotQuotaMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotQuotaMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotQuotaMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotQuotaMetadata;

        /**
         * Creates a plain object from a BotQuotaMetadata message. Also converts values to other types if specified.
         * @param message BotQuotaMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotQuotaMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotQuotaMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotQuotaMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotQuotaMetadata {

        /** Properties of a BotFeatureQuotaMetadata. */
        interface IBotFeatureQuotaMetadata {

            /** BotFeatureQuotaMetadata featureType */
            featureType?: (BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType|null);

            /** BotFeatureQuotaMetadata remainingQuota */
            remainingQuota?: (number|null);

            /** BotFeatureQuotaMetadata expirationTimestamp */
            expirationTimestamp?: (number|Long|null);
        }

        /** Represents a BotFeatureQuotaMetadata. */
        class BotFeatureQuotaMetadata implements IBotFeatureQuotaMetadata {

            /**
             * Constructs a new BotFeatureQuotaMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: BotMetadata.BotQuotaMetadata.IBotFeatureQuotaMetadata);

            /** BotFeatureQuotaMetadata featureType. */
            public featureType?: (BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType|null);

            /** BotFeatureQuotaMetadata remainingQuota. */
            public remainingQuota?: (number|null);

            /** BotFeatureQuotaMetadata expirationTimestamp. */
            public expirationTimestamp?: (number|Long|null);

            /**
             * Creates a new BotFeatureQuotaMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BotFeatureQuotaMetadata instance
             */
            public static create(properties?: BotMetadata.BotQuotaMetadata.IBotFeatureQuotaMetadata): BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata;

            /**
             * Encodes the specified BotFeatureQuotaMetadata message. Does not implicitly {@link BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.verify|verify} messages.
             * @param message BotFeatureQuotaMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BotMetadata.BotQuotaMetadata.IBotFeatureQuotaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BotFeatureQuotaMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.verify|verify} messages.
             * @param message BotFeatureQuotaMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BotMetadata.BotQuotaMetadata.IBotFeatureQuotaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BotFeatureQuotaMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BotFeatureQuotaMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata;

            /**
             * Decodes a BotFeatureQuotaMetadata message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BotFeatureQuotaMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata;

            /**
             * Verifies a BotFeatureQuotaMetadata message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BotFeatureQuotaMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BotFeatureQuotaMetadata
             */
            public static fromObject(object: { [k: string]: any }): BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata;

            /**
             * Creates a plain object from a BotFeatureQuotaMetadata message. Also converts values to other types if specified.
             * @param message BotFeatureQuotaMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BotFeatureQuotaMetadata to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BotFeatureQuotaMetadata
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace BotFeatureQuotaMetadata {

            /** BotFeatureType enum. */
            enum BotFeatureType {
                UNKNOWN_FEATURE = 0,
                REASONING_FEATURE = 1
            }
        }
    }

    /** Properties of a BotModeSelectionMetadata. */
    interface IBotModeSelectionMetadata {

        /** BotModeSelectionMetadata mode */
        mode?: (BotMetadata.BotModeSelectionMetadata.BotUserSelectionMode[]|null);
    }

    /** Represents a BotModeSelectionMetadata. */
    class BotModeSelectionMetadata implements IBotModeSelectionMetadata {

        /**
         * Constructs a new BotModeSelectionMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotModeSelectionMetadata);

        /** BotModeSelectionMetadata mode. */
        public mode: BotMetadata.BotModeSelectionMetadata.BotUserSelectionMode[];

        /**
         * Creates a new BotModeSelectionMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotModeSelectionMetadata instance
         */
        public static create(properties?: BotMetadata.IBotModeSelectionMetadata): BotMetadata.BotModeSelectionMetadata;

        /**
         * Encodes the specified BotModeSelectionMetadata message. Does not implicitly {@link BotMetadata.BotModeSelectionMetadata.verify|verify} messages.
         * @param message BotModeSelectionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotModeSelectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotModeSelectionMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotModeSelectionMetadata.verify|verify} messages.
         * @param message BotModeSelectionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotModeSelectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotModeSelectionMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotModeSelectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotModeSelectionMetadata;

        /**
         * Decodes a BotModeSelectionMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotModeSelectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotModeSelectionMetadata;

        /**
         * Verifies a BotModeSelectionMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotModeSelectionMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotModeSelectionMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotModeSelectionMetadata;

        /**
         * Creates a plain object from a BotModeSelectionMetadata message. Also converts values to other types if specified.
         * @param message BotModeSelectionMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotModeSelectionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotModeSelectionMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotModeSelectionMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotModeSelectionMetadata {

        /** BotUserSelectionMode enum. */
        enum BotUserSelectionMode {
            UNKNOWN_MODE = 0,
            REASONING_MODE = 1
        }
    }

    /** Properties of a BotCapabilityMetadata. */
    interface IBotCapabilityMetadata {

        /** BotCapabilityMetadata capabilities */
        capabilities?: (BotMetadata.BotCapabilityMetadata.BotCapabilityType[]|null);
    }

    /** Represents a BotCapabilityMetadata. */
    class BotCapabilityMetadata implements IBotCapabilityMetadata {

        /**
         * Constructs a new BotCapabilityMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotCapabilityMetadata);

        /** BotCapabilityMetadata capabilities. */
        public capabilities: BotMetadata.BotCapabilityMetadata.BotCapabilityType[];

        /**
         * Creates a new BotCapabilityMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotCapabilityMetadata instance
         */
        public static create(properties?: BotMetadata.IBotCapabilityMetadata): BotMetadata.BotCapabilityMetadata;

        /**
         * Encodes the specified BotCapabilityMetadata message. Does not implicitly {@link BotMetadata.BotCapabilityMetadata.verify|verify} messages.
         * @param message BotCapabilityMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotCapabilityMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotCapabilityMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotCapabilityMetadata.verify|verify} messages.
         * @param message BotCapabilityMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotCapabilityMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotCapabilityMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotCapabilityMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotCapabilityMetadata;

        /**
         * Decodes a BotCapabilityMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotCapabilityMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotCapabilityMetadata;

        /**
         * Verifies a BotCapabilityMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotCapabilityMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotCapabilityMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotCapabilityMetadata;

        /**
         * Creates a plain object from a BotCapabilityMetadata message. Also converts values to other types if specified.
         * @param message BotCapabilityMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotCapabilityMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotCapabilityMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotCapabilityMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotCapabilityMetadata {

        /** BotCapabilityType enum. */
        enum BotCapabilityType {
            UNKNOWN = 0,
            PROGRESS_INDICATOR = 1,
            RICH_RESPONSE_HEADING = 2,
            RICH_RESPONSE_NESTED_LIST = 3,
            AI_MEMORY = 4,
            RICH_RESPONSE_THREAD_SURFING = 5,
            RICH_RESPONSE_TABLE = 6,
            RICH_RESPONSE_CODE = 7,
            RICH_RESPONSE_STRUCTURED_RESPONSE = 8,
            RICH_RESPONSE_INLINE_IMAGE = 9,
            WA_IG_1P_PLUGIN_RANKING_CONTROL = 10,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_1 = 11,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_2 = 12,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_3 = 13,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_4 = 14,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_5 = 15,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_6 = 16,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_7 = 17,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_8 = 18,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_9 = 19,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_10 = 20,
            RICH_RESPONSE_SUB_HEADING = 21,
            RICH_RESPONSE_GRID_IMAGE = 22,
            AI_STUDIO_UGC_MEMORY = 23,
            RICH_RESPONSE_LATEX = 24,
            RICH_RESPONSE_MAPS = 25,
            RICH_RESPONSE_INLINE_REELS = 26,
            AGENTIC_PLANNING = 27,
            ACCOUNT_LINKING = 28,
            STREAMING_DISAGGREGATION = 29,
            RICH_RESPONSE_GRID_IMAGE_3P = 30,
            RICH_RESPONSE_LATEX_INLINE = 31,
            QUERY_PLAN = 32,
            PROACTIVE_MESSAGE = 33,
            RICH_RESPONSE_UNIFIED_RESPONSE = 34,
            PROMOTION_MESSAGE = 35,
            SIMPLIFIED_PROFILE_PAGE = 36,
            RICH_RESPONSE_SOURCES_IN_MESSAGE = 37,
            RICH_RESPONSE_SIDE_BY_SIDE_SURVEY = 38,
            RICH_RESPONSE_UNIFIED_TEXT_COMPONENT = 39,
            AI_SHARED_MEMORY = 40,
            RICH_RESPONSE_UNIFIED_SOURCES = 41,
            RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS = 42
        }
    }

    /** Properties of a BotProgressIndicatorMetadata. */
    interface IBotProgressIndicatorMetadata {

        /** BotProgressIndicatorMetadata progressDescription */
        progressDescription?: (string|null);

        /** BotProgressIndicatorMetadata stepsMetadata */
        stepsMetadata?: (BotMetadata.BotProgressIndicatorMetadata.IBotPlanningStepMetadata[]|null);
    }

    /** Represents a BotProgressIndicatorMetadata. */
    class BotProgressIndicatorMetadata implements IBotProgressIndicatorMetadata {

        /**
         * Constructs a new BotProgressIndicatorMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotProgressIndicatorMetadata);

        /** BotProgressIndicatorMetadata progressDescription. */
        public progressDescription?: (string|null);

        /** BotProgressIndicatorMetadata stepsMetadata. */
        public stepsMetadata: BotMetadata.BotProgressIndicatorMetadata.IBotPlanningStepMetadata[];

        /**
         * Creates a new BotProgressIndicatorMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotProgressIndicatorMetadata instance
         */
        public static create(properties?: BotMetadata.IBotProgressIndicatorMetadata): BotMetadata.BotProgressIndicatorMetadata;

        /**
         * Encodes the specified BotProgressIndicatorMetadata message. Does not implicitly {@link BotMetadata.BotProgressIndicatorMetadata.verify|verify} messages.
         * @param message BotProgressIndicatorMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotProgressIndicatorMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotProgressIndicatorMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotProgressIndicatorMetadata.verify|verify} messages.
         * @param message BotProgressIndicatorMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotProgressIndicatorMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotProgressIndicatorMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotProgressIndicatorMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotProgressIndicatorMetadata;

        /**
         * Decodes a BotProgressIndicatorMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotProgressIndicatorMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotProgressIndicatorMetadata;

        /**
         * Verifies a BotProgressIndicatorMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotProgressIndicatorMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotProgressIndicatorMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotProgressIndicatorMetadata;

        /**
         * Creates a plain object from a BotProgressIndicatorMetadata message. Also converts values to other types if specified.
         * @param message BotProgressIndicatorMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotProgressIndicatorMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotProgressIndicatorMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotProgressIndicatorMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotProgressIndicatorMetadata {

        /** Properties of a BotPlanningStepMetadata. */
        interface IBotPlanningStepMetadata {

            /** BotPlanningStepMetadata statusTitle */
            statusTitle?: (string|null);

            /** BotPlanningStepMetadata statusBody */
            statusBody?: (string|null);

            /** BotPlanningStepMetadata sourcesMetadata */
            sourcesMetadata?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata[]|null);

            /** BotPlanningStepMetadata status */
            status?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus|null);

            /** BotPlanningStepMetadata isReasoning */
            isReasoning?: (boolean|null);

            /** BotPlanningStepMetadata isEnhancedSearch */
            isEnhancedSearch?: (boolean|null);

            /** BotPlanningStepMetadata sections */
            sections?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata[]|null);
        }

        /** Represents a BotPlanningStepMetadata. */
        class BotPlanningStepMetadata implements IBotPlanningStepMetadata {

            /**
             * Constructs a new BotPlanningStepMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: BotMetadata.BotProgressIndicatorMetadata.IBotPlanningStepMetadata);

            /** BotPlanningStepMetadata statusTitle. */
            public statusTitle?: (string|null);

            /** BotPlanningStepMetadata statusBody. */
            public statusBody?: (string|null);

            /** BotPlanningStepMetadata sourcesMetadata. */
            public sourcesMetadata: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata[];

            /** BotPlanningStepMetadata status. */
            public status?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus|null);

            /** BotPlanningStepMetadata isReasoning. */
            public isReasoning?: (boolean|null);

            /** BotPlanningStepMetadata isEnhancedSearch. */
            public isEnhancedSearch?: (boolean|null);

            /** BotPlanningStepMetadata sections. */
            public sections: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata[];

            /**
             * Creates a new BotPlanningStepMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BotPlanningStepMetadata instance
             */
            public static create(properties?: BotMetadata.BotProgressIndicatorMetadata.IBotPlanningStepMetadata): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata;

            /**
             * Encodes the specified BotPlanningStepMetadata message. Does not implicitly {@link BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.verify|verify} messages.
             * @param message BotPlanningStepMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BotMetadata.BotProgressIndicatorMetadata.IBotPlanningStepMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BotPlanningStepMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.verify|verify} messages.
             * @param message BotPlanningStepMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BotMetadata.BotProgressIndicatorMetadata.IBotPlanningStepMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BotPlanningStepMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BotPlanningStepMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata;

            /**
             * Decodes a BotPlanningStepMetadata message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BotPlanningStepMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata;

            /**
             * Verifies a BotPlanningStepMetadata message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BotPlanningStepMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BotPlanningStepMetadata
             */
            public static fromObject(object: { [k: string]: any }): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata;

            /**
             * Creates a plain object from a BotPlanningStepMetadata message. Also converts values to other types if specified.
             * @param message BotPlanningStepMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BotPlanningStepMetadata to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BotPlanningStepMetadata
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace BotPlanningStepMetadata {

            /** Properties of a BotPlanningSearchSourceMetadata. */
            interface IBotPlanningSearchSourceMetadata {

                /** BotPlanningSearchSourceMetadata title */
                title?: (string|null);

                /** BotPlanningSearchSourceMetadata provider */
                provider?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider|null);

                /** BotPlanningSearchSourceMetadata sourceUrl */
                sourceUrl?: (string|null);

                /** BotPlanningSearchSourceMetadata favIconUrl */
                favIconUrl?: (string|null);
            }

            /** Represents a BotPlanningSearchSourceMetadata. */
            class BotPlanningSearchSourceMetadata implements IBotPlanningSearchSourceMetadata {

                /**
                 * Constructs a new BotPlanningSearchSourceMetadata.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata);

                /** BotPlanningSearchSourceMetadata title. */
                public title?: (string|null);

                /** BotPlanningSearchSourceMetadata provider. */
                public provider?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider|null);

                /** BotPlanningSearchSourceMetadata sourceUrl. */
                public sourceUrl?: (string|null);

                /** BotPlanningSearchSourceMetadata favIconUrl. */
                public favIconUrl?: (string|null);

                /**
                 * Creates a new BotPlanningSearchSourceMetadata instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BotPlanningSearchSourceMetadata instance
                 */
                public static create(properties?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;

                /**
                 * Encodes the specified BotPlanningSearchSourceMetadata message. Does not implicitly {@link BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.verify|verify} messages.
                 * @param message BotPlanningSearchSourceMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BotPlanningSearchSourceMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.verify|verify} messages.
                 * @param message BotPlanningSearchSourceMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BotPlanningSearchSourceMetadata message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BotPlanningSearchSourceMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;

                /**
                 * Decodes a BotPlanningSearchSourceMetadata message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BotPlanningSearchSourceMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;

                /**
                 * Verifies a BotPlanningSearchSourceMetadata message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BotPlanningSearchSourceMetadata message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BotPlanningSearchSourceMetadata
                 */
                public static fromObject(object: { [k: string]: any }): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;

                /**
                 * Creates a plain object from a BotPlanningSearchSourceMetadata message. Also converts values to other types if specified.
                 * @param message BotPlanningSearchSourceMetadata
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BotPlanningSearchSourceMetadata to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for BotPlanningSearchSourceMetadata
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a BotPlanningSearchSourcesMetadata. */
            interface IBotPlanningSearchSourcesMetadata {

                /** BotPlanningSearchSourcesMetadata sourceTitle */
                sourceTitle?: (string|null);

                /** BotPlanningSearchSourcesMetadata provider */
                provider?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider|null);

                /** BotPlanningSearchSourcesMetadata sourceUrl */
                sourceUrl?: (string|null);
            }

            /** Represents a BotPlanningSearchSourcesMetadata. */
            class BotPlanningSearchSourcesMetadata implements IBotPlanningSearchSourcesMetadata {

                /**
                 * Constructs a new BotPlanningSearchSourcesMetadata.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata);

                /** BotPlanningSearchSourcesMetadata sourceTitle. */
                public sourceTitle?: (string|null);

                /** BotPlanningSearchSourcesMetadata provider. */
                public provider?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider|null);

                /** BotPlanningSearchSourcesMetadata sourceUrl. */
                public sourceUrl?: (string|null);

                /**
                 * Creates a new BotPlanningSearchSourcesMetadata instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BotPlanningSearchSourcesMetadata instance
                 */
                public static create(properties?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;

                /**
                 * Encodes the specified BotPlanningSearchSourcesMetadata message. Does not implicitly {@link BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.verify|verify} messages.
                 * @param message BotPlanningSearchSourcesMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BotPlanningSearchSourcesMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.verify|verify} messages.
                 * @param message BotPlanningSearchSourcesMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BotPlanningSearchSourcesMetadata message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BotPlanningSearchSourcesMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;

                /**
                 * Decodes a BotPlanningSearchSourcesMetadata message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BotPlanningSearchSourcesMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;

                /**
                 * Verifies a BotPlanningSearchSourcesMetadata message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BotPlanningSearchSourcesMetadata message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BotPlanningSearchSourcesMetadata
                 */
                public static fromObject(object: { [k: string]: any }): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;

                /**
                 * Creates a plain object from a BotPlanningSearchSourcesMetadata message. Also converts values to other types if specified.
                 * @param message BotPlanningSearchSourcesMetadata
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BotPlanningSearchSourcesMetadata to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for BotPlanningSearchSourcesMetadata
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace BotPlanningSearchSourcesMetadata {

                /** BotPlanningSearchSourceProvider enum. */
                enum BotPlanningSearchSourceProvider {
                    UNKNOWN = 0,
                    OTHER = 1,
                    GOOGLE = 2,
                    BING = 3
                }
            }

            /** Properties of a BotPlanningStepSectionMetadata. */
            interface IBotPlanningStepSectionMetadata {

                /** BotPlanningStepSectionMetadata sectionTitle */
                sectionTitle?: (string|null);

                /** BotPlanningStepSectionMetadata sectionBody */
                sectionBody?: (string|null);

                /** BotPlanningStepSectionMetadata sourcesMetadata */
                sourcesMetadata?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata[]|null);
            }

            /** Represents a BotPlanningStepSectionMetadata. */
            class BotPlanningStepSectionMetadata implements IBotPlanningStepSectionMetadata {

                /**
                 * Constructs a new BotPlanningStepSectionMetadata.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata);

                /** BotPlanningStepSectionMetadata sectionTitle. */
                public sectionTitle?: (string|null);

                /** BotPlanningStepSectionMetadata sectionBody. */
                public sectionBody?: (string|null);

                /** BotPlanningStepSectionMetadata sourcesMetadata. */
                public sourcesMetadata: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata[];

                /**
                 * Creates a new BotPlanningStepSectionMetadata instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BotPlanningStepSectionMetadata instance
                 */
                public static create(properties?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;

                /**
                 * Encodes the specified BotPlanningStepSectionMetadata message. Does not implicitly {@link BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.verify|verify} messages.
                 * @param message BotPlanningStepSectionMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BotPlanningStepSectionMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.verify|verify} messages.
                 * @param message BotPlanningStepSectionMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BotPlanningStepSectionMetadata message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BotPlanningStepSectionMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;

                /**
                 * Decodes a BotPlanningStepSectionMetadata message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BotPlanningStepSectionMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;

                /**
                 * Verifies a BotPlanningStepSectionMetadata message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BotPlanningStepSectionMetadata message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BotPlanningStepSectionMetadata
                 */
                public static fromObject(object: { [k: string]: any }): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;

                /**
                 * Creates a plain object from a BotPlanningStepSectionMetadata message. Also converts values to other types if specified.
                 * @param message BotPlanningStepSectionMetadata
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BotPlanningStepSectionMetadata to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for BotPlanningStepSectionMetadata
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** BotSearchSourceProvider enum. */
            enum BotSearchSourceProvider {
                UNKNOWN_PROVIDER = 0,
                OTHER = 1,
                GOOGLE = 2,
                BING = 3
            }

            /** PlanningStepStatus enum. */
            enum PlanningStepStatus {
                UNKNOWN = 0,
                PLANNED = 1,
                EXECUTING = 2,
                FINISHED = 3
            }
        }
    }

    /** Properties of a BotModelMetadata. */
    interface IBotModelMetadata {

        /** BotModelMetadata modelType */
        modelType?: (BotMetadata.BotModelMetadata.ModelType|null);

        /** BotModelMetadata premiumModelStatus */
        premiumModelStatus?: (BotMetadata.BotModelMetadata.PremiumModelStatus|null);
    }

    /** Represents a BotModelMetadata. */
    class BotModelMetadata implements IBotModelMetadata {

        /**
         * Constructs a new BotModelMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotModelMetadata);

        /** BotModelMetadata modelType. */
        public modelType?: (BotMetadata.BotModelMetadata.ModelType|null);

        /** BotModelMetadata premiumModelStatus. */
        public premiumModelStatus?: (BotMetadata.BotModelMetadata.PremiumModelStatus|null);

        /**
         * Creates a new BotModelMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotModelMetadata instance
         */
        public static create(properties?: BotMetadata.IBotModelMetadata): BotMetadata.BotModelMetadata;

        /**
         * Encodes the specified BotModelMetadata message. Does not implicitly {@link BotMetadata.BotModelMetadata.verify|verify} messages.
         * @param message BotModelMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotModelMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotModelMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotModelMetadata.verify|verify} messages.
         * @param message BotModelMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotModelMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotModelMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotModelMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotModelMetadata;

        /**
         * Decodes a BotModelMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotModelMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotModelMetadata;

        /**
         * Verifies a BotModelMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotModelMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotModelMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotModelMetadata;

        /**
         * Creates a plain object from a BotModelMetadata message. Also converts values to other types if specified.
         * @param message BotModelMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotModelMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotModelMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotModelMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotModelMetadata {

        /** ModelType enum. */
        enum ModelType {
            UNKNOWN_TYPE = 0,
            LLAMA_PROD = 1,
            LLAMA_PROD_PREMIUM = 2
        }

        /** PremiumModelStatus enum. */
        enum PremiumModelStatus {
            UNKNOWN_STATUS = 0,
            AVAILABLE = 1,
            QUOTA_EXCEED_LIMIT = 2
        }
    }

    /** Properties of a BotReminderMetadata. */
    interface IBotReminderMetadata {

        /** BotReminderMetadata requestMessageKey */
        requestMessageKey?: (Protocol.IMessageKey|null);

        /** BotReminderMetadata action */
        action?: (BotMetadata.BotReminderMetadata.ReminderAction|null);

        /** BotReminderMetadata name */
        name?: (string|null);

        /** BotReminderMetadata nextTriggerTimestamp */
        nextTriggerTimestamp?: (number|Long|null);

        /** BotReminderMetadata frequency */
        frequency?: (BotMetadata.BotReminderMetadata.ReminderFrequency|null);
    }

    /** Represents a BotReminderMetadata. */
    class BotReminderMetadata implements IBotReminderMetadata {

        /**
         * Constructs a new BotReminderMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotReminderMetadata);

        /** BotReminderMetadata requestMessageKey. */
        public requestMessageKey?: (Protocol.IMessageKey|null);

        /** BotReminderMetadata action. */
        public action?: (BotMetadata.BotReminderMetadata.ReminderAction|null);

        /** BotReminderMetadata name. */
        public name?: (string|null);

        /** BotReminderMetadata nextTriggerTimestamp. */
        public nextTriggerTimestamp?: (number|Long|null);

        /** BotReminderMetadata frequency. */
        public frequency?: (BotMetadata.BotReminderMetadata.ReminderFrequency|null);

        /**
         * Creates a new BotReminderMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotReminderMetadata instance
         */
        public static create(properties?: BotMetadata.IBotReminderMetadata): BotMetadata.BotReminderMetadata;

        /**
         * Encodes the specified BotReminderMetadata message. Does not implicitly {@link BotMetadata.BotReminderMetadata.verify|verify} messages.
         * @param message BotReminderMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotReminderMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotReminderMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotReminderMetadata.verify|verify} messages.
         * @param message BotReminderMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotReminderMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotReminderMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotReminderMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotReminderMetadata;

        /**
         * Decodes a BotReminderMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotReminderMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotReminderMetadata;

        /**
         * Verifies a BotReminderMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotReminderMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotReminderMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotReminderMetadata;

        /**
         * Creates a plain object from a BotReminderMetadata message. Also converts values to other types if specified.
         * @param message BotReminderMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotReminderMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotReminderMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotReminderMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotReminderMetadata {

        /** ReminderAction enum. */
        enum ReminderAction {
            NOTIFY = 1,
            CREATE = 2,
            DELETE = 3,
            UPDATE = 4
        }

        /** ReminderFrequency enum. */
        enum ReminderFrequency {
            ONCE = 1,
            DAILY = 2,
            WEEKLY = 3,
            BIWEEKLY = 4,
            MONTHLY = 5
        }
    }

    /** Properties of a BotMemuMetadata. */
    interface IBotMemuMetadata {

        /** BotMemuMetadata faceImages */
        faceImages?: (BotMetadata.IBotMediaMetadata[]|null);
    }

    /** Represents a BotMemuMetadata. */
    class BotMemuMetadata implements IBotMemuMetadata {

        /**
         * Constructs a new BotMemuMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotMemuMetadata);

        /** BotMemuMetadata faceImages. */
        public faceImages: BotMetadata.IBotMediaMetadata[];

        /**
         * Creates a new BotMemuMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMemuMetadata instance
         */
        public static create(properties?: BotMetadata.IBotMemuMetadata): BotMetadata.BotMemuMetadata;

        /**
         * Encodes the specified BotMemuMetadata message. Does not implicitly {@link BotMetadata.BotMemuMetadata.verify|verify} messages.
         * @param message BotMemuMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotMemuMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMemuMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotMemuMetadata.verify|verify} messages.
         * @param message BotMemuMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotMemuMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMemuMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMemuMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotMemuMetadata;

        /**
         * Decodes a BotMemuMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMemuMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotMemuMetadata;

        /**
         * Verifies a BotMemuMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotMemuMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotMemuMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotMemuMetadata;

        /**
         * Creates a plain object from a BotMemuMetadata message. Also converts values to other types if specified.
         * @param message BotMemuMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotMemuMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotMemuMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotMemuMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotMediaMetadata. */
    interface IBotMediaMetadata {

        /** BotMediaMetadata fileSha256 */
        fileSha256?: (string|null);

        /** BotMediaMetadata mediaKey */
        mediaKey?: (string|null);

        /** BotMediaMetadata fileEncSha256 */
        fileEncSha256?: (string|null);

        /** BotMediaMetadata directPath */
        directPath?: (string|null);

        /** BotMediaMetadata mediaKeyTimestamp */
        mediaKeyTimestamp?: (number|Long|null);

        /** BotMediaMetadata mimetype */
        mimetype?: (string|null);

        /** BotMediaMetadata orientationType */
        orientationType?: (BotMetadata.BotMediaMetadata.OrientationType|null);
    }

    /** Represents a BotMediaMetadata. */
    class BotMediaMetadata implements IBotMediaMetadata {

        /**
         * Constructs a new BotMediaMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotMediaMetadata);

        /** BotMediaMetadata fileSha256. */
        public fileSha256?: (string|null);

        /** BotMediaMetadata mediaKey. */
        public mediaKey?: (string|null);

        /** BotMediaMetadata fileEncSha256. */
        public fileEncSha256?: (string|null);

        /** BotMediaMetadata directPath. */
        public directPath?: (string|null);

        /** BotMediaMetadata mediaKeyTimestamp. */
        public mediaKeyTimestamp?: (number|Long|null);

        /** BotMediaMetadata mimetype. */
        public mimetype?: (string|null);

        /** BotMediaMetadata orientationType. */
        public orientationType?: (BotMetadata.BotMediaMetadata.OrientationType|null);

        /**
         * Creates a new BotMediaMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMediaMetadata instance
         */
        public static create(properties?: BotMetadata.IBotMediaMetadata): BotMetadata.BotMediaMetadata;

        /**
         * Encodes the specified BotMediaMetadata message. Does not implicitly {@link BotMetadata.BotMediaMetadata.verify|verify} messages.
         * @param message BotMediaMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotMediaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMediaMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotMediaMetadata.verify|verify} messages.
         * @param message BotMediaMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotMediaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMediaMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMediaMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotMediaMetadata;

        /**
         * Decodes a BotMediaMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMediaMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotMediaMetadata;

        /**
         * Verifies a BotMediaMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotMediaMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotMediaMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotMediaMetadata;

        /**
         * Creates a plain object from a BotMediaMetadata message. Also converts values to other types if specified.
         * @param message BotMediaMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotMediaMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotMediaMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotMediaMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotMediaMetadata {

        /** OrientationType enum. */
        enum OrientationType {
            CENTER = 1,
            LEFT = 2,
            RIGHT = 3
        }
    }

    /** Properties of a BotSessionMetadata. */
    interface IBotSessionMetadata {

        /** BotSessionMetadata sessionId */
        sessionId?: (string|null);

        /** BotSessionMetadata sessionSource */
        sessionSource?: (BotMetadata.BotSessionSource|null);
    }

    /** Represents a BotSessionMetadata. */
    class BotSessionMetadata implements IBotSessionMetadata {

        /**
         * Constructs a new BotSessionMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotSessionMetadata);

        /** BotSessionMetadata sessionId. */
        public sessionId?: (string|null);

        /** BotSessionMetadata sessionSource. */
        public sessionSource?: (BotMetadata.BotSessionSource|null);

        /**
         * Creates a new BotSessionMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotSessionMetadata instance
         */
        public static create(properties?: BotMetadata.IBotSessionMetadata): BotMetadata.BotSessionMetadata;

        /**
         * Encodes the specified BotSessionMetadata message. Does not implicitly {@link BotMetadata.BotSessionMetadata.verify|verify} messages.
         * @param message BotSessionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotSessionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotSessionMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotSessionMetadata.verify|verify} messages.
         * @param message BotSessionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotSessionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotSessionMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotSessionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotSessionMetadata;

        /**
         * Decodes a BotSessionMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotSessionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotSessionMetadata;

        /**
         * Verifies a BotSessionMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotSessionMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotSessionMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotSessionMetadata;

        /**
         * Creates a plain object from a BotSessionMetadata message. Also converts values to other types if specified.
         * @param message BotSessionMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotSessionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotSessionMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotSessionMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotMetricsMetadata. */
    interface IBotMetricsMetadata {

        /** BotMetricsMetadata destinationId */
        destinationId?: (string|null);

        /** BotMetricsMetadata destinationEntryPoint */
        destinationEntryPoint?: (BotMetadata.BotMetricsEntryPoint|null);

        /** BotMetricsMetadata threadOrigin */
        threadOrigin?: (BotMetadata.BotMetricsThreadEntryPoint|null);
    }

    /** Represents a BotMetricsMetadata. */
    class BotMetricsMetadata implements IBotMetricsMetadata {

        /**
         * Constructs a new BotMetricsMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotMetricsMetadata);

        /** BotMetricsMetadata destinationId. */
        public destinationId?: (string|null);

        /** BotMetricsMetadata destinationEntryPoint. */
        public destinationEntryPoint?: (BotMetadata.BotMetricsEntryPoint|null);

        /** BotMetricsMetadata threadOrigin. */
        public threadOrigin?: (BotMetadata.BotMetricsThreadEntryPoint|null);

        /**
         * Creates a new BotMetricsMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMetricsMetadata instance
         */
        public static create(properties?: BotMetadata.IBotMetricsMetadata): BotMetadata.BotMetricsMetadata;

        /**
         * Encodes the specified BotMetricsMetadata message. Does not implicitly {@link BotMetadata.BotMetricsMetadata.verify|verify} messages.
         * @param message BotMetricsMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotMetricsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMetricsMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotMetricsMetadata.verify|verify} messages.
         * @param message BotMetricsMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotMetricsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMetricsMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMetricsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotMetricsMetadata;

        /**
         * Decodes a BotMetricsMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMetricsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotMetricsMetadata;

        /**
         * Verifies a BotMetricsMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotMetricsMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotMetricsMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotMetricsMetadata;

        /**
         * Creates a plain object from a BotMetricsMetadata message. Also converts values to other types if specified.
         * @param message BotMetricsMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotMetricsMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotMetricsMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotMetricsMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotRenderingMetadata. */
    interface IBotRenderingMetadata {

        /** BotRenderingMetadata keywords */
        keywords?: (BotMetadata.BotRenderingMetadata.IKeyword[]|null);
    }

    /** Represents a BotRenderingMetadata. */
    class BotRenderingMetadata implements IBotRenderingMetadata {

        /**
         * Constructs a new BotRenderingMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotRenderingMetadata);

        /** BotRenderingMetadata keywords. */
        public keywords: BotMetadata.BotRenderingMetadata.IKeyword[];

        /**
         * Creates a new BotRenderingMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotRenderingMetadata instance
         */
        public static create(properties?: BotMetadata.IBotRenderingMetadata): BotMetadata.BotRenderingMetadata;

        /**
         * Encodes the specified BotRenderingMetadata message. Does not implicitly {@link BotMetadata.BotRenderingMetadata.verify|verify} messages.
         * @param message BotRenderingMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotRenderingMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotRenderingMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotRenderingMetadata.verify|verify} messages.
         * @param message BotRenderingMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotRenderingMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotRenderingMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotRenderingMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotRenderingMetadata;

        /**
         * Decodes a BotRenderingMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotRenderingMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotRenderingMetadata;

        /**
         * Verifies a BotRenderingMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotRenderingMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotRenderingMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotRenderingMetadata;

        /**
         * Creates a plain object from a BotRenderingMetadata message. Also converts values to other types if specified.
         * @param message BotRenderingMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotRenderingMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotRenderingMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotRenderingMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotRenderingMetadata {

        /** Properties of a Keyword. */
        interface IKeyword {

            /** Keyword value */
            value?: (string|null);

            /** Keyword associatedPrompts */
            associatedPrompts?: (string[]|null);
        }

        /** Represents a Keyword. */
        class Keyword implements IKeyword {

            /**
             * Constructs a new Keyword.
             * @param [properties] Properties to set
             */
            constructor(properties?: BotMetadata.BotRenderingMetadata.IKeyword);

            /** Keyword value. */
            public value?: (string|null);

            /** Keyword associatedPrompts. */
            public associatedPrompts: string[];

            /**
             * Creates a new Keyword instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Keyword instance
             */
            public static create(properties?: BotMetadata.BotRenderingMetadata.IKeyword): BotMetadata.BotRenderingMetadata.Keyword;

            /**
             * Encodes the specified Keyword message. Does not implicitly {@link BotMetadata.BotRenderingMetadata.Keyword.verify|verify} messages.
             * @param message Keyword message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: BotMetadata.BotRenderingMetadata.IKeyword, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Keyword message, length delimited. Does not implicitly {@link BotMetadata.BotRenderingMetadata.Keyword.verify|verify} messages.
             * @param message Keyword message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: BotMetadata.BotRenderingMetadata.IKeyword, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Keyword message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Keyword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotRenderingMetadata.Keyword;

            /**
             * Decodes a Keyword message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Keyword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotRenderingMetadata.Keyword;

            /**
             * Verifies a Keyword message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Keyword message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Keyword
             */
            public static fromObject(object: { [k: string]: any }): BotMetadata.BotRenderingMetadata.Keyword;

            /**
             * Creates a plain object from a Keyword message. Also converts values to other types if specified.
             * @param message Keyword
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: BotMetadata.BotRenderingMetadata.Keyword, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Keyword to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Keyword
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a BotPromotionMessageMetadata. */
    interface IBotPromotionMessageMetadata {

        /** BotPromotionMessageMetadata promotionType */
        promotionType?: (BotMetadata.BotPromotionMessageMetadata.BotPromotionType|null);

        /** BotPromotionMessageMetadata buttonTitle */
        buttonTitle?: (string|null);
    }

    /** Represents a BotPromotionMessageMetadata. */
    class BotPromotionMessageMetadata implements IBotPromotionMessageMetadata {

        /**
         * Constructs a new BotPromotionMessageMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotPromotionMessageMetadata);

        /** BotPromotionMessageMetadata promotionType. */
        public promotionType?: (BotMetadata.BotPromotionMessageMetadata.BotPromotionType|null);

        /** BotPromotionMessageMetadata buttonTitle. */
        public buttonTitle?: (string|null);

        /**
         * Creates a new BotPromotionMessageMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotPromotionMessageMetadata instance
         */
        public static create(properties?: BotMetadata.IBotPromotionMessageMetadata): BotMetadata.BotPromotionMessageMetadata;

        /**
         * Encodes the specified BotPromotionMessageMetadata message. Does not implicitly {@link BotMetadata.BotPromotionMessageMetadata.verify|verify} messages.
         * @param message BotPromotionMessageMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotPromotionMessageMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotPromotionMessageMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotPromotionMessageMetadata.verify|verify} messages.
         * @param message BotPromotionMessageMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotPromotionMessageMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotPromotionMessageMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotPromotionMessageMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotPromotionMessageMetadata;

        /**
         * Decodes a BotPromotionMessageMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotPromotionMessageMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotPromotionMessageMetadata;

        /**
         * Verifies a BotPromotionMessageMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotPromotionMessageMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotPromotionMessageMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotPromotionMessageMetadata;

        /**
         * Creates a plain object from a BotPromotionMessageMetadata message. Also converts values to other types if specified.
         * @param message BotPromotionMessageMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotPromotionMessageMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotPromotionMessageMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotPromotionMessageMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotPromotionMessageMetadata {

        /** BotPromotionType enum. */
        enum BotPromotionType {
            UNKNOWN_TYPE = 0,
            C50 = 1,
            SURVEY_PLATFORM = 2
        }
    }

    /** Properties of a BotSignatureVerificationUseCaseProof. */
    interface IBotSignatureVerificationUseCaseProof {

        /** BotSignatureVerificationUseCaseProof version */
        version?: (number|null);

        /** BotSignatureVerificationUseCaseProof useCase */
        useCase?: (BotMetadata.BotSignatureVerificationUseCaseProof.BotSignatureUseCase|null);

        /** BotSignatureVerificationUseCaseProof signature */
        signature?: (Uint8Array|null);

        /** BotSignatureVerificationUseCaseProof certificateChain */
        certificateChain?: (Uint8Array|null);
    }

    /** Represents a BotSignatureVerificationUseCaseProof. */
    class BotSignatureVerificationUseCaseProof implements IBotSignatureVerificationUseCaseProof {

        /**
         * Constructs a new BotSignatureVerificationUseCaseProof.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotSignatureVerificationUseCaseProof);

        /** BotSignatureVerificationUseCaseProof version. */
        public version?: (number|null);

        /** BotSignatureVerificationUseCaseProof useCase. */
        public useCase?: (BotMetadata.BotSignatureVerificationUseCaseProof.BotSignatureUseCase|null);

        /** BotSignatureVerificationUseCaseProof signature. */
        public signature?: (Uint8Array|null);

        /** BotSignatureVerificationUseCaseProof certificateChain. */
        public certificateChain?: (Uint8Array|null);

        /**
         * Creates a new BotSignatureVerificationUseCaseProof instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotSignatureVerificationUseCaseProof instance
         */
        public static create(properties?: BotMetadata.IBotSignatureVerificationUseCaseProof): BotMetadata.BotSignatureVerificationUseCaseProof;

        /**
         * Encodes the specified BotSignatureVerificationUseCaseProof message. Does not implicitly {@link BotMetadata.BotSignatureVerificationUseCaseProof.verify|verify} messages.
         * @param message BotSignatureVerificationUseCaseProof message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotSignatureVerificationUseCaseProof, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotSignatureVerificationUseCaseProof message, length delimited. Does not implicitly {@link BotMetadata.BotSignatureVerificationUseCaseProof.verify|verify} messages.
         * @param message BotSignatureVerificationUseCaseProof message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotSignatureVerificationUseCaseProof, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotSignatureVerificationUseCaseProof message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotSignatureVerificationUseCaseProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotSignatureVerificationUseCaseProof;

        /**
         * Decodes a BotSignatureVerificationUseCaseProof message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotSignatureVerificationUseCaseProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotSignatureVerificationUseCaseProof;

        /**
         * Verifies a BotSignatureVerificationUseCaseProof message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotSignatureVerificationUseCaseProof message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotSignatureVerificationUseCaseProof
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotSignatureVerificationUseCaseProof;

        /**
         * Creates a plain object from a BotSignatureVerificationUseCaseProof message. Also converts values to other types if specified.
         * @param message BotSignatureVerificationUseCaseProof
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotSignatureVerificationUseCaseProof, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotSignatureVerificationUseCaseProof to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotSignatureVerificationUseCaseProof
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotSignatureVerificationUseCaseProof {

        /** BotSignatureUseCase enum. */
        enum BotSignatureUseCase {
            WA_BOT_MSG = 0
        }
    }

    /** Properties of a BotSignatureVerificationMetadata. */
    interface IBotSignatureVerificationMetadata {

        /** BotSignatureVerificationMetadata proofs */
        proofs?: (BotMetadata.IBotSignatureVerificationUseCaseProof[]|null);
    }

    /** Represents a BotSignatureVerificationMetadata. */
    class BotSignatureVerificationMetadata implements IBotSignatureVerificationMetadata {

        /**
         * Constructs a new BotSignatureVerificationMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotSignatureVerificationMetadata);

        /** BotSignatureVerificationMetadata proofs. */
        public proofs: BotMetadata.IBotSignatureVerificationUseCaseProof[];

        /**
         * Creates a new BotSignatureVerificationMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotSignatureVerificationMetadata instance
         */
        public static create(properties?: BotMetadata.IBotSignatureVerificationMetadata): BotMetadata.BotSignatureVerificationMetadata;

        /**
         * Encodes the specified BotSignatureVerificationMetadata message. Does not implicitly {@link BotMetadata.BotSignatureVerificationMetadata.verify|verify} messages.
         * @param message BotSignatureVerificationMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotSignatureVerificationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotSignatureVerificationMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotSignatureVerificationMetadata.verify|verify} messages.
         * @param message BotSignatureVerificationMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotSignatureVerificationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotSignatureVerificationMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotSignatureVerificationMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotSignatureVerificationMetadata;

        /**
         * Decodes a BotSignatureVerificationMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotSignatureVerificationMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotSignatureVerificationMetadata;

        /**
         * Verifies a BotSignatureVerificationMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotSignatureVerificationMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotSignatureVerificationMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotSignatureVerificationMetadata;

        /**
         * Creates a plain object from a BotSignatureVerificationMetadata message. Also converts values to other types if specified.
         * @param message BotSignatureVerificationMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotSignatureVerificationMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotSignatureVerificationMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotSignatureVerificationMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotMemoryFact. */
    interface IBotMemoryFact {

        /** BotMemoryFact fact */
        fact?: (string|null);

        /** BotMemoryFact factId */
        factId?: (string|null);
    }

    /** Represents a BotMemoryFact. */
    class BotMemoryFact implements IBotMemoryFact {

        /**
         * Constructs a new BotMemoryFact.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotMemoryFact);

        /** BotMemoryFact fact. */
        public fact?: (string|null);

        /** BotMemoryFact factId. */
        public factId?: (string|null);

        /**
         * Creates a new BotMemoryFact instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMemoryFact instance
         */
        public static create(properties?: BotMetadata.IBotMemoryFact): BotMetadata.BotMemoryFact;

        /**
         * Encodes the specified BotMemoryFact message. Does not implicitly {@link BotMetadata.BotMemoryFact.verify|verify} messages.
         * @param message BotMemoryFact message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotMemoryFact, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMemoryFact message, length delimited. Does not implicitly {@link BotMetadata.BotMemoryFact.verify|verify} messages.
         * @param message BotMemoryFact message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotMemoryFact, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMemoryFact message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMemoryFact
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotMemoryFact;

        /**
         * Decodes a BotMemoryFact message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMemoryFact
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotMemoryFact;

        /**
         * Verifies a BotMemoryFact message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotMemoryFact message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotMemoryFact
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotMemoryFact;

        /**
         * Creates a plain object from a BotMemoryFact message. Also converts values to other types if specified.
         * @param message BotMemoryFact
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotMemoryFact, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotMemoryFact to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotMemoryFact
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotMemoryMetadata. */
    interface IBotMemoryMetadata {

        /** BotMemoryMetadata addedFacts */
        addedFacts?: (BotMetadata.IBotMemoryFact[]|null);

        /** BotMemoryMetadata removedFacts */
        removedFacts?: (BotMetadata.IBotMemoryFact[]|null);

        /** BotMemoryMetadata disclaimer */
        disclaimer?: (string|null);
    }

    /** Represents a BotMemoryMetadata. */
    class BotMemoryMetadata implements IBotMemoryMetadata {

        /**
         * Constructs a new BotMemoryMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotMemoryMetadata);

        /** BotMemoryMetadata addedFacts. */
        public addedFacts: BotMetadata.IBotMemoryFact[];

        /** BotMemoryMetadata removedFacts. */
        public removedFacts: BotMetadata.IBotMemoryFact[];

        /** BotMemoryMetadata disclaimer. */
        public disclaimer?: (string|null);

        /**
         * Creates a new BotMemoryMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMemoryMetadata instance
         */
        public static create(properties?: BotMetadata.IBotMemoryMetadata): BotMetadata.BotMemoryMetadata;

        /**
         * Encodes the specified BotMemoryMetadata message. Does not implicitly {@link BotMetadata.BotMemoryMetadata.verify|verify} messages.
         * @param message BotMemoryMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotMemoryMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMemoryMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotMemoryMetadata.verify|verify} messages.
         * @param message BotMemoryMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotMemoryMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMemoryMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMemoryMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotMemoryMetadata;

        /**
         * Decodes a BotMemoryMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMemoryMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotMemoryMetadata;

        /**
         * Verifies a BotMemoryMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotMemoryMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotMemoryMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotMemoryMetadata;

        /**
         * Creates a plain object from a BotMemoryMetadata message. Also converts values to other types if specified.
         * @param message BotMemoryMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotMemoryMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotMemoryMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotMemoryMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotLinkedAccount. */
    interface IBotLinkedAccount {

        /** BotLinkedAccount type */
        type?: (BotMetadata.BotLinkedAccount.BotLinkedAccountType|null);
    }

    /** Represents a BotLinkedAccount. */
    class BotLinkedAccount implements IBotLinkedAccount {

        /**
         * Constructs a new BotLinkedAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotLinkedAccount);

        /** BotLinkedAccount type. */
        public type?: (BotMetadata.BotLinkedAccount.BotLinkedAccountType|null);

        /**
         * Creates a new BotLinkedAccount instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotLinkedAccount instance
         */
        public static create(properties?: BotMetadata.IBotLinkedAccount): BotMetadata.BotLinkedAccount;

        /**
         * Encodes the specified BotLinkedAccount message. Does not implicitly {@link BotMetadata.BotLinkedAccount.verify|verify} messages.
         * @param message BotLinkedAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotLinkedAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotLinkedAccount message, length delimited. Does not implicitly {@link BotMetadata.BotLinkedAccount.verify|verify} messages.
         * @param message BotLinkedAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotLinkedAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotLinkedAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotLinkedAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotLinkedAccount;

        /**
         * Decodes a BotLinkedAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotLinkedAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotLinkedAccount;

        /**
         * Verifies a BotLinkedAccount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotLinkedAccount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotLinkedAccount
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotLinkedAccount;

        /**
         * Creates a plain object from a BotLinkedAccount message. Also converts values to other types if specified.
         * @param message BotLinkedAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotLinkedAccount, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotLinkedAccount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotLinkedAccount
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotLinkedAccount {

        /** BotLinkedAccountType enum. */
        enum BotLinkedAccountType {
            BOT_LINKED_ACCOUNT_TYPE_1P = 0
        }
    }

    /** Properties of a BotLinkedAccountsMetadata. */
    interface IBotLinkedAccountsMetadata {

        /** BotLinkedAccountsMetadata accounts */
        accounts?: (BotMetadata.IBotLinkedAccount[]|null);

        /** BotLinkedAccountsMetadata acAuthTokens */
        acAuthTokens?: (Uint8Array|null);

        /** BotLinkedAccountsMetadata acErrorCode */
        acErrorCode?: (number|null);
    }

    /** Represents a BotLinkedAccountsMetadata. */
    class BotLinkedAccountsMetadata implements IBotLinkedAccountsMetadata {

        /**
         * Constructs a new BotLinkedAccountsMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotLinkedAccountsMetadata);

        /** BotLinkedAccountsMetadata accounts. */
        public accounts: BotMetadata.IBotLinkedAccount[];

        /** BotLinkedAccountsMetadata acAuthTokens. */
        public acAuthTokens?: (Uint8Array|null);

        /** BotLinkedAccountsMetadata acErrorCode. */
        public acErrorCode?: (number|null);

        /**
         * Creates a new BotLinkedAccountsMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotLinkedAccountsMetadata instance
         */
        public static create(properties?: BotMetadata.IBotLinkedAccountsMetadata): BotMetadata.BotLinkedAccountsMetadata;

        /**
         * Encodes the specified BotLinkedAccountsMetadata message. Does not implicitly {@link BotMetadata.BotLinkedAccountsMetadata.verify|verify} messages.
         * @param message BotLinkedAccountsMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotLinkedAccountsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotLinkedAccountsMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotLinkedAccountsMetadata.verify|verify} messages.
         * @param message BotLinkedAccountsMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotLinkedAccountsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotLinkedAccountsMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotLinkedAccountsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotLinkedAccountsMetadata;

        /**
         * Decodes a BotLinkedAccountsMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotLinkedAccountsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotLinkedAccountsMetadata;

        /**
         * Verifies a BotLinkedAccountsMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotLinkedAccountsMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotLinkedAccountsMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotLinkedAccountsMetadata;

        /**
         * Creates a plain object from a BotLinkedAccountsMetadata message. Also converts values to other types if specified.
         * @param message BotLinkedAccountsMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotLinkedAccountsMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotLinkedAccountsMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotLinkedAccountsMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotPromptSuggestion. */
    interface IBotPromptSuggestion {

        /** BotPromptSuggestion prompt */
        prompt?: (string|null);

        /** BotPromptSuggestion promptId */
        promptId?: (string|null);
    }

    /** Represents a BotPromptSuggestion. */
    class BotPromptSuggestion implements IBotPromptSuggestion {

        /**
         * Constructs a new BotPromptSuggestion.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotPromptSuggestion);

        /** BotPromptSuggestion prompt. */
        public prompt?: (string|null);

        /** BotPromptSuggestion promptId. */
        public promptId?: (string|null);

        /**
         * Creates a new BotPromptSuggestion instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotPromptSuggestion instance
         */
        public static create(properties?: BotMetadata.IBotPromptSuggestion): BotMetadata.BotPromptSuggestion;

        /**
         * Encodes the specified BotPromptSuggestion message. Does not implicitly {@link BotMetadata.BotPromptSuggestion.verify|verify} messages.
         * @param message BotPromptSuggestion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotPromptSuggestion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotPromptSuggestion message, length delimited. Does not implicitly {@link BotMetadata.BotPromptSuggestion.verify|verify} messages.
         * @param message BotPromptSuggestion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotPromptSuggestion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotPromptSuggestion message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotPromptSuggestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotPromptSuggestion;

        /**
         * Decodes a BotPromptSuggestion message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotPromptSuggestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotPromptSuggestion;

        /**
         * Verifies a BotPromptSuggestion message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotPromptSuggestion message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotPromptSuggestion
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotPromptSuggestion;

        /**
         * Creates a plain object from a BotPromptSuggestion message. Also converts values to other types if specified.
         * @param message BotPromptSuggestion
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotPromptSuggestion, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotPromptSuggestion to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotPromptSuggestion
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotPromptSuggestions. */
    interface IBotPromptSuggestions {

        /** BotPromptSuggestions suggestions */
        suggestions?: (BotMetadata.IBotPromptSuggestion[]|null);
    }

    /** Represents a BotPromptSuggestions. */
    class BotPromptSuggestions implements IBotPromptSuggestions {

        /**
         * Constructs a new BotPromptSuggestions.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotPromptSuggestions);

        /** BotPromptSuggestions suggestions. */
        public suggestions: BotMetadata.IBotPromptSuggestion[];

        /**
         * Creates a new BotPromptSuggestions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotPromptSuggestions instance
         */
        public static create(properties?: BotMetadata.IBotPromptSuggestions): BotMetadata.BotPromptSuggestions;

        /**
         * Encodes the specified BotPromptSuggestions message. Does not implicitly {@link BotMetadata.BotPromptSuggestions.verify|verify} messages.
         * @param message BotPromptSuggestions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotPromptSuggestions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotPromptSuggestions message, length delimited. Does not implicitly {@link BotMetadata.BotPromptSuggestions.verify|verify} messages.
         * @param message BotPromptSuggestions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotPromptSuggestions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotPromptSuggestions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotPromptSuggestions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotPromptSuggestions;

        /**
         * Decodes a BotPromptSuggestions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotPromptSuggestions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotPromptSuggestions;

        /**
         * Verifies a BotPromptSuggestions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotPromptSuggestions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotPromptSuggestions
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotPromptSuggestions;

        /**
         * Creates a plain object from a BotPromptSuggestions message. Also converts values to other types if specified.
         * @param message BotPromptSuggestions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotPromptSuggestions, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotPromptSuggestions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotPromptSuggestions
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotSuggestedPromptMetadata. */
    interface IBotSuggestedPromptMetadata {

        /** BotSuggestedPromptMetadata suggestedPrompts */
        suggestedPrompts?: (string[]|null);

        /** BotSuggestedPromptMetadata selectedPromptIndex */
        selectedPromptIndex?: (number|null);

        /** BotSuggestedPromptMetadata promptSuggestions */
        promptSuggestions?: (BotMetadata.IBotPromptSuggestions|null);

        /** BotSuggestedPromptMetadata selectedPromptId */
        selectedPromptId?: (string|null);
    }

    /** Represents a BotSuggestedPromptMetadata. */
    class BotSuggestedPromptMetadata implements IBotSuggestedPromptMetadata {

        /**
         * Constructs a new BotSuggestedPromptMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotSuggestedPromptMetadata);

        /** BotSuggestedPromptMetadata suggestedPrompts. */
        public suggestedPrompts: string[];

        /** BotSuggestedPromptMetadata selectedPromptIndex. */
        public selectedPromptIndex?: (number|null);

        /** BotSuggestedPromptMetadata promptSuggestions. */
        public promptSuggestions?: (BotMetadata.IBotPromptSuggestions|null);

        /** BotSuggestedPromptMetadata selectedPromptId. */
        public selectedPromptId?: (string|null);

        /**
         * Creates a new BotSuggestedPromptMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotSuggestedPromptMetadata instance
         */
        public static create(properties?: BotMetadata.IBotSuggestedPromptMetadata): BotMetadata.BotSuggestedPromptMetadata;

        /**
         * Encodes the specified BotSuggestedPromptMetadata message. Does not implicitly {@link BotMetadata.BotSuggestedPromptMetadata.verify|verify} messages.
         * @param message BotSuggestedPromptMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotSuggestedPromptMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotSuggestedPromptMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotSuggestedPromptMetadata.verify|verify} messages.
         * @param message BotSuggestedPromptMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotSuggestedPromptMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotSuggestedPromptMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotSuggestedPromptMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotSuggestedPromptMetadata;

        /**
         * Decodes a BotSuggestedPromptMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotSuggestedPromptMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotSuggestedPromptMetadata;

        /**
         * Verifies a BotSuggestedPromptMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotSuggestedPromptMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotSuggestedPromptMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotSuggestedPromptMetadata;

        /**
         * Creates a plain object from a BotSuggestedPromptMetadata message. Also converts values to other types if specified.
         * @param message BotSuggestedPromptMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotSuggestedPromptMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotSuggestedPromptMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotSuggestedPromptMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotPluginMetadata. */
    interface IBotPluginMetadata {

        /** BotPluginMetadata provider */
        provider?: (BotMetadata.BotPluginMetadata.SearchProvider|null);

        /** BotPluginMetadata pluginType */
        pluginType?: (BotMetadata.BotPluginMetadata.PluginType|null);

        /** BotPluginMetadata thumbnailCdnUrl */
        thumbnailCdnUrl?: (string|null);

        /** BotPluginMetadata profilePhotoCdnUrl */
        profilePhotoCdnUrl?: (string|null);

        /** BotPluginMetadata searchProviderUrl */
        searchProviderUrl?: (string|null);

        /** BotPluginMetadata referenceIndex */
        referenceIndex?: (number|null);

        /** BotPluginMetadata expectedLinksCount */
        expectedLinksCount?: (number|null);

        /** BotPluginMetadata searchQuery */
        searchQuery?: (string|null);

        /** BotPluginMetadata parentPluginMessageKey */
        parentPluginMessageKey?: (Protocol.IMessageKey|null);

        /** BotPluginMetadata deprecatedField */
        deprecatedField?: (BotMetadata.BotPluginMetadata.PluginType|null);

        /** BotPluginMetadata parentPluginType */
        parentPluginType?: (BotMetadata.BotPluginMetadata.PluginType|null);

        /** BotPluginMetadata faviconCdnUrl */
        faviconCdnUrl?: (string|null);
    }

    /** Represents a BotPluginMetadata. */
    class BotPluginMetadata implements IBotPluginMetadata {

        /**
         * Constructs a new BotPluginMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotPluginMetadata);

        /** BotPluginMetadata provider. */
        public provider?: (BotMetadata.BotPluginMetadata.SearchProvider|null);

        /** BotPluginMetadata pluginType. */
        public pluginType?: (BotMetadata.BotPluginMetadata.PluginType|null);

        /** BotPluginMetadata thumbnailCdnUrl. */
        public thumbnailCdnUrl?: (string|null);

        /** BotPluginMetadata profilePhotoCdnUrl. */
        public profilePhotoCdnUrl?: (string|null);

        /** BotPluginMetadata searchProviderUrl. */
        public searchProviderUrl?: (string|null);

        /** BotPluginMetadata referenceIndex. */
        public referenceIndex?: (number|null);

        /** BotPluginMetadata expectedLinksCount. */
        public expectedLinksCount?: (number|null);

        /** BotPluginMetadata searchQuery. */
        public searchQuery?: (string|null);

        /** BotPluginMetadata parentPluginMessageKey. */
        public parentPluginMessageKey?: (Protocol.IMessageKey|null);

        /** BotPluginMetadata deprecatedField. */
        public deprecatedField?: (BotMetadata.BotPluginMetadata.PluginType|null);

        /** BotPluginMetadata parentPluginType. */
        public parentPluginType?: (BotMetadata.BotPluginMetadata.PluginType|null);

        /** BotPluginMetadata faviconCdnUrl. */
        public faviconCdnUrl?: (string|null);

        /**
         * Creates a new BotPluginMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotPluginMetadata instance
         */
        public static create(properties?: BotMetadata.IBotPluginMetadata): BotMetadata.BotPluginMetadata;

        /**
         * Encodes the specified BotPluginMetadata message. Does not implicitly {@link BotMetadata.BotPluginMetadata.verify|verify} messages.
         * @param message BotPluginMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotPluginMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotPluginMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotPluginMetadata.verify|verify} messages.
         * @param message BotPluginMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotPluginMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotPluginMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotPluginMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotPluginMetadata;

        /**
         * Decodes a BotPluginMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotPluginMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotPluginMetadata;

        /**
         * Verifies a BotPluginMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotPluginMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotPluginMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotPluginMetadata;

        /**
         * Creates a plain object from a BotPluginMetadata message. Also converts values to other types if specified.
         * @param message BotPluginMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotPluginMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotPluginMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotPluginMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotPluginMetadata {

        /** PluginType enum. */
        enum PluginType {
            UNKNOWN_PLUGIN = 0,
            REELS = 1,
            SEARCH = 2
        }

        /** SearchProvider enum. */
        enum SearchProvider {
            UNKNOWN = 0,
            BING = 1,
            GOOGLE = 2,
            SUPPORT = 3
        }
    }

    /** Properties of a BotAvatarMetadata. */
    interface IBotAvatarMetadata {

        /** BotAvatarMetadata sentiment */
        sentiment?: (number|null);

        /** BotAvatarMetadata behaviorGraph */
        behaviorGraph?: (string|null);

        /** BotAvatarMetadata action */
        action?: (number|null);

        /** BotAvatarMetadata intensity */
        intensity?: (number|null);

        /** BotAvatarMetadata wordCount */
        wordCount?: (number|null);
    }

    /** Represents a BotAvatarMetadata. */
    class BotAvatarMetadata implements IBotAvatarMetadata {

        /**
         * Constructs a new BotAvatarMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: BotMetadata.IBotAvatarMetadata);

        /** BotAvatarMetadata sentiment. */
        public sentiment?: (number|null);

        /** BotAvatarMetadata behaviorGraph. */
        public behaviorGraph?: (string|null);

        /** BotAvatarMetadata action. */
        public action?: (number|null);

        /** BotAvatarMetadata intensity. */
        public intensity?: (number|null);

        /** BotAvatarMetadata wordCount. */
        public wordCount?: (number|null);

        /**
         * Creates a new BotAvatarMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotAvatarMetadata instance
         */
        public static create(properties?: BotMetadata.IBotAvatarMetadata): BotMetadata.BotAvatarMetadata;

        /**
         * Encodes the specified BotAvatarMetadata message. Does not implicitly {@link BotMetadata.BotAvatarMetadata.verify|verify} messages.
         * @param message BotAvatarMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: BotMetadata.IBotAvatarMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotAvatarMetadata message, length delimited. Does not implicitly {@link BotMetadata.BotAvatarMetadata.verify|verify} messages.
         * @param message BotAvatarMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: BotMetadata.IBotAvatarMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotAvatarMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotAvatarMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BotMetadata.BotAvatarMetadata;

        /**
         * Decodes a BotAvatarMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotAvatarMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BotMetadata.BotAvatarMetadata;

        /**
         * Verifies a BotAvatarMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotAvatarMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotAvatarMetadata
         */
        public static fromObject(object: { [k: string]: any }): BotMetadata.BotAvatarMetadata;

        /**
         * Creates a plain object from a BotAvatarMetadata message. Also converts values to other types if specified.
         * @param message BotAvatarMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BotMetadata.BotAvatarMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotAvatarMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotAvatarMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** BotSessionSource enum. */
    enum BotSessionSource {
        NONE = 0,
        NULL_STATE = 1,
        TYPEAHEAD = 2,
        USER_INPUT = 3,
        EMU_FLASH = 4,
        EMU_FLASH_FOLLOWUP = 5,
        VOICE = 6
    }

    /** BotMetricsThreadEntryPoint enum. */
    enum BotMetricsThreadEntryPoint {
        AI_TAB_THREAD = 1,
        AI_HOME_THREAD = 2,
        AI_DEEPLINK_IMMERSIVE_THREAD = 3,
        AI_DEEPLINK_THREAD = 4,
        ASK_META_AI_CONTEXT_MENU_THREAD = 5
    }

    /** BotMetricsEntryPoint enum. */
    enum BotMetricsEntryPoint {
        FAVICON = 1,
        CHATLIST = 2,
        AISEARCH_NULL_STATE_PAPER_PLANE = 3,
        AISEARCH_NULL_STATE_SUGGESTION = 4,
        AISEARCH_TYPE_AHEAD_SUGGESTION = 5,
        AISEARCH_TYPE_AHEAD_PAPER_PLANE = 6,
        AISEARCH_TYPE_AHEAD_RESULT_CHATLIST = 7,
        AISEARCH_TYPE_AHEAD_RESULT_MESSAGES = 8,
        AIVOICE_SEARCH_BAR = 9,
        AIVOICE_FAVICON = 10,
        AISTUDIO = 11,
        DEEPLINK = 12,
        NOTIFICATION = 13,
        PROFILE_MESSAGE_BUTTON = 14,
        FORWARD = 15,
        APP_SHORTCUT = 16,
        FF_FAMILY = 17,
        AI_TAB = 18,
        AI_HOME = 19,
        AI_DEEPLINK_IMMERSIVE = 20,
        AI_DEEPLINK = 21,
        META_AI_CHAT_SHORTCUT_AI_STUDIO = 22,
        UGC_CHAT_SHORTCUT_AI_STUDIO = 23,
        NEW_CHAT_AI_STUDIO = 24,
        AIVOICE_FAVICON_CALL_HISTORY = 25,
        ASK_META_AI_CONTEXT_MENU = 26,
        ASK_META_AI_CONTEXT_MENU_1ON1 = 27,
        ASK_META_AI_CONTEXT_MENU_GROUP = 28,
        INVOKE_META_AI_1ON1 = 29,
        INVOKE_META_AI_GROUP = 30,
        META_AI_FORWARD = 31
    }
}

/** Namespace Protocol. */
export namespace Protocol {

    /** Properties of a ACP2Setting. */
    interface IACP2Setting {

        /** ACP2Setting enabled */
        enabled?: (boolean|null);

        /** ACP2Setting trigger */
        trigger?: (Protocol.LimitSharing.TriggerType|null);

        /** ACP2Setting settingTimestamp */
        settingTimestamp?: (number|Long|null);

        /** ACP2Setting initiatedByMe */
        initiatedByMe?: (boolean|null);
    }

    /** Represents a ACP2Setting. */
    class ACP2Setting implements IACP2Setting {

        /**
         * Constructs a new ACP2Setting.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protocol.IACP2Setting);

        /** ACP2Setting enabled. */
        public enabled?: (boolean|null);

        /** ACP2Setting trigger. */
        public trigger?: (Protocol.LimitSharing.TriggerType|null);

        /** ACP2Setting settingTimestamp. */
        public settingTimestamp?: (number|Long|null);

        /** ACP2Setting initiatedByMe. */
        public initiatedByMe?: (boolean|null);

        /**
         * Creates a new ACP2Setting instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ACP2Setting instance
         */
        public static create(properties?: Protocol.IACP2Setting): Protocol.ACP2Setting;

        /**
         * Encodes the specified ACP2Setting message. Does not implicitly {@link Protocol.ACP2Setting.verify|verify} messages.
         * @param message ACP2Setting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protocol.IACP2Setting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ACP2Setting message, length delimited. Does not implicitly {@link Protocol.ACP2Setting.verify|verify} messages.
         * @param message ACP2Setting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protocol.IACP2Setting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ACP2Setting message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ACP2Setting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protocol.ACP2Setting;

        /**
         * Decodes a ACP2Setting message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ACP2Setting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protocol.ACP2Setting;

        /**
         * Verifies a ACP2Setting message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ACP2Setting message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ACP2Setting
         */
        public static fromObject(object: { [k: string]: any }): Protocol.ACP2Setting;

        /**
         * Creates a plain object from a ACP2Setting message. Also converts values to other types if specified.
         * @param message ACP2Setting
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protocol.ACP2Setting, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ACP2Setting to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ACP2Setting
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

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
