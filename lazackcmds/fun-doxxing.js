//Código creado por LAN, sígueme en ig https://www.instagram.com/lansg___/

import {performance} from 'perf_hooks';
const handler = async (m, {conn, text}) => {
const start = performance.now();    
const end = performance.now();
const executionTime = (end - start);
async function loading() {
var hawemod = [
  "Inyectando malware",
  " █ 10%",
  " █ █ 20%",
  " █ █ █ 30%",
  " █ █ █ █ 40%",
  " █ █ █ █ █ 50%",
  " █ █ █ █ █ █ 60%",
  " █ █ █ █ █ █ █ 70%",
  " █ █ █ █ █ █ █ █ 80%",
  " █ █ █ █ █ █ █ █ █ 90%",
  " █ █ █ █ █ █ █ █ █ █ 100%",
  "Secuestrando sistema en proceso.. \\n Conectando al servidor, error 404",
  "Dispositivo conectado exitosamente... \\n Recibiendo datos...",
  "Datos obtenidos del dispositivo 100% completado \\n eliminando todas las evidencias y malware...",
  " HACKEO COMPLETADO ",
  " ENVIANDO DOCUMENTOS DE LOG...",
  " DATOS ENVIADOS EXITOSAMENTE Y Conexión desconectada",
  "REGISTROS BORRADOS"
  ];
    let { key } = await conn.sendMessage(m.chat, {text: `*☠ ¡¡Iniciando doxxeo!! ☠*`}, {quoted: m})
 for (let i = 0; i < hawemod.length; i++) {
   await new Promise(resolve => setTimeout(resolve, 1000)); 
   await conn.sendMessage(m.chat, {text: hawemod[i], edit: key}, {quoted: m}); 
  }     
 }
loading()    
};
handler.help = ['doxxing <nombre> | <@tag>'];
handler.tags = ['diversión'];
handler.command = ['doxxing']
handler.group = true
handler.register = true

export default handler;

function getRandomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}