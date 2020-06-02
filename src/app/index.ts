import { COMMANDS_REGEXP, commandHandlers } from './commandHandlers'
import Bot from '../models/Bot' // TODO: create module links
import Database from '../models/Database'
import GameRecord from '../models/GameRecord'
import CitiesRecord from '../models/CitiesRecord'
import CitiesGame from '../models/CitiesGame'

const TOKEN = process.env.TELEGRAM_TOKEN
const bot = new Bot(TOKEN, { polling: true })

const initGame = async (): Promise<void> => {
    try {
        await Database.init()
        await GameRecord.init()
        await CitiesRecord.init()
        await CitiesGame.init()

        bot.onText(
            COMMANDS_REGEXP.get('start'),
            commandHandlers.get(COMMANDS_REGEXP.get('start'))(bot)
        )
        bot.onText(
            COMMANDS_REGEXP.get('status'),
            commandHandlers.get(COMMANDS_REGEXP.get('status'))(bot)
        )
        bot.onText(
            COMMANDS_REGEXP.get('end'),
            commandHandlers.get(COMMANDS_REGEXP.get('end'))(bot)
        )
        bot.onText(
            COMMANDS_REGEXP.get('any'),
            commandHandlers.get(COMMANDS_REGEXP.get('any'))(bot)
        )
    } catch (error) {
        console.error(error)
    }
}

initGame()
