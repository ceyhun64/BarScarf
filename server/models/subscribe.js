const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Subscribe = sequelize.define("subscribers", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Subscribe;