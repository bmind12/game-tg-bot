import {
    Collection,
    Db,
    FilterQuery,
    OptionalId,
    UpdateQuery,
    WithId,
} from 'mongodb'

interface Validator {
    $jsonSchema: {}
}

export default class MongoCollection<T> {
    constructor(public collection: Collection<T>) {}

    static async init<T>(
        database: Db,
        name: string,
        validator: Validator
    ): Promise<MongoCollection<T>> {
        const collection = await database.createCollection<T>(name, {
            validator,
        })

        return new MongoCollection(collection)
    }

    async create(data: OptionalId<T>): Promise<WithId<T>> {
        try {
            return (await this.collection.insertOne(data))?.ops?.[0]
        } catch (error) {
            console.error(error)
        }
    }

    async read(filterQuery: FilterQuery<T>): Promise<T> {
        try {
            return this.collection.findOne(filterQuery)
        } catch (error) {
            console.error(error)
        }
    }

    async update(
        filterQuery: FilterQuery<T>,
        updateQuery: UpdateQuery<T> | Partial<T>
    ): Promise<void> {
        try {
            await this.collection.updateOne(filterQuery, updateQuery)
        } catch (error) {
            console.error(error)
        }
    }

    async delete(filterQuery: FilterQuery<T>): Promise<void> {
        try {
            await this.collection.deleteOne(filterQuery)
        } catch (error) {
            console.error(error)
        }
    }
}
