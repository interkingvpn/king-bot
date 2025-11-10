const handler = async (m, { conn }) => {
  const texto = `
⚡ *Hola, soy *KING•BOT** 👑

👑 > 𝗖𝗥𝗘𝗔𝗗𝗢𝗥
• 𝘐𝘕𝘛𝘌𝘙•𝘒𝘐𝘕𝘎
• wa.me/5493765142705

🛡️ > 𝗣𝗥𝗢𝗣𝗜𝗘𝗧𝗔𝗥𝗜𝗢 1:*
• wa.me/5493765142705

🛡️ >𝗣𝗥𝗢𝗣𝗜𝗘𝗧𝗔𝗥𝗜𝗢 2:*
• wa.me/5493765142705

📢 *Canal oficial:*
https://whatsapp.com/channel/0029VbC7MPJ59PwTYKZlgf10

🤙 ¡Gracias por usar 𝗞𝗜𝗡𝗚•𝗕𝗢𝗧!
`.trim();

  await conn.sendMessage(m.chat, { text: texto }, { quoted: m });
};

handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.command = /^(owner|creator|creador|propietario)$/i;
export default handler;
