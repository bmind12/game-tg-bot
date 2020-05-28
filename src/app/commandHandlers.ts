import CitiesGame from '../models/CitiesGame'
import { isBotCommand, handleBotCommand } from './helpers'

export const COMMANDS_REGEXP = new Map([
    ['start', new RegExp(/\/start/)],
    ['status', new RegExp(/\/status/)],
    ['end', new RegExp(/\/end/)],
    ['any', new RegExp(/.+/)],
])

const STATUS_REPLYES = new Map([
    [GameStatus.started, 'Игра уже идет'],
    [GameStatus.notStarted, 'Игра не началась'],
])

const handleOnStart = (bot): CommandHandler => {
    return async (msg): Promise<void> => {
        const { id } = msg.chat
        const game = new CitiesGame(id)

        bot.sendMessage(id, await game.start())
    }
}

const handleOnStatus = (bot): CommandHandler => {
    return async (msg): Promise<void> => {
        const { id } = msg.chat
        const game = new CitiesGame(id)
        const { status, history } = await game.status()
        const cities = history
            .reduce((cities, item) => {
                cities.push(item[1])
                return cities
            }, [])
            .join(', ')

        bot.sendMessage(
            id,
            `Статус игры: ${STATUS_REPLYES.get(
                status
            )}. Названные города: ${cities}`
        )
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
