//Código creado por Destroy wa.me/543765142705

const handler = async (m, { conn, usedPrefix, command, text }) => {
  let quien;

  if (m.isGroup) {
    quien = m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted 
        ? m.quoted.sender 
        : text 
          ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
          : false;
  } else {
    quien = text 
      ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
      : m.chat;
  }

  if (!quien) return m.reply(`${emoji} Por favor menciona a un usuario.`);

  let pp = './src/catalogo.jpg';
  try {
    pp = await conn.getProfilePicture(quien);
  } catch (e) {
  } finally {
    let pp = await conn.profilePictureUrl(quien, 'image').catch(_ => './src/catalogo.jpg');
    let username = conn.getName(quien);
    let mensaje = `@${m.sender.split('@')[0]} está agarrando el huevo de @${quien.split('@')[0]}.`;
    let mencionados = [quien, m.sender];

    const abrazo = await conn.reply(m.chat, mensaje, m, { mentions: mencionados });
    
    conn.sendMessage(m.chat, { react: { text: '🍆', key: abrazo.key } });
  }
};

handler.help = ['huevo @usuario'];
handler.tags = ['diversión'];
handler.command = ['huevo'];
handler.group = true;
handler.register = true;

export default handler;