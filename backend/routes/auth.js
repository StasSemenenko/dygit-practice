const express = require('express');
const auth = require('../controllers/auth');
const validator = require('../middlewares/validator');
const uploader = require('../middlewares/uploader');

const router = express.Router();

router.post('/signup', uploader, validator.createUser,  auth.signUp);
router.post('/signin', auth.signIn);
router.get('/signout', auth.signOut);

module.exports = router;
