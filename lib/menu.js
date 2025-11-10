// lib/menu.js
import { getUserTotalExp } from './exp.js';

export async function menu(m, client) {
  try {
    const userid = m.sender || m.from;
    const { total, detalle } = getUserTotalExp(userid);

    let texto = "👤𝗧𝘂 𝗽𝗲𝗿𝗳𝗶𝗹 𝗱𝗲 𝗘𝘅𝗽𝗲𝗿𝗶𝗲𝗻𝗰𝗶𝗮 \n\n";
    texto += `😎𝗘𝗫𝗣𝗘𝗥𝗜𝗘𝗡𝗖𝗜𝗔 𝗧𝗢𝗧𝗔𝗟: ${total}\n\n`;
    texto += "📊𝗗𝗘𝗧𝗔𝗟𝗟𝗘 𝗣𝗢𝗥 𝗠𝗢́𝗗𝗨𝗟𝗢𝗦:\n";

    for (const [modulo, data] of Object.entries(detalle)) {
      texto += `\n🔹 *${modulo.charAt(0).toUpperCase() + modulo.slice(1)}*\n`;
      texto += `➤ ᴇxᴘ: ${data.exp || 0}\n`;
      texto += `➤ ɴɪᴠᴇʟ: ${data.nivel || 0}\n`;
      texto += `➤ ᴅɪᴀᴍᴀɴᴛᴇs: ${data.diamantes || 0}\n`;
    }

    texto += "\nSɪɢᴜᴇ ᴊᴜɢᴀɴᴅᴏ ʏ sᴜʙɪᴇɴᴅᴏ ᴅᴇ ɴɪᴠᴇʟ!";

    await client.sendMessage(m.chat, { text: texto }, { quoted: m });
  } catch (e) {
    console.error('𝙴𝚛𝚛𝚘𝚛 𝚎𝚗 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚖𝚎𝚗𝚞:', e);
    await client.sendMessage(m.chat, { text: '𝙾𝚌𝚞𝚛𝚛𝚒𝚘́ 𝚞𝚗 𝚎𝚛𝚛𝚘𝚛 𝚊𝚕 𝚌𝚊𝚛𝚐𝚊𝚛 𝚝𝚞 𝚙𝚎𝚛𝚏𝚒𝚕.' }, { quoted: m });
  }
}