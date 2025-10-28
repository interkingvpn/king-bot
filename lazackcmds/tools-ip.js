import axios from 'axios'

let handler = async (m, { conn, text }) => {
  // Mensaje inicial mientras se busca la IP
  let bot = '🍭 Buscando, por favor espera...'
  conn.reply(m.chat, bot, m)

  // Validación de entrada
  if (!text) return conn.reply(m.chat, `${emoji} Por favor ingresa una *dirección IP* válida.`, m)

  // Consulta a la API de ip-api
  axios.get(`http://ip-api.com/json/${text}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,hosting,query`)
    .then((res) => {
      const data = res.data

      if (String(data.status) !== "success") {
        throw new Error(data.message || "Error al obtener los datos")
      }

      // Formato del reporte en español
      let ipsearch = `
☁️ *I N F O R M A C I Ó N - I P* ☁️

Dirección IP     : ${data.query}
País             : ${data.country}
Código del país  : ${data.countryCode}
Región/Estado    : ${data.regionName}
Código de región : ${data.region}
Ciudad           : ${data.city}
Distrito         : ${data.district}
Código postal    : ${res.data.zip}
Zona horaria     : ${data.timezone}
Proveedor ISP    : ${data.isp}
Organización     : ${data.org}
Número AS        : ${data.as}
Red móvil        : ${data.mobile ? "Sí" : "No"}
Hosting          : ${data.hosting ? "Sí" : "No"}
`.trim()

      conn.reply(m.chat, ipsearch, m)
    })
    .catch(err => {
      conn.reply(m.chat, `⚠️ Error: ${err.message}`, m)
    })
}

handler.help = ['ip <dirección IP>']
handler.tags = ['owner']
handler.command = ['ip']

export default handler