import express from "express"
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

import recipesRoutes from './routes/recipes.routes.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors());

app.get("/", (req, res) => {
    res.send("Blocked")
})

app.use('/recipes', recipesRoutes)

app.get("*", (req, res) => {
    res.send("Page Not Found")
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

