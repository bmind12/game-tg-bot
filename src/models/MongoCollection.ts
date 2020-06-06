import { Collection, Db } from 'mongodb'

interface Validator {
    $jsonSchema: {}
}

export default class MongoCollection<T> {
    constructor(public collection: Collection) {}

    static async init<T>(
        database: Db,
        name: string,
        validator: Validator
    ): Promise<MongoCollection<T>> {
        const collection = await database.createCollection(name, {
            validator,
        })

        return new MongoCollection(collection)
    }

    async create(id: string, data: {}): Promise<T> {
        try {
            return (
                await this.collection.insertOne({
                    _id: id,
                    ...data,
                })
            )?.ops?.[0] as T
        } catch (error) {
            console.error(error)
        }
    }

    async read(id: string): Promise<T> {
        try {
            return (await this.collection.findOne({
                _id: id,
            })) as T
        } catch (error) {
            console.error(error)
        }
    }

    async update(id: string, data: {}): Promise<void> {
        try {
            await this.collection.updateOne({ _id: id }, { $set: data })
        } catch (error) {
            console.error(error)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.collection.deleteOne({ _id: id })
        } catch (error) {
            console.error(error)
        }
    }
}
