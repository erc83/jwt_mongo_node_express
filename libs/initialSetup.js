import { getConnection } from '../database/connectionMongoDb.js'

const dbName = "myDatabase"
const collection_role = "roles";

export const createRoles = async () => {
    const client = await getConnection(); 

    try {
        const database = client.db(dbName);
        const collection = database.collection(collection_role);
        const count = await collection.find({}).toArray();
        // console.log(count)
        if( count.length > 0 ) return;

        const values = await Promise.all([
            await collection.insertOne({name:'user'}),
            await collection.insertOne({name:'moderador'}),
            await collection.insertOne({name:'admin'}),
        ])

        console.log(values)
    } catch (error) {
        console.error(error)
    } finally {
        await client.close()
    }
}