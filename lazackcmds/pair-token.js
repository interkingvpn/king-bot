import ws from 'ws'

async function handler(m, { conn: stars, usedPrefix }) {
  let usuariosUnicos = new Map()

  // Recorre todas las conexiones activas
  global.conns.forEach((conn) => {
    if (conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED) {
      usuariosUnicos.set(conn.user.jid, conn)
    }
  })

  let usuarios = [...usuariosUnicos.values()]

  // Genera el listado de sub-bots conectados
  let mensaje = usuarios.map((v, index) => `*#${index + 1} »* ${v.user.name || '-'}\n   ↳ wa.me/${v.user.jid.replace(/[^0-9]/g, '')}`).join('\n\n')

  let respuesta = mensaje.length === 0 ? '' : mensaje
  let totalUsuarios = usuarios.length
  let mensajeFinal = `*🕸 Total de Sub-Bots »* ${totalUsuarios || '0'}\n\n${respuesta.trim()}`.trim()

  await stars.sendMessage(m.chat, { text: mensajeFinal, ...rcanal }, { quoted: m })
}

handler.command = ['sockets', 'bots']
handler.help = ['bots', 'sockets']
handler.tags = ['pairbot']
export default handler