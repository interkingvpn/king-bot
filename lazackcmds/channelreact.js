// smartAutoReactNewsletter.js
// Reaccionador automático de newsletter con emojis aleatorios y retrasos

const reactedMessages = new Set();

export default (conn) => {
  const handler = async () => {
    try {
      const remoteJid = "120363321705798318@newsletter"; // tu canal de newsletter
      const emojis = ["❤️", "👍", "😂", "🔥", "🥳", "🤩", "💯", "😎", "✨", "🎉"];

      // Obtener información del canal
      const metadata = await conn.groupMetadata(remoteJid).catch(() => null);
      if (!metadata) return console.log("❌ No se pudo obtener información del newsletter.");

      const messages = metadata.messages || [];
      if (!messages.length) return console.log("❌ Aún no hay mensajes.");

      const latestMessage = messages[messages.length - 1];
      const messageId = latestMessage.key.id;

      if (reactedMessages.has(messageId)) return; // saltar si ya se reaccionó
      reactedMessages.add(messageId);

      console.log("🔔 Reaccionando al último mensaje del newsletter...");

      // Mezclar los emojis aleatoriamente
      const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);

      for (let emoji of shuffledEmojis) {
        await conn.relayMessage(
          remoteJid,
          {
            reactMessage: {
              key: latestMessage.key,
              text: emoji
            }
          },
          {}
        );

        // Retraso aleatorio entre 0.5s y 2.5s
        const delay = Math.floor(Math.random() * 2000) + 500;
        await sleep(delay);
      }

      console.log("✅ Se terminó de reaccionar al último mensaje del newsletter.");
    } catch (err) {
      console.error("❌ Error en smartAutoReactNewsletter:", err);
    }
  };

  // Función de ayuda para retraso
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Ejecutar cada 15 segundos
  setInterval(handler, 15000);
};