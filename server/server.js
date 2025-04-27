require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
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

// CORS ayarlarını buradaki gibi tek bir yerde yapıyoruz
const corsOptions = {
  origin: ["https://www.barscarf.com", "https://barscarf-11.onrender.com"], // İzin verilen origin'ler
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Eğer çerez gönderimine izin verilecekse
}

app.use(cors(corsOptions));  // Tüm API'ler için global CORS yapılandırması


// Helmet güvenliğini ekle
app.use(helmet());

// Rate limiter middleware'ini ekle
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Her IP'den 100 istek
});

app.use(limiter); // Rate limit middleware'i

// API Routes
app.use(express.json());
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

(async () => {
  await sequelize.sync();  // Veritabanını sıfırlama

  // Tek bir admin kullanıcısını veritabanına ekleyin
  const existingAdmin = await User.findOne({ where: { isAdmin: 1 } });

  if (!existingAdmin) {
    // Eğer admin yoksa, admin kullanıcısını ekleyelim
    await User.create(
      {
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        isAdmin: 1
      }
    );

    console.log("Admin kullanıcısı başarıyla eklendi.");
  } else {
    console.log("Admin kullanıcısı zaten mevcut.");
  }
})();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
