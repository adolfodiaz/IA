/*
	outputProcessor.js

	Procesador de salida de la subAPI de Comunicaciones

	Recibe los datos entregados por la API ante una petición hecha por el inputProcessor,
	construye el objeto clientObject.response y envía la respuesta a través del messageSender.

*/


var MessageSender = require('./messageSender.js').messageSender;
var messageSender = new MessageSender();

var Q = require('q');

function outputProcessor(){
	this.buildResponse = function(APIresponse){
		//Pendiente construir respuestas, temporalmente sale con el mensaje "crudo" de la API
		//Lo que se debe hacer es procesar la APIresponse
		var funcionAplazada = Q.defer();
		//trabajo del outputProcessor construyendo

		funcionAplazada.resolve(APIresponse);
		return funcionAplazada.promise;
		
	}

	this.registerPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer();
		/*if((clientObject.preProcResults.okName == false)||(clientObject.preProcResults.okPass == false)||(clientObject.preProcResults.okType == false)){
			msgSender.sendErrArgsCommand(clientObject);
			funcionAplazada.resolve("null");
		}*/
		if (clientObject.api.response == "REG_FAIL"){
			var message = JSON.parse(('{"command": "REG_FAIL"}'));

			clientObject.response = message;
			funcionAplazada.resolve(clientObject);
		}

		else {
		if(clientObject.api.response == "REG_SUCESS"){			
			var message = JSON.parse(('{"command": "REG_SUCESS","clientName": "'+clientObject.data.arguments.clientName+'", "id": "'+clientObject.api.playerid+'"}'));

			clientObject.response = message;
			funcionAplazada.resolve(clientObject);
		}
//revisar esto 
// ¿Por qué le mandan la regla  a alguien más? 	
	//	var clientObject2 = new Object();
	//	clientObject2.response = JSON.parse(('{"command": "RULES","boardSize": "4","turnDuration": "60","maxRoundTime": "1200","roundsPerMatch": "5"}'));
	//	clientObject2.connection = clientObject.connection;
	//	clientObject2.clientType = clientObject.clientType;
	//	messageSender.sendMessage(clientObject2);
		}
		return funcionAplazada.promise;
		//escribir acá la reacción de la respuesta de la API
	}

	this.sessionStartPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		if(clientObject.api.resultado){ //si a la API le fue bien
			//var response = new Object();
			//response.command = "RULES";
			//response.arguments = clientObject.api.datos;
			clientObject.response = JSON.parse(('{"command": "RULES","boardSize": "4","turnDuration": "60","maxRoundTime": "1200","roundsPerMatch": "5"}'));
		} else { //no debería pasar esto, enviar mensaje de error interno
			var response = new Object();
			response.command = "ERR_INTERNAL_GM_ERROR";
			response.arguments = new Object();
			response.arguments.reason = clientObject.api.razones;
			clientObject.response = response;
		}
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.acceptPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = JSON.parse(('{"command": "ACCEPT_ACK"}'));
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.declinePostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.sessionQuitPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		if(clientObject.api.resultado){ //si a la API le fue bien
			var response = new Object();
			response.command = "STATS";
			response.arguments = clientObject.api.datos;
			clientObject.response = response;
		} else { //no debería pasar esto, enviar mensaje de error interno
			var response = new Object();
			response.command = "ERR_INTERNAL_GM_ERROR";
			response.arguments = new Object();
			response.arguments.reason = clientObject.api.razones;
			clientObject.response = response;
		}
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.statsQueryPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		if(clientObject.api.resultado){ //si a la API le fue bien
			var response = new Object();
			response.command = "STATS";
			response.arguments = clientObject.api.datos;
			clientObject.response = response;
		} else { //no debería fallar la búsqueda de estadísticas, enviar mensaje de error interno
			var response = new Object();
			response.command = "ERR_INTERNAL_GM_ERROR";
			response.arguments = new Object(); //para que arguments != NULL y que no se lance un ERR_ARGS desde el cliente
			clientObject.response = response;
		}
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.matchReqInfoPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.matchLookupPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		var response = new Object();
		/*if(!clientObject.api.estado){
			var razones = JSON.parse(clientObject.api.razones);
			if((razones.alreadyPlaying)||(razones.waitingOtherAdv)||(razones.rejected)){
				response.command = "MATCH_ADV_BUSY";
				response.arguments = razones
				clientObject.response = response;
			} //else {
				
			//}


		clientObject.response = clientObject.api;

		//enviar mensaje error;*/
		if(!clientObject.api.resultado){
			
			var message = JSON.parse(('{"command": "ERROR", "arguments":{'+clientObject.api.razones+'}}'));//MATCH_ADV_BUSY o MATCH_LOOKUP_FAIL según sea el caso
			clientObject.response = message;
		}
		else{
			//en caso de enviar mensaje
			if(!clientObject.api.noEnviar){
				var message = JSON.parse(('{"command": "MATCH_NOTIFY"}'));
				//enviar mensaje al otro jugador
				if(clientObject.api.enviarAmbos){
					var clientObject2 = new Object();
					clientObject2.response = message;
					clientObject2.connection = onlinePlayersList[clientObject.api.player].connection;
					clientObject2.clientType = onlinePlayersList[clientObject.api.player].clientType;
					messageSender.sendMessage(clientObject2);
				}//fin (envio ambos)
				//enviar a solo el usuario
				else{
					var message = JSON.parse(('{"command": "MATCH_LOOKUP_OK"}'));
				}
			}
			else{
				var message = JSON.parse(('{"command": "MATCH_LOOKUP_OK"}'));
			}
			clientObject.response = message;
		}
		//mandar mensajes
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.matchLookupCancelPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.matchReadyPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		funcionAplazada.resolve(clientObject);
		console.log('llego al postprocessor');

		if(!clientObject.api.resultado){ //false
		 	
			var message = JSON.parse(('{"command": "ERROR", "arguments":{'+clientObject.api.razones+'}}'));//MATCH_ADV_BUSY o MATCH_LOOKUP_FAIL según sea el caso
			clientObject.response = message;
		}
		else{
			//en caso de enviar mensaje
			if(!clientObject.api.noEnviar){
				var datos = new Object();
				datos.color = "Red";
				datos.advColor= "Blue";
				datos.initialBoard = null;
				datos.firstMove = clientObject.api.datos.firstMove;
				var message = JSON.parse(('{"command": "ROUND_START","advColor": "Blue", "firstMove": "'+ !datos.firstMove+'"}'));

				//enviar mensaje al otro jugador
				if(clientObject.api.enviarAmbos){
					var clientObject2 = new Object();
					clientObject2.response = JSON.parse(('{"command": "ROUND_START","advColor": "Blue", "firstMove": "'+ datos.firstMove+'"}'));				
					console.log(clientObject2.response);
					clientObject2.connection = onlinePlayersList[clientObject.api.player].connection;
					clientObject2.clientType = onlinePlayersList[clientObject.api.player].clientType;
					messageSender.sendMessage(clientObject2);
				}//fin (envio ambos)
				//enviar a solo el usuario
				else{
					var message = JSON.parse(('{"command": "OK"}'));
				}
			}
			else{//caso de no enviar mensaje;
				var message = JSON.parse(('{"command": "OK"}'));
			}
			clientObject.response = message;
		}

		//mandar mensajes
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}
	

	this.matchRejectPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.roundStartAckPostprocessor = function(clientObject){


		/*var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise; */


		var funcionAplazada = Q.defer()
		funcionAplazada.resolve(clientObject);
		console.log('LLegó a roundStartAckPostprocessor');



		if(!clientObject.api.resultado){ //Si hay un error 
			var message = JSON.parse(('{"command": "ERROR", "arguments":{'+clientObject.api.razones+'}}'));
			clientObject.response = message;
		}
		else{
			//en caso de enviar mensaje
			if(!clientObject.api.noEnviar){ //Enviamos TURN 
				var playerName 		= getPlayerNameForID[clientObject.data.arguments.id];
				var matchName 		= onlinePlayersList[playerName].match;
				var rules 			= matchesList[matchName].rules;
				if(clientObject.api.enviarAmbos){ // Sólo le tengo que enviar el mensaje al jugador conectado directamente.
					var clientObject2 = new Object();
					clientObject2.response = JSON.parse(('{"command": "TURN","yourTurn" : true,"move": "FIRST", "xPos": -1, "yPos": -1}'));
					clientObject2.connection = onlinePlayersList[clientObject.api.player].connection;
					clientObject2.clientType = onlinePlayersList[clientObject.api.player].clientType;
					messageSender.sendMessage(clientObject2);
					var message = JSON.parse(('{"command": "TURN","yourTurn" : false,"move": "WAIT", "xPos": -1, "yPos": -1}'));
					clientObject.response = message;
					console.log('marca2');
				}
			}
			else {
				var message = JSON.parse(('{"command": "OK"}'));
				clientObject.response = message;
			}
		}

		//mandar mensajes
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.putPostprocessor = function(clientObject){
		
		var funcionAplazada = Q.defer();
		funcionAplazada.resolve(clientObject);
		clientObject.response = clientObject.api.response;

		var playerName 		= getPlayerNameForID[clientObject.data.arguments.id];
		var matchName 		= onlinePlayersList[playerName].match;
		//var rules = 
		if(!clientObject.api.resultado){ //ENTRA SI ES FALSE Si hay un error  y si la jugada fue inválida			
			if (clientObject.api.noEnviar) {// ENTRA SI ES TRUE Si la jugado fue inválida
				var message = JSON.parse(('{"command": "ERROR", "arguments":{'+clientObject.api.razones+'}}'));
				clientObject.response = message;
			}
			else { // ENTRA SI ES FALSE

				var message = JSON.parse(('{"command": "ERR_WRONG_POS"}'));

				clientObject.response = message;
			}			
		}
		else{
			//Hay que enviar un TURN y hay que ver si alguien gano, perdió o sigue el juego.
			
			if (clientObject.api.datos.win == 0){ // La Jugada es válida pero nadie ha ganado
				var clientObject2 = new Object();
				//clientObject2.response =JSON.parse(('{"command": "TURN","remainingRoundTime":"'+rules.time.remainingRoundTime+'", "yourTurn" : true , "advMove": {"move": "PUT", "xPos":'+clientObject.datos.xPos+', "yPos":'+clientObject.datos.yPos+', "valid": true, "timeUsed" : 0}}}'));
				
				//var message =JSON.parse(('{"command": "TURN","remainingRoundTime":"'+rules.time.remainingRoundTime+'", "yourTurn" : false , "advMove": {"move": "PUT", "xPos":'+clientObject.datos.xPos+', "yPos":'+clientObject.datos.yPos+', "valid": true, "timeUsed" : 0}}}'));

				clientObject2.response =JSON.parse(('{"command": "TURN","yourTurn" : true , "move": "PUT", "xPos":'+clientObject.api.datos.xPos+', "yPos":'+clientObject.api.datos.yPos+'}'));
				
				var message =JSON.parse(('{"command": "TURN","yourTurn" : false , "move": "PUT", "xPos":'+clientObject.api.datos.xPos+', "yPos":'+clientObject.api.datos.yPos+'}'));
			}
			else{
				matchesList[matchName].numberOfFinishRound++;
				if(matchesList[matchName].numberOfFinishRound<matchesList[matchName].rules.game.roundsPerMatch){
					var nextGame = true;
					matchesList[matchName].resetMatch();
					//aun no se han jugado todos los rounds
				}
				else{
					var nextGame = false;
					var player1= matchesList[matchName].player1Name;
					var player2= matchesList[matchName].player2Name;
					onlinePlayersList[player1].match = null;
					onlinePlayersList[player2].match = null;
					delete(matchesList[matchName]);
					//aqui se ve que ya no se deben hacer mas rounds
				}

				if (clientObject.api.datos.win == 1){ // Si el jugador que tiene la conexión directa es quien gana por 4 en Linea
					var message = JSON.parse(('{"command": "ROUND_END","cause" : "VICTORY", "xPos":'+clientObject.api.datos.xPos+', "yPos":'+clientObject.api.datos.yPos+', "valid": false , "reason": "4L", "nextGame" : '+nextGame+'}' ));
					var clientObject2 = new Object();
					clientObject2.response = JSON.parse(('{"command": "ROUND_END","cause" : "DEFEAT", "xPos":'+clientObject.api.datos.xPos+', "yPos":'+clientObject.api.datos.yPos+', "valid": true, "reason": "4L", "nextGame" : '+nextGame+'}'));
				}

				if (clientObject.api.datos.win == 2){ // Si el jugador que tiene la conexión directa es quien pierde por hacer un 3 en linea 
					var message = JSON.parse(('{"command": "ROUND_END", "cause" : "DEFEAT","xPos":'+clientObject.api.datos.xPos+', "yPos":'+clientObject.api.datos.yPos+', "valid": false, "reason": "3L", "nextGame" : '+nextGame+'}'));
					var clientObject2 = new Object();
					clientObject2.response = JSON.parse(('{"command": "ROUND_END","cause" : "VICTORY", "xPos":'+clientObject.api.datos.xPos+', "yPos":'+clientObject.api.datos.yPos+', "valid": true , "reason": "3L", "nextGame" : '+nextGame+'}'));
				}


				if (clientObject.api.datos.win == 3){ // Empate porque todos los casilleros están ocupados.
					var message = JSON.parse(('{"command": "ROUND_END", "cause" : "DRAW", "xPos":'+clientObject.api.datos.xPos+', "yPos":'+clientObject.api.datos.yPos+', "valid": false, "reason": "FULL_BOARD", "nextGame" : '+nextGame+'}'));
					var clientObject2 = new Object();
					clientObject2.response = JSON.parse(('{"command": "ROUND_END","cause" : "DRAW", "xPos":'+clientObject.api.datos.xPos+', "yPos":'+clientObject.api.datos.yPos+', "valid": true, "reason": "FULL_BOARD", "nextGame" : '+nextGame+'}'));
				}

				
				


			}
			clientObject2.connection = onlinePlayersList[clientObject.api.player].connection;
			clientObject2.clientType = onlinePlayersList[clientObject.api.player].clientType;
			messageSender.sendMessage(clientObject2);
			clientObject.response = message;
		}


		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.turnEndPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.turnQueryPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.clockReqPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.boardCheckPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.boardReqPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.passPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.retireRoundPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.retireMatchPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.projectedTiePostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.projectedTieDeactPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.errUnknownCommandPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.errArgsPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.errOutOfContextPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.panicQuitPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.waitPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.resumePostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.pingPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.pongPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}
}


module.exports.outputProcessor = outputProcessor;	 