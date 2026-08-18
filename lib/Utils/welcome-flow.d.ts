export interface WelcomeFaqItem {
    id: string;
    title: string;
    description?: string;
}

export interface WelcomeFlowConfig {
    greeting?: string;
    footer?: string;
    buttonText?: string;
    faqs?: WelcomeFaqItem[];
    sectionTitle?: string;
    typingDelayMs?: number;
    persistPath?: string | null;
    ignoreGroups?: boolean;
    ignoreNewsletter?: boolean;
    ignoreBroadcast?: boolean;
    onGreet?: ((jid: string, message: any) => Promise<void> | void) | null;
    onFaqReply?: ((jid: string, faqId: string, message: any) => Promise<void> | void) | null;
}

export interface WelcomeFlowInstance {
    listen: () => void;
    stop: () => void;
    reset: (jid: string) => void;
    resetAll: () => void;
    hasGreeted: (jid: string) => boolean;
}

export declare const createWelcomeFlow: (
    sock: any,
    config?: WelcomeFlowConfig
) => WelcomeFlowInstance;
