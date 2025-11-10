const handler = async (m, { conn }) => {
  const texto = `
┏━━━━━━━━━━━━━━━┓
┃⚡ 𝗛𝗼𝗹𝗮!, 𝘀𝗼𝘆 𝗞𝗜𝗡𝗚•𝗕𝗢𝗧 👑
┗━━━━━━━━━━━━━━━┛

📣 Ú𝙣𝙚𝙩𝙚 𝙖 𝙣𝙪𝙚𝙨𝙩𝙧𝙤 𝘾𝘼𝙉𝘼𝙇 𝙊𝙁𝙄𝘾𝙄𝘼𝙇 𝙙𝙚 𝙒𝙝𝙖𝙩𝙨𝘼𝙥𝙥:

👉 *https://whatsapp.com/channel/0029VbC7MPJ59PwTYKZlgf10*

🖤 ¡Te esperamos con novedades, bots, actualizaciones y más!
`;

  await conn.sendMessage(m.chat, { text: texto.trim() }, { quoted: m });
};

handler.command = ['linkgc', 'grupos'];
export default handler;

