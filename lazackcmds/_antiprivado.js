export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
    try {
        if (m.isBaileys && m.fromMe) return true
        if (m.isGroup) return false
        if (!m.message) return true

        // Ignora comandos comunes o de serbot
        if (
            m.text.includes('PIEDRA') ||
            m.text.includes('PAPEL') ||
            m.text.includes('TIJERA') ||
            m.text.includes('serbot') ||
            m.text.includes('jadibot')
        ) return true

        const chat = global.db?.data?.chats?.[m.chat]
        const bot = global.db?.data?.settings?.[conn.user.jid] || {}

        if (m.chat === '@newsletter') return true

        // Si antiPrivate está activado y el usuario no es dueño
        if (bot.antiPrivate && !isOwner && !isROwner) {
            const emoji = '🚫'
            const gp1 = 'https://chat.whatsapp.com/Dfj7gEIwmEV2Js548DxAWy?mode=wwt' // 🔗 Reemplaza con tu grupo oficial

            await m.reply(
                `${emoji} Hola @${m.sender.split`@`[0]}, mi creador ha desactivado los comandos en chats privados.\n\n🧩 Si querés usar mis comandos, unite al grupo principal del bot:\n${gp1}`,
                false,
                { mentions: [m.sender] }
            )

            // Bloquea al usuario
            await conn.updateBlockStatus(m.chat, 'block')
            console.log(`🚷 Usuario ${m.sender} bloqueado (anti-private activo)`)
        }

        return false
    } catch (err) {
        console.error("[ANTI-PRIVATE ERROR]", err)
        return true
    }
}