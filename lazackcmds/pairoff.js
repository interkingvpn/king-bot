let handler = async (m, { conn, args }) => {
  const esPropietarioSocket = [
    conn.user.jid,
    ...(global.owner || []).map(n => n + '@s.whatsapp.net'),
  ].includes(m.sender);

  if (!esPropietarioSocket) {
    return m.reply('🕸 Solo el propietario del socket puede usar este comando.');
  }

  const settings = global.db.data.settings[conn.user.jid] || {};
  const estado = settings.self ?? false;

  if (args[0] === 'enable' || args[0] === 'on') {
    if (estado) return m.reply('🍋‍🟩 *Modo Self* ya está activado.');
    settings.self = true;
    return m.reply('ꕥ Has *Activado* el *Modo Self*.');
  }

  if (args[0] === 'disable' || args[0] === 'off') {
    if (!estado) return m.reply('🍋‍🟩 *Modo Self* ya está desactivado.');
    settings.self = false;
    return m.reply('🫟 Has *Desactivado* el *Modo Self*.');
  }

  return m.reply(
    `*🫟 Modo Self (✿❛◡❛)*\n🍋‍🟩 *Estado ›* ${estado ? '✓ Activado' : '✗ Desactivado'}\n\n🪼 Puedes cambiarlo usando:\n> ● _Activar ›_ *self enable*\n> ● _Desactivar ›_ *self disable*`
  );
};

handler.help = ['self'];
handler.tags = ['jadibot'];
handler.command = ['self'];

export default handler;