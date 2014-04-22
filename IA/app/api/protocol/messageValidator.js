var MessageSender = require('./messageSender.js');
var messageSender = new MessageSender.messageSender();
var Api = require('./../api.js');
var api = new Api.api();

function messageValidator(){

	this.onlineUsersList = new Object();

	this.validateRegister = function(connection, data, clientType){
		console.log(data.arguments.clientName);


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

		}
			
			messageSender.sendMessage(connection, clientType, new Object());
	}



	this.protocolManager = function(connection, data, clientType){
		switch(data.command){
			case "PROBE": console.log("PROBE");
			break;
			case "PROTOCOL": console.log("PROTOCOL");
			break;
			case "PROTO_USE_OK": console.log("PROTO_USE_OK");
			break;
			case "REGISTER": console.log("REGISTER");
				this.validateRegister(connection, data, clientType);								
			break;
			case "REG_SUCESS": console.log("REG_SUCESS");
			break;
			case "SESSION_START": console.log("SESSION_START");
			break;
			case "ACCEPT": console.log("ACCEPT");
			break;
			case "SESSION_QUIT": console.log("SESSION_QUIT");
			break;
			case "STATS_QUERY": console.log("STATS_QUERY");
			break;
			case "MATCH_REQ_INFO": console.log("MATCH_REQ_INFO");
			break;
			case "MATCH_LOOKUP": console.log("MATCH_LOOKUP");
			break;
			case "MATCH_LOOKUP_CANCEL": console.log("MATCH_LOOKUP_CANCEL");
			break;
			case "MATCH_READY": console.log("MATCH_READY");
			break;
			case "MATCH_REJECT": console.log("MATCH_REJECT");
			break;
			case "ROUND_START_ACK": console.log("ROUND_START_ACK");
			break;
			case "TURN_END": console.log("TURN_END");
			break;
			case "TURN_QUERY": console.log("TURN_QUERY");
			break;
			case "CLOCK_REQ": console.log("CLOCK_REQ");
			break;
			case "BOARD_CHECK": console.log("BOARD_CHECK");
			break;
			case "BOARD_REQ": console.log("BOARD_REQ");
			break;
			case "PASS": console.log("PASS");
			break;
			case "RETIRE_ROUND": console.log("RETIRE_ROUND");
			break;
			case "RETIRE_MATCH": console.log("RETIRE_MATCH");
			break;
			case "PROJECTED_TIE": console.log("PROJECTED_TIE");
			break;
			case "PROJECTED_TIE_DEACT": console.log("PROJECTED_TIE_DEACT");
			break;
			case "ERR_UNKNOWN_COMMAND": console.log("ERR_UNKNOWN_COMMAND");
			break;
			case "ERR_ARGS": console.log("ERR_ARGS");
			break;
			case "PANIC_QUIT": console.log("PANIC_QUIT");
			break;
			case "WAIT": console.log("WAIT");
			break;
			case "RESUME": console.log("RESUME");
			break;
			case "PING": console.log("PING");
			break;
			case "PONG": console.log("PONG");
			break;
			default: console.log("Error: comando no reconocido: "+ data["command"]);			
		}
	}
}	

module.exports.messageValidator = messageValidator;