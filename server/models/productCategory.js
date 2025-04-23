// models/productCategory.js
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const Product = require("./product");
const Category = require("./category");

const ProductCategory = sequelize.define("ProductCategory", {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Product ve Category modelleri arasındaki ilişkiyi tanımlıyoruz
ProductCategory.associate = (models) => {
    ProductCategory.belongsTo(models.Product, { foreignKey: 'productId' });
    ProductCategory.belongsTo(models.Category, { foreignKey: 'categoryId' });
};

// İlişkiyi kuruyoruz, ancak Product ve Category modellerindeki ilişkiyi model içinde kurmak zorundayız.
Product.belongsToMany(Category, {
    through: ProductCategory,
    foreignKey: 'productId',
    otherKey: 'categoryId',
});

Category.belongsToMany(Product, {
    through: ProductCategory,
    foreignKey: 'categoryId',
    otherKey: 'productId',
});

module.exports = ProductCategory;
