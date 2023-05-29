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
    bukti_pembayaran: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Order.hasMany(Payment);
Payment.belongsTo(Order, { foreignKey: "order_id" });

module.exports = Payment;
