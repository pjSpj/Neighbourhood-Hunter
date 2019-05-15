exports = module.exports={}
exports.signup=function(req,res){
    res.render('signup')
}

exports.signin = function(req, res) {
    res.render('signin');
}

exports.favourites = function(req, res) {
    res.render('favourites');
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}