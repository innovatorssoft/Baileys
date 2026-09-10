"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameResolutionTimeoutError = exports.UsernameProtocolError = exports.UsernameResolutionError = exports.UsernameInvalidError = exports.UsernameNotFoundError = exports.UsernameError = void 0;

class UsernameError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.UsernameError = UsernameError;

class UsernameNotFoundError extends UsernameError {
    constructor(username) {
        super(`Username not found: ${username}`);
        this.username = username;
    }
}
exports.UsernameNotFoundError = UsernameNotFoundError;

class UsernameInvalidError extends UsernameError {
    constructor(username, reason) {
        super(`Invalid username "${username}"${reason ? `: ${reason}` : ''}`);
        this.username = username;
    }
}
exports.UsernameInvalidError = UsernameInvalidError;

class UsernameResolutionError extends UsernameError {
    constructor(username, originalError) {
        super(`Failed to resolve username "${username}": ${originalError?.message || originalError || 'Unknown error'}`);
        this.username = username;
        this.originalError = originalError;
    }
}
exports.UsernameResolutionError = UsernameResolutionError;

class UsernameProtocolError extends UsernameError {
    constructor(message) {
        super(message);
    }
}
exports.UsernameProtocolError = UsernameProtocolError;

class UsernameResolutionTimeoutError extends UsernameError {
    constructor(username) {
        super(`Username resolution timed out for "${username}"`);
        this.username = username;
    }
}
exports.UsernameResolutionTimeoutError = UsernameResolutionTimeoutError;
