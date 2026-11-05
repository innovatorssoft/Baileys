import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace VnameCert. */
export namespace VnameCert {

    /** Properties of a BizIdentityInfo. */
    interface IBizIdentityInfo {

        /** BizIdentityInfo vlevel */
        vlevel?: (VnameCert.BizIdentityInfo.VerifiedLevelValue|null);

        /** BizIdentityInfo vnameCert */
        vnameCert?: (VnameCert.IVerifiedNameCertificate|null);

        /** BizIdentityInfo signed */
        signed?: (boolean|null);

        /** BizIdentityInfo revoked */
        revoked?: (boolean|null);

        /** BizIdentityInfo hostStorage */
        hostStorage?: (VnameCert.BizIdentityInfo.HostStorageType|null);

        /** BizIdentityInfo actualActors */
        actualActors?: (VnameCert.BizIdentityInfo.ActualActorsType|null);

        /** BizIdentityInfo privacyModeTs */
        privacyModeTs?: (number|Long|null);

        /** BizIdentityInfo featureControls */
        featureControls?: (number|Long|null);
    }

    /** Represents a BizIdentityInfo. */
    class BizIdentityInfo implements IBizIdentityInfo {

        /**
         * Constructs a new BizIdentityInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: VnameCert.IBizIdentityInfo);

        /** BizIdentityInfo vlevel. */
        public vlevel?: (VnameCert.BizIdentityInfo.VerifiedLevelValue|null);

        /** BizIdentityInfo vnameCert. */
        public vnameCert?: (VnameCert.IVerifiedNameCertificate|null);

        /** BizIdentityInfo signed. */
        public signed?: (boolean|null);

        /** BizIdentityInfo revoked. */
        public revoked?: (boolean|null);

        /** BizIdentityInfo hostStorage. */
        public hostStorage?: (VnameCert.BizIdentityInfo.HostStorageType|null);

        /** BizIdentityInfo actualActors. */
        public actualActors?: (VnameCert.BizIdentityInfo.ActualActorsType|null);

        /** BizIdentityInfo privacyModeTs. */
        public privacyModeTs?: (number|Long|null);

        /** BizIdentityInfo featureControls. */
        public featureControls?: (number|Long|null);

        /**
         * Creates a new BizIdentityInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BizIdentityInfo instance
         */
        public static create(properties?: VnameCert.IBizIdentityInfo): VnameCert.BizIdentityInfo;

        /**
         * Encodes the specified BizIdentityInfo message. Does not implicitly {@link VnameCert.BizIdentityInfo.verify|verify} messages.
         * @param message BizIdentityInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: VnameCert.IBizIdentityInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BizIdentityInfo message, length delimited. Does not implicitly {@link VnameCert.BizIdentityInfo.verify|verify} messages.
         * @param message BizIdentityInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: VnameCert.IBizIdentityInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BizIdentityInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BizIdentityInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VnameCert.BizIdentityInfo;

        /**
         * Decodes a BizIdentityInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BizIdentityInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VnameCert.BizIdentityInfo;

        /**
         * Verifies a BizIdentityInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BizIdentityInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BizIdentityInfo
         */
        public static fromObject(object: { [k: string]: any }): VnameCert.BizIdentityInfo;

        /**
         * Creates a plain object from a BizIdentityInfo message. Also converts values to other types if specified.
         * @param message BizIdentityInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: VnameCert.BizIdentityInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BizIdentityInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BizIdentityInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BizIdentityInfo {

        /** ActualActorsType enum. */
        enum ActualActorsType {
            SELF = 0,
            BSP = 1
        }

        /** HostStorageType enum. */
        enum HostStorageType {
            ON_PREMISE = 0,
            FACEBOOK = 1
        }

        /** VerifiedLevelValue enum. */
        enum VerifiedLevelValue {
            UNKNOWN = 0,
            LOW = 1,
            HIGH = 2
        }
    }

    /** Properties of a BizAccountLinkInfo. */
    interface IBizAccountLinkInfo {

        /** BizAccountLinkInfo whatsappBizAcctFbid */
        whatsappBizAcctFbid?: (number|Long|null);

        /** BizAccountLinkInfo whatsappAcctNumber */
        whatsappAcctNumber?: (string|null);

        /** BizAccountLinkInfo issueTime */
        issueTime?: (number|Long|null);

        /** BizAccountLinkInfo hostStorage */
        hostStorage?: (VnameCert.BizAccountLinkInfo.HostStorageType|null);

        /** BizAccountLinkInfo accountType */
        accountType?: (VnameCert.BizAccountLinkInfo.AccountType|null);

        /** BizAccountLinkInfo whatsappAcctEmail */
        whatsappAcctEmail?: (string|null);
    }

    /** Represents a BizAccountLinkInfo. */
    class BizAccountLinkInfo implements IBizAccountLinkInfo {

        /**
         * Constructs a new BizAccountLinkInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: VnameCert.IBizAccountLinkInfo);

        /** BizAccountLinkInfo whatsappBizAcctFbid. */
        public whatsappBizAcctFbid?: (number|Long|null);

        /** BizAccountLinkInfo whatsappAcctNumber. */
        public whatsappAcctNumber?: (string|null);

        /** BizAccountLinkInfo issueTime. */
        public issueTime?: (number|Long|null);

        /** BizAccountLinkInfo hostStorage. */
        public hostStorage?: (VnameCert.BizAccountLinkInfo.HostStorageType|null);

        /** BizAccountLinkInfo accountType. */
        public accountType?: (VnameCert.BizAccountLinkInfo.AccountType|null);

        /** BizAccountLinkInfo whatsappAcctEmail. */
        public whatsappAcctEmail?: (string|null);

        /**
         * Creates a new BizAccountLinkInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BizAccountLinkInfo instance
         */
        public static create(properties?: VnameCert.IBizAccountLinkInfo): VnameCert.BizAccountLinkInfo;

        /**
         * Encodes the specified BizAccountLinkInfo message. Does not implicitly {@link VnameCert.BizAccountLinkInfo.verify|verify} messages.
         * @param message BizAccountLinkInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: VnameCert.IBizAccountLinkInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BizAccountLinkInfo message, length delimited. Does not implicitly {@link VnameCert.BizAccountLinkInfo.verify|verify} messages.
         * @param message BizAccountLinkInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: VnameCert.IBizAccountLinkInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BizAccountLinkInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BizAccountLinkInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VnameCert.BizAccountLinkInfo;

        /**
         * Decodes a BizAccountLinkInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BizAccountLinkInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VnameCert.BizAccountLinkInfo;

        /**
         * Verifies a BizAccountLinkInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BizAccountLinkInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BizAccountLinkInfo
         */
        public static fromObject(object: { [k: string]: any }): VnameCert.BizAccountLinkInfo;

        /**
         * Creates a plain object from a BizAccountLinkInfo message. Also converts values to other types if specified.
         * @param message BizAccountLinkInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: VnameCert.BizAccountLinkInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BizAccountLinkInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BizAccountLinkInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace BizAccountLinkInfo {

        /** AccountType enum. */
        enum AccountType {
            ENTERPRISE = 0
        }

        /** HostStorageType enum. */
        enum HostStorageType {
            ON_PREMISE = 0,
            FACEBOOK = 1
        }
    }

    /** Properties of a BizAccountPayload. */
    interface IBizAccountPayload {

        /** BizAccountPayload vnameCert */
        vnameCert?: (VnameCert.IVerifiedNameCertificate|null);

        /** BizAccountPayload bizAcctLinkInfo */
        bizAcctLinkInfo?: (Uint8Array|null);
    }

    /** Represents a BizAccountPayload. */
    class BizAccountPayload implements IBizAccountPayload {

        /**
         * Constructs a new BizAccountPayload.
         * @param [properties] Properties to set
         */
        constructor(properties?: VnameCert.IBizAccountPayload);

        /** BizAccountPayload vnameCert. */
        public vnameCert?: (VnameCert.IVerifiedNameCertificate|null);

        /** BizAccountPayload bizAcctLinkInfo. */
        public bizAcctLinkInfo?: (Uint8Array|null);

        /**
         * Creates a new BizAccountPayload instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BizAccountPayload instance
         */
        public static create(properties?: VnameCert.IBizAccountPayload): VnameCert.BizAccountPayload;

        /**
         * Encodes the specified BizAccountPayload message. Does not implicitly {@link VnameCert.BizAccountPayload.verify|verify} messages.
         * @param message BizAccountPayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: VnameCert.IBizAccountPayload, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BizAccountPayload message, length delimited. Does not implicitly {@link VnameCert.BizAccountPayload.verify|verify} messages.
         * @param message BizAccountPayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: VnameCert.IBizAccountPayload, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BizAccountPayload message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BizAccountPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VnameCert.BizAccountPayload;

        /**
         * Decodes a BizAccountPayload message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BizAccountPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VnameCert.BizAccountPayload;

        /**
         * Verifies a BizAccountPayload message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BizAccountPayload message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BizAccountPayload
         */
        public static fromObject(object: { [k: string]: any }): VnameCert.BizAccountPayload;

        /**
         * Creates a plain object from a BizAccountPayload message. Also converts values to other types if specified.
         * @param message BizAccountPayload
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: VnameCert.BizAccountPayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BizAccountPayload to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BizAccountPayload
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a VerifiedNameCertificate. */
    interface IVerifiedNameCertificate {

        /** VerifiedNameCertificate details */
        details?: (Uint8Array|null);

        /** VerifiedNameCertificate signature */
        signature?: (Uint8Array|null);

        /** VerifiedNameCertificate serverSignature */
        serverSignature?: (Uint8Array|null);
    }

    /** Represents a VerifiedNameCertificate. */
    class VerifiedNameCertificate implements IVerifiedNameCertificate {

        /**
         * Constructs a new VerifiedNameCertificate.
         * @param [properties] Properties to set
         */
        constructor(properties?: VnameCert.IVerifiedNameCertificate);

        /** VerifiedNameCertificate details. */
        public details?: (Uint8Array|null);

        /** VerifiedNameCertificate signature. */
        public signature?: (Uint8Array|null);

        /** VerifiedNameCertificate serverSignature. */
        public serverSignature?: (Uint8Array|null);

        /**
         * Creates a new VerifiedNameCertificate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VerifiedNameCertificate instance
         */
        public static create(properties?: VnameCert.IVerifiedNameCertificate): VnameCert.VerifiedNameCertificate;

        /**
         * Encodes the specified VerifiedNameCertificate message. Does not implicitly {@link VnameCert.VerifiedNameCertificate.verify|verify} messages.
         * @param message VerifiedNameCertificate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: VnameCert.IVerifiedNameCertificate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VerifiedNameCertificate message, length delimited. Does not implicitly {@link VnameCert.VerifiedNameCertificate.verify|verify} messages.
         * @param message VerifiedNameCertificate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: VnameCert.IVerifiedNameCertificate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VerifiedNameCertificate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VerifiedNameCertificate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VnameCert.VerifiedNameCertificate;

        /**
         * Decodes a VerifiedNameCertificate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VerifiedNameCertificate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VnameCert.VerifiedNameCertificate;

        /**
         * Verifies a VerifiedNameCertificate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VerifiedNameCertificate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VerifiedNameCertificate
         */
        public static fromObject(object: { [k: string]: any }): VnameCert.VerifiedNameCertificate;

        /**
         * Creates a plain object from a VerifiedNameCertificate message. Also converts values to other types if specified.
         * @param message VerifiedNameCertificate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: VnameCert.VerifiedNameCertificate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VerifiedNameCertificate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for VerifiedNameCertificate
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace VerifiedNameCertificate {

        /** Properties of a Details. */
        interface IDetails {

            /** Details serial */
            serial?: (number|Long|null);

            /** Details issuer */
            issuer?: (string|null);

            /** Details verifiedName */
            verifiedName?: (string|null);

            /** Details localizedNames */
            localizedNames?: (VnameCert.ILocalizedName[]|null);

            /** Details issueTime */
            issueTime?: (number|Long|null);
        }

        /** Represents a Details. */
        class Details implements IDetails {

            /**
             * Constructs a new Details.
             * @param [properties] Properties to set
             */
            constructor(properties?: VnameCert.VerifiedNameCertificate.IDetails);

            /** Details serial. */
            public serial?: (number|Long|null);

            /** Details issuer. */
            public issuer?: (string|null);

            /** Details verifiedName. */
            public verifiedName?: (string|null);

            /** Details localizedNames. */
            public localizedNames: VnameCert.ILocalizedName[];

            /** Details issueTime. */
            public issueTime?: (number|Long|null);

            /**
             * Creates a new Details instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Details instance
             */
            public static create(properties?: VnameCert.VerifiedNameCertificate.IDetails): VnameCert.VerifiedNameCertificate.Details;

            /**
             * Encodes the specified Details message. Does not implicitly {@link VnameCert.VerifiedNameCertificate.Details.verify|verify} messages.
             * @param message Details message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: VnameCert.VerifiedNameCertificate.IDetails, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Details message, length delimited. Does not implicitly {@link VnameCert.VerifiedNameCertificate.Details.verify|verify} messages.
             * @param message Details message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: VnameCert.VerifiedNameCertificate.IDetails, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Details message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Details
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VnameCert.VerifiedNameCertificate.Details;

            /**
             * Decodes a Details message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Details
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VnameCert.VerifiedNameCertificate.Details;

            /**
             * Verifies a Details message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Details message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Details
             */
            public static fromObject(object: { [k: string]: any }): VnameCert.VerifiedNameCertificate.Details;

            /**
             * Creates a plain object from a Details message. Also converts values to other types if specified.
             * @param message Details
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: VnameCert.VerifiedNameCertificate.Details, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Details to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Details
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a LocalizedName. */
    interface ILocalizedName {

        /** LocalizedName lg */
        lg?: (string|null);

        /** LocalizedName lc */
        lc?: (string|null);

        /** LocalizedName verifiedName */
        verifiedName?: (string|null);
    }

    /** Represents a LocalizedName. */
    class LocalizedName implements ILocalizedName {

        /**
         * Constructs a new LocalizedName.
         * @param [properties] Properties to set
         */
        constructor(properties?: VnameCert.ILocalizedName);

        /** LocalizedName lg. */
        public lg?: (string|null);

        /** LocalizedName lc. */
        public lc?: (string|null);

        /** LocalizedName verifiedName. */
        public verifiedName?: (string|null);

        /**
         * Creates a new LocalizedName instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LocalizedName instance
         */
        public static create(properties?: VnameCert.ILocalizedName): VnameCert.LocalizedName;

        /**
         * Encodes the specified LocalizedName message. Does not implicitly {@link VnameCert.LocalizedName.verify|verify} messages.
         * @param message LocalizedName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: VnameCert.ILocalizedName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LocalizedName message, length delimited. Does not implicitly {@link VnameCert.LocalizedName.verify|verify} messages.
         * @param message LocalizedName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: VnameCert.ILocalizedName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LocalizedName message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LocalizedName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VnameCert.LocalizedName;

        /**
         * Decodes a LocalizedName message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LocalizedName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VnameCert.LocalizedName;

        /**
         * Verifies a LocalizedName message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LocalizedName message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LocalizedName
         */
        public static fromObject(object: { [k: string]: any }): VnameCert.LocalizedName;

        /**
         * Creates a plain object from a LocalizedName message. Also converts values to other types if specified.
         * @param message LocalizedName
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: VnameCert.LocalizedName, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LocalizedName to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LocalizedName
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
