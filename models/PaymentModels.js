const { DataTypes } = require("sequelize");
const { db } = require("../config/dbConnection");
const Order = require("./OrderModels");

const Payment = db.define(
  "payment",
  {
    id_payment: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true,
      },
    },
    status: DataTypes.STRING,
    buktiPembayaran: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Order.hasMany(Payment);
Payment.belongsTo(Order, { foreignKey: "id_order" });

module.exports = Payment;
