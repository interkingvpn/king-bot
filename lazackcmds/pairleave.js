let handler = async (m, { conn, args }) => {
  const esPropietarioSocket = [
    conn.user.jid,
    ...(global.owner || []).map(n => n + '@s.whatsapp.net'),
  ].includes(m.sender);

  if (!esPropietarioSocket) {
    return m.reply('🕸 Solo el propietario del socket puede usar este comando.');
  }

  const groupId = args[0] || m.chat;

  try {
    // await conn.sendMessage(m.chat, { text: `🐼 El bot se despide.` }, { quoted: m });
    await conn.groupLeave(groupId);
  } catch (error) {
    console.error(error);
    m.reply('🕸 No se pudo salir del grupo. Por favor, inténtalo de nuevo.');
  }
};

handler.help = ['salir'];
handler.tags = ['pairbot'];
handler.command = ['salir'];

export default handler;