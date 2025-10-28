var handler = async (m, { conn, command, text }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Por favor ingresa el nombre de alguien.`, m);

  let personality = `\`Nombre\` : ${text}
\`Buenos Modales\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Malos Modales\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Tipo de Personalidad\` : ${pickRandom(['Bondadoso','Arrogante','Tacaño','Generoso','Humilde','Tímido','Cobarde','Entrometido','Sensible','No binario lol', 'Tonto'])}
\`Siempre\` : ${pickRandom(['Molesto','De mal humor','Distraído','Fastidioso','Chismoso','Follando solo','De compras','Viendo anime','Chateando en WhatsApp porque están solteros','Perezoso inútil','Don Juan','En su celular'])}
\`Inteligencia\` : ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Estupidez\` : ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Pereza\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Enojo\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Miedo\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Fama\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Género\` : ${pickRandom(['Masculino', 'Femenino', 'Gay', 'Bisexual', 'Pansexual', 'Feminista', 'Heterosexual', 'Alfa', 'Jugador (Mujer)', 'Tomboy', 'Pansexual', 'PlayStationSexual', 'Sr. Handy', 'Dicksexual'])}`;

  conn.reply(m.chat, personality, m);
}

handler.help = ['personalidad'];
handler.tags = ['diversion'];
handler.command = ['personalidad'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}