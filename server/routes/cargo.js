const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');
const cargoController = require('../controllers/cargo');

router.post('/send', cargoController.send_cargo);

router.post('/token', cargoController.get_token);

router.post('/create-order', verifyToken, cargoController.create_order);

module.exports = router;
