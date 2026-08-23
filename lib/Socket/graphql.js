"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGraphQLSocket = exports.CLIENT_PERSIST_GQL_IDS = exports.WWW_GQL_IDS = exports.FACEBOOK_GQL_IDS = exports.WAMO_GQL_IDS = exports.executeWamoGraphQL = exports.executeFacebookGraphQL = exports.executeWWWGraphQL = void 0;

const boom_1 = require("@hapi/boom");

const ENDPOINTS = {
    WWW: 'https://graph.whatsapp.com/graphql',
    ACS: 'https://acs.whatsapp.com/graphql',
    WAMO_PATH: '/api/wamo/graphql/'
};

const WAMO_APP_ID = '1015890928915437';
const WWW_DEFAULT_TOKEN = `WA|${WAMO_APP_ID}|3201f239340c1c8ec6262a6dad04200e`;

const parseGraphQLResponse = (json, dataPath) => {
    if (json.errors?.length) {
        const msgs = json.errors.map((e) => e.message || 'Unknown error').join(', ');
        const code = json.errors[0]?.extensions?.error_code || 400;
        throw new boom_1.Boom(`GraphQL error: ${msgs}`, { statusCode: code, data: json.errors[0] });
    }
    const response = dataPath ? json?.data?.[dataPath] : json?.data;
    if (response === undefined) {
        throw new boom_1.Boom('Unexpected GraphQL response structure', { statusCode: 400, data: json });
    }
    return response;
};

const executeWWWGraphQL = async (
    docId,
    variables,
    accessToken,
    dataPath = null,
    lang = 'en',
    endpoint = ENDPOINTS.WWW
) => {
    const token = accessToken || WWW_DEFAULT_TOKEN;
    const body = JSON.stringify({ access_token: token, doc_id: String(docId), variables, lang });
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    });
    if (!res.ok) {
        throw new boom_1.Boom(`GraphQL HTTP error ${res.status}`, { statusCode: res.status });
    }
    const json = await res.json();
    return parseGraphQLResponse(json, dataPath);
};
exports.executeWWWGraphQL = executeWWWGraphQL;

const executeFacebookGraphQL = (docId, variables, accessToken, dataPath = null, lang = 'en') =>
    executeWWWGraphQL(docId, variables, accessToken, dataPath, lang, ENDPOINTS.ACS);
exports.executeFacebookGraphQL = executeFacebookGraphQL;

const executeWamoGraphQL = async (
    docId,
    variables,
    wamoAuth = {},
    dataPath = null,
    wamoHost = 'wamo.whatsapp.net'
) => {
    const { accessToken = WWW_DEFAULT_TOKEN, credential = '', userId = '' } = wamoAuth;
    const params = new URLSearchParams({
        access_token: accessToken,
        credential,
        user_id: String(userId),
        app_id: WAMO_APP_ID,
        doc_id: String(docId),
        variables: JSON.stringify(variables)
    });
    const url = `https://${wamoHost}${ENDPOINTS.WAMO_PATH}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
    });
    if (!res.ok) {
        throw new boom_1.Boom(`Wamo GraphQL HTTP error ${res.status}`, { statusCode: res.status });
    }
    const json = await res.json();
    return parseGraphQLResponse(json, dataPath);
};
exports.executeWamoGraphQL = executeWamoGraphQL;

const WAMO_GQL_IDS = {
    BLOKS_GET_LAYOUT: '35761428053502960',
    CREATE_USER: '26643102025382056',
    DELETE_USER: '26847597944871230',
    DYI_JOB_CREATE: '35432158949761170',
    DYI_JOB_DELETE: '35418212507825480',
    DYI_JOB_STATUS: '26233222629644330',
    HEARTBEAT: '26147852544878404',
    HIDE_PAGE: '26762670266664464',
    HIDE_PROMO: '26672924455626300',
    LINK_USER: '26986545907702584',
    REPORT_PROMO: '26170110515981668',
    START_VIEWER_SESSION: '25895257976843090',
    UNHIDE_PAGE: '26357347627241176',
    UNHIDE_PAGE_V2: '26343585518664600',
    USER_BASIC: '26217108451265492'
};
exports.WAMO_GQL_IDS = WAMO_GQL_IDS;

const FACEBOOK_GQL_IDS = {
    ACDC_CREATE_COMMERCE_NONCE: '24264828513176160',
    BIZ_ALERTS_NOTIFICATION_LIST: '25131061249916280',
    BIZ_ALERTS_UPDATE: '31887288120915504',
    CTWA_ADS_CONTEXT_BIZ: '26795336300063576',
    DIGITAL_CONTENT_IAP_PURCHASE_QUOTE: '24407486212227380',
    GET_COMPLIANCE: '25758882000383880',
    GET_CUSTOM_URLS: '24381430531538260',
    GET_DCP_PRODUCTS: '24562080436794784',
    SET_COMPLIANCE: '25904531552477560',
    USERNAME_RECOMMENDATIONS: '24622018447392760'
};
exports.FACEBOOK_GQL_IDS = FACEBOOK_GQL_IDS;

const WWW_GQL_IDS = {
    // Meta AI
    AI_IMAGINE_EDIT_VIDEO_STYLES: '27077837108487436',
    AI_STUDIO_MEMORY_DELETE_ALL: '30717961127818650',
    AI_STUDIO_MEMORY_DELETE: '9705428856224794',
    AI_STUDIO_MEMORY_QUERY: '31947510941561276',
    AI_CHARACTER_UPDATE_HIDE_STATUS: '9487449704689544',
    AI_CREATION_CHECK_CREATED_BY_ME: '25141566425478200',
    AI_CREATION_DELETE_PERSONA: '24692252033716044',
    AI_CREATION_FETCH_CREATED_BOT: '25201089862855984',
    AI_CREATION_FETCH_VOICE_SAMPLE: '25257088623922964',
    AI_CREATION_UPDATE_PERSONA: '25011855005109940',
    AI_CREATION_UPLOAD_IMAGE: '25003350059353070',
    AI_HOME_FETCH_USER_CREATED_PERSONAS: '26593306827004416',
    AI_HOME_SEARCH: '27216563884595110',
    AI_SUBSCRIPTION_STATE: '36037182252547600',
    AI_SUBSCRIPTION_USAGE_DATA: '25534888536186100',
    META_AI_MEMORY_DELETE: '24675700195394532',
    META_AI_MEMORY_DELETE_ALL: '25139336568989424',
    META_AI_MEMORY_QUERY: '24926755306989290',
    META_AI_UNIFIED_MEMORY_QUERY: '25207057475554616',
    META_AI_VOICE_OPTIONS_FETCH: '25173439348954280',
    META_AI_VOICE_OPTIONS_WITH_DEFAULT_FETCH: '32678535865070708',
    META_AI_MEMORY_OPT_OUT_STATUS: '32233077506339604',
    META_AI_MEMORY_OPT_OUT_UPDATE: '24192448100382070',
    META_AI_COMMAND_GET: '26391941983796720',
    META_CONFIG_FETCH: '26061411083512356',
    META_POI_TYPE_AHEAD: '24998731673114764',
    // Imagine / GenAI
    IMAGINE_CANVAS_CONTENT: '25210964258554530',
    IMAGINE_EDIT: '26387089294279400',
    IMAGINE_EDIT_VIDEO: '34646600944984156',
    IMAGINE_EXPAND: '27439000172356856',
    IMAGINE_GENERATE_ANIMATE: '26556281783984270',
    IMAGINE_INTENTS: '27226922903577250',
    IMAGINE_ME_DELETE_ONBOARDING: '25412186125078290',
    IMAGINE_ME_IS_ONBOARDED: '25177591448557896',
    IMAGINE_ME_ONBOARDING: '33085607387721668',
    IMAGINE_ME_ONBOARDING_WITH_VALIDATION: '33430299463235084',
    IMAGINE_REPORT: '26056343243953412',
    IMAGINE_SPOTLIGHT: '24814269768178584',
    IMAGINE_VIDEO_STATUS: '34577682511875320',
    IMMERSIVE_CREATION_COMPLETE: '25751460157775136',
    IMMERSIVE_CREATION_CONFIG: '32047877418194044',
    GEN_AI_IMAGINE_3P_FOR_INTENTS: '26873302172253410',
    // Avatar
    AVATAR_USER_RECOVERY: '24876192928715390',
    LOAD_AVATAR_POSES: '25262916630008930',
    SAVE_AVATAR_POSE: '24194307116878704',
    SELECTED_OR_DEFAULT_POSE: '24956844700642720',
    // Events
    ADD_EVENT_INVITATIONS: '26095825686706664',
    CREATE_EVENT: '27259582783645464',
    DELETE_EVENT: '24671535952543812',
    GET_EVENT: '26814174831581200',
    GET_EVENT_LINK_PREVIEW: '26580394538296892',
    GET_OR_CREATE_EVENT_INVITE_LINK: '26392982740362904',
    LIST_EVENTS: '35283909937920624',
    LIST_PRESET_COVER_IMAGES: '34976018872012652',
    REMOVE_EVENT_INVITATIONS: '27723734560563308',
    REMOVE_SELF_EVENT_INVITATION: '27063717026648636',
    ROTATE_EVENT_INVITE_LINK: '27134834146102810',
    UPDATE_EVENT: '35415093074772810',
    UPDATE_EVENT_RSVP: '25954023907630800',
    // Payments (Brazil PIX)
    BR_AUTHORIZE_BIOMETRIC_PAYMENT: '26860182267017040',
    BR_COMPLETE_ENROLLMENT_REGISTRATION: '34346544594993864',
    BR_GET_AUTH_OPTIONS: '26954282557514064',
    BR_SAVE_CPF: '25491798377107610',
    COMPLETE_PIX_TRANSACTION: '25561969973442564',
    CREATE_ENROLLMENT: '34570903025891764',
    GEN_CREATE_PAYMENT_KEY: '24662763616751130',
    GEN_DELETE_PAYMENT_KEY: '25206218195637620',
    GEN_SHARE_REMITTANCE_TRANSACTION_INTENT: '27219114284360650',
    GEN_UPDATE_PAYMENT_KEY: '31853210500991230',
    GET_BILL_COMPLAINT_URL: '33320245170908124',
    GET_BILL_RECEIPT: '24825217813815704',
    GET_BILLER_PLANS: '27309428811987468',
    GET_ELIGIBILITY: '26212557348384404',
    GET_ENROLLMENT_REGISTRATION_OPTIONS: '26215100541486172',
    GET_MERCHANT_PIX_INFO: '32899184613062020',
    GET_PAYMENT_KEY: '32245076985140016',
    GET_PIX_BANK_LIST: '23883352801362930',
    GET_REMITTANCE_TRANSACTION_DETAILS: '27062965096645132',
    PAYMENT_HEALTH_CHECKS: '26301245572841100',
    PAYMENT_REMINDER_CANCEL: '24755605054137416',
    PAYMENT_REMINDER_CREATE: '26322317040760200',
    PAYMENT_REMINDER_GET: '26644104721946830',
    PAYMENT_REMINDER_STOP: '26813099368301640',
    PAY_WITH_PIX_PRECHECK: '25489011890740690',
    SAVE_REMITTANCE_PAYMENT_MESSAGE_ID: '26662893096684910',
    SAVE_SENDER_PAYMENT_MESSAGE_PREFERENCE: '35084492951197548',
    // Payments (UPI India)
    GET_UPI_ACCOUNTS: '25691302307224710',
    GET_UPI_LITE_DETAILS: '25808397275476136',
    GET_UPI_PURPOSE_LIMITING_KEY: '25956012240759790',
    GET_UPI_TOKEN: '25639185495767704',
    UPI_ACCEPT_MANDATE: '26786867597629452',
    UPI_CREATE_MANDATE: '26775212245448044',
    UPI_EXECUTE_MANDATE: '26461549356828410',
    UPI_PAUSE_MANDATE: '27067583129520630',
    UPI_REJECT_MANDATE: '26669988755996836',
    UPI_RESUME_MANDATE: '26691956223780310',
    UPI_REVOKE_MANDATE: '25917438317930590',
    ENROLL_AND_GET_INCENTIVE_REFERRAL_ID: '26794756530116496',
    // Payments (PMTA)
    PMTA_GET_AI_CONTROLS: '35629699809954692',
    PMTA_SET_AI_CONTROLS: '35241761128770990',
    // Wamo
    WAMO_AFS_SUBSCRIPTION_INFO: '26173991525527520',
    WAMO_PROMO_ID_DELETE: '35985621974354824',
    WAMO_PROMO_ID_QUERY: '35176707691976468',
    WAMO_PROMO_ID_SET: '27944525051814324',
    WAMO_SUB_CANCEL_SUBSCRIPTION: '24229142763394572',
    WAMO_SUB_OVERRIDE_STATUS: '24524888373876350',
    WAMO_SUB_QUERY_STATUS: '25015488928115160',
    // Business / Catalog
    BRAND_IDS_GET_PHONE_NUMBERS: '33159498536982770',
    BUSINESS_INTERACTION_PILLS: '26641674408836110',
    GET_BUSINESS_PROFILE_WEBSITE_SHIM_URL: '32216187747994820',
    WA_WEB_BIZ_CREATE_ORDER_JOB: '26504097415860764',
    WA_WEB_BIZ_GRAPHQL_REFRESH_CART: '25888664220811280',
    WA_WEB_BIZ_QUERY_ORDER_JOB: '26400495852915744',
    WHATSAPP_CATALOG_REPORT_PRODUCT: '31943750621890740',
    EXTERNAL_CTX_AUTHORISE_WA_CHAT: '31162432756736010',
    // User / account
    FACEBOOK_ACCOUNT_NAME: '25250471057951830',
    INSTAGRAM_ACCOUNT_NAME: '25214758521544980',
    GET_SIGNUP_METADATA: '26051411631187570',
    GET_SUBSCRIPTIONS_AND_FEATURE_FLAGS: '26245030708467560',
    REGISTER_ALL_ACCOUNTS: '33722449810701640',
    REGISTER_INIT: '25224082377250600',
    CHECK_DEVICE_REGISTRATION: '27544422375150964',
    CANONICAL_ENT_QUERY_FEATURE: '24676915942008136',
    CANONICAL_ENT_SETUP_FEATURE: '24192659730425376',
    CANONICAL_ENT_TEARDOWN_FEATURE: '30858669277110520',
    WWW_CANONICAL_USER_VALID: '25129145013440740',
    WAFFLE_USER_AGE_CHECK: '26764575806469450',
    // Support / misc
    BOT_PROACTIVE_MSG_CONTROL_STATUS: '24651002484600324',
    BOT_PROACTIVE_MSG_CONTROL_UPDATE: '24122315620764244',
    BOT_PROFILES_SYNC: '25828046330205656',
    CREATE_DOGFOODING_TASK: '26434237576236230',
    CREATE_GROUP_SUSPENSION_APPEAL: '25646047815072530',
    DELETE_USER_BILL_ACCOUNT: '24937622855831030',
    EDIT_GEN_AI_TASK: '24357066917314970',
    DELETE_GEN_AI_TASKS: '24358846127109424',
    GET_SUBSCRIBED_TASKS_FOR_THREAD: '25301053199520772',
    HATCH_CHANNEL_LINK: '27380458404880336',
    HATCH_CHANNEL_METADATA: '36296584079940370',
    LOG_SERVER_SENT_INVITE_INTENT: '26580640204871220',
    OXYGEN_CHANNEL_OPT_IN: '32987565744221084',
    OXYGEN_CHANNEL_OPT_OUT: '25230178203329240',
    OXYGEN_CHANNEL_STATUS: '25600766796255944',
    PASL_GET_LOGGER_CONFIG: '25514254748263110',
    QUICK_PROMOTION_BATCH_FETCH: '27370264315996308',
    SUBMIT_BUG_REPORT: '25907249708909480',
    SUPPORT_CONTACT_FORM: '25272895205718040',
    UNIFIED_CONVERSATION_STARTERS: '34344055808526010',
    WA_GIZMO_POST_METADATA: '26390610653941050',
    WA_QUICK_PROMOTION_LOG: '24712276558462964',
    WA_SUPPORT_MESSAGE_FEEDBACK: '25850332711237184',
    GET_AI_PREDICTED_AGE: '34158896507030940',
    FETCH_META_AI_MODES: '26061411083512356'
};
exports.WWW_GQL_IDS = WWW_GQL_IDS;

const CLIENT_PERSIST_GQL_IDS = {
    ADD_MEMU_PROFILE_PHOTOS: '24668200096214476',
    CREATE_MEMU_PROFILE: '26069800429275530',
    DROP_IN_IMAGINE_GENERATE: '34481380128115810',
    FB_MEMU_PERMISSION_QUERY: '26457099770583124',
    FETCH_META_AI_MODES: '24685093691140660',
    GEN_AI_EDIT_ANIMATE: '26618842254369468',
    GEN_AI_EDIT_BACKDROP_SUGGESTIONS: '6884142735042929',
    GEN_AI_EDIT_IMAGE_BACKDROP: '24768153272860376',
    GEN_AI_EDIT_SUGGESTIONS: '27713400524973656',
    GEN_AI_EDIT_UPLOAD_AUTHENTIC_IMAGE: '8289643261132632',
    GEN_AI_IMAGINE_BULK_SEND_MEDIA_TO_CHAT: '9621096711262312',
    GEN_AI_IMAGINE_CANVAS_API: '26120441040992056',
    GEN_AI_IMAGINE_DOWNLOAD_MEDIA: '34879204598389744',
    GEN_AI_IMAGINE_EDIT: '26723939223901400',
    GEN_AI_IMAGINE_GENERATE_FLASH: '25517143427978588',
    GEN_AI_IMAGINE_GENERATE_FROM_IMAGE: '26234794616158744',
    GEN_AI_IMAGINE_GENERATE: '25754106557586292',
    GEN_AI_IMAGINE_GENERATE_STREAMING: '26021242964174344',
    GEN_AI_IMAGINE_HAS_MEMU_PROFILE: '25660710533526260',
    GEN_AI_IMAGINE_INSPIRATION_CANVAS_API: '26630710513263730',
    GEN_AI_IMAGINE_PROMPT_SUMMARIZATION: '8356011394456431',
    GEN_AI_IMAGINE_REGENERATE: '25723954363936656',
    GEN_AI_IMAGINE_RESTYLE_SECTIONS: '30782654914682896',
    GEN_AI_IMAGINE_SEND_MEDIA_TO_CHAT: '9040988989304072',
    GEN_AI_IMAGINE_SUGGESTIONS: '26477038211947360',
    GEN_AI_IMAGINE_UPDATE_MEMU_PROFILE_PERMISSION: '24987386417587030',
    GEN_AI_MEMU_UPDATE_VOICE: '25208555012114170',
    GEN_AI_SOCIAL_ENTITY_DETAILS: '27413840814867420',
    GEN_AI_VERIFY_MEMU_PHOTOS: '30310486848564932',
    GET_MEMU_STICKER_BY_ID: '8894972063896486',
    MAI_UNIFIED_USER: '24664034623258600',
    MAI_UNIFIED_USER_QUERY: '24774891068876300',
    MAI_UNIFIED_USER_RESET: '26233658572900960',
    MEMU_PREVIEW_PHOTO: '7416457868478773',
    MEMU_PROFILE_QUERY: '25494748856799176',
    MEMU_UPDATE_PROFILE: '8634007059959370',
    META_AI_FEEDBACK: '24461110943539464',
    META_AI_INTENT_CARD_NUX_ELIGIBILITY_RESET: '7906012969525854',
    META_AI_INTENT_CARD_NUX_IMPRESSION: '29146653178312916',
    META_AI_INTENT_CARD_NUX_IMPRESSION_QUERY: '7397847270321576',
    META_AI_MODES_QUERY: '9990098797780674',
    META_AI_RICH_PLACE_DETAILS: '26652957641066240',
    META_AI_SIDE_BY_SIDE_SURVEY_RESPONSE: '23972248465795460',
    META_AI_STOP_GENERATION: '25449755391321784',
    META_AI_BIZ_AGENT_VOICE_ATTACHMENTS: '32359943033604852',
    META_AI_CUSTOMIZATION_GEN_AI_SET_MODE: '31825632867051630',
    SIMPLE_ECHO: '8800911093353750',
    UPDATE_MEMU_SELFIE: '26374541155506570'
};
exports.CLIENT_PERSIST_GQL_IDS = CLIENT_PERSIST_GQL_IDS;

const makeGraphQLSocket = (sock) => {
    let _accessToken = null;
    let _tokenPromise = null;
    let _wamoAuth = {};
    let _wamoHost = 'wamo.whatsapp.net';

    const setAccessToken = (token) => {
        _accessToken = token;
        _tokenPromise = null;
    };

    const setWamoAuth = (auth, host = null) => {
        _wamoAuth = auth;
        if (host) _wamoHost = host;
    };

    const acquireAccessToken = () => {
        if (_accessToken) return Promise.resolve(_accessToken);
        if (_tokenPromise) return _tokenPromise;
        _tokenPromise = (async () => {
            try {
                const nonceData = await sock.wwwGetNonce?.();
                const nonce = nonceData?.nonce ?? nonceData;
                const tokenData = await sock.wwwExchangeNonce?.(nonce);
                const token = tokenData?.access_token ?? tokenData;
                _accessToken = token;
                return token;
            } finally {
                _tokenPromise = null;
            }
        })();
        return _tokenPromise;
    };

    const www = async (docId, variables, dataPath = null) => {
        const token = await acquireAccessToken();
        return executeWWWGraphQL(docId, variables, token, dataPath);
    };

    const fb = async (docId, variables, dataPath = null) => {
        const token = await acquireAccessToken();
        return executeFacebookGraphQL(docId, variables, token, dataPath);
    };

    const wamo = (docId, variables, dataPath = null) =>
        executeWamoGraphQL(docId, variables, _wamoAuth, dataPath, _wamoHost);

    return {
        ...sock,
        setAccessToken,
        setWamoAuth,
        acquireAccessToken,
        executeWWWGraphQL,
        executeFacebookGraphQL,
        executeWamoGraphQL,

        // Meta AI
        aiStudioMemoryQuery: () => www(WWW_GQL_IDS.AI_STUDIO_MEMORY_QUERY, {}, 'xwa2_ai_studio_wa_memory_query'),
        aiStudioMemoryDelete: (id) => www(WWW_GQL_IDS.AI_STUDIO_MEMORY_DELETE, { id }, 'xwa2_ai_studio_wa_memory_delete'),
        aiStudioMemoryDeleteAll: () =>
            www(WWW_GQL_IDS.AI_STUDIO_MEMORY_DELETE_ALL, {}, 'xwa2_ai_studio_wa_memory_delete_all'),
        metaAiMemoryQuery: () => www(WWW_GQL_IDS.META_AI_MEMORY_QUERY, {}, 'xwa2_meta_ai_memory'),
        metaAiUnifiedMemoryQuery: () => www(WWW_GQL_IDS.META_AI_UNIFIED_MEMORY_QUERY, {}, 'xwa2_meta_ai_unified_memory'),
        metaAiMemoryDelete: (id) => www(WWW_GQL_IDS.META_AI_MEMORY_DELETE, { id }, 'xwa2_meta_ai_memory_delete'),
        metaAiMemoryDeleteAll: () => www(WWW_GQL_IDS.META_AI_MEMORY_DELETE_ALL, {}, 'xwa2_meta_ai_memory_delete_all'),
        metaAiMemoryOptOutStatus: () =>
            www(WWW_GQL_IDS.META_AI_MEMORY_OPT_OUT_STATUS, {}, 'xwa2_meta_ai_wa_memory_opt_out_status'),
        metaAiMemoryOptOutUpdate: (optOut) =>
            www(WWW_GQL_IDS.META_AI_MEMORY_OPT_OUT_UPDATE, { opt_out: optOut }, 'xwa2_meta_ai_wa_memory_opt_out_update'),
        metaAiCommandGet: (chatJid, command) =>
            www(WWW_GQL_IDS.META_AI_COMMAND_GET, { chat_jid: chatJid, command }, 'xwa2_meta_ai_command_get'),
        metaAiVoiceOptionsFetch: () =>
            www(WWW_GQL_IDS.META_AI_VOICE_OPTIONS_FETCH, {}, 'xwa2_meta_ai_voice_wa_options_fetch'),
        metaAiVoiceOptionsWithDefaultFetch: () =>
            www(WWW_GQL_IDS.META_AI_VOICE_OPTIONS_WITH_DEFAULT_FETCH, {}, 'xwa2_meta_ai_voice_wa_options_with_default_fetch'),
        aiSubscriptionState: () => www(WWW_GQL_IDS.AI_SUBSCRIPTION_STATE, {}, 'xwa2_ai_subscription_state'),
        aiSubscriptionUsageData: () => www(WWW_GQL_IDS.AI_SUBSCRIPTION_USAGE_DATA, {}, 'xwa2_ai_subscription_usage_data'),

        // Imagine / GenAI
        imagineEdit: (imageId, prompt) => www(WWW_GQL_IDS.IMAGINE_EDIT, { image_id: imageId, prompt }, 'xwa2_imagine_edit'),
        imagineEditVideo: (videoId, styleId) =>
            www(WWW_GQL_IDS.IMAGINE_EDIT_VIDEO, { video_id: videoId, style_id: styleId }, 'xwa2_imagine_edit_video'),
        imagineExpand: (imageId, direction) =>
            www(WWW_GQL_IDS.IMAGINE_EXPAND, { image_id: imageId, direction }, 'xwa2_imagine_expand'),
        imagineGenerateAnimate: (imageId, options = {}) =>
            www(WWW_GQL_IDS.IMAGINE_GENERATE_ANIMATE, { image_id: imageId, ...options }, 'xwa2_imagine_generate_animate'),
        imagineIntents: (prompt) => www(WWW_GQL_IDS.IMAGINE_INTENTS, { prompt }, 'xwa2_imagine_intents'),
        imagineCanvasContent: (canvasId) =>
            www(WWW_GQL_IDS.IMAGINE_CANVAS_CONTENT, { canvas_id: canvasId }, 'xwa2_imagine_canvas_content'),
        imagineSpotlight: (prompt, options = {}) =>
            www(WWW_GQL_IDS.IMAGINE_SPOTLIGHT, { prompt, ...options }, 'xwa2_imagine_spotlight'),
        imagineVideoStatus: (jobId) => www(WWW_GQL_IDS.IMAGINE_VIDEO_STATUS, { job_id: jobId }, 'xwa2_imagine_video_status'),
        imagineReport: (imageId, reason) =>
            www(WWW_GQL_IDS.IMAGINE_REPORT, { image_id: imageId, reason }, 'xwa2_imagine_report'),
        imagineMeIsOnboarded: () => www(WWW_GQL_IDS.IMAGINE_ME_IS_ONBOARDED, {}, 'xwa2_imagine_me_is_onboarded'),
        imagineMeOnboarding: (input) => www(WWW_GQL_IDS.IMAGINE_ME_ONBOARDING, { input }, 'xwa2_imagine_me_onboarding'),
        imagineMeOnboardingWithValidation: (input) =>
            www(WWW_GQL_IDS.IMAGINE_ME_ONBOARDING_WITH_VALIDATION, { input }, 'xwa2_imagine_me_onboarding_with_validation'),
        imagineMeDeleteOnboarding: () =>
            www(WWW_GQL_IDS.IMAGINE_ME_DELETE_ONBOARDING, {}, 'xwa2_imagine_me_delete_onboarding'),
        imagineEditVideoStyles: () =>
            www(WWW_GQL_IDS.AI_IMAGINE_EDIT_VIDEO_STYLES, {}, 'xwa2_ai_imagine_edit_video_styles'),

        // AI Creation
        aiCreationFetchCreatedBot: (botId) =>
            www(WWW_GQL_IDS.AI_CREATION_FETCH_CREATED_BOT, { bot_id: botId }, 'xwa2_ai_creation_fetch_created_bot'),
        aiCreationUpdatePersona: (botId, updates) =>
            www(WWW_GQL_IDS.AI_CREATION_UPDATE_PERSONA, { bot_id: botId, ...updates }, 'xwa2_ai_creation_update_persona'),
        aiCreationDeletePersona: (botId) =>
            www(WWW_GQL_IDS.AI_CREATION_DELETE_PERSONA, { bot_id: botId }, 'xwa2_ai_creation_delete_persona'),
        aiCreationUploadImage: (imageData) =>
            www(WWW_GQL_IDS.AI_CREATION_UPLOAD_IMAGE, { image_data: imageData }, 'xwa2_ai_creation_upload_image'),
        aiCreationCheckCreatedByMe: (botId) =>
            www(WWW_GQL_IDS.AI_CREATION_CHECK_CREATED_BY_ME, { bot_id: botId }, 'xwa2_ai_creation_check_created_by_me'),
        aiCreationFetchVoiceSample: (voiceId) =>
            www(WWW_GQL_IDS.AI_CREATION_FETCH_VOICE_SAMPLE, { voice_id: voiceId }, 'xwa2_ai_creation_fetch_voice_sample'),
        aiHomeFetchUserCreatedPersonas: () =>
            www(WWW_GQL_IDS.AI_HOME_FETCH_USER_CREATED_PERSONAS, {}, 'xwa2_ai_home_fetch_user_created_personas'),
        aiHomeSearch: (query) => www(WWW_GQL_IDS.AI_HOME_SEARCH, { query }, 'xwa2_ai_home_search'),
        aiCharacterUpdateHideStatus: (botId, hidden) =>
            www(
                WWW_GQL_IDS.AI_CHARACTER_UPDATE_HIDE_STATUS,
                { bot_id: botId, hidden },
                'xwa2_ai_character_update_hide_status'
            ),
        botProactiveMessageControlStatus: (botId) =>
            www(WWW_GQL_IDS.BOT_PROACTIVE_MSG_CONTROL_STATUS, { bot_id: botId }, 'xwa2_bot_proactive_message_control_status'),
        botProactiveMessageControlUpdate: (botId, enabled) =>
            www(
                WWW_GQL_IDS.BOT_PROACTIVE_MSG_CONTROL_UPDATE,
                { bot_id: botId, enabled },
                'xwa2_bot_proactive_message_control_update'
            ),
        botProfilesSync: () => www(WWW_GQL_IDS.BOT_PROFILES_SYNC, {}, 'xwa2_bot_profiles_sync'),

        // Avatar
        avatarUserRecovery: () => www(WWW_GQL_IDS.AVATAR_USER_RECOVERY, {}, 'xwa2_avatar_user_recovery'),
        loadAvatarPoses: () => www(WWW_GQL_IDS.LOAD_AVATAR_POSES, {}, 'xwa2_load_avatar_poses'),
        saveAvatarPose: (poseId, options = {}) =>
            www(WWW_GQL_IDS.SAVE_AVATAR_POSE, { pose_id: poseId, ...options }, 'xwa2_save_avatar_pose'),
        selectedOrDefaultPose: () => www(WWW_GQL_IDS.SELECTED_OR_DEFAULT_POSE, {}, 'xwa2_selected_or_default_pose'),

        // Events
        createEvent: (input) => www(WWW_GQL_IDS.CREATE_EVENT, { input }, 'xwa2_create_event'),
        getEvent: (eventId) => www(WWW_GQL_IDS.GET_EVENT, { event_id: eventId }, 'xwa2_get_event'),
        updateEvent: (eventId, updates) =>
            www(WWW_GQL_IDS.UPDATE_EVENT, { event_id: eventId, ...updates }, 'xwa2_update_event'),
        deleteEvent: (eventId) => www(WWW_GQL_IDS.DELETE_EVENT, { event_id: eventId }, 'xwa2_delete_event'),
        listEvents: (options = {}) => www(WWW_GQL_IDS.LIST_EVENTS, options, 'xwa2_list_events'),
        updateEventRsvp: (eventId, rsvp) =>
            www(WWW_GQL_IDS.UPDATE_EVENT_RSVP, { event_id: eventId, rsvp }, 'xwa2_update_event_rsvp'),
        addEventInvitations: (eventId, jids) =>
            www(WWW_GQL_IDS.ADD_EVENT_INVITATIONS, { event_id: eventId, jids }, 'xwa2_add_event_invitations'),
        removeEventInvitations: (eventId, jids) =>
            www(WWW_GQL_IDS.REMOVE_EVENT_INVITATIONS, { event_id: eventId, jids }, 'xwa2_remove_event_invitations'),
        removeSelfEventInvitation: (eventId) =>
            www(WWW_GQL_IDS.REMOVE_SELF_EVENT_INVITATION, { event_id: eventId }, 'xwa2_remove_self_event_invitation'),
        getOrCreateEventInviteLink: (eventId) =>
            www(WWW_GQL_IDS.GET_OR_CREATE_EVENT_INVITE_LINK, { event_id: eventId }, 'xwa2_get_or_create_event_invite_link'),
        rotateEventInviteLink: (eventId) =>
            www(WWW_GQL_IDS.ROTATE_EVENT_INVITE_LINK, { event_id: eventId }, 'xwa2_rotate_event_invite_link'),
        getEventLinkPreview: (url) => www(WWW_GQL_IDS.GET_EVENT_LINK_PREVIEW, { url }, 'xwa2_get_event_link_preview'),
        listPresetCoverImages: () => www(WWW_GQL_IDS.LIST_PRESET_COVER_IMAGES, {}, 'xwa2_list_preset_cover_images'),

        // Business / Catalog
        getBusinessProfileWebsiteShimUrl: (bizJid) =>
            www(
                WWW_GQL_IDS.GET_BUSINESS_PROFILE_WEBSITE_SHIM_URL,
                { biz_jid: bizJid },
                'xwa2_get_business_profile_website_shim_url'
            ),
        waWebBizCreateOrderJob: (input) =>
            www(WWW_GQL_IDS.WA_WEB_BIZ_CREATE_ORDER_JOB, { input }, 'xwa2_wa_web_biz_create_order_job'),
        waWebBizGraphqlRefreshCart: (cartId) =>
            www(WWW_GQL_IDS.WA_WEB_BIZ_GRAPHQL_REFRESH_CART, { cart_id: cartId }, 'xwa2_wa_web_biz_graphql_refresh_cart'),
        waWebBizQueryOrderJob: (jobId) =>
            www(WWW_GQL_IDS.WA_WEB_BIZ_QUERY_ORDER_JOB, { job_id: jobId }, 'xwa2_wa_web_biz_query_order_job'),
        whatsappCatalogReportProduct: (productId, reason) =>
            www(
                WWW_GQL_IDS.WHATSAPP_CATALOG_REPORT_PRODUCT,
                { product_id: productId, reason },
                'xwa2_whatsapp_catalog_report_product'
            ),
        brandIdsGetPhoneNumbers: (brandId) =>
            www(WWW_GQL_IDS.BRAND_IDS_GET_PHONE_NUMBERS, { brand_id: brandId }, 'xwa2_brand_ids_get_phone_numbers'),
        businessInteractionPills: (bizJid) =>
            www(WWW_GQL_IDS.BUSINESS_INTERACTION_PILLS, { biz_jid: bizJid }, 'xwa2_business_interaction_pills'),
        externalCtxAuthoriseWAChat: (input) =>
            www(WWW_GQL_IDS.EXTERNAL_CTX_AUTHORISE_WA_CHAT, { input }, 'xwa2_external_ctx_authorise_wa_chat'),

        // Payments (Brazil PIX)
        brGetAuthOptions: () => www(WWW_GQL_IDS.BR_GET_AUTH_OPTIONS, {}, 'xwa2_br_get_auth_options'),
        brSaveCpf: (cpf) => www(WWW_GQL_IDS.BR_SAVE_CPF, { cpf }, 'xwa2_br_save_cpf'),
        brCreateEnrollment: (options) => www(WWW_GQL_IDS.CREATE_ENROLLMENT, options, 'xwa2_create_enrollment'),
        brCompleteEnrollmentRegistration: (input) =>
            www(WWW_GQL_IDS.BR_COMPLETE_ENROLLMENT_REGISTRATION, { input }, 'xwa2_br_complete_enrollment_registration'),
        brGetEnrollmentOptions: () =>
            www(WWW_GQL_IDS.GET_ENROLLMENT_REGISTRATION_OPTIONS, {}, 'xwa2_get_enrollment_registration_options'),
        brAuthorizePayment: (input) =>
            www(WWW_GQL_IDS.BR_AUTHORIZE_BIOMETRIC_PAYMENT, { input }, 'xwa2_br_authorize_biometric_payment'),
        getPixBankList: () => www(WWW_GQL_IDS.GET_PIX_BANK_LIST, {}, 'xwa2_get_pix_bank_list'),
        getMerchantPixInfo: (merchantId) =>
            www(WWW_GQL_IDS.GET_MERCHANT_PIX_INFO, { merchant_id: merchantId }, 'xwa2_get_merchant_pix_info'),
        completePixTransaction: (input) =>
            www(WWW_GQL_IDS.COMPLETE_PIX_TRANSACTION, { input }, 'xwa2_complete_pix_transaction'),
        payWithPixPrecheck: (input) => www(WWW_GQL_IDS.PAY_WITH_PIX_PRECHECK, { input }, 'xwa2_pay_with_pix_precheck'),
        paymentHealthChecks: () => www(WWW_GQL_IDS.PAYMENT_HEALTH_CHECKS, {}, 'xwa2_payment_health_checks'),
        getPaymentKey: () => www(WWW_GQL_IDS.GET_PAYMENT_KEY, {}, 'xwa2_get_payment_key'),
        genCreatePaymentKey: (input) => www(WWW_GQL_IDS.GEN_CREATE_PAYMENT_KEY, { input }, 'xwa2_gen_create_payment_key'),
        genUpdatePaymentKey: (input) => www(WWW_GQL_IDS.GEN_UPDATE_PAYMENT_KEY, { input }, 'xwa2_gen_update_payment_key'),
        genDeletePaymentKey: (keyId) =>
            www(WWW_GQL_IDS.GEN_DELETE_PAYMENT_KEY, { key_id: keyId }, 'xwa2_gen_delete_payment_key'),
        getBillerPlans: (billerId) => www(WWW_GQL_IDS.GET_BILLER_PLANS, { biller_id: billerId }, 'xwa2_get_biller_plans'),
        getBillReceipt: (billId) => www(WWW_GQL_IDS.GET_BILL_RECEIPT, { bill_id: billId }, 'xwa2_get_bill_receipt'),
        getBillComplaintUrl: (billId) =>
            www(WWW_GQL_IDS.GET_BILL_COMPLAINT_URL, { bill_id: billId }, 'xwa2_get_bill_complaint_url'),
        paymentReminderCreate: (input) => www(WWW_GQL_IDS.PAYMENT_REMINDER_CREATE, { input }, 'xwa2_payment_reminder_create'),
        paymentReminderGet: (reminderId) =>
            www(WWW_GQL_IDS.PAYMENT_REMINDER_GET, { reminder_id: reminderId }, 'xwa2_payment_reminder_get'),
        paymentReminderCancel: (reminderId) =>
            www(WWW_GQL_IDS.PAYMENT_REMINDER_CANCEL, { reminder_id: reminderId }, 'xwa2_payment_reminder_cancel'),
        paymentReminderStop: (reminderId) =>
            www(WWW_GQL_IDS.PAYMENT_REMINDER_STOP, { reminder_id: reminderId }, 'xwa2_payment_reminder_stop'),
        genShareRemittanceIntent: (input) =>
            www(
                WWW_GQL_IDS.GEN_SHARE_REMITTANCE_TRANSACTION_INTENT,
                { input },
                'xwa2_gen_share_remittance_transaction_intent'
            ),
        getRemittanceTransactionDetails: (txId) =>
            www(
                WWW_GQL_IDS.GET_REMITTANCE_TRANSACTION_DETAILS,
                { transaction_id: txId },
                'xwa2_get_remittance_transaction_details'
            ),
        saveRemittancePaymentMessageId: (input) =>
            www(WWW_GQL_IDS.SAVE_REMITTANCE_PAYMENT_MESSAGE_ID, { input }, 'xwa2_save_remittance_payment_message_id'),
        saveSenderPaymentMessagePreference: (preference) =>
            www(
                WWW_GQL_IDS.SAVE_SENDER_PAYMENT_MESSAGE_PREFERENCE,
                { preference },
                'xwa2_save_sender_payment_message_preference'
            ),
        getEligibility: (feature = null) =>
            www(WWW_GQL_IDS.GET_ELIGIBILITY, feature ? { feature } : {}, 'xwa2_get_eligibility'),
        enrollAndGetIncentiveReferralId: (input) =>
            www(WWW_GQL_IDS.ENROLL_AND_GET_INCENTIVE_REFERRAL_ID, { input }, 'xwa2_enroll_and_get_incentive_referral_id'),
        getSubscriptionsAndFeatureFlags: () =>
            www(WWW_GQL_IDS.GET_SUBSCRIPTIONS_AND_FEATURE_FLAGS, {}, 'xwa2_get_subscriptions_and_feature_flags'),

        // Payments (UPI India)
        getUpiAccounts: () => www(WWW_GQL_IDS.GET_UPI_ACCOUNTS, {}, 'xwa2_get_upi_accounts'),
        getUpiLiteDetails: () => www(WWW_GQL_IDS.GET_UPI_LITE_DETAILS, {}, 'xwa2_get_upi_lite_details'),
        getUpiToken: (upiAccountId) => www(WWW_GQL_IDS.GET_UPI_TOKEN, { upi_account_id: upiAccountId }, 'xwa2_get_upi_token'),
        getUpiPurposeLimitingKey: () =>
            www(WWW_GQL_IDS.GET_UPI_PURPOSE_LIMITING_KEY, {}, 'xwa2_get_upi_purpose_limiting_key'),
        upiCreateMandate: (input) => www(WWW_GQL_IDS.UPI_CREATE_MANDATE, { input }, 'xwa2_upi_create_mandate'),
        upiAcceptMandate: (mandateId) =>
            www(WWW_GQL_IDS.UPI_ACCEPT_MANDATE, { mandate_id: mandateId }, 'xwa2_upi_accept_mandate'),
        upiRejectMandate: (mandateId) =>
            www(WWW_GQL_IDS.UPI_REJECT_MANDATE, { mandate_id: mandateId }, 'xwa2_upi_reject_mandate'),
        upiExecuteMandate: (mandateId) =>
            www(WWW_GQL_IDS.UPI_EXECUTE_MANDATE, { mandate_id: mandateId }, 'xwa2_upi_execute_mandate'),
        upiPauseMandate: (mandateId) =>
            www(WWW_GQL_IDS.UPI_PAUSE_MANDATE, { mandate_id: mandateId }, 'xwa2_upi_pause_mandate'),
        upiResumeMandate: (mandateId) =>
            www(WWW_GQL_IDS.UPI_RESUME_MANDATE, { mandate_id: mandateId }, 'xwa2_upi_resume_mandate'),
        upiRevokeMandate: (mandateId) =>
            www(WWW_GQL_IDS.UPI_REVOKE_MANDATE, { mandate_id: mandateId }, 'xwa2_upi_revoke_mandate'),
        pmtaGetAiControls: () => www(WWW_GQL_IDS.PMTA_GET_AI_CONTROLS, {}, 'xwa2_pmta_get_ai_controls'),
        pmtaSetAiControls: (controls) => www(WWW_GQL_IDS.PMTA_SET_AI_CONTROLS, { controls }, 'xwa2_pmta_set_ai_controls'),

        // Wamo
        wamoSubQueryStatus: (newsletterJid) =>
            www(WWW_GQL_IDS.WAMO_SUB_QUERY_STATUS, { newsletter_jid: newsletterJid }, 'xwa2_wamo_sub_query_status'),
        wamoSubCancelSubscription: (newsletterJid, subscriptionId) =>
            www(
                WWW_GQL_IDS.WAMO_SUB_CANCEL_SUBSCRIPTION,
                { newsletter_jid: newsletterJid, subscription_id: subscriptionId },
                'xwa2_wamo_sub_cancel_subscription'
            ),
        wamoSubOverrideStatus: (newsletterJid, status) =>
            www(
                WWW_GQL_IDS.WAMO_SUB_OVERRIDE_STATUS,
                { newsletter_jid: newsletterJid, status },
                'xwa2_wamo_sub_override_status'
            ),
        wamoAfsSubscriptionInfo: (newsletterJid) =>
            www(WWW_GQL_IDS.WAMO_AFS_SUBSCRIPTION_INFO, { newsletter_jid: newsletterJid }, 'xwa2_wamo_afs_subscription_info'),
        wamoPromoIdQuery: (newsletterJid) =>
            www(WWW_GQL_IDS.WAMO_PROMO_ID_QUERY, { newsletter_jid: newsletterJid }, 'xwa2_wamo_promo_id_query'),
        wamoPromoIdSet: (newsletterJid, promoId) =>
            www(
                WWW_GQL_IDS.WAMO_PROMO_ID_SET,
                { newsletter_jid: newsletterJid, promo_id: promoId },
                'xwa2_wamo_promo_id_set'
            ),
        wamoPromoIdDelete: (newsletterJid) =>
            www(WWW_GQL_IDS.WAMO_PROMO_ID_DELETE, { newsletter_jid: newsletterJid }, 'xwa2_wamo_promo_id_delete'),

        // User / account
        facebookAccountName: () => www(WWW_GQL_IDS.FACEBOOK_ACCOUNT_NAME, {}, 'xwa2_facebook_account_name'),
        instagramAccountName: () => www(WWW_GQL_IDS.INSTAGRAM_ACCOUNT_NAME, {}, 'xwa2_instagram_account_name'),
        getSignupMetadata: () => www(WWW_GQL_IDS.GET_SIGNUP_METADATA, {}, 'xwa2_get_signup_metadata'),
        registerInit: (input) => www(WWW_GQL_IDS.REGISTER_INIT, { input }, 'xwa2_register_init'),
        registerAllAccounts: () => www(WWW_GQL_IDS.REGISTER_ALL_ACCOUNTS, {}, 'xwa2_register_all_accounts'),
        checkDeviceRegistration: (deviceId) =>
            www(WWW_GQL_IDS.CHECK_DEVICE_REGISTRATION, { device_id: deviceId }, 'xwa2_check_device_registration'),
        canonicalEntQueryFeature: (feature) =>
            www(WWW_GQL_IDS.CANONICAL_ENT_QUERY_FEATURE, { feature }, 'xwa2_canonical_ent_query_feature'),
        canonicalEntSetupFeature: (feature, options = {}) =>
            www(WWW_GQL_IDS.CANONICAL_ENT_SETUP_FEATURE, { feature, ...options }, 'xwa2_canonical_ent_setup_feature'),
        canonicalEntTeardownFeature: (feature) =>
            www(WWW_GQL_IDS.CANONICAL_ENT_TEARDOWN_FEATURE, { feature }, 'xwa2_canonical_ent_teardown_feature'),
        wwwCanonicalUserValid: (token) =>
            www(WWW_GQL_IDS.WWW_CANONICAL_USER_VALID, { token }, 'xwa2_www_canonical_user_valid'),
        waffleUserAgeCheck: () => www(WWW_GQL_IDS.WAFFLE_USER_AGE_CHECK, {}, 'xwa2_waffle_user_age_check'),
        getAiPredictedAge: () => www(WWW_GQL_IDS.GET_AI_PREDICTED_AGE, {}, 'xwa2_get_ai_predicted_age'),

        // Support / misc
        submitBugReport: (input) => www(WWW_GQL_IDS.SUBMIT_BUG_REPORT, { input }, 'xwa2_submit_bug_report'),
        supportContactForm: (input) => www(WWW_GQL_IDS.SUPPORT_CONTACT_FORM, { input }, 'xwa2_support_contact_form'),
        createGroupSuspensionAppeal: (groupJid, reason) =>
            www(
                WWW_GQL_IDS.CREATE_GROUP_SUSPENSION_APPEAL,
                { group_jid: groupJid, reason },
                'xwa2_create_group_suspension_appeal'
            ),
        createDogfoodingTask: (input) => www(WWW_GQL_IDS.CREATE_DOGFOODING_TASK, { input }, 'xwa2_create_dogfooding_task'),
        hatchChannelLink: (input) => www(WWW_GQL_IDS.HATCH_CHANNEL_LINK, { input }, 'xwa2_hatch_channel_link'),
        hatchChannelMetadata: (channelId) =>
            www(WWW_GQL_IDS.HATCH_CHANNEL_METADATA, { channel_id: channelId }, 'xwa2_hatch_channel_metadata'),
        oxygenChannelOptIn: (channelId) =>
            www(WWW_GQL_IDS.OXYGEN_CHANNEL_OPT_IN, { channel_id: channelId }, 'xwa2_oxygen_channel_opt_in'),
        oxygenChannelOptOut: (channelId) =>
            www(WWW_GQL_IDS.OXYGEN_CHANNEL_OPT_OUT, { channel_id: channelId }, 'xwa2_oxygen_channel_opt_out'),
        oxygenChannelStatus: (channelId) =>
            www(WWW_GQL_IDS.OXYGEN_CHANNEL_STATUS, { channel_id: channelId }, 'xwa2_oxygen_channel_status'),
        paslGetLoggerConfig: () => www(WWW_GQL_IDS.PASL_GET_LOGGER_CONFIG, {}, 'xwa2_pasl_get_logger_config'),
        quickPromotionBatchFetch: (input) =>
            www(WWW_GQL_IDS.QUICK_PROMOTION_BATCH_FETCH, { input }, 'xwa2_quick_promotion_batch_fetch'),
        waQuickPromotionLog: (events) => www(WWW_GQL_IDS.WA_QUICK_PROMOTION_LOG, { events }, 'xwa2_wa_quick_promotion_log'),
        waSupportMessageFeedback: (input) =>
            www(WWW_GQL_IDS.WA_SUPPORT_MESSAGE_FEEDBACK, { input }, 'xwa2_wa_support_message_feedback'),
        waGizmoPostMetadata: (postId) =>
            www(WWW_GQL_IDS.WA_GIZMO_POST_METADATA, { post_id: postId }, 'xwa2_wa_gizmo_post_metadata'),
        unifiedConversationStarters: (chatJid) =>
            www(WWW_GQL_IDS.UNIFIED_CONVERSATION_STARTERS, { chat_jid: chatJid }, 'xwa2_unified_conversation_starters'),
        getSubscribedTasksForThread: (threadId) =>
            www(WWW_GQL_IDS.GET_SUBSCRIBED_TASKS_FOR_THREAD, { thread_id: threadId }, 'xwa2_get_subscribed_tasks_for_thread'),
        editGenAiTask: (taskId, updates) =>
            www(WWW_GQL_IDS.EDIT_GEN_AI_TASK, { task_id: taskId, ...updates }, 'xwa2_edit_gen_ai_task'),
        deleteGenAiTasks: (taskIds) =>
            www(WWW_GQL_IDS.DELETE_GEN_AI_TASKS, { task_ids: taskIds }, 'xwa2_delete_gen_ai_tasks'),
        deleteUserBillAccount: () => www(WWW_GQL_IDS.DELETE_USER_BILL_ACCOUNT, {}, 'xwa2_delete_user_bill_account'),
        metaPoiTypeAhead: (query) => www(WWW_GQL_IDS.META_POI_TYPE_AHEAD, { query }, 'xwa2_meta_poi_type_ahead'),
        metaConfigFetch: () => www(WWW_GQL_IDS.META_CONFIG_FETCH, {}, 'xwa2_meta_config_fetch'),

        // Facebook schema
        bizAlertsNotificationList: () =>
            fb(FACEBOOK_GQL_IDS.BIZ_ALERTS_NOTIFICATION_LIST, {}, 'xwa2_biz_alerts_notification_list'),
        bizAlertsUpdate: (alertId, read) =>
            fb(FACEBOOK_GQL_IDS.BIZ_ALERTS_UPDATE, { alert_id: alertId, read }, 'xwa2_biz_alerts_update'),
        ctwaAdsContextBiz: (bizJid) =>
            fb(FACEBOOK_GQL_IDS.CTWA_ADS_CONTEXT_BIZ, { biz_jid: bizJid }, 'xwa2_ctwa_ads_context_biz'),
        digitalContentIapPurchaseQuote: (input) =>
            fb(FACEBOOK_GQL_IDS.DIGITAL_CONTENT_IAP_PURCHASE_QUOTE, { input }, 'xwa2_digital_content_iap_purchase_quote'),
        getCompliance: () => fb(FACEBOOK_GQL_IDS.GET_COMPLIANCE, {}, 'xwa2_get_compliance'),
        setCompliance: (complianceType, accepted) =>
            fb(FACEBOOK_GQL_IDS.SET_COMPLIANCE, { compliance_type: complianceType, accepted }, 'xwa2_set_compliance'),
        getCustomUrls: () => fb(FACEBOOK_GQL_IDS.GET_CUSTOM_URLS, {}, 'xwa2_get_custom_urls'),
        getDcpProducts: (categoryId = null) =>
            fb(FACEBOOK_GQL_IDS.GET_DCP_PRODUCTS, categoryId ? { category_id: categoryId } : {}, 'xwa2_get_dcp_products'),
        acDcCreateCommerceNonce: (input) =>
            fb(FACEBOOK_GQL_IDS.ACDC_CREATE_COMMERCE_NONCE, { input }, 'xwa2_acdc_create_commerce_nonce'),
        fbUsernameRecommendations: (source = null) =>
            fb(FACEBOOK_GQL_IDS.USERNAME_RECOMMENDATIONS, source ? { source } : {}, 'xwa2_username_recommendations'),

        // Wamo platform schema
        wamoUserBasic: () => wamo(WAMO_GQL_IDS.USER_BASIC, {}, 'xwa2_wamo_user_basic'),
        wamoCreateUser: (input) => wamo(WAMO_GQL_IDS.CREATE_USER, { input }, 'xwa2_wamo_create_user'),
        wamoDeleteUser: () => wamo(WAMO_GQL_IDS.DELETE_USER, {}, 'xwa2_wamo_delete_user'),
        wamoLinkUser: (input) => wamo(WAMO_GQL_IDS.LINK_USER, { input }, 'xwa2_wamo_link_user'),
        wamoHeartbeat: () => wamo(WAMO_GQL_IDS.HEARTBEAT, {}, 'xwa2_wamo_heartbeat'),
        wamoHidePage: (pageId) => wamo(WAMO_GQL_IDS.HIDE_PAGE, { page_id: pageId }, 'xwa2_wamo_hide_page'),
        wamoUnhidePage: (pageId) => wamo(WAMO_GQL_IDS.UNHIDE_PAGE, { page_id: pageId }, 'xwa2_wamo_unhide_page'),
        wamoUnhidePageV2: (pageId) => wamo(WAMO_GQL_IDS.UNHIDE_PAGE_V2, { page_id: pageId }, 'xwa2_wamo_unhide_page_v2'),
        wamoHidePromo: (promoId) => wamo(WAMO_GQL_IDS.HIDE_PROMO, { promo_id: promoId }, 'xwa2_wamo_hide_promo'),
        wamoReportPromo: (promoId, reason) =>
            wamo(WAMO_GQL_IDS.REPORT_PROMO, { promo_id: promoId, reason }, 'xwa2_wamo_report_promo'),
        wamoStartViewerSession: (pageId) =>
            wamo(WAMO_GQL_IDS.START_VIEWER_SESSION, { page_id: pageId }, 'xwa2_wamo_start_viewer_session'),
        wamoBloksGetLayout: (layoutId, context = {}) =>
            wamo(WAMO_GQL_IDS.BLOKS_GET_LAYOUT, { layout_id: layoutId, ...context }, 'xwa2_wamo_bloks_get_layout'),
        wamoDyiJobCreate: (input) => wamo(WAMO_GQL_IDS.DYI_JOB_CREATE, { input }, 'xwa2_wamo_dyi_job_create'),
        wamoDyiJobDelete: (jobId) => wamo(WAMO_GQL_IDS.DYI_JOB_DELETE, { job_id: jobId }, 'xwa2_wamo_dyi_job_delete'),
        wamoDyiJobStatus: (jobId) => wamo(WAMO_GQL_IDS.DYI_JOB_STATUS, { job_id: jobId }, 'xwa2_wamo_dyi_job_status'),

        // Meta AI feedback / control
        metaAiFeedback: (messageId, rating, input = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.META_AI_FEEDBACK, { message_id: messageId, rating, ...input }, null),
        metaAiStopGeneration: (requestId) =>
            www(CLIENT_PERSIST_GQL_IDS.META_AI_STOP_GENERATION, { request_id: requestId }, null),
        metaAiModesQuery: () => www(CLIENT_PERSIST_GQL_IDS.META_AI_MODES_QUERY, {}, null),
        fetchMetaAiModes: () => www(CLIENT_PERSIST_GQL_IDS.FETCH_META_AI_MODES, {}, null),
        metaAiRichPlaceDetails: (placeId) =>
            www(CLIENT_PERSIST_GQL_IDS.META_AI_RICH_PLACE_DETAILS, { place_id: placeId }, null),
        metaAiSideBySideSurveyResponse: (input) =>
            www(CLIENT_PERSIST_GQL_IDS.META_AI_SIDE_BY_SIDE_SURVEY_RESPONSE, { input }, null),
        metaAiBizAgentVoiceAttachments: (agentId, attachments) =>
            www(CLIENT_PERSIST_GQL_IDS.META_AI_BIZ_AGENT_VOICE_ATTACHMENTS, { agent_id: agentId, attachments }, null),
        metaAiCustomizationGenAiSetMode: (chatJid, mode) =>
            www(CLIENT_PERSIST_GQL_IDS.META_AI_CUSTOMIZATION_GEN_AI_SET_MODE, { chat_jid: chatJid, mode }, null),
        metaAiIntentCardNuxEligibilityReset: () =>
            www(CLIENT_PERSIST_GQL_IDS.META_AI_INTENT_CARD_NUX_ELIGIBILITY_RESET, {}, null),
        metaAiIntentCardNuxImpression: (input) =>
            www(CLIENT_PERSIST_GQL_IDS.META_AI_INTENT_CARD_NUX_IMPRESSION, { input }, null),
        metaAiIntentCardNuxImpressionQuery: () =>
            www(CLIENT_PERSIST_GQL_IDS.META_AI_INTENT_CARD_NUX_IMPRESSION_QUERY, {}, null),

        // MAI Unified User
        maiUnifiedUser: () => www(CLIENT_PERSIST_GQL_IDS.MAI_UNIFIED_USER, {}, null),
        maiUnifiedUserQuery: () => www(CLIENT_PERSIST_GQL_IDS.MAI_UNIFIED_USER_QUERY, {}, null),
        maiUnifiedUserReset: () => www(CLIENT_PERSIST_GQL_IDS.MAI_UNIFIED_USER_RESET, {}, null),

        // MEMU avatar/persona
        memuProfileQuery: () => www(CLIENT_PERSIST_GQL_IDS.MEMU_PROFILE_QUERY, {}, null),
        memuUpdateProfile: (input) => www(CLIENT_PERSIST_GQL_IDS.MEMU_UPDATE_PROFILE, { input }, null),
        memuPreviewPhoto: (input) => www(CLIENT_PERSIST_GQL_IDS.MEMU_PREVIEW_PHOTO, { input }, null),
        updateMemuSelfie: (input) => www(CLIENT_PERSIST_GQL_IDS.UPDATE_MEMU_SELFIE, { input }, null),
        addMemuProfilePhotos: (photos) => www(CLIENT_PERSIST_GQL_IDS.ADD_MEMU_PROFILE_PHOTOS, { photos }, null),
        createMemuProfile: (input) => www(CLIENT_PERSIST_GQL_IDS.CREATE_MEMU_PROFILE, { input }, null),
        fbMemuPermissionQuery: () => www(CLIENT_PERSIST_GQL_IDS.FB_MEMU_PERMISSION_QUERY, {}, null),
        getMemuStickerById: (stickerId) =>
            www(CLIENT_PERSIST_GQL_IDS.GET_MEMU_STICKER_BY_ID, { sticker_id: stickerId }, null),
        genAiVerifyMemuPhotos: (photos) => www(CLIENT_PERSIST_GQL_IDS.GEN_AI_VERIFY_MEMU_PHOTOS, { photos }, null),
        genAiMeMenuUpdateVoice: (voiceId, options = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_MEMU_UPDATE_VOICE, { voice_id: voiceId, ...options }, null),
        genAiSocialEntityDetails: (entityId) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_SOCIAL_ENTITY_DETAILS, { entity_id: entityId }, null),

        // GenAI Imagine
        genAiImagineGenerate: (prompt, options = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_GENERATE, { prompt, ...options }, null),
        genAiImagineGenerateFlash: (prompt, options = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_GENERATE_FLASH, { prompt, ...options }, null),
        genAiImagineGenerateStreaming: (prompt, options = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_GENERATE_STREAMING, { prompt, ...options }, null),
        genAiImagineGenerateFromImage: (imageId, prompt, options = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_GENERATE_FROM_IMAGE, { image_id: imageId, prompt, ...options }, null),
        genAiImagineRegenerate: (imageId, options = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_REGENERATE, { image_id: imageId, ...options }, null),
        genAiImagineEdit: (imageId, prompt, options = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_EDIT, { image_id: imageId, prompt, ...options }, null),
        genAiImagineCanvasApi: (canvasId, input = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_CANVAS_API, { canvas_id: canvasId, ...input }, null),
        genAiImagineInspirationCanvasApi: (input) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_INSPIRATION_CANVAS_API, { input }, null),
        genAiImagineSuggestions: (context) => www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_SUGGESTIONS, { context }, null),
        genAiImagineDownloadMedia: (mediaId) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_DOWNLOAD_MEDIA, { media_id: mediaId }, null),
        genAiImagineSendMediaToChat: (chatJid, mediaId) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_SEND_MEDIA_TO_CHAT, { chat_jid: chatJid, media_id: mediaId }, null),
        genAiImagineBulkSendMediaToChat: (chatJids, mediaId) =>
            www(
                CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_BULK_SEND_MEDIA_TO_CHAT,
                { chat_jids: chatJids, media_id: mediaId },
                null
            ),
        genAiImagineHasMemuProfile: () => www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_HAS_MEMU_PROFILE, {}, null),
        genAiImagineUpdateMemuProfilePermission: (permission) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_UPDATE_MEMU_PROFILE_PERMISSION, { permission }, null),
        genAiImaginePromptSummarization: (prompt) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_PROMPT_SUMMARIZATION, { prompt }, null),
        genAiImagineRestyleSections: (imageId, sections) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_IMAGINE_RESTYLE_SECTIONS, { image_id: imageId, sections }, null),
        genAiImagineBulkFor3pIntents: (input) => www(WWW_GQL_IDS.GEN_AI_IMAGINE_3P_FOR_INTENTS, { input }, null),
        dropInImagineGenerate: (prompt, options = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.DROP_IN_IMAGINE_GENERATE, { prompt, ...options }, null),

        // GenAI Edit
        genAiEditAnimate: (imageId, options = {}) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_EDIT_ANIMATE, { image_id: imageId, ...options }, null),
        genAiEditBackdropSuggestions: (imageId) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_EDIT_BACKDROP_SUGGESTIONS, { image_id: imageId }, null),
        genAiEditImageBackdrop: (imageId, backdropId, options = {}) =>
            www(
                CLIENT_PERSIST_GQL_IDS.GEN_AI_EDIT_IMAGE_BACKDROP,
                { image_id: imageId, backdrop_id: backdropId, ...options },
                null
            ),
        genAiEditSuggestions: (imageId) => www(CLIENT_PERSIST_GQL_IDS.GEN_AI_EDIT_SUGGESTIONS, { image_id: imageId }, null),
        genAiEditUploadAuthenticImage: (imageData) =>
            www(CLIENT_PERSIST_GQL_IDS.GEN_AI_EDIT_UPLOAD_AUTHENTIC_IMAGE, { image_data: imageData }, null),

        // Immersive creation
        immersiveCreationComplete: (input) => www(WWW_GQL_IDS.IMMERSIVE_CREATION_COMPLETE, { input }, null),
        immersiveCreationConfig: () => www(WWW_GQL_IDS.IMMERSIVE_CREATION_CONFIG, {}, null),

        // Misc client-persist
        simpleEcho: (input) => www(CLIENT_PERSIST_GQL_IDS.SIMPLE_ECHO, { input }, null),

        // ID dictionaries
        WWW_GQL_IDS,
        FACEBOOK_GQL_IDS,
        WAMO_GQL_IDS,
        CLIENT_PERSIST_GQL_IDS,
        ENDPOINTS
    };
};
exports.makeGraphQLSocket = makeGraphQLSocket;
