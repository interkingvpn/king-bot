/**
 * Comando para establecer mensaje de bienvenida del grupo
 * @description Configura mensajes de bienvenida personalizados para nuevos miembros
 */
const handler = async (m, { conn, text, isAdmin }) => {
  // Validar entrada
  if (!text) {
    const example = `Ejemplo: *${usedPrefix}setwelcome Bienvenido @user a @group!*`;
    return conn.reply(
      m.chat,
      `${emoji} Por favor proporciona un mensaje de bienvenida.\n\n${example}\n\n` +
      `Variables disponibles:\n` +
      `• @user - Menciona al nuevo usuario\n` +
      `• @group - Nombre del grupo\n` +
      `• @desc - Descripción del grupo\n` +
      `• @membercount - Total de miembros del grupo`,
      m
    );
  }

  // Verificar permisos de admin en grupos
  if (m.isGroup && !isAdmin) {
    return conn.reply(
      m.chat,
      `${emoji2} ¡Solo los administradores pueden establecer mensajes de bienvenida!`,
      m
    );
  }

  try {
    // Inicializar estructura de la base de datos si es necesario
    if (!global.db.data.settings) global.db.data.settings = {};
    if (!global.db.data.settings.welcomeMessages) {
      global.db.data.settings.welcomeMessages = {};
    }

    // Guardar mensaje de bienvenida
    global.db.data.settings.welcomeMessages[m.chat] = text.trim();

    // Enviar confirmación con vista previa
    const preview = text.trim()
      .replace(/@user/g, '@1234567890')
      .replace(/@group/g, conn.getName(m.chat))
      .replace(/@desc/g, (await conn.groupMetadata(m.chat)).desc || 'Descripción del grupo')
      .replace(/@membercount/g, (await conn.groupMetadata(m.chat)).participants.length);

    await conn.reply(
      m.chat,
      `${emoji} ¡Mensaje de bienvenida establecido con éxito!\n\n` +
      `Vista previa:\n${preview}`,
      m
    );
    await m.react('✅');

  } catch (error) {
    console.error('Error SetWelcome:', error);
    await conn.reply(
      m.chat,
      `${emoji2} Falló al establecer el mensaje de bienvenida: ${error.message}`,
      m
    );
    await m.react('❌');
  }
};

// Configuración del comando
handler.help = ['setwelcome <texto>'];
handler.tags = ['grupo', 'herramientas'];
handler.command = ['setwelcome', 'setbienvenida'];
handler.group = true;
handler.admin = true;    // Requiere admin en grupos
handler.botAdmin = true; // Recomendado para funcionamiento correcto

export default handler;