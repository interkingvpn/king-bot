import cp from 'child_process';
import { promisify } from 'util';
const exec = promisify(cp.exec).bind(cp);

const handler = async (m, { conn }) => {
    try {
        // Enviar mensaje inicial
        await conn.reply(m.chat, `${emoji} Ejecutando prueba de velocidad...`, m);
        
        // Ejecutar comando de prueba de velocidad
        const result = await exec('python3 ./lib/ookla-speedtest.py --secure --share');
        
        // Procesar resultados
        if (result.stdout.trim()) {
            const imageUrl = result.stdout.match(/http[^"]+\.png/)?.[0];
            await conn.sendMessage(
                m.chat, 
                {
                    image: { url: imageUrl },
                    caption: `📊 *Resultados de la prueba de velocidad*\n\n${result.stdout.trim()}`
                },
                { quoted: m }
            );
        }
        
        if (result.stderr.trim()) {
            const errorImageUrl = result.stderr.match(/http[^"]+\.png/)?.[0];
            await conn.sendMessage(
                m.chat,
                {
                    image: { url: errorImageUrl },
                    caption: `⚠️ *Error en la prueba de velocidad*\n\n${result.stderr.trim()}`
                },
                { quoted: m }
            );
        }

    } catch (error) {
        console.error('Error en speedtest:', error);
        await conn.reply(
            m.chat,
            `❌ No se pudo ejecutar la prueba de velocidad:\n${error.message}`,
            m
        );
    }
};

handler.help = ['speedtest'];
handler.tags = ['info', 'herramientas'];
handler.command = ['speedtest', 'stest', 'test', 'speed'];
handler.register = true;

export default handler;