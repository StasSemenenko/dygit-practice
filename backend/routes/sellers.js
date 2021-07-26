const express = require('express');
const sellers = require('../controllers/sellers');

const router = express.Router();

router.get('/', sellers.getAllSellers);
router.get('/:id', sellers.getOneSeller);
router.delete('/:id', sellers.deleteSeller);

module.exports = router;