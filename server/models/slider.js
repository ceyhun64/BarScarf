const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Slider = sequelize.define('sliders', {
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,  // Zaman damgası istemiyorsak
});

module.exports = Slider;
