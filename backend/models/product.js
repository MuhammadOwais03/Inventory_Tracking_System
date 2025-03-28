

import { DataTypes } from "sequelize";
import Store from "./store.js";
import Category from "./category.js";


export default (sequelize) => {
    const Product = sequelize.define(
        'Product',
        {
            id : {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            storeId : {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Store,
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Category,
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    )
    return Product;
}



