//cart ve product ilişki tablosu
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Product = require("./product");
const Cart = require("./cart");

const CartProduct = sequelize.define("cartProducts", {
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "carts", // Cart tablosuna dış anahtar
            key: "id",
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "products", // Product tablosuna dış anahtar
            key: "id",
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }

}, {
    timestamps: false
});

CartProduct.belongsTo(Cart, { foreignKey: "cartId", as: "carts" });//cart idsni alıyoruz
CartProduct.belongsTo(Product, { foreignKey: "productId", as: "products" });//product idsni alıyoruz

module.exports = CartProduct;
