const express = require('express');

const authController = require('../controllers/auth');
const authValidator = require('../validators/auth');

const router = express.Router();

router.get('/signup', authController.getSignup);

router.post('/signup', authValidator.signup, authController.postSignup);

module.exports = router;
