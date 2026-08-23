import { BinaryNode } from '../../WABinary';
import { USyncProtocol, USyncUser } from '../../Types/USync';

export interface TextStatusResult {
    text: string | null;
    emoji: string | null;
    setAt: Date;
    expiresAt: Date | null;
}

export declare class USyncTextStatusProtocol implements USyncProtocol {
    name: string;

    constructor();

    getQueryElement(): BinaryNode;
    getUserElement(user: USyncUser): BinaryNode | null;
    parser(node: BinaryNode): TextStatusResult | null;
}
