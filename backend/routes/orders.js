const express = require('express');
const orders = require('../controllers/orders');
const validator = require('../middlewares/validator');

const router = express.Router();

router.get('/', orders.getAllOrders);
router.get('/:id', orders.getOneOrder);
router.post('/', validator.createOrder, orders.createOrder);
router.put('/:id', validator.editOrder, orders.editOrder);
router.delete('/:id', orders.deleteOrder);

module.exports = router;