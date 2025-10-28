import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args, text }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    // Validar entrada
    if (!mime) 
        return conn.reply(m.chat, `${emoji} Por favor responde a una *Imagen* o *Video*.`, m)
    
    if (!text) 
        return conn.reply(m.chat, `${emoji} Ingresa el nuevo tamaño para la imagen/video.`, m)

    await m.react('🕓') // Reaccionar mientras procesa

    try {
        if (isNaN(text)) 
            return conn.reply(m.chat, `${emoji2} Solo se permiten números.`, m).then(_ => m.react('✖️'))

        if (!/image\/(jpe?g|png)|video|document/.test(mime)) 
            return conn.reply(m.chat, `${emoji2} Formato no soportado.`, m)

        let fileData = await q.download()
        let url = await uploadImage(fileData)

        // Enviar imagen actualizada con nuevo tamaño
        if (/image\/(jpe?g|png)/.test(mime)) {
            await conn.sendMessage(
                m.chat, 
                { image: { url }, caption: `📏 Nuevo tamaño: ${text}`, mentions: [m.sender] }, 
                { ephemeralExpiration: 24*3600, quoted: m }
            )
            await m.react('✅')
        } 
        // Enviar video actualizado con nuevo tamaño
        else if (/video/.test(mime)) {
            await conn.sendMessage(
                m.chat, 
                { video: { url }, caption: `📏 Nuevo tamaño: ${text}`, mentions: [m.sender] }, 
                { ephemeralExpiration: 24*3600, quoted: m }
            )
            await m.react('✅')
        }

    } catch {
        await m.react('✖️')
    }
}

handler.tags = ['herramientas']
handler.help = ['filesize *<tamaño>*']
handler.command = ['filelength', 'length', 'size']
handler.register = true 

export default handler