const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Banner = sequelize.define('banners', {
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Banner;
