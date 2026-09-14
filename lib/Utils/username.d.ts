import { MessageTarget } from '../Types/Username';

export declare const normalizeUsername: (username: string) => string;

export declare const isValidUsername: (username: string) => boolean;

export declare const validateUsername: (username: string) => string;

export declare const isUsernameTarget: (target: any) => boolean;

export declare const isJidTarget: (target: any) => boolean;

export declare const resolveMessageTarget: (target: MessageTarget) => {
    type: 'username';
    username: string;
} | {
    type: 'jid';
    jid: string;
};
