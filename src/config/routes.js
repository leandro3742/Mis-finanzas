const express = require('express');

const router = express.Router();

router.use('/generate', require('./generate.routes'));
router.use('/purchase', require('../purchase/purchase.routes'));
router.use('/users', require('../users/user.routes'));
module.exports = router;