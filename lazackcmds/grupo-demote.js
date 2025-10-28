const handler = async (m, { conn, usedPrefix, command, text }) => {
  // Validar entrada
  if (!text && !m.quoted) {
    return conn.reply(
      m.chat, 
      `${emoji} Por favor, menciona o responde a un usuario para degradarlo de administrador.`,
      m
    );
  }

  // Obtener el usuario
  let user;
  if (m.quoted) {
    user = m.quoted.sender;
  } else if (text.includes('@')) {
    user = `${text.split('@')[0]}@s.whatsapp.net`;
  } else if (!isNaN(text)) {
    user = `${text}@s.whatsapp.net`;
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    user = m.mentionedJid[0];
  } else {
    return conn.reply(
      m.chat,
      `${emoji} Formato inválido. Usa:\n${usedPrefix}demote @usuario\nO responde a un mensaje`,
      m
    );
  }

  // Validar formato del número
  const number = user.split('@')[0];
  if (number.length > 15 || number.length < 10) {
    return conn.reply(
      m.chat,
      `${emoji} Formato de número inválido.`,
      m
    );
  }

  try {
    // Degradar usuario
    await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
    await conn.reply(
      m.chat,
      `${emoji2} @${number} ha sido degradado de administrador.`,
      m,
      { mentions: [user] }
    );
  } catch (error) {
    console.error('Error al degradar:', error);
    await conn.reply(
      m.chat,
      `${emoji2} No se pudo degradar al usuario. Es posible que necesite permisos de administrador.`,
      m
    );
  }
};

// Configuración del comando
handler.help = ['demote @usuario'];
handler.tags = ['group'];
handler.command = ['demote', 'degradar', 'quitaradmin'];
handler.group = true;
handler.admin = true;      // Solo admins pueden usar
handler.botAdmin = true;   // El bot debe ser admin

export default handler;