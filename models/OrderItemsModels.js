const { DataTypes } = require("sequelize");
const { db } = require("../config/dbConnection");
const Order = require("./OrderModels");
const Food = require("./FoodModels");

const OrderItems = db.define(
  "order_items",
  {
    items_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true,
      },
    },
    quantity: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
Order.hasMany(OrderItems);
OrderItems.belongsTo(Order, { foreignKey: "order_id" });
Food.hasMany(OrderItems);
OrderItems.belongsTo(Food, { foreignKey: "food_id" });

module.exports = OrderItems;
