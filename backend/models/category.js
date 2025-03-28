

import { DataTypes } from "sequelize";
import Store from "./store.js";


export default (sequelize) => {
    
    const Category = sequelize.define(
        'Category',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            storeId: {
                type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                      model: Store, 
                      key: 'id', 
                    },
                    onDelete: 'CASCADE', 
                    onUpdate: 'CASCADE', 
            },
        },
        {
            timestamps: true,
        }
    )
    
    return Category
}