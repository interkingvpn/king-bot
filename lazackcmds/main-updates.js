import fetch from 'node-fetch'
import moment from 'moment-timezone'

// Configuración
const config = {
    repoOwner: 'king-bot',
    repoName: 'king-bot',
    channelJid: 'https://wa.me/message/VB7OEFMW6AD5F1', // ID del canal de boletines
    checkInterval: 5, // Minutos entre verificaciones
    notificationTarget: 'https://wa.me/message/VB7OEFMW6AD5F1' // Número del bot o chat donde se enviarán notificaciones
}

// Seguimiento del estado
let lastCommitSha = null
let isTracking = false
let trackingInterval = null

const handler = async (m, { conn, args }) => {
    try {
        // Obtener los datos más recientes del repositorio
        const [repoData, latestCommit] = await getRepoData()
        
        // Verificar si hay un nuevo commit
        if (lastCommitSha && lastCommitSha !== latestCommit.sha) {
            await sendUpdateNotification(conn, repoData, latestCommit)
        }
        
        // Actualizar el último commit conocido
        lastCommitSha = latestCommit.sha
        
        // Manejar la verificación manual
        if (!args.includes('--subscribe')) {
            const updateMsg = createUpdateMessage(repoData, latestCommit)
            await conn.sendMessage(m.chat, { 
                text: updateMsg,
                contextInfo: createContextInfo(repoData.html_url)
            }, { quoted: m })
        }
        
        // Iniciar el seguimiento si se solicita
        if (args.includes('--subscribe') && !isTracking) {
            isTracking = true
            await m.reply(`🔔 Ahora se están siguiendo las actualizaciones del repositorio (verificación cada ${config.checkInterval} minutos)`)
            startTracking(conn)
        }

        // Detener el seguimiento si se solicita
        if (args.includes('--unsubscribe') && isTracking) {
            stopTracking()
            await m.reply('🔕 Se ha detenido el seguimiento de las actualizaciones del repositorio')
        }

    } catch (error) {
        console.error('Error al verificar actualizaciones:', error)
        await m.reply(`⚠️ No se pudo verificar las actualizaciones: ${error.message}`)
    }
}

// Funciones auxiliares
async function getRepoData() {
    const [repoRes, commitsRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${config.repoOwner}/${config.repoName}`),
        fetch(`https://api.github.com/repos/${config.repoOwner}/${config.repoName}/commits`)
    ])
    if (!repoRes.ok || !commitsRes.ok) throw new Error('No se pudo obtener la información del repositorio')
    
    const [repoData, commitsData] = await Promise.all([
        repoRes.json(),
        commitsRes.json()
    ])
    
    return [repoData, commitsData[0]]
}

function startTracking(conn) {
    trackingInterval = setInterval(async () => {
        try {
            const [repoData, latestCommit] = await getRepoData()
            if (lastCommitSha && lastCommitSha !== latestCommit.sha) {
                await sendUpdateNotification(conn, repoData, latestCommit)
            }
            lastCommitSha = latestCommit.sha
        } catch (e) {
            console.error('Error en la actualización automática:', e)
        }
    }, config.checkInterval * 60 * 1000)
}

function stopTracking() {
    clearInterval(trackingInterval)
    isTracking = false
    trackingInterval = null
}

async function sendUpdateNotification(conn, repoData, commit) {
    const updateMsg = createUpdateMessage(repoData, commit)
    await conn.sendMessage(config.notificationTarget, {
        text: updateMsg,
        contextInfo: createContextInfo(repoData.html_url)
    })
}

function createUpdateMessage(repoData, commit) {
    return `🚀 *¡Nueva actualización disponible!*\n\n` +
           `📦 Repositorio: ${repoData.full_name}\n` +
           `⭐ Estrellas: ${repoData.stargazers_count}\n` +
           `🔄 Última actualización: ${moment(repoData.pushed_at).tz('Africa/Nairobi').format('DD/MM/YY HH:mm:ss')}\n\n` +
           `🔨 Último commit:\n` +
           `• Mensaje: ${commit.commit.message.split('\n')[0]}\n` +
           `• Autor: ${commit.commit.author.name}\n` +
           `• Fecha: ${moment(commit.commit.author.date).tz('Africa/Nairobi').format('DD/MM/YY HH:mm:ss')}\n\n` +
           `🔗 Ver cambios: ${repoData.html_url}/commits`
}

function createContextInfo(url) {
    return {
        forwardedNewsletterMessageInfo: {
            newsletterJid: config.channelJid,
            newsletterName: 'Actualizaciones de KING•BOT',
            serverMessageId: -1
        },
        externalAdReply: {
            title: '¡Nueva actualización del repositorio!',
            body: 'Toca para ver los cambios',
            thumbnailUrl: 'https://wa.me/message/VB7OEFMW6AD5F1',
            sourceUrl: url,
            mediaType: 1
        }
    }
}

// Configuración del comando
handler.help = ['gitwatch', 'repotrack']
handler.tags = ['tools']
handler.command = ['gitwatch', 'repotrack']
handler.group = true

export default handler