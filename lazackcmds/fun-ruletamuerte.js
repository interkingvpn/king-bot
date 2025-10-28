import { delay } from '@whiskeysockets/baileys';

const gameRooms = {};

const handler = async (m, { conn }) => {
    const chatId = m.chat;
    const senderId = m.sender;

    if (gameRooms[chatId]) 
        return conn.reply(m.chat, '⚠️ Ya hay un juego activo en este grupo. Por favor espera a que termine.', m);

    gameRooms[chatId] = { players: [senderId], status: 'waiting' };

    await conn.sendMessage(m.chat, { 
        text: `🔥 *Ruleta Mortal* 🔥\n\n@${senderId.split('@')[0]} ha iniciado una partida.\n> Escribe *aceptar* para unirte. Tiempo restante: 60 segundos...`, 
        mentions: [senderId] 
    }, { quoted: m });

    await delay(60000);
    if (gameRooms[chatId] && gameRooms[chatId].status === 'waiting') {
        delete gameRooms[chatId];
        await conn.sendMessage(m.chat, { text: '⌛ Nadie aceptó el desafío. La sala ha sido cerrada.' });
    }
};

handler.command = ['deathroulette', 'dr'];
handler.botAdmin = true;
handler.group = true;
handler.owner = false;

export default handler;

handler.before = async (m, { conn }) => {
    const chatId = m.chat;
    const senderId = m.sender;
    const text = m.text?.toLowerCase();

    if (!gameRooms[chatId]) return;

    if (text === 'accept' || text === 'acepto') {
        if (gameRooms[chatId].players.length >= 2) 
            return conn.reply(m.chat, '⚠️ Esta sala ya tiene dos jugadores.', m);

        if (senderId === gameRooms[chatId].players[0])
            return conn.reply(m.chat, '❌ No puedes aceptar tu propio desafío.', m);

        gameRooms[chatId].players.push(senderId);
        gameRooms[chatId].status = 'complete';

        await conn.sendMessage(m.chat, { 
            audio: { url: "https://qu.ax/iwAmy.mp3" }, 
            mimetype: "audio/mp4", 
            ptt: true 
        });

        await conn.sendMessage(m.chat, { 
            text: '🔥 *Ruleta Mortal* 🔥\n\n⚡ ¡La sala está completa!\n\n> Seleccionando al perdedor...' 
        });

        const loadingMessages = [
            "《 █▒▒▒▒▒▒▒▒▒▒▒》10%\nCalculando probabilidades...",
            "《 ████▒▒▒▒▒▒▒▒》30%\nEl destino está siendo decidido...",
            "《 ███████▒▒▒▒▒》50%\nLa ruleta está girando...",
            "《 ██████████▒▒》80%\nCasi listo...",
            "《 ████████████》100%\n¡Resultado final!"
        ];

        let { key } = await conn.sendMessage(m.chat, { text: "⚡ Calculando resultado..." }, { quoted: m });

        for (let msg of loadingMessages) {
            await delay(3000);
            await conn.sendMessage(m.chat, { text: msg, edit: key }, { quoted: m });
        }

        const [player1, player2] = gameRooms[chatId].players;
        const loser = Math.random() < 0.5 ? player1 : player2;

        await conn.sendMessage(m.chat, { 
            text: `💀 *Veredicto Final* 💀\n\n@${loser.split('@')[0]} es el perdedor.\n\n> Tienen 60 segundos para sus últimas palabras...`, 
            mentions: [loser] 
        });

        await delay(60000);
        await conn.groupParticipantsUpdate(m.chat, [loser], 'remove');
        await conn.sendMessage(m.chat, { 
            text: `☠️ @${loser.split('@')[0]} ha sido eliminado. Fin del juego.`, 
            mentions: [loser] 
        });
        
        delete gameRooms[chatId];
    }

    if (text === 'cancel' && senderId === gameRooms[chatId].players[0]) {
        delete gameRooms[chatId];
        await conn.sendMessage(m.chat, { text: '❌ El juego ha sido cancelado por el retador.' });
    }
};