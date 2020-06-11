import TelegramBot from 'node-telegram-bot-api'

declare global {
    interface Global {
        BotReply?
        CollectionName?
        GameStatus?
        Player?
    }

    type CommandHandler = (msg: TelegramBot.Message) => void

    interface Cities {
        [key: string]: string[]
    }

    type CitiesItem = {
        _id: string
        cities: string[]
    }

    interface GameItem {
        _id: number
        status: GameStatus
        history: GameHistory
    }

    type GameHistory = HistoryItem[]

    type HistoryItem = [Player, string]

    namespace Mongo {
        interface Validator {
            $jsonSchema: {}
        }
    }
}
