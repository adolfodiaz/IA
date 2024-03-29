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
        api.signUp(req.user.fullname);        
        res.redirect('/juegos')
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
var MessageReceiver = require('./../api/protocol/messageReceiver.js');
var messageReceiver = new MessageReceiver.messageReceiver();



/*
  net
*/
const net = require("net");

var server = net.createServer(function (client) {    
    client.on('data', function(data) {      
        messageReceiver.messageFromNet(client, data);
    });    

    client.on('error', function(err){
        console.log("error");
        //api.messageFromNet(client, err);
    });

    client.on('end', function(err){
        console.log("end");
        //api.messageFromNet(client, err);
    });

});

var os = require('os')

var interfaces = os.networkInterfaces();
var addresses = [];
var ipServer;
for (k in interfaces) {
    for (k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family == 'IPv4' && !address.internal) {
            ipServer = address.address;
        }
    }
}



// Listen for connections
//server.listen(7075, ipServer, function () { //descomentar para conectarce si no esta con localhost desde el agente
server.listen(7075, "localhost", function () { //para conectarce por localhost desde el agente
    console.log("server creado");
});
server._maxListeners =0;

/*socket.io*/
var io = require('socket.io').listen(7076);
io.set('log level',1);
io.sockets.on('connection', function (socket) {
  socket.on("data",function(data){    
    messageReceiver.messageFromSocket(socket, data);
  });
});
