import { SignalKeyStore } from '../Types';

export declare class PreKeyManager {
    private store;
    private logger;
    private mutexes;

    constructor(store: SignalKeyStore, logger: any);

    getMutex(keyType: string): { mutex: <T>(code: () => Promise<T>) => Promise<T> };

    processOperations(
        data: any,
        keyType: string,
        transactionCache: any,
        mutations: any,
        isInTransaction: boolean
    ): Promise<void>;

    processDeletions(
        keyType: string,
        ids: string[],
        transactionCache: any,
        mutations: any,
        isInTransaction: boolean
    ): Promise<void>;

    validateDeletions(data: any, keyType: string): Promise<void>;
}
