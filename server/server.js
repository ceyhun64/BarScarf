require("dotenv").config();

if (process.env.NODE_ENV === 'development') {
  console.log('Uygulama geliştirme (development) modunda çalışıyor');
} else if (process.env.NODE_ENV === 'production') {
  console.log('Uygulama üretim (production) modunda çalışıyor');
} else {
  console.log('Uygulama belirli bir ortamda çalışmıyor');
}

const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const sequelize = require("./data/db");
const User = require("./models/user");

// Middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL); // Frontend'inizin domain'ini buraya ekleyin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // İzin verilen HTTP metotları
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // İzin verilen başlıklar
  next(); // Bir sonraki middleware'e geçiş
});

//cors ayarları
const corsOptions = {
  origin: [
    "https://www.barscarf.com",
    "https://barscarf-11.onrender.com",
    "https://bar-scarf-iqzh.vercel.app",
    "http://localhost:5173"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true, // Çerezler için
  allowedHeaders: "Content-Type, Authorization, Origin, Accept,x-auth-token", // İzin verilen başlıklar
};

app.use(cors(corsOptions)); // CORS yapılandırmasını kullan

// Güvenlik Başlıkları (Helmet)
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Cross-origin resource policy'yi devre dışı bırak
  })
);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true, // Geriye X-RateLimit-* başlıklarını ekler
  legacyHeaders: false, // Geriye RateLimit-* başlıklarını eklemez
});
app.use(limiter);

// Routes
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const userDetailsRoutes = require("./routes/userDetails");
const orderRoutes = require("./routes/order");
const reviewRoutes = require("./routes/review");
const favoriteRoutes = require("./routes/favorite");
const paymentRoutes = require("./routes/payment");
const cargoRoutes = require("./routes/cargo");
const subscribeRoutes = require("./routes/subscribe");
const sliderRoutes = require("./routes/slider");

// Statik Dosyalar (Resimler)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Form verisi için

// Routes
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user-details", userDetailsRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cargo", cargoRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/slider", sliderRoutes);

// Veritabanı Senkronizasyonu ve Admin Kullanıcı Oluşturma
(async () => {
  try {
    await sequelize.sync();
    console.log("Veritabanı senkronize edildi.");

    const [adminUser, created] = await User.findOrCreate({
      where: { isAdmin: 1 },
      defaults: {
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        isAdmin: 1,
      },
    });

    if (created) {
      console.log("Admin kullanıcısı başarıyla oluşturuldu.");
    } else {
      console.log("Admin kullanıcısı zaten mevcut.");
    }
  } catch (error) {
    console.error("Veritabanı senkronizasyonu sırasında hata oluştu:", error);
    // Uygulamanın başlamasını engellemek için burada bir işlem yapabilirsiniz (örneğin, süreci sonlandırmak).
    // process.exit(1);
  }
})();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
