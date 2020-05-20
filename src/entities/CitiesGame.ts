import Game from './Game'
import Database from './Database'

interface CitiesGameData {
    id: number
}

enum GameStatus {
    started = 'started',
    notStarted = 'notStarted',
}

export default abstract class CitiesGame extends Game {
    private constructor() {
        super()
    }

    static async start(gameData: CitiesGameData): Promise<void> {
        const record = await CitiesGame.getGame(gameData)

        if (!record) {
            Database.collection.insertOne(
                {_id: gameData.id},
                (error, result) => {
                    // TODO: create a GameRecord Model / class
                    if (error) console.error(error)
                    console.log('inserted:', result)
                }
            )
        }

        if (record.GameStatus !== GameStatus.started) {
            Database.collection.updateOne(
                {
                    _id: gameData.id,
                },
                {
                    $set: {
                        gameStatus: GameStatus.started,
                    },
                },
                (error, result) => {
                    if (error) console.error(error)
                    console.log('updated:', result)
                }
            )
        }

        console.log('### record', record)
    }

    static async status(gameData: CitiesGameData): Promise<any> {
        return await CitiesGame.getGame(gameData)
    }

    static end(): void {
        return
    }

    private static async getGame(gameData: CitiesGameData): Promise<any> {
        return await Database.collection.findOne({
            _id: gameData.id,
        })
    }
}
