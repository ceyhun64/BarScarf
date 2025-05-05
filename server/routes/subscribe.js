//subscribe apisi
const express = require('express');//express kütüphanesini dahil ettik
const router = express.Router();//express kütüphanesini kullanarak bir router oluşturduk

const verifyToken = require('../middlewares/verifyToken');//verifyToken middleware'ini dahil ettik
const isAdmin = require('../middlewares/isAdmin');//isAdmin middleware'ini dahil ettik
const subscribeController = require('../controllers/subscribe');//subscribe controller'ını dahil ettik

//abone olma
router.post('/', subscribeController.createSubscribe);

//aboneleri görüntüleme
router.get('/', verifyToken, isAdmin, subscribeController.getSubscribers);

//aboneleri mail atma
router.post('/send-mail', verifyToken, isAdmin, subscribeController.sendMailToSubscribers);

module.exports = router;