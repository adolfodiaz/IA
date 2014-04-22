var MessageSender = require('./messageSender.js');
var messageSender = new MessageSender.messageSender();
var Api = require('./../api.js');
api = new Api.api();



function messageValidator(){

	this.onlineUsersList = new Object();

	this.validateRegister = function(connection, data, clientType){

		/*
		if(typeof(data.arguments.clientName)=="undefined"||typeof(data.arguments.clientType)=="undefined"||typeof(data.arguments.clientPass)=="undefined"){
			var response = new Object();
			response.command = "REG_FAIL";
			response.arguments = new Object();
			response.arguments.GM_FULL = "false";//no aplica
			response.arguments.NICK_IN_USE = "true";
			typeof(data.arguments.clientName=="undefined") ? response.arguments.TYPE = true : response.arguments.TYPE = false;
			typeof(data.arguments.clientType=="undefined") ? response.arguments.NICK = true : response.arguments.NICK = false;
			typeof(data.arguments.clientPass=="undefined") ? response.arguments.PASS = true : response.arguments.PASS = false;
			response.arguments.OTHER = "false";//no aplica
			messageSender.sendMessage(connection, clientType, response);
		}else if(api.isPlayerConnected(data.arguments.clientName)){
			//usuario ya conectado
		}else{

		}*/
		var response = new Object();
		response.command = "REG_FAIL";
		response.arguments = new Object();
		response.arguments.GM_FULL = "false";//no aplica
		response.arguments.NICK_IN_USE = "true";
		api.response(connection, data, clientType, messageSender.sendMessage);





		
	}



	this.protocolManager = function(connection, data, clientType){
		switch(data.command){
			case "PROBE": console.log("PROBE");
				/*
				Si
					1. El comando está bien escrito
				*/
				api.probe(connection, data, clientType, messageSender.sendMessage);
			break;
			case "PROTOCOL": console.log("PROTOCOL");
				api.protocol(connection, data, clientType, messageSender.sendMessage);
			break;
			case "PROTO_USE_OK": console.log("PROTO_USE_OK");
				api.proto_use_ok(connection, data, clientType, messageSender.sendMessage);
			break;
			case "REGISTER": console.log("REGISTER");
				api.register(connection, data, clientType, messageSender.sendMessage);								
			break;
			case "REG_SUCESS": console.log("REG_SUCESS");
				api.reg_sucess(connection, data, clientType, messageSender.sendMessage);
			break;
			case "SESSION_START": console.log("SESSION_START");
				api.session_start(connection, data, clientType, messageSender.sendMessage);
			break;
			case "ACCEPT": console.log("ACCEPT");
				api.accept(connection, data, clientType, messageSender.sendMessage);
			break;
			case "SESSION_QUIT": console.log("SESSION_QUIT");
				api.session_quit(connection, data, clientType, messageSender.sendMessage);
			break;
			case "STATS_QUERY": console.log("STATS_QUERY");
				api.stats_query(connection, data, clientType, messageSender.sendMessage);
			break;
			case "MATCH_REQ_INFO": console.log("MATCH_REQ_INFO");
				api.match_req_info(connection, data, clientType, messageSender.sendMessage);
			break;
			case "MATCH_LOOKUP": console.log("MATCH_LOOKUP");
				api.match_lookup(connection, data, clientType, messageSender.sendMessage);
			break;
			case "MATCH_LOOKUP_CANCEL": console.log("MATCH_LOOKUP_CANCEL");
				api.match_lookup_cancel(connection, data, clientType, messageSender.sendMessage);
			break;
			case "MATCH_READY": console.log("MATCH_READY");
				api.match_ready(connection, data, clientType, messageSender.sendMessage);
			break;
			case "MATCH_REJECT": console.log("MATCH_REJECT");
				api.match_reject(connection, data, clientType, messageSender.sendMessage);
			break;
			case "ROUND_START_ACK": console.log("ROUND_START_ACK");
				api.round_start_ack(connection, data, clientType, messageSender.sendMessage);
			break;
			case "TURN_END": console.log("TURN_END");
				api.turn_end(connection, data, clientType, messageSender.sendMessage);
			break;
			case "TURN_QUERY": console.log("TURN_QUERY");
				api.turn_query(connection, data, clientType, messageSender.sendMessage);
			break;
			case "CLOCK_REQ": console.log("CLOCK_REQ");
				api.clock_req(connection, data, clientType, messageSender.sendMessage);
			break;
			case "BOARD_CHECK": console.log("BOARD_CHECK");
				api.board_check(connection, data, clientType, messageSender.sendMessage);
			break;
			case "BOARD_REQ": console.log("BOARD_REQ");
				api.board_req(connection, data, clientType, messageSender.sendMessage);
			break;
			case "PASS": console.log("PASS");
				api.pass(connection, data, clientType, messageSender.sendMessage);
			break;
			case "RETIRE_ROUND": console.log("RETIRE_ROUND");
				api.retire_round(connection, data, clientType, messageSender.sendMessage);
			break;
			case "RETIRE_MATCH": console.log("RETIRE_MATCH");
				api.retire_match(connection, data, clientType, messageSender.sendMessage);
			break;
			case "PROJECTED_TIE": console.log("PROJECTED_TIE");
				api.projected_tie(connection, data, clientType, messageSender.sendMessage);
			break;
			case "PROJECTED_TIE_DEACT": console.log("PROJECTED_TIE_DEACT");
				api.projected_tie_deact(connection, data, clientType, messageSender.sendMessage);
			break;
			case "ERR_UNKNOWN_COMMAND": console.log("ERR_UNKNOWN_COMMAND");
				api.err_unknown_command(connection, data, clientType, messageSender.sendMessage);
			break;
			case "ERR_ARGS": console.log("ERR_ARGS");
				api.err_args(connection, data, clientType, messageSender.sendMessage);
			break;
			case "PANIC_QUIT": console.log("PANIC_QUIT");
				api.panic_quit(connection, data, clientType, messageSender.sendMessage);
			break;
			case "WAIT": console.log("WAIT");
				api.wait(connection, data, clientType, messageSender.sendMessage);
			break;
			case "RESUME": console.log("RESUME");
				api.resume(connection, data, clientType, messageSender.sendMessage);
			break;
			case "PING": console.log("PING");
				api.ping(connection, data, clientType, messageSender.sendMessage);
			break;
			case "PONG": console.log("PONG");
				api.pong(connection, data, clientType, messageSender.sendMessage);
			break;
			default:
				console.log("Error: comando no reconocido: "+ data["command"]);
				//llamar al messageSender y enviar ERR_UNKNOWN_COMMAND

		}
	}
}	

module.exports.messageValidator = messageValidator;