const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text }) => {

conn.reply(m.chat, `${emoji2} Buscando un consejo, por favor espera un momento...`, m)

conn.reply(m.chat, `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${pickRandom(global.consejos)}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`, m)

}

handler.help = ['consejo']
handler.tags = ['diversión']
handler.command = ['consejo']
handler.fail = null
handler.exp = 0
handler.group = true;
handler.register = true

export default handler

let resultado = Math.floor(Math.random() * 5000)
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

global.consejos = [
    "Recuerda que no puedes fallar siendo tú mismo (Wayne Dyer)",
    "Siempre es demasiado pronto para rendirse (Jorge Álvarez Camacho)",
    "Solo una cosa hace que un sueño sea imposible: el miedo al fracaso (Paulo Coelho)",
    "Lo que haces hoy puede mejorar todos tus mañanas (Ralph Marston)",
    "Pequeñas acciones cada día hacen o deshacen el carácter (Oscar Wilde)",
    "Cae siete veces y levántate ocho (Proverbio japonés)",
    "Para que los cambios tengan un valor real, deben ser consistentes y duraderos (Anthony Robbins)",
    "Nada ocurre hasta que algo se mueve (Albert Einstein)",
    "Ser un buen perdedor es aprender a ganar (Carl Sandburg)",
    "Todos nuestros sueños pueden hacerse realidad, si tenemos el valor de perseguirlos (Walt Disney)",
    "Quien se transforma a sí mismo, transforma el mundo (Dalai Lama)",
    "Tu tiempo es limitado, no lo desperdicies viviendo la vida de otro… ten el valor de seguir tu corazón e intuición (Steve Jobs)",
    "La mayoría de la gente pasa más tiempo y energía hablando de los problemas que enfrentándolos (Henry Ford)",
    "No es que tengamos poco tiempo, es que desperdiciamos mucho (Séneca)",
    "Para tener éxito, tu deseo de éxito debe ser mayor que tu miedo al fracaso (Bill Cosby)",
    "El verdadero buscador crece y aprende, y descubre que siempre es el principal responsable de lo que sucede (Jorge Bucay)",
    "Si la oportunidad no llama, construye una puerta (Milton Berle)",
    "Siempre hay una mejor manera de hacerlo, encuéntrala (Thomas A. Edison)",
    "Nunca es demasiado tarde para ser la persona que podrías haber sido (George Eliot)",
    "Cuando ya no podemos cambiar una situación, se nos desafía a cambiarnos a nosotros mismos (Viktor Frankl)",
    "La derrota no es derrota hasta que se acepta como realidad en tu propia mente (Bruce Lee)",
    "Es difícil fallar, pero es aún peor nunca haber intentado tener éxito (Theodore Roosevelt)",
    "La felicidad está escondida en la sala de espera de la felicidad (Eduard Punset)",
    "La autoconfianza es el primer secreto del éxito (Ralph Waldo Emerson)",
    "El hombre bien preparado para la lucha ya ha logrado la mitad del triunfo (Miguel de Cervantes)",
    "Sabemos lo que somos, pero no lo que podemos ser (William Shakespeare)",
    "La vida comienza al final de tu zona de confort (Neale Donald Walsch)",
    "Quien no comete errores no se esfuerza lo suficiente (Wess Roberts)",
    "Debes hacer las cosas que crees que no puedes hacer (Eleanor Roosevelt)",
    "Confiar en ti mismo no garantiza el éxito, pero no hacerlo garantiza el fracaso (Albert Bandura)",
    "El mayor error que una persona puede cometer es tener miedo a equivocarse (Elbert Hubbard)",
    "De una pequeña semilla puede crecer un gran tronco (Esquilo)",
    "La única manera de descubrir los límites de lo posible es ir más allá hacia lo imposible (Arthur C. Clarke)",
    "Cuando la vida te da un limón, exprímelo y haz limonada (Clement Stone)",
    "La medida de lo que somos es lo que hacemos con lo que tenemos (Vince Lombardi)",
    "Nos convertimos en lo que pensamos (Earl Nightingale)",
    "Solo quienes se atreven a grandes fracasos terminan logrando grandes éxitos (Robert F. Kennedy)",
    "El poder de la imaginación nos hace infinitos (John Muir)",
    "Sobre todo, la preparación es la clave del éxito (Alexander Graham Bell)",
    "La mejor manera de predecir el futuro es inventarlo (Alan Kay)",
    "Las cosas no se dicen, se hacen, porque al hacerlas hablan por sí mismas (Woody Allen)",
    "Da luz y la oscuridad desaparecerá por sí sola (Erasmus)",
    "Para aumentar nuestro nivel de autoestima, primero debemos aprender a vivir conscientemente, pues esto es la base de todo (Nathaniel Branden)",
    "El problema es que piensas que tienes tiempo (Buda)",
    "Una persona con una idea nueva es un chiste hasta que la idea tiene éxito (Mark Twain)",
    "Si realmente deseas ver al Creador, conviértete en un creador (Deepak Chopra)",
    "No avanzas celebrando éxitos, sino superando fracasos (Orison Swett Marden)",
    "El miedo puede paralizar, dominar, aislar, pero al más mínimo atisbo de valor se cederá rápidamente (Jose Antonio Marina)",
    "El éxito no es aleatorio; es una variable dependiente del esfuerzo (Sófocles)",
    "El hombre necesita dificultades porque son necesarias para disfrutar el éxito (A.P.J. Abdul Kalam)",
    "Agudiza tu percepción de todo lo que te hace sentir bien y disfrútalo (Martin Seligman)",
    "No te desanimes. A menudo la última llave que intentas abre la cerradura (Anónimo)",
    "No vale la pena vivir una vida sin examinar (Sócrates)",
    "Todo es crecimiento y aprendizaje, un crecimiento continuo (Brian Weiss)",
    "Siempre hago cosas que no sé hacer, así que debo aprender a hacerlas (Pablo Picasso)",
    "Un líder es alguien que sabe el camino, va por el camino y muestra el camino (John C. Maxwell)",
    "Todos los éxitos resultan del trabajo y de saber perseverar (Og Mandino)",
    "Cuando está muy oscuro puedes ver las estrellas (Proverbio persa)",
    "El mayor placer en la vida es hacer lo que la gente dice que no puedes hacer (Walter Bagehot)",
    "Éxito es conseguir lo que quieres. Felicidad es querer lo que ya tienes (Lair Ribeiro)",
    "Puedes hacer cualquier cosa, pero no puedes hacer todo (David Allen)",
    "Solo yo puedo cambiar mi vida. Nadie puede hacerlo por mí (Carol Burnett)",
    "El noventa por ciento de los que fracasan no están realmente derrotados; simplemente se rinden (Paul J. Meyer)",
    "Siempre parece imposible… hasta que se hace (Nelson Mandela)",
    "Todo hombre muere. No todo hombre realmente vive (William Wallace)",
    "Nada en la vida debe ser temido, solo entendido. Ahora es el momento de entender más, para temer menos (Marie Curie)",
    "Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto sino un hábito (Aristóteles)",
    "La vida no es un problema a resolver, sino una realidad a experimentar (Soren Kierkegaard)",
    "Solo es posible avanzar cuando miras lejos. Solo progresas cuando piensas en grande (Ortega y Gasset)",
    "La victoria es más dulce cuando ya has conocido la derrota (Malcolm Forbes)",
    "Lo que no te mata te hace más fuerte (Friedrich Nietzsche)",
    "Solo quienes se atreven a grandes fracasos son capaces de lograr grandes éxitos (Will Smith)",
    "El verdadero emprendedor es un hacedor, no un soñador (Nolan Bushnell)",
    "Debes entrenar tu cerebro para ser positivo, así como entrenas tu cuerpo (Shawn Achor)",
    "La fuerza y el crecimiento solo vienen a través del esfuerzo y la lucha continua (Napoleon Hill)",
    "Allá afuera, en algún garaje, hay un emprendedor forjando una bala con el nombre de tu empresa (Gary Hamel)",
    "Cuando tienes un sueño, debes agarrarlo y nunca dejarlo ir (Carol Burnett)",
    "Mira de cerca el presente que estás construyendo, debe parecerse al futuro que sueñas (Alice Walker)",
    "No sobreviven las especies más fuertes ni las más inteligentes, sino las más adaptables al cambio (Darwin)",
    "Cuanto más hacemos, más podemos hacer (William Hazlitt)",
    "La vida no es encontrarte a ti mismo. La vida es crearte a ti mismo (George Bernard Shaw)",
    "La suerte es un dividendo del sudor. Cuanto más sudas, más suerte tienes (Ray Kroc)",
    "La manera más efectiva de hacerlo, es hacerlo (Amelia Earhart)",
    "El significado de la vida es darle significado a la vida (Ken Hudgins)",
    "La clave del éxito: querer ganar, saber perder (Nicolás Maquiavelo)",
    "No puedes vencer a quien nunca se rinde (Babe Ruth)",
    "Un sueño es solo un sueño. Una meta es un sueño con plan y fecha límite (Harvey Mackay)",
    "El éxito es una decisión. Decide qué harás con tu vida o alguien más lo hará por ti (John Atkinson)",
    "Tienes que hacerlo realidad (Denis Diderot)",
    "La vida es una obra que no permite ensayos… Así que canta, ríe, baila, llora y vive intensamente cada momento de tu vida… Antes de que caiga el telón y la obra termine sin aplausos (Charles Chaplin)",
    "Si la cagas no es culpa de tus padres ni maestros, así que no te quejes de tus errores y aprende de ellos (Bill Gates)",
    "No huyo de un desafío por miedo. Al contrario, corro hacia el desafío porque la única manera de escapar del miedo es pisotearlo (Nadia Comaneci)",
    "Un buen plan imperfecto ejecutado hoy es mejor que un plan perfecto ejecutado mañana (General Patton)",
    "La determinación es el punto de partida de todo logro (W. Clement Stone)",
    "Lo que no se empieza nunca tendrá un fin (Johann Wolfgang von Goethe)",
    "Elige un trabajo que ames, y no tendrás que trabajar ni un día de tu vida (Confucio)",
    "El mayor riesgo es no arriesgarse (Mark Zuckerberg)",
    "Puedo aceptar el fracaso, todos fallan en algo. Pero no puedo aceptar no intentarlo (Michael Jordan)",
    "Uno de los mayores errores de la gente es tratar de obligarse a interesarse en algo. No eliges tus pasiones; tus pasiones te eligen a ti (Jeff Bezos)",
    "Hazlo, o no lo hagas, pero no lo intentes (Yoda)",
    "El arma principal para que un país sea poderoso es la educación (HacheJota)",
    "Sé tú mismo. Todos los demás ya están ocupados (Oscar Wilde)",
    "Sé la mejor versión de ti mismo (Anónimo)",
    "Sé el cambio que quieres ver en el mundo (Mahatma Gandhi)",
    "El momento más aterrador siempre es justo antes de comenzar (Anónimo)",
    "Cuando pierdas, no pierdas la lección (Dalai Lama)",
    "Desea, espera, sueña, pero por todos los medios… ¡Hazlo! (HacheJota)",
    "No esperes. Nunca será el momento adecuado (Napoleon Hill)",
    "Puedes hacer más de lo que imaginas, vales más de lo que crees",
    "Energía y persistencia conquistan todas las cosas (Benjamin Franklin)",
    "Tu mejor maestro es tu mayor error (HacheJota)",
    "Debes hacer las cosas que crees que no puedes hacer (Eleanor Roosevelt)",
    "Cada mañana, levántate con la idea de conquistar el mundo",
    "No cuentes los días, haz que los días cuenten (Anónimo)"
]