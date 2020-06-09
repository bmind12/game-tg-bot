import { Db, MongoClient } from 'mongodb'

const URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds257668.mlab.com:57668/${process.env.MONGO_USER}`

export default class MongoDatabase {
    static instance: Db

    static async init(): Promise<void> {
        if (MongoDatabase.instance) return

        const client = await new MongoClient(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).connect()

        MongoDatabase.instance = await client.db(process.env.MONGO_USER)
    }
}
