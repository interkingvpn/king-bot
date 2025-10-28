const handler = async (m, { conn }) => {
  // Verificar si se respondió a un mensaje
  if (!m.quoted) {
    return conn.reply(
      m.chat, 
      `${emoji} Por favor, responde al mensaje que deseas eliminar.`,
      m
    );
  }

  try {
    // Intentar eliminar normalmente (mensajes del bot)
    const quotedKey = m.quoted.key;
    return conn.sendMessage(
      m.chat, 
      { delete: quotedKey }
    );
  } catch (error) {
    try {
      // Método alternativo para eliminar mensajes de otros usuarios
      const contextInfo = m.quoted?.msg?.contextInfo;
      if (!contextInfo) throw new Error('Sin información de contexto');
      
      return conn.sendMessage(
        m.chat,
        {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: contextInfo.stanzaId,
            participant: contextInfo.participant
          }
        }
      );
    } catch (err) {
      console.error('Error al eliminar:', err);
      return conn.reply(
        m.chat,
        `${emoji2} No se pudo eliminar el mensaje. Puede que no tenga permisos.`,
        m
      );
    }
  }
};

// Configuración del comando
handler.help = ['delete'];
handler.tags = ['group'];
handler.command = ['del', 'delete', 'eliminar'];
handler.group = true;      // Funciona en grupos
handler.admin = true;      // Requiere ser admin
handler.botAdmin = true;   // El bot debe ser admin

export default handler;