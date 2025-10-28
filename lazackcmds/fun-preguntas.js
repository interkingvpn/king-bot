// Handler de preguntas estilo 8Ball
var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Por favor ingresa una pregunta.`, m);

  // Secuencia divertida de reacciones
  await m.react('❔');
  await delay(1000);
  await m.react('❓');
  await delay(1000);
  await m.react('❔');
  await delay(1000);

  // Posibles respuestas
  const responses = [
    'Sí',
    'Tal vez sí',
    'Posiblemente',
    'Probablemente no',
    'No',
    'Imposible',
    '¿Por qué haces estas preguntas?',
    'Por eso te dejo',
    '¿Por qué quieres saberlo?',
    'No voy a decir la respuesta',
    'Pregunta de nuevo más tarde',
    'Los signos apuntan a que sí',
    'No cuentes con ello',
    'Sin duda',
    'Mis fuentes dicen que no',
    'Lo más probable',
    'No puedo predecirlo ahora'
  ];

  // Selección aleatoria
  const response = responses[Math.floor(Math.random() * responses.length)];
  
  // Envío de la respuesta
  await conn.reply(
    m.chat, 
    `*🎱 Pregunta 8Ball*\n\n` +
    `• *Pregunta:* ${text}\n` +
    `• *Respuesta:* ${response}`, 
    m
  );
}

// Comandos y configuración
handler.help = ['question <texto>'];
handler.tags = ['diversion'];
handler.command = ['question', 'ask', '8ball'];
handler.group = true;
handler.register = true;

export default handler;

// Función de delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));