const express = require('express');

const userController = require('../controllers/user');
const userValidator = require('../validators/user');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, userController.getAddProduct);
router.get('/dashboard', isAuth, userController.getDashboard);

router.post('/add-product', isAuth, userValidator.product, userController.postAddProduct);

module.exports = router;
