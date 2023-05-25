const { DataTypes } = require("sequelize");
const { db } = require("../config/dbConnection");
const Users = require("./UsersModel");

const Menu = db.define(
  "menu",
  {
    id_menu: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);
Users.hasMany(Menu);
Menu.belongsTo(Users, { foreignKey: "id_user" });

module.exports = Menu;
