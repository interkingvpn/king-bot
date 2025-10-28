// Este archivo es parte de KING•BOT, un proyecto de bot para WhatsApp.
// Se encarga de validar comandos y dar retroalimentación al usuario en caso de comandos inválidos.

/*export async function before(m) {
  // Saltar si no es un comando
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
  if (!command || command === 'bot') return;

  // Función auxiliar para validar comandos
  const validCommand = (cmd, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (!plugin.command) continue;
      let cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      if (cmds.includes(cmd)) return true;
    }
    return false;
  };

  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    // Si el bot está desactivado en el chat
    if (chat.isBanned) {
      const notice = `
🌸 *${conn.getName(conn.user.jid)}* está durmiendo actualmente en este grupo~

🛡️ *Los administradores* pueden despertarme con:
→ *${usedPrefix}bot on*

💖 ¡Ya te extraño... vuelve pronto!`;
      await m.reply(notice);
      return;
    }

    // Incrementar el contador de comandos del usuario
    user.commands = (user.commands || 0) + 1;
  } else {
    // Manejar comandos inválidos con sugerencias útiles
    const inputCommand = m.text.trim().split(' ')[0];
    const allCommands = [];

    // Recolectar todos los comandos disponibles
    for (let plugin of Object.values(global.plugins)) {
      if (!plugin.command) continue;
      let cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      allCommands.push(...cmds.map(cmd => usedPrefix + cmd));
    }

    // Búsqueda de comandos similares (fuzzy) con puntaje
    function findSimilarCommands(base, list) {
      const similarityScore = (a, b) => {
        // Algoritmo simple de similitud
        const longer = a.length > b.length ? a : b;
        const shorter = a.length <= b.length ? a : b;
        const lengthRatio = shorter.length / longer.length;
        
        // Verificar inclusión directa
        if (longer.includes(shorter)) return lengthRatio * 0.8;
        
        // Comparar caracteres
        let matches = 0;
        for (let i = 0; i < shorter.length; i++) {
          if (longer.includes(shorter[i])) matches++;
        }
        return (matches / longer.length) * lengthRatio;
      };

      return list
        .map(cmd => ({ 
          cmd, 
          score: similarityScore(base.toLowerCase(), cmd.toLowerCase()) 
        }))
        .filter(e => e.score >= 0.4) // Umbral alto para mejores coincidencias
        .sort((a, b) => b.score - a.score)
        .slice(0, 3); // Solo las 3 mejores coincidencias
    }

    const suggestions = findSimilarCommands(inputCommand, allCommands);

    // Construir respuesta amigable
    let response = `
✨ *¡Upsie~!* ✨

No pude encontrar *${inputCommand}* en mi lista de comandos.

Aquí hay algunas sugerencias:
→ Usa *${usedPrefix}menu* para ver todos los comandos
→ Revisa la ortografía (los comandos no distinguen mayúsculas/minúsculas)
${suggestions.length > 0 ? `\n💡 *¿Quisiste decir alguno de estos?*` : ''}`;

    // Agregar sugerencias si hay disponibles
    if (suggestions.length > 0) {
      suggestions.forEach((s, i) => {
        const percent = Math.min(100, Math.round(s.score * 100));
        const emoji = i === 0 ? '🌟' : i === 1 ? '✨' : '💫';
        response += `\n${emoji} *${s.cmd}* (${percent}% de coincidencia)`;
      });
    }

    // Agregar mensaje de ánimo
    response += `\n\n🌸 ¡No te preocupes! Incluso los mejores ninjas a veces tropiezan~`;
    response += `\n💌 ¿Necesitas ayuda? ¡Solo pregunta! *${usedPrefix}support*`;

    // Enviar con indicador de escritura para mejor experiencia
    await conn.sendPresenceUpdate('composing', m.chat);
    await m.reply(response);
  }
}*/