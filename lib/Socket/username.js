"use strict"

Object.defineProperty(exports, "__esModule", { value: true })
exports.makeUsernameSocket = void 0

const node_cache_1 = require("@cacheable/node-cache")
const NodeCache = node_cache_1.default || node_cache_1
const { executeWMexQuery } = require("./mex")
const { USyncQuery, USyncUser } = require("../WAUSync")
const { makeNewsletterSocket } = require("./newsletter")
const { DEFAULT_CACHE_TTLS } = require("../Defaults")
const { isLidUser, isJidUser } = require("../WABinary")
const { UsernameInvalidError, UsernameResolutionError } = require("../Types/Username")
const { normalizeUsername, validateUsername } = require("../Utils/username")

const USERNAME_QUERY_IDS = { CHECK: '26124072630599520', CHECK_MULTI: '27134626522840290', SET: '27108705368767936', GET: '32618050064506056', GET_RECOMMENDATIONS: '26077456248616956', PIN_SET: '25529696019976770' }
const USERNAME_CHECK_RESULT = { SUCCESS: 'SUCCESS', INVALID: 'INVALID' }
const USERNAME_SOURCE = { FB: 'FB', IG: 'IG', USER_INPUT: 'USER_INPUT', SUGGESTION: 'SUGGESTION' }

const makeUsernameSocket = (config) => {
    const sock = makeNewsletterSocket(config)
    const { query, generateMessageTag, executeUSyncQuery, signalRepository, logger } = sock
    const usernameCache = config.usernameCache || new NodeCache({ stdTTL: DEFAULT_CACHE_TTLS.USERNAME, useClones: false })
    const mexQuery = (variables, queryId, dataPath) => executeWMexQuery(variables, queryId, dataPath, query, generateMessageTag)

    const checkUsername = async (username, includeSuggestions = true) => {
        if (!USERNAME_QUERY_IDS.CHECK) throw new Error('Username CHECK query_id not configured — capture a live WA session to obtain it')
        const data = await mexQuery({ username, include_suggestions: includeSuggestions }, USERNAME_QUERY_IDS.CHECK, 'xwa2_username_check')
        return data?.result === USERNAME_CHECK_RESULT.SUCCESS ? { available: true, username } : { available: false, username, suggestions: data?.suggestions ?? [], rejectionReasons: data?.rejection_reasons ?? [], suggestionsEligible: data?.suggestions_eligible ?? true }
    }
    const setUsername = async (username, options = {}) => {
        if (!USERNAME_QUERY_IDS.SET) throw new Error('Username SET query_id not configured — capture a live WA session to obtain it')
        const { source = USERNAME_SOURCE.USER_INPUT, sessionId, pin } = options
        return mexQuery({ username, reserved: false, source, ...(sessionId ? { session_id: sessionId } : {}), ...(pin ? { pin } : {}) }, USERNAME_QUERY_IDS.SET, 'xwa2_username_set')
    }
    const deleteUsername = async () => mexQuery({ username: null }, USERNAME_QUERY_IDS.SET, 'xwa2_username_delete')
    const getMyUsername = async () => (await mexQuery({}, USERNAME_QUERY_IDS.GET, 'xwa2_username_get'))?.username ?? null
    const setUsernamePin = async (pin) => mexQuery({ pin }, USERNAME_QUERY_IDS.PIN_SET, 'xwa2_username_pin_set')
    const findUserByUsername = async (username, pin) => {
        const q = new USyncQuery().withContactProtocol(); const user = new USyncUser().withUsername(username); if (pin) user.withUsernameKey(pin); q.withUser(user)
        const entry = (await executeUSyncQuery(q))?.list?.[0]; return entry ? { jid: entry.id, contact: entry.contact ?? false } : null
    }
    const fetchContactUsernames = async (...jids) => { const q = new USyncQuery().withUsernameProtocol(); for (const jid of jids) q.withUser(new USyncUser().withId(jid)); return (await executeUSyncQuery(q))?.list ?? [] }
    const checkUsernameMulti = async (usernames) => mexQuery({ usernames }, USERNAME_QUERY_IDS.CHECK_MULTI, 'xwa2_username_check_multi')
    const getUsernameRecommendations = async (source = null) => mexQuery(source ? { source } : {}, USERNAME_QUERY_IDS.GET_RECOMMENDATIONS, 'xwa2_username_get_recommendations')
    const setCache = async (key, value, ttl) => { await usernameCache.set(key, value, ttl) }
    const toResolution = (username, entry) => {
        const lid = entry.lid || (isLidUser(entry.id) ? entry.id : undefined)
        const pn = entry.pn || (isJidUser(entry.id) ? entry.id : undefined)
        return { username, jid: lid || pn || entry.id, ...(lid ? { lid } : {}), ...(pn ? { pn } : {}) }
    }
    const resolveUsername = async (username) => {
        const normalized = validateUsername(normalizeUsername(username)); const cacheKey = `user:${normalized}`
        const cached = await usernameCache.get(cacheKey)
        if (cached) return cached.notFound ? null : { username: cached.username, jid: cached.jid, ...(cached.lid ? { lid: cached.lid } : {}), ...(cached.pn ? { pn: cached.pn } : {}) }
        try {
            // Username -> contact lookup is the established USync resolution path.
            // Keep this query minimal: adding LID/contact/username protocols together can
            // cause the live USync endpoint to ignore the request and time out.
            const q = new USyncQuery().withContactProtocol().withUser(new USyncUser().withUsername(normalized))
            const entry = (await executeUSyncQuery(q))?.list?.[0]
            if (!entry || entry.error || (!entry.id && !entry.lid && !entry.pn)) { await setCache(cacheKey, { username: normalized, notFound: true, resolvedAt: Date.now() }, DEFAULT_CACHE_TTLS.USERNAME_NEGATIVE); return null }
            const resolution = toResolution(normalized, entry)
            if (resolution.lid && resolution.pn && signalRepository?.lidMapping?.storeLIDPNMappings) await signalRepository.lidMapping.storeLIDPNMappings([{ pn: resolution.pn, lid: resolution.lid }])
            await setCache(cacheKey, { ...resolution, resolvedAt: Date.now() }, DEFAULT_CACHE_TTLS.USERNAME); return resolution
        } catch (error) { if (error instanceof UsernameInvalidError) throw error; logger?.error?.({ username: normalized, err: error }, '[Username] Failed to resolve username'); throw new UsernameResolutionError(normalized, error) }
    }
    const resolveUsernames = async (usernames) => {
        if (!Array.isArray(usernames)) throw new UsernameInvalidError(String(usernames), 'Usernames must be an array')
        const results = new Array(usernames.length).fill(null); const pending = new Map()
        for (let i = 0; i < usernames.length; i++) {
            let normalized; try { normalized = validateUsername(normalizeUsername(usernames[i])) } catch { continue }
            const cached = await usernameCache.get(`user:${normalized}`)
            if (cached) { if (!cached.notFound) results[i] = { username: cached.username, jid: cached.jid, ...(cached.lid ? { lid: cached.lid } : {}), ...(cached.pn ? { pn: cached.pn } : {}) }; continue }
            const indices = pending.get(normalized) || []; indices.push(i); pending.set(normalized, indices)
        }
        const names = Array.from(pending.keys()); if (!names.length) return results
        try {
            const q = new USyncQuery().withContext('interactive').withMode('query').withUsernameProtocol().withLIDProtocol().withContactProtocol(); for (const name of names) q.withUser(new USyncUser().withUsername(name))
            const list = (await executeUSyncQuery(q))?.list || []; const byUsername = new Map()
            for (const entry of list) { if (typeof entry?.username !== 'string') continue; let name; try { name = normalizeUsername(entry.username) } catch { continue }; if (pending.has(name) && !byUsername.has(name)) byUsername.set(name, entry) }
            const mappings = new Map()
            for (const name of names) {
                const entry = byUsername.get(name); const indices = pending.get(name)
                if (!entry || entry.error || (!entry.id && !entry.lid && !entry.pn)) { await setCache(`user:${name}`, { username: name, notFound: true, resolvedAt: Date.now() }, DEFAULT_CACHE_TTLS.USERNAME_NEGATIVE); continue }
                const resolution = toResolution(name, entry); await setCache(`user:${name}`, { ...resolution, resolvedAt: Date.now() }, DEFAULT_CACHE_TTLS.USERNAME); for (const index of indices) results[index] = resolution
                if (resolution.lid && resolution.pn) mappings.set(`${resolution.lid}\u0000${resolution.pn}`, { pn: resolution.pn, lid: resolution.lid })
            }
            if (mappings.size && signalRepository?.lidMapping?.storeLIDPNMappings) await signalRepository.lidMapping.storeLIDPNMappings(Array.from(mappings.values()))
        } catch (error) { logger?.error?.({ err: error }, '[Username] Failed batch resolve usernames'); throw new UsernameResolutionError('batch', error) }
        return results
    }
    const onWhatsAppUsername = async (...usernames) => (await resolveUsernames(usernames.flat())).filter(Boolean)
    const invalidateUsername = async (username) => { await usernameCache.del(`user:${normalizeUsername(username)}`) }
    const refreshUsername = async (username) => { await invalidateUsername(username); return resolveUsername(username) }
    return { ...sock, usernameCache, resolveUsername, resolveUsernames, onWhatsAppUsername, invalidateUsername, refreshUsername, checkUsername, checkUsernameMulti, setUsername, deleteUsername, getMyUsername, getUsernameRecommendations, setUsernamePin, findUserByUsername, fetchContactUsernames, USERNAME_QUERY_IDS, USERNAME_CHECK_RESULT, USERNAME_SOURCE }
}

exports.makeUsernameSocket = makeUsernameSocket
module.exports = { makeUsernameSocket }
