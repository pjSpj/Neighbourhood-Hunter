const authController = require('../controllers/authcontroller');

module.exports = function(app,passport){
    app.get('/signup',authController.signup);
    app.get('/signin', authController.signin);
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/favourites',
        failureRedirect: '/signup'
    }
    ));

    app.post('/signin', passport.authenticate('local-signup', {
        successRedirect: '/favourites',
        failureRedirect: '/signin'
    }
    ));
    
    app.get('/favourites',isLoggedIn, authController.favourites);
    app.get('/logout',authController.logout);
    
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();             
        res.redirect('/signin');
    }
}




