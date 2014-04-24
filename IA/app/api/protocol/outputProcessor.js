/*
	outputProcessor.js

	Procesador de salida de la subAPI de Comunicaciones

	Ante un comando, prepara la salida (construye el objeto Argumentos requerido por messageSender)

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
	
}


module.exports.outputProcessor = outputProcessor;