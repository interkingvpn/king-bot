import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path';
import ws from 'ws';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner }) => {
    const isDeleteSession = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
    const isStopBot = /^(stop|pausarai|pausarbot)$/i.test(command);
    const isListBots = /^(bots|sockets|socket)$/i.test(command);

    async function reportError(e) {
        await m.reply(`⚠️ Ocurrió un error.`);
        console.error('Error del comando:', e);
    }

    try {
        if (isDeleteSession) {
            let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
            let uniqid = `${who.split`@`[0]}`;
            const sessionPath = `./${jadi}/${uniqid}`;

            if (!fs.existsSync(sessionPath)) {
                await conn.sendMessage(m.chat, { 
                    text: `🔍 No tienes una sesión activa. Puedes crear una usando:\n${usedPrefix}jadibot\n\nSi tienes un ID de sesión, puedes usar:\n${usedPrefix}${command} \`\`\`(ID)\`\`\`` 
                }, { quoted: m });
                return;
            }

            if (global.conn.user.jid !== conn.user.jid) {
                return conn.sendMessage(m.chat, {
                    text: `⚠️ Por favor usa este comando en el bot principal.\n\nhttps://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0`
                }, { quoted: m });
            }

            await conn.sendMessage(m.chat, { text: `🔒 Tu sesión de Sub-Bot ha sido terminada` }, { quoted: m });
            
            try {
                await fs.rmdir(sessionPath, { recursive: true, force: true });
                await conn.sendMessage(m.chat, { text: `✅ Todos los datos de la sesión han sido eliminados` }, { quoted: m });
            } catch (e) {
                reportError(e);
            }
        }
        else if (isStopBot) {
            if (global.conn.user.jid == conn.user.jid) {
                await conn.reply(m.chat, `ℹ️ Este es el bot principal. Para convertirte en Sub-Bot, contacta al número del bot principal.`, m);
            } else {
                await conn.reply(m.chat, `🛑 ${botname} ha sido pausado.`, m);
                conn.ws.close();
            }
        }
        else if (isListBots) {
            const activeBots = [...new Set([...global.conns.filter(conn => 
                conn.user && 
                conn.ws.socket && 
                conn.ws.socket.readyState !== ws.CLOSED
            )])];

            function formatUptime(ms) {
                const seconds = Math.floor(ms / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);
                
                return [
                    days > 0 ? `${days}d` : '',
                    hours % 24 > 0 ? `${hours % 24}h` : '',
                    minutes % 60 > 0 ? `${minutes % 60}m` : '',
                    seconds % 60 > 0 ? `${seconds % 60}s` : ''
                ].filter(Boolean).join(' ') || 'Desconocido';
            }

            const botList = activeBots.map((bot, index) => 
                `• [${index + 1}]\n📱 wa.me/${bot.user.jid.replace(/[^0-9]/g, '')}\n👤 Usuario: ${bot.user.name || 'Sub-Bot'}\n⏱️ Tiempo activo: ${bot.uptime ? formatUptime(Date.now() - bot.uptime) : 'Desconocido'}`
            ).join('\n\n──────────────\n\n');

            const responseMessage = `🤖 LISTA DE SUB-BOTS ACTIVOS\n\n` +
                `ℹ️ Puedes solicitar permiso para agregar estos bots a tu grupo\n\n` +
                `\`\`\`Cada Sub-Bot opera de manera independiente. El bot principal no es responsable de su uso.\`\`\`\n\n` +
                `🔢 Total Conectados: ${activeBots.length || '0'}\n\n` +
                `${botList.length ? botList : 'No hay Sub-Bots activos disponibles en este momento'}`;

            await _envio.sendMessage(m.chat, {
                text: responseMessage, 
                mentions: _envio.parseMention(responseMessage)
            }, { quoted: m });
        }
    } catch (error) {
        reportError(error);
    }
};

handler.tags = ['serbot', 'gestión'];
handler.help = [
    'deletesession - Terminar tu sesión de Sub-Bot',
    'stop - Pausar la conexión de tu Sub-Bot',
    'bots - Listar Sub-Bots activos'
];
handler.command = [
    'deletesesion', 'deletebot'
];

export default handler;