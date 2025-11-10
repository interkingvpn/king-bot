function handler(m, { args, isOwner, conn }) {
  if (!isOwner) return m.reply('🚫 Solo el 𝗽𝗿𝗼𝗽𝗶𝗲𝘁𝗮𝗿𝗶𝗼 puede usar este comando.');

  const estado = args[0]?.toLowerCase();
  if (estado === 'on') {
    global.antispamActivo = true;
    m.reply('✅ Anti-Spam ACTIVADO.');
  } else if (estado === 'off') {
    global.antispamActivo = false;
    m.reply('❌ Anti-Spam DESACTIVADO.');
  } else {
    m.reply('⚙️ Usa:\n/antispam on - Activa\n/antispam off - Desactiva');
  }
}

handler.command = ['antispam'];
handler.rowner = true;

export default handler;
