//ürünlerin bedenleri modeli
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const Product = require("./product");
const Size = require("./size");

const ProductSize = sequelize.define("productSizes", {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sizeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

Product.belongsToMany(Size, {
    through: "productSizes",//oluşan yeni tablonun adı
    timestamps: false // createdAt ve updatedAt'ı devre dışı bırakıyoruz
});
Size.belongsToMany(Product, {
    through: "productSizes",//oluşan yeni tablonun adı
    timestamps: false // createdAt ve updatedAt'ı devre dışı bırakıyoruz
});
module.exports = ProductSize;