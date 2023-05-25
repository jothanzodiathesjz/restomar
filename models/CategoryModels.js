const { DataTypes } = require("sequelize");
const { db } = require("../config/dbConnection");

const Category = db.define(
  "category",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true,
      },
    },
    category: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Category;
