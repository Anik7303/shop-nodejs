const { validationResult } = require('express-validator');

const Product = require('../models/product');
const User = require('../models/user');

module.exports.getAddProduct = (req, res, next) => {
    res.status(200).render('product/edit-product', {
        pageTitle: 'Add Product',
        path: '/add-product',
        editing: false,
        oldInputs: null,
        errors: null
    });
};

module.exports.getDashboard = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user) {
            const error = new Error('user not found');
            error.statusCode = 404;
            throw error;
        }
        const totalProducts = await Product.find({ user: user._id }).countDocuments();
        const products = await Product.find({ user: user._id });
        if(totalProducts && totalProducts > 0) {
            res.status(200).render('user/dashboard', {
                pageTitle: 'Dashboard',
                path: '/dashboard',
                products: products,
                totalProducts: totalProducts,
                errors: null
            });
        } else {
            res.status(200).render('user/dashboard', {
                pageTitle: 'Dashboard',
                path: '/dashboard',
                products: [],
                totalProducts: 0,
                errors: null
            });
        }
    } catch(error) {
        error.statusCode = 500;
        throw error;
    }
};

module.exports.postAddProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).render('product/edit-product', {
            pageTitle: 'Add Product',
            path: '/add-product',
            editing: false,
            oldInputs: {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                image: req.body.image
            },
            errors: {
                messages: errors.array().map(error => error.msg),
                data: errors.array(),
                status: 422
            }
        });
    }

    if(!req.file) {
        return res.status(404).render('product/edit-product', {
            pageTitle: 'Add Product',
            path: '/add-product',
            editing: false,
            oldInputs: {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                image: req.body.image
            },
            errors: {
                messages: ['Please provide an image for the product'],
                data: null,
                status: 404
            }
        });
    }
    try {
        // const user = await User.findById(req.user._id);

        const product = new Product({
            title: req.body.title,
            price: req.body.price,
            imageUrl: '/' + req.file.path.replace('\\', '/'),
            description: req.body.description,
            user: req.user._id
        });

        const createdProduct = await product.save();
        if(!createdProduct) {
            return res.status(401).render('product/edit-product', {
                pageTitle: 'Add Product',
                path: '/add-product',
                editing: false,
                oldInputs: {
                    title: req.body.title,
                    price: req.body.price,
                    description: req.body.description,
                    image: req.body.image
                },
                errors: {
                    messages: ['something went wrong, product creation failed'],
                    data: null,
                    status: 401
                }
            });
        }
        res.status(201).redirect('/dashboard');
    } catch(error) {
        error.statusCode = 500;
        throw error;
    }
};
