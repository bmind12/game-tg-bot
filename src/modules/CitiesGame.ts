import Game from './Game'
import GameRecord from './GameRecord'

const CITIES_MOCK: Cities = {
    a: ['aloha', 'ambient'],
    b: ['book', 'back', 'bright'],
    c: ['call', 'cell', 'city'],
}

export default class CitiesGame extends Game {
    private gameRecord: GameRecord

    constructor(id: number) {
        super()

        this.gameRecord = new GameRecord(id)
    }
    async start(): Promise<void> {
        const gameItem = await this.gameRecord.get()

        if (!gameItem) {
            await this.create(GameStatus.started, CITIES_MOCK)
        } else if (gameItem?.status !== GameStatus.started) {
            await this.update(GameStatus.started)
        }
    }

    async status(): Promise<GameStatus> {
        try {
            const status = (await this.get())?.status

            if (status) {
                return status
            } else {
                await this.create(GameStatus.started, CITIES_MOCK)

                return GameStatus.started
            }
        } catch (error) {
            console.error(error)
        }
    }

    async end(): Promise<void> {
        await this.delete()
    }

    private async create(status: GameStatus, cities?: Cities): Promise<void> {
        await this.gameRecord.add(status, cities)
    }

    private async get(): Promise<GameItem> {
        return await this.gameRecord.get()
    }

    private async update(status: GameStatus): Promise<void> {
        await this.gameRecord.update(status)
    }

    private async delete(): Promise<void> {
        await this.gameRecord.delete()
    }
}
