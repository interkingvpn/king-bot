// saludos.js  
// Este plugin responde a saludos en español solo en MD con un retraso de 10s.  
// Responde una vez cada 12 horas por usuario.  

const saludadoRecientemente = {}; // Almacena timestamps por usuario  

export async function before(m, { conn }) {  
  if (!m.text) return;  
  if (m.isGroup) return;  

  let texto = m.text.toLowerCase().trim();  

  const saludos = [  
    "hola", "buenos días", "buenas tardes", "buenas noches", "qué tal", "cómo estás", "qué onda", "qué hay"  
  ];  

  const usuario = m.sender;  

  // Verifica si es un saludo  
  if (saludos.some(saludo => texto.includes(saludo))) {  
    const ahora = Date.now();  
    const ultimoSaludo = saludadoRecientemente[usuario] || 0;  
    const doceHoras = 12 * 60 * 60 * 1000;  

    // Verifica si han pasado 12 horas  
    if (ahora - ultimoSaludo < doceHoras) return; // omitir respuesta  

    // Actualiza la última vez que saludó  
    saludadoRecientemente[usuario] = ahora;  

    const respuesta = `  
👋 *¡Hola!*    
💬 Por favor escribe tu consulta.    
🕒 El jefe está actualmente *desconectado*.  
    `.trim();  

    await conn.sendPresenceUpdate("composing", m.chat);  
    await new Promise(resolve => setTimeout(resolve, 10000));  
    await m.reply(respuesta);  

    return true;  
  }  
}