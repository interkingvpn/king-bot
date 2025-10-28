import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { text, conn }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Por favor ingresa lo que deseas buscar en Wikipedia.`, m)
    
    try {
        const response = await axios.get(`https://es.wikipedia.org/wiki/${text}`)
        const $ = cheerio.load(response.data)
        let title = $('#firstHeading').text().trim()
        let content = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
        
        m.reply(`▢ *Wikipedia*

‣ Buscado: ${title}

${content}`)
    } catch (e) {
        m.reply(`${emoji2} No se encontraron resultados.`)
    }
}

handler.help = ['wikipedia']
handler.tags = ['herramientas']
handler.command = ['wiki', 'wikipedia']

export default handler