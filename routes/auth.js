const express = require('express');

const authController = require('../controllers/auth');
const authValidator = require('../validators/auth');

const router = express.Router();

router.get('/signup', authController.getSignup);

router.get('/login', authController.getLogin);

router.post('/signup', authValidator.signup, authController.postSignup);

router.post('/login', authValidator.login, authController.postLogin);

module.exports = router;
