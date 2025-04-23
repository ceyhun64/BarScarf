// models/Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');  // Veritabanı bağlantısı

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,  // Zaman damgası istemiyorsak
    tableName: 'categories'
});

module.exports = Category;
