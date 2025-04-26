// models/productImage.js
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
require("dotenv").config();

const ProductImage = sequelize.define("productImages", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("imageUrl");
      return rawValue ? `${process.env.BASE_URL || "https://github.com/ceyhun64/BarScarf/blob/main/server"}${rawValue}` : null;
    },
  },
}, {
  timestamps: false,
});

module.exports = ProductImage;

