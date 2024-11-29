const { create, getByMonth } = require('./purchase.controller');

const router = require('express').Router();

router.get('/', (req, res) => { });
router.post('/', create);
router.get('/month/:month', getByMonth);
module.exports = router;
