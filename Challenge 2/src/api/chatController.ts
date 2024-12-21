import Chat from "../models/Chat";
import { type Express } from "express";
import ChatMessages from "../models/ChatMessages";
import { getChatSession } from "../service/geminiService";

export default function Chats(app: Express) {
    app.get("/api/chat", async (_, res) => {
        try{
            const chat = await Chat.findAll();
            if(!chat || !chat.length){
                res.status(404).send({message: "No chat found"});
            }
            else{
                res.status(200).send(chat);
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.get("/api/chat/:id", async (req, res) => {
        try{
            const chat = await Chat.findByPk(req.params.id);
            const chatMessages = await ChatMessages.findAll({where: {chatId: req.params.id}});
            if(chat){
                res.status(200).send({chat, chatMessages});
            }else{
                res.status(404).send({message: "Chat not found"});
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.post("/api/chat", async (req, res) => {
        try{
            const chat = await Chat.create(req.body);
            res.status(201).send(chat);
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.put("/api/chat/:id/message", async (req, res) => {
        try{
            const chat = await Chat.findByPk(req.params.id);
            if(!chat){
                res.status(404).send({message: "Chat not found"});
                return;
            }
            const message = req.query.message;
            if(message){
                const reply = (await getChatSession()).sendMessage(message as string);
                await ChatMessages.create({chatId: req.params.id, message, reply});
                res.status(201).send({message: "Message added"});
            }else{
                res.status(404).send({message: "Chat not found"});
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });

    app.delete("/api/chat/:id", async (req, res) => {
        try{
            const chat = await Chat.findByPk(req.params.id);
            if(chat){
                await chat.destroy();
                res.status(204).send();
            }else{
                res.status(404).send({message: "Chat not found"});
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        }
    });
}