import * as $protobuf from "protobufjs";
import Long = require("long");
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

        /** DeviceCapabilities aiFbidMigration */
        aiFbidMigration?: (DeviceCapabilities.DeviceCapabilities.IAiFbidMigration|null);

        /** DeviceCapabilities bizAiSettingsSync */
        bizAiSettingsSync?: (DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync|null);

        /** DeviceCapabilities contactRefresh */
        contactRefresh?: (DeviceCapabilities.DeviceCapabilities.IContactRefresh|null);
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

        /** DeviceCapabilities aiFbidMigration. */
        public aiFbidMigration?: (DeviceCapabilities.DeviceCapabilities.IAiFbidMigration|null);

        /** DeviceCapabilities bizAiSettingsSync. */
        public bizAiSettingsSync?: (DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync|null);

        /** DeviceCapabilities contactRefresh. */
        public contactRefresh?: (DeviceCapabilities.DeviceCapabilities.IContactRefresh|null);

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

        /** Properties of an AiFbidMigration. */
        interface IAiFbidMigration {

            /** AiFbidMigration chatDbMigrationTimestamp */
            chatDbMigrationTimestamp?: (number|Long|null);

            /** AiFbidMigration supportVersion */
            supportVersion?: (number|null);
        }

        /** Represents an AiFbidMigration. */
        class AiFbidMigration implements IAiFbidMigration {

            /**
             * Constructs a new AiFbidMigration.
             * @param [properties] Properties to set
             */
            constructor(properties?: DeviceCapabilities.DeviceCapabilities.IAiFbidMigration);

            /** AiFbidMigration chatDbMigrationTimestamp. */
            public chatDbMigrationTimestamp?: (number|Long|null);

            /** AiFbidMigration supportVersion. */
            public supportVersion?: (number|null);

            /**
             * Creates a new AiFbidMigration instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AiFbidMigration instance
             */
            public static create(properties?: DeviceCapabilities.DeviceCapabilities.IAiFbidMigration): DeviceCapabilities.DeviceCapabilities.AiFbidMigration;

            /**
             * Encodes the specified AiFbidMigration message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.AiFbidMigration.verify|verify} messages.
             * @param message AiFbidMigration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DeviceCapabilities.DeviceCapabilities.IAiFbidMigration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AiFbidMigration message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.AiFbidMigration.verify|verify} messages.
             * @param message AiFbidMigration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DeviceCapabilities.DeviceCapabilities.IAiFbidMigration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AiFbidMigration message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AiFbidMigration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeviceCapabilities.DeviceCapabilities.AiFbidMigration;

            /**
             * Decodes an AiFbidMigration message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AiFbidMigration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeviceCapabilities.DeviceCapabilities.AiFbidMigration;

            /**
             * Verifies an AiFbidMigration message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AiFbidMigration message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AiFbidMigration
             */
            public static fromObject(object: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.AiFbidMigration;

            /**
             * Creates a plain object from an AiFbidMigration message. Also converts values to other types if specified.
             * @param message AiFbidMigration
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: DeviceCapabilities.DeviceCapabilities.AiFbidMigration, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AiFbidMigration to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AiFbidMigration
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

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

        /** Properties of a BizAiSettingsSync. */
        interface IBizAiSettingsSync {

            /** BizAiSettingsSync handoffRemovalTimingEnabled */
            handoffRemovalTimingEnabled?: (boolean|null);
        }

        /** Represents a BizAiSettingsSync. */
        class BizAiSettingsSync implements IBizAiSettingsSync {

            /**
             * Constructs a new BizAiSettingsSync.
             * @param [properties] Properties to set
             */
            constructor(properties?: DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync);

            /** BizAiSettingsSync handoffRemovalTimingEnabled. */
            public handoffRemovalTimingEnabled?: (boolean|null);

            /**
             * Creates a new BizAiSettingsSync instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BizAiSettingsSync instance
             */
            public static create(properties?: DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync): DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync;

            /**
             * Encodes the specified BizAiSettingsSync message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.verify|verify} messages.
             * @param message BizAiSettingsSync message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BizAiSettingsSync message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.verify|verify} messages.
             * @param message BizAiSettingsSync message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BizAiSettingsSync message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BizAiSettingsSync
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync;

            /**
             * Decodes a BizAiSettingsSync message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BizAiSettingsSync
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync;

            /**
             * Verifies a BizAiSettingsSync message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BizAiSettingsSync message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BizAiSettingsSync
             */
            public static fromObject(object: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync;

            /**
             * Creates a plain object from a BizAiSettingsSync message. Also converts values to other types if specified.
             * @param message BizAiSettingsSync
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BizAiSettingsSync to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BizAiSettingsSync
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /** BusinessBroadcast recipientLimit */
            recipientLimit?: (number|null);

            /** BusinessBroadcast proCompanionSupportEnabled */
            proCompanionSupportEnabled?: (boolean|null);
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

            /** BusinessBroadcast recipientLimit. */
            public recipientLimit?: (number|null);

            /** BusinessBroadcast proCompanionSupportEnabled. */
            public proCompanionSupportEnabled?: (boolean|null);

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

        /** Properties of a ContactRefresh. */
        interface IContactRefresh {

            /** ContactRefresh refreshSupported */
            refreshSupported?: (boolean|null);
        }

        /** Represents a ContactRefresh. */
        class ContactRefresh implements IContactRefresh {

            /**
             * Constructs a new ContactRefresh.
             * @param [properties] Properties to set
             */
            constructor(properties?: DeviceCapabilities.DeviceCapabilities.IContactRefresh);

            /** ContactRefresh refreshSupported. */
            public refreshSupported?: (boolean|null);

            /**
             * Creates a new ContactRefresh instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ContactRefresh instance
             */
            public static create(properties?: DeviceCapabilities.DeviceCapabilities.IContactRefresh): DeviceCapabilities.DeviceCapabilities.ContactRefresh;

            /**
             * Encodes the specified ContactRefresh message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.ContactRefresh.verify|verify} messages.
             * @param message ContactRefresh message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DeviceCapabilities.DeviceCapabilities.IContactRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ContactRefresh message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.ContactRefresh.verify|verify} messages.
             * @param message ContactRefresh message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DeviceCapabilities.DeviceCapabilities.IContactRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ContactRefresh message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ContactRefresh
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeviceCapabilities.DeviceCapabilities.ContactRefresh;

            /**
             * Decodes a ContactRefresh message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ContactRefresh
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeviceCapabilities.DeviceCapabilities.ContactRefresh;

            /**
             * Verifies a ContactRefresh message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ContactRefresh message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ContactRefresh
             */
            public static fromObject(object: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.ContactRefresh;

            /**
             * Creates a plain object from a ContactRefresh message. Also converts values to other types if specified.
             * @param message ContactRefresh
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: DeviceCapabilities.DeviceCapabilities.ContactRefresh, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ContactRefresh to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ContactRefresh
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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
