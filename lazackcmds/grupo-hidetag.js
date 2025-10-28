import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

const handler = async (m, { conn, text, participants, isOwner, isAdmin, usedPrefix }) => {
  // Validar que se proporcione texto o se cite un mensaje
  if (!m.quoted && !text) {
    return conn.reply(
      m.chat, 
      `❀ Por favor proporciona un texto o cita un mensaje para mencionar a todos.\n\nEjemplo: *${usedPrefix}hidetag Hola a todos!*`,
      m
    )
  }

  try {
    // Obtener todos los JIDs de los participantes del grupo
    const users = participants.map(u => conn.decodeJid(u.id))
    if (users.length === 0) throw new Error('No se encontraron participantes')

    // Preparar el contenido del mensaje
    const quotedMsg = m.quoted ? m.quoted : m
    const messageContent = text || quotedMsg.text || '¡Hola a todos!'
    
    // Carácter invisible para hidetag (evita que el mensaje muestre @todos)
    const hiddenMentionChar = String.fromCharCode(8206).repeat(850)

    // Manejo de mensajes con medios (imagen, video, sticker, audio)
    if (m.quoted?.mtype) {
      const mime = (quotedMsg.msg || quotedMsg).mimetype || ''
      const isMedia = /image|video|sticker|audio/.test(mime)
      
      if (isMedia) {
        const media = await quotedMsg.download?.()
        const mediaType = quotedMsg.mtype.replace('Message', '').toLowerCase()
        
        return conn.sendMessage(
          m.chat,
          { 
            [mediaType]: media,
            caption: mediaType !== 'sticker' ? messageContent : undefined,
            mentions: users
          },
          { quoted: null }
        )
      }
    }

    // Enviar mensaje de texto con hidetag
    await conn.sendMessage(
      m.chat,
      {
        text: `${hiddenMentionChar}${messageContent}`,
        mentions: users
      },
      { quoted: null }
    )

  } catch (error) {
    console.error('Error en hidetag:', error)
    await conn.reply(
      m.chat,
      `❀ No se pudo enviar el mensaje de mencionar a todos:\n${error.message}`,
      m
    )
  }
}

// Configuración del comando
handler.help = ['hidetag <texto>', 'notify <texto>']
handler.tags = ['group']
handler.command = ['hidetag']
handler.group = true       // Solo funciona en grupos
handler.admin = true       // Solo admins pueden usarlo
handler.botAdmin = true    // El bot necesita ser admin para usar hidetag

export default handler