//userdetails apisi
const express = require('express');//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require('../middlewares/verifyToken');//verifyToken middleware'ini dahil ettik
const isAdmin = require('../middlewares/isAdmin');//isAdmin middleware'ini dahil ettik
const userDetailsController = require('../controllers/userDetails');//userDetails controller'ını dahil ettik

//userdetails getirme(id ye göre)
router.get('/user', verifyToken, userDetailsController.get_user_details_by_id);

//userdetails getirme(admin için)
router.get('/:id', verifyToken, isAdmin, userDetailsController.get_user_details_by_user_id);

//tüm userdetails getirme(admin için)
router.get('/', verifyToken, isAdmin, userDetailsController.get_user_details);

//userdetails ekleme
router.post('/', verifyToken, userDetailsController.create_user_details);

//userdetails güncelleme
router.put('/', verifyToken, userDetailsController.update_user_details);

///userdetails silme
router.delete('/', verifyToken, userDetailsController.delete_user_details);

module.exports = router;//router ı dışarı aktarıyoruz