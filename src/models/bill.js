'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
            Bill.belongsTo(models.Booking, { foreignKey: 'bookingId' });
        }
    }
    Bill.init({
        bookingId: DataTypes.INTEGER,
        usedServiceId: DataTypes.INTEGER,
        totalCost: DataTypes.FLOAT,
        statusBill: DataTypes.STRING,
        tax: DataTypes.FLOAT,
        discount: DataTypes.FLOAT,
        totalPayment: DataTypes.FLOAT,
        description: DataTypes.TEXT,
    
    }, {
        sequelize,
        modelName: 'Bill',
    });
    return Bill;
};