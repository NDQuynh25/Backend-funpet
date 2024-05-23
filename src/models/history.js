'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        History.belongsTo(models.Booking, { foreignKey: 'bookingId' });
        History.belongsTo(models.User, { foreignKey: 'doctorId' });

    }
  }
  History.init({
      doctorId: DataTypes.INTEGER,
      bookingId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      file: DataTypes.TEXT

  }, {
    freezeTableName: true,
    sequelize,
    sequelize,
    modelName: 'History',
  });
  return History;
};