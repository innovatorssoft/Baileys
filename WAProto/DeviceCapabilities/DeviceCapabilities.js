/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.DeviceCapabilities = (function() {

    /**
     * Namespace DeviceCapabilities.
     * @exports DeviceCapabilities
     * @namespace
     */
    var DeviceCapabilities = {};

    DeviceCapabilities.DeviceCapabilities = (function() {

        /**
         * Properties of a DeviceCapabilities.
         * @memberof DeviceCapabilities
         * @interface IDeviceCapabilities
         * @property {DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel|null} [chatLockSupportLevel] DeviceCapabilities chatLockSupportLevel
         * @property {DeviceCapabilities.DeviceCapabilities.ILIDMigration|null} [lidMigration] DeviceCapabilities lidMigration
         * @property {DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast|null} [businessBroadcast] DeviceCapabilities businessBroadcast
         * @property {DeviceCapabilities.DeviceCapabilities.IUserHasAvatar|null} [userHasAvatar] DeviceCapabilities userHasAvatar
         * @property {DeviceCapabilities.DeviceCapabilities.MemberNameTagPrimarySupport|null} [memberNameTagPrimarySupport] DeviceCapabilities memberNameTagPrimarySupport
         * @property {DeviceCapabilities.DeviceCapabilities.IAiThread|null} [aiThread] DeviceCapabilities aiThread
         * @property {DeviceCapabilities.DeviceCapabilities.IAiFbidMigration|null} [aiFbidMigration] DeviceCapabilities aiFbidMigration
         * @property {DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync|null} [bizAiSettingsSync] DeviceCapabilities bizAiSettingsSync
         * @property {DeviceCapabilities.DeviceCapabilities.IContactRefresh|null} [contactRefresh] DeviceCapabilities contactRefresh
         */

        /**
         * Constructs a new DeviceCapabilities.
         * @memberof DeviceCapabilities
         * @classdesc Represents a DeviceCapabilities.
         * @implements IDeviceCapabilities
         * @constructor
         * @param {DeviceCapabilities.IDeviceCapabilities=} [properties] Properties to set
         */
        function DeviceCapabilities(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeviceCapabilities chatLockSupportLevel.
         * @member {DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel|null|undefined} chatLockSupportLevel
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @instance
         */
        DeviceCapabilities.prototype.chatLockSupportLevel = null;

        /**
         * DeviceCapabilities lidMigration.
         * @member {DeviceCapabilities.DeviceCapabilities.ILIDMigration|null|undefined} lidMigration
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @instance
         */
        DeviceCapabilities.prototype.lidMigration = null;

        /**
         * DeviceCapabilities businessBroadcast.
         * @member {DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast|null|undefined} businessBroadcast
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @instance
         */
        DeviceCapabilities.prototype.businessBroadcast = null;

        /**
         * DeviceCapabilities userHasAvatar.
         * @member {DeviceCapabilities.DeviceCapabilities.IUserHasAvatar|null|undefined} userHasAvatar
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @instance
         */
        DeviceCapabilities.prototype.userHasAvatar = null;

        /**
         * DeviceCapabilities memberNameTagPrimarySupport.
         * @member {DeviceCapabilities.DeviceCapabilities.MemberNameTagPrimarySupport|null|undefined} memberNameTagPrimarySupport
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @instance
         */
        DeviceCapabilities.prototype.memberNameTagPrimarySupport = null;

        /**
         * DeviceCapabilities aiThread.
         * @member {DeviceCapabilities.DeviceCapabilities.IAiThread|null|undefined} aiThread
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @instance
         */
        DeviceCapabilities.prototype.aiThread = null;

        /**
         * DeviceCapabilities aiFbidMigration.
         * @member {DeviceCapabilities.DeviceCapabilities.IAiFbidMigration|null|undefined} aiFbidMigration
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @instance
         */
        DeviceCapabilities.prototype.aiFbidMigration = null;

        /**
         * DeviceCapabilities bizAiSettingsSync.
         * @member {DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync|null|undefined} bizAiSettingsSync
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @instance
         */
        DeviceCapabilities.prototype.bizAiSettingsSync = null;

        /**
         * DeviceCapabilities contactRefresh.
         * @member {DeviceCapabilities.DeviceCapabilities.IContactRefresh|null|undefined} contactRefresh
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @instance
         */
        DeviceCapabilities.prototype.contactRefresh = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DeviceCapabilities.prototype, "_chatLockSupportLevel", {
            get: $util.oneOfGetter($oneOfFields = ["chatLockSupportLevel"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DeviceCapabilities.prototype, "_lidMigration", {
            get: $util.oneOfGetter($oneOfFields = ["lidMigration"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DeviceCapabilities.prototype, "_businessBroadcast", {
            get: $util.oneOfGetter($oneOfFields = ["businessBroadcast"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DeviceCapabilities.prototype, "_userHasAvatar", {
            get: $util.oneOfGetter($oneOfFields = ["userHasAvatar"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DeviceCapabilities.prototype, "_memberNameTagPrimarySupport", {
            get: $util.oneOfGetter($oneOfFields = ["memberNameTagPrimarySupport"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DeviceCapabilities.prototype, "_aiThread", {
            get: $util.oneOfGetter($oneOfFields = ["aiThread"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DeviceCapabilities.prototype, "_aiFbidMigration", {
            get: $util.oneOfGetter($oneOfFields = ["aiFbidMigration"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DeviceCapabilities.prototype, "_bizAiSettingsSync", {
            get: $util.oneOfGetter($oneOfFields = ["bizAiSettingsSync"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DeviceCapabilities.prototype, "_contactRefresh", {
            get: $util.oneOfGetter($oneOfFields = ["contactRefresh"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new DeviceCapabilities instance using the specified properties.
         * @function create
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @static
         * @param {DeviceCapabilities.IDeviceCapabilities=} [properties] Properties to set
         * @returns {DeviceCapabilities.DeviceCapabilities} DeviceCapabilities instance
         */
        DeviceCapabilities.create = function create(properties) {
            return new DeviceCapabilities(properties);
        };

        /**
         * Encodes the specified DeviceCapabilities message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.verify|verify} messages.
         * @function encode
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @static
         * @param {DeviceCapabilities.IDeviceCapabilities} message DeviceCapabilities message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceCapabilities.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chatLockSupportLevel != null && Object.hasOwnProperty.call(message, "chatLockSupportLevel"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chatLockSupportLevel);
            if (message.lidMigration != null && Object.hasOwnProperty.call(message, "lidMigration"))
                $root.DeviceCapabilities.DeviceCapabilities.LIDMigration.encode(message.lidMigration, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.businessBroadcast != null && Object.hasOwnProperty.call(message, "businessBroadcast"))
                $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.encode(message.businessBroadcast, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.userHasAvatar != null && Object.hasOwnProperty.call(message, "userHasAvatar"))
                $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar.encode(message.userHasAvatar, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.memberNameTagPrimarySupport != null && Object.hasOwnProperty.call(message, "memberNameTagPrimarySupport"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.memberNameTagPrimarySupport);
            if (message.aiThread != null && Object.hasOwnProperty.call(message, "aiThread"))
                $root.DeviceCapabilities.DeviceCapabilities.AiThread.encode(message.aiThread, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.aiFbidMigration != null && Object.hasOwnProperty.call(message, "aiFbidMigration"))
                $root.DeviceCapabilities.DeviceCapabilities.AiFbidMigration.encode(message.aiFbidMigration, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.bizAiSettingsSync != null && Object.hasOwnProperty.call(message, "bizAiSettingsSync"))
                $root.DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.encode(message.bizAiSettingsSync, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.contactRefresh != null && Object.hasOwnProperty.call(message, "contactRefresh"))
                $root.DeviceCapabilities.DeviceCapabilities.ContactRefresh.encode(message.contactRefresh, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DeviceCapabilities message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @static
         * @param {DeviceCapabilities.IDeviceCapabilities} message DeviceCapabilities message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceCapabilities.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeviceCapabilities message from the specified reader or buffer.
         * @function decode
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DeviceCapabilities.DeviceCapabilities} DeviceCapabilities
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceCapabilities.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeviceCapabilities.DeviceCapabilities();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.chatLockSupportLevel = reader.int32();
                        break;
                    }
                case 2: {
                        message.lidMigration = $root.DeviceCapabilities.DeviceCapabilities.LIDMigration.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.businessBroadcast = $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.userHasAvatar = $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.memberNameTagPrimarySupport = reader.int32();
                        break;
                    }
                case 6: {
                        message.aiThread = $root.DeviceCapabilities.DeviceCapabilities.AiThread.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.aiFbidMigration = $root.DeviceCapabilities.DeviceCapabilities.AiFbidMigration.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        message.bizAiSettingsSync = $root.DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.decode(reader, reader.uint32());
                        break;
                    }
                case 9: {
                        message.contactRefresh = $root.DeviceCapabilities.DeviceCapabilities.ContactRefresh.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DeviceCapabilities message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DeviceCapabilities.DeviceCapabilities} DeviceCapabilities
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceCapabilities.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeviceCapabilities message.
         * @function verify
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeviceCapabilities.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.chatLockSupportLevel != null && message.hasOwnProperty("chatLockSupportLevel")) {
                properties._chatLockSupportLevel = 1;
                switch (message.chatLockSupportLevel) {
                default:
                    return "chatLockSupportLevel: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            }
            if (message.lidMigration != null && message.hasOwnProperty("lidMigration")) {
                properties._lidMigration = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.LIDMigration.verify(message.lidMigration);
                    if (error)
                        return "lidMigration." + error;
                }
            }
            if (message.businessBroadcast != null && message.hasOwnProperty("businessBroadcast")) {
                properties._businessBroadcast = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.verify(message.businessBroadcast);
                    if (error)
                        return "businessBroadcast." + error;
                }
            }
            if (message.userHasAvatar != null && message.hasOwnProperty("userHasAvatar")) {
                properties._userHasAvatar = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar.verify(message.userHasAvatar);
                    if (error)
                        return "userHasAvatar." + error;
                }
            }
            if (message.memberNameTagPrimarySupport != null && message.hasOwnProperty("memberNameTagPrimarySupport")) {
                properties._memberNameTagPrimarySupport = 1;
                switch (message.memberNameTagPrimarySupport) {
                default:
                    return "memberNameTagPrimarySupport: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            }
            if (message.aiThread != null && message.hasOwnProperty("aiThread")) {
                properties._aiThread = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.AiThread.verify(message.aiThread);
                    if (error)
                        return "aiThread." + error;
                }
            }
            if (message.aiFbidMigration != null && message.hasOwnProperty("aiFbidMigration")) {
                properties._aiFbidMigration = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.AiFbidMigration.verify(message.aiFbidMigration);
                    if (error)
                        return "aiFbidMigration." + error;
                }
            }
            if (message.bizAiSettingsSync != null && message.hasOwnProperty("bizAiSettingsSync")) {
                properties._bizAiSettingsSync = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.verify(message.bizAiSettingsSync);
                    if (error)
                        return "bizAiSettingsSync." + error;
                }
            }
            if (message.contactRefresh != null && message.hasOwnProperty("contactRefresh")) {
                properties._contactRefresh = 1;
                {
                    var error = $root.DeviceCapabilities.DeviceCapabilities.ContactRefresh.verify(message.contactRefresh);
                    if (error)
                        return "contactRefresh." + error;
                }
            }
            return null;
        };

        /**
         * Creates a DeviceCapabilities message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {DeviceCapabilities.DeviceCapabilities} DeviceCapabilities
         */
        DeviceCapabilities.fromObject = function fromObject(object) {
            if (object instanceof $root.DeviceCapabilities.DeviceCapabilities)
                return object;
            var message = new $root.DeviceCapabilities.DeviceCapabilities();
            switch (object.chatLockSupportLevel) {
            default:
                if (typeof object.chatLockSupportLevel === "number") {
                    message.chatLockSupportLevel = object.chatLockSupportLevel;
                    break;
                }
                break;
            case "NONE":
            case 0:
                message.chatLockSupportLevel = 0;
                break;
            case "MINIMAL":
            case 1:
                message.chatLockSupportLevel = 1;
                break;
            case "FULL":
            case 2:
                message.chatLockSupportLevel = 2;
                break;
            }
            if (object.lidMigration != null) {
                if (typeof object.lidMigration !== "object")
                    throw TypeError(".DeviceCapabilities.DeviceCapabilities.lidMigration: object expected");
                message.lidMigration = $root.DeviceCapabilities.DeviceCapabilities.LIDMigration.fromObject(object.lidMigration);
            }
            if (object.businessBroadcast != null) {
                if (typeof object.businessBroadcast !== "object")
                    throw TypeError(".DeviceCapabilities.DeviceCapabilities.businessBroadcast: object expected");
                message.businessBroadcast = $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.fromObject(object.businessBroadcast);
            }
            if (object.userHasAvatar != null) {
                if (typeof object.userHasAvatar !== "object")
                    throw TypeError(".DeviceCapabilities.DeviceCapabilities.userHasAvatar: object expected");
                message.userHasAvatar = $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar.fromObject(object.userHasAvatar);
            }
            switch (object.memberNameTagPrimarySupport) {
            default:
                if (typeof object.memberNameTagPrimarySupport === "number") {
                    message.memberNameTagPrimarySupport = object.memberNameTagPrimarySupport;
                    break;
                }
                break;
            case "DISABLED":
            case 0:
                message.memberNameTagPrimarySupport = 0;
                break;
            case "RECEIVER_ENABLED":
            case 1:
                message.memberNameTagPrimarySupport = 1;
                break;
            case "SENDER_ENABLED":
            case 2:
                message.memberNameTagPrimarySupport = 2;
                break;
            }
            if (object.aiThread != null) {
                if (typeof object.aiThread !== "object")
                    throw TypeError(".DeviceCapabilities.DeviceCapabilities.aiThread: object expected");
                message.aiThread = $root.DeviceCapabilities.DeviceCapabilities.AiThread.fromObject(object.aiThread);
            }
            if (object.aiFbidMigration != null) {
                if (typeof object.aiFbidMigration !== "object")
                    throw TypeError(".DeviceCapabilities.DeviceCapabilities.aiFbidMigration: object expected");
                message.aiFbidMigration = $root.DeviceCapabilities.DeviceCapabilities.AiFbidMigration.fromObject(object.aiFbidMigration);
            }
            if (object.bizAiSettingsSync != null) {
                if (typeof object.bizAiSettingsSync !== "object")
                    throw TypeError(".DeviceCapabilities.DeviceCapabilities.bizAiSettingsSync: object expected");
                message.bizAiSettingsSync = $root.DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.fromObject(object.bizAiSettingsSync);
            }
            if (object.contactRefresh != null) {
                if (typeof object.contactRefresh !== "object")
                    throw TypeError(".DeviceCapabilities.DeviceCapabilities.contactRefresh: object expected");
                message.contactRefresh = $root.DeviceCapabilities.DeviceCapabilities.ContactRefresh.fromObject(object.contactRefresh);
            }
            return message;
        };

        /**
         * Creates a plain object from a DeviceCapabilities message. Also converts values to other types if specified.
         * @function toObject
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @static
         * @param {DeviceCapabilities.DeviceCapabilities} message DeviceCapabilities
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeviceCapabilities.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.chatLockSupportLevel != null && message.hasOwnProperty("chatLockSupportLevel")) {
                object.chatLockSupportLevel = options.enums === String ? $root.DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel[message.chatLockSupportLevel] === undefined ? message.chatLockSupportLevel : $root.DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel[message.chatLockSupportLevel] : message.chatLockSupportLevel;
                if (options.oneofs)
                    object._chatLockSupportLevel = "chatLockSupportLevel";
            }
            if (message.lidMigration != null && message.hasOwnProperty("lidMigration")) {
                object.lidMigration = $root.DeviceCapabilities.DeviceCapabilities.LIDMigration.toObject(message.lidMigration, options);
                if (options.oneofs)
                    object._lidMigration = "lidMigration";
            }
            if (message.businessBroadcast != null && message.hasOwnProperty("businessBroadcast")) {
                object.businessBroadcast = $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.toObject(message.businessBroadcast, options);
                if (options.oneofs)
                    object._businessBroadcast = "businessBroadcast";
            }
            if (message.userHasAvatar != null && message.hasOwnProperty("userHasAvatar")) {
                object.userHasAvatar = $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar.toObject(message.userHasAvatar, options);
                if (options.oneofs)
                    object._userHasAvatar = "userHasAvatar";
            }
            if (message.memberNameTagPrimarySupport != null && message.hasOwnProperty("memberNameTagPrimarySupport")) {
                object.memberNameTagPrimarySupport = options.enums === String ? $root.DeviceCapabilities.DeviceCapabilities.MemberNameTagPrimarySupport[message.memberNameTagPrimarySupport] === undefined ? message.memberNameTagPrimarySupport : $root.DeviceCapabilities.DeviceCapabilities.MemberNameTagPrimarySupport[message.memberNameTagPrimarySupport] : message.memberNameTagPrimarySupport;
                if (options.oneofs)
                    object._memberNameTagPrimarySupport = "memberNameTagPrimarySupport";
            }
            if (message.aiThread != null && message.hasOwnProperty("aiThread")) {
                object.aiThread = $root.DeviceCapabilities.DeviceCapabilities.AiThread.toObject(message.aiThread, options);
                if (options.oneofs)
                    object._aiThread = "aiThread";
            }
            if (message.aiFbidMigration != null && message.hasOwnProperty("aiFbidMigration")) {
                object.aiFbidMigration = $root.DeviceCapabilities.DeviceCapabilities.AiFbidMigration.toObject(message.aiFbidMigration, options);
                if (options.oneofs)
                    object._aiFbidMigration = "aiFbidMigration";
            }
            if (message.bizAiSettingsSync != null && message.hasOwnProperty("bizAiSettingsSync")) {
                object.bizAiSettingsSync = $root.DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.toObject(message.bizAiSettingsSync, options);
                if (options.oneofs)
                    object._bizAiSettingsSync = "bizAiSettingsSync";
            }
            if (message.contactRefresh != null && message.hasOwnProperty("contactRefresh")) {
                object.contactRefresh = $root.DeviceCapabilities.DeviceCapabilities.ContactRefresh.toObject(message.contactRefresh, options);
                if (options.oneofs)
                    object._contactRefresh = "contactRefresh";
            }
            return object;
        };

        /**
         * Converts this DeviceCapabilities to JSON.
         * @function toJSON
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeviceCapabilities.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DeviceCapabilities
         * @function getTypeUrl
         * @memberof DeviceCapabilities.DeviceCapabilities
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DeviceCapabilities.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities";
        };

        DeviceCapabilities.AiFbidMigration = (function() {

            /**
             * Properties of an AiFbidMigration.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @interface IAiFbidMigration
             * @property {number|Long|null} [chatDbMigrationTimestamp] AiFbidMigration chatDbMigrationTimestamp
             * @property {number|null} [supportVersion] AiFbidMigration supportVersion
             */

            /**
             * Constructs a new AiFbidMigration.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @classdesc Represents an AiFbidMigration.
             * @implements IAiFbidMigration
             * @constructor
             * @param {DeviceCapabilities.DeviceCapabilities.IAiFbidMigration=} [properties] Properties to set
             */
            function AiFbidMigration(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AiFbidMigration chatDbMigrationTimestamp.
             * @member {number|Long|null|undefined} chatDbMigrationTimestamp
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @instance
             */
            AiFbidMigration.prototype.chatDbMigrationTimestamp = null;

            /**
             * AiFbidMigration supportVersion.
             * @member {number|null|undefined} supportVersion
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @instance
             */
            AiFbidMigration.prototype.supportVersion = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(AiFbidMigration.prototype, "_chatDbMigrationTimestamp", {
                get: $util.oneOfGetter($oneOfFields = ["chatDbMigrationTimestamp"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(AiFbidMigration.prototype, "_supportVersion", {
                get: $util.oneOfGetter($oneOfFields = ["supportVersion"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new AiFbidMigration instance using the specified properties.
             * @function create
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IAiFbidMigration=} [properties] Properties to set
             * @returns {DeviceCapabilities.DeviceCapabilities.AiFbidMigration} AiFbidMigration instance
             */
            AiFbidMigration.create = function create(properties) {
                return new AiFbidMigration(properties);
            };

            /**
             * Encodes the specified AiFbidMigration message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.AiFbidMigration.verify|verify} messages.
             * @function encode
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IAiFbidMigration} message AiFbidMigration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AiFbidMigration.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.chatDbMigrationTimestamp != null && Object.hasOwnProperty.call(message, "chatDbMigrationTimestamp"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.chatDbMigrationTimestamp);
                if (message.supportVersion != null && Object.hasOwnProperty.call(message, "supportVersion"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.supportVersion);
                return writer;
            };

            /**
             * Encodes the specified AiFbidMigration message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.AiFbidMigration.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IAiFbidMigration} message AiFbidMigration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AiFbidMigration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AiFbidMigration message from the specified reader or buffer.
             * @function decode
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DeviceCapabilities.DeviceCapabilities.AiFbidMigration} AiFbidMigration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AiFbidMigration.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeviceCapabilities.DeviceCapabilities.AiFbidMigration();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.chatDbMigrationTimestamp = reader.uint64();
                            break;
                        }
                    case 2: {
                            message.supportVersion = reader.uint32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AiFbidMigration message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DeviceCapabilities.DeviceCapabilities.AiFbidMigration} AiFbidMigration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AiFbidMigration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AiFbidMigration message.
             * @function verify
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AiFbidMigration.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.chatDbMigrationTimestamp != null && message.hasOwnProperty("chatDbMigrationTimestamp")) {
                    properties._chatDbMigrationTimestamp = 1;
                    if (!$util.isInteger(message.chatDbMigrationTimestamp) && !(message.chatDbMigrationTimestamp && $util.isInteger(message.chatDbMigrationTimestamp.low) && $util.isInteger(message.chatDbMigrationTimestamp.high)))
                        return "chatDbMigrationTimestamp: integer|Long expected";
                }
                if (message.supportVersion != null && message.hasOwnProperty("supportVersion")) {
                    properties._supportVersion = 1;
                    if (!$util.isInteger(message.supportVersion))
                        return "supportVersion: integer expected";
                }
                return null;
            };

            /**
             * Creates an AiFbidMigration message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DeviceCapabilities.DeviceCapabilities.AiFbidMigration} AiFbidMigration
             */
            AiFbidMigration.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.AiFbidMigration)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.AiFbidMigration();
                if (object.chatDbMigrationTimestamp != null)
                    if ($util.Long)
                        (message.chatDbMigrationTimestamp = $util.Long.fromValue(object.chatDbMigrationTimestamp)).unsigned = true;
                    else if (typeof object.chatDbMigrationTimestamp === "string")
                        message.chatDbMigrationTimestamp = parseInt(object.chatDbMigrationTimestamp, 10);
                    else if (typeof object.chatDbMigrationTimestamp === "number")
                        message.chatDbMigrationTimestamp = object.chatDbMigrationTimestamp;
                    else if (typeof object.chatDbMigrationTimestamp === "object")
                        message.chatDbMigrationTimestamp = new $util.LongBits(object.chatDbMigrationTimestamp.low >>> 0, object.chatDbMigrationTimestamp.high >>> 0).toNumber(true);
                if (object.supportVersion != null)
                    message.supportVersion = object.supportVersion >>> 0;
                return message;
            };

            /**
             * Creates a plain object from an AiFbidMigration message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.AiFbidMigration} message AiFbidMigration
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AiFbidMigration.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.chatDbMigrationTimestamp != null && message.hasOwnProperty("chatDbMigrationTimestamp")) {
                    if (typeof message.chatDbMigrationTimestamp === "number")
                        object.chatDbMigrationTimestamp = options.longs === String ? String(message.chatDbMigrationTimestamp) : message.chatDbMigrationTimestamp;
                    else
                        object.chatDbMigrationTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.chatDbMigrationTimestamp) : options.longs === Number ? new $util.LongBits(message.chatDbMigrationTimestamp.low >>> 0, message.chatDbMigrationTimestamp.high >>> 0).toNumber(true) : message.chatDbMigrationTimestamp;
                    if (options.oneofs)
                        object._chatDbMigrationTimestamp = "chatDbMigrationTimestamp";
                }
                if (message.supportVersion != null && message.hasOwnProperty("supportVersion")) {
                    object.supportVersion = message.supportVersion;
                    if (options.oneofs)
                        object._supportVersion = "supportVersion";
                }
                return object;
            };

            /**
             * Converts this AiFbidMigration to JSON.
             * @function toJSON
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AiFbidMigration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AiFbidMigration
             * @function getTypeUrl
             * @memberof DeviceCapabilities.DeviceCapabilities.AiFbidMigration
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AiFbidMigration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.AiFbidMigration";
            };

            return AiFbidMigration;
        })();

        DeviceCapabilities.AiThread = (function() {

            /**
             * Properties of an AiThread.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @interface IAiThread
             * @property {DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel|null} [supportLevel] AiThread supportLevel
             */

            /**
             * Constructs a new AiThread.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @classdesc Represents an AiThread.
             * @implements IAiThread
             * @constructor
             * @param {DeviceCapabilities.DeviceCapabilities.IAiThread=} [properties] Properties to set
             */
            function AiThread(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AiThread supportLevel.
             * @member {DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel|null|undefined} supportLevel
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @instance
             */
            AiThread.prototype.supportLevel = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(AiThread.prototype, "_supportLevel", {
                get: $util.oneOfGetter($oneOfFields = ["supportLevel"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new AiThread instance using the specified properties.
             * @function create
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IAiThread=} [properties] Properties to set
             * @returns {DeviceCapabilities.DeviceCapabilities.AiThread} AiThread instance
             */
            AiThread.create = function create(properties) {
                return new AiThread(properties);
            };

            /**
             * Encodes the specified AiThread message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.AiThread.verify|verify} messages.
             * @function encode
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IAiThread} message AiThread message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AiThread.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.supportLevel != null && Object.hasOwnProperty.call(message, "supportLevel"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.supportLevel);
                return writer;
            };

            /**
             * Encodes the specified AiThread message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.AiThread.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IAiThread} message AiThread message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AiThread.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AiThread message from the specified reader or buffer.
             * @function decode
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DeviceCapabilities.DeviceCapabilities.AiThread} AiThread
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AiThread.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeviceCapabilities.DeviceCapabilities.AiThread();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.supportLevel = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AiThread message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DeviceCapabilities.DeviceCapabilities.AiThread} AiThread
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AiThread.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AiThread message.
             * @function verify
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AiThread.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.supportLevel != null && message.hasOwnProperty("supportLevel")) {
                    properties._supportLevel = 1;
                    switch (message.supportLevel) {
                    default:
                        return "supportLevel: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                }
                return null;
            };

            /**
             * Creates an AiThread message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DeviceCapabilities.DeviceCapabilities.AiThread} AiThread
             */
            AiThread.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.AiThread)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.AiThread();
                switch (object.supportLevel) {
                default:
                    if (typeof object.supportLevel === "number") {
                        message.supportLevel = object.supportLevel;
                        break;
                    }
                    break;
                case "NONE":
                case 0:
                    message.supportLevel = 0;
                    break;
                case "INFRA":
                case 1:
                    message.supportLevel = 1;
                    break;
                case "FULL":
                case 2:
                    message.supportLevel = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from an AiThread message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.AiThread} message AiThread
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AiThread.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.supportLevel != null && message.hasOwnProperty("supportLevel")) {
                    object.supportLevel = options.enums === String ? $root.DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel[message.supportLevel] === undefined ? message.supportLevel : $root.DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel[message.supportLevel] : message.supportLevel;
                    if (options.oneofs)
                        object._supportLevel = "supportLevel";
                }
                return object;
            };

            /**
             * Converts this AiThread to JSON.
             * @function toJSON
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AiThread.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AiThread
             * @function getTypeUrl
             * @memberof DeviceCapabilities.DeviceCapabilities.AiThread
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AiThread.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.AiThread";
            };

            /**
             * SupportLevel enum.
             * @name DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel
             * @enum {number}
             * @property {number} NONE=0 NONE value
             * @property {number} INFRA=1 INFRA value
             * @property {number} FULL=2 FULL value
             */
            AiThread.SupportLevel = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "NONE"] = 0;
                values[valuesById[1] = "INFRA"] = 1;
                values[valuesById[2] = "FULL"] = 2;
                return values;
            })();

            return AiThread;
        })();

        DeviceCapabilities.BizAiSettingsSync = (function() {

            /**
             * Properties of a BizAiSettingsSync.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @interface IBizAiSettingsSync
             * @property {boolean|null} [handoffRemovalTimingEnabled] BizAiSettingsSync handoffRemovalTimingEnabled
             */

            /**
             * Constructs a new BizAiSettingsSync.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @classdesc Represents a BizAiSettingsSync.
             * @implements IBizAiSettingsSync
             * @constructor
             * @param {DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync=} [properties] Properties to set
             */
            function BizAiSettingsSync(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BizAiSettingsSync handoffRemovalTimingEnabled.
             * @member {boolean|null|undefined} handoffRemovalTimingEnabled
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @instance
             */
            BizAiSettingsSync.prototype.handoffRemovalTimingEnabled = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(BizAiSettingsSync.prototype, "_handoffRemovalTimingEnabled", {
                get: $util.oneOfGetter($oneOfFields = ["handoffRemovalTimingEnabled"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new BizAiSettingsSync instance using the specified properties.
             * @function create
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync=} [properties] Properties to set
             * @returns {DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync} BizAiSettingsSync instance
             */
            BizAiSettingsSync.create = function create(properties) {
                return new BizAiSettingsSync(properties);
            };

            /**
             * Encodes the specified BizAiSettingsSync message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.verify|verify} messages.
             * @function encode
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync} message BizAiSettingsSync message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BizAiSettingsSync.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.handoffRemovalTimingEnabled != null && Object.hasOwnProperty.call(message, "handoffRemovalTimingEnabled"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.handoffRemovalTimingEnabled);
                return writer;
            };

            /**
             * Encodes the specified BizAiSettingsSync message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IBizAiSettingsSync} message BizAiSettingsSync message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BizAiSettingsSync.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BizAiSettingsSync message from the specified reader or buffer.
             * @function decode
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync} BizAiSettingsSync
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BizAiSettingsSync.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.handoffRemovalTimingEnabled = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BizAiSettingsSync message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync} BizAiSettingsSync
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BizAiSettingsSync.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BizAiSettingsSync message.
             * @function verify
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BizAiSettingsSync.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.handoffRemovalTimingEnabled != null && message.hasOwnProperty("handoffRemovalTimingEnabled")) {
                    properties._handoffRemovalTimingEnabled = 1;
                    if (typeof message.handoffRemovalTimingEnabled !== "boolean")
                        return "handoffRemovalTimingEnabled: boolean expected";
                }
                return null;
            };

            /**
             * Creates a BizAiSettingsSync message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync} BizAiSettingsSync
             */
            BizAiSettingsSync.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync();
                if (object.handoffRemovalTimingEnabled != null)
                    message.handoffRemovalTimingEnabled = Boolean(object.handoffRemovalTimingEnabled);
                return message;
            };

            /**
             * Creates a plain object from a BizAiSettingsSync message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync} message BizAiSettingsSync
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BizAiSettingsSync.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.handoffRemovalTimingEnabled != null && message.hasOwnProperty("handoffRemovalTimingEnabled")) {
                    object.handoffRemovalTimingEnabled = message.handoffRemovalTimingEnabled;
                    if (options.oneofs)
                        object._handoffRemovalTimingEnabled = "handoffRemovalTimingEnabled";
                }
                return object;
            };

            /**
             * Converts this BizAiSettingsSync to JSON.
             * @function toJSON
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BizAiSettingsSync.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for BizAiSettingsSync
             * @function getTypeUrl
             * @memberof DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            BizAiSettingsSync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync";
            };

            return BizAiSettingsSync;
        })();

        DeviceCapabilities.BusinessBroadcast = (function() {

            /**
             * Properties of a BusinessBroadcast.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @interface IBusinessBroadcast
             * @property {boolean|null} [importListEnabled] BusinessBroadcast importListEnabled
             * @property {boolean|null} [companionSupportEnabled] BusinessBroadcast companionSupportEnabled
             * @property {boolean|null} [campaignSyncEnabled] BusinessBroadcast campaignSyncEnabled
             * @property {boolean|null} [insightsSyncEnabled] BusinessBroadcast insightsSyncEnabled
             * @property {number|null} [recipientLimit] BusinessBroadcast recipientLimit
             * @property {boolean|null} [proCompanionSupportEnabled] BusinessBroadcast proCompanionSupportEnabled
             */

            /**
             * Constructs a new BusinessBroadcast.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @classdesc Represents a BusinessBroadcast.
             * @implements IBusinessBroadcast
             * @constructor
             * @param {DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast=} [properties] Properties to set
             */
            function BusinessBroadcast(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BusinessBroadcast importListEnabled.
             * @member {boolean|null|undefined} importListEnabled
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @instance
             */
            BusinessBroadcast.prototype.importListEnabled = null;

            /**
             * BusinessBroadcast companionSupportEnabled.
             * @member {boolean|null|undefined} companionSupportEnabled
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @instance
             */
            BusinessBroadcast.prototype.companionSupportEnabled = null;

            /**
             * BusinessBroadcast campaignSyncEnabled.
             * @member {boolean|null|undefined} campaignSyncEnabled
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @instance
             */
            BusinessBroadcast.prototype.campaignSyncEnabled = null;

            /**
             * BusinessBroadcast insightsSyncEnabled.
             * @member {boolean|null|undefined} insightsSyncEnabled
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @instance
             */
            BusinessBroadcast.prototype.insightsSyncEnabled = null;

            /**
             * BusinessBroadcast recipientLimit.
             * @member {number|null|undefined} recipientLimit
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @instance
             */
            BusinessBroadcast.prototype.recipientLimit = null;

            /**
             * BusinessBroadcast proCompanionSupportEnabled.
             * @member {boolean|null|undefined} proCompanionSupportEnabled
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @instance
             */
            BusinessBroadcast.prototype.proCompanionSupportEnabled = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(BusinessBroadcast.prototype, "_importListEnabled", {
                get: $util.oneOfGetter($oneOfFields = ["importListEnabled"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(BusinessBroadcast.prototype, "_companionSupportEnabled", {
                get: $util.oneOfGetter($oneOfFields = ["companionSupportEnabled"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(BusinessBroadcast.prototype, "_campaignSyncEnabled", {
                get: $util.oneOfGetter($oneOfFields = ["campaignSyncEnabled"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(BusinessBroadcast.prototype, "_insightsSyncEnabled", {
                get: $util.oneOfGetter($oneOfFields = ["insightsSyncEnabled"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(BusinessBroadcast.prototype, "_recipientLimit", {
                get: $util.oneOfGetter($oneOfFields = ["recipientLimit"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(BusinessBroadcast.prototype, "_proCompanionSupportEnabled", {
                get: $util.oneOfGetter($oneOfFields = ["proCompanionSupportEnabled"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new BusinessBroadcast instance using the specified properties.
             * @function create
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast=} [properties] Properties to set
             * @returns {DeviceCapabilities.DeviceCapabilities.BusinessBroadcast} BusinessBroadcast instance
             */
            BusinessBroadcast.create = function create(properties) {
                return new BusinessBroadcast(properties);
            };

            /**
             * Encodes the specified BusinessBroadcast message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.verify|verify} messages.
             * @function encode
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast} message BusinessBroadcast message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BusinessBroadcast.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.importListEnabled != null && Object.hasOwnProperty.call(message, "importListEnabled"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.importListEnabled);
                if (message.companionSupportEnabled != null && Object.hasOwnProperty.call(message, "companionSupportEnabled"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.companionSupportEnabled);
                if (message.campaignSyncEnabled != null && Object.hasOwnProperty.call(message, "campaignSyncEnabled"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.campaignSyncEnabled);
                if (message.insightsSyncEnabled != null && Object.hasOwnProperty.call(message, "insightsSyncEnabled"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.insightsSyncEnabled);
                if (message.recipientLimit != null && Object.hasOwnProperty.call(message, "recipientLimit"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.recipientLimit);
                if (message.proCompanionSupportEnabled != null && Object.hasOwnProperty.call(message, "proCompanionSupportEnabled"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.proCompanionSupportEnabled);
                return writer;
            };

            /**
             * Encodes the specified BusinessBroadcast message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IBusinessBroadcast} message BusinessBroadcast message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BusinessBroadcast.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BusinessBroadcast message from the specified reader or buffer.
             * @function decode
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DeviceCapabilities.DeviceCapabilities.BusinessBroadcast} BusinessBroadcast
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BusinessBroadcast.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.importListEnabled = reader.bool();
                            break;
                        }
                    case 2: {
                            message.companionSupportEnabled = reader.bool();
                            break;
                        }
                    case 3: {
                            message.campaignSyncEnabled = reader.bool();
                            break;
                        }
                    case 4: {
                            message.insightsSyncEnabled = reader.bool();
                            break;
                        }
                    case 5: {
                            message.recipientLimit = reader.int32();
                            break;
                        }
                    case 6: {
                            message.proCompanionSupportEnabled = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BusinessBroadcast message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DeviceCapabilities.DeviceCapabilities.BusinessBroadcast} BusinessBroadcast
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BusinessBroadcast.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BusinessBroadcast message.
             * @function verify
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BusinessBroadcast.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.importListEnabled != null && message.hasOwnProperty("importListEnabled")) {
                    properties._importListEnabled = 1;
                    if (typeof message.importListEnabled !== "boolean")
                        return "importListEnabled: boolean expected";
                }
                if (message.companionSupportEnabled != null && message.hasOwnProperty("companionSupportEnabled")) {
                    properties._companionSupportEnabled = 1;
                    if (typeof message.companionSupportEnabled !== "boolean")
                        return "companionSupportEnabled: boolean expected";
                }
                if (message.campaignSyncEnabled != null && message.hasOwnProperty("campaignSyncEnabled")) {
                    properties._campaignSyncEnabled = 1;
                    if (typeof message.campaignSyncEnabled !== "boolean")
                        return "campaignSyncEnabled: boolean expected";
                }
                if (message.insightsSyncEnabled != null && message.hasOwnProperty("insightsSyncEnabled")) {
                    properties._insightsSyncEnabled = 1;
                    if (typeof message.insightsSyncEnabled !== "boolean")
                        return "insightsSyncEnabled: boolean expected";
                }
                if (message.recipientLimit != null && message.hasOwnProperty("recipientLimit")) {
                    properties._recipientLimit = 1;
                    if (!$util.isInteger(message.recipientLimit))
                        return "recipientLimit: integer expected";
                }
                if (message.proCompanionSupportEnabled != null && message.hasOwnProperty("proCompanionSupportEnabled")) {
                    properties._proCompanionSupportEnabled = 1;
                    if (typeof message.proCompanionSupportEnabled !== "boolean")
                        return "proCompanionSupportEnabled: boolean expected";
                }
                return null;
            };

            /**
             * Creates a BusinessBroadcast message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DeviceCapabilities.DeviceCapabilities.BusinessBroadcast} BusinessBroadcast
             */
            BusinessBroadcast.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.BusinessBroadcast();
                if (object.importListEnabled != null)
                    message.importListEnabled = Boolean(object.importListEnabled);
                if (object.companionSupportEnabled != null)
                    message.companionSupportEnabled = Boolean(object.companionSupportEnabled);
                if (object.campaignSyncEnabled != null)
                    message.campaignSyncEnabled = Boolean(object.campaignSyncEnabled);
                if (object.insightsSyncEnabled != null)
                    message.insightsSyncEnabled = Boolean(object.insightsSyncEnabled);
                if (object.recipientLimit != null)
                    message.recipientLimit = object.recipientLimit | 0;
                if (object.proCompanionSupportEnabled != null)
                    message.proCompanionSupportEnabled = Boolean(object.proCompanionSupportEnabled);
                return message;
            };

            /**
             * Creates a plain object from a BusinessBroadcast message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.BusinessBroadcast} message BusinessBroadcast
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BusinessBroadcast.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.importListEnabled != null && message.hasOwnProperty("importListEnabled")) {
                    object.importListEnabled = message.importListEnabled;
                    if (options.oneofs)
                        object._importListEnabled = "importListEnabled";
                }
                if (message.companionSupportEnabled != null && message.hasOwnProperty("companionSupportEnabled")) {
                    object.companionSupportEnabled = message.companionSupportEnabled;
                    if (options.oneofs)
                        object._companionSupportEnabled = "companionSupportEnabled";
                }
                if (message.campaignSyncEnabled != null && message.hasOwnProperty("campaignSyncEnabled")) {
                    object.campaignSyncEnabled = message.campaignSyncEnabled;
                    if (options.oneofs)
                        object._campaignSyncEnabled = "campaignSyncEnabled";
                }
                if (message.insightsSyncEnabled != null && message.hasOwnProperty("insightsSyncEnabled")) {
                    object.insightsSyncEnabled = message.insightsSyncEnabled;
                    if (options.oneofs)
                        object._insightsSyncEnabled = "insightsSyncEnabled";
                }
                if (message.recipientLimit != null && message.hasOwnProperty("recipientLimit")) {
                    object.recipientLimit = message.recipientLimit;
                    if (options.oneofs)
                        object._recipientLimit = "recipientLimit";
                }
                if (message.proCompanionSupportEnabled != null && message.hasOwnProperty("proCompanionSupportEnabled")) {
                    object.proCompanionSupportEnabled = message.proCompanionSupportEnabled;
                    if (options.oneofs)
                        object._proCompanionSupportEnabled = "proCompanionSupportEnabled";
                }
                return object;
            };

            /**
             * Converts this BusinessBroadcast to JSON.
             * @function toJSON
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BusinessBroadcast.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for BusinessBroadcast
             * @function getTypeUrl
             * @memberof DeviceCapabilities.DeviceCapabilities.BusinessBroadcast
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            BusinessBroadcast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.BusinessBroadcast";
            };

            return BusinessBroadcast;
        })();

        /**
         * ChatLockSupportLevel enum.
         * @name DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel
         * @enum {number}
         * @property {number} NONE=0 NONE value
         * @property {number} MINIMAL=1 MINIMAL value
         * @property {number} FULL=2 FULL value
         */
        DeviceCapabilities.ChatLockSupportLevel = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NONE"] = 0;
            values[valuesById[1] = "MINIMAL"] = 1;
            values[valuesById[2] = "FULL"] = 2;
            return values;
        })();

        DeviceCapabilities.ContactRefresh = (function() {

            /**
             * Properties of a ContactRefresh.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @interface IContactRefresh
             * @property {boolean|null} [refreshSupported] ContactRefresh refreshSupported
             */

            /**
             * Constructs a new ContactRefresh.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @classdesc Represents a ContactRefresh.
             * @implements IContactRefresh
             * @constructor
             * @param {DeviceCapabilities.DeviceCapabilities.IContactRefresh=} [properties] Properties to set
             */
            function ContactRefresh(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ContactRefresh refreshSupported.
             * @member {boolean|null|undefined} refreshSupported
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @instance
             */
            ContactRefresh.prototype.refreshSupported = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(ContactRefresh.prototype, "_refreshSupported", {
                get: $util.oneOfGetter($oneOfFields = ["refreshSupported"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ContactRefresh instance using the specified properties.
             * @function create
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IContactRefresh=} [properties] Properties to set
             * @returns {DeviceCapabilities.DeviceCapabilities.ContactRefresh} ContactRefresh instance
             */
            ContactRefresh.create = function create(properties) {
                return new ContactRefresh(properties);
            };

            /**
             * Encodes the specified ContactRefresh message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.ContactRefresh.verify|verify} messages.
             * @function encode
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IContactRefresh} message ContactRefresh message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactRefresh.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.refreshSupported != null && Object.hasOwnProperty.call(message, "refreshSupported"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.refreshSupported);
                return writer;
            };

            /**
             * Encodes the specified ContactRefresh message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.ContactRefresh.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IContactRefresh} message ContactRefresh message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactRefresh.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ContactRefresh message from the specified reader or buffer.
             * @function decode
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DeviceCapabilities.DeviceCapabilities.ContactRefresh} ContactRefresh
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactRefresh.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeviceCapabilities.DeviceCapabilities.ContactRefresh();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.refreshSupported = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ContactRefresh message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DeviceCapabilities.DeviceCapabilities.ContactRefresh} ContactRefresh
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactRefresh.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ContactRefresh message.
             * @function verify
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ContactRefresh.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.refreshSupported != null && message.hasOwnProperty("refreshSupported")) {
                    properties._refreshSupported = 1;
                    if (typeof message.refreshSupported !== "boolean")
                        return "refreshSupported: boolean expected";
                }
                return null;
            };

            /**
             * Creates a ContactRefresh message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DeviceCapabilities.DeviceCapabilities.ContactRefresh} ContactRefresh
             */
            ContactRefresh.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.ContactRefresh)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.ContactRefresh();
                if (object.refreshSupported != null)
                    message.refreshSupported = Boolean(object.refreshSupported);
                return message;
            };

            /**
             * Creates a plain object from a ContactRefresh message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.ContactRefresh} message ContactRefresh
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContactRefresh.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.refreshSupported != null && message.hasOwnProperty("refreshSupported")) {
                    object.refreshSupported = message.refreshSupported;
                    if (options.oneofs)
                        object._refreshSupported = "refreshSupported";
                }
                return object;
            };

            /**
             * Converts this ContactRefresh to JSON.
             * @function toJSON
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContactRefresh.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ContactRefresh
             * @function getTypeUrl
             * @memberof DeviceCapabilities.DeviceCapabilities.ContactRefresh
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ContactRefresh.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.ContactRefresh";
            };

            return ContactRefresh;
        })();

        DeviceCapabilities.LIDMigration = (function() {

            /**
             * Properties of a LIDMigration.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @interface ILIDMigration
             * @property {number|Long|null} [chatDbMigrationTimestamp] LIDMigration chatDbMigrationTimestamp
             */

            /**
             * Constructs a new LIDMigration.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @classdesc Represents a LIDMigration.
             * @implements ILIDMigration
             * @constructor
             * @param {DeviceCapabilities.DeviceCapabilities.ILIDMigration=} [properties] Properties to set
             */
            function LIDMigration(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LIDMigration chatDbMigrationTimestamp.
             * @member {number|Long|null|undefined} chatDbMigrationTimestamp
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @instance
             */
            LIDMigration.prototype.chatDbMigrationTimestamp = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(LIDMigration.prototype, "_chatDbMigrationTimestamp", {
                get: $util.oneOfGetter($oneOfFields = ["chatDbMigrationTimestamp"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new LIDMigration instance using the specified properties.
             * @function create
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.ILIDMigration=} [properties] Properties to set
             * @returns {DeviceCapabilities.DeviceCapabilities.LIDMigration} LIDMigration instance
             */
            LIDMigration.create = function create(properties) {
                return new LIDMigration(properties);
            };

            /**
             * Encodes the specified LIDMigration message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.LIDMigration.verify|verify} messages.
             * @function encode
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.ILIDMigration} message LIDMigration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LIDMigration.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.chatDbMigrationTimestamp != null && Object.hasOwnProperty.call(message, "chatDbMigrationTimestamp"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.chatDbMigrationTimestamp);
                return writer;
            };

            /**
             * Encodes the specified LIDMigration message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.LIDMigration.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.ILIDMigration} message LIDMigration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LIDMigration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LIDMigration message from the specified reader or buffer.
             * @function decode
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DeviceCapabilities.DeviceCapabilities.LIDMigration} LIDMigration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LIDMigration.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeviceCapabilities.DeviceCapabilities.LIDMigration();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.chatDbMigrationTimestamp = reader.uint64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LIDMigration message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DeviceCapabilities.DeviceCapabilities.LIDMigration} LIDMigration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LIDMigration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LIDMigration message.
             * @function verify
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LIDMigration.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.chatDbMigrationTimestamp != null && message.hasOwnProperty("chatDbMigrationTimestamp")) {
                    properties._chatDbMigrationTimestamp = 1;
                    if (!$util.isInteger(message.chatDbMigrationTimestamp) && !(message.chatDbMigrationTimestamp && $util.isInteger(message.chatDbMigrationTimestamp.low) && $util.isInteger(message.chatDbMigrationTimestamp.high)))
                        return "chatDbMigrationTimestamp: integer|Long expected";
                }
                return null;
            };

            /**
             * Creates a LIDMigration message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DeviceCapabilities.DeviceCapabilities.LIDMigration} LIDMigration
             */
            LIDMigration.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.LIDMigration)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.LIDMigration();
                if (object.chatDbMigrationTimestamp != null)
                    if ($util.Long)
                        (message.chatDbMigrationTimestamp = $util.Long.fromValue(object.chatDbMigrationTimestamp)).unsigned = true;
                    else if (typeof object.chatDbMigrationTimestamp === "string")
                        message.chatDbMigrationTimestamp = parseInt(object.chatDbMigrationTimestamp, 10);
                    else if (typeof object.chatDbMigrationTimestamp === "number")
                        message.chatDbMigrationTimestamp = object.chatDbMigrationTimestamp;
                    else if (typeof object.chatDbMigrationTimestamp === "object")
                        message.chatDbMigrationTimestamp = new $util.LongBits(object.chatDbMigrationTimestamp.low >>> 0, object.chatDbMigrationTimestamp.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a LIDMigration message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.LIDMigration} message LIDMigration
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LIDMigration.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.chatDbMigrationTimestamp != null && message.hasOwnProperty("chatDbMigrationTimestamp")) {
                    if (typeof message.chatDbMigrationTimestamp === "number")
                        object.chatDbMigrationTimestamp = options.longs === String ? String(message.chatDbMigrationTimestamp) : message.chatDbMigrationTimestamp;
                    else
                        object.chatDbMigrationTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.chatDbMigrationTimestamp) : options.longs === Number ? new $util.LongBits(message.chatDbMigrationTimestamp.low >>> 0, message.chatDbMigrationTimestamp.high >>> 0).toNumber(true) : message.chatDbMigrationTimestamp;
                    if (options.oneofs)
                        object._chatDbMigrationTimestamp = "chatDbMigrationTimestamp";
                }
                return object;
            };

            /**
             * Converts this LIDMigration to JSON.
             * @function toJSON
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LIDMigration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for LIDMigration
             * @function getTypeUrl
             * @memberof DeviceCapabilities.DeviceCapabilities.LIDMigration
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            LIDMigration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.LIDMigration";
            };

            return LIDMigration;
        })();

        /**
         * MemberNameTagPrimarySupport enum.
         * @name DeviceCapabilities.DeviceCapabilities.MemberNameTagPrimarySupport
         * @enum {number}
         * @property {number} DISABLED=0 DISABLED value
         * @property {number} RECEIVER_ENABLED=1 RECEIVER_ENABLED value
         * @property {number} SENDER_ENABLED=2 SENDER_ENABLED value
         */
        DeviceCapabilities.MemberNameTagPrimarySupport = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "DISABLED"] = 0;
            values[valuesById[1] = "RECEIVER_ENABLED"] = 1;
            values[valuesById[2] = "SENDER_ENABLED"] = 2;
            return values;
        })();

        DeviceCapabilities.UserHasAvatar = (function() {

            /**
             * Properties of a UserHasAvatar.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @interface IUserHasAvatar
             * @property {boolean|null} [userHasAvatar] UserHasAvatar userHasAvatar
             */

            /**
             * Constructs a new UserHasAvatar.
             * @memberof DeviceCapabilities.DeviceCapabilities
             * @classdesc Represents a UserHasAvatar.
             * @implements IUserHasAvatar
             * @constructor
             * @param {DeviceCapabilities.DeviceCapabilities.IUserHasAvatar=} [properties] Properties to set
             */
            function UserHasAvatar(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UserHasAvatar userHasAvatar.
             * @member {boolean|null|undefined} userHasAvatar
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @instance
             */
            UserHasAvatar.prototype.userHasAvatar = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(UserHasAvatar.prototype, "_userHasAvatar", {
                get: $util.oneOfGetter($oneOfFields = ["userHasAvatar"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new UserHasAvatar instance using the specified properties.
             * @function create
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IUserHasAvatar=} [properties] Properties to set
             * @returns {DeviceCapabilities.DeviceCapabilities.UserHasAvatar} UserHasAvatar instance
             */
            UserHasAvatar.create = function create(properties) {
                return new UserHasAvatar(properties);
            };

            /**
             * Encodes the specified UserHasAvatar message. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.UserHasAvatar.verify|verify} messages.
             * @function encode
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IUserHasAvatar} message UserHasAvatar message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserHasAvatar.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userHasAvatar != null && Object.hasOwnProperty.call(message, "userHasAvatar"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.userHasAvatar);
                return writer;
            };

            /**
             * Encodes the specified UserHasAvatar message, length delimited. Does not implicitly {@link DeviceCapabilities.DeviceCapabilities.UserHasAvatar.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.IUserHasAvatar} message UserHasAvatar message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserHasAvatar.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a UserHasAvatar message from the specified reader or buffer.
             * @function decode
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DeviceCapabilities.DeviceCapabilities.UserHasAvatar} UserHasAvatar
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserHasAvatar.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.userHasAvatar = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a UserHasAvatar message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DeviceCapabilities.DeviceCapabilities.UserHasAvatar} UserHasAvatar
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserHasAvatar.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a UserHasAvatar message.
             * @function verify
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserHasAvatar.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.userHasAvatar != null && message.hasOwnProperty("userHasAvatar")) {
                    properties._userHasAvatar = 1;
                    if (typeof message.userHasAvatar !== "boolean")
                        return "userHasAvatar: boolean expected";
                }
                return null;
            };

            /**
             * Creates a UserHasAvatar message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DeviceCapabilities.DeviceCapabilities.UserHasAvatar} UserHasAvatar
             */
            UserHasAvatar.fromObject = function fromObject(object) {
                if (object instanceof $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar)
                    return object;
                var message = new $root.DeviceCapabilities.DeviceCapabilities.UserHasAvatar();
                if (object.userHasAvatar != null)
                    message.userHasAvatar = Boolean(object.userHasAvatar);
                return message;
            };

            /**
             * Creates a plain object from a UserHasAvatar message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @static
             * @param {DeviceCapabilities.DeviceCapabilities.UserHasAvatar} message UserHasAvatar
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserHasAvatar.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.userHasAvatar != null && message.hasOwnProperty("userHasAvatar")) {
                    object.userHasAvatar = message.userHasAvatar;
                    if (options.oneofs)
                        object._userHasAvatar = "userHasAvatar";
                }
                return object;
            };

            /**
             * Converts this UserHasAvatar to JSON.
             * @function toJSON
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserHasAvatar.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for UserHasAvatar
             * @function getTypeUrl
             * @memberof DeviceCapabilities.DeviceCapabilities.UserHasAvatar
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            UserHasAvatar.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DeviceCapabilities.DeviceCapabilities.UserHasAvatar";
            };

            return UserHasAvatar;
        })();

        return DeviceCapabilities;
    })();

    return DeviceCapabilities;
})();

module.exports = $root;
