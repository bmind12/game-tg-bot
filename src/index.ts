require('dotenv').config()
import ngrok from 'ngrok'
import './globals'
import initApp from './app'
import Bot from './models/Bot' // TODO: create module links

// Heroku routes from port :443 to $PORT
const url = process.env.URL || '0'
const port = process.env.PORT || 8000
const token = process.env.TELEGRAM_TOKEN
const options = url === '0' ? { polling: true } : { webHook: { port: +port } }
const bot = new Bot(token, options)

if (options.webHook) bot.setWebHook(`${url}/bot${token}`)

if (url === '0') ngrok.connect(+port)

initApp(bot)
