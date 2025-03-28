

import Store from "./store.js";
import Product from "./product.js";

export default (sequelize, DataTypes) => {
  
  const InventoryLog = sequelize.define(
    "InventoryLog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Product, // Use models object
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      storeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Store, // Use models object
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      changeType: {
        type: DataTypes.STRING, // Using string instead of ENUM
        allowNull: false
      },
      
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      previousStock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      newStock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return InventoryLog;
};
