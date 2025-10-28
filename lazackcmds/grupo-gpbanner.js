import { makeWASocket } from '@whiskeysockets/baileys';

const handler = async (m, { conn, usedPrefix, command }) => {
  // Obtener mensaje citado o el mensaje original
  const quotedMessage = m.quoted || m;
  const mimeType = (quotedMessage.msg || quotedMessage).mimetype || quotedMessage.mediaType || '';

  // Verificar si el mensaje contiene una imagen
  if (!/image/.test(mimeType)) {
    return m.reply(
      `${emoji} Por favor, envía o responde a una imagen para cambiar la foto de perfil del grupo.\n\n` +
      `Ejemplo: ${usedPrefix}${command} [responde a la imagen]`
    );
  }

  try {
    // Descargar la imagen
    const imageBuffer = await quotedMessage.download();
    if (!imageBuffer || imageBuffer.length === 0) {
      return m.reply(`${emoji} Error al descargar la imagen. Intenta nuevamente.`);
    }

    // Actualizar la foto de perfil del grupo
    await conn.updateProfilePicture(m.chat, imageBuffer);
    
    // Mensaje de éxito
    await m.reply(`${emoji} ¡Foto de perfil del grupo actualizada con éxito!`);
    await m.react(done);
    
  } catch (error) {
    console.error('Error al actualizar la foto de perfil:', error);
    let errorMessage = `${emoji} No se pudo actualizar la foto de perfil. `;
    
    // Casos de error específicos
    if (error.message.includes('401')) {
      errorMessage += 'El bot puede no tener permisos suficientes.';
    } else if (error.message.includes('timed out')) {
      errorMessage += 'La operación agotó el tiempo. Intenta nuevamente.';
    } else {
      errorMessage += `Error: ${error.message}`;
    }
    
    await m.reply(errorMessage);
  }
};

// Configuración del comando
handler.help = ['gppic [responder a imagen]'];
handler.tags = ['group'];
handler.command = ['gppic', 'gpbanner', 'groupimg', 'setgpic'];
handler.group = true;       // Solo en grupos
handler.admin = true;       // Se requieren permisos de admin
handler.botAdmin = true;    // El bot necesita ser admin para cambiar la foto

export default handler;