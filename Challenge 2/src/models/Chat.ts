import { DataTypes, Model } from "sequelize";
import sequelize from "../db/dbConfig";
import ChatMessages from "./ChatMessages";

class Chat extends Model {
    public id!: number;
}

Chat.init({ 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize,
    modelName: "Chat"
});

Chat.hasMany(ChatMessages, {foreignKey: "chatId"});
ChatMessages.belongsTo(Chat, {foreignKey: "chatId"});

export default Chat;