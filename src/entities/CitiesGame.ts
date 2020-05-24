import Game from './Game'
import GameRecord from './GameRecord'

export default class CitiesGame extends Game {
    private gameRecord: GameRecord

    constructor(id: number) {
        super()

        this.gameRecord = new GameRecord(id)
    }
    async start(): Promise<void> {
        const gameRecord = await this.status()

        if (!gameRecord) {
            await this.gameRecord.add(GameStatus.started)
        } else if (gameRecord?.status !== GameStatus.started) {
            await this.gameRecord.update(GameStatus.started)
        }
    }

    async status(): Promise<GameItem> {
        return await this.gameRecord.get()
    }

    end(): void {
        return
    }
}
