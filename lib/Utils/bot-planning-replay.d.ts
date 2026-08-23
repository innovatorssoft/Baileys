import { PlanningStep } from './meta-compositing';

export interface ReplayPlanningOptions {
    description?: string;
    placeholderText?: string;
    stepDelayMs?: number;
    finalPauseMs?: number;
    abortOnDisconnect?: boolean;
    sendOptions?: any;
    useNativeMeta?: boolean;
}

export declare const replayPlanning: (
    sock: any,
    jid: string,
    steps: PlanningStep[],
    finalContent: any,
    options?: ReplayPlanningOptions
) => Promise<any>;

export declare const replayPlanningOnly: (
    sock: any,
    jid: string,
    steps: PlanningStep[],
    options?: ReplayPlanningOptions
) => Promise<any>;

export declare const buildReasoningSteps: (titles: string[]) => PlanningStep[];

export declare const buildSearchSteps: (titles: string[]) => PlanningStep[];

export declare const mixedSteps: (
    defs: Array<{ title: string; body?: string; type?: 'reasoning' | 'search' | 'plain' }>
) => PlanningStep[];
