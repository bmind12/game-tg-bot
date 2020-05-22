import {COMMANDS_REGEXP, commandHandlers} from './commandHandlers'
import Bot from '../entities/Bot' // TODO: create module links
import Database from '../entities/Database'
import GameRecord from '../entities/GameRecord'

const TOKEN = process.env.TELEGRAM_TOKEN
const bot = new Bot(TOKEN, {polling: true})

const initGame = async (): Promise<void> => {
    await Database.init()
    await GameRecord.init()

    bot.onText(
        COMMANDS_REGEXP.start,
        commandHandlers.get(COMMANDS_REGEXP.start)(bot)
    )
    bot.onText(
        COMMANDS_REGEXP.status,
        commandHandlers.get(COMMANDS_REGEXP.status)(bot)
    )
    bot.onText(
        COMMANDS_REGEXP.end,
        commandHandlers.get(COMMANDS_REGEXP.end)(bot)
    )
    bot.onText(
        COMMANDS_REGEXP.any,
        commandHandlers.get(COMMANDS_REGEXP.any)(bot)
    )
}

initGame()
