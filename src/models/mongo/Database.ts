import { MongoClient, Db } from 'mongodb'

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds257668.mlab.com:57668/${process.env.MONGO_USER}`

export default class Database {
    public static instance: Db

    constructor(public db: Db) {}

    static async init(): Promise<void> {
        const client = await new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).connect()
        this.instance = await client.db(process.env.MONGO_USER)
    }
}
