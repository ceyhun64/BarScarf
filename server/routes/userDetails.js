const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

const userDetailsController = require('../controllers/userDetails');

router.get('/user', verifyToken, userDetailsController.get_user_details_by_id);

router.get('/:id', verifyToken, isAdmin, userDetailsController.get_user_details_by_user_id);

router.get('/', verifyToken, isAdmin, userDetailsController.get_user_details);

router.post('/', verifyToken, userDetailsController.create_user_details);

router.put('/', verifyToken, userDetailsController.update_user_details);

router.delete('/', verifyToken, userDetailsController.delete_user_details);

module.exports = router;