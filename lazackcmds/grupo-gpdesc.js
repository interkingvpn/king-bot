const handler = async (m, { conn, args, usedPrefix, command }) => {
  // Verificar si se proporcionó texto para la descripción
  if (!args.length) {
    return m.reply(
      `${emoji} Por favor, proporciona una nueva descripción para el grupo.\n\n` +
      `Ejemplo: *${usedPrefix}${command}* ¡Este es nuestro grupo increíble!`
    );
  }

  const nuevaDescripcion = args.join(' ');

  // Validar longitud de la descripción (WhatsApp permite hasta 1024 caracteres)
  if (nuevaDescripcion.length > 1024) {
    return m.reply(
      `${emoji2} La descripción es demasiado larga (máximo 1024 caracteres).\n` +
      `Longitud actual: ${nuevaDescripcion.length} caracteres.`
    );
  }

  try {
    // Actualizar la descripción del grupo
    await conn.groupUpdateDescription(m.chat, nuevaDescripcion);
    
    // Confirmación de éxito
    await m.reply(`${emoji} ¡Descripción del grupo actualizada con éxito!`);
    await m.react('✅');
    
  } catch (error) {
    console.error('Error al actualizar la descripción:', error);
    let mensajeError = `${emoji2} No se pudo actualizar la descripción del grupo. `;
    
    // Manejo de errores específicos
    if (error.message.includes('401')) {
      mensajeError += 'Necesito privilegios de administrador para cambiar la descripción.';
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
handler.help = ['setdesc <texto>', 'groupdesc <texto>'];
handler.tags = ['group'];
handler.command = ['setdesc', 'gpdesc', 'groupdesc', 'setgroupdesc'];
handler.group = true;       // Solo funciona en grupos
handler.admin = true;       // Requiere permisos de administrador
handler.botAdmin = true;    // El bot necesita ser administrador para cambiar la descripción

export default handler;