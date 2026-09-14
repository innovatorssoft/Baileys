export interface UsernameResolutionResult {
    username: string;
    jid?: string;
    lid?: string;
    pn?: string;
}

export interface UsernameCacheEntry {
    username: string;
    jid?: string;
    lid?: string;
    pn?: string;
    resolvedAt: number;
    notFound?: boolean;
}

export type MessageTarget =
    | string
    | {
        type: 'jid';
        jid: string;
    }
    | {
        type: 'username';
        username: string;
    };

export declare class UsernameError extends Error {
    constructor(message: string);
}

export declare class UsernameNotFoundError extends UsernameError {
    readonly username: string;
    constructor(username: string);
}

export declare class UsernameInvalidError extends UsernameError {
    readonly username: string;
    constructor(username: string, reason?: string);
}

export declare class UsernameResolutionError extends UsernameError {
    readonly username: string;
    readonly originalError?: any;
    constructor(username: string, originalError?: any);
}

export declare class UsernameProtocolError extends UsernameError {
    constructor(message: string);
}

export declare class UsernameResolutionTimeoutError extends UsernameError {
    readonly username: string;
    constructor(username: string);
}
