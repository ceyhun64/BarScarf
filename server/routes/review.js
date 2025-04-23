const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

const reviewController = require('../controllers/review');

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


module.exports = router;
