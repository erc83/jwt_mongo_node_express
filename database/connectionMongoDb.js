import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config()

const getConnection = async () => {
    try { 
        const mongoUrl = process.env.URL_MONGO
        return await MongoClient.connect(mongoUrl);
    } catch (error) {
        console.error(error)
    }
}

export {
    getConnection,
}

