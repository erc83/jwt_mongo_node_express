import express from "express";
import { 
    getRecipientes, 
    createRecipe, 
    getRecipeById,
    updateProductById, 
    deleteRecipeById,
} from '../controllers/recipes.controller.js'

import { verifyToken } from "../middlewares/authJwt.js";

const router = express.Router();

router.get('/', getRecipientes);

router.post('/', verifyToken , createRecipe);

router.get('/:recipeId', getRecipeById);

router.put('/:recipeId', verifyToken,  updateProductById)

router.delete('/:recipeId', verifyToken, deleteRecipeById)

export default router;