export default class Validators {
    private static validators: { [key in CollectionName]: Mongo.Validator } = {
        [CollectionName.Cities]: { $jsonSchema: {} },
        [CollectionName.Games]: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['_id', 'status', 'history'],
                properties: {
                    _id: {
                        bsonType: 'number',
                        description: 'must be a string and is required',
                    },
                    status: {
                        enum: Object.values(GameStatus),
                        description: 'must be a string and is required',
                    },
                    cities: {
                        bsonType: 'object',
                    },
                    history: {
                        bsonType: 'array',
                    },
                },
            },
        },
    }

    static get(name: CollectionName): Mongo.Validator {
        return Validators.validators[name]
    }
}
