import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
    // Comprobar que el usuario haya ingresado texto
    if (!text) return conn.reply(m.chat, `Ingresa algún texto para conversar con Llama AI.`, m)
    
    try {
        // Llamar a la API de Llama AI con el texto proporcionado
        let api = await fetch(`https://delirius-apiofc.vercel.app/ia/llamaia?query=${text}`)
        let json = await api.json()
        let responseMessage = json.data

        // Enviar la respuesta de Llama AI al chat
        await conn.sendMessage(m.chat, {
            text: responseMessage
        }, { quoted: m })

    } catch (error) { 
        // Registrar cualquier error en la consola
        console.error(error)
        await conn.reply(m.chat, `✘ Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.`, m)
    }
}

// Comandos que activan este handler
handler.command = ['llama', 'meta']

export default handler