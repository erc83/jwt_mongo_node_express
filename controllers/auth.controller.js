import { getConnection } from "../database/connectionMongoDb.js"

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY
const dbName = "myDatabase"
const collection_user = "user";
const collection_roles = "roles";

export const register = async (req, res) => {
    const { username, email, password, roles } = req.body;
    const salt = await bcrypt.genSalt(10)
    const newUser = {
        username,
        email,
        password: await bcrypt.hash( password, salt )
    }
    const client = await getConnection();
    const database = client.db(dbName);
    const collectionRole = database.collection(collection_roles);
    
    if(roles){
        const foundRoles = await collectionRole.find({name: {$in: roles}}).toArray();

        if(foundRoles.length === 0) {
            const rol = await collectionRole.findOne({ name: "user" });
            newUser.roles = [rol._id]
            //console.log(newUser, "Se inserto usuario con rol user")
        } else {
            newUser.roles = foundRoles.map(role => role._id)
        }

    } else {
        const rol = await collectionRole.findOne({name: "user"});
        newUser.roles = [rol._id]
    }


    try {

        const collectionUser = database.collection(collection_user);

        const userFound = await collectionUser.findOne({ email: req.body.email });

        if(userFound) return res.status(400).json({ message: "El correo ya tiene una cuenta creada"})

        const registerUser = await collectionUser.insertOne(newUser);
        const _id = registerUser.insertedId.toJSON()
        const token = jwt.sign({id: _id}, SECRET_KEY, {
            expiresIn:600
        })
        res.status(200).json({ token })
    } catch (error) {
        console.error(error)
    } finally{ 
        await client.close() 
    }
}

export const login = async ( req, res ) => {

    const client = await getConnection();
    const database = client.db(dbName);
    const collectionUser = database.collection(collection_user);
    
    const userFound = await collectionUser.findOne({ email: req.body.email });

    if(!userFound) return res.status(400).json({ message: "User not found"})

    const matchPassword = await bcrypt.compare( req.body.password, userFound.password )

    if(!matchPassword) return res.status(401).json({ token: null, message: "Invalid Password"})

    const id = userFound._id.toJSON()
    const token = jwt.sign({ id }, SECRET_KEY, {
        expiresIn: 600
    })

    res.json({ token })
}





