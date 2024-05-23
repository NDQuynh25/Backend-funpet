
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // Quan hệ với bảng Customer
            Booking.belongsTo(models.User, { foreignKey: 'customerId' });

            // Quan hệ với bảng Clinic
            Booking.belongsTo(models.Clinic, { foreignKey: 'clinicId' });
        }
    }
    // finished
    Booking.init({
        status: DataTypes.STRING,
        customerId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        bookingDate: DataTypes.DATE,
        description: DataTypes.TEXT,
    
    }, {
      sequelize,
      modelName: 'Booking',
    });
    return Booking;
};