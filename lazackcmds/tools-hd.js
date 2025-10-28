import FormData from "form-data"
import Jimp from "jimp"

const handler = async (m, {conn, usedPrefix, command}) => {
  try {    
    await m.react('🕓')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""

    // Si no se detecta imagen
    if (!mime) 
      return conn.reply(m.chat, `❀ Por favor envía una imagen o responde a una imagen usando el comando.`, m)

    // Si el archivo no es soportado
    if (!/image\/(jpe?g|png)/.test(mime)) 
      return m.reply(`✧ El formato del archivo (${mime}) no es compatible, por favor envía o responde a una imagen válida.`)

    conn.reply(m.chat, `✧ Mejorando la calidad de la imagen...`, m)  

    // Descargar imagen
    let img = await q.download?.()

    // Mejorar usando la función remini
    let pr = await remini(img, "enhance")

    // Enviar imagen mejorada
    await conn.sendFile(m.chat, pr, 'thumbnail.jpg', "✅ ¡Imagen mejorada exitosamente!", m, null)
    await m.react('✅')
  } catch {
    await m.react('✖️')
  }
}

handler.help = ["hd"]
handler.tags = ["herramientas"]
handler.command = ["remini", "hd", "mejorar"]

export default handler

// Función para mejorar la calidad de la imagen usando Vyro AI
async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"]
    if (!availableOperations.includes(operation)) {
      operation = availableOperations[0] // Por defecto: enhance
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro"

    const formData = new FormData()
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"})
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"})

    formData.submit(
      {
        url: baseUrl,
        host: "inferenceengine.vyro.ai",
        path: "/" + operation,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip"
        }
      },
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) { chunks.push(chunk) });
        res.on("end", function () { resolve(Buffer.concat(chunks)) });
        res.on("error", function (err) { reject(err) });
      },
    )
  })
}