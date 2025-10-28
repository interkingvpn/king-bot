import { totalmem, freemem } from 'os';
import os from 'os';
import speed from 'performance-now';
import { sizeFormatter } from 'human-readable';

// Formateador de memoria
const format = sizeFormatter({ 
    std: 'JEDEC', 
    decimalPlaces: 2, 
    keepTrailingZeroes: false, 
    render: (literal, symbol) => `${literal} ${symbol}B` 
});

const handler = async (m, { conn }) => {
    try {
        // Medir latencia
        let timestamp = speed();
        let latency = speed() - timestamp;

        // Cálculo de tiempo activo (uptime)
        let _muptime = process.uptime() * 1000;
        let uptime = formatUptime(_muptime);

        // Estadísticas de chats
        let chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
        let groups = Object.entries(conn.chats).filter(([jid, chat]) => 
            jid.endsWith('@g.us') && 
            chat.isChats && 
            !chat.metadata?.read_only && 
            !chat.metadata?.announce
        ).map(v => v[0]);

        // Uso de RAM
        let ramUsada = format(totalmem() - freemem());
        let ramTotal = format(totalmem());

        // Construir mensaje de estado
        let mensajeEstado = `📊 *Estado de ${packname}*\n\n` +
            `🚀 *Rendimiento:*\n` +
            `→ Latencia: ${latency.toFixed(4)} ms\n\n` +
            `🕒 *Tiempo Activo:*\n` +
            `→ ${uptime}\n\n` +
            `💫 *Estadísticas de Chats:*\n` +
            `→ ${chats.length} Chats Privados\n` +
            `→ ${groups.length} Grupos\n\n` +
            `🏆 *Estado del Servidor:*\n` +
            `→ Uso de RAM: ${ramUsada} / ${ramTotal}`.trim();

        // Reaccionar y enviar mensaje
        await m.react('✈️');
        await conn.reply(m.chat, mensajeEstado, m);

    } catch (error) {
        console.error('Error en comando speed:', error);
        await conn.reply(m.chat, '❌ No se pudo obtener la información de rendimiento', m);
    }
};

handler.help = ['speed'];
handler.tags = ['info', 'rendimiento'];
handler.command = ['speed'];
handler.register = true;

export default handler;

// Función para formatear uptime
function formatUptime(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}