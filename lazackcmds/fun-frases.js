const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

var handler = async (m, { conn, text }) => {

  conn.reply(m.chat, `${emoji2} Buscando una frase, por favor espera un momento...`, m);

  conn.reply(m.chat, `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${pickRandom(global.frases)}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`, m);

};

handler.help = ['frase'];
handler.tags = ['diversión'];
handler.command = ['frase'];
handler.fail = null;
handler.exp = 0;
handler.group = true;
handler.register = true;

export default handler;

let hasil = Math.floor(Math.random() * 5000);
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

global.frases = [
    "Recuerda que no puedes fallar al ser tú mismo. (Wayne Dyer)",
    "Siempre es demasiado temprano para rendirse. (Jorge Álvarez Camacho)",
    "Solo una cosa hace imposible un sueño: el miedo al fracaso. (Paulo Coelho)",
    "Lo que hagas hoy puede mejorar todos tus mañanas. (Ralph Marston)",
    "Cae siete veces y levántate ocho. (Proverbio japonés)",
    "Nada sucede hasta que algo se mueve. (Albert Einstein)",
    "La felicidad está escondida en la sala de espera de la felicidad. (Eduard Punset)",
    "El verdadero buscador crece y aprende, y descubre que siempre es la persona principal responsable de lo que sucede. (Jorge Bucay)",
    "La vida comienza al final de tu zona de confort. (Neale Donald Walsch)",
    "La confianza en uno mismo es el primer secreto del éxito. (Ralph Waldo Emerson)",
    "No hay camino hacia la paz, la paz es el camino. (Mahatma Gandhi)",
    "La vida es lo que pasa mientras estás ocupado haciendo otros planes. (John Lennon)",
    "La vida es 10% lo que me sucede y 90% cómo reacciono ante ello. (Charles R. Swindoll)",
    "La única manera de hacer un gran trabajo es amar lo que haces. (Steve Jobs)",
    "No importa lo despacio que vayas, siempre y cuando no te detengas. (Confucio)",
    "No te preocupes si no tienes éxito, siempre puedes ser un buen ejemplo de cómo no hacerlo.",
    "La única razón por la que estoy en forma es porque soy redondo.",
    "Estoy haciendo varias cosas a la vez: puedo procrastinar, ignorar y olvidar al mismo tiempo.",
    "Si la vida te da limones, pide sal y tequila.",
    "La risa es la distancia más corta entre dos personas.",
    "No soy completamente inútil, al menos sirvo como un mal ejemplo.",
    "A veces la mayor aventura es simplemente un acto de valentía.",
    "Soy perezoso, pero no me gusta que me llamen perezoso.",
    "Si no puedes convencerlos, confúndelos.",
    "La vida es corta, haz que cuente.",
    "La vida es una comedia escrita por un dramaturgo un poco sordo.",
    "Hazlo o no lo hagas, pero no lo intentes.",
    "La felicidad no es un destino, es una manera de viajar. (Margaret Lee Runbeck)",
    "El tiempo vuela, pero yo soy el piloto.",
    "No estoy perezoso, estoy en modo ahorro de energía.",
    "La vida es como montar en bicicleta. Para mantener el equilibrio, debes seguir moviéndote. (Albert Einstein)",
    "Nunca discutas con un tonto, te arrastrará a su nivel y te vencerá con experiencia.",
    "Ayer fue la fecha límite para todos mis problemas.",
    "La única manera de hacer un gran trabajo es amar lo que haces. (Steve Jobs)",
    "La vida es un desafío, enfréntalo.",
    "Si no tienes un plan, estás planeando fallar.",
    "La vida es una aventura, atrévete a vivirla."
];