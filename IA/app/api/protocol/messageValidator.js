var MessageSender = require('./messageSender.js');
var messageSender = new MessageSender.messageSender();
var Api = require('./../api.js');
api = new Api.api();

var TestComponent = require('./TestComponent.js');
var testComponent = new TestComponent.testComponent();

var OutputProcessor = require('./outputProcessor.js');
var outputProcessor = new OutputProcessor.outputProcessor();


function messageValidator(){

	this.protocolManager = function(connection, data, clientType){
		//convertiremos los parámetros del cliente en un objeto clientObject
		var clientObject = new Object();
		clientObject.connection = connection;
		clientObject.data = data;
		clientObject.clientType = clientType;

		switch(data.command){
			//eliminar TEST en la producción final
			case "TEST":
				console.log("TEST");
				testComponent.testFunction("adolfo");
				break;
			case "PROBE": console.log("PROBE");
				/*
				Si
					1. El comando está bien escrito
				*/
				api.probe(clientObject).then(outputProcessor.buildResponse).then(messageSender.sendMessage).done(console.log);
			break;
			case "PROTOCOL": console.log("PROTOCOL");
				api.protocol(clientObject);
			break;
			case "PROTO_USE_OK": console.log("PROTO_USE_OK");
				api.proto_use_ok(clientObject);
			break;
			case "REGISTER": console.log("REGISTER");
				api.register(clientObject);								
			break;
			case "REG_SUCESS": console.log("REG_SUCESS");
				api.reg_sucess(clientObject);
			break;
			case "SESSION_START": console.log("SESSION_START");
				api.session_start(clientObject);
			break;
			case "ACCEPT": console.log("ACCEPT");
				api.accept(clientObject);
			break;
			case "SESSION_QUIT": console.log("SESSION_QUIT");
				api.session_quit(clientObject);
			break;
			case "STATS_QUERY": console.log("STATS_QUERY");
				api.stats_query(clientObject);
			break;
			case "MATCH_REQ_INFO": console.log("MATCH_REQ_INFO");
				api.match_req_info(clientObject);
			break;
			case "MATCH_LOOKUP": console.log("MATCH_LOOKUP");
				api.match_lookup(clientObject);
			break;
			case "MATCH_LOOKUP_CANCEL": console.log("MATCH_LOOKUP_CANCEL");
				api.match_lookup_cancel(clientObject);
			break;
			case "MATCH_READY": console.log("MATCH_READY");
				api.match_ready(clientObject);
			break;
			case "MATCH_REJECT": console.log("MATCH_REJECT");
				api.match_reject(clientObject);
			break;
			case "ROUND_START_ACK": console.log("ROUND_START_ACK");
				api.round_start_ack(clientObject);
			break;
			case "TURN_END": console.log("TURN_END");
				api.turn_end(clientObject);
			break;
			case "TURN_QUERY": console.log("TURN_QUERY");
				api.turn_query(clientObject);
			break;
			case "CLOCK_REQ": console.log("CLOCK_REQ");
				api.clock_req(clientObject);
			break;
			case "BOARD_CHECK": console.log("BOARD_CHECK");
				api.board_check(clientObject);
			break;
			case "BOARD_REQ": console.log("BOARD_REQ");
				api.board_req(clientObject);
			break;
			case "PASS": console.log("PASS");
				api.pass(clientObject);
			break;
			case "RETIRE_ROUND": console.log("RETIRE_ROUND");
				api.retire_round(clientObject);
			break;
			case "RETIRE_MATCH": console.log("RETIRE_MATCH");
				api.retire_match(clientObject);
			break;
			case "PROJECTED_TIE": console.log("PROJECTED_TIE");
				api.projected_tie(clientObject);
			break;
			case "PROJECTED_TIE_DEACT": console.log("PROJECTED_TIE_DEACT");
				api.projected_tie_deact(clientObject);
			break;
			case "ERR_UNKNOWN_COMMAND": console.log("ERR_UNKNOWN_COMMAND");
				api.err_unknown_command(clientObject);
			break;
			case "ERR_ARGS": console.log("ERR_ARGS");
				api.err_args(clientObject);
			break;
			case "PANIC_QUIT": console.log("PANIC_QUIT");
				api.panic_quit(clientObject);
			break;
			case "WAIT": console.log("WAIT");
				api.wait(clientObject);
			break;
			case "RESUME": console.log("RESUME");
				api.resume(clientObject);
			break;
			case "PING": console.log("PING");
				api.ping(clientObject);
			break;
			case "PONG": console.log("PONG");
				api.pong(clientObject);
			break;
			default:
				console.log("Error: comando no reconocido: "+ data["command"]);
				//llamar al messageSender y enviar ERR_UNKNOWN_COMMAND

		}
	}
}	
/*VERIFICADORES VARIOS*/

function validateTest(clientObject){
	apiTest(a,b,c).then()
}













module.exports.messageValidator = messageValidator;