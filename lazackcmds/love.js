let handler = async (m, { conn, args }) => {
    // Expresión regular y mensaje por defecto
    let regix = /\S+/; // Coincide con cualquier carácter que no sea espacio
    let mensajePorDefecto = "¡TE AMO! "; // Mensaje por defecto si no hay entrada

    // Verificar si el usuario envió un mensaje, sino usar el mensaje por defecto
    let mensajeAEnviar = regix.test(args.join(' ')) ? args.join(' ') : mensajePorDefecto;

    // Array de emojis de corazones y festivos
    let emojis = [
        "❤", "💕", "😻", "🧡", "💛", "💚", "💙", "💜", "🖤", "❣", 
        "💞", "💓", "💗", "💖", "💘", "💝", "💟", "♥", "💌", 
        "🙂", "🤗", "😌", "😉", "🤗", "😊", "🎊", "🎉", "🎁", "❤"
    ];

    // Enviar el mensaje inicial
    let enviado = await conn.sendMessage(m.chat, { text: `${mensajeAEnviar} 💖` }, { quoted: m });

    try {
        // Editar el mensaje varias veces con los emojis
        for (let i = 0; i < emojis.length; i++) {
            let nuevoTexto = `${emojis[i]}`;

            // Editar el mensaje usando protocolMessage
            await conn.relayMessage(
                m.chat,
                {
                    protocolMessage: {
                        key: enviado.key,
                        type: 14,
                        editedMessage: { conversation: nuevoTexto },
                    },
                },
                {}
            );

            await sleep(800); // Pausa entre cada edición
        }
    } catch (error) {
        console.error("Error en love.js:", error);
    }
};

// Función para pausar la ejecución (sleep)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Configuración del handler
handler.help = ['love'];
handler.tags = ['diversión'];
handler.command = ['amor'];

export default handler;