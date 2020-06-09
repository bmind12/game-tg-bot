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
        [key: FirstLetter]: City[]
    }

    type CitiesItem = {
        _id: string
        cities: City[]
    }

    type City = string

    interface GameItem {
        _id: number
        status: GameStatus
        history: GameHistory
    }

    type GameHistory = HistoryItem[]

    type HistoryItem = [Player, City]

    type FirstLetter = string

    namespace Mongo {
        interface Validator {
            $jsonSchema: {}
        }
    }
}
