export async function before(m, { conn, isAdmin, isBotAdmin }) {
    try {
        if (!m.isGroup) return
        if (m.fromMe) return true

        let chat = global.db?.data?.chats?.[m.chat]
        let delet = m.key?.participant
        let bang = m.key?.id
        let bot = global.db?.data?.settings?.[this.user.jid] || {}

        // Detecta posibles bots o clientes alternativos (Baileys clones)
        if (
            m.id?.startsWith('NJX-') ||
            (m.id?.startsWith('BAE5') && m.id.length === 16) ||
            (m.id?.startsWith('B24E') && m.id.length === 20)
        ) {
            if (chat?.antiBot) {
                if (isBotAdmin) {
                    try {
                        // Elimina el mensaje
                        await conn.sendMessage(m.chat, {
                            delete: {
                                remoteJid: m.chat,
                                fromMe: false,
                                id: bang,
                                participant: delet
                            }
                        })

                        // Expulsa al usuario sospechoso
                        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                        console.log(`🚫 Usuario ${m.sender} eliminado del grupo ${m.chat} (anti-bot activo)`)
                    } catch (error) {
                        console.error("❌ No se pudo eliminar el mensaje o expulsar al usuario:", error)
                    }
                } else {
                    console.warn("⚠️ El bot no es administrador, no puede expulsar al bot sospechoso.")
                }
            }
        }
    } catch (err) {
        console.error("[ANTI-BOT ERROR]", err)
        return true // Nunca detener el flujo del bot
    }
}