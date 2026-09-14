import { SignalAuthState } from '../Types'
import { SignalRepository } from '../Types/Signal'

export declare function makeLibSignalRepository(auth: SignalAuthState, onWhatsAppFunc?: (...jids: string[]) => Promise<{
    jid: string
    exists: boolean
    lid?: string
    pn?: string
    username?: string
}[] | undefined>): SignalRepository