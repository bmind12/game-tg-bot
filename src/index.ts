import 'dotenv/config.js'
import './globals'
import App from 'app'
import TelegramBot from 'node-telegram-bot-api'

const url = process.env.URL
const port = process.env.PORT || 8000
const token = process.env.TELEGRAM_TOKEN
const options = url ? { webHook: { port: +port } } : { polling: true }

if (token) {
    const bot = new TelegramBot(token, options)

    if (options.webHook) bot.setWebHook(`${url}/bot${token}`)

    App.init(bot)
}
