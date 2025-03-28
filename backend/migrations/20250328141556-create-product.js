'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID, // ✅ Fix: Use UUID instead of SERIAL
      defaultValue: Sequelize.UUIDV4, // ✅ Automatically generate UUID
    },
    
    name: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.FLOAT
    },
    storeId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Stores', // ✅ Correct foreign key reference
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    categoryId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Categories', // ✅ Correct foreign key reference
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Products');
}