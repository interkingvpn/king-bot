const handler = async (m, { conn, text, command, usedPrefix, isAdmin, isBotAdmin }) => {
  // Validar permisos
  if (!isAdmin) {
    return conn.reply(
      m.chat,
      `🔒 Necesitas privilegios de administrador para remover advertencias`,
      m
    );
  }
  if (!isBotAdmin) {
    return conn.reply(
      m.chat,
      `🤖 Necesito permisos de administrador para gestionar advertencias`,
      m
    );
  }

  // Determinar usuario objetivo
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] || 
         (m.quoted ? m.quoted.sender : text);
  } else {
    who = m.chat;
  }

  // Validar entrada del usuario
  if (!who) {
    const example = `Ejemplo: *${usedPrefix}${command} @${global.suittag}*`;
    return conn.reply(
      m.chat,
      `${emoji} Por favor etiqueta a un usuario para remover su advertencia\n\n${example}`,
      m,
      { mentions: conn.parseMention(example) }
    );
  }

  // Verificar si intenta desadvertir al bot
  if (who === conn.user.jid) {
    return conn.reply(
      m.chat,
      `${emoji2} ¡No puedo advertirme a mí mismo!`,
      m
    );
  }

  // Obtener datos del usuario
  const user = global.db.data.users[who] || { warn: 0 };

  // Verificar si el usuario tiene advertencias
  if (user.warn <= 0) {
    return conn.reply(
      m.chat,
      `${emoji2} @${who.split('@')[0]} no tiene advertencias para remover`,
      m,
      { mentions: [who] }
    );
  }

  // Remover advertencia
  user.warn = Math.max(0, user.warn - 1); // Asegura que no sea menor a 0

  // Enviar confirmación
  const status = user.warn === 1 
    ? `⚠️ @${who.split('@')[0]} tiene 1 advertencia restante` 
    : `✅ Advertencia removida de @${who.split('@')[0]}`;

  await conn.reply(
    m.chat,
    `${status}\nAdvertencias actuales: *${user.warn}/3*`,
    m,
    { mentions: [who] }
  );
};

// Configuración del comando
handler.help = ['unwarn @user'];
handler.tags = ['grupo', 'moderación'];
handler.command = ['unwarn', 'delwarn', 'removewarn'];
handler.group = true;
handler.admin = true;      // Requiere admin
handler.botAdmin = true;   // Requiere que el bot sea admin

export default handler;