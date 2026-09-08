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

const USERNAME_QUERY_IDS = {
    CHECK: '26124072630599520', // UsernameCheck
    CHECK_MULTI: '27134626522840290', // UsernameCheckMulti
    SET: '27108705368767936', // UsernameSet
    GET: '32618050064506056', // UsernameGet
    GET_RECOMMENDATIONS: '26077456248616956', // UsernameGetRecommendationsQuery
    PIN_SET: '25529696019976770' // UsernamePinSet
}

const USERNAME_CHECK_RESULT = {
    SUCCESS: 'SUCCESS',
    INVALID: 'INVALID'
}

const USERNAME_SOURCE = {
    FB: 'FB',
    IG: 'IG',
    USER_INPUT: 'USER_INPUT',
    SUGGESTION: 'SUGGESTION'
}

const makeUsernameSocket = (config) => {
    const sock = makeNewsletterSocket(config)
    const { query, generateMessageTag, executeUSyncQuery, signalRepository, logger } = sock

    const usernameCache = config.usernameCache || new NodeCache({
        stdTTL: DEFAULT_CACHE_TTLS.USERNAME,
        useClones: false
    })

    const mexQuery = (variables, queryId, dataPath) =>
        executeWMexQuery(variables, queryId, dataPath, query, generateMessageTag)

    const checkUsername = async (username, includeSuggestions = true) => {
        if (!USERNAME_QUERY_IDS.CHECK) {
            throw new Error('Username CHECK query_id not configured — capture a live WA session to obtain it')
        }
        const data = await mexQuery(
            { username, include_suggestions: includeSuggestions },
            USERNAME_QUERY_IDS.CHECK,
            'xwa2_username_check'
        )
        if (data?.result === USERNAME_CHECK_RESULT.SUCCESS) {
            return { available: true, username }
        }
        return {
            available: false,
            username,
            suggestions: data?.suggestions ?? [],
            rejectionReasons: data?.rejection_reasons ?? [],
            suggestionsEligible: data?.suggestions_eligible ?? true
        }
    }

    const setUsername = async (username, options = {}) => {
        if (!USERNAME_QUERY_IDS.SET) {
            throw new Error('Username SET query_id not configured — capture a live WA session to obtain it')
        }
        const { source = USERNAME_SOURCE.USER_INPUT, sessionId, pin } = options
        const variables = {
            username,
            reserved: false,
            source,
            ...(sessionId ? { session_id: sessionId } : {}),
            ...(pin ? { pin } : {})
        }
        return mexQuery(variables, USERNAME_QUERY_IDS.SET, 'xwa2_username_set')
    }

    const deleteUsername = async () => {
        if (!USERNAME_QUERY_IDS.SET) {
            throw new Error('Username SET query_id not configured — capture a live WA session to obtain it')
        }
        return mexQuery({ username: null }, USERNAME_QUERY_IDS.SET, 'xwa2_username_delete')
    }

    const getMyUsername = async () => {
        if (!USERNAME_QUERY_IDS.GET) {
            throw new Error('Username GET query_id not configured — capture a live WA session to obtain it')
        }
        const data = await mexQuery({}, USERNAME_QUERY_IDS.GET, 'xwa2_username_get')
        return data?.username ?? null
    }

    const setUsernamePin = async (pin) => {
        if (!USERNAME_QUERY_IDS.PIN_SET) {
            throw new Error('Username PIN_SET query_id not configured — capture a live WA session to obtain it')
        }
        return mexQuery({ pin }, USERNAME_QUERY_IDS.PIN_SET, 'xwa2_username_pin_set')
    }

    const findUserByUsername = async (username, pin) => {
        const usyncQuery = new USyncQuery().withContactProtocol()
        const user = new USyncUser().withUsername(username)
        if (pin) user.withUsernameKey(pin)
        usyncQuery.withUser(user)
        const result = await executeUSyncQuery(usyncQuery)
        if (!result?.list?.length) return null
        const entry = result.list[0]
        return {
            jid: entry.id,
            contact: entry.contact ?? false
        }
    }

    const fetchContactUsernames = async (...jids) => {
        const usyncQuery = new USyncQuery().withUsernameProtocol()
        for (const jid of jids) {
            usyncQuery.withUser(new USyncUser().withId(jid))
        }
        const result = await executeUSyncQuery(usyncQuery)
        return result?.list ?? []
    }

    const checkUsernameMulti = async (usernames) => {
        const data = await mexQuery(
            { usernames },
            USERNAME_QUERY_IDS.CHECK_MULTI,
            'xwa2_username_check_multi'
        )
        return data
    }

    const getUsernameRecommendations = async (source = null) => {
        const variables = {}
        if (source) variables.source = source
        return mexQuery(variables, USERNAME_QUERY_IDS.GET_RECOMMENDATIONS, 'xwa2_username_get_recommendations')
    }

    /**
     * Resolves a WhatsApp username to an identity (LID / PN JID) using cache with WAUSync fallback.
     */
    const resolveUsername = async (username) => {
        const normalized = normalizeUsername(username)
        validateUsername(normalized)

        const cacheKey = `user:${normalized}`
        const cached = usernameCache.get(cacheKey)
        if (cached) {
            if (cached.notFound) {
                return null
            }
            return {
                username: cached.username,
                jid: cached.jid,
                ...(cached.lid ? { lid: cached.lid } : {}),
                ...(cached.pn ? { pn: cached.pn } : {})
            }
        }

        try {
            logger?.debug?.({ username: normalized }, '[Username] Resolving username')
            const usyncQuery = new USyncQuery()
                .withContext('interactive')
                .withMode('query')
                .withUsernameProtocol()
                .withLIDProtocol()
                .withContactProtocol()
                .withUser(new USyncUser().withUsername(normalized))

            const result = await executeUSyncQuery(usyncQuery)
            const entry = result?.list?.[0]

            if (!entry || entry.error || (!entry.id && !entry.lid && !entry.pn)) {
                logger?.debug?.({ username: normalized }, '[Username] Username not found on WhatsApp')
                usernameCache.set(cacheKey, { username: normalized, notFound: true, resolvedAt: Date.now() }, DEFAULT_CACHE_TTLS.USERNAME_NEGATIVE)
                return null
            }

            const lid = entry.lid || (isLidUser(entry.id) ? entry.id : undefined)
            const pn = entry.pn || (isJidUser(entry.id) ? entry.id : undefined)
            const jid = lid || pn || entry.id

            if (lid && pn && signalRepository?.lidMapping?.storeLIDPNMappings) {
                await signalRepository.lidMapping.storeLIDPNMappings([{ pn, lid }])
            }

            const resolution = {
                username: normalized,
                jid,
                ...(lid ? { lid } : {}),
                ...(pn ? { pn } : {})
            }

            logger?.debug?.({ username: normalized, hasLid: !!lid, hasPn: !!pn }, '[Username] Username resolved')

            usernameCache.set(cacheKey, { ...resolution, resolvedAt: Date.now() }, DEFAULT_CACHE_TTLS.USERNAME)
            return resolution
        } catch (error) {
            logger?.error?.({ username: normalized, err: error }, '[Username] Failed to resolve username')
            if (error instanceof UsernameInvalidError) {
                throw error
            }
            throw new UsernameResolutionError(normalized, error)
        }
    }

    /**
     * Resolves multiple WhatsApp usernames in bulk, combining cache lookups with a single batched USync query.
     */
    const resolveUsernames = async (usernames) => {
        if (!Array.isArray(usernames)) {
            throw new UsernameInvalidError(String(usernames), 'Usernames must be an array')
        }

        const results = new Array(usernames.length).fill(null)
        const uncachedIndices = []
        const uncachedUsernames = []

        for (let i = 0; i < usernames.length; i++) {
            const raw = usernames[i]
            let normalized
            try {
                normalized = normalizeUsername(raw)
                validateUsername(normalized)
            } catch {
                results[i] = null
                continue
            }

            const cacheKey = `user:${normalized}`
            const cached = usernameCache.get(cacheKey)
            if (cached) {
                if (!cached.notFound) {
                    results[i] = {
                        username: cached.username,
                        jid: cached.jid,
                        ...(cached.lid ? { lid: cached.lid } : {}),
                        ...(cached.pn ? { pn: cached.pn } : {})
                    }
                }
            } else {
                uncachedIndices.push(i)
                uncachedUsernames.push(normalized)
            }
        }

        if (uncachedUsernames.length > 0) {
            try {
                logger?.debug?.({ count: uncachedUsernames.length }, '[Username] Batch resolving usernames')
                const usyncQuery = new USyncQuery()
                    .withContext('interactive')
                    .withMode('query')
                    .withUsernameProtocol()
                    .withLIDProtocol()
                    .withContactProtocol()

                for (const u of uncachedUsernames) {
                    usyncQuery.withUser(new USyncUser().withUsername(u))
                }

                const queryResult = await executeUSyncQuery(usyncQuery)
                const list = queryResult?.list || []
                const lidPnMappings = []

                for (let j = 0; j < uncachedUsernames.length; j++) {
                    const originalIndex = uncachedIndices[j]
                    const u = uncachedUsernames[j]
                    const entry = list[j]
                    const cacheKey = `user:${u}`

                    if (!entry || entry.error || (!entry.id && !entry.lid && !entry.pn)) {
                        usernameCache.set(cacheKey, { username: u, notFound: true, resolvedAt: Date.now() }, DEFAULT_CACHE_TTLS.USERNAME_NEGATIVE)
                        results[originalIndex] = null
                        continue
                    }

                    const lid = entry.lid || (isLidUser(entry.id) ? entry.id : undefined)
                    const pn = entry.pn || (isJidUser(entry.id) ? entry.id : undefined)
                    const jid = lid || pn || entry.id

                    if (lid && pn) {
                        lidPnMappings.push({ pn, lid })
                    }

                    const resolution = {
                        username: u,
                        jid,
                        ...(lid ? { lid } : {}),
                        ...(pn ? { pn } : {})
                    }

                    usernameCache.set(cacheKey, { ...resolution, resolvedAt: Date.now() }, DEFAULT_CACHE_TTLS.USERNAME)
                    results[originalIndex] = resolution
                }

                if (lidPnMappings.length > 0 && signalRepository?.lidMapping?.storeLIDPNMappings) {
                    await signalRepository.lidMapping.storeLIDPNMappings(lidPnMappings)
                }
            } catch (error) {
                logger?.error?.({ err: error }, '[Username] Failed batch resolve usernames')
                throw new UsernameResolutionError('batch', error)
            }
        }

        return results
    }

    /**
     * Convenience method to lookup users by username, consistent with onWhatsApp conventions.
     */
    const onWhatsAppUsername = async (...usernames) => {
        const flatUsernames = usernames.flat()
        const resolved = await resolveUsernames(flatUsernames)
        return resolved.filter((r) => r !== null)
    }

    /**
     * Explicitly invalidates a cached username resolution mapping.
     */
    const invalidateUsername = async (username) => {
        const normalized = normalizeUsername(username)
        usernameCache.del(`user:${normalized}`)
        logger?.debug?.({ username: normalized }, '[Username] Invalidated username cache')
    }

    /**
     * Refreshes a username resolution mapping by invalidating cache and re-querying.
     */
    const refreshUsername = async (username) => {
        await invalidateUsername(username)
        return resolveUsername(username)
    }

    return {
        ...sock,
        usernameCache,
        resolveUsername,
        resolveUsernames,
        onWhatsAppUsername,
        invalidateUsername,
        refreshUsername,
        checkUsername,
        checkUsernameMulti,
        setUsername,
        deleteUsername,
        getMyUsername,
        getUsernameRecommendations,
        setUsernamePin,
        findUserByUsername,
        fetchContactUsernames,
        USERNAME_QUERY_IDS,
        USERNAME_CHECK_RESULT,
        USERNAME_SOURCE
    }
}

exports.makeUsernameSocket = makeUsernameSocket
module.exports = {
    makeUsernameSocket
}
