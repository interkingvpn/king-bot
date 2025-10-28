const groupLinkRegex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
const channelLinkRegex = /whatsapp\.com\/channel\/([0-9A-Za-z]+)/i

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    try {
        if (!m || !m.text) return
        if (m.isBaileys && m.fromMe) return true
        if (!m.isGroup) return false
        if (!isBotAdmin) return

        let chat = global.db?.data?.chats?.[m.chat]
        if (!chat || !chat.antiLink) return true

        let isGroupLink = m.text.match(groupLinkRegex)
        let isChannelLink = m.text.match(channelLinkRegex)

        // Si el mensaje contiene un enlace de grupo o canal y el usuario no es admin
        if ((isGroupLink || isChannelLink) && !isAdmin) {
            if (isBotAdmin) {
                try {
                    const linkThisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
                    if (isGroupLink && m.text.includes(linkThisGroup)) return true
                } catch (error) {
                    console.error("[ERROR] No se pudo obtener el código del grupo:", error)
                }
            }

            // Aviso al grupo
            await conn.reply(
                m.chat,
                `> ✦ @${m.sender.split`@`[0]} fue eliminado del grupo por *KING•BOT 🤖*.\n> 🚫 No se permiten enlaces de ${isChannelLink ? 'canales' : 'otros grupos'}.\n> Evite ser el siguiente.`,
                null,
                { mentions: [m.sender] }
            )

            // Eliminar mensaje y expulsar al usuario
            if (isBotAdmin) {
                try {
                    await conn.sendMessage(m.chat, { delete: m.key })
                    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                    console.log(`Usuario ${m.sender} eliminado del grupo ${m.chat}`)
                } catch (error) {
                    console.error("❌ No se pudo eliminar el mensaje o expulsar al usuario:", error)
                }
            }
        }

        return true
    } catch (err) {
        console.error("[ANTI-LINK ERROR]", err)
        return true // Nunca detener el flujo del bot
    }
}