const handler = async (m, { conn, text, isAdmin }) => {
  // Validar entrada
  if (!text) {
    const example = `Ejemplo: *${usedPrefix}setbye ¡Adiós @user!*`;
    return conn.reply(
      m.chat,
      `${emoji} Por favor proporciona un mensaje de despedida.\n\n${example}\n\n` +
      `Variables disponibles:\n` +
      `• @user - Menciona al usuario que se va\n` +
      `• @group - Nombre del grupo\n` +
      `• @desc - Descripción del grupo`,
      m
    );
  }

  // Validar permisos de admin (si es grupo)
  if (m.isGroup && !isAdmin) {
    return conn.reply(
      m.chat,
      `${emoji2} ¡Solo los administradores pueden establecer mensajes de despedida!`,
      m
    );
  }

  try {
    // Guardar el mensaje de despedida
    if (!global.db.data.settings) global.db.data.settings = {};
    global.db.data.settings.goodbyeMessage = text.trim();

    // Mensaje de confirmación
    const successMessage = `${emoji} Mensaje de despedida configurado como:\n\n` +
      `"${text.trim()}"\n\n` +
      `Vista previa:\n` +
      text.trim()
        .replace(/@user/g, '@1234567890')
        .replace(/@group/g, 'Grupo de Prueba')
        .replace(/@desc/g, 'Descripción de Prueba');

    await conn.reply(m.chat, successMessage, m);
    await m.react('✅');

  } catch (error) {
    console.error('Error setbye:', error);
    await conn.reply(
      m.chat,
      `${emoji2} Falló al establecer el mensaje de despedida: ${error.message}`,
      m
    );
    await m.react('❌');
  }
};

// Configuración del comando
handler.help = ['setbye <texto>'];
handler.tags = ['grupo', 'herramientas'];
handler.command = ['setbye', 'setdespedida', 'goodbyeset'];
handler.group = true;
handler.admin = true;  // Requiere admin en grupos
handler.owner = false; // No restringido al dueño

export default handler;