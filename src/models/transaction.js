"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction.belongsTo(models.user, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  transaction.init(
    {
      startDate: DataTypes.STRING,
      dueDate: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      attache: DataTypes.STRING,
      status: DataTypes.STRING,
      statusPay: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
