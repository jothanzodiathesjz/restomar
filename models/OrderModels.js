const { DataTypes } = require("sequelize");
const { db } = require("../config/dbConnection");
const Table = require("./TableModels");
const Users = require("./UsersModel");

const Order = db.define(
  "order",
  {
    id_order: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true,
      },
    },
    total_bayar: DataTypes.INTEGER,
    tanggal_reservasi: DataTypes.DATE,
    status_reservasi: DataTypes.ENUM("Pending", "Proses", "Selesai"),
  },
  {
    freezeTableName: true,
  }
);
Table.hasMany(Order);
Order.belongsTo(Table, { foreignKey: "table_id" });
Users.hasMany(Order);
Order.belongsTo(Users, { foreignKey: "id_user" });

module.exports = Order;
