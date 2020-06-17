import TelegramBot from 'node-telegram-bot-api'
import CommandHandler from 'models/CommandHandler'
import Database from 'models/mongo/Database'

enum GameCommand {
    Any = 'any',
    End = 'end',
    Start = 'start',
    Status = 'status',
}

export const COMMANDS_REGEXP = new Map([
    [GameCommand.Start, new RegExp(/\/start/)],
    [GameCommand.Status, new RegExp(/\/status/)],
    [GameCommand.End, new RegExp(/\/end/)],
    [GameCommand.Any, new RegExp(/.+/)],
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
        const startRegExp = COMMANDS_REGEXP.get(GameCommand.Start)
        const statusRegExp = COMMANDS_REGEXP.get(GameCommand.Status)
        const endRegExp = COMMANDS_REGEXP.get(GameCommand.End)
        const anyRegExp = COMMANDS_REGEXP.get(GameCommand.Any)

        if (startRegExp) {
            bot.onText(startRegExp, CommandHandler.onStart)
        }

        if (statusRegExp) {
            bot.onText(statusRegExp, CommandHandler.onStatus)
        }

        if (endRegExp) {
            bot.onText(endRegExp, CommandHandler.onEnd)
        }

        if (anyRegExp) {
            bot.onText(anyRegExp, CommandHandler.onAny)
        }
    }
}
