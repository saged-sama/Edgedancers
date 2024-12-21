import { DataTypes, Model } from "sequelize";
import sequelize from "../db/dbConfig";

class Recipe extends Model {
    public id!: number;
    public name!: string;
    public recipe!: string;
    public favorite!: boolean;
    public filepath!: string;
    public text!: string;
}

Recipe.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipe: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    filepath: {
        type: DataTypes.STRING,
        allowNull: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Recipe"
});

export default Recipe;