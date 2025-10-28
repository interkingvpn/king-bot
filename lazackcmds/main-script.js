import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    let res = await fetch('https://api.github.com/repos/interking/king-bot')

    if (!res.ok) throw new Error('Error al obtener los datos del repositorio')
    let json = await res.json()

    let txt = `*乂  M A I N  -  S C R I P T  乂*\n\n`
    txt += `✩  *Nombre* : ${json.name}\n`
    txt += `✩  *Observadores* : ${json.watchers_count}\n`
    txt += `✩  *Tamaño* : ${(json.size / 1024).toFixed(2)} MB\n`
    txt += `✩  *Actualizado* : ${moment(json.updated_at).tz('Africa/Nairobi').format('DD/MM/YY - HH:mm:ss')}\n`
    txt += `✩  *URL* : ${json.html_url}\n`
    txt += `✩  *Forks* : ${json.forks_count}\n`
    txt += `✩  *Estrellas* : ${json.stargazers_count}\n\n`
    txt += `> *KING•BOT Oficial | INTER•KING*`

    await conn.sendMessage(m.chat, {
      text: txt,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363321705798318@newsletter', // ID de tu canal
          newsletterName: 'Powered by INTER•KING', // Nombre del canal
          serverMessageId: -1
        },
        externalAdReply: {
          title: '✨ KING•BOT v2.0.0 (BETA)',
          body: 'Repositorio oficial del bot',
          thumbnailUrl: 'https://wa.me/message/VB7OEFMW6AD5F1',
          sourceUrl: json.html_url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch {
    await conn.reply(m.chat, '⚠️ Ocurrió un error al obtener la información del repositorio.', m)
    await m.react('❌')
  }
}

handler.help = ['script', 'sc', 'repo']
handler.tags = ['main']
handler.command = ['script', 'sc', 'repo']

export default handler