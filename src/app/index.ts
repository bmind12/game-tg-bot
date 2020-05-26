import { COMMANDS_REGEXP, commandHandlers } from './commandHandlers'
import Bot from '../modules/Bot' // TODO: create module links
import Database from '../modules/Database'
import GameRecord from '../modules/GameRecord'

const TOKEN = process.env.TELEGRAM_TOKEN
const bot = new Bot(TOKEN, { polling: true })

const initGame = async (): Promise<void> => {
    try {
        await Database.init()
        await GameRecord.init()

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
