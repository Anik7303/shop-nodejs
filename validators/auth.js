const { body } = require('express-validator');

const User = require('../models/user');

module.exports.signup = [
    body('name')
        .not()
        .isEmpty().withMessage('Name is required')
        .isString()
        .isLength({ min: 5, max: 30 }).withMessage('Name has to be between 5 to 30 characters'),
    body('email')
        .isEmail().withMessage('Please provide a valid email')
        .custom((value) => {
            return User.findOne({ email: value })
                .then(user => {
                    if(user) return Promise.reject('A user with this email already exists, please try another email');
                });
        }),
    body('password')
        .not()
        .isEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password should be atleast 8 characters long'),
    body('confirmPassword')
        .not()
        .isEmpty().withMessage('Please type password again in \'Confirm Password\'')
        .custom((value, { req }) => {
            if(value !== req.body.password) throw new Error('Passwords do not match');
            return true;
        })
];

module.exports.login = [
    body('email')
        .trim()
        .isEmail().withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password should be atleast 8 character long')
        .isString()
];
