import { BinaryNode } from '../WABinary';
import { GroupMetadata, SocketConfig } from '../Types';

export declare const extractAIGroupMetadata: (result: BinaryNode) => GroupMetadata;

export declare const makeAIGroupsSocket: (sockOrConfig?: any) => any;
