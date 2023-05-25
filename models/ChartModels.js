const { DataTypes } = require("sequelize");
const { db } = require("../config/dbConnection");
const Menu = require("./MenuModels");
const Food = require("./FoodModels");

const Chart = db.define(
  "chart",
  {
    id_chart: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true,
      },
    },
    qty: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

Menu.hasMany(Chart);
Chart.belongsTo(Menu, { foreignKey: "id_menu" });
Food.hasMany(Chart);
Chart.belongsTo(Food, { foreignKey: "id_food" });

module.exports = Chart;
