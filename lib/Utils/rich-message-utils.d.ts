export function tokenizeCode(code: any, language?: string): {
    highlightType: any;
    codeContent: string | undefined;
}[];
export function toUnified(submessages: any, uuid: any): {
    response_id: any;
    sections: any;
};
export function prepareRichResponseMessage(content: any): {
    messageContextInfo: {
        botMetadata: {
            verificationMetadata: {
                proofs: {
                    certificateChain: Uint8Array[];
                    version: number;
                    useCase: number;
                    signature: Uint8Array;
                }[];
            };
        };
    };
    botForwardedMessage: {
        message: {
            richResponseMessage: any;
        };
    };
};
export function botMetadataSignature(): Uint8Array;
export function botMetadataCertificate(length?: number): Uint8Array;
export function wrapToBotForwardedMessage(richResponseMessage: any): {
    messageContextInfo: {
        botMetadata: {
            verificationMetadata: {
                proofs: {
                    certificateChain: Uint8Array[];
                    version: number;
                    useCase: number;
                    signature: Uint8Array;
                }[];
            };
        };
    };
    botForwardedMessage: {
        message: {
            richResponseMessage: any;
        };
    };
};
export const DEFAULT_GRID_IMAGE_WIDTH: number;
export const DEFAULT_GRID_IMAGE_HEIGHT: number;
export const DEFAULT_GRID_ASSET_EXPIRATION_MS: number;
export function getGridAssetExpiration(ttlMs?: number): number;
export function prepareGridImageMessageContent(jid: string, album: any[], options?: any): Promise<any>;
