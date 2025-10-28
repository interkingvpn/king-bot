import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let q = m.quoted || m
    let mime = (q.msg || q).mimetype || ''

    // Validar entrada
    if (!m.quoted) 
        return conn.reply(m.chat, `${emoji} Por favor etiqueta el *Video o Audio* que deseas convertir en documento.`, m)
    
    if (!text) 
        return conn.reply(m.chat, `${emoji2} Ingresa un nombre para guardar el documento.`, m)
    
    if (!/audio|video/.test(mime)) 
        return conn.reply(m.chat, `${emoji} Por favor etiqueta el *Video o Audio* que deseas convertir en documento.`, m)

    // Descargar el archivo
    let media = await q.download?.()
    if (!media) throw m.react('✖️')

    await m.react('🕓') // Reaccionar mientras procesa

    // Convertir y enviar como documento
    if (/video/.test(mime)) {
        return conn.sendMessage(
            m.chat, 
            { document: media, mimetype: 'video/mp4', fileName: `${text}.mp4` }, 
            { quoted: m }
        ).then(_ => m.react('✅'))
    } else if (/audio/.test(mime)) {
        return conn.sendMessage(
            m.chat, 
            { document: media, mimetype: 'audio/mpeg', fileName: `${text}.mp3` }, 
            { quoted: m }
        ).then(_ => m.react('✅'))
    }
}

handler.help = ['documento *<audio/video>*']
handler.tags = ['herramientas']
handler.command = ['todocumento', 'todoc']
handler.register = true

export default handler