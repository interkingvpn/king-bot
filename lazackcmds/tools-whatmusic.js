import acrcloud from "acrcloud"
import fetch from "node-fetch"

// Inicializar cliente de ACRCloud
const acr = new acrcloud({
   host: "identify-ap-southeast-1.acrcloud.com",
   access_key: "ee1b81b47cf98cd73a0072a761558ab1",
   access_secret: "ya9OPe8onFAnNkyf9xMTK8qRyMGmsghfuHrIMmUI"
})

let handler = async (m, { conn, text }) => {
   let q = m.quoted ? m.quoted : m

   // Validar que el mensaje contenga audio
   if (!q.mimetype || !q.mimetype.includes("audio")) {
      return m.reply("❀ Por favor responde al audio que deseas identificar.")
   }

   m.react('🕒') // Emoji de espera
   let buffer = await q.download()

   try {
      let data = await identifyMusic(buffer)
      if (!data.length) return m.reply("✧ No se encontraron datos de la canción.")

      let messageText = "乂 S H A Z A M - M U S I C 乂\n\n"
      for (let result of data) {
         messageText += `> ✐ Título » ${result.title}\n`
         messageText += `> ✦ Artista » ${result.artist}\n`
         messageText += `> ⴵ Duración » ${result.duration}\n`
         messageText += `> 🜸 Enlaces » ${result.url.filter(x => x).map(i => `\n${i}`).join("\n")}\n\n`
      }

      // Enviar mensaje enriquecido con vista previa
      conn.relayMessage(m.chat, {
         extendedTextMessage: {
            text: messageText + dev,
            contextInfo: {
               mentionedJid: conn.parseMention(messageText),
               externalAdReply: {
                  title: '✧ Whats • Music ✧',
                  mediaType: 1,
                  previewType: 0,
                  renderLargerThumbnail: true,
                  thumbnail: await (await fetch('https://i.ibb.co/knwyHNF/IMG-20251021-WA0006.jpg')).buffer(),
                  sourceUrl: ''
               }
            }
         }
      }, { quoted: m })

      m.react('✅')
   } catch (error) {
      m.reply("⚠︎ Ocurrió un error al identificar la canción.")
   }
}

handler.command = ["whatmusic", "shazam"]
handler.help = ["whatmusic"]
handler.tags = ["herramientas"]
export default handler

// Función para identificar música usando ACRCloud
async function identifyMusic(buffer) {
   let data = (await acr.identify(buffer)).metadata
   if (!data.music) return []

   return data.music.map(track => ({
      title: track.title,
      artist: track.artists[0].name,
      duration: formatTime(track.duration_ms),
      url: Object.keys(track.external_metadata).map(platform =>
         platform === "youtube"
            ? "https://youtu.be/" + track.external_metadata[platform].vid
            : platform === "deezer"
               ? "https://www.deezer.com/us/track/" + track.external_metadata[platform].track.id
               : platform === "spotify"
                  ? "https://open.spotify.com/track/" + track.external_metadata[platform].track.id
                  : ""
      )
   }))
}

// Función para formatear duración de milisegundos a mm:ss
function formatTime(ms) {
   let m = Math.floor(ms / 60000) % 60
   let s = Math.floor(ms / 1000) % 60
   return [m, s].map(v => v.toString().padStart(2, "0")).join(":")
}