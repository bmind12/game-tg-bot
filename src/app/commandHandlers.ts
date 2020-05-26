import CitiesGame from '../modules/CitiesGame'
import { isBotCommand, handleBotCommand } from './helpers'

export const COMMANDS_REGEXP = new Map([
    ['start', new RegExp(/\/start/)],
    ['status', new RegExp(/\/status/)],
    ['end', new RegExp(/\/end/)],
    ['any', new RegExp(/.+/)],
])

const handleOnStart = (bot): CommandHandler => {
    return (msg): void => {
        const { id, first_name: name } = msg.chat
        const game = new CitiesGame(id)

        game.start()
        bot.sendMessage(id, `Name a first city, ${name}`)
    }
}

const handleOnStatus = (bot): CommandHandler => {
    return async (msg): Promise<void> => {
        const { id } = msg.chat
        const game = new CitiesGame(id)
        const status = await game.status()

        bot.sendMessage(id, `Status: game ${status}`)
    }
}

const handleOnEnd = (bot): CommandHandler => {
    return (msg): void => {
        const { id, first_name: name } = msg.chat
        const game = new CitiesGame(id)

        game.end()
        bot.sendMessage(id, `Game ended, ${name}`)
    }
}

const handleOnAny = (bot): CommandHandler => {
    return (msg): void => {
        const id = msg.chat.id
        const text = msg.text

        if (isBotCommand(msg)) handleBotCommand(id, text, bot)
        else {
            bot.sendMessage(
                id,
                `Пожалуйста введи одну из доступных команд: /${Object.keys(
                    COMMANDS_REGEXP
                ).join(', /')}`
            )
        }
    }
}

export const commandHandlers = new Map([
    [COMMANDS_REGEXP.get('start'), handleOnStart],
    [COMMANDS_REGEXP.get('status'), handleOnStatus],
    [COMMANDS_REGEXP.get('end'), handleOnEnd],
    [COMMANDS_REGEXP.get('any'), handleOnAny],
])
