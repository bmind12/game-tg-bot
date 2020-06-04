import { COMMANDS_REGEXP, commandHandlers } from './commandHandlers'
import Bot from '../models/Bot' // TODO: create module links
import Database from '../models/Database'
import GameRecord from '../models/GameRecord'
import CitiesRecord from '../models/CitiesRecord'
import CitiesGame from '../models/CitiesGame'

const token = process.env.TELEGRAM_TOKEN
const port = process.env.PORT || 443
const host = '0.0.0.0'
const externalUrl =
    process.env.CUSTOM_ENV_VARIABLE || 'https://igragorodabot.herokuapp.com'
const bot = new Bot(token, { webHook: { port, host } })

bot.setWebHook(externalUrl + ':443/bot' + token)

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
