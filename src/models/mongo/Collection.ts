import {
    Collection,
    Cursor,
    FilterQuery,
    OptionalId,
    UpdateQuery,
    WithId,
} from 'mongodb'
import Database from './Database'
import Validators from './Validators'

export default class MongoCollection<T> {
    private constructor(public collection: Collection<T>) {}

    static async init<T>(name: CollectionName): Promise<MongoCollection<T>> {
        await Database.init()

        const collection = await Database.instance.createCollection<T>(name, {
            validator: Validators.get(CollectionName[name]),
        })

        return new MongoCollection<T>(collection)
    }

    async create(data: OptionalId<T>): Promise<WithId<T> | undefined> {
        try {
            return (await this.collection.insertOne(data))?.ops?.[0]
        } catch (error) {
            console.error(error)
        }
    }

    async read(filterQuery: FilterQuery<T>): Promise<T | null | undefined> {
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

    async find(filterQuery: FilterQuery<T>): Promise<Cursor<T> | undefined> {
        try {
            return await this.collection.find(filterQuery)
        } catch (error) {
            console.error(error)
        }
    }
}
