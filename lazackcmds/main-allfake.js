import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

// Función principal del manejador
var handler = m => m
handler.all = async function (m) {

    // Función global para obtener buffers desde URLs
    global.getBuffer = async function getBuffer(url, options) {
        try {
            options = options || {}
            const res = await axios({
                method: "get",
                url,
                headers: {
                    'DNT': 1,
                    'User-Agent': 'GoogleBot',
                    'Upgrade-Insecure-Request': 1
                },
                ...options,
                responseType: 'arraybuffer'
            })
            return res.data
        } catch (e) {
            console.error(`Error al obtener buffer: ${e}`)
            return null
        }
    }

    // Información del creador y usuario del bot
    global.creator = 'wa.me/543765142705'
    global.botUser = `${conn.user.jid.split('@')[0]}`
    
    // Nombres de canales, grupos y comunidades
    global.channelName = '=͟͟͞❀ KING•BOT ⏤͟͟͞͞★'
    global.channelName2 = '=͟͟͞❀ INTER•KING ⏤͟͟͞͞★'
    global.groupName = 'ᰔᩚ INTER•KING ❀'
    global.communityName = 'ᰔᩚ usuarios de javascript ❀'
    
    // Mensaje de disponibilidad y foto de perfil
    global.ready = '❀ *Aquí tienes ฅ^•ﻌ•^ฅ*'
    global.profilePhoto = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.ibb.co/1YdP9PKD/Picsart-25-10-25-19-19-07-837.jpg')

    // Listas de canales y selección aleatoria
    global.channelIdList = ["120363321705798318@newsletter", "120363321705798318@newsletter"]
    global.channelNameList = ["KING•BOT", "INTER•KING"]
    global.randomChannel = await getRandomChannel()

    // Fecha y hora
    global.d = new Date(new Date + 3600000)
    global.locale = 'es'
    global.day = d.toLocaleDateString(locale, { weekday: 'long' })
    global.date = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
    global.month = d.toLocaleDateString('es', { month: 'long' })
    global.year = d.toLocaleDateString('es', { year: 'numeric' })
    global.time = d.toLocaleString('es-ES', { 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
    })

    // Iconos de estado
    global.rwait = '🕒'
    global.done = '✅'
    global.error = '✖️'
    global.msg = '⚠︎'

    // Emojis
    global.emoji = '❀'
    global.emoji2 = '✧'
    global.emoji3 = '✦'
    global.emoji4 = '❍'
    global.emoji5 = '✰'
    global.emojis = pickRandom([emoji, emoji2, emoji3, emoji4])

    // Mensajes de espera
    global.wait = '❍ Espera un momento, estoy lento...'
    global.waitt = global.wait
    global.waittt = global.wait
    global.waitttt = global.wait

    // Redes sociales
    const channel = 'https://github.com/interking'
    const community = 'https://github.com/interking'
    const web = 'https://github.com/interking'
    const web2 = 'https://github.com/interking/king-bot'
    const web3 = 'https://wa.me/message/VB7OEFMW6AD5F1'
    global.socials = pickRandom([channel, community, web, web2, web3])

    // Base de datos de imágenes aleatorias
    const category = "image"
    const db = './src/database/db.json'

    try {
        const db_ = JSON.parse(fs.readFileSync(db))
        if (!db_.links || !db_.links[category] || !Array.isArray(db_.links[category]) || db_.links[category].length === 0) {
            throw new Error(`No se encontraron enlaces para la categoría: ${category}`)
        }
        const random = Math.floor(Math.random() * db_.links[category].length)
        const randomlink = db_.links[category][random]
        const response = await fetch(randomlink)
        const rimg = await response.buffer()
        global.icons = rimg
    } catch (e) {
        console.error("Error en la base de datos:", e)
        global.icons = null
    }

    // Saludo según la hora
    const now = new Date()
    const hour = now.getHours()
    let greeting
    switch (true) {
        case hour >= 0 && hour < 3:
        case hour >= 18 && hour <= 23:
            greeting = 'Buenas Noches 🌃'; break
        case hour >= 3 && hour < 7:
            greeting = 'Buenos Días 🌄'; break
        case hour >= 7 && hour < 10:
            greeting = 'Buenos Días 🌅'; break
        case hour >= 10 && hour < 14:
            greeting = 'Buen Día 🌤'; break
        case hour >= 14 && hour < 18:
            greeting = 'Buenas Tardes 🌆'; break
        default:
            greeting = 'Hola 👋'; break
    }
    global.greeting = greeting

    // Información del usuario
    global.name = m.pushName || 'Anónimo'
    global.taguser = '@' + m.sender.split("@")[0]
    const more = String.fromCharCode(8206)
    global.readMore = more.repeat(850)

    // Información de stickers
    global.packsticker = `°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\nᰔᩚ Usuario: ${name}\n❀ Bot: ${botname}\n✦ Fecha: ${date}\nⴵ Hora: ${time}`
    global.packsticker2 = `\n°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\n\n${dev}`

    // Contacto falso
    global.fakeContact = {
        key: {
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: `@g.us` } : {})
        },
        message: {
            'contactMessage': {
                'displayName': `${name}`,
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${name},;;;\nFN:${name},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
                'jpegThumbnail': null, 
                thumbnail: null, 
                sendEphemeral: true
            }
        }
    }

    // Mensaje falso reenviado
    global.fake = {
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: randomChannel.id,
                newsletterName: randomChannel.name,
                serverMessageId: -1
            }
        }
    }

    // Selección aleatoria de icono
    global.icon = pickRandom([
        'https://i.ibb.co/1YdP9PKD/Picsart-25-10-25-19-19-07-837.jpg',
    ])

    // Contexto de mensaje de canal
    global.rchannel = {
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: randomChannel.id,
                serverMessageId: 100,
                newsletterName: randomChannel.name,
            },
            externalAdReply: {
                showAdAttribution: true,
                title: packname,
                body: dev,
                mediaUrl: null,
                description: null,
                previewType: "PHOTO",
                thumbnailUrl: icon,
                sourceUrl: socials,
                mediaType: 1,
                renderLargerThumbnail: false
            },
        }
    }
}

export default handler

// Función para escoger un elemento aleatorio de un array
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

// Función para obtener un canal aleatorio de las listas
async function getRandomChannel() {
    const randomIndex = Math.floor(Math.random() * channelIdList.length)
    const id = channelIdList[randomIndex]
    const name = channelNameList[randomIndex]
    return { id, name }
}