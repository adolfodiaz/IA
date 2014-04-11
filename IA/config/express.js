/**
 * Module dependencies.
 */

var express = require('express')
  , env = process.env.NODE_ENV || 'development'
  , path = require('path')
  , mongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash')
  , lessMiddleware = require('less-middleware')
  , lessOptions = {}
  , nunjucks = require('nunjucks')
  , nunEnv = undefined

module.exports = function (app, config, passport) {

    /* all environments */
    
    // should be placed before express.static
    app.use(express.compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
        },
        level: 9
    }))

    // Nunjucks template engine
    nunEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(config.root + '/app/views'))
    // nunEnv = new nunjucks.Environment()
    // nunjucks.precompile(config.root + '/app/views', { env: nunEnv })
    nunEnv.express(app)

    app.use(express.favicon())
    // app.use(express.favicon(config.root + '/public/img/favicon-30.png')); 

    if (env == 'development') 
        app.use(express.logger('dev'))

    // cookieParser debe estar sobre el manejo de sesiones
    app.use(express.cookieParser())

    // Manejo de formularios
    app.use(express.bodyParser())
    app.use(express.methodOverride())
    
    // Use less middleware
    lessOptions.src = config.root + '/public'
    if (env == 'production') {
        lessOptions.compress = true
        lessOptions.yuicompress = true
        lessOptions.once = true
    }

    app.use(lessMiddleware(lessOptions))
    app.use(express.static(path.join(config.root, 'public')))
    
    // express/mongo session storage
    app.use(express.session({
        secret: 'boilerplatejs',
        store: new mongoStore({
            url: config.db
            , collection : 'sessions'
        })
    }))

    // connect flash for flash messages
    app.use(flash())

    // use passport session
    app.use(passport.initialize())
    app.use(passport.session())
    
    // adds CSRF support
    // TODO: agregar soporte csrf con ajax
    app.use(express.csrf())

    // View-Helpers
    app.use(require('./middlewares/view-helpers'))

    app.use(app.router)

    // Assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next){
        // treat as 404
        if (~err.message.indexOf('not found')) 
            return next()
        
        // log it
        console.error(err)

        // error page
        res.status(500).render('500.html', { error: err.stack })
    })

    // Assume 404 since no middleware responded
    app.use(function(req, res, next){
        res.status(404).render('404.html', { url: req.originalUrl, error: 'Not found' })
    })
}
