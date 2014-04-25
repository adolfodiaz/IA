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

	}

	this.acceptPostprocessor = function(clientObject){

	}

	this.sessionQuitPostprocessor = function(clientObject){

	}

	this.statsQueryPreprocessor = function(clientObject){

	}

	this.matchReqInfoPreprocessor = function(clientObject){

	}

	this.matchLookupPostprocessor = function(clientObject){
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api;
		if(!clientObject.api.estado){
			//enviar mensaje error;
			var razonMensaje = "";
			for (var razon in clientObject.api.razon) {
				console.log(razon);
				razonMensaje += clientObject.api.razon[razon] + " ";
			};
			var message = JSON.parse(('{"command": "ERROR", "arguments":"'+razonMensaje+'"}'));
			clientObject.response = message;
		}
		else{

			switch(clientObject.api.command){
				case 'OK': 
					var message = JSON.parse(('{"command": "MATCH_LOOKUP_OK"}'));
					break;
				case 'MATCH_NOTIFY':
					var message = JSON.parse(('{"command": "MATCH_NOTIFY"}'));
					var clientObject2 = new Object();
					clientObject2.response = message;
					clientObject2.connection = clientObject.api.player1Connection;
					clientObject2.clientType = clientObject.api.player1Type;
					console.log(clientObject2);
					messageSender.sendMessage(clientObject2);
					break;
				default:
					var message = JSON.parse(('{"command": "ERROR", "arguments":"comando no reconocido"}'));
			}
			clientObject.response = message;
		}
		//mandar mensajes
		funcionAplazada.resolve(clientObject);
		return funcionAplazada.promise;
	}

	this.matchLookupCancelPostprocessor = function(clientObject){

	}

	this.matchReadyPostprocessor = function(clientObject){

	}

	this.matchRejectPreprocessor = function(clientObject){

	}

	this.roundStartAckPreprocessor = function(clientObject){

	}

	this.turnEndPreprocessor = function(clientObject){

	}

	this.turnQueryPostprocessor = function(clientObject){

	}

	this.clockReqPreprocessor = function(clientObject){

	}

	this.boardCheckPostprocessor = function(clientObject){

	}

	this.boardReqPreprocessor = function(clientObject){

	}

	this.passPostprocessor = function(clientObject){
		
	}

	this.retireRoundPostprocessor = function(clientObject){
		
	}

	this.retireMatchPostprocessor = function(clientObject){
		
	}

	this.projectedTiePostprocessor = function(clientObject){
		
	}

	this.projectedTieDeactPostprocessor = function(clientObject){

	}

	this.unknownCommandPostprocessor = function(clientObject){

	}

	this.errArgsPostprocessor = function(clientObject){
		
	}

	this.panicQuitPostprocessor = function(clientObject){
		
	}

	this.waitPostprocessor = function(clientObject){

	}

	this.resumePostprocessor = function(clientObject){

	}

	this.pingPostprocessor = function(clientObject){

	}

	this.pongPostprocessor = function(clientObject){
		
	}
}


module.exports.outputProcessor = outputProcessor;