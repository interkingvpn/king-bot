// @type {import('@whiskeysockets/baileys')}

const { proto, generateWAMessage, areJidsSameUser, decryptPollVote } = (await import('@whiskeysockets/baileys')).default;

export async function all(m, chatUpdate) {
    // Ignorar mensajes del propio bot
    if (m.isBaileys) return;
    // Ignorar si no hay mensaje
    if (!m.message) return;
    // Ignorar si no es un mensaje interactivo (botón, plantilla o lista)
    if (!(m.message.buttonsResponseMessage || m.message.templateButtonReplyMessage || m.message.listResponseMessage || m.message.interactiveResponseMessage)) return;

    // Obtener el ID de la acción del mensaje
    let id;
    if (m.message.buttonsResponseMessage) {
        id = m.message.buttonsResponseMessage.selectedButtonId;
    } else if (m.message.templateButtonReplyMessage) {
        id = m.message.templateButtonReplyMessage.selectedId;
    } else if (m.message.listResponseMessage) {
        id = m.message.listResponseMessage.singleSelectReply?.selectedRowId;
    } else if (m.message.interactiveResponseMessage) {
        id = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id;
    }

    // Obtener el texto del mensaje interactivo
    const text = m.message.buttonsResponseMessage?.selectedDisplayText 
               || m.message.templateButtonReplyMessage?.selectedDisplayText 
               || m.message.listResponseMessage?.title;

    let isIdMessage = false;
    let usedPrefix;

    // Recorrer todos los plugins registrados
    for (const name in global.plugins) {
        const plugin = global.plugins[name];
        if (!plugin) continue;
        if (plugin.disabled) continue;
        // Ignorar plugins de admin si no está activado el modo restrict
        if (!opts['restrict']) {
            if (plugin.tags && plugin.tags.includes('admin')) continue;
        }
        if (typeof plugin !== 'function') continue;
        if (!plugin.command) continue;

        // Función para escapar caracteres especiales en regex
        const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

        // Determinar el prefijo del plugin
        const _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : global.prefix;

        // Buscar coincidencia de prefijo
        const match = (_prefix instanceof RegExp ? [[_prefix.exec(id), _prefix]] 
            : Array.isArray(_prefix) ? _prefix.map(p => {
                const re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
                return [re.exec(id), re];
            }) : typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(id), new RegExp(str2Regex(_prefix))]] 
            : [[[], new RegExp]]
        ).find(p => p[1]);

        if ((usedPrefix = (match[0] || '')[0])) {
            // Quitar prefijo y obtener el comando
            const noPrefix = id.replace(usedPrefix, '');
            let [command] = noPrefix.trim().split` `.filter(v => v);
            command = (command || '').toLowerCase();

            // Verificar si el comando coincide con el plugin
            const isId = plugin.command instanceof RegExp ? plugin.command.test(command)
                        : Array.isArray(plugin.command) ? plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command)
                        : typeof plugin.command === 'string' ? plugin.command === command
                        : false;

            if (!isId) continue;
            isIdMessage = true;
        }
    }

    // Generar el mensaje a enviar
    const messages = await generateWAMessage(m.chat, { 
        text: isIdMessage ? id : text, 
        mentions: m.mentionedJid 
    }, {
        userJid: this.user.id,
        quoted: m.quoted && m.quoted.fakeObj,
    });

    messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.name;

    if (m.isGroup) {
        messages.key.participant = messages.participant = m.sender;
    }

    const msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)].map(v => (v.conn = this, v)),
        type: 'append',
    };

    // Emitir el mensaje al sistema de eventos
    this.ev.emit('messages.upsert', msg);
}