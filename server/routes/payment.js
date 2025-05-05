//payment apisi
const express = require('express');//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require('../middlewares/verifyToken');//verifyToken middleware'ini dahil ettik
const paymentController = require('../controllers/payment');//payment controller'ını dahil ettik

//ödeme oluşturma
router.post('/', verifyToken, paymentController.createPayment);

module.exports = router;//router ı dışarı aktarıyoruz
