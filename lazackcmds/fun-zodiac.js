const handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, 
        `${emoji} Por favor ingresa tu fecha de nacimiento en el formato AAAA MM DD\n> Ejemplo: ${usedPrefix + command} 2003 02 07`, 
        m
    );

    // Parsear fecha
    const [year, month, day] = text.split(' ').map(Number);
    if (!year || !month || !day) {
        return conn.reply(m.chat, 
            '⚠️ Formato de fecha inválido. Usa: AAAA MM DD\nEjemplo: 2003 02 07', 
            m
        );
    }

    const birthDate = new Date(year, month - 1, day);
    if (isNaN(birthDate.getTime())) {
        return conn.reply(m.chat, 
            '❌ Fecha inválida. Por favor verifica tu entrada', 
            m
        );
    }

    // Fecha actual
    const now = new Date();
    const [currentYear, currentMonth, currentDay] = [
        now.getFullYear(), 
        now.getMonth() + 1, 
        now.getDate()
    ];

    // Calcular edad
    let age = currentYear - year;
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        age--;
    }

    // Calcular próximo cumpleaños
    let nextBirthdayYear = currentYear;
    if (currentMonth > month || (currentMonth === month && currentDay >= day)) {
        nextBirthdayYear++;
    }
    const nextBirthday = `${nextBirthdayYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Verificar si hoy es cumpleaños
    const isBirthday = currentMonth === month && currentDay === day;
    
    // Obtener signo zodiacal
    const zodiac = getZodiac(month, day);

    // Formatear respuesta
    const response = `
✨ *Información de Cumpleaños* ✨

📅 Fecha de nacimiento: ${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}
🎂 Próximo cumpleaños: ${nextBirthday}
🧮 Edad: ${age} ${isBirthday ? '🎉 ¡Feliz Cumpleaños!' : ''}
♈ Signo Zodiacal: ${zodiac} ${getZodiacEmoji(zodiac)}

${getZodiacTraits(zodiac)}
`.trim();

    await conn.reply(m.chat, response, m);
};

handler.help = ['zodiac <AAAA MM DD>', 'birthinfo <AAAA MM DD>'];
handler.tags = ['fun', 'tools'];
handler.command = ['zodiac', 'birthinfo', 'zodia', 'horoscopo'];
handler.group = true;
handler.register = true;

export default handler;

// Datos zodiacales con emojis y características
const zodiacData = [
    { name: "Capricornio", start: [12, 22], end: [1, 19], emoji: "♑", traits: "Ambicioso, disciplinado, paciente" },
    { name: "Acuario", start: [1, 20], end: [2, 18], emoji: "♒", traits: "Innovador, humanitario, independiente" },
    { name: "Piscis", start: [2, 19], end: [3, 20], emoji: "♓", traits: "Compasivo, artístico, intuitivo" },
    { name: "Aries", start: [3, 21], end: [4, 19], emoji: "♈", traits: "Valiente, enérgico, optimista" },
    { name: "Tauro", start: [4, 20], end: [5, 20], emoji: "♉", traits: "Fiable, paciente, sensual" },
    { name: "Géminis", start: [5, 21], end: [6, 20], emoji: "♊", traits: "Adaptable, curioso, ingenioso" },
    { name: "Cáncer", start: [6, 21], end: [7, 22], emoji: "♋", traits: "Leal, emocional, protector" },
    { name: "Leo", start: [7, 23], end: [8, 22], emoji: "♌", traits: "Carismático, generoso, cálido" },
    { name: "Virgo", start: [8, 23], end: [9, 22], emoji: "♍", traits: "Analítico, práctico, perfeccionista" },
    { name: "Libra", start: [9, 23], end: [10, 22], emoji: "♎", traits: "Diplomático, social, justo" },
    { name: "Escorpio", start: [10, 23], end: [11, 21], emoji: "♏", traits: "Apasionado, ingenioso, determinado" },
    { name: "Sagitario", start: [11, 22], end: [12, 21], emoji: "♐", traits: "Aventurero, optimista, filosófico" }
];

function getZodiac(month, day) {
    const date = new Date(1970, month - 1, day);
    for (const sign of zodiacData) {
        const startDate = new Date(1970, sign.start[0] - 1, sign.start[1]);
        const endDate = new Date(1970, sign.end[0] - 1, sign.end[1]);
        if (date >= startDate && date <= endDate) {
            return sign.name;
        }
    }
    return "Desconocido";
}

function getZodiacEmoji(zodiacName) {
    const sign = zodiacData.find(s => s.name === zodiacName);
    return sign ? sign.emoji : "";
}

function getZodiacTraits(zodiacName) {
    const sign = zodiacData.find(s => s.name === zodiacName);
    return sign ? `🌟 Características: ${sign.traits}` : "";
}