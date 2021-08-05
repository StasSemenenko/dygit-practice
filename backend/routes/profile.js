const express = require('express');
const sellers = require('../controllers/profile');
const validator = require('../middlewares/validator');
const uploader = require('../middlewares/uploader');

const router = express.Router();

router.get('/', sellers.profile);
router.put('/', uploader, validator.editSeller, sellers.editProfile);

module.exports = router;