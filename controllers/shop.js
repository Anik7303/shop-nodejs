const Product = require('../models/product');

module.exports.getProducts = async (req, res, next) => {
    try {
        const totalProducts = await Product.find().countDocuments();
        const products = await Product.find().populate('user');
        if(totalProducts && totalProducts > 0) {
            res.status(200).render('shop/product-list', {
                pageTitle: 'Products',
                path: '/products',
                products: products,
                totalProducts: totalProducts
            });
        } else {
            res.status(200).render('shop/product-list', {
                pageTitle: 'Products',
                path: '/products',
                products: [],
                totalProducts: 0
            });
        }
    } catch(error) {
        error.statusCode = 500;
        next(error);
    }
};
