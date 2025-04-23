//auth apisi
const express = require('express');
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const authController = require("../controllers/auth");

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



module.exports = router;