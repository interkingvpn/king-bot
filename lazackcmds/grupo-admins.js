const handler = async (m, { conn, participants, groupMetadata, args }) => {
  // Obtener foto de perfil del grupo o usar una imagen por defecto
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => null) || './src/catalogo.jpg';
  
  // Obtener administradores y dueño del grupo
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || `${m.chat.split('-')[0]}@s.whatsapp.net`;
  
  // Preparar el mensaje
  const message = args.join(' ');
  const formattedMessage = `» ${message}`;
  
  const text = `『✦』Administradores del grupo:\n\n${listAdmin}\n\n${emoji} Mensaje: ${formattedMessage}\n\n『✦』Evita hacer mal uso de este comando, o podrías ser *eliminado* o *bloqueado* del Bot.`.trim();
  
  // Enviar el mensaje con imagen del grupo y menciones
  await conn.sendFile(
    m.chat,
    pp,
    'error.jpg',
    text,
    m,
    false,
    { mentions: [...groupAdmins.map(v => v.id), owner] }
  );
};

// Metadatos del comando
handler.help = ['admins <texto>'];
handler.tags = ['grupo'];
handler.customPrefix = /a|@/i; // Disparador insensible a mayúsculas para "a" o "@"
handler.command = /^(admins|@admins|dmins)$/i; // Soporta variaciones como "@admins" o "dmins"
handler.group = true; // Solo funciona en grupos

export default handler;