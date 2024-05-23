// migrations/<timestamp>-remove_column_from_table.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('bookings', 'doctorId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'fullName', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
