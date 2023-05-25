const { DataTypes } = require("sequelize");
const { db } = require("../config/dbConnection");
const Category = require("./CategoryModels");

const Food = db.define(
  "food",
  {
    id_food: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true,
      },
    },
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    price: DataTypes.INTEGER,
    images: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Category.hasMany(Food);
Food.belongsTo(Category, { foreignKey: "id_category" });

module.exports = Food;
