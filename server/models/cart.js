//sepet tablosu
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const User = require("./user");

const Cart = sequelize.define("carts", {//cart tablosu
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: false,
});

User.associate = (models) => {
    User.hasOne(models.Cart, { foreignKey: "userId", as: "cart", onDelete: "CASCADE" });//user ve cartın bire bir ilişkisi
};

module.exports = Cart;
