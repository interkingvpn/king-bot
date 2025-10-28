/**
 * Comando para establecer emoji personalizado del grupo
 * @author Angel-OFC
 * @description Edita el tagall del grupo con tu emoji favorito
 * @channel https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
 */

const handler = async (m, { conn, text, isAdmin }) => {
  // Validar entrada
  if (!text) {
    const example = `Ejemplo: *${usedPrefix}setemoji 😊*`;
    return conn.reply(
      m.chat,
      `${emoji} Por favor proporciona un emoji válido.\n\n${example}`,
      m
    );
  }

  // Limpiar y validar emoji
  const customEmoji = text.trim();
  if (!isValidEmoji(customEmoji)) {
    return conn.reply(
      m.chat,
      `${emoji2} Formato de emoji inválido. Por favor proporciona:\n` +
      `• Un solo emoji (1-2 caracteres)\n` +
      `• Sin texto o emojis combinados`,
      m
    );
  }

  try {
    // Inicializar datos del chat si no existen
    if (!global.db.data.chats[m.chat]) {
      global.db.data.chats[m.chat] = {};
    }

    // Guardar emoji en la base de datos
    global.db.data.chats[m.chat].customEmoji = customEmoji;

    // Respuesta de éxito
    const successMsg = `🎉 ¡Emoji del grupo actualizado con éxito!\n\n` +
      `Nuevo emoji: ${customEmoji}\n` +
      `Este ahora será usado en los tagall del grupo.`;
    
    await conn.sendMessage(
      m.chat,
      { 
        text: successMsg,
        mentions: [m.sender]
      },
      { quoted: m }
    );
    await m.react('✅');

  } catch (error) {
    console.error('Error SetEmoji:', error);
    await conn.reply(
      m.chat,
      `${emoji2} Falló al actualizar el emoji: ${error.message}`,
      m
    );
    await m.react('❌');
  }
};

// Validación avanzada de emoji
const isValidEmoji = (text) => {
  // Validación de emoji Unicode
  const emojiRegex = /^\p{Emoji}$/u;
  return emojiRegex.test(text) && text.length <= 2;
};

// Configuración del comando
handler.help = ['setemoji <emoji>'];
handler.tags = ['grupo', 'herramientas'];
handler.command = ['setemoji', 'setemo', 'changeemoji'];
handler.group = true;
handler.admin = true;   // Requiere admin de grupo
handler.botAdmin = true; // Bot necesita admin para modificar ajustes del grupo

export default handler;