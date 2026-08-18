import { BinaryNode } from '../../WABinary';
import { USyncProtocol, USyncUser } from '../../Types/USync';

export declare class USyncPictureProtocol implements USyncProtocol {
    name: string;
    type: string;

    constructor(type?: string);

    getQueryElement(): BinaryNode;
    getUserElement(user: USyncUser): BinaryNode | null;
    parser(node: BinaryNode): { id: string | null; directPath: string | null; hash: string | null } | null;
}
