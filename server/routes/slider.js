const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/slider');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const uploadMultiple = require('../middlewares/upload');

// Slider işlemleri
router.get('/', sliderController.get_slider);  // Slider'ları getir

router.post("/", verifyToken, isAdmin, uploadMultiple, sliderController.add_slider);  // Slider ekle

router.delete("/:id", verifyToken, isAdmin, sliderController.delete_slider);  // Slider sil

// Banner işlemleri
router.get("/banner", sliderController.get_banner);  // Banner'ları getir

router.post("/banner", verifyToken, isAdmin, uploadMultiple, sliderController.add_banner);  // Banner ekle

router.delete("/banner/:id", verifyToken, isAdmin, sliderController.delete_banner);  // Banner sil

// Heroes işlemleri
router.get("/heroes", sliderController.get_heroes);  // Heroes'ları getir

router.post("/heroes", verifyToken, isAdmin, uploadMultiple, sliderController.add_heroes);  // Heroes ekle

router.delete("/heroes/:id", verifyToken, isAdmin, sliderController.delete_heroes);  // Heroes sil

module.exports = router;
