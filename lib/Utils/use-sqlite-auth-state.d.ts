import { AuthenticationCreds, AuthenticationState } from '../Types';

export interface SqliteAuthOptions {
    dbPath?: string;
    database?: any;
}

export declare function useSqliteAuthState(opts: SqliteAuthOptions): Promise<{
    state: AuthenticationState;
    saveCreds: () => Promise<void>;
}>;
