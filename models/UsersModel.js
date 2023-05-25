const { DataTypes } = require("sequelize");
const { db } = require("../config/dbConnection");

const Users = db.define(
  "users",
  {
    id_user: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true,
      },
    },
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telepone: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Users;
