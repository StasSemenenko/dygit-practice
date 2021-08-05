const express = require('express');
const sellers = require('../controllers/sellers');
const validator = require('../middlewares/validator');
const uploader = require('../middlewares/uploader');

const router = express.Router();

router.get('/', sellers.getAllSellers);
router.get('/:id', sellers.getOneSeller);
router.put('/:id', validator.editSeller, uploader, sellers.editSeller);
router.delete('/:id', sellers.deleteSeller);

module.exports = router;