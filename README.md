<div align="center">
  <img src="https://raw.githubusercontent.com/innovatorssoft/Baileys/main/assets/media/logo.png" width="150" height="150" />

  # INNOVATORS SOFT
  ## Baileys — WhatsApp Web API
  **TypeScript / JavaScript WhatsApp Web API — Modified by [Innovators Soft](https://innovatorssoftpk.com/)**
</div>

<p align="center">
	<a href="https://www.npmjs.com/package/@innovatorssoft/baileys"><img src="https://img.shields.io/npm/v/@innovatorssoft/baileys?style=for-the-badge&logo=npm" alt="npm version" /></a>
	<a href="https://www.npmjs.com/package/@innovatorssoft/baileys"><img src="https://img.shields.io/npm/dt/@innovatorssoft/baileys?style=for-the-badge&logo=npm" alt="npm downloads" /></a>
	<a href="https://github.com/innovatorssoft/Baileys/stargazers"><img src="https://img.shields.io/github/stars/innovatorssoft/Baileys?style=for-the-badge&logo=github" alt="github stars" /></a>
	<a href="https://github.com/innovatorssoft/Baileys/network/members"><img src="https://img.shields.io/github/forks/innovatorssoft/Baileys?style=for-the-badge&logo=github" alt="github forks" /></a>
	<a href="https://github.com/innovatorssoft/Baileys/blob/main/LICENSE"><img src="https://img.shields.io/github/license/innovatorssoft/Baileys?style=for-the-badge&logo=github" alt="license" /></a>
	<a href="https://deepwiki.com/innovatorssoft/Baileys"><img src="https://deepwiki.com/badge.svg" alt="Ask Deep-Wiki"></a>
</p>

---
## ⚠️ Important Notice

This library was originally a project for **CS-2362 at Ashoka University** and is in no way affiliated with or endorsed by WhatsApp. Use at your own discretion. Do not spam people with this. We discourage any stalkerware, bulk or automated messaging usage.

**Liability & License:** Baileys and its maintainers cannot be held liable for misuse of this application, as stated in the [MIT license](https://github.com/WhiskeySockets/Baileys/blob/master/LICENSE). The maintainers of Baileys do not in any way condone the use of this application in practices that violate the Terms of Service of WhatsApp. Use this application fairly — as it is intended to be used.

> ## **[IMPORTANT]**
> This is the only official repository and is maintained by the community.
> # **[Join the Discord](https://discord.gg/G3RfM6FDHS) and be a part of community**
> 
> 💡 **Looking for practical, copy-paste-ready recipes? Check out the [Developer Cookbook](COOKBOOK.md).**

---

## 🚀 Quick Start

### Install

```bash
npm install @innovatorssoft/baileys
# or
yarn add @innovatorssoft/baileys
```

### Minimal Working Example

Connect, listen for messages, and auto-reply — in under 15 lines:

```ts
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@innovatorssoft/baileys'
import { Boom } from '@hapi/boom'

async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState('auth')
  const sock = makeWASocket({ auth: state, printQRInTerminal: true })
  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
      if (shouldReconnect) connect()
    } else if (connection === 'open') console.log('✅ Connected!')
  })
  sock.ev.on('messages.upsert', ({ messages }) => {
    for (const m of messages) !m.key.fromMe && sock.sendMessage(m.key.remoteJid!, { text: 'Hello!' })
  })
  sock.ev.on('creds.update', saveCreds)
}
connect()
```

> 💡 Scan the QR code printed in your terminal with WhatsApp on your phone to log in.

---

## 📋 Real Examples (Copy–Paste Ready)

### 1️⃣ Basic sendMessage

```ts
await sock.sendMessage(jid, { text: 'Hello World!' })
```

---

### 2️⃣ Auto-Reply with Typing Simulation

Keyword/pattern-based automatic replies with a human-like typing indicator:

```ts
import { createAutoReply } from '@innovatorssoft/baileys'

const autoReply = createAutoReply(
  (jid, content, opts) => sock.sendMessage(jid, content, opts),
  (jid, presence) => sock.sendPresenceUpdate(presence, jid),
  { simulateTyping: true, typingDuration: 1500 }
)

autoReply.addRule({
  keywords: ['hi', 'hello', 'hey'],
  response: { text: 'Hello! How can I help? 👋' },
  quoted: true
})

autoReply.addRule({
  pattern: /^!weather (.+)$/i,
  response: async (msg, match) => ({ text: `Weather for *${match[1]}*: ☀️ 28°C` })
})

sock.ev.on('messages.upsert', async ({ messages }) => {
  for (const msg of messages) {
    if (!msg.key.fromMe) await autoReply.processMessage(msg)
  }
})
```

---

### 3️⃣ Message Scheduler

Schedule messages to be sent at a specific time or after a delay:

```ts
import { createMessageScheduler } from '@innovatorssoft/baileys'

const scheduler = createMessageScheduler(
  (jid, content) => sock.sendMessage(jid, content),
  { onSent: (s) => console.log('✅ Sent', s.id), onFailed: (s, e) => console.error('❌', e.message) }
)

// Send at a specific time
scheduler.schedule('6281234567890@s.whatsapp.net', { text: 'Happy Birthday! 🎂' }, new Date('2026-12-25T09:00:00'))

// Send after a delay
scheduler.scheduleDelay(jid, { text: 'Reminder ⏰' }, 30 * 60 * 1000)
```

---

### 4️⃣ Rich AI–Style Response

Send Meta AI–style rich responses with code blocks, tables, LaTeX, and more:

```ts
// Text + syntax-highlighted code block
await sock.sendMessage(jid, {
  richResponse: {
    text: 'Here is a JavaScript example:',
    code: `const greet = (name) => console.log('Hello, ' + name)`,
    language: 'javascript'
  }
})

// Formatted table
await sock.sendTable(jid, 'Price List', ['Item', 'Qty', 'Price'], [
  ['Apple', '3', '$1.50'],
  ['Banana', '6', '$0.90']
])

// Syntax-highlighted code block
await sock.sendCodeBlock(jid, 'console.log("Hello World")', null, { title: 'Example', language: 'javascript' })

// LaTeX expression as image
await sock.sendLatexImage(jid, null, 'E=mc^2')

// Markdown formatted natively
await sock.sendMarkdown(jid, '# H1\n## H2\n==Highlighted==\n_Italics_ and **Bold**!')
```

---

## ✨ Core Features

### Automation
| Feature | Description |
|---------|-------------|
| 🤖 **Auto-Reply System** | Keyword/regex pattern matching with typing simulation, cooldowns, JID allowlists |
| ⏰ **Message Scheduler** | Schedule messages at specific times or delays — no external dependencies |
| 🛡️ **Anti-Delete System** | Store & recover messages deleted by the sender |

### Messaging
| Feature | Description |
|---------|-------------|
| 💬 **All Message Types** | Text, image, video, audio, gif, document, location, contacts, polls, stickers |
| 🎨 **Rich AI Responses** | sendTable, sendList, sendCodeBlock, sendLatexImage, sendMarkdown, sendRichMessage |
| 🔘 **Interactive Messages** | Buttons, lists, URL CTAs, Copy CTAs, carousels, native flows |
| 🧩 **Message Templates** | Variable interpolation with built-in invoice/greeting/support templates |
| 📦 **Shop & Collection** | Send product catalogs, collection messages, payment requests |

### Interactive UI
| Feature | Description |
|---------|-------------|
| 🔄 **Carousel & Native Flow** | Multi-card carousels with interactive buttons and offer codes |
| 📋 **Buttons + Sections** | Mixed buttons & section lists with images/video |
| 💳 **PIX / PAY Buttons** | Brazil PIX static code & global payment interactive buttons |
| 🏪 **Product Lists & Cards** | Catalog products, card-based layouts |

### Utilities
| Feature | Description |
|---------|-------------|
| 🔍 **Message Search** | Fast client-side indexing with relevance scoring |
| 📖 **Read Receipt Controller** | Programmatic blue-tick management with delays & JID exclusions |
| ⌨️ **Typing Indicator** | Standalone typing simulation without auto-reply |
| 🆔 **JID Plotting & LID** | Convert between phone numbers, LIDs, and JIDs |
| 👤 **vCard Generator** | Quick contact cards with multi-field support |
| 📸 **Panoramic Profile Pic** | Full-width banner profile pictures without square cropping |
| 📡 **StatusHelper** | Rich text/image/video/audio status posting |
| 🗄️ **SQLite Auth State** | High-performance SQLite-based session persistence via `useSqliteAuthState` |
| 🔎 **Message Inspection** | `isScheduledMessage`, `getScheduledMessageTime`, `getPollCorrectAnswer`, `getSenderLid`, and more |

### 👥 Groups & Social
| Feature | Description |
|---------|-------------|
| 👥 **Full Group Management** | Create, invite, promote, demote, settings, labels |
| 🔒 **Privacy Controls** | Last seen, online, profile pic, read receipts, group add |
| 📢 **Broadcast & Stories** | Multi-recipient status posting with backgrounds & fonts |
| 🏘️ **Communities** | Create groups within communities, link/unlink groups, fetch linked groups |

### 🔄 Advanced Protocols & Sync
| Feature | Description |
|---------|-------------|
| 🔗 **USync Protocols** | Business, Feature, Picture, Sidelist, TextStatus sync protocols with fluent query builder |
| 🌐 **Interop (EU DMA)** | Third-party messaging integrations (BirdyChat/Haiket) |
| 🔑 **Privacy & Registration MEX** | Passkeys, 2FA, trusted devices, account login/logout via MEX queries |
| 📊 **GraphQL Socket** | Execute WWW, Facebook, and Wamo GraphQL queries over HTTPS |
| 🤖 **AI Groups** | Create and manage AI-powered group chats |
| 🧠 **Meta AI Compositing** | Bot planning/reasoning step indicators, live replay feeds |

---

### Feature Comparison: Original Baileys vs This Fork

| Feature | Original Baileys | This Fork |
|---------|:----------------:|:---------:|
| WhatsApp Multi-Device API | ✅ | ✅ |
| QR Code / Pairing Code Auth | ✅ | ✅ |
| Session Management | ✅ | ✅ |
| Event Handling | ✅ | ✅ |
| Sending Messages (text, media) | ✅ | ✅ |
| Group Management | ✅ | ✅ |
| Privacy & Profile | ✅ | ✅ |
| **Auto-Reply System** | ❌ | ✅ |
| **Message Scheduler** | ❌ | ✅ |
| **Anti-Delete System** | ❌ | ✅ |
| **Rich AI Responses** (tables, code, LaTeX) | ❌ | ✅ |
| **Interactive Message Generators** | ❌ | ✅ |
| **Carousel & Native Flow** | ❌ | ✅ |
| **Message Templates** (variable interpolation) | ❌ | ✅ |
| **vCard Contact Builder** | ❌ | ✅ |
| **Message Search** (client-side indexing) | ❌ | ✅ |
| **Read Receipt Controller** | ❌ | ✅ |
| **Typing Indicator Utility** | ❌ | ✅ |
| **JID Plotting & LID Support** | ❌ | ✅ |
| **Panoramic Profile Picture** | ❌ | ✅ |
| **StatusHelper** (rich text statuses) | ❌ | ✅ |
| **PIX / PAY Interactive Buttons** | ❌ | ✅ |
| **Shop & Collection Messages** | ❌ | ✅ |
| **Group Status & interactiveAsTemplate** | ❌ | ✅ |
| **SQLite Auth State** | ❌ | ✅ |
| **USync Protocols** (Business/Feature/Picture/Sidelist/TextStatus) | ❌ | ✅ |
| **Zenbo Interactive Handler** (albums/events/polls/payments) | ❌ | ✅ |
| **Privacy/Registration/Interop MEX Sockets** | ❌ | ✅ |
| **GraphQL Query Socket** | ❌ | ✅ |
| **AI Groups** | ❌ | ✅ |
| **Meta AI Compositing & Reasoning Replay** | ❌ | ✅ |
| **Message Inspection Helpers** | ❌ | ✅ |
| **Community Group Management** | ❌ | ✅ |

---

## 🔗 Links & Community

- [📖 Baileys Guide](https://innovatorssoftpk.com/)
- [💬 Discord Community](https://discord.gg/G3RfM6FDHS)
- [🐙 GitHub Repository](https://github.com/innovatorssoft/Baileys)
- [📦 npm Package](https://www.npmjs.com/package/@innovatorssoft/baileys)
- [📚 Original Guide](https://guide.whiskeysockets.io/)
- [📘 Deep Wiki](https://deepwiki.com/innovatorssoft/Baileys)
---

<details>
<summary>📚 Full Documentation</summary>
 
## Install

Use the stable version:
```
yarn add @innovatorssoft/baileys
```

Use the edge version (no guarantee of stability, but latest fixes + features)
```
yarn add github:innovatorssoft/baileys
```

Then import your code using:
```ts 
import makeWASocket from '@innovatorssoft/baileys'
```

# Index

| Section | Topics |
| :--- | :--- |
| 🔌 **[Connecting Account](#connecting-account)** | [QR Code](#starting-socket-with-qr-code) · [Pairing Code](#starting-socket-with-pairing-code) · [Full History](#receive-full-history) |
| ⚙️ **[Important Notes](#important-notes-about-socket-config)** | [Caching Group Metadata](#caching-group-metadata-recommended) · [Retry System & Poll Votes](#improve-retry-system--decrypt-poll-votes) · [Notifications](#receive-notifications-in-whatsapp-app) |
| 💾 **[Saving & Restoring Sessions](#saving--restoring-sessions)** | [Multi-File Auth](#saving--restoring-sessions) · [Mongo Auth](#for-example-if-you-use-usesinglefileauthstate-and-usemongofileauthstate) · [SQLite Auth](#sqlite-auth-state) |
| ⚡ **[Handling Events](#handling-events)** | [Auto-Reply System](#auto-reply-system) · [Example to Start](#example-to-start) · [Decrypt Poll Votes](#decrypt-poll-votes) · [Summary of Events](#summary-of-events-on-first-connection) |
| 🗄️ **[Implementing a Data Store](#implementing-a-data-store)** | — |
| 🆔 **[WhatsApp IDs Explain](#whatsapp-ids-explain)** | — |
| 🛠️ **[Utility Functions](#utility-functions)** | [Message Scheduler](#message-scheduler) · [JID Helpers](#additional-jid-helpers) · [Message Inspection](#message-inspection-helpers) |
| 💬 **[Sending Messages](#sending-messages)** | **Basic Types:**<br>[Text](#text-message) · [Templates](#message-templates) · [Quote](#quote-message-works-with-all-types) · [Mention](#mention-user-works-with-most-types) · [Forward](#forward-messages) · [Location](#location-message) · [Live Location](#live-location-message) · [Contact](#contact-message) · [vCard](#vcard--contact-cards) · [Reaction](#reaction-message) · [Pin](#pin-message) · [Keep](#keep-message) · [Poll](#poll-message) · [Poll Result](#poll-result-message) · [Call](#call-message) · [Event](#event-message) · [Order](#order-message) · [Product](#product-message) · [Payment](#payment-message) · [Decrypt Event](#decrypt-event-response) · [Payment Invite](#payment-invite-message) · [Admin Invite](#invite-admin-message) · [Group Invite](#group-invite-message) · [Sticker Pack](#sticker-pack-message)<br><br>**Rich AI Responses:**<br>[Rich Response](#rich-response-message) · [sendTable](#sendtable) · [sendList](#sendlist) · [sendCodeBlock](#sendcodeblock) · [sendLatexImage](#sendlateximage) · [sendLatexInlineImage](#sendlatexinlineimage) · [sendMarkdown](#sendmarkdown) · [sendRichMessage](#sendrichmessage) · [captureUnifiedResponse](#captureunifiedresponse--sendunifiedresponse)<br><br>**Interactive & Buttons:**<br>[Share Phone](#share-phone-number-message) · [Request Phone](#request-phone-number-message) · [Button Reply](#buttons-reply-message) · [Buttons](#buttons-message) · [Interactive](#interactive-messages) · [Buttons List](#buttons-list-message) · [Product List](#buttons-product-list-message) · [Cards](#buttons-cards-message) · [Template](#buttons-template-message) · [Interactive Msg](#buttons-interactive-message) · [PIX](#buttons-interactive-message-pix) · [PAY](#buttons-interactive-message-PAY)<br><br>**Other:**<br>[Status Mentions](#status-mentions-message) · [Shop](#shop-message) · [Collection](#collection-message) · [AI Icon](#ai-icon-feature) · [Link Preview](#sending-messages-with-link-previews) |
| 🖼️ **[Media Messages](#media-messages)** | [GIF](#gif-message) · [Video](#video-message) · [Audio](#audio-message) · [Image](#image-message) · [HD Image](#hd-image-message) · [HD Video](#hd-video-message) · [Album](#album-message) · [PTV](#ptv-video-message) · [ViewOnce](#view-once-message) |
| ✏️ **[Modify Messages](#modify-messages)** | [Delete](#deleting-messages-for-everyone) · [Edit](#editing-messages) |
| 📥 **[Manipulating Media](#manipulating-media-messages)** | [Thumbnail](#thumbnail-in-media-messages) · [Download](#downloading-media-messages) · [Re-upload](#re-upload-media-message-to-whatsapp) |
| 📞 **[Initiate Voice Call](#initiate-voice-call)** | — |
| 🚫 **[Reject Call](#reject-call)** | — |
| ⌨️ **[Send States in Chat](#send-states-in-chat)** | [Reading Messages](#reading-messages) · [Update Presence](#update-presence) · [Typing Indicator](#typing-indicator) · [Read Receipt Control](#read-receipt-control) |
| 📁 **[Modifying Chats](#modifying-chats)** | [Archive](#archive-a-chat) · [Mute/Unmute](#muteunmute-a-chat) · [Read/Unread](#mark-a-chat-readunread) · [Delete for Me](#delete-a-message-for-me) · [Delete Chat](#delete-a-chat) · [Pin/Unpin](#pin-a-chat) · [Star/Unstar](#starunstar-a-message) · [Disappearing](#disappearing-messages) · [Clear](#clear-messages) |
| 🔍 **[User Queries](#user-querys)** | [Check ID](#check-if-id-exists-in-whatsapp) · [Chat History](#query-chat-history-groups-too) · [Fetch Status](#fetch-status) · [Profile Picture](#fetch-profile-picture-groups-too) · [Business Profile](#fetch-bussines-profile-such-as-description-or-category) · [Presence](#fetch-someones-presence-if-theyre-typing-or-online) · [Message Search](#message-search) |
| 👤 **[Change Profile](#change-profile)** | [Status](#change-profile-status) · [Name](#change-profile-name) · [Display Picture](#change-display-picture-groups-too) · [Panoramic](#panoramic-wide-profile-picture) · [Remove Picture](#remove-display-picture-groups-too) |
| 👥 **[Groups](#groups)** | [Create](#create-a-group) · [Add/Remove](#addremove-or-demotepromote) · [Subject](#change-subject-name) · [Description](#change-description) · [Settings](#change-settings) · [Leave](#leave-a-group) · [Invite Code](#get-invite-code) · [Revoke](#revoke-invite-code) · [Join Code](#join-using-invitation-code) · [Info by Code](#get-group-info-by-invite-code) · [Metadata](#query-metadata-participants-name-description) · [Join V4](#join-using-groupinvitemessage) · [Request Join](#get-request-join-list) · [Approve/Reject](#approvereject-request-join) · [All Groups](#get-all-participating-groups-metadata) · [Ephemeral](#toggle-ephemeral) · [Add Mode](#change-add-mode) · [Member Label](#update-member-label) · [Acknowledge](#group-acknowledge) · [Linked Participants](#get-linked-participants) · [Join Linked](#join-a-linked-group) · [Batch Profile Pics](#get-group-profile-pictures-batch) · [Sub-Group Suggestions](#sub-group-suggestions) |
| 🏘️ **[Communities](#communities)** | [Create Group in Community](#create-a-group-within-a-community) · [Link/Unlink](#linkunlink-groups) · [Fetch Linked](#fetch-linked-groups) |
| 🔄 **[USync Protocols](#usync-protocols)** | Business · Feature · Picture · Sidelist · TextStatus |
| 🔧 **[Advanced APIs](#advanced-apis)** | [Privacy MEX](#privacy-socket-mex) · [Registration MEX](#registration-socket-mex) · [Interop DMA](#interop-socket-eu-dma) · [GraphQL](#graphql-socket) · [AI Groups](#ai-groups) · [Bot Management](#bot-management) · [Zenbo Handler](#zenbo-interactive-handler) · [Meta AI](#meta-ai-compositing--planning-experimental) |
| 🔒 **[Privacy](#privacy)** | [Block/Unblock](#blockunblock-user) · [Settings](#get-privacy-settings) · [BlockList](#get-blocklist) · [LastSeen](#update-lastseen-privacy) · [Online](#update-online-privacy) · [Profile Pic](#update-profile-picture-privacy) · [Status](#update-status-privacy) · [Read Receipts](#update-read-receipts-privacy) · [Groups Add](#update-groups-add-privacy) · [Disappearing Mode](#update-default-disappearing-mode) |
| 📢 **[Broadcast & Stories](#broadcast-lists--stories)** | [Send](#send-broadcast--stories) · [Query List](#query-a-broadcast-lists-recipients--name) · [Story Posting](#status--story-posting) |
| 💻 **[Custom Functionality](#writing-custom-functionality)** | [Debug Logs](#enabling-debug-level-in-baileys-logs) · [How WA Communicates](#how-whatsapp-communicate-with-us) · [Websocket Callbacks](#register-a-callback-for-websocket-events) |

## 🔌 Connecting Account

WhatsApp provides a multi-device API that allows Baileys to be authenticated as a second WhatsApp client by scanning a **QR code** or **Pairing Code** with WhatsApp on your phone.

### Starting socket with **QR-CODE**

```ts
import makeWASocket from '@innovatorssoft/baileys'

const sock = makeWASocket({
    // can provide additional config here
    browser: Browsers.ubuntu('My App'),
    printQRInTerminal: true
})
```

If the connection is successful, you will see a QR code printed on your terminal screen, scan it with WhatsApp on your phone and you'll be logged in!

### Starting socket with **Pairing Code**


> [!IMPORTANT]
> Pairing Code isn't Mobile API, it's a method to connect Whatsapp Web without QR-CODE, you can connect only with one device, see [here](https://faq.whatsapp.com/1324084875126592/?cms_platform=web)

The phone number can't have `+` or `()` or `-`, only numbers, you must provide country code

```ts
import makeWASocket from '@innovatorssoft/baileys'

const sock = makeWASocket({
    // can provide additional config here
    printQRInTerminal: false //need to be false
})

if (!sock.authState.creds.registered) {
    const number = 'XXXXXXXXXXX'
    const code = await sock.requestPairingCode(number) // or await sock.requestPairingCode(number, 'CODEOTPS') custom your pairing code
    console.log(code)
}
```

### Receive Full History

1. Set `syncFullHistory` as `true`
2. Baileys, by default, use chrome browser config
    - If you'd like to emulate a desktop connection (and receive more message history), this browser setting to your Socket config:

```ts
const sock = makeWASocket({
    ...otherOpts,
    // can use Windows, Ubuntu here too
    browser: Browsers.macOS('Desktop'),
    syncFullHistory: true
})
```

## ⚙️ Important Notes About Socket Config

### Caching Group Metadata (Recommended)
- If you use baileys for groups, we recommend you to set `cachedGroupMetadata` in socket config, you need to implement a cache like this:

    ```ts
    const groupCache = new NodeCache({stdTTL: 5 * 60, useClones: false})

    const sock = makeWASocket({
        cachedGroupMetadata: async (jid) => groupCache.get(jid)
    })

    sock.ev.on('groups.update', async ([event]) => {
        const metadata = await sock.groupMetadata(event.id)
        groupCache.set(event.id, metadata)
    })

    sock.ev.on('group-participants.update', async (event) => {
        const metadata = await sock.groupMetadata(event.id)
        groupCache.set(event.id, metadata)
    })
    ```

### Improve Retry System & Decrypt Poll Votes
- If you want to improve sending message, retrying when error occurs and decrypt poll votes, you need to have a store and set `getMessage` config in socket like this:
    ```ts
    const sock = makeWASocket({
        getMessage: async (key) => await getMessageFromStore(key)
    })
    ```

### Receive Notifications in Whatsapp App
- If you want to receive notifications in whatsapp app, set `markOnlineOnConnect` to `false`
    ```ts
    const sock = makeWASocket({
        markOnlineOnConnect: false
    })
    ```
## 💾 Saving & Restoring Sessions

You obviously don't want to keep scanning the QR code every time you want to connect. 

So, you can load the credentials to log back in:
```ts
import makeWASocket, { useMultiFileAuthState } from '@innovatorssoft/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

// will use the given state to connect
// so if valid credentials are available -- it'll connect without QR
const sock = makeWASocket({ auth: state })

// this will be called as soon as the credentials are updated
sock.ev.on('creds.update', saveCreds)
```

> [!IMPORTANT]
> `useMultiFileAuthState` is a utility function to help save the auth state in a single folder, this function serves as a good guide to help write auth & key states for SQL/no-SQL databases, which I would recommend in any production grade system.

> [!NOTE]
> When a message is received/sent, due to signal sessions needing updating, the auth keys (`authState.keys`) will update. Whenever that happens, you must save the updated keys (`authState.keys.set()` is called). Not doing so will prevent your messages from reaching the recipient & cause other unexpected consequences. The `useMultiFileAuthState` function automatically takes care of that, but for any other serious implementation -- you will need to be very careful with the key state management.

## ⚡ Handling Events

- Baileys uses the EventEmitter syntax for events. 
They're all nicely typed up, so you shouldn't have any issues with an Intellisense editor like VS Code.

You can listen to these events like this:
```ts
const sock = makeWASocket()
sock.ev.on('messages.upsert', ({ messages }) => {
    console.log('got messages', messages)
})
```

### Example to Start

> [!NOTE]
> This example includes basic auth storage too

```ts
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@innovatorssoft/baileys'
import { Boom } from '@hapi/boom'

async function connectToWhatsApp () {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys')
    const sock = makeWASocket({
        // can provide additional config here
        auth: state,
        printQRInTerminal: true
    })
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                connectToWhatsApp()
            }
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    })
    sock.ev.on('messages.upsert', event => {
        for (const m of event.messages) {
            console.log(JSON.stringify(m, undefined, 2))

            console.log('replying to', m.key.remoteJid)
            await sock.sendMessage(m.key.remoteJid!, { text: 'Hello Word' })
        }
    })

    // to storage creds (session info) when it updates
    sock.ev.on('creds.update', saveCreds)
}
// run in main file
connectToWhatsApp()
```

### For example if you use useSingleFileAuthState and useMongoFileAuthState
```ts
import makeWASocket, { useSingleFileAuthState, useMongoFileAuthState } from '@innovatorssoft/baileys'

// Single Auth
const { state, saveState } = await useSingleFileAuthState('./auth_info_baileys.json') 
const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })
    
sock.ev.on('creds.update', saveState)

// Mongo Auth
import { MongoClient } from "mongodb"

const connectAuth = async() => {
    global.client = new MongoClient('mongoURL')
    global.client.connect(err => {
        if (err) {
            console.warn("Warning: MongoDB link is invalid or cannot be connected.")
        } else {
            console.log('Successfully Connected To MongoDB Server')
        }
    })
}
  await client.connect()
  const collection = client.db("@innovatorssoftn").collection("sessions")
  return collection
}

const Authentication = await connectAuth()
const { state, saveCreds } = await useMongoFileAuthState(Authentication)
const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })
    
sock.ev.on('creds.update', saveCreds)
```

### SQLite Auth State

For high-performance session persistence using SQLite (requires `better-sqlite3` as an optional dependency):

```ts
import makeWASocket, { useSqliteAuthState } from '@innovatorssoft/baileys'

const { state, saveCreds } = await useSqliteAuthState({ dbPath: './auth.db' })
const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
})

sock.ev.on('creds.update', saveCreds)
```

> [!TIP]
> `useSqliteAuthState` uses lazy loading for `better-sqlite3`. Install it with `npm install better-sqlite3` before use. It can be used as a drop-in alternative to `useMultiFileAuthState` for production deployments where file-per-key approaches are insufficient.

> [!IMPORTANT]
> In `messages.upsert` it's recommended to use a loop like `for (const message of event.messages)` to handle all messages in array

### Decrypt Poll Votes

- By default poll votes are encrypted and handled in `messages.update`
```ts
import pino from "pino"
import { makeInMemoryStore, getAggregateVotesInPollMessage } from '@innovatorssoft/baileys'

const logger = pino({ timestamp: () => `,"time":"${new Date().toJSON()}"` }).child({ class: "@innovatorssoftn" })
logger.level = "fatal"
const store = makeInMemoryStore({ logger })

async function getMessage(key){
    if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id)
        return msg?.message
    }
    return {
        conversation: "Itsocki Kawaiii"
    }
} 

sock.ev.on("messages.update", async (chatUpdate) => {
    for(const { key, update } of chatUpdate) {
         if(update.pollUpdates && key.fromMe) {
           const pollCreation = await getMessage(key)
             if(pollCreation) {
               const pollUpdate = await getAggregateVotesInPollMessage({
                    message: pollCreation,
                    pollUpdates: update.pollUpdates,
                })
               const toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
               if (toCmd == undefined) return
               console.log(toCmd)
	        }
        }
    } 
})
```

### Summary of Events on First Connection

1. When you connect first time, `connection.update` will be fired requesting you to restart sock
2. Then, history messages will be received in `messaging.history-set`

### Auto-Reply System

Keyword/pattern-based automatic response handler with built-in **typing simulation** — shows a "typing..." indicator before sending each reply to feel more human.

```ts
import { createAutoReply } from '@innovatorssoft/baileys'
```

### Setup with Typing Simulation

```ts
const autoReply = createAutoReply(
    // Wire sendMessage
    (jid, content, opts) => sock.sendMessage(jid, content, opts),
    // Wire sendPresence — REQUIRED for simulateTyping
    (jid, presence) => sock.sendPresenceUpdate(presence, jid),
    {
        simulateTyping: true,   // show "typing..." before each reply
        typingDuration: 1500,   // show it for 1.5 seconds (default: 1000)
        globalCooldown: 2000,   // wait 2 s before replying to the same JID again
        onReply:  (rule, msg, resp) => console.log(`Auto-replied with rule: ${rule.id}`),
        onError:  (err, rule, msg)  => console.error(`Rule ${rule.id} failed:`, err.message)
    }
)

// Wire to your message event
sock.ev.on('messages.upsert', async ({ messages }) => {
    for (const msg of messages) {
        if (!msg.key.fromMe) {
            await autoReply.processMessage(msg)
        }
    }
})
```

### Adding Rules

```ts
// Keyword match (substring, case-insensitive)
autoReply.addRule({
    keywords: ['hi', 'hello', 'hey', 'halo'],
    response: { text: 'Hello! How can I help you? 👋' },
    quoted:   true  // reply quoting the original message
})

// Regex pattern with dynamic/async response
autoReply.addRule({
    pattern:  /^!weather (.+)$/i,
    response: async (msg, match) => ({
        text: `Weather for *${match[1]}*: ☀️ 28°C, Humidity: 70%`
    })
})

// Exact text match, groups only, with per-JID cooldown
autoReply.addRule({
    exactMatch: '!help',
    groupsOnly: true,
    cooldown:   30_000,  // cooldown 30 s per JID
    response:   { text: 'Available commands:\n• !help\n• !info\n• !ping' }
})

// Private chats only, higher priority (checked before lower-priority rules)
autoReply.addRule({
    keywords:     ['buy', 'price', 'order'],
    privateOnly:  true,
    priority:     10,
    response:     { text: 'Please visit our store: https://example.com' }
})

// Allowed JIDs only
autoReply.addRule({
    keywords:    ['secret'],
    allowedJids: ['628xxx@s.whatsapp.net'],
    response:    { text: '🔐 Secret message!' }
})
```

### Managing Rules

```ts
// Get a rule by ID
const rule = autoReply.getRule(rule.id)

// Enable / disable a rule
autoReply.setRuleActive(rule.id, false)  // pause
autoReply.setRuleActive(rule.id, true)   // resume

// Remove a specific rule
autoReply.removeRule(rule.id)

// List all rules
const rules = autoReply.getRules()

// Wipe all rules
autoReply.clearRules()
```

### `AutoReplyOptions` Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `simulateTyping` | `boolean` | `false` | Show "typing…" before replying |
| `typingDuration` | `number` | `1000` | Duration of typing indicator in ms |
| `globalCooldown` | `number` | `1000` | Min time between replies to same JID |
| `multiMatch` | `boolean` | `false` | Reply for every matching rule (not just the first) |
| `onReply` | `function` | — | Called after each successful reply |
| `onError` | `function` | — | Called when a rule throws |

---


## 🗄️ Implementing a Data Store

- Baileys does not come with a defacto storage for chats, contacts, or messages. However, a simple in-memory implementation has been provided. The store listens for chat updates, new messages, message updates, etc., to always have an up-to-date version of the data.

> [!IMPORTANT]
> I highly recommend building your own data store, as storing someone's entire chat history in memory is a terrible waste of RAM.

It can be used as follows:

```ts
import makeWASocket, { makeInMemoryStore } from '@innovatorssoft/baileys'
// the store maintains the data of the WA connection in memory
// can be written out to a file & read from it
const store = makeInMemoryStore({ })
// can be read from a file
store.readFromFile('./baileys_store.json')
// saves the state to a file every 10s
setInterval(() => {
    store.writeToFile('./baileys_store.json')
}, 10_000)

const sock = makeWASocket({ })
// will listen from this socket
// the store can listen from a new socket once the current socket outlives its lifetime
store.bind(sock.ev)

sock.ev.on('chats.upsert', () => {
    // can use 'store.chats' however you want, even after the socket dies out
    // 'chats' => a KeyedDB instance
    console.log('got chats', store.chats.all())
})

sock.ev.on('contacts.upsert', () => {
    console.log('got contacts', Object.values(store.contacts))
})

```

The store also provides some simple functions such as `loadMessages` that utilize the store to speed up data retrieval.

## 🆔 Whatsapp IDs Explain

- `id` is the WhatsApp ID, called `jid` too, of the person or group you're sending the message to. 
    - It must be in the format ```[country code][phone number]@s.whatsapp.net```
	    - Example for people: ```+19999999999@s.whatsapp.net```. 
	    - For groups, it must be in the format ``` 123456789-123345@g.us ```. 
    - For broadcast lists, it's `[timestamp of creation]@broadcast`.
    - For stories, the ID is `status@broadcast`.

## 🛠️ Utility Functions

- `getContentType`, returns the content type for any message
- `getDevice`, returns the device from message
- `makeCacheableSignalKeyStore`, make auth store more fast
- `downloadContentFromMessage`, download content from any message
- `parseJid`, parse and extract info from any JID (PN or LID)
- `getSenderPn`, get your own phone number info from creds

### JID Plotting & LID Support
InnovatorsSoft Baileys has advanced JID plotting utilities to handle WhatsApp's Linked IDs (LID).

```ts
import { parseJid, plotJid, normalizePhoneToJid } from '@innovatorssoft/baileys'

// Parse JID info
const info = parseJid('1234567890@s.whatsapp.net')
console.log(info.isLid) // false
console.log(info.user) // '1234567890'

// Normalize various formats to JID
const jid = normalizePhoneToJid('62812345678') // '62812345678@s.whatsapp.net'

// Plot JID (Convert between PN and LID if mapping is available)
const plotted = plotJid('1234567890@s.whatsapp.net')
```

#### Additional JID Helpers

```ts
import { isHostedPnUser, isHostedLidUser, isLidUser, isPnUser } from '@innovatorssoft/baileys'

// Check if a JID is a hosted phone number user
isHostedPnUser('1234567890@s.whatsapp.net') // boolean

// Check if a JID is a hosted LID user
isHostedLidUser('ABC123@lid') // boolean
```

#### Message Inspection Helpers

```ts
import {
    isScheduledMessage,
    getScheduledMessageTime,
    getMessagePaymentInfo,
    getMessageCommentMetadata,
    getMessageAddOns,
    getPollCorrectAnswer,
    toJid,
    getSenderLid
} from '@innovatorssoft/baileys'

// Check if a message is scheduled
if (isScheduledMessage(msg)) {
    const scheduledTime = getScheduledMessageTime(msg) // Date | null
    console.log('Scheduled for:', scheduledTime)
}

// Get quiz correct answer from a poll creation message
const answer = getPollCorrectAnswer(msg.message) // string | null

// Normalize a bare user ID to @s.whatsapp.net
const jid = toJid('1234567890') // '1234567890@s.whatsapp.net'

// Get the sender's LID from a message
const { jid: senderJid, lid } = getSenderLid(msg)
```

### Message Scheduler

Schedule WhatsApp messages to be automatically sent at a specific future time (or after a delay). The scheduler is exported directly from the package — no external dependencies required.

```ts
import { createMessageScheduler } from '@innovatorssoft/baileys'
```

### Setup

```ts
const scheduler = createMessageScheduler(
    // Wire the scheduler to your socket's sendMessage function
    (jid, content) => sock.sendMessage(jid, content),
    {
        // Called when each message is successfully sent
        onSent: (scheduled, message) => {
            console.log(`✅ Sent to ${scheduled.jid} (id: ${scheduled.id})`)
        },
        // Called when a message fails to send
        onFailed: (scheduled, error) => {
            console.error(`❌ Failed for ${scheduled.jid}: ${error.message}`)
        },
        maxQueue:      1000,   // max pending messages (default: 1000)
        checkInterval: 1000    // polling interval in ms (default: 1000)
    }
)
```

### Schedule at a Specific Time

```ts
// Schedule a birthday message
const entry = scheduler.schedule(
    '6281234567890@s.whatsapp.net',
    { text: 'Happy Birthday! 🎂' },
    new Date('2026-12-25T09:00:00')
)

console.log('Scheduled with ID:', entry.id)

// Schedule any message type
scheduler.schedule(
    groupJid,
    {
        image: { url: './promo.jpg' },
        caption: 'Weekend sale starts now! 🛍️'
    },
    new Date('2026-12-20T08:00:00')
)
```

### Schedule with a Delay

```ts
// Send in 30 minutes
scheduler.scheduleDelay(jid, { text: 'Reminder! ⏰' }, 30 * 60 * 1000)

// Send in 2 hours
scheduler.scheduleDelay(jid, { text: 'Follow-up check-in' }, 2 * 60 * 60 * 1000)

// Send in 1 day
scheduler.scheduleDelay(jid, { text: 'Daily update' }, 24 * 60 * 60 * 1000)
```

### Manage Scheduled Messages

```ts
// Cancel a specific message
const wasCancelled = scheduler.cancel(entry.id)
console.log(wasCancelled) // true if found & pending

// Cancel all pending messages for a JID
const count = scheduler.cancelForJid(jid)
console.log(`Cancelled ${count} messages`)

// List all pending messages
const pending = scheduler.getPending()
console.log(`${pending.length} messages still pending`)

// Get a specific entry by ID
const entry2 = scheduler.get(entry.id)

// Stop the internal timer (queue is preserved, just paused)
scheduler.stop()

// Restart after stop
scheduler.start()

// Wipe the entire queue and stop the timer
const cleared = scheduler.clearAll()
console.log(`Cleared ${cleared} entries`)
```

### `ScheduledMessage` Object

Every `schedule()` / `scheduleDelay()` call returns a `ScheduledMessage`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique entry ID (`sched_<timestamp>_<random>`) |
| `jid` | `string` | Recipient JID |
| `content` | `AnyMessageContent` | Message content |
| `scheduledTime` | `Date` | When it will be sent |
| `createdAt` | `Date` | When it was scheduled |
| `status` | `'pending' \| 'sent' \| 'failed' \| 'cancelled'` | Current status |
| `error?` | `string` | Set when `status === 'failed'` |
| `messageId?` | `string` | WhatsApp message ID after successful send |

> [!NOTE]
> The scheduler is **in-memory only**. Scheduled messages are lost if the process restarts. For persistence across restarts, serialize `getPending()` to a database and restore on startup by calling `schedule()` for each entry.

---


## 🛡️ Anti-Delete System
The Anti-Delete system allows you to store messages and recover them if they are revoked (deleted for everyone) by the sender.

```ts
import { MessageStore, createMessageStoreHandler, createAntiDeleteHandler } from '@innovatorssoft/baileys'

// Initialize the store
const store = new MessageStore({
    maxMessagesPerChat: 1000,
    ttl: 24 * 60 * 60 * 1000 // Keep messages for 24 hours
})

// 1. Listen for new messages to store them
sock.ev.on('messages.upsert', createMessageStoreHandler(store))

// 2. Listen for message updates (revokes/deletions)
const antiDeleteHandler = createAntiDeleteHandler(store)
sock.ev.on('messages.update', (updates) => {
    const deletedMessages = antiDeleteHandler(updates)
    for (const info of deletedMessages) {
        console.log(`Message from ${info.key.remoteJid} was deleted!`)
        console.log('Original Content:', info.originalMessage.message)
        
        // You can now re-send the message or alert the user
        // await sock.copyNForward(info.key.remoteJid, info.originalMessage)
    }
})
```


## 💬 Sending Messages

- Send all types of messages with a single function
    - **[Here](https://innovatorssoftpk.com/docs/sending-messages) you can see all message contents supported, like text message**
    - **[Here](https://innovatorssoftpk.com/docs/sending-messages) you can see all options supported, like quote message**

    ```ts
    const jid: string
    const content: AnyMessageContent
    const options: MiscMessageGenerationOptions

    sock.sendMessage(jid, content, options)
    ```

### Non-Media Messages

#### Text Message
```ts
await sock.sendMessage(jid, { text: 'hello word' })
```

#### Message Templates

Generate consistently formatted messages using native template string interpolation with curly brackets (e.g., `{{variable:defaultValue}}`).

```ts
import { 
    createTemplateManager, 
    renderTemplate, 
    PRESET_TEMPLATES 
} from '@innovatorssoft/baileys'

// Create a manager and load the presets (includePresets = true)
const templates = createTemplateManager(true)

// Or, quick render without loading the manager
const quick = renderTemplate(
    'Hi {{name}}, your order #{{orderId}} is {{status:processing}}',
    { name: 'Alice', orderId: '123' } // 'processing' acts a default value
)
```

### Rendering Preset Templates

The manager comes out of the box with beautifully designed, ready-to-use templates for common scenarios like Orders, Invoices, Greetings, and Support Tickets. 

```ts
// Renders the built-in 'invoice' template using the provided data
const invoiceText = templates.render('invoice', {
    invoiceNumber: 'INV-111',
    customerName: 'John Doe',
    invoiceDate: '2024-01-15',
    dueDate: '2024-01-30',
    items: '1x Web Design\n1x Hosting',
    subtotal: '10,000',
    tax: '1,000',
    total: '11,000',
    // We omit paymentMethod and bankAccount to let them fall back to template default
})

await sock.sendMessage(jid, { text: invoiceText })
```

### Custom Templates

You can create entirely custom templates, and define strict parameter variables. 

```ts
// Registering a Custom Template
templates.create({
    name: 'Welcome Message',
    content: `Hello {{name}}! 👋
    
Welcome to {{company}}!

Here are our services:
{{services}}

Contact: {{phone:0812-3456-7890}}`,
    category: 'greeting'
})

// Using it elsewhere in your app
const welcome = templates.render('welcome_message', {
    name: 'Budi',
    company: 'PT Example',
    services: '- Support\n- Inquiries'
})
```

You can iterate through your templates using functions like `templates.getAll()` and `templates.getByCategory('greeting')`, or backup and restore them using `.export()` and `.import(json)`.


#### Quote Message (works with all types)
```ts
await sock.sendMessage(jid, { text: 'hello word' }, { quoted: message })
```

#### Mention User (works with most types)
- @number is to mention in text, it's optional
```ts
await sock.sendMessage(
    jid,
    {
        text: '@12345678901',
        mentions: ['12345678901@s.whatsapp.net']
    }
)
```

#### Forward Messages
- You need to have message object, can be retrieved from [store](#implementing-a-data-store) or use a [message] object
```ts
const msg = getMessageFromStore() // implement this on your end
await sock.sendMessage(jid, { forward: msg, force: true or number }) // WA forward the message!
```

#### Location Message
```ts
await sock.sendMessage(
    jid, 
    {
        location: {
            degreesLatitude: 24.121231,
            degreesLongitude: 55.1121221
        }
    }
)
```

#### Live Location Message
```ts
await sock.sendMessage(
    jid, 
    {
        location: {
            degreesLatitude: 24.121231,
            degreesLongitude: 55.1121221
        }, 
        live: true
    }
)
```
#### Contact Message
```ts
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Jeff Singh\n' // full name
            + 'ORG:Ashoka Uni\n' // the organization of the contact
            + 'TELtype=CELLtype=VOICEwaid=911234567890:+91 12345 67890\n' // WhatsApp ID + phone number
            + 'END:VCARD'

await sock.sendMessage(
    id,
    { 
        contacts: { 
            displayName: 'innovatorssoftn', 
            contacts: [{ vcard }] 
        }
    }
)
```

#### vCard / Contact Cards

Easily generate and send vCard (VCF) contact data.

```ts
import { 
    quickContact, 
    createContactCard, 
    createContactCards,
    generateVCard 
} from '@innovatorssoft/baileys'
```

### Sending a Single Contact

```ts
// 1. Create a contact object quickly
const contact = quickContact('John Doe', '+1234567890', { 
    organization: 'Acme Corp',
    email: 'john@acme.com'
})

// 2. Send it!
await sock.sendMessage(jid, createContactCard(contact))
```

### Sending Multiple Contacts

```ts
const c1 = quickContact('Alice', '+111111')
const c2 = quickContact('Bob', '+222222')

await sock.sendMessage(jid, createContactCards([c1, c2]))
```

### Advanced Contact Generation

If you need full control over the vCard fields (addresses, multiple phones, birthday), you can construct a full `VCardContact` object:

```ts
const fullContact = {
    fullName: 'Jane Smith',
    organization: 'Tech Inc',
    title: 'Senior Developer',
    phones: [
        { number: '+123', type: 'CELL' },
        { number: '+456', type: 'WORK', label: 'Office' }
    ],
    emails: [
        { email: 'jane@tech.inc', type: 'WORK' }
    ],
    addresses: [
        { street: '123 Main St', city: 'NY', country: 'USA' }
    ],
    birthday: '1990-01-01',
    note: 'Met at the conference'
}

await sock.sendMessage(jid, createContactCard(fullContact))
```


#### Reaction Message
- You need to pass the key of message, you can retrieve from [store](#implementing-a-data-store) or use a [key] object
```ts
await sock.sendMessage(
    jid,
    {
        react: {
            text: '💖', // use an empty string to remove the reaction
            key: message.key
        }
    }
)
```

#### Pin Message
- You need to pass the key of message, you can retrieve from [store](#implementing-a-data-store) or use a [key]object

- Time can be:

| Time  | Seconds        |
|-------|----------------|
| 24h    | 86.400        |
| 7d     | 604.800       |
| 30d    | 2.592.000     |

```ts
await sock.sendMessage(
    jid,
    {
        pin: {
            type: 1, // 2 to remove
            time: 86400,
            key: Key
        }
    }
)
```


---


### Keep Message
```ts
await sock.sendMessage(
    jid,
    {
        keep: {
            key: Key,
            type: 1 // or 2
        }
    }
)
```

#### Poll Message
```ts
await sock.sendMessage(
    jid,
    {
        poll: {
            name: 'My Poll',
            values: ['Option 1', 'Option 2', ...],
            selectableCount: 1,
            toAnnouncementGroup: false // or true
        }
    }
)
```

#### Poll Result Message
```ts
await sock.sendMessage(
    jid, 
    {
        pollResult: {
            name: 'Hi', 
            values: [
               [
               'Option 1',
               1000
               ], 
               [
               'Option 2', 
               2000
               ]
           ]
        }
    }
)
```

### Call Message
```ts
await sock.sendMessage(
    jid,
    {
        call: {
            name: 'Hay',
            type: 1 // 2 for video
        }
    }
)
```

### Event Message
```ts
await sock.sendMessage(
    jid,
    {
        event: {
            isCanceled: false, // or true
            name: 'holiday together!',
            description: 'who wants to come along?', 
            location: {
                degreesLatitude: 24.121231,
                degreesLongitude: 55.1121221,
                name: 'name'
            },
            call: 'audio', // or 'video'
            startTime: number, 
            endTime: number, 
            extraGuestsAllowed: true // or false
        }
    }
)
```

### Order Message
```ts
await sock.sendMessage(
    jid,
    {
        order: {
            orderId: '574xxx',
            thumbnail: 'your_thumbnail', 
            itemCount: 'your_count',
            status: 'your_status', // INQUIRY || ACCEPTED || DECLINED
            surface: 'CATALOG',
            message: 'your_caption',
            orderTitle: "your_title",
            sellerJid: 'your_jid'',
            token: 'your_token',
            totalAmount1000: 'your_amount',
            totalCurrencyCode: 'IDR'
        }
    }
)
```

### Product Message
```ts
await sock.sendMessage(
    jid,
    {
        product: {
            productImage: {   // for using buffer >> productImage: your_buffer
              url: your_url
            },
            productId: 'your_id', 
            title: 'your_title',
            description: 'your_description', 
            currencyCode: 'IDR', 
            priceAmount1000: 'your_amount', 
            retailerId: 'your_reid', // optional use if needed
            url: 'your_url', // optional use if needed
            productImageCount: 'your_imageCount', 
            firstImageId: 'your_image', // optional use if needed
            salePriceAmount1000: 'your_priceSale', 
            signedUrl: 'your_url' // optional use if needed
        },
       businessOwnerJid: 'your_jid' 
    }
)
```

### Payment Message
```ts
await sock.sendMessage(
    jid,
    {
        payment: {
            note: 'Hi!',
            currency: 'IDR', // optional 
            offset: 0, // optional
            amount: '10000', // optional
            expiry: 0, // optional
            from: '628xxxx@s.whatsapp.net', // optional
            image: { // optional
               placeholderArgb: "your_background", // optional
               textArgb: "your_text",  // optional
               subtextArgb: "your_subtext" // optional
            }
        }
    }
)
```

#### Payment Invite Message
```ts
await sock.sendMessage(
    id, 
    { 
        paymentInvite: {
            type: number, // 1 || 2 || 3
            expiry: 0 
        }   
    }
)
```

### Admin Invite Message
```ts
await sock.sendMessage(
    jid,
    {
        adminInvite: {
            jid: '123xxx@newsletter',
            name: 'newsletter_name', 
            caption: 'Please be my channel admin',
            expiration: 86400,
            jpegThumbnail: Buffer // optional
        }
    }
)
```

### Group Invite Message
```ts
await sock.sendMessage(
    jid,
    {
        groupInvite: {
            jid: '123xxx@g.us',
            name: 'group_name', 
            caption: 'Please Join My Whatsapp Group',
            code: 'code_invite',
            expiration: 86400,
            jpegThumbnail: Buffer, // optional            
        }
    }
)
```

### Sticker Pack Message
```ts 
// I don't know why the sticker doesn't appear
await sock.sendMessage(
    jid,
    {
        stickerPack: {
            name: 'Hiii', 
            publisher: 'By innovatorssoftn', 
            description: 'Hello', 
            cover: Buffer, // Image buffer
            stickers: [{
                sticker: { url: 'https://example.com/1234kjd.webp' }, 
                emojis: ['❤'], // optional
                accessibilityLabel: '', // optional
                isLottie: Boolean, // optional
                isAnimated: Boolean // optional
            }, 
            {
                sticker: Buffer, 
                emojis: ['❤'], // optional
                accessibilityLabel: '', // optional
                isLottie: Boolean, // optional
                isAnimated: Boolean // optional
            }]
        }
    }
)
```

### Share Phone Number Message
```ts
await sock.sendMessage(
    jid,
    {
        sharePhoneNumber: {
        }
    }
)
```

### Request Phone Number Message
```ts
await sock.sendMessage(
    jid,
    {
        requestPhoneNumber: {
        }
    }
)
```

### Buttons Reply Message
```ts
// List
await sock.sendMessage(
    jid,
    {
        buttonReply: {
            name: 'Hii', 
            description: 'description', 
            rowId: 'ID'
       }, 
       type: 'list'
    }
)
// Plain
await sock.sendMessage(
    jid,
    {
        buttonReply: {
            displayText: 'Hii', 
            id: 'ID'
       }, 
       type: 'plain'
    }
)

// Template
await sock.sendMessage(
    jid,
    {
        buttonReply: {
            displayText: 'Hii', 
            id: 'ID', 
            index: 'number'
       }, 
       type: 'template'
    }
)

// Interactive
await sock.sendMessage(
    jid,
    {
        buttonReply: {
            body: 'Hii', 
            nativeFlows: {
                name: 'menu_options', 
                paramsJson: JSON.stringify({ id: 'ID', description: 'description' }) 
                version: 1 // 2 | 3
            }
       }, 
       type: 'interactive'
    }
)
```

### Buttons Message
```ts
await sock.sendMessage(
    jid,
    {
        text: 'This is a button message!',  // image: buffer or // image: { url: url } If you want to use images
        caption: 'caption', // Use this if you are using an image or video
        footer: 'Hello World!',  
        buttons: [{ 
            buttonId: 'Id1', 
            buttonText: { 
                 displayText: 'Button 1'
              }
          }, 
          { 
            buttonId: 'Id2', 
            buttonText: { 
                 displayText: 'Button 2'
              }
          }, 
          { 
            buttonId: 'Id3', 
            buttonText: { 
                 displayText: 'Button 3'
              }
         }]
    }
)
```

### Buttons with Media & Native Flow (Mixed Buttons & sections)

```ts
await sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '👆🏻 Buttons and Native Flow!',
   footer: '@innovatorssoft/baileys',
   buttons: [{
      text: '👋🏻 Rating',
      id: '#Rating'
   }, {
      text: '📋 Select',
      sections: [{
         title: '✨ Section 1',
         rows: [{
            header: '',
            title: '💭 Secret Ingredient',
            description: '',
            id: '#SecretIngredient'
         }]
      }, {
         title: '✨ Section 2',
         highlight_label: '🔥 Popular',
         rows: [{
            header: '',
            title: '🏷️ Coupon',
            description: '',
            id: '#CouponCode'
         }]
      }]
   }]
}, {
   quoted: message
})
```

#### Interactive Messages

Send native formatting wrappers—like buttons, lists, URL CTAs, and Copy CTAs—without directly formatting the complex payload manually.

```typescript
import { 
    generateInteractiveButtonMessage,
    generateInteractiveListMessage,
    generateCombinedButtons,
    generateCopyCodeButton,
    generateUrlButtonMessage,
    generateQuickReplyButtons
} from '@innovatorssoft/baileys'

// Quick Reply Buttons
const quickButtons = generateQuickReplyButtons(
    'Please select an option below:',
    [
        { id: 'btn-1', displayText: '✅ Accept' },
        { id: 'btn-2', displayText: '❌ Reject' },
        { id: 'btn-3', displayText: '📞 Contact Support' }
    ],
    { footer: 'Powered by Baileys' }
)

await sock.sendMessage(jid, quickButtons)

// URL Button
const urlButton = generateUrlButtonMessage(
    'Visit our website for more info',
    [{ displayText: '🌐 Open Website', url: 'https://example.com' }],
    { title: 'Product Info', footer: 'Click to open' }
)

await sock.sendMessage(jid, urlButton)

// Copy Code Button (for OTPs, Promos, etc.)
const copyButton = generateCopyCodeButton(
    'Your OTP Code is:',
    '123456',
    '📋 Copy Code'
)

await sock.sendMessage(jid, copyButton)

// Combined Buttons (Mix URL, Reply, Copy, Call)
const combinedButtons = generateCombinedButtons(
    'Choose an action:',
    [
        { type: 'reply', displayText: '🛒 Order Now', id: 'order' },
        { type: 'url', displayText: '🌐 Website', url: 'https://example.com' },
        { type: 'call', displayText: '📞 Phone', phoneNumber: '+6281234567890' },
        { type: 'copy', displayText: '📋 Copy Promo', copyCode: 'PROMO2024' }
    ],
    { title: 'Main Menu', footer: 'Baileys' }
)

await sock.sendMessage(jid, combinedButtons)

// List Message
const listMessage = generateInteractiveListMessage({
    title: '📋 Product Menu',
    buttonText: 'View Menu',
    description: 'Please select a product',
    footer: 'Powered by Baileys',
    sections: [
        {
            title: 'Food',
            rows: [
                { rowId: 'nasi-goreng', title: 'Fried Rice', description: '$2.50' },
                { rowId: 'mie-goreng', title: 'Fried Noodles', description: '$2.00' }
            ]
        },
        {
            title: 'Beverages',
            rows: [
                { rowId: 'es-teh', title: 'Ice Tea', description: '$0.50' },
                { rowId: 'kopi', title: 'Coffee', description: '$1.00' }
            ]
        }
    ]
})

await sock.sendMessage(jid, listMessage)
```


### Buttons List Message
```ts
// Just working in a private chat
await sock.sendMessage(
    jid,
    {
        text: 'This is a list!', 
        footer: 'Hello World!', 
        title: 'Amazing boldfaced list title', 
        buttonText: 'Required, text on the button to view the list', 
        sections: [
           {
         	title: 'Section 1',
         	rows: [{
                title: 'Option 1', 
                rowId: 'option1'
             },
 	        {
                title: 'Option 2', 
                rowId: 'option2', 
                description: 'This is a description'
           }]
       },
       {
       	title: 'Section 2',
       	rows: [{
               title: 'Option 3', 
               rowId: 'option3'
           },
	       {
               title: 'Option 4', 
               rowId: 'option4', 
               description: 'This is a description V2'
           }]
       }]
    }
)
```

### Buttons Product List Message
```ts
// Just working in a private chat
await sock.sendMessage(
    jid,
    {
        text: 'This is a list!', 
        footer: 'Hello World!', 
        title: 'Amazing boldfaced list title', 
        buttonText: 'Required, text on the button to view the list', 
        productList: [{
            title: 'This is a title', 
            products: [
               {
                  productId: '1234'
               }, 
               {
                  productId: '5678'
               }
            ]
        }], 
        businessOwnerJid: '628xxx@s.whatsapp.net', 
        thumbnail: 'https://example.com/jdbenkksjs.jpg' // or buffer
    }
)
```

### Buttons Cards Message
```ts
await sock.sendMessage(
    jid,
    {
        text: 'Body Message',
        title: 'Title Message', 
        subtile: 'Subtitle Message', 
        footer: 'Footer Message',
        cards: [
           {
              image: { url: 'https://example.com/jdbenkksjs.jpg' }, // URL object
              // image: Buffer, // or Buffer
              // image: './path/to/image.jpg', // or local file path string
              title: 'Title Cards',
              body: 'Body Cards',
              footer: 'Footer Cards',
              buttons: [
                  {
                      name: 'quick_reply',
                      buttonParamsJson: JSON.stringify({
                         display_text: 'Display Button',
                         id: 'ID'
                      })
                  },
                  {
                      name: 'cta_url',
                      buttonParamsJson: JSON.stringify({
                         display_text: 'Display Button',
                         url: 'https://www.example.com'
                      })
                  }
              ]
           },
           {
              video: { url: 'https://example.com/jdbenkksjs.mp4' }, // URL object
              // video: fs.readFileSync('./video.mp4'), // or Buffer
              // video: './path/to/video.mp4', // or local file path string
              title: 'Title Cards',
              body: 'Body Cards',
              footer: 'Footer Cards',
              buttons: [
                  {
                      name: 'quick_reply',
                      buttonParamsJson: JSON.stringify({
                         display_text: 'Display Button',
                         id: 'ID'
                      })
                  },
                  {
                      name: 'cta_url',
                      buttonParamsJson: JSON.stringify({
                         display_text: 'Display Button',
                         url: 'https://www.example.com'
                      })
                  }
              ]
           }
        ]
    }
)
```

### Carousel & Native Flow
```ts
sock.sendMessage(jid, {
   text: '🗂️ Interactive with Carousel!',
   footer: '@innovatorssoft/baileys',
   cards: [{
      image: {
         url: './path/to/image.jpg'
      },
      caption: '🖼️ Image 1',
      footer: '🏷️️ Pinterest',
      nativeFlow: [{
         text: '🌐 Source',
         url: 'https://github.com/innovatorssoft/Baileys',
         useWebview: true
      }]
   }, {
      image: {
         url: './path/to/image.jpg'
      },
      caption: '🖼️ Image 2',
      footer: '🏷️ Pinterest',
      offerText: '🏷️ New Coupon!',
      offerCode: '@innovatorssoft/baileys',
      offerUrl: 'https://github.com/innovatorssoft/Baileys',
      offerExpiration: Date.now() + 3_600_000,
      nativeFlow: [{
         text: '🌐 Source',
         url: 'https://github.com/innovatorssoft/Baileys'
      }]
   }, {
      image: {
         url: './path/to/image.jpg'
      },
      caption: '🖼️ Image 3',
      footer: '🏷️ Pinterest',
      optionText: '👉🏻 Select Options',
      optionTitle: '👉🏻 Select Options',
      offerText: '🏷️ New Coupon!',
      offerCode: '@innovatorssoft/baileys',
      offerUrl: 'https://github.com/innovatorssoft/Baileys',
      offerExpiration: Date.now() + 3_600_000,
      nativeFlow: [{
         text: '🛒 Product',
         id: '#Product',
         icon: 'default'
      }, {
         text: '🌐 Source',
         url: 'https://github.com/innovatorssoft/Baileys'
      }]
   }]
}, {
   quoted: message
})
```

### Buttons Interactive Message
```ts
await sock.sendMessage(
    jid,
    {
        text: 'This is an Interactive message!',
        title: 'Hiii',
        subtitle: 'There is a subtitle', 
        footer: 'Hello World!',
        interactiveButtons: [
            {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Click Me!',
                    id: 'your_id'
                })
            },
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Follow Me',
                    url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y',
                    merchant_url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y'
                })
            },
            {
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Click Me!',
                    copy_code: '1234567890'
                })
            },
            {
                name: 'cta_call',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Call Me!',
                    phone_number: '628xxx'
                })
            },
            {
                name: 'cta_catalog',
                buttonParamsJson: JSON.stringify({
                    business_phone_number: '628xxx'
                })
            },
            {
                name: 'cta_reminder',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'cta_cancel_reminder',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'address_message',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'send_location',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
               name: 'open_webview',
               buttonParamsJson: JSON.stringify({
                  title: 'Follow Me!',
                  link: {
                      in_app_webview: true, // or false
                      url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y'
                  }
               })
            },
            {
               name: 'mpm',
               buttonParamsJson: JSON.stringify({
                  product_id: '8816262248471474'
               })
            },
            {
               name: 'wa_payment_transaction_details',
               buttonParamsJson: JSON.stringify({
                  transaction_id: '12345848'
               })
            },
            {
               name: 'automated_greeting_message_view_catalog',
               buttonParamsJson: JSON.stringify({
                   business_phone_number: '628xxx', 
                   catalog_product_id: '12345'
               })
            },
            {
                name: 'galaxy_message', 
                buttonParamsJson: JSON.stringify({
                	mode: 'published', 
                    flow_message_version: '3', 
                    flow_token: '1:1307913409923914:293680f87029f5a13d1ec5e35e718af3',
                    flow_id: '1307913409923914',
                    flow_cta: 'innovatorssoftn kawaii >\\<', 
                    flow_action: 'navigate', 
                    flow_action_payload: {
                    	screen: 'QUESTION_ONE',
                        params: {
                        	user_id: '123456789', 
                            referral: 'campaign_xyz'
                        }
                    }, 
                    flow_metadata: {
                    	flow_json_version: '201', 
                        data_api_protocol: 'v2', 
                        flow_name: 'Lead Qualification [en]',
                        data_api_version: 'v2', 
                        categories: ['Lead Generation', 'Sales']
                   }
                }) 
            }, 
            {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                    title: 'Click Me!',
                    sections: [
                        {
                            title: 'Title 1',
                            highlight_label: 'Highlight label 1',
                            rows: [
                                {
                                    header: 'Header 1',
                                    title: 'Title 1',
                                    description: 'Description 1',
                                    id: 'Id 1'
                                },
                                {
                                    header: 'Header 2',
                                    title: 'Title 2',
                                    description: 'Description 2',
                                    id: 'Id 2'
                                }
                            ]
                        }
                    ]
                })
            }
        ]
    }
)

// If you want to use an image
await sock.sendMessage(
    jid, 
    {
       image: { 
          url: 'https://example.com/jdbenkksjs.jpg' 
       },
       caption: 'Body',
       title: 'Title',
       subtitle: 'Subtitle', 
       footer: 'Footer',
       interactiveButtons: [
           {
               name: 'quick_reply',
               buttonParamsJson: JSON.stringify({
                   display_text: 'DisplayText',
                   id: 'ID1'
               })
           }
       ], 
       hasMediaAttachment: false // or true
    }
)

// If you want to use an video
await sock.sendMessage(
    jid, 
    {
        video: { 
          url: 'https://example.com/jdbenkksjs.mp4' 
       },
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       interactiveButtons: [
           {
               name: 'quick_reply',
               buttonParamsJson: JSON.stringify({
                   display_text: 'DisplayText',
                   id: 'ID1'
               })
           }
       ], 
       hasMediaAttachment: false // or true
    }
)

// If you want to use an document
await sock.sendMessage(
    jid, 
    {
        document: { 
          url: 'https://example.com/jdbenkksjs.jpg' 
       }, 
       mimetype: 'image/jpeg', 
       jpegThumbnail: await sock.resize('https://example.com/jdbenkksjs.jpg', 320, 320), 
       caption: 'Body',
       title: 'Title',
       subtitle: 'Subtitle', 
       footer: 'Footer',
       interactiveButtons: [
           {
               name: 'quick_reply',
               buttonParamsJson: JSON.stringify({
                   display_text: 'DisplayText',
                   id: 'ID1'
               })
           }
       ], 
       hasMediaAttachment: false // or true, 
       viewOnce: true
    }
)

// If you want to use an location
await sock.sendMessage(
    jid, 
    { 
       location: {
         degressLatitude: -0, 
         degressLongitude: 0,
         name: 'Hi'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       interactiveButtons: [
           {
               name: 'quick_reply',
               buttonParamsJson: JSON.stringify({
                   display_text: 'DisplayText',
                   id: 'ID1'
               })
           }
       ], 
       hasMediaAttachment: false // or true
       viewOnce: true
    }
)

// if you want to use an product
await sock.sendMessage(
    jid,
    {
        product: {
            productImage: { 
               url: 'https://example.com/jdbenkksjs.jpg'
            },
            productId: '836xxx',
            title: 'Title',
            description: 'Description',
            currencyCode: 'IDR',
            priceAmount1000: '283xxx',
            retailerId: 'innovatorssoftn',
            url: 'https://example.com',
            productImageCount: 1
        },
        businessOwnerJid: '628xxx@s.whatsapp.net',
        caption: 'Body',
        title: 'Title', 
        subtitle: 'Subtitle', 
        footer: 'Footer',
        interactiveButtons: [
            {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: 'DisplayText',
                    id: 'ID1'
                })
            }
        ], 
        hasMediaAttachment: false // or true
        viewOnce: true
    }
)
```

### Buttons Interactive Message PIX
```ts
await sock.sendMessage( 
    jid, 
    { 
       text: '', // This string is required. Even it's empty. 
       interactiveButtons: [ 
          { 
             name: 'payment_info', 
             buttonParamsJson: JSON.stringify({ 
                payment_settings: [{ 
                   type: "pix_static_code", 
                   pix_static_code:  { 
                      merchant_name: 'innovatorssoftn kawaii >\\\\\\<', 
                      key: 'example@innovatorssoft.com', 
                      key_type: 'EMAIL' // PHONE || EMAIL || CPF || EVP 
                   } 
               }] 
            }) 
         } 
      ], 
   } 
)
 ```

### Buttons Interactive Message PAY
```ts
await sock.sendMessage( 
    jid, 
    { 
       text: '', // This string is required. Even it's empty. 
       interactiveButtons: [ 
          { 
             name: 'review_and_pay', 
             buttonParamsJson: JSON.stringify({ 
                currency: 'IDR', 
                payment_configuration: '', 
                payment_type: '', 
                total_amount: {
                    value: '999999999',
                    offset: '100'
                }, 
                reference_id: '45XXXXX',
                type: 'physical-goods',
                payment_method: 'confirm', 
                payment_status: 'captured', 
                payment_timestamp: Math.floor(Date.now() / 1000),
                order: {
                    status: 'completed', 
                    description: '', 
                    subtotal: {
                        value: '0', 
                        offset: '100'
                    }, 
                    order_type: 'PAYMENT_REQUEST', 
                    items: [{
                        retailer_id: 'your_retailer_id', 
                        name: 'innovatorssoftn Kawaii >\\\<', 
                        amount: {
                            value: '999999999', 
                            offset: '100'
                        }, 
                        quantity: '1', 
                    }]
                }, 
                additional_note: 'innovatorssoftn Kawaii >\\\<', 
                native_payment_methods: [], 
                share_payment_status: false
            }) 
         } 
      ], 
   } 
)
 ```

### Interactive as Template (`interactiveAsTemplate`)

Wrap an `interactiveMessage` inside a `templateMessage` envelope. This is needed for platforms or clients that only render template-wrapped interactive content.

| Parameter               | Type      | Required | Description                                                |
|------------------------|-----------|----------|------------------------------------------------------------|
| `interactiveAsTemplate`| `boolean` | No       | Set to `true` to rewrap the interactive message.           |
| `id`                   | `string`  | No       | Custom `templateId`. Defaults to `'template-' + Date.now()`. |

**Returns:** The standard `WAMessage` object, with `interactiveMessage` nested under `templateMessage.interactiveMessageTemplate`.

**Throws:** `Boom` (400) if the built message does not contain an `interactiveMessage`.

**Example:**
```ts
await sock.sendMessage(jid, {
    interactiveMessage: {
        nativeFlowMessage: {
            buttons: [{ name: 'quick_reply', buttonParamsJson: '{"display_text":"Click"}' }]
        },
        body: { text: 'Hello!' }
    },
    interactiveAsTemplate: true,
    id: 'my-template-001'   // optional custom templateId
})
```


### Status Mentions Message
```ts
const jidat = [
    '123451679@g.us', 
    '124848899@g.us', 
    '111384848@g.us', 
    '62689xxxx@s.whatsapp.net', 
    '62xxxxxxx@s.whatsapp.net'
]
// Text
await sock.sendStatusMentions(
    {
      text: 'Hello Everyone :3', 
      font: 2, // optional
      textColor: 'FF0000', // optional
      backgroundColor: '#000000' // optional
    }, 
    jids // Limit to 5 mentions per status
)

// Image
await sock.sendStatusMentions(
    {
      Image: { url: 'https://example.com/ruriooe.jpg' }, or image buffer
      caption: 'Hello Everyone :3' // optional
    }, 
    jids // Limit to 5 mentions per status
)

// Video
await sock.sendStatusMentions(
    {
      video: { url: 'https://example.com/ruriooe.mp4' }, or video buffer
      caption: 'Hello Everyone :3' // optional
    }, 
    jids // Limit to 5 mentions per status
)

// Audio
await sock.sendStatusMentions(
    {
      audio: { url: 'https://example.com/ruriooe.mp3' }, or audio buffer
      backgroundColor: '#000000', // optional 
      mimetype: 'audio/mp4', 
      ppt: true
    }, 
    jids // Limit to 5 mentions per status
)
```

---

## 🎨 Rich AI Response Messages

These methods generate Meta AI–style rich response messages using the `botForwardedMessage → richResponseMessage` proto chain. All methods are available directly on the `sock` object.

### Rich Response Message

Send a text response (with optional syntax-highlighted code block) as a Meta AI–style rich message via `sock.sendMessage`:

```js
// Text only
await sock.sendMessage(jid, {
    richResponse: {
        text: '*Hello!* This is a _rich_ response.',
        // botJid: '259786046210223@bot' // optional, default provided
    }
})

// Text + syntax-highlighted code block
await sock.sendMessage(jid, {
    richResponse: {
        text: 'Here is a JavaScript example:',
        code: `const greet = (name) => {
  console.log('Hello, ' + name)
}
greet('World')`,
        language: 'javascript' // 'javascript' | 'typescript' | 'python' | 'js' | 'ts' | 'py'
    }
})

// Direct top-level shortcut keys in sendMessage
// Code block
await sock.sendMessage(jid, {
    code: 'console.log("Hello from Baileys")',
    language: 'javascript',
    text: 'Code explanation here' // optional header text
})

// Raw protobuf message
await sock.sendMessage(jid, {
    raw: proto.Message.fromObject({
        conversation: 'Raw message content'
    })
})
```

---

### sendTable

Send a formatted table (header row + data rows):

```js
await sock.sendTable(
    jid,
    'Price List',                              // title
    ['Item', 'Qty', 'Price'],                  // headers
    [
        ['Apple',  '3', '$1.50'],
        ['Banana', '6', '$0.90'],
        ['Cherry', '1', '$3.00']
    ],                                         // data rows
    null,                                      // quoted message (or null)
    { headerText: 'Here is your order summary:', footer: 'Thank you!' }
)
```

---

### sendList

Send a bulleted / single-column list:

```js
await sock.sendList(
    jid,
    'Available Commands',
    ['!help', '!ping', '!menu', '!info'],
    null,
    { headerText: 'Bot commands:', footer: 'Type any command to use it.' }
)

// Multi-column rows are also supported
await sock.sendList(
    jid,
    'Leaderboard',
    [
        ['1st', 'Alice', '980 pts'],
        ['2nd', 'Bob',   '850 pts'],
        ['3rd', 'Carol', '720 pts']
    ],
    null
)
```

---

### sendCodeBlock

Send a syntax-highlighted code block:

```js
await sock.sendCodeBlock(
    jid,
    `async function fetchData(url) {
  const res = await fetch(url)
  return res.json()
}`,
    null,                          // quoted message (or null)
    {
        title: '📦 Example – fetch helper',
        language: 'javascript',    // default
        footer: 'Copy and paste into your project.'
    }
)
```

Supported languages: `javascript` (default), `typescript`, `js`, `ts`, `python`, `py`.

---

### sendLatexImage

Render a LaTeX expression to a PNG image using the online CodeCogs API, upload, and send.

Parameters:
- `jid`: JID of the user/group
- `quoted`: Quoted message (optional)
- `options`: LaTeX string OR options object:
  - `formula` / `latex` / `text` / `expressions`: LaTeX expression(s) to render. If not found, defaults to `E=mc^2`.
  - `caption`: Optional caption to show underneath the image. If omitted, no caption is sent.

```js
// Send a LaTeX expression as an image with no caption
await sock.sendLatexImage(jid, null, 'E=mc^2')

// Send a LaTeX expression with a custom caption
await sock.sendLatexImage(jid, null, {
    formula: 'E=mc^2',
    caption: 'Mass-Energy Equivalence'
})
```

---

### sendLatexInlineImage

Render multiple LaTeX expressions as an album message.

Parameters:
- `jid`: JID of the user/group
- `quoted`: Quoted message (optional)
- `options`: LaTeX string OR options object:
  - `expressions`: Array of LaTeX expressions (as strings or objects with a `latexExpression` property)
  - `caption`:
    - Set to `true` to use each LaTeX expression as the caption for its respective image in the album.
    - Set to a `string` to use a single custom caption on the first image of the album.
    - Omit or set to `false` for no captions.

```js
// Send LaTeX images as an album without captions
await sock.sendLatexInlineImage(jid, null, {
    expressions: [
        { latexExpression: '\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}' },
        { latexExpression: '\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0\\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}' }
    ]
})

// Send LaTeX images as an album with the formula strings as captions
await sock.sendLatexInlineImage(jid, null, {
    expressions: [
        { latexExpression: '\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}' },
        { latexExpression: '\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0\\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}' }
    ],
    caption: true
})

// Send LaTeX images as an album with a single overall custom caption
await sock.sendLatexInlineImage(jid, null, {
    expressions: [
        { latexExpression: '\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}' },
        { latexExpression: '\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0\\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}' }
    ],
    caption: 'Maxwell\'s Equations'
})
```

---

### sendMarkdown

Send a rich markdown text message formatted natively via Meta AI primitives:

```js
await sock.sendMarkdown(
    jid,
    '# H1\n## H2\n==Highlighted==\n_Italics_ and **Bold**!',
    null  // quoted message (or null)
)
```

---

### sendRichMessage

Send a fully custom rich message by assembling raw submessage objects. You can also pass `{ useMarkdown: true }` in the options to automatically convert standard submessages (`TEXT`, `TABLE`, `CODE`, `INLINE_IMAGE`) into WhatsApp's native `unifiedResponse` primitives (e.g. `GenAIMarkdownTextUXPrimitive`, `GenATableUXPrimitive`):

```js
await sock.sendRichMessage(
    jid,
    [
        { messageType: 2, messageText: '# 🤖 *AI Response*' },
        {
            messageType: 4,
            tableMetadata: {
                title: 'Prices',
                rows: [
                    { items: ['Item', 'Price'], isHeading: true },
                    { items: ['Baileys Pro', '$49'] }
                ]
            }
        },
        {
            messageType: 5,
            codeMetadata: {
                codeLanguage: 'python',
                codeBlocks: [{ highlightType: 1, codeContent: 'print' }, { highlightType: 0, codeContent: '("Hello")' }]
            }
        },
        { messageType: 2, messageText: '> _Powered by Baileys_' }
    ],
    null,  // quoted
    { useMarkdown: true } // dynamically builds the unifiedResponse payload for native rendering
)
```

Submessage `messageType` values:
| Value | Type         |
|-------|--------------|
| 2     | Text         |
| 3     | Inline Image |
| 4     | Table        |
| 5     | Code Block   |
| 8     | LaTeX        |

---

### captureUnifiedResponse / sendUnifiedResponse

Capture a unified response from an incoming Meta AI message and forward it:

```js
// In your message handler:
const captured = sock.captureUnifiedResponse(msg.message)

if (captured) {
    // Forward the AI response to another JID
    await sock.sendUnifiedResponse(otherJid, null, captured)
}
```

`captureUnifiedResponse` returns `null` if the message is not a rich AI response.

---

### Shop Message
```ts
await sock.sendMessage(
    jid, 
    {      
       text: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
       viewOnce: true
    }
)

// Image
await sock.sendMessage(
    jid, 
    { 
       image: {
          url: 'https://example.com/jdbenkksjs.jpg'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Video
await sock.sendMessage(
    jid, 
    { 
       video: {
          url: 'https://example.com/jdbenkksjs.jpg'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Document
await sock.sendMessage(
    jid, 
    {
        document: { 
          url: 'https://example.com/jdbenkksjs.jpg' 
       }, 
       mimetype: 'image/jpeg', 
       jpegThumbnail: await sock.resize('https://example.com/jdbenkksjs.jpg', 320, 320), 
       caption: 'Body',
       title: 'Title',
       subtitle: 'Subtitle', 
       footer: 'Footer',
       shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
       hasMediaAttachment: false, // or true, 
       viewOnce: true
    }
)

// Location
await sock.sendMessage(
    jid, 
    { 
       location: {
         degressLatitude: -0, 
         degressLongitude: 0,
         name: 'Hi'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Product
await sock.sendMessage(
    jid,
    {
        product: {
            productImage: { 
               url: 'https://example.com/jdbenkksjs.jpg'
            },
            productId: '836xxx',
            title: 'Title',
            description: 'Description',
            currencyCode: 'IDR',
            priceAmount1000: '283xxx',
            retailerId: 'innovatorssoftn',
            url: 'https://example.com',
            productImageCount: 1
        },
        businessOwnerJid: '628xxx@s.whatsapp.net',
        caption: 'Body',
        title: 'Title', 
        subtitle: 'Subtitle', 
        footer: 'Footer',
        shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
        hasMediaAttachment: false, // or true
        viewOnce: true
    }
)
```
### Collection Message
```ts
await sock.sendMessage(
    jid, 
    {      
       text: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
       viewOnce: true
    }
)

// Image
await sock.sendMessage(
    jid, 
    { 
       image: {
          url: 'https://example.com/jdbenkksjs.jpg'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Video
await sock.sendMessage(
    jid, 
    { 
       video: {
          url: 'https://example.com/jdbenkksjs.jpg'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Document
await sock.sendMessage(
    jid, 
    {
        document: { 
          url: 'https://example.com/jdbenkksjs.jpg' 
       }, 
       mimetype: 'image/jpeg', 
       jpegThumbnail: await sock.resize('https://example.com/jdbenkksjs.jpg', 320, 320), 
       caption: 'Body',
       title: 'Title',
       subtitle: 'Subtitle', 
       footer: 'Footer',
       collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
       hasMediaAttachment: false, // or true, 
       viewOnce: true
    }
)

// Location
await sock.sendMessage(
    jid, 
    { 
       location: {
         degressLatitude: -0, 
         degressLongitude: 0,
         name: 'Hi'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Product
await sock.sendMessage(
    jid,
    {
        product: {
            productImage: { 
               url: 'https://example.com/jdbenkksjs.jpg'
            },
            productId: '836xxx',
            title: 'Title',
            description: 'Description',
            currencyCode: 'IDR',
            priceAmount1000: '283xxx',
            retailerId: 'innovatorssoftn',
            url: 'https://example.com',
            productImageCount: 1
        },
        businessOwnerJid: '628xxx@s.whatsapp.net',
        caption: 'Body',
        title: 'Title', 
        subtitle: 'Subtitle', 
        footer: 'Footer',
        collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
        hasMediaAttachment: false, // or true
        viewOnce: true
    }
)
```

### AI Icon Feature 
```ts
await sock.sendMessage(
    jid,
    {
        text: 'Hi'
    }, {
    ai: true // Add ai usage and change it to true
    }
)

// If using relay
await sock.relayMessage(
    jid,
    {
        extendedTextMessage: {
            text: 'Hi'
        }
    }, {
    AI: true // Use capital letters
    }
)
```

### Other Message Options

These optional boolean flags can be passed to wrap or configure your outgoing messages:

#### 👥 Mention All
Mention all participants in a group chat without listing their JIDs manually.
```javascript
await sock.sendMessage(jid, {
   text: 'Hello everyone!',
   mentionAll: true
})
```

#### 🐱 Lottie Sticker
Mark a sticker as a Lottie sticker.
```javascript
await sock.sendMessage(jid, {
   sticker: { url: './path/to/sticker.webp' },
   isLottie: true
})
```

#### 🏷️ Secure Meta Service Label
Add a secure meta service label attribute to the message stanza.
```javascript
await sock.sendMessage(jid, {
   text: '🏷️ Secure Label Message',
   secureMetaServiceLabel: true
})
```

#### 📑 Spoiler
Wrap a message content inside a spoiler wrapper.
```javascript
await sock.sendMessage(jid, {
   image: { url: './path/to/image.jpg' },
   caption: '❔ Spoiler Content',
   spoiler: true
})
```

#### 👁️ View Once
Wrap message into a standard view once message.
```javascript
await sock.sendMessage(jid, {
   image: { url: './path/to/image.jpg' },
   caption: '👁️ View Once',
   viewOnce: true
})
```

#### 👁️ View Once V2
Wrap message into a view once V2 message.
```javascript
await sock.sendMessage(jid, {
   image: { url: './path/to/image.jpg' },
   caption: '👁️ View Once V2',
   viewOnceV2: true
})
```

#### 👁️ View Once V2 Extension
Wrap message into a view once V2 extension message.
```javascript
await sock.sendMessage(jid, {
   image: { url: './path/to/image.jpg' },
   caption: '👁️ View Once V2 Extension',
   viewOnceV2Extension: true // or viewOnceExt: true
})
```

### Sending Messages with Link Previews

1. By default, wa does not have link generation when sent from the web
2. Baileys has a function to generate the content for these link previews
3. To enable this function's usage, add `link-preview-js` as a dependency to your project with `yarn add link-preview-js`
4. Send a link:
```ts
// --- Send a text message with a link preview
const urlA = 'https://github.com/innovatorssoft/baileys'

sock.sendMessage(jid, {
   text: urlA + ' 👆🏻 Check it out!',
   linkPreview: {
      'matched-text': urlA,
      title: '🌱 @innovatorssoft/baileys',
      description: 'Modified Baileys Fork',
      previewType: 0, // --- Use 1 for video playback in the link preview
      jpegThumbnail: fs.readFileSync('./path/to/image.jpg')
   }
})

// --- Send a text message with a large link preview and favicon
import { prepareWAMessageMedia } from '@innovatorssoft/baileys'

const urlB = 'https://github.com/innovatorssoft/baileys#readme'

const { imageMessage: image } = await prepareWAMessageMedia({
   image: {
      url: './path/to/image.jpg'
   }
}, {
   upload: sock.waUploadToServer,
   mediaTypeOverride: 'thumbnail-link'
})

// --- Set the thumbnail display size
image.height = 720
image.width = 480

sock.sendMessage(jid, {
   text: urlB + ' 👆🏻 Check it out!',
   linkPreview: {
      'matched-text': urlB,
      title: '🌱 @innovatorssoft/baileys',
      description: 'Modified Baileys Fork',
      previewType: 0,
      jpegThumbnail: fs.readFileSync('./path/to/image.jpg'),
      highQualityThumbnail: image,
      linkPreviewMetadata: {
         linkMediaDuration: 0, // --- Duration in seconds (for video/audio content)
         socialMediaPostType: 1, // --- Enum: 0 = NONE, 1 = REEL, 2 = LIVE_VIDEO, 3 = LONG_VIDEO, 4 = SINGLE_IMAGE, 5 = CAROUSEL
      } // --- Additional metadata for large link preview
   },
   favicon: {
      url: './path/to/tiny-image.ico'
   }
})
```

### Media Messages

Sending media (video, stickers, images) is easier & more efficient than ever.

> [!NOTE]
> In media messages, you can pass `{ stream: Stream }` or `{ url: Url }` or `Buffer` directly

- When specifying a media url, Baileys never loads the entire buffer into memory it even encrypts the media as a readable stream.

> [!TIP]
> It's recommended to use Stream or Url to save memory

#### Gif Message
- Whatsapp doesn't support `.gif` files, that's why we send gifs as common `.mp4` video with `gifPlayback` flag
```ts
await sock.sendMessage(
    jid, 
    { 
        video: fs.readFileSync('Media/ma_gif.mp4'),
        caption: 'hello word',
        gifPlayback: true
    }
)
```

#### Video Message
```ts
await sock.sendMessage(
    id, 
    { 
        video: {
            url: './Media/ma_gif.mp4'
        },
        caption: 'hello word',	    
    }
)
```

#### Video Ptv Message
```ts
await sock.sendMessage(
    id, 
    { 
        video: {
            url: './Media/ma_gif.mp4'
        },
        ptv: true	    
    }
)
```

#### Audio Message
- To audio message work in all devices you need to convert with some tool like `ffmpeg` with this flags:
    ```bash
        codec: libopus //ogg file
        ac: 1 //one channel
        avoid_negative_ts
        make_zero
    ```
    - Example:
    ```bash
    ffmpeg -i input.mp4 -avoid_negative_ts make_zero -ac 1 output.ogg
    ```
```ts
await sock.sendMessage(
    jid, 
    {
        audio: {
            url: './Media/audio.mp3'
        },
        mimetype: 'audio/mp4'
    }
)
```

#### Image Message
```ts
await sock.sendMessage(
    id, 
    { 
        image: {
            url: './Media/ma_img.png'
        },
        caption: 'hello word'
    }
)
```

#### HD Image Message
Send images at full, uncompressed quality. WhatsApp normally compresses images; passing `hd: true` skips compression and generates a higher-quality preview thumbnail (320 px wide, 85 % quality instead of the default 32 px / 50 %).

```ts
await sock.sendMessage(
    id,
    {
        image: {
            url: './Media/ma_img.png'
        },
        caption: 'High quality photo',
        hd: true   // send without compression
    }
)

// Works with Buffer and stream too
await sock.sendMessage(
    id,
    {
        image: fs.readFileSync('./Media/ma_img.png'),
        hd: true
    }
)
```

#### HD Video Message
```ts
await sock.sendMessage(
    id,
    {
        video: {
            url: './Media/ma_video.mp4'
        },
        caption: 'HD video',
        hd: true   // higher-quality 320×180 preview thumbnail
    }
)
```

### Album Message
```ts
await sock.sendMessage(
    id, 
    { 
        album: [{
        	image: {
        		url: 'https://example.com/innovatorssoft.jpg'
        	}, 
        	caption: 'Hay'
        }, {
        	image: Buffer, 
        	caption: 'Hay'
        }, {
        	video: {
        		url: 'https://example.com/innovatorssoft.mp4'
        	}, 
        	caption: 'Hay'
        }, {
        	video: Buffer, 
        	caption: 'Hay'
        }
    }
)
```

#### View Once Message

- You can send all messages above as `viewOnce`, you only need to pass `viewOnce: true` in content object

```ts
await sock.sendMessage(
    id, 
    { 
        image: {
            url: './Media/ma_img.png'
        },
        viewOnce: true, //works with video, audio too
        caption: 'hello word'
    }
)
```

## ✏️ Modify Messages

### Deleting Messages (for everyone)

```ts
const msg = await sock.sendMessage(jid, { text: 'hello word' })
await sock.sendMessage(jid, { delete: msg.key })
```

**Note:** deleting for oneself is supported via `chatModify`, see in [this section](#modifying-chats)

### Editing Messages

- You can pass all editable contents here
```ts
await sock.sendMessage(jid, {
      text: 'updated text goes here',
      edit: response.key,
    })
```

## 📥 Manipulating Media Messages

### Thumbnail in Media Messages
- For media messages, the thumbnail can be generated automatically for images & stickers provided you add `jimp` or `sharp` as a dependency in your project using `yarn add jimp` or `yarn add sharp`.
- Thumbnails for videos can also be generated automatically, though, you need to have `ffmpeg` installed on your system.

### Downloading Media Messages

If you want to save the media you received
```ts
import { createWriteStream } from 'fs'
import { downloadMediaMessage, getContentType } from '@innovatorssoft/baileys'

sock.ev.on('messages.upsert', async ({ [m] }) => {
    if (!m.message) return // if there is no text or media message
    const messageType = getContentType(m) // get what type of message it is (text, image, video...)

    // if the message is an image
    if (messageType === 'imageMessage') {
        // download the message
        const stream = await downloadMediaMessage(
            m,
            'stream', // can be 'buffer' too
            { },
            { 
                logger,
                // pass this so that baileys can request a reupload of media
                // that has been deleted
                reuploadRequest: sock.updateMediaMessage
            }
        )
        // save to file
        const writeStream = createWriteStream('./my-download.jpeg')
        stream.pipe(writeStream)
    }
}
```

### Re-upload Media Message to Whatsapp

- WhatsApp automatically removes old media from their servers. For the device to access said media -- a re-upload is required by another device that has it. This can be accomplished using: 
```ts
await sock.updateMediaMessage(msg)
```

## 📞 Initiate Voice Call & Stream Audio

- Initiates an outgoing WhatsApp voice call with WebAssembly audio transport
- Streams audio files (MP3/WAV/etc.) via FFmpeg into 16 kHz Float32 PCM WASM audio engine
- Emits real-time call lifecycle events (`ringing`, `connected`, `audio`, `ended`, `error`)

```ts
// Place a voice call and stream an audio file:
const call = await sock.initiateCall(jid, {
    audioSource: './hello.mp3', // MP3/WAV file path or "silence"
    durationMs: 30000          // Optional duration in ms
})

call.on('ringing', () => console.log('Call is ringing...'))
call.on('connected', () => console.log('Connected & streaming audio!'))
call.on('audio', (pcmChunk) => { /* Incoming 16 kHz Float32Array PCM */ })
call.on('ended', (reason) => console.log('Call ended:', reason))
call.on('error', (err) => console.error('Call error:', err))

// Or simple signaling only:
const result = await sock.offerCall(jid, isVideo)
// Cancel an outgoing call:
await sock.cancelCall(callId, jid)
```

## 🚫 Reject Call

- You can obtain `callId` and `callFrom` from `call` event

```ts
await sock.rejectCall(callId, callFrom)
```

## ⌨️ Send States in Chat

### Reading Messages
- A set of message keys must be explicitly marked read now.
- You cannot mark an entire 'chat' read as it were with Baileys Web.
This means you have to keep track of unread messages.

```ts
const key: WAMessageKey
// can pass multiple keys to read multiple messages as well
await sock.readMessages([key])
```

The message ID is the unique identifier of the message that you are marking as read. 
On a `WAMessage`, the `messageID` can be accessed using ```messageID = message.key.id```.

### Update Presence

- ``` presence ```
- The presence expires after about 10 seconds.
- This lets the person/group with `jid` know whether you're online, offline, typing etc. 

```ts
await sock.sendPresenceUpdate('available', jid) 
```

> [!NOTE]
> If a desktop client is active, WA doesn't send push notifications to the device. If you would like to receive said notifications -- mark your Baileys client offline using `sock.sendPresenceUpdate('unavailable')`

### Typing Indicator

Use `createTypingIndicator` for manual or standalone typing/recording presence control — without needing the auto-reply system.

```ts
import { createTypingIndicator } from '@innovatorssoft/baileys'

const typing = createTypingIndicator(
    (jid, presence) => sock.sendPresenceUpdate(presence, jid)
)
```

```ts
// Show "typing..." for 2 s, then send the message — all in one call
const sent = await typing.simulateTyping(jid, 2000, () =>
    sock.sendMessage(jid, { text: 'Here is your answer! ✅' })
)

// Manual start (auto-pauses after 5 s)
await typing.startTyping(jid, { duration: 5000 })

// Manual stop
await typing.stopTyping(jid)

// Voice note recording indicator
await typing.startRecording(jid, { duration: 3000 })

// Stop all active indicators (e.g. on socket close)
await typing.stopAll()
```

> [!TIP]
> `simulateTyping(jid, duration, callback)` is the simplest way to fake a human delay before any action — just wrap your `sendMessage` call in the callback.

### Native `sendPresenceUpdate` Simulation

Alternatively, the socket's core `sendPresenceUpdate` function now natively supports blocking simulation:

```ts
// Block the script, sending 'composing' for 2.5s, then automatically sending 'paused'.
await sock.sendPresenceUpdate('composing', jid, {
    simulateTyping: true,
    typingDuration: 2500 // (default: 1500)
})

// Now send your message
await sock.sendMessage(jid, { text: 'Hello!' })
```

---

### Read Receipt Control

A centralized tracker for handling read receipts (blue ticks) programmatically. It allows you to configure automatic delays (simulating human reaction time), configure global enable/disable states, and completely block specific JIDs from receiving blue ticks.

```ts
import { createReadReceiptController } from '@innovatorssoft/baileys'

const readReceipts = createReadReceiptController(
    (jid, participant, messageIds) => sock.readMessages([{ remoteJid: jid, id: messageIds[0] }]),
    {
        enabled: true,
        readDelay: 1000, // 1 second artificial delay
        excludeJids: ['blocked@s.whatsapp.net']
    }
)

// Mark as read manually inside an event listener!
// This respects the disabled state, excluded JIDs, and the `readDelay`.
await readReceipts.markRead(jid, participant, ['messageId123'])

// Force read (bypasses all rules and config!)
await readReceipts.forceMarkRead(jid, participant, ['messageId123'])

// Global toggle 
readReceipts.disable() // Stop sending read receipts globally
readReceipts.enable()  

// Update config dynamically
readReceipts.setConfig({
    enabled: true,
    readDelay: 2000
})
```

---


## 📁 Modifying Chats

WA uses an encrypted form of communication to send chat/app updates. This has been implemented mostly and you can send the following updates:

> [!IMPORTANT]
> If you mess up one of your updates, WA can log you out of all your devices and you'll have to log in again.

### Archive a Chat
```ts
const lastMsgInChat = await getLastMessageInChat(jid) // implement this on your end
await sock.chatModify({ archive: true, lastMessages: [lastMsgInChat] }, jid)
```
### Mute/Unmute a Chat

- Supported times:

| Time  | Miliseconds     |
|-------|-----------------|
| Remove | null           |
| 8h     | 86.400.000     |
| 7d     | 604.800.000    |

```ts
// mute for 8 hours
await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid)
// unmute
await sock.chatModify({ mute: null }, jid)
```
### Mark a Chat Read/Unread
```ts
const lastMsgInChat = await getLastMessageInChat(jid) // implement this on your end
// mark it unread
await sock.chatModify({ markRead: false, lastMessages: [lastMsgInChat] }, jid)
```

### Delete a Message for Me
```ts
await sock.chatModify(
    {
        clear: {
            messages: [
                {
                    id: 'ATWYHDNNWU81732J',
                    fromMe: true, 
                    timestamp: '1654823909'
                }
            ]
        }
    }, 
    jid
)

```
### Delete a Chat
```ts
const lastMsgInChat = await getLastMessageInChat(jid) // implement this on your end
await sock.chatModify({
        delete: true,
        lastMessages: [
            {
                key: lastMsgInChat.key,
                messageTimestamp: lastMsgInChat.messageTimestamp
            }
        ]
    },
    jid
)
```
### Pin/Unpin a Chat
```ts
await sock.chatModify({
        pin: true // or `false` to unpin
    },
    jid
)
```
### Star/Unstar a Message
```ts
await sock.chatModify({
        star: {
            messages: [
                {
                    id: 'messageID',
                    fromMe: true // or `false`
                }
            ],
            star: true // - true: Star Message false: Unstar Message
        }
    },
    jid
)
```

### Disappearing Messages

- Ephemeral can be:

| Time  | Seconds        |
|-------|----------------|
| Remove | 0          |
| 24h    | 86.400     |
| 7d     | 604.800    |
| 90d    | 7.776.000  |

- You need to pass in **Seconds**, default is 7 days

```ts
// turn on disappearing messages
await sock.sendMessage(
    jid, 
    // this is 1 week in seconds -- how long you want messages to appear for
    { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }
)

// will send as a disappearing message
await sock.sendMessage(jid, { text: 'hello' }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })

// turn off disappearing messages
await sock.sendMessage(
    jid, 
    { disappearingMessagesInChat: false }
)
```

### Clear Messages
```ts
await sock.clearMessage(jid, key, timestamps) 
```

## 🔍 User Querys

### Check If ID Exists in Whatsapp
```ts
const [result] = await sock.onWhatsApp(jid)
if (result.exists) console.log (`${jid} exists on WhatsApp, as jid: ${result.jid}`)
// You can also pass LID users (e.g. xxxxx@lid) to onWhatsApp, and it will return a lid field in the result:
// { jid: 'xxxxx@lid', exists: true, lid: 'xxxxx@lid' }
```

### Query Chat History (groups too)

- You need to have oldest message in chat
```ts
const msg = await getOldestMessageInChat(jid)
await sock.fetchMessageHistory(
    50, //quantity (max: 50 per query)
    msg.key,
    msg.messageTimestamp
)
```
- Messages will be received in `messaging.history-set` event

### Fetch Status
```ts
const status = await sock.fetchStatus(jid)
console.log('status: ' + status)
```

### Fetch Profile Picture
- To get the display picture of some person, group and channel
```ts
// for low res picture
const ppUrl = await sock.profilePictureUrl(jid)
console.log(ppUrl)
```

### Fetch Bussines Profile (such as description or category)
```ts
const profile = await sock.getBusinessProfile(jid)
console.log('business description: ' + profile.description + ', category: ' + profile.category)
```

### Fetch Someone's Presence (if they're typing or online)
```ts
// the presence update is fetched and called here
sock.ev.on('presence.update', console.log)

// request updates for a chat
await sock.presenceSubscribe(jid) 
```

### Message Search

Search and filter stored arrays of messages using a fast client-side indexing manager.

```ts
import { createMessageSearch, searchMessages } from '@innovatorssoft/baileys'

// Initialize the search manager
const search = createMessageSearch()

// Add bulk WAMessages to index
// Duplicate Message IDs are safely ignored.
search.addMessages(chatMessages)

// Search by text
const results = search.search('product price', {
    caseSensitive: false,
    limit: 20,
    messageTypes: ['text', 'image'], // Automatically searches inside image captions!
    fromDate: new Date('2024-01-01') // Filter by date securely
})

// Output is mapped and scored by Relevance
for (const result of results) {
    console.log(`Found snippet: "${result.matchedText}"`)
    console.log(`Relevance Score: ${result.relevanceScore}`)
    console.log(`Message Object:`, result.message)
}

// You can also search explicitly using Regex:
const regexResults = search.searchRegex(/order\s*#?\d+/i)

// Quick search via functional call, without keeping a manager:
const quickResults = searchMessages(
    rawMessagesArray, 
    'keyword', 
    { jid: '12345678@s.whatsapp.net', fromMe: false }
)
```

---


## 👤 Change Profile

### Change Profile Status
```ts
await sock.updateProfileStatus('Hello World!')
```
### Change Profile Name
```ts
await sock.updateProfileName('My name')
```
### Change Display Picture (groups too)
- To change your display picture or a group's

> [!NOTE]
> Like media messages, you can pass `{ stream: Stream }` or `{ url: Url }` or `Buffer` directly

```ts
await sock.updateProfilePicture(jid, { url: './new-profile-picture.jpeg' })
```

### Panoramic (Wide) Profile Picture
Set a full-width banner/panorama profile picture **without square cropping**. WhatsApp shows the full wide image for users with updated clients.

Two images are automatically generated from the same source:
- A **square crop** (640×640) for the circle avatar / thumbnail
- A **full-width panorama** (up to `maxWidth` px, aspect-ratio preserved) for the wide banner slot

```ts
// Basic usage — no cropping, displayed as a wide banner
await sock.updatePanoramaProfilePicture(myJid, { url: './panorama.jpg' })

// With custom options
await sock.updatePanoramaProfilePicture(myJid, { url: './wide-photo.jpg' }, {
    maxWidth: 1080,   // Maximum width in pixels (default: 720)
    quality: 90       // JPEG quality 1-100 (default: 80)
})

// Using a Buffer (e.g. downloaded or generated in memory)
await sock.updatePanoramaProfilePicture(myJid, fs.readFileSync('./banner.jpg'))

// Set a wide group profile banner
await sock.updatePanoramaProfilePicture(groupJid, { url: './group-banner.jpg' })

// Regular square profile picture still works unchanged
await sock.updateProfilePicture(myJid, { url: './square-photo.jpg' })
```

### Remove display picture (groups too)
```ts
await sock.removeProfilePicture(jid)
```

## Groups

- To change group properties you need to be admin

### Create a Group
```ts
// title & participants
const group = await sock.groupCreate('My Fab Group', ['1234@s.whatsapp.net', '4564@s.whatsapp.net'])
console.log('created group with id: ' + group.gid)
await sock.sendMessage(group.id, { text: 'hello there' }) // say hello to everyone on the group
```
### Add/Remove or Demote/Promote
```ts
// id & people to add to the group (will throw error if it fails)
await sock.groupParticipantsUpdate(
    jid, 
    ['abcd@s.whatsapp.net', 'efgh@s.whatsapp.net'],
    'add' // replace this parameter with 'remove' or 'demote' or 'promote'
)
```
### Change Subject (name)
```ts
await sock.groupUpdateSubject(jid, 'New Subject!')
```
### Change Description
```ts
await sock.groupUpdateDescription(jid, 'New Description!')
```
### Change Settings
```ts
// only allow admins to send messages
await sock.groupSettingUpdate(jid, 'announcement')
// allow everyone to send messages
await sock.groupSettingUpdate(jid, 'not_announcement')
// allow everyone to modify the group's settings -- like display picture etc.
await sock.groupSettingUpdate(jid, 'unlocked')
// only allow admins to modify the group's settings
await sock.groupSettingUpdate(jid, 'locked')
```
### Leave a Group
```ts
// will throw error if it fails
await sock.groupLeave(jid)
```
### Get Invite Code
- To create link with code use `'https://chat.whatsapp.com/' + code`
```ts
const code = await sock.groupInviteCode(jid)
console.log('group code: ' + code)
```
### Revoke Invite Code
```ts
const code = await sock.groupRevokeInvite(jid)
console.log('New group code: ' + code)
```
### Join Using Invitation Code
- Code can't have `https://chat.whatsapp.com/`, only code
```ts
const response = await sock.groupAcceptInvite(code)
console.log('joined to: ' + response)
```
### Get Group Info by Invite Code
```ts
const response = await sock.groupGetInviteInfo(code)
console.log('group information: ' + response)
```
### Query Metadata (participants, name, description...)
```ts
const metadata = await sock.groupMetadata(jid) 
console.log(metadata.id + ', title: ' + metadata.subject + ', description: ' + metadata.desc)
```
### Join using `groupInviteMessage`
```ts
const response = await sock.groupAcceptInviteV4(jid, groupInviteMessage)
console.log('joined to: ' + response)
```
### Get Request Join List
```ts
const response = await sock.groupRequestParticipantsList(jid)
console.log(response)
```
### Approve/Reject Request Join
```ts
const response = await sock.groupRequestParticipantsUpdate(
    jid, // group id
    ['abcd@s.whatsapp.net', 'efgh@s.whatsapp.net'],
    'approve' // or 'reject' 
)
console.log(response)
```
### Get All Participating Groups Metadata
```ts
const response = await sock.groupFetchAllParticipating()
console.log(response)
```
### Toggle Ephemeral

- Ephemeral can be:

| Time  | Seconds        |
|-------|----------------|
| Remove | 0          |
| 24h    | 86.400     |
| 7d     | 604.800    |
| 90d    | 7.776.000  |

```ts
await sock.groupToggleEphemeral(jid, 86400)
```

### Change Add Mode
```ts
await sock.groupMemberAddMode(
    jid,
    'all_member_add' // or 'admin_add'
)
```

### Update Member Label
- Updates a specific member's custom label/tag within a group.
```ts
await sock.updateMemberLabel(
    groupJid, // must be a group JID
    'VIP Member' // string label, maximum 30 characters
)
```

### Group Acknowledge
Send an explicit group acknowledgement stanza to WhatsApp:
```ts
await sock.groupAcknowledge(groupJid)
```

### Get Linked Participants
Get participants with their linked phone numbers in a group:
```ts
const linked = await sock.groupGetLinkedParticipants('123456789@g.us')
console.log(linked) // [{ jid: '1234@lid', phoneNumber: '+1234567890' }, ...]
```

### Join a Linked Group
Join a group linked to a parent group/community:
```ts
const result = await sock.groupJoinLinked('parent@g.us', 'linked@g.us')
console.log(result.approvalRequested) // true if admin approval is required
```

### Get Group Profile Pictures (Batch)
Fetch profile pictures for multiple JIDs at once:
```ts
const pics = await sock.getGroupProfilePictures(['jid1@g.us', 'jid2@g.us'])
for (const p of pics) {
    console.log(p.jid, p.url)
}
```

### Sub-Group Suggestions
Create and manage sub-group suggestions within a parent group:
```ts
// Suggest a sub-group
await sock.groupCreateSubGroupSuggestion('parent@g.us', { name: 'Design Team' })

// Approve or reject suggestions
await sock.groupSubGroupSuggestionsAction(
    'parent@g.us',
    'approve', // or 'reject' or 'cancel'
    [{ creator: '1234@s.whatsapp.net', jid: 'suggested@g.us' }]
)
```

## 👥 Group Status (`groupStatus`)
Post a message as a **group status update**. When `groupStatus: true` is set, the library:

1. Sets `contextInfo.isGroupStatus = true` on the inner message.
2. Wraps the entire message inside a `groupStatusMessageV2` envelope.

| Parameter      | Type      | Required | Description                        |
|---------------|-----------|----------|------------------------------------|
| `groupStatus` | `boolean` | No       | Set to `true` to post as a group status. |

**Returns:** The standard `WAMessage` object, with the content wrapped in `groupStatusMessageV2`.

**Text Status**
```ts
await sock.sendMessage(groupJid, {
    text: 'Hello World!',
    groupStatus: true
})
```

**Image Status**
```ts
await sock.sendMessage(groupJid, {
    image: { url: './photo.jpg' },
    caption: '👥 Group Status Update!',
    groupStatus: true
})
```

## 🏘️ Communities

Manage community groups — create groups within communities, link/unlink existing groups, and query linked groups.

### Create a Group Within a Community
```ts
const group = await sock.communityCreateGroup(
    'Design Team',
    ['1234@s.whatsapp.net', '5678@s.whatsapp.net'],
    'parent-community@g.us'
)
console.log('Created community group:', group.id)
```

### Link/Unlink Groups
```ts
// Link an existing group to a community
await sock.communityLinkGroup('group@g.us', 'community@g.us')

// Unlink a group from a community
await sock.communityUnlinkGroup('group@g.us', 'community@g.us')
```

### Fetch Linked Groups
```ts
const result = await sock.communityFetchLinkedGroups('community@g.us')
console.log(result.linkedGroups) // Array of linked group metadata
```

## 🔄 USync Protocols

USync protocols allow you to query user metadata in bulk. The new protocol extensions provide business info, feature flags, profile pictures, sidelist status, and text statuses.

```ts
import { USyncQuery, USyncUser } from '@innovatorssoft/baileys'

// Build a query with multiple protocols using the fluent API
const query = new USyncQuery()
    .withContext('interactive')
    .withBusinessProtocol()     // verified name, hours, address, catalog
    .withFeatureProtocol()      // device feature flags
    .withPictureProtocol()      // profile picture hash & direct path
    .withSidelistProtocol()     // LID sidelist sync
    .withTextStatusProtocol()   // about text & emoji status with TTL

// Add users to query
const user = new USyncUser()
user.withPhone('+1234567890')
query.withUser(user)

// Execute
const result = await sock.executeUSyncQuery(query)
console.log(result?.list) // Array of results per protocol
```

> [!NOTE]
> These protocols extend the existing USync infrastructure (`withLIDProtocol`, `withContactProtocol`, etc.) — all existing protocols remain available.

## 🔧 Advanced APIs

> [!WARNING]
> The following APIs interact with WhatsApp's internal infrastructure and are intended for advanced use. Behavior may change without notice as WhatsApp evolves its platform.

### Privacy Socket (MEX)

The privacy socket provides MEX-based operations for privacy settings, account management, trusted devices, and linked profiles.

```ts
// Get privacy settings via MEX
const settings = await sock.getPrivacySettings()

// Account operations
await sock.accountLogin({ ... })
await sock.accountLogout()

// Trusted devices
const devices = await sock.getTrustedDevices()
await sock.addTrustedDevice({ ... })
await sock.deleteTrustedDevice(deviceId)
```

### Registration Socket (MEX)

Advanced registration operations including passkeys and 2FA.

```ts
// Passkey operations
const hasPasskey = await sock.passkeyExists()
const challenge = await sock.passkeyRequestChallenge()

// Password (2FA) management
const hasPassword = await sock.hasPassword()
await sock.setPassword(password)
await sock.deletePassword()
```

### Interop Socket (EU DMA)

WhatsApp's interoperability layer for EU Digital Markets Act compliance. Availability depends on WhatsApp/Meta infrastructure and account eligibility.

```ts
// Query available third-party integrators
const integrators = await sock.getIntegrators()

// Interop group management
await sock.interopCreateGroup({ ... })
await sock.interopLeaveGroup(jid)
```

> [!IMPORTANT]
> Interop features require specific account eligibility and regional availability. These APIs may not function for all accounts.

### GraphQL Socket

Execute GraphQL queries against WhatsApp's backend services.

```ts
// Execute a WWW GraphQL query
const result = await sock.executeWWWGraphQL(queryId, variables)

// Execute a Facebook GraphQL query
const fbResult = await sock.executeFacebookGraphQL(queryId, variables)

// Execute a Wamo GraphQL query
const wamoResult = await sock.executeWamoGraphQL(queryId, variables)
```

### AI Groups

Create and manage AI-powered group chats. Also available as a standalone socket layer via `makeAIGroupsSocket(config)`:

```ts
import { makeAIGroupsSocket, extractAIGroupMetadata } from '@innovatorssoft/baileys'

// Create an AI group
const group = await sock.aiGroupCreate('AI Assistant', botJid)

// Add a bot to an existing AI group
await sock.aiGroupAddBot(groupJid, botJid)

// Leave an AI group
await sock.aiGroupLeave(groupJid)
```

### Bot Management

```ts
// Block/unblock a bot
await sock.blockBot('botJid@bot')
await sock.unblockBot('botJid@bot')

// Get a bot's profile information
const profile = await sock.getBotProfile('botJid@bot')
```

### Spam Reporting

```ts
await sock.reportSpam('spammer@s.whatsapp.net')
```

### Zenbo Interactive Handler

The `Zenbo` class provides a high-level builder for interactive messages including payments, products, albums, events, polls, and group stories.

```ts
import { Zenbo } from '@innovatorssoft/baileys'

// Zenbo requires socket internals — typically used within custom socket extensions
const zenbo = new Zenbo(waUploadToServer, relayMessage, config, sock)

// Build interactive buttons
const msg = await zenbo.handleInteractiveButtons({
    text: 'Choose an option',
    footer: 'Powered by Baileys',
    interactiveButtons: [
        { name: 'quick_reply', buttonParamsJson: { display_text: 'Option 1', id: 'opt1' } },
        { name: 'quick_reply', buttonParamsJson: { display_text: 'Option 2', id: 'opt2' } }
    ]
})

// Build product messages, payment messages, albums, events, poll results
const payment = await zenbo.handlePayment(paymentContent)
const product = await zenbo.handleProduct(productContent, jid)
const album = await zenbo.handleAlbum(albumContent, jid)
```

### Meta AI Compositing & Planning _(Experimental)_

These utilities help build Meta AI-style bot interactions with live reasoning/planning step indicators.

```ts
import {
    PlanningStepStatus,
    buildSteps,
    buildReasoningSteps,
    buildSearchSteps,
    sendMetaComposited,
    metaTyping
} from '@innovatorssoft/baileys'

// Build reasoning steps for a bot response
const steps = buildReasoningSteps(['Analyzing query...', 'Searching database...', 'Formatting response...'])

// Build search steps
const searchSteps = buildSearchSteps(['Searching web...', 'Reading articles...'])
```

> [!NOTE]
> Meta AI compositing features depend on WhatsApp's native bot rendering infrastructure. These are experimental and intended for advanced bot developers.

## 🔒 Privacy

### Block/Unblock User
```ts
await sock.updateBlockStatus(jid, 'block') // Block user
await sock.updateBlockStatus(jid, 'unblock') // Unblock user
```
### Get Privacy Settings
```ts
const privacySettings = await sock.fetchPrivacySettings(true)
console.log('privacy settings: ' + privacySettings)
```
### Get BlockList
```ts
const response = await sock.fetchBlocklist()
console.log(response)
```
### Update LastSeen Privacy
```ts
const value = 'all' // 'contacts' | 'contact_blacklist' | 'none'
await sock.updateLastSeenPrivacy(value)
```
### Update Online Privacy
```ts
const value = 'all' // 'match_last_seen'
await sock.updateOnlinePrivacy(value)
```
### Update Profile Picture Privacy
```ts
const value = 'all' // 'contacts' | 'contact_blacklist' | 'none'
await sock.updateProfilePicturePrivacy(value)
```
### Update Status Privacy
```ts
const value = 'all' // 'contacts' | 'contact_blacklist' | 'none'
await sock.updateStatusPrivacy(value)
```
### Update Read Receipts Privacy
```ts
const value = 'all' // 'none'
await sock.updateReadReceiptsPrivacy(value)
```
### Update Groups Add Privacy
```ts
const value = 'all' // 'contacts' | 'contact_blacklist'
await sock.updateGroupsAddPrivacy(value)
```
### Update Default Disappearing Mode

- Like [this](#disappearing-messages), ephemeral can be:

| Time  | Seconds        |
|-------|----------------|
| Remove | 0          |
| 24h    | 86.400     |
| 7d     | 604.800    |
| 90d    | 7.776.000  |

```ts
const ephemeral = 86400 
await sock.updateDefaultDisappearingMode(ephemeral)
```

## 📢 Broadcast Lists & Stories

### Send Broadcast & Stories
- Messages can be sent to broadcasts & stories. You need to add the following message options in sendMessage, like this:
```ts
await sock.sendMessage(
    jid,
    {
        image: {
            url: url
        },
        caption: caption
    },
    {
        backgroundColor: backgroundColor,
        font: font,
        statusJidList: statusJidList,
        broadcast: true
    }
)
```
- Message body can be a `extendedTextMessage` or `imageMessage` or `videoMessage` or `voiceMessage`
- You can add `backgroundColor` and other options in the message options
- `broadcast: true` enables broadcast mode
- `statusJidList`: a list of people that you can get which you need to provide, which are the people who will get this status message.

- You can send messages to broadcast lists the same way you send messages to groups & individual chats.
- Right now, WA Web does not support creating broadcast lists, but you can still delete them.
- Broadcast IDs are in the format `12345678@broadcast`
### Query a Broadcast List's Recipients & Name
```ts
const bList = await sock.getBroadcastListInfo('1234@broadcast')
console.log (`list name: ${bList.name}, recps: ${bList.recipients}`)
```

### Status / Story Posting

Post rich text, image, video, and audio statuses easily using `StatusHelper`.

> [!IMPORTANT]
> - **Multi-Device mode**: Statuses sent to `status@broadcast` are only visible to contacts included in the `statusJidList`.
> - **Groups**: You can now send statuses directly to group JIDs by including them in the `jidList`.
> `StatusHelper.send()` handles both cases automatically.

```ts
import { 
    StatusHelper, 
    STATUS_BACKGROUNDS,
    STATUS_FONTS
} from '@innovatorssoft/baileys'

// JIDs of contacts or groups who should see the status
const jidList = [
    '12345@s.whatsapp.net', // Individual contact
    '12036302@g.us'         // Group status! 🚀
]
```

### Text Status

You can use the built-in background colors and fonts.

```ts
// 1. A simple text status on a green background
const status = StatusHelper.text('Hello World! 🌍', STATUS_BACKGROUNDS.solid.purple)
await StatusHelper.send(sock, status, jidList)

// 2. A fully customized text status
import { createTextStatus } from '@innovatorssoft/baileys'

const customStatus = createTextStatus({
    text: 'Custom styled status!',
    backgroundColor: STATUS_BACKGROUNDS.gradient.sunset[0],
    font: STATUS_FONTS.DANCING,
    textColor: '#FFFFFF'
})
await StatusHelper.send(sock, customStatus, jidList)
```

### Media Status

Generate and send media statuses with captions.

```ts
// Image Status
const imageBuffer = fs.readFileSync('./my-photo.jpg')
await StatusHelper.send(sock, StatusHelper.image(imageBuffer, 'Beautiful day! ☀️'), jidList)

// Video Status
const videoBuffer = fs.readFileSync('./my-video.mp4')
await StatusHelper.send(sock, StatusHelper.video(videoBuffer, 'Check this out! 🎬'), jidList)

// GIF Status (Video played on loop without sound)
await StatusHelper.send(sock, StatusHelper.gif(gifBuffer, 'Animated! 🎭'), jidList)

// Voice Note / Audio Status
await StatusHelper.send(sock, StatusHelper.voiceNote(audioBuffer), jidList)
```

## 💻 Writing Custom Functionality
Baileys is written with custom functionality in mind.
Instead of forking the project & re-writing the internals, you can simply write your own extensions.

### Enabling Debug Level in Baileys Logs
First, enable the logging of unhandled messages from WhatsApp by setting:
```ts
const sock = makeWASocket({
    logger: P({ level: 'debug' }),
})
```

## Acknowledgements

- [Original baileys](https://github.com/WhiskeySockets/baileys)
- [VoIP WebAssembly Call Stack by SheIITear (baileys-caller)](https://github.com/SheIITear/baileys-caller)
- [Special thanks to](https://github.com/Itsukichann/Baileys)
- [Follow Innovators Soft](https://facebook.com/innovatorssoft)

---
# Support the Project

> **NOTE**
>
> **This project is completely free and open-source. If it saved you time or helped your business, consider supporting us!**

[![Support on Patreon](https://img.shields.io/badge/Support-Patreon-FF424D?style=for-the-badge&logo=patreon&logoColor=white)](https://patreon.com/innovatorssoft7)


</details>

---

## 🙏 Acknowledgements

- [Original Baileys](https://github.com/WhiskeySockets/baileys)
- [Special thanks to](https://github.com/Itsukichann/Baileys)
- [Follow Innovators Soft](https://facebook.com/innovatorssoft)

---

# Support the Project

> **NOTE**
>
> **This project is completely free and open-source. If it saved you time or helped your business, consider supporting us!**

[![Support on Patreon](https://img.shields.io/badge/Support-Patreon-FF424D?style=for-the-badge&logo=patreon&logoColor=white)](https://patreon.com/innovatorssoft7)

---
