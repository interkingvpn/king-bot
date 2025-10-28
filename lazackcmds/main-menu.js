import moment from 'moment-timezone';

// Mapeo de secciones con emojis
const tagsMap = {
  main: '💗 Información',
  jadibot: '🌟 Sub Bot',
  downloader: '📥 Descargas',
  game: '🎮 Juegos',
  gacha: '🎲 Gacha RPG',
  rg: '🔰 Registro',
  group: '👥 Grupos',
  nable: '🎛️ Funciones',
  nsfw: '🔞 NSFW +18',
  buscadores: '🔎 Herramientas de búsqueda',
  sticker: '🌈 Stickers',
  econ: '💰 Economía',
  convertidor: '🌀 Convertidores',
  logo: '🎀 Generador de logos',
  tools: '🧰 Herramientas',
  randow: '🎁 Aleatorio',
  efec: '🎶 Efectos de audio',
  owner: '👑 Creador'
};

// Paleta de colores para secciones (solo referencia)
const colors = {
  header: '#FF6B9E',
  section: '#9D65FF',
  command: '#6BB9FF',
  footer: '#FFB56B'
};

let handler = async (m, { conn }) => {
  const userId = m.mentionedJid?.[0] || m.sender;
  const user = global.db.data.users[userId] || {};
  const nombre = await conn.getName(userId);
  const botname = conn.user?.name || 'KING•BOT 👑';
  const fecha = moment.tz('Africa/Nairobi').format('DD/MM/YYYY');
  const hora = moment.tz('Africa/Nairobi').format('HH:mm:ss');
  const uptime = formatoTiempo(process.uptime() * 1000);
  const totalReg = Object.keys(global.db.data.users).length;
  const limite = user.limite || 0;

  const botTag = conn.user?.jid?.split('@')[0] || 'bot';
  const botOfc = conn.user?.id === global.conn?.user?.id
    ? `🌐 *Bot Oficial:* wa.me/${botTag}`
    : `🔗 *Sub Bot de:* wa.me/${global.conn?.user?.jid?.split('@')[0]}`;

  // Agrupar comandos por etiquetas
  const grouped = {};
  const plugins = Object.values(global.plugins).filter(p => !p.disabled);

  for (const plugin of plugins) {
    const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
    if (!cmds) continue;
    const tagList = Array.isArray(plugin.tags) ? plugin.tags : [];
    const tag = tagList[0] || '__otros__';
    if (!grouped[tag]) grouped[tag] = [];
    for (const cmd of cmds) {
      if (typeof cmd !== 'string') continue;
      grouped[tag].push(cmd);
    }
  }

  // Generar el texto del menú
  let texto = `
╭─◇ *${botname.toUpperCase()}* ◇─╮ 
│ 👤 *Usuario:* ${nombre}
│ 🏷 *Límite:* ${limite}
│ 📅 *Fecha:* ${fecha}
│ ⏱ *Hora:* ${hora}
│ ⏳ *Uptime:* ${uptime}
│ 👥 *Usuarios:* ${totalReg} 
│ ${botOfc}
╰──────────────╯
`.trim();

  // Secciones de comandos
  for (const tag of Object.keys(grouped).sort()) {
    const seccion = tagsMap[tag] || '📚 Otros comandos';
    texto += `\n╭─── *${seccion}* ───╮\n`;

    const comandos = grouped[tag];
    const mitad = Math.ceil(comandos.length / 2);
    const columnaIzq = comandos.slice(0, mitad);
    const columnaDer = comandos.slice(mitad);

    const maxLength = Math.max(columnaIzq.length, columnaDer.length);

    for (let i = 0; i < maxLength; i++) {
      const izq = columnaIzq[i] ? `• ${columnaIzq[i].padEnd(15)}` : ''.padEnd(18);
      const der = columnaDer[i] ? `• ${columnaDer[i]}` : '';
      texto += `│ ${izq} ${der}\n`;
    }

    texto += `╰─────────────────────╯`;
  }

  // Footer
  texto += `\n\n✨ *Escribe .nombrecomando para usar un comando* ✨`;
  texto += `\n🔍 *Ejemplo:* .sticker (para crear stickers)`;
  texto += `\n\n🌸 *¡Gracias por usar ${botname}!*`;

  // Información de canal
  const canalRD = {
    id: '0029VbC7MPJ59PwTYKZlgf10@newsletter',
    name: 'KING•BOT',
  };
  
  // Enviar menú
  const banner = 'https://i.ibb.co/1YdP9PKD/Picsart-25-10-25-19-19-07-837.jpg';
  const redes = 'https://wa.me/message/VB7OEFMW6AD5F1';

  await conn.sendMessage(m.chat, {
    text: texto.trim(),
    contextInfo: {
      mentionedJid: [m.sender, userId],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: canalRD.id,
        newsletterName: canalRD.name,
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: `${botname} - Menú de Comandos`,
        body: `Comandos disponibles para ${nombre}`,
        thumbnailUrl: banner,
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: false,
        renderLargerThumbnail: true,
      },
    }
  }, { quoted: m });
};

handler.help = ['menu', 'help', 'commands'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'cmd', 'commands'];
export default handler;

// Función auxiliar para mostrar uptime en formato legible
function formatoTiempo(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  return [h > 0 ? `${h}h` : '', m > 0 ? `${m}m` : '', s > 0 ? `${s}s` : ''].filter(Boolean).join(' ') || '0s';
}
