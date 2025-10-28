import fetch from 'node-fetch'

let handler = async (m, { conn, command, args }) => {
    // Verificar si el usuario proporcionó un enlace
    if (!args[0]) 
        return conn.reply(m.chat, `${emoji} Por favor proporciona un enlace de página web.`, m)

    try {
        // Reaccionar con emoji de espera
        await m.react(rwait)

        // Notificar al usuario que se está obteniendo la información
        conn.reply(m.chat, `${emoji2} Obteniendo la información de la página web...`, m)

        // Captura de pantalla de la página completa usando thum.io
        let screenshot = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()

        // Enviar la captura de pantalla
        conn.sendFile(m.chat, screenshot, 'captura.png', `🔗 ${args[0]}`, m)

        // Reaccionar con emoji de done
        await m.react(done)

    } catch {
        // Manejo de errores
        await m.react(error)
        return conn.reply(m.chat, `${msm} Ocurrió un error al obtener la página.`, m)
    }
}

handler.help = ['ssweb <url>', 'ss <url>']
handler.tags = ['herramientas']
handler.command = ['ssweb', 'ss']

export default handler