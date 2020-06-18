import { Message } from 'node-telegram-bot-api'
import { COMMANDS_REGEXP } from 'app'

const BOT_COMMAND = 'bot_command'

export function isBotCommand(msg: Message): boolean {
    return msg.entities?.[0]?.type === BOT_COMMAND
}

export const getBotCommandReply = (command: string): string | void => {
    let isValid = false

    for (const [key, regexp] of COMMANDS_REGEXP.entries()) {
        if (key === 'any') continue

        if (regexp.test(command)) {
            isValid = true
            break
        }
    }

    if (!isValid) return BotReply.DontKnowCommand
}

export const getLastCityFromHistory = (history: GameHistory): string => {
    return history[history.length - 1][1]
}
