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
		console.log("registerPostprocessor");
		/*if((clientObject.preProcResults.okName == false)||(clientObject.preProcResults.okPass == false)||(clientObject.preProcResults.okType == false)){
			msgSender.sendErrArgsCommand(clientObject);
			funcionAplazada.resolve("null");
		}*/
		if(clientObject.api.response == "REG_SUCESS"){			
			var message = JSON.parse(('{"command": "REG_SUCESS","arguments": {"clientName": "'+clientObject.data.arguments.clientName+'", "id": "'+clientObject.api.playerid+'", "policies": {"MAX_ABS_IDLE_TIME": "'+clientObject.api.policies.MAX_ABS_IDLE_TIME+'"}}}'));
			clientObject.response = message;
			funcionAplazada.resolve(clientObject);
			console.log("registerPostprocessor");
		}
		return funcionAplazada.promise;
		//escribir acá la reacción de la respuesta de la API
	}

	this.sessionStartPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.acceptPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
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
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.statsQueryPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
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
				var message = JSON.parse(('{"command": "MATCH_NOTIFY","arguments": {"id": "839", "advId": "491", "advName": "Adversary"}}'));
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
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);

		if(!clientObject.api.resultado){ //Caso Error
			
			if (!clientObject.api.noEnviar && !clientObject.api.enviarAmbos) { //Error técnico
				var message = JSON.parse(('{"command": "ERROR", "arguments":{'+clientObject.api.razones+'}}'));
				clientObject.response = message;
			}

			if (!clientObject.api.noEnviar && clientObject.api.enviarAmbos) { // MATCH_ADV_BUSY
					//Jugador 2
					var clientObjectP2 = new Object();
					var message = JSON.parse(('{"command": "MATCH_ADV_BUSY", "arguments":{'+clientObject.api.razones+'}}'));

					clientObjectP2.response = message;
					clientObjectP2.connection = clientObject.api.player1Connection;
					clientObjectP2.clientType = clientObject.api.player1Type;

					messageSender.sendMessage(clientObjectP2);
					/////////

					//Jugador 1

					
					var message = JSON.parse(('{"command": "MATCH_ADV_BUSY", "arguments":{'+clientObject.api.razones+'}}'));
					clientObject.response = message;
			}
		}
		else{// ROUND_START

					var datos = clientObject.datos;
					datos.color = "Red";
					datos.advColor= "Blue";
					datos.initialBoard null;
					var clientObjectP2 = new Object();
					var message =JSON.parse(('{"command": "ROUND_START","arguments": {"color": "'+datos.color+'", "advColor": "'+datos.advColor+'", "firstMove": "'+(!datos.firstMove)+'", "initialBoard": "'+datos.initialBoard+'"}}'));

					clientObjectP2.response = message;
					clientObjectP2.connection = clientObject.api.player1Connection;
					clientObjectP2.clientType = clientObject.api.player1Type;

					messageSender.sendMessage(clientObjectP2);
					/////////

					//Jugador 1

					
					var message =JSON.parse(('{"command": "ROUND_START","arguments": {"color": "'+datos.color+'", "advColor": "'+datos.advColor+'", "firstMove": "'+datos.firstMove+'", "initialBoard": "'+datos.initialBoard+'"}}'));
					clientObject.response = message;
					
					
		}	
		//mandar mensajes
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}
	}

	this.matchRejectPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.roundStartAckPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api.response;
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