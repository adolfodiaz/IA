
module.exports = function (app, passport, auth) {

    /* 
     * Según la documentación de ruby on rails:
     * 
     * Verb    Path                 action   used for
     * 
     * GET     /photos              index    display a list of all photos
     * GET     /photos/new          new      return an HTML form for creating a new photo
     * POST    /photos              create   create a new photo
     * GET     /photos/:id          show     display a specific photo
     * GET     /photos/:id/edit     edit     return an HTML form for editing a photo
     * PUT     /photos/:id          update   update a specific photo
     * DELETE  /photos/:id          destroy  delete a specific photo
     * 
     * // resources controller
     * var resources = require('../app/controllers/resources')
     * app.get('/resources', resources.index)
     * app.get('/resources/new', resources.new)
     * app.post('/resources', resources.create)
     * app.get('/resources/:resource_id', resources.show)
     * app.get('/resources/:resource_id/edit', resources.edit)
     * app.put('/resources/:resource_id', resources.update)
     * app.del('/resources/:resource_id', resources.destroy)    
     * app.param('resource_id', resources.resource)
     * 
     */

    // application controller
    var application_controller = require('../app/controllers/application_controller')
    app.get('/', application_controller.index)
    app.get('/signup', application_controller.signup)
    app.get('/login', application_controller.login)

    // Users controller
    var users = require('../app/controllers/users')
    
    // Session
    app.post('/signup', users.signup)
    app.post('/login', passport.authenticate('local', {failureRedirect: '/', failureFlash: 'Correo o contraseña incorrecta'}), users.session)
    app.get('/logout', users.logout)    
    
    // User crud
    app.get('/users', auth.requiresLogin, auth.requiresSuperAdmin, users.index)
    app.get('/users/new', auth.requiresLogin, auth.requiresSuperAdmin, users.new)
    app.post('/users', auth.requiresLogin, auth.requiresSuperAdmin, users.create)
    app.get('/users/:user_id', auth.requiresLogin, users.show)
    app.get('/users/:user_id/edit', auth.requiresLogin, auth.user.hasAuthorization, users.edit)
    app.put('/users/:user_id', auth.requiresLogin, auth.user.hasAuthorization, users.update)
    app.del('/users/:user_id', auth.requiresLogin, auth.requiresSuperAdmin, users.destroy)
    app.param('user_id', users.user)

    // elements controller
    var elements = require('../app/controllers/elements')
    app.get('/elements', auth.requiresLogin, auth.requiresSuperAdmin, elements.index)
    app.get('/elements/new', auth.requiresLogin, auth.requiresSuperAdmin, elements.new)
    app.post('/elements', auth.requiresLogin, auth.requiresSuperAdmin, elements.create)
    app.get('/elements/:element_id', auth.requiresLogin, auth.requiresSuperAdmin, elements.show)
    app.get('/elements/:element_id/edit', auth.requiresLogin, auth.requiresSuperAdmin, elements.edit)
    app.put('/elements/:element_id', auth.requiresLogin, auth.requiresSuperAdmin, elements.update)
    app.get('/elements/:element_id/delete', auth.requiresLogin, auth.requiresSuperAdmin, elements.delete)    
    app.del('/elements/:element_id', auth.requiresLogin, auth.requiresSuperAdmin, elements.destroy)    
    app.param('element_id', elements.element)

    // Juegos controller
    var juegos = require('../app/controllers/juegos')
    app.get('/juegos', auth.requiresLogin, auth.requiresSuperAdmin, juegos.index)


}