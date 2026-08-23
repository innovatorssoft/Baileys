import { BinaryNode } from '../../WABinary';
import { USyncProtocol, USyncUser } from '../../Types/USync';

export declare class USyncBusinessProtocol implements USyncProtocol {
    name: string;
    profileVersion: string;

    constructor(profileVersion?: string);

    getQueryElement(): BinaryNode;
    getUserElement(user: USyncUser): BinaryNode | null;
    parser(node: BinaryNode): any;
}
