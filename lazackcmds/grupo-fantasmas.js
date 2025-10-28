import { areJidsSameUser } from '@whiskeysockets/baileys'

const handler = async (m, { conn, text, participants, args, command }) => {
  // Configuración
  const KICK_DELAY = 10000 // 10 segundos entre expulsiones
  const MIN_MESSAGES = 0 // Mensajes mínimos para no ser considerado fantasma
  
  // Obtener todos los IDs de miembros
  const members = participants.map(u => u.id)
  
  // Determinar cuántos procesar (todos o número especificado)
  const processCount = text && !isNaN(text) ? Math.min(Number(text), members.length) : members.length
  
  // Identificar miembros fantasma
  let ghostCount = 0
  const ghosts = []
  
  for (let i = 0; i < processCount; i++) {
    const memberId = members[i]
    const userData = global.db.data.users[memberId] || {}
    const participant = participants.find(u => areJidsSameUser(u.id, memberId)) || {}
    
    const isGhost = (
      (userData.chat === undefined || userData.chat <= MIN_MESSAGES) &&
      !participant.admin &&
      !participant.isSuperAdmin &&
      (userData.whitelist === undefined || userData.whitelist === false)
    )
    
    if (isGhost) {
      ghostCount++
      ghosts.push(memberId)
    }
  }

  // Manejar comandos
  switch (command) {
    case 'fantasmas': // Comando lista de fantasmas
      if (ghostCount === 0) {
        return conn.reply(m.chat, `${emoji} Este grupo está activo, no se encontraron miembros fantasmas.`, m)
      }
      
      const ghostList = ghosts.map(v => '@' + v.split('@')[0]).join('\n')
      return conn.reply(
        m.chat,
        `${emoji} *Reporte de Miembros Fantasma*\n\n` +
        `${emoji2} *Miembros Fantasma (${ghostCount})*\n${ghostList}\n\n` +
        `*📝 NOTA:*\n` +
        `Esto no es 100% preciso. El bot solo cuenta mensajes desde que fue activado.`,
        m,
        { mentions: ghosts }
      )

    case 'kickfantasmas': // Comando expulsar fantasmas
      if (ghostCount === 0) {
        return conn.reply(m.chat, `${emoji} Este grupo está activo, no hay fantasmas para expulsar.`, m)
      }

      // Desactivar bienvenida temporalmente
      const chatData = global.db.data.chats[m.chat]
      const originalWelcome = chatData.welcome
      chatData.welcome = false

      try {
        // Anunciar expulsión
        const ghostList = ghosts.map(v => '@' + v.split('@')[0]).join('\n')
        await conn.reply(
          m.chat,
          `${emoji} *Expulsión de Miembros Fantasma*\n\n` +
          `${emoji2} *Miembros Fantasma (${ghostCount})*\n${ghostList}\n\n` +
          `_El bot expulsará a los usuarios listados cada 10 segundos._`,
          m,
          { mentions: ghosts }
        )

        // Procesar expulsiones con retraso
        for (const user of ghosts) {
          if (!areJidsSameUser(user, conn.user.id)) { // No expulsar al bot
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
              .catch(e => console.error(`No se pudo expulsar a ${user}:`, e))
            await delay(KICK_DELAY)
          }
        }
      } finally {
        // Restaurar configuración de bienvenida
        chatData.welcome = originalWelcome
      }
      break
  }
}

// Configuración del comando
handler.help = [
  'fantasmas - Listar miembros inactivos',
  'kickfantasmas - Expulsar miembros inactivos'
]
handler.tags = ['group']
handler.command = ['ghosts', 'kickghosts']
handler.group = true
handler.botAdmin = true // El bot necesita ser admin
handler.admin = true // Usuario necesita ser admin

export default handler

// Función de utilidad
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))