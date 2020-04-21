module.exports.getProducts = async (req, res, next) => {
    res.status(200).render('shop/product-list', {
        pageTitle: 'Products',
        path: '/products'
    });
};
