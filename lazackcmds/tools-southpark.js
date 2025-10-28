import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {

  // Si el usuario no proporciona un país
  if (!text) 
    return m.reply(m.chat, `${emoji} Por favor ingresa el nombre de un país.`, m);

  try {
    // API para obtener información del país
    let api = `https://delirius-apiofc.vercel.app/tools/flaginfo?query=${text}`;

    let response = await fetch(api);
    let json = await response.json();
    let datas = json.data;

    // Construir el texto de respuesta con información del país
    let infoText = `🍭 *Información de:* ${text}\n\n` +
                   `🍬 *Nombre oficial:* ${datas.officialName}\n` +
                   `🍰 *Organización:* ${datas.memberOf}\n` +
                   `🔖 *Capital:* ${datas.capitalCity}\n` +
                   `🗺️ *Continente:* ${datas.continent}\n` +
                   `👥 *Población:* ${datas.population}\n` +
                   `💬 *Código de llamada:* ${datas.callingCode}\n` +
                   `💸 *Moneda:* ${datas.currency}\n` +
                   `📜 *Descripción:* ${datas.description}`;

    let img = datas.image;

    // Enviar la imagen de la bandera con el texto de información
    conn.sendMessage(m.chat, { image: { url: img }, caption: infoText }, { quoted: fkontak });

  } catch (e) {
    m.reply(`${msm} Ocurrió un error: ${e.message}`);
    m.react('✖️');
  }
};

// Comandos disponibles
handler.command = ['countryinfo', 'flag'];
handler.tags = ['herramientas'];
handler.help = ['countryinfo <país>'];

export default handler;