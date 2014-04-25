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
		api.register(clientObject).then(outputProcessor.registerPostprocessor).done(msgSender.sendMessage);
	}

	this.sessionStartPreprocessor = function(clientObject){
		api.session_start(clientObject).then(outputProcessor.sessionStartPostprocessor).done(msgSender.sendMessage);
	}

	this.acceptPreprocessor = function(clientObject){
		api.accept(clientObject).then(outputProcessor.acceptPostprocessor).done(msgSender.sendMessage);
	}

	this.declinePreprocessor = function(clientObject){
		api.decline(clientObject).then(outputProcessor.declinePostprocessor).done(msgSender.sendMessage);
	}

	this.sessionQuitPreprocessor = function(clientObject){
		api.session_quit(clientObject).then(outputProcessor.sessionQuitPostprocessor).done(msgSender.sendMessage);
	}

	this.statsQueryPreprocessor = function(clientObject){
		api.stats_query(clientObject).then(outputProcessor.statsQueryPostprocessor).done(msgSender.sendMessage);
	}

	this.matchReqInfoPreprocessor = function(clientObject){
		api.match_req_info(clientObject).then(outputProcessor.matchReqInfoPostprocessor).done(msgSender.sendMessage);
	}

	this.matchLookupPreprocessor = function(clientObject){
		api.match_lookup(clientObject).then(outputProcessor.matchLookupPostprocessor).done(msgSender.sendMessage);
	}

	this.matchLookupCancelPreprocessor = function(clientObject){
		api.match_lookup_cancel(clientObject).then(outputProcessor.matchLookupCancelPostprocessor).done(msgSender.sendMessage);
	}

	this.matchReadyPreprocessor = function(clientObject){
		api.match_ready(clientObject).then(outputProcessor.matchReadyPostprocessor).done(msgSender.sendMessage);
	}

	this.matchRejectPreprocessor = function(clientObject){
		api.match_reject(clientObject).then(outputProcessor.matchRejectPostprocessor).done(msgSender.sendMessage);
	}

	this.roundStartAckPreprocessor = function(clientObject){
		api.round_start_ack(clientObject).then(outputProcessor.roundStartAckPostprocessor).done(msgSender.sendMessage);
	}

	this.turnEndPreprocessor = function(clientObject){
		api.turn_end(clientObject).then(outputProcessor.turnEndPostprocessor).done(msgSender.sendMessage);
	}

	this.turnQueryPreprocessor = function(clientObject){
		api.turn_query(clientObject).then(outputProcessor.turnQueryPostprocessor).done(msgSender.sendMessage);
	}

	this.clockReqPreprocessor = function(clientObject){
		api.clock_req(clientObject).then(outputProcessor.clockReqPostprocessor).done(msgSender.sendMessage);
	}

	this.boardCheckPreprocessor = function(clientObject){
		api.board_check(clientObject).then(outputProcessor.boardCheckPostprocessor).done(msgSender.sendMessage);
	}

	this.boardReqPreprocessor = function(clientObject){
		api.board_req(clientObject).then(outputProcessor.boardReqPostprocessor).done(msgSender.sendMessage);
	}

	this.passPreprocessor = function(clientObject){
		api.pass(clientObject).then(outputProcessor.passPostprocessor).done(msgSender.sendMessage);
	}

	this.retireRoundPreprocessor = function(clientObject){
		api.retire_round(clientObject).then(outputProcessor.retireRoundPostprocessor).done(msgSender.sendMessage);
	}

	this.retireMatchPreprocessor = function(clientObject){
		api.retire_match(clientObject).then(outputProcessor.retireMatchPostprocessor).done(msgSender.sendMessage);
	}

	this.projectedTiePreprocessor = function(clientObject){
		api.projected_tie(clientObject).then(outputProcessor.projectedTiePostprocessor).done(msgSender.sendMessage);
	}

	this.projectedTieDeactPreprocessor = function(clientObject){
		api.projected_tie_deact(clientObject).then(outputProcessor.projectedTieDeactPostprocessor).done(msgSender.sendMessage);
	}

	this.errUnknownCommandPreprocessor = function(clientObject){
		api.err_unknown_command(clientObject).then(outputProcessor.errUnknownCommandPostprocessor).done(msgSender.sendMessage);
	}

	this.errArgsPreprocessor = function(clientObject){
		api.err_args(clientObject).then(outputProcessor.errArgsPostprocessor).done(msgSender.sendMessage);
	}

	this.errOutOfContextPreprocessor = function(clientObject){
		api.err_out_of_context(clientObject).then(outputProcessor.errOutOfContextPostprocessor).done(msgSender.sendMessage);
	}

	this.panicQuitPreprocessor = function(clientObject){
		api.panic_quit(clientObject).then(outputProcessor.panicQuitPostprocessor).done(msgSender.sendMessage);
	}

	this.waitPreprocessor = function(clientObject){
		api.wait(clientObject).then(outputProcessor.waitPostprocessor).done(msgSender.sendMessage);
	}

	this.resumePreprocessor = function(clientObject){
		api.resume(clientObject).then(outputProcessor.resumePostprocessor).done(msgSender.sendMessage);
	}

	this.pingPreprocessor = function(clientObject){
		api.ping(clientObject).then(outputProcessor.pingPostprocessor).done(msgSender.sendMessage);
	}

	this.pongPreprocessor = function(clientObject){
		api.pong(clientObject).then(outputProcessor.pongPostprocessor).done(msgSender.sendMessage);
	}

}

module.exports.inputProcessor = inputProcessor;