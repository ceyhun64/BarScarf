require("dotenv").config(); //env yi dahil ettik

const Sequelize = require("sequelize");//sequelize kütüphanesini dahil ettik

if (process.env.NODE_ENV === "development") {//node.env development ise yolu .env.development olarak ayarlıyoruz
  require("dotenv").config({ path: ".env.development" });//.env.development dosyasını dahil ettik
}

let sequelize;//sequelize değişkenini tanımladık(let ile tanımladığımızda değişkenin değeri değişebilir)

if (process.env.NODE_ENV === "production") {//node.env production ise yolu .env.production olarak ayarlıyoruz( Railway veya diğer uzak sunucu için)
  sequelize = new Sequelize(process.env.DB_URL, {//sequelize değişkenine yeni bir Sequelize nesnesi atadık
    dialect: "mysql",//veritabanının tipi mysql
    logging: false,//loglama yapmayacağız
  });
} else {
  sequelize = new Sequelize(//sequelize değişkenine yeni bir Sequelize nesnesi atadık(localhost için)
    process.env.DB_NAME,//veritabanının adı
    process.env.DB_USER,//veritabanının kullanıcısı
    process.env.DB_PASSWORD,//veritabanının şifresi
    {
      host: process.env.DB_HOST,//veritabanının hostu
      dialect: "mysql",//veritabanının tipi mysql
      logging: false,//loglama yapmayacağız
    }
  );
}

async function connect() {//connect fonksiyonunu tanımladık
  try {
    await sequelize.authenticate();//sequelize değişkenini kullanarak veritabanına bağlanıyoruz(authenticate fonksiyonu veritabanına bağlanır)
    console.log("Veritabanı bağlantısı kuruldu");//veritabanına bağlandığımızda console.log çalışacak
  } catch (error) {
    console.error("Veritabanı bağlantısı kurulamadı", error);//veritabanına bağlanamadığımızda console.error çalışacak
  }
}

connect();//connect fonksiyonunu çağırdık

module.exports = sequelize;//sequelize değişkenini dışarı aktarıyoruz
