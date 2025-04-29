const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "https://barscarf-11.onrender.com";

const ProductImage = sequelize.define("productImages", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("imageUrl");
      if (!rawValue) return null;

      // Eğer zaten tam URL değilse başına BASE_URL ekle
      if (rawValue.startsWith("http")) {
        return rawValue;
      }

      return `${BASE_URL}${rawValue.startsWith("/") ? "" : "/"}${rawValue}`;
    },
  },
}, {
  timestamps: false,
});

module.exports = ProductImage;
