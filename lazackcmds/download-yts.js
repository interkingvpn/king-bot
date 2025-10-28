import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Por favor, ingresa una consulta de búsqueda para YouTube.`, m)

  conn.reply(m.chat, wait, m)

  let results = await yts(text)
  let videos = results.all

  let responseText = videos.map(v => {
    if (v.type === 'video') {
      return `📌 Resultados de búsqueda para *<${text}>*

🎵 Título » *${v.title}*
📺 Canal » *${v.author.name}*
⏱ Duración » *${v.timestamp}*
📆 Subido » *${v.ago}*
👁 Vistas » *${v.views.toLocaleString()}*
🔗 Enlace » ${v.url}`
    }
  }).filter(Boolean).join('\n\n' + '━━━━━━━━━━━━━━━━━━━━━━━\n\n')

  conn.sendFile(m.chat, videos[0].thumbnail, 'yt-search.jpg', responseText, fkontak, m)
}

handler.help = ['ytsearch']
handler.tags = ['busquedas']
handler.command = ['ytsearch', 'yts']
handler.coin = 1

export default handler