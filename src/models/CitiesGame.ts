import Game from './Game'
import GameRecord from './GameRecord'

const CITIES_MOCK: Cities = {
    a: ['aloha', 'ambient'],
    b: ['book', 'back', 'bright'],
    c: ['call', 'cell', 'city'],
}

export default class CitiesGame extends Game {
    private gameRecord: GameRecord
    private history: GameHistory = []

    constructor(id: number) {
        super()

        this.gameRecord = new GameRecord(id)
    }

    async start(): Promise<string> {
        const gameItem = await this.get()
        const botMove = this.handleBotMove(gameItem?.cities)

        return botMove || 'Я проиграл 😭'
    }

    async status(): Promise<GameStatus> {
        try {
            return (await this.get())?.status
        } catch (error) {
            console.error(error)
        }
    }

    async end(): Promise<void> {
        await this.gameRecord.delete()
    }

    private async get(): Promise<GameItem> {
        let record = await this.gameRecord.get()

        if (!record) {
            record = await this.gameRecord.add(
                GameStatus.started,
                this.history,
                CITIES_MOCK
            )
        }

        this.history = record.history

        return record
    }

    private async update(data: Partial<GameItem>): Promise<void> {
        await this.gameRecord.update(data)
    }

    private updateHistory(player: Player, city: string): void {
        this.history.push([player, city])
    }

    private handleBotMove(cities, lastLetter = 'a'): string | void {
        // TODO: implement random pick
        const city = cities?.[lastLetter].pop()

        if (!city) return this.handleBotLost()

        this.updateHistory(Player.Bot, city)

        this.update({
            cities,
            history: this.history,
        })

        return city
    }

    private handleBotLost(): void {
        this.update({ status: GameStatus.notStarted })
    }
}
