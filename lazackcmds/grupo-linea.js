import axios from "axios";

const handler = async (m, { conn, args }) => {
  try {
    // Obtener foto del grupo o usar icono por defecto
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => global.icon);

    // Determinar ID del grupo (por argumento o chat actual)
    const groupId = args?.[0]?.match(/\d+\-\d+@g.us/)?.[0] || m.chat;

    // Obtener metadata del grupo
    const groupMeta = await conn.groupMetadata(groupId);
    const participants = groupMeta.participants.map(u => u.id);

    if (!participants.length) {
      return m.reply("✧ No se encontraron miembros en este grupo.");
    }

    // Ordenar participantes por número
    const sortedParticipants = participants.sort((a, b) =>
      a.split("@")[0].localeCompare(b.split("@")[0])
    );

    // Formatear la lista
    const onlineList = sortedParticipants
      .map(p => `• @${p.split("@")[0]}`)
      .join("\n");

    // Enviar mensaje con foto y menciones
    await conn.sendMessage(
      m.chat,
      {
        image: { url: pp },
        caption: `*❀ Lista de Miembros del Grupo:*\n\n${onlineList}\n\n> ${global.dev || ''}`,
        mentions: sortedParticipants
      },
      { quoted: m }
    );

    await m.react("✅");

  } catch (error) {
    console.error("Error al generar lista online:", error);
    await m.reply(`⚠️ Error: ${error.message}`);
    await m.react("❌");
  }
};

// Configuración del comando
handler.help = ["online [group-id]", "listonline"];
handler.tags = ["group", "tools"];
handler.command = ["online", "listonline"];
handler.group = true;
handler.admin = false; // Cualquiera puede usar

export default handler;