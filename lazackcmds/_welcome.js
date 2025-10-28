import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  const fkontak = { 
    "key": { 
      "participants":"0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "Halo" 
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD` 
      }
    }, 
    "participant": "0@s.whatsapp.net"
  };

  // Foto de perfil del usuario; si no existe, usar la nueva URL por defecto
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
    .catch(_ => 'https://i.ibb.co/1YdP9PKD/Picsart-25-10-25-19-19-07-837.jpg');
  let img = await (await fetch(`${pp}`)).buffer();

  let chat = global.db.data.chats[m.chat];
  let txt = 'ゲ◜៹ Nuevo Miembro ៹◞ゲ';
  let txt1 = 'ゲ◜៹ Miembro se va ៹◞ゲ';
  let groupSize = participants.length;

  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Bienvenido* a ${groupMetadata.subject}\n✰ @${m.messageStubParameters[0].split`@`[0]}\n${global.welcom1}\n✦ Ahora somos ${groupSize} miembros.\n•(=^●ω●^=)• ¡Disfruta tu estadía en el grupo!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`;
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak);
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let despedida = `❀ *Adiós* de ${groupMetadata.subject}\n✰ @${m.messageStubParameters[0].split`@`[0]}\n${global.welcom2}\n✦ Ahora somos ${groupSize} miembros.\n•(=^●ω●^=)• ¡Esperamos verte pronto!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`;
    await conn.sendMini(m.chat, txt1, dev, despedida, img, img, redes, fkontak);
  }
}