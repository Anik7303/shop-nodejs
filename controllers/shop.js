const Product = require('../models/product');

module.exports.getProducts = async (req, res, next) => {
    try {
        const totalProducts = await Product.find().countDocuments();
        const products = await Product.find().populate('user');
        if(totalProducts && totalProducts > 0) {
            res.status(200).render('product/product-list', {
                pageTitle: 'Products',
                path: '/products',
                products: products,
                totalProducts: totalProducts,
                errors: null
            });
        } else {
            res.status(200).render('product/product-list', {
                pageTitle: 'Products',
                path: '/products',
                products: [],
                totalProducts: 0,
                errors: null
            });
        }
    } catch(error) {
        error.statusCode = 500;
        next(error);
    }
};

module.exports.getProduct = async (req, res, next) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId).populate('user');
        if(!product) {
            return res.status(404).redirect('/');
        }
        res.status(200).render('product/product-details', {
            pageTitle: product.title,
            path: '/products',
            product: product
        });
    } catch(error) {
        error.statusCode = 500;
        throw error;
    }
};
