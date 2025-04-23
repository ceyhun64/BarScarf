const express = require('express');
const router = express.Router();

const colorsizeController = require("../controllers/color-size");


router.get("/sizes", colorsizeController.get_sizes);

module.exports = router;