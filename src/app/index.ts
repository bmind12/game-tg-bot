import TelegramBot from 'node-telegram-bot-api'
import { COMMANDS_REGEXP, commandHandlers } from './commandHandlers'
import Database from '../models/mongo/Database'

export default class App {
    static async init(bot: TelegramBot): Promise<void> {
        try {
            await Database.init()

            App.initBotCommands(bot)
        } catch (error) {
            console.error(error)
        }
    }

    private static initBotCommands(bot: TelegramBot): void {
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
    }
}
