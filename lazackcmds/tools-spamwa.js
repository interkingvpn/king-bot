const handler = async (m, { conn, text }) => {
    // Separar el texto ingresado en número, mensaje y cantidad
    const [number, message, count] = text.split('|');

    // Validar entrada
    if (!number) 
        return conn.reply(m.chat, `${emoji} Por favor ingresa un número para enviar spam.`, m);

    if (!message) 
        return conn.reply(m.chat, `${emoji2} Uso correcto:\n\n> ${emoji2} #spamwa número|mensaje|cantidad`, m);

    if (count && isNaN(count)) 
        return conn.reply(m.chat, `${emoji2} La cantidad debe ser un número.`, m);

    // Formatear número a formato WhatsApp
    const fixedNumber = number.replace(/[-+<>@]/g, '')
                              .replace(/ +/g, '')
                              .replace(/^[0]/g, '62') + '@s.whatsapp.net';
    const fixedCount = count ? Number(count) : 10;

    if (fixedCount > 999) 
        return conn.reply(m.chat, `${emoji3} El límite máximo es 999 mensajes.`, m);

    // Notificar que el spam ha iniciado
    await conn.reply(m.chat, `${emoji4} Mensajes enviados correctamente.`, m);

    // Enviar el mensaje la cantidad de veces indicada
    for (let i = fixedCount; i > 0; i--) {
        conn.reply(fixedNumber, message.trim(), null);
    }
};

handler.help = ['spamwa <número>|<mensaje>|<cantidad>'];
handler.tags = ['herramientas'];
handler.command = ['spam', 'spamwa'];
handler.premium = true; // Solo usuarios premium pueden usarlo

export default handler;