export declare const WWW_GQL_IDS: Record<string, string>;
export declare const FACEBOOK_GQL_IDS: Record<string, string>;
export declare const WAMO_GQL_IDS: Record<string, string>;
export declare const CLIENT_PERSIST_GQL_IDS: Record<string, string>;

export declare const executeWWWGraphQL: (
    docId: string | number,
    variables: any,
    accessToken?: string,
    dataPath?: string | null,
    lang?: string,
    endpoint?: string
) => Promise<any>;

export declare const executeFacebookGraphQL: (
    docId: string | number,
    variables: any,
    accessToken?: string,
    dataPath?: string | null,
    lang?: string
) => Promise<any>;

export declare const executeWamoGraphQL: (
    docId: string | number,
    variables: any,
    wamoAuth?: any,
    dataPath?: string | null,
    wamoHost?: string
) => Promise<any>;

export declare const makeGraphQLSocket: (sock: any) => any;
