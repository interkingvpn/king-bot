import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command, conn }) => {
    const msg = `${emoji} Por favor proporciona el (idioma) y el (texto) a traducir.`;

    // Verificar si se proporcionaron argumentos
    if (!args || !args[0]) return m.reply(msg);

    let lang = args[0]; // idioma de destino
    let text = args.slice(1).join(' '); // texto a traducir
    const defaultLang = 'es'; // idioma por defecto: español

    // Si el primer argumento no es un código de idioma válido de 2 letras
    if ((args[0] || '').length !== 2) {
        lang = defaultLang;
        text = args.join(' ');
    }

    // Si no hay texto, usar el texto citado
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text;

    try {
        // Intentar traducir usando Google Translate API
        const result = await translate(text, { to: lang, autoCorrect: true });
        await conn.reply(m.chat, result.text, m);
    } catch {
        try {
            // Fallback a API alternativa
            conn.reply(m.chat, '⏳ Traduciendo...', m, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        showAdAttribution: true
                    }
                }
            });

            const response = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${encodeURIComponent(text)}`);
            const json = await response.json();
            const translated = json.result.translated;

            await conn.reply(m.chat, translated, m);
        } catch {
            await m.reply(`${msm} Ocurrió un error al traducir.`);
        }
    }
};

handler.help = ['translate <lang> <text>', 'traducir <idioma> <texto>'];
handler.tags = ['herramientas'];
handler.command = ['translate', 'traducir', 'trad'];
handler.register = true;

export default handler;