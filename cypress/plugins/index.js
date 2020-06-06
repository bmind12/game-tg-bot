require('dotenv').config()
const { MongoClient } = require('mongodb')

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds257668.mlab.com:57668/${process.env.MONGO_USER}`

const saveCities = async (id, cities) => {
    const client = await new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).connect()
    const instance = await client.db(process.env.MONGO_USER)
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
