require('dotenv').config()
import ngrok from 'ngrok'
import './globals'
import App from './app'
import TelegramBot from 'node-telegram-bot-api'
// TODO: create module links

const url = process.env.URL || '0'
const port = process.env.PORT || 8000
const token = process.env.TELEGRAM_TOKEN
const options = url === '0' ? { polling: true } : { webHook: { port: +port } }
const bot = new TelegramBot(token, options)

if (options.webHook) bot.setWebHook(`${url}/bot${token}`)

if (url === '0') ngrok.connect(+port)

App.init(bot)
