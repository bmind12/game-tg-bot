import {MongoClient, Collection} from 'mongodb'

const uri = `mongodb+srv://admin:${process.env.MONGO_ADMIN_PASSWORD}@telegram-goroda-game-bot-0slno.mongodb.net/test?retryWrites=true&w=majority`

class Database {
    private static instance: Database
    public collection: Collection

    constructor() {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        client.connect((err) => {
            this.collection = client.db('test').collection('users')

            console.error(err)
        })
    }

    static getInstance(): Database {
        if (Database.instance === undefined) {
            return new Database()
        }

        return this.instance
    }
}

export default Database.getInstance()
