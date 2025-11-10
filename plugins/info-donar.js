const handler = async (m, { conn }) => {
  const name = await conn.getName(m.sender);
  const donar = `
┏━━━━━━━━━━━━━━━━━┓
┃ 👑 𝗞𝗜𝗡𝗚•𝗕𝗢𝗧 ⚡ -             ┃
┗━━━━━━━━━━━━━━━━━┛

¡Hola, *${name}*!  
Gracias por usar *KING•BOT*.

Este bot está inspirado en el gran trabajo de *𝗜𝗡𝗧𝗘𝗥•𝗞𝗜𝗡𝗚* y su bot *𝗞𝗜𝗡𝗚•𝗕𝗢𝗧*.  
Gracias a su aporte, fue posible crear nuevas herramientas y funciones útiles para ti.

✨ *Si quieres hacer una donación*  
Puedes hacerlo desde el siguiente enlace:
👉 _link.mercadopago.com.ar/interking_

Cualquier donación es muy apreciada ❤️

¡Gracias por tu confianza y apoyo!

⚙️ *Versión*: KING•BOT   
❤️ *Argentina Misiones*  
`.trim();

  await conn.sendMessage(m.chat, { text: donar }, { quoted: m });
};

handler.command = /^dona(te|si)?|donar|apoyar$/i;
handler.help = ['donar', 'apoyar'];
handler.tags = ['info'];
export default handler;