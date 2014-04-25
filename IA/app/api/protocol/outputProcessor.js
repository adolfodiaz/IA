/*
	outputProcessor.js

	Procesador de salida de la subAPI de Comunicaciones

	Recibe los datos entregados por la API ante una petición hecha por el inputProcessor,
	construye el objeto clientObject.response y envía la respuesta a través del messageSender.

*/


var MessageSender = require('./messageSender.js').messageSender;
var msgSender = new MessageSender();

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
		console.log("Entré al matchLookup Postprocessor");
		var funcionAplazada = Q.defer()
		clientObject.response = clientObject.api;
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
}


module.exports.outputProcessor = outputProcessor;