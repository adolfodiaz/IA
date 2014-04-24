
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('warning', 'Debes iniciar sesión para acceder al contenido')
        return res.redirect('/login')
    }
    next()
}

exports.requiresSuperAdmin = function (req, res, next) {
    if (!req.user.isSuperAdmin) {
        req.flash('warning', 'Acceso denegado')
        return res.redirect('/')
    }
    next()
}


/*
 *  User authorizations routing middleware
 */

exports.user = {
    hasAuthorization: function (req, res, next) {
        if (req.profile.id != req.user.id) {
            if (!req.user.isSuperAdmin) {
                req.flash('warning', 'Acceso denegado')
                return res.redirect('/')
            }
        }
        next()
    }
}