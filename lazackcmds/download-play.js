import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `❀ Por favor ingresa el nombre de la música a descargar.`, m)
    }

    let videoIdToFind = text.match(youtubeRegexID) || null
    let ytplay2 = await yts(videoIdToFind === null ? text : 'https://youtu.be/' + videoIdToFind[1])

    if (videoIdToFind) {
      const videoId = videoIdToFind[1]
      ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)
    }

    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2
    if (!ytplay2 || ytplay2.length == 0) {
      return m.reply('✧ No se encontraron resultados para tu búsqueda.')
    }

    let { title, thumbnail, timestamp, views, ago, url, author } = ytplay2
    title = title || 'No encontrado'
    thumbnail = thumbnail || 'No encontrado'
    timestamp = timestamp || 'No encontrado'
    views = views || 'No disponible'
    ago = ago || 'No disponible'
    url = url || 'No disponible'
    author = author || 'Desconocido'

    const formattedViews = formatViews(views)
    const channel = author.name ? author.name : 'Desconocido'
    const infoMessage = `「✦」Descargando *<${title || 'Desconocido'}>*\n\n> ✧ Canal » *${channel}*\n> ✰ Vistas » *${formattedViews || 'Desconocido'}*\n> ⴵ Duración » *${timestamp || 'Desconocido'}*\n> ✐ Publicado » *${ago || 'Desconocido'}*\n> 🜸 Link » ${url}`

    const thumb = (await conn.getFile(thumbnail))?.data
    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }

    await conn.reply(m.chat, infoMessage, m, JT)

    // Manejo de audio
    if (['play', 'yta', 'ytmp3', 'playaudio'].includes(command)) {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/v1/download/youtube/audio?url=${url}&quality=128`)).json()
        const result = api.result.download.url

        if (!result) throw new Error('⚠ El enlace de audio no se generó correctamente.')

        await conn.sendMessage(
          m.chat,
          {
            audio: { url: result },
            fileName: `${api.result.title}.mp3`,
            mimetype: 'audio/mpeg',
          },
          { quoted: m }
        )
      } catch (e) {
        return conn.reply(
          m.chat,
          '⚠︎ No se pudo enviar el audio. Esto puede deberse a que el archivo es demasiado grande o a un error al generar el enlace. Intenta nuevamente más tarde.',
          m
        )
      }
    }

    // Manejo de video
    else if (['play2', 'ytv', 'ytmp4', 'mp4'].includes(command)) {
      try {
        const response = await fetch(`https://api.vreden.my.id/api/v1/download/youtube/video?url=${url}&quality=360`)
        const json = await response.json()
        await conn.sendFile(m.chat, json.data.url, json.title + '.mp4', title, m)
      } catch (e) {
        return conn.reply(
          m.chat,
          '⚠︎ No se pudo enviar el video. Esto puede deberse a que el archivo es demasiado grande o a un error al generar el enlace. Intenta nuevamente más tarde.',
          m
        )
      }
    }

    // Comando no reconocido
    else {
      return conn.reply(m.chat, '✧︎ Comando no reconocido.', m)
    }

  } catch (error) {
    return m.reply(`⚠︎ Ocurrió un error: ${error}`)
  }
}

handler.command = handler.help = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4', 'playaudio', 'mp4']
handler.tags = ['descargas']
handler.group = true

export default handler

// Función para formatear el número de vistas
function formatViews(views) {
  if (views === undefined) return "No disponible"

  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  } else if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  } else if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  }

  return views.toString()
}