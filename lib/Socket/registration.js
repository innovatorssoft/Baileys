"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegistrationSocket = exports.REGISTRATION_MEX_IDS = void 0;

const mex_1 = require("./mex");

const REGISTRATION_MEX_IDS = {
    // Password
    HAS_PASSWORD: '25379221318423478',
    SET_PASSWORD: '33855141324134176',
    CHECK_PASSWORD: '26881928138061632',
    DELETE_PASSWORD: '27247058691550586',
    // Passkey (account-level)
    PASSKEY_EXIST: '25188064727509430',
    PASSKEY_LIST_EXIST: '26930537423220681',
    PASSKEY_REQUEST_CHALLENGE: '26311497405176139',
    PASSKEY_VERIFY_CHALLENGE: '26876394218624479',
    PASSKEY_DELETE: '25225683640428243',
    // Passkey (registration flow)
    REG_PASSKEY_START: '25415371271434748',
    REG_PASSKEY_FINISH: '24611221275218156',
    REG_PASSKEY_ENABLE: '25147880151540247',
    REG_PASSKEY_DISABLE: '27775237998742831',
    REG_PASSKEY_CLEAR: '25111972538494859',
    REG_PASSKEY_UPDATE_ENCRYPTION_STATUS: '24866837389649930',
    // Registration upsells
    GET_REGISTRATION_UPSELLS: '24265038133175291',
    GET_DYNAMIC_REGISTRATION_UPSELLS: '32273353145641323',
    REGISTRATION_UPSELL_SHOWN: '25896605016620945',
    REGISTRATION_DYNAMIC_UPSELL_SHOWN: '25435755019399064',
    REG_ACCOUNT_TRANSFER_VERIFY_TOKEN: '7580940708621318',
    // Contacts
    CONTACTS_UPLOAD: '26270332909283337',
    CONTACTS_BACKUP: '25507366408898459',
    CONTACTS_BACKUP_QUERY: '25885591041046968',
    SELF_CONTACTS: '25273846082242404',
    SUGGESTED_CONTACTS_V2: '31663643799945793',
    USYNC: '25973385702344488',
    USER_COUNTRY_CODE: '25292528387076991',
    // Age verification
    AGE_COLLECTION: '33502711132676934',
    GET_AGE_EXPERIENCE: '26567868986241476',
    SET_AGE_EXPERIENCE: '26051006311231325',
    GET_UNKU_AGE_INFO: '34766883369623606',
    SUBMIT_AGE: '26049558371296621',
    // Imagine Me
    GET_IMAGINE_ME_ONBOARDED: '25082125671408942',
    DELETE_IMAGINE_ME_ONBOARDING: '7106989772737677',
    // Misc account
    FETCH_USER_NOTICES: '32114003924880386',
    REMOVE_REACHOUT_TIMELOCK: '25040013452293167',
    TOS_SET_RESULT: '25225843213776555',
    VALIDATE_VERIFIER_CONFIDENCE: '25879669248324812',
    WA_BINARY_DEMO: '25407430348912370',
    START_CHAT_CONTEXT_INTEGRITY: '26204539559207163',
    MESSAGE_CAPPING_OTE: '36625113040420390',
    MOBILE_CONFIG_CONSISTENCY: '34033663249614454',
    REMINDER_CREATE: '32149118614673399',
    REMINDER_DELETE: '25462476600019778',
    OHAI_KEY_CONFIG: '25069818679280758',
    REQUEST_PEER_LOGS_UPLOAD: '25383561471254437',
    HAS_BUSINESS_INTENT: '26322731900685133',
    ESCPS_MIGRATION: '25342222212064844',
    CREATE_ENFORCEMENT_APPEAL: '26933630359642347',
    GET_AUTO_CONF_CHALLENGE: '25578301865133112',
    GET_WA_OLD_RESPONSE: '25784374561179853',
    GET_WA_ME_LINK: '25001183556215266',
    FETCH_BOT_PKI_CRL: '26249576291319392',
    TEE_CHAT_TOKEN: '25920135234315276',
    // Linking data bundles
    GENERATE_LINKING_BUNDLE: '24469763446033134',
    GET_CACHEABLE_UNLINKED_BUNDLE: '26339420835710173',
    GET_UNLINKED_BUNDLE: '25515726664782894',
    GET_DSB_INFO: '24832343819719050',
    // WAMO MEX
    WAMO_USER_ID_VERSION: '24958410737155269',
    WAMO_SET_USER_ID_VERSION: '8148672891859281',
    // WWW / web companion
    WWW_CREATE_ACCESS_TOKEN: '7956082757804344',
    WWW_CREATE_USER: '8548056818544135',
    WWW_DELETE_USER: '7989555047767245',
    WWW_EXCHANGE_NONCE: '25727187160203620',
    WWW_GET_CERTIFICATES: '25094190163544446',
    WWW_GET_NONCE: '24635485196143064',
    WWW_TRADE_NONCES: '24184092467936760',
    WWW_TRIGGER_RECOVERY: '24896267680055094',
    WWW_VALIDATE_CANONICAL_USER: '25434261326170403'
};
exports.REGISTRATION_MEX_IDS = REGISTRATION_MEX_IDS;

const makeRegistrationSocket = (sock) => {
    const { query, generateMessageTag } = sock;

    const mexQuery = (variables, queryId, dataPath) =>
        (0, mex_1.executeWMexQuery)(variables, queryId, dataPath, query, generateMessageTag);

    // ── Password ────────────────────────────────────────────────────────────

    const hasPassword = () => mexQuery({}, REGISTRATION_MEX_IDS.HAS_PASSWORD, 'xwa2_has_password');

    const setPassword = (password, oldPassword = null) => {
        const input = { password };
        if (oldPassword) input.old_password = oldPassword;
        return mexQuery({ input }, REGISTRATION_MEX_IDS.SET_PASSWORD, 'xwa2_set_password');
    };

    const checkPassword = (password) =>
        mexQuery({ input: { password } }, REGISTRATION_MEX_IDS.CHECK_PASSWORD, 'xwa2_check_password');

    const deletePassword = (password) =>
        mexQuery({ input: { password } }, REGISTRATION_MEX_IDS.DELETE_PASSWORD, 'xwa2_delete_password');

    // ── Passkey (account-level) ─────────────────────────────────────────────

    const passkeyExists = () => mexQuery({}, REGISTRATION_MEX_IDS.PASSKEY_EXIST, 'xwa2_passkey_exist_response');

    const passkeyListExists = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.PASSKEY_LIST_EXIST, 'xwa2_passkey_list_exist_response');

    const passkeyRequestChallenge = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.PASSKEY_REQUEST_CHALLENGE, 'xwa2_passkey_request_challenge');

    const passkeyVerifyChallenge = (credentialId, authenticatorData, clientDataJson, signature) =>
        mexQuery(
            {
                credential_id: credentialId,
                authenticator_data: authenticatorData,
                client_data_json: clientDataJson,
                signature
            },
            REGISTRATION_MEX_IDS.PASSKEY_VERIFY_CHALLENGE,
            'xwa2_passkey_verify_challenge'
        );

    const passkeyDelete = (credentialId) =>
        mexQuery({ credential_id: credentialId }, REGISTRATION_MEX_IDS.PASSKEY_DELETE, 'xwa2_passkey_delete');

    // ── Passkey (registration flow) ─────────────────────────────────────────

    const regPasskeyStart = () => mexQuery({}, REGISTRATION_MEX_IDS.REG_PASSKEY_START, 'xwa2_reg_passkey_start_register');

    const regPasskeyFinish = (credentialId, attestationObject, clientDataJson) =>
        mexQuery(
            { credential_id: credentialId, attestation_object: attestationObject, client_data_json: clientDataJson },
            REGISTRATION_MEX_IDS.REG_PASSKEY_FINISH,
            'xwa2_reg_passkey_finish_register'
        );

    const regPasskeyEnable = () => mexQuery({}, REGISTRATION_MEX_IDS.REG_PASSKEY_ENABLE, 'xwa2_reg_passkey_enable');

    const regPasskeyDisable = () => mexQuery({}, REGISTRATION_MEX_IDS.REG_PASSKEY_DISABLE, 'xwa2_reg_passkey_disable');

    const regPasskeyClear = () => mexQuery({}, REGISTRATION_MEX_IDS.REG_PASSKEY_CLEAR, 'xwa2_reg_passkey_clear');

    const regPasskeyUpdateEncryptionStatus = (encryptionEnabled) =>
        mexQuery(
            { encryption_enabled: encryptionEnabled },
            REGISTRATION_MEX_IDS.REG_PASSKEY_UPDATE_ENCRYPTION_STATUS,
            'xwa2_reg_passkey_update_encryption_status'
        );

    // ── Registration upsells ────────────────────────────────────────────────

    const getRegistrationUpsells = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.GET_REGISTRATION_UPSELLS, 'xwa2_dynamic_reg_upsells');

    const getDynamicRegistrationUpsells = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.GET_DYNAMIC_REGISTRATION_UPSELLS, 'xwa2_dynamic_reg_upsells');

    const registrationUpsellShown = (upsellId) =>
        mexQuery({ upsell_id: upsellId }, REGISTRATION_MEX_IDS.REGISTRATION_UPSELL_SHOWN, 'xwa2_reg_dynamic_upsell_shown');

    const registrationDynamicUpsellShown = (upsellId) =>
        mexQuery(
            { upsell_id: upsellId },
            REGISTRATION_MEX_IDS.REGISTRATION_DYNAMIC_UPSELL_SHOWN,
            'xwa2_reg_dynamic_upsell_shown'
        );

    const regAccountTransferVerifyToken = (token) =>
        mexQuery(
            { token },
            REGISTRATION_MEX_IDS.REG_ACCOUNT_TRANSFER_VERIFY_TOKEN,
            'xwa2_reg_account_transfer_verify_token'
        );

    // ── Contacts ────────────────────────────────────────────────────────────

    const contactsUpload = (contacts) =>
        mexQuery({ contacts }, REGISTRATION_MEX_IDS.CONTACTS_UPLOAD, 'xwa2_contacts_upload');

    const contactsBackup = (contacts) =>
        mexQuery({ contacts }, REGISTRATION_MEX_IDS.CONTACTS_BACKUP, 'xwa2_contacts_backup');

    const contactsBackupQuery = () => mexQuery({}, REGISTRATION_MEX_IDS.CONTACTS_BACKUP_QUERY, 'xwa2_contacts_backup');

    const selfContactsQuery = () => mexQuery({}, REGISTRATION_MEX_IDS.SELF_CONTACTS, 'xwa2_self_contacts');

    const suggestedContactsV2 = (limit = 20) =>
        mexQuery({ limit }, REGISTRATION_MEX_IDS.SUGGESTED_CONTACTS_V2, 'xwa2_suggested_contacts_v2');

    const usyncQuery = (jids) => mexQuery({ jids }, REGISTRATION_MEX_IDS.USYNC, 'xwa2_usync');

    const userCountryCodeGet = () => mexQuery({}, REGISTRATION_MEX_IDS.USER_COUNTRY_CODE, 'xwa2_user_country_code');

    // ── Age verification ─────────────────────────────────────────────────────

    const ageCollection = () => mexQuery({}, REGISTRATION_MEX_IDS.AGE_COLLECTION, 'xwa2_age_collection');

    const getAgeExperience = () => mexQuery({}, REGISTRATION_MEX_IDS.GET_AGE_EXPERIENCE, 'xwa2_get_age_experience');

    const setAgeExperience = (birthYear, country = null) => {
        const input = { birth_year: birthYear };
        if (country) input.country = country;
        return mexQuery({ input }, REGISTRATION_MEX_IDS.SET_AGE_EXPERIENCE, 'xwa2_set_age_experience');
    };

    const getUnkuAgeInfo = () => mexQuery({}, REGISTRATION_MEX_IDS.GET_UNKU_AGE_INFO, 'xwa2_get_unku_age_info');

    const submitAge = (birthYear, country = null) => {
        const input = { birth_year: birthYear };
        if (country) input.country = country;
        return mexQuery({ input }, REGISTRATION_MEX_IDS.SUBMIT_AGE, 'xwa2_submit_age');
    };

    // ── Imagine Me ───────────────────────────────────────────────────────────

    const getImagineMeOnboarded = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.GET_IMAGINE_ME_ONBOARDED, 'xwa2_get_imagine_me_onboarded');

    const deleteImagineMeOnboarding = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.DELETE_IMAGINE_ME_ONBOARDING, 'xwa2_delete_imagine_me_onboarding');

    // ── Misc account ─────────────────────────────────────────────────────────

    const fetchUserNoticesById = (noticeIds) =>
        mexQuery({ notice_ids: noticeIds }, REGISTRATION_MEX_IDS.FETCH_USER_NOTICES, 'xwa2_fetch_user_notices_by_id');

    const removeAccountReachoutTimelock = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.REMOVE_REACHOUT_TIMELOCK, 'xwa2_remove_account_reachout_timelock');

    const tosSetResult = (tosId, result) =>
        mexQuery({ tos_id: tosId, result }, REGISTRATION_MEX_IDS.TOS_SET_RESULT, 'xwa2_tos_set_result');

    const validateVerifierConfidence = (verifierId, confidence) =>
        mexQuery(
            { verifier_id: verifierId, confidence },
            REGISTRATION_MEX_IDS.VALIDATE_VERIFIER_CONFIDENCE,
            'xwa2_autoconf_validate_confidence'
        );

    const waBinaryDemoQuery = () => mexQuery({}, REGISTRATION_MEX_IDS.WA_BINARY_DEMO, 'xwa2_wa_binary_demo');

    const startChatContextIntegrityQuery = (jids) =>
        mexQuery(
            { users: jids.map((jid) => ({ jid })), use_case: 'START_CHAT_CONTEXT' },
            REGISTRATION_MEX_IDS.START_CHAT_CONTEXT_INTEGRITY,
            'xwa2_fetch_wa_users'
        );

    const messageCappingOteRequest = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.MESSAGE_CAPPING_OTE, 'xwa2_message_capping_ote_request');

    const mobileConfigConsistencyLogging = (config = {}) =>
        mexQuery({ config }, REGISTRATION_MEX_IDS.MOBILE_CONFIG_CONSISTENCY, 'xwa2_mobile_config_consistency_logging');

    const reminderCreate = (title, body, scheduledTime) =>
        mexQuery(
            { input: { title, body, scheduled_time: scheduledTime } },
            REGISTRATION_MEX_IDS.REMINDER_CREATE,
            'xwa2_reminder_set'
        );

    const reminderDelete = (reminderId) =>
        mexQuery({ reminder_id: reminderId }, REGISTRATION_MEX_IDS.REMINDER_DELETE, 'xwa2_reminder_delete');

    const ohaiKeyConfigQuery = () => mexQuery({}, REGISTRATION_MEX_IDS.OHAI_KEY_CONFIG, 'xwa2_ohai_key_config');

    const requestPeerLogsUpload = (bugId) =>
        mexQuery({ bug_id: bugId }, REGISTRATION_MEX_IDS.REQUEST_PEER_LOGS_UPLOAD, 'xwa2_request_peer_logs_upload');

    const hasBusinessIntent = () => mexQuery({}, REGISTRATION_MEX_IDS.HAS_BUSINESS_INTENT, 'xwa2_has_business_intent');

    const escpsMigration = () => mexQuery({}, REGISTRATION_MEX_IDS.ESCPS_MIGRATION, 'xwa2_escps_migration');

    const createEnforcementAppeal = (reason, details = null) => {
        const input = { reason };
        if (details) input.details = details;
        return mexQuery({ input }, REGISTRATION_MEX_IDS.CREATE_ENFORCEMENT_APPEAL, 'xwa2_create_enforcement_appeal');
    };

    const getAutoConfChallenge = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.GET_AUTO_CONF_CHALLENGE, 'xwa2_autoconf_request_confidence_challenge');

    const getWaOldResponse = () => mexQuery({}, REGISTRATION_MEX_IDS.GET_WA_OLD_RESPONSE, 'xwa2_get_wa_old_response');

    const getWaMeLink = () => mexQuery({}, REGISTRATION_MEX_IDS.GET_WA_ME_LINK, 'xwa2_get_wa_me_link');

    const fetchBotPkiCrl = () => mexQuery({}, REGISTRATION_MEX_IDS.FETCH_BOT_PKI_CRL, 'xwa2_fetch_bot_pki_crl');

    const teeChatParticipationToken = (chatJid, participants) =>
        mexQuery({ chat_jid: chatJid, participants }, REGISTRATION_MEX_IDS.TEE_CHAT_TOKEN, 'xwa2_generate_wa_tee_gs_token');

    // ── Linking data bundles ─────────────────────────────────────────────────

    const generateLinkingBundle = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.GENERATE_LINKING_BUNDLE, 'xwa2_waffle_generate_linking_data_bundle');

    const getCacheableUnlinkedBundle = () =>
        mexQuery({}, REGISTRATION_MEX_IDS.GET_CACHEABLE_UNLINKED_BUNDLE, 'xwa2_get_cacheable_unlinked_bundle');

    const getUnlinkedBundle = () => mexQuery({}, REGISTRATION_MEX_IDS.GET_UNLINKED_BUNDLE, 'xwa2_get_unlinked_bundle');

    const getDsbInfo = () => mexQuery({}, REGISTRATION_MEX_IDS.GET_DSB_INFO, 'xwa2_get_dsb_info');

    const wamoUserIdVersion = () => mexQuery({}, REGISTRATION_MEX_IDS.WAMO_USER_ID_VERSION, 'xwa2_wamo_user_id_version');

    const setWamoUserIdVersion = (version) =>
        mexQuery({ version }, REGISTRATION_MEX_IDS.WAMO_SET_USER_ID_VERSION, 'xwa2_wamo_user_id_version_set');

    // ── WWW / web companion ──────────────────────────────────────────────────

    const wwwCreateAccessToken = (nonce, userId) =>
        mexQuery({ nonce, user_id: userId }, REGISTRATION_MEX_IDS.WWW_CREATE_ACCESS_TOKEN, 'xwa2_www_create_access_token');

    const wwwCreateUser = (input) => mexQuery({ input }, REGISTRATION_MEX_IDS.WWW_CREATE_USER, 'xwa2_www_create_user');

    const wwwDeleteUser = () => mexQuery({}, REGISTRATION_MEX_IDS.WWW_DELETE_USER, 'xwa2_www_delete_user');

    const wwwExchangeNonce = (nonce) =>
        mexQuery({ nonce }, REGISTRATION_MEX_IDS.WWW_EXCHANGE_NONCE, 'xwa2_www_exchange_nonce_for_access_token');

    const wwwGetCertificates = () => mexQuery({}, REGISTRATION_MEX_IDS.WWW_GET_CERTIFICATES, 'xwa2_www_get_certificates');

    const wwwGetNonce = () => mexQuery({}, REGISTRATION_MEX_IDS.WWW_GET_NONCE, 'xwa2_ent_get_canonical_ent_device_nonce');

    const wwwTradeNonces = (nonces) =>
        mexQuery({ nonces }, REGISTRATION_MEX_IDS.WWW_TRADE_NONCES, 'xwa2_www_trade_nonce_for_access_tokens');

    const wwwTriggerRecovery = (phoneNumber) =>
        mexQuery(
            { phone_number: phoneNumber },
            REGISTRATION_MEX_IDS.WWW_TRIGGER_RECOVERY,
            'xwa2_www_trigger_account_recovery'
        );

    const wwwValidateCanonicalUser = (token) =>
        mexQuery({ token }, REGISTRATION_MEX_IDS.WWW_VALIDATE_CANONICAL_USER, 'xwa2_www_validate_canonical_user');

    return {
        ...sock,
        hasPassword,
        setPassword,
        checkPassword,
        deletePassword,
        passkeyExists,
        passkeyListExists,
        passkeyRequestChallenge,
        passkeyVerifyChallenge,
        passkeyDelete,
        regPasskeyStart,
        regPasskeyFinish,
        regPasskeyEnable,
        regPasskeyDisable,
        regPasskeyClear,
        regPasskeyUpdateEncryptionStatus,
        getRegistrationUpsells,
        getDynamicRegistrationUpsells,
        registrationUpsellShown,
        registrationDynamicUpsellShown,
        regAccountTransferVerifyToken,
        contactsUpload,
        contactsBackup,
        contactsBackupQuery,
        selfContactsQuery,
        suggestedContactsV2,
        usyncQuery,
        userCountryCodeGet,
        ageCollection,
        getAgeExperience,
        setAgeExperience,
        getUnkuAgeInfo,
        submitAge,
        getImagineMeOnboarded,
        deleteImagineMeOnboarding,
        fetchUserNoticesById,
        removeAccountReachoutTimelock,
        tosSetResult,
        validateVerifierConfidence,
        waBinaryDemoQuery,
        startChatContextIntegrityQuery,
        messageCappingOteRequest,
        mobileConfigConsistencyLogging,
        reminderCreate,
        reminderDelete,
        ohaiKeyConfigQuery,
        requestPeerLogsUpload,
        hasBusinessIntent,
        escpsMigration,
        createEnforcementAppeal,
        getAutoConfChallenge,
        getWaOldResponse,
        getWaMeLink,
        fetchBotPkiCrl,
        teeChatParticipationToken,
        generateLinkingBundle,
        getCacheableUnlinkedBundle,
        getUnlinkedBundle,
        getDsbInfo,
        wamoUserIdVersion,
        setWamoUserIdVersion,
        wwwCreateAccessToken,
        wwwCreateUser,
        wwwDeleteUser,
        wwwExchangeNonce,
        wwwGetCertificates,
        wwwGetNonce,
        wwwTradeNonces,
        wwwTriggerRecovery,
        wwwValidateCanonicalUser,
        REGISTRATION_MEX_IDS
    };
};
exports.makeRegistrationSocket = makeRegistrationSocket;
