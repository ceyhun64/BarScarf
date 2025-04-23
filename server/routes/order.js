const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const orderController = require('../controllers/order');

//kullanıcının kendi sipariş detaylarını getirme
router.get("/my-orders/:id", verifyToken, orderController.get_my_order_details);

// Kullanıcının kendi siparişlerini getirme
router.get("/my-orders", verifyToken, orderController.get_my_orders);

//tüm siparişleri getirme
router.get("/", verifyToken, isAdmin, orderController.get_orders);;

//id ye göre sipariş getirme
router.get("/:id", verifyToken, isAdmin, orderController.get_order_by_id);

// sipariş detayını getirme
router.get("/details/:id", verifyToken, isAdmin, orderController.get_order_details);

//sipariş oluşturma
router.post("/", verifyToken, orderController.create_order);

//sipariş güncelleme
router.put("/:id", verifyToken,orderController.update_order);

//siparişi silme
router.delete("/:id", verifyToken, isAdmin, orderController.delete_order);

//siparişi iptal etme
router.put("/:id/cancel", verifyToken, orderController.cancel_order);

module.exports = router;