export interface DecodedE2eRekeyKey {
    type: string | number;
    key: Buffer;
}

export interface DecodedE2eRekeyPayload {
    keys: DecodedE2eRekeyKey[];
}

export declare const decodeE2eRekeyPayload: (buffer: Buffer | Uint8Array) => DecodedE2eRekeyPayload;
