// models/SubCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');  // Veritabanı bağlantısı
const Category = require('./category');  // Category modelini içe aktarıyoruz

const SubCategory = sequelize.define('subCategories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',  // 'categories' tablosunu referans alıyoruz
            key: 'id'
        }
    },
    isPopular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: false,  // Zaman damgası istemiyorsak
});

// SubCategory bir Category'ye ait
SubCategory.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(SubCategory, { foreignKey: 'categoryId' });

module.exports = SubCategory;
