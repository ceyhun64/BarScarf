const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Product = require("./product");
const User = require("./user");
const Favorite = sequelize.define("Favorite", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    timestamps: false,
});

Favorite.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });


module.exports = Favorite;