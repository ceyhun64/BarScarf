//review apisi
const express = require('express');//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require('../middlewares/verifyToken');//verifyToken middleware'ini dahil ettik
const isAdmin = require('../middlewares/isAdmin');//isAdmin middleware'ini dahil ettik
const reviewController = require('../controllers/review');//review controller'ını dahil ettik

//yorum ekleme
router.post('/:productId', verifyToken, reviewController.create_review);

//yorum listeleme
router.get("/:productId",reviewController.get_reviews);

//yorum silme
router.delete("/:reviewId", verifyToken, reviewController.delete_review);

// admin için Yorum silme işlemi
router.delete("/admin/:reviewId", verifyToken, isAdmin,reviewController.delete_review_admin);

//yorum güncelleme
router.put("/:reviewId", verifyToken,reviewController.update_review);


module.exports = router;//router ı dışarı aktarıyoruz
