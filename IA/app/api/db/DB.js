function DB(){
	
	var mongoose = require('mongoose');
	/*mongoose.connect('mongodb://localhost/myapp');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
  		// yay!
	});

*/
	

	var ObjectId = mongoose.Schema.Types.ObjectId;

	var partidaSchema =mongoose.Schema({

		jugador1 : ObjectId,
		jugador2 : ObjectId,
		roundTime : Number ,
		turnTime : Number,
		roundNumber : Number,
		Boardsize : [Number]
	})

	var Partida = mongoose.model('Partida', partidaSchema)

	/*fluffy.save(function (err, fluffy) {
	  if (err) return console.error(err);
	  
	});
	beto.save(function (err, beto) {
	  if (err) return console.error(err);
	  
	});*/
	/*usuario.find(function (err, users) {
  			if (err) return console.error(err);
  			console.log(users)
	})  
	*/
	var usuario = mongoose.model('User')
	//var felipe = 
	this.saludar = function(saludar){
		saludar();
		
		/*usuario.find(function (err, users) {
  			if (err) return console.error(err);
  			console.log(users)
		})*/
		//prueba mostrar id del usuario preguntando por su fullname
		/*usuario.findOne({ fullname: 'felipin' }, 'fullname email _id', function (err, usuario) {
  		if (err) return handleError(err);
  				console.log(usuario._id) // Space Ghost is a talk show host.
		})*/
	
	}
	this.obtener_id= function(obtener_id,username){
		usuario.findOne({ fullname: username }, 'fullname email _id', function (err, usuario) {
  		if (err) return handleError(err);
  				console.log(usuario) // muestra fullname email e id
		})
		obtener_id();
	}

	this.guardar_partida = function(jug1,jug2,roundtime,turntime,roundnumber,boardsize){
		/*var una_partida= new Partida({jugador1: jug1,jugador2: jug2, roundTime: roundtime, 
									turnTime:turntime, roundNumber: roundnumber, Boardsize: boardsize});
		Partida.find(function (err, partidas) {
  			if (err) return console.error(err);
  			console.log(partidas)
		})*/
	}


	
}

//BD myapp -> db.users.find() muestra todos los usuarios

module.exports.DB = DB;