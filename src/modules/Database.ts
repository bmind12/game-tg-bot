import { MongoClient, Db } from 'mongodb'

const uri = `mongodb+srv://admin:${process.env.MONGO_ADMIN_PASSWORD}@${process.env.MONGO_DB_NAME}.mongodb.net/test?retryWrites=true&w=majority`

export default class Database {
    public static instance: Db

    constructor(public db: Db) {}

    static async init(): Promise<void> {
        const client = await new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).connect()
        this.instance = await client.db('test')
    }
}
