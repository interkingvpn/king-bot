let handler = async (m, { conn, participants, groupMetadata }) => {
  // Obtener la foto de perfil del grupo o usar una imagen por defecto
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './Botify/kingbot.jpg';
  
  // Buscar administradores del grupo
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n▢ ');
  
  // Determinar el dueño del grupo
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || 
                (participants.length > 0 ? participants[0].id : m.chat.split`-`[0] + '@s.whatsapp.net');
  
  // Si no hay administradores, enviar aviso
  if (groupAdmins.length === 0) {
    return m.reply(`❌ *No se encontraron administradores en el grupo!*`);
  }
  
  // Contenido del mensaje
  let text = `
≡ *ADMINISTRADORES DEL GRUPO* 📌 _${groupMetadata.subject}_

👑 *Propietario:* @${owner.split('@')[0]}

┌─⊷ *LISTA DE ADMINS*  
▢ ${listAdmin}
└───────────────
`.trim();
  
  // Enviar lista formateada con foto de perfil del grupo
  await conn.sendFile(
    m.chat,
    pp,
    'admins.png',
    text,
    m,
    false,
    { mentions: [...groupAdmins.map(v => v.id), owner] }
  );
};

handler.help = ['staff'];
handler.tags = ['group'];
handler.command = ['staff', 'admins', 'listadmin']; 
handler.group = true;

export default handler;