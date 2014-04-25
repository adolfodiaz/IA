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

	this.matchRejectPreprocessor = function(clientObject){

	}

	this.roundStartAckPreprocessor = function(clientObject){

	}

	this.turnEndPreprocessor = function(clientObject){

	}

	this.turnQueryPreprocessor = function(clientObject){

	}

	this.clockReqPreprocessor = function(clientObject){

	}

	this.boardCheckPreprocessor = function(clientObject){

	}

	this.boardReqPreprocessor = function(clientObject){

	}

	this.passPreprocessor = function(clientObject){

	}

	this.retireRoundPreprocessor = function(clientObject){
		
	}

	this.retireMatchPreprocessor = function(clientObject){
		
	}

	this.projectedTiePreprocessor = function(clientObject){

	}

	this.projectedTieDeactPreprocessor = function(clientObject){
		
	}

	this.errUnknownCommandPreprocessor = function(clientObject){

	}

	this.errArgsPreprocessor = function(clientObject){

	}

	this.panicQuitPreprocessor = function(clientObject){

	}

	this.waitPreprocessor = function(clientObject){

	}

	this.resumePreprocessor = function(clientObject){

	}

	this.pingPreprocessor = function(clientObject){

	}

	this.pongPreprocessor = function(clientObject){
		
	}

}

module.exports.inputProcessor = inputProcessor;