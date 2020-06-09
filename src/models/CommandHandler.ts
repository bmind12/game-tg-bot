import TelegramBot from 'node-telegram-bot-api'
import Game from './Game'
import {
    isBotCommand,
    getBotCommandReply,
    getLastCityFromHistory,
} from '../app/helpers'

const STATUS_REPLYES = new Map([
    [GameStatus.started, 'Игра уже идет'],
    [GameStatus.notStarted, 'Игра не началась'],
])

export default class CommandHandler {
    private static bot: TelegramBot

    static init(bot): void {
        CommandHandler.bot = bot
    }

    static async onStart(msg): Promise<void> {
        const { id } = msg.chat
        const game = await Game.build(id)

        CommandHandler.bot.sendMessage(id, await game.start())
    }

    static async onStatus(msg): Promise<void> {
        const { id } = msg.chat
        const game = await Game.build(id)
        const { status, history } = await game.status()
        const cities = history
            .reduce((cities, item) => {
                cities.push(item[1])
                return cities
            }, [])
            .join(', ')

        CommandHandler.bot.sendMessage(
            id,
            `Статус игры: ${STATUS_REPLYES.get(
                status
            )}. Названные города: ${cities}`
        )
    }

    static async onEnd(msg): Promise<void> {
        const { id, first_name: name } = msg.chat
        const game = await Game.build(id)

        game.end()
        CommandHandler.bot.sendMessage(id, `Game ended, ${name}`)
    }

    static async onAny(msg): Promise<void> {
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

        CommandHandler.bot.sendMessage(id, answer)
    }
}
