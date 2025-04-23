const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const favoriteController = require("../controllers/favorite");

// Favorileri listeleme
router.get("/", verifyToken, favoriteController.get_favorites);

// Favori ekleme
router.post("/", verifyToken, favoriteController.add_favorite);

// Favori silme
router.delete("/:productId", verifyToken, favoriteController.delete_favorite);

module.exports = router;