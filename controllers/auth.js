const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports.getSignup = async (req, res, next) => {
    res.status(200).render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup',
        oldInputs: null
    });
};

module.exports.postSignup = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            pageTitle: 'Signup',
            path: '/signup',
            oldInputs: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
            error: {
                message: errors.array().map(error => error.msg),
                data: errors.array()
            }
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        console.log(user);

        const updatedUser = await user.save();
        if(updatedUser) {
            res.redirect('/login');
        } else {
            res.status(403).render('auth/signup', {
                pageTitle: 'Signup',
                path: '/signup',
                oldInputs: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                },
                error: {
                    message: 'Something went wrong, user signup failed!'
                }
            });
        }
    } catch(error) {
        error.statusCode = 500;
        throw error;
    }

};
