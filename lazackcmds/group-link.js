var handler = async (m, { conn }) => {
  let group = m.chat;
  let code = await conn.groupInviteCode(group);
  let link = 'https://chat.whatsapp.com/' + code;

  let text = `╭─❍ *Enlace de invitación al grupo*\n│\n│ ${link}\n╰───────────────✦`;

  const buttons = [
    { buttonId: `.link`, buttonText: { displayText: '🔗 Copiar enlace' }, type: 1 },
    { buttonId: link, buttonText: { displayText: '📤 Compartir grupo' }, type: 1 }
  ];

  const buttonMessage = {
    text,
    footer: 'Lazack Organisation | Grupo de WhatsApp',
    buttons,
    headerType: 1
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.help = ['link'];
handler.tags = ['grupo'];
handler.command = ['link'];
handler.group = true;
handler.botAdmin = true;

export default handler;