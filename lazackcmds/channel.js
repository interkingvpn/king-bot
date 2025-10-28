import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  // Verificar que el usuario haya ingresado un enlace de canal
  if (!text) {
    return conn.reply(
      m.chat, 
      '🚩 Por favor proporciona un enlace de canal, jefe\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://whatsapp.com/channel/`, 
      m
    );
  }
  await m.react('🕓'); // Reaccionar con reloj mientras se procesa

  try {
    const url = `https://itzpire.com/stalk/whatsapp-channel?url=${encodeURIComponent(text)}`;
    const response = await axios.get(url);

    if (response.data && response.data.status === 'success') {
      const channelData = response.data.data;
      let txt = '`👑  I N F O R M A C I Ó N  -  D E L  C A N A L  W H A T S A P P`\n\n';
      txt += `    ✩  *Imagen* : ${channelData.img}\n`;
      txt += `    ✩  *Título* : ${channelData.title}\n`;
      txt += `    ✩  *Seguidores* : ${channelData.followers}\n`;
      txt += `    ✩  *Descripción* : ${channelData.description}\n\n`;

      let imge = channelData.img;
      let title = channelData.title;

      // Enviar imagen con la información del canal
      await conn.sendMessage(m.chat, { image: { url: imge }, caption: txt }, { quoted: m });
      await m.react('✅'); // Confirmación de éxito
    } else {
      await m.react('✖️'); // Reacción de error
      await conn.reply(m.chat, 'No se encontró información sobre este canal de WhatsApp.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Ocurrió un error al buscar información del canal.', m);
  }
}

// Categoría y ayuda
handler.tags = ['info'];
handler.help = ['whatsappchannelinfo *<link>*'];
handler.command = ['channelstalk', 'chinfo'];
handler.register = true;

export default handler;