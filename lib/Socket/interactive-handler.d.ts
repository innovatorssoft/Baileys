import { proto } from '../../WAProto';
import { SocketConfig, WAMessage } from '../Types';

export declare class Zenbo {
    private relayMessage;
    private waUploadToServer;
    private config;
    private sock;

    constructor(
        waUploadToServerOrSock: any,
        relayMessageFn?: (jid: string, message: proto.IMessage, opts?: any) => Promise<any>,
        config?: SocketConfig,
        sock?: any
    );

    detectType(content: any): string | null;

    handlePayment(content: any, quoted?: WAMessage): Promise<any>;

    handleProduct(content: any, jid?: string, quoted?: WAMessage): Promise<any>;

    handleInteractive(content: any, jid?: string, quoted?: WAMessage): Promise<any>;

    handleInteractiveButtons(content: any, jid?: string, quoted?: WAMessage): Promise<any>;

    handleAlbum(content: any, jid: string, quoted?: WAMessage): Promise<any>;

    handleEvent(content: any, jid: string, quoted?: WAMessage): Promise<any>;

    handlePollResult(content: any, jid: string, quoted?: WAMessage): Promise<any>;

    handleGroupStory(content: any, jid: string, quoted?: WAMessage): Promise<any>;

    sendStatusWhatsApp(content: any, jids?: string[]): Promise<any>;
}

/** @deprecated Use Zenbo instead */
export declare const Baron: typeof Zenbo;
