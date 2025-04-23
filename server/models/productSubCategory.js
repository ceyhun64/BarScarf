const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');
const Product = require('./product');
const SubCategory = require('./subCategory');

const ProductSubCategory = sequelize.define("ProductSubCategory", {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});
ProductSubCategory.associate = (models) => {
    ProductSubCategory.belongsTo(models.Product, { foreignKey: 'productId' });
    ProductSubCategory.belongsTo(models.SubCategory, { foreignKey: 'subCategoryId' });
};

// İlişkiyi kuruyoruz, ancak Product ve Category modellerindeki ilişkiyi model içinde kurmak zorundayız.
Product.belongsToMany(SubCategory, {
    through: ProductSubCategory,
    foreignKey: 'productId',
    otherKey: 'subCategoryId',
});

SubCategory.belongsToMany(Product, {
    through: ProductSubCategory,
    foreignKey: 'subCategoryId',
    otherKey: 'productId',
});

module.exports = ProductSubCategory;

