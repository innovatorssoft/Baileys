const { makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    RichSubMessageType,
    captureUnifiedResponse,
    sendUnifiedResponse,
    sendRichHtml,
    encryptedStream,
    getUrlFromDirectPath,
    renderLatexToPng,
    prepareWAMessageMedia,
    uploadUnencryptedToWA,
    generateWAMessageFromContent }
    = require('../../lib/index.js');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createSamplePage } = require('./page.js');
const { createSnakePage } = require('./snake.js');
const { createLivePage } = require('./live_page.js');
const { createSlotsPage } = require('./slots.js');

async function startBot() {
    const authDir = path.join(__dirname, 'auth');

    // Check if clean flag is passed to reset the session
    if (process.argv.includes('--clean')) {
        console.log('Cleaning old auth session directory...');
        if (fs.existsSync(authDir)) {
            fs.rmSync(authDir, { recursive: true, force: true });
            console.log('Old session cleared successfully.');
        } else {
            console.log('No existing session directory found to clean.');
        }
    }

    console.log('Initializing connection...');

    // Setup authentication state
    const { state, saveCreds } = await useMultiFileAuthState(authDir);

    // Check if phone number is passed as an argument for pairing code instead of QR
    const usePairingCode = process.argv.includes('--phone');
    const phoneIndex = process.argv.indexOf('--phone');
    const phoneNumber = usePairingCode && phoneIndex !== -1 ? process.argv[phoneIndex + 1] : null;

    const sock = makeWASocket({
        auth: state,
        syncFullHistory: false,
        logger: require('pino')({ level: 'silent' }),
        markOnlineOnConnect: true
    });

    const uploadToWA = async (buffer, type) => {
        // Encrypt the raw buffer using the library's built-in helper
        const encryptionResult = await encryptedStream(buffer, 'image');
        const fileEncSha256B64 = encryptionResult.fileEncSha256.toString('base64');

        // Upload the encrypted file to WhatsApp servers
        const uploadResult = await sock.waUploadToServer(encryptionResult.encFilePath, {
            mediaType: 'image',
            fileEncSha256B64
        });

        // Clean up the temp encrypted file
        try {
            await fs.promises.unlink(encryptionResult.encFilePath);
        } catch (err) {
            console.error('Failed to delete temp encrypted file:', err);
        }

        return {
            url: uploadResult.mediaUrl || getUrlFromDirectPath(uploadResult.directPath),
            directPath: uploadResult.directPath
        };
    };


    // Handle pairing code registration if requested
    if (usePairingCode && phoneNumber && !state.creds.registered) {
        setTimeout(async () => {
            try {
                const code = await sock.requestPairingCode(phoneNumber.replace(/[^0-9]/g, ''));
                console.log('\n======================================');
                console.log(`PAIRING CODE: ${code}`);
                console.log('======================================\n');
            } catch (err) {
                console.error('Failed to request pairing code:', err);
            }
        }, 3000);
    }

    sock.ev.on('creds.update', saveCreds);

    // Register MEX Notification Dispatcher Event Listeners
    sock.ev.on('messaging-history.status', ({ syncType, status, explicit }) => {
        console.log(`[messaging-history.status] History sync status: ${status} (${syncType}) explicit=${explicit}`);
    });

    sock.ev.on('message-capping.update', ({ used_quota, total_quota }) => {
        console.log(`[message-capping.update] Message quota used: ${used_quota}/${total_quota}`);
    });

    sock.ev.on('lid-mapping.update', ({ lid, pn }) => {
        console.log(`[lid-mapping.update] LID: ${lid} mapped to PN: ${pn}`);
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr, reachoutTimeLock } = update;

        if (reachoutTimeLock?.isActive) {
            console.log(`[Reachout TimeLock] Restricted until: ${reachoutTimeLock.timeEnforcementEnds}`);
        }

        if (qr && !usePairingCode) {
            console.log('Scan the QR code below to connect:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed due to:', lastDisconnect?.error, '. Reconnecting:', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            } else {
                console.log('Logged out. Please delete the "auth" directory and scan again.');
            }
        } else if (connection === 'open') {
            console.log('\n======================================');
            console.log('WhatsApp Bot is successfully connected!');
            console.log('======================================\n');
        }
    });

    // Listen to messages
    sock.ev.on('messages.upsert', async (update) => {
        /*
        console.log(" \n")
        console.log("Update : ", require('util').inspect(update, { depth: null, colors: true }))
        console.log(" \n")
        console.log(`[messages.upsert] Event received. Type: ${update.type}, Messages count: ${update.messages?.length || 0}`);
        */

        try {
            if (!update.messages?.length) return;

            for (const message of update.messages) {
                const isFromMe = message.key?.fromMe;
                const remoteJid = message.key?.remoteJid;
                const messageKeys = Object.keys(message.message || {});
                console.log(` -> Msg: fromMe=${isFromMe}, JID=${remoteJid}, Keys=[${messageKeys.join(', ')}]`);
            }

            if (update.type !== 'notify') return;
            const [message] = update.messages;
            if (!message || message.key?.fromMe) return;

            // 🚫 Ignore all protocol messages (history sync, security notifications, app state sync, deleted messages, etc.)
            if (message.message?.protocolMessage) return;

            const msgContent = message.message || {};
            const jid = message.key.remoteJidAlt || message.key.remoteJid;
            if (!jid) return;

            // Helper to normalize JIDs (e.g., removing device sub-IDs)
            const normalizeJid = (id) => {
                if (!id) return '';
                if (id.includes(':')) {
                    const [user, host] = id.split('@');
                    const [userId] = user.split(':');
                    return `${userId}@${host}`;
                }
                return id;
            };

            const normalizedJid = normalizeJid(jid);

            const getText = () =>
                msgContent.conversation ||
                msgContent.extendedTextMessage?.text ||
                msgContent.imageMessage?.caption ||
                msgContent.videoMessage?.caption ||
                '';

            const getButtonText = () => {
                if (msgContent.listResponseMessage)
                    return msgContent.listResponseMessage.title || msgContent.listResponseMessage.description || '';
                if (msgContent.templateButtonReplyMessage)
                    return msgContent.templateButtonReplyMessage.selectedDisplayText || msgContent.templateButtonReplyMessage.selectedId || '';
                if (msgContent.buttonsResponseMessage)
                    return msgContent.buttonsResponseMessage.selectedDisplayText || msgContent.buttonsResponseMessage.selectedButtonId || '';
                if (msgContent.interactiveResponseMessage) {
                    const i = msgContent.interactiveResponseMessage;
                    return i.listResponse?.title ||
                        i.listResponse?.description ||
                        i.nativeFlowResponse?.response?.reply ||
                        i.reply ||
                        i.buttonReplyMessage?.displayText || '';
                }
                return '';
            };

            const text = (getText() || getButtonText() || '').trim();
            if (!text.startsWith('!')) return;

            const command = text.split(' ')[0].toLowerCase();
            const args = text.slice(command.length).trim();

            console.log(`[Command Received] ${command} from ${normalizedJid}`);

            switch (command) {
                case '!ping': {
                    await sock.sendMessage(normalizedJid, { text: 'pong! 🏓' }, { quoted: message });
                    break;
                }
                case '!table': {
                    await sock.sendTable(normalizedJid, 'Developer Team Metrics', ['Name', 'Role', 'Status', 'Tasks Completed'], [
                        ['Member 1', 'Frontend Lead', 'Active', '45'],
                        ['Member 2', 'Rust WASM Dev', 'Coding', '89'],
                        ['Member 3', 'QA Engineer', 'Testing', '23'],
                        ['Member 4', 'Product Owner', 'Meeting', '12']
                    ], message, {
                        headerText: 'Here is the current team status table:',
                        footer: 'Generated automatically by Innovators Baileys V2 Bot.'
                    });
                    break;
                }
                case '!list': {
                    await sock.sendList(normalizedJid, 'Interactive Help Menu', [
                        '!ping         - Simple ping test',
                        '!table        - Show a sample rich table',
                        '!list         - Show this help list',
                        '!markdown     - Show a rich markdown response',
                        '!code         - Show a code snippet in JS or Python',
                        '!lateximage   - Send a single LaTeX image',
                        '!latexinlineimage - Send LaTeX inline images (album)',
                        '!rich         - Show a mixed content message',
                        '!buttons      - Send interactive buttons',
                        '!template     - Send a template button message',
                        '!interact     - Send interactive quick replies',
                        '!sections     - Send traditional section list',
                        '!share        - Share phone number',
                        '!request      - Request phone number',
                        '!ai           - Send a message with Meta AI icon',
                        '!capture      - Capture a message text to buffer',
                        '!sendcaptured - Send all captured buffered messages',
                        '!linkpreview  - Send a link with custom preview',
                        '!checkusername - Check if a username is available',
                        '!setusername  - Set your username',
                        '!deleteusername - Delete your current username',
                        '!myusername   - Retrieve your current username',
                        '!setpin       - Set or delete username PIN',
                        '!findusername - Find a user JID by username',
                        '!fetchusernames - Fetch usernames of JIDs',
                        '!carousel     - Send an interactive carousel message',
                        '!mediabuttons - Send buttons with media & sections',
                        '!label        - Send text with secure Meta service label',
                        '!spoiler      - Send an image with spoiler wrapping',
                        '!lottie       - Send a sticker with isLottie enabled',
                        '!groupstatus  - Send status update wrapped for group',
                        '!mentionall   - Mention all group participants',
                        '!viewonce     - Send image as view-once V1',
                        '!viewoncev2   - Send image as view-once V2',
                        '!viewonceext  - Send image as view-once V2 Ext',
                        '!interactivemsg - Send custom interactive buttons (text, image, or location)',
                        '!call         - Place a voice call and stream audio',
                        '!html         - Send interactive rich HTML UI card (GenAI HTML)',
                        '!snake        - Play CyberSnake HTML5 Canvas Game (GenAI HTML)',
                        '!slots        - Play Fruit Bonanza Slots Game (GenAI HTML)',
                        '!page         - Show interactive CyberPulse GenAI sample page (HTML/CSS/JS)',
                        '!tikdown      - Render live TikDown web app from public URL (GenAI HTML)',
                        '!livepage     - Render any public web page (e.g. !livepage https://...) (GenAI HTML)'
                    ], message, {
                        headerText: 'Available commands:',
                        footer: 'Type any of these commands to test.'
                    });
                    break;
                }
                case '!code': {
                    const defaultCode = `// Fetch profile details\nconst user = await sock.findUserByUsername('user');\nif (user) {\n    console.log(\`JID: \${user.jid}\`);\n}`;
                    const pythonCode = `# Quick Python Example\ndef greet(name):\n    print(f"Hello, {name}!")\n\ngreet("User")`;

                    const language = args.toLowerCase() === 'python' ? 'python' : 'javascript';
                    const codeToSend = language === 'python' ? pythonCode : defaultCode;

                    await sock.sendCodeBlock(normalizedJid, codeToSend, message, {
                        language,
                        title: `Sample Code (${language})`,
                        footer: 'Syntax highlighted by WhatsApp Meta AI engine.'
                    });
                    break;
                }
                case '!markdown': {
                    const mdText = '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n\n___\n\n> To use a horizontal line, you need to have two "\\n" above and below the "___"\n==Highlighted text==\n# By the way, ^you^ can _mix_ ==multiple markdowns== for a **richer response**\n🔗 [Click here to visit Google](https://google.com)\n🔗 [GitHub Repository](https://github.com/innovatorssoft/Baileys)\n###### Try different combinations... ';
                    await sock.sendMarkdown(normalizedJid, mdText, message);
                    break;
                }
                case '!lateximage': {
                    try {
                        const result = await sock.sendLatexImage(
                            normalizedJid,
                            message,
                            {
                                formula: 'E=mc^2',
                                caption: 'Mass-Energy Equivalence (DPI 600)'
                            }
                        );
                        //console.log('LaTeX Image Payload:', JSON.stringify(result, null, 2));
                    } catch (error) {
                        console.error('Error in !lateximage:', error);
                    }
                    break;
                }

                case '!latexinlineimage': {
                    try {
                        const result = await sock.sendLatexInlineImage(
                            normalizedJid,
                            message,
                            {
                                expressions: [
                                    { latexExpression: 'e^{i\\pi} + 1 = 0' },
                                    { latexExpression: '\\int_a^b x^2 \\, dx = \\frac{b^3 - a^3}{3}' },
                                    { latexExpression: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x-a)^n' }
                                ],
                                caption: true // Use each LaTeX expression as the caption for its respective image in the album
                            }
                        );
                        //console.log('LaTeX Inline Image Payload:', JSON.stringify(result, null, 2));
                    } catch (error) {
                        console.error('Error in !latexinlineimage:', error);
                    }
                    break;
                }
                case '!rich': {
                    const richLatexExpr = 'E = mc^2';
                    const richPngBuf = await renderLatexToPng(richLatexExpr);
                    const richImageUrl = (await uploadUnencryptedToWA(richPngBuf.buffer, sock.waUploadToServer)).url;

                    await sock.sendRichMessage(normalizedJid, [
                        {
                            messageType: RichSubMessageType.TEXT,
                            messageText: '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n\n___\n\n> To use a horizontal line, you need to have two "\\n" above and below the "___"\n==Highlighted text==\n# By the way, ^you^ can _mix_ ==multiple markdowns== for a **richer response**\n###### Try different combinations...'
                        },
                        {
                            messageType: RichSubMessageType.TABLE,
                            tableMetadata: {
                                title: 'Product Prices',
                                rows: [
                                    { items: ['Product', 'Price', 'Stock'], isHeading: true },
                                    { items: ['Innovators Baileys Pro', '$49.99', 'In Stock'] },
                                    { items: ['Rust WASM Plugin', '$19.99', 'Low Stock'] }
                                ]
                            }
                        },
                        {
                            messageType: RichSubMessageType.TEXT,
                            messageText: 'LaTeX Formula:'
                        },
                        {
                            messageType: RichSubMessageType.INLINE_IMAGE,
                            imageMetadata: {
                                imageUrl: {
                                    imagePreviewUrl: richImageUrl,
                                    imageHighResUrl: richImageUrl
                                },
                                imageText: richLatexExpr,
                                alignment: 2
                            }
                        },
                        {
                            messageType: RichSubMessageType.CODE,
                            codeMetadata: {
                                codeLanguage: 'javascript',
                                codeBlocks: [
                                    { highlightType: 1, codeContent: 'const ' },
                                    { highlightType: 0, codeContent: 'price = ' },
                                    { highlightType: 4, codeContent: '49.99' },
                                    { highlightType: 0, codeContent: ';\n' },
                                    { highlightType: 1, codeContent: 'if ' },
                                    { highlightType: 0, codeContent: '(price > ' },
                                    { highlightType: 4, codeContent: '20' },
                                    { highlightType: 0, codeContent: ') {\n    console.log(' },
                                    { highlightType: 3, codeContent: '"Premium tier"' },
                                    { highlightType: 0, codeContent: ');\n}' }
                                ]
                            }
                        }
                    ], message, { useMarkdown: true });
                    break;
                }
                case '!buttons': {
                    await sock.sendMessage(normalizedJid, {
                        buttons: [
                            { buttonId: 'btn1', buttonText: { displayText: 'Option 1' }, type: 1 },
                            { buttonId: 'btn2', buttonText: { displayText: 'Option 2' }, type: 1 }
                        ],
                        text: 'Pick an option:',
                        footer: 'Powered by Innovators Baileys'
                    }, { quoted: message });
                    break;
                }
                case '!template': {
                    await sock.sendMessage(normalizedJid, {
                        templateButtons: [
                            { text: '🌐 Visit Link', url: 'https://github.com/innovatorssoft/baileys' },
                            { text: '📞 Call Support', call: '+91XXXXXXXXXX' },
                            { text: '👋🏻 Quick Reply', id: 'id1' }
                        ],
                        text: 'Template message body example:',
                        footer: 'Powered by Innovators Baileys'
                    }, { quoted: message });
                    break;
                }
                case '!interact': {
                    try {
                        await sock.sendMessage(normalizedJid, {
                            interactiveButtons: [
                                { text: '👋🏻 Greeting', id: '#Greeting' },
                                { text: '📋 Copy Code', copy: '@innovatorssoft/baileys' },
                                { text: '🌐 Source', url: 'https://github.com/innovatorssoft/baileys' }
                            ],
                            body: { text: 'Are you sure you want to proceed?' },
                            footer: { text: 'Innovators Baileys interactive' }
                        }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!sections': {
                    await sock.sendMessage(normalizedJid, {
                        sections: [
                            {
                                title: 'Section 1',
                                rows: [
                                    { title: 'Row 1', rowId: 'r1', description: 'Description for row 1' },
                                    { title: 'Row 2', rowId: 'r2', description: 'Description for row 2' }
                                ]
                            }
                        ],
                        title: 'Interactive Sections List',
                        text: 'List body text here',
                        footer: 'Innovators Baileys footer',
                        buttonText: 'Open List Options'
                    }, { quoted: message });
                    break;
                }
                case '!share': {
                    await sock.sendMessage(normalizedJid, { sharePhoneNumber: true }, { quoted: message });
                    break;
                }
                case '!request': {
                    await sock.sendMessage(normalizedJid, { requestPhoneNumber: true }, { quoted: message });
                    break;
                }
                case '!ai': {
                    await sock.sendMessage(normalizedJid, { text: 'Hello! I am replying with the Meta AI bot icon attached.' }, { ai: true, quoted: message });
                    break;
                }
                case '!capture': {
                    if (!args) {
                        await sock.sendMessage(normalizedJid, { text: 'Please specify the message text to capture. Usage: !capture <text>' }, { quoted: message });
                        break;
                    }
                    captureUnifiedResponse(normalizedJid, { text: args }, { quoted: message });
                    await sock.sendMessage(normalizedJid, { text: `Successfully captured message: "${args}". Type !sendcaptured to broadcast all captured responses.` }, { quoted: message });
                    break;
                }
                case '!sendcaptured': {
                    await sock.sendMessage(normalizedJid, { text: 'Sending all captured responses...' }, { quoted: message });
                    await sendUnifiedResponse(sock.sendMessage.bind(sock));
                    break;
                }
                case '!linkpreview': {
                    try {
                        const urlA = 'https://github.com/innovatorssoft/baileys';
                        const logoPath = path.join(__dirname, 'logo.png');
                        const faviconPath = path.join(__dirname, 'favicon.png');

                        await sock.sendMessage(normalizedJid, { text: 'Sending standard link preview...' }, { quoted: message });

                        // --- Send a text message with a link preview
                        await sock.sendMessage(normalizedJid, {
                            text: urlA + ' 👆🏻 Check it out!',
                            linkPreview: {
                                'matched-text': urlA,
                                title: '🌱 @innovatorssoft/baileys',
                                description: 'Modified Baileys Fork',
                                previewType: 0, // --- Use 1 for video playback in the link preview
                                jpegThumbnail: fs.readFileSync(logoPath)
                            }
                        }, { quoted: message });

                        await sock.sendMessage(normalizedJid, { text: 'Sending large link preview with favicon...' }, { quoted: message });

                        const urlB = 'https://github.com/innovatorssoft/baileys#readme';

                        const { imageMessage: image } = await prepareWAMessageMedia({
                            image: {
                                url: logoPath
                            }
                        }, {
                            upload: sock.waUploadToServer,
                            mediaTypeOverride: 'thumbnail-link'
                        });

                        // --- Set the thumbnail display size
                        image.height = 720;
                        image.width = 480;

                        await sock.sendMessage(normalizedJid, {
                            text: urlB + ' 👆🏻 Check it out!',
                            linkPreview: {
                                'matched-text': urlB,
                                title: '🌱 @innovatorssoft/baileys',
                                description: 'Modified Baileys Fork',
                                previewType: 0,
                                jpegThumbnail: fs.readFileSync(logoPath),
                                highQualityThumbnail: image,
                                linkPreviewMetadata: {
                                    linkMediaDuration: 0,
                                    socialMediaPostType: 1, // --- Enum: 0 = NONE, 1 = REEL, 2 = LIVE_VIDEO, 3 = LONG_VIDEO, 4 = SINGLE_IMAGE, 5 = CAROUSEL
                                }
                            },
                            favicon: {
                                url: faviconPath
                            }
                        }, { quoted: message });

                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error sending link preview: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!checkusername': {
                    if (!args) {
                        await sock.sendMessage(normalizedJid, { text: 'Usage: !checkusername <username>' }, { quoted: message });
                        break;
                    }
                    try {
                        const check = await sock.checkUsername(args);
                        if (check.available) {
                            await sock.sendMessage(normalizedJid, { text: `✅ @${check.username} is available!` }, { quoted: message });
                        } else {
                            let text = `❌ @${check.username} is taken.\n`;
                            if (check.suggestions?.length) {
                                text += `Suggestions: ${check.suggestions.join(', ')}\n`;
                            }
                            if (check.rejectionReasons?.length) {
                                text += `Reasons: ${check.rejectionReasons.join(', ')}`;
                            }
                            await sock.sendMessage(normalizedJid, { text: text.trim() }, { quoted: message });
                        }
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error checking username: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!setusername': {
                    if (!args) {
                        await sock.sendMessage(normalizedJid, { text: 'Usage: !setusername <username> [pin]' }, { quoted: message });
                        break;
                    }
                    const [uname, pin] = args.split(' ');
                    try {
                        await sock.setUsername(uname, pin ? { pin } : undefined);
                        await sock.sendMessage(normalizedJid, { text: `✅ Username set to @${uname}${pin ? ' protected with PIN ' + pin : ''}!` }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error setting username: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!deleteusername': {
                    try {
                        await sock.deleteUsername();
                        await sock.sendMessage(normalizedJid, { text: `✅ Username deleted successfully!` }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error deleting username: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!myusername': {
                    try {
                        const username = await sock.getMyUsername();
                        if (username) {
                            await sock.sendMessage(normalizedJid, { text: `Your username: @${username}` }, { quoted: message });
                        } else {
                            await sock.sendMessage(normalizedJid, { text: `You don't have a username set.` }, { quoted: message });
                        }
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error getting username: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!setpin': {
                    if (!args) {
                        await sock.sendMessage(normalizedJid, { text: 'Usage: !setpin <pin|delete>' }, { quoted: message });
                        break;
                    }
                    try {
                        const pin = args === 'delete' ? null : args;
                        await sock.setUsernamePin(pin);
                        await sock.sendMessage(normalizedJid, { text: pin ? `✅ Pin set to ${pin}` : `✅ Pin deleted` }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error setting pin: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!findusername': {
                    if (!args) {
                        await sock.sendMessage(normalizedJid, { text: 'Usage: !findusername <username> [pin]' }, { quoted: message });
                        break;
                    }
                    const [uname, pin] = args.split(' ');
                    try {
                        const result = await sock.findUserByUsername(uname, pin);
                        if (result) {
                            const contactNote = result.contact ? ' (in your contacts)' : ' (not in your contacts)';
                            await sock.sendMessage(normalizedJid, { text: `🔍 Found user${contactNote}!\nJID: ${result.jid}` }, { quoted: message });
                        } else {
                            await sock.sendMessage(normalizedJid, { text: `❌ User @${uname} not found or not on WhatsApp.` }, { quoted: message });
                        }
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error finding user: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!fetchusernames': {
                    if (!args) {
                        await sock.sendMessage(normalizedJid, { text: 'Usage: !fetchusernames <jid1> [jid2] ...' }, { quoted: message });
                        break;
                    }
                    const jids = args.split(' ');
                    try {
                        const results = await sock.fetchContactUsernames(...jids);
                        let responseText = '📋 Username Fetch Results:\n';
                        for (const res of results) {
                            responseText += `• ${res.id} -> ${res.username || '(no username)'}\n`;
                        }
                        await sock.sendMessage(normalizedJid, { text: responseText.trim() }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error fetching usernames: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!carousel': {
                    try {
                        const logoPath = path.join(__dirname, 'logo.png');
                        await sock.sendMessage(normalizedJid, {
                            text: '🗂️ Interactive with Carousel!',
                            footer: 'Innovators Baileys V2 Carousel',
                            cards: [
                                {
                                    image: { url: logoPath },
                                    caption: '🖼️ Image 1',
                                    footer: '🏷️ Pinterest',
                                    nativeFlow: [{
                                        text: '🌐 Source',
                                        url: 'https://github.com/innovatorssoft/baileys',
                                        useWebview: true
                                    }]
                                },
                                {
                                    image: { url: logoPath },
                                    caption: '🖼️ Image 2',
                                    footer: '🏷️ Pinterest',
                                    offerText: '🏷️ New Coupon!',
                                    offerCode: '@innovatorssoft/baileys',
                                    offerUrl: 'https://github.com/innovatorssoft/baileys',
                                    offerExpiration: Date.now() + 3600000,
                                    nativeFlow: [{
                                        text: '🌐 Source',
                                        url: 'https://github.com/innovatorssoft/baileys'
                                    }]
                                },
                                {
                                    image: { url: logoPath },
                                    caption: '🖼️ Image 3',
                                    footer: '🏷️ Pinterest',
                                    optionText: '👉🏻 Select Options',
                                    optionTitle: '👉🏻 Select Options',
                                    offerText: '🏷️ New Coupon!',
                                    offerCode: '@innovatorssoft/baileys',
                                    offerUrl: 'https://github.com/innovatorssoft/baileys',
                                    offerExpiration: Date.now() + 3600000,
                                    nativeFlow: [
                                        {
                                            text: '🛒 Product',
                                            id: '#Product',
                                            icon: 'default'
                                        },
                                        {
                                            text: '🌐 Source',
                                            url: 'https://github.com/innovatorssoft/baileys'
                                        }
                                    ]
                                }
                            ]
                        }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!mediabuttons': {
                    try {
                        const logoPath = path.join(__dirname, 'logo.png');
                        await sock.sendMessage(normalizedJid, {
                            image: { url: logoPath },
                            caption: '👆🏻 Buttons and Native Flow!',
                            footer: 'Innovators Baileys V2',
                            buttons: [
                                {
                                    text: '👋🏻 Rating',
                                    id: '#Rating'
                                },
                                {
                                    text: '📋 Select',
                                    sections: [
                                        {
                                            title: '✨ Section 1',
                                            rows: [{
                                                header: '',
                                                title: '💭 Secret Ingredient',
                                                description: '',
                                                id: '#SecretIngredient'
                                            }]
                                        },
                                        {
                                            title: '✨ Section 2',
                                            highlight_label: '🔥 Popular',
                                            rows: [{
                                                header: '',
                                                title: '🏷️ Coupon',
                                                description: '',
                                                id: '#CouponCode'
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!label': {
                    try {
                        await sock.sendMessage(normalizedJid, {
                            text: '🏷️ Message sent with secureMetaServiceLabel!',
                            secureMetaServiceLabel: true
                        }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!spoiler': {
                    try {
                        const logoPath = path.join(__dirname, 'logo.png');
                        await sock.sendMessage(normalizedJid, {
                            image: { url: logoPath },
                            caption: '❔ Spoiler Image',
                            spoiler: true
                        }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!lottie': {
                    try {
                        const faviconPath = path.join(__dirname, 'favicon.png');
                        await sock.sendMessage(normalizedJid, {
                            sticker: { url: faviconPath },
                            isLottie: true
                        }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!groupstatus': {
                    try {
                        if (!normalizedJid.endsWith('@g.us')) {
                            await sock.sendMessage(normalizedJid, { text: '❌ This command can only be used in group chats!' }, { quoted: message });
                            break;
                        }
                        const logoPath = path.join(__dirname, 'logo.png');
                        await sock.sendMessage(normalizedJid, {
                            image: { url: logoPath },
                            caption: '👥 Group Status Update!',
                            groupStatus: true
                        });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!mentionall': {
                    try {
                        if (!normalizedJid.endsWith('@g.us')) {
                            await sock.sendMessage(normalizedJid, { text: '❌ This command can only be used in group chats!' }, { quoted: message });
                            break;
                        }
                        await sock.sendMessage(normalizedJid, {
                            text: '📢 Mentioning all group participants using the mentionAll option!',
                            mentionAll: true
                        }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!viewonce': {
                    try {
                        const logoPath = path.join(__dirname, 'logo.png');
                        await sock.sendMessage(normalizedJid, {
                            image: { url: logoPath },
                            caption: '👁️ View Once message (V1)',
                            viewOnce: true
                        }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!viewoncev2': {
                    try {
                        const logoPath = path.join(__dirname, 'logo.png');
                        await sock.sendMessage(normalizedJid, {
                            image: { url: logoPath },
                            caption: '👁️ View Once V2 message',
                            viewOnceV2: true
                        }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!viewonceext': {
                    try {
                        const logoPath = path.join(__dirname, 'logo.png');
                        await sock.sendMessage(normalizedJid, {
                            image: { url: logoPath },
                            caption: '👁️ View Once V2 Extension message',
                            viewOnceV2Extension: true
                        }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!interactivemsg': {
                    try {
                        const logoPath = path.join(__dirname, 'logo.png');
                        const subcommand = args.toLowerCase().trim();

                        if (subcommand === 'image') {
                            await sock.sendMessage(normalizedJid, {
                                image: { url: logoPath },
                                caption: 'This is an Interactive Message with an Image Header!',
                                title: 'Interactive Image',
                                subtitle: 'Image Subtitle',
                                footer: 'Innovators Baileys V2',
                                interactiveButtons: [
                                    {
                                        name: 'quick_reply',
                                        buttonParamsJson: JSON.stringify({
                                            display_text: 'Click Me!',
                                            id: 'img_click_id'
                                        })
                                    }
                                ],
                                hasMediaAttachment: true
                            }, { quoted: message });
                        }
                        else if (subcommand === 'location') {
                            await sock.sendMessage(normalizedJid, {
                                location: {
                                    degreesLatitude: -6.200000,
                                    degreesLongitude: 106.816666,
                                    name: 'InnovatorsSoft HQ'
                                },
                                caption: 'This is an Interactive Message with a Location Header!',
                                title: 'HQ Location',
                                subtitle: 'Jakarta, Indonesia',
                                footer: 'Innovators Baileys V2',
                                interactiveButtons: [
                                    {
                                        name: 'quick_reply',
                                        buttonParamsJson: JSON.stringify({
                                            display_text: 'View Website',
                                            id: 'loc_click_id'
                                        })
                                    }
                                ]
                            }, { quoted: message });
                        }
                        else {
                            await sock.sendMessage(normalizedJid, {
                                text: 'This is a text-based Interactive message showing all native flow buttons!',
                                title: 'Native Flow Showcase',
                                subtitle: 'Subtitle Example',
                                footer: 'Powered by Innovators Baileys V2',
                                interactiveButtons: [
                                    {
                                        name: 'quick_reply',
                                        buttonParamsJson: JSON.stringify({
                                            display_text: 'Quick Reply',
                                            id: 'qr_test_id'
                                        })
                                    },
                                    {
                                        name: 'cta_url',
                                        buttonParamsJson: JSON.stringify({
                                            display_text: 'Follow Channel',
                                            url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y',
                                            merchant_url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y'
                                        })
                                    },
                                    {
                                        name: 'cta_copy',
                                        buttonParamsJson: JSON.stringify({
                                            display_text: 'Copy Coupon',
                                            copy_code: 'INNOVATORS_PRO_50'
                                        })
                                    },
                                    {
                                        name: 'cta_call',
                                        buttonParamsJson: JSON.stringify({
                                            display_text: 'Call Hotline',
                                            phone_number: '+1234567890'
                                        })
                                    },
                                    {
                                        name: 'galaxy_message',
                                        buttonParamsJson: JSON.stringify({
                                            mode: 'published',
                                            flow_message_version: '3',
                                            flow_token: '1:1307913409923914:293680f87029f5a13d1ec5e35e718af3',
                                            flow_id: '1307913409923914',
                                            flow_cta: 'Open Flows Survey',
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
                                            title: 'Open Options List',
                                            sections: [
                                                {
                                                    title: 'Available Services',
                                                    highlight_label: '🔥 Highly Recommended',
                                                    rows: [
                                                        {
                                                            header: 'Service A',
                                                            title: 'Innovators Baileys Fork',
                                                            description: 'Custom features & stability fixes',
                                                            id: 'service_baileys_id'
                                                        },
                                                        {
                                                            header: 'Service B',
                                                            title: 'Rust Integration',
                                                            description: 'High-performance messaging pipeline',
                                                            id: 'service_rust_id'
                                                        }
                                                    ]
                                                }
                                            ]
                                        })
                                    }
                                ]
                            }, { quoted: message });
                        }
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!call': {
                    try {
                        const targetAudio = args && args.trim() ? args.trim() : './audio.mp3';
                        await sock.sendMessage(normalizedJid, { text: `📞 Initiating voice call (audio: ${targetAudio})...` }, { quoted: message });
                        const call = await sock.initiateCall(normalizedJid, {
                            audioSource: targetAudio,
                            durationMs: 42 * 1000,
                            repeatAudio: true
                        });
                        call.on('ringing', () => console.log(`[Example] Call ${call.callId} is ringing...`));
                        call.on('accepted', () => console.log(`[Example] Call ${call.callId} accepted by recipient`));
                        call.on('connected', () => console.log(`[Example] Call ${call.callId} connected!`));
                        call.on('audioReady', () => console.log(`[Example] Call ${call.callId} audio pipeline ready`));
                        call.on('streaming', () => console.log(`[Example] Call ${call.callId} streaming audio`));
                        call.on('ended', (reason) => console.log(`[Example] Call ${call.callId} ended: ${reason}`));
                        call.on('error', (err) => console.error(`[Example] Call error:`, err));
                    } catch (err) {
                        console.log(err)
                        await sock.sendMessage(normalizedJid, { text: `Call error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!callinfo': {
                    try {
                        const active = await sock.getActiveCalls();
                        if (!active || active.length === 0) {
                            await sock.sendMessage(normalizedJid, { text: `📞 No active VoIP calls.` }, { quoted: message });
                        } else {
                            const list = active.map(c => `• [${c.id.slice(0, 8)}] -> ${c.jid} (${c.status}) [started: ${new Date(c.startedAt).toLocaleTimeString()}]`).join('\n');
                            await sock.sendMessage(normalizedJid, { text: `📞 Active Calls (${active.length}):\n\n${list}` }, { quoted: message });
                        }
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!calls': {
                    try {
                        const targets = args && args.trim() ? args.trim().split(/\s+/) : [normalizedJid];
                        await sock.sendMessage(normalizedJid, { text: `📞 Initiating concurrent calls to ${targets.length} recipients...` }, { quoted: message });
                        const requests = targets.map(target => ({
                            jid: target.includes('@') ? target : `${target.replace(/\D/g, '')}@s.whatsapp.net`,
                            options: {
                                audioSource: './audio.mp3',
                                durationMs: 30000,
                                repeatAudio: true
                            }
                        }));
                        const calls = await sock.initiateCalls(requests);
                        for (const call of calls) {
                            call.on('ringing', () => console.log(`[Example] Call ${call.callId} is ringing...`));
                            call.on('connected', () => console.log(`[Example] Call ${call.callId} connected!`));
                            call.on('ended', (reason) => console.log(`[Example] Call ${call.callId} ended: ${reason}`));
                        }
                        await sock.sendMessage(normalizedJid, { text: `✅ Successfully initiated ${calls.length} concurrent calls!` }, { quoted: message });
                    } catch (err) {
                        console.log(err)
                        await sock.sendMessage(normalizedJid, { text: `Multi-call error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!endcall': {
                    try {
                        const targetCallId = args && args.trim() ? args.trim() : '';
                        if (!targetCallId) {
                            await sock.sendMessage(normalizedJid, { text: `Usage: !endcall <callId>` }, { quoted: message });
                        } else {
                            await sock.endCall(targetCallId);
                            await sock.sendMessage(normalizedJid, { text: `📞 Terminated call ${targetCallId}` }, { quoted: message });
                        }
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `End call error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!endallcalls': {
                    try {
                        const count = await sock.getActiveCallCount();
                        await sock.endAllCalls();
                        await sock.sendMessage(normalizedJid, { text: `📞 Terminated all ${count} active calls.` }, { quoted: message });
                    } catch (err) {
                        await sock.sendMessage(normalizedJid, { text: `Error: ${err.message}` }, { quoted: message });
                    }
                    break;
                }
                case '!snake': {
                    try {
                        const userName = message.pushName || 'Player';
                        const snakePayload = createSnakePage(userName);
                        const msg = generateWAMessageFromContent(normalizedJid, snakePayload, { quoted: message });
                        await sock.relayMessage(normalizedJid, msg.message, { messageId: msg.key.id });
                    } catch (err) {
                        console.error('[SNAKE]', err);
                        await sock.sendMessage(normalizedJid, {
                            text: `❌ Snake Game failed\n\n${err?.message || String(err)}`
                        }, { quoted: message });
                    }
                    break;
                }
                case '!slots': {
                    try {
                        const slotsPayload = createSlotsPage();
                        const msg = generateWAMessageFromContent(normalizedJid, slotsPayload, { quoted: message });
                        await sock.relayMessage(normalizedJid, msg.message, { messageId: msg.key.id });
                    } catch (err) {
                        console.error('[SLOTS]', err);
                        await sock.sendMessage(normalizedJid, {
                            text: `❌ Slots Game failed\n\n${err?.message || String(err)}`
                        }, { quoted: message });
                    }
                    break;
                }
                case '!page': {
                    try {
                        const userName = message.pushName || 'Commander';
                        const pagePayload = createSamplePage(userName);
                        const msg = generateWAMessageFromContent(normalizedJid, pagePayload, { quoted: message });
                        await sock.relayMessage(normalizedJid, msg.message, { messageId: msg.key.id });
                    } catch (err) {
                        console.error('[PAGE]', err);
                        await sock.sendMessage(normalizedJid, {
                            text: `❌ Sample Page failed\n\n${err?.message || String(err)}`
                        }, { quoted: message });
                    }
                    break;
                }
                case '!tikdown':
                case '!livepage': {
                    try {
                        const targetUrl = args || 'https://tikdown.innovatorssoft.org/';
                        const title = targetUrl.includes('tikdown') ? 'TikDown Downloader' : 'Live Web Page';
                        const livePayload = createLivePage(targetUrl, title);
                        const msg = generateWAMessageFromContent(normalizedJid, livePayload, { quoted: message });
                        await sock.relayMessage(normalizedJid, msg.message, { messageId: msg.key.id });
                    } catch (err) {
                        console.error('[LIVE_PAGE]', err);
                        await sock.sendMessage(normalizedJid, {
                            text: `❌ Live Page failed\n\n${err?.message || String(err)}`
                        }, { quoted: message });
                    }
                    break;
                }
                case '!html': {
                    try {
                        const userName = message.pushName || 'User';
                        const customHtml = `
                            <div style="padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: radial-gradient(circle at top right, #1e293b, #0f172a); color: #f8fafc; border-radius: 16px; border: 1px solid #334155; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                                    <span style="font-size: 24px;">⚡</span>
                                    <div>
                                        <h3 style="margin: 0; font-size: 16px; color: #38bdf8;">Innovators Baileys GenAI HTML</h3>
                                        <p style="margin: 0; font-size: 12px; color: #94a3b8;">Interactive Web Component</p>
                                    </div>
                                </div>
                                <div style="background: rgba(255, 255, 255, 0.05); padding: 12px; border-radius: 10px; margin-bottom: 12px;">
                                    <p style="margin: 0; font-size: 13px; color: #cbd5e1;">Welcome, <b>${userName}</b>! This message is rendered dynamically using <code style="color: #f43f5e; background: #27272a; padding: 2px 5px; border-radius: 4px;">sendRichHtml</code>.</p>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; text-align: center;">
                                    <div style="background: #1e3a5f; padding: 8px; border-radius: 8px;">
                                        <div style="font-size: 11px; color: #93c5fd;">STATUS</div>
                                        <div style="font-size: 14px; font-weight: bold; color: #60a5fa;">Active ✅</div>
                                    </div>
                                    <div style="background: #064e3b; padding: 8px; border-radius: 8px;">
                                        <div style="font-size: 11px; color: #6ee7b7;">SPEED</div>
                                        <div style="font-size: 14px; font-weight: bold; color: #34d399;">Fast 🚀</div>
                                    </div>
                                </div>
                                <div style="text-align: center; padding: 8px; background: linear-gradient(135deg, #2563eb, #7c3aed); border-radius: 8px; font-weight: bold; font-size: 13px; cursor: pointer;">
                                    Powered by @innovatorssoft/baileys
                                </div>
                            </div>
                        `;

                        await sock.sendRichHtml(normalizedJid, {
                            id: 'cmd-html',
                            title: 'Rich HTML UI Card',
                            html: customHtml.trim(),
                            source: 'innovatorssoft'
                        }, message);
                    } catch (err) {
                        console.error('[HTML]', err);
                        await sock.sendMessage(normalizedJid, {
                            text: `❌ HTML message failed\n\n${err?.message || String(err)}`
                        }, { quoted: message });
                    }
                    break;
                }
            }
        } catch (err) {
            console.error(`Error processing message:`, err);
        }
    });
}

startBot().catch(err => {
    console.error('Fatal error starting the bot:', err);
});
