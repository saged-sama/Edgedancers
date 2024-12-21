import { type Express } from "express";
import Recipe from "../models/Recipe";
import multer from "multer";
import { getRecipeInfoFromImage, getRecipeInfoFromText } from "../service/geminiService";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

const uploadDir = path.join(__dirname, "./uploads");
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (_, __, cb) {
        cb(null, uploadDir);
    },
    filename: function (_, file, cb) {
        cb(null, randomUUID() + file.originalname);
    }
});

const upload = multer({storage: storage});

export default function Recipes(app: Express) {
    app.get("/api/recipes", async (_, res) => {
        try{
            const recipes = await Recipe.findAll();
            if(!recipes || !recipes.length){
                res.status(404).send({message: "No recipes found"});
            }
            else{
                res.status(200).send(recipes);
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.get("/api/recipes/my_fav_recipes", async (_, res) => {
        try{
            const file = fs.readFileSync(`./my_fav_recipes.txt`);
            if(file){
                res.status(200).send(file);
            }
            else{
                res.status(404).send({message: "No recipes found"});
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.get("/api/recipes/:id", async (req, res) => {
        try{
            const recipe = await Recipe.findByPk(req.params.id);
            if(recipe){
                res.status(200).send(recipe);
            }else{
                res.status(404).send({message: "Recipe not found"});
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.post("/api/recipes", upload.single('file'), async (req, res) => {
        try{
            if(req.file){
                console.log("recipe");
                const recipe = await getRecipeInfoFromImage(req.file);
                console.log(recipe);
                req.body.recipe = recipe;
                req.body.filepath = req.file.path;
            }
            else if(req.body.text){
                const recipe = await getRecipeInfoFromText(req.body.text);
                console.log(recipe);
                req.body.recipe = recipe;
            }
            else{
                res.status(400).send({message: "Please provide an image or text"});
                return;
            }
            const recipe = await Recipe.create(req.body);
            writeRecipeToFile(recipe);
            res.status(201).send(recipe);
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.put("/api/recipes/:id", async (req, res) => {
        try{
            const recipe = await Recipe.findByPk(req.params.id);
            if(recipe){
                await recipe.update(req.body);
                res.status(200).send(recipe);
            }else{
                res.status(404).send({message: "Recipe not found"});
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.delete("/api/recipes/:id", async (req, res) => {
        try{
            const recipe = await Recipe.findByPk(req.params.id);
            if(recipe){
                await recipe.destroy();
                res.status(204).send();
            }else{
                res.status(404).send({message: "Recipe not found"});
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });
}

function writeRecipeToFile(recipe: Recipe){
    fs.appendFileSync("./my_fav_recipes.txt", JSON.stringify(recipe, null, 4) + "\n");
}