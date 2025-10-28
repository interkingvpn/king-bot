const handler = async (m, { text }) => {
    const user = global.db.data.users[m.sender];
    user.afk = +new Date();
    user.afkReason = text;
    conn.reply(m.chat, `${emoji} *El usuario ${conn.getName(m.sender)} ahora está AFK*\n\n*Razón: ${text ? ': ' + text : '¡No especificada!'}*
`, m);
};

handler.help = ['afk [razón]'];
handler.tags = ['main'];
handler.command = ['afk'];
handler.group = true;
handler.register = true;

export default handler;