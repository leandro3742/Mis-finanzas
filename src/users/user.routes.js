// const { create, getByMonth } = require('./purchase.controller');

const { create, signin, addPaymentMethod, getPaymentMethods } = require('./user.controller');

const router = require('express').Router();

const { verifyToken } = require('../middlewares/verifyToken');

router.get('/', (req, res) => { });
router.post('/', create);
router.post('/sign-in', signin);
router.post('/add-payment-method', verifyToken, addPaymentMethod);
router.get('/payments-methods', verifyToken, getPaymentMethods);
module.exports = router;

