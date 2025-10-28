var handler = async (m, { conn, text, usedPrefix, command }) => {

  // Si no se proporciona texto → mostrar ejemplo de uso
  if (!text) 
    return m.reply(
      `${emoji} *Ejemplo de uso*\n\n!${command} Hola @${m.sender.split`@`[0]} Buenos días`, 
      null, 
      { mentions: [m.sender] }
    )

  let cm = copiar(m)
  let quien

  // Detectar a quién se "fingirá"
  if (text.includes('@0')) quien = '0@s.whatsapp.net'
  else if (m.isGroup) quien = cm.participant = m.mentionedJid[0]
  else quien = m.chat

  // Si no se encuentra un usuario objetivo
  if (!quien) 
    return m.reply(
      `${emoji} *Ejemplo de uso*\n\n!${command} Hola @${m.sender.split`@`[0]} Buenos días`, 
      null, 
      { mentions: [m.sender] }
    )

  cm.key.fromMe = false

  // Duplicar objeto de mensaje original
  cm.message[m.mtype] = copiar(m.msg)

  // Construir mensaje falso
  let sp = '@' + quien.split`@`[0]
  let [falso, ...real] = text.split(sp)

  // Enviar respuesta falsa
  conn.fakeReply(
    m.chat, 
    real.join(sp).trimStart(), 
    quien, 
    falso.trimEnd(), 
    m.isGroup ? m.chat : false, 
    { contextInfo: { mentionedJid: conn.parseMention(real.join(sp).trim()) }}
  )

}

handler.help = ['fake']
handler.tags = ['herramientas']
handler.command = ['fitnah', 'respuestafalsa', 'fake']
handler.register = true
handler.group = true

export default handler

// Función para duplicar un objeto
function copiar(obj) {
  return JSON.parse(JSON.stringify(obj))
}