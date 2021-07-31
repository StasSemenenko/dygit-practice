const express = require('express');
const sellers = require('../controllers/sellers');
const validator = require('../middlewares/validator');

const router = express.Router();

router.get('/', sellers.getAllSellers);
router.get('/:id', sellers.getOneSeller);
router.put('/:id', validator.editSeller, sellers.editSeller);
router.delete('/:id', sellers.deleteSeller);

module.exports = router;