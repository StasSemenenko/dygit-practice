const express = require('express');
const customers = require('../controllers/customers');
const validator = require('../middlewares/validator');

const router = express.Router();

router.get('/', customers.getAllCustomers);
router.get('/:id', customers.getOneCustomer);
router.post('/', validator.createCustomer, customers.createCustomer);
router.put('/:id', validator.editCustomer, customers.editCustomer);
router.delete('/:id', customers.deleteCustomer);

module.exports = router;