const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');
const Order = require('./order');
const Product = require('./product');

const OrderProduct = sequelize.define('orderProducts', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priceAtPurchase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'orderProducts'
});

// İlişkiler
OrderProduct.belongsTo(Order, { foreignKey: "orderId", as: "order", onDelete: 'CASCADE' });
OrderProduct.belongsTo(Product, { foreignKey: "productId", as: "product" });

module.exports = OrderProduct;
