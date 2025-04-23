//sipariş tablosu
const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Order = sequelize.define('orders', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),//beklemede ,tamamlandı , iptal edildi
        allowNull: false,
        defaultValue: 'pending'
    }
});


module.exports = Order;