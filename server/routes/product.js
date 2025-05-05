//product apisi
const express = require('express');//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require("../middlewares/verifyToken");//verifyToken middleware'ini dahil ettik
const isAdmin = require("../middlewares/isAdmin");//isAdmin middleware'ini dahil ettik
const uploadMultiple = require("../middlewares/upload");//uploadMultiple middleware'ini dahil ettik
const productController = require("../controllers/products");//product controller'ını dahil ettik

// Ürün listeleme (bedenlere gerek yok)
router.get("/", productController.get_product);

// Ürün listeleme (kategoriye göre)
router.get("/category/:categoryId", productController.get_product_by_category);

// Ürün listeleme (alt kategoriye göre)
router.get("/sub/:subCategoryId", productController.get_product_by_subcategory);

// Ürün listeleme (isme göre)
router.get("/name/:name", productController.get_product_by_name);

//Ürün listeleme (renge göre)
router.get("/color/:color", productController.get_product_by_color);

// Ürün listeleme (id'ye göre - ürün ayrıntısı olduğu için bedenler de dahil)
router.get("/:id", productController.get_product_by_id);

// Ürün ekleme
router.post("/", verifyToken, isAdmin, uploadMultiple, productController.add_product);

// Ürün güncelleme
router.put("/:id", verifyToken, isAdmin, uploadMultiple, productController.update_product);

// Ürün silme (veritabanından)
router.delete("/:id", verifyToken, isAdmin, productController.delete_product);


module.exports = router;//router ı dışarı aktarıyoruz
