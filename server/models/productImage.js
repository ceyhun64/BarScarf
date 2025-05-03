const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const ProductImage = sequelize.define("productImages", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = ProductImage;
