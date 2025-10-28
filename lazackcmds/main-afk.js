export function before(m) {
    // Obtener datos del usuario que envió el mensaje
    const usuario = global.db.data.users[m.sender];

    // Si el usuario estaba AFK, marcarlo como activo
    if (usuario.afk > -1) {
        conn.reply(
            m.chat, 
            `${emoji} Ya no estás AFK\n${usuario.afkReason ? 'Motivo del AFK: ' + usuario.afkReason : ''}\n\n*Duración del AFK: ${(new Date() - usuario.afk).toTimeString()}*`, 
            m
        );
        usuario.afk = -1;
        usuario.afkReason = '';
    }

    // Revisar si alguien etiquetado o citado está AFK
    const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    for (const jid of jids) {
        const usuarioAFK = global.db.data.users[jid];
        if (!usuarioAFK) continue;

        const tiempoAFK = usuarioAFK.afk;
        if (!tiempoAFK || tiempoAFK < 0) continue;

        const motivo = usuarioAFK.afkReason || '';
        conn.reply(m.chat, `${emoji2} El usuario está AFK, no lo etiquetes.`, m);
    }

    return true;
}