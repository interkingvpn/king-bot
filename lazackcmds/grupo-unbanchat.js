const handler = async (m, { conn, usedPrefix, command, args, isAdmin }) => {
  // Inicializar datos del chat si no existen
  if (!(m.chat in global.db.data.chats)) {
    global.db.data.chats[m.chat] = {};
  }
  const chat = global.db.data.chats[m.chat];

  // Validar permisos de administrador
  if (!isAdmin) {
    return conn.reply(
      m.chat,
      `🔒 Solo los administradores pueden controlar a ${botname} en este grupo`,
      m
    );
  }

  // Mostrar estado si no se proporcionan argumentos
  if (args.length === 0) {
    const status = chat.isBanned ? '❌ Desactivado' : '✅ Activado';
    const helpMsg = `⚙️ *Panel de Control de ${botname}*\n\n` +
      `Estado Actual: *${status}*\n\n` +
      `Uso:\n` +
      `• *${usedPrefix}bot on* - Activar bot\n` +
      `• *${usedPrefix}bot off* - Desactivar bot\n\n` +
      `Nota: Solo los administradores pueden usar este comando`;
    return conn.reply(m.chat, helpMsg, m);
  }

  // Procesar comandos
  const action = args[0].toLowerCase();
  switch (action) {
    case 'off':
      if (chat.isBanned) {
        return conn.reply(
          m.chat,
          `ℹ️ ${botname} ya está desactivado en este grupo`,
          m
        );
      }
      chat.isBanned = true;
      await conn.reply(
        m.chat,
        `🔇 ${botname} ha sido *desactivado* en este grupo\n` +
        `Los administradores pueden activarme en cualquier momento con *${usedPrefix}bot on*`,
        m
      );
      break;

    case 'on':
      if (!chat.isBanned) {
        return conn.reply(
          m.chat,
          `ℹ️ ${botname} ya está activado en este grupo`,
          m
        );
      }
      chat.isBanned = false;
      await conn.reply(
        m.chat,
        `🔊 ${botname} ha sido *activado* en este grupo!\n` +
        `¡Listo para servir! ${emoji}`,
        m
      );
      break;

    default:
      return conn.reply(
        m.chat,
        `⚠️ Opción inválida. Usa *${usedPrefix}bot on* o *${usedPrefix}bot off*`,
        m
      );
  }
};

// Configuración del comando
handler.help = ['bot [on/off]'];
handler.tags = ['grupo', 'admin'];
handler.command = ['bot', 'botcontrol'];
handler.group = true;
handler.admin = true;      // Requiere privilegios de administrador
handler.botAdmin = false;  // No requiere que el bot sea administrador

export default handler;