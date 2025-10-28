let handler = async (m, { conn, text }) => {
  let id = m.chat;
  conn.math = conn.math ? conn.math : {};
  
  // Si ya hay una operación pendiente en este chat, se elimina
  if (id in conn.math) {
    clearTimeout(conn.math[id][3]);
    delete conn.math[id];
    m.reply('... operación anterior eliminada');
  }

  // Limpiar y formatear la ecuación ingresada
  let val = text
    .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '') // Solo números y símbolos matemáticos
    .replace(/×/g, '*')                         // Reemplaza × por *
    .replace(/÷/g, '/')                         // Reemplaza ÷ por /
    .replace(/π|pi/gi, 'Math.PI')               // Reemplaza π o pi por Math.PI
    .replace(/e/gi, 'Math.E')                   // Reemplaza e por Math.E
    .replace(/\/+/g, '/')                        // Elimina barras dobles
    .replace(/\++/g, '+')                        // Elimina signos + repetidos
    .replace(/-+/g, '-');                        // Elimina signos - repetidos

  // Formato más amigable para mostrar al usuario
  let format = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/\//g, '÷')
    .replace(/\*/g, '×');

  try {
    console.log(val);
    // Evaluar la ecuación de forma segura
    let result = (new Function('return ' + val))();
    if (!result) throw result;

    // Responder con ecuación y resultado
    m.reply(`*${format}* = _${result}_`);
  } catch (e) {
    // Si no se ingresó ecuación
    if (e == undefined) 
      return m.reply(`⚠️ Ingresa la ecuación.\nSímbolos compatibles: -, +, *, /, ×, ÷, π, e, (, )`);
    
    // Si el formato es incorrecto
    return m.reply(`❌ Formato incorrecto, solo se permiten números (0-9) y símbolos: -, +, *, /, ×, ÷, π, e, (, )`);
  }
};

// Comandos disponibles para el usuario
handler.help = ['cal *<ecuación>*'];
handler.tags = ['herramientas'];
handler.command = ['cal', 'calc', 'calculate', 'calculator'];
handler.exp = 5;
handler.register = true;

export default handler;