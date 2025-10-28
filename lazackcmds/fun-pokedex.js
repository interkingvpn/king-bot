import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Por favor ingresa el nombre del Pokémon que deseas buscar.`, m);

  await m.react(rwait);
  conn.reply(m.chat, `${emoji2} Buscando información de *<${text}>*, por favor espera...`, m);

  const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      await m.react(error);
      return conn.reply(m.chat, '⚠️ Ocurrió un error al buscar el Pokémon.', m);
    }

    const json = await response.json();

    const pokedexInfo = `
${emoji} *Pokédex - Información de ${json.name}*\n
☁️ *Nombre:* ${json.name}
🔖 *ID:* ${json.id}
💬 *Tipo:* ${json.type}
💪 *Habilidades:* ${json.abilities}
🎴 *Altura:* ${json.height}
⚖️ *Peso:* ${json.weight}\n
📖 *Descripción:*
${json.description}\n
🔍 ¡Encuentra más detalles de este Pokémon en la Pokédex!
🔗 https://www.pokemon.com/us/pokedex/${json.name.toLowerCase()}
    `;

    conn.reply(m.chat, pokedexInfo, m);
    await m.react(done);

  } catch (err) {
    await m.react(error);
    conn.reply(m.chat, '⚠️ No se pudo obtener información del Pokémon. Revisa el nombre o intenta más tarde.', m);
  }
};

handler.help = ['pokedex *<pokemon>*'];
handler.tags = ['diversion'];
handler.group = true;
handler.register = true;
handler.command = ['pokedex', 'pokemon'];

export default handler;