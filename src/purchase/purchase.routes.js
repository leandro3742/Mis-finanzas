const { create, getByMonth, deletePurchase } = require('./purchase.controller');

const router = require('express').Router();

router.get('/', (req, res) => { });
router.post('/', create);
router.get('/month/:month', getByMonth);
router.delete('/:id', deletePurchase);
module.exports = router;
