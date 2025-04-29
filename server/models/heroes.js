const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || "https://barscarf-11.onrender.com";  // BASE_URL'yi environment'dan al

const Heroes = sequelize.define('heroeses', {
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue("imageUrl");
            if (!rawValue) return null;
            
            // Eğer zaten tam URL değilse başına BASE_URL ekle
            if (rawValue.startsWith("http")) {
                return rawValue;  // Eğer tam URL ise olduğu gibi döndür
            }
            
            return `${BASE_URL}${rawValue.startsWith("/") ? "" : "/"}${rawValue}`;  // Başına BASE_URL ekle
        },
    }
}, {
    timestamps: false,  // Zaman damgası istemiyorsak
});

module.exports = Heroes;
