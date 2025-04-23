const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");

const User = require("./user");

const UserDetails = sequelize.define('userDetails', {
    firstName: {//firstname değeri
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

User.associate = (models) => {
    User.hasOne(models.UserDetails, { foreignKey: "userId", as: "userDetails", onDelete: "CASCADE" });
};


module.exports = UserDetails;