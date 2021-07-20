const express = require('express');
const auth = require('../controllers/auth');

const router = express.Router();

router.post('/signin', auth.signIn);
router.post('/signup', auth.signUp);
router.post('/signup', auth.signOut);


module.exports = router;
