const express = require('express');
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const userController = require("../controllers/user");

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


module.exports = router;