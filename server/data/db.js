require("dotenv").config(); // Öncelikle .env dosyasını yükle

const Sequelize = require("sequelize");

// .env dosyasından veritabanı bağlantısı bilgilerini al
if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.development" });
}

let sequelize;

if (process.env.NODE_ENV === "production") {
  // Railway veya diğer uzak sunucu için
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "mysql",
    logging: false,
  });
} else {
  // Geliştirme ortamı (localhost)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, // BURASI DB_PASS değil
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      logging: false,
    }
  );
}

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Veritabanı bağlantısı kuruldu");
  } catch (error) {
    console.error("Veritabanı bağlantısı kurulamadı", error);
  }
}

connect();

module.exports = sequelize;
