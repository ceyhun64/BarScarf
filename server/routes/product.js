const express = require('express');
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const uploadMultiple = require("../middlewares/upload");

const productController = require("../controllers/products");

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


module.exports = router;
