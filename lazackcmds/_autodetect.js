import chalk from 'chalk'
import fetch from 'node-fetch'
import ws from 'ws'
let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const fkontak = { 
  "key": { 
    "participants": "0@s.whatsapp.net", 
    "remoteJid": "status@broadcast", 
    "fromMe": false, 
    "id": "Hello" 
  }, 
  "message": { 
    "contactMessage": { 
      "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD` 
    }
  }, 
  "participant": "0@s.whatsapp.net"
}  

let chat = global.db.data.chats[m.chat]
let user = `@${m.sender.split`@`[0]}`
let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://lazackorganisation.my.id/mtaju.jpg'

let name, photo, edit, newlink, status, admingp, noadmingp

name = `❀ ${user} ha cambiado el nombre del grupo.\n\n> ✦ Ahora el grupo se llama:\n> *${m.messageStubParameters[0]}*.`
photo = `❀ La imagen del grupo ha sido cambiada.\n\n> ✦ Acción realizada por:\n> » ${user}`
edit = `❀ ${user} ha permitido que ${m.messageStubParameters[0] == 'on' ? 'solo los administradores' : 'todos los miembros'} puedan configurar el grupo.`
newlink = `❀ El enlace del grupo ha sido restablecido.\n\n> ✦ Acción realizada por:\n> » ${user}`
status = `❀ El grupo ha sido ${m.messageStubParameters[0] == 'on' ? '*cerrado*' : '*abierto*'} por ${user}\n\n> ✦ Ahora ${m.messageStubParameters[0] == 'on' ? '*solo los administradores*' : '*todos los miembros*'} pueden enviar mensajes.`
admingp = `❀ @${m.messageStubParameters[0].split`@`[0]} ahora es administrador del grupo.\n\n> ✦ Acción realizada por:\n> » ${user}`
noadmingp = `❀ @${m.messageStubParameters[0].split`@`[0]} ya no es administrador del grupo.\n\n> ✦ Acción realizada por:\n> » ${user}`

if (chat.detect && m.messageStubType == 2) {
  const uniqid = (m.isGroup ? m.chat : m.sender)
  const sessionPath = './session/'
  for (const file of await fs.readdir(sessionPath)) {
    if (file.includes(uniqid)) {
      await fs.unlink(path.join(sessionPath, file))
      console.log(`${chalk.yellow.bold('[ Archivo eliminado ]')} ${chalk.greenBright(`'${file}'`)}\n` +
      `${chalk.blue('(Session PreKey)')} ${chalk.redBright('que causaba "undefined" en el chat')}`
)}} 

} else if (chat.detect && m.messageStubType == 21) {
  await this.sendMessage(m.chat, { text: name, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 22) {
  await this.sendMessage(m.chat, { image: { url: pp }, caption: photo, mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 23) {
  await this.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 25) {
  await this.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 26) {
  await this.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 29) {
  await this.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 30) {
  await this.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })
} else {
  if (m.messageStubType == 2) return
  console.log({
    messageStubType: m.messageStubType,
    messageStubParameters: m.messageStubParameters,
    type: WAMessageStubType[m.messageStubType], 
  })
}}
export default handler