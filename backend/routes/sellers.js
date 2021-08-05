const express = require('express');
const sellers = require('../controllers/sellers');
const validator = require('../middlewares/validator');
const uploader = require('../middlewares/uploader');

const router = express.Router();

router.get('/', sellers.getAllSellers);
router.get('/profile', sellers.getProfile);
router.put('/profile', uploader, validator.editSeller, sellers.editProfile);
router.delete('/:id', sellers.deleteSeller);

module.exports = router;