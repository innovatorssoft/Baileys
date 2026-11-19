import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace Reporting. */
export namespace Reporting {

    /** Properties of a Field. */
    interface IField {

        /** Field minVersion */
        minVersion?: (number|null);

        /** Field maxVersion */
        maxVersion?: (number|null);

        /** Field isMessage */
        isMessage?: (boolean|null);

        /** Field subfield */
        subfield?: ({ [k: string]: Reporting.IField }|null);
    }

    /** Represents a Field. */
    class Field implements IField {

        /**
         * Constructs a new Field.
         * @param [properties] Properties to set
         */
        constructor(properties?: Reporting.IField);

        /** Field minVersion. */
        public minVersion?: (number|null);

        /** Field maxVersion. */
        public maxVersion?: (number|null);

        /** Field isMessage. */
        public isMessage?: (boolean|null);

        /** Field subfield. */
        public subfield: { [k: string]: Reporting.IField };

        /**
         * Creates a new Field instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Field instance
         */
        public static create(properties?: Reporting.IField): Reporting.Field;

        /**
         * Encodes the specified Field message. Does not implicitly {@link Reporting.Field.verify|verify} messages.
         * @param message Field message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Reporting.IField, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Field message, length delimited. Does not implicitly {@link Reporting.Field.verify|verify} messages.
         * @param message Field message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Reporting.IField, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Field message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Field
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Reporting.Field;

        /**
         * Decodes a Field message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Field
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Reporting.Field;

        /**
         * Verifies a Field message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Field message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Field
         */
        public static fromObject(object: { [k: string]: any }): Reporting.Field;

        /**
         * Creates a plain object from a Field message. Also converts values to other types if specified.
         * @param message Field
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Reporting.Field, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Field to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Field
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Config. */
    interface IConfig {

        /** Config field */
        field?: ({ [k: string]: Reporting.IField }|null);
    }

    /** Represents a Config. */
    class Config implements IConfig {

        /**
         * Constructs a new Config.
         * @param [properties] Properties to set
         */
        constructor(properties?: Reporting.IConfig);

        /** Config field. */
        public field: { [k: string]: Reporting.IField };

        /**
         * Creates a new Config instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Config instance
         */
        public static create(properties?: Reporting.IConfig): Reporting.Config;

        /**
         * Encodes the specified Config message. Does not implicitly {@link Reporting.Config.verify|verify} messages.
         * @param message Config message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Reporting.IConfig, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Config message, length delimited. Does not implicitly {@link Reporting.Config.verify|verify} messages.
         * @param message Config message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Reporting.IConfig, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Config message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Reporting.Config;

        /**
         * Decodes a Config message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Reporting.Config;

        /**
         * Verifies a Config message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Config message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Config
         */
        public static fromObject(object: { [k: string]: any }): Reporting.Config;

        /**
         * Creates a plain object from a Config message. Also converts values to other types if specified.
         * @param message Config
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Reporting.Config, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Config to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Config
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
