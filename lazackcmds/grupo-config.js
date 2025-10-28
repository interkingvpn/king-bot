const handler = async (m, { conn, args, usedPrefix, command }) => {
  // Obtener la foto del grupo o usar un icono por defecto
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => icono);

  // Opciones de configuración del grupo
  const groupSettings = {
    'open': 'not_announcement',
    'close': 'announcement',
    'abierto': 'not_announcement',
    'cerrado': 'announcement',
    'abrir': 'not_announcement',
    'cerrar': 'announcement'
  };

  // Validar entrada
  const setting = args[0]?.toLowerCase();
  const isClose = groupSettings[setting];
  
  if (!isClose) {
    const mensajeAyuda = `${emoji} *Elige una opción para configurar el grupo*\n\n` +
                         `Ejemplos:\n` +
                         `✰ *${usedPrefix}${command} abrir*\n` +
                         `✰ *${usedPrefix}${command} cerrar*\n` +
                         `✰ *${usedPrefix}${command} open*\n` +
                         `✰ *${usedPrefix}${command} close*`;
    return conn.reply(m.chat, mensajeAyuda, m);
  }

  // Actualizar la configuración del grupo
  await conn.groupSettingUpdate(m.chat, isClose);

  // Enviar mensaje de confirmación
  const mensajeEstado = isClose === 'not_announcement' 
    ? `${emoji} *Todos ahora pueden enviar mensajes en este grupo.*`
    : `${emoji2} *Solo los administradores pueden enviar mensajes en este grupo.*`;
  
  m.reply(mensajeEstado);
};

// Configuración del comando
handler.help = ['group open/close', 'grupo abrir/cerrar'];
handler.tags = ['group'];
handler.command = ['group', 'grupo'];
handler.admin = true;       // Solo admins pueden usar
handler.botAdmin = true;    // El bot necesita privilegios de admin

export default handler;