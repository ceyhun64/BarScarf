//category apisi
const express = require('express');//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require("../middlewares/verifyToken");//verifyToken middleware'ini dahil ettik
const isAdmin = require("../middlewares/isAdmin");//isAdmin middleware'ini dahil ettik
const categoryController = require("../controllers/category");//category controller'ını dahil ettik

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


module.exports = router;//router ı dışarı aktarıyoruz