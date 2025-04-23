const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

const paymentController = require('../controllers/payment');

router.post('/', verifyToken, paymentController.createPayment);

module.exports = router;
