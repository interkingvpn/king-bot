let handler = async (m, { conn }) => {
  conn.reply(m.chat, `${pickRandom(global.iq)}`, m)
}

handler.help = ['testdeiq']
handler.tags = ['diversion']
handler.command = ['testdeiq', 'iq']
handler.group = true
handler.register = true
handler.fail = null

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.iq = [
'Tu IQ es: 1',
'Tu IQ es: 14',
'Tu IQ es: 23',
'Tu IQ es: 35',
'Tu IQ es: 41',
'Tu IQ es: 50',
'Tu IQ es: 67',
'Tu IQ es: 72',
'Tu IQ es: 86',
'Tu IQ es: 99',
'Tu IQ es: 150',
'Tu IQ es: 340',
'Tu IQ es: 423',
'Tu IQ es: 500',
'Tu IQ es: 676',
'Tu IQ es: 780',
'Tu IQ es: 812',
'Tu IQ es: 945',
'Tu IQ es: 1000',
'Tu IQ es: ¡Ilimitado!',
'Tu IQ es: 5000',
'Tu IQ es: 7500',
'Tu IQ es: 10000',
]