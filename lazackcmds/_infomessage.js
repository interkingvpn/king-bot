let handler = m => m
handler.before = async function (m, { conn, isBotAdmin }) {

    let chat = globalThis.db.data.chats[m.chat];

    // Si el bot es administrador y autoRechazar está activado
    if (isBotAdmin && chat.autoRechazar) {
        const prefixes = ['6', '90', '963', '966', '967', '249', '212', '92', '93', '94', '7', '49', '2', '91', '48']
        // Si el número del remitente empieza con alguno de los prefijos, rechazar su solicitud de unirse al grupo
        if (prefixes.some(prefix => m.sender.startsWith(prefix))) {
            await conn.groupRequestParticipantsUpdate(m.chat, [m.sender], 'reject')
        }
    }

    // Si autoAceptar está activado y el bot es administrador
    if (chat.autoAceptar && isBotAdmin) {
        const participants2 = await conn.groupRequestParticipantsList(m.chat)
        // Filtrar participantes cuyo número empieza con '5'
        const filteredParticipants = participants2.filter(p => p.jid.includes('@s.whatsapp.net') && p.jid.split('@')[0].startsWith('5'))
        for (const participant of filteredParticipants) {
            await conn.groupRequestParticipantsUpdate(m.chat, [participant.jid], "approve")
        }
        // Si se detecta un mensaje de solicitud de unión y el número empieza con '5', aprobarlo
        if (m.messageStubType === 172 && m.messageStubParameters?.[0]?.includes('@s.whatsapp.net')) {
            const jid = m.messageStubParameters[0]
            if (jid.split('@')[0].startsWith('5')) {
                await conn.groupRequestParticipantsUpdate(m.chat, [jid], "approve")
            }
        }
    }

    // Si el bot es administrador y antifake está activado
    if (isBotAdmin && chat.antifake) {
        const antiFakePrefixes = ['6', '90', '212', '92', '93', '94', '7', '49', '2', '91', '48']
        // Si el número del remitente empieza con alguno de los prefijos anti-fake, bloquearlo y eliminarlo del grupo
        if (antiFakePrefixes.some(prefix => m.sender.startsWith(prefix))) {
            global.db.data.users[m.sender].block = true
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }
    }

}
export default handler