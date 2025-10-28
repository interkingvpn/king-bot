const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text }) => {

conn.reply(m.chat, `${emoji2} Buscando un chiste, por favor espera un momento...`, m)

conn.reply(m.chat, `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${pickRandom(global.chistes)}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`, m)

}

handler.help = ['chiste']
handler.tags = ['diversión']
handler.command = ['chiste']
handler.fail = null
handler.exp = 0
handler.group = true;
handler.register = true

export default handler

let resultado = Math.floor(Math.random() * 5000)
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

global.chistes = [
    "¿Cuál fue el último animal en subir al Arca de Noé? El delfín.",
    "¿Cómo se dice pañuelo en japonés? Saka-moko.",
    "¿Cómo se dice disparo en árabe? Ahí-va-la-bala.",
    "¿Qué le dice un gusano a otro gusano? Voy a dar una vuelta alrededor de la manzana.",
    "Un gato empieza a ladrar en el techo de una casa. Otro gato, sorprendido, dice: ¡Estás loco, gato, por qué ladrás en vez de maullar? El gatito responde: ¿No puedo aprender otro idioma?",
    "El doctor le dice al paciente: respire profundo, voy a auscultarlo. El paciente responde: Doctor, ¿de quién me va a ocultar? No le debo nada a nadie.\nEl doctor sale después de un parto y el padre pregunta: Doctor, ¿cómo salió todo? El doctor dice: Todo salió bien, pero tuvimos que darle oxígeno al bebé. El padre, horrorizado, dice: ¡Pero doctor, queríamos llamarlo Gabriel!",
    "Un pez le pregunta a otro pez: ¿Qué hace tu mamá? Él responde: Nada, ¿y la tuya? También nada.",
    "¿La mayor ironía de Aladdín? Tener un genio malo.",
    "El profesor le dice al alumno después de corregir su tarea: Tu trabajo me conmovió. El alumno, sorprendido, pregunta: ¿Por qué, maestro? El maestro, burlándose, dice: Porque me dio lástima.",
    "El niño le dice a su madre: Mamá, ya no quiero jugar con Pedrito. La madre pregunta: ¿Por qué? Porque cuando jugamos con bloques de madera y le pego en la cabeza, de repente empieza a llorar.",
    "El maestro de Juanito pregunta: Juanito, ¿qué harías si te estuvieras ahogando en la piscina? Juanito responde: Lloraría mucho para desahogarme.",
    "Mamá, me veo gordo, feo y viejo. ¿Qué tengo, hijo, qué tengo? Mamá, tienes toda la razón.",
    "¿Cómo se dice pelo sucio en chino? Chin cham pu.",
    "Había una vez un niño tan, tan, tan despistado que... ¡olvidé el chiste!",
    "Un amigo le dice a otro: ¿Cómo va la vida de casado? Bien, no me puedo quejar, dice ella. Entonces va muy bien, ¿no? No, no puedo quejarme porque mi esposo está justo aquí a mi lado.",
    "¿Por qué las focas siempre miran hacia arriba? ¡Porque ahí están los reflectores!",
    "Camarero, este filete está muy nervioso. Bueno, es normal, es la primera vez que lo comen.",
    "¿Cómo se llama el primo de Bruce Lee? Broco Lee.",
    "Una madre le dice a su hijo: Jaimito, un pajarito me dijo que consumes drogas. Tú eres el que consume drogas, hablas con pajaritos."
]