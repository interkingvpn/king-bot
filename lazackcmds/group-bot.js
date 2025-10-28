let handler = async (m, { conn, text, args }) => {

  if (!args[0]) {
    const state = global.db.data.chats[m.chat]?.bannedGrupo ?? false;
    const stateText = state ? '✗ Deshabilitado' : '✓ Habilitado';
    const info = `*🫟 Estado del Bot (｡•́‿•̀｡)*\n` +
                 `🫗 *Actual ›* ${stateText}\n\n` +
                 `🌱 Puedes cambiarlo con:\n` +
                 `> ● _Habilitar ›_ *bot on*\n` +
                 `> ● _Deshabilitar ›_ *bot off*`;
    return m.reply(info);
  }

  try {
    const chat = global.db.data.chats[m.chat];
    const state = chat.bannedGrupo ?? false;
    const action = args[0].toLowerCase();

    if (action === 'off') {
      if (state) return m.reply('🌱 El *Bot* ya estaba *deshabilitado* en este grupo.');
      chat.bannedGrupo = true;
      return m.reply('🫟 Has *deshabilitado* el *Bot* en este grupo.');
    }

    if (action === 'on') {
      if (!state) return m.reply('🌱 El *Bot* ya estaba *habilitado* en este grupo.');
      chat.bannedGrupo = false;
      return m.reply('🫟 Has *habilitado* el *Bot* en este grupo.');
    }

    return m.reply('🌿 Usa: *bot on* o *bot off* para cambiar el estado.');
  } catch (e) {
    await m.reply('🕸 Ocurrió un error al intentar cambiar el estado del bot.');
  }
};

handler.tags = ['grupo'];
handler.help = ['bot'];
handler.command = ['bot'];
handler.admin = true;

export default handler;