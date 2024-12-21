import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import Ingredient from "../models/Ingredient";
import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API;
console.log("Api Key: ", apiKey);
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

function fileToGenerativeParts(path: string, mimeType: string){
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        }
    }
}

export async function getChatSession() {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const currentRecipes = fs.readFileSync("./my_fav_recipes.txt");

    let prompt = "This is the current information about recipes. You have to reply to the user's query based on this info. Here's the information (Ignore if not available):\n\n";
    const reply = chatSession.sendMessage(prompt + currentRecipes || "");

    prompt = "User: ";

    return {
        sendMessage: async (message: string) => {
            const response = await chatSession.sendMessage(prompt + message + "\n Answer: ");
            return response;
        }
    }
}

export async function getRecipeInfoFromImage(image: Express.Multer.File) {
    const filepart = fileToGenerativeParts(image.path, image.mimetype);

    const availableIngredients = await Ingredient.findAll({
        where: {
            quantity: {
                [Sequelize.Op.gt]: 0
            }
        }
    })

    let prompt = "Based on the available ingredients and the image of the food Item, generate the recipe information.\n\n";
    return (await model.generateContent([prompt + JSON.stringify(availableIngredients), filepart])).response.text();
}

export async function getRecipeInfoFromText(text: string) {
    let prompt = "Based on the available ingredients and the text, generate the recipe information. If info not given on the availability, just tell the general ingredients.\n\n";

    const availableIngredients = await Ingredient.findAll({
        where: {
            quantity: {
                [Sequelize.Op.gt]: 0
            }
        }
    })

    return (await model.generateContent(prompt + JSON.stringify(availableIngredients) + "\n\n\n" + text)).response.text();
}