import Joi from 'joi';

export const recipeSchema = Joi.object({
    name: Joi.string().trim().required(),
    ingredientes: Joi.array().items(Joi.string().trim().required()).min(1).required()
})



