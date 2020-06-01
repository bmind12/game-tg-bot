require('dotenv').config()
const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://admin:${process.env.MONGO_ADMIN_PASSWORD}@${process.env.MONGO_DB_NAME}.mongodb.net/test?retryWrites=true&w=majority`

const saveCities = async (id, cities) => {
    const client = await new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).connect()
    const instance = await client.db('test')
    const collection = await instance.createCollection('cities')

    collection.insertOne({
        _id: id,
        cities,
    })

    return null
}

module.exports = (on) => {
    on('task', {
        saveCitiesToMongo({ id, cities }) {
            return saveCities(id, cities)
        },
    })
}
