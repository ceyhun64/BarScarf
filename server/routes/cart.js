//sepet apisi
const express = require("express");//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require("../middlewares/verifyToken");//verifyToken middleware'ini dahil ettik
const cartController = require("../controllers/cart");//cart controller'ını dahil ettik

// Sepete ürün ekleme(login olan herkesin sepeti var)
router.post("/add", verifyToken, cartController.add_product)

//sepeti görüntüleme
router.get("/", verifyToken, cartController.get_cart);

// Sepetteki ürün ayrıntısını görüntüleme
router.get("/:productId", verifyToken, cartController.get_product);

// Sepetteki ürün sayısını artırma
router.put("/increase/:productId/:colorId", verifyToken, cartController.increase_product);

// Sepetteki ürün sayısını azaltma
router.put("/decrease/:productId/:colorId", verifyToken, cartController.decrease_product)

//sepeti temizleme
router.delete("/clear", verifyToken, cartController.clear_cart);

// Sepetten ürün kaldırma
router.delete("/:productId", verifyToken, cartController.delete_product);

//sepetteki ürünü güncelleme
router.put("/update/:productId", verifyToken, cartController.update_product);

//sepetteki ürünlerin toplam fiyatını hesaplama
router.get("/total", verifyToken, cartController.get_total_price);


module.exports = router;//router ı dışarı aktarıyoruz