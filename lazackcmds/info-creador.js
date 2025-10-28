import PhoneNumber from 'awesome-phonenumber';

/**
 * Manejador de información de contacto para el propietario/creador del bot
 * @param {Object} m - El objeto del mensaje
 * @param {Object} conn - El objeto de conexión
 */
let handler = async (m, { conn }) => {
    try {
        // Reacciona al mensaje
        await m.react('👋').catch(() => {});

        // Determina a quién obtener la información
        const who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender);
        const [ownerNumber, botNumber] = await Promise.all([
            formatContact(suittag, conn),
            formatContact(conn.user.jid.split('@')[0], conn)
        ]);

        await sendContactArray(conn, m.chat, [
            createContactCard(
                ownerNumber,
                '👑 Propietario',
                botname,
                '❀ No Spamear Por Favor',
                email,
                '📍 Dodoma',
                md,
                ownerNumber.bio
            ),
            createContactCard(
                botNumber,
                '🤖 Cuenta del Bot',
                packname,
                dev,
                email,
                'Ubicación Desconocida 🗺️',
                channel,
                botNumber.bio
            )
        ], m);

    } catch (error) {
        console.error('Error en el manejador de contacto:', error);
        await conn.reply(m.chat, '❌ No se pudo cargar la información de contacto', m);
    }
};

/**
 * Formatea la información de contacto incluyendo foto de perfil y bio
 */
async function formatContact(number, conn) {
    number = String(number); // Asegurar que sea string
    const jid = `${number.replace(/[^0-9]/g, '')}@s.whatsapp.net`;

    // Obtener nombre de contacto
    let name = 'Desconocido';
    try {
        const result = conn.getName(jid);
        name = result instanceof Promise ? await result : result;
    } catch {}

    // Obtener bio
    let bio = 'Música y programación';
    try {
        const bioResult = await conn.fetchStatus(jid);
        bio = bioResult?.status?.toString() || bio;
    } catch {}

    // Obtener foto de perfil
    let pp = 'https://wa.me/message/VB7OEFMW6AD5F1';
    try {
        pp = await conn.profilePictureUrl(jid);
    } catch {}

    return { number, name, bio, pp };
}

/**
 * Crea un objeto de tarjeta de contacto
 */
function createContactCard(contact, role, org, label, email, region, website, bio) {
    return [
        contact.number,
        role,
        org,
        label,
        email,
        region,
        website,
        bio
    ];
}

/**
 * Envía un array de contactos como vCards
 */
async function sendContactArray(conn, jid, data, quoted, options = {}) {
    if (!Array.isArray(data[0])) data = [data];

    const contacts = data.map(([number, name, org, label, email, region, website, bio]) => {
        number = String(number).replace(/[^0-9]/g, '');
        const vcard = generateVCard(number, name, org, label, email, region, website, bio);
        return { vcard, displayName: name };
    });

    return conn.sendMessage(jid, {
        contacts: {
            displayName: contacts.length > 1 ? 'Contactos' : contacts[0]?.displayName || 'Contacto',
            contacts
        }
    }, { quoted, ...options });
}

/**
 * Genera un string vCard
 */
function generateVCard(number, name, org, label, email, region, website, bio) {
    return `
BEGIN:VCARD
VERSION:3.0
N:;${escapeVCardField(name)};;;
FN:${escapeVCardField(name)}
item.ORG:${escapeVCardField(org)}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${escapeVCardField(label)}
item2.EMAIL;type=INTERNET:${escapeVCardField(email)}
item2.X-ABLabel:Email
item3.ADR:;;${escapeVCardField(region)};;;;
item3.X-ABADR:ac
item3.X-ABLabel:Región
item4.URL:${escapeVCardField(website)}
item4.X-ABLabel:Sitio Web
item5.NOTE:${escapeVCardField(bio)}
item5.X-ABLabel:Biografía
END:VCARD`.trim();
}

/**
 * Escapa caracteres especiales en campos vCard
 */
function escapeVCardField(text) {
    return (text || '').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

// Metadata del comando
handler.help = ["creador", "propietario", "contacto"];
handler.tags = ["info", "contacto"];
handler.command = ['owner', 'creator', 'contact', 'developer'];

export default handler;