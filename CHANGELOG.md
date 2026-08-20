# Changelog

All notable changes to `@innovatorssoft/baileys` are documented in this file.

## [7.5.1] - 2026-08-20

### Added
- **Album Messages (`ShowAsGrid`)**:
  - Optional `ShowAsGrid?: boolean` parameter for `sock.sendMessage(jid, { album: [...], ShowAsGrid: true })`.
  - Generates WhatsApp Meta AI `GenAIGridLayoutViewModel` containing `GenAIImagePrimitive[]` wrapped in `botForwardedMessage` -> `richResponseMessage` -> `unifiedResponse`.
  - Supports image URLs, local file paths, and Node.js `Buffer` media with automatic server upload.
  - Full support for preview URLs (`imagePreviewUrl`), high-resolution URLs (`imageHighResUrl`), source URLs (`sourceUrl`), and dark-mode metadata (`darkModePreviewUrl`, `darkModeHighResUrl`, `darkWidth`, `darkHeight`).
  - Shared expiration timestamp (`expiration_timestamp_ms`) centralized across all primitives in a single grid layout.
  - Full backward compatibility: omitting `ShowAsGrid` or setting `ShowAsGrid: false` preserves standard WhatsApp album behavior.
  - Added `prepareGridImageMessageContent`, `DEFAULT_GRID_IMAGE_WIDTH`, `DEFAULT_GRID_IMAGE_HEIGHT`, `DEFAULT_GRID_ASSET_EXPIRATION_MS`, and `getGridAssetExpiration` utilities.

## [7.5.0] - 2026-08-18

### Added
- **WAUSync Protocols**:
  - `USyncBusinessProtocol`: Synchronize verified business names, hours, address, commerce config, and catalog status.
  - `USyncFeatureProtocol`: Query device feature flags and capabilities (`USYNC_FEATURES`).
  - `USyncPictureProtocol`: Profile picture hash and direct path synchronization.
  - `USyncSidelistProtocol`: LID addressing sidelist delete and sync.
  - `USyncTextStatusProtocol`: About text and emoji status sync with TTL expiration.
  - Fluent builder methods on `USyncQuery` (`withBusinessProtocol`, `withFeatureProtocol`, `withPictureProtocol`, `withSidelistProtocol`, `withTextStatusProtocol`).

- **Protocol & Sync Utilities**:
  - Pure WA-Web compliant ACK / NACK stanza generator (`buildAckStanza`).
  - Message reporting token computation with HMAC & secret key generation (`shouldIncludeReportingToken`, `getMessageReportingToken`).
  - Trusted Contact (TC) token indexing, validation, and IQ store parsing (`readTcTokenIndex`, `buildMergedTcTokenIndexWrite`, `isTcTokenExpired`, `shouldSendNewTcToken`, `resolveTcTokenJid`, `storeTcTokensFromIqResult`).
  - Contact sync and LID-PN mapping event emitter (`processContactAction`, `emitSyncActionResults`).
  - VOIP E2E rekey payload decoder (`decodeE2eRekeyPayload`).
  - Group history decompression and payload extraction (`decodeGroupHistory`, `processGroupHistory`).
  - Consumer application protobuf decoder (`decodeConsumerApplication`, `consumerApplicationToMessage`).
  - Companion Web client platform mappings and pairing QR builder (`getCompanionWebClientType`, `getCompanionPlatformId`, `buildPairingQRData`).
  - Batch sequential offline stanza node processor (`makeOfflineNodeProcessor`).
  - Pre-key operation concurrency manager with mutex control (`PreKeyManager`).
  - Display JID normalization and logging (`createLidPnDebug`, `normalizeMentionedJidsForSend`, `normalizeMessageForDisplayJids`).
  - High-performance SQLite auth state adapter (`useSqliteAuthState`).

- **Meta AI & Reasoning Utilities**:
  - Meta AI planning step status and progress indicators (`PlanningStepStatus`, `buildSteps`, `buildProgressIndicator`, `sendMetaComposited`, `metaTyping`).
  - Live reasoning feed and planning step playback (`buildReasoningSteps`, `buildSearchSteps`, `mixedSteps`, `replayPlanning`).
  - Welcome flow generator with FAQ interactive buttons and listener lifecycle (`createWelcomeFlow`).
  - MSMSG bot message decryptor with AES-GCM and 2-pass HKDF (`decryptMsmsgBotMessage`, `decodeDecryptedMsmsgMessage`).
  - Message inspection helpers (`isScheduledMessage`, `getScheduledMessageTime`, `getMessagePaymentInfo`, `getMessageCommentMetadata`, `getMessageAddOns`, `getPollCorrectAnswer`, `toJid`, `getSenderLid`).

- **Socket Layers & Features**:
  - `makePrivacySocket`: MEX-driven privacy settings, status, passkeys, account login/logout, trusted devices, mobile config, linked profiles (`PRIVACY_MEX_IDS`).
  - `makeRegistrationSocket`: Registration upsells, passkeys, 2FA passwords, age verification, Imagine Me onboarding, account recovery via MEX (`REGISTRATION_MEX_IDS`).
  - `makeInteropSocket`: EU DMA third-party messaging (BirdyChat/Haiket integrators), reachability presence, interop groups, and privacy (`INTEROP_MEX_QUERY_IDS`).
  - `makeManagedAccountSocket`: Parental and family managed accounts, payments passkeys, UPI OTP verification, IPLS handshake (`MANAGED_ACCOUNT_MEX_IDS`).
  - `makeGraphQLSocket`: WWW, Facebook, and Wamo GraphQL query executor over HTTPS (`executeWWWGraphQL`, `executeFacebookGraphQL`, `executeWamoGraphQL`, `WWW_GQL_IDS`, `FACEBOOK_GQL_IDS`, `WAMO_GQL_IDS`, `CLIENT_PERSIST_GQL_IDS`).
  - `makeAIGroupsSocket`: AI group creation, metadata extraction, bot addition, and participant management (`makeAIGroupsSocket`, `extractAIGroupMetadata`).
  - `Zenbo` interactive handler (`handlePayment`, `handleProduct`, `handleInteractive`, `handleInteractiveButtons`, `handleAlbum`, `handleEvent`, `handlePollResult`, `handleGroupStory`, `sendStatusWhatsApp`, previously referenced as `Baron`).
  - Community socket enhancements: `communityCreateGroup`, `communityLinkGroup`, `communityUnlinkGroup`, `communityFetchLinkedGroups`.
  - Group socket enhancements: `groupAcknowledge`, `groupGetLinkedParticipants`, `groupJoinLinked`, `getGroupProfilePictures`, `groupCreateSubGroupSuggestion`, `groupSubGroupSuggestionsAction`.
  - Chat socket enhancements: `fetchBroadcastListQuota`, `getChatBlockingStatus`, `updateChatBlockingStatus`, `getUserDisclosures`, `acceptTosNotice`, `reportSpam`, `getOptOutList`, `signPrivateCredential`, `getPushConfig`, `setPushConfig`, `toggleCallLinkWaitingRoom`, `updateBioPrivacy`, `blockBot`, `unblockBot`, `getBotProfile`, `fetchABProps`, `removeCompanionDevice`, `updateKeyIndexList`, `sendKeyIndexList`, `fetchMediaConn`, `deleteBroadcastList`, `fetchQRCode`, `confirmDeviceLogout`, `findUserId`.
  - Message generation support for `raw` buffers, `code`, `table`, `latex`, and `richResponse`.
  - Verified Badge Media: Send image and video messages with verified forward badge via `{ verifiedMe: true }`.
