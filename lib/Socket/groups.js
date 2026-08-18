"use strict"
Object.defineProperty(exports, "__esModule", { value: true })

const WAProto_1 = require("../../WAProto")
const Types_1 = require("../Types")
const Utils_1 = require("../Utils")
const WABinary_1 = require("../WABinary")
const chats_1 = require("./chats")

const makeGroupsSocket = (config) => {
    const suki = chats_1.makeChatsSocket(config)
    const { authState, ev, query, upsertMessage } = suki

    const groupQuery = async (jid, type, content) => (query({
        tag: 'iq',
        attrs: {
            type,
            xmlns: 'w:g2',
            to: jid,
        },
        content
    }))

    const groupMetadata = async (jid) => {
        const result = await groupQuery(jid, 'get', [{ tag: 'query', attrs: { request: 'interactive' } }])
        return extractGroupMetadata(result)
    }

    const groupFetchAllParticipating = async () => {
        const result = await query({
            tag: 'iq',
            attrs: {
                to: '@g.us',
                xmlns: 'w:g2',
                type: 'get',
            },
            content: [
                {
                    tag: 'participating',
                    attrs: {},
                    content: [
                        { tag: 'participants', attrs: {} },
                        { tag: 'description', attrs: {} }
                    ]
                }
            ]
        })

        const data = {}
        const groupsChild = WABinary_1.getBinaryNodeChild(result, 'groups')

        if (groupsChild) {
            const groups = WABinary_1.getBinaryNodeChildren(groupsChild, 'group')
            for (const groupNode of groups) {
                const meta = extractGroupMetadata({
                    tag: 'result',
                    attrs: {},
                    content: [groupNode]
                })
                data[meta.id] = meta
            }
        }

        suki.ev.emit('groups.update', Object.values(data))
        return data
    }

    suki.ws.on('CB:ib,,dirty', async (node) => {
        const { attrs } = WABinary_1.getBinaryNodeChild(node, 'dirty')
        if (attrs.type !== 'groups') {
            return
        }

        await groupFetchAllParticipating()
        await suki.cleanDirtyBits('groups')
    })

    return {
        ...suki,
        groupQuery,
        groupMetadata,
        groupCreate: async (subject, participants) => {
            const key = Utils_1.generateMessageID()

            const result = await groupQuery('@g.us', 'set', [
                {
                    tag: 'create',
                    attrs: {
                        subject,
                        key
                    },
                    content: participants.map(jid => ({
                        tag: 'participant',
                        attrs: { jid }
                    }))
                }
            ])

            return extractGroupMetadata(result)
        },
        groupLeave: async (id) => {
            await groupQuery('@g.us', 'set', [
                {
                    tag: 'leave',
                    attrs: {},
                    content: [
                        { tag: 'group', attrs: { id } }
                    ]
                }
            ])
        },
        groupUpdateSubject: async (jid, subject) => {
            await groupQuery(jid, 'set', [
                {
                    tag: 'subject',
                    attrs: {},
                    content: Buffer.from(subject, 'utf-8')
                }
            ])
        },
        groupRequestParticipantsList: async (jid) => {
            const result = await groupQuery(jid, 'get', [
                {
                    tag: 'membership_approval_requests',
                    attrs: {}
                }
            ])

            const node = WABinary_1.getBinaryNodeChild(result, 'membership_approval_requests')
            const participants = WABinary_1.getBinaryNodeChildren(node, 'membership_approval_request')

            return participants.map(v => v.attrs)
        },
        groupRequestParticipantsUpdate: async (jid, participants, action) => {
            const result = await groupQuery(jid, 'set', [{
                tag: 'membership_requests_action',
                attrs: {},
                content: [
                    {
                        tag: action,
                        attrs: {},
                        content: participants.map(jid => ({
                            tag: 'participant',
                            attrs: { jid }
                        }))
                    }
                ]
            }])

            const node = WABinary_1.getBinaryNodeChild(result, 'membership_requests_action')
            const nodeAction = WABinary_1.getBinaryNodeChild(node, action)
            const participantsAffected = WABinary_1.getBinaryNodeChildren(nodeAction, 'participant')

            return participantsAffected.map(p => {
                return { status: p.attrs.error || '200', jid: p.attrs.jid }
            })
        },
        groupParticipantsUpdate: async (jid, participants, action) => {
            const result = await groupQuery(jid, 'set', [
                {
                    tag: action,
                    attrs: {},
                    content: participants.map(jid => ({
                        tag: 'participant',
                        attrs: { jid }
                    }))
                }
            ])
            const node = WABinary_1.getBinaryNodeChild(result, action)
            const participantsAffected = WABinary_1.getBinaryNodeChildren(node, 'participant')

            return participantsAffected.map(p => {
                return { status: p.attrs.error || '200', jid: p.attrs.jid, content: p }
            })
        },
        groupUpdateDescription: async (jid, description) => {
            const metadata = await groupMetadata(jid)
            const prev = metadata.descId ? metadata.descId : null

            await groupQuery(jid, 'set', [
                {
                    tag: 'description',
                    attrs: {
                        ...(description ? { id: Utils_1.generateMessageID() } : { delete: 'true' }),
                        ...(prev ? { prev } : {})
                    },
                    content: description ? [
                        { tag: 'body', attrs: {}, content: Buffer.from(description, 'utf-8') }
                    ] : undefined
                }
            ])
        },
        groupInviteCode: async (jid) => {
            const result = await groupQuery(jid, 'get', [{ tag: 'invite', attrs: {} }])
            const inviteNode = WABinary_1.getBinaryNodeChild(result, 'invite')

            return inviteNode?.attrs?.code
        },
        groupRevokeInvite: async (jid) => {
            const result = await groupQuery(jid, 'set', [{ tag: 'invite', attrs: {} }])
            const inviteNode = WABinary_1.getBinaryNodeChild(result, 'invite')

            return inviteNode?.attrs?.code
        },
        groupAcceptInvite: async (code) => {
            const results = await groupQuery('@g.us', 'set', [{ tag: 'invite', attrs: { code } }])
            const result = WABinary_1.getBinaryNodeChild(results, 'group')

            return result?.attrs?.jid
        },
        /**
         * revoke a v4 invite for someone
         * @param groupJid group jid
         * @param invitedJid jid of person you invited
         * @returns true if successful
         */
        groupRevokeInviteV4: async (groupJid, invitedJid) => {
            const result = await groupQuery(groupJid, 'set', [{ tag: 'revoke', attrs: {}, content: [{ tag: 'participant', attrs: { jid: invitedJid } }] }])

            return !!result
        },
        /**
         * accept a GroupInviteMessage
         * @param key the key of the invite message, or optionally only provide the jid of the person who sent the invite
         * @param inviteMessage the message to accept
         */
        groupAcceptInviteV4: ev.createBufferedFunction(async (key, inviteMessage) => {
            key = typeof key === 'string' ? { remoteJid: key } : key
            const results = await groupQuery(inviteMessage.groupJid, 'set', [{
                tag: 'accept',
                attrs: {
                    code: inviteMessage.inviteCode,
                    expiration: inviteMessage.inviteExpiration.toString(),
                    admin: key.remoteJid
                }
            }])

            // if we have the full message key
            // update the invite message to be expired
            if (key.id) {
                // create new invite message that is expired
                inviteMessage = WAProto_1.proto.Message.GroupInviteMessage.fromObject(inviteMessage)
                inviteMessage.inviteExpiration = 0
                inviteMessage.inviteCode = ''
                ev.emit('messages.update', [
                    {
                        key,
                        update: {
                            message: {
                                groupInviteMessage: inviteMessage
                            }
                        }
                    }
                ])
            }

            // generate the group add message
            await upsertMessage({
                key: {
                    remoteJid: inviteMessage.groupJid,
                    id: Utils_1.generateMessageID(authState.creds.me?.id),
                    fromMe: false,
                    participant: key.remoteJid,
                },
                messageStubType: Types_1.WAMessageStubType.GROUP_PARTICIPANT_ADD,
                messageStubParameters: [
                    JSON.stringify(authState.creds.me)
                ],
                participant: key.remoteJid,
                messageTimestamp: Utils_1.unixTimestampSeconds()
            }, 'notify')

            return results.attrs.from
        }),
        groupGetInviteInfo: async (code) => {
            const results = await groupQuery('@g.us', 'get', [{ tag: 'invite', attrs: { code } }])

            return extractGroupMetadata(results)
        },
        groupToggleEphemeral: async (jid, ephemeralExpiration) => {
            const content = ephemeralExpiration ?
                { tag: 'ephemeral', attrs: { expiration: ephemeralExpiration.toString() } } :
                { tag: 'not_ephemeral', attrs: {} }
            await groupQuery(jid, 'set', [content])
        },
        groupSettingUpdate: async (jid, setting) => {
            await groupQuery(jid, 'set', [{ tag: setting, attrs: {} }])
        },
        groupMemberAddMode: async (jid, mode) => {
            await groupQuery(jid, 'set', [{ tag: 'member_add_mode', attrs: {}, content: mode }])
        },
        groupJoinApprovalMode: async (jid, mode) => {
            await groupQuery(jid, 'set', [{ tag: 'membership_approval_mode', attrs: {}, content: [{ tag: 'group_join', attrs: { state: mode } }] }])
        },
        groupAcknowledge: async (jid) => {
            await groupQuery(jid, 'set', [{ tag: 'ack', attrs: {} }])
        },
        groupGetLinkedParticipants: async (jid) => {
            const result = await groupQuery(jid, 'get', [{ tag: 'linked_groups_participants', attrs: {} }])
            const node = WABinary_1.getBinaryNodeChild(result, 'linked_groups_participants')
            return WABinary_1.getBinaryNodeChildren(node, 'participant').map((p) => ({
                jid: p.attrs.jid,
                phoneNumber: p.attrs.phone_number || p.attrs.pn || undefined
            }))
        },
        groupJoinLinked: async (parentJid, linkedGroupJid, type) => {
            const result = await groupQuery(parentJid, 'set', [
                { tag: 'join_linked_group', attrs: { jid: linkedGroupJid, ...(type ? { type } : {}) } }
            ])
            return { approvalRequested: !!WABinary_1.getBinaryNodeChild(result, 'membership_approval_request') }
        },
        getGroupProfilePictures: async (jids, type = 'preview') => {
            const result = await groupQuery(WABinary_1.S_WHATSAPP_NET, 'get', [
                {
                    tag: 'pictures',
                    attrs: {},
                    content: jids.map((id) => ({ tag: 'picture', attrs: { id, type } }))
                }
            ])
            return WABinary_1.getBinaryNodeChildren(result, 'picture').map((pic) => ({
                jid: pic.attrs.id || pic.attrs.jid,
                type: pic.attrs.type,
                directPath: pic.attrs['direct_path'],
                url: pic.attrs.url
            }))
        },
        groupCreateSubGroupSuggestion: async (parentJid, suggestion) => {
            await groupQuery(parentJid, 'set', [{ tag: 'sub_group_suggestion', attrs: {}, content: suggestion }])
        },
        groupSubGroupSuggestionsAction: async (parentJid, action, suggestions) => {
            await groupQuery(parentJid, 'set', [
                {
                    tag: 'sub_group_suggestions_action',
                    attrs: {},
                    content: [
                        {
                            tag: action,
                            attrs: {},
                            content: suggestions.map((s) => ({
                                tag: 'sub_group_suggestion',
                                attrs: action === 'cancel' ? { jid: s.jid } : { creator: s.creator }
                            }))
                        }
                    ]
                }
            ])
        },
        groupFetchAllParticipating
    }
}

const extractGroupMetadata = (result) => {
    const group = WABinary_1.getBinaryNodeChild(result, 'group')
    const descChild = WABinary_1.getBinaryNodeChild(group, 'description')
    const mode = group.attrs.addressing_mode === 'lid' ? Types_1.WAMessageAddressingMode.LID : Types_1.WAMessageAddressingMode.PN

    let desc
    let descId
    let descOwner
    let descOwnerPn
    let descOwnerLid
    let descTime

    if (descChild) {
        desc = WABinary_1.getBinaryNodeChildString(descChild, 'body')
        descId = descChild.attrs.id
        descOwner = descChild.attrs.participant ? WABinary_1.jidNormalizedUser(descChild.attrs.participant) : undefined
        descOwnerPn = descChild.attrs.participant_pn ? WABinary_1.jidNormalizedUser(descChild.attrs.participant_pn) : undefined
        descOwnerLid = mode === Types_1.WAMessageAddressingMode.LID ? WABinary_1.jidNormalizedUser(descChild.attrs.participant) : undefined
        descTime = +descChild.attrs.t
    }

    const groupId = group.attrs.id.includes('@') ? group.attrs.id : WABinary_1.jidEncode(group.attrs.id, 'g.us')
    const eph = WABinary_1.getBinaryNodeChild(group, 'ephemeral')?.attrs.expiration
    const memberAddMode = WABinary_1.getBinaryNodeChildString(group, 'member_add_mode') === 'all_member_add'

    const metadata = {
        id: groupId,
        notify: group.attrs.notify,
        addressingMode: mode,
        subject: group.attrs.subject,
        subjectOwner: group.attrs.s_o,
        subjectOwnerPn: group.attrs.s_o_pn,
        subjectOwnerLid: group.attrs.s_o,
        subjectTime: +group.attrs.s_t,
        size: group.attrs?.size ? +group.attrs.size : WABinary_1.getBinaryNodeChildren(group, 'participant').length,
        creation: +group.attrs.creation,
        owner: group.attrs.creator ? WABinary_1.jidNormalizedUser(group.attrs.creator) : undefined,
        ownerPn: group.attrs.creator_pn ? WABinary_1.jidNormalizedUser(group.attrs.creator_pn) : undefined,
        ownerLid: group.attrs.creator ? WABinary_1.jidNormalizedUser(group.attrs.creator) : undefined,
        owner_country_code: group.attrs.creator_country_code,
        ownerCountry: group.attrs.creator_country_code,
        desc,
        descId,
        descOwner,
        descOwnerPn,
        descOwnerLid,
        descTime,
        linkedParent: WABinary_1.getBinaryNodeChild(group, 'linked_parent')?.attrs.jid || undefined,
        restrict: !!WABinary_1.getBinaryNodeChild(group, 'locked'),
        announce: !!WABinary_1.getBinaryNodeChild(group, 'announcement'),
        isCommunity: !!WABinary_1.getBinaryNodeChild(group, 'parent'),
        isCommunityAnnounce: !!WABinary_1.getBinaryNodeChild(group, 'default_sub_group'),
        joinApprovalMode: !!WABinary_1.getBinaryNodeChild(group, 'membership_approval_mode'),
        memberAddMode,
        participants: WABinary_1.getBinaryNodeChildren(group, 'participant').map(({ attrs }) => {
            return {
                id: mode === Types_1.WAMessageAddressingMode.LID ? attrs.phone_number : attrs.jid,
                phoneNumber: WABinary_1.isLidUser(attrs.jid) && WABinary_1.isPnUser(attrs.phone_number) ? attrs.phone_number : undefined,
                lid: mode === Types_1.WAMessageAddressingMode.LID ? attrs.jid : attrs.lid,
                admin: (attrs.type || null),
                notify: attrs.notify
            }
        }),
        ephemeralDuration: eph ? +eph : undefined,
    }

    return metadata
}

module.exports = {
    makeGroupsSocket,
    extractGroupMetadata
}