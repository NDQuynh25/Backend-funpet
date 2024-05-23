'use strict';
/** @type {import('sequelize-cli').MigrationMigration} */
module.exports = {
async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bills', {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        bookingId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'bookings',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        usedServiceId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        totalCost: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        statusBill: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tax: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        discount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        totalPayment: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
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
    await queryInterface.dropTable('bills');
}
};