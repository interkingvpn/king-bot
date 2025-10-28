const handler = async (m, { conn, participants, usedPrefix, command }) => {
  // Verificar si se mencionó a alguien o se respondió a un mensaje
  if (!m.mentionedJid?.[0] && !m.quoted) {
    return conn.reply(
      m.chat,
      `✨ *Uso:*\n` +
      `• Menciona a alguien: *${usedPrefix}kick @user*\n` +
      `• Responde a un mensaje: *${usedPrefix}kick* (en respuesta)\n\n` +
      `¡Necesito saber a quién expulsar!`,
      m
    );
  }

  // Obtener usuario objetivo
  const user = m.mentionedJid?.[0] || m.quoted.sender;
  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || `${m.chat.split('-')[0]}@s.whatsapp.net`;
  const botOwner = `${global.owner[0][0]}@s.whatsapp.net`;

  // Validaciones de protección
  if (user === conn.user.jid)
    return conn.reply(m.chat, `😂 ¡Intento gracioso! No puedo expulsarme a mí mismo~`, m, { mentions: [user] });
    
  if (user === ownerGroup)
    return conn.reply(m.chat, `🚫 *Error:* ¡No puedo expulsar al dueño del grupo!`, m, { mentions: [user] });
    
  if (user === botOwner)
    return conn.reply(m.chat, `⛔ *Error:* ¡Jamás expulsaría a mi creador!`, m, { mentions: [user] });

  // Ejecutar expulsión
  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

    // Mensajes de éxito aleatorios
    const responses = [
      `🚀 ¡Usuario expulsado con éxito!`,
      `💥 ¡Sayonara! Usuario removido~`,
      `👋 ¡Usuario ha sido mostrado la puerta!`,
      `✅ ¡Removido correctamente del grupo!`
    ];
    const randomMessage = responses[Math.floor(Math.random() * responses.length)];

    await conn.reply(m.chat, randomMessage, m, { mentions: [user] });

  } catch (error) {
    console.error('Kick error:', error);
    let reply = `⚠️ No se pudo expulsar al usuario. Error: ${error.message}`;
    
    if (error.statusCode === 403) reply = `❌ No tengo permisos de administrador para expulsar.`;
    else if (error.statusCode === 404) reply = `🔍 Usuario no encontrado en este grupo.`;

    await conn.reply(m.chat, reply, m);
  }
};

// Configuración del comando
handler.help = ['kick @user'];
handler.tags = ['group'];
handler.command = ['kick', 'ban', 'remove', 'echar', 'expulsar'];
handler.admin = true;       // Solo admins pueden usar
handler.group = true;       // Solo en grupos
handler.botAdmin = true;    // Bot debe ser admin para expulsar

export default handler;