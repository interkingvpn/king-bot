import moment from 'moment-timezone';

const handler = async (m, {conn}) => {
  const horaPeru = moment().tz('America/Lima').format('DD/MM HH:mm');
  const horaMexico = moment().tz('America/Mexico_City').format('DD/MM HH:mm');
  const horaBolivia = moment().tz('America/La_Paz').format('DD/MM HH:mm');
  const horaChile = moment().tz('America/Santiago').format('DD/MM HH:mm');
  const horaArgentina = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM HH:mm');
  const horaColombia = moment().tz('America/Bogota').format('DD/MM HH:mm');
  const horaEcuador = moment().tz('America/Guayaquil').format('DD/MM HH:mm');
  const horaCostaRica = moment().tz('America/Costa_Rica').format('DD/MM HH:mm');
  const horaCuba = moment().tz('America/Havana').format('DD/MM HH:mm');
  const horaGuatemala = moment().tz('America/Guatemala').format('DD/MM HH:mm');
  const horaHonduras = moment().tz('America/Tegucigalpa').format('DD/MM HH:mm');
  const horaNicaragua = moment().tz('America/Managua').format('DD/MM HH:mm');
  const horaPanama = moment().tz('America/Panama').format('DD/MM HH:mm');
  const horaUruguay = moment().tz('America/Montevideo').format('DD/MM HH:mm');
  const horaVenezuela = moment().tz('America/Caracas').format('DD/MM HH:mm');
  const horaParaguay = moment().tz('America/Asuncion').format('DD/MM HH:mm');
  const horaNewYork = moment().tz('America/New_York').format('DD/MM HH:mm');
  const horaAsia = moment().tz('Asia/Jakarta').format('DD/MM HH:mm');
  const horaBrazil = moment().tz('America/Sao_Paulo').format('DD/MM HH:mm');
  const horaAfrica = moment().tz('Africa/Malabo').format('DD/MM HH:mm');

  await conn.sendMessage(m.chat, {
    text: `「 ZONAS HORARIAS ⏰ 」
⏱️ Perú          : ${horaPeru}
⏱️ México        : ${horaMexico}
⏱️ Bolivia       : ${horaBolivia}
⏱️ Chile         : ${horaChile}
⏱️ Argentina     : ${horaArgentina}
⏱️ Colombia      : ${horaColombia}
⏱️ Ecuador       : ${horaEcuador}
⏱️ Costa Rica    : ${horaCostaRica}
⏱️ Cuba          : ${horaCuba}
⏱️ Guatemala     : ${horaGuatemala}
⏱️ Honduras      : ${horaHonduras}
⏱️ Nicaragua     : ${horaNicaragua}
⏱️ Panamá        : ${horaPanama}
⏱️ Uruguay       : ${horaUruguay}
⏱️ Venezuela     : ${horaVenezuela}
⏱️ Paraguay      : ${horaParaguay}
⏱️ Nueva York    : ${horaNewYork}
⏱️ Asia (Yakarta): ${horaAsia}
⏱️ Brasil        : ${horaBrazil}
⏱️ Guinea Ecuatorial : ${horaAfrica}

Zona horaria del servidor:
[ ${Intl.DateTimeFormat().resolvedOptions().timeZone} ] ${moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')}`
  }, {quoted: m});
};

handler.help = ['zonashorarias'];
handler.tags = ['info'];
handler.command = ['hora', 'timezones'];

export default handler;