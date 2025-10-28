import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, {conn, text, command, args, usedPrefix}) => {

    // Comprobar que el usuario haya ingresado un texto
    if (!text) return conn.reply(m.chat, `Olvidaste ingresar texto para hablar con el *Bot*`, m);

    try {
        // Llamar a la función que interactúa con SimSimi
        const resSimi = await simitalk(text);
        // Enviar la respuesta al chat
        conn.sendMessage(m.chat, { text: resSimi.resultado.simsimi }, { quoted: m });
    } catch {
        throw `Ocurrió un error al procesar la solicitud.`;
    }
};

handler.help = ['simi', 'bot'];
handler.tags = ['diversión'];
handler.group = true;
handler.register = true;
handler.command = ['Nini'];

export default handler;

// Función para comunicarse con SimSimi
async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "es") {
    if (!ask) return { status: false, resultado: { msg: "Debes ingresar texto para hablar con SimSimi." }};
    
    try {
        // Primera API
        const response1 = await axios.get(`https://delirius-apiofc.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
        let trad1 = await translate(`${response1.data.data.message}`, {to: language, autoCorrect: true});
        
        if (trad1.text == 'undefined' || response1 == '' || !response1.data) trad1 = "XD"; // Forzar error para usar otra opción
        return { status: true, resultado: { simsimi: trad1.text }};        
    } catch {
        try {
            // Segunda API alternativa
            const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
            return { status: true, resultado: { simsimi: response2.data.message }};       
        } catch (error2) {
            return { 
                status: false, 
                resultado: { 
                    msg: "Todas las APIs fallaron. Por favor, intenta más tarde.", 
                    error: error2.message 
                }
            };
        }
    }
}