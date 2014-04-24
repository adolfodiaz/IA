/**
 * Resource: user (User)
 * Key: name
 */

var url_base = '/users'
var templates = {
    'index': 'users/index.html',
    'new': 'users/new.html',
    'show': 'users/show.html',
    'edit': 'users/edit.html',
    'signup': 'layouts/signup.html'
}

/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , _ = require('underscore')
  , utils = require('../../lib/utils')
  , User = mongoose.model('User')


/**
 * Logout
 */

exports.logout = function (req, res) {
    req.logout()
    res.redirect('/')
}

/**
 * Session
 */

exports.session = function (req, res) {
    res.redirect('/')
}

/**
 * Create user
 */

exports.signup = function (req, res) {
    var user = new User(req.body)    
    user.provider = 'local'

    user.isSuperAdmin = true
    user.isSupraAdmin = true

    user.save(function (err) {
        if (err) {
            return res.render(templates.signup, { 
                title: 'Sign up',
                errors: err.errors, 
                user: user 
            })
        }

        /* 
         * Passport exposes a login() function on req (also aliased as logIn()) 
         * that can be used to establish a login session.
         */
        req.logIn(user, function(err) {
            if (err) return next(err)
            return res.redirect('/')
        })
    })
}


/**
 * Find user by id
 */
exports.user = function(req, res, next, id){
    User.load(id, function (err, user) {
        if (err) 
            return next(err)

        if (!user) 
            return next(new Error('Cannot find user ' + id))

        // Se utiliza req._user ya que req.user es setteado por el componente de autentificacion
        req._user = user
        req.profile = user
        next()
    })
}

/**
 * List of Users
 */
exports.index = function(req, res){
    var page = req.param('page') > 0 ? req.param('page') : 0
    , perPage = 20
    , options = {
        perPage: perPage,
        page: page
    }

    User.list(options, function(err, users) {
        if (err) return res.render('500')
        
        User.count().exec(function (err, count) {
            res.render(templates.index, {
                title: 'List of users',
                users: users,
                pagination: utils.pagination(req.url, page, (count/perPage))
            })
        })
    })
}

exports.new = function(req, res){
    res.render(templates.new, {
        title: 'New User',
        _user: new User({})
    })
}
exports.create = function (req, res) {
    var _user = new User(req.body)

    // Se analiza el tipo de usuario
    var userType = req.body.userType
    if (userType == 'superAdmin') {
        _user.isSuperAdmin = true
        _user.isStaff = true
    }
    else if (userType == 'staff') {
        _user.isStaff = true
    }
    else {
        // visita
    }

    _user.save(function (err) {
        if (err) {
            res.render(templates.new, {
                title: 'New User',
                user: _user,
                errors: err.errors
            })
        }
        else {
            req.flash('success', 'User has been created')
            res.redirect(url_base + '/' + _user._id)
        }
    })
}

exports.edit = function (req, res) {
    res.render(templates.edit, {
        title: 'Edit '+ req._user.fullname,
        _user: req._user,
    })
}

exports.update = function(req, res){
    var _user = req._user
    _user.lastUser = req.user

    // Se analiza el tipo de usuario
    var userType = req.body.userType
    if (userType == 'superAdmin') {
        _user.isSuperAdmin = true
        _user.isStaff = true
    }
    else if (userType == 'staff') {
        _user.isSuperAdmin = false
        _user.isStaff = true
    }
    else {
        // visita
        _user.isSuperAdmin = false
        _user.isStaff = false
    }
    
    // Si el password enviado es blanco
    // entonces no considerarlo para modificacion
    if (req.body.password == '')
        delete req.body.password

    // Si el usuario es superAdmin y
    // Si el select de obras está vacio
    // entonces se debe setear un arreglo vacio al usuario
    if (req.user.isSuperAdmin)
        if (!req.body.obras)
            req.body.obras = []

    _user = _.extend(_user, req.body) 
    _user.save(function(err) {
        if (err) {
            res.render(templates.edit, {
                title: 'Edit user',
                _user: _user,
                errors: err.errors
            })
        }
        else {
            req.flash('success', 'User has been updated')
            res.redirect(url_base + '/' + _user._id)
        }
    })
}

exports.show = function(req, res){
    res.render(templates.show, {
        title: req._user.fullname,
        fullname: req._user.fullname,
        _user: req._user
    })
}

exports.destroy = function(req, res){
    // req.flash('error', 'No es posible eliminar usuarios del sistema')
    // res.redirect(url_base)

    var _user = req._user
    if (_user.isSupraAdmin) {
        req.flash('error', 'SupraAdmin cannot be deleted')
        res.redirect(url_base)
    } 
    else {
        _user.isActive = false
        _user.save(function(err) {
            if (err) {
                req.flash('error', 'Something was wrong deactivating user')
                res.redirect(url_base + '/' + _user._id)
            }
            else {
                req.flash('info', 'User has been deactivated')
                res.redirect(url_base + '/' + _user._id)
            }
        })
    }
}
