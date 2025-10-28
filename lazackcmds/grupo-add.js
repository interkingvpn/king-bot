const handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Por favor ingresa el número al que deseas enviar la invitación al grupo.`, m);
  if (text.includes('+')) return conn.reply(m.chat, `${emoji2} Ingresa el número sin el prefijo *+*.`, m);
  if (isNaN(text)) return conn.reply(m.chat, `${emoji2} Solo se permiten números (sin código de país ni espacios).`, m);

  const group = m.chat;
  const link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);

  await conn.reply(
    `${text}@s.whatsapp.net`, 
    `${emoji} *INVITACIÓN AL GRUPO*\n\nUn usuario te ha invitado a unirte a este grupo:\n\n${link}`, 
    m, 
    { mentions: [m.sender] }
  );
  
  m.reply(`${emoji} El enlace de invitación ha sido enviado al usuario.`);
};

handler.help = ['invitar *<número>*'];
handler.tags = ['grupo'];
handler.command = ['add', 'invite', 'invitar'];
handler.group = true;
handler.admin = false;
handler.botAdmin = true;

export default handler;