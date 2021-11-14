import { Collection, MongoClient } from 'mongodb';
import { DatabaseLog, convertToDatabaseLog, parseLog } from '../models/log';

let mongoClient: MongoClient;
let collection: Collection<DatabaseLog>;

async function init() {
    if (!process.env.MONGODB_CONNECTION_URL) {
        throw new Error(
            'Environment variable MONGODB_CONNECTION_URL not provided.'
        );
    }
    mongoClient = new MongoClient(process.env.MONGODB_CONNECTION_URL, {
        serverSelectionTimeoutMS: 5000,
    });
    mongoClient.connect();
    const db = mongoClient.db(process.env.mongodbDbName!);

    collection = db.collection(process.env.mongodbCollectionName!);
}

export const addLog = async (log: string) => {
    if (!collection) {
        await init();
    }
    const databaseLog = convertToDatabaseLog(parseLog(log));
    collection.insertOne(databaseLog);
};

export const getLogs = async () => {
    if (!collection) {
        await init();
    }
    return collection.find().toArray();
};
