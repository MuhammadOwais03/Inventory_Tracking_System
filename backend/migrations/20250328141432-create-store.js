'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Stores', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID, // ✅ Fix: Use UUID instead of SERIAL
      defaultValue: Sequelize.UUIDV4, // ✅ Automatically generate UUID
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ownerEmail: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // ✅ Ensuring unique emails
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // ✅ Auto-set timestamps
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Stores');
}
