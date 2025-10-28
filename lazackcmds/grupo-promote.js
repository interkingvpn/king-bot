const handler = async (m, { conn, usedPrefix, command, text, isAdmin, isBotAdmin }) => {
  // Validar permisos
  if (!isAdmin) {
    return conn.reply(m.chat, '🔒 *Solo los administradores pueden ascender usuarios*', m);
  }
  if (!isBotAdmin) {
    return conn.reply(m.chat, '🤖 *Necesito permisos de administrador para ascender usuarios*', m);
  }

  // Obtener usuario objetivo
  let number;
  if (!text && !m.quoted) {
    return conn.reply(
      m.chat,
      `📌 *Uso:*\n` +
      `• Mencionar usuario: *${usedPrefix}promote @usuario*\n` +
      `• Responder al usuario: *${usedPrefix}promote* (en respuesta)\n` +
      `• Usar número: *${usedPrefix}promote 123456789*`,
      m
    );
  }

  // Extraer número de diferentes métodos de entrada
  if (text.includes('@')) {
    number = text.split('@')[1];
  } else if (!isNaN(text)) {
    number = text;
  } else if (m.quoted) {
    number = m.quoted.sender.split('@')[0];
  }

  // Validar número
  if (!number || number.length > 15 || number.length < 10) {
    return conn.reply(m.chat, '⚠️ *Formato de número de teléfono inválido*', m);
  }

  const user = `${number}@s.whatsapp.net`;

  try {
    // Verificar si el usuario ya es administrador
    const groupData = await conn.groupMetadata(m.chat);
    const isAlreadyAdmin = groupData.participants.find(p => 
      p.id === user && (p.admin === 'admin' || p.admin === 'superadmin')
    );

    if (isAlreadyAdmin) {
      return conn.reply(
        m.chat,
        `ℹ️ @${number} ya es administrador`,
        m,
        { mentions: [user] }
      );
    }

    // Ascender usuario
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    
    // Mensaje de éxito con respuestas aleatorias
    const successMessages = [
      `🎉 ¡Felicidades @${number}! ¡Has sido ascendido a administrador!`,
      `👑 @${number} se ha unido al equipo de administradores!`,
      `⚡ @${number} ahora es administrador! Usa tus poderes sabiamente~`
    ];
    const randomResponse = successMessages[Math.floor(Math.random() * successMessages.length)];
    
    await conn.reply(
      m.chat,
      randomResponse,
      m,
      { mentions: [user] }
    );
    
  } catch (error) {
    console.error('Error al ascender:', error);
    
    const errorMessages = {
      '403': `❌ ¡No tengo permisos de administrador para ascender!`,
      '404': `🔍 ¡Usuario no encontrado en este grupo!`,
      'default': `⚠️ Falló al ascender usuario. Error: ${error.message}`
    };
    
    await conn.reply(
      m.chat,
      errorMessages[error.statusCode] || errorMessages.default,
      m
    );
  }
};

// Configuración del comando
handler.help = ['promote @usuario'];
handler.tags = ['grupo'];
handler.command = ['promote', 'makeadmin'];
handler.group = true;
handler.admin = true;      // Requiere admin del usuario
handler.botAdmin = true;   // Requiere admin del bot

export default handler;