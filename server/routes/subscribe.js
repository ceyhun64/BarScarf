const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

const subscribeController = require('../controllers/subscribe');

//abone olma
router.post('/', subscribeController.createSubscribe);

//aboneleri görüntüleme
router.get('/', verifyToken, isAdmin, subscribeController.getSubscribers);

//aboneleri mail atma
router.post('/send-mail', verifyToken, isAdmin, subscribeController.sendMailToSubscribers);

module.exports = router;