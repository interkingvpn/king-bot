const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Verificar grupo y permisos
    if (!m.isGroup) {
      return conn.reply(m.chat, '⚠️ Este comando solo funciona en grupos', m);
    }

    // Restablecer el enlace de invitación del grupo
    await conn.groupRevokeInvite(m.chat);
    
    // Obtener nuevo enlace de invitación
    const newInviteCode = await conn.groupInviteCode(m.chat);
    const newLink = `https://chat.whatsapp.com/${newInviteCode}`;

    // Enviar confirmación al solicitante
    await conn.reply(
      m.sender,
      `🔗 *Nuevo enlace de invitación del grupo:*\n${newLink}\n\n` +
      `✅ El enlace anterior ha sido revocado`,
      m
    );

    // Notificar al grupo (opcional)
    await conn.reply(
      m.chat,
      `📢 El enlace de invitación del grupo ha sido restablecido por @${m.sender.split('@')[0]}`,
      m,
      { mentions: [m.sender] }
    );

  } catch (error) {
    console.error('Error al restablecer enlace:', error);
    
    const errorMessages = {
      '401': '❌ Necesito permisos de administrador para restablecer el enlace',
      '404': '❌ Grupo no encontrado',
      'default': `⚠️ Falló al restablecer el enlace: ${error.message}`
    };
    
    await conn.reply(
      m.chat,
      errorMessages[error.statusCode] || errorMessages.default,
      m
    );
  }
};

// Configuración del comando
handler.help = ['revoke'];
handler.tags = ['grupo'];
handler.command = ['revoke', 'resetlink', 'restablecer'];
handler.group = true;
handler.admin = true;      // Requiere admin del usuario
handler.botAdmin = true;   // Requiere admin del bot

export default handler;