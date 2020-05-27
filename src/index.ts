require('dotenv').config()
import express from 'express'
import ngrok from 'ngrok'
import './globals'
import './app'

// Specify '0' to use ngrok i.e. localhost tunneling
const url = process.env.URL || '0'
const port = process.env.PORT || 8080
const app = express()

// Tunnel to localhost.
// This is just for demo purposes.
// In your application, you will be using a static URL, probably that
// you paid for. :)
if (url === '0') ngrok.connect(+port)

app.listen(port, function listen() {
    console.log(`Server is listening at http://localhost:${port}`)
})
