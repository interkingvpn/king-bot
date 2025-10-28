var handler = async (m, { conn, command, text }) => {
  if (!text) return conn.reply(m.chat, 
    `${emoji} Por favor, escribe tu nombre y el nombre de otra persona para calcular su compatibilidad amorosa.`, 
    m
  );

  let [name1, ...name2] = text.split(' ');
  name2 = (name2 || []).join(' ');
  
  if (!name2) return conn.reply(m.chat, 
    `${emoji2} Por favor ingresa el nombre de la segunda persona.`, 
    m
  );

  const lovePercentage = Math.floor(Math.random() * 100);
  let loveMessage = `❤️ *${name1}*, tu posibilidad de enamorarte de *${name2}* es de ${lovePercentage}% `;
  
  // Añadir emojis divertidos según el porcentaje
  if (lovePercentage < 30) {
    loveMessage += '💔 (No están destinados a estar juntos)';
  } else if (lovePercentage < 70) {
    loveMessage += '💖 (¡Podría haber algo!)';
  } else {
    loveMessage += '💘 (¡Amor verdadero!)';
  }

  conn.reply(m.chat, loveMessage, m, { 
    mentions: conn.parseMention(loveMessage) 
  });
}

handler.help = ['ship <nombre1> <nombre2>', 'love <nombre1> <nombre2>'];
handler.tags = ['fun'];
handler.command = ['ship', 'love', 'pareja', 'compatibilidad'];
handler.group = true;
handler.register = true;

export default handler;