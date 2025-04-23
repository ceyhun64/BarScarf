// models/productImage.js
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const ProductImage = sequelize.define("productImages", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("imageUrl");
      return rawValue ? `${process.env.BASE_URL || "http://localhost:3000"}${rawValue}` : null;
    },
  },
}, {
  timestamps: false,
});

module.exports = ProductImage;

