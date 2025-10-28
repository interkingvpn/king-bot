/**  
 * Manejador de Panel y Estadísticas  
 * Proporciona estadísticas de uso de comandos e información de la base de datos de usuarios  
 * @param {Object} m - El objeto del mensaje  
 * @param {Object} param1 - Parámetros desestructurados  
 */  
let handler = async (m, { conn, command }) => {  
    try {  
        // Panel de estadísticas de comandos  
        if (['dash', 'dashboard', 'views'].includes(command)) {  
            let stats = Object.entries(db.data.stats)  
                .map(([key, val]) => {  
                    let name = Array.isArray(plugins[key]?.help)   
                        ? plugins[key].help.join(' , ')   
                        : plugins[key]?.help || key;  
                      
                    // Filtrar comandos del sistema/internos  
                    if (/exec|_/.test(name)) return null;  
                      
                    return {   
                        name: name.replace('_', ' '),   
                        ...val   
                    };  
                })  
                .filter(Boolean)  
                .sort((a, b) => b.total - a.total);  
              
            let topCommands = stats.slice(0, 15).map(({ name, total, lastUsed }, i) => {  
                let lastUsedFormatted = lastUsed   
                    ? new Date(lastUsed).toLocaleString()   
                    : 'Nunca';  
                return `▫ *${i+1}. ${name}*\n   ↳ Usos: ${total}\n   ↳ Último Uso: ${lastUsedFormatted}`;  
            }).join('\n\n');  
  
            await conn.reply(m.chat,   
                `📊 *ESTADÍSTICAS DE COMANDOS*\n\n` +  
                `Mostrando los ${Math.min(stats.length, 15)} comandos más usados:\n\n` +  
                `${topCommands}\n\n` +  
                `Total de comandos rastreados: ${stats.length}`,  
                m  
            );  
        }  
  
        // Información de la base de datos de usuarios  
        if (['database', 'users', 'user'].includes(command)) {  
            let totalUsers = Object.keys(global.db.data.users).length;  
            let registeredUsers = Object.values(global.db.data.users)  
                .filter(user => user.registered).length;  
            let premiumUsers = Object.values(global.db.data.users)  
                .filter(user => user.premium).length;  
  
            await conn.reply(m.chat,   
                `📂 *BASE DE DATOS DE USUARIOS*\n\n` +  
                `👤 Usuarios Registrados: ${registeredUsers}\n` +  
                `⭐ Usuarios Premium: ${premiumUsers}\n` +  
                `📝 Total de Usuarios: ${totalUsers}\n\n` +  
                `Almacenamiento: ${(JSON.stringify(global.db.data).length / 1024).toFixed(2)} KB`,  
                m  
            );  
        }  
    } catch (error) {  
        console.error('Error en el panel:', error);  
        await conn.reply(m.chat,   
            '❌ Ocurrió un error al procesar tu solicitud',   
            m  
        );  
    }  
}  
  
// Metadatos del comando  
handler.help = [  
    'dashboard - Ver estadísticas de uso de comandos',  
    'users - Ver información de la base de datos de usuarios'  
];  
handler.tags = ['info', 'sistema'];  
handler.command = [  
    'dashboard', 'dash', 'stats',   
    'database', 'users', 'user'  
];  
handler.register = true;  
  
export default handler;