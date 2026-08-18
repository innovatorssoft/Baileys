"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInteropSocket = exports.INTEROP_MEX_QUERY_IDS = exports.INTEGRATOR_HAIKET = exports.INTEGRATOR_BIRDYCHAT = void 0;

const WABinary_1 = require("../WABinary");
const mex_1 = require("./mex");

const INTEROP_MEX_QUERY_IDS = {
    CREATE_GROUP: '25726817620301611',
    LEAVE_GROUP: '25346167795013271',
    ADD_PARTICIPANTS: '25732168276369451',
    QUERY_GROUP_INFO: '32734144032867938',
    PRIVACY_SETTINGS_QUERY: '24849123668112654',
    PRIVACY_SETTINGS_UPDATE: '25421856497452763',
    PRIVACY_SETTINGS_WITH_CONTACT_LIST: '24913399124998598'
};
exports.INTEROP_MEX_QUERY_IDS = INTEROP_MEX_QUERY_IDS;

exports.INTEGRATOR_BIRDYCHAT = 12;
exports.INTEGRATOR_HAIKET = 13;

const TOS_TRACKABLE_ID = '20240306';
const TOS_RESULT_SHOWN = '105';
const TOS_RESULT_ACCEPTED = '160';
const INTEROP_BATCH_MAX = 256;

const makeInteropSocket = (sock) => {
    const { query, generateMessageTag, logger, signalRepository } = sock;

    const mexQuery = (variables, queryId, dataPath) =>
        (0, mex_1.executeWMexQuery)(variables, queryId, dataPath, query, generateMessageTag);

    const fetchIntegrators = async () => {
        const result = await query({
            tag: 'iq',
            attrs: {
                type: 'get',
                xmlns: 'w:interop',
                to: WABinary_1.S_WHATSAPP_NET
            },
            content: [{ tag: 'integrator', attrs: { fetch: 'all' } }]
        });
        const listNode = (0, WABinary_1.getBinaryNodeChild)(result, 'integrator_list');
        if (!listNode) return [];
        const globalOptedIn = listNode.attrs?.opted_in === 'true';
        return (0, WABinary_1.getBinaryNodeChildren)(listNode, 'integrator').map((node) => {
            const featuresNode = (0, WABinary_1.getBinaryNodeChild)(node, 'features');
            return {
                id: parseInt(node.attrs.id, 10),
                name: node.attrs.name,
                status: node.attrs.status,
                icon: node.attrs.icon,
                identifierType: node.attrs.identifier_type,
                optedIn: node.attrs.opted_in === 'true' || globalOptedIn,
                features: {
                    groupMessaging: featuresNode?.attrs?.group_messaging === 'true'
                }
            };
        });
    };

    const sendTOSTrackable = async (id, result) => {
        await query({
            tag: 'iq',
            attrs: { to: WABinary_1.S_WHATSAPP_NET, type: 'set', xmlns: 'tos' },
            content: [{ tag: 'trackable', attrs: { id, result } }]
        });
    };

    const acceptInteropTOS = async () => {
        await sendTOSTrackable(TOS_TRACKABLE_ID, TOS_RESULT_SHOWN);
        await sendTOSTrackable(TOS_TRACKABLE_ID, TOS_RESULT_ACCEPTED);
    };

    const optInIntegrators = async (integratorIds = [exports.INTEGRATOR_BIRDYCHAT, exports.INTEGRATOR_HAIKET]) => {
        await query({
            tag: 'iq',
            attrs: { type: 'set', xmlns: 'w:interop', to: WABinary_1.S_WHATSAPP_NET },
            content: [
                {
                    tag: 'opt_in_integrators',
                    attrs: {},
                    content: [
                        {
                            tag: 'integrator_list',
                            attrs: {},
                            content: integratorIds.map((id) => ({
                                tag: 'integrator',
                                attrs: { id: id.toString() }
                            }))
                        }
                    ]
                }
            ]
        });
    };

    const optOutIntegrators = async (integratorIds = [exports.INTEGRATOR_BIRDYCHAT, exports.INTEGRATOR_HAIKET]) => {
        await query({
            tag: 'iq',
            attrs: { type: 'set', xmlns: 'w:interop', to: WABinary_1.S_WHATSAPP_NET },
            content: [
                {
                    tag: 'opt_out_integrators',
                    attrs: {},
                    content: [
                        {
                            tag: 'integrator_list',
                            attrs: {},
                            content: integratorIds.map((id) => ({
                                tag: 'integrator',
                                attrs: { id: id.toString() }
                            }))
                        }
                    ]
                }
            ]
        });
    };

    const resolveInteropUsers = async (users) => {
        if (!users || users.length === 0) return [];
        if (users.length > INTEROP_BATCH_MAX) {
            throw new Error(`resolveInteropUsers: max ${INTEROP_BATCH_MAX} users per request`);
        }
        const result = await query({
            tag: 'iq',
            attrs: { type: 'get', xmlns: 'w:interop', to: WABinary_1.S_WHATSAPP_NET },
            content: [
                {
                    tag: 'users',
                    attrs: {},
                    content: users.map(({ externalId, integratorId }) => ({
                        tag: 'user',
                        attrs: {
                            external_id: externalId,
                            integrator_id: integratorId.toString()
                        }
                    }))
                }
            ]
        });
        const usersNode = (0, WABinary_1.getBinaryNodeChild)(result, 'users');
        if (!usersNode) return [];
        return (0, WABinary_1.getBinaryNodeChildren)(usersNode, 'user').map((userNode) => {
            const errorNode = (0, WABinary_1.getBinaryNodeChild)(userNode, 'error');
            if (errorNode) {
                return {
                    externalId: userNode.attrs.external_id,
                    integratorId: parseInt(userNode.attrs.integrator_id, 10),
                    error: {
                        code: parseInt(errorNode.attrs.code, 10),
                        text: errorNode.attrs.text
                    }
                };
            }
            return {
                jid: userNode.attrs.jid,
                externalId: userNode.attrs.external_id,
                normalizedExternalId: userNode.attrs.normalized_external_id,
                integratorId: parseInt(userNode.attrs.integrator_id, 10)
            };
        });
    };

    const resolveInteropUser = async (externalId, integratorId) => {
        const results = await resolveInteropUsers([{ externalId, integratorId }]);
        return results[0] ?? null;
    };

    const getReachabilitySettings = async () => {
        const result = await query({
            tag: 'iq',
            attrs: { type: 'get', xmlns: 'w:interop', to: WABinary_1.S_WHATSAPP_NET },
            content: [{ tag: 'reachability_settings', attrs: {} }]
        });
        const settingsNode = (0, WABinary_1.getBinaryNodeChild)(result, 'reachability_settings');
        if (!settingsNode) return null;
        return {
            enabled: settingsNode.attrs?.enabled,
            users: (0, WABinary_1.getBinaryNodeChildren)(settingsNode, 'user').map((n) => ({
                externalId: n.attrs.external_id,
                integratorId: parseInt(n.attrs.integrator_id, 10),
                jid: n.attrs.jid
            }))
        };
    };

    const setReachabilitySettings = async (users, enabled = true) => {
        const enabledStr = typeof enabled === 'boolean' ? (enabled ? 'true' : 'false') : String(enabled);
        await query({
            tag: 'iq',
            attrs: { type: 'set', xmlns: 'w:interop', to: WABinary_1.S_WHATSAPP_NET },
            content: [
                {
                    tag: 'reachability_settings',
                    attrs: { enabled: enabledStr },
                    content: users.map(({ externalId, integratorId }) => ({
                        tag: 'user',
                        attrs: {
                            external_id: externalId,
                            integrator_id: integratorId.toString()
                        }
                    }))
                }
            ]
        });
    };

    const updateInteropBlockStatus = async (jid, action) => {
        await query({
            tag: 'iq',
            attrs: { type: 'set', xmlns: 'w:interop', to: WABinary_1.S_WHATSAPP_NET },
            content: [
                {
                    tag: 'blocklist',
                    attrs: {},
                    content: [{ tag: 'item', attrs: { action, jid } }]
                }
            ]
        });
    };

    const blockInteropUser = (jid) => updateInteropBlockStatus(jid, 'block');
    const unblockInteropUser = (jid) => updateInteropBlockStatus(jid, 'unblock');

    const reportInteropSpam = async (jid, spamFlow = 'account_info_block') => {
        await query({
            tag: 'iq',
            attrs: { type: 'set', xmlns: 'spam', to: WABinary_1.S_WHATSAPP_NET },
            content: [{ tag: 'spam_list', attrs: { jid, spam_flow: spamFlow } }]
        });
    };

    const trustInteropContact = async (jid) => {
        const t = Math.floor(Date.now() / 1000).toString();
        await query({
            tag: 'iq',
            attrs: { to: WABinary_1.S_WHATSAPP_NET, xmlns: 'privacy', type: 'set' },
            content: [
                {
                    tag: 'tokens',
                    attrs: {},
                    content: [{ tag: 'token', attrs: { jid, type: 'trusted_contact', t } }]
                }
            ]
        });
    };

    const initInterop = async () => {
        let integrators;
        try {
            integrators = await fetchIntegrators();
        }
        catch (err) {
            logger?.warn?.({ err }, 'interop: failed to fetch integrators');
            return [];
        }
        const toOptIn = integrators.filter((i) => i.status === 'active' || i.status === 'onboarding');
        if (toOptIn.length === 0) return integrators;
        try {
            await acceptInteropTOS();
        }
        catch (err) {
            logger?.warn?.({ err }, 'interop: failed to accept TOS');
        }
        try {
            await optInIntegrators(toOptIn.map((i) => i.id));
        }
        catch (err) {
            logger?.warn?.({ err }, 'interop: failed to opt-in integrators');
        }
        logger?.info?.({ integrators: toOptIn.map((i) => i.name) }, 'interop: opted in');
        return integrators;
    };

    const resetInteropSession = async (jid) => {
        await signalRepository?.deleteSession?.([jid]);
        logger?.info?.({ jid }, '[interop] session reset — next send will use pkmsg');
    };

    const createInteropGroup = async (participants) => {
        const result = await mexQuery(
            { input: { participants: participants.map((jid) => ({ jid })) } },
            INTEROP_MEX_QUERY_IDS.CREATE_GROUP,
            'xwa2_interop_group_create'
        );
        logger?.info?.({ participants }, '[interop] group created via MEX');
        return result;
    };

    const leaveInteropGroup = async (jids) => {
        const ids = Array.isArray(jids) ? jids : [jids];
        const result = await mexQuery(
            { input: { groups_to_leave: ids.map((jid) => ({ gid: jid.split('@')[0] })) } },
            INTEROP_MEX_QUERY_IDS.LEAVE_GROUP,
            'xwa2_interop_group_leave'
        );
        logger?.info?.({ jids: ids }, '[interop] left group(s) via MEX');
        return result;
    };

    const addParticipantsToInteropGroup = async (groupJid, participants) => {
        const gid = groupJid.split('@')[0];
        return mexQuery(
            { input: { gid, participants: participants.map((jid) => ({ jid })) } },
            INTEROP_MEX_QUERY_IDS.ADD_PARTICIPANTS,
            'xwa2_interop_add_participants_to_group'
        );
    };

    const queryInteropGroupInfo = async (groupJid) => {
        const gid = groupJid.split('@')[0];
        return mexQuery({ group_input: { gid } }, INTEROP_MEX_QUERY_IDS.QUERY_GROUP_INFO, 'xwa2_interop_group_query_by_id');
    };

    const updateInteropPrivacySetting = async (feature, setting) => {
        return mexQuery(
            { feature, setting },
            INTEROP_MEX_QUERY_IDS.PRIVACY_SETTINGS_UPDATE,
            'xwa2_interop_privacy_setting_update'
        );
    };

    const updateInteropPrivacySettingWithContactList = async (
        feature,
        setting,
        contacts,
        contactListType,
        dhash = 'none'
    ) => {
        return mexQuery(
            { feature, setting, contacts, contact_list_type: contactListType, dhash },
            INTEROP_MEX_QUERY_IDS.PRIVACY_SETTINGS_WITH_CONTACT_LIST,
            'xwa2_interop_privacy_setting_with_contact_list_update'
        );
    };

    const queryInteropPrivacySettings = () =>
        mexQuery({}, INTEROP_MEX_QUERY_IDS.PRIVACY_SETTINGS_QUERY, 'xwa2_interop_privacy_settings');

    const getInteropGroupAddPrivacy = async (jid, integratorId) => {
        const result = await query({
            tag: 'iq',
            attrs: { type: 'get', xmlns: 'w:interop', to: WABinary_1.S_WHATSAPP_NET },
            content: [
                {
                    tag: 'privacy',
                    attrs: { feature: 'GROUPADD' },
                    content: [
                        {
                            tag: 'user',
                            attrs: {
                                jid,
                                integrator_id: integratorId.toString()
                            }
                        }
                    ]
                }
            ]
        });
        const privacyNode = (0, WABinary_1.getBinaryNodeChild)(result, 'privacy');
        const userNode = (0, WABinary_1.getBinaryNodeChild)(privacyNode, 'user');
        return userNode?.attrs?.result === 'allowed';
    };

    return {
        ...sock,
        fetchIntegrators,
        acceptInteropTOS,
        optInIntegrators,
        optOutIntegrators,
        resolveInteropUser,
        resolveInteropUsers,
        getReachabilitySettings,
        setReachabilitySettings,
        blockInteropUser,
        unblockInteropUser,
        reportInteropSpam,
        trustInteropContact,
        initInterop,
        resetInteropSession,
        createInteropGroup,
        leaveInteropGroup,
        addParticipantsToInteropGroup,
        queryInteropGroupInfo,
        queryInteropPrivacySettings,
        updateInteropPrivacySetting,
        updateInteropPrivacySettingWithContactList,
        getInteropGroupAddPrivacy,
        INTEGRATOR_BIRDYCHAT: exports.INTEGRATOR_BIRDYCHAT,
        INTEGRATOR_HAIKET: exports.INTEGRATOR_HAIKET,
        INTEROP_MEX_QUERY_IDS
    };
};
exports.makeInteropSocket = makeInteropSocket;
