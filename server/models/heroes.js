const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Heroes = sequelize.define('heroeses', {
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,  // Zaman damgası istemiyorsak
});

module.exports = Heroes;
