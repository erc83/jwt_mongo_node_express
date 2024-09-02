import { getConnection } from "../database/connectionMongoDb.js"
import { ObjectId } from "mongodb";

import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY
const dbName = "myDatabase"
const collection_user = "user";
const collection_roles = "roles";

export const verifyToken = async(req, res, next) => {

    try {

        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({ message: "No token provided"})
    
        const decoded = jwt.verify(token, SECRET_KEY)
    
        req.userId = decoded.id
        const id = new ObjectId( `${req.userId}` )
    
        const client = await getConnection();
        const database = client.db(dbName);
        const collectionUser = database.collection(collection_user);

        const user = await collectionUser.findOne({_id: id});
        console.log(user)

        if(!user ) return res.status(404).json({ message: 'no user found'})
        next()

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized"})
    }
}
