import {Collection} from 'mongodb'
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
        },
    },
}

class GameRecord {
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

    async get(): Promise<any> {
        // TODO: check what it returs
        try {
            return await GameRecord.collection.findOne({_id: this.id})
        } catch (error) {
            console.error(error)
        }
    }

    async add(): Promise<any> {
        // TODO: check what it returs
        try {
            await GameRecord.collection.insertOne({_id: this.id})
        } catch (error) {
            console.error(error)
        }
    }

    async update(status: string): Promise<any> {
        // TODO: check what it returs
        try {
            await GameRecord.collection.updateOne(
                {_id: this.id},
                {$set: {status}},
                (error, result) => {
                    if (error) console.error(error)
                    console.log('updated:', result)
                }
            )
        } catch (error) {
            console.error(error)
        }
    }
}

export default GameRecord
