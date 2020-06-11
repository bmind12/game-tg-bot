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

    static init(bot: TelegramBot): void {
        CommandHandler.bot = bot
    }

    static async onStart(msg: TelegramBot.Message): Promise<void> {
        const { id } = msg.chat
        const game = await Game.build(id)
        const botMessage = await game?.start()

        if (!botMessage) return

        CommandHandler.bot.sendMessage(id, botMessage)
    }

    static async onStatus(msg: TelegramBot.Message): Promise<void> {
        const { id } = msg.chat
        const game = await Game.build(id)
        const gameStatus = await game?.status()

        if (!gameStatus) return

        const { status, history } = gameStatus

        if (!status || !history) return

        const cities = history
            .reduce((cities, item) => {
                cities.push(item[1])

                return cities
            }, [] as string[])
            .join(', ')

        CommandHandler.bot.sendMessage(
            id,
            `Статус игры: ${STATUS_REPLYES.get(
                status
            )}. Названные города: ${cities}`
        )
    }

    static async onEnd(msg: TelegramBot.Message): Promise<void> {
        const { id, first_name: name } = msg.chat
        const game = await Game.build(id)

        game?.end()
        CommandHandler.bot.sendMessage(id, `Game ended, ${name}`)
    }

    static async onAny(msg: TelegramBot.Message): Promise<void> {
        const id = msg.chat.id
        const text = msg.text
        let answer: string | void

        if (!text) return

        if (isBotCommand(msg)) {
            answer = getBotCommandReply(text)
        } else {
            const game = await Game.build(id)

            if (!game) return

            const gameStatus = await game.status()

            if (!gameStatus) return

            const { status, history } = gameStatus

            if (!status || !history) return

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
