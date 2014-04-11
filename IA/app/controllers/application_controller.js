/*
 * GET home page.
 */

exports.index = function(req, res) {
    if (!req.isAuthenticated()){
        res.render('layouts/index.html', 
            {
                title: 'App'
            }
        )
    }
    else {
        res.redirect('/elements')
    }
}


exports.login = function(req, res){
    if (!req.isAuthenticated()){
        res.render('layouts/index.html', 
            {
                title: 'App :: Login'
            }
        )
    }
    else {
        res.render('layouts/home.html', { title: 'Home'})
    }
}

exports.signup = function(req, res){

    /*
     * Es posible utilizar signup si y sólo si
     * no existe ningún usuario en la BD
     */

    var mongoose = require('mongoose')
      , User = mongoose.model('User')

    User.count().exec(function (err, count) {
        if (err) {
            req.flash('error', 'No ha sido posible conectarse a la colección de usuarios')
            res.redirect('/')
        }
        else if (count > 0) {
            req.flash('info', 'For security reasons the register through "signup url" can be used once')
            
            res.redirect('/')
        }
        else {
            var user = new User()
            res.render('layouts/signup.html', 
                {
                    title: 'App :: Signup',
                    user: user
                }
            )
        }
    })
};


/*
  api
*/
var api = require('./../api/api.js')

/*
  net
*/
const net = require("net");

var server = net.createServer(function (client) {    
    client.on('data', function(data) {      
        api.mensajeDesdeNet(client, data)
    });    

    server.on('error', function(err){
        api.mensajeDesdeNet(client, err)
    });

    server.on('end', function(err){
        api.mensajeDesdeNet(client, err);
    });

});

// Listen for connections
server.listen(8001, "localhost", function () {
    console.log("server creado");
});
server._maxListeners =0;

/*socket.io*/
var io = require('socket.io').listen(8000);
io.sockets.on('connection', function (socket) {    
  api.mensajeDesdeSocket(socket, "entro un cliente");
  socket.on("mensaje",function(mensaje){
    api.mensajeDesdeSocket(socket, mensaje);
  });
});
