function handler(m, { conn, text }) {
    // Si no se proporciona texto, pedir al usuario que ingrese uno
    if (!text) 
        return conn.reply(m.chat, `${emoji} Por favor ingresa el texto que quieres transformar.`, m)

    // Obtener el texto:
    // - Si se proporciona 'text', usarlo
    // - Si el usuario respondió a un mensaje citado, usar su texto
    // - Si no, usar el texto del mensaje actual
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text

    // Reemplazar cada letra con su versión estilizada en Unicode
    m.reply(teks.replace(/[a-z]/gi, v => {
        return {
            'a': 'ᥲ',
            'b': 'ᑲ',
            'c': 'ᥴ',
            'd': 'ძ',
            'e': 'ᥱ',
            'f': '𝖿',
            'g': 'g',
            'h': 'һ',
            'i': 'і',
            'j': 'ȷ',
            'k': 'k',
            'l': 'ᥣ',
            'm': 'm',
            'n': 'ᥒ',
            'o': '᥆',
            'p': '⍴',
            'q': '𝗊',
            'r': 'r',
            's': 's',
            't': '𝗍',
            'u': 'ᥙ',
            'v': '᥎',
            'w': 'ᥕ',
            'x': '᥊',
            'y': 'ᥡ',
            'z': 'z'
        }[v.toLowerCase()] || v // Si la letra está en el mapa, reemplazarla; si no, mantener original
    }))
}

handler.help = ['letras *<texto>*'] // Uso del comando
handler.tags = ['diversión']        // Categoría del comando
handler.command = ['letras', 'letter'] // Nombres del comando
handler.register = true             // Requiere registro

export default handler