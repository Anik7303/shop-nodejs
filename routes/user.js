const express = require('express');

const userController = require('../controllers/user');
const userValidator = require('../validators/user');

const router = express.Router();

router.get('/add-product', userController.getAddProduct);
router.get('/dashboard', userController.getDashboard);

router.post('/add-product', userValidator.product, userController.postAddProduct);

module.exports = router;
