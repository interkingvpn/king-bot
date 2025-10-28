const handler = async (m, { conn, text, command, usedPrefix }) => {
  const defaultPP = './src/catalogo.jpg';
  const defaultReason = 'No se proporcionó una razón';
  
  // Determinar a quién advertir (mencionado, citado o por texto)
  let quien;
  if (m.isGroup) {
    quien = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : text);
  } else {
    quien = m.chat; // En chat privado, se advierte al chat mismo
  }

  // Validar objetivo
  const advertenciaPrompt = `${emoji} Etiqueta a un usuario o responde a su mensaje para advertirlo.`;
  if (!quien) return m.reply(advertenciaPrompt, m.chat, { mentions: conn.parseMention(advertenciaPrompt) });

  // Omitir si el objetivo es el bot
  if (quien === conn.user.jid) return;

  // Obtener datos del usuario y limpiar el texto de la razón
  const user = global.db.data.users[quien] || { warn: 0 };
  const razonLimpia = (text || defaultReason).replace(/@\d+-?\d* /g, '').trim();

  // Verificar si quien advierte es dueño del bot (no se puede advertir)
  const dueñosBot = global.owner.map(([number]) => `${number}@s.whatsapp.net`);
  if (dueñosBot.includes(m.sender)) {
    await conn.reply(m.chat, "⚠️ Los dueños del bot no pueden ser advertidos.", m);
    return;
  }

  // Incrementar contador de advertencias
  user.warn += 1;

  // Enviar mensaje de advertencia
  const mensajeAdvertencia = `⚠️ *@${quien.split('@')[0]}* ha sido advertido!\n` +
                             `Razón: ${razonLimpia}\n` +
                             `Advertencias: ${user.warn}/3`;
  await m.reply(mensajeAdvertencia, null, { mentions: [quien] });

  // Auto-eliminar si advertencias ≥ 3
  if (user.warn >= 3) {
    user.warn = 0; // Reiniciar advertencias
    await m.reply(
      `🚫 *@${quien.split('@')[0]}* superó 3 advertencias y ha sido eliminado!`,
      null,
      { mentions: [quien] }
    );
    await conn.groupParticipantsUpdate(m.chat, [quien], 'remove');
  }
};

// Configuración del comando
handler.command = ['warn', 'warning', 'advertir', 'advertencia'];
handler.group = true;
handler.admin = true;       // Solo admins pueden usar
handler.botAdmin = true;    // El bot debe ser admin para eliminar miembros

export default handler;