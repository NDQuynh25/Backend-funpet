module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('clinic', 'license', {
                type: Sequelize.TEXT,
                allowNull: true,
            }, {
                
            })
        ])
    },
  
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('clinic', 'license', {
                type: Sequelize.STRING,
                allowNull: true,
            }, {
               
            })
        ])
    }
  };