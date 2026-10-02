const {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    monitorPresence
} = require('../../lib/index.js');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const path = require('path');

async function startPresenceMonitorBot() {
    const authDir = path.join(__dirname, 'auth');
    const { state, saveCreds } = await useMultiFileAuthState(authDir);

    const sock = makeWASocket({
        auth: state,
        logger: require('pino')({ level: 'silent' }),
        markOnlineOnConnect: true
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('Scan QR Code with WhatsApp:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed. Reconnecting:', shouldReconnect);
            if (shouldReconnect) startPresenceMonitorBot();
        } else if (connection === 'open') {
            console.log('[Presence Monitor] WhatsApp connection opened successfully.');

            // Target contact JID to monitor
            const targetJid = '923001234567@s.whatsapp.net';

            // Initialize presence monitoring
            const monitor = monitorPresence(sock, targetJid, {
                logToConsole: true,   // Automatically logs in exact format required
                autoResubscribe: true // Automatically re-subscribes after socket reconnects
            });

            monitor.on('online', (data) => {
                console.log('==> Online Event Received:', {
                    jid: data.jid,
                    status: data.status,
                    onlineAt: data.onlineAt
                });
            });

            monitor.on('offline', (data) => {
                console.log('==> Offline Event Received:', {
                    jid: data.jid,
                    status: data.status,
                    onlineAt: data.onlineAt,
                    offlineAt: data.offlineAt,
                    duration: data.duration,
                    lastSeen: data.lastSeen
                });
            });

            monitor.on('session', (session) => {
                console.log('==> Session Summary Recorded:', session);
            });
        }
    });
}

if (require.main === module) {
    startPresenceMonitorBot();
}

module.exports = { startPresenceMonitorBot };
