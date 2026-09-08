"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveMessageTarget = exports.isJidTarget = exports.isUsernameTarget = exports.validateUsername = exports.isValidUsername = exports.normalizeUsername = void 0;

const Username_1 = require("../Types/Username");

/**
 * Normalizes a WhatsApp username by stripping leading '@', trimming whitespace,
 * and converting to lower case.
 */
const normalizeUsername = (username) => {
    if (typeof username !== 'string') {
        throw new Username_1.UsernameInvalidError(String(username), 'Username must be a string');
    }
    let normalized = username.trim();
    if (normalized.startsWith('@')) {
        normalized = normalized.slice(1).trim();
    }
    return normalized.toLowerCase();
};
exports.normalizeUsername = normalizeUsername;

/**
 * Validates whether a username conforms to WhatsApp username rules:
 * - 3 to 30 characters
 * - Only lowercase alphanumeric, '.', and '_'
 * - Cannot start or end with '.' or '_'
 * - Cannot contain consecutive dots '..'
 * - Cannot be purely numeric
 */
const isValidUsername = (username) => {
    if (typeof username !== 'string') {
        return false;
    }
    let u = username.trim();
    if (u.startsWith('@')) {
        u = u.slice(1).trim();
    }
    u = u.toLowerCase();
    if (u.length < 3 || u.length > 30) {
        return false;
    }
    // Purely numeric is rejected (treated as phone number)
    if (/^\d+$/.test(u)) {
        return false;
    }
    // Must start and end with alphanumeric, middle can contain . and _
    if (!/^[a-z0-9][a-z0-9._]*[a-z0-9]$/.test(u)) {
        return false;
    }
    // No consecutive dots
    if (u.includes('..')) {
        return false;
    }
    return true;
};
exports.isValidUsername = isValidUsername;

/**
 * Validates and normalizes a username, throwing UsernameInvalidError if invalid.
 */
const validateUsername = (username) => {
    const normalized = (0, exports.normalizeUsername)(username);
    if (!normalized || normalized.length < 3) {
        throw new Username_1.UsernameInvalidError(username, 'Username must be at least 3 characters long');
    }
    if (normalized.length > 30) {
        throw new Username_1.UsernameInvalidError(username, 'Username cannot exceed 30 characters');
    }
    if (/^\d+$/.test(normalized)) {
        throw new Username_1.UsernameInvalidError(username, 'Username cannot be purely numeric');
    }
    if (normalized.includes('..')) {
        throw new Username_1.UsernameInvalidError(username, 'Username cannot contain consecutive dots');
    }
    if (!/^[a-z0-9][a-z0-9._]*[a-z0-9]$/.test(normalized)) {
        throw new Username_1.UsernameInvalidError(username, 'Username must start and end with letters or numbers and contain only letters, numbers, dots, and underscores');
    }
    return normalized;
};
exports.validateUsername = validateUsername;

/**
 * Returns true if the target represents an unambiguous username:
 * - An object with { type: 'username', username: string }
 * - A string starting with '@' (e.g. '@javed')
 */
const isUsernameTarget = (target) => {
    if (typeof target === 'object' && target !== null && 'type' in target) {
        return target.type === 'username' && typeof target.username === 'string';
    }
    if (typeof target === 'string') {
        const trimmed = target.trim();
        return trimmed.startsWith('@') && trimmed.length > 1;
    }
    return false;
};
exports.isUsernameTarget = isUsernameTarget;

/**
 * Returns true if the target represents a JID target.
 */
const isJidTarget = (target) => {
    if (typeof target === 'object' && target !== null && 'type' in target) {
        return target.type === 'jid' && typeof target.jid === 'string';
    }
    if (typeof target === 'string') {
        return !target.trim().startsWith('@');
    }
    return false;
};
exports.isJidTarget = isJidTarget;

/**
 * Resolves a MessageTarget into a typed target descriptor.
 */
const resolveMessageTarget = (target) => {
    if (typeof target === 'object' && target !== null && 'type' in target) {
        if (target.type === 'username') {
            return {
                type: 'username',
                username: (0, exports.validateUsername)(target.username)
            };
        }
        if (target.type === 'jid') {
            return {
                type: 'jid',
                jid: target.jid
            };
        }
    }
    if (typeof target === 'string') {
        if ((0, exports.isUsernameTarget)(target)) {
            return {
                type: 'username',
                username: (0, exports.validateUsername)(target)
            };
        }
        return {
            type: 'jid',
            jid: target
        };
    }
    throw new Username_1.UsernameInvalidError(String(target), 'Invalid message target');
};
exports.resolveMessageTarget = resolveMessageTarget;
