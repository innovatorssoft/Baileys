"use strict"
Object.defineProperty(exports, "__esModule", { value: true })

const WAProto_1 = require("../../WAProto")
const Types_1 = require("../Types")
const Utils_1 = require("../Utils")
const WABinary_1 = require("../WABinary")
const business_1 = require("./business")

const makeCommunitiesSocket = (sockOrConfig) => {
    const suki = sockOrConfig && typeof sockOrConfig === 'object' && sockOrConfig.relayMessage
        ? sockOrConfig
        : (0, business_1.makeBusinessSocket)(sockOrConfig)
    const { authState, ev, query, groupMetadata, upsertMessage } = suki
    
    const communityQuery = async (jid, type, content) => (query({
        tag: 'iq',
        attrs: {
            type,
            xmlns: 'w:g2',
            to: jid,
        },
        content
    }))
    
    const communityMetadata = async (jid) => {
        const result = await communityQuery(jid, 'get', [{ tag: 'query', attrs: { request: 'interactive' } }])
        return extractCommunityMetadata(result)
    }
    
    const communityFetchAllParticipating = async () => {
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
        const communitiesChild = WABinary_1.getBinaryNodeChild(result, 'communities')
        
        if (communitiesChild) {
            const communities = WABinary_1.getBinaryNodeChildren(communitiesChild, 'community')
            for (const communityNode of communities) {
                const meta = extractCommunityMetadata({
                    tag: 'result',
                    attrs: {},
                    content: [communityNode]
                })
                data[meta.id] = meta
            }
        }
        
        suki.ev.emit('groups.update', Object.values(data))
        return data
    }
    
    suki.ws.on('CB:ib,,dirty', async (node) => {
    	const { attrs } = WABinary_1.getBinaryNodeChild(node, 'dirty') 
    
    	if (attrs.type !== 'communities') {
    		return
    	}
    
    	await communityFetchAllParticipating() 
    	await suki.cleanDirtyBits('groups') 
    }) 
    
    return {
        ...suki,
        communityQuery, 
        communityMetadata,
        communityCreate: async (subject, body) => {
            const descriptionId = (0, Utils_1.generateMessageID)().substring(0, 12)
            const key = (0, Utils_1.generateMessageID)()
            const content = [
                {
                    tag: 'parent',
                    attrs: {
                        default_membership_approval_mode: 'request_required'
                    }
                },
                {
                    tag: 'allow_non_admin_sub_group_creation',
                    attrs: {}
                },
                {
                    tag: 'create_general_chat',
                    attrs: {}
                }
            ]
            if (body) {
                content.unshift({
                    tag: 'description',
                    attrs: {
                        id: descriptionId
                    },
                    content: [{
                        tag: 'body',
                        attrs: {},
                        content: Buffer.from(body, 'utf-8')
                    }]
                })
            }
            const result = await communityQuery('@g.us', 'set', [
                {
                    tag: 'create',
                    attrs: { subject, key },
                    content
                }
            ])

            return extractCommunityMetadata(result)
        },
        communityLeave: async (id) => {
            await communityQuery('@g.us', 'set', [
                {
                    tag: 'leave',
                    attrs: {},
                    content: [
                        { tag: 'community', attrs: { id } }
                    ]
                }
            ])
        },
        communityCreateGroup: async (subject, participants, parentCommunityJid) => {
            const key = (0, Utils_1.generateMessageID)()
            const result = await communityQuery('@g.us', 'set', [
                {
                    tag: 'create',
                    attrs: {
                        subject,
                        key
                    },
                    content: [
                        ...participants.map((jid) => ({
                            tag: 'participant',
                            attrs: { jid }
                        })),
                        { tag: 'linked_parent', attrs: { jid: parentCommunityJid } }
                    ]
                }
            ])
            const groupNode = WABinary_1.getBinaryNodeChild(result, 'group')
            if (groupNode) {
                return await suki.groupMetadata?.(groupNode.attrs.id?.includes('@') ? groupNode.attrs.id : `${groupNode.attrs.id}@g.us`)
            }
            return extractCommunityMetadata(result)
        },
        communityLinkGroup: async (groupJid, parentCommunityJid) => {
            await communityQuery(parentCommunityJid, 'set', [
                {
                    tag: 'links',
                    attrs: {},
                    content: [
                        {
                            tag: 'link',
                            attrs: { link_type: 'sub_group' },
                            content: [{ tag: 'group', attrs: { jid: groupJid } }]
                        }
                    ]
                }
            ])
        },
        communityUnlinkGroup: async (groupJid, parentCommunityJid) => {
            await communityQuery(parentCommunityJid, 'set', [
                {
                    tag: 'unlink',
                    attrs: { unlink_type: 'sub_group' },
                    content: [{ tag: 'group', attrs: { jid: groupJid } }]
                }
            ])
        },
        communityFetchLinkedGroups: async (jid) => {
            let communityJid = jid
            let isCommunity = false
            const metadata = await suki.groupMetadata?.(jid)
            if (metadata?.linkedParent) {
                communityJid = metadata.linkedParent
            } else {
                isCommunity = true
            }
            const result = await communityQuery(communityJid, 'get', [{ tag: 'sub_groups', attrs: {} }])
            const linkedGroupsData = []
            const subGroupsNode = WABinary_1.getBinaryNodeChild(result, 'sub_groups')
            if (subGroupsNode) {
                const groupNodes = WABinary_1.getBinaryNodeChildren(subGroupsNode, 'group')
                for (const groupNode of groupNodes) {
                    linkedGroupsData.push({
                        id: groupNode.attrs.id ? WABinary_1.jidEncode(groupNode.attrs.id, 'g.us') : undefined,
                        subject: groupNode.attrs.subject || '',
                        creation: groupNode.attrs.creation ? Number(groupNode.attrs.creation) : undefined,
                        owner: groupNode.attrs.creator ? WABinary_1.jidNormalizedUser(groupNode.attrs.creator) : undefined,
                        size: groupNode.attrs.size ? Number(groupNode.attrs.size) : undefined
                    })
                }
            }
            return {
                communityJid,
                isCommunity,
                linkedGroups: linkedGroupsData
            }
        },
        communityUpdateSubject: async (jid, subject) => {
            await communityQuery(jid, 'set', [
                {
                    tag: 'subject',
                    attrs: {},
                    content: Buffer.from(subject, 'utf-8')
                }
            ])
        },
        communityRequestParticipantsList: async (jid) => {
            const result = await communityQuery(jid, 'get', [
                {
                    tag: 'membership_approval_requests',
                    attrs: {}
                }
            ])
            
            const node = WABinary_1.getBinaryNodeChild(result, 'membership_approval_requests')
            const participants = WABinary_1.getBinaryNodeChildren(node, 'membership_approval_request')
            
            return participants.map(v => v.attrs)
        },
        communityRequestParticipantsUpdate: async (jid, participants, action) => {
            const result = await communityQuery(jid, 'set', [{
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
        communityParticipantsUpdate: async (jid, participants, action) => {
            const result = await communityQuery(jid, 'set', [
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
        communityUpdateDescription: async (jid, description) => {
            const metadata = await communityMetadata(jid)
            const prev = metadata.descId ? metadata.descId : null
            
            await communityQuery(jid, 'set', [
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
        communityInviteCode: async (jid) => {
            const result = await communityQuery(jid, 'get', [{ tag: 'invite', attrs: {} }])
            const inviteNode = WABinary_1.getBinaryNodeChild(result, 'invite')
            
            return inviteNode?.attrs?.code
        },
        communityRevokeInvite: async (jid) => {
            const result = await communityQuery(jid, 'set', [{ tag: 'invite', attrs: {} }])
            const inviteNode = WABinary_1.getBinaryNodeChild(result, 'invite')
            
            return inviteNode?.attrs?.code
        },
        communityAcceptInvite: async (code) => {
            const results = await communityQuery('@g.us', 'set', [{ tag: 'invite', attrs: { code } }])
            const result = WABinary_1.getBinaryNodeChild(results, 'community')
            
            return result?.attrs?.jid
        },
        /**
         * revoke a v4 invite for someone
         * @param communityJid community jid
         * @param invitedJid jid of person you invited
         * @returns true if successful
         */
        communityRevokeInviteV4: async (communityJid, invitedJid) => {
            const result = await communityQuery(communityJid, 'set', [{ tag: 'revoke', attrs: {}, content: [{ tag: 'participant', attrs: { jid: invitedJid } }] }])
            
            return !!result
        },
        /**
         * accept a GroupInviteMessage
         * @param key the key of the invite message, or optionally only provide the jid of the person who sent the invite
         * @param inviteMessage the message to accept
         */
        communityAcceptInviteV4: ev.createBufferedFunction(async (key, inviteMessage) => {
            key = typeof key === 'string' ? { remoteJid: key } : key
            const results = await communityQuery(inviteMessage.groupJid, 'set', [{
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
                    authState.creds.me.id
                ],
                participant: key.remoteJid,
                messageTimestamp: Utils_1.unixTimestampSeconds()
            }, 'notify')
            
            return results.attrs.from
        }),
        communityGetInviteInfo: async (code) => {
            const results = await communityQuery('@g.us', 'get', [{ tag: 'invite', attrs: { code } }])
            
            return extractCommunityMetadata(results)
        },
        communityToggleEphemeral: async (jid, ephemeralExpiration) => {
            const content = ephemeralExpiration ?
                { tag: 'ephemeral', attrs: { expiration: ephemeralExpiration.toString() } } :
                { tag: 'not_ephemeral', attrs: {} }
            await communityQuery(jid, 'set', [content])
        },
        communitySettingUpdate: async (jid, setting) => {
            await communityQuery(jid, 'set', [{ tag: setting, attrs: {} }])
        },
        communityMemberAddMode: async (jid, mode) => {
            await communityQuery(jid, 'set', [{ tag: 'member_add_mode', attrs: {}, content: mode }])
        },
        communityJoinApprovalMode: async (jid, mode) => {
            await communityQuery(jid, 'set', [{ tag: 'membership_approval_mode', attrs: {}, content: [{ tag: 'community_join', attrs: { state: mode } }] }])
        },
        communityFetchAllParticipating
    }
}

const extractCommunityMetadata = (result) => {
    if (!result) return null
    const community = WABinary_1.getBinaryNodeChild(result, 'group') ||
                      WABinary_1.getBinaryNodeChild(result, 'community') ||
                      (result.tag === 'group' || result.tag === 'community' ? result : undefined) ||
                      (Array.isArray(result.content) ? result.content.find(c => c?.tag === 'group' || c?.tag === 'community') : undefined)

    if (!community || !community.attrs) {
        const rawId = result?.attrs?.from || result?.attrs?.id || '@g.us'
        const communityId = rawId.includes('@') ? rawId : (rawId ? WABinary_1.jidEncode(rawId, 'g.us') : '@g.us')
        return {
            id: communityId,
            subject: result?.attrs?.subject || '',
            participants: []
        }
    }

    const descChild = WABinary_1.getBinaryNodeChild(community, 'description')
    let desc
    let descId

    if (descChild) {
        desc = WABinary_1.getBinaryNodeChildString(descChild, 'body')
        descId = descChild.attrs?.id
    }

    const mode = community.attrs.addressing_mode
    const rawId = community.attrs.id || result?.attrs?.from || ''
    const communityId = rawId.includes('@') ? rawId : (rawId ? WABinary_1.jidEncode(rawId, 'g.us') : '')
    const eph = WABinary_1.getBinaryNodeChild(community, 'ephemeral')?.attrs?.expiration
    const memberAddMode = WABinary_1.getBinaryNodeChildString(community, 'member_add_mode') === 'all_member_add'

    const metadata = {
        id: communityId,
        addressingMode: mode,
        subject: community.attrs.subject,
        subjectOwner: mode === 'lid' ? community.attrs.s_o_pn : community.attrs.s_o,
        subjectTime: community.attrs.s_t ? +community.attrs.s_t : undefined,
        size: community.attrs?.size ? +community.attrs.size : WABinary_1.getBinaryNodeChildren(community, 'participant').length,
        creation: community.attrs.creation ? +community.attrs.creation : undefined,
        owner: community.attrs.creator ? WABinary_1.jidNormalizedUser(mode === 'lid' ? community.attrs.creator_pn : community.attrs.creator) : undefined,
        desc,
        descId,
        linkedParent: WABinary_1.getBinaryNodeChild(community, 'linked_parent')?.attrs?.jid || undefined,
        restrict: !!WABinary_1.getBinaryNodeChild(community, 'locked'),
        announce: !!WABinary_1.getBinaryNodeChild(community, 'announcement'),
        isCommunity: !!WABinary_1.getBinaryNodeChild(community, 'parent'),
        isCommunityAnnounce: !!WABinary_1.getBinaryNodeChild(community, 'default_sub_group'),
        joinApprovalMode: !!WABinary_1.getBinaryNodeChild(community, 'membership_approval_mode'),
        memberAddMode,
        participants: WABinary_1.getBinaryNodeChildren(community, 'participant').map(({ attrs }) => {
            return {
                id: mode === 'lid' ? attrs.phone_number || attrs.jid : attrs.jid,
                lid: mode === 'lid' ? attrs.jid : attrs.lid,
                admin: (attrs.type || null),
            }
        }),
        ephemeralDuration: eph ? +eph : undefined,
    }

    return metadata
}

module.exports = {
  makeCommunitiesSocket, 
  extractCommunityMetadata
}