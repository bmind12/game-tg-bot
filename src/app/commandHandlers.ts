import CitiesGame from '../modules/CitiesGame'

const BOT_COMMOND = 'bot_command'
export const COMMANDS_REGEXP = {
    start: new RegExp(/\/start/),
    status: new RegExp(/\/status/),
    end: new RegExp(/\/end/),
    any: new RegExp(/.+/),
}

const handleOnStart = (bot): commandHandler => {
    return (msg): void => {
        const { id, first_name: name } = msg.chat
        const game = new CitiesGame(id)

        game.start()
        bot.sendMessage(id, `Game started, ${name}`)
    }
}

const handleOnStatus = (bot): commandHandler => {
    return async (msg): Promise<void> => {
        const { id } = msg.chat
        const game = new CitiesGame(id)
        const status = await game.status()

        bot.sendMessage(id, `Status: game ${status}`)
    }
}

const handleOnEnd = (bot): commandHandler => {
    return (msg): void => {
        const { id, first_name: name } = msg.chat
        const game = new CitiesGame(id)

        game.end()
        bot.sendMessage(id, `Game ended, ${name}`)
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
