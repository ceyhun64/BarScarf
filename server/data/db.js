//veritabanı bağlantısı
require("dotenv").config(); //.env dosyasını dahil ettik
const Sequelize = require("sequelize"); //sequelize kütüphanesini dahil ettik

//sequelize nesnesi oluşturuyoruz
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "mysql", //veritabanının dilini belirtiyoruz
  logging: false
});

async function connect() {
  try {
    await sequelize.authenticate(); //veritabanı bağlantısını test eder(true ise bir şey olmaz false ise hata fırlatılır)
    console.log("Veritabanı bağlantısı kuruldu");
  } catch (error) {
    console.log("Veritabanı bağlantısı kurulamadı", error);
  }
}

connect(); //veritabanı bağlantı fonksiyonunu çağırıyoruz

module.exports = sequelize; //sequelize nesnesini dışarı aktarıyoruz
