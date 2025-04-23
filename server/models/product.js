const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const ProductImage = require("./productImage");

const Product = sequelize.define("products", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, );

// Resim ilişkisi
Product.hasMany(ProductImage, {
  foreignKey: 'productId',
  as: 'images',
});
ProductImage.belongsTo(Product, {
  foreignKey: 'productId',
});



module.exports = Product;
