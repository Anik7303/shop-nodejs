const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports.getSignup = async (req, res, next) => {
    res.status(200).render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup',
        oldInputs: null,
        errors: null
    });
};

module.exports.getLogin = async (req, res, next) => {
    res.status(200).render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        oldInputs: null,
        errors: null
    });
};

module.exports.postSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            pageTitle: 'Signup',
            path: '/signup',
            oldInputs: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
            errors: {
                messages: errors.array().map(error => error.msg),
                data: errors.array(),
                status: 422
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
                errors: {
                    messages: ['Something went wrong, user signup failed!'],
                    data: null,
                    status: 403
                }
            });
        }
    } catch(error) {
        error.statusCode = 500;
        throw error;
    }
};

module.exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).render('auth/login', {
            pageTitle: 'Login',
            path: '/login',
            oldInputs: {
                email: req.body.email,
                password: req.body.password
            },
            errors: {
                messages: errors.array().map(error => error.msg),
                data: errors.array(),
                status: 422
            }
        });
    }
    try {
        const authErrors = { messages: [], data: [], status: 401 };
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            authErrors.messages.push('Email is not associated with an account');
            authErrors.data.push({
                msg: 'Email is not associated with an account',
                param: 'email'
            });
        } else {
            const isEqual = await bcrypt.compare(req.body.password, user.password);
            if(!isEqual) {
                authErrors.messages.push('Incorrect password');
                authErrors.data.push({
                    msg: 'Incorrect password',
                    param: 'password'
                });
            }
        }
        if(authErrors.messages.length > 0) {
            return res.status(authErrors.status).render('auth/login', {
                pageTitle: 'Login',
                path: '/login',
                oldInputs: {
                    email: req.body.email,
                    password: req.body.password
                },
                errors: authErrors
            });
        }
        res.status(200).redirect('/');
    } catch(error) {
        error.statusCode = 500;
        throw error;
    }
};
