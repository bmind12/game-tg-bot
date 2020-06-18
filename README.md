# game-tg-bot

This repo is meant to showcase how to set up a Telegram bot connected to a MongoDB and being deployed to Heroku.
It is written in TypeScript and it follows OOP principles. It uses Cypress to scrap the data needed for the game.

To make it work use an `.env-sample` file as a guide on how to get and name global vars on Heroku
or locally inside an `.env` file.

## What does bot do?

The bot is in Russian and it plays a so called "Cities game" with a user.
The game is about calling a city one after another so that city one calls starts with the last letter of the previously
called city. E.g. Player1: Londo**n**; Player2: **N**ew-Yor**k**; Player1: **K**abul, etc.

The original implimentation of the bot might be found running on telegram: `@gorodagamebot_bot`

## How it works
1. It once populates a MongoDB with data scrapped from some wiki with the list of cities.
1. It is connected to a Telegram bot via token provided by `@BotFather`
1. It uses webhooks to respond to a user commands
1. It keeps each user's game session in a database
1. It may `/start`, `/end` and show `/status` of a game
1. It handles wrong input from a user
