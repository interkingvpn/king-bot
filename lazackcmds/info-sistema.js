import os from 'os';
import { execSync } from 'child_process';

/**
 * Formatea bytes a un valor legible
 */
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Obtiene información del espacio en disco de manera multiplataforma
 */
const getDiskSpace = () => {
    try {
        if (os.platform() === 'win32') {
            const stdout = execSync('wmic logicaldisk get size,freespace,caption').toString();
            const lines = stdout.split('\n').filter(line => line.trim());
            if (lines.length < 2) return null;
            
            const drive = lines[1].trim().split(/\s+/);
            if (drive.length < 3) return null;
            
            const total = parseInt(drive[1]) / (1024*1024*1024);
            const free = parseInt(drive[2]) / (1024*1024*1024);
            return {
                size: total.toFixed(2) + 'GB',
                used: (total - free).toFixed(2) + 'GB',
                available: free.toFixed(2) + 'GB',
                usePercent: ((total - free) / total * 100).toFixed(2) + '%'
            };
        } else {
            const stdout = execSync('df -h').toString();
            const line = stdout.split('\n').find(line => line.includes('/dev/'));
            if (!line) return null;
            
            const parts = line.split(/\s+/);
            if (parts.length < 5) return null;
            
            return {
                size: parts[1],
                used: parts[2],
                available: parts[3],
                usePercent: parts[4]
            };
        }
    } catch (error) {
        console.error('Error obteniendo espacio en disco:', error);
        return null;
    }
};

/**
 * Obtiene información de la CPU
 */
const getCPUInfo = () => {
    try {
        const cpus = os.cpus();
        if (!cpus || !cpus.length) return null;
        
        return {
            model: cpus[0].model.split('@')[0].trim(),
            cores: cpus.length,
            speed: (cpus[0].speed / 1000).toFixed(2) + 'GHz'
        };
    } catch (error) {
        console.error('Error obteniendo CPU info:', error);
        return null;
    }
};

const handler = async (m, { conn }) => {
    try {
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const uptime = clockString(process.uptime() * 1000);
        const cpuInfo = getCPUInfo() || {};
        const nodeUsage = process.memoryUsage();
        const diskSpace = getDiskSpace();
        const loadAvg = os.loadavg().map(v => v.toFixed(2)).join(', ');

        let message = `🖥️ *ESTADO DEL SISTEMA*\n\n` +
            `⚙️ *Host:* ${os.hostname()}\n` +
            `📟 *Plataforma:* ${os.platform()} (${os.arch()})\n`;
            
        if (cpuInfo.model) {
            message += `💻 *CPU:* ${cpuInfo.model} (${cpuInfo.cores} cores @ ${cpuInfo.speed})\n`;
        }
        
        message += `📊 *Load Promedio:* ${loadAvg}\n\n` +
            `🧠 *Memoria usada:*\n` +
            `▸ Total: ${formatBytes(totalMem)}\n` +
            `▸ Usada: ${formatBytes(usedMem)} (${(usedMem/totalMem*100).toFixed(2)}%)\n` +
            `▸ Libre: ${formatBytes(freeMem)}\n` +
            `⏱️ *Uptime:* ${uptime}\n\n` +
            `🔧 *Memoria Node.js:*\n` +
            `▸ RSS: ${formatBytes(nodeUsage.rss)}\n` +
            `▸ Heap Total: ${formatBytes(nodeUsage.heapTotal)}\n` +
            `▸ Heap Usada: ${formatBytes(nodeUsage.heapUsed)}\n` +
            `▸ External: ${formatBytes(nodeUsage.external)}\n` +
            `▸ Buffers: ${formatBytes(nodeUsage.arrayBuffers)}\n\n`;
            
        if (diskSpace) {
            message += `💾 *Espacio en Disco:*\n` +
                `▸ Total: ${diskSpace.size}\n` +
                `▸ Usado: ${diskSpace.used} (${diskSpace.usePercent})\n` +
                `▸ Disponible: ${diskSpace.available}\n`;
        } else {
            message += '⚠️ No se pudo obtener información del disco\n';
        }

        await conn.reply(m.chat, message.trim(), m);
        
    } catch (error) {
        console.error('Error en estado del sistema:', error);
        await conn.reply(m.chat, '❌ No se pudo obtener la información del sistema.', m);
    }
};

handler.help = ['system', 'status'];
handler.tags = ['info', 'tools'];
handler.command = ['system', 'sysinfo'];
handler.register = true;

export default handler;

function clockString(ms) {
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor(ms / 3600000) % 24;
    const minutes = Math.floor(ms / 60000) % 60;
    const seconds = Math.floor(ms / 1000) % 60;
    return `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s`;
}