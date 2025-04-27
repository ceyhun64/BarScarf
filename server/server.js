require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const sequelize = require("./data/db");
const User = require("./models/user");

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
const colorSizeRoutes = require("./routes/color-size");
const paymentRoutes = require("./routes/payment");
const cargoRoutes = require("./routes/cargo");
const subscribeRoutes = require("./routes/subscribe");

// CORS ayarları
const corsOptions = {
  origin: [
    "https://www.barscarf.com",
    "https://barscarf-11.onrender.com",
    "https://bar-scarf-iqzh.vercel.app"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // OPTIONS metodu eklenmeli
  credentials: true, // Çerezler için
};
app.use(cors(corsOptions)); // Tüm API'ler için global CORS

// Güvenlik Başlıkları (Helmet)
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin", //  "same-site" veya "cross-origin"
  })
);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true, // Geriye X-RateLimit-* başlıklarını ekler
  legacyHeaders: false, // Geriye RateLimit-* başlıklarını eklemez
});
app.use(limiter);

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Form verisi için

// Statik Dosyalar (Resimler)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
app.use("/api/color-size", colorSizeRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cargo", cargoRoutes);
app.use("/api/subscribe", subscribeRoutes);

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
