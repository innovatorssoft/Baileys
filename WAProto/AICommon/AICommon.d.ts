import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace AICommon. */
export namespace AICommon {

    /** Properties of a BotAgentDeepLinkMetadata. */
    interface IBotAgentDeepLinkMetadata {

        /** BotAgentDeepLinkMetadata token */
        token?: (string|null);
    }

    /** Represents a BotAgentDeepLinkMetadata. */
    class BotAgentDeepLinkMetadata implements IBotAgentDeepLinkMetadata {

        /**
         * Constructs a new BotAgentDeepLinkMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotAgentDeepLinkMetadata);

        /** BotAgentDeepLinkMetadata token. */
        public token?: (string|null);

        /**
         * Creates a new BotAgentDeepLinkMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotAgentDeepLinkMetadata instance
         */
        public static create(properties?: AICommon.IBotAgentDeepLinkMetadata): AICommon.BotAgentDeepLinkMetadata;

        /**
         * Encodes the specified BotAgentDeepLinkMetadata message. Does not implicitly {@link AICommon.BotAgentDeepLinkMetadata.verify|verify} messages.
         * @param message BotAgentDeepLinkMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotAgentDeepLinkMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotAgentDeepLinkMetadata message, length delimited. Does not implicitly {@link AICommon.BotAgentDeepLinkMetadata.verify|verify} messages.
         * @param message BotAgentDeepLinkMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotAgentDeepLinkMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotAgentDeepLinkMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotAgentDeepLinkMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotAgentDeepLinkMetadata;

        /**
         * Decodes a BotAgentDeepLinkMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotAgentDeepLinkMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotAgentDeepLinkMetadata;

        /**
         * Verifies a BotAgentDeepLinkMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotAgentDeepLinkMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotAgentDeepLinkMetadata
         */
        public static fromObject(object: { [k: string]: any }): AICommon.BotAgentDeepLinkMetadata;

        /**
         * Creates a plain object from a BotAgentDeepLinkMetadata message. Also converts values to other types if specified.
         * @param message BotAgentDeepLinkMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotAgentDeepLinkMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotAgentDeepLinkMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotAgentDeepLinkMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotAgentMetadata. */
    interface IBotAgentMetadata {

        /** BotAgentMetadata deepLinkMetadata */
        deepLinkMetadata?: (AICommon.IBotAgentDeepLinkMetadata|null);
    }

    /** Represents a BotAgentMetadata. */
    class BotAgentMetadata implements IBotAgentMetadata {

        /**
         * Constructs a new BotAgentMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotAgentMetadata);

        /** BotAgentMetadata deepLinkMetadata. */
        public deepLinkMetadata?: (AICommon.IBotAgentDeepLinkMetadata|null);

        /**
         * Creates a new BotAgentMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotAgentMetadata instance
         */
        public static create(properties?: AICommon.IBotAgentMetadata): AICommon.BotAgentMetadata;

        /**
         * Encodes the specified BotAgentMetadata message. Does not implicitly {@link AICommon.BotAgentMetadata.verify|verify} messages.
         * @param message BotAgentMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotAgentMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotAgentMetadata message, length delimited. Does not implicitly {@link AICommon.BotAgentMetadata.verify|verify} messages.
         * @param message BotAgentMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotAgentMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotAgentMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotAgentMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotAgentMetadata;

        /**
         * Decodes a BotAgentMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotAgentMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotAgentMetadata;

        /**
         * Verifies a BotAgentMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotAgentMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotAgentMetadata
         */
        public static fromObject(object: { [k: string]: any }): AICommon.BotAgentMetadata;

        /**
         * Creates a plain object from a BotAgentMetadata message. Also converts values to other types if specified.
         * @param message BotAgentMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotAgentMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotAgentMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotAgentMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotInfrastructureDiagnostics. */
    interface IBotInfrastructureDiagnostics {

        /** BotInfrastructureDiagnostics botBackend */
        botBackend?: (AICommon.BotInfrastructureDiagnostics.BotBackend|null);

        /** BotInfrastructureDiagnostics toolsUsed */
        toolsUsed?: (string[]|null);

        /** BotInfrastructureDiagnostics isThinking */
        isThinking?: (boolean|null);
    }

    /** Represents a BotInfrastructureDiagnostics. */
    class BotInfrastructureDiagnostics implements IBotInfrastructureDiagnostics {

        /**
         * Constructs a new BotInfrastructureDiagnostics.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotInfrastructureDiagnostics);

        /** BotInfrastructureDiagnostics botBackend. */
        public botBackend?: (AICommon.BotInfrastructureDiagnostics.BotBackend|null);

        /** BotInfrastructureDiagnostics toolsUsed. */
        public toolsUsed: string[];

        /** BotInfrastructureDiagnostics isThinking. */
        public isThinking?: (boolean|null);

        /**
         * Creates a new BotInfrastructureDiagnostics instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotInfrastructureDiagnostics instance
         */
        public static create(properties?: AICommon.IBotInfrastructureDiagnostics): AICommon.BotInfrastructureDiagnostics;

        /**
         * Encodes the specified BotInfrastructureDiagnostics message. Does not implicitly {@link AICommon.BotInfrastructureDiagnostics.verify|verify} messages.
         * @param message BotInfrastructureDiagnostics message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotInfrastructureDiagnostics, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotInfrastructureDiagnostics message, length delimited. Does not implicitly {@link AICommon.BotInfrastructureDiagnostics.verify|verify} messages.
         * @param message BotInfrastructureDiagnostics message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotInfrastructureDiagnostics, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotInfrastructureDiagnostics message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotInfrastructureDiagnostics
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotInfrastructureDiagnostics;

        /**
         * Decodes a BotInfrastructureDiagnostics message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotInfrastructureDiagnostics
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotInfrastructureDiagnostics;

        /**
         * Verifies a BotInfrastructureDiagnostics message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotInfrastructureDiagnostics message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotInfrastructureDiagnostics
         */
        public static fromObject(object: { [k: string]: any }): AICommon.BotInfrastructureDiagnostics;

        /**
         * Creates a plain object from a BotInfrastructureDiagnostics message. Also converts values to other types if specified.
         * @param message BotInfrastructureDiagnostics
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotInfrastructureDiagnostics, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotInfrastructureDiagnostics to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotInfrastructureDiagnostics
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotInfrastructureDiagnostics {

        /** BotBackend enum. */
        enum BotBackend {
            AAPI = 0,
            CLIPPY = 1
        }
    }

    /** Properties of a AIHomeState. */
    interface IAIHomeState {

        /** AIHomeState lastFetchTime */
        lastFetchTime?: (number|Long|null);

        /** AIHomeState capabilityOptions */
        capabilityOptions?: (AICommon.AIHomeState.IAIHomeOption[]|null);

        /** AIHomeState conversationOptions */
        conversationOptions?: (AICommon.AIHomeState.IAIHomeOption[]|null);
    }

    /** Represents a AIHomeState. */
    class AIHomeState implements IAIHomeState {

        /**
         * Constructs a new AIHomeState.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IAIHomeState);

        /** AIHomeState lastFetchTime. */
        public lastFetchTime?: (number|Long|null);

        /** AIHomeState capabilityOptions. */
        public capabilityOptions: AICommon.AIHomeState.IAIHomeOption[];

        /** AIHomeState conversationOptions. */
        public conversationOptions: AICommon.AIHomeState.IAIHomeOption[];

        /**
         * Creates a new AIHomeState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AIHomeState instance
         */
        public static create(properties?: AICommon.IAIHomeState): AICommon.AIHomeState;

        /**
         * Encodes the specified AIHomeState message. Does not implicitly {@link AICommon.AIHomeState.verify|verify} messages.
         * @param message AIHomeState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IAIHomeState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AIHomeState message, length delimited. Does not implicitly {@link AICommon.AIHomeState.verify|verify} messages.
         * @param message AIHomeState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IAIHomeState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a AIHomeState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AIHomeState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.AIHomeState;

        /**
         * Decodes a AIHomeState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AIHomeState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.AIHomeState;

        /**
         * Verifies a AIHomeState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a AIHomeState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AIHomeState
         */
        public static fromObject(object: { [k: string]: any }): AICommon.AIHomeState;

        /**
         * Creates a plain object from a AIHomeState message. Also converts values to other types if specified.
         * @param message AIHomeState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.AIHomeState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AIHomeState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AIHomeState
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace AIHomeState {

        /** Properties of a AIHomeOption. */
        interface IAIHomeOption {

            /** AIHomeOption type */
            type?: (AICommon.AIHomeState.AIHomeOption.AIHomeActionType|null);

            /** AIHomeOption title */
            title?: (string|null);

            /** AIHomeOption promptText */
            promptText?: (string|null);

            /** AIHomeOption sessionId */
            sessionId?: (string|null);

            /** AIHomeOption imageWdsIdentifier */
            imageWdsIdentifier?: (string|null);

            /** AIHomeOption imageTintColor */
            imageTintColor?: (string|null);

            /** AIHomeOption imageBackgroundColor */
            imageBackgroundColor?: (string|null);

            /** AIHomeOption cardTypeId */
            cardTypeId?: (string|null);
        }

        /** Represents a AIHomeOption. */
        class AIHomeOption implements IAIHomeOption {

            /**
             * Constructs a new AIHomeOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: AICommon.AIHomeState.IAIHomeOption);

            /** AIHomeOption type. */
            public type?: (AICommon.AIHomeState.AIHomeOption.AIHomeActionType|null);

            /** AIHomeOption title. */
            public title?: (string|null);

            /** AIHomeOption promptText. */
            public promptText?: (string|null);

            /** AIHomeOption sessionId. */
            public sessionId?: (string|null);

            /** AIHomeOption imageWdsIdentifier. */
            public imageWdsIdentifier?: (string|null);

            /** AIHomeOption imageTintColor. */
            public imageTintColor?: (string|null);

            /** AIHomeOption imageBackgroundColor. */
            public imageBackgroundColor?: (string|null);

            /** AIHomeOption cardTypeId. */
            public cardTypeId?: (string|null);

            /**
             * Creates a new AIHomeOption instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AIHomeOption instance
             */
            public static create(properties?: AICommon.AIHomeState.IAIHomeOption): AICommon.AIHomeState.AIHomeOption;

            /**
             * Encodes the specified AIHomeOption message. Does not implicitly {@link AICommon.AIHomeState.AIHomeOption.verify|verify} messages.
             * @param message AIHomeOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.AIHomeState.IAIHomeOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AIHomeOption message, length delimited. Does not implicitly {@link AICommon.AIHomeState.AIHomeOption.verify|verify} messages.
             * @param message AIHomeOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.AIHomeState.IAIHomeOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AIHomeOption message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AIHomeOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.AIHomeState.AIHomeOption;

            /**
             * Decodes a AIHomeOption message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AIHomeOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.AIHomeState.AIHomeOption;

            /**
             * Verifies a AIHomeOption message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a AIHomeOption message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AIHomeOption
             */
            public static fromObject(object: { [k: string]: any }): AICommon.AIHomeState.AIHomeOption;

            /**
             * Creates a plain object from a AIHomeOption message. Also converts values to other types if specified.
             * @param message AIHomeOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.AIHomeState.AIHomeOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AIHomeOption to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AIHomeOption
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace AIHomeOption {

            /** AIHomeActionType enum. */
            enum AIHomeActionType {
                PROMPT = 0,
                CREATE_IMAGE = 1,
                ANIMATE_PHOTO = 2,
                ANALYZE_FILE = 3,
                COLLABORATE = 4
            }
        }
    }

    /** Properties of a BotDocumentMessageMetadata. */
    interface IBotDocumentMessageMetadata {

        /** BotDocumentMessageMetadata pluginType */
        pluginType?: (AICommon.BotDocumentMessageMetadata.DocumentPluginType|null);
    }

    /** Represents a BotDocumentMessageMetadata. */
    class BotDocumentMessageMetadata implements IBotDocumentMessageMetadata {

        /**
         * Constructs a new BotDocumentMessageMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotDocumentMessageMetadata);

        /** BotDocumentMessageMetadata pluginType. */
        public pluginType?: (AICommon.BotDocumentMessageMetadata.DocumentPluginType|null);

        /**
         * Creates a new BotDocumentMessageMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotDocumentMessageMetadata instance
         */
        public static create(properties?: AICommon.IBotDocumentMessageMetadata): AICommon.BotDocumentMessageMetadata;

        /**
         * Encodes the specified BotDocumentMessageMetadata message. Does not implicitly {@link AICommon.BotDocumentMessageMetadata.verify|verify} messages.
         * @param message BotDocumentMessageMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotDocumentMessageMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotDocumentMessageMetadata message, length delimited. Does not implicitly {@link AICommon.BotDocumentMessageMetadata.verify|verify} messages.
         * @param message BotDocumentMessageMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotDocumentMessageMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotDocumentMessageMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotDocumentMessageMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotDocumentMessageMetadata;

        /**
         * Decodes a BotDocumentMessageMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotDocumentMessageMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotDocumentMessageMetadata;

        /**
         * Verifies a BotDocumentMessageMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotDocumentMessageMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotDocumentMessageMetadata
         */
        public static fromObject(object: { [k: string]: any }): AICommon.BotDocumentMessageMetadata;

        /**
         * Creates a plain object from a BotDocumentMessageMetadata message. Also converts values to other types if specified.
         * @param message BotDocumentMessageMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotDocumentMessageMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotDocumentMessageMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotDocumentMessageMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotDocumentMessageMetadata {

        /** DocumentPluginType enum. */
        enum DocumentPluginType {
            TEXT_EXTRACTION = 0,
            OCR_AND_IMAGES = 1
        }
    }

    /** Properties of a SessionTransparencyMetadata. */
    interface ISessionTransparencyMetadata {

        /** SessionTransparencyMetadata disclaimerText */
        disclaimerText?: (string|null);

        /** SessionTransparencyMetadata hcaId */
        hcaId?: (string|null);

        /** SessionTransparencyMetadata sessionTransparencyType */
        sessionTransparencyType?: (AICommon.SessionTransparencyType|null);
    }

    /** Represents a SessionTransparencyMetadata. */
    class SessionTransparencyMetadata implements ISessionTransparencyMetadata {

        /**
         * Constructs a new SessionTransparencyMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.ISessionTransparencyMetadata);

        /** SessionTransparencyMetadata disclaimerText. */
        public disclaimerText?: (string|null);

        /** SessionTransparencyMetadata hcaId. */
        public hcaId?: (string|null);

        /** SessionTransparencyMetadata sessionTransparencyType. */
        public sessionTransparencyType?: (AICommon.SessionTransparencyType|null);

        /**
         * Creates a new SessionTransparencyMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionTransparencyMetadata instance
         */
        public static create(properties?: AICommon.ISessionTransparencyMetadata): AICommon.SessionTransparencyMetadata;

        /**
         * Encodes the specified SessionTransparencyMetadata message. Does not implicitly {@link AICommon.SessionTransparencyMetadata.verify|verify} messages.
         * @param message SessionTransparencyMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.ISessionTransparencyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionTransparencyMetadata message, length delimited. Does not implicitly {@link AICommon.SessionTransparencyMetadata.verify|verify} messages.
         * @param message SessionTransparencyMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.ISessionTransparencyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionTransparencyMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionTransparencyMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.SessionTransparencyMetadata;

        /**
         * Decodes a SessionTransparencyMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionTransparencyMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.SessionTransparencyMetadata;

        /**
         * Verifies a SessionTransparencyMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SessionTransparencyMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SessionTransparencyMetadata
         */
        public static fromObject(object: { [k: string]: any }): AICommon.SessionTransparencyMetadata;

        /**
         * Creates a plain object from a SessionTransparencyMetadata message. Also converts values to other types if specified.
         * @param message SessionTransparencyMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.SessionTransparencyMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SessionTransparencyMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SessionTransparencyMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a AIRegenerateMetadata. */
    interface IAIRegenerateMetadata {

        /** AIRegenerateMetadata messageKey */
        messageKey?: (Protocol.IMessageKey|null);

        /** AIRegenerateMetadata responseTimestampMs */
        responseTimestampMs?: (number|Long|null);
    }

    /** Represents a AIRegenerateMetadata. */
    class AIRegenerateMetadata implements IAIRegenerateMetadata {

        /**
         * Constructs a new AIRegenerateMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IAIRegenerateMetadata);

        /** AIRegenerateMetadata messageKey. */
        public messageKey?: (Protocol.IMessageKey|null);

        /** AIRegenerateMetadata responseTimestampMs. */
        public responseTimestampMs?: (number|Long|null);

        /**
         * Creates a new AIRegenerateMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AIRegenerateMetadata instance
         */
        public static create(properties?: AICommon.IAIRegenerateMetadata): AICommon.AIRegenerateMetadata;

        /**
         * Encodes the specified AIRegenerateMetadata message. Does not implicitly {@link AICommon.AIRegenerateMetadata.verify|verify} messages.
         * @param message AIRegenerateMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IAIRegenerateMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AIRegenerateMetadata message, length delimited. Does not implicitly {@link AICommon.AIRegenerateMetadata.verify|verify} messages.
         * @param message AIRegenerateMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IAIRegenerateMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a AIRegenerateMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AIRegenerateMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.AIRegenerateMetadata;

        /**
         * Decodes a AIRegenerateMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AIRegenerateMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.AIRegenerateMetadata;

        /**
         * Verifies a AIRegenerateMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a AIRegenerateMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AIRegenerateMetadata
         */
        public static fromObject(object: { [k: string]: any }): AICommon.AIRegenerateMetadata;

        /**
         * Creates a plain object from a AIRegenerateMetadata message. Also converts values to other types if specified.
         * @param message AIRegenerateMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.AIRegenerateMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AIRegenerateMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AIRegenerateMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a AIRichResponseUnifiedResponse. */
    interface IAIRichResponseUnifiedResponse {

        /** AIRichResponseUnifiedResponse data */
        data?: (Uint8Array|null);
    }

    /** Represents a AIRichResponseUnifiedResponse. */
    class AIRichResponseUnifiedResponse implements IAIRichResponseUnifiedResponse {

        /**
         * Constructs a new AIRichResponseUnifiedResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IAIRichResponseUnifiedResponse);

        /** AIRichResponseUnifiedResponse data. */
        public data?: (Uint8Array|null);

        /**
         * Creates a new AIRichResponseUnifiedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AIRichResponseUnifiedResponse instance
         */
        public static create(properties?: AICommon.IAIRichResponseUnifiedResponse): AICommon.AIRichResponseUnifiedResponse;

        /**
         * Encodes the specified AIRichResponseUnifiedResponse message. Does not implicitly {@link AICommon.AIRichResponseUnifiedResponse.verify|verify} messages.
         * @param message AIRichResponseUnifiedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IAIRichResponseUnifiedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AIRichResponseUnifiedResponse message, length delimited. Does not implicitly {@link AICommon.AIRichResponseUnifiedResponse.verify|verify} messages.
         * @param message AIRichResponseUnifiedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IAIRichResponseUnifiedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a AIRichResponseUnifiedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AIRichResponseUnifiedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.AIRichResponseUnifiedResponse;

        /**
         * Decodes a AIRichResponseUnifiedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AIRichResponseUnifiedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.AIRichResponseUnifiedResponse;

        /**
         * Verifies a AIRichResponseUnifiedResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a AIRichResponseUnifiedResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AIRichResponseUnifiedResponse
         */
        public static fromObject(object: { [k: string]: any }): AICommon.AIRichResponseUnifiedResponse;

        /**
         * Creates a plain object from a AIRichResponseUnifiedResponse message. Also converts values to other types if specified.
         * @param message AIRichResponseUnifiedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.AIRichResponseUnifiedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AIRichResponseUnifiedResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AIRichResponseUnifiedResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotMessageSharingInfo. */
    interface IBotMessageSharingInfo {

        /** BotMessageSharingInfo botEntryPointOrigin */
        botEntryPointOrigin?: (AICommon.BotMetricsEntryPoint|null);

        /** BotMessageSharingInfo forwardScore */
        forwardScore?: (number|null);
    }

    /** Represents a BotMessageSharingInfo. */
    class BotMessageSharingInfo implements IBotMessageSharingInfo {

        /**
         * Constructs a new BotMessageSharingInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotMessageSharingInfo);

        /** BotMessageSharingInfo botEntryPointOrigin. */
        public botEntryPointOrigin?: (AICommon.BotMetricsEntryPoint|null);

        /** BotMessageSharingInfo forwardScore. */
        public forwardScore?: (number|null);

        /**
         * Creates a new BotMessageSharingInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMessageSharingInfo instance
         */
        public static create(properties?: AICommon.IBotMessageSharingInfo): AICommon.BotMessageSharingInfo;

        /**
         * Encodes the specified BotMessageSharingInfo message. Does not implicitly {@link AICommon.BotMessageSharingInfo.verify|verify} messages.
         * @param message BotMessageSharingInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotMessageSharingInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMessageSharingInfo message, length delimited. Does not implicitly {@link AICommon.BotMessageSharingInfo.verify|verify} messages.
         * @param message BotMessageSharingInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotMessageSharingInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMessageSharingInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMessageSharingInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotMessageSharingInfo;

        /**
         * Decodes a BotMessageSharingInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMessageSharingInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotMessageSharingInfo;

        /**
         * Verifies a BotMessageSharingInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotMessageSharingInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotMessageSharingInfo
         */
        public static fromObject(object: { [k: string]: any }): AICommon.BotMessageSharingInfo;

        /**
         * Creates a plain object from a BotMessageSharingInfo message. Also converts values to other types if specified.
         * @param message BotMessageSharingInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotMessageSharingInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotMessageSharingInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotMessageSharingInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ForwardedAIBotMessageInfo. */
    interface IForwardedAIBotMessageInfo {

        /** ForwardedAIBotMessageInfo botName */
        botName?: (string|null);

        /** ForwardedAIBotMessageInfo botJid */
        botJid?: (string|null);

        /** ForwardedAIBotMessageInfo creatorName */
        creatorName?: (string|null);
    }

    /** Represents a ForwardedAIBotMessageInfo. */
    class ForwardedAIBotMessageInfo implements IForwardedAIBotMessageInfo {

        /**
         * Constructs a new ForwardedAIBotMessageInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IForwardedAIBotMessageInfo);

        /** ForwardedAIBotMessageInfo botName. */
        public botName?: (string|null);

        /** ForwardedAIBotMessageInfo botJid. */
        public botJid?: (string|null);

        /** ForwardedAIBotMessageInfo creatorName. */
        public creatorName?: (string|null);

        /**
         * Creates a new ForwardedAIBotMessageInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ForwardedAIBotMessageInfo instance
         */
        public static create(properties?: AICommon.IForwardedAIBotMessageInfo): AICommon.ForwardedAIBotMessageInfo;

        /**
         * Encodes the specified ForwardedAIBotMessageInfo message. Does not implicitly {@link AICommon.ForwardedAIBotMessageInfo.verify|verify} messages.
         * @param message ForwardedAIBotMessageInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IForwardedAIBotMessageInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ForwardedAIBotMessageInfo message, length delimited. Does not implicitly {@link AICommon.ForwardedAIBotMessageInfo.verify|verify} messages.
         * @param message ForwardedAIBotMessageInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IForwardedAIBotMessageInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ForwardedAIBotMessageInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ForwardedAIBotMessageInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.ForwardedAIBotMessageInfo;

        /**
         * Decodes a ForwardedAIBotMessageInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ForwardedAIBotMessageInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.ForwardedAIBotMessageInfo;

        /**
         * Verifies a ForwardedAIBotMessageInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ForwardedAIBotMessageInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ForwardedAIBotMessageInfo
         */
        public static fromObject(object: { [k: string]: any }): AICommon.ForwardedAIBotMessageInfo;

        /**
         * Creates a plain object from a ForwardedAIBotMessageInfo message. Also converts values to other types if specified.
         * @param message ForwardedAIBotMessageInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.ForwardedAIBotMessageInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ForwardedAIBotMessageInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ForwardedAIBotMessageInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotFeedbackMessage. */
    interface IBotFeedbackMessage {

        /** BotFeedbackMessage messageKey */
        messageKey?: (Protocol.IMessageKey|null);

        /** BotFeedbackMessage kind */
        kind?: (AICommon.BotFeedbackMessage.BotFeedbackKind|null);

        /** BotFeedbackMessage text */
        text?: (string|null);

        /** BotFeedbackMessage kindNegative */
        kindNegative?: (number|Long|null);

        /** BotFeedbackMessage kindPositive */
        kindPositive?: (number|Long|null);

        /** BotFeedbackMessage kindReport */
        kindReport?: (AICommon.BotFeedbackMessage.ReportKind|null);

        /** BotFeedbackMessage sideBySideSurveyMetadata */
        sideBySideSurveyMetadata?: (AICommon.BotFeedbackMessage.ISideBySideSurveyMetadata|null);
    }

    /** Represents a BotFeedbackMessage. */
    class BotFeedbackMessage implements IBotFeedbackMessage {

        /**
         * Constructs a new BotFeedbackMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotFeedbackMessage);

        /** BotFeedbackMessage messageKey. */
        public messageKey?: (Protocol.IMessageKey|null);

        /** BotFeedbackMessage kind. */
        public kind?: (AICommon.BotFeedbackMessage.BotFeedbackKind|null);

        /** BotFeedbackMessage text. */
        public text?: (string|null);

        /** BotFeedbackMessage kindNegative. */
        public kindNegative?: (number|Long|null);

        /** BotFeedbackMessage kindPositive. */
        public kindPositive?: (number|Long|null);

        /** BotFeedbackMessage kindReport. */
        public kindReport?: (AICommon.BotFeedbackMessage.ReportKind|null);

        /** BotFeedbackMessage sideBySideSurveyMetadata. */
        public sideBySideSurveyMetadata?: (AICommon.BotFeedbackMessage.ISideBySideSurveyMetadata|null);

        /**
         * Creates a new BotFeedbackMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotFeedbackMessage instance
         */
        public static create(properties?: AICommon.IBotFeedbackMessage): AICommon.BotFeedbackMessage;

        /**
         * Encodes the specified BotFeedbackMessage message. Does not implicitly {@link AICommon.BotFeedbackMessage.verify|verify} messages.
         * @param message BotFeedbackMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotFeedbackMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotFeedbackMessage message, length delimited. Does not implicitly {@link AICommon.BotFeedbackMessage.verify|verify} messages.
         * @param message BotFeedbackMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotFeedbackMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotFeedbackMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotFeedbackMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotFeedbackMessage;

        /**
         * Decodes a BotFeedbackMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotFeedbackMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotFeedbackMessage;

        /**
         * Verifies a BotFeedbackMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotFeedbackMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotFeedbackMessage
         */
        public static fromObject(object: { [k: string]: any }): AICommon.BotFeedbackMessage;

        /**
         * Creates a plain object from a BotFeedbackMessage message. Also converts values to other types if specified.
         * @param message BotFeedbackMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotFeedbackMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotFeedbackMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotFeedbackMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BotFeedbackMessage {

        /** BotFeedbackKind enum. */
        enum BotFeedbackKind {
            BOT_FEEDBACK_POSITIVE = 0,
            BOT_FEEDBACK_NEGATIVE_GENERIC = 1,
            BOT_FEEDBACK_NEGATIVE_HELPFUL = 2,
            BOT_FEEDBACK_NEGATIVE_INTERESTING = 3,
            BOT_FEEDBACK_NEGATIVE_ACCURATE = 4,
            BOT_FEEDBACK_NEGATIVE_SAFE = 5,
            BOT_FEEDBACK_NEGATIVE_OTHER = 6,
            BOT_FEEDBACK_NEGATIVE_REFUSED = 7,
            BOT_FEEDBACK_NEGATIVE_NOT_VISUALLY_APPEALING = 8,
            BOT_FEEDBACK_NEGATIVE_NOT_RELEVANT_TO_TEXT = 9,
            BOT_FEEDBACK_NEGATIVE_PERSONALIZED = 10,
            BOT_FEEDBACK_NEGATIVE_CLARITY = 11,
            BOT_FEEDBACK_NEGATIVE_DOESNT_LOOK_LIKE_THE_PERSON = 12,
            BOT_FEEDBACK_NEGATIVE_HALLUCINATION_INTERNAL_ONLY = 13,
            BOT_FEEDBACK_NEGATIVE = 14
        }

        /** BotFeedbackKindMultipleNegative enum. */
        enum BotFeedbackKindMultipleNegative {
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_GENERIC = 1,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_HELPFUL = 2,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_INTERESTING = 4,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_ACCURATE = 8,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_SAFE = 16,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_OTHER = 32,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_REFUSED = 64,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_NOT_VISUALLY_APPEALING = 128,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_NOT_RELEVANT_TO_TEXT = 256
        }

        /** BotFeedbackKindMultiplePositive enum. */
        enum BotFeedbackKindMultiplePositive {
            BOT_FEEDBACK_MULTIPLE_POSITIVE_GENERIC = 1
        }

        /** ReportKind enum. */
        enum ReportKind {
            NONE = 0,
            GENERIC = 1
        }

        /** Properties of a SideBySideSurveyMetadata. */
        interface ISideBySideSurveyMetadata {

            /** SideBySideSurveyMetadata selectedRequestId */
            selectedRequestId?: (string|null);

            /** SideBySideSurveyMetadata surveyId */
            surveyId?: (number|null);

            /** SideBySideSurveyMetadata simonSessionFbid */
            simonSessionFbid?: (string|null);

            /** SideBySideSurveyMetadata responseOtid */
            responseOtid?: (string|null);

            /** SideBySideSurveyMetadata responseTimestampMsString */
            responseTimestampMsString?: (string|null);

            /** SideBySideSurveyMetadata isSelectedResponsePrimary */
            isSelectedResponsePrimary?: (boolean|null);

            /** SideBySideSurveyMetadata messageIdToEdit */
            messageIdToEdit?: (string|null);

            /** SideBySideSurveyMetadata analyticsData */
            analyticsData?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISideBySideSurveyAnalyticsData|null);

            /** SideBySideSurveyMetadata metaAiAnalyticsData */
            metaAiAnalyticsData?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISidebySideSurveyMetaAiAnalyticsData|null);
        }

        /** Represents a SideBySideSurveyMetadata. */
        class SideBySideSurveyMetadata implements ISideBySideSurveyMetadata {

            /**
             * Constructs a new SideBySideSurveyMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: AICommon.BotFeedbackMessage.ISideBySideSurveyMetadata);

            /** SideBySideSurveyMetadata selectedRequestId. */
            public selectedRequestId?: (string|null);

            /** SideBySideSurveyMetadata surveyId. */
            public surveyId?: (number|null);

            /** SideBySideSurveyMetadata simonSessionFbid. */
            public simonSessionFbid?: (string|null);

            /** SideBySideSurveyMetadata responseOtid. */
            public responseOtid?: (string|null);

            /** SideBySideSurveyMetadata responseTimestampMsString. */
            public responseTimestampMsString?: (string|null);

            /** SideBySideSurveyMetadata isSelectedResponsePrimary. */
            public isSelectedResponsePrimary?: (boolean|null);

            /** SideBySideSurveyMetadata messageIdToEdit. */
            public messageIdToEdit?: (string|null);

            /** SideBySideSurveyMetadata analyticsData. */
            public analyticsData?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISideBySideSurveyAnalyticsData|null);

            /** SideBySideSurveyMetadata metaAiAnalyticsData. */
            public metaAiAnalyticsData?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISidebySideSurveyMetaAiAnalyticsData|null);

            /**
             * Creates a new SideBySideSurveyMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SideBySideSurveyMetadata instance
             */
            public static create(properties?: AICommon.BotFeedbackMessage.ISideBySideSurveyMetadata): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata;

            /**
             * Encodes the specified SideBySideSurveyMetadata message. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.verify|verify} messages.
             * @param message SideBySideSurveyMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.BotFeedbackMessage.ISideBySideSurveyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SideBySideSurveyMetadata message, length delimited. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.verify|verify} messages.
             * @param message SideBySideSurveyMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.BotFeedbackMessage.ISideBySideSurveyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SideBySideSurveyMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SideBySideSurveyMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata;

            /**
             * Decodes a SideBySideSurveyMetadata message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SideBySideSurveyMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata;

            /**
             * Verifies a SideBySideSurveyMetadata message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SideBySideSurveyMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SideBySideSurveyMetadata
             */
            public static fromObject(object: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata;

            /**
             * Creates a plain object from a SideBySideSurveyMetadata message. Also converts values to other types if specified.
             * @param message SideBySideSurveyMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SideBySideSurveyMetadata to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SideBySideSurveyMetadata
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace SideBySideSurveyMetadata {

            /** Properties of a SideBySideSurveyAnalyticsData. */
            interface ISideBySideSurveyAnalyticsData {

                /** SideBySideSurveyAnalyticsData tessaEvent */
                tessaEvent?: (string|null);

                /** SideBySideSurveyAnalyticsData tessaSessionFbid */
                tessaSessionFbid?: (string|null);

                /** SideBySideSurveyAnalyticsData simonSessionFbid */
                simonSessionFbid?: (string|null);
            }

            /** Represents a SideBySideSurveyAnalyticsData. */
            class SideBySideSurveyAnalyticsData implements ISideBySideSurveyAnalyticsData {

                /**
                 * Constructs a new SideBySideSurveyAnalyticsData.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISideBySideSurveyAnalyticsData);

                /** SideBySideSurveyAnalyticsData tessaEvent. */
                public tessaEvent?: (string|null);

                /** SideBySideSurveyAnalyticsData tessaSessionFbid. */
                public tessaSessionFbid?: (string|null);

                /** SideBySideSurveyAnalyticsData simonSessionFbid. */
                public simonSessionFbid?: (string|null);

                /**
                 * Creates a new SideBySideSurveyAnalyticsData instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SideBySideSurveyAnalyticsData instance
                 */
                public static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISideBySideSurveyAnalyticsData): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData;

                /**
                 * Encodes the specified SideBySideSurveyAnalyticsData message. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.verify|verify} messages.
                 * @param message SideBySideSurveyAnalyticsData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISideBySideSurveyAnalyticsData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SideBySideSurveyAnalyticsData message, length delimited. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.verify|verify} messages.
                 * @param message SideBySideSurveyAnalyticsData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISideBySideSurveyAnalyticsData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SideBySideSurveyAnalyticsData message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SideBySideSurveyAnalyticsData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData;

                /**
                 * Decodes a SideBySideSurveyAnalyticsData message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SideBySideSurveyAnalyticsData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData;

                /**
                 * Verifies a SideBySideSurveyAnalyticsData message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SideBySideSurveyAnalyticsData message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SideBySideSurveyAnalyticsData
                 */
                public static fromObject(object: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData;

                /**
                 * Creates a plain object from a SideBySideSurveyAnalyticsData message. Also converts values to other types if specified.
                 * @param message SideBySideSurveyAnalyticsData
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SideBySideSurveyAnalyticsData to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SideBySideSurveyAnalyticsData
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a SidebySideSurveyMetaAiAnalyticsData. */
            interface ISidebySideSurveyMetaAiAnalyticsData {

                /** SidebySideSurveyMetaAiAnalyticsData surveyId */
                surveyId?: (number|null);

                /** SidebySideSurveyMetaAiAnalyticsData primaryResponseId */
                primaryResponseId?: (string|null);

                /** SidebySideSurveyMetaAiAnalyticsData testArmName */
                testArmName?: (string|null);

                /** SidebySideSurveyMetaAiAnalyticsData timestampMsString */
                timestampMsString?: (string|null);

                /** SidebySideSurveyMetaAiAnalyticsData ctaImpressionEvent */
                ctaImpressionEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAImpressionEventData|null);

                /** SidebySideSurveyMetaAiAnalyticsData ctaClickEvent */
                ctaClickEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAClickEventData|null);

                /** SidebySideSurveyMetaAiAnalyticsData cardImpressionEvent */
                cardImpressionEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCardImpressionEventData|null);

                /** SidebySideSurveyMetaAiAnalyticsData responseEvent */
                responseEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyResponseEventData|null);

                /** SidebySideSurveyMetaAiAnalyticsData abandonEvent */
                abandonEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyAbandonEventData|null);
            }

            /** Represents a SidebySideSurveyMetaAiAnalyticsData. */
            class SidebySideSurveyMetaAiAnalyticsData implements ISidebySideSurveyMetaAiAnalyticsData {

                /**
                 * Constructs a new SidebySideSurveyMetaAiAnalyticsData.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISidebySideSurveyMetaAiAnalyticsData);

                /** SidebySideSurveyMetaAiAnalyticsData surveyId. */
                public surveyId?: (number|null);

                /** SidebySideSurveyMetaAiAnalyticsData primaryResponseId. */
                public primaryResponseId?: (string|null);

                /** SidebySideSurveyMetaAiAnalyticsData testArmName. */
                public testArmName?: (string|null);

                /** SidebySideSurveyMetaAiAnalyticsData timestampMsString. */
                public timestampMsString?: (string|null);

                /** SidebySideSurveyMetaAiAnalyticsData ctaImpressionEvent. */
                public ctaImpressionEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAImpressionEventData|null);

                /** SidebySideSurveyMetaAiAnalyticsData ctaClickEvent. */
                public ctaClickEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAClickEventData|null);

                /** SidebySideSurveyMetaAiAnalyticsData cardImpressionEvent. */
                public cardImpressionEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCardImpressionEventData|null);

                /** SidebySideSurveyMetaAiAnalyticsData responseEvent. */
                public responseEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyResponseEventData|null);

                /** SidebySideSurveyMetaAiAnalyticsData abandonEvent. */
                public abandonEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyAbandonEventData|null);

                /**
                 * Creates a new SidebySideSurveyMetaAiAnalyticsData instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SidebySideSurveyMetaAiAnalyticsData instance
                 */
                public static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISidebySideSurveyMetaAiAnalyticsData): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData;

                /**
                 * Encodes the specified SidebySideSurveyMetaAiAnalyticsData message. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.verify|verify} messages.
                 * @param message SidebySideSurveyMetaAiAnalyticsData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISidebySideSurveyMetaAiAnalyticsData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SidebySideSurveyMetaAiAnalyticsData message, length delimited. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.verify|verify} messages.
                 * @param message SidebySideSurveyMetaAiAnalyticsData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.ISidebySideSurveyMetaAiAnalyticsData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SidebySideSurveyMetaAiAnalyticsData message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SidebySideSurveyMetaAiAnalyticsData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData;

                /**
                 * Decodes a SidebySideSurveyMetaAiAnalyticsData message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SidebySideSurveyMetaAiAnalyticsData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData;

                /**
                 * Verifies a SidebySideSurveyMetaAiAnalyticsData message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SidebySideSurveyMetaAiAnalyticsData message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SidebySideSurveyMetaAiAnalyticsData
                 */
                public static fromObject(object: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData;

                /**
                 * Creates a plain object from a SidebySideSurveyMetaAiAnalyticsData message. Also converts values to other types if specified.
                 * @param message SidebySideSurveyMetaAiAnalyticsData
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SidebySideSurveyMetaAiAnalyticsData to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SidebySideSurveyMetaAiAnalyticsData
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace SidebySideSurveyMetaAiAnalyticsData {

                /** Properties of a SideBySideSurveyAbandonEventData. */
                interface ISideBySideSurveyAbandonEventData {

                    /** SideBySideSurveyAbandonEventData abandonDwellTimeMsString */
                    abandonDwellTimeMsString?: (string|null);
                }

                /** Represents a SideBySideSurveyAbandonEventData. */
                class SideBySideSurveyAbandonEventData implements ISideBySideSurveyAbandonEventData {

                    /**
                     * Constructs a new SideBySideSurveyAbandonEventData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyAbandonEventData);

                    /** SideBySideSurveyAbandonEventData abandonDwellTimeMsString. */
                    public abandonDwellTimeMsString?: (string|null);

                    /**
                     * Creates a new SideBySideSurveyAbandonEventData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SideBySideSurveyAbandonEventData instance
                     */
                    public static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyAbandonEventData): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData;

                    /**
                     * Encodes the specified SideBySideSurveyAbandonEventData message. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.verify|verify} messages.
                     * @param message SideBySideSurveyAbandonEventData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyAbandonEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SideBySideSurveyAbandonEventData message, length delimited. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.verify|verify} messages.
                     * @param message SideBySideSurveyAbandonEventData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyAbandonEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SideBySideSurveyAbandonEventData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SideBySideSurveyAbandonEventData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData;

                    /**
                     * Decodes a SideBySideSurveyAbandonEventData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SideBySideSurveyAbandonEventData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData;

                    /**
                     * Verifies a SideBySideSurveyAbandonEventData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SideBySideSurveyAbandonEventData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SideBySideSurveyAbandonEventData
                     */
                    public static fromObject(object: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData;

                    /**
                     * Creates a plain object from a SideBySideSurveyAbandonEventData message. Also converts values to other types if specified.
                     * @param message SideBySideSurveyAbandonEventData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SideBySideSurveyAbandonEventData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for SideBySideSurveyAbandonEventData
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a SideBySideSurveyCTAClickEventData. */
                interface ISideBySideSurveyCTAClickEventData {

                    /** SideBySideSurveyCTAClickEventData isSurveyExpired */
                    isSurveyExpired?: (boolean|null);

                    /** SideBySideSurveyCTAClickEventData clickDwellTimeMsString */
                    clickDwellTimeMsString?: (string|null);
                }

                /** Represents a SideBySideSurveyCTAClickEventData. */
                class SideBySideSurveyCTAClickEventData implements ISideBySideSurveyCTAClickEventData {

                    /**
                     * Constructs a new SideBySideSurveyCTAClickEventData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAClickEventData);

                    /** SideBySideSurveyCTAClickEventData isSurveyExpired. */
                    public isSurveyExpired?: (boolean|null);

                    /** SideBySideSurveyCTAClickEventData clickDwellTimeMsString. */
                    public clickDwellTimeMsString?: (string|null);

                    /**
                     * Creates a new SideBySideSurveyCTAClickEventData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SideBySideSurveyCTAClickEventData instance
                     */
                    public static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAClickEventData): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData;

                    /**
                     * Encodes the specified SideBySideSurveyCTAClickEventData message. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.verify|verify} messages.
                     * @param message SideBySideSurveyCTAClickEventData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAClickEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SideBySideSurveyCTAClickEventData message, length delimited. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.verify|verify} messages.
                     * @param message SideBySideSurveyCTAClickEventData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAClickEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SideBySideSurveyCTAClickEventData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SideBySideSurveyCTAClickEventData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData;

                    /**
                     * Decodes a SideBySideSurveyCTAClickEventData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SideBySideSurveyCTAClickEventData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData;

                    /**
                     * Verifies a SideBySideSurveyCTAClickEventData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SideBySideSurveyCTAClickEventData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SideBySideSurveyCTAClickEventData
                     */
                    public static fromObject(object: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData;

                    /**
                     * Creates a plain object from a SideBySideSurveyCTAClickEventData message. Also converts values to other types if specified.
                     * @param message SideBySideSurveyCTAClickEventData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SideBySideSurveyCTAClickEventData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for SideBySideSurveyCTAClickEventData
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a SideBySideSurveyCTAImpressionEventData. */
                interface ISideBySideSurveyCTAImpressionEventData {

                    /** SideBySideSurveyCTAImpressionEventData isSurveyExpired */
                    isSurveyExpired?: (boolean|null);
                }

                /** Represents a SideBySideSurveyCTAImpressionEventData. */
                class SideBySideSurveyCTAImpressionEventData implements ISideBySideSurveyCTAImpressionEventData {

                    /**
                     * Constructs a new SideBySideSurveyCTAImpressionEventData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAImpressionEventData);

                    /** SideBySideSurveyCTAImpressionEventData isSurveyExpired. */
                    public isSurveyExpired?: (boolean|null);

                    /**
                     * Creates a new SideBySideSurveyCTAImpressionEventData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SideBySideSurveyCTAImpressionEventData instance
                     */
                    public static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAImpressionEventData): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData;

                    /**
                     * Encodes the specified SideBySideSurveyCTAImpressionEventData message. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.verify|verify} messages.
                     * @param message SideBySideSurveyCTAImpressionEventData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAImpressionEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SideBySideSurveyCTAImpressionEventData message, length delimited. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.verify|verify} messages.
                     * @param message SideBySideSurveyCTAImpressionEventData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCTAImpressionEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SideBySideSurveyCTAImpressionEventData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SideBySideSurveyCTAImpressionEventData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData;

                    /**
                     * Decodes a SideBySideSurveyCTAImpressionEventData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SideBySideSurveyCTAImpressionEventData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData;

                    /**
                     * Verifies a SideBySideSurveyCTAImpressionEventData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SideBySideSurveyCTAImpressionEventData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SideBySideSurveyCTAImpressionEventData
                     */
                    public static fromObject(object: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData;

                    /**
                     * Creates a plain object from a SideBySideSurveyCTAImpressionEventData message. Also converts values to other types if specified.
                     * @param message SideBySideSurveyCTAImpressionEventData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SideBySideSurveyCTAImpressionEventData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for SideBySideSurveyCTAImpressionEventData
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a SideBySideSurveyCardImpressionEventData. */
                interface ISideBySideSurveyCardImpressionEventData {
                }

                /** Represents a SideBySideSurveyCardImpressionEventData. */
                class SideBySideSurveyCardImpressionEventData implements ISideBySideSurveyCardImpressionEventData {

                    /**
                     * Constructs a new SideBySideSurveyCardImpressionEventData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCardImpressionEventData);

                    /**
                     * Creates a new SideBySideSurveyCardImpressionEventData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SideBySideSurveyCardImpressionEventData instance
                     */
                    public static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCardImpressionEventData): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData;

                    /**
                     * Encodes the specified SideBySideSurveyCardImpressionEventData message. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.verify|verify} messages.
                     * @param message SideBySideSurveyCardImpressionEventData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCardImpressionEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SideBySideSurveyCardImpressionEventData message, length delimited. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.verify|verify} messages.
                     * @param message SideBySideSurveyCardImpressionEventData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyCardImpressionEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SideBySideSurveyCardImpressionEventData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SideBySideSurveyCardImpressionEventData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData;

                    /**
                     * Decodes a SideBySideSurveyCardImpressionEventData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SideBySideSurveyCardImpressionEventData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData;

                    /**
                     * Verifies a SideBySideSurveyCardImpressionEventData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SideBySideSurveyCardImpressionEventData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SideBySideSurveyCardImpressionEventData
                     */
                    public static fromObject(object: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData;

                    /**
                     * Creates a plain object from a SideBySideSurveyCardImpressionEventData message. Also converts values to other types if specified.
                     * @param message SideBySideSurveyCardImpressionEventData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SideBySideSurveyCardImpressionEventData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for SideBySideSurveyCardImpressionEventData
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a SideBySideSurveyResponseEventData. */
                interface ISideBySideSurveyResponseEventData {

                    /** SideBySideSurveyResponseEventData responseDwellTimeMsString */
                    responseDwellTimeMsString?: (string|null);

                    /** SideBySideSurveyResponseEventData selectedResponseId */
                    selectedResponseId?: (string|null);
                }

                /** Represents a SideBySideSurveyResponseEventData. */
                class SideBySideSurveyResponseEventData implements ISideBySideSurveyResponseEventData {

                    /**
                     * Constructs a new SideBySideSurveyResponseEventData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyResponseEventData);

                    /** SideBySideSurveyResponseEventData responseDwellTimeMsString. */
                    public responseDwellTimeMsString?: (string|null);

                    /** SideBySideSurveyResponseEventData selectedResponseId. */
                    public selectedResponseId?: (string|null);

                    /**
                     * Creates a new SideBySideSurveyResponseEventData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SideBySideSurveyResponseEventData instance
                     */
                    public static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyResponseEventData): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData;

                    /**
                     * Encodes the specified SideBySideSurveyResponseEventData message. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.verify|verify} messages.
                     * @param message SideBySideSurveyResponseEventData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyResponseEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SideBySideSurveyResponseEventData message, length delimited. Does not implicitly {@link AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.verify|verify} messages.
                     * @param message SideBySideSurveyResponseEventData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ISideBySideSurveyResponseEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SideBySideSurveyResponseEventData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SideBySideSurveyResponseEventData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData;

                    /**
                     * Decodes a SideBySideSurveyResponseEventData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SideBySideSurveyResponseEventData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData;

                    /**
                     * Verifies a SideBySideSurveyResponseEventData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SideBySideSurveyResponseEventData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SideBySideSurveyResponseEventData
                     */
                    public static fromObject(object: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData;

                    /**
                     * Creates a plain object from a SideBySideSurveyResponseEventData message. Also converts values to other types if specified.
                     * @param message SideBySideSurveyResponseEventData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SideBySideSurveyResponseEventData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for SideBySideSurveyResponseEventData
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }
        }
    }

    /** Properties of a BotGroupParticipantMetadata. */
    interface IBotGroupParticipantMetadata {

        /** BotGroupParticipantMetadata botFbid */
        botFbid?: (string|null);
    }

    /** Represents a BotGroupParticipantMetadata. */
    class BotGroupParticipantMetadata implements IBotGroupParticipantMetadata {

        /**
         * Constructs a new BotGroupParticipantMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotGroupParticipantMetadata);

        /** BotGroupParticipantMetadata botFbid. */
        public botFbid?: (string|null);

        /**
         * Creates a new BotGroupParticipantMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotGroupParticipantMetadata instance
         */
        public static create(properties?: AICommon.IBotGroupParticipantMetadata): AICommon.BotGroupParticipantMetadata;

        /**
         * Encodes the specified BotGroupParticipantMetadata message. Does not implicitly {@link AICommon.BotGroupParticipantMetadata.verify|verify} messages.
         * @param message BotGroupParticipantMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotGroupParticipantMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotGroupParticipantMetadata message, length delimited. Does not implicitly {@link AICommon.BotGroupParticipantMetadata.verify|verify} messages.
         * @param message BotGroupParticipantMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotGroupParticipantMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotGroupParticipantMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotGroupParticipantMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotGroupParticipantMetadata;

        /**
         * Decodes a BotGroupParticipantMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotGroupParticipantMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotGroupParticipantMetadata;

        /**
         * Verifies a BotGroupParticipantMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotGroupParticipantMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotGroupParticipantMetadata
         */
        public static fromObject(object: { [k: string]: any }): AICommon.BotGroupParticipantMetadata;

        /**
         * Creates a plain object from a BotGroupParticipantMetadata message. Also converts values to other types if specified.
         * @param message BotGroupParticipantMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotGroupParticipantMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotGroupParticipantMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotGroupParticipantMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotRenderingConfigMetadata. */
    interface IBotRenderingConfigMetadata {

        /** BotRenderingConfigMetadata bloksVersioningId */
        bloksVersioningId?: (string|null);

        /** BotRenderingConfigMetadata pixelDensity */
        pixelDensity?: (number|null);
    }

    /** Represents a BotRenderingConfigMetadata. */
    class BotRenderingConfigMetadata implements IBotRenderingConfigMetadata {

        /**
         * Constructs a new BotRenderingConfigMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotRenderingConfigMetadata);

        /** BotRenderingConfigMetadata bloksVersioningId. */
        public bloksVersioningId?: (string|null);

        /** BotRenderingConfigMetadata pixelDensity. */
        public pixelDensity?: (number|null);

        /**
         * Creates a new BotRenderingConfigMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotRenderingConfigMetadata instance
         */
        public static create(properties?: AICommon.IBotRenderingConfigMetadata): AICommon.BotRenderingConfigMetadata;

        /**
         * Encodes the specified BotRenderingConfigMetadata message. Does not implicitly {@link AICommon.BotRenderingConfigMetadata.verify|verify} messages.
         * @param message BotRenderingConfigMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotRenderingConfigMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotRenderingConfigMetadata message, length delimited. Does not implicitly {@link AICommon.BotRenderingConfigMetadata.verify|verify} messages.
         * @param message BotRenderingConfigMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotRenderingConfigMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotRenderingConfigMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotRenderingConfigMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotRenderingConfigMetadata;

        /**
         * Decodes a BotRenderingConfigMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotRenderingConfigMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotRenderingConfigMetadata;

        /**
         * Verifies a BotRenderingConfigMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotRenderingConfigMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotRenderingConfigMetadata
         */
        public static fromObject(object: { [k: string]: any }): AICommon.BotRenderingConfigMetadata;

        /**
         * Creates a plain object from a BotRenderingConfigMetadata message. Also converts values to other types if specified.
         * @param message BotRenderingConfigMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotRenderingConfigMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotRenderingConfigMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotRenderingConfigMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotGroupMetadata. */
    interface IBotGroupMetadata {

        /** BotGroupMetadata participantsMetadata */
        participantsMetadata?: (AICommon.IBotGroupParticipantMetadata[]|null);
    }

    /** Represents a BotGroupMetadata. */
    class BotGroupMetadata implements IBotGroupMetadata {

        /**
         * Constructs a new BotGroupMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotGroupMetadata);

        /** BotGroupMetadata participantsMetadata. */
        public participantsMetadata: AICommon.IBotGroupParticipantMetadata[];

        /**
         * Creates a new BotGroupMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotGroupMetadata instance
         */
        public static create(properties?: AICommon.IBotGroupMetadata): AICommon.BotGroupMetadata;

        /**
         * Encodes the specified BotGroupMetadata message. Does not implicitly {@link AICommon.BotGroupMetadata.verify|verify} messages.
         * @param message BotGroupMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotGroupMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotGroupMetadata message, length delimited. Does not implicitly {@link AICommon.BotGroupMetadata.verify|verify} messages.
         * @param message BotGroupMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotGroupMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotGroupMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotGroupMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotGroupMetadata;

        /**
         * Decodes a BotGroupMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotGroupMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotGroupMetadata;

        /**
         * Verifies a BotGroupMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotGroupMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotGroupMetadata
         */
        public static fromObject(object: { [k: string]: any }): AICommon.BotGroupMetadata;

        /**
         * Creates a plain object from a BotGroupMetadata message. Also converts values to other types if specified.
         * @param message BotGroupMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotGroupMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotGroupMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotGroupMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BotMetadata. */
    interface IBotMetadata {

        /** BotMetadata personaId */
        personaId?: (string|null);

        /** BotMetadata pluginMetadata */
        pluginMetadata?: (AICommon.IBotPluginMetadata|null);

        /** BotMetadata suggestedPromptMetadata */
        suggestedPromptMetadata?: (AICommon.IBotSuggestedPromptMetadata|null);

        /** BotMetadata invokerJid */
        invokerJid?: (string|null);

        /** BotMetadata sessionMetadata */
        sessionMetadata?: (AICommon.IBotSessionMetadata|null);

        /** BotMetadata memuMetadata */
        memuMetadata?: (AICommon.IBotMemuMetadata|null);

        /** BotMetadata timezone */
        timezone?: (string|null);

        /** BotMetadata reminderMetadata */
        reminderMetadata?: (AICommon.IBotReminderMetadata|null);

        /** BotMetadata modelMetadata */
        modelMetadata?: (AICommon.IBotModelMetadata|null);

        /** BotMetadata messageDisclaimerText */
        messageDisclaimerText?: (string|null);

        /** BotMetadata progressIndicatorMetadata */
        progressIndicatorMetadata?: (AICommon.IBotProgressIndicatorMetadata|null);

        /** BotMetadata capabilityMetadata */
        capabilityMetadata?: (AICommon.IBotCapabilityMetadata|null);

        /** BotMetadata imagineMetadata */
        imagineMetadata?: (AICommon.IBotImagineMetadata|null);

        /** BotMetadata memoryMetadata */
        memoryMetadata?: (AICommon.IBotMemoryMetadata|null);

        /** BotMetadata renderingMetadata */
        renderingMetadata?: (AICommon.IBotRenderingMetadata|null);

        /** BotMetadata botMetricsMetadata */
        botMetricsMetadata?: (AICommon.IBotMetricsMetadata|null);

        /** BotMetadata botLinkedAccountsMetadata */
        botLinkedAccountsMetadata?: (AICommon.IBotLinkedAccountsMetadata|null);

        /** BotMetadata richResponseSourcesMetadata */
        richResponseSourcesMetadata?: (AICommon.IBotSourcesMetadata|null);

        /** BotMetadata aiConversationContext */
        aiConversationContext?: (Uint8Array|null);

        /** BotMetadata botPromotionMessageMetadata */
        botPromotionMessageMetadata?: (AICommon.IBotPromotionMessageMetadata|null);

        /** BotMetadata botModeSelectionMetadata */
        botModeSelectionMetadata?: (AICommon.IBotModeSelectionMetadata|null);

        /** BotMetadata botQuotaMetadata */
        botQuotaMetadata?: (AICommon.IBotQuotaMetadata|null);

        /** BotMetadata botAgeCollectionMetadata */
        botAgeCollectionMetadata?: (AICommon.IBotAgeCollectionMetadata|null);

        /** BotMetadata conversationStarterPromptId */
        conversationStarterPromptId?: (string|null);

        /** BotMetadata botResponseId */
        botResponseId?: (string|null);

        /** BotMetadata verificationMetadata */
        verificationMetadata?: (AICommon.IBotSignatureVerificationMetadata|null);

        /** BotMetadata unifiedResponseMutation */
        unifiedResponseMutation?: (AICommon.IBotUnifiedResponseMutation|null);

        /** BotMetadata botMessageOriginMetadata */
        botMessageOriginMetadata?: (AICommon.IBotMessageOriginMetadata|null);

        /** BotMetadata inThreadSurveyMetadata */
        inThreadSurveyMetadata?: (AICommon.IInThreadSurveyMetadata|null);

        /** BotMetadata botThreadInfo */
        botThreadInfo?: (AICommon.IAIThreadInfo|null);

        /** BotMetadata regenerateMetadata */
        regenerateMetadata?: (AICommon.IAIRegenerateMetadata|null);

        /** BotMetadata sessionTransparencyMetadata */
        sessionTransparencyMetadata?: (AICommon.ISessionTransparencyMetadata|null);

        /** BotMetadata botDocumentMessageMetadata */
        botDocumentMessageMetadata?: (AICommon.IBotDocumentMessageMetadata|null);

        /** BotMetadata botGroupMetadata */
        botGroupMetadata?: (AICommon.IBotGroupMetadata|null);

        /** BotMetadata botRenderingConfigMetadata */
        botRenderingConfigMetadata?: (AICommon.IBotRenderingConfigMetadata|null);

        /** BotMetadata botInfrastructureDiagnostics */
        botInfrastructureDiagnostics?: (AICommon.IBotInfrastructureDiagnostics|null);

        /** BotMetadata aiMediaCollectionMetadata */
        aiMediaCollectionMetadata?: (AICommon.IAIMediaCollectionMetadata|null);

        /** BotMetadata commandMetadata */
        commandMetadata?: (AICommon.IBotCommandMetadata|null);

        /** BotMetadata internalMetadata */
        internalMetadata?: (Uint8Array|null);
    }

    /** Represents a BotMetadata. */
    class BotMetadata implements IBotMetadata {

        /**
         * Constructs a new BotMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotMetadata);

        /** BotMetadata personaId. */
        public personaId?: (string|null);

        /** BotMetadata pluginMetadata. */
        public pluginMetadata?: (AICommon.IBotPluginMetadata|null);

        /** BotMetadata suggestedPromptMetadata. */
        public suggestedPromptMetadata?: (AICommon.IBotSuggestedPromptMetadata|null);

        /** BotMetadata invokerJid. */
        public invokerJid?: (string|null);

        /** BotMetadata sessionMetadata. */
        public sessionMetadata?: (AICommon.IBotSessionMetadata|null);

        /** BotMetadata memuMetadata. */
        public memuMetadata?: (AICommon.IBotMemuMetadata|null);

        /** BotMetadata timezone. */
        public timezone?: (string|null);

        /** BotMetadata reminderMetadata. */
        public reminderMetadata?: (AICommon.IBotReminderMetadata|null);

        /** BotMetadata modelMetadata. */
        public modelMetadata?: (AICommon.IBotModelMetadata|null);

        /** BotMetadata messageDisclaimerText. */
        public messageDisclaimerText?: (string|null);

        /** BotMetadata progressIndicatorMetadata. */
        public progressIndicatorMetadata?: (AICommon.IBotProgressIndicatorMetadata|null);

        /** BotMetadata capabilityMetadata. */
        public capabilityMetadata?: (AICommon.IBotCapabilityMetadata|null);

        /** BotMetadata imagineMetadata. */
        public imagineMetadata?: (AICommon.IBotImagineMetadata|null);

        /** BotMetadata memoryMetadata. */
        public memoryMetadata?: (AICommon.IBotMemoryMetadata|null);

        /** BotMetadata renderingMetadata. */
        public renderingMetadata?: (AICommon.IBotRenderingMetadata|null);

        /** BotMetadata botMetricsMetadata. */
        public botMetricsMetadata?: (AICommon.IBotMetricsMetadata|null);

        /** BotMetadata botLinkedAccountsMetadata. */
        public botLinkedAccountsMetadata?: (AICommon.IBotLinkedAccountsMetadata|null);

        /** BotMetadata richResponseSourcesMetadata. */
        public richResponseSourcesMetadata?: (AICommon.IBotSourcesMetadata|null);

        /** BotMetadata aiConversationContext. */
        public aiConversationContext?: (Uint8Array|null);

        /** BotMetadata botPromotionMessageMetadata. */
        public botPromotionMessageMetadata?: (AICommon.IBotPromotionMessageMetadata|null);

        /** BotMetadata botModeSelectionMetadata. */
        public botModeSelectionMetadata?: (AICommon.IBotModeSelectionMetadata|null);

        /** BotMetadata botQuotaMetadata. */
        public botQuotaMetadata?: (AICommon.IBotQuotaMetadata|null);

        /** BotMetadata botAgeCollectionMetadata. */
        public botAgeCollectionMetadata?: (AICommon.IBotAgeCollectionMetadata|null);

        /** BotMetadata conversationStarterPromptId. */
        public conversationStarterPromptId?: (string|null);

        /** BotMetadata botResponseId. */
        public botResponseId?: (string|null);

        /** BotMetadata verificationMetadata. */
        public verificationMetadata?: (AICommon.IBotSignatureVerificationMetadata|null);

        /** BotMetadata unifiedResponseMutation. */
        public unifiedResponseMutation?: (AICommon.IBotUnifiedResponseMutation|null);

        /** BotMetadata botMessageOriginMetadata. */
        public botMessageOriginMetadata?: (AICommon.IBotMessageOriginMetadata|null);

        /** BotMetadata inThreadSurveyMetadata. */
        public inThreadSurveyMetadata?: (AICommon.IInThreadSurveyMetadata|null);

        /** BotMetadata botThreadInfo. */
        public botThreadInfo?: (AICommon.IAIThreadInfo|null);

        /** BotMetadata regenerateMetadata. */
        public regenerateMetadata?: (AICommon.IAIRegenerateMetadata|null);

        /** BotMetadata sessionTransparencyMetadata. */
        public sessionTransparencyMetadata?: (AICommon.ISessionTransparencyMetadata|null);

        /** BotMetadata botDocumentMessageMetadata. */
        public botDocumentMessageMetadata?: (AICommon.IBotDocumentMessageMetadata|null);

        /** BotMetadata botGroupMetadata. */
        public botGroupMetadata?: (AICommon.IBotGroupMetadata|null);

        /** BotMetadata botRenderingConfigMetadata. */
        public botRenderingConfigMetadata?: (AICommon.IBotRenderingConfigMetadata|null);

        /** BotMetadata botInfrastructureDiagnostics. */
        public botInfrastructureDiagnostics?: (AICommon.IBotInfrastructureDiagnostics|null);

        /** BotMetadata aiMediaCollectionMetadata. */
        public aiMediaCollectionMetadata?: (AICommon.IAIMediaCollectionMetadata|null);

        /** BotMetadata commandMetadata. */
        public commandMetadata?: (AICommon.IBotCommandMetadata|null);

        /** BotMetadata internalMetadata. */
        public internalMetadata?: (Uint8Array|null);

        /**
         * Creates a new BotMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMetadata instance
         */
        public static create(properties?: AICommon.IBotMetadata): AICommon.BotMetadata;

        /**
         * Encodes the specified BotMetadata message. Does not implicitly {@link AICommon.BotMetadata.verify|verify} messages.
         * @param message BotMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMetadata message, length delimited. Does not implicitly {@link AICommon.BotMetadata.verify|verify} messages.
         * @param message BotMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotMetadata;

        /**
         * Decodes a BotMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotMetadata;

        /**
         * Creates a plain object from a BotMetadata message. Also converts values to other types if specified.
         * @param message BotMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

    /** Properties of a BotCommandMetadata. */
    interface IBotCommandMetadata {

        /** BotCommandMetadata commandName */
        commandName?: (string|null);

        /** BotCommandMetadata commandDescription */
        commandDescription?: (string|null);

        /** BotCommandMetadata commandPrompt */
        commandPrompt?: (string|null);
    }

    /** Represents a BotCommandMetadata. */
    class BotCommandMetadata implements IBotCommandMetadata {

        /**
         * Constructs a new BotCommandMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotCommandMetadata);

        /** BotCommandMetadata commandName. */
        public commandName?: (string|null);

        /** BotCommandMetadata commandDescription. */
        public commandDescription?: (string|null);

        /** BotCommandMetadata commandPrompt. */
        public commandPrompt?: (string|null);

        /**
         * Creates a new BotCommandMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotCommandMetadata instance
         */
        public static create(properties?: AICommon.IBotCommandMetadata): AICommon.BotCommandMetadata;

        /**
         * Encodes the specified BotCommandMetadata message. Does not implicitly {@link AICommon.BotCommandMetadata.verify|verify} messages.
         * @param message BotCommandMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotCommandMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotCommandMetadata message, length delimited. Does not implicitly {@link AICommon.BotCommandMetadata.verify|verify} messages.
         * @param message BotCommandMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotCommandMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotCommandMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotCommandMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotCommandMetadata;

        /**
         * Decodes a BotCommandMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotCommandMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotCommandMetadata;

        /**
         * Verifies a BotCommandMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BotCommandMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BotCommandMetadata
         */
        public static fromObject(object: { [k: string]: any }): AICommon.BotCommandMetadata;

        /**
         * Creates a plain object from a BotCommandMetadata message. Also converts values to other types if specified.
         * @param message BotCommandMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotCommandMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BotCommandMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BotCommandMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a AIMediaCollectionMessage. */
    interface IAIMediaCollectionMessage {

        /** AIMediaCollectionMessage collectionId */
        collectionId?: (string|null);

        /** AIMediaCollectionMessage expectedMediaCount */
        expectedMediaCount?: (number|null);

        /** AIMediaCollectionMessage hasGlobalCaption */
        hasGlobalCaption?: (boolean|null);
    }

    /** Represents a AIMediaCollectionMessage. */
    class AIMediaCollectionMessage implements IAIMediaCollectionMessage {

        /**
         * Constructs a new AIMediaCollectionMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IAIMediaCollectionMessage);

        /** AIMediaCollectionMessage collectionId. */
        public collectionId?: (string|null);

        /** AIMediaCollectionMessage expectedMediaCount. */
        public expectedMediaCount?: (number|null);

        /** AIMediaCollectionMessage hasGlobalCaption. */
        public hasGlobalCaption?: (boolean|null);

        /**
         * Creates a new AIMediaCollectionMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AIMediaCollectionMessage instance
         */
        public static create(properties?: AICommon.IAIMediaCollectionMessage): AICommon.AIMediaCollectionMessage;

        /**
         * Encodes the specified AIMediaCollectionMessage message. Does not implicitly {@link AICommon.AIMediaCollectionMessage.verify|verify} messages.
         * @param message AIMediaCollectionMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IAIMediaCollectionMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AIMediaCollectionMessage message, length delimited. Does not implicitly {@link AICommon.AIMediaCollectionMessage.verify|verify} messages.
         * @param message AIMediaCollectionMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IAIMediaCollectionMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a AIMediaCollectionMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AIMediaCollectionMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.AIMediaCollectionMessage;

        /**
         * Decodes a AIMediaCollectionMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AIMediaCollectionMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.AIMediaCollectionMessage;

        /**
         * Verifies a AIMediaCollectionMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a AIMediaCollectionMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AIMediaCollectionMessage
         */
        public static fromObject(object: { [k: string]: any }): AICommon.AIMediaCollectionMessage;

        /**
         * Creates a plain object from a AIMediaCollectionMessage message. Also converts values to other types if specified.
         * @param message AIMediaCollectionMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.AIMediaCollectionMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AIMediaCollectionMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AIMediaCollectionMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a AIMediaCollectionMetadata. */
    interface IAIMediaCollectionMetadata {

        /** AIMediaCollectionMetadata collectionId */
        collectionId?: (string|null);

        /** AIMediaCollectionMetadata uploadOrderIndex */
        uploadOrderIndex?: (number|null);
    }

    /** Represents a AIMediaCollectionMetadata. */
    class AIMediaCollectionMetadata implements IAIMediaCollectionMetadata {

        /**
         * Constructs a new AIMediaCollectionMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IAIMediaCollectionMetadata);

        /** AIMediaCollectionMetadata collectionId. */
        public collectionId?: (string|null);

        /** AIMediaCollectionMetadata uploadOrderIndex. */
        public uploadOrderIndex?: (number|null);

        /**
         * Creates a new AIMediaCollectionMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AIMediaCollectionMetadata instance
         */
        public static create(properties?: AICommon.IAIMediaCollectionMetadata): AICommon.AIMediaCollectionMetadata;

        /**
         * Encodes the specified AIMediaCollectionMetadata message. Does not implicitly {@link AICommon.AIMediaCollectionMetadata.verify|verify} messages.
         * @param message AIMediaCollectionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IAIMediaCollectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AIMediaCollectionMetadata message, length delimited. Does not implicitly {@link AICommon.AIMediaCollectionMetadata.verify|verify} messages.
         * @param message AIMediaCollectionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IAIMediaCollectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a AIMediaCollectionMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AIMediaCollectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.AIMediaCollectionMetadata;

        /**
         * Decodes a AIMediaCollectionMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AIMediaCollectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.AIMediaCollectionMetadata;

        /**
         * Verifies a AIMediaCollectionMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a AIMediaCollectionMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AIMediaCollectionMetadata
         */
        public static fromObject(object: { [k: string]: any }): AICommon.AIMediaCollectionMetadata;

        /**
         * Creates a plain object from a AIMediaCollectionMetadata message. Also converts values to other types if specified.
         * @param message AIMediaCollectionMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.AIMediaCollectionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AIMediaCollectionMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AIMediaCollectionMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a AIThreadInfo. */
    interface IAIThreadInfo {

        /** AIThreadInfo serverInfo */
        serverInfo?: (AICommon.AIThreadInfo.IAIThreadServerInfo|null);

        /** AIThreadInfo clientInfo */
        clientInfo?: (AICommon.AIThreadInfo.IAIThreadClientInfo|null);
    }

    /** Represents a AIThreadInfo. */
    class AIThreadInfo implements IAIThreadInfo {

        /**
         * Constructs a new AIThreadInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IAIThreadInfo);

        /** AIThreadInfo serverInfo. */
        public serverInfo?: (AICommon.AIThreadInfo.IAIThreadServerInfo|null);

        /** AIThreadInfo clientInfo. */
        public clientInfo?: (AICommon.AIThreadInfo.IAIThreadClientInfo|null);

        /**
         * Creates a new AIThreadInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AIThreadInfo instance
         */
        public static create(properties?: AICommon.IAIThreadInfo): AICommon.AIThreadInfo;

        /**
         * Encodes the specified AIThreadInfo message. Does not implicitly {@link AICommon.AIThreadInfo.verify|verify} messages.
         * @param message AIThreadInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IAIThreadInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AIThreadInfo message, length delimited. Does not implicitly {@link AICommon.AIThreadInfo.verify|verify} messages.
         * @param message AIThreadInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IAIThreadInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a AIThreadInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AIThreadInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.AIThreadInfo;

        /**
         * Decodes a AIThreadInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AIThreadInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.AIThreadInfo;

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
        public static fromObject(object: { [k: string]: any }): AICommon.AIThreadInfo;

        /**
         * Creates a plain object from a AIThreadInfo message. Also converts values to other types if specified.
         * @param message AIThreadInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.AIThreadInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            type?: (AICommon.AIThreadInfo.AIThreadClientInfo.AIThreadType|null);

            /** AIThreadClientInfo sourceChatJid */
            sourceChatJid?: (string|null);
        }

        /** Represents a AIThreadClientInfo. */
        class AIThreadClientInfo implements IAIThreadClientInfo {

            /**
             * Constructs a new AIThreadClientInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: AICommon.AIThreadInfo.IAIThreadClientInfo);

            /** AIThreadClientInfo type. */
            public type?: (AICommon.AIThreadInfo.AIThreadClientInfo.AIThreadType|null);

            /** AIThreadClientInfo sourceChatJid. */
            public sourceChatJid?: (string|null);

            /**
             * Creates a new AIThreadClientInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AIThreadClientInfo instance
             */
            public static create(properties?: AICommon.AIThreadInfo.IAIThreadClientInfo): AICommon.AIThreadInfo.AIThreadClientInfo;

            /**
             * Encodes the specified AIThreadClientInfo message. Does not implicitly {@link AICommon.AIThreadInfo.AIThreadClientInfo.verify|verify} messages.
             * @param message AIThreadClientInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.AIThreadInfo.IAIThreadClientInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AIThreadClientInfo message, length delimited. Does not implicitly {@link AICommon.AIThreadInfo.AIThreadClientInfo.verify|verify} messages.
             * @param message AIThreadClientInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.AIThreadInfo.IAIThreadClientInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AIThreadClientInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AIThreadClientInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.AIThreadInfo.AIThreadClientInfo;

            /**
             * Decodes a AIThreadClientInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AIThreadClientInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.AIThreadInfo.AIThreadClientInfo;

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
            public static fromObject(object: { [k: string]: any }): AICommon.AIThreadInfo.AIThreadClientInfo;

            /**
             * Creates a plain object from a AIThreadClientInfo message. Also converts values to other types if specified.
             * @param message AIThreadClientInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.AIThreadInfo.AIThreadClientInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
                INCOGNITO = 2,
                SIDE_CHAT = 3
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
            constructor(properties?: AICommon.AIThreadInfo.IAIThreadServerInfo);

            /** AIThreadServerInfo title. */
            public title?: (string|null);

            /**
             * Creates a new AIThreadServerInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AIThreadServerInfo instance
             */
            public static create(properties?: AICommon.AIThreadInfo.IAIThreadServerInfo): AICommon.AIThreadInfo.AIThreadServerInfo;

            /**
             * Encodes the specified AIThreadServerInfo message. Does not implicitly {@link AICommon.AIThreadInfo.AIThreadServerInfo.verify|verify} messages.
             * @param message AIThreadServerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.AIThreadInfo.IAIThreadServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AIThreadServerInfo message, length delimited. Does not implicitly {@link AICommon.AIThreadInfo.AIThreadServerInfo.verify|verify} messages.
             * @param message AIThreadServerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.AIThreadInfo.IAIThreadServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a AIThreadServerInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AIThreadServerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.AIThreadInfo.AIThreadServerInfo;

            /**
             * Decodes a AIThreadServerInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AIThreadServerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.AIThreadInfo.AIThreadServerInfo;

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
            public static fromObject(object: { [k: string]: any }): AICommon.AIThreadInfo.AIThreadServerInfo;

            /**
             * Creates a plain object from a AIThreadServerInfo message. Also converts values to other types if specified.
             * @param message AIThreadServerInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.AIThreadInfo.AIThreadServerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        sbsMetadata?: (AICommon.BotUnifiedResponseMutation.ISideBySideMetadata|null);

        /** BotUnifiedResponseMutation mediaDetailsMetadataList */
        mediaDetailsMetadataList?: (AICommon.BotUnifiedResponseMutation.IMediaDetailsMetadata[]|null);
    }

    /** Represents a BotUnifiedResponseMutation. */
    class BotUnifiedResponseMutation implements IBotUnifiedResponseMutation {

        /**
         * Constructs a new BotUnifiedResponseMutation.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotUnifiedResponseMutation);

        /** BotUnifiedResponseMutation sbsMetadata. */
        public sbsMetadata?: (AICommon.BotUnifiedResponseMutation.ISideBySideMetadata|null);

        /** BotUnifiedResponseMutation mediaDetailsMetadataList. */
        public mediaDetailsMetadataList: AICommon.BotUnifiedResponseMutation.IMediaDetailsMetadata[];

        /**
         * Creates a new BotUnifiedResponseMutation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotUnifiedResponseMutation instance
         */
        public static create(properties?: AICommon.IBotUnifiedResponseMutation): AICommon.BotUnifiedResponseMutation;

        /**
         * Encodes the specified BotUnifiedResponseMutation message. Does not implicitly {@link AICommon.BotUnifiedResponseMutation.verify|verify} messages.
         * @param message BotUnifiedResponseMutation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotUnifiedResponseMutation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotUnifiedResponseMutation message, length delimited. Does not implicitly {@link AICommon.BotUnifiedResponseMutation.verify|verify} messages.
         * @param message BotUnifiedResponseMutation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotUnifiedResponseMutation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotUnifiedResponseMutation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotUnifiedResponseMutation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotUnifiedResponseMutation;

        /**
         * Decodes a BotUnifiedResponseMutation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotUnifiedResponseMutation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotUnifiedResponseMutation;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotUnifiedResponseMutation;

        /**
         * Creates a plain object from a BotUnifiedResponseMutation message. Also converts values to other types if specified.
         * @param message BotUnifiedResponseMutation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotUnifiedResponseMutation, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

        /** Properties of a MediaDetailsMetadata. */
        interface IMediaDetailsMetadata {

            /** MediaDetailsMetadata id */
            id?: (string|null);

            /** MediaDetailsMetadata highResMedia */
            highResMedia?: (AICommon.IBotMediaMetadata|null);

            /** MediaDetailsMetadata previewMedia */
            previewMedia?: (AICommon.IBotMediaMetadata|null);
        }

        /** Represents a MediaDetailsMetadata. */
        class MediaDetailsMetadata implements IMediaDetailsMetadata {

            /**
             * Constructs a new MediaDetailsMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: AICommon.BotUnifiedResponseMutation.IMediaDetailsMetadata);

            /** MediaDetailsMetadata id. */
            public id?: (string|null);

            /** MediaDetailsMetadata highResMedia. */
            public highResMedia?: (AICommon.IBotMediaMetadata|null);

            /** MediaDetailsMetadata previewMedia. */
            public previewMedia?: (AICommon.IBotMediaMetadata|null);

            /**
             * Creates a new MediaDetailsMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MediaDetailsMetadata instance
             */
            public static create(properties?: AICommon.BotUnifiedResponseMutation.IMediaDetailsMetadata): AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata;

            /**
             * Encodes the specified MediaDetailsMetadata message. Does not implicitly {@link AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.verify|verify} messages.
             * @param message MediaDetailsMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.BotUnifiedResponseMutation.IMediaDetailsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MediaDetailsMetadata message, length delimited. Does not implicitly {@link AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.verify|verify} messages.
             * @param message MediaDetailsMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.BotUnifiedResponseMutation.IMediaDetailsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MediaDetailsMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MediaDetailsMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata;

            /**
             * Decodes a MediaDetailsMetadata message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MediaDetailsMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata;

            /**
             * Verifies a MediaDetailsMetadata message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MediaDetailsMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MediaDetailsMetadata
             */
            public static fromObject(object: { [k: string]: any }): AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata;

            /**
             * Creates a plain object from a MediaDetailsMetadata message. Also converts values to other types if specified.
             * @param message MediaDetailsMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MediaDetailsMetadata to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MediaDetailsMetadata
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SideBySideMetadata. */
        interface ISideBySideMetadata {

            /** SideBySideMetadata primaryResponseId */
            primaryResponseId?: (string|null);

            /** SideBySideMetadata surveyCtaHasRendered */
            surveyCtaHasRendered?: (boolean|null);
        }

        /** Represents a SideBySideMetadata. */
        class SideBySideMetadata implements ISideBySideMetadata {

            /**
             * Constructs a new SideBySideMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: AICommon.BotUnifiedResponseMutation.ISideBySideMetadata);

            /** SideBySideMetadata primaryResponseId. */
            public primaryResponseId?: (string|null);

            /** SideBySideMetadata surveyCtaHasRendered. */
            public surveyCtaHasRendered?: (boolean|null);

            /**
             * Creates a new SideBySideMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SideBySideMetadata instance
             */
            public static create(properties?: AICommon.BotUnifiedResponseMutation.ISideBySideMetadata): AICommon.BotUnifiedResponseMutation.SideBySideMetadata;

            /**
             * Encodes the specified SideBySideMetadata message. Does not implicitly {@link AICommon.BotUnifiedResponseMutation.SideBySideMetadata.verify|verify} messages.
             * @param message SideBySideMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.BotUnifiedResponseMutation.ISideBySideMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SideBySideMetadata message, length delimited. Does not implicitly {@link AICommon.BotUnifiedResponseMutation.SideBySideMetadata.verify|verify} messages.
             * @param message SideBySideMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.BotUnifiedResponseMutation.ISideBySideMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SideBySideMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SideBySideMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotUnifiedResponseMutation.SideBySideMetadata;

            /**
             * Decodes a SideBySideMetadata message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SideBySideMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotUnifiedResponseMutation.SideBySideMetadata;

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
            public static fromObject(object: { [k: string]: any }): AICommon.BotUnifiedResponseMutation.SideBySideMetadata;

            /**
             * Creates a plain object from a SideBySideMetadata message. Also converts values to other types if specified.
             * @param message SideBySideMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.BotUnifiedResponseMutation.SideBySideMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        type?: (AICommon.BotMessageOrigin.BotMessageOriginType|null);
    }

    /** Represents a BotMessageOrigin. */
    class BotMessageOrigin implements IBotMessageOrigin {

        /**
         * Constructs a new BotMessageOrigin.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotMessageOrigin);

        /** BotMessageOrigin type. */
        public type?: (AICommon.BotMessageOrigin.BotMessageOriginType|null);

        /**
         * Creates a new BotMessageOrigin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMessageOrigin instance
         */
        public static create(properties?: AICommon.IBotMessageOrigin): AICommon.BotMessageOrigin;

        /**
         * Encodes the specified BotMessageOrigin message. Does not implicitly {@link AICommon.BotMessageOrigin.verify|verify} messages.
         * @param message BotMessageOrigin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotMessageOrigin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMessageOrigin message, length delimited. Does not implicitly {@link AICommon.BotMessageOrigin.verify|verify} messages.
         * @param message BotMessageOrigin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotMessageOrigin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMessageOrigin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMessageOrigin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotMessageOrigin;

        /**
         * Decodes a BotMessageOrigin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMessageOrigin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotMessageOrigin;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotMessageOrigin;

        /**
         * Creates a plain object from a BotMessageOrigin message. Also converts values to other types if specified.
         * @param message BotMessageOrigin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotMessageOrigin, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        origins?: (AICommon.IBotMessageOrigin[]|null);
    }

    /** Represents a BotMessageOriginMetadata. */
    class BotMessageOriginMetadata implements IBotMessageOriginMetadata {

        /**
         * Constructs a new BotMessageOriginMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotMessageOriginMetadata);

        /** BotMessageOriginMetadata origins. */
        public origins: AICommon.IBotMessageOrigin[];

        /**
         * Creates a new BotMessageOriginMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMessageOriginMetadata instance
         */
        public static create(properties?: AICommon.IBotMessageOriginMetadata): AICommon.BotMessageOriginMetadata;

        /**
         * Encodes the specified BotMessageOriginMetadata message. Does not implicitly {@link AICommon.BotMessageOriginMetadata.verify|verify} messages.
         * @param message BotMessageOriginMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotMessageOriginMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMessageOriginMetadata message, length delimited. Does not implicitly {@link AICommon.BotMessageOriginMetadata.verify|verify} messages.
         * @param message BotMessageOriginMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotMessageOriginMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMessageOriginMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMessageOriginMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotMessageOriginMetadata;

        /**
         * Decodes a BotMessageOriginMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMessageOriginMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotMessageOriginMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotMessageOriginMetadata;

        /**
         * Creates a plain object from a BotMessageOriginMetadata message. Also converts values to other types if specified.
         * @param message BotMessageOriginMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotMessageOriginMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        questions?: (AICommon.InThreadSurveyMetadata.IInThreadSurveyQuestion[]|null);

        /** InThreadSurveyMetadata surveyContinueButtonText */
        surveyContinueButtonText?: (string|null);

        /** InThreadSurveyMetadata surveySubmitButtonText */
        surveySubmitButtonText?: (string|null);

        /** InThreadSurveyMetadata privacyStatementFull */
        privacyStatementFull?: (string|null);

        /** InThreadSurveyMetadata privacyStatementParts */
        privacyStatementParts?: (AICommon.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart[]|null);

        /** InThreadSurveyMetadata feedbackToastText */
        feedbackToastText?: (string|null);

        /** InThreadSurveyMetadata startQuestionIndex */
        startQuestionIndex?: (number|null);
    }

    /** Represents an InThreadSurveyMetadata. */
    class InThreadSurveyMetadata implements IInThreadSurveyMetadata {

        /**
         * Constructs a new InThreadSurveyMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IInThreadSurveyMetadata);

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
        public questions: AICommon.InThreadSurveyMetadata.IInThreadSurveyQuestion[];

        /** InThreadSurveyMetadata surveyContinueButtonText. */
        public surveyContinueButtonText?: (string|null);

        /** InThreadSurveyMetadata surveySubmitButtonText. */
        public surveySubmitButtonText?: (string|null);

        /** InThreadSurveyMetadata privacyStatementFull. */
        public privacyStatementFull?: (string|null);

        /** InThreadSurveyMetadata privacyStatementParts. */
        public privacyStatementParts: AICommon.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart[];

        /** InThreadSurveyMetadata feedbackToastText. */
        public feedbackToastText?: (string|null);

        /** InThreadSurveyMetadata startQuestionIndex. */
        public startQuestionIndex?: (number|null);

        /**
         * Creates a new InThreadSurveyMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InThreadSurveyMetadata instance
         */
        public static create(properties?: AICommon.IInThreadSurveyMetadata): AICommon.InThreadSurveyMetadata;

        /**
         * Encodes the specified InThreadSurveyMetadata message. Does not implicitly {@link AICommon.InThreadSurveyMetadata.verify|verify} messages.
         * @param message InThreadSurveyMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IInThreadSurveyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InThreadSurveyMetadata message, length delimited. Does not implicitly {@link AICommon.InThreadSurveyMetadata.verify|verify} messages.
         * @param message InThreadSurveyMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IInThreadSurveyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InThreadSurveyMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InThreadSurveyMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.InThreadSurveyMetadata;

        /**
         * Decodes an InThreadSurveyMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InThreadSurveyMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.InThreadSurveyMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.InThreadSurveyMetadata;

        /**
         * Creates a plain object from an InThreadSurveyMetadata message. Also converts values to other types if specified.
         * @param message InThreadSurveyMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.InThreadSurveyMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            constructor(properties?: AICommon.InThreadSurveyMetadata.IInThreadSurveyOption);

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
            public static create(properties?: AICommon.InThreadSurveyMetadata.IInThreadSurveyOption): AICommon.InThreadSurveyMetadata.InThreadSurveyOption;

            /**
             * Encodes the specified InThreadSurveyOption message. Does not implicitly {@link AICommon.InThreadSurveyMetadata.InThreadSurveyOption.verify|verify} messages.
             * @param message InThreadSurveyOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.InThreadSurveyMetadata.IInThreadSurveyOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified InThreadSurveyOption message, length delimited. Does not implicitly {@link AICommon.InThreadSurveyMetadata.InThreadSurveyOption.verify|verify} messages.
             * @param message InThreadSurveyOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.InThreadSurveyMetadata.IInThreadSurveyOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InThreadSurveyOption message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InThreadSurveyOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.InThreadSurveyMetadata.InThreadSurveyOption;

            /**
             * Decodes an InThreadSurveyOption message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InThreadSurveyOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.InThreadSurveyMetadata.InThreadSurveyOption;

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
            public static fromObject(object: { [k: string]: any }): AICommon.InThreadSurveyMetadata.InThreadSurveyOption;

            /**
             * Creates a plain object from an InThreadSurveyOption message. Also converts values to other types if specified.
             * @param message InThreadSurveyOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.InThreadSurveyMetadata.InThreadSurveyOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            constructor(properties?: AICommon.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart);

            /** InThreadSurveyPrivacyStatementPart text. */
            public text?: (string|null);

            /** InThreadSurveyPrivacyStatementPart url. */
            public url?: (string|null);

            /**
             * Creates a new InThreadSurveyPrivacyStatementPart instance using the specified properties.
             * @param [properties] Properties to set
             * @returns InThreadSurveyPrivacyStatementPart instance
             */
            public static create(properties?: AICommon.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart): AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;

            /**
             * Encodes the specified InThreadSurveyPrivacyStatementPart message. Does not implicitly {@link AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.verify|verify} messages.
             * @param message InThreadSurveyPrivacyStatementPart message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified InThreadSurveyPrivacyStatementPart message, length delimited. Does not implicitly {@link AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.verify|verify} messages.
             * @param message InThreadSurveyPrivacyStatementPart message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.InThreadSurveyMetadata.IInThreadSurveyPrivacyStatementPart, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InThreadSurveyPrivacyStatementPart message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InThreadSurveyPrivacyStatementPart
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;

            /**
             * Decodes an InThreadSurveyPrivacyStatementPart message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InThreadSurveyPrivacyStatementPart
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;

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
            public static fromObject(object: { [k: string]: any }): AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;

            /**
             * Creates a plain object from an InThreadSurveyPrivacyStatementPart message. Also converts values to other types if specified.
             * @param message InThreadSurveyPrivacyStatementPart
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            questionOptions?: (AICommon.InThreadSurveyMetadata.IInThreadSurveyOption[]|null);
        }

        /** Represents an InThreadSurveyQuestion. */
        class InThreadSurveyQuestion implements IInThreadSurveyQuestion {

            /**
             * Constructs a new InThreadSurveyQuestion.
             * @param [properties] Properties to set
             */
            constructor(properties?: AICommon.InThreadSurveyMetadata.IInThreadSurveyQuestion);

            /** InThreadSurveyQuestion questionText. */
            public questionText?: (string|null);

            /** InThreadSurveyQuestion questionId. */
            public questionId?: (string|null);

            /** InThreadSurveyQuestion questionOptions. */
            public questionOptions: AICommon.InThreadSurveyMetadata.IInThreadSurveyOption[];

            /**
             * Creates a new InThreadSurveyQuestion instance using the specified properties.
             * @param [properties] Properties to set
             * @returns InThreadSurveyQuestion instance
             */
            public static create(properties?: AICommon.InThreadSurveyMetadata.IInThreadSurveyQuestion): AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion;

            /**
             * Encodes the specified InThreadSurveyQuestion message. Does not implicitly {@link AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.verify|verify} messages.
             * @param message InThreadSurveyQuestion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.InThreadSurveyMetadata.IInThreadSurveyQuestion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified InThreadSurveyQuestion message, length delimited. Does not implicitly {@link AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.verify|verify} messages.
             * @param message InThreadSurveyQuestion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.InThreadSurveyMetadata.IInThreadSurveyQuestion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InThreadSurveyQuestion message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InThreadSurveyQuestion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion;

            /**
             * Decodes an InThreadSurveyQuestion message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InThreadSurveyQuestion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion;

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
            public static fromObject(object: { [k: string]: any }): AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion;

            /**
             * Creates a plain object from an InThreadSurveyQuestion message. Also converts values to other types if specified.
             * @param message InThreadSurveyQuestion
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        sources?: (AICommon.BotSourcesMetadata.IBotSourceItem[]|null);
    }

    /** Represents a BotSourcesMetadata. */
    class BotSourcesMetadata implements IBotSourcesMetadata {

        /**
         * Constructs a new BotSourcesMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotSourcesMetadata);

        /** BotSourcesMetadata sources. */
        public sources: AICommon.BotSourcesMetadata.IBotSourceItem[];

        /**
         * Creates a new BotSourcesMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotSourcesMetadata instance
         */
        public static create(properties?: AICommon.IBotSourcesMetadata): AICommon.BotSourcesMetadata;

        /**
         * Encodes the specified BotSourcesMetadata message. Does not implicitly {@link AICommon.BotSourcesMetadata.verify|verify} messages.
         * @param message BotSourcesMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotSourcesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotSourcesMetadata message, length delimited. Does not implicitly {@link AICommon.BotSourcesMetadata.verify|verify} messages.
         * @param message BotSourcesMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotSourcesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotSourcesMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotSourcesMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotSourcesMetadata;

        /**
         * Decodes a BotSourcesMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotSourcesMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotSourcesMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotSourcesMetadata;

        /**
         * Creates a plain object from a BotSourcesMetadata message. Also converts values to other types if specified.
         * @param message BotSourcesMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotSourcesMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            provider?: (AICommon.BotSourcesMetadata.BotSourceItem.SourceProvider|null);

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
            constructor(properties?: AICommon.BotSourcesMetadata.IBotSourceItem);

            /** BotSourceItem provider. */
            public provider?: (AICommon.BotSourcesMetadata.BotSourceItem.SourceProvider|null);

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
            public static create(properties?: AICommon.BotSourcesMetadata.IBotSourceItem): AICommon.BotSourcesMetadata.BotSourceItem;

            /**
             * Encodes the specified BotSourceItem message. Does not implicitly {@link AICommon.BotSourcesMetadata.BotSourceItem.verify|verify} messages.
             * @param message BotSourceItem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.BotSourcesMetadata.IBotSourceItem, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BotSourceItem message, length delimited. Does not implicitly {@link AICommon.BotSourcesMetadata.BotSourceItem.verify|verify} messages.
             * @param message BotSourceItem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.BotSourcesMetadata.IBotSourceItem, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BotSourceItem message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BotSourceItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotSourcesMetadata.BotSourceItem;

            /**
             * Decodes a BotSourceItem message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BotSourceItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotSourcesMetadata.BotSourceItem;

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
            public static fromObject(object: { [k: string]: any }): AICommon.BotSourcesMetadata.BotSourceItem;

            /**
             * Creates a plain object from a BotSourceItem message. Also converts values to other types if specified.
             * @param message BotSourceItem
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.BotSourcesMetadata.BotSourceItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

        /** BotAgeCollectionMetadata ageCollectionType */
        ageCollectionType?: (AICommon.BotAgeCollectionMetadata.AgeCollectionType|null);
    }

    /** Represents a BotAgeCollectionMetadata. */
    class BotAgeCollectionMetadata implements IBotAgeCollectionMetadata {

        /**
         * Constructs a new BotAgeCollectionMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotAgeCollectionMetadata);

        /** BotAgeCollectionMetadata ageCollectionEligible. */
        public ageCollectionEligible?: (boolean|null);

        /** BotAgeCollectionMetadata shouldTriggerAgeCollectionOnClient. */
        public shouldTriggerAgeCollectionOnClient?: (boolean|null);

        /** BotAgeCollectionMetadata ageCollectionType. */
        public ageCollectionType?: (AICommon.BotAgeCollectionMetadata.AgeCollectionType|null);

        /**
         * Creates a new BotAgeCollectionMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotAgeCollectionMetadata instance
         */
        public static create(properties?: AICommon.IBotAgeCollectionMetadata): AICommon.BotAgeCollectionMetadata;

        /**
         * Encodes the specified BotAgeCollectionMetadata message. Does not implicitly {@link AICommon.BotAgeCollectionMetadata.verify|verify} messages.
         * @param message BotAgeCollectionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotAgeCollectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotAgeCollectionMetadata message, length delimited. Does not implicitly {@link AICommon.BotAgeCollectionMetadata.verify|verify} messages.
         * @param message BotAgeCollectionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotAgeCollectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotAgeCollectionMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotAgeCollectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotAgeCollectionMetadata;

        /**
         * Decodes a BotAgeCollectionMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotAgeCollectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotAgeCollectionMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotAgeCollectionMetadata;

        /**
         * Creates a plain object from a BotAgeCollectionMetadata message. Also converts values to other types if specified.
         * @param message BotAgeCollectionMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotAgeCollectionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

    namespace BotAgeCollectionMetadata {

        /** AgeCollectionType enum. */
        enum AgeCollectionType {
            O18_BINARY = 0,
            WAFFLE = 1
        }
    }

    /** Properties of a BotImagineMetadata. */
    interface IBotImagineMetadata {

        /** BotImagineMetadata imagineType */
        imagineType?: (AICommon.BotImagineMetadata.ImagineType|null);

        /** BotImagineMetadata shortPrompt */
        shortPrompt?: (string|null);
    }

    /** Represents a BotImagineMetadata. */
    class BotImagineMetadata implements IBotImagineMetadata {

        /**
         * Constructs a new BotImagineMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotImagineMetadata);

        /** BotImagineMetadata imagineType. */
        public imagineType?: (AICommon.BotImagineMetadata.ImagineType|null);

        /** BotImagineMetadata shortPrompt. */
        public shortPrompt?: (string|null);

        /**
         * Creates a new BotImagineMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotImagineMetadata instance
         */
        public static create(properties?: AICommon.IBotImagineMetadata): AICommon.BotImagineMetadata;

        /**
         * Encodes the specified BotImagineMetadata message. Does not implicitly {@link AICommon.BotImagineMetadata.verify|verify} messages.
         * @param message BotImagineMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotImagineMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotImagineMetadata message, length delimited. Does not implicitly {@link AICommon.BotImagineMetadata.verify|verify} messages.
         * @param message BotImagineMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotImagineMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotImagineMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotImagineMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotImagineMetadata;

        /**
         * Decodes a BotImagineMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotImagineMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotImagineMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotImagineMetadata;

        /**
         * Creates a plain object from a BotImagineMetadata message. Also converts values to other types if specified.
         * @param message BotImagineMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotImagineMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        botFeatureQuotaMetadata?: (AICommon.BotQuotaMetadata.IBotFeatureQuotaMetadata[]|null);
    }

    /** Represents a BotQuotaMetadata. */
    class BotQuotaMetadata implements IBotQuotaMetadata {

        /**
         * Constructs a new BotQuotaMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotQuotaMetadata);

        /** BotQuotaMetadata botFeatureQuotaMetadata. */
        public botFeatureQuotaMetadata: AICommon.BotQuotaMetadata.IBotFeatureQuotaMetadata[];

        /**
         * Creates a new BotQuotaMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotQuotaMetadata instance
         */
        public static create(properties?: AICommon.IBotQuotaMetadata): AICommon.BotQuotaMetadata;

        /**
         * Encodes the specified BotQuotaMetadata message. Does not implicitly {@link AICommon.BotQuotaMetadata.verify|verify} messages.
         * @param message BotQuotaMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotQuotaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotQuotaMetadata message, length delimited. Does not implicitly {@link AICommon.BotQuotaMetadata.verify|verify} messages.
         * @param message BotQuotaMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotQuotaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotQuotaMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotQuotaMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotQuotaMetadata;

        /**
         * Decodes a BotQuotaMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotQuotaMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotQuotaMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotQuotaMetadata;

        /**
         * Creates a plain object from a BotQuotaMetadata message. Also converts values to other types if specified.
         * @param message BotQuotaMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotQuotaMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            featureType?: (AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType|null);

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
            constructor(properties?: AICommon.BotQuotaMetadata.IBotFeatureQuotaMetadata);

            /** BotFeatureQuotaMetadata featureType. */
            public featureType?: (AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType|null);

            /** BotFeatureQuotaMetadata remainingQuota. */
            public remainingQuota?: (number|null);

            /** BotFeatureQuotaMetadata expirationTimestamp. */
            public expirationTimestamp?: (number|Long|null);

            /**
             * Creates a new BotFeatureQuotaMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BotFeatureQuotaMetadata instance
             */
            public static create(properties?: AICommon.BotQuotaMetadata.IBotFeatureQuotaMetadata): AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata;

            /**
             * Encodes the specified BotFeatureQuotaMetadata message. Does not implicitly {@link AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.verify|verify} messages.
             * @param message BotFeatureQuotaMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.BotQuotaMetadata.IBotFeatureQuotaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BotFeatureQuotaMetadata message, length delimited. Does not implicitly {@link AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.verify|verify} messages.
             * @param message BotFeatureQuotaMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.BotQuotaMetadata.IBotFeatureQuotaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BotFeatureQuotaMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BotFeatureQuotaMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata;

            /**
             * Decodes a BotFeatureQuotaMetadata message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BotFeatureQuotaMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata;

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
            public static fromObject(object: { [k: string]: any }): AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata;

            /**
             * Creates a plain object from a BotFeatureQuotaMetadata message. Also converts values to other types if specified.
             * @param message BotFeatureQuotaMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        mode?: (AICommon.BotModeSelectionMetadata.BotUserSelectionMode[]|null);

        /** BotModeSelectionMetadata overrideMode */
        overrideMode?: (number[]|null);
    }

    /** Represents a BotModeSelectionMetadata. */
    class BotModeSelectionMetadata implements IBotModeSelectionMetadata {

        /**
         * Constructs a new BotModeSelectionMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotModeSelectionMetadata);

        /** BotModeSelectionMetadata mode. */
        public mode: AICommon.BotModeSelectionMetadata.BotUserSelectionMode[];

        /** BotModeSelectionMetadata overrideMode. */
        public overrideMode: number[];

        /**
         * Creates a new BotModeSelectionMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotModeSelectionMetadata instance
         */
        public static create(properties?: AICommon.IBotModeSelectionMetadata): AICommon.BotModeSelectionMetadata;

        /**
         * Encodes the specified BotModeSelectionMetadata message. Does not implicitly {@link AICommon.BotModeSelectionMetadata.verify|verify} messages.
         * @param message BotModeSelectionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotModeSelectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotModeSelectionMetadata message, length delimited. Does not implicitly {@link AICommon.BotModeSelectionMetadata.verify|verify} messages.
         * @param message BotModeSelectionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotModeSelectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotModeSelectionMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotModeSelectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotModeSelectionMetadata;

        /**
         * Decodes a BotModeSelectionMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotModeSelectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotModeSelectionMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotModeSelectionMetadata;

        /**
         * Creates a plain object from a BotModeSelectionMetadata message. Also converts values to other types if specified.
         * @param message BotModeSelectionMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotModeSelectionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            DEFAULT_MODE = 0,
            THINK_HARD_MODE = 1
        }
    }

    /** Properties of a BotCapabilityMetadata. */
    interface IBotCapabilityMetadata {

        /** BotCapabilityMetadata capabilities */
        capabilities?: (AICommon.BotCapabilityMetadata.BotCapabilityType[]|null);
    }

    /** Represents a BotCapabilityMetadata. */
    class BotCapabilityMetadata implements IBotCapabilityMetadata {

        /**
         * Constructs a new BotCapabilityMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotCapabilityMetadata);

        /** BotCapabilityMetadata capabilities. */
        public capabilities: AICommon.BotCapabilityMetadata.BotCapabilityType[];

        /**
         * Creates a new BotCapabilityMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotCapabilityMetadata instance
         */
        public static create(properties?: AICommon.IBotCapabilityMetadata): AICommon.BotCapabilityMetadata;

        /**
         * Encodes the specified BotCapabilityMetadata message. Does not implicitly {@link AICommon.BotCapabilityMetadata.verify|verify} messages.
         * @param message BotCapabilityMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotCapabilityMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotCapabilityMetadata message, length delimited. Does not implicitly {@link AICommon.BotCapabilityMetadata.verify|verify} messages.
         * @param message BotCapabilityMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotCapabilityMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotCapabilityMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotCapabilityMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotCapabilityMetadata;

        /**
         * Decodes a BotCapabilityMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotCapabilityMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotCapabilityMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotCapabilityMetadata;

        /**
         * Creates a plain object from a BotCapabilityMetadata message. Also converts values to other types if specified.
         * @param message BotCapabilityMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotCapabilityMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS = 42,
            RICH_RESPONSE_UR_INLINE_REELS_ENABLED = 43,
            RICH_RESPONSE_UR_MEDIA_GRID_ENABLED = 44,
            RICH_RESPONSE_UR_TIMESTAMP_PLACEHOLDER = 45,
            RICH_RESPONSE_IN_APP_SURVEY = 46,
            AI_RESPONSE_MODEL_BRANDING = 47,
            SESSION_TRANSPARENCY_SYSTEM_MESSAGE = 48,
            RICH_RESPONSE_UR_REASONING = 49,
            RICH_RESPONSE_UR_ZEITGEIST_CITATIONS = 50,
            RICH_RESPONSE_UR_ZEITGEIST_CAROUSEL = 51,
            AI_IMAGINE_LOADING_INDICATOR = 52,
            RICH_RESPONSE_UR_IMAGINE = 53,
            AI_IMAGINE_UR_TO_NATIVE_LOADING_INDICATOR = 54,
            RICH_RESPONSE_UR_BLOKS_ENABLED = 55,
            RICH_RESPONSE_INLINE_LINKS_ENABLED = 56,
            RICH_RESPONSE_UR_IMAGINE_VIDEO = 57,
            JSON_PATCH_STREAMING = 58,
            AI_TAB_FORCE_CLIPPY = 59,
            UNIFIED_RESPONSE_EMBEDDED_SCREENS = 60,
            AI_SUBSCRIPTION_ENABLED = 61
        }
    }

    /** Properties of a BotProgressIndicatorMetadata. */
    interface IBotProgressIndicatorMetadata {

        /** BotProgressIndicatorMetadata progressDescription */
        progressDescription?: (string|null);

        /** BotProgressIndicatorMetadata stepsMetadata */
        stepsMetadata?: (AICommon.BotProgressIndicatorMetadata.IBotPlanningStepMetadata[]|null);

        /** BotProgressIndicatorMetadata estimatedCompletionTime */
        estimatedCompletionTime?: (number|Long|null);
    }

    /** Represents a BotProgressIndicatorMetadata. */
    class BotProgressIndicatorMetadata implements IBotProgressIndicatorMetadata {

        /**
         * Constructs a new BotProgressIndicatorMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotProgressIndicatorMetadata);

        /** BotProgressIndicatorMetadata progressDescription. */
        public progressDescription?: (string|null);

        /** BotProgressIndicatorMetadata stepsMetadata. */
        public stepsMetadata: AICommon.BotProgressIndicatorMetadata.IBotPlanningStepMetadata[];

        /** BotProgressIndicatorMetadata estimatedCompletionTime. */
        public estimatedCompletionTime?: (number|Long|null);

        /**
         * Creates a new BotProgressIndicatorMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotProgressIndicatorMetadata instance
         */
        public static create(properties?: AICommon.IBotProgressIndicatorMetadata): AICommon.BotProgressIndicatorMetadata;

        /**
         * Encodes the specified BotProgressIndicatorMetadata message. Does not implicitly {@link AICommon.BotProgressIndicatorMetadata.verify|verify} messages.
         * @param message BotProgressIndicatorMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotProgressIndicatorMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotProgressIndicatorMetadata message, length delimited. Does not implicitly {@link AICommon.BotProgressIndicatorMetadata.verify|verify} messages.
         * @param message BotProgressIndicatorMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotProgressIndicatorMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotProgressIndicatorMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotProgressIndicatorMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotProgressIndicatorMetadata;

        /**
         * Decodes a BotProgressIndicatorMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotProgressIndicatorMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotProgressIndicatorMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotProgressIndicatorMetadata;

        /**
         * Creates a plain object from a BotProgressIndicatorMetadata message. Also converts values to other types if specified.
         * @param message BotProgressIndicatorMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotProgressIndicatorMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            sourcesMetadata?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata[]|null);

            /** BotPlanningStepMetadata status */
            status?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus|null);

            /** BotPlanningStepMetadata isReasoning */
            isReasoning?: (boolean|null);

            /** BotPlanningStepMetadata isEnhancedSearch */
            isEnhancedSearch?: (boolean|null);

            /** BotPlanningStepMetadata sections */
            sections?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata[]|null);
        }

        /** Represents a BotPlanningStepMetadata. */
        class BotPlanningStepMetadata implements IBotPlanningStepMetadata {

            /**
             * Constructs a new BotPlanningStepMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: AICommon.BotProgressIndicatorMetadata.IBotPlanningStepMetadata);

            /** BotPlanningStepMetadata statusTitle. */
            public statusTitle?: (string|null);

            /** BotPlanningStepMetadata statusBody. */
            public statusBody?: (string|null);

            /** BotPlanningStepMetadata sourcesMetadata. */
            public sourcesMetadata: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata[];

            /** BotPlanningStepMetadata status. */
            public status?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus|null);

            /** BotPlanningStepMetadata isReasoning. */
            public isReasoning?: (boolean|null);

            /** BotPlanningStepMetadata isEnhancedSearch. */
            public isEnhancedSearch?: (boolean|null);

            /** BotPlanningStepMetadata sections. */
            public sections: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata[];

            /**
             * Creates a new BotPlanningStepMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BotPlanningStepMetadata instance
             */
            public static create(properties?: AICommon.BotProgressIndicatorMetadata.IBotPlanningStepMetadata): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata;

            /**
             * Encodes the specified BotPlanningStepMetadata message. Does not implicitly {@link AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.verify|verify} messages.
             * @param message BotPlanningStepMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.BotProgressIndicatorMetadata.IBotPlanningStepMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BotPlanningStepMetadata message, length delimited. Does not implicitly {@link AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.verify|verify} messages.
             * @param message BotPlanningStepMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.BotProgressIndicatorMetadata.IBotPlanningStepMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BotPlanningStepMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BotPlanningStepMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata;

            /**
             * Decodes a BotPlanningStepMetadata message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BotPlanningStepMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata;

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
            public static fromObject(object: { [k: string]: any }): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata;

            /**
             * Creates a plain object from a BotPlanningStepMetadata message. Also converts values to other types if specified.
             * @param message BotPlanningStepMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
                provider?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider|null);

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
                constructor(properties?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata);

                /** BotPlanningSearchSourceMetadata title. */
                public title?: (string|null);

                /** BotPlanningSearchSourceMetadata provider. */
                public provider?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider|null);

                /** BotPlanningSearchSourceMetadata sourceUrl. */
                public sourceUrl?: (string|null);

                /** BotPlanningSearchSourceMetadata favIconUrl. */
                public favIconUrl?: (string|null);

                /**
                 * Creates a new BotPlanningSearchSourceMetadata instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BotPlanningSearchSourceMetadata instance
                 */
                public static create(properties?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;

                /**
                 * Encodes the specified BotPlanningSearchSourceMetadata message. Does not implicitly {@link AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.verify|verify} messages.
                 * @param message BotPlanningSearchSourceMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BotPlanningSearchSourceMetadata message, length delimited. Does not implicitly {@link AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.verify|verify} messages.
                 * @param message BotPlanningSearchSourceMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BotPlanningSearchSourceMetadata message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BotPlanningSearchSourceMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;

                /**
                 * Decodes a BotPlanningSearchSourceMetadata message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BotPlanningSearchSourceMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;

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
                public static fromObject(object: { [k: string]: any }): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;

                /**
                 * Creates a plain object from a BotPlanningSearchSourceMetadata message. Also converts values to other types if specified.
                 * @param message BotPlanningSearchSourceMetadata
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
                provider?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider|null);

                /** BotPlanningSearchSourcesMetadata sourceUrl */
                sourceUrl?: (string|null);
            }

            /** Represents a BotPlanningSearchSourcesMetadata. */
            class BotPlanningSearchSourcesMetadata implements IBotPlanningSearchSourcesMetadata {

                /**
                 * Constructs a new BotPlanningSearchSourcesMetadata.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata);

                /** BotPlanningSearchSourcesMetadata sourceTitle. */
                public sourceTitle?: (string|null);

                /** BotPlanningSearchSourcesMetadata provider. */
                public provider?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider|null);

                /** BotPlanningSearchSourcesMetadata sourceUrl. */
                public sourceUrl?: (string|null);

                /**
                 * Creates a new BotPlanningSearchSourcesMetadata instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BotPlanningSearchSourcesMetadata instance
                 */
                public static create(properties?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;

                /**
                 * Encodes the specified BotPlanningSearchSourcesMetadata message. Does not implicitly {@link AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.verify|verify} messages.
                 * @param message BotPlanningSearchSourcesMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BotPlanningSearchSourcesMetadata message, length delimited. Does not implicitly {@link AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.verify|verify} messages.
                 * @param message BotPlanningSearchSourcesMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourcesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BotPlanningSearchSourcesMetadata message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BotPlanningSearchSourcesMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;

                /**
                 * Decodes a BotPlanningSearchSourcesMetadata message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BotPlanningSearchSourcesMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;

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
                public static fromObject(object: { [k: string]: any }): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;

                /**
                 * Creates a plain object from a BotPlanningSearchSourcesMetadata message. Also converts values to other types if specified.
                 * @param message BotPlanningSearchSourcesMetadata
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
                sourcesMetadata?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata[]|null);
            }

            /** Represents a BotPlanningStepSectionMetadata. */
            class BotPlanningStepSectionMetadata implements IBotPlanningStepSectionMetadata {

                /**
                 * Constructs a new BotPlanningStepSectionMetadata.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata);

                /** BotPlanningStepSectionMetadata sectionTitle. */
                public sectionTitle?: (string|null);

                /** BotPlanningStepSectionMetadata sectionBody. */
                public sectionBody?: (string|null);

                /** BotPlanningStepSectionMetadata sourcesMetadata. */
                public sourcesMetadata: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningSearchSourceMetadata[];

                /**
                 * Creates a new BotPlanningStepSectionMetadata instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BotPlanningStepSectionMetadata instance
                 */
                public static create(properties?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;

                /**
                 * Encodes the specified BotPlanningStepSectionMetadata message. Does not implicitly {@link AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.verify|verify} messages.
                 * @param message BotPlanningStepSectionMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BotPlanningStepSectionMetadata message, length delimited. Does not implicitly {@link AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.verify|verify} messages.
                 * @param message BotPlanningStepSectionMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.IBotPlanningStepSectionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BotPlanningStepSectionMetadata message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BotPlanningStepSectionMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;

                /**
                 * Decodes a BotPlanningStepSectionMetadata message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BotPlanningStepSectionMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;

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
                public static fromObject(object: { [k: string]: any }): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;

                /**
                 * Creates a plain object from a BotPlanningStepSectionMetadata message. Also converts values to other types if specified.
                 * @param message BotPlanningStepSectionMetadata
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        modelType?: (AICommon.BotModelMetadata.ModelType|null);

        /** BotModelMetadata premiumModelStatus */
        premiumModelStatus?: (AICommon.BotModelMetadata.PremiumModelStatus|null);

        /** BotModelMetadata modelNameOverride */
        modelNameOverride?: (string|null);
    }

    /** Represents a BotModelMetadata. */
    class BotModelMetadata implements IBotModelMetadata {

        /**
         * Constructs a new BotModelMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotModelMetadata);

        /** BotModelMetadata modelType. */
        public modelType?: (AICommon.BotModelMetadata.ModelType|null);

        /** BotModelMetadata premiumModelStatus. */
        public premiumModelStatus?: (AICommon.BotModelMetadata.PremiumModelStatus|null);

        /** BotModelMetadata modelNameOverride. */
        public modelNameOverride?: (string|null);

        /**
         * Creates a new BotModelMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotModelMetadata instance
         */
        public static create(properties?: AICommon.IBotModelMetadata): AICommon.BotModelMetadata;

        /**
         * Encodes the specified BotModelMetadata message. Does not implicitly {@link AICommon.BotModelMetadata.verify|verify} messages.
         * @param message BotModelMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotModelMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotModelMetadata message, length delimited. Does not implicitly {@link AICommon.BotModelMetadata.verify|verify} messages.
         * @param message BotModelMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotModelMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotModelMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotModelMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotModelMetadata;

        /**
         * Decodes a BotModelMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotModelMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotModelMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotModelMetadata;

        /**
         * Creates a plain object from a BotModelMetadata message. Also converts values to other types if specified.
         * @param message BotModelMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotModelMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        action?: (AICommon.BotReminderMetadata.ReminderAction|null);

        /** BotReminderMetadata name */
        name?: (string|null);

        /** BotReminderMetadata nextTriggerTimestamp */
        nextTriggerTimestamp?: (number|Long|null);

        /** BotReminderMetadata frequency */
        frequency?: (AICommon.BotReminderMetadata.ReminderFrequency|null);
    }

    /** Represents a BotReminderMetadata. */
    class BotReminderMetadata implements IBotReminderMetadata {

        /**
         * Constructs a new BotReminderMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotReminderMetadata);

        /** BotReminderMetadata requestMessageKey. */
        public requestMessageKey?: (Protocol.IMessageKey|null);

        /** BotReminderMetadata action. */
        public action?: (AICommon.BotReminderMetadata.ReminderAction|null);

        /** BotReminderMetadata name. */
        public name?: (string|null);

        /** BotReminderMetadata nextTriggerTimestamp. */
        public nextTriggerTimestamp?: (number|Long|null);

        /** BotReminderMetadata frequency. */
        public frequency?: (AICommon.BotReminderMetadata.ReminderFrequency|null);

        /**
         * Creates a new BotReminderMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotReminderMetadata instance
         */
        public static create(properties?: AICommon.IBotReminderMetadata): AICommon.BotReminderMetadata;

        /**
         * Encodes the specified BotReminderMetadata message. Does not implicitly {@link AICommon.BotReminderMetadata.verify|verify} messages.
         * @param message BotReminderMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotReminderMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotReminderMetadata message, length delimited. Does not implicitly {@link AICommon.BotReminderMetadata.verify|verify} messages.
         * @param message BotReminderMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotReminderMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotReminderMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotReminderMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotReminderMetadata;

        /**
         * Decodes a BotReminderMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotReminderMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotReminderMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotReminderMetadata;

        /**
         * Creates a plain object from a BotReminderMetadata message. Also converts values to other types if specified.
         * @param message BotReminderMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotReminderMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        faceImages?: (AICommon.IBotMediaMetadata[]|null);
    }

    /** Represents a BotMemuMetadata. */
    class BotMemuMetadata implements IBotMemuMetadata {

        /**
         * Constructs a new BotMemuMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotMemuMetadata);

        /** BotMemuMetadata faceImages. */
        public faceImages: AICommon.IBotMediaMetadata[];

        /**
         * Creates a new BotMemuMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMemuMetadata instance
         */
        public static create(properties?: AICommon.IBotMemuMetadata): AICommon.BotMemuMetadata;

        /**
         * Encodes the specified BotMemuMetadata message. Does not implicitly {@link AICommon.BotMemuMetadata.verify|verify} messages.
         * @param message BotMemuMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotMemuMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMemuMetadata message, length delimited. Does not implicitly {@link AICommon.BotMemuMetadata.verify|verify} messages.
         * @param message BotMemuMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotMemuMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMemuMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMemuMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotMemuMetadata;

        /**
         * Decodes a BotMemuMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMemuMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotMemuMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotMemuMetadata;

        /**
         * Creates a plain object from a BotMemuMetadata message. Also converts values to other types if specified.
         * @param message BotMemuMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotMemuMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        orientationType?: (AICommon.BotMediaMetadata.OrientationType|null);
    }

    /** Represents a BotMediaMetadata. */
    class BotMediaMetadata implements IBotMediaMetadata {

        /**
         * Constructs a new BotMediaMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotMediaMetadata);

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
        public orientationType?: (AICommon.BotMediaMetadata.OrientationType|null);

        /**
         * Creates a new BotMediaMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMediaMetadata instance
         */
        public static create(properties?: AICommon.IBotMediaMetadata): AICommon.BotMediaMetadata;

        /**
         * Encodes the specified BotMediaMetadata message. Does not implicitly {@link AICommon.BotMediaMetadata.verify|verify} messages.
         * @param message BotMediaMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotMediaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMediaMetadata message, length delimited. Does not implicitly {@link AICommon.BotMediaMetadata.verify|verify} messages.
         * @param message BotMediaMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotMediaMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMediaMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMediaMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotMediaMetadata;

        /**
         * Decodes a BotMediaMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMediaMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotMediaMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotMediaMetadata;

        /**
         * Creates a plain object from a BotMediaMetadata message. Also converts values to other types if specified.
         * @param message BotMediaMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotMediaMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        sessionSource?: (AICommon.BotSessionSource|null);
    }

    /** Represents a BotSessionMetadata. */
    class BotSessionMetadata implements IBotSessionMetadata {

        /**
         * Constructs a new BotSessionMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotSessionMetadata);

        /** BotSessionMetadata sessionId. */
        public sessionId?: (string|null);

        /** BotSessionMetadata sessionSource. */
        public sessionSource?: (AICommon.BotSessionSource|null);

        /**
         * Creates a new BotSessionMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotSessionMetadata instance
         */
        public static create(properties?: AICommon.IBotSessionMetadata): AICommon.BotSessionMetadata;

        /**
         * Encodes the specified BotSessionMetadata message. Does not implicitly {@link AICommon.BotSessionMetadata.verify|verify} messages.
         * @param message BotSessionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotSessionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotSessionMetadata message, length delimited. Does not implicitly {@link AICommon.BotSessionMetadata.verify|verify} messages.
         * @param message BotSessionMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotSessionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotSessionMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotSessionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotSessionMetadata;

        /**
         * Decodes a BotSessionMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotSessionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotSessionMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotSessionMetadata;

        /**
         * Creates a plain object from a BotSessionMetadata message. Also converts values to other types if specified.
         * @param message BotSessionMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotSessionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        destinationEntryPoint?: (AICommon.BotMetricsEntryPoint|null);

        /** BotMetricsMetadata threadOrigin */
        threadOrigin?: (AICommon.BotMetricsThreadEntryPoint|null);
    }

    /** Represents a BotMetricsMetadata. */
    class BotMetricsMetadata implements IBotMetricsMetadata {

        /**
         * Constructs a new BotMetricsMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotMetricsMetadata);

        /** BotMetricsMetadata destinationId. */
        public destinationId?: (string|null);

        /** BotMetricsMetadata destinationEntryPoint. */
        public destinationEntryPoint?: (AICommon.BotMetricsEntryPoint|null);

        /** BotMetricsMetadata threadOrigin. */
        public threadOrigin?: (AICommon.BotMetricsThreadEntryPoint|null);

        /**
         * Creates a new BotMetricsMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMetricsMetadata instance
         */
        public static create(properties?: AICommon.IBotMetricsMetadata): AICommon.BotMetricsMetadata;

        /**
         * Encodes the specified BotMetricsMetadata message. Does not implicitly {@link AICommon.BotMetricsMetadata.verify|verify} messages.
         * @param message BotMetricsMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotMetricsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMetricsMetadata message, length delimited. Does not implicitly {@link AICommon.BotMetricsMetadata.verify|verify} messages.
         * @param message BotMetricsMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotMetricsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMetricsMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMetricsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotMetricsMetadata;

        /**
         * Decodes a BotMetricsMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMetricsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotMetricsMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotMetricsMetadata;

        /**
         * Creates a plain object from a BotMetricsMetadata message. Also converts values to other types if specified.
         * @param message BotMetricsMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotMetricsMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        keywords?: (AICommon.BotRenderingMetadata.IKeyword[]|null);
    }

    /** Represents a BotRenderingMetadata. */
    class BotRenderingMetadata implements IBotRenderingMetadata {

        /**
         * Constructs a new BotRenderingMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotRenderingMetadata);

        /** BotRenderingMetadata keywords. */
        public keywords: AICommon.BotRenderingMetadata.IKeyword[];

        /**
         * Creates a new BotRenderingMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotRenderingMetadata instance
         */
        public static create(properties?: AICommon.IBotRenderingMetadata): AICommon.BotRenderingMetadata;

        /**
         * Encodes the specified BotRenderingMetadata message. Does not implicitly {@link AICommon.BotRenderingMetadata.verify|verify} messages.
         * @param message BotRenderingMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotRenderingMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotRenderingMetadata message, length delimited. Does not implicitly {@link AICommon.BotRenderingMetadata.verify|verify} messages.
         * @param message BotRenderingMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotRenderingMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotRenderingMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotRenderingMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotRenderingMetadata;

        /**
         * Decodes a BotRenderingMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotRenderingMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotRenderingMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotRenderingMetadata;

        /**
         * Creates a plain object from a BotRenderingMetadata message. Also converts values to other types if specified.
         * @param message BotRenderingMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotRenderingMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            constructor(properties?: AICommon.BotRenderingMetadata.IKeyword);

            /** Keyword value. */
            public value?: (string|null);

            /** Keyword associatedPrompts. */
            public associatedPrompts: string[];

            /**
             * Creates a new Keyword instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Keyword instance
             */
            public static create(properties?: AICommon.BotRenderingMetadata.IKeyword): AICommon.BotRenderingMetadata.Keyword;

            /**
             * Encodes the specified Keyword message. Does not implicitly {@link AICommon.BotRenderingMetadata.Keyword.verify|verify} messages.
             * @param message Keyword message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: AICommon.BotRenderingMetadata.IKeyword, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Keyword message, length delimited. Does not implicitly {@link AICommon.BotRenderingMetadata.Keyword.verify|verify} messages.
             * @param message Keyword message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: AICommon.BotRenderingMetadata.IKeyword, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Keyword message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Keyword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotRenderingMetadata.Keyword;

            /**
             * Decodes a Keyword message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Keyword
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotRenderingMetadata.Keyword;

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
            public static fromObject(object: { [k: string]: any }): AICommon.BotRenderingMetadata.Keyword;

            /**
             * Creates a plain object from a Keyword message. Also converts values to other types if specified.
             * @param message Keyword
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: AICommon.BotRenderingMetadata.Keyword, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        promotionType?: (AICommon.BotPromotionMessageMetadata.BotPromotionType|null);

        /** BotPromotionMessageMetadata buttonTitle */
        buttonTitle?: (string|null);
    }

    /** Represents a BotPromotionMessageMetadata. */
    class BotPromotionMessageMetadata implements IBotPromotionMessageMetadata {

        /**
         * Constructs a new BotPromotionMessageMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotPromotionMessageMetadata);

        /** BotPromotionMessageMetadata promotionType. */
        public promotionType?: (AICommon.BotPromotionMessageMetadata.BotPromotionType|null);

        /** BotPromotionMessageMetadata buttonTitle. */
        public buttonTitle?: (string|null);

        /**
         * Creates a new BotPromotionMessageMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotPromotionMessageMetadata instance
         */
        public static create(properties?: AICommon.IBotPromotionMessageMetadata): AICommon.BotPromotionMessageMetadata;

        /**
         * Encodes the specified BotPromotionMessageMetadata message. Does not implicitly {@link AICommon.BotPromotionMessageMetadata.verify|verify} messages.
         * @param message BotPromotionMessageMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotPromotionMessageMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotPromotionMessageMetadata message, length delimited. Does not implicitly {@link AICommon.BotPromotionMessageMetadata.verify|verify} messages.
         * @param message BotPromotionMessageMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotPromotionMessageMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotPromotionMessageMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotPromotionMessageMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotPromotionMessageMetadata;

        /**
         * Decodes a BotPromotionMessageMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotPromotionMessageMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotPromotionMessageMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotPromotionMessageMetadata;

        /**
         * Creates a plain object from a BotPromotionMessageMetadata message. Also converts values to other types if specified.
         * @param message BotPromotionMessageMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotPromotionMessageMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        useCase?: (AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase|null);

        /** BotSignatureVerificationUseCaseProof signature */
        signature?: (Uint8Array|null);

        /** BotSignatureVerificationUseCaseProof certificateChain */
        certificateChain?: (Uint8Array[]|null);
    }

    /** Represents a BotSignatureVerificationUseCaseProof. */
    class BotSignatureVerificationUseCaseProof implements IBotSignatureVerificationUseCaseProof {

        /**
         * Constructs a new BotSignatureVerificationUseCaseProof.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotSignatureVerificationUseCaseProof);

        /** BotSignatureVerificationUseCaseProof version. */
        public version?: (number|null);

        /** BotSignatureVerificationUseCaseProof useCase. */
        public useCase?: (AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase|null);

        /** BotSignatureVerificationUseCaseProof signature. */
        public signature?: (Uint8Array|null);

        /** BotSignatureVerificationUseCaseProof certificateChain. */
        public certificateChain: Uint8Array[];

        /**
         * Creates a new BotSignatureVerificationUseCaseProof instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotSignatureVerificationUseCaseProof instance
         */
        public static create(properties?: AICommon.IBotSignatureVerificationUseCaseProof): AICommon.BotSignatureVerificationUseCaseProof;

        /**
         * Encodes the specified BotSignatureVerificationUseCaseProof message. Does not implicitly {@link AICommon.BotSignatureVerificationUseCaseProof.verify|verify} messages.
         * @param message BotSignatureVerificationUseCaseProof message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotSignatureVerificationUseCaseProof, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotSignatureVerificationUseCaseProof message, length delimited. Does not implicitly {@link AICommon.BotSignatureVerificationUseCaseProof.verify|verify} messages.
         * @param message BotSignatureVerificationUseCaseProof message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotSignatureVerificationUseCaseProof, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotSignatureVerificationUseCaseProof message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotSignatureVerificationUseCaseProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotSignatureVerificationUseCaseProof;

        /**
         * Decodes a BotSignatureVerificationUseCaseProof message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotSignatureVerificationUseCaseProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotSignatureVerificationUseCaseProof;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotSignatureVerificationUseCaseProof;

        /**
         * Creates a plain object from a BotSignatureVerificationUseCaseProof message. Also converts values to other types if specified.
         * @param message BotSignatureVerificationUseCaseProof
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotSignatureVerificationUseCaseProof, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            UNSPECIFIED = 0,
            WA_BOT_MSG = 1,
            WA_TEE_BOT_MSG = 2
        }
    }

    /** Properties of a BotSignatureVerificationMetadata. */
    interface IBotSignatureVerificationMetadata {

        /** BotSignatureVerificationMetadata proofs */
        proofs?: (AICommon.IBotSignatureVerificationUseCaseProof[]|null);
    }

    /** Represents a BotSignatureVerificationMetadata. */
    class BotSignatureVerificationMetadata implements IBotSignatureVerificationMetadata {

        /**
         * Constructs a new BotSignatureVerificationMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotSignatureVerificationMetadata);

        /** BotSignatureVerificationMetadata proofs. */
        public proofs: AICommon.IBotSignatureVerificationUseCaseProof[];

        /**
         * Creates a new BotSignatureVerificationMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotSignatureVerificationMetadata instance
         */
        public static create(properties?: AICommon.IBotSignatureVerificationMetadata): AICommon.BotSignatureVerificationMetadata;

        /**
         * Encodes the specified BotSignatureVerificationMetadata message. Does not implicitly {@link AICommon.BotSignatureVerificationMetadata.verify|verify} messages.
         * @param message BotSignatureVerificationMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotSignatureVerificationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotSignatureVerificationMetadata message, length delimited. Does not implicitly {@link AICommon.BotSignatureVerificationMetadata.verify|verify} messages.
         * @param message BotSignatureVerificationMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotSignatureVerificationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotSignatureVerificationMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotSignatureVerificationMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotSignatureVerificationMetadata;

        /**
         * Decodes a BotSignatureVerificationMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotSignatureVerificationMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotSignatureVerificationMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotSignatureVerificationMetadata;

        /**
         * Creates a plain object from a BotSignatureVerificationMetadata message. Also converts values to other types if specified.
         * @param message BotSignatureVerificationMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotSignatureVerificationMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: AICommon.IBotMemoryFact);

        /** BotMemoryFact fact. */
        public fact?: (string|null);

        /** BotMemoryFact factId. */
        public factId?: (string|null);

        /**
         * Creates a new BotMemoryFact instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMemoryFact instance
         */
        public static create(properties?: AICommon.IBotMemoryFact): AICommon.BotMemoryFact;

        /**
         * Encodes the specified BotMemoryFact message. Does not implicitly {@link AICommon.BotMemoryFact.verify|verify} messages.
         * @param message BotMemoryFact message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotMemoryFact, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMemoryFact message, length delimited. Does not implicitly {@link AICommon.BotMemoryFact.verify|verify} messages.
         * @param message BotMemoryFact message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotMemoryFact, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMemoryFact message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMemoryFact
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotMemoryFact;

        /**
         * Decodes a BotMemoryFact message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMemoryFact
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotMemoryFact;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotMemoryFact;

        /**
         * Creates a plain object from a BotMemoryFact message. Also converts values to other types if specified.
         * @param message BotMemoryFact
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotMemoryFact, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        addedFacts?: (AICommon.IBotMemoryFact[]|null);

        /** BotMemoryMetadata removedFacts */
        removedFacts?: (AICommon.IBotMemoryFact[]|null);

        /** BotMemoryMetadata disclaimer */
        disclaimer?: (string|null);
    }

    /** Represents a BotMemoryMetadata. */
    class BotMemoryMetadata implements IBotMemoryMetadata {

        /**
         * Constructs a new BotMemoryMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotMemoryMetadata);

        /** BotMemoryMetadata addedFacts. */
        public addedFacts: AICommon.IBotMemoryFact[];

        /** BotMemoryMetadata removedFacts. */
        public removedFacts: AICommon.IBotMemoryFact[];

        /** BotMemoryMetadata disclaimer. */
        public disclaimer?: (string|null);

        /**
         * Creates a new BotMemoryMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotMemoryMetadata instance
         */
        public static create(properties?: AICommon.IBotMemoryMetadata): AICommon.BotMemoryMetadata;

        /**
         * Encodes the specified BotMemoryMetadata message. Does not implicitly {@link AICommon.BotMemoryMetadata.verify|verify} messages.
         * @param message BotMemoryMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotMemoryMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotMemoryMetadata message, length delimited. Does not implicitly {@link AICommon.BotMemoryMetadata.verify|verify} messages.
         * @param message BotMemoryMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotMemoryMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotMemoryMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotMemoryMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotMemoryMetadata;

        /**
         * Decodes a BotMemoryMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotMemoryMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotMemoryMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotMemoryMetadata;

        /**
         * Creates a plain object from a BotMemoryMetadata message. Also converts values to other types if specified.
         * @param message BotMemoryMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotMemoryMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        type?: (AICommon.BotLinkedAccount.BotLinkedAccountType|null);
    }

    /** Represents a BotLinkedAccount. */
    class BotLinkedAccount implements IBotLinkedAccount {

        /**
         * Constructs a new BotLinkedAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotLinkedAccount);

        /** BotLinkedAccount type. */
        public type?: (AICommon.BotLinkedAccount.BotLinkedAccountType|null);

        /**
         * Creates a new BotLinkedAccount instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotLinkedAccount instance
         */
        public static create(properties?: AICommon.IBotLinkedAccount): AICommon.BotLinkedAccount;

        /**
         * Encodes the specified BotLinkedAccount message. Does not implicitly {@link AICommon.BotLinkedAccount.verify|verify} messages.
         * @param message BotLinkedAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotLinkedAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotLinkedAccount message, length delimited. Does not implicitly {@link AICommon.BotLinkedAccount.verify|verify} messages.
         * @param message BotLinkedAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotLinkedAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotLinkedAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotLinkedAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotLinkedAccount;

        /**
         * Decodes a BotLinkedAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotLinkedAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotLinkedAccount;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotLinkedAccount;

        /**
         * Creates a plain object from a BotLinkedAccount message. Also converts values to other types if specified.
         * @param message BotLinkedAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotLinkedAccount, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        accounts?: (AICommon.IBotLinkedAccount[]|null);

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
        constructor(properties?: AICommon.IBotLinkedAccountsMetadata);

        /** BotLinkedAccountsMetadata accounts. */
        public accounts: AICommon.IBotLinkedAccount[];

        /** BotLinkedAccountsMetadata acAuthTokens. */
        public acAuthTokens?: (Uint8Array|null);

        /** BotLinkedAccountsMetadata acErrorCode. */
        public acErrorCode?: (number|null);

        /**
         * Creates a new BotLinkedAccountsMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotLinkedAccountsMetadata instance
         */
        public static create(properties?: AICommon.IBotLinkedAccountsMetadata): AICommon.BotLinkedAccountsMetadata;

        /**
         * Encodes the specified BotLinkedAccountsMetadata message. Does not implicitly {@link AICommon.BotLinkedAccountsMetadata.verify|verify} messages.
         * @param message BotLinkedAccountsMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotLinkedAccountsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotLinkedAccountsMetadata message, length delimited. Does not implicitly {@link AICommon.BotLinkedAccountsMetadata.verify|verify} messages.
         * @param message BotLinkedAccountsMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotLinkedAccountsMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotLinkedAccountsMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotLinkedAccountsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotLinkedAccountsMetadata;

        /**
         * Decodes a BotLinkedAccountsMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotLinkedAccountsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotLinkedAccountsMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotLinkedAccountsMetadata;

        /**
         * Creates a plain object from a BotLinkedAccountsMetadata message. Also converts values to other types if specified.
         * @param message BotLinkedAccountsMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotLinkedAccountsMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: AICommon.IBotPromptSuggestion);

        /** BotPromptSuggestion prompt. */
        public prompt?: (string|null);

        /** BotPromptSuggestion promptId. */
        public promptId?: (string|null);

        /**
         * Creates a new BotPromptSuggestion instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotPromptSuggestion instance
         */
        public static create(properties?: AICommon.IBotPromptSuggestion): AICommon.BotPromptSuggestion;

        /**
         * Encodes the specified BotPromptSuggestion message. Does not implicitly {@link AICommon.BotPromptSuggestion.verify|verify} messages.
         * @param message BotPromptSuggestion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotPromptSuggestion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotPromptSuggestion message, length delimited. Does not implicitly {@link AICommon.BotPromptSuggestion.verify|verify} messages.
         * @param message BotPromptSuggestion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotPromptSuggestion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotPromptSuggestion message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotPromptSuggestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotPromptSuggestion;

        /**
         * Decodes a BotPromptSuggestion message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotPromptSuggestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotPromptSuggestion;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotPromptSuggestion;

        /**
         * Creates a plain object from a BotPromptSuggestion message. Also converts values to other types if specified.
         * @param message BotPromptSuggestion
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotPromptSuggestion, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        suggestions?: (AICommon.IBotPromptSuggestion[]|null);
    }

    /** Represents a BotPromptSuggestions. */
    class BotPromptSuggestions implements IBotPromptSuggestions {

        /**
         * Constructs a new BotPromptSuggestions.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotPromptSuggestions);

        /** BotPromptSuggestions suggestions. */
        public suggestions: AICommon.IBotPromptSuggestion[];

        /**
         * Creates a new BotPromptSuggestions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotPromptSuggestions instance
         */
        public static create(properties?: AICommon.IBotPromptSuggestions): AICommon.BotPromptSuggestions;

        /**
         * Encodes the specified BotPromptSuggestions message. Does not implicitly {@link AICommon.BotPromptSuggestions.verify|verify} messages.
         * @param message BotPromptSuggestions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotPromptSuggestions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotPromptSuggestions message, length delimited. Does not implicitly {@link AICommon.BotPromptSuggestions.verify|verify} messages.
         * @param message BotPromptSuggestions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotPromptSuggestions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotPromptSuggestions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotPromptSuggestions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotPromptSuggestions;

        /**
         * Decodes a BotPromptSuggestions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotPromptSuggestions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotPromptSuggestions;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotPromptSuggestions;

        /**
         * Creates a plain object from a BotPromptSuggestions message. Also converts values to other types if specified.
         * @param message BotPromptSuggestions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotPromptSuggestions, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        promptSuggestions?: (AICommon.IBotPromptSuggestions|null);

        /** BotSuggestedPromptMetadata selectedPromptId */
        selectedPromptId?: (string|null);
    }

    /** Represents a BotSuggestedPromptMetadata. */
    class BotSuggestedPromptMetadata implements IBotSuggestedPromptMetadata {

        /**
         * Constructs a new BotSuggestedPromptMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotSuggestedPromptMetadata);

        /** BotSuggestedPromptMetadata suggestedPrompts. */
        public suggestedPrompts: string[];

        /** BotSuggestedPromptMetadata selectedPromptIndex. */
        public selectedPromptIndex?: (number|null);

        /** BotSuggestedPromptMetadata promptSuggestions. */
        public promptSuggestions?: (AICommon.IBotPromptSuggestions|null);

        /** BotSuggestedPromptMetadata selectedPromptId. */
        public selectedPromptId?: (string|null);

        /**
         * Creates a new BotSuggestedPromptMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotSuggestedPromptMetadata instance
         */
        public static create(properties?: AICommon.IBotSuggestedPromptMetadata): AICommon.BotSuggestedPromptMetadata;

        /**
         * Encodes the specified BotSuggestedPromptMetadata message. Does not implicitly {@link AICommon.BotSuggestedPromptMetadata.verify|verify} messages.
         * @param message BotSuggestedPromptMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotSuggestedPromptMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotSuggestedPromptMetadata message, length delimited. Does not implicitly {@link AICommon.BotSuggestedPromptMetadata.verify|verify} messages.
         * @param message BotSuggestedPromptMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotSuggestedPromptMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotSuggestedPromptMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotSuggestedPromptMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotSuggestedPromptMetadata;

        /**
         * Decodes a BotSuggestedPromptMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotSuggestedPromptMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotSuggestedPromptMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotSuggestedPromptMetadata;

        /**
         * Creates a plain object from a BotSuggestedPromptMetadata message. Also converts values to other types if specified.
         * @param message BotSuggestedPromptMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotSuggestedPromptMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        provider?: (AICommon.BotPluginMetadata.SearchProvider|null);

        /** BotPluginMetadata pluginType */
        pluginType?: (AICommon.BotPluginMetadata.PluginType|null);

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
        deprecatedField?: (AICommon.BotPluginMetadata.PluginType|null);

        /** BotPluginMetadata parentPluginType */
        parentPluginType?: (AICommon.BotPluginMetadata.PluginType|null);

        /** BotPluginMetadata faviconCdnUrl */
        faviconCdnUrl?: (string|null);
    }

    /** Represents a BotPluginMetadata. */
    class BotPluginMetadata implements IBotPluginMetadata {

        /**
         * Constructs a new BotPluginMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: AICommon.IBotPluginMetadata);

        /** BotPluginMetadata provider. */
        public provider?: (AICommon.BotPluginMetadata.SearchProvider|null);

        /** BotPluginMetadata pluginType. */
        public pluginType?: (AICommon.BotPluginMetadata.PluginType|null);

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
        public deprecatedField?: (AICommon.BotPluginMetadata.PluginType|null);

        /** BotPluginMetadata parentPluginType. */
        public parentPluginType?: (AICommon.BotPluginMetadata.PluginType|null);

        /** BotPluginMetadata faviconCdnUrl. */
        public faviconCdnUrl?: (string|null);

        /**
         * Creates a new BotPluginMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BotPluginMetadata instance
         */
        public static create(properties?: AICommon.IBotPluginMetadata): AICommon.BotPluginMetadata;

        /**
         * Encodes the specified BotPluginMetadata message. Does not implicitly {@link AICommon.BotPluginMetadata.verify|verify} messages.
         * @param message BotPluginMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AICommon.IBotPluginMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BotPluginMetadata message, length delimited. Does not implicitly {@link AICommon.BotPluginMetadata.verify|verify} messages.
         * @param message BotPluginMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AICommon.IBotPluginMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BotPluginMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BotPluginMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AICommon.BotPluginMetadata;

        /**
         * Decodes a BotPluginMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BotPluginMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AICommon.BotPluginMetadata;

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
        public static fromObject(object: { [k: string]: any }): AICommon.BotPluginMetadata;

        /**
         * Creates a plain object from a BotPluginMetadata message. Also converts values to other types if specified.
         * @param message BotPluginMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AICommon.BotPluginMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

    /** SessionTransparencyType enum. */
    enum SessionTransparencyType {
        UNKNOWN_TYPE = 0,
        NY_AI_SAFETY_DISCLAIMER = 1
    }

    /** BotSessionSource enum. */
    enum BotSessionSource {
        NONE = 0,
        NULL_STATE = 1,
        TYPEAHEAD = 2,
        USER_INPUT = 3,
        EMU_FLASH = 4,
        EMU_FLASH_FOLLOWUP = 5,
        VOICE = 6,
        AI_HOME_SESSION = 7
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
        UNDEFINED_ENTRY_POINT = 0,
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
        META_AI_FORWARD = 31,
        NEW_CHAT_AI_CONTACT = 32,
        MESSAGE_QUICK_ACTION_1_ON_1_CHAT = 33,
        MESSAGE_QUICK_ACTION_GROUP_CHAT = 34,
        ATTACHMENT_TRAY_1_ON_1_CHAT = 35,
        ATTACHMENT_TRAY_GROUP_CHAT = 36,
        ASK_META_AI_MEDIA_VIEWER_1ON1 = 37,
        ASK_META_AI_MEDIA_VIEWER_GROUP = 38,
        MEDIA_PICKER_1_ON_1_CHAT = 39,
        MEDIA_PICKER_GROUP_CHAT = 40,
        ASK_META_AI_NO_SEARCH_RESULTS = 41,
        META_AI_SETTINGS = 45,
        WEB_INTRO_PANEL = 46,
        WEB_NAVIGATION_BAR = 47,
        GROUP_MEMBER = 54,
        CHATLIST_SEARCH = 55,
        NEW_CHAT_LIST = 56
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
