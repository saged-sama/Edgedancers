import { DataTypes, Model } from "sequelize";
import sequelize from "../db/dbConfig";

class Ingredient extends Model {
    public id!: number;
    public name!: string;
    public quantity!: number;
    public unit!: string;
}

Ingredient.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Ingredient'
});

export default Ingredient;