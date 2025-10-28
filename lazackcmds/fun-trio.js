let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!m.mentionedJid || m.mentionedJid.length < 2) {
        return conn.reply(m.chat, 
            `${emoji} Por favor menciona a 2 usuarios para calcular la compatibilidad de trío (por ejemplo, ${usedPrefix}trio @usuario1 @usuario2)`, 
            m
        );
    }

    const [persona1, persona2] = m.mentionedJid.slice(0, 2);
    const nombres = {
        user1: await conn.getName(persona1),
        user2: await conn.getName(persona2),
        sender: await conn.getName(m.sender)
    };

    const compatibilidades = {
        pareja1: Math.floor(Math.random() * 100),
        pareja2: Math.floor(Math.random() * 100),
        pareja3: Math.floor(Math.random() * 100)
    };

    const pp = './src/Imagen.jpg';
    const mensajeTrio = `
    🌶️ *COMPATIBILIDAD DE TRÍO* 🌶️

${nombres.user1} y ${nombres.user2} tienen *${compatibilidades.pareja1}%* de compatibilidad
${nombres.user1} y ${nombres.sender} tienen *${compatibilidades.pareja2}%* de compatibilidad
${nombres.user2} y ${nombres.sender} tienen *${compatibilidades.pareja3}%* de compatibilidad

${pickRandom([
    "¿Qué opinas de un trío picante? 😈",
    "Esto podría ponerse interesante... 😏",
    "¡Alguien tendrá suerte esta noche! 💋",
    "¡La química es real! 🔥",
    "¡Parece la combinación perfecta! 👌"
])}`;

    await conn.sendMessage(m.chat, { 
        image: { url: pp }, 
        caption: mensajeTrio, 
        mentions: [persona1, persona2, m.sender] 
    }, { quoted: m });
}

handler.help = ['trio @usuario1 @usuario2', 'trioheat @usuario1 @usuario2'];
handler.tags = ['fun', 'nsfw'];
handler.command = ['trio', 'trioheat', 'formartrio', 'threesome'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}