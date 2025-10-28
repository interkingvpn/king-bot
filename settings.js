import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─────────────────────────────*

//BETA: Si quieres evitar escribir el número que será el bot en la consola, agrégalo aquí:
//Solo aplica para la opción 2 (ser un bot con código de 8 dígitos)
global.botNumber = '' //Ejemplo: 543764651563

//*─────────────────────────────*

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['543765142705', 'KING•BOT', true],
  ['543765142705', 'KING•BOT', true],
  
// <-- Número @lid -->
  ['', 'lAZACK', true],
  ['', '', true], 
  ['', '', true]
];

//*─────────────────────────────*

global.mods = ['543765142705']
global.suittag = ['543765142705'] 
global.prems = ['543765142705']

//*─────────────────────────────*

global.library = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.5'
global.nameqr = 'KING•BOT'
global.namebot = 'KING•BOT'
global.sessions = 'session'
global.jadi = 'JadiBots' 
global.yukiJadibts = true

//*─────────────────────────────*

global.packname = '⪛✰ KING•BOT ✰⪜'
global.botname = 'KING•BOT'
global.wm = '✿◟KING•BOT◞✿'
global.author = 'Hecho por INTER•KING'
global.dev = '© Powered By INTER•KING'
global.textbot = 'INTER•KING'
global.tag = 'KING•BOT'

//*─────────────────────────────*

global.currency = 'teamlz'
global.welcome1 = '❍ Edita con el comando setwelcome'
global.welcome2 = '❍ Edita con el comando setbye'
global.banner = 'https://i.ibb.co/knwyHNF/IMG-20251021-WA0006.jpg'
global.avatar = 'https://i.ibb.co/knwyHNF/IMG-20251021-WA0006.jpg'

//*─────────────────────────────*

global.gp1 = 'https://chat.whatsapp.com/Dfj7gEIwmEV2Js548DxAWy?mode=wwt'
global.community1 = 'https://whatsapp.com/channel/0029VbC7MPJ59PwTYKZlgf10'
global.channel = 'https://whatsapp.com/channel/0029Vb6ikAeLtOj5ysQKMT22'
global.channel2 = 'https://whatsapp.com/channel/0029VbBvGawBfxoAKaSUu40LE'
global.md = 'https://github.com/interking/king-bot'
global.email = 'interkingbot@gmail.com'

//*─────────────────────────────*

global.catalog = fs.readFileSync('./Botify/kingbot.jpg');
global.style = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalog, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '0029VbC7MPJ59PwTYKZlgf10@newsletter',
}
global.multiplier = 60

//*─────────────────────────────*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─────────────────────────────*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Actualización de 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})