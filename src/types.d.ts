import TelegramBot = require('node-telegram-bot-api')

declare global {
    type commandHandler = (msg: TelegramBot.Message) => void
}