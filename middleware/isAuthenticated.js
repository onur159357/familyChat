//password js ile login olduğumuzda password js request nesnesine isAuthenticated() adında bir fonksiyon atıyor
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated())
        next();
    else 
        res.redirect('/user/login');
}

module.exports = isAuthenticated;