import Game from '../models/Game'
import {
    isBotCommand,
    getBotCommandReply,
    getLastCityFromHistory,
} from './helpers'

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
        const game = await Game.build(id)

        bot.sendMessage(id, await game.start())
    }
}

const handleOnStatus = (bot): CommandHandler => {
    return async (msg): Promise<void> => {
        const { id } = msg.chat
        const game = await Game.build(id)
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
    return async (msg): Promise<void> => {
        const { id, first_name: name } = msg.chat
        const game = await Game.build(id)

        game.end()
        bot.sendMessage(id, `Game ended, ${name}`)
    }
}

const handleOnAny = (bot): CommandHandler => {
    return async (msg): Promise<void> => {
        const id = msg.chat.id
        const text = msg.text
        let answer: string | void

        if (isBotCommand(msg)) {
            answer = getBotCommandReply(text)
        } else {
            const game = await Game.build(id)
            const { status, history } = await game.status()

            if (status === GameStatus.notStarted) {
                answer = BotReply.NotStartedYet
            } else {
                const lastCity = getLastCityFromHistory(history)
                const lastLetter = lastCity
                    .replace(/ \(.+\)/, '')
                    .replace(/(ъ|ь)$/, '')
                    .slice(-1)
                    .toUpperCase()

                if (text[0].toUpperCase() !== lastLetter) {
                    answer = BotReply.WrongLetter + lastLetter
                } else {
                    answer = await game.handleUserMove(text)
                }
            }
        }

        if (!answer) return

        bot.sendMessage(id, answer)
    }
}

export const commandHandlers = new Map([
    [COMMANDS_REGEXP.get('start'), handleOnStart],
    [COMMANDS_REGEXP.get('status'), handleOnStatus],
    [COMMANDS_REGEXP.get('end'), handleOnEnd],
    [COMMANDS_REGEXP.get('any'), handleOnAny],
])
