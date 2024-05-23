module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('clinic', 'image', {
              type: Sequelize.TEXT,
              allowNull: true,
          }, {
              
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('users', 'image', {
              type: Sequelize.STRING,
              allowNull: true,
          }, {
             
          })
      ])
  }
};