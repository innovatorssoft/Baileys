import type { ActiveCall, CallOptions } from '../Voip';

export type WAInitiateCallOptions = CallOptions & {
    isVideo?: boolean;
};

export type WAInitiateCallResult = ActiveCall | {
    id?: string;
    callId?: string;
    to: string;
    isVideo?: boolean;
};

export type WACallParticipant = {
    jid: string;
    callId?: string;
};
