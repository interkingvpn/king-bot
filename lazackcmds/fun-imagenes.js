//Código creado por LAN follow me en https://whatsapp.com/channel/0029VbC7MPJ59PwTYKZlgf10

const handler = async (m, { conn, command, text }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    
    // Suck or Suckslut
    if (command == 'chupa' || command == 'chupalo') {
        const captionchupa = `*[ 🤣 ] SUCK IT @${who.split('@')[0]}*`;
        conn.sendMessage(m.chat, {image: { url: 'https://telegra.ph/file/dc717696efd6182a47f07.jpg' }, caption: captionchupa, mentions: conn.parseMention(captionchupa)}, {quoted: m});   
    }
    // Applause
    if (command == 'aplauso') {
        const captionap = `*[ 🎉 ] CONGRATULATIONS, @${who.split('@')[0]}, YOU ARE AN IDIOT.*`;
        conn.sendMessage(m.chat, {image: { url: 'https://telegra.ph/file/0e40f5c0cf98dffc55045.jpg' }, caption: captionap, mentions: conn.parseMention(captionap)}, {quoted: m});   
    }
    // Brown
    if (command == 'marron' || command == 'negro') {
        const captionma = `*[ 💀 ] @${who.split('@')[0]} IS A SHITTY BROWN*`;
        conn.sendMessage(m.chat, {image: { url: 'https://telegra.ph/file/5592d6bd38d411554018c.png' }, caption: captionma, mentions: conn.parseMention(captionma)}, {quoted: m});   
    }
    // Suicide
    if (command == 'suicide' || command == 'suicidar') {
        const caption = `*[ ⚰️ ] @${m.sender.split('@')[0]} HAS COMMITTED SUICIDE...*`;
        conn.sendMessage(m.chat, {image: { url: 'https://files.catbox.moe/w3v3e0.jpg' }, caption: caption, mentions: conn.parseMention(caption)}, {quoted: m});
        delete global.global.db.data.users[m.sender]; 
    }
};

handler.command = ['chupalo', 'chupa', 'applause', 'negro', 'brown', 'suicide', 'suicidar'];
handler.group = true;
handler.register = true;

export default handler;