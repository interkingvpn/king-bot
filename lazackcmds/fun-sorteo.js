import util from 'util';
import path from 'path';

async function handler(m, { groupMetadata, conn, text }) {
    const mentionUser = (a) => '@' + a.split('@')[0];
    
    if (!text) return conn.reply(m.chat, 
        `${emoji} Por favor, especifica qué deseas sortear (por ejemplo, !sorteo Tarjeta de Regalo).`, 
        m
    );

    const participants = groupMetadata.participants.map(v => v.id);
    const winner = pickRandom(participants);
    const randomSound = Math.floor(Math.random() * 70);
    const soundUrl = `https://hansxd.nasihosting.com/sound/sound${randomSound}.mp3`;
    
    let announcement = `*[🎉 RESULTADOS DEL SORTEO 🎉]*\n\n`;
    announcement += `${mentionUser(winner)} 🎊\n`;
    announcement += `¡Felicidades! Has ganado el sorteo de "${text}"!\n\n`;
    announcement += `_Todos los participantes: ${participants.length}_`;

    // Enviar audio de celebración
    await conn.sendMessage(m.chat, { 
        audio: { url: soundUrl }, 
        mimetype: 'audio/mp4',
        ptt: true 
    });

    // Efecto de texto animado
    let displayText = '';
    for (const char of announcement) {
        await new Promise(resolve => setTimeout(resolve, 15));
        displayText += char;
        
        // Actualizar indicador de escritura periódicamente
        if (displayText.length % 10 === 0) {
            await conn.sendPresenceUpdate('composing', m.chat);
        }
    }

    // Enviar anuncio final
    await conn.sendMessage(m.chat, { 
        text: displayText, 
        mentions: conn.parseMention(displayText) 
    }, {
        quoted: m,
        ephemeralExpiration: 24*60*100,
        disappearingMessagesInChat: 24*60*100
    });
}

handler.help = ['sorteo <premio>', 'giveaway <premio>'];
handler.command = ['sorteo', 'premio', 'raffle', 'giveaway'];
handler.tags = ['fun', 'group'];
handler.group = true;
handler.admin = false;
handler.register = true;
handler.botAdmin = true; // Necesario para las menciones

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}