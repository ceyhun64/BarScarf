//slider apisi
const express = require('express');//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require('../middlewares/verifyToken');//verifyToken middleware'ini dahil ettik
const isAdmin = require('../middlewares/isAdmin');//isAdmin middleware'ini dahil ettik
const uploadMultiple = require('../middlewares/upload');//uploadMultiple middleware'ini dahil ettik
const sliderController = require('../controllers/slider');//slider controller'ını dahil ettik

//slider getirme
router.get('/', sliderController.get_slider);

//slider ekleme
router.post("/", verifyToken, isAdmin, uploadMultiple, sliderController.add_slider);

//slider silme
router.delete("/:id", verifyToken, isAdmin, sliderController.delete_slider);

//banner getirme
router.get("/banner", sliderController.get_banner);

//banner ekleme
router.post("/banner", verifyToken, isAdmin, uploadMultiple, sliderController.add_banner);

//banner silme
router.delete("/banner/:id", verifyToken, isAdmin, sliderController.delete_banner);

//heroes getirme
router.get("/heroes", sliderController.get_heroes);

//heroes ekleme
router.post("/heroes", verifyToken, isAdmin, uploadMultiple, sliderController.add_heroes);

//heroes silme
router.delete("/heroes/:id", verifyToken, isAdmin, sliderController.delete_heroes);

module.exports = router;//router ı dışarı aktarıyoruz
