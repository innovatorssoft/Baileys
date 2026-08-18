export declare const PlanningStepStatus: {
    readonly IN_PROGRESS: 0;
    readonly DONE: 1;
    readonly FAILED: 2;
};

export interface PlanningStep {
    title: string;
    body?: string;
    status?: number;
    isReasoning?: boolean;
    isEnhancedSearch?: boolean;
}

export interface ProgressIndicatorOptions {
    description?: string;
    steps?: PlanningStep[];
    estimatedMs?: number;
    placeholderText?: string;
    useNativeMeta?: boolean;
}

export interface SendMetaCompositedOptions extends ProgressIndicatorOptions {
    thinkingMs?: number;
    sendOptions?: any;
}

export declare const supportsMetaRendering: (_jid: string, config?: any) => boolean;

export declare const buildProgressIndicator: (
    description?: string,
    steps?: PlanningStep[],
    estimatedMs?: number
) => any;

export declare const buildCompositingPlaceholder: (opts?: ProgressIndicatorOptions) => any;

export declare const buildPlainPlaceholder: (
    description?: string,
    steps?: PlanningStep[],
    placeholderText?: string
) => { text: string };

export declare const metaTyping: (
    sock: any,
    jid: string,
    opts?: ProgressIndicatorOptions
) => Promise<any>;

export declare const sendMetaComposited: (
    sock: any,
    jid: string,
    content: any,
    opts?: SendMetaCompositedOptions
) => Promise<any>;

export declare const buildSteps: (
    titles: string[],
    status?: number
) => PlanningStep[];
