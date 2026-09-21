/**
 * Shared type definitions for baileys VoIP.
 *
 * @author InnovatorsSoft
 */
/** Mirrors the WhatsApp WASM `CallState` enum. */
export const CallState = {
    Idle: 0,
    Calling: 1,
    PreacceptReceived: 2,
    ReceivedCall: 3,
    AcceptSent: 4,
    AcceptReceived: 5,
    Active: 6,
    ActiveElsewhere: 7,
    Ending: 13,
};

export const CallDirection = {
    Outgoing: "outgoing",
    Incoming: "incoming",
};

export const CallMediaType = {
    Audio: "audio",
    Video: "video",
};
