require("dotenv").config();//env yi dahil ettik

if (process.env.NODE_ENV === 'development') {//node.env development ise console.log çalışacak
  console.log('Uygulama geliştirme (development) modunda çalışıyor');
} else if (process.env.NODE_ENV === 'production') {//node.env production ise console.log çalışacak
  console.log('Uygulama üretim (production) modunda çalışıyor');
} else {//node.env belirli bir ortamda çalışmıyorsa console.log çalışacak
  console.log('Uygulama belirli bir ortamda çalışmıyor');
}

const express = require("express");//express kütüphanesini dahil ettik
const app = express();//express kütüphanesini kullanarak bir uygulama oluşturduk
const cors = require("cors");//cors kütüphanesini dahil ettik
const helmet = require("helmet");//helmet kütüphanesini dahil ettik
const rateLimit = require("express-rate-limit");//express-rate-limit kütüphanesini dahil ettik
const path = require("path");//path kütüphanesini dahil ettik
const sequelize = require("./data/db");//sequelize kütüphanesini dahil ettik
const User = require("./models/user");//user modelini dahil ettik(admin  kullanıcı oluşturmak için)

// Middleware'ler
app.use((req, res, next) => {//middleware'leri kullanarak istekleri yönetiyoruz(req:istek, res:yeniden yönlendirme, next:bir sonraki middleware'e geçiş)
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL); // İzin verilen kaynaklar
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // İzin verilen HTTP metotları
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // İzin verilen başlıklar
  next(); // Bir sonraki middleware'e geçiş
});

//Cors ayarları
const corsOptions = {
  origin: [//origin:izin verilen kaynaklar
    "https://www.barscarf.com",//frontend domain adresi
    "https://barscarf-11.onrender.com",//backend adresi
    "https://bar-scarf-iqzh.vercel.app",//frontend uygulama adresi
    "http://localhost:5173"//frontend localhost adresi
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",//izin verilen metotlar
  credentials: true, // Çerezler için
  allowedHeaders: "Content-Type, Authorization, Origin, Accept,x-auth-token", // İzin verilen başlıklar
};
app.use(cors(corsOptions)); // CORS yapılandırmasını kullan

// Güvenlik Başlıkları (Helmet)
app.use(helmet({ crossOriginResourcePolicy: false, }));// Cross-origin resource policy'yi devre dışı bırak

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,// 15 dakika
  max: 1000,// 1000 istek
  standardHeaders: true, // Geriye X-RateLimit-* başlıklarını ekler
  legacyHeaders: false, // Geriye RateLimit-* başlıklarını eklemez
});
app.use(limiter);

// Routes
const productRoutes = require("./routes/product");//product route'unu dahil ettik
const categoryRoutes = require("./routes/category");//category route'unu dahil ettik
const userRoutes = require("./routes/user");//user route'unu dahil ettik
const authRoutes = require("./routes/auth");//auth route'unu dahil ettik
const cartRoutes = require("./routes/cart");//cart route'unu dahil ettik
const userDetailsRoutes = require("./routes/userDetails");//userDetails route'unu dahil ettik
const orderRoutes = require("./routes/order");//order route'unu dahil ettik
const reviewRoutes = require("./routes/review");//review route'unu dahil ettik
const favoriteRoutes = require("./routes/favorite");//favorite route'unu dahil ettik
const paymentRoutes = require("./routes/payment");//payment route'unu dahil ettik
const cargoRoutes = require("./routes/cargo");//cargo route'unu dahil ettik
const subscribeRoutes = require("./routes/subscribe");//subscribe route'unu dahil ettik
const sliderRoutes = require("./routes/slider");//slider route'unu dahil ettik

// Statik Dosyalar (Resimler)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));//uploads klasörünü dahil ettik

// Express Middleware
app.use(express.json());// JSON verisi için
app.use(express.urlencoded({ extended: true })); // URL kodlamalı veri için

// Routes
app.use("/api/product", productRoutes);//product route'unu kullanıyoruz
app.use("/api/category", categoryRoutes);//category route'unu kullanıyoruz
app.use("/api/user", userRoutes);//user route'unu kullanıyoruz
app.use("/api/auth", authRoutes);//auth route'unu kullanıyoruz
app.use("/api/cart", cartRoutes);//cart route'unu kullanıyoruz
app.use("/api/user-details", userDetailsRoutes);//userDetails route'unu kullanıyoruz
app.use("/api/order", orderRoutes);//order route'unu kullanıyoruz
app.use("/api/review", reviewRoutes);//review route'unu kullanıyoruz
app.use("/api/favorite", favoriteRoutes);//favorite route'unu kullanıyoruz
app.use("/api/payment", paymentRoutes);//payment route'unu kullanıyoruz
app.use("/api/cargo", cargoRoutes);//cargo route'unu kullanıyoruz
app.use("/api/subscribe", subscribeRoutes);//subscribe route'unu kullanıyoruz
app.use("/api/slider", sliderRoutes);//slider route'unu kullanıyoruz

// Veritabanı Senkronizasyonu ve Admin Kullanıcı Oluşturma
(async () => {
  try {
    await sequelize.sync();//veritabanını senkronize ettik
    console.log("Veritabanı senkronize edildi.");

    const [adminUser, created] = await User.findOrCreate({//admin kullanıcı oluşturmak için
      where: { isAdmin: 1 },//isAdmin değeri 1 olanı bul veya oluştur
      defaults: {//varsa
        name: process.env.ADMIN_NAME,//admin adı
        email: process.env.ADMIN_EMAIL,//admin email
        password: process.env.ADMIN_PASSWORD,//admin şifre
        isAdmin: 1,//admin rolü
      },
    });

    if (created) {//oluşturulduysa
      console.log("Admin kullanıcısı başarıyla oluşturuldu.");//konsola yazdır
    } else {//oluşturulmadıysa daha önceden var demektir
      console.log("Admin kullanıcısı zaten mevcut.");//konsola yazdır
    }
  } catch (error) {
    console.error("Veritabanı senkronizasyonu sırasında hata oluştu:", error);//hata oluştuğunda konsola yazdır
  }
})();

const PORT = process.env.PORT || 3000;//port ayarı

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);//konsola yazdır
});
