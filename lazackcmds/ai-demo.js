import { randomBytes } from "crypto"
import axios from "axios"

let handler = async (m, { conn, text }) => {
    // Si no se proporciona texto, preguntar al usuario
    if (!text) throw `${emoji} ¿Cómo puedo ayudarte hoy?`;
    
    try {
        // Confirmar recepción del mensaje
        conn.reply(m.chat, m);

        // Llamar a la función que consulta ChatGPT
        let data = await chatGpt(text);

        // Enviar la respuesta de ChatGPT
        await conn.sendMessage(m.chat, { 
            text: '*Demo:* ' + data
        }, { quoted: m });

    } catch (err) {
        // Mensaje de error en caso de fallo
        m.reply('error :c / ' + err);
    }
}

// Información de ayuda visible para los usuarios
handler.help = ['demo *<texto>*'];
handler.command = ['demo', 'openai'];
handler.tags = ['ai'];
handler.group = true;

export default handler;

// Función que consulta la API de ChatGPT demo
async function chatGpt(query) {
    try {
        // Crear nueva sesión de chat
        const { id_ } = (await axios.post("https://chat.chatgptdemo.net/new_chat", { user_id: "crqryjoto2h3nlzsg" }, { headers: { "Content-Type": "application/json" } })).data;

        const json = { "question": query, "chat_id": id_, "timestamp": new Date().getTime() };

        // Consultar la API de chat en streaming
        const { data } = await axios.post("https://chat.chatgptdemo.net/chat_api_stream", json, { headers: { "Content-Type": "application/json" } });
        const cek = data.split("data: ");

        let res = [];

        for (let i = 1; i < cek.length; i++) {
            if (cek[i].trim().length > 0) {
                res.push(JSON.parse(cek[i].trim()));
            }
        }

        // Unir todas las partes de la respuesta
        return res.map((a) => a.choices[0].delta.content).join("");

    } catch (error) {
        console.error("Error al procesar JSON:", error);
        return 404;
    }
}