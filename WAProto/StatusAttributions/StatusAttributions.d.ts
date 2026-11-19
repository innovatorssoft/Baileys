import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace StatusAttributions. */
export namespace StatusAttributions {

    /** Properties of a StatusAttribution. */
    interface IStatusAttribution {

        /** StatusAttribution type */
        type?: (StatusAttributions.StatusAttribution.Type|null);

        /** StatusAttribution actionUrl */
        actionUrl?: (string|null);

        /** StatusAttribution statusReshare */
        statusReshare?: (StatusAttributions.StatusAttribution.IStatusReshare|null);

        /** StatusAttribution externalShare */
        externalShare?: (StatusAttributions.StatusAttribution.IExternalShare|null);

        /** StatusAttribution music */
        music?: (StatusAttributions.StatusAttribution.IMusic|null);

        /** StatusAttribution groupStatus */
        groupStatus?: (StatusAttributions.StatusAttribution.IGroupStatus|null);

        /** StatusAttribution rlAttribution */
        rlAttribution?: (StatusAttributions.StatusAttribution.IRLAttribution|null);

        /** StatusAttribution aiCreatedAttribution */
        aiCreatedAttribution?: (StatusAttributions.StatusAttribution.IAiCreatedAttribution|null);

        /** StatusAttribution statusTemplate */
        statusTemplate?: (StatusAttributions.StatusAttribution.IStatusTemplate|null);
    }

    /** Represents a StatusAttribution. */
    class StatusAttribution implements IStatusAttribution {

        /**
         * Constructs a new StatusAttribution.
         * @param [properties] Properties to set
         */
        constructor(properties?: StatusAttributions.IStatusAttribution);

        /** StatusAttribution type. */
        public type?: (StatusAttributions.StatusAttribution.Type|null);

        /** StatusAttribution actionUrl. */
        public actionUrl?: (string|null);

        /** StatusAttribution statusReshare. */
        public statusReshare?: (StatusAttributions.StatusAttribution.IStatusReshare|null);

        /** StatusAttribution externalShare. */
        public externalShare?: (StatusAttributions.StatusAttribution.IExternalShare|null);

        /** StatusAttribution music. */
        public music?: (StatusAttributions.StatusAttribution.IMusic|null);

        /** StatusAttribution groupStatus. */
        public groupStatus?: (StatusAttributions.StatusAttribution.IGroupStatus|null);

        /** StatusAttribution rlAttribution. */
        public rlAttribution?: (StatusAttributions.StatusAttribution.IRLAttribution|null);

        /** StatusAttribution aiCreatedAttribution. */
        public aiCreatedAttribution?: (StatusAttributions.StatusAttribution.IAiCreatedAttribution|null);

        /** StatusAttribution statusTemplate. */
        public statusTemplate?: (StatusAttributions.StatusAttribution.IStatusTemplate|null);

        /** StatusAttribution attributionData. */
        public attributionData?: ("statusReshare"|"externalShare"|"music"|"groupStatus"|"rlAttribution"|"aiCreatedAttribution"|"statusTemplate");

        /**
         * Creates a new StatusAttribution instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StatusAttribution instance
         */
        public static create(properties?: StatusAttributions.IStatusAttribution): StatusAttributions.StatusAttribution;

        /**
         * Encodes the specified StatusAttribution message. Does not implicitly {@link StatusAttributions.StatusAttribution.verify|verify} messages.
         * @param message StatusAttribution message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: StatusAttributions.IStatusAttribution, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StatusAttribution message, length delimited. Does not implicitly {@link StatusAttributions.StatusAttribution.verify|verify} messages.
         * @param message StatusAttribution message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: StatusAttributions.IStatusAttribution, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StatusAttribution message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StatusAttribution
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StatusAttributions.StatusAttribution;

        /**
         * Decodes a StatusAttribution message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StatusAttribution
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StatusAttributions.StatusAttribution;

        /**
         * Verifies a StatusAttribution message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StatusAttribution message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StatusAttribution
         */
        public static fromObject(object: { [k: string]: any }): StatusAttributions.StatusAttribution;

        /**
         * Creates a plain object from a StatusAttribution message. Also converts values to other types if specified.
         * @param message StatusAttribution
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: StatusAttributions.StatusAttribution, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StatusAttribution to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StatusAttribution
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace StatusAttribution {

        /** Properties of an AiCreatedAttribution. */
        interface IAiCreatedAttribution {

            /** AiCreatedAttribution source */
            source?: (StatusAttributions.StatusAttribution.AiCreatedAttribution.Source|null);
        }

        /** Represents an AiCreatedAttribution. */
        class AiCreatedAttribution implements IAiCreatedAttribution {

            /**
             * Constructs a new AiCreatedAttribution.
             * @param [properties] Properties to set
             */
            constructor(properties?: StatusAttributions.StatusAttribution.IAiCreatedAttribution);

            /** AiCreatedAttribution source. */
            public source?: (StatusAttributions.StatusAttribution.AiCreatedAttribution.Source|null);

            /**
             * Creates a new AiCreatedAttribution instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AiCreatedAttribution instance
             */
            public static create(properties?: StatusAttributions.StatusAttribution.IAiCreatedAttribution): StatusAttributions.StatusAttribution.AiCreatedAttribution;

            /**
             * Encodes the specified AiCreatedAttribution message. Does not implicitly {@link StatusAttributions.StatusAttribution.AiCreatedAttribution.verify|verify} messages.
             * @param message AiCreatedAttribution message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: StatusAttributions.StatusAttribution.IAiCreatedAttribution, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AiCreatedAttribution message, length delimited. Does not implicitly {@link StatusAttributions.StatusAttribution.AiCreatedAttribution.verify|verify} messages.
             * @param message AiCreatedAttribution message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: StatusAttributions.StatusAttribution.IAiCreatedAttribution, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AiCreatedAttribution message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AiCreatedAttribution
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StatusAttributions.StatusAttribution.AiCreatedAttribution;

            /**
             * Decodes an AiCreatedAttribution message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AiCreatedAttribution
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StatusAttributions.StatusAttribution.AiCreatedAttribution;

            /**
             * Verifies an AiCreatedAttribution message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AiCreatedAttribution message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AiCreatedAttribution
             */
            public static fromObject(object: { [k: string]: any }): StatusAttributions.StatusAttribution.AiCreatedAttribution;

            /**
             * Creates a plain object from an AiCreatedAttribution message. Also converts values to other types if specified.
             * @param message AiCreatedAttribution
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: StatusAttributions.StatusAttribution.AiCreatedAttribution, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AiCreatedAttribution to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AiCreatedAttribution
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace AiCreatedAttribution {

            /** Source enum. */
            enum Source {
                UNKNOWN = 0,
                STATUS_MIMICRY = 1
            }
        }

        /** Properties of an ExternalShare. */
        interface IExternalShare {

            /** ExternalShare actionUrl */
            actionUrl?: (string|null);

            /** ExternalShare source */
            source?: (StatusAttributions.StatusAttribution.ExternalShare.Source|null);

            /** ExternalShare duration */
            duration?: (number|null);

            /** ExternalShare actionFallbackUrl */
            actionFallbackUrl?: (string|null);
        }

        /** Represents an ExternalShare. */
        class ExternalShare implements IExternalShare {

            /**
             * Constructs a new ExternalShare.
             * @param [properties] Properties to set
             */
            constructor(properties?: StatusAttributions.StatusAttribution.IExternalShare);

            /** ExternalShare actionUrl. */
            public actionUrl?: (string|null);

            /** ExternalShare source. */
            public source?: (StatusAttributions.StatusAttribution.ExternalShare.Source|null);

            /** ExternalShare duration. */
            public duration?: (number|null);

            /** ExternalShare actionFallbackUrl. */
            public actionFallbackUrl?: (string|null);

            /**
             * Creates a new ExternalShare instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExternalShare instance
             */
            public static create(properties?: StatusAttributions.StatusAttribution.IExternalShare): StatusAttributions.StatusAttribution.ExternalShare;

            /**
             * Encodes the specified ExternalShare message. Does not implicitly {@link StatusAttributions.StatusAttribution.ExternalShare.verify|verify} messages.
             * @param message ExternalShare message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: StatusAttributions.StatusAttribution.IExternalShare, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExternalShare message, length delimited. Does not implicitly {@link StatusAttributions.StatusAttribution.ExternalShare.verify|verify} messages.
             * @param message ExternalShare message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: StatusAttributions.StatusAttribution.IExternalShare, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExternalShare message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExternalShare
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StatusAttributions.StatusAttribution.ExternalShare;

            /**
             * Decodes an ExternalShare message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExternalShare
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StatusAttributions.StatusAttribution.ExternalShare;

            /**
             * Verifies an ExternalShare message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExternalShare message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExternalShare
             */
            public static fromObject(object: { [k: string]: any }): StatusAttributions.StatusAttribution.ExternalShare;

            /**
             * Creates a plain object from an ExternalShare message. Also converts values to other types if specified.
             * @param message ExternalShare
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: StatusAttributions.StatusAttribution.ExternalShare, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExternalShare to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ExternalShare
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace ExternalShare {

            /** Source enum. */
            enum Source {
                UNKNOWN = 0,
                INSTAGRAM = 1,
                FACEBOOK = 2,
                MESSENGER = 3,
                SPOTIFY = 4,
                YOUTUBE = 5,
                PINTEREST = 6,
                THREADS = 7,
                APPLE_MUSIC = 8,
                SHARECHAT = 9,
                GOOGLE_PHOTOS = 10,
                SOUNDCLOUD = 11,
                SHAZAM = 12,
                PICSART = 13
            }
        }

        /** Properties of a GroupStatus. */
        interface IGroupStatus {

            /** GroupStatus authorJid */
            authorJid?: (string|null);
        }

        /** Represents a GroupStatus. */
        class GroupStatus implements IGroupStatus {

            /**
             * Constructs a new GroupStatus.
             * @param [properties] Properties to set
             */
            constructor(properties?: StatusAttributions.StatusAttribution.IGroupStatus);

            /** GroupStatus authorJid. */
            public authorJid?: (string|null);

            /**
             * Creates a new GroupStatus instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GroupStatus instance
             */
            public static create(properties?: StatusAttributions.StatusAttribution.IGroupStatus): StatusAttributions.StatusAttribution.GroupStatus;

            /**
             * Encodes the specified GroupStatus message. Does not implicitly {@link StatusAttributions.StatusAttribution.GroupStatus.verify|verify} messages.
             * @param message GroupStatus message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: StatusAttributions.StatusAttribution.IGroupStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GroupStatus message, length delimited. Does not implicitly {@link StatusAttributions.StatusAttribution.GroupStatus.verify|verify} messages.
             * @param message GroupStatus message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: StatusAttributions.StatusAttribution.IGroupStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GroupStatus message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GroupStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StatusAttributions.StatusAttribution.GroupStatus;

            /**
             * Decodes a GroupStatus message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GroupStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StatusAttributions.StatusAttribution.GroupStatus;

            /**
             * Verifies a GroupStatus message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GroupStatus message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GroupStatus
             */
            public static fromObject(object: { [k: string]: any }): StatusAttributions.StatusAttribution.GroupStatus;

            /**
             * Creates a plain object from a GroupStatus message. Also converts values to other types if specified.
             * @param message GroupStatus
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: StatusAttributions.StatusAttribution.GroupStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GroupStatus to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for GroupStatus
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Music. */
        interface IMusic {

            /** Music authorName */
            authorName?: (string|null);

            /** Music songId */
            songId?: (string|null);

            /** Music title */
            title?: (string|null);

            /** Music author */
            author?: (string|null);

            /** Music artistAttribution */
            artistAttribution?: (string|null);

            /** Music isExplicit */
            isExplicit?: (boolean|null);
        }

        /** Represents a Music. */
        class Music implements IMusic {

            /**
             * Constructs a new Music.
             * @param [properties] Properties to set
             */
            constructor(properties?: StatusAttributions.StatusAttribution.IMusic);

            /** Music authorName. */
            public authorName?: (string|null);

            /** Music songId. */
            public songId?: (string|null);

            /** Music title. */
            public title?: (string|null);

            /** Music author. */
            public author?: (string|null);

            /** Music artistAttribution. */
            public artistAttribution?: (string|null);

            /** Music isExplicit. */
            public isExplicit?: (boolean|null);

            /**
             * Creates a new Music instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Music instance
             */
            public static create(properties?: StatusAttributions.StatusAttribution.IMusic): StatusAttributions.StatusAttribution.Music;

            /**
             * Encodes the specified Music message. Does not implicitly {@link StatusAttributions.StatusAttribution.Music.verify|verify} messages.
             * @param message Music message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: StatusAttributions.StatusAttribution.IMusic, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Music message, length delimited. Does not implicitly {@link StatusAttributions.StatusAttribution.Music.verify|verify} messages.
             * @param message Music message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: StatusAttributions.StatusAttribution.IMusic, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Music message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Music
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StatusAttributions.StatusAttribution.Music;

            /**
             * Decodes a Music message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Music
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StatusAttributions.StatusAttribution.Music;

            /**
             * Verifies a Music message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Music message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Music
             */
            public static fromObject(object: { [k: string]: any }): StatusAttributions.StatusAttribution.Music;

            /**
             * Creates a plain object from a Music message. Also converts values to other types if specified.
             * @param message Music
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: StatusAttributions.StatusAttribution.Music, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Music to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Music
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RLAttribution. */
        interface IRLAttribution {

            /** RLAttribution source */
            source?: (StatusAttributions.StatusAttribution.RLAttribution.Source|null);
        }

        /** Represents a RLAttribution. */
        class RLAttribution implements IRLAttribution {

            /**
             * Constructs a new RLAttribution.
             * @param [properties] Properties to set
             */
            constructor(properties?: StatusAttributions.StatusAttribution.IRLAttribution);

            /** RLAttribution source. */
            public source?: (StatusAttributions.StatusAttribution.RLAttribution.Source|null);

            /**
             * Creates a new RLAttribution instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RLAttribution instance
             */
            public static create(properties?: StatusAttributions.StatusAttribution.IRLAttribution): StatusAttributions.StatusAttribution.RLAttribution;

            /**
             * Encodes the specified RLAttribution message. Does not implicitly {@link StatusAttributions.StatusAttribution.RLAttribution.verify|verify} messages.
             * @param message RLAttribution message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: StatusAttributions.StatusAttribution.IRLAttribution, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RLAttribution message, length delimited. Does not implicitly {@link StatusAttributions.StatusAttribution.RLAttribution.verify|verify} messages.
             * @param message RLAttribution message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: StatusAttributions.StatusAttribution.IRLAttribution, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RLAttribution message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RLAttribution
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StatusAttributions.StatusAttribution.RLAttribution;

            /**
             * Decodes a RLAttribution message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RLAttribution
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StatusAttributions.StatusAttribution.RLAttribution;

            /**
             * Verifies a RLAttribution message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RLAttribution message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RLAttribution
             */
            public static fromObject(object: { [k: string]: any }): StatusAttributions.StatusAttribution.RLAttribution;

            /**
             * Creates a plain object from a RLAttribution message. Also converts values to other types if specified.
             * @param message RLAttribution
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: StatusAttributions.StatusAttribution.RLAttribution, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RLAttribution to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RLAttribution
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace RLAttribution {

            /** Source enum. */
            enum Source {
                UNKNOWN = 0,
                RAY_BAN_META_GLASSES = 1,
                OAKLEY_META_GLASSES = 2,
                HYPERNOVA_GLASSES = 3
            }
        }

        /** Properties of a StatusReshare. */
        interface IStatusReshare {

            /** StatusReshare source */
            source?: (StatusAttributions.StatusAttribution.StatusReshare.Source|null);

            /** StatusReshare metadata */
            metadata?: (StatusAttributions.StatusAttribution.StatusReshare.IMetadata|null);
        }

        /** Represents a StatusReshare. */
        class StatusReshare implements IStatusReshare {

            /**
             * Constructs a new StatusReshare.
             * @param [properties] Properties to set
             */
            constructor(properties?: StatusAttributions.StatusAttribution.IStatusReshare);

            /** StatusReshare source. */
            public source?: (StatusAttributions.StatusAttribution.StatusReshare.Source|null);

            /** StatusReshare metadata. */
            public metadata?: (StatusAttributions.StatusAttribution.StatusReshare.IMetadata|null);

            /**
             * Creates a new StatusReshare instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StatusReshare instance
             */
            public static create(properties?: StatusAttributions.StatusAttribution.IStatusReshare): StatusAttributions.StatusAttribution.StatusReshare;

            /**
             * Encodes the specified StatusReshare message. Does not implicitly {@link StatusAttributions.StatusAttribution.StatusReshare.verify|verify} messages.
             * @param message StatusReshare message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: StatusAttributions.StatusAttribution.IStatusReshare, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StatusReshare message, length delimited. Does not implicitly {@link StatusAttributions.StatusAttribution.StatusReshare.verify|verify} messages.
             * @param message StatusReshare message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: StatusAttributions.StatusAttribution.IStatusReshare, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StatusReshare message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StatusReshare
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StatusAttributions.StatusAttribution.StatusReshare;

            /**
             * Decodes a StatusReshare message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StatusReshare
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StatusAttributions.StatusAttribution.StatusReshare;

            /**
             * Verifies a StatusReshare message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StatusReshare message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StatusReshare
             */
            public static fromObject(object: { [k: string]: any }): StatusAttributions.StatusAttribution.StatusReshare;

            /**
             * Creates a plain object from a StatusReshare message. Also converts values to other types if specified.
             * @param message StatusReshare
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: StatusAttributions.StatusAttribution.StatusReshare, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StatusReshare to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StatusReshare
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace StatusReshare {

            /** Properties of a Metadata. */
            interface IMetadata {

                /** Metadata duration */
                duration?: (number|null);

                /** Metadata channelJid */
                channelJid?: (string|null);

                /** Metadata channelMessageId */
                channelMessageId?: (number|null);

                /** Metadata hasMultipleReshares */
                hasMultipleReshares?: (boolean|null);
            }

            /** Represents a Metadata. */
            class Metadata implements IMetadata {

                /**
                 * Constructs a new Metadata.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: StatusAttributions.StatusAttribution.StatusReshare.IMetadata);

                /** Metadata duration. */
                public duration?: (number|null);

                /** Metadata channelJid. */
                public channelJid?: (string|null);

                /** Metadata channelMessageId. */
                public channelMessageId?: (number|null);

                /** Metadata hasMultipleReshares. */
                public hasMultipleReshares?: (boolean|null);

                /**
                 * Creates a new Metadata instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Metadata instance
                 */
                public static create(properties?: StatusAttributions.StatusAttribution.StatusReshare.IMetadata): StatusAttributions.StatusAttribution.StatusReshare.Metadata;

                /**
                 * Encodes the specified Metadata message. Does not implicitly {@link StatusAttributions.StatusAttribution.StatusReshare.Metadata.verify|verify} messages.
                 * @param message Metadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: StatusAttributions.StatusAttribution.StatusReshare.IMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Metadata message, length delimited. Does not implicitly {@link StatusAttributions.StatusAttribution.StatusReshare.Metadata.verify|verify} messages.
                 * @param message Metadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: StatusAttributions.StatusAttribution.StatusReshare.IMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Metadata message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Metadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StatusAttributions.StatusAttribution.StatusReshare.Metadata;

                /**
                 * Decodes a Metadata message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Metadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StatusAttributions.StatusAttribution.StatusReshare.Metadata;

                /**
                 * Verifies a Metadata message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Metadata message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Metadata
                 */
                public static fromObject(object: { [k: string]: any }): StatusAttributions.StatusAttribution.StatusReshare.Metadata;

                /**
                 * Creates a plain object from a Metadata message. Also converts values to other types if specified.
                 * @param message Metadata
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: StatusAttributions.StatusAttribution.StatusReshare.Metadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Metadata to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Metadata
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Source enum. */
            enum Source {
                UNKNOWN = 0,
                INTERNAL_RESHARE = 1,
                MENTION_RESHARE = 2,
                CHANNEL_RESHARE = 3,
                FORWARD = 4
            }
        }

        /** Properties of a StatusTemplate. */
        interface IStatusTemplate {

            /** StatusTemplate templateId */
            templateId?: (string|null);

            /** StatusTemplate templateName */
            templateName?: (string|null);

            /** StatusTemplate thumbnailUrl */
            thumbnailUrl?: (string|null);
        }

        /** Represents a StatusTemplate. */
        class StatusTemplate implements IStatusTemplate {

            /**
             * Constructs a new StatusTemplate.
             * @param [properties] Properties to set
             */
            constructor(properties?: StatusAttributions.StatusAttribution.IStatusTemplate);

            /** StatusTemplate templateId. */
            public templateId?: (string|null);

            /** StatusTemplate templateName. */
            public templateName?: (string|null);

            /** StatusTemplate thumbnailUrl. */
            public thumbnailUrl?: (string|null);

            /**
             * Creates a new StatusTemplate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StatusTemplate instance
             */
            public static create(properties?: StatusAttributions.StatusAttribution.IStatusTemplate): StatusAttributions.StatusAttribution.StatusTemplate;

            /**
             * Encodes the specified StatusTemplate message. Does not implicitly {@link StatusAttributions.StatusAttribution.StatusTemplate.verify|verify} messages.
             * @param message StatusTemplate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: StatusAttributions.StatusAttribution.IStatusTemplate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StatusTemplate message, length delimited. Does not implicitly {@link StatusAttributions.StatusAttribution.StatusTemplate.verify|verify} messages.
             * @param message StatusTemplate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: StatusAttributions.StatusAttribution.IStatusTemplate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StatusTemplate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StatusTemplate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StatusAttributions.StatusAttribution.StatusTemplate;

            /**
             * Decodes a StatusTemplate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StatusTemplate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StatusAttributions.StatusAttribution.StatusTemplate;

            /**
             * Verifies a StatusTemplate message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StatusTemplate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StatusTemplate
             */
            public static fromObject(object: { [k: string]: any }): StatusAttributions.StatusAttribution.StatusTemplate;

            /**
             * Creates a plain object from a StatusTemplate message. Also converts values to other types if specified.
             * @param message StatusTemplate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: StatusAttributions.StatusAttribution.StatusTemplate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StatusTemplate to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for StatusTemplate
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Type enum. */
        enum Type {
            UNKNOWN = 0,
            RESHARE = 1,
            EXTERNAL_SHARE = 2,
            MUSIC = 3,
            STATUS_MENTION = 4,
            GROUP_STATUS = 5,
            RL_ATTRIBUTION = 6,
            AI_CREATED = 7,
            LAYOUTS = 8,
            NEWSLETTER_STATUS = 9,
            STATUS_CLOSE_SHARING = 10,
            PAID_PARTNERSHIP = 11,
            USERNAME_STATUS = 12,
            STATUS_TEMPLATES = 13
        }
    }
}
