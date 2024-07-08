import { getConnection } from "../database/connectionMongoDb.js"
import { recipeSchema } from "../schema/recipes.schema.js"
import { ObjectId } from "mongodb";

const dbName = "myDatabase"
const collectionName = "recipes";

export const getRecipientes = async (req, res) => {
    const client = await getConnection();
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const recipes = await collection.find({}).toArray(); 
        res.status(200).json(recipes)
    } catch (error) {
        console.error(error);
        res.status(404).json({message: error.message});
    } finally {
        client.close();
    }
}

export const createRecipe = async (req, res) => {
    const recipe = req.body
    const { error } = recipeSchema.validate(recipe);
    if(error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const client = await getConnection();
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        await collection.insertOne(recipe);
        // res.status(201).json({ _id: result.insertedId });
        res.status(201).json(recipe);
    } catch (error) {
        console.error('Error al conectar a la base de datos o al insertar el documento: ', error );
        res.status(500).json({ error: 'Error interno del servidor'});
    } finally {
        await client.close();
    }
}

export const getRecipeById = async (req, res ) => {
    const id = req.params.recipeId;
    if( !ObjectId.isValid(id)) {
        return res.status(400).json({message: 'ID no válido'});
    }
    const query = { _id: new ObjectId(id) };
    const client = await getConnection();
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.findOne( query );    
        res.status(200).json(result);
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: error.message });
    } finally {
        await client.close();
    }
}

export const updateProductById = async (req, res) => {
    const { recipeId }= req.params
    const { name, ingredientes } = req.body 
    if( !ObjectId.isValid(recipeId)) {
        return res.status(404).json({message: `ID no válido: ${recipeId}` });
    }
    const { error } = recipeSchema.validate({ name, ingredientes });
    if(error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const client = await getConnection();
    const query = { _id: new ObjectId(recipeId) };
    const newValue =  { $set: {name , ingredientes } };   
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);  
        const result = await collection.updateOne( query, newValue );    
        //console.log(result)
        if(result.modifiedCount != 0 ) {
            const recipe = await collection.findOne( query );  
            res.status(200).json( recipe );
        } else {
            res.status(406).json({ message: `No se modifico en la base de datos el Recipe: ${recipeId}`})
        }
    } catch (error) {
        console.error(error)
    } finally {
        await client.close();
    }
}

export const deleteRecipeById = async(req, res )=> {
    const { recipeId }= req.params
    const client = await getConnection();
    const query = { _id: new ObjectId(recipeId) };
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.deleteMany( query);
        if(result.deletedCount == 1) {
            res.json({ message: `Recipe ${recipeId} Deleted succesfully. `})
        }else {
            res.status(404).json({ message: `Recipe ${recipeId} No encontrado en la Base de Datos.`})
        }
    } catch (error) {
        console.error(error)
    } finally {
        await client.close();
    }
}
