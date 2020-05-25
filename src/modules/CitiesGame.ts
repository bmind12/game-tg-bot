import Game from './Game'
import GameRecord from './GameRecord'

export default class CitiesGame extends Game {
    private gameRecord: GameRecord

    constructor(id: number) {
        super()

        this.gameRecord = new GameRecord(id)
    }
    async start(): Promise<void> {
        const gameItem = await this.gameRecord.get()

        if (!gameItem) {
            await this.create(GameStatus.started)
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
                await this.create(GameStatus.started)

                return GameStatus.started
            }
        } catch (error) {
            console.error(error)
        }
    }

    async end(): Promise<void> {
        const gameItem = await this.get()

        if (!gameItem) {
            this.create(GameStatus.notStarted)
        } else {
            await this.update(GameStatus.notStarted)
        }
    }

    async create(status: GameStatus): Promise<void> {
        await this.gameRecord.add(status)
    }

    async get(): Promise<GameItem> {
        return await this.gameRecord.get()
    }

    async update(status: GameStatus): Promise<void> {
        await this.gameRecord.update(status)
    }
}
