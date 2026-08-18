import { BinaryNode } from '../../WABinary';
import { USyncProtocol, USyncUser } from '../../Types/USync';

export declare const USYNC_FEATURES: string[];

export declare class USyncFeatureProtocol implements USyncProtocol {
    name: string;
    features: string[];

    constructor(features?: string[]);

    getQueryElement(): BinaryNode;
    getUserElement(user: USyncUser): BinaryNode | null;
    parser(node: BinaryNode): any;
}
