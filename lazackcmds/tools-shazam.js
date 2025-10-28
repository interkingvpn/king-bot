import acrcloud from 'acrcloud'

// Inicializar ACRCloud con tus credenciales
let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m, { conn, usedPrefix, command }) => {
  // Usar el mensaje citado si existe, si no el mensaje actual
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''

  // Solo continuar si es audio o video
  if (/video|audio/.test(mime)) {
    let buffer = await q.download() // Descargar el archivo
    let { status, metadata } = await acr.identify(buffer) // Identificar la música

    if (status.code !== 0) throw status.msg // Lanzar error si falla la identificación

    // Extraer información de la música
    let { title, artists, album, genres, release_date } = metadata.music[0]

    // Construir mensaje de respuesta
    let txt = '╭─⬣「 *Herramienta WhatMusic* 」⬣\n'
    txt += `│  ≡◦ *🍭 Título:* ${title}${artists ? `\n│  ≡◦ *👤 Artista:* ${artists.map(v => v.name).join(', ')}` : ''}`
    txt += `${album ? `\n│  ≡◦ *📚 Álbum:* ${album.name}` : ''}${genres ? `\n│  ≡◦ *🪴 Género:* ${genres.map(v => v.name).join(', ')}` : ''}\n`
    txt += `│  ≡◦ *🕜 Fecha de lanzamiento:* ${release_date}\n`
    txt += '╰─⬣'

    conn.reply(m.chat, txt, m)
  } else {
    return conn.reply(
      m.chat, 
      `${emoji} Por favor, responde a un audio o video corto con el comando *${usedPrefix + command}* para identificar la música.`, 
      m
    )
  }
}

handler.help = ['whatmusic <audio/video>']
handler.tags = ['herramientas']
handler.command = ['shazam', 'whatmusic']
//handler.limit = 1
handler.register = true 

export default handler