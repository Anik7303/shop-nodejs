module.exports.getSignup = async (req, res, next) => {
    res.status(200).render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup'
    });
};