import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

export default (sequelize) => {
  const Store = sequelize.define(
    "Store",
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
      ownerEmail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: async (store) => {
          if (store.password) {
            const salt = await bcrypt.genSalt(10);
            store.password = await bcrypt.hash(store.password, salt);
          }
        },
        beforeUpdate: async (store) => {
          if (store.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            store.password = await bcrypt.hash(store.password, salt);
          }
        },
      },
    }
  );

  Store.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  return Store;
};
