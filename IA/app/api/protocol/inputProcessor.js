/*
	inputProcessor.js

	Procesador de entrada de la subAPI de Comunicaciones

	Ante un comando correcto, realiza las consultas necesarias a la API para poder generar un resultado
	y deriva el resultado a la función Postprocessor.

*/

var OutputProcessor = require('./outputProcessor.js').outputProcessor;
var outputProcessor = new OutputProcessor();
var MessageSender = require('./messageSender.js').messageSender;
var msgSender = new MessageSender();


function inputProcessor(){
	this.registerPreprocessor = function(clientObject){
		console.log("registerPreprocessor");
		api.register(clientObject).then(outputProcessor.registerPostprocessor).done(msgSender.sendMessage);
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
		console.log("Entré a matchLookupPreprocessor");
		api.match_lookup(clientObject).then(outputProcessor.matchLookupPostprocessor).done(msgSender.sendMessage);
	}

	this.matchLookupCancelPreprocessor = function(clientObject){

	}

	this.matchReadyPreprocessor = function(clientObject){

	}


}

module.exports.inputProcessor = inputProcessor;