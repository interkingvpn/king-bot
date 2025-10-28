import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isAdmin }) => {
  // Validar permisos de administrador
  if (!isAdmin) {
    return m.reply('🍬 *Solo los administradores pueden ejecutar este comando*');
  }

  // Obtener usuario mencionado o remitente citado
  const user = m.mentionedJid?.[0] || 
              (m.quoted ? m.quoted.sender : text) || 
              m.sender;

  // Validar entrada del usuario
  if (!user) {
    const usage = command === 'mute' 
      ? '🍬 *Menciona a la persona que deseas silenciar*' 
      : '🍬 *Menciona a la persona que deseas desilenciar*';
    return m.reply(usage);
  }

  // Usuarios protegidos que no pueden ser silenciados
  const botOwner = global.owner[0][0] + '@s.whatsapp.net';
  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupOwner = groupMetadata.owner || m.chat.split('-')[0] + '@s.whatsapp.net';

  if (user === conn.user.jid) {
    return m.reply('🍭 *No puedes silenciar al bot*');
  }
  if (user === botOwner) {
    return m.reply('🍬 *El creador del bot no puede ser silenciado*');
  }
  if (user === groupOwner) {
    return m.reply('🍭 *No puedes silenciar al creador del grupo*');
  }

  // Manejar comandos mute/unmute
  const userData = global.db.data.users[user] || {};

  if (command === 'mute') {
    if (userData.mute) {
      return m.reply('🍭 *Este usuario ya está silenciado*');
    }
    
    userData.mute = true;
    const muteMessage = {
      key: { participants: ['0@s.whatsapp.net'], fromMe: false, id: 'Halo' },
      message: {
        locationMessage: {
          name: 'LazackOrganisation',
          jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
        }
      },
      participant: '0@s.whatsapp.net'
    };
    
    await conn.reply(m.chat, '*Tus mensajes serán eliminados*', muteMessage, { mentions: [user] });
    
  } else if (command === 'unmute') {
    if (!userData.mute) {
      return m.reply('🍭 *Este usuario no está silenciado*');
    }
    
    userData.mute = false;
    const unmuteMessage = {
      key: { participants: ['0@s.whatsapp.net'], fromMe: false, id: 'Halo' },
      message: {
        locationMessage: {
          name: 'LazackOrganisation',
          jpegThumbnail: await (await fetch('https://lazackorganisation.my.id/lazack.jpg')).buffer(),
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
        }
      },
      participant: '0@s.whatsapp.net'
    };
    
    await conn.reply(m.chat, '*Tus mensajes ya no serán eliminados*', unmuteMessage, { mentions: [user] });
  }
};

handler.help = ['mute @user', 'unmute @user'];
handler.tags = ['grupo', 'moderación'];
handler.command = ['mute', 'unmute', 'muto', 'desmute'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;