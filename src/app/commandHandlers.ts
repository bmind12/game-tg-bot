const BOT_COMMOND = 'bot_command'
export const COMMANDS_REGEXP = {
    start: new RegExp(/\/start/),
    status: new RegExp(/\/status/),
    end: new RegExp(/\/end/),
    any: new RegExp(/.+/),
}

const handleOnStart = (bot): commandHandler => {
    return (msg): void => {
        const chatId = msg.chat.id
        bot.sendMessage(chatId, `hello, ${msg.chat.first_name}`)
    }
}

const handleOnStatus = (bot): commandHandler => {
    return (msg): void => {
        const chatId = msg.chat.id
        bot.sendMessage(chatId, `status, ${msg.chat.first_name}`)
    }
}

const handleOnEnd = (bot): commandHandler => {
    return (msg): void => {
        const chatId = msg.chat.id
        bot.sendMessage(chatId, `bye, ${msg.chat.first_name}`)
    }
}

const handleOnAny = (bot): commandHandler => {
    return (msg): void => {
        const chatId = msg.chat.id
        const text = msg.text
        const isBotCommand = msg.entities?.[0]?.type === BOT_COMMOND

        if (isBotCommand) {
            const isValid = Object.values(COMMANDS_REGEXP).some((regexp) =>
                regexp.test(text)
            )

            if (!isValid)
                bot.sendMessage(chatId, `я не знаю команду ${text} 😞`)
        } else {
            bot.sendMessage(
                chatId,
                `Пожалуйста введи одну из доступных команд: /${Object.keys(
                    COMMANDS_REGEXP
                ).join(', /')}`
            )
        }
    }
}

export const commandHandlers = new Map([
    [COMMANDS_REGEXP.start, handleOnStart],
    [COMMANDS_REGEXP.status, handleOnStatus],
    [COMMANDS_REGEXP.end, handleOnEnd],
    [COMMANDS_REGEXP.any, handleOnAny],
])