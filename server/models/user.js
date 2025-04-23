//kullanıcı modeli
require("dotenv").config();
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db"); //veritabanı bağlantısını dahil ettik
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Order = require("./order");

const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

//User modeli ve users tablosu oluşturuyoruz(model veritabanı tablolarını nesne olarak temsil eder)
const User = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
}, {
  timestamps: false,
});

User.prototype.createAuthToken = function () {
  const expiresIn = "24h"; // Token süresi (kullanıcı oturum süresi)
  
  // jwt.sign fonksiyonunun ikinci parametresi olarak expiresIn'ı geçiyoruz
  return jwt.sign(
    { id: this.id, isAdmin: this.isAdmin, name: this.name }, // Payload
    jwtPrivateKey, // Gizli anahtar
    { expiresIn } // Token süresi
  );
};
User.beforeCreate(async (user) => {
  if (user.password) {
    // Şifreyi hashle
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    // Şifre değiştirildiyse hashle
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.hasMany(Order, { foreignKey: 'id', as: "orders" });  // User, Order ile ilişkisini burada kuruyor.

module.exports = User;
