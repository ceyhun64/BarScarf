//user apisi
const express = require('express');//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require("../middlewares/verifyToken");//verifyToken middleware'ini dahil ettik
const isAdmin = require("../middlewares/isAdmin");//isAdmin middleware'ini dahil ettik
const userController = require("../controllers/user");//user controller'ını dahil ettik

//kullanıcı listeleme
router.get("/", verifyToken, isAdmin, userController.get_users)

//kullanıcı listeleme (id ye göre)
router.get("/:id", verifyToken, isAdmin, userController.get_user_by_id)

//kullanıcı listeleme (isime göre)
router.get("/name/:name",  verifyToken, isAdmin,userController.get_user_by_name);

//kullanıcı güncelleme
router.put("/:id", verifyToken, isAdmin, userController.update_user)

//kullanıcı silme
router.delete("/:id", verifyToken, isAdmin, userController.delete_user)


module.exports = router;//router ı dışarı aktarıyoruz