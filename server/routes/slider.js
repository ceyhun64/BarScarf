const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/slider');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', verifyToken, isAdmin, sliderController.get_slider);

router.post('/', verifyToken, isAdmin, sliderController.create_slider);