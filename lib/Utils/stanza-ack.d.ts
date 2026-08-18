import { BinaryNode } from '../WABinary';

/**
 * Builds an ACK stanza for a received node.
 * Pure function -- no I/O, no side effects.
 */
export declare function buildAckStanza(node: BinaryNode, errorCode?: number, meId?: string): BinaryNode;
