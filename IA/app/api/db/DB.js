function DB(){
	
	var mongoose = require('mongoose');
	var ObjectId = mongoose.Schema.Types.ObjectId;

/******************************************************************************************/
	var match_schema =  mongoose.Schema({
	  name: 	String, // Nombre de la partida, donde corresponde a quien creo la partida más fecha y hora de creación del match
	  create: 	String, //fecha y hora creación del match
	  ended: 	String, // fecha y hora finalizacion del match (se ingresa al acabar el match)
	  players: 	[String], // strings de usernames
	  max_time_turn: Number,
  	  max_time_round: Number,
  	  max_time_match: Number,
	  total_rounds: Number,
	  winnermatch: String,
	  rounds:   [{
		          create: String,//fecha hora creacion round
		          ended:    String,// fecha hora fin del round, se crea cuando finaliza el round
		          who_start : String, //username que empezo
		          moves: [{
			              player: String, //username que juega
			              time_turn: Number,//tiempo que se demora el jugador en jugar
			              move:{
			                  x: Number,
			                  y: Number
			              }
		          }],
		          height: Number,
		          width: Number,
		          winner: String, //username ganador
		          reason: String //razon 
	  }]
	 
	})



	var Match = mongoose.model('Match', match_schema)
	//var Partida = mongoose.model('Partida', partidaSchema)
	var usuario = mongoose.model('User')
	//var Round = mongoose.model('Round',roundSchema)
/********************************************************************************************************************************/

/********************************************************************************************************************************/

//funcion listar todos los usuarios por fullname o username
	this.obtener_usuarios_all=function(obtener_usuarios_all){
		usuario.find({}, 'fullname', function (err, usuarios) {
			if (err) return console.error(err);
			//console.log(matches);//muestra la lista de partidas
			obtener_usuarios_all(usuarios);
		})

	}
/********************************************************************************************************************************/

/********************************************************************************************************************************/	
//FUNCION GUARAR CON SCHEMA DEFINITIVO
//el nombre de partida debe crearse en la api con la fecha de creacion y nombre de usuario creador, estos datos seran parametros
//de entrada
	this.guardar_match =function(guardar_match,nombre_match,creacion,jugador1,jugador2,tiempomax_turn,tiempomax_round, round_totales,tiempomax_partida){

		console.log("voy a guardar MATCH")
		var jugadores= new Array();
		jugadores= [jugador1,jugador2];
		var una_partida= new Match({name: nombre_match,create: creacion,players:jugadores,max_time_turn: tiempomax_turn,
  	  					max_time_round: tiempomax_round,total_rounds: round_totales,max_time_match:tiempomax_partida});	
  	  	console.log("CREE VARIABLE MATCH")	
		una_partida.save(function (err,partida_guardada) {
		  if (err) return console.error(err);
		 	console.log("guarde")
		 	guardar_match(partida_guardada);
		  	// saved!
		})

	}	
/********************************************************************************************************************************/

/********************************************************************************************************************************/
//funcion guardar final del match
	this.guardar_fin_match=function(guardar_fin_match,nombre_match,fin_match,ganador_match){
		
		//primero se calcula quien ganó mas partidas
		//var cuantoJ1;
		//var cuantoJ2;
		/*Match.findOne( {name : nombre_match},'players', function(err,jugadores){
   			if (err) return console.error(err);
  				//console.log("ver partidas guardadasde jugador1");
  				//console.log(partidas);
  				Match.count({'rounds.winner': jugadores[0]}, function( err, cuantoj1){
    				console.log( "Numero de partidas ganadas por J1: "+cuantoj1 );
    		
				});
  				//obtener_partidas_username(matches);//Devuelve el arreglo de todas las partidas en que esta nombre_usuario
		});
		*/
		
		
		
		Match.update({name: nombre_match},{ended: fin_match,winnermatch:ganador_match},{upsert:true},function(err){
	        if(err){
	                console.log(err);
	        }else{
	               // console.log("Successfully added");
	        }
	    });

	}
/********************************************************************************************************************************/

/********************************************************************************************************************************/
//funcion guardar round
//el parametro name_match tienen que darselo desde la aplicacion, para poder actualizar la partida o match correcto
	this.guardar_round=function(guardar_round,nombre_match,jugadas,creado, finalizado,quien_empieza,ganador,razon,alto,ancho){
		console.log("Voy a guardar un round en partida :"+nombre_match);
		//var moves=new Array();
		//console.log(jugadas[0].player);
		//moves=jugadas;
		var round= {
		          create: creado,//fecha hora creacion round
		          ended:    finalizado,// fecha hora fin del round, se crea cuando finaliza el round
		          who_start : quien_empieza, //username que empezo
		          moves: jugadas,

		          winner: ganador, //username ganador
		          reason: razon, //razon 
		          height: alto,
		          width: ancho
	  	}
	  	//console.log(round);
		//Match.update({ name: nombre_match }, { $push: { rounds:round }}, callback);

		Match.update({name: nombre_match},{$push: {rounds:round}},{upsert:true},function(err){
	        if(err){
	                console.log(err);
	        }else{
	               // console.log("Successfully added");
	        }
		});

		//Match.update({ name: nombre_match }, { $set: { rounds.push(round) }}, callback);
	
	}

/********************************************************************************************************************************/

/********************************************************************************************************************************/
//funcion para devolver todas los nombres de partida existentes (para poder recrearlas)
	this.obtener_partidas=function(obtener_partidas){

		
		Match.find({}, 'name players winnermatch', function (err, matches) {
			if (err) return console.error(err);
			//console.log(matches);//muestra la lista de partidas
			obtener_partidas(matches);
		})
		


	}
/********************************************************************************************************************************/

/********************************************************************************************************************************/
//obtener partidas por usuario
	this.obtener_partidas_username=function(obtener_partidas_username,nombre_usuario){
		
		//Match.find( { $or:[ {'players':nombre_usuario}, {'players[1]':nombre_usuario} ]},'name players winnermatch', function(err,matches){
		Match.find( {players : nombre_usuario},'name players winnermatch', function(err,matches){
   			if (err) return console.error(err);
  				//console.log("ver partidas guardadasde jugador1");
  				//console.log(partidas);
  				obtener_partidas_username(matches);//Devuelve el arreglo de todas las partidas en que esta nombre_usuario
		});

	}

/********************************************************************************************************************************/

/********************************************************************************************************************************/
//funcion para obtener todos los round jugados de la partida y todas sus jugadas
	this.obtener_rounds=function(obtener_rounds,name_match){
		Match.find({name:name_match},'name rounds', function (err, rondas) {
			if (err) return console.error(err);
			//console.log(rondas[0].rounds[0].moves);//muestra la lista de partidas
			//console.log(rondas[0].rounds[1].moves);//
			//console.log(rondas.rounds[1].moves);
			obtener_rounds(rondas);
		})
	}

/********************************************************************************************************************************/

/********************************************************************************************************************************/
//funcion para obtener todos los round jugados de la partida y sus respectivos ganadores
	this.obtener_rounds2=function(obtener_rounds2,name_match){
		Match.find({name:name_match}, 'name rounds.winner rounds.reason', function (err, rondas) {
			if (err) return console.error(err);
			//console.log(matches);//muestra la lista de partidas
			obtener_rounds2(rondas);
		})
	}

/********************************************************************************************************************************/

/********************************************************************************************************************************/
//funcion para obtener todos los datos de un round en especifico
	this.obtener_datos_round=function(obtener_datos_round,name_match,numero_round){
		//FALTA VER COMO DEVOLVER SOLO LA POSICION DEL ROUND del parametro numero_round
		Match.findOne({name:name_match },'rounds', function (err, rondas) {
		//Match.findOne({name:name_match }, function (err, rondas) {
			if (err) return console.error(err);
			//console.log(rondas.rounds[numero_round]);//muestra la lista de partidas

			obtener_datos_round(rondas.rounds[numero_round]);
		})
		/*Match.findOne({name: name_match}).lean().exec(function (err, rondas) {
    	// docs are plain javascript objects instead of model instances
    		if (err) return console.error(err);
			console.log(rondas.rounds[0]);//muestra la lista de partidas
			console.log(Array.isArray(rondas.rounds));
			obtener_datos_round(rondas);
		});*/
	}
/********************************************************************************************************************************/

/********************************************************************************************************************************/

	


}

//BD myapp -> db.users.find() muestra todos los usuarios

module.exports.DB = DB;