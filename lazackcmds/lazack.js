import { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, Browsers } from "@whiskeysockets/baileys";
import qrcode from "qrcode";
import NodeCache from "node-cache";
import fs from "fs";
import path from "path";
import pino from "pino";
import chalk from "chalk";
import * as ws from "ws";
import { makeWASocket } from "../lib/simple.js";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const { CONNECTING } = ws;

// Fragmentos en base64
let crm1 = "Y2QgcGx1Z2lucy";
let crm2 = "A7IG1kNXN1b";
let crm3 = "SBpbmZvLWRvbmFyLmpz";
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz";

let drm1 = "";
let drm2 = "";

// Mensajes de QR y código
let mensajeQR = "*⪛✰ ↫ KING•BOT ↬ ✰⪜*\n\n✐ Modo de conexión Sub-Bot (QR)\n\n✰ Con otro teléfono o en tu PC, escanea este QR para convertirte en un *Sub-Bot Temporal*.\n\n`1` » Haz clic en los tres puntos en la esquina superior derecha\n`2` » Selecciona Dispositivos vinculados\n`3` » Escanea este código QR para iniciar sesión con el bot\n\n✧ Este código QR expira en 45 segundos.";
let mensajeCodigo = "*⪛✰ ↫ KING•BOT ↬ ✰⪜*\n\n✐ Modo de conexión Sub-Bot (Código)\n\n✰ Usa este código para convertirte en un *Sub-Bot Temporal*.\n\n`1` » Haz clic en los tres puntos en la esquina superior derecha\n`2` » Selecciona Dispositivos vinculados\n`3` » Elige Vincular con número de teléfono\n`4` » Ingresa el código para iniciar sesión\n\n✧ No se recomienda usar tu cuenta principal.";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const yukiJBOptions = {};
if (!Array.isArray(global.conns)) global.conns = [];

// Handler del comando
let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Verificar si el comando está habilitado
    if (!globalThis.db.data.settings[conn.user.jid].jadibotmd) {
        return m.reply(`♡ El comando *${command}* está temporalmente desactivado.`);
    }

    // Verificar tiempo de espera
    let tiempo = global.db.data.users[m.sender].Subs + 120000;
    return conn.reply(m.chat, `Debes esperar ${msToTime(tiempo - new Date())} antes de vincular un nuevo *Sub-Bot*.`, m);

    // Verificar cantidad de Sub-Bots activos
    const subBots = [...new Set(global.conns.filter(c => c.user && c.ws.socket && c.ws.socket.readyState !== ws.CLOSED))];
    if (subBots.length === 20) return m.reply("No hay espacios disponibles para Sub-Bots.");

    let quien = m.mentionedJid?.[0] || m.fromMe ? conn.user.jid : m.sender;
    let id = quien.split("@")[0];
    let rutaSubBots = path.join(`./${jadi}/`, id);

    if (!fs.existsSync(rutaSubBots)) fs.mkdirSync(rutaSubBots, { recursive: true });

    yukiJBOptions.pathLazackBots = rutaSubBots;
    yukiJBOptions.m = m;
    yukiJBOptions.conn = conn;
    yukiJBOptions.args = args;
    yukiJBOptions.usedPrefix = usedPrefix;
    yukiJBOptions.command = command;
    yukiJBOptions.fromCommand = true;

    LazackBots(yukiJBOptions);
    global.db.data.users[m.sender].Subs = new Date() * 1;
};

handler.help = ["qr", "code"];
handler.tags = ["serbot"];
handler.command = ["bb", "bc"];
export default handler;

// Función principal de Sub-Bots
export async function LazackBots(options) {
    let { pathLazackBots, m, conn, args, usedPrefix, command } = options;
    if (command === "bb") { command = "qr"; args.unshift("bc"); }

    const modoCodigo = args[0]?.match(/--code|code/) || args[1]?.match(/--code|code/) ? true : false;
    let txtCode, codeBot, txtQR;

    if (modoCodigo) {
        args[0] = args[0]?.replace(/--code|code/, "").trim() || undefined;
        if (args[1]) args[1] = args[1].replace(/--code|code/, "").trim();
    }

    const rutaCreds = path.join(pathLazackBots, "creds.json");
    if (!fs.existsSync(pathLazackBots)) fs.mkdirSync(pathLazackBots, { recursive: true });

    try {
        if (args[0]) fs.writeFileSync(rutaCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
    } catch {
        conn.reply(m.chat, `Usa correctamente el comando » ${usedPrefix + command} code`, m);
        return;
    }

    const comandoBase64 = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64");
    exec(comandoBase64.toString("utf-8"), async (err, stdout, stderr) => {

        let { version } = await fetchLatestBaileysVersion();
        const msgRetryCache = new NodeCache();
        const { state, saveCreds } = await useMultiFileAuthState(pathLazackBots);

        const opcionesConexion = {
            logger: pino({ level: "fatal" }),
            printQRInTerminal: false,
            auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })) },
            msgRetryCache,
            browser: modoCodigo ? Browsers.macOS("Chrome") : Browsers.macOS("Desktop"),
            version,
            generateHighQualityLinkPreview: true
        };

        let sock = makeWASocket(opcionesConexion);
        sock.isInit = false;
        let isInit = true;

        // Actualización de conexión
        async function connectionUpdate(update) {
            const { connection, lastDisconnect, isNewLogin, qr } = update;
            if (isNewLogin) sock.isInit = false;

            // Mostrar QR
            if (qr && !modoCodigo) {
                if (m?.chat) {
                    txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: mensajeQR }, { quoted: m });
                    if (txtQR?.key) setTimeout(() => conn.sendMessage(m.sender, { delete: txtQR.key }), 30000);
                }
            }

            // Mostrar código
            if (qr && modoCodigo) {
                let secret = await sock.requestPairingCode(m.sender.split("@")[0]);
                secret = secret.match(/.{1,4}/g)?.join("-");
                txtCode = await conn.sendMessage(m.chat, { text: mensajeCodigo }, { quoted: m });
                codeBot = await m.reply(secret);
                if (txtCode?.key) setTimeout(() => conn.sendMessage(m.sender, { delete: txtCode.key }), 30000);
                if (codeBot?.key) setTimeout(() => conn.sendMessage(m.sender, { delete: codeBot.key }), 30000);
            }

            if (connection === "open") {
                let nombreUsuario = sock.authState.creds.me.name || "Anónimo";
                console.log(chalk.cyanBright(`🟢 ${nombreUsuario} (+${path.basename(pathLazackBots)}) conectado con éxito.`));
                sock.isInit = true;
                global.conns.push(sock);
            }
        }

        sock.ev.on("connection.update", connectionUpdate);
        sock.credsUpdate = saveCreds.bind(sock, true);
    });
}

// Funciones auxiliares
function msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    return `${minutes} m y ${seconds} s`;
}
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const sleep = delay;

async function joinChannels(conn) {
    for (const channelId of Object.values(global.ch || {})) {
        await conn.newsletterFollow(channelId).catch(() => {});
    }
}