"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

const lru_cache_1 = require("lru-cache")
const WABinary_1 = require("../WABinary")

class LIDMappingStore {
    constructor(keys, onWhatsAppFunc, logger) {
        this.mappingCache = new lru_cache_1.LRUCache({
            ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
            ttlAutopurge: true,
            updateAgeOnGet: true
        })
        this.keys = keys
        this.logger = logger
        this.onWhatsAppFunc = onWhatsAppFunc // needed to get LID from PN if not found
    }
    /**
     * Store LID-PN mapping - USER LEVEL
     */
    async storeLIDPNMappings(pairs) {
        // Validate inputs
        const pairMap = {}
        const logger = this.logger

        for (const { lid, pn } of pairs) {
            if (!((WABinary_1.isLidUser(lid) && WABinary_1.isJidUser(pn)) || (WABinary_1.isJidUser(lid) && WABinary_1.isLidUser(pn)))) {
                logger.warn(`Invalid LID-PN mapping: ${lid}, ${pn}`)
                continue
            }

            const lidDecoded = WABinary_1.jidDecode(lid)
            const pnDecoded = WABinary_1.jidDecode(pn)

            if (!lidDecoded || !pnDecoded) return

            const pnUser = pnDecoded.user
            const lidUser = lidDecoded.user

            // Check if mapping already exists (cache first, then database)
            let existingLidUser = this.mappingCache.get(`pn:${pnUser}`)

            if (!existingLidUser) {
                // Cache miss - check database
                const stored = await this.keys.get('lid-mapping', [pnUser])

                existingLidUser = stored[pnUser]

                if (existingLidUser) {
                    // Update cache with database value
                    this.mappingCache.set(`pn:${pnUser}`, existingLidUser)
                    this.mappingCache.set(`lid:${existingLidUser}`, pnUser)
                }
            }

            if (existingLidUser === lidUser) {
                logger.debug({ pnUser, lidUser }, 'LID mapping already exists, skipping')
                continue
            }

            pairMap[pnUser] = lidUser;
        }

        (logger.trace || logger.debug)({ pairMap }, `Storing ${Object.keys(pairMap).length} pn mappings`);

        await this.keys.transaction(async () => {
            for (const [pnUser, lidUser] of Object.entries(pairMap)) {
                await this.keys.set({
                    'lid-mapping': {
                        [pnUser]: lidUser, // "554396160286" -> "102765716062358"
                        [`${lidUser}_reverse`]: pnUser // "102765716062358_reverse" -> "554396160286"
                    }
                })

                // Update cache with both directions
                this.mappingCache.set(`pn:${pnUser}`, lidUser)
                this.mappingCache.set(`lid:${lidUser}`, pnUser)
            }
        }, 'lid-mapping')
    }
    /**
     * Get LID for PN - Returns device-specific LID based on user mapping
     */
    async getLIDForPN(pn) {
        if (!WABinary_1.isJidUser(pn)) return null

        const logger = this.logger
        const decoded = WABinary_1.jidDecode(pn)

        if (!decoded) return null

        // Check cache first for PN → LID mapping
        const pnUser = decoded.user

        let lidUser = this.mappingCache.get(`pn:${pnUser}`)

        if (!lidUser) {
            // Cache miss - check database
            const stored = await this.keys.get('lid-mapping', [pnUser])

            lidUser = stored[pnUser]

            if (lidUser) {
                // Cache the database result
                this.mappingCache.set(`pn:${pnUser}`, lidUser)
            }

            else {
                // Not in database - try USync
                (logger.trace || logger.debug)(`No LID mapping found for PN user ${pnUser}; getting from USync`);

                const { exists, lid } = (await this.onWhatsAppFunc?.(pn))?.[0] ?? {} // this function already adds LIDs to mapping

                if (exists && lid) {
                    lidUser = WABinary_1.jidDecode(lid)?.user

                    if (lidUser) {
                        // Cache the USync result
                        this.mappingCache.set(`pn:${pnUser}`, lidUser)
                    }
                }

                else {
                    return null
                }
            }
        }

        if (typeof lidUser !== 'string' || !lidUser) {
            logger.warn(`Invalid or empty LID user for PN ${pn}: lidUser = "${lidUser}"`)
            return null
        }

        // Push the PN device ID to the LID to maintain device separation
        const pnDevice = decoded.device !== undefined ? decoded.device : 0
        const deviceSpecificLid = `${lidUser}:${pnDevice}@lid`;

        (logger.trace || logger.debug)(`getLIDForPN: ${pn} → ${deviceSpecificLid} (user mapping with device ${pnDevice})`);

        return deviceSpecificLid
    }
    /**
     * Get PN for LID - USER LEVEL with device construction
     */
    async getPNForLID(lid) {
        if (!WABinary_1.isLidUser(lid)) return null

        const logger = this.logger
        const decoded = WABinary_1.jidDecode(lid)

        if (!decoded) return null

        // Check cache first for LID → PN mapping
        const lidUser = decoded.user

        let pnUser = this.mappingCache.get(`lid:${lidUser}`)

        if (!pnUser || typeof pnUser !== 'string') {
            // Cache miss - check database
            const stored = await this.keys.get('lid-mapping', [`${lidUser}_reverse`]);
            pnUser = stored[`${lidUser}_reverse`]

            if (!pnUser || typeof pnUser !== 'string') {
                (logger.trace || logger.debug)(`No reverse mapping found for LID user: ${lidUser}`);
                return null
            }

            this.mappingCache.set(`lid:${lidUser}`, pnUser)
        }

        // Construct device-specific PN JID
        const lidDevice = decoded.device !== undefined ? decoded.device : 0
        const pnJid = `${pnUser}:${lidDevice}@s.whatsapp.net`;

        (logger.trace || logger.debug)(`Found reverse mapping: ${lid} → ${pnJid}`);

        return pnJid
    }
}

module.exports = {
    LIDMappingStore
}
