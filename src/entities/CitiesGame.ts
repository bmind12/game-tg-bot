import Game from './Game'
import GameRecord from './GameRecord'

export default class CitiesGame extends Game {
    private gameRecord: GameRecord
    constructor(private id: number) {
        super()

        this.gameRecord = new GameRecord(id)
    }

    async start(): Promise<void> {
        const status = await this.status()

        if (!status) {
            await this.gameRecord.add()
        }

        if (status !== GameStatus.started) {
            await this.gameRecord.update(GameStatus.started)
        }
    }

    async status(): Promise<any> {
        // TODO: check types
        return await this.gameRecord.get()
    }

    end(): void {
        return
    }
}
