import { Collection } from 'mongodb'
import Database from './Database'

export default class CitiesRecord {
    public static collection: Collection

    static async init(): Promise<void> {
        this.collection = await Database.instance.collection('cities')
    }

    async get(): Promise<Cities> {
        try {
            const records = await CitiesRecord.collection.find({}).toArray()

            console.log()
            return this.serilazeRecords(records)
        } catch (error) {
            console.error(error)
        }
    }

    private serilazeRecords(records): Cities {
        return records.reduce((cities, letterRecord) => {
            cities[letterRecord._id] = letterRecord.cities

            return cities
        }, {})
    }
}
