import { promises as fs } from 'fs'
import path from 'path'

/**
 * Manejador para eliminar archivos de sesión de un chat o usuario específico.
 */
const handler = async (m, { conn }) => {
  // Solo permitir este comando en el número principal del bot
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.reply(m.chat, `⚠️ Por favor, utiliza este comando directamente desde el número principal del bot.`, m)
  }

  // Si es grupo, revisar tanto el ID del grupo como el del remitente
  const chatIds = m.isGroup ? [m.chat, m.sender] : [m.sender]
  const sessionPath = `./${sessions}/`

  try {
    const files = await fs.readdir(sessionPath)
    let deletedFilesCount = 0

    for (const file of files) {
      for (const id of chatIds) {
        if (file.includes(id.split('@')[0])) {
          await fs.unlink(path.join(sessionPath, file))
          deletedFilesCount++
          break
        }
      }
    }

    if (deletedFilesCount === 0) {
      await conn.reply(m.chat, `ℹ️ No se encontraron archivos de sesión para este chat/usuario.`, m)
    } else {
      await conn.reply(m.chat, `✅ Se eliminaron correctamente ${deletedFilesCount} archivo(s) de sesión.`, m)
      await conn.reply(m.chat, `👋 ¡Hola! ¿Puedes verme ahora?`, m)
    }
  } catch (err) {
    console.error('Error al leer o eliminar archivos de sesión:', err)
    await conn.reply(
      m.chat,
      `⚡ ¡Hola! Soy ${botname}. Por favor sigue y apóyanos en nuestro canal:\n\n> ${channel}`,
      m
    )
  }
}

// Configuración del comando
handler.help = ['ds', 'fixwaitingmsg']
handler.tags = ['info']
handler.command = ['fixwaitingmsg', 'ds']
handler.register = true

export default handler