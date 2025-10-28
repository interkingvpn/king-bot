let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
    // Verificar que se haya respondido a un mensaje
    if (!m.quoted) 
        return conn.reply(m.chat, `🍬 Responde a una imagen de "Ver una vez".`, m)

    // Verificar que sea un mensaje de tipo viewOnce
    if (!m?.quoted || !m?.quoted?.viewOnce) 
        return conn.reply(m.chat, `🍬 Responde a una imagen de "Ver una vez".`, m)

    // Descargar el contenido
    let buffer = await m.quoted.download(false);

    // Revisar si es video o imagen
    if (/videoMessage/.test(m.quoted.mtype)) {
        return conn.sendFile(m.chat, buffer, 'video.mp4', m.quoted.caption || '', m)
    } else if (/imageMessage/.test(m.quoted.mtype)) {
        return conn.sendFile(m.chat, buffer, 'imagen.jpg', m.quoted?.caption || '', m)
    }
}

handler.help = ['viewonce']
handler.tags = ['herramientas']
handler.command = ['leerviewonce', 'leer', 'readvo']
handler.register = true

export default handler