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
		//console.log("esto es signup");
		//prueba BD
		
		var fecha= new Date();
		//fecha= Date.now();
		//db.guardar_match(function(partida_guardada){
		//	console.log(partida_guardada);
			
		//},"BestMatchJuanito",fecha,"juanito","francisco",10,500,50);
		//prueba guardar round en partida llamada felipe
		//prueba
		var fecha2= new Date();
		var movimientos=new Array();
		movimientos=      [{
			              	player: "franco", //username que juega
			              	time_turn: 10,//tiempo que se demora el jugador en jugar
			              	move: {x: 3,y: 3}
			          	  },
			              {
			              	player: "felipe", //username que juega
			              	time_turn: 8,//tiempo que se demora el jugador en jugar
			              	move: {x: 4,y: 4}
			              }

			              ]
		/*db.guardar_round(function(){

		},"felipeYfranco",movimientos,fecha2,fecha2,"franco","franco","3L");
		*/
		//db.obtener_partidas_username(function(lista){
			//console.log(lista);
		//},"franco");
		//db.guardar_fin_match(function(lista){

		//},"gana4l",fecha2,"PRUEBA DE WINNER");
		//db.obtener_usuarios_all(function(lista){
		//	console.log(lista);
		//});
		//db.obtener_rounds(function(lista){
			//console.log(lista);
		//},"felipeYfranco");
		//obtener datos round
		//db.obtener_datos_round(function(lista){
		//	console.log(lista);
		//},"felipeYfranco",1);
		
		//guardar partida (se necesitan id jugador 1 e id jugador 2)

		
		//db.guardar_partida()
		//fin prueba BD
	}

	this.getIdPlayer = function(req, showTemplate){	
		showTemplate(onlinePlayersList[req.user.fullname].id);
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
		var playerName = getPlayerNameForID[OC.data.arguments.id];
		OC.api = new Object();
		if(onlinePlayersList[playerName]!=null){
			if(onlinePlayersList[playerName].sessionStarted == false){//como debería ser
				onlinePlayersList[playerName].sessionStarted = true;
				//showPlayerAsConnected()?
				//SI EL FRONTEND MANEJA UNA LISTA DE PLAYERS CONECTADOS, ES AHORA CUANDO DEBE ACTUALIZARLA
				//aquí es donde debería mostrarse como "Conectado" y no antes
				OC.api.resultado = true;
				OC.api.datos = new Rules();
				OC.api.noEnviar = false;
				OC.api.enviarAmbos = false;
				OC.api.razones = null;
				OC.api.player = null;
				//como nos fue bien, debemos contestar enviando las reglas (comando RULES en el outputProcessor)
			} else { //ya tenía la sesión iniciada, nunca debería llegar acá si el autómata está bien implementado
				OC.api.resultado = false; //Contestar con ERR_GM_INTERNAL_ERROR, es una situación anómala
				OC.api.datos = null;
				OC.api.noEnviar = false;
				OC.api.enviarAmbos = false;
				OC.api.razones = "SESSION_ALREADY_STARTED";
				OC.api.player = null;
			}
		} else { //no debería llegar acá, quiere decir que un cliente quiere hacer SESSION_START sin estar conectado O: ¿Se pasó de largo el REGISTER?
			OC.api.resultado = false;
			OC.api.datos = null;
			OC.api.razones = "PLAYER_NOT_ONLINE";
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.player = null;
		}
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
		var playerName = getPlayerNameForID[OC.data.arguments.id];
		OC.api = new Object();
		if(onlinePlayersList[playerName]!=null){
			if(onlinePlayersList[playerName].sessionStarted == true){//como debería ser
				onlinePlayersList[playerName].sessionStarted = false;
				//showPlayerAsConnected()?
				//SI EL FRONTEND MANEJA UNA LISTA DE PLAYERS CONECTADOS, ES AHORA CUANDO DEBE ACTUALIZARLA
				//aquí es donde debería mostrarse como "Conectado" y no antes
				OC.api.resultado = true;
				OC.api.datos = onlinePlayersList[playerName].stats;
				OC.api.noEnviar = false;
				OC.api.enviarAmbos = false;
				OC.api.razones = null;
				OC.api.player = null;
				//como nos fue bien, debemos contestar enviando las estadísticas (comando STATS en el outputProcessor)
				//y el cliente debería desconectarse (o en browser, logout)
			} else { //ya tenía la sesión iniciada, nunca debería llegar acá si el autómata está bien implementado
				OC.api.resultado = false; //Contestar con ERR_GM_INTERNAL_ERROR, es una situación anómala
				OC.api.datos = null;
				OC.api.noEnviar = false;
				OC.api.enviarAmbos = false;
				OC.api.razones = "SESSION_NEVER_STARTED";
				OC.api.player = null;
			}
		} else { //no debería llegar acá, quiere decir que un cliente quiere hacer SESSION_START sin estar conectado O: ¿Se pasó de largo el REGISTER?
			OC.api.resultado = false;
			OC.api.datos = null;
			OC.api.razones = "PLAYER_NOT_ONLINE";
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.player = null;
		}
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
		var playerType			= onlinePlayersList[playerName].clientType;

		//creaicion del nuevo nombre de la partida
		//var creacion 	 		= new Date();
		//var matchName			= OC.data.arguments.matchName+" "+creacion.toISOString();
		//fin creacio n nuevo nombre
		//console.log("MI NOMBRE ES:"+playerName);


		if (playerType == "NET"){
			//Revisar todas las partidas, entrar a la primera disponible
			//Si no hay ninguna, crear una y esperar
			for (var matchTemp in matchesList) {
    			if (matchTemp.player2Name == null){ // Si encontró una partida disponible
					console.log("Hay un match disponible, asi que voy a entrar");
					console.log(playerName);
					console.log(matchTemp.name);
					onlinePlayersList[playerName].match = matchesList[matchTemp].name;
					matchesList[matchTemp].player2Name = playerName;
					var player1Name = matchesList[matchTemp].player1Name; 
					OC.api = new Object();
					OC.api.resultado = true;
					OC.api.noEnviar = false;
					OC.api.enviarAmbos= true;
					OC.api.player = matchesList[matchTemp].player1Name;
					console.log("muero aqui");
					funcionAplazada.resolve(OC);
					return funcionAplazada.promise;

    			}
			}

			

			matchName = playerName + Date();
			console.log(matchName);
			console.log("NO hay ninguno disponible, asi que voy a crear uno");
			onlinePlayersList[playerName].match = matchName;
			matchesList[matchName] = new Match();
			matchesList[matchName].board.crear( matchesList[matchName].rules.board.height);
			matchesList[matchName].newMatch(matchName, playerName);
			OC.api = new Object();
			OC.api.resultado = true;
			OC.api.noEnviar = true; //Nada para el usuario.
			OC.api.enviarAmbos = false;
			funcionAplazada.resolve(OC);
			return funcionAplazada.promise;


		}
		else{
		if(onlinePlayersList[playerName].match != null){
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"true","waitingOtherAdv":"false","rejected":"false"';
			funcionAplazada.resolve(OC);
			return funcionAplazada.promise;
		} else if(matchesList[matchName] == null){
			//crea la partida, registra al player 1 en la partida y se queda esperando
			onlinePlayersList[playerName].newPlayer(playerID, playerName, OC.clientType, OC.connection);
			//creacion de la partida 
			
			onlinePlayersList[playerName].match = matchName;
			matchesList[matchName] = new Match();
			matchesList[matchName].board.crear( matchesList[matchName].rules.board.height);
			matchesList[matchName].newMatch(matchName, playerName);
			
			OC.api = new Object();
			OC.api.resultado = true;
			OC.api.noEnviar = true; //Nada para el usuario.
			OC.api.enviarAmbos = false;
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
	}

	this.match_lookup_cancel = function(OC){
		var funcionAplazada = Q.defer();
		var playerID 		= OC.data.arguments.id;
		var playerName 		= getPlayerNameForID[OC.data.arguments.id];
		var matchName 		= matchesList[playerName].match;
		var matchIndex 		= matchesList.indexOf(matchName);

		if(onlinePlayersList[playerName].match != null){
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"true","waitingOtherAdv":"false","rejected":"false"';
			funcionAplazada.resolve(OC);
			return funcionAplazada.promise;
		}	if (matchIndex > -1) {
			matchesList.splice(matchIndex,1);
		}

		onlinePlayersList[playerName].match = null;

		OC.api.resultado = true;
		OC.api.noEnviar = true;
		OC.api.enviarAmbos= false;

		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.match_ready = function(OC){
		var funcionAplazada = Q.defer();
		var playerID 		= OC.data.arguments.id;
		var playerName 		= getPlayerNameForID[OC.data.arguments.id];
		var matchName 		= onlinePlayersList[playerName].match;
		//console.log("ESTOY EN MATCH READY, nombre partida"+matchName);
		if(onlinePlayersList[playerName].match == null){
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"false"';
		} else {
			if(playerName == matchesList[matchName].player1Name){
				matchesList[matchName].aceptaGamePlayer1 = true;
			}
			else {
				matchesList[matchName].aceptaGamePlayer2 = true;
			}
			console.log('player 1:' +matchesList[matchName].aceptaGamePlayer1 + ' ; player2: ' + matchesList[matchName].aceptaGamePlayer2 );
			if ((matchesList[matchName].aceptaGamePlayer1 == true) && 
				(matchesList[matchName].aceptaGamePlayer2 == true)) {
				
				OC.api = new Object();
				OC.api.resultado = true;
				OC.api.noEnviar = false;
				OC.api.enviarAmbos = true;
				if(playerName == matchesList[matchName].player1Name){
					OC.api.player =   matchesList[matchName].player2Name;
				}
				else {
					OC.api.player =   matchesList[matchName].player1Name;
				}
				OC.api.datos=new Object();
				OC.api.datos.matchName = matchName;
				if (Math.floor((Math.random()*2)) == 1){ 
					OC.api.datos.firstMove = true;
				} 
				else {
					OC.api.datos.firstMove = false;
				}
				matchesList[matchName].whoStarted = OC.api.datos.firstMove;


				//prueba quien es quien parte
				if(matchesList[matchName].whoStarted==true){
					matchesList[matchName].startingPlayer=playerName;
				}
				
				
				//INICIO GUARDAR CREACION DE PARTIDA
				//var nombrepartida=matchName+creacionpartida;
				//var roundtotales; FALTA ESTA VARIABLE
				
				db.guardar_match(function(partida_guardada){
						//console.log(partida_guardada);
				},matchName,matchesList[matchName].startTime,matchesList[matchName].player1Name,matchesList[matchName].player2Name,matchesList[matchName].rules.time.turnDuration,matchesList[matchName].rules.time.maxRoundTime,matchesList[matchName].rules.game.roundsPerMatch,matchesList[matchName].rules.time.maxMatchTime);
				
				//FIN GUARDAR LA CREACION DE PARTIDA EN BD

			} 
			else{
				OC.api = new Object();
				OC.api.resultado = true;
				OC.api.noEnviar = true;
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
		var matchName 		= onlinePlayersList[playerName].match;
		//inicializacion arreglo jugadas

		matchesList[matchName].inicioRound=new Date();


		//fin inicializacion
		onlinePlayersList[playerName].connection = OC.connection;
		
		if(onlinePlayersList[playerName].match == null){
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"false"';
		} else {
			if(playerName == matchesList[matchName].player1Name){
				matchesList[matchName].roundACKPlayer1 = true;
			}
			else {
				matchesList[matchName].roundACKPlayer2 = true;
			}

			if ((matchesList[matchName].roundACKPlayer1 == true) && 
				(matchesList[matchName].roundACKPlayer2 == true)) {
				OC.api = new Object();
				OC.api.resultado = true;
				OC.api.noEnviar = false;
				OC.api.enviarAmbos = true;
				if(playerName == matchesList[matchName].player1Name)
					OC.api.player =   matchesList[matchName].player2Name;
				else 
					OC.api.player =   matchesList[matchName].player1Name;
			}
			else {
					OC.api = new Object();
					OC.api.resultado = true;
					OC.api.noEnviar = true;
				}
		}
		console.log('enviando round_start_ack a OutputProcessor' );
		var date = new Date();
		matchesList[matchName].lastMovementTimePlayer1 = date;
		matchesList[matchName].lastMovementTimePlayer2 = date;
		var numberOfFinishRound = matchesList[matchName].numberOfFinishRound;
		setTimeout(roundEndAlert,matchesList[matchName].rules.time.maxRoundTime*1000, matchName, numberOfFinishRound);
		//setTimeout(endOfTimeTurn,matchesList[matchName].rules.time.turnDuration*1000, matchName, playerName, date);
		//falta primer turno
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
		matchesList[matchName].turnEnd = true;
		OC.api = new Object();
		OC.api.resultado = true;
		OC.api.datos.turnEnd = matchesList[matchName].turnEnd;
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
		var playerID 		= OC.data.arguments.id;
		var playerName 		= getPlayerNameForID[OC.data.arguments.id];		
		var matchName 		= onlinePlayersList[playerName].match;
		var MD5Client		= OC.data.arguments.MD5;
		var MD5Server		= crypto.createHash('md5');
		MD5Server.update((matchesList[matchName].board.squares.toString()), "utf8");

		if(onlinePlayersList[playerName].match == null){
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"false"';
		} else if (MD5Client == MD5Server) {
			OC.api = new Object();
			OC.api.resultado = true; 
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.datos.boardStatus = "SYNC";
			} else {
				OC.api = new Object();
				OC.api.resultado = true; 
				OC.api.noEnviar = false;
				OC.api.enviarAmbos = false;
				OC.api.datos.boardStatus = "DESYNC";
		}		
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}

	this.board_req = function(OC){
		var funcionAplazada = Q.defer();
		var playerID 		= OC.data.arguments.id;
		var playerName 		= getPlayerNameForID[OC.data.arguments.id];		
		var matchName 		= onlinePlayersList[playerName].match;

		if(onlinePlayersList[playerName].match == null){
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"false"';
		} else {
			OC.api = new Object();
			OC.api.resultado = true; 
			OC.api.board = matchesList[matchName].board;
			OC.api.noEnviar = false;
		}		 

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


	this.put= function(OC){

		var funcionAplazada = Q.defer();
		var playerID 		= OC.data.arguments.id;
		var playerName 		= getPlayerNameForID[OC.data.arguments.id];
		var matchName		= onlinePlayersList[playerName].match;
		var xPos 			= OC.data.arguments.xPos;
		var yPos			= OC.data.arguments.yPos;
		var match 			= matchesList[matchName];
		//agregar round al cual corresponde la jugada CHEVO
		//var numberOfFinishRound = OC.data.arguments.numberOfFinishRound;

		//console.log ("coord put api" + xPos + " " + yPos);
		//console.log (playerName + " " + matchName);
//adolfo round

		/*if(matchesList[matchName].numberOfFinishRound!=numberOfFinishRound){//avisar que perdio, round invalido CHEVO
			//avisar mensaje fuera de tiempo
			//no avisar nada
		}*/
//adolfo round

		var tablero 		= matchesList[matchName].board;

		var xPos2 			= OC.data.arguments.xPos;
		var yPos2			= OC.data.arguments.yPos;

		/*if(onlinePlayersList[playerName].clientType == "BROWSER"){
		var xPos2 			= OC.data.arguments.yPos;
		var yPos2			= OC.data.arguments.xPos;			
		}
		else {
			var xPos2 		= OC.data.arguments.xPos;
			var yPos2		= OC.data.arguments.yPos;
		}  */
		if (matchesList[matchName].player1Name == playerName) {

			var numJugador = 1;
		}
		else{

			var numJugador = 2;
		}

		if (onlinePlayersList[playerName].match == null){
			console.log ("ERROR, jugador no en juego");
			OC.api = new Object();
			OC.api.resultado = false;
			OC.api.noEnviar = true;
			OC.api.enviarAmbos = false;
			OC.api.razones = playerName + " NO SE ENCUENTRA EN MATCH";
		} else { // Si el jugador esta en match
			
			if (((matchesList[matchName].player1Name == playerName) // Si el jugador ha jugado ya su movimiento 
				&& (matchesList[matchName].putPassOrRetirePlayer1 == false))
				|| ((matchesList[matchName].player2Name == playerName) 
				&& (matchesList[matchName].putPassOrRetirePlayer2 == false))) {

				OC.api = new Object();
				OC.api.resultado = false;
				OC.api.noEnviar = true;
				OC.api.enviarAmbos = false;
				OC.api.razones = playerName + " YA HA REALIZADO SU JUGADA"; 	
			} else  // Si no ha jugado
				////////////////////////////////////////////////////////////
				////INICIO_VALIDACION
					var resultadoJugada = -2;
					console.log('Resultado jugada antes de ' +resultadoJugada);
					console.log('Posicion X ' +xPos2);
					console.log('Posicion Y ' +yPos2);

					
					if(xPos2 >= tablero.boardSize || yPos2 >= tablero.boardSize || xPos2 < 0 || yPos2 < 0 ){
						resultadoJugada = -1; //"Jugada Invalida - Fuera del tablero";
						console.log("Jugada Invalida - Fuera del tablero");
					}else{
						if(tablero.squares[xPos2][yPos2] == 0){
							var victoria = false;
							var tresEnLinea = false;
							arribaIzquierda = 0;
							abajoDerecha = 0;
							arribaDerecha = 0;
							abajoIzquierda = 0;
							arriba = 0;
							abajo = 0;
							izquierda = 0;
							derecha = 0;
							
							/*Revisar Diagonal Descendente*/

							if(xPos2-1 >= 0 && yPos2-1 >= 0){
								console.log("Entre en el 1");
								arribaIzquierda++;
								if(xPos2-2 >= 0 && yPos2-2 >= 0){
									arribaIzquierda++;
									if(xPos2-3 >= 0 && yPos2-3 >= 0){
										arribaIzquierda++;
									}
								}
							}
							if(xPos2+1 < tablero.boardSize && yPos2+1 < tablero.boardSize){
								abajoDerecha++;
								if(xPos2+2 < tablero.boardSize && yPos2+2 < tablero.boardSize){
									abajoDerecha++;
									if(xPos2+3 < tablero.boardSize && yPos2+3 < tablero.boardSize){
										abajoDerecha++;
									}
								}
							}

							if(arribaIzquierda>0){
								console.log("Entre en el 2");
								if(tablero.squares[xPos2-1][yPos2-1]!=numJugador){
									if(abajoDerecha>0){
										if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
											
										}else if(abajoDerecha>1){
											if(tablero.squares[xPos2+2][yPos2+2]!=numJugador){
												
											}else{
												tresEnLinea = true;
												if(abajoDerecha>2){
													if(tablero.squares[xPos2+3][yPos2+3]!=numJugador){ //llegando a este if, hay 3 en linea
														
													}else{
														victoria = true;
														
													}
												}
											}
										}
									}
								}else if(arribaIzquierda>1){
									console.log("Entre en el 3");
									if(tablero.squares[xPos2-2][yPos2-2]!=numJugador){
										if(abajoDerecha>0){
											if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
												
											}else{
												tresEnLinea = true;
												if(abajoDerecha>1){
													if(tablero.squares[xPos2+2][yPos2+2]!=numJugador){ //llegando a este if, hay 3 en linea
														
													}else{
														victoria = true;
														
													}
												}
											}
										}
									}else if(arribaIzquierda>2){
										console.log("Entre en el 4");
										if(tablero.squares[xPos2-3][yPos2-3]!=numJugador){ //llegando a este if, hay 3 en linea
											tresEnLinea = true;
											if(abajoDerecha>0){
												if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
													
												}else{
													victoria = true;
													
												}
											}
										}else{
											victoria = true;
											
										}
									}else if(abajoDerecha>0){
										console.log("Entre en el 5");
										if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
											
										}else{
											victoria = true;
											
										}
									}
								}else if(abajoDerecha>0){
									console.log("Entre en el 6");
									if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
										
									}else{
										tresEnLinea = true;
										if(abajoDerecha>1){
											if(tablero.squares[xPos2+2][yPos2+2]!=numJugador){ //llegando a este if, hay 3 en linea
												
											}else{
												victoria = true;
												
											}
										}
									}
								}
							}else if(abajoDerecha>0){
								console.log("Entre en el 7");
								if(tablero.squares[xPos2+1][yPos2+1]!=numJugador){
									
								}else if(abajoDerecha>1){
									if(tablero.squares[xPos2+2][yPos2+2]!=numJugador){
										
									}else{
										tresEnLinea = true;
										if(abajoDerecha>2){
											if(tablero.squares[xPos2+3][yPos2+3]!=numJugador){ //llegando a este if, hay 3 en linea
												
											}else{
												victoria = true;
												
											}
										}
									}
								}
							}

							/*Revisar Diagonal Ascendente*/

							if(xPos2-1 >= 0 && yPos2+1 < tablero.boardSize){
								arribaDerecha++;
								if(xPos2-2 >= 0 && yPos2+2 < tablero.boardSize){
									arribaDerecha++;
									if(xPos2-3 >= 0 && yPos2+3 < tablero.boardSize){
										arribaDerecha++;
									}
								}
							}
							if(xPos2+1 < tablero.boardSize && yPos2-1 >= 0){
								abajoIzquierda++;
								if(xPos2+2 < tablero.boardSize && yPos2-2 >= 0){
									abajoIzquierda++;
									if(xPos2+3 < tablero.boardSize && yPos2-3 >= 0){
										abajoIzquierda++;
									}
								}
							}

							if(arribaDerecha>0){
								console.log("Entre en el 9");
								if(tablero.squares[xPos2-1][yPos2+1]!=numJugador){
									if(abajoIzquierda>0){
										if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
											
										}else if(abajoIzquierda>1){
											if(tablero.squares[xPos2+2][yPos2-2]!=numJugador){
												
											}else{
												tresEnLinea = true;
												if(abajoIzquierda>2){
													if(tablero.squares[xPos2+3][yPos2-3]!=numJugador){ //llegando a este if, hay 3 en linea
														
													}else{
														victoria = true;
														
													}
												}
											}
										}
									}
								}else if(arribaDerecha>1){
									console.log("Entre en el 10");
									if(tablero.squares[xPos2-2][yPos2+2]!=numJugador){
										if(abajoIzquierda>0){
											if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
												
											}else{
												tresEnLinea = true;
												if(abajoIzquierda>1){
													if(tablero.squares[xPos2+2][yPos2-2]!=numJugador){ //llegando a este if, hay 3 en linea
														
													}else{
														victoria = true;
														
													}
												}
											}
										}
									}else if(arribaDerecha>2){
										console.log("Entre en el 11");
										if(tablero.squares[xPos2-3][yPos2+3]!=numJugador){ //llegando a este if, hay 3 en linea
											tresEnLinea = true;
											if(abajoIzquierda>0){
												if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
													
												}else{
													victoria = true;
													
												}
											}
										}else{
											victoria = true;
											
										}
									}else if(abajoIzquierda>0){
										if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
											
										}else{
											victoria = true;
											
										}
									}
								}else if(abajoIzquierda>0){
									if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
										
									}else{
										tresEnLinea = true;
										if(abajoIzquierda>1){
											console.log("Entre en el 12");
											if(tablero.squares[xPos2+2][yPos2-2]!=numJugador){ //llegando a este if, hay 3 en linea
												
											}else{
												victoria = true;
												
											}
										}
									}
								}
							}else if(abajoIzquierda>0){
								console.log("Entre en el 13");
								if(tablero.squares[xPos2+1][yPos2-1]!=numJugador){
									
								}else if(abajoIzquierda>1){
									console.log("Entre en el 13-1");
									if(tablero.squares[xPos2+2][yPos2-2]!=numJugador){
										
									}else{
										tresEnLinea = true;
										if(abajoIzquierda>2){
											console.log("Entre en el 13-1");
											if(tablero.squares[xPos2+3][yPos2-3]!=numJugador){ //llegando a este if, hay 3 en linea
												
											}else{
												victoria = true;
												
											}
										}
									}
								}
							}

							/*Revisar Vertical*/

							if(xPos2-1 >= 0){
								arriba++;
								if(xPos2-2 >= 0){
									arriba++;
									if(xPos2-3 >= 0){
										arriba++;
									}
								}
							}
							if(xPos2+1 < tablero.boardSize){
								abajo++;
								if(xPos2+2 < tablero.boardSize){
									abajo++;
									if(xPos2+3 < tablero.boardSize){
										abajo++;
									}
								}
							}

							if(arriba>0){
								console.log("Entre en el 14");
								if(tablero.squares[xPos2-1][yPos2]!=numJugador){
									if(abajo>0){
										if(tablero.squares[xPos2+1][yPos2]!=numJugador){
											
										}else if(abajo>1){
											if(tablero.squares[xPos2+2][yPos2]!=numJugador){
												
											}else{
												tresEnLinea = true;
												if(abajo>2){
													if(tablero.squares[xPos2+3][yPos2]!=numJugador){ //llegando a este if, hay 3 en linea
														
													}else{
														victoria = true;
														
													}
												}
											}
										}
									}
								}else if(arriba>1){
									console.log("Entre en el 15");
									if(tablero.squares[xPos2-2][yPos2]!=numJugador){
										if(abajo>0){
											if(tablero.squares[xPos2+1][yPos2]!=numJugador){
												
											}else{
												tresEnLinea = true;
												if(abajo>1){
													if(tablero.squares[xPos2+2][yPos2]!=numJugador){ //llegando a este if, hay 3 en linea
														
													}else{
														victoria = true;
														
													}
												}
											}
										}
									}else if(arriba>2){
										console.log("Entre en el 16");
										if(tablero.squares[xPos2-3][yPos2]!=numJugador){ //llegando a este if, hay 3 en linea
											tresEnLinea = true;
											if(abajo>0){
												if(tablero.squares[xPos2+1][yPos2]!=numJugador){
													
												}else{
													victoria = true;
													
												}
											}
										}else{
											victoria = true;
											
										}
									}else if(abajo>0){
										if(tablero.squares[xPos2+1][yPos2]!=numJugador){
											
										}else{
											victoria = true;
											
										}
									}
								}else if(abajo>0){
									if(tablero.squares[xPos2+1][yPos2]!=numJugador){
										
									}else{
										tresEnLinea = true;
										if(abajo>1){
											if(tablero.squares[xPos2+2][yPos2]!=numJugador){ //llegando a este if, hay 3 en linea
												
											}else{
												victoria = true;
												
											}
										}
									}
								}
							}else if(abajo>0){
								if(tablero.squares[xPos2+1][yPos2]!=numJugador){
									
								}else if(abajo>1){
									if(tablero.squares[xPos2+2][yPos2]!=numJugador){
										
									}else{
										tresEnLinea = true;
										if(abajo>2){
											if(tablero.squares[xPos2+3][yPos2]!=numJugador){ //llegando a este if, hay 3 en linea
												
											}else{
												victoria = true;
												
											}
										}
									}
								}
							}

							/*Revisar Horizontal*/

							if(yPos2-1 >= 0){
								izquierda++;
								if(yPos2-2 >= 0){
									izquierda++;
									if(yPos2-3 >= 0){
										izquierda++;
									}
								}
							}
							if(yPos2+1 < tablero.boardSize){
								derecha++;
								if(yPos2+2 < tablero.boardSize){
									derecha++;
									if(yPos2+3 < tablero.boardSize){
										derecha++;
									}
								}
							}

							if(izquierda>0){
								if(tablero.squares[xPos2][yPos2-1]!=numJugador){
									if(derecha>0){
										if(tablero.squares[xPos2][yPos2+1]!=numJugador){
											
										}else if(derecha>1){
											if(tablero.squares[xPos2][yPos2+2]!=numJugador){
												
											}else{
												tresEnLinea = true;
												if(derecha>2){
													if(tablero.squares[xPos2][yPos2+3]!=numJugador){ //llegando a este if, hay 3 en linea
														
													}else{
														victoria = true;
														
													}
												}
											}
										}
									}
								}else if(izquierda>1){
									if(tablero.squares[xPos2][yPos2-2]!=numJugador){
										if(derecha>0){
											if(tablero.squares[xPos2][yPos2+1]!=numJugador){
												
											}else{
												tresEnLinea = true;
												if(derecha>1){
													if(tablero.squares[xPos2][yPos2+2]!=numJugador){ //llegando a este if, hay 3 en linea
														
													}else{
														victoria = true;
														
													}
												}
											}
										}
									}else if(izquierda>2){
										if(tablero.squares[xPos2][yPos2-3]!=numJugador){ //llegando a este if, hay 3 en linea
											tresEnLinea = true;
											if(derecha>0){
												if(tablero.squares[xPos2][yPos2+1]!=numJugador){
													
												}else{
													victoria = true;
													
												}
											}
										}else{
											victoria = true;
											
										}
									}else if(derecha>0){
										if(tablero.squares[xPos2][yPos2+1]!=numJugador){
											
										}else{
											victoria = true;
											
										}
									}
								}else if(derecha>0){
									if(tablero.squares[xPos2][yPos2+1]!=numJugador){
										
									}else{
										tresEnLinea = true;
										if(derecha>1){
											if(tablero.squares[xPos2][yPos2+2]!=numJugador){ //llegando a este if, hay 3 en linea
												
											}else{
												victoria = true;
												
											}
										}
									}
								}
							}else if(derecha>0){
								if(tablero.squares[xPos2][yPos2+1]!=numJugador){
									
								}else if(derecha>1){
									if(tablero.squares[xPos2][yPos2+2]!=numJugador){
										
									}else{
										tresEnLinea = true;
										if(derecha>2){
											if(tablero.squares[xPos2][yPos2+3]!=numJugador){ //llegando a este if, hay 3 en linea
												
											}else{
												victoria = true;
												
											}
										}
									}
								}
							}
							//AQUI RECIEN SE GANA
							if(victoria == true) {
								resultadoJugada = 1;//"Hay 4 en fila";
								console.log("GANA 4L");
								//console.log("gana jugador")
								//console.log("valor de win: "+resultadoJugada);
								//console.log("jugador 1: "+matchesList[matchName].player1Name);
								//console.log("jugador 2: "+matchesList[matchName].player2Name);
							} 
							else{
								if(tresEnLinea == true){ 
									resultadoJugada = 2;//"Hay 3 en fila";
									console.log("GANA 3L");
								} 
								else resultadoJugada = 0 //"Se sigue el juego";
							}
						}else{
							resultadoJugada = -1 ;
							console.log("Jugada Invalida - Casillero ocupado");//"Jugada Invalida - Casillero ocupado";
						}
					}

					console.log('Resultado jugada despues de ' +resultadoJugada);
					//FIN_VALIDACIÓN
					///////////////////////////////////////////////////////////////////////////
				
				if (resultadoJugada >= 0){ // si su movimiento es válido, insertar funcion feta de jugada	
					
					OC.api = new Object();

					OC.api.resultado = true;
					OC.api.noEnviar = false; // True es para que se quede esparando.
					OC.api.enviarAmbos = true; // Se debe enviara a ambos
					
					OC.api.datos = new Object();
					OC.api.datos.xPos = xPos;
					OC.api.datos.yPos = yPos;
					OC.api.datos.win = resultadoJugada;//

					


					console.log("El resultado de la jugada es " + OC.api.datos.win);
					
					if (matchesList[matchName].player1Name == playerName) { 	// Si es player 1 se actualiza tablero en posición	
						matchesList[matchName].board.squares[xPos2][yPos2] = 1;	// Usando unos, sino, usando 2.
						matchesList[matchName].putPassOrRetirePlayer1 = false;
						matchesList[matchName].putPassOrRetirePlayer2 = true;
						matchesList[matchName].board.totalToken +=1;
						//prueba de arreglo de jugadas
						var movida= {
			        				player: matchesList[matchName].player1Name, //username que juega
			        				move:{
			                  			//x: xPos2,
			                  			//y: yPos2
			                  			x: xPos,
			                  			y: yPos
			              				}
		          					};
						matchesList[matchName].moves.push(movida);
						

					} else {
						matchesList[matchName].board.squares[xPos2][yPos2] = 2;
						matchesList[matchName].putPassOrRetirePlayer2 = false;	 
						matchesList[matchName].putPassOrRetirePlayer1 = true;
						matchesList[matchName].board.totalToken +=1;

						//prueba de arreglo de jugadas
						var movida= {
			        				player: matchesList[matchName].player2Name, //username que juega
			        				move:{
			                  			//x: xPos2,
			                  			//y: yPos2
			                  			x: xPos,
			                  			y: yPos
			              				}
		          					};
						matchesList[matchName].moves.push(movida);
						
					}
					

					console.log("veamos si queda la embarrada aquí");
					if 	(matchesList[matchName].board.totalToken == (matchesList[matchName].board.boardSize * matchesList[matchName].board.boardSize)){ // Si están todos los casilleros ocupados

						OC.api.datos.win = 3;
					}

					console.log ("Despues de revisar si el tablero está lleno el resultado de la partida es " + OC.api.datos.win);

					//Prueba para guardar rounds (al finalizar el round), aqui se deberia crear un date 
					//para especificar cuando finaliza el round
					if(playerName == matchesList[matchName].player1Name){
						OC.api.player =   matchesList[matchName].player2Name;
						if(OC.api.datos.win>0){
							//if win=1 gana el de conexion directa,se gana por 4L
							//if win=2 pierde el de conexion directa, se gana por 3L
							if(OC.api.datos.win==1){
								console.log("gana jugador: "+playerName)
								console.log("gana 4L valor de win: "+OC.api.datos.win);
								console.log("jugador 1: "+matchesList[matchName].player1Name);
								console.log("jugador 2: "+matchesList[matchName].player2Name);
								//estructura de jugadas
								//muestra arreglo de juagadas
								console.log(matchesList[matchName].moves);
								console.log(matchesList[matchName].inicioRound);
								//SE MANDA A GUARDAR ROUND A BASE DE DATOS
								matchesList[matchName].finRound=new Date();
								db.guardar_round(function(){

								},matchName,matchesList[matchName].moves,matchesList[matchName].inicioRound,
								matchesList[matchName].finRound,matchesList[matchName].whoStarted,playerName,"4L",matchesList[matchName].rules.board.height,matchesList[matchName].rules.board.width);

								//SE RESETEA EL ARREGLO DE MOVIDAS UNA VEZ SE GUARDA
								matchesList[matchName].moves=[];
							}
							if(OC.api.datos.win==2){
								console.log("gana jugador: "+OC.api.player)
								console.log("gana 3L valor de win: "+OC.api.datos.win);
								console.log("jugador 1: "+matchesList[matchName].player1Name);
								console.log("jugador 2: "+matchesList[matchName].player2Name);
								//muestra arreglo de juagadas
								console.log(matchesList[matchName].moves);
								console.log(matchesList[matchName].inicioRound);
								//SE MANDA A GUARDAR ROUND A BASE DE DATOS
								matchesList[matchName].finRound=new Date();
								db.guardar_round(function(){

								},matchName,matchesList[matchName].moves,matchesList[matchName].inicioRound,
								matchesList[matchName].finRound,matchesList[matchName].whoStarted,OC.api.player,"3L",matchesList[matchName].rules.board.height,matchesList[matchName].rules.board.width);
								//SE RESETEA EL ARREGLO DE MOVIDAS UNA VEZ SE GUARDA
								matchesList[matchName].moves=[];
							}
							if(OC.api.datos.win==3){
								console.log("Nadie Gana");
								console.log("Empate valor de win: "+OC.api.datos.win);
								console.log("jugador 1: "+matchesList[matchName].player1Name);
								console.log("jugador 2: "+matchesList[matchName].player2Name);
								//estructura de jugadas
								//muestra arreglo de juagadas
								console.log(matchesList[matchName].moves);
								console.log(matchesList[matchName].inicioRound);
								//SE MANDA A GUARDAR ROUND A BASE DE DATOS
								matchesList[matchName].finRound=new Date();
								db.guardar_round(function(){

								},matchName,matchesList[matchName].moves,matchesList[matchName].inicioRound,
								matchesList[matchName].finRound,matchesList[matchName].whoStarted,"No hay Ganadores","DRAW",matchesList[matchName].rules.board.height,matchesList[matchName].rules.board.width);

								//SE RESETEA EL ARREGLO DE MOVIDAS UNA VEZ SE GUARDA
								matchesList[matchName].moves=[];
							}
							
						}
						
					}
					else{ 
						OC.api.player =   matchesList[matchName].player1Name;
						if(OC.api.datos.win>0){
							//if win=1 gana el de conexion directa,se gana por 4L
							//if win=2 pierde el de conexion directa, se gana por 3L
							if(OC.api.datos.win==1){
								console.log("gana jugador: "+playerName)
								console.log("GANA 4L  valor de win: "+OC.api.datos.win);
								console.log("jugador 1: "+matchesList[matchName].player1Name);
								console.log("jugador 2: "+matchesList[matchName].player2Name);
								//muestra arreglo de juagadas
								console.log(matchesList[matchName].moves);
								console.log(matchesList[matchName].inicioRound);
								//SE MANDA A GUARDAR ROUND A BASE DE DATOS
								matchesList[matchName].finRound=new Date();
								db.guardar_round(function(){

								},matchName,matchesList[matchName].moves,matchesList[matchName].inicioRound,
								matchesList[matchName].finRound,matchesList[matchName].whoStarted,playerName,"4L",matchesList[matchName].rules.board.height,matchesList[matchName].rules.board.width);
								//SE RESETEA EL ARREGLO DE MOVIDAS UNA VEZ SE GUARDA
								matchesList[matchName].moves=[];
							}
							if(OC.api.datos.win==2){
								console.log("gana jugador: "+OC.api.player)
								console.log("GANA 3L  valor de win: "+OC.api.datos.win);
								console.log("jugador 1: "+matchesList[matchName].player1Name);
								console.log("jugador 2: "+matchesList[matchName].player2Name);
								//muestra arreglo de juagadas
								console.log(matchesList[matchName].moves);
								console.log(matchesList[matchName].inicioRound);
								//SE MANDA A GUARDAR ROUND A BASE DE DATOS
								matchesList[matchName].finRound=new Date();
								db.guardar_round(function(){

								},matchName,matchesList[matchName].moves,matchesList[matchName].inicioRound,
								matchesList[matchName].finRound,matchesList[matchName].whoStarted,OC.api.player,"3L",matchesList[matchName].rules.board.height,matchesList[matchName].rules.board.width);
								//SE RESETEA EL ARREGLO DE MOVIDAS UNA VEZ SE GUARDA
								matchesList[matchName].moves=[];
							}
							if(OC.api.datos.win==3){
								console.log("Nadie Gana");
								console.log("Empate valor de win: "+OC.api.datos.win);
								console.log("jugador 1: "+matchesList[matchName].player1Name);
								console.log("jugador 2: "+matchesList[matchName].player2Name);
								//estructura de jugadas
								//muestra arreglo de juagadas
								console.log(matchesList[matchName].moves);
								console.log(matchesList[matchName].inicioRound);
								//SE MANDA A GUARDAR ROUND A BASE DE DATOS
								matchesList[matchName].finRound=new Date();
								db.guardar_round(function(){

								},matchName,matchesList[matchName].moves,matchesList[matchName].inicioRound,
								matchesList[matchName].finRound,matchesList[matchName].whoStarted,"No hay Ganadores","DRAW",matchesList[matchName].rules.board.height,matchesList[matchName].rules.board.width);

								//SE RESETEA EL ARREGLO DE MOVIDAS UNA VEZ SE GUARDA
								matchesList[matchName].moves=[];
							}
						}
						
					}
					

					console.log("llegue a esta barrera");

					
					
					/*if (false) { //si jugandor gano, insertar función feta de si gana o no
						OC.api.datos.win = 1; // numJugador ganó
					}

					if (false) { // si numJugador perdió, insertar funcion feta de si gana o no
						OC.api.datos.win = 2; // Jugador perdió
					} else { //Simplemente siguen jugando */
				
					//}
				} else { //Si el movimiento es inválido
					
					OC.api = new Object();
					OC.api.resultado = false;
					OC.api.noEnviar = false;
					OC.api.enviarAmbos = false;
					OC.api.razones = playerName + " HA REALIZADO UNA JUGADA INVALIDA";
				}
			}

			console.log('saliendo de api');
//adolfo  reloj
			var date = new Date();
			if(match.player1Name==playerName){				
				match.lastMovementTimePlayer1 = date;				
			}else{
				match.lastMovementTimePlayer2 = date;
			}
			console.log("aaaaaaaaaaaaaaaaaaaa "+playerName);
			var numberOfFinishRound = matchesList[matchName].numberOfFinishRound;
			setTimeout(endOfTimeTurn,matchesList[matchName].rules.time.turnDuration*1000, matchName, playerName, date, numberOfFinishRound);			
//adolfo  reloj
			funcionAplazada.resolve(OC);
			return funcionAplazada.promise;
	}

		

	this.pass = function(OC){
		var funcionAplazada = Q.defer();
		var playerID 		= OC.data.arguments.id;
		var playerName 		= getPlayerNameForID[OC.data.arguments.id];
		var matchName		= onlinePlayersList[playerName].match;

		if(onlinePlayersList[playerName].match == null){
			OC.api = new Object();
			OC.api.resultado = false;
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"false"';
		} 		
		else if(((matchesList[matchName].player1Name == playerName) 
			&& (matchesList[matchName].putPassOrRetirePlayer1 == false))
			|| ((matchesList[matchName].player2Name == playerName) 
			&& (matchesList[matchName].putPassOrRetirePlayer2 == false))) {
			OC.api = new Object();
			OC.api.resultado = false; //Operación fallida
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"true"';
		} else if (matchesList[matchName].rules.allowPass == true) {
			OC.api = new Object();
			OC.api.resultado = true;
			OC.api.noEnviar = true;
			if (matchesList[matchName].player1Name == playerName) matchesList[matchName].putPassOrRetirePlayer1 = false;
			else putPassOrRetirePlayer2 = false;			
		}
		else {
			OC.api = new Object();
			OC.api.resultado = false;
			OC.api.noEnviar = false;
			OC.api.enviarAmbos = false;
			OC.api.razones = '"alreadyPlaying":"false","waitingOtherAdv":"false","rejected":"true"';
		}		
		funcionAplazada.resolve(OC);
		return funcionAplazada.promise;
	}
}



function roundEndAlert(matchName, numberOfFinishRound){
	if(matchesList[matchName]!=null){
		if(matchesList[matchName].numberOfFinishRound==numberOfFinishRound){
			console.log("avisar que termino la partida");
			matchesList[matchName].numberOfFinishRound++;
			var clientObjectWinner = new Object();			
			clientObjectWinner.connection = onlinePlayersList[playerNameWinner].connection;
			clientObjectWinner.clientType = onlinePlayersList[playerNameWinner].clientType;

			var clientObjectLoser = new Object();
			clientObjectLoser.connection = onlinePlayersList[playerNameLoser].connection;
			clientObjectLoser.clientType = onlinePlayersList[playerNameLoser].clientType;

			//Aqui debo guardar si se acaba el tiempo del round
			//SE MANDA A GUARDAR ROUND A BASE DE DATOS
			//matchesList[matchName].finRound=new Date();
			//db.guardar_round(function(){

			//},matchName,matchesList[matchName].moves,matchesList[matchName].inicioRound,
			//matchesList[matchName].finRound,matchesList[matchName].whoStarted,"No hay Ganadores","DRAW-END_ROUND_TIME",matchesList[matchName].rules.board.height,matchesList[matchName].rules.board.width);
			//FIN GUARDAR EN BASE DE DATOS
			//SE RESETEA EL ARREGLO DE MOVIDAS UNA VEZ SE GUARDA
			//matchesList[matchName].moves=[];


			if(matchesList[matchName].numberOfFinishRound<matchesList[matchName].rules.roundsPerMatch){
					//chevo arregla los mensajes
					matchesList[matchName].resetMatch();
					clientObjectWinner.response	= JSON.parse(('{"command": "ROUND_END", "cause" : "DRAW","xPos": -1, "yPos": -1, "valid": false, "reason":"TIME_ROUND", "nextGame" : true }'));
					clientObjectLoser.response	= JSON.parse(('{"command": "ROUND_END", "cause" : "DRAW","xPos": -1, "yPos": -1, "valid": false, "reason":"TIME_ROUND", "nextGame" : true }'));

					messageSender.sendMessage(clientObjectWinner);
					messageSender.sendMessage(clientObjectLoser);				
				}else{

					//aqui ya no se juegan mas round asi ke se guarda fin del match
					//matchesList[matchName].endTime= new Date();
					//db.guardar_fin_match(function(){

					//},matchName,matchesList[matchName].endTime,"NO CALCULADO"); //FALTA AGREGAR EL NOMBRE DEL JUGADOR QUE GANA MAS RONDAS
					//chevo arregla los mensajes
					var player1= matchesList[matchName].player1Name;
					var player2= matchesList[matchName].player2Name;
			
					onlinePlayersList[player1].match = null;
					onlinePlayersList[player2].match = null;
					delete(matchesList[matchName]);


					clientObjectWinner.response	= JSON.parse(('{"command": "ROUND_END", "cause" : "DRAW","xPos": -1, "yPos": -1, "valid": false, "reason":"TIME_ROUND", "nextGame" : false }'));
					clientObjectLoser.response	= JSON.parse(('{"command": "ROUND_END", "cause" : "DRAW","xPos": -1, "yPos": -1, "valid": false, "reason":"TIME_ROUND", "nextGame" : false }'));

					messageSender.sendMessage(clientObjectWinner);
					messageSender.sendMessage(clientObjectLoser);
				}		
		}

	}
	//avisar a los jugadores que se acabo el tiempo
}

function endOfTimeTurn(matchName, playerName, timeChecking, numberOfFinishRound){
	console.log("playerName = "+playerName);
	if(matchesList[matchName]!=null){
		if(matchesList[matchName].numberOfFinishRound==numberOfFinishRound){		
			var match = matchesList[matchName];
			var lastMovementTimePlayer;
			var playerNameLoser;
			var playerNameWinner;
			if(match.player1Name==playerName){
				lastMovementTimePlayer = match.lastMovementTimePlayer1;
				playerNameLoser = match.player2Name;
				playerNameWinner = match.player1Name;
			}else{
				lastMovementTimePlayer = match.lastMovementTimePlayer2;
				playerNameLoser = match.player1Name;
				playerNameWinner = match.player2Name;
			}

			if(timeChecking==lastMovementTimePlayer){
				console.log("WINNER: "+playerNameWinner);
				console.log("Losser: "+playerNameLoser);
				matchesList[matchName].numberOfFinishRound++;
				var clientObjectWinner = new Object();			
				clientObjectWinner.connection = onlinePlayersList[playerNameWinner].connection;
				clientObjectWinner.clientType = onlinePlayersList[playerNameWinner].clientType;

				var clientObjectLoser = new Object();
				clientObjectLoser.connection = onlinePlayersList[playerNameLoser].connection;
				clientObjectLoser.clientType = onlinePlayersList[playerNameLoser].clientType;

				//aca deberia guardar
				//Aqui debo guardar si se acaba el tiempo del round
				//SE MANDA A GUARDAR ROUND A BASE DE DATOS
				matchesList[matchName].finRound=new Date();
				db.guardar_round(function(){

				},matchName,matchesList[matchName].moves,matchesList[matchName].inicioRound,
				matchesList[matchName].finRound,matchesList[matchName].whoStarted,playerNameLoser,"END_TURN_TIME",matchesList[matchName].rules.board.height,matchesList[matchName].rules.board.width);
				//FIN GUARDAR EN BASE DE DATOS
				//SE RESETEA EL ARREGLO DE MOVIDAS UNA VEZ SE GUARDA
				matchesList[matchName].moves=[];

				

				if(matchesList[matchName].numberOfFinishRound<matchesList[matchName].rules.game.roundsPerMatch){
					//chevo arregla los mensajes
					matchesList[matchName].resetMatch();
					clientObjectWinner.response	= JSON.parse(('{"command": "ROUND_END", "cause" : "DEFEAT","xPos": -1, "yPos": -1, "valid": false, "reason":"TIME_TURN", "nextGame" : true }'));
					clientObjectLoser.response	= JSON.parse(('{"command": "ROUND_END", "cause" : "VICTORY","xPos": -1, "yPos": -1, "valid": false, "reason":"TIME_TURN", "nextGame" : true }'));
					messageSender.sendMessage(clientObjectWinner);
					messageSender.sendMessage(clientObjectLoser);				
				}else{
					
					//aqui ya no se juegan mas round asi ke se guarda fin del match
					matchesList[matchName].endTime= new Date();
					db.guardar_fin_match(function(){

					},matchName,matchesList[matchName].endTime,"NO CALCULADO"); //FALTA AGREGAR EL NOMBRE DEL JUGADOR QUE GANA MAS RONDAS
					//chevo arregla los mensajes

					var player1= matchesList[matchName].player1Name;
					var player2= matchesList[matchName].player2Name;
					onlinePlayersList[player1].match = null;
					onlinePlayersList[player2].match = null;
					delete(matchesList[matchName]);

					clientObjectWinner.response	= JSON.parse(('{"command": "ROUND_END", "cause" : "DEFEAT","xPos": -1, "yPos": -1, "valid": false, "reason":"TIME_TURN", "nextGame" : false }'));
					clientObjectLoser.response	= JSON.parse(('{"command": "ROUND_END", "cause" : "VICTORY" ,"xPos": -1, "yPos": -1, "valid": false, "reason":"TIME_TURN", "nextGame" : false }'));
					messageSender.sendMessage(clientObjectWinner);
					messageSender.sendMessage(clientObjectLoser);
					//Aquí se jugaron todos los round de la partida
				}				
			}
		}
	}		
}

module.exports.api = api;
