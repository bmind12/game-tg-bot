import MongoCollection from './mongo/Collection'

export default class GameRecord {
    private static collection: MongoCollection<GameItem>

    private constructor(private _id: number) {}

    static async build(id: number): Promise<GameRecord> {
        if (!GameRecord.collection) {
            GameRecord.collection = await MongoCollection.init(
                CollectionName.Games
            )
        }

        return new GameRecord(id)
    }

    async add(
        status: GameStatus,
        history: GameHistory
    ): Promise<GameItem | undefined> {
        return await GameRecord.collection.create({
            _id: this._id,
            status,
            history,
        })
    }

    async get(): Promise<GameItem | null | undefined> {
        return await GameRecord.collection.read({ _id: this._id })
    }

    async update(data: {}): Promise<void> {
        await GameRecord.collection.update({ _id: this._id }, { $set: data })
    }

    async delete(): Promise<void> {
        await GameRecord.collection.delete({ _id: this._id })
    }
}
