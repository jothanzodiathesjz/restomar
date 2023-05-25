const { DataTypes } = require("sequelize");
const { db } = require("../config/dbConnection");
const Menu = require("./MenuModels");
const Table = require("./TableModels");

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
    totalBayar: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

Menu.hasMany(Order);
Order.belongsTo(Menu, { foreignKey: "id_menu" });
Table.hasMany(Order);
Order.belongsTo(Table, { foreignKey: "id_table" });

module.exports = Order;
