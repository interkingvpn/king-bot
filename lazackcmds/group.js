import fs from 'fs';  
import path from 'path';  

let handler = async (m, { conn }) => {  
  try {  
    const groupMetadata = await conn.groupMetadata(m.chat);  
    const participantes = groupMetadata.participants || [];  

    if (participantes.length < 2) {  
      return m.reply('🚫 El grupo debe tener al menos 2 miembros.');  
    }  
    if (participantes.length > 1000) {  
      return m.reply('🚫 El grupo tiene más de 1000 miembros.');  
    }  

    // Generar contenido VCF  
    let contenidoVCF = `BEGIN:VCARD\nVERSION:3.0\nNOTE:Generado para el grupo: ${groupMetadata.subject}\n`;  
    for (let participante of participantes) {  
      let userJid = participante.id || participante.jid || ''; // Usar ID disponible  
      if (!userJid) continue;  

      let numeroTelefono = userJid.replace(/\D/g, ''); // Extraer solo dígitos  
      let nombreVisible = participante.notify || numeroTelefono; // Usar nombre notify si existe  

      contenidoVCF += `  
BEGIN:VCARD  
VERSION:3.0  
FN:${nombreVisible}  
TEL;TYPE=CELL:+${numeroTelefono}  
END:VCARD  
`.trim() + '\n';  
    }  

    // Sanitizar nombre del grupo  
    const nombreGrupoSanitizado = groupMetadata.subject.replace(/[^a-zA-Z0-9_]/g, '_');  
    const rutaArchivoVCF = path.join(process.cwd(), `${nombreGrupoSanitizado}.vcf`);  

    // Escribir archivo VCF  
    fs.writeFileSync(rutaArchivoVCF, contenidoVCF);  
    console.log(`✅ Archivo VCF generado: ${rutaArchivoVCF}`);  

    // Enviar el archivo  
    await conn.sendMessage(m.chat, {  
      document: fs.readFileSync(rutaArchivoVCF),  
      mimetype: 'text/vcard',  
      fileName: `LazackDevice.vcf`,  
      caption: `📂 Aquí está el archivo VCF del grupo *${groupMetadata.subject}* (${participantes.length} miembros).`,  
    });  

    // Eliminar el archivo después de enviar  
    setTimeout(() => fs.unlinkSync(rutaArchivoVCF), 5000);  
  } catch (error) {  
    console.error('❌ Error en el comando VCF:', error);  
    m.reply('⚠️ Ocurrió un error al generar el archivo VCF.');  
  }  
};  

handler.help = ['vcf'];  
handler.tags = ['herramientas'];  
handler.command = /^(vcf)$/i;  
handler.group = true;  

export default handler;