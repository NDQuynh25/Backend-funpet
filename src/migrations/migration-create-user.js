'use strict';
/** @type {import('sequelize-cli').MigrationMigration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
    //   id: DataTypes.INTEGER,
    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // fullName: DataTypes.STRING,
    // address: DataTypes.STRING,
    // phoneNumber: DataTypes.STRING,
    // gender: DataTypes.STRING,
    // roleId: DataTypes.STRING
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      roleId: {
        type: Sequelize.STRING
      },
      positionId: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.LONGBLOB
      },
      description: {
        type: Sequelize.TEXT
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};