const handler = async (m, { conn }) => {
    try {
        // Contar todos los comandos disponibles
        const totalCommands = Object.values(global.plugins)
            .filter(v => v.help && v.tags)
            .length;
        
        // Obtener categorías únicas a partir de las etiquetas
        const categories = [...new Set(
            Object.values(global.plugins)
                .filter(v => v.tags)
                .flatMap(v => v.tags)
        )].filter(Boolean);

        // Construir el mensaje de respuesta
        const message = `📊 *Estadísticas de Comandos del Bot*\n\n` +
            `✨ *Total de Comandos:* ${totalCommands}\n` +
            `📁 *Categorías:* ${categories.length}\n\n` +
            `ℹ️ Usa *${usedPrefix}help* para ver todos los comandos disponibles`;

        await conn.reply(m.chat, message, m);
        
    } catch (error) {
        console.error('Error al contar comandos:', error);
        await conn.reply(m.chat, 
            '❌ No se pudo obtener la información de los comandos', 
            m
        );
    }
};

handler.help = ['commandcount', 'totalcommands'];
handler.tags = ['info', 'main'];
handler.command = ['commandcount', 'totalcommands'];
handler.register = true;

export default handler;