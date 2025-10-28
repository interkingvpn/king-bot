const handler = async (m, { conn, text, usedPrefix, command }) => {
  // Validación de entrada
  if (!text) {
    const example = `> 📌 Ejemplo: *${usedPrefix + command}* Opción1|Opción2|Opción3`;
    return conn.reply(
      m.chat,
      `${emoji} Por favor, ingresa el texto para iniciar la encuesta.\n\n${example}`,
      m
    );
  }

  if (!text.includes('|')) {
    const example = `> 📌 Ejemplo: *${usedPrefix + command}* Opción1|Opción2`;
    return conn.reply(
      m.chat,
      `${emoji2} Separa las opciones de la encuesta con *|*\n\n${example}`,
      m
    );
  }

  // Procesar opciones
  const options = text.split('|')
    .map(option => option.trim())
    .filter(option => option.length > 0);

  // Validar que haya al menos 2 opciones
  if (options.length < 2) {
    return conn.reply(
      m.chat,
      `${emoji2} Por favor, proporciona al menos 2 opciones diferentes para la encuesta.`,
      m
    );
  }

  try {
    // Crear la encuesta
    await conn.sendPoll(
      m.chat,
      `${packname} Encuesta`, // Título de la encuesta
      options.map(option => [option]), // Formato de opciones
      m // Contexto del mensaje original
    );
  } catch (error) {
    console.error('Error al crear la encuesta:', error);
    await conn.reply(
      m.chat,
      `${emoji2} No se pudo crear la encuesta. Intenta de nuevo más tarde.`,
      m
    );
  }
};

// Configuración del comando
handler.help = ['poll <opción1|opción2|opción3>'];
handler.tags = ['group'];
handler.command = ['poll', 'encuesta', 'votacion'];
handler.group = true;
handler.admin = false; // Cualquiera puede usar
handler.botAdmin = true; // El bot necesita ser admin para enviar encuestas

export default handler;