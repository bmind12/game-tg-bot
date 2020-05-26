import * as TelegramBot from 'node-telegram-bot-api'
import { COMMANDS_REGEXP } from './commandHandlers'

const BOT_COMMOND = 'bot_command'

export function isBotCommand(msg: TelegramBot.Message): boolean {
    return msg.entities?.[0]?.type === BOT_COMMOND
}

export const handleBotCommand = (
    id: number,
    text: string,
    bot: TelegramBot
): void => {
    let isValid = false

    for (const [key, regexp] of COMMANDS_REGEXP.entries()) {
        if (key === 'any') continue

        if (regexp.test(text)) {
            isValid = true
            break
        }
    }

    if (!isValid) bot.sendMessage(id, 'я не знаю команду 😞')
}
