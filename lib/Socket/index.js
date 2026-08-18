"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

const Defaults_1 = require("../Defaults")
const community_1 = require("./community")
const interop_1 = require("./interop")
const privacy_1 = require("./privacy")
const registration_1 = require("./registration")
const managed_account_1 = require("./managed-account")
const graphql_1 = require("./graphql")

// export the last socket layer
const makeWASocket = (config) => {
    const effectiveSyncFullHistory = !!config?.syncFullHistory
    const newConfig = {
        ...Defaults_1.DEFAULT_CONNECTION_CONFIG,
        ...config,
        syncFullHistory: effectiveSyncFullHistory
    }

    // If the user hasn't provided their own history sync function,
    // let's create a default one that respects the syncFullHistory flag.
    if (config.shouldSyncHistoryMessage === undefined) {
        newConfig.shouldSyncHistoryMessage = () => !!newConfig.syncFullHistory
    }

    const baseSock = (0, community_1.makeCommunitiesSocket)(newConfig)
    const interopSock = (0, interop_1.makeInteropSocket)(baseSock)
    const privacySock = (0, privacy_1.makePrivacySocket)(interopSock)
    const registrationSock = (0, registration_1.makeRegistrationSocket)(privacySock)
    const managedSock = (0, managed_account_1.makeManagedAccountSocket)(registrationSock)
    const sock = (0, graphql_1.makeGraphQLSocket)(managedSock)

    return sock
}

exports.makeCommunitiesSocket = community_1.makeCommunitiesSocket
exports.makeInteropSocket = interop_1.makeInteropSocket
exports.makePrivacySocket = privacy_1.makePrivacySocket
exports.makeRegistrationSocket = registration_1.makeRegistrationSocket
exports.makeManagedAccountSocket = managed_account_1.makeManagedAccountSocket
exports.makeGraphQLSocket = graphql_1.makeGraphQLSocket
exports.makeAIGroupsSocket = require("./aigroups").makeAIGroupsSocket
exports.extractAIGroupMetadata = require("./aigroups").extractAIGroupMetadata
exports.Baron = require("./interactive-handler").Baron

exports.default = makeWASocket