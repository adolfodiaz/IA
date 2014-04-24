module.exports = function(req, res, next) {
    res.locals.csrf_token = req.session._csrf
    res.locals.is_authenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.flash = function() {return req.flash()}
    
    next()
}