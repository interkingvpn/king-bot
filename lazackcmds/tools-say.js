let handler = async (m, { conn, args }) => {
    // Si el usuario no escribe ningún texto después del comando
    if (!args.length) 
        return conn.sendMessage(m.chat, { text: `${emoji} Por favor, escribe el texto que quieres que repita.` });

    // Unir todas las palabras en un solo mensaje
    let mensaje = args.join(' ');

    // Carácter invisible (para evitar filtros o dar formato diferente)
    let caracterInvisible = '\u200B';
    let mensajeFinal = caracterInvisible + mensaje;

    // Detectar menciones en el mensaje como @123456789
    let menciones = [...mensaje.matchAll(/@(\d+)/g)].map(v => v[1] + '@s.whatsapp.net');

    // Si hay menciones, enviar el mensaje mencionando a esos usuarios
    if (menciones.length) {
        conn.sendMessage(m.chat, { text: mensajeFinal, mentions: menciones });
    } else {
        // Si no hay menciones, solo enviar el mensaje repetido
        conn.sendMessage(m.chat, { text: mensajeFinal });
    }
};

// Comando: !say o !decir
handler.command = ['say', 'decir'];

// Categoría: herramientas
handler.tags = ['herramientas'];

// Solo en grupos
handler.group = true;

export default handler;