require("dotenv").config(); //.env dosyasını dahil ettik
const express = require("express"); //expressi dahil ettik
const cors = require("cors"); //cors dahil ettik
const app = express(); //app adlı uygulamayı oluşturduk

const sequelize = require("./data/db"); //sequelize dahil ettik
const dummyData = require("./data/dummy-data"); //dummyData dahil ettik

//routes
const productRoutes = require("./routes/product");//product routes dahil ettik
const categoryRoutes = require("./routes/category");//category routes dahil ettik
const userRoutes = require("./routes/user");//user routes dahil ettik
const authRoutes = require("./routes/auth");//auth routes dahil ettik
const cartRoutes = require("./routes/cart");//cart routes dahil ettik
const userDetailsRoutes = require("./routes/userDetails");//userDetails routes dahil ettik
const orderRoutes = require("./routes/order");//order routes dahil ettik
const reviewRoutes = require("./routes/review");//review routes dahil ettik
const favoriteRoutes = require("./routes/favorite");//favorite routes dahil ettik
const colorSizeRoutes = require("./routes/color-size");//colorSize routes dahil ettik
const paymentRoutes = require("./routes/payment");//payment routes dahil ettik
const cargoRoutes = require("./routes/cargo");//cargo routes dahil ettik
const subscribeRoutes = require("./routes/subscribe");//subscribe routes dahil ettik

const corsOptions = {
  origin: "http://localhost:5173", // frontendin çalıştığı adres http://localhost:5173
  methods: ["GET", "POST", "PUT", "DELETE"], // Sadece GET, POST, PUT, DELETE izin verilir
};
app.use(cors(corsOptions));

//apiler
app.use(express.json());//json formatında veri almak için
app.use("/api/product", productRoutes);//api/products yolu girilirse productRoutes çalışacak
app.use("/api/category", categoryRoutes);//api/categories yolu girilirse categoryRoutes çalışacak
app.use("/api/user", userRoutes);//api/users yolu girilirse userRoutes çalışacak
app.use("/api/auth", authRoutes);//api/auth yolu girilirse authRoutes çalışacak
app.use("/api/cart", cartRoutes);//api/cart yolu girilirse cartRoutes çalışacak
app.use("/api/user-details", userDetailsRoutes);//api/user/details yolu girilirse userDetailsRoutes çalışacak
app.use("/api/order", orderRoutes);//api/order yolu girilirse orderRoutes çalışacak
app.use("/api/review", reviewRoutes);//api/review yolu girilirse reviewRoutes çalışacak
app.use("/api/favorite", favoriteRoutes);//api/favorite yolu girilirse favoriteRoutes çalışacak
app.use("/api/color-size", colorSizeRoutes);//api/color-size yolu girilirse colorSizeRoutes çalışacak
app.use("/api/payment", paymentRoutes);//api/payment yolu girilirse paymentRoutes çalışacak
app.use("/api/cargo", cargoRoutes);//api/cargo yolu girilirse cargoRoutes çalışacak
app.use("/api/subscribe", subscribeRoutes);//api/subscribe yolu girilirse subscribeRoutes çalışacak
app.use('/uploads', express.static('uploads'));


(async () => {
  await sequelize.sync({ force: true });
  await dummyData();
})();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
