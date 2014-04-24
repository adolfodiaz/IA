/*
	inputProcessor.js

	Procesador de entrada de la subAPI de Comunicaciones

	Ante un comando correcto, realiza las consultas necesarias a la API para poder generar un resultado
	y deriva el resultado a la función Postprocessor.

*/

function inputProcessor(){
	this.registerPreprocessor = function(clientObject){
		api.register(clientObject).then(registerPostprocessor);
	}

	this.sessionStartPreprocessor = function(clientObject){

	}

	this.acceptPreprocessor = function(clientObject){

	}

	this.sessionQuitPreprocessor = function(clientObject){

	}

	this.statsQueryPreprocessor = function(clientObject){

	}

	this.matchReqInfoPreprocessor = function(clientObject){

	}

	this.matchLookupPreprocessor = function(clientObject){

	}

	this.matchLookupCancelPreprocessor = function(clientObject){

	}

	this.matchReadyPreprocessor = function(clientObject){
		
	}


}

module.exports.inputProcessor = inputProcessor;