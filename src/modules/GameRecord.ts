import { Collection } from 'mongodb'
import Database from './Database'

const GAME_RECORD_VALIDATOR = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['_id', 'status'],
        properties: {
            _id: {
                bsonType: 'number',
                description: 'must be a string and is required',
            },
            status: {
                enum: Object.values(GameStatus),
                description: 'must be a string and is required',
            },
            cities: {
                bsonType: 'object',
            },
        },
    },
}

class GameRecord {
    // TODO: add another abstraction to communicate with Mongo
    public static collection: Collection

    constructor(private id: number) {}

    static async init(): Promise<void> {
        this.collection = await Database.instance.createCollection(
            'game-record',
            {
                validator: GAME_RECORD_VALIDATOR,
            }
        )
    }

    async get(): Promise<GameItem> {
        try {
            const record = (await GameRecord.collection.findOne({
                _id: this.id,
            })) as GameItem
            record

            return record
        } catch (error) {
            console.error(error)
        }
    }

    async add(status: GameStatus, cities?: Cities): Promise<void> {
        try {
            await GameRecord.collection.insertOne({
                _id: this.id,
                status,
                cities,
            })
        } catch (error) {
            console.error(error)
        }
    }

    async update(status: string): Promise<void> {
        try {
            await GameRecord.collection.updateOne(
                { _id: this.id },
                { $set: { status } },
                (error) => {
                    if (error) console.error(error)
                }
            )
        } catch (error) {
            console.error(error)
        }
    }

    async delete(): Promise<void> {
        try {
            await GameRecord.collection.deleteOne({ _id: this.id })
        } catch (error) {
            console.error(error)
        }
    }
}

export default GameRecord
