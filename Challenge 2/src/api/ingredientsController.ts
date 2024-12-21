import { type Express } from "express";
import Ingredient from "../models/Ingredient";

export default function Ingredients(app: Express) {
    app.get("/api/ingredients", async (_, res) => {
        try{
            const ingredients = await Ingredient.findAll();
            if(!ingredients || !ingredients.length){
                res.status(404).send({message: "No ingredients found"});
            }
            else{
                res.status(200).send(ingredients);
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.get("/api/ingredients/:id", async (req, res) => {
        try{
            const ingredient = await Ingredient.findByPk(req.params.id);
            if(ingredient){
                res.status(200).send(ingredient);
            }else{
                res.status(404).send({message: "Ingredient not found"});
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.post("/api/ingredients", async (req, res) => {
        try{
            console.log(req.body);
            const ingredient = await Ingredient.create(req.body);
            res.status(201).send(ingredient);
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.put("/api/ingredients/:id", async (req, res) => {
        try{
            const ingredient = await Ingredient.findByPk(req.params.id);
            if(ingredient){
                await ingredient.update(req.body);
                res.status(200).send(ingredient);
            }else{
                res.status(404).send({message: "Ingredient not found"});
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.delete("/api/ingredients/:id", async (req, res) => {
        try{
            const ingredient = await Ingredient.findByPk(req.params.id);
            if(ingredient){
                await ingredient.destroy();
                res.status(204).send();
            }else{
                res.status(404).send({message: "Ingredient not found"});
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });
}