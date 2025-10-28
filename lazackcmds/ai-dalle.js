// - OfcKing >> https://github.com/interKing

import axios from 'axios';

const handler = async (m, { conn, args }) => {
    // Si no se proporciona ninguna descripción
    if (!args[0]) {
        await conn.reply(m.chat, `${emoji} Por favor, proporciona una descripción para generar la imagen.`, m);
        return;
    }

    const prompt = args.join(' ');
    const apiUrl = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${prompt}`;

    try {
        // Mensaje de espera mientras se genera la imagen
        conn.reply(m.chat, `${emoji2} Por favor espera un momento...`, m);

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        // Enviar la imagen generada
        await conn.sendMessage(m.chat, { image: Buffer.from(response.data) }, { quoted: m });
    } catch (error) {
        console.error('Error generating the image:', error);
        // Mensaje de error en caso de fallo
        await conn.reply(m.chat, `${msm} No se pudo generar la imagen, por favor intenta de nuevo más tarde.`, m);
    }
};

handler.command = ['dalle'];
handler.help = ['dalle'];
handler.tags = ['tools'];

export default handler;