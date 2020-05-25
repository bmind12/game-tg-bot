import type { Message } from 'node-telegram-bot-api'

const BOT_COMMOND = 'bot_command'

export function isBotCommand(msg: Message): boolean {
    return msg.entities?.[0]?.type === BOT_COMMOND
}
