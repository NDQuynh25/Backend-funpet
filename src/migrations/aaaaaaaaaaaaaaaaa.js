module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('users', 'image', {
                type: Sequelize.BLOB,
                allowNull: true,
            }, {
                
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('your table name ', 'name', {
                type: Sequelize.STRING,
                allowNull: true,
            }, {
               
            })
        ])
    }
};