import { BinaryNode } from '../../WABinary';
import { USyncProtocol, USyncUser } from '../../Types/USync';

export declare class USyncSidelistProtocol implements USyncProtocol {
    name: string;
    useLidAddressing: boolean;

    constructor(useLidAddressing?: boolean);

    getQueryElement(): BinaryNode;
    getUserElement(user: USyncUser): BinaryNode | null;
    parser(node: BinaryNode): { type: string | null } | null;
}
