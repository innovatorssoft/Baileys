import { ILogger } from '../Utils/loggerr'
import { SignalKeyStoreWithTransaction } from '../Types'

export declare class LIDMappingStore {
    private readonly mappingCache
    private readonly keys
    private onWhatsAppFunc?
    constructor(keys: SignalKeyStoreWithTransaction, onWhatsAppFunc?: (...jids: string[], logger: ILogger ) => Promise<{
        jid: string
        exists: boolean
        lid?: string
        pn?: string
        username?: string
    }[] | undefined>)
    /**
     * Store LID-PN mapping - USER LEVEL
     */
    storeLIDPNMappings(pairs: {
        lid: string;
        pn: string;
    }[]): Promise<void>
    /**
     * Get LID for PN - Returns device-specific LID based on user mapping
     */
    getLIDForPN(pn: string): Promise<string | null>
    /**
     * Get PN for LID - USER LEVEL with device construction
     */
    getPNForLID(lid: string): Promise<string | null>
}