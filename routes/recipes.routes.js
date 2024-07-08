import express from "express";
import { 
    getRecipientes, 
    createRecipe, 
    getRecipeById,
    updateProductById, 
    deleteRecipeById,
} from '../controllers/recipes.controller.js'

const router = express.Router();

router.get('/', getRecipientes);

router.post('/', createRecipe);

router.get('/:recipeId', getRecipeById);

router.put('/:recipeId', updateProductById)

router.delete('/:recipeId', deleteRecipeById)

export default router;