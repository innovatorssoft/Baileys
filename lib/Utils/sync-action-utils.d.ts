import { BaileysEventEmitter } from '../Types';
import { proto } from '../../WAProto';

export interface SyncActionResult {
    event: 'contacts.upsert' | 'lid-mapping.update';
    data: any;
}

export declare const processContactAction: (
    action: proto.SyncAction.IContactAction,
    id: string | undefined,
    logger?: any
) => SyncActionResult[];

export declare const emitSyncActionResults: (
    ev: BaileysEventEmitter,
    results: SyncActionResult[]
) => void;
