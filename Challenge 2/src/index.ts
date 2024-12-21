import express from "express";
import Ingredients from "./api/ingredientsController";
import sequelize from "./db/dbConfig";
import Recipes from "./api/recipeController";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = 5678;

async function main(){

    await sequelize.sync({force: true});

    Ingredients(app);
    Recipes(app);

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
}

main();