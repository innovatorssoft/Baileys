"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAIGroupMetadata = exports.makeAIGroupsSocket = void 0;

const Types_1 = require("../Types");
const Utils_1 = require("../Utils");
const WABinary_1 = require("../WABinary");
const groups_1 = require("./groups");

const extractAIGroupMetadata = (result) => {
    const createNode = (0, WABinary_1.getBinaryNodeChild)(result, 'create');
    const group =
        (0, WABinary_1.getBinaryNodeChild)(createNode || result, 'group') ||
        (0, WABinary_1.getBinaryNodeChild)(result, 'group');
    const descChild = (0, WABinary_1.getBinaryNodeChild)(group, 'description');
    let desc, descId, descOwner, descOwnerPn, descTime;
    if (descChild) {
        desc = (0, WABinary_1.getBinaryNodeChildString)(descChild, 'body');
        descOwner = descChild.attrs.participant ? (0, WABinary_1.jidNormalizedUser)(descChild.attrs.participant) : undefined;
        descOwnerPn = descChild.attrs.participant_pn
            ? (0, WABinary_1.jidNormalizedUser)(descChild.attrs.participant_pn)
            : undefined;
        descTime = +descChild.attrs.t;
        descId = descChild.attrs.id;
    }
    const groupId = group.attrs.id.includes('@') ? group.attrs.id : (0, WABinary_1.jidEncode)(group.attrs.id, 'g.us');
    const eph = (0, WABinary_1.getBinaryNodeChild)(group, 'ephemeral')?.attrs.expiration;
    const metadata = {
        id: groupId,
        subject: group.attrs.subject,
        subjectTime: +group.attrs.s_t,
        creation: +group.attrs.creation,
        owner: group.attrs.creator ? (0, WABinary_1.jidNormalizedUser)(group.attrs.creator) : undefined,
        ownerPn: group.attrs.creator_pn ? (0, WABinary_1.jidNormalizedUser)(group.attrs.creator_pn) : undefined,
        owner_country_code: group.attrs.creator_country_code,
        size: group.attrs.size ? +group.attrs.size : (0, WABinary_1.getBinaryNodeChildren)(group, 'participant').length,
        desc,
        descId,
        descOwner,
        descOwnerPn,
        descTime,
        isAIGroup: true,
        addressingMode: group.attrs.addressing_mode === 'lid' ? Types_1.WAMessageAddressingMode.LID : Types_1.WAMessageAddressingMode.PN,
        participants: (0, WABinary_1.getBinaryNodeChildren)(group, 'participant').map(({ attrs }) => ({
            id: attrs.jid,
            phoneNumber: (0, WABinary_1.isLidUser)(attrs.jid) && (0, WABinary_1.isPnUser)(attrs.phone_number) ? attrs.phone_number : undefined,
            lid: (0, WABinary_1.isPnUser)(attrs.jid) && (0, WABinary_1.isLidUser)(attrs.lid) ? attrs.lid : undefined,
            admin: attrs.type || null
        })),
        ephemeralDuration: eph ? +eph : undefined
    };
    return metadata;
};
exports.extractAIGroupMetadata = extractAIGroupMetadata;

const makeAIGroupsSocket = (config) => {
    const sock = (0, groups_1.makeGroupsSocket)(config);
    const { ev, query } = sock;

    const aiGroupQuery = async (jid, type, content) => query({
        tag: 'iq',
        attrs: {
            type,
            xmlns: 'w:g2',
            to: jid
        },
        content
    });

    const aiGroupMetadata = async (jid) => {
        const result = await aiGroupQuery(jid, 'get', [{ tag: 'query', attrs: { request: 'interactive' } }]);
        return (0, exports.extractAIGroupMetadata)(result);
    };

    sock.ws.on('CB:notification,w:gp2', async (node) => {
        const { attrs, content } = node;
        if (!Array.isArray(content) || content.length === 0) return;

        const inner = content[0];
        const tag = inner.tag;
        const groupId = typeof attrs.from === 'string'
            ? attrs.from
            : attrs.from?.$1?.user
                ? (0, WABinary_1.jidEncode)(attrs.from.$1.user, 'g.us')
                : undefined;

        if (!groupId) return;

        if (tag === 'create') {
            try {
                const meta = await aiGroupMetadata(groupId);
                ev.emit('groups.upsert', [meta]);
            }
            catch {
                ev.emit('groups.upsert', [{ id: groupId }]);
            }
        }
        else if (tag === 'promote' || tag === 'demote' || tag === 'remove' || tag === 'add') {
            const participants = (0, WABinary_1.getBinaryNodeChildren)(inner, 'participant')
                .map((p) => {
                    const jid = p.attrs.jid;
                    if (typeof jid === 'string') return jid;
                    if (jid?.$1) {
                        return (0, WABinary_1.jidEncode)(jid.$1.user, jid.$1.server || 's.whatsapp.net');
                    }
                    return undefined;
                })
                .filter(Boolean);

            ev.emit('group-participants.update', {
                id: groupId,
                participants,
                action: tag
            });
        }
        else if (tag === 'subject') {
            ev.emit('groups.update', [{ id: groupId, subject: inner.attrs?.subject }]);
        }

        await sock.sendMessageAck(node);
    });

    return {
        ...sock,
        aiGroupMetadata,
        aiGroupCreate: async (subject, participants = [], options = {}) => {
            if (!Array.isArray(participants)) participants = [];
            const key = (0, Utils_1.generateMessageIDV2)();
            const {
                ephemeralExpiration = 86400,
                memberAddMode = 'all_member_add',
                memberShareGroupHistoryMode = 'all_member_share',
                memberLinkMode = 'all_member_link'
            } = options;
            const result = await aiGroupQuery('@g.us', 'set', [
                {
                    tag: 'create',
                    attrs: {
                        subject,
                        key
                    },
                    content: participants.map((jid) => ({
                        tag: 'participant',
                        attrs: { jid }
                    }))
                }
            ]);
            return (0, exports.extractAIGroupMetadata)(result);
        },
        aiGroupAddBot: async (jid, botUser = '867051314767696') => {
            const result = await aiGroupQuery(jid, 'set', [
                {
                    tag: 'add',
                    attrs: {},
                    content: [
                        {
                            tag: 'participant',
                            attrs: { jid: `${botUser}@bot` }
                        }
                    ]
                }
            ]);
            const node = (0, WABinary_1.getBinaryNodeChild)(result, 'add');
            const participantsAffected = (0, WABinary_1.getBinaryNodeChildren)(node, 'participant');
            return participantsAffected.map((p) => ({
                status: p.attrs.error || '200',
                jid: p.attrs.jid
            }));
        },
        aiGroupLeave: async (id) => {
            await aiGroupQuery('@g.us', 'set', [
                {
                    tag: 'leave',
                    attrs: {},
                    content: [{ tag: 'group', attrs: { id } }]
                }
            ]);
        },
        aiGroupParticipantsUpdate: async (jid, participants, action) => {
            const result = await aiGroupQuery(jid, 'set', [
                {
                    tag: action,
                    attrs: {},
                    content: participants.map((jid) => ({
                        tag: 'participant',
                        attrs: { jid }
                    }))
                }
            ]);
            const node = (0, WABinary_1.getBinaryNodeChild)(result, action);
            const participantsAffected = (0, WABinary_1.getBinaryNodeChildren)(node, 'participant');
            return participantsAffected.map((p) => ({
                status: p.attrs.error || '200',
                jid: p.attrs.jid,
                content: p
            }));
        },
        aiGroupUpdateSubject: async (jid, subject) => {
            await aiGroupQuery(jid, 'set', [
                {
                    tag: 'subject',
                    attrs: {},
                    content: Buffer.from(subject, 'utf-8')
                }
            ]);
        },
        aiGroupInviteCode: async (jid) => {
            const result = await aiGroupQuery(jid, 'get', [{ tag: 'invite', attrs: {} }]);
            const inviteNode = (0, WABinary_1.getBinaryNodeChild)(result, 'invite');
            return inviteNode?.attrs.code;
        },
        aiGroupRevokeInvite: async (jid) => {
            const result = await aiGroupQuery(jid, 'set', [{ tag: 'invite', attrs: {} }]);
            const inviteNode = (0, WABinary_1.getBinaryNodeChild)(result, 'invite');
            return inviteNode?.attrs.code;
        },
        aiGroupAcceptInvite: async (code) => {
            const results = await aiGroupQuery('@g.us', 'set', [{ tag: 'invite', attrs: { code } }]);
            const result = (0, WABinary_1.getBinaryNodeChild)(results, 'group');
            return result?.attrs.jid;
        },
        aiGroupSettingUpdate: async (jid, setting) => {
            await aiGroupQuery(jid, 'set', [{ tag: setting, attrs: {} }]);
        },
        aiGroupToggleEphemeral: async (jid, ephemeralExpiration) => {
            const content = ephemeralExpiration
                ? { tag: 'ephemeral', attrs: { expiration: ephemeralExpiration.toString() } }
                : { tag: 'not_ephemeral', attrs: {} };
            await aiGroupQuery(jid, 'set', [content]);
        }
    };
};
exports.makeAIGroupsSocket = makeAIGroupsSocket;
