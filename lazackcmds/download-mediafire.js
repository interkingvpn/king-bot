import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) throw m.reply(`${emoji} Por favor ingresa un enlace de Mediafire.`);
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let ouh = await fetch(`https://api.agatz.xyz/api/mediafire?url=${text}`)
  let gyh = await ouh.json() 

  await conn.sendFile(
    m.chat, 
    gyh.data[0].link, 
    `${gyh.data[0].nama}`, 
    `乂  *MEDIAFIRE - DESCARGAS!*  乂\n\n` +
    `✩ *Nombre* : ${gyh.data[0].nama}\n` +
    `✩ *Tamaño* : ${gyh.data[0].size}\n` +
    `✩ *Tipo* : ${gyh.data[0].mime}\n` +
    `> ${dev}`,
    m
  )       

  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}

handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = ['mf', 'mediafire']
handler.coin = 10
handler.register = true
handler.group = true

export default handler