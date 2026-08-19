# @innovatorssoft/baileys — Developer Cookbook & Practical Recipes

This guide provides verified, copy-paste-ready recipes and code examples for the newly added and extended features in **`@innovatorssoft/baileys`** (v7.5.0).

---

## Table of Contents

1. [Requirements & Installation](#requirements--installation)
2. [Common Setup & Basic Socket](#common-setup--basic-socket)
3. [Authentication Strategies](#authentication-strategies)
   - [Multi-File Authentication (Default)](#multi-file-authentication-default)
   - [SQLite Authentication (`useSqliteAuthState`)](#sqlite-authentication-usesqliteauthstate)
4. [Rich & Structured Messaging](#rich--structured-messaging)
   - [Raw Protobuf Messages](#raw-protobuf-messages)
   - [Code Blocks with Syntax Highlighting](#code-blocks-with-syntax-highlighting)
   - [Tables](#tables)
   - [LaTeX Equations](#latex-equations)
   - [Unified Rich Response](#unified-rich-response)
   - [Send Media with Verified Badge](#send-media-with-verified-badge)
5. [Interactive Messages & Zenbo Handler](#interactive-messages--zenbo-handler)
   - [Native Flow & Interactive Buttons](#native-flow--interactive-buttons)
   - [Payment Requests](#payment-requests)
   - [Interactive Product Display](#interactive-product-display)
   - [Events & Invitations](#events--invitations)
   - [WhatsApp Status / Stories Mention](#whatsapp-status--stories-mention)
6. [Groups Management](#groups-management)
   - [Sub-Group Suggestions](#sub-group-suggestions)
   - [Linked Group Participants & Joining](#linked-group-participants--joining)
   - [Group Acknowledgment & Bulk Profile Pictures](#group-acknowledgment--bulk-profile-pictures)
7. [Communities](#communities)
   - [Creating a Community & Child Groups](#creating-a-community--child-groups)
   - [Linking and Unlinking Groups](#linking-and-unlinking-groups)
   - [Fetching Linked Groups](#fetching-linked-groups)
8. [Chat & Device Management](#chat--device-management)
   - [Blocking Status & Spam Reporting](#blocking-status--spam-reporting)
   - [Terms of Service & User Disclosures](#terms-of-service--user-disclosures)
   - [Push Configuration & Waiting Rooms](#push-configuration--waiting-rooms)
   - [Bot Profile & User ID Discovery](#bot-profile--user-id-discovery)
9. [USync Protocol Queries](#usync-protocol-queries)
   - [Fluent Query Builder](#fluent-query-builder)
   - [Business, Features, and Text Status Protocols](#business-features-and-text-status-protocols)
   - [Sidelist Protocol](#sidelist-protocol)
10. [Privacy & Account Security](#privacy--account-security)
    - [Privacy Settings & Disappearing Mode](#privacy-settings--disappearing-mode)
    - [Multi-Account & Trusted Device Management](#multi-account--trusted-device-management)
11. [Registration & Authentication](#registration--authentication)
    - [Passkeys & Two-Factor Authentication](#passkeys--two-factor-authentication)
    - [Age Verification & Account Recovery](#age-verification--account-recovery)
12. [Interoperability (Interop)](#interoperability-interop)
    - [Reachability Settings](#reachability-settings)
    - [Interop Groups & Blocklists](#interop-groups--blocklists)
13. [Managed Accounts & Family Controls](#managed-accounts--family-controls)
14. [AI Groups](#ai-groups)
15. [Meta AI & Workflow Replay](#meta-ai--workflow-replay)
    - [Planning & Reasoning Steps](#planning--reasoning-steps)
    - [Automated Welcome Flow](#automated-welcome-flow)
16. [Message Inspection Utilities](#message-inspection-utilities)
17. [JID & Identification Utilities](#jid--identification-utilities)
18. [Advanced & Protocol-Level Utilities](#advanced--protocol-level-utilities)
    - [Offline Node Processor](#offline-node-processor)
    - [Trusted Contact (TC) Tokens](#trusted-contact-tc-tokens)
    - [Contact Sync Actions](#contact-sync-actions)
    - [Group History Decompression](#group-history-decompression)
    - [GraphQL & MEX Execution](#graphql--mex-execution)
19. [TypeScript Workflows](#typescript-workflows)
20. [Production-Ready Error Handling & Reconnection](#production-ready-error-handling--reconnection)

---

## Requirements & Installation

- **Node.js**: `v20.0.0` or newer
- **Package**: `@innovatorssoft/baileys`

```bash
npm install @innovatorssoft/baileys
```

Optional peer dependencies (for specialized features):

```bash
# Required only if using SQLite auth storage:
npm install better-sqlite3

# Required only if using link preview image processing or image resizing:
npm install jimp
```

> [!NOTE]
> All examples use CommonJS `require()` by default for maximum compatibility. In ES modules (`"type": "module"`), use `import makeWASocket from '@innovatorssoft/baileys'`.

---

## Common Setup & Basic Socket

This standard boilerplate initializes an authenticated connection, displays the QR code in your terminal, and listens for incoming messages.

```javascript
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require('@innovatorssoft/baileys');
const pino = require('pino');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys');
    const { version, isLatest } = await fetchLatestBaileysVersion();

    console.log(`Using Baileys version: ${version.join('.')} (isLatest: ${isLatest})`);

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        auth: state,
        printQRInTerminal: true
    });

    // Save credentials whenever updated
    sock.ev.on('creds.update', saveCreds);

    // Handle connection lifecycle
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            console.log('QR Code generated. Scan with WhatsApp.');
        }
        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            console.log(`Connection closed (status ${statusCode}). Reconnecting: ${shouldReconnect}`);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('WhatsApp connection opened successfully!');
        }
    });

    // Handle incoming messages
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
            if (!msg.message || msg.key.fromMe) continue;

            const fromJid = msg.key.remoteJid;
            const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

            if (text === '!ping') {
                await sock.sendMessage(fromJid, { text: 'pong!' }, { quoted: msg });
            }
        }
    });

    return sock;
}

startBot();
```

---

## Authentication Strategies

### Multi-File Authentication (Default)

Stores auth credentials, signal keys, app state keys, and session data in discrete JSON files in a local directory.

```javascript
const { useMultiFileAuthState } = require('@innovatorssoft/baileys');

async function initMultiFileAuth() {
    const { state, saveCreds } = await useMultiFileAuthState('./sessions/my_session');
    // Pass state into makeWASocket({ auth: state })
    return { state, saveCreds };
}
```

### SQLite Authentication (`useSqliteAuthState`)

Stores session credentials and Signal keys inside an SQLite database using `better-sqlite3`. This provides faster read/write operations and avoids filesystem fragmentation.

```javascript
const { default: makeWASocket, useSqliteAuthState } = require('@innovatorssoft/baileys');

async function startWithSqlite() {
    // Requires: npm install better-sqlite3
    const { state, saveCreds } = await useSqliteAuthState({
        dbPath: './sessions.sqlite'
    });

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', ({ connection }) => {
        if (connection === 'open') {
            console.log('Connected using SQLite auth store!');
        }
    });
}

startWithSqlite();
```

---

## Rich & Structured Messaging

### Raw Protobuf Messages

Send custom or low-level protobuf structures directly through `sendMessage` using the `raw` property.

```javascript
const { proto } = require('@innovatorssoft/baileys');

async function sendRawMessageExample(sock, targetJid) {
    // Send a raw extended text message with custom contextInfo flags
    await sock.sendMessage(targetJid, {
        raw: {
            extendedTextMessage: {
                text: 'This message was delivered via raw proto injection.',
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 5
                }
            }
        }
    });
}
```

### Code Blocks with Syntax Highlighting

Send syntax-tokenized code snippets.

```javascript
async function sendCodeBlockExample(sock, targetJid) {
    // Method 1: Using sock.sendMessage
    await sock.sendMessage(targetJid, {
        code: `function fibonacci(n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
        language: 'javascript',
        title: 'Fibonacci Algorithm',
        footer: 'Node.js Engine'
    });

    // Method 2: Using socket helper method
    await sock.sendCodeBlock(
        targetJid,
        'SELECT id, name, email FROM users WHERE active = 1;',
        undefined, // quoted message
        { language: 'sql', title: 'Active Users Query', footer: 'PostgreSQL' }
    );
}
```

### Tables

Send formatted data tables rendered natively for compatible WhatsApp clients with Markdown table fallbacks.

```javascript
async function sendTableExample(sock, targetJid) {
    // Method 1: Using sock.sendMessage
    await sock.sendMessage(targetJid, {
        table: {
            headers: ['Product', 'Quantity', 'Price'],
            rows: [
                ['Widget A', '10', '$25.00'],
                ['Widget B', '5', '$12.50'],
                ['Widget C', '2', '$99.00']
            ]
        },
        title: 'Order Summary #1042',
        footer: 'Thank you for your business!'
    });

    // Method 2: Using socket helper method
    await sock.sendTable(
        targetJid,
        'Server Status',
        ['Service', 'Port', 'Status'],
        [
            ['HTTP Server', '8080', 'ONLINE'],
            ['Database', '5432', 'ONLINE'],
            ['Redis Cache', '6379', 'IDLE']
        ],
        undefined,
        { headerText: 'Infrastructure Report' }
    );
}
```

### LaTeX Equations

Send mathematical and scientific LaTeX formulas.

```javascript
async function sendLatexExample(sock, targetJid) {
    // Send LaTeX formula
    await sock.sendMessage(targetJid, {
        latex: '\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}',
        caption: 'Gaussian Integral Formula'
    });
}
```

### Unified Rich Response

Send multi-component rich responses (e.g., text + code + table).

```javascript
async function sendRichMessageExample(sock, targetJid) {
    const submessages = [
        {
            messageType: 1, // Text
            text: 'Here is the summary analysis and implementation:'
        },
        {
            messageType: 2, // Code
            codeMetadata: {
                codeSnippet: 'console.log("Analyzing metrics...");',
                codeLanguage: 'javascript',
                codeBlocks: [{ codeContent: 'console.log("Analyzing metrics...");' }]
            }
        }
    ];

    await sock.sendRichMessage(targetJid, submessages, undefined, {
        useMarkdown: true
    });
}
```

### Send Media with Verified Badge

Send image or video messages displaying WhatsApp's official verified badge (✔️) in the forward header.

```javascript
const fs = require('fs');

async function sendVerifiedMedia(sock, targetJid) {
    // 1. Send an image with verified badge
    await sock.sendMessage(targetJid, {
        image: fs.readFileSync('./assets/examples/logo.png'), // or { url: 'https://example.com/photo.jpg' }
        caption: '🛡️ Official Security Bulletin — Verified Identity',
        verifiedMe: true
    });

    // 2. Send a video with verified badge
    await sock.sendMessage(targetJid, {
        video: { url: './assets/examples/demo.mp4' },
        caption: '🎬 Official Product Announcement',
        verifiedMe: true
    });
}
```

#### How It Works:
- **`verifiedMe: true`**: Automatically injects WhatsApp's official system account (`0@s.whatsapp.net`) forward context (`isForwarded: true`, `participant: '0@s.whatsapp.net'`) into the message's `contextInfo`.
- **Synthetic Quoted Fallback**: If no `quoted` message is explicitly provided, it injects a fallback quote originating from `0@s.whatsapp.net` so that WhatsApp client interfaces render the official verified forward banner and checkmark icon.
- **Scope**: Supported on `image` and `video` media messages. Silently ignored on non-media messages.

---

## Interactive Messages & Zenbo Handler

### Native Flow & Interactive Buttons

Send interactive buttons such as URLs, quick replies, and calls.

```javascript
async function sendInteractiveButtons(sock, targetJid) {
    await sock.sendMessage(targetJid, {
        text: 'Please select an option below:',
        footer: 'Customer Support Portal',
        interactiveButtons: [
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Visit Documentation',
                    url: 'https://github.com/innovatorssoft/Baileys'
                })
            },
            {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Contact Agent',
                    id: 'agent_support_101'
                })
            },
            {
                name: 'cta_call',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Call Helpline',
                    phone_number: '+1234567890'
                })
            }
        ]
    });
}
```

### Payment Requests

Send a structured WhatsApp Pay request using `Zenbo`.

```javascript
const { Zenbo } = require('@innovatorssoft/baileys');

async function sendPaymentRequest(sock, targetJid) {
    const zenbo = new Zenbo(sock.waUploadToServer, sock.relayMessage, sock.config, sock);

    const paymentPayload = {
        requestPaymentMessage: {
            amount: 50000, // Amount in millis ($50.00)
            currency: 'USD',
            expiry: Math.floor(Date.now() / 1000) + 86400, // 24 hours
            from: targetJid,
            note: 'Invoice payment for consulting services'
        }
    };

    const paymentContent = await zenbo.handlePayment(paymentPayload);
    await sock.relayMessage(targetJid, paymentContent, {});
}
```

### Interactive Product Display

Display a single product card with image and price information.

```javascript
const { Zenbo } = require('@innovatorssoft/baileys');
const fs = require('fs');

async function sendProductCard(sock, targetJid) {
    const zenbo = new Zenbo(sock.waUploadToServer, sock.relayMessage, sock.config, sock);

    const productPayload = {
        productMessage: {
            title: 'Mechanical Keyboard RGB',
            description: 'Wireless Bluetooth mechanical keyboard with blue switches.',
            body: 'Special Discount - 20% OFF this week only!',
            footer: 'Tech Store',
            thumbnail: fs.readFileSync('./keyboard.jpg'),
            productId: 'prod_keyboard_99',
            retailerId: 'TECH_001',
            url: 'https://example.com/products/keyboard',
            priceAmount1000: 89990, // $89.99
            currencyCode: 'USD'
        }
    };

    const result = await zenbo.handleProduct(productPayload, targetJid);
    await sock.relayMessage(targetJid, result, {});
}
```

### Events & Invitations

Send a calendar event invite directly to a WhatsApp chat.

```javascript
const { Zenbo } = require('@innovatorssoft/baileys');

async function sendCalendarEvent(sock, targetJid) {
    const zenbo = new Zenbo(sock.waUploadToServer, sock.relayMessage, sock.config, sock);

    const eventPayload = {
        eventMessage: {
            name: 'Project Architecture Sync',
            description: 'Bi-weekly technical synchronization meeting.',
            location: {
                degreesLatitude: 37.7749,
                degreesLongitude: -122.4194,
                name: 'Engineering Room 3'
            },
            joinLink: 'https://meet.google.com/abc-defg-hij',
            startTime: Math.floor(Date.now() / 1000) + 3600, // In 1 hour
            endTime: Math.floor(Date.now() / 1000) + 7200,   // In 2 hours
            extraGuestsAllowed: true
        }
    };

    await zenbo.handleEvent(eventPayload, targetJid);
}
```

### WhatsApp Status / Stories Mention

Post to WhatsApp Status/Stories with private or group mentions.

```javascript
const { Zenbo } = require('@innovatorssoft/baileys');

async function postStatusWithMentions(sock, recipientJids) {
    const zenbo = new Zenbo(sock.waUploadToServer, sock.relayMessage, sock.config, sock);

    await zenbo.sendStatusWhatsApp(
        {
            text: 'System upgrade completed successfully! 🚀',
            backgroundColor: '#075E54',
            textColor: '#FFFFFF'
        },
        recipientJids // ['1234567890@s.whatsapp.net', '120363000000000000@g.us']
    );
}
```

---

## Groups Management

### Sub-Group Suggestions

Suggest a new sub-group inside a community parent group, or approve/reject pending suggestions.

```javascript
async function manageSubGroupSuggestions(sock, communityJid) {
    // 1. Create a sub-group suggestion
    await sock.groupCreateSubGroupSuggestion(communityJid, {
        name: 'Backend Engineering',
        description: 'Discussions on APIs, database schemas, and microservices.'
    });

    // 2. Approve or reject suggestions (admin action)
    await sock.groupSubGroupSuggestionsAction(
        communityJid,
        'approve', // 'approve' | 'reject' | 'cancel'
        [{ creator: '1234567890@s.whatsapp.net' }]
    );
}
```

### Linked Group Participants & Joining

Inspect and join linked groups within a community hierarchy.

```javascript
async function inspectAndJoinLinkedGroup(sock, linkedGroupJid, parentCommunityJid) {
    // Get linked participants
    const linkedInfo = await sock.groupGetLinkedParticipants(linkedGroupJid);
    console.log(`Linked participants count: ${linkedInfo.participants.length}`);

    // Join linked group
    await sock.groupJoinLinked(linkedGroupJid, parentCommunityJid);
}
```

### Group Acknowledgment & Bulk Profile Pictures

```javascript
async function groupUtilsExample(sock, parentCommunityJid, targetGroupJid) {
    // Send group action acknowledgment
    await sock.groupAcknowledge(targetGroupJid, 'add', ['1234567890@s.whatsapp.net']);

    // Fetch profile pictures of all sub-groups in a community
    const pictures = await sock.getGroupProfilePictures(parentCommunityJid);
    for (const pic of pictures) {
        console.log(`Group: ${pic.jid}, URL: ${pic.url}`);
    }
}
```

---

## Communities

### Creating a Community & Child Groups

```javascript
async function setupCommunityWorkflow(sock) {
    // 1. Create a parent community
    const community = await sock.communityCreate(
        'Acme Developers Hub',
        'Official engineering and community discussion space.'
    );
    const parentCommunityJid = community.id;
    console.log(`Created Community: ${parentCommunityJid}`);

    // 2. Create a child group attached directly to the community
    const childGroup = await sock.communityCreateGroup(
        'DevOps & Infrastructure',
        ['1234567890@s.whatsapp.net'],
        parentCommunityJid
    );
    console.log(`Created linked child group: ${childGroup.id}`);

    return { parentCommunityJid, childGroupId: childGroup.id };
}
```

### Linking and Unlinking Groups

Link existing standard groups into an established community, or unlink them.

```javascript
async function linkExistingGroup(sock, parentCommunityJid, existingGroupJid) {
    // Link existing group
    await sock.communityLinkGroup(existingGroupJid, parentCommunityJid);
    // await sock.communityUnlinkGroup(existingGroupJid, parentCommunityJid);
    console.log(`Linked ${existingGroupJid} to ${parentCommunityJid}`);

    // Unlink group
    // await sock.communityUnlinkGroup(parentCommunityJid, [existingGroupJid]);
}
```

### Fetching Linked Groups

Retrieve all child groups associated with a parent community.

```javascript
async function listCommunityGroups(sock, parentCommunityJid) {
    const linkedGroups = await sock.communityFetchLinkedGroups(parentCommunityJid);
    console.log(`Community has ${linkedGroups.length} child groups:`);
    for (const group of linkedGroups) {
        console.log(`- ${group.subject || group.jid} (${group.jid})`);
    }
}
```

---

## Chat & Device Management

### Blocking Status & Spam Reporting

```javascript
async function manageBlockAndSpam(sock, userJid) {
    // Check if chat is blocked
    const blockStatus = await sock.getChatBlockingStatus(userJid);
    console.log(`Chat blocked: ${blockStatus.isBlocked}`);

    // Update blocking status
    await sock.updateChatBlockingStatus(userJid, 'block'); // 'block' | 'unblock'

    // Report spam
    await sock.reportSpam(userJid, {
        spamFlow: 'CHAT',
        reason: 'UNWANTED_MESSAGES'
    });
}
```

### Terms of Service & User Disclosures

```javascript
async function handleDisclosures(sock) {
    // Get user disclosures
    const disclosures = await sock.getUserDisclosures();
    console.log('User disclosures:', disclosures);

    // Acknowledge a Terms of Service notice
    await sock.acceptTosNotice('2026_PRIVACY_UPDATE');
}
```

### Push Configuration & Waiting Rooms

```javascript
async function configurePushAndCalls(sock) {
    // Get current push config
    const pushConfig = await sock.getPushConfig();
    console.log('Push config:', pushConfig);

    // Set push config
    await sock.setPushConfig({
        enabled: true,
        endpoint: 'https://push.example.com/notify'
    });

    // Toggle waiting room for a call link
    await sock.toggleCallLinkWaitingRoom('call_link_token_123', true);
}
```

### Bot Profile & User ID Discovery

```javascript
async function discoverBotAndUser(sock) {
    const botJid = '867051314767696@bot';

    // Get Meta AI / Bot profile
    const botProfile = await sock.getBotProfile(botJid);
    console.log(`Bot Name: ${botProfile?.name}, Description: ${botProfile?.description}`);

    // Discover JID by phone number
    const result = await sock.findUserId('+1234567890');
    console.log(`Resolved JID: ${result?.jid}`);
}
```

---

## USync Protocol Queries

The `USyncQuery` fluent builder allows structured querying of user capabilities, text statuses, business profiles, and device lists.

### Fluent Query Builder

```javascript
const {
    USyncQuery,
    USyncBusinessProtocol,
    USyncFeatureProtocol,
    USyncTextStatusProtocol,
    USyncPictureProtocol,
    USyncSidelistProtocol
} = require('@innovatorssoft/baileys');

async function executeSyncQuery(sock, targetJids) {
    // Construct query using the fluent builder
    const query = new USyncQuery()
        .withMode('query')
        .withContext('interactive')
        .withBusinessProtocol()
        .withFeatureProtocol()
        .withTextStatusProtocol()
        .withPictureProtocol();

    for (const jid of targetJids) {
        query.withUser({ id: jid });
    }

    const result = await sock.executeUSyncQuery(query);
    console.log('USync Query Results:', JSON.stringify(result, null, 2));
    return result;
}
```

### Sidelist Protocol

Query or manage contact side-lists with LID-aware addressing.

```javascript
const { USyncQuery, USyncSidelistProtocol } = require('@innovatorssoft/baileys');

async function querySidelist(sock, users) {
    const query = new USyncQuery()
        .withMode('query')
        .withContext('interactive')
        .withSidelistProtocol(true); // useLidAddressing = true

    for (const user of users) {
        query.withUser({ id: user });
    }

    const result = await sock.executeUSyncQuery(query);
    return result?.sideList || result?.list;
}
```

---

## Privacy & Account Security

### Privacy Settings & Disappearing Mode

```javascript
async function configurePrivacy(sock) {
    // Fetch all current privacy settings
    const settings = await sock.fetchPrivacySettings(true);
    console.log('Current privacy settings:', settings);

    // Update privacy preferences
    await sock.updateLastSeenPrivacy('contacts');          // 'all' | 'contacts' | 'contact_blacklist' | 'none'
    await sock.updateOnlinePrivacy('match_last_seen');     // 'all' | 'match_last_seen'
    await sock.updateProfilePicturePrivacy('contacts');    // 'all' | 'contacts' | 'contact_blacklist' | 'none'
    await sock.updateStatusPrivacy('contacts');            // 'all' | 'contacts' | 'contact_blacklist' | 'none'
    await sock.updateReadReceiptsPrivacy('all');           // 'all' | 'none'
    await sock.updateGroupsAddPrivacy('contacts');         // 'all' | 'contacts' | 'contact_blacklist' | 'none'
    await sock.updateCallPrivacy('known');                 // 'all' | 'known'

    // Set default disappearing messages timer (in seconds)
    // 0 = Off, 86400 = 24 hours, 604800 = 7 days, 7776000 = 90 days
    await sock.updateDefaultDisappearingMode(86400);
}
```

### Multi-Account & Trusted Device Management

Manage linked secondary numbers and trusted hardware devices via MEX privacy protocols.

```javascript
async function manageMultiAccountAndDevices(sock) {
    // Add trusted device
    await sock.addTrustedDevice({
        deviceId: 'hardware_device_sec_01',
        deviceName: 'Workstation Mac Pro'
    });

    // List trusted devices
    const devices = await sock.getTrustedDevices();
    console.log('Trusted devices:', devices);

    // Untrust or delete device
    await sock.untrustTrustedDevice('hardware_device_sec_01', 'USER_INITIATED');
    await sock.deleteTrustedDevice('hardware_device_sec_01');

    // Link secondary phone number
    await sock.addMultiAccountLink('+1987654321');
}
```

---

## Registration & Authentication

Public registration helpers for 2FA, passkeys, and account recovery.

```javascript
async function registrationSecurity(sock) {
    // Setup Two-Factor Authentication (2FA PIN and recovery email)
    await sock.setupTwoFactorAuth('123456', 'admin@example.com');

    // Register a WebAuthn / Passkey credential
    await sock.registerPasskey({
        credentialId: 'cred_fido2_key_xyz',
        publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...'
    });

    // Verify age (for compliance requirements)
    await sock.verifyAge(1995, 6, 15);

    // Account recovery via one-time recovery code
    await sock.recoverAccount('+1234567890', 'REC-982-104');
}
```

---

## Interoperability (Interop)

The `makeInteropSocket` layer enables EU Digital Markets Act (DMA) cross-platform interoperability features.

```javascript
async function interopExamples(sock) {
    // 1. Check reachability for third-party external users
    const reachability = await sock.getReachability([
        { externalId: 'user_matrix_1001', integratorId: 1 }
    ]);
    console.log('Reachability result:', reachability);

    // 2. Configure reachability settings
    await sock.setReachabilitySettings(
        [{ externalId: 'user_matrix_1001', integratorId: 1 }],
        true // enabled
    );

    // 3. Manage interop blocklist
    await sock.updateInteropBlockStatus('external_user_jid@interop', 'block');
    const blocklist = await sock.getInteropBlocklist();
    console.log('Interop blocklist:', blocklist);
}
```

---

## Managed Accounts & Family Controls

Control settings for supervised/child accounts and financial OTP verification.

```javascript
async function managedAccountExamples(sock) {
    // Create / register a managed child account
    await sock.createManagedAccount({
        accountName: 'Junior Account',
        accountType: 'CHILD',
        permissions: ['TEXT_ONLY']
    });

    // Update parental controls
    await sock.updateFamilyControls('1234567890@s.whatsapp.net', {
        allowMediaDownloads: false,
        timeLimitMinutes: 120
    });

    // Verify financial UPI OTP
    await sock.verifyUpiOtp('TXN_9918231', '654321');
}
```

---

## AI Groups

AI-powered group chats with custom agent roles and ephemeral history sharing.

```javascript
const { makeAIGroupsSocket } = require('@innovatorssoft/baileys');

async function createAIGroup(sock) {
    // makeAIGroupsSocket wraps an existing socket or creates a new one
    const aiSock = makeAIGroupsSocket(sock);

    // Create an AI group
    const group = await aiSock.aiGroupCreate(
        'AI Research Hub',
        ['1234567890@s.whatsapp.net'],
        {
            ephemeralExpiration: 86400,
            memberAddMode: 'all_member_add',
            memberShareGroupHistoryMode: 'all_member_share'
        }
    );

    console.log(`Created AI Group: ${group.id}`);

    // Fetch AI group metadata
    const metadata = await aiSock.aiGroupMetadata(group.id);
    console.log('AI Group Metadata:', metadata);
}
```

---

## Meta AI & Workflow Replay

### Planning & Reasoning Steps

Show sequential AI reasoning progress (e.g., "Analyzing query", "Searching docs", "Synthesizing answer") in real time before delivering the final response.

```javascript
const {
    replayPlanning,
    buildReasoningSteps,
    buildSearchSteps,
    mixedSteps
} = require('@innovatorssoft/baileys');

async function showAiThinkingAndReply(sock, targetJid) {
    // Define steps
    const steps = mixedSteps([
        { title: 'Parsing user prompt and intent', type: 'reasoning' },
        { title: 'Querying internal knowledge base', type: 'search' },
        { title: 'Drafting structured response', type: 'reasoning' }
    ]);

    // Animate the progress indicators, then deliver final content
    await replayPlanning(
        sock,
        targetJid,
        steps,
        { text: 'Here is the detailed solution to your query...' },
        {
            description: 'Meta AI Assistant',
            stepDelayMs: 1000,
            finalPauseMs: 500,
            placeholderText: 'Processing...'
        }
    );
}
```

### Automated Welcome Flow

Attach a Meta Business-style interactive FAQ welcome flow that automatically responds to new conversations.

```javascript
const { createWelcomeFlow } = require('@innovatorssoft/baileys');

function setupAutoWelcome(sock) {
    createWelcomeFlow(sock, {
        greetingText: 'Welcome to Innovators Soft! How can we assist you today?',
        footerText: 'Automated Assistance Bot',
        buttonText: 'View Options',
        typingDelayMs: 1500,
        ignoreGroups: true,
        ignoreBroadcast: true,
        sections: [
            {
                title: 'Frequently Asked Questions',
                rows: [
                    { title: 'Pricing & Plans', rowId: 'faq_pricing', description: 'Explore our subscription plans' },
                    { title: 'API Documentation', rowId: 'faq_docs', description: 'Read developer references' },
                    { title: 'Talk to Human Agent', rowId: 'faq_human', description: 'Connect with support staff' }
                ]
            }
        ],
        onFaqReply: async (jid, faqId, msg) => {
            if (faqId === 'faq_pricing') {
                await sock.sendMessage(jid, { text: 'Our plans start at $19/month. Visit https://example.com/pricing' });
            } else if (faqId === 'faq_docs') {
                await sock.sendMessage(jid, { text: 'API Docs: https://github.com/innovatorssoft/Baileys' });
            }
        }
    });
}
```

---

## Message Inspection Utilities

Inspect message types, scheduled messages, comments, reactions, and payment data.

```javascript
const {
    isScheduledMessage,
    getScheduledMessageTime,
    getMessagePaymentInfo,
    getMessageCommentMetadata,
    getMessageAddOns,
    getPollCorrectAnswer,
    getSenderLid
} = require('@innovatorssoft/baileys');

function analyzeIncomingMessage(msg) {
    // 1. Check if message is scheduled
    if (isScheduledMessage(msg.message)) {
        const scheduledTime = getScheduledMessageTime(msg.message);
        console.log(`Message is scheduled for: ${new Date(scheduledTime * 1000)}`);
    }

    // 2. Extract payment information
    const payment = getMessagePaymentInfo(msg.message);
    if (payment) {
        console.log(`Payment: ${payment.currency} ${payment.amount1000 / 1000}`);
    }

    // 3. Extract comments/threads metadata
    const commentMeta = getMessageCommentMetadata(msg.message);
    if (commentMeta) {
        console.log(`Parent comment stanza ID: ${commentMeta.parentStanzaId}`);
    }

    // 4. Extract message add-ons (reactions, poll votes, pins)
    const addOns = getMessageAddOns(msg.message);
    console.log('Message Add-ons:', addOns);

    // 5. Get LID of the sender if available
    const senderLid = getSenderLid(msg);
    if (senderLid) {
        console.log(`Sender LID: ${senderLid}`);
    }
}
```

---

## JID & Identification Utilities

```javascript
const {
    isHostedPnUser,
    isHostedLidUser,
    isLidUser,
    isPnUser,
    jidNormalizedUser,
    toJid
} = require('@innovatorssoft/baileys');

function checkJidTypes(jid) {
    console.log(`Normalized JID: ${jidNormalizedUser(jid)}`);
    console.log(`Is Phone Number (PN): ${isPnUser(jid)}`);
    console.log(`Is LID: ${isLidUser(jid)}`);
    console.log(`Is Hosted PN: ${isHostedPnUser(jid)}`);
    console.log(`Is Hosted LID: ${isHostedLidUser(jid)}`);

    // Convert loose string to standard JID
    const userJid = toJid('+1 (234) 567-8900');
    console.log(`Standardized: ${userJid}`); // 1234567890@s.whatsapp.net
}
```

---

## Advanced & Protocol-Level Utilities

> [!WARNING]
> The following utilities interact with low-level protocol structures and are intended for advanced integrations.

### Offline Node Processor

Queue and process incoming offline nodes in batches without blocking the main socket loop.

```javascript
const { makeOfflineNodeProcessor } = require('@innovatorssoft/baileys');

const nodeProcessors = {
    message: async (node) => {
        console.log('Processing queued offline message node:', node.attrs.id);
    },
    receipt: async (node) => {
        console.log('Processing queued offline receipt node:', node.attrs.id);
    }
};

const offlineQueue = makeOfflineNodeProcessor(nodeProcessors, {
    isWsOpen: () => true,
    logger: console
}, 10); // Batch size: 10

// Enqueue raw binary node for background handling
offlineQueue.enqueue('message', { tag: 'message', attrs: { id: 'OFFLINE_MSG_01' } });
```

### Trusted Contact (TC) Tokens

Inspect and store trusted contact tokens for AB prop compliance.

```javascript
const {
    isTcTokenExpired,
    shouldSendNewTcToken,
    resolveTcTokenJid,
    storeTcTokensFromIqResult
} = require('@innovatorssoft/baileys');

async function handleTcTokens(iqResult, authKeys) {
    await storeTcTokensFromIqResult({
        result: iqResult,
        fallbackJid: '1234567890@s.whatsapp.net',
        keys: authKeys,
        getLIDForPN: async (pn) => `${pn}@lid`
    });
}
```

### Contact Sync Actions

Process incoming app state contact mutation syncs.

```javascript
const { processContactAction, emitSyncActionResults } = require('@innovatorssoft/baileys');

function handleSyncContactMutation(ev, action, contactId) {
    const results = processContactAction(action, contactId, console);
    emitSyncActionResults(ev, results);
}
```

### Group History Decompression

Decompress and parse group history sync payloads.

```javascript
const { decodeGroupHistory, processGroupHistory } = require('@innovatorssoft/baileys');

function inspectGroupHistorySync(compressedBuffer) {
    const decoded = decodeGroupHistory(compressedBuffer, {
        inflate: true,
        withMessageBytes: true
    });
    const history = processGroupHistory(decoded);
    console.log(`Processed ${history.messages.length} messages from group history.`);
}
```

### GraphQL & MEX Execution

Execute direct WWW, Facebook, or WAMO GraphQL queries over WebSocket.

```javascript
async function executeGraphQLQuery(sock) {
    // Execute authenticated WWW GraphQL query
    const result = await sock.executeWWWGraphQL(
        '1234567890123456', // Query ID
        { user_id: '1234567890' }
    );
    console.log('GraphQL Result:', result);
}
```

---

## TypeScript Workflows

Here is a full TypeScript example demonstrating typed socket creation, SQLite auth, and rich messaging.

```typescript
import makeWASocket, {
    useSqliteAuthState,
    DisconnectReason,
    WASocket,
    AnyMessageContent,
    proto,
    USyncQuery
} from '@innovatorssoft/baileys';
import pino from 'pino';

async function runTypeScriptBot(): Promise<WASocket> {
    const { state, saveCreds } = await useSqliteAuthState({
        dbPath: './typed_sessions.sqlite'
    });

    const sock: WASocket = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
            if (statusCode !== DisconnectReason.loggedOut) {
                runTypeScriptBot();
            }
        } else if (connection === 'open') {
            console.log('TypeScript Bot connected successfully!');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
            if (!msg.message || msg.key.fromMe) continue;

            const targetJid = msg.key.remoteJid!;
            const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

            if (text === '!stats') {
                const content: AnyMessageContent = {
                    table: {
                        headers: ['Metric', 'Value'],
                        rows: [
                            ['Node.js Version', process.version],
                            ['Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`],
                            ['Uptime', `${Math.round(process.uptime())}s`]
                        ]
                    },
                    title: 'System Diagnostics',
                    footer: 'Baileys TS Engine'
                };

                await sock.sendMessage(targetJid, content, { quoted: msg });
            }
        }
    });

    return sock;
}

runTypeScriptBot().catch(console.error);
```

---

## Production-Ready Error Handling & Reconnection

A robust, production-grade template with exponential backoff reconnection, graceful shutdown, and message queuing.

```javascript
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require('@innovatorssoft/baileys');
const pino = require('pino');

class WhatsAppClient {
    constructor(sessionPath = './prod_auth_session') {
        this.sessionPath = sessionPath;
        this.sock = null;
        this.retryCount = 0;
        this.maxRetries = 10;
        this.isShuttingDown = false;
        this.logger = pino({ level: 'info' });
    }

    async start() {
        try {
            const { state, saveCreds } = await useMultiFileAuthState(this.sessionPath);
            const { version } = await fetchLatestBaileysVersion();

            this.sock = makeWASocket({
                version,
                logger: this.logger,
                auth: state,
                printQRInTerminal: true,
                connectTimeoutMs: 60_000,
                defaultQueryTimeoutMs: 60_000,
                keepAliveIntervalMs: 30_000
            });

            this.sock.ev.on('creds.update', saveCreds);

            this.sock.ev.on('connection.update', (update) => {
                const { connection, lastDisconnect } = update;

                if (connection === 'open') {
                    this.logger.info('WhatsApp connection established successfully.');
                    this.retryCount = 0;
                } else if (connection === 'close') {
                    this.handleDisconnect(lastDisconnect);
                }
            });

            this.setupProcessHandlers();
        } catch (error) {
            this.logger.error({ error }, 'Failed to initialize WhatsApp client.');
            this.scheduleReconnect();
        }
    }

    handleDisconnect(lastDisconnect) {
        if (this.isShuttingDown) return;

        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const reason = lastDisconnect?.error?.message || 'Unknown';
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        this.logger.warn({ statusCode, reason }, 'Connection lost.');

        if (statusCode === DisconnectReason.loggedOut) {
            this.logger.fatal('Device was logged out from WhatsApp. Clear session directory and scan QR again.');
            return;
        }

        if (shouldReconnect) {
            this.scheduleReconnect();
        }
    }

    scheduleReconnect() {
        if (this.retryCount >= this.maxRetries) {
            this.logger.fatal('Max reconnection retries exceeded. Exiting process.');
            process.exit(1);
        }

        this.retryCount++;
        const backoffMs = Math.min(1000 * Math.pow(2, this.retryCount), 60_000);
        this.logger.info(`Reconnecting in ${backoffMs / 1000}s (Attempt ${this.retryCount}/${this.maxRetries})...`);

        setTimeout(() => this.start(), backoffMs);
    }

    setupProcessHandlers() {
        const cleanup = async () => {
            if (this.isShuttingDown) return;
            this.isShuttingDown = true;
            this.logger.info('Gracefully shutting down WhatsApp client...');
            if (this.sock) {
                this.sock.end(undefined);
            }
            process.exit(0);
        };

        process.once('SIGINT', cleanup);
        process.once('SIGTERM', cleanup);
    }
}

const client = new WhatsAppClient();
client.start();
```
