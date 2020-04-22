const { body } = require('express-validator');

module.exports.product = [
    body('title')
        .trim()
        .not().isEmpty().withMessage('Please provide a title for the product')
        .isLength({ min: 4, max: 30 }).withMessage('Product title should be between 5 to 30 characters'),
    body('price')
        .trim()
        .not().isEmpty().withMessage('Please provide a price for the product')
        .isFloat(),
    body('description')
        .trim()
        .not().isEmpty().withMessage('Please provide a brief introduction of the product')
        .isString()
];
