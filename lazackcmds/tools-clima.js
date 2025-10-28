import axios from "axios";

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    // Si no se proporciona ciudad o país
    let resp = `🌤️ Ingresa el nombre de tu país o ciudad.`;
    let txt = '';
    let count = 0;

    // Efecto de escritura (un carácter a la vez)
    for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) conn.sendPresenceUpdate('composing', m.chat);
    }

    // Enviar mensaje
    await conn.sendMessage(
      m.chat,
      { text: txt.trim(), mentions: conn.parseMention(txt) },
      { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 }
    );
    return;
  }

  try {
    // Llamada a la API de Meteored
    const response = await axios.get(`https://api.meteored.com/api/forecast/${args[0]}?language=es`);
    const res = response.data;

    // Extraer información del clima
    const name = res.location.name;
    const Country = res.location.country;
    const Weather = res.current.weather.description;
    const Temperature = res.current.temperature + "°C";
    const Minimum_Temperature = res.current.temp_min + "°C";
    const Maximum_Temperature = res.current.temp_max + "°C";
    const Humidity = res.current.humidity + "%";
    const Wind = res.current.wind_speed + " km/h";

    // Formatear reporte del clima
    const wea = `「 📍 」UBICACIÓN: ${name}
「 🗺️ 」PAÍS: ${Country}
「 🌤️ 」CLIMA: ${Weather}
「 🌡️ 」TEMPERATURA: ${Temperature}
「 💠 」MÍNIMA: ${Minimum_Temperature}
「 📛 」MÁXIMA: ${Maximum_Temperature}
「 💦 」HUMEDAD: ${Humidity}
「 🌬️ 」VIENTO: ${Wind}`.trim();

    // Efecto de escritura
    let txt = '';
    let count = 0;
    for (const c of wea) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) conn.sendPresenceUpdate('composing', m.chat);
    }

    await conn.sendMessage(
      m.chat,
      { text: txt.trim(), mentions: conn.parseMention(txt) },
      { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 }
    );

  } catch (e) {
    // Si la ciudad o país no se encuentra
    let resp = `❌ ¡Error! No se encontraron resultados, intenta ingresando un país o ciudad existente.`;
    let txt = '';
    let count = 0;
    for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) conn.sendPresenceUpdate('composing', m.chat);
    }

    await conn.sendMessage(
      m.chat,
      { text: txt.trim(), mentions: conn.parseMention(txt) },
      { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 }
    );
  }
};

// Ayuda y configuración de comandos
handler.help = ['clima *<ciudad/país>*'];
handler.tags = ['herramientas'];
handler.command = ['clima', 'tiempo', 'meteorologia'];

export default handler;