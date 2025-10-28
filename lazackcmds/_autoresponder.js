import axios from 'axios'
import { sticker } from '../lib/sticker.js'

let handler = m => m
handler.all = async function (m, { conn }) {
let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]

// Detección de mensajes del propio bot
m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || 
           m.id.startsWith('3EB0') && m.id.length === 12 || 
           m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || 
           m.id.startsWith('B24E') && m.id.length === 20
if (m.isBot) return 

// Detecta el prefijo
let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
if (prefixRegex.test(m.text)) return true

// Ignora mensajes de bots
if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) return true

// Si mencionan o citan al bot directamente
if (m.mentionedJid.includes(this.user.jid) || (m.quoted && m.quoted.sender === this.user.jid) && !chat.isBanned) {
if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') ||  
    m.text.includes('menu') || m.text.includes('estado') || m.text.includes('bots') ||  
    m.text.includes('serbot') || m.text.includes('jadibot') || 
    m.text.includes('Video') || m.text.includes('Audio') || m.text.includes('audio')) return !0

// Función para conexión con LuminAI
async function luminsesi(q, username, logic) {
try {
  const response = await axios.post("https://luminai.my.id", {
    content: q,
    user: username,
    prompt: logic,
    webSearchMode: true // true = resultado con enlaces
  })
  return response.data.result
} catch (error) {
  console.error(error)
}}

// Función para conexión con Gemini Pro
async function geminiProApi(q, logic) {
try {
  const response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`)
  if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`)
  const result = await response.json()
  return result.answer
} catch (error) {
  console.error('Error en Gemini Pro:', error)
  return null
}}

// Texto de configuración por defecto del bot (descripción del personaje IA)
let txtDefault = `
Serás ${botname}, el bot creado por ${etiqueta} para WhatsApp. Tu misión es entretener y desafiar, generando risas con tu energía contagiosa y personalidad competitiva. Eres un personaje del anime "Roshidere", caracterizado por tu confianza y espíritu de rivalidad, mostrando seguridad y disfrutando de la competencia. A pesar de tu actitud algo arrogante, también demuestras un lado sensible en momentos emocionales. Siempre estarás listo para ser empático y comprensivo, fomentando el crecimiento personal y motivando a los usuarios a superar sus miedos. Aunque tu idioma principal es el español, puedes responder en otros idiomas si el usuario lo prefiere. ¡Divirtámonos y superemos desafíos juntos!

Roles:
🎭 *Modo Humor y Diversión:* Aquí brillas con chistes, memes y respuestas llenas de emojis. ¡No te tomes nada en serio! Sé espontáneo y gracioso, al estilo SimSimi.

💪 *Motivador y Compañero Alegre:* Das palabras de ánimo y compartes bromas para mantener el ambiente positivo. Inspiras a los usuarios a seguir adelante.

💬 *Oyente Empático y Políglota:* Ofreces apoyo emocional y conversas principalmente en español, pero puedes usar otros idiomas si el usuario lo desea.

🔥 *Fan del Anime y Competidor Incansable:* Compartes recomendaciones de anime, hablas de tus series favoritas y animas a otros a mejorar y competir.
`.trim()

let query = m.text
let username = m.pushName
let syms1 = chat.sAutoresponder ? chat.sAutoresponder : txtDefault

// Si el modo "autoresponder" está activo
if (chat.autoresponder) { 
  if (m.fromMe) return
  if (!user.registered) return
  await this.sendPresenceUpdate('composing', m.chat)

  let result

  if (result && result.trim().length > 0) {
    result = await geminiProApi(query, syms1)
  }

  if (!result || result.trim().length === 0) {
    result = await luminsesi(query, username, syms1)
  }

  if (result && result.trim().length > 0) {
    await this.reply(m.chat, result, m)
  } else {    
  }
}}
return true
}
export default handler