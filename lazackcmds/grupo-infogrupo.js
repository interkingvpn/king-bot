const handler = async (m, { conn, participants, groupMetadata }) => {
  // Obtener foto de perfil del grupo o usar icono por defecto
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => global.icono);

  // Obtener configuraciones del grupo desde la base de datos
  const {
    antiLink = false, detect = false, welcome = false, modoadmin = false,
    autoRechazar = false, nsfw = false, autoAceptar = false, 
    reaction = false, isBanned = false, antifake = false
  } = global.db.data.chats[m.chat] || {};

  // Preparar lista de administradores
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins
    .map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`)
    .join('\n') || 'No admins';

  // Identificar al creador del grupo
  const owner = groupMetadata.owner || 
                groupAdmins.find(p => p.admin === 'superadmin')?.id || 
                `${m.chat.split('-')[0]}@s.whatsapp.net`;

  // Formatear información del grupo
  const text = `*✦ GROUP INFORMATION ✦*

❀ *ID:* ${groupMetadata.id}
⚘ *Name:* ${groupMetadata.subject}
❖ *Members:* ${participants.length} participants
✰ *Creator:* @${owner.split('@')[0]}
✥ *Admins (${groupAdmins.length}):*
${listAdmin}

*⚙️ GROUP SETTINGS*

◈ *Bot Status:* ${isBanned ? '❌ Disabled' : '✅ Enabled'} 
◈ *Welcome:* ${welcome ? '✅ On' : '❌ Off'}
◈ *Detect:* ${detect ? '✅ On' : '❌ Off'}  
◈ *Anti-Link:* ${antiLink ? '✅ On' : '❌ Off'} 
◈ *Auto-Accept:* ${autoAceptar ? '✅ On' : '❌ Off'}
◈ *Auto-Reject:* ${autoRechazar ? '✅ On' : '❌ Off'}
◈ *NSFW:* ${nsfw ? '✅ On' : '❌ Off'}
◈ *Admin Mode:* ${modoadmin ? '✅ On' : '❌ Off'}
◈ *Reactions:* ${reaction ? '✅ On' : '❌ Off'}
◈ *Anti-Fake:* ${antifake ? '✅ On' : '❌ Off'}

*📝 Description:*
${groupMetadata.desc?.toString() || 'No description'}`.trim();

  // Enviar mensaje con foto de grupo y menciones
  await conn.sendFile(
    m.chat,
    pp,
    'group.jpg',
    text,
    m,
    false,
    { mentions: [...groupAdmins.map(v => v.id), owner] }
  );
};

// Configuración del comando
handler.help = ['groupinfo'];
handler.tags = ['group'];
handler.command = ['groupinfo', 'ginfo', 'infogroup', 'gpinfo'];
handler.group = true;
handler.register = true;

export default handler;