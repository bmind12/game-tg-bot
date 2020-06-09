import TelegramBot from 'node-telegram-bot-api'
import CommandHandler from '../models/CommandHandler'
import Database from '../models/mongo/Database'

export const COMMANDS_REGEXP = new Map([
    ['start', new RegExp(/\/start/)],
    ['status', new RegExp(/\/status/)],
    ['end', new RegExp(/\/end/)],
    ['any', new RegExp(/.+/)],
])

export default class App {
    static async init(bot: TelegramBot): Promise<void> {
        try {
            await Database.init()
            CommandHandler.init(bot)

            await App.initBotCommands(bot)
        } catch (error) {
            console.error(error)
        }
    }

    private static initBotCommands(bot: TelegramBot): void {
        bot.onText(COMMANDS_REGEXP.get('start'), CommandHandler.onStart)
        bot.onText(COMMANDS_REGEXP.get('status'), CommandHandler.onStatus)
        bot.onText(COMMANDS_REGEXP.get('end'), CommandHandler.onEnd)
        bot.onText(COMMANDS_REGEXP.get('any'), CommandHandler.onAny)
    }
}
