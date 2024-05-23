// migrations/<timestamp>-remove_column_from_table.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'gender');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'gender', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
