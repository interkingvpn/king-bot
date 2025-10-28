const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  // Evita que funcione si el prefijo es 'a' o 'A'
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  // Emoji personalizado para la mención, por defecto 🍫
  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🍫';
  m.react(customEmoji);

  // Solo administradores o dueño pueden usar el comando
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn); // función global que lanza error
    throw false;
  }

  // Mensaje opcional que se agregará al tag
  const message = args.join` `;
  const info = `*» MENSAJE :* ${message || 'No se proporcionó mensaje.'}`;

  // Construcción del mensaje final con la lista de miembros
  let caption = `*!  MENCIÓN GENERAL  !*\n  *A ${participants.length} MIEMBROS* 🗣️\n\n ${info}\n\n╭  ┄ 𝅄 ۪꒰ \`⡞᪲=͟͟͞${botname} ≼᳞ׄ\` ꒱ ۟ 𝅄 ┄\n`;
  
  for (const member of participants) {
    caption += `┊${customEmoji} @${member.id.split('@')[0]}\n`;
  }

  caption += `╰⸼ ┄ ┄ ┄ ─  ꒰  ׅ୭ *${vs}* ୧ ׅ ꒱  ┄  ─ ┄ ⸼`;

  // Envía el mensaje etiquetando a todos los miembros
  conn.sendMessage(m.chat, { text: caption, mentions: participants.map((a) => a.id) });
};

handler.help = ['tagall *<mensaje opcional>*'];
handler.tags = ['grupo'];
handler.command = ['tagall'];
handler.admin = true;
handler.group = true;

export default handler;