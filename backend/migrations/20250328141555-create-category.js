'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Categories', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID, // ✅ Fix: Use UUID instead of SERIAL
      defaultValue: Sequelize.UUIDV4, // ✅ Automatically generate UUID
    },
    
    name: {
      type: Sequelize.STRING
    },
    storeId: {
      type: Sequelize.UUID
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
  await queryInterface.dropTable('Categories');
}