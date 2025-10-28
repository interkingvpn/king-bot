let handler = async (m, { conn }) => {
    // Mensaje de estado del bot con emojis + pie de página
    let aliveMessage = [
        "👋 ¡Hola!",
        "🤖 Soy *KING•BOT*",
        "💡 Desarrollado por *INTER•KING*",
        "🏢 Propiedad de *INTER•KING*",
        "✅ El bot está *activo y funcionando correctamente* 🚀",
        "✨ ¡Mantente conectado y disfruta de las funciones! 🌟",
        "",
        "> ⚡ Impulsado por *INTER•KING* 🌐"
    ];

    // Enviar la primera línea
    let sent = await conn.sendMessage(m.chat, { text: aliveMessage[0] }, { quoted: m });

    try {
        for (let i = 1; i < aliveMessage.length; i++) {
            let newText = aliveMessage.slice(0, i + 1).join("\n");

            // Editar el mensaje agregando una nueva línea cada vez
            await conn.relayMessage(
                m.chat,
                {
                    protocolMessage: {
                        key: sent.key,
                        type: 14,
                        editedMessage: { conversation: newText },
                    },
                },
                {}
            );

            await sleep(1200); // Retraso para efecto de escritura
        }
    } catch (error) {
        console.error("Error en alive.js:", error);
    }
};

// Función para retrasar ejecución
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

handler.help = ['alive'];
handler.tags = ['principal'];
handler.command = ['alive'];

export default handler;