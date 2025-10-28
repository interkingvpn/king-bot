let toM = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    let b
    do b = ps.getRandom()
    while (b === a)

    m.reply(`${emoji} Hagamos nuevos amigos.\n\n*Hola ${toM(a)}, envía un mensaje privado a ${toM(b)} para jugar y hacer amigos 🙆*\n\n*Las mejores amistades comienzan con un juego 😉.*`, null, {
        mentions: [a, b]
    })
}

handler.help = ['amistad']
handler.tags = ['diversión']
handler.command = ['amigoaleatorio', 'amistad']
handler.group = true
handler.register = true

export default handler