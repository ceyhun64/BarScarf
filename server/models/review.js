const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Review = sequelize.define("reviews", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
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
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
});

Review.associate = function (models) {
  // Review, bir ürüne ait olacak
  Review.belongsTo(models.Product, {
    foreignKey: 'productId',
    as: 'product'
  });
  // Review, bir kullanıcıya ait olacak
  Review.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
};


module.exports = Review;