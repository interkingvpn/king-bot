const handler = async (m, { conn, args, usedPrefix, command }) => {
  // Validar entrada
  if (!args.length) {
    const ejemplo = `Ejemplo: *${usedPrefix}${command}* Nombre del Grupo`;
    return m.reply(
      `${emoji} Por favor, ingresa el nuevo nombre del grupo.\n\n${ejemplo}`
    );
  }

  const nuevoNombre = args.join(' ');

  // Validar longitud del nombre (WhatsApp permite 1-1024 caracteres)
  if (nuevoNombre.length < 1) {
    return m.reply(`${emoji2} El nombre del grupo no puede estar vacío.`);
  }
  if (nuevoNombre.length > 1024) {
    return m.reply(
      `${emoji2} El nombre del grupo es demasiado largo (máx. 1024 caracteres).\n` +
      `Longitud actual: ${nuevoNombre.length} caracteres.`
    );
  }

  try {
    // Actualizar nombre del grupo
    await conn.groupUpdateSubject(m.chat, nuevoNombre);
    
    // Confirmación de éxito
    await m.reply(`${emoji} Nombre del grupo cambiado a: *${nuevoNombre}*`);
    await m.react('✅');
    
  } catch (error) {
    console.error('Error al cambiar el nombre del grupo:', error);
    let mensajeError = `${emoji2} No se pudo cambiar el nombre del grupo. `;
    
    // Manejo de errores específicos
    if (error.message.includes('401')) {
      mensajeError += 'Necesito privilegios de administrador para cambiar el nombre.';
    } else if (error.message.includes('404')) {
      mensajeError += 'Grupo no encontrado.';
    } else {
      mensajeError += `Error: ${error.message}`;
    }
    
    await m.reply(mensajeError);
    await m.react('❌');
  }
};

// Configuración del comando
handler.help = ['setname <texto>', 'groupname <texto>'];
handler.tags = ['group'];
handler.command = ['setname', 'gpname', 'groupname', 'setgroupname'];
handler.group = true;       // Solo funciona en grupos
handler.admin = true;       // Requiere permisos de administrador
handler.botAdmin = true;    // El bot necesita ser administrador para cambiar el nombre

export default handler;