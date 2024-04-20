const { 
    makeWASocket, 
    useMultiFileAuthState, 
    jidDecode, 
    makeInMemoryStore, 
    DisconnectReason, 
    Browsers 
} = require('@whiskeysockets/baileys');

const pino = require('pino');
const chalk = require('chalk');
const spinnies = new (require('spinnies'))();
const qrcode = require('qrcode-terminal');
const autoViewStatus = require('./lib/autoview');
const displayBanner = require('./lib/banner');

const main = async () => {
    global.ridwanz = makeInMemoryStore({
        logger: pino().child({
            level: 'silent',
            stream: 'store'
        })
    });

    const { state, saveCreds } = await useMultiFileAuthState('session');
    
    displayBanner();

    const ridwanzSocket = makeWASocket({
        logger: pino({
            level: 'silent'
        }),
        
        printQRInTerminal: true,
        browser: Browsers.macOS('Desktop'),   
        markOnlineOnConnect: false,
        auth: state,
        store: global.ridwanz
    });

    ridwanzSocket.ev.on('messages.upsert', async chatUpdate => {
        const m = chatUpdate.messages[0];
        await autoViewStatus(m, ridwanzSocket);
    });

    ridwanzSocket.decodeJid = (jid) => {
        if (!jid) return jid;
        return /:\d+@/gi.test(jid) ? (jidDecode(jid) || {}).user + '@' + (jidDecode(jid) || {}).server : jid;
    };

    ridwanzSocket.ev.on('connection.update', (update) => handleConnectionUpdate(update, ridwanzSocket));
    ridwanzSocket.ev.on('creds.update', saveCreds);
};

const handleConnectionUpdate = (update, ridwanzSocket) => {
    const { connection, lastDisconnect, qr } = update;
    if (typeof lastDisconnect !== 'undefined' && typeof qr !== 'undefined') {
        qrcode.generate(qr, {
            small: true
        });
    }
    if (connection === 'connecting') {
        spinnies.add('start', {
            text: 'Sedang Menghubungkan...'
        });
    } else if (connection === 'open') {
        spinnies.succeed('start', {
            text: `Berhasil Terhubung!`
        });
    } else if (connection === 'close') {
        if (lastDisconnect.error.output.statusCode === DisconnectReason.loggedOut) {
            spinnies.fail('start', {
                text: `Gagal Terhubung!`
            });
            process.exit(0);
        } else {
            main().catch(() => main());
        }
    }
};

const start = () => {
    main().catch(err => {
        console.error("Error Starting Bot:", err);
        process.exit(1);
    });
};

start();