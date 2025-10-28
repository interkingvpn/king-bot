import fetch from 'node-fetch'

var handler = async (m, { text, usedPrefix, command }) => {
    // Si no se proporciona un prompt, solicitarlo al usuario
    if (!text) return conn.reply(m.chat, `${emoji} Por favor ingresa un prompt para que Gemini responda.`, m)
    
    try {
        // Reaccionar mientras se procesa la solicitud
        await m.react(rwait)
        conn.sendPresenceUpdate('composing', m.chat)

        // Llamar a la API de Gemini con el texto proporcionado
        var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
        var res = await apii.json()

        // Enviar la respuesta de Gemini
        await m.reply(res.result)
    } catch {
        // Reaccionar y notificar en caso de error
        await m.react('❌')
        await conn.reply(m.chat, `${msm} Gemini no puede responder esa pregunta.`, m)
    }
}

handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
handler.group = true

export default handler