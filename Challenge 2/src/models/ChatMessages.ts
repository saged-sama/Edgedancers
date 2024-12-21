import { DataTypes, Model } from "sequelize";
import sequelize from "../db/dbConfig";
import Chat from "./Chat";

class ChatMessages extends Model {
    public id!: number;
    public chatId!: number;
    public message!: string;
    public reply!: string;
}

ChatMessages.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reply: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "ChatMessages"
});

ChatMessages.belongsTo(Chat, {foreignKey: "chatId"});
Chat.hasMany(ChatMessages, {foreignKey: "chatId"});

export default ChatMessages;