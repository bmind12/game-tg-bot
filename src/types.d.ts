import TelegramBot from 'node-telegram-bot-api'
import { Db } from 'mongodb'
declare global {
    interface Global {
        BotReply?
        CollectionName?
        GameStatus?
        Player?
    }

    type CommandHandler = (msg: TelegramBot.Message) => void

    type Cities = {
        [key: string]: string[]
    }

    type CitiesItem = {
        _id: string
        cities: string[]
    }

    interface GameItem {
        _id: number
        status: GameStatus
        cities: Cities
        history: GameHistory
    }

    type GameHistory = [Player, string][]

    namespace Mongo {
        interface Validator {
            $jsonSchema: {}
        }
    }
}
