import util from 'util';
import path from 'path';

const handler = async (m, { groupMetadata, conn, text }) => {
    const mentionUser = (a) => '@' + a.split('@')[0];
    
    if (!text) return conn.reply(m.chat, 
        `${emoji} Por favor, ingresa una categoría para el Top 10 (por ejemplo, !top más activos).`, 
        m
    );

    const participants = groupMetadata.participants.map(v => v.id);
    
    // Obtener 10 participantes aleatorios únicos
    const winners = [];
    while (winners.length < 10) {
        const randomUser = pickRandom(participants);
        if (!winners.includes(randomUser)) {
            winners.push(randomUser);
        }
    }

    const randomEmoji = pickRandom(['🏆', '🎖️', '🌟', '✨', '🔥', '💎', '👑', '⚡', '💯', '👏']);
    const randomSound = Math.floor(Math.random() * 70);
    const soundUrl = `https://hansxd.nasihosting.com/sound/sound${randomSound}.mp3`;

    let topList = `*${randomEmoji} TOP 10 ${text.toUpperCase()} ${randomEmoji}*\n\n`;
    
    winners.forEach((user, index) => {
        topList += `*${index + 1}. ${mentionUser(user)}*\n`;
    });

    // Enviar sonido de celebración
    await conn.sendMessage(m.chat, { 
        audio: { url: soundUrl }, 
        mimetype: 'audio/mp4',
        ptt: true 
    });

    // Enviar la lista del Top 10 con menciones
    await conn.sendMessage(m.chat, { 
        text: topList,
        mentions: winners 
    }, { quoted: m });
}

handler.help = ['top <categoría>', 'top10 <categoría>'];
handler.command = ['top', 'top10', 'ranking'];
handler.tags = ['fun', 'group'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}