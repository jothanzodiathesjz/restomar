const { DataTypes } = require("sequelize");
const { db } = require("../config/dbConnection");

const Table = db.define(
  "table",
  {
    id_table: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notEmpty: true,
      },
    },
    noTable: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    statusTable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Table;
