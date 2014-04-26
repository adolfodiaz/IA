var Round = require('./Round.js').Round;
var Rules = require('./Rules.js').Rules;

var Board = require('./Board.js').Board;
var Player = require('./Player.js').Player;
var Match = require('./Match.js').Match;
var crypto = require('crypto');
var DB = require('./db/DB.js').DB;
var Q = require('q');

var MessageSender = require('./protocol/messageSender.js').messageSender;
var messageSender = new MessageSender();

db = new DB();

onlinePlayersList = new Object(); 
matchesList = new Object();
//para busqueda rapida
getPlayerNameForID = new Object();



function api(){	

	/*

		NOTA: Convención respuestas API

		Cuando llega un clientObject (OC), la API debe responder agregando el objeto OC.api, el cual tiene los siguientes atributos:

		- OC.api.resultado: true si la operación pedida fue exitosa, false si hay errores o no se pudo hacer
		- OC.api.datos: la información de salida si OC.api.resultado es TRUE
		- OC.api.razones: las razones por las cuales la operación falló (sólo se lee si OC.api.resultado es FALSE)
		- OC.api.noEnviar: cuando no se debe enviar ningún mensaje al cliente que llamó (por ejemplo, cuando se reciben confirmaciones)
		- OC.api.enviarAmbos: significa que, aparte de enviarle una respuesta al cliente que la originó, hay que enviar una COPIA
		- OC.api.player: indica el nombre del jugador (¡no el objeto!) al cual se le enviaría la copia del mensaje

	*/
	

	this.signUp = function(name){
		var date = new Date();
		var player = new Player();
		var md5 = crypto.createHash('md5');
		md5.update((date.toString()+"puyehue"), "utf8");		
		player.id = name+md5.digest("hex");
		player.clientName = name;				
		onlinePlayersList[name] = player;
		getPlayerNameForID[player.id] = name;

		
		//prueba BD
		db.saludar(function(){
			console.log("hola mundo");
		});
		//obtener id usuario
		db.obtener_id(function(){
			console.log("llegue a obtener id");
		},'marifer')
		//guardar partida (se necesitan id jugador 1 e id jugador 2)

		db.ob
		//db.guardar_partida()
		//fin prueba BD
	}

	this.getListRoundsAndMatchesList = function(req, showTemplate){		

		var list = new Array();
		for(var round in matchesList){
			list.push(matchesList[round]);
		}

		showTemplate(onlinePlayersList[req.user.fullname].id, Array.prototype.slice.call(list));
		
	}

	this.response = function(connection, data, clientType, response, sendMessage){
		this.onlinePlayersList[data.arguments.clientName] = data.arguments.clientName;
		sendMessage(connection, clientType, response);
	}

	this.prueba = function(){
		return "prueba";
	}

	this.probe = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.command = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}
	this.protocol = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.command = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}
	this.proto_use_ok = function(OC){
		var funcionAplazada = Q.defer();

		OC.api = new Object();
		OC.api.command = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}
	this.register = function(OC){
		var funcionAplazada = Q.defer();
		var playerName = OC.data.arguments.clientName;
		var date = new Date();
		var player = new Player();
		var md5 = crypto.createHash('md5');
		md5.update((date.toString()+"puyehue"), "utf8");
		player.id = playerName+md5.digest("hex");
		player.playerName = playerName;		
		onlinePlayersList[playerName] = player;
		getPlayerNameForID[player.id] = playerName;
		onlinePlayersList[playerName].newPlayer(player.id, playerName, OC.clientType, OC.connection);
		OC.api = new Object();
		OC.api.playerid = player.id;
		OC.api.response = "REG_SUCESS";
		OC.api.policies = new Object();
		OC.api.policies.MAX_ABS_IDLE_TIME = 0;
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}
	this.reg_sucess = function(OC){
		var funcionAplazada = Q.defer();

		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.session_start = function(OC){
		var funcionAplazada = Q.defer();
		console.log("API: SESSION_START");
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.accept = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.decline = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.session_quit = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.stats_query = function(OC){
		//actualmente el argumento gameName es simplemente ignorado
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.resultado = true;//si el llamado a la BD falla o hay otro problemas, debe estar incluido en un IF para cambiar esto a FALSE
		OC.api.datos = onlinePlayersList[getPlayerNameForID[OC.data.arguments.id]].stats;
		OC.api.noEnviar = false;
		OC.api.enviarAmbos = false;
		OC.api.player = null;
		funcionAplazada.resolve(OC);

		//temporal
		console.log("Nombre jugador:"+getPlayerNameForID[OC.data.arguments.id]);
		console.log("Performance factor:"+OC.api.datos.globalPerformanceFactor);
		//fin temporal
		return funcionAplazada.promise;
	}

	this.match_req_info = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.match_lookup = function(OC){
		var funcionAplazada 	= Q.defer();		
		var playerID 			= OC.data.arguments.id;
		var playerName			= getPlayerNameForID[OC.data.arguments.id];
		var matchName			= OC.data.arguments.matchName;

		if(onlinePlayersList[playerName].match != null){
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"true","waitingOtherAdv":"false","rejected":"false"';
			funcionAplazada.resolve(OC);
			return funcionAplazada.promise;
		}else if(matchesList[matchName] == null){
			//crea la partida, registra al player 1 en la partida y se queda esperando
			onlinePlayersList[playerName].newPlayer(playerID, playerName, OC.clientType, OC.connection);
			onlinePlayersList[playerName].match = matchName;
			matchesList[matchName] = new Match();
			matchesList[matchName].board.crear( matchesList[matchName].rules.board.height);
			matchesList[matchName].newMatch(matchName, playerName);
			OC.api = new Object();
			OC.api.resultado = true;
			OC.api.noEnviar = true; //Nada para el usuario.
			funcionAplazada.resolve(OC);
			return funcionAplazada.promise;
		}else if(matchesList[matchName].player2Name == null){
			//ingresa como player 2 y debe dar comienzo a la partida
			onlinePlayersList[playerName].newPlayer(playerID, playerName, OC.clientType, OC.connection);
			onlinePlayersList[playerName].match = matchName;
			matchesList[matchName].player2Name = playerName;
			var player1Name = matchesList[matchName].player1Name; 
			OC.api = new Object();
			OC.api.resultado = true;
			OC.api.noEnviar = false;
			OC.api.enviarAmbos= true;
			OC.api.player = matchesList[matchName].player1Name;
			funcionAplazada.resolve(OC);
			return funcionAplazada.promise;
		}else{
			//faltan espectadores//
			
		}		
	}

	this.match_lookup_cancel = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.match_ready = function(OC){
		var funcionAplazada = Q.defer();
		var playerID 		= OC.data.arguments.id;
		var playerName 		= getPlayerNameForID[OC.data.arguments.id];

		if(onlinePlayersList[playerName].match == null){
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"false"';
		} else {
			var matchName = onlinePlayersList[playerName].match;

			if ((matchesList[matchName].aceptaGamePlayer1 == true) && 
				(matchesList[matchName].aceptaGamePlayer2 == true)) {
				OC.api = new Object();
				OC.api.resultado = true;
				OC.api.noEnviar = false;
				OC.api.enviarAmbos = true;

				if (Math.floor((Math.random()*2)) == 1) OC.api.datos.firstMove = true; //<!>
				else OC.api.datos.firstMove = false; 
				matchesList[matchName].whoStarted = OC.api.datos.firstMove;
			} else {
				OC.api = new Object();
				OC.api.resultado = false;
				OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"true"';
				OC.api.noEnviar = false;
				OC.api.enviarAmbos = true;
			} 

		}
	} 


		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.match_reject = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.round_start_ack = function(OC){
		
		var funcionAplazada = Q.defer();
		var playerID 		= OC.data.arguments.id;
		var playerName 		= getPlayerNameForID[OC.data.arguments.id];

		if(onlinePlayersList[playerName].match == null){
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"false"';
		} else {
			var matchName = onlinePlayersList[playerName].match;

			if ((matchesList[matchName].roundACKPlayer1 == true) && 
				(matchesList[matchName].roundACKPlayer2 == true)) {
				OC.api = new Object();
				OC.api.resultado = true;
				OC.api.noEnviar = false;
				OC.api.enviarAmbos = true;
			} else {
				OC.api = new Object();
				OC.api.resultado = false;
				OC.api.noEnviar = true;
			} 
		}
		 
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.turn_end = function(OC){
		var funcionAplazada = Q.defer();
		var playerID 		= OC.data.arguments.id;
		var playerName 		= getPlayerNameForID[OC.data.arguments.id];

		if(onlinePlayersList[playerName].match == null){
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"false"';
		} else {		
		onlinePlayersList[playerName].turnEnd = true;
		OC.api = new Object();
		OC.api.resultado = true;
		OC.api.datos.turnEnd = onlinePlayersList[playerName].turnEnd;
		OC.api.noEnviar = false;
		OC.api.enviarAmbos = false;
		}
	
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.turn_query = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.clock_req = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.board_check = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.board_req = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.pass = function(OC){
		var funcionAplazada = Q.defer();
		console.log("API:PASS");
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.retire_round = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.retire_match = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.projected_tie = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.projected_tie_deact = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.err_unknown_command = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.err_args = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.err_out_of_context = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.panic_quit = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.wait = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.resume = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.ping = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.pong = function(OC){
		var funcionAplazada = Q.defer();
		OC.api = new Object();
		OC.api.response = "sin definir";
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}




}

module.exports.api = api;