const express = require('express');
const products = require('../controllers/products');
const validator = require('../middlewares/validator');
const uploader = require('../middlewares/uploader');

const router = express.Router();

router.get('/', products.getAllProducts);
router.get('/:id', products.getOneProduct);
router.post('/', uploader, validator.createProduct, products.createProduct);
router.put('/:id', uploader, validator.editProduct, products.editProduct);
router.delete('/:id', products.deleteProduct);

module.exports = router;
