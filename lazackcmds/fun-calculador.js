const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `❀ Por favor menciona un usuario para comprobar su porcentaje.`, m);
  const percentages = (500).getRandom();
  let emoji = '';
  let description = '';

  switch (command) {
    case 'gay':
      emoji = '🏳️‍🌈';
      if (percentages < 50) {
        description = `💙 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* Gay ${emoji}\n> ✰ Bajo, eres Joto, no Gay!`;
      } else if (percentages > 100) {
        description = `💜 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* Gay ${emoji}\n> ✰ ¡Más gay de lo esperado!`;
      } else {
        description = `🖤 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* Gay ${emoji}\n> ✰ Realmente eres Gay.`;
      }
      break;

    case 'lesbiana':
      emoji = '🏳️‍🌈';
      if (percentages < 50) {
        description = `👻 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* Lesbiana ${emoji}\n✰ Tal vez necesitas más películas románticas.`;
      } else if (percentages > 100) {
        description = `❣️ Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* Lesbiana ${emoji}\n> ✰ ¡Eso es mucho amor por las chicas!`;
      } else {
        description = `💗 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* Lesbiana ${emoji}\n> ✰ ¡Sigue dejando florecer el amor!`;
      }
      break;

    case 'pajero':
    case 'pajera':
      emoji = '😏💦';
      if (percentages < 50) {
        description = `🧡 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ Tal vez necesitas más hobbies.`;
      } else if (percentages > 100) {
        description = `💕 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡Eso es resistencia admirable!`;
      } else {
        description = `💞 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ Sigue con el buen trabajo.`;
      }
      break;

    case 'puto':
    case 'puta':
      emoji = '🔥🥵';
      if (percentages < 50) {
        description = `😼 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✧ ¡Mejor suerte en tu próxima conquista!`;
      } else if (percentages > 100) {
        description = `😻 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡Estás en llamas!`;
      } else {
        description = `😺 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡Sigue con ese encanto!`;
      }
      break;

    case 'manco':
    case 'manca':
      emoji = '💩';
      if (percentages < 50) {
        description = `🌟 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡No eres el único en ese club!`;
      } else if (percentages > 100) {
        description = `💌 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡Tienes un talento muy especial!`;
      } else {
        description = `🥷 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡Sigue con esa actitud valiente!`;
      }
      break;

    case 'rata':
      emoji = '🐁';
      if (percentages < 50) {
        description = `💥 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* Rata ${emoji}\n> ✰ ¡Nada malo en disfrutar del queso!`;
      } else if (percentages > 100) {
        description = `💖 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* Rata ${emoji}\n> ✰ ¡Una verdadera rata de lujo!`;
      } else {
        description = `👑 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* Rata ${emoji}\n> ✰ ¡Come queso con moderación!`;
      }
      break;

    case 'prostituto':
    case 'prostituta':
      emoji = '🫦👅';
      if (percentages < 50) {
        description = `❀ Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡El mercado está en auge!`;
      } else if (percentages > 100) {
        description = `💖 Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡Un verdadero profesional!`;
      } else {
        description = `✨️ Los cálculos muestran que ${text.toUpperCase()} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡Siempre es hora de trabajar!`;
      }
      break;

    default:
      m.reply(`🍭 Comando inválido.`);
      return;
  }

  const responses = [
    "El universo ha hablado.",
    "Los científicos lo confirman.",
    "¡Sorpresa!"
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];
  const cal = `💫 *CALCULADORA*

${description}

➤ ${response}`.trim();

  async function loading() {
    var progress = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 ████▒▒▒▒▒▒▒▒》30%",
      "《 ███████▒▒▒▒▒》50%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%"
    ];
    let { key } = await conn.sendMessage(m.chat, {text: `🤍 Calculando porcentaje...`, mentions: conn.parseMention(cal)}, {quoted: fkontak});
    for (let i = 0; i < progress.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, {text: progress[i], edit: key, mentions: conn.parseMention(cal)}, {quoted: fkontak});
    }
    await conn.sendMessage(m.chat, {text: cal, edit: key, mentions: conn.parseMention(cal)}, {quoted: fkontak});
  }

  loading();
};

handler.help = ['gay <@tag> | <nombre>', 'lesbiana <@tag> | <nombre>', 'pajero <@tag> | <nombre>', 'pajera <@tag> | <nombre>', 'puto <@tag> | <nombre>', 'puta <@tag> | <nombre>', 'manco <@tag> | <nombre>', 'manca <@tag> | <nombre>', 'rata <@tag> | <nombre>', 'prostituta <@tag> | <nombre>', 'prostituto <@tag> | <nombre>'];
handler.tags = ['diversión'];
handler.register = true;
handler.group = true;
handler.command = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'];

export default handler;