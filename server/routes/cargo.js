//cargo apisi
const express = require('express');//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require('../middlewares/verifyToken');//verifyToken middleware'ini dahil ettik
const cargoController = require('../controllers/cargo');//cargo controller'ını dahil ettik

//kargo gönderm
router.post('/send', cargoController.send_cargo);

//kargo için token alma
router.post('/token', cargoController.get_token);

//sipariş oluşturma
router.post('/create-order', verifyToken, cargoController.create_order);

module.exports = router;//router ı dışarı aktarıyoruz
