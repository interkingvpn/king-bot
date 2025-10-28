const handler = async (m, { conn, isOwner }) => {
  try {
    // Obtener todos los usuarios advertidos de la base de datos
    const warnedUsers = Object.entries(global.db.data.users)
      .filter(([_, user]) => user.warn > 0)
      .sort((a, b) => b[1].warn - a[1].warn); // Ordenar por cantidad de advertencias (de mayor a menor)

    // Formatear la lista
    let caption = `⚠️ *Lista de Usuarios Advertidos*\n` +
                 `*╭•·–––––––––––––––––––·•*\n` +
                 `│ *Total de Usuarios Advertidos: ${warnedUsers.length}*\n`;

    if (warnedUsers.length > 0) {
      warnedUsers.forEach(([jid, user], index) => {
        const userName = conn.getName(jid) || 'Usuario Desconocido';
        const userTag = isOwner ? `@${jid.split('@')[0]}` : userName;
        
        caption += `│\n│ *${index + 1}.* ${userName} *(${user.warn}/3)*\n` +
                   `│ ${userTag}\n` +
                   `│ - - - - - - - - -`;
      });
    } else {
      caption += `│\n│ No se encontraron usuarios advertidos\n│ - - - - - - - - -`;
    }

    caption += `\n*╰•·–––––––––––––––––––·•*`;

    // Enviar el mensaje formateado
    const mentions = isOwner ? warnedUsers.map(([jid]) => jid) : [];
    await conn.sendMessage(
      m.chat,
      { 
        text: caption,
        mentions: mentions
      },
      { quoted: m }
    );

    await m.react("✅");
    
  } catch (error) {
    console.error("Error al listar usuarios advertidos:", error);
    await m.reply(`⚠️ Error: No se pudo generar la lista de usuarios advertidos`);
    await m.react("❌");
  }
};

// Configuración del comando
handler.help = ['listaadvertidos', 'listadwarned'];
handler.tags = ['grupo', 'moderación'];
handler.command = ['listadv', 'advertidos'];
handler.group = true;
handler.admin = true; // Solo los administradores pueden usar

export default handler;