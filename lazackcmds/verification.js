import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  
  if (user.registered === true) {
    return m.reply(`『✦』Ya estás registrado.\n\n*¿Quieres registrarte de nuevo?*\n\nUsa este comando para darte de baja:\n*${usedPrefix}unreg*`)
  }

  if (!Reg.test(text)) {
    return m.reply(`『✦』Formato incorrecto.\n\nUso del comando: *${usedPrefix + command} nombre.edad*\nEjemplo: *${usedPrefix + command} ${name2}.18*`)
  }

  let [_, name, splitter, age] = text.match(Reg)

  if (!name) return m.reply(`『✦』El nombre no puede estar vacío.`)
  if (!age) return m.reply(`『✦』La edad no puede estar vacía.`)
  if (name.length >= 100) return m.reply(`『✦』El nombre es demasiado largo.`)

  age = parseInt(age)
  if (age > 1000) return m.reply(`『✦』Wow, un abuelito usando el bot.`)
  if (age < 5) return m.reply(`『✦』¿Un bebé usando el bot? 😂`)

  user.name = name + '✓'.trim()
  user.age = age
  user.regTime = +new Date()
  user.registered = true
  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  let regbot = `✦ 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢 ✅ ✦\n`
  regbot += `•━━━━━━━━━━━━━━━━━━•\n`
  regbot += `> ✦ Nombre » ${name}\n`
  regbot += `> ✦ Edad » ${age} años\n`
  regbot += `•━━━━━━━━━━━━━━━━━━•\n`
  regbot += `🎁 *Recompensas:*\n`
  regbot += `> • ⛁ *${moneda}* » 40\n`
  regbot += `> • ✰ *Experiencia* » 300\n`
  regbot += `> • ❖ *Tokens* » 20\n`
  regbot += `•━━━━━━━━━━━━━━━━━━•\n`
  regbot += `> ${dev}`

  await m.react('📩')

  await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        title: '✧ Usuario verificado ✧',
        body: textbot,
        thumbnailUrl: pp,
        sourceUrl: channel,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })    
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'register', 'reg', 'verificar', 'registrar'] 

export default handler