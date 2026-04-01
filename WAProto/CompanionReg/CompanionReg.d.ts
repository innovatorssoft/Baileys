import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace CompanionReg. */
export namespace CompanionReg {

    /** Properties of a ClientPairingProps. */
    interface IClientPairingProps {

        /** ClientPairingProps isChatDbLidMigrated */
        isChatDbLidMigrated?: (boolean|null);

        /** ClientPairingProps isSyncdPureLidSession */
        isSyncdPureLidSession?: (boolean|null);

        /** ClientPairingProps isSyncdSnapshotRecoveryEnabled */
        isSyncdSnapshotRecoveryEnabled?: (boolean|null);

        /** ClientPairingProps isHsThumbnailSyncEnabled */
        isHsThumbnailSyncEnabled?: (boolean|null);

        /** ClientPairingProps subscriptionSyncPayload */
        subscriptionSyncPayload?: (Uint8Array|null);
    }

    /** Represents a ClientPairingProps. */
    class ClientPairingProps implements IClientPairingProps {

        /**
         * Constructs a new ClientPairingProps.
         * @param [properties] Properties to set
         */
        constructor(properties?: CompanionReg.IClientPairingProps);

        /** ClientPairingProps isChatDbLidMigrated. */
        public isChatDbLidMigrated?: (boolean|null);

        /** ClientPairingProps isSyncdPureLidSession. */
        public isSyncdPureLidSession?: (boolean|null);

        /** ClientPairingProps isSyncdSnapshotRecoveryEnabled. */
        public isSyncdSnapshotRecoveryEnabled?: (boolean|null);

        /** ClientPairingProps isHsThumbnailSyncEnabled. */
        public isHsThumbnailSyncEnabled?: (boolean|null);

        /** ClientPairingProps subscriptionSyncPayload. */
        public subscriptionSyncPayload?: (Uint8Array|null);

        /**
         * Creates a new ClientPairingProps instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientPairingProps instance
         */
        public static create(properties?: CompanionReg.IClientPairingProps): CompanionReg.ClientPairingProps;

        /**
         * Encodes the specified ClientPairingProps message. Does not implicitly {@link CompanionReg.ClientPairingProps.verify|verify} messages.
         * @param message ClientPairingProps message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CompanionReg.IClientPairingProps, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientPairingProps message, length delimited. Does not implicitly {@link CompanionReg.ClientPairingProps.verify|verify} messages.
         * @param message ClientPairingProps message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CompanionReg.IClientPairingProps, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientPairingProps message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientPairingProps
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompanionReg.ClientPairingProps;

        /**
         * Decodes a ClientPairingProps message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientPairingProps
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompanionReg.ClientPairingProps;

        /**
         * Verifies a ClientPairingProps message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientPairingProps message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientPairingProps
         */
        public static fromObject(object: { [k: string]: any }): CompanionReg.ClientPairingProps;

        /**
         * Creates a plain object from a ClientPairingProps message. Also converts values to other types if specified.
         * @param message ClientPairingProps
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CompanionReg.ClientPairingProps, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientPairingProps to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ClientPairingProps
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an EncryptedPairingRequest. */
    interface IEncryptedPairingRequest {

        /** EncryptedPairingRequest encryptedPayload */
        encryptedPayload?: (Uint8Array|null);

        /** EncryptedPairingRequest iv */
        iv?: (Uint8Array|null);
    }

    /** Represents an EncryptedPairingRequest. */
    class EncryptedPairingRequest implements IEncryptedPairingRequest {

        /**
         * Constructs a new EncryptedPairingRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: CompanionReg.IEncryptedPairingRequest);

        /** EncryptedPairingRequest encryptedPayload. */
        public encryptedPayload?: (Uint8Array|null);

        /** EncryptedPairingRequest iv. */
        public iv?: (Uint8Array|null);

        /**
         * Creates a new EncryptedPairingRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EncryptedPairingRequest instance
         */
        public static create(properties?: CompanionReg.IEncryptedPairingRequest): CompanionReg.EncryptedPairingRequest;

        /**
         * Encodes the specified EncryptedPairingRequest message. Does not implicitly {@link CompanionReg.EncryptedPairingRequest.verify|verify} messages.
         * @param message EncryptedPairingRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CompanionReg.IEncryptedPairingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EncryptedPairingRequest message, length delimited. Does not implicitly {@link CompanionReg.EncryptedPairingRequest.verify|verify} messages.
         * @param message EncryptedPairingRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CompanionReg.IEncryptedPairingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EncryptedPairingRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EncryptedPairingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompanionReg.EncryptedPairingRequest;

        /**
         * Decodes an EncryptedPairingRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EncryptedPairingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompanionReg.EncryptedPairingRequest;

        /**
         * Verifies an EncryptedPairingRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EncryptedPairingRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EncryptedPairingRequest
         */
        public static fromObject(object: { [k: string]: any }): CompanionReg.EncryptedPairingRequest;

        /**
         * Creates a plain object from an EncryptedPairingRequest message. Also converts values to other types if specified.
         * @param message EncryptedPairingRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CompanionReg.EncryptedPairingRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EncryptedPairingRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EncryptedPairingRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PairingRequest. */
    interface IPairingRequest {

        /** PairingRequest companionPublicKey */
        companionPublicKey?: (Uint8Array|null);

        /** PairingRequest companionIdentityKey */
        companionIdentityKey?: (Uint8Array|null);

        /** PairingRequest advSecret */
        advSecret?: (Uint8Array|null);
    }

    /** Represents a PairingRequest. */
    class PairingRequest implements IPairingRequest {

        /**
         * Constructs a new PairingRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: CompanionReg.IPairingRequest);

        /** PairingRequest companionPublicKey. */
        public companionPublicKey?: (Uint8Array|null);

        /** PairingRequest companionIdentityKey. */
        public companionIdentityKey?: (Uint8Array|null);

        /** PairingRequest advSecret. */
        public advSecret?: (Uint8Array|null);

        /**
         * Creates a new PairingRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairingRequest instance
         */
        public static create(properties?: CompanionReg.IPairingRequest): CompanionReg.PairingRequest;

        /**
         * Encodes the specified PairingRequest message. Does not implicitly {@link CompanionReg.PairingRequest.verify|verify} messages.
         * @param message PairingRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CompanionReg.IPairingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PairingRequest message, length delimited. Does not implicitly {@link CompanionReg.PairingRequest.verify|verify} messages.
         * @param message PairingRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CompanionReg.IPairingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PairingRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PairingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompanionReg.PairingRequest;

        /**
         * Decodes a PairingRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PairingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompanionReg.PairingRequest;

        /**
         * Verifies a PairingRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairingRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairingRequest
         */
        public static fromObject(object: { [k: string]: any }): CompanionReg.PairingRequest;

        /**
         * Creates a plain object from a PairingRequest message. Also converts values to other types if specified.
         * @param message PairingRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CompanionReg.PairingRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairingRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PairingRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PrimaryEphemeralIdentity. */
    interface IPrimaryEphemeralIdentity {

        /** PrimaryEphemeralIdentity publicKey */
        publicKey?: (Uint8Array|null);

        /** PrimaryEphemeralIdentity nonce */
        nonce?: (Uint8Array|null);
    }

    /** Represents a PrimaryEphemeralIdentity. */
    class PrimaryEphemeralIdentity implements IPrimaryEphemeralIdentity {

        /**
         * Constructs a new PrimaryEphemeralIdentity.
         * @param [properties] Properties to set
         */
        constructor(properties?: CompanionReg.IPrimaryEphemeralIdentity);

        /** PrimaryEphemeralIdentity publicKey. */
        public publicKey?: (Uint8Array|null);

        /** PrimaryEphemeralIdentity nonce. */
        public nonce?: (Uint8Array|null);

        /**
         * Creates a new PrimaryEphemeralIdentity instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PrimaryEphemeralIdentity instance
         */
        public static create(properties?: CompanionReg.IPrimaryEphemeralIdentity): CompanionReg.PrimaryEphemeralIdentity;

        /**
         * Encodes the specified PrimaryEphemeralIdentity message. Does not implicitly {@link CompanionReg.PrimaryEphemeralIdentity.verify|verify} messages.
         * @param message PrimaryEphemeralIdentity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CompanionReg.IPrimaryEphemeralIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PrimaryEphemeralIdentity message, length delimited. Does not implicitly {@link CompanionReg.PrimaryEphemeralIdentity.verify|verify} messages.
         * @param message PrimaryEphemeralIdentity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CompanionReg.IPrimaryEphemeralIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PrimaryEphemeralIdentity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PrimaryEphemeralIdentity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompanionReg.PrimaryEphemeralIdentity;

        /**
         * Decodes a PrimaryEphemeralIdentity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PrimaryEphemeralIdentity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompanionReg.PrimaryEphemeralIdentity;

        /**
         * Verifies a PrimaryEphemeralIdentity message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PrimaryEphemeralIdentity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PrimaryEphemeralIdentity
         */
        public static fromObject(object: { [k: string]: any }): CompanionReg.PrimaryEphemeralIdentity;

        /**
         * Creates a plain object from a PrimaryEphemeralIdentity message. Also converts values to other types if specified.
         * @param message PrimaryEphemeralIdentity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CompanionReg.PrimaryEphemeralIdentity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PrimaryEphemeralIdentity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PrimaryEphemeralIdentity
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ProloguePayload. */
    interface IProloguePayload {

        /** ProloguePayload companionEphemeralIdentity */
        companionEphemeralIdentity?: (Uint8Array|null);

        /** ProloguePayload commitment */
        commitment?: (CompanionReg.ICompanionCommitment|null);
    }

    /** Represents a ProloguePayload. */
    class ProloguePayload implements IProloguePayload {

        /**
         * Constructs a new ProloguePayload.
         * @param [properties] Properties to set
         */
        constructor(properties?: CompanionReg.IProloguePayload);

        /** ProloguePayload companionEphemeralIdentity. */
        public companionEphemeralIdentity?: (Uint8Array|null);

        /** ProloguePayload commitment. */
        public commitment?: (CompanionReg.ICompanionCommitment|null);

        /**
         * Creates a new ProloguePayload instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProloguePayload instance
         */
        public static create(properties?: CompanionReg.IProloguePayload): CompanionReg.ProloguePayload;

        /**
         * Encodes the specified ProloguePayload message. Does not implicitly {@link CompanionReg.ProloguePayload.verify|verify} messages.
         * @param message ProloguePayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CompanionReg.IProloguePayload, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ProloguePayload message, length delimited. Does not implicitly {@link CompanionReg.ProloguePayload.verify|verify} messages.
         * @param message ProloguePayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CompanionReg.IProloguePayload, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ProloguePayload message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ProloguePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompanionReg.ProloguePayload;

        /**
         * Decodes a ProloguePayload message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ProloguePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompanionReg.ProloguePayload;

        /**
         * Verifies a ProloguePayload message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ProloguePayload message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ProloguePayload
         */
        public static fromObject(object: { [k: string]: any }): CompanionReg.ProloguePayload;

        /**
         * Creates a plain object from a ProloguePayload message. Also converts values to other types if specified.
         * @param message ProloguePayload
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CompanionReg.ProloguePayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ProloguePayload to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ProloguePayload
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CompanionCommitment. */
    interface ICompanionCommitment {

        /** CompanionCommitment hash */
        hash?: (Uint8Array|null);
    }

    /** Represents a CompanionCommitment. */
    class CompanionCommitment implements ICompanionCommitment {

        /**
         * Constructs a new CompanionCommitment.
         * @param [properties] Properties to set
         */
        constructor(properties?: CompanionReg.ICompanionCommitment);

        /** CompanionCommitment hash. */
        public hash?: (Uint8Array|null);

        /**
         * Creates a new CompanionCommitment instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CompanionCommitment instance
         */
        public static create(properties?: CompanionReg.ICompanionCommitment): CompanionReg.CompanionCommitment;

        /**
         * Encodes the specified CompanionCommitment message. Does not implicitly {@link CompanionReg.CompanionCommitment.verify|verify} messages.
         * @param message CompanionCommitment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CompanionReg.ICompanionCommitment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CompanionCommitment message, length delimited. Does not implicitly {@link CompanionReg.CompanionCommitment.verify|verify} messages.
         * @param message CompanionCommitment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CompanionReg.ICompanionCommitment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CompanionCommitment message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CompanionCommitment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompanionReg.CompanionCommitment;

        /**
         * Decodes a CompanionCommitment message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CompanionCommitment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompanionReg.CompanionCommitment;

        /**
         * Verifies a CompanionCommitment message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CompanionCommitment message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CompanionCommitment
         */
        public static fromObject(object: { [k: string]: any }): CompanionReg.CompanionCommitment;

        /**
         * Creates a plain object from a CompanionCommitment message. Also converts values to other types if specified.
         * @param message CompanionCommitment
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CompanionReg.CompanionCommitment, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CompanionCommitment to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CompanionCommitment
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CompanionEphemeralIdentity. */
    interface ICompanionEphemeralIdentity {

        /** CompanionEphemeralIdentity publicKey */
        publicKey?: (Uint8Array|null);

        /** CompanionEphemeralIdentity deviceType */
        deviceType?: (CompanionReg.DeviceProps.PlatformType|null);

        /** CompanionEphemeralIdentity ref */
        ref?: (string|null);
    }

    /** Represents a CompanionEphemeralIdentity. */
    class CompanionEphemeralIdentity implements ICompanionEphemeralIdentity {

        /**
         * Constructs a new CompanionEphemeralIdentity.
         * @param [properties] Properties to set
         */
        constructor(properties?: CompanionReg.ICompanionEphemeralIdentity);

        /** CompanionEphemeralIdentity publicKey. */
        public publicKey?: (Uint8Array|null);

        /** CompanionEphemeralIdentity deviceType. */
        public deviceType?: (CompanionReg.DeviceProps.PlatformType|null);

        /** CompanionEphemeralIdentity ref. */
        public ref?: (string|null);

        /**
         * Creates a new CompanionEphemeralIdentity instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CompanionEphemeralIdentity instance
         */
        public static create(properties?: CompanionReg.ICompanionEphemeralIdentity): CompanionReg.CompanionEphemeralIdentity;

        /**
         * Encodes the specified CompanionEphemeralIdentity message. Does not implicitly {@link CompanionReg.CompanionEphemeralIdentity.verify|verify} messages.
         * @param message CompanionEphemeralIdentity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CompanionReg.ICompanionEphemeralIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CompanionEphemeralIdentity message, length delimited. Does not implicitly {@link CompanionReg.CompanionEphemeralIdentity.verify|verify} messages.
         * @param message CompanionEphemeralIdentity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CompanionReg.ICompanionEphemeralIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CompanionEphemeralIdentity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CompanionEphemeralIdentity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompanionReg.CompanionEphemeralIdentity;

        /**
         * Decodes a CompanionEphemeralIdentity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CompanionEphemeralIdentity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompanionReg.CompanionEphemeralIdentity;

        /**
         * Verifies a CompanionEphemeralIdentity message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CompanionEphemeralIdentity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CompanionEphemeralIdentity
         */
        public static fromObject(object: { [k: string]: any }): CompanionReg.CompanionEphemeralIdentity;

        /**
         * Creates a plain object from a CompanionEphemeralIdentity message. Also converts values to other types if specified.
         * @param message CompanionEphemeralIdentity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CompanionReg.CompanionEphemeralIdentity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CompanionEphemeralIdentity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CompanionEphemeralIdentity
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DeviceProps. */
    interface IDeviceProps {

        /** DeviceProps os */
        os?: (string|null);

        /** DeviceProps version */
        version?: (CompanionReg.DeviceProps.IAppVersion|null);

        /** DeviceProps platformType */
        platformType?: (CompanionReg.DeviceProps.PlatformType|null);

        /** DeviceProps requireFullSync */
        requireFullSync?: (boolean|null);

        /** DeviceProps historySyncConfig */
        historySyncConfig?: (CompanionReg.DeviceProps.IHistorySyncConfig|null);
    }

    /** Represents a DeviceProps. */
    class DeviceProps implements IDeviceProps {

        /**
         * Constructs a new DeviceProps.
         * @param [properties] Properties to set
         */
        constructor(properties?: CompanionReg.IDeviceProps);

        /** DeviceProps os. */
        public os?: (string|null);

        /** DeviceProps version. */
        public version?: (CompanionReg.DeviceProps.IAppVersion|null);

        /** DeviceProps platformType. */
        public platformType?: (CompanionReg.DeviceProps.PlatformType|null);

        /** DeviceProps requireFullSync. */
        public requireFullSync?: (boolean|null);

        /** DeviceProps historySyncConfig. */
        public historySyncConfig?: (CompanionReg.DeviceProps.IHistorySyncConfig|null);

        /**
         * Creates a new DeviceProps instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeviceProps instance
         */
        public static create(properties?: CompanionReg.IDeviceProps): CompanionReg.DeviceProps;

        /**
         * Encodes the specified DeviceProps message. Does not implicitly {@link CompanionReg.DeviceProps.verify|verify} messages.
         * @param message DeviceProps message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CompanionReg.IDeviceProps, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeviceProps message, length delimited. Does not implicitly {@link CompanionReg.DeviceProps.verify|verify} messages.
         * @param message DeviceProps message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CompanionReg.IDeviceProps, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeviceProps message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeviceProps
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompanionReg.DeviceProps;

        /**
         * Decodes a DeviceProps message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeviceProps
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompanionReg.DeviceProps;

        /**
         * Verifies a DeviceProps message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeviceProps message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeviceProps
         */
        public static fromObject(object: { [k: string]: any }): CompanionReg.DeviceProps;

        /**
         * Creates a plain object from a DeviceProps message. Also converts values to other types if specified.
         * @param message DeviceProps
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CompanionReg.DeviceProps, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeviceProps to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DeviceProps
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace DeviceProps {

        /** Properties of an AppVersion. */
        interface IAppVersion {

            /** AppVersion primary */
            primary?: (number|null);

            /** AppVersion secondary */
            secondary?: (number|null);

            /** AppVersion tertiary */
            tertiary?: (number|null);

            /** AppVersion quaternary */
            quaternary?: (number|null);

            /** AppVersion quinary */
            quinary?: (number|null);
        }

        /** Represents an AppVersion. */
        class AppVersion implements IAppVersion {

            /**
             * Constructs a new AppVersion.
             * @param [properties] Properties to set
             */
            constructor(properties?: CompanionReg.DeviceProps.IAppVersion);

            /** AppVersion primary. */
            public primary?: (number|null);

            /** AppVersion secondary. */
            public secondary?: (number|null);

            /** AppVersion tertiary. */
            public tertiary?: (number|null);

            /** AppVersion quaternary. */
            public quaternary?: (number|null);

            /** AppVersion quinary. */
            public quinary?: (number|null);

            /**
             * Creates a new AppVersion instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AppVersion instance
             */
            public static create(properties?: CompanionReg.DeviceProps.IAppVersion): CompanionReg.DeviceProps.AppVersion;

            /**
             * Encodes the specified AppVersion message. Does not implicitly {@link CompanionReg.DeviceProps.AppVersion.verify|verify} messages.
             * @param message AppVersion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: CompanionReg.DeviceProps.IAppVersion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AppVersion message, length delimited. Does not implicitly {@link CompanionReg.DeviceProps.AppVersion.verify|verify} messages.
             * @param message AppVersion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: CompanionReg.DeviceProps.IAppVersion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AppVersion message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AppVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompanionReg.DeviceProps.AppVersion;

            /**
             * Decodes an AppVersion message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AppVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompanionReg.DeviceProps.AppVersion;

            /**
             * Verifies an AppVersion message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AppVersion message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AppVersion
             */
            public static fromObject(object: { [k: string]: any }): CompanionReg.DeviceProps.AppVersion;

            /**
             * Creates a plain object from an AppVersion message. Also converts values to other types if specified.
             * @param message AppVersion
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: CompanionReg.DeviceProps.AppVersion, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AppVersion to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AppVersion
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a HistorySyncConfig. */
        interface IHistorySyncConfig {

            /** HistorySyncConfig fullSyncDaysLimit */
            fullSyncDaysLimit?: (number|null);

            /** HistorySyncConfig fullSyncSizeMbLimit */
            fullSyncSizeMbLimit?: (number|null);

            /** HistorySyncConfig storageQuotaMb */
            storageQuotaMb?: (number|null);

            /** HistorySyncConfig inlineInitialPayloadInE2EeMsg */
            inlineInitialPayloadInE2EeMsg?: (boolean|null);

            /** HistorySyncConfig recentSyncDaysLimit */
            recentSyncDaysLimit?: (number|null);

            /** HistorySyncConfig supportCallLogHistory */
            supportCallLogHistory?: (boolean|null);

            /** HistorySyncConfig supportBotUserAgentChatHistory */
            supportBotUserAgentChatHistory?: (boolean|null);

            /** HistorySyncConfig supportCagReactionsAndPolls */
            supportCagReactionsAndPolls?: (boolean|null);

            /** HistorySyncConfig supportBizHostedMsg */
            supportBizHostedMsg?: (boolean|null);

            /** HistorySyncConfig supportRecentSyncChunkMessageCountTuning */
            supportRecentSyncChunkMessageCountTuning?: (boolean|null);

            /** HistorySyncConfig supportHostedGroupMsg */
            supportHostedGroupMsg?: (boolean|null);

            /** HistorySyncConfig supportFbidBotChatHistory */
            supportFbidBotChatHistory?: (boolean|null);

            /** HistorySyncConfig supportAddOnHistorySyncMigration */
            supportAddOnHistorySyncMigration?: (boolean|null);

            /** HistorySyncConfig supportMessageAssociation */
            supportMessageAssociation?: (boolean|null);

            /** HistorySyncConfig supportGroupHistory */
            supportGroupHistory?: (boolean|null);

            /** HistorySyncConfig onDemandReady */
            onDemandReady?: (boolean|null);

            /** HistorySyncConfig supportGuestChat */
            supportGuestChat?: (boolean|null);

            /** HistorySyncConfig completeOnDemandReady */
            completeOnDemandReady?: (boolean|null);

            /** HistorySyncConfig thumbnailSyncDaysLimit */
            thumbnailSyncDaysLimit?: (number|null);

            /** HistorySyncConfig initialSyncMaxMessagesPerChat */
            initialSyncMaxMessagesPerChat?: (number|null);

            /** HistorySyncConfig supportManusHistory */
            supportManusHistory?: (boolean|null);

            /** HistorySyncConfig supportHatchHistory */
            supportHatchHistory?: (boolean|null);

            /** HistorySyncConfig supportedBotChannelFbids */
            supportedBotChannelFbids?: (string[]|null);

            /** HistorySyncConfig supportInlineContacts */
            supportInlineContacts?: (boolean|null);
        }

        /** Represents a HistorySyncConfig. */
        class HistorySyncConfig implements IHistorySyncConfig {

            /**
             * Constructs a new HistorySyncConfig.
             * @param [properties] Properties to set
             */
            constructor(properties?: CompanionReg.DeviceProps.IHistorySyncConfig);

            /** HistorySyncConfig fullSyncDaysLimit. */
            public fullSyncDaysLimit?: (number|null);

            /** HistorySyncConfig fullSyncSizeMbLimit. */
            public fullSyncSizeMbLimit?: (number|null);

            /** HistorySyncConfig storageQuotaMb. */
            public storageQuotaMb?: (number|null);

            /** HistorySyncConfig inlineInitialPayloadInE2EeMsg. */
            public inlineInitialPayloadInE2EeMsg?: (boolean|null);

            /** HistorySyncConfig recentSyncDaysLimit. */
            public recentSyncDaysLimit?: (number|null);

            /** HistorySyncConfig supportCallLogHistory. */
            public supportCallLogHistory?: (boolean|null);

            /** HistorySyncConfig supportBotUserAgentChatHistory. */
            public supportBotUserAgentChatHistory?: (boolean|null);

            /** HistorySyncConfig supportCagReactionsAndPolls. */
            public supportCagReactionsAndPolls?: (boolean|null);

            /** HistorySyncConfig supportBizHostedMsg. */
            public supportBizHostedMsg?: (boolean|null);

            /** HistorySyncConfig supportRecentSyncChunkMessageCountTuning. */
            public supportRecentSyncChunkMessageCountTuning?: (boolean|null);

            /** HistorySyncConfig supportHostedGroupMsg. */
            public supportHostedGroupMsg?: (boolean|null);

            /** HistorySyncConfig supportFbidBotChatHistory. */
            public supportFbidBotChatHistory?: (boolean|null);

            /** HistorySyncConfig supportAddOnHistorySyncMigration. */
            public supportAddOnHistorySyncMigration?: (boolean|null);

            /** HistorySyncConfig supportMessageAssociation. */
            public supportMessageAssociation?: (boolean|null);

            /** HistorySyncConfig supportGroupHistory. */
            public supportGroupHistory?: (boolean|null);

            /** HistorySyncConfig onDemandReady. */
            public onDemandReady?: (boolean|null);

            /** HistorySyncConfig supportGuestChat. */
            public supportGuestChat?: (boolean|null);

            /** HistorySyncConfig completeOnDemandReady. */
            public completeOnDemandReady?: (boolean|null);

            /** HistorySyncConfig thumbnailSyncDaysLimit. */
            public thumbnailSyncDaysLimit?: (number|null);

            /** HistorySyncConfig initialSyncMaxMessagesPerChat. */
            public initialSyncMaxMessagesPerChat?: (number|null);

            /** HistorySyncConfig supportManusHistory. */
            public supportManusHistory?: (boolean|null);

            /** HistorySyncConfig supportHatchHistory. */
            public supportHatchHistory?: (boolean|null);

            /** HistorySyncConfig supportedBotChannelFbids. */
            public supportedBotChannelFbids: string[];

            /** HistorySyncConfig supportInlineContacts. */
            public supportInlineContacts?: (boolean|null);

            /**
             * Creates a new HistorySyncConfig instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HistorySyncConfig instance
             */
            public static create(properties?: CompanionReg.DeviceProps.IHistorySyncConfig): CompanionReg.DeviceProps.HistorySyncConfig;

            /**
             * Encodes the specified HistorySyncConfig message. Does not implicitly {@link CompanionReg.DeviceProps.HistorySyncConfig.verify|verify} messages.
             * @param message HistorySyncConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: CompanionReg.DeviceProps.IHistorySyncConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HistorySyncConfig message, length delimited. Does not implicitly {@link CompanionReg.DeviceProps.HistorySyncConfig.verify|verify} messages.
             * @param message HistorySyncConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: CompanionReg.DeviceProps.IHistorySyncConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HistorySyncConfig message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HistorySyncConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompanionReg.DeviceProps.HistorySyncConfig;

            /**
             * Decodes a HistorySyncConfig message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HistorySyncConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompanionReg.DeviceProps.HistorySyncConfig;

            /**
             * Verifies a HistorySyncConfig message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HistorySyncConfig message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HistorySyncConfig
             */
            public static fromObject(object: { [k: string]: any }): CompanionReg.DeviceProps.HistorySyncConfig;

            /**
             * Creates a plain object from a HistorySyncConfig message. Also converts values to other types if specified.
             * @param message HistorySyncConfig
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: CompanionReg.DeviceProps.HistorySyncConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HistorySyncConfig to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for HistorySyncConfig
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** PlatformType enum. */
        enum PlatformType {
            UNKNOWN = 0,
            CHROME = 1,
            FIREFOX = 2,
            IE = 3,
            OPERA = 4,
            SAFARI = 5,
            EDGE = 6,
            DESKTOP = 7,
            IPAD = 8,
            ANDROID_TABLET = 9,
            OHANA = 10,
            ALOHA = 11,
            CATALINA = 12,
            TCL_TV = 13,
            IOS_PHONE = 14,
            IOS_CATALYST = 15,
            ANDROID_PHONE = 16,
            ANDROID_AMBIGUOUS = 17,
            WEAR_OS = 18,
            AR_WRIST = 19,
            AR_DEVICE = 20,
            UWP = 21,
            VR = 22,
            CLOUD_API = 23,
            SMARTGLASSES = 24
        }
    }
}
