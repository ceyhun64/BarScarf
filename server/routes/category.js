//category apisi
const express = require('express');
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const categoryController = require("../controllers/category");

//kategorileri listeleme
router.get("/", categoryController.get_category);

//kategori listeleme(alt kategorilerle birlikte)
router.get("/sub", categoryController.get_all_sub_categories);

//kategori listeleme(alt kategorilerle birlikte ve popüler olanlar)
router.get("/pop", categoryController.get_popular_sub_categories);

//kategori listeleme(id ye göre)
router.get("/:id", categoryController.get_category_by_id)

//kategori ekleme
router.post("/", verifyToken, isAdmin, categoryController.create_category);

//kategori güncelleme
router.put("/:id", verifyToken, isAdmin, categoryController.update_category)

//popüler alt kategori güncelleme
router.put("/pop/:id", verifyToken, isAdmin, categoryController.update_popular_sub_category)

//kategori silme
router.delete("/:id", verifyToken, isAdmin, categoryController.delete_category)

//alt kategorileri ana kategoriye göre listeleme
router.get("/sub/:id", categoryController.get_sub_category);

//alt kategori ekleme
router.post("/sub", verifyToken, isAdmin, categoryController.create_sub_category);

//alt kategori güncelleme
router.put("/sub/:id", verifyToken, isAdmin, categoryController.update_sub_category);

//alt kategori silme
router.delete("/sub/:id", verifyToken, isAdmin, categoryController.delete_sub_category);


module.exports = router;