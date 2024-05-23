'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
   
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        doctorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users', 
                key: 'id' 
            },
            onUpdate: 'CASCADE', 
            onDelete: 'CASCADE' 
        },
        customerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Tên của bảng mà customerId tham chiếu
                key: 'id' // Tên của trường khóa chính trong bảng mà customerId tham chiếu
            },
            onUpdate: 'CASCADE', // Tùy chọn cập nhật: CASCADE, RESTRICT, SET NULL, NO ACTION
            onDelete: 'CASCADE' // Tùy chọn xóa: CASCADE, RESTRICT, SET NULL, NO ACTION
        },
        clinicId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'clinic', // Tên của bảng mà clinicId tham chiếu
              key: 'id' // Tên của trường khóa chính trong bảng mà clinicId tham chiếu
            },
            onUpdate: 'CASCADE', // Tùy chọn cập nhật: CASCADE, RESTRICT, SET NULL, NO ACTION
            onDelete: 'CASCADE' // Tùy chọn xóa: CASCADE, RESTRICT, SET NULL, NO ACTION
        },
        bookingDate: {
            type: Sequelize.DATE,
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
    await queryInterface.dropTable('bookings');
}
};


