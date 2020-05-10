require('dotenv').config()

const TOKEN = process.env.TELEGRAM_TOKEN
// Specify '0' to use ngrok i.e. localhost tunneling
// let url = process.env.URL || "https://<PUBLIC-URL>";
const url = '0'
const port = process.env.PORT || 8080

import * as TelegramBot from 'node-telegram-bot-api'
import * as express from 'express'
import * as ngrok from 'ngrok'

const bot = new TelegramBot(TOKEN, {polling: true})
const app = express()

// Basic configurations
app.set('view engine', 'ejs')

// Tunnel to localhost.
// This is just for demo purposes.
// In your application, you will be using a static URL, probably that
// you paid for. :)
if (url === '0') {
    // ngrok.connect(port, function onConnect(error, u) {
    //     if (error) throw error
    //     url = u
    //     console.log(`Game tunneled at ${url}`)
    // })
    ngrok.connect(+port)
}

// Matches /start
bot.onText(/\/start/, function onPhotoText(msg) {
    console.log('### starting msg', msg)
})

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    bot.answerCallbackQuery(callbackQuery.id, {url})
})

// Bind server to port
app.listen(port, function listen() {
    console.log(`Server is listening at http://localhost:${port}`)
})
