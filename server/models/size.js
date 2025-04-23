//beden modeli
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Size = sequelize.define("sizes", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Size;
