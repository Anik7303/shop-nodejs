const express = require('express');

const authController = require('../controllers/auth');
const authValidator = require('../validators/auth');
const isLogged = require('../middlewares/is-logged');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.get('/signup', isLogged, authController.getSignup);
router.get('/login', isLogged, authController.getLogin);

router.post('/signup', isLogged, authValidator.signup, authController.postSignup);
router.post('/login', isLogged, authValidator.login, authController.postLogin);
router.post('/logout', isAuth, authController.postLogout);

module.exports = router;
