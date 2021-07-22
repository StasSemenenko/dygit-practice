const express = require('express');
const auth = require('./auth');
const products = require('./products');
const customers = require('./customers');
const orders = require('./orders');
const tokenizer = require('../middlewares/tokenizer');

const router = express.Router();

router.use('/auth', auth);
router.use('/products', tokenizer, products);
router.use('/customers', tokenizer, customers);
router.use('/orders', tokenizer, orders);

module.exports = router;
