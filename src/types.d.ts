import TelegramBot = require('node-telegram-bot-api')

declare global {
    interface Global {
        GameStatus?
        Player?
    }

    type CommandHandler = (msg: TelegramBot.Message) => void

    type Cities = { [key: string]: string[] }

    interface GameItem {
        _id: number
        status: GameStatus
        cities: Cities
    }

    type GameHistory = [Player, string][]
}
