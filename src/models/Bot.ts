import TelegramBot from 'node-telegram-bot-api'

export default class Bot extends TelegramBot {
    constructor(token, options) {
        super(token, options)
    }
}
