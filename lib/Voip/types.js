"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallMediaType = exports.CallDirection = exports.CallState = void 0;
exports.CallState = {
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
exports.CallDirection = {
    Outgoing: "outgoing",
    Incoming: "incoming",
};
exports.CallMediaType = {
    Audio: "audio",
    Video: "video",
};
