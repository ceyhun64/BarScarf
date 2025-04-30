//sepet apisi
const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const cartController = require("../controllers/cart");

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


module.exports = router;