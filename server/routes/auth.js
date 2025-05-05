//auth apisi
const express = require('express');//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require("../middlewares/verifyToken");//verifyToken middleware'ini dahil ettik
const authController = require("../controllers/auth");//auth controller'ını dahil ettik

//kullanıcı kayıt
router.post("/register", authController.register);

//kullanıcı girişi
router.post("/login", authController.login);

//kullanıcı çıkışı
router.post("/logout", verifyToken, authController.logout);

///şifre sıfırlama maili gönderir
router.post("/password-email", authController.passwordEmail);

//password güncelleme
router.put("/update-password/:token", authController.updatePassword);



module.exports = router;//router'ı dışarı aktarıyoruz