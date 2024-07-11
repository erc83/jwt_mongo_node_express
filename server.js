import express from "express"
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

import recipesRoutes from './routes/recipes.routes.js'
import authRoutes from './routes/auth.routes.js'


import { createRoles } from './libs/initialSetup.js'

const app = express();
const PORT = process.env.PORT || 5000;

createRoles();

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors());

app.get("/", (req, res) => {
    res.send("Blocked")
})

app.use('/recipes', recipesRoutes)
app.use('/auth', authRoutes)

app.get("*", (req, res) => {
    res.send("Page Not Found")
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

