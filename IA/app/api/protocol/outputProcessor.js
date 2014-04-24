/*
	outputProcessor.js

	Procesador de salida de la subAPI de Comunicaciones

	Recibe los datos entregados por la API ante una petición hecha por el inputProcessor,
	construye el objeto clientObject.response y envía la respuesta a través del messageSender.

*/

var MessageSender = require('./messageSender.js');
var msgSender = new MessageSender.messageSender();

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
		if((clientObject.preProcResults.okName == false)||(clientObject.preProcResults.okPass == false)||(clientObject.preProcResults.okType == false)){
			msgSender.sendErrArgsCommand(clientObject);
			return;
		}

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

	}

	this.matchLookupCancelPostprocessor = function(clientObject){
		
	}
}


module.exports.outputProcessor = outputProcessor;