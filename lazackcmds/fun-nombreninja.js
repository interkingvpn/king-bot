function handler(m, { text }) {
  if (!text) return conn.reply(m.chat, `${emoji} Por favor ingresa tu nombre después del comando.`, m);
  conn.reply(m.chat, `${emoji} Buscando el nombre, por favor espera...`, m);
  
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text;
  
  m.reply(teks.replace(/[a-z]/gi, v => {
    return {
      'a': 'ka',
      'b': 'tsu',
      'c': 'mi',
      'd': 'te',
      'e': 'ku',
      'f': 'hi',
      'g': 'ji',
      'h': 'ri',
      'i': 'ki',
      'j': 'zu',
      'k': 'me',
      'l': 'ta',
      'm': 'rin',
      'n': 'to',
      'o': 'mo',
      'p': 'no',
      'q': 'ke',
      'r': 'shi',
      's': 'ari',
      't': 'chi',
      'u': 'do',
      'v': 'ru',
      'w': 'mei',
      'x': 'na',
      'y': 'fu',
      'z': 'mori'
    }[v.toLowerCase()] || v;
  }));
}

handler.help = ['nombre ninja *<texto>*'];
handler.tags = ['diversion'];
handler.command = ['nombre ninja', 'ninjaname'];
handler.group = true;
handler.register = true;

export default handler;