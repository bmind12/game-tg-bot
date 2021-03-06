import MongoCollection from 'models/mongo/Collection'

export default class CitiesCollection {
    private static collection: MongoCollection<CitiesItem>

    private static async init(): Promise<void> {
        CitiesCollection.collection = await MongoCollection.init(
            CollectionName.Cities
        )
    }

    private static serilazeRecords(records: CitiesItem[]): Cities {
        return records.reduce((cities, letterRecord) => {
            cities[letterRecord._id] = letterRecord.cities

            return cities
        }, {} as Cities)
    }

    static async get(): Promise<Cities | undefined> {
        if (!CitiesCollection.collection) {
            await CitiesCollection.init()
        }

        const cursor = await CitiesCollection.collection.find({})
        const records = await cursor?.toArray()

        if (!records) return

        return CitiesCollection.serilazeRecords(records)
    }
}
