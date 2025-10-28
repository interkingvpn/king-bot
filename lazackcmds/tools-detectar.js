// Braian-X >> https://github.com/interKing

import fs from 'fs'
import path from 'path'

var handler = async (m, { usedPrefix, command }) => {
    try {
        await m.react('🕒')
        conn.sendPresenceUpdate('composing', m.chat)

        const pluginsDir = './plugins'

        // Obtener todos los archivos .js dentro de la carpeta plugins
        const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'))

        let response = `✧ *Revisión de errores de sintaxis:*\n\n`
        let hasErrors = false

        for (const file of files) {
            try {
                // Intentar importar el archivo del plugin para verificar errores de sintaxis
                await import(path.resolve(pluginsDir, file))
            } catch (error) {
                hasErrors = true
                const stackLines = error.stack.split('\n')

                // Intentar detectar en qué línea está el error
                const errorLineMatch = stackLines[0].match(/:(\d+):\d+/)
                const errorLine = errorLineMatch ? errorLineMatch[1] : 'Desconocida'

                response += `⚠︎ *Error en:* ${file}\n\n> ● Mensaje: ${error.message}\n> ● Número de línea: ${errorLine}\n\n`
            }
        }

        if (!hasErrors) {
            response += '❀ Todo está bien! No se detectaron errores de sintaxis.'
        }

        await conn.reply(m.chat, response, m)
        await m.react('✅')
    } catch (err) {
        await m.react('✖️')
        await conn.reply(m.chat, `⚠︎ Ocurrió un error: ${err.message}`, m)
    }
}

// Configuración del comando
handler.command = ['detectsyntax', 'detect']
handler.help = ['detectsyntax']
handler.tags = ['herramientas']
handler.rowner = true   // Solo el dueño del bot puede usarlo

export default handler