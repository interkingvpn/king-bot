/**
 * Manejador de configuración de auto-respuesta
 * Permite a los administradores configurar mensajes de auto-respuesta personalizados para los chats
 * @param {Object} m - El objeto del mensaje
 * @param {Object} options - Parámetros de la función
 */
let handler = async (m, { conn, text, usedPrefix, command, isOwner, isAdmin, isROwner }) => {
    // Verificación de permisos
    if (!(isOwner || isAdmin || isROwner)) {
        return conn.reply(m.chat, 
            '⚠️ Lo siento, solo los administradores del grupo pueden personalizar el auto-responder en este chat.', 
            m
        )
    }

    const chatData = global.db.data.chats[m.chat] || {}
    const responses = {
        alreadySet: `✅ Ya hay un mensaje de auto-respuesta configurado. Para configurar uno nuevo, primero borra el actual usando:\n> *${usedPrefix + command}*`,
        successSet: `✅ Auto-respuesta configurada correctamente.\n\nℹ️ Si el auto-responder está deshabilitado, actívalo usando:\n> *${usedPrefix}autoresponder*`,
        successClear: '🗑️ Mensaje de auto-respuesta eliminado correctamente.',
        notFound: `ℹ️ No hay un mensaje de auto-respuesta personalizado en este chat.\n\nPuedes establecer uno usando:\n> *${usedPrefix + command} [tu mensaje]*`
    }

    try {
        if (text) {
            // Configurar nuevo auto-responder
            if (chatData.sAutoresponder) {
                return conn.reply(m.chat, responses.alreadySet, m)
            }
            chatData.sAutoresponder = text.trim()
            return conn.reply(m.chat, responses.successSet, m)
        } else {
            // Borrar auto-responder existente
            if (chatData.sAutoresponder) {
                chatData.sAutoresponder = ''
                return conn.reply(m.chat, responses.successClear, m)
            }
            return conn.reply(m.chat, responses.notFound, m)
        }
    } catch (error) {
        console.error('Error al configurar el auto-responder:', error)
        return conn.reply(m.chat, 
            '❌ Ocurrió un error al configurar el auto-responder. Por favor intenta nuevamente más tarde.', 
            m
        )
    }
}

// Metadata del comando
handler.tags = ['grupo', 'admin']
handler.help = [
    'editautoresponder [texto] - Configura un mensaje de auto-respuesta personalizado',
    'autoresponder2 - Borra el auto-responder actual'
]
handler.command = ['editautoresponder', 'autoresponder2', 'setautoreply']

export default handler