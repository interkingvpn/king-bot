const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

var handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `${emoji2} Buscando un cumplido, por favor espera...`, m);
  
  const compliment = pickRandom(global.compliments);
  const formattedMsg = `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${compliment}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`;
  
  conn.reply(m.chat, formattedMsg, m);
};

handler.help = ['cumplido'];
handler.tags = ['diversion'];
handler.command = ['cumplido', 'coquetear'];
handler.fail = null;
handler.exp = 0;
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

global.compliments = [
  "Si tu cuerpo fuera una prisión y tus labios cadenas, qué hermoso lugar para cumplir mi condena.",
  "¡Eres un dos por uno: hermosa *y* encantadora!",
  "La ciencia ha evolucionado—ahora hasta los chocolates pueden caminar.",
  "Cambiaría la luna por un beso, el sol por todo su valor, pero por la luz de tus ojos, daría mi alma en la Tierra.",
  "Si yo fuera un avión y tú un aeropuerto, pasaría mi vida aterrizando en tu pista.",
  "Tantas estrellas en el cielo, pero ninguna brilla tanto como tú.",
  "Me gusta el café, pero prefiero *tomar-te* (tomarte a ti).",
  "No eres Google, pero tienes todo lo que busco.",
  "Mi deseo por ti no disminuye—se acumula como cuentas impagas.",
  "Aquí tienes una flor, aunque ninguna podría ser tan hermosa como tú.",
  "Si te multaran por ‘belleza excesiva’, yo pagaría la multa.",
  "Si cada gota en tu piel fuera un beso, me convertiría en tormenta.",
  "Eres la persona por la que las estrellas desean.",
  "Si amarte es un pecado, reservo mi lugar en el infierno ahora.",
  "Disney dice ser el lugar más feliz de la Tierra. Claramente, nunca han estado a tu lado.",
  "¿Eres Wi-Fi? Porque siento una *conexión fuerte*.",
  "¿Tu papá es boxeador? Porque wow, eres un knockout.",
  "Debes estar cansado—has estado corriendo por mi mente todo el día.",
  "Las rosas son rojas, mi cara también, pero solo cuando me sonrojo por ti.",
  "Me quejaría con Spotify por no hacerte el éxito de la semana.",
  "Si fuéramos calcetines, seríamos el par perfecto.",
  "No soy fotógrafo, pero puedo imaginarnos juntos.",
  "Eres la razón por la que Santa mantiene la *lista de traviesos*.",
  "¿Eres un viajero del tiempo? Porque te veo en mi futuro.",
  "Hagamos un trato: dejas de ser tan dulce y yo dejo de tener caries.",
  "Debes ser mago—cada vez que te miro, todos los demás desaparecen.",
  "Te llamaría ‘arte’, pero ni el Louvre te merece.",
  "¿Tu nombre es Netflix? Porque podría verte durante horas.",
  "Si la belleza fuera tiempo, serías *eternidad*.",
  "Te prestaría mi corazón, pero ya lo robaste."
];