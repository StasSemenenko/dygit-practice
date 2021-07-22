const express = require('express');
const products = require('../controllers/products');
const validator = require('../middlewares/validator');

const router = express.Router();

router.get('/', products.getAllProducts);
router.get('/:id', products.getOneProduct);
router.post('/', validator.createProduct, products.createProduct);
router.put('/:id', validator.editProduct, products.editProduct);
router.delete('/:id', products.deleteProduct);

module.exports = router;
