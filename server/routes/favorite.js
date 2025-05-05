//favorite apisi
const express = require("express");//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require("../middlewares/verifyToken");//verifyToken middleware'ini dahil ettik
const favoriteController = require("../controllers/favorite");//favorite controller'ını dahil ettik

// Favorileri listeleme
router.get("/", verifyToken, favoriteController.get_favorites);

// Favori ekleme
router.post("/", verifyToken, favoriteController.add_favorite);

// Favori silme
router.delete("/:productId", verifyToken, favoriteController.delete_favorite);

module.exports = router;//router ı dışarı aktarıyoruz