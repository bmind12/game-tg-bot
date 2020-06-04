require('dotenv').config()
import express from 'express'
import ngrok from 'ngrok'
import './globals'
import initApp from './app'
import Bot from './models/Bot' // TODO: create module links

// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
// Specify '0' to use ngrok i.e. localhost tunneling
const url = process.env.URL || '0'
const port = process.env.PORT || 8080
const token = process.env.TELEGRAM_TOKEN
const app = express()
const options = { webhook: { port } }
const bot = new Bot(token, options)

bot.setWebHook(`${url}/bot${token}`)

// Tunnel to localhost.
// This is just for demo purposes.
// In your application, you will be using a static URL, probably that
// you paid for. :)
if (url === '0') {
    ngrok.connect(+port)

    app.listen(port, (): void => {
        console.log(`Express server is listening on ${port}`)
    })
}

// Start Express Server

initApp(bot)
