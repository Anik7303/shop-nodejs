module.exports.getIndex = (req, res, next) => {
    res.status(200).render('error/index', {
        pageTitle: 'ERROR!',
        path: '/error'
    });
};
