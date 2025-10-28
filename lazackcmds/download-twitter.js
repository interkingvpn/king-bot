import axios from 'axios';
let sending = false;

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
    if (!args || !args[0]) 
        return conn.reply(m.chat, `${emoji} Por favor, ingresa el enlace de la imagen o video de Twitter.`, m);

    if (sending) return; 
    sending = true;

    try {
        const apiResponse = await axios.get(`https://delirius-apiofc.vercel.app/download/twitterdl?url=${args[0]}`);
        const res = apiResponse.data;

        const caption = res.caption ? res.caption : `${emoji} Aquí tienes ฅ^•ﻌ•^ฅ.`;

        if (res?.type === 'video') {
            await conn.sendMessage(m.chat, { video: { url: res.media[0].url }, caption: caption }, { quoted: m });
        } else if (res?.type === 'image') {
            await conn.sendMessage(m.chat, { image: { url: res.media[0].url }, caption: caption }, { quoted: m });
        }

        sending = false;
    } catch (error) {
        sending = false;
        console.error(error);         
        conn.reply(m.chat, `${msm} Error al descargar tu archivo.`, m);
    }
};

handler.help = ['twitter <url>'];
handler.tags = ['descargas'];
handler.command = ['x', 'xdl', 'dlx', 'twdl', 'tw', 'twt', 'twitter'];
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler;