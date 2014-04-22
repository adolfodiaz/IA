var Round = require('./Round.js').Round;
var Rules = require('./Rules.js').Rules;
var Board = require('./Board.js').Board;
var Player = require('./Player.js').Player;
var Match = require('./Match.js').Match;

function api(){
	this.onlineUsersList = new Object();
	this.roundsList = new Object();	
	this.matchesList = new Object();

	this.messageFromSocket = function(connection, data){
		try{
			var data = JSON.parse(data);
			this.protocolManager(connection, data, "HUMAN");
		}catch(error){
			this.protocolManager(connection, error, "HUMAN");
		}		
	}

	this.messageFromNet = function(connection, data){	
		while(data[0]!=123&&data.length>0&&data[1]!=34){
			data = data.slice(1,data.length);
		}
		try{
			var data = JSON.parse(data);
			this.protocolManager(connection, data, "AI");
		}catch(error){
			this.protocolManager(connection, error, "AI");
		}
	}	

	this.register = function(connection, data, clientType){
		if(!(typeof this.onlineUsersList[data.arguments.clientName]=="undefined")){//faltan validaciones
			var response = new Object();
			response.command = "REG_FAIL";
			response.arguments = new Object();
			response.arguments.GM_FULL = "false";//no aplica
			response.arguments.NICK_IN_USE = "true";
			response.arguments.TYPE = "true";//no aplica
			response.arguments.NICK = "false";//no aplica
			response.arguments.OTHER = "false";//no aplica

			this.sendMessage(connection, clientType, response);			
		}else{
			
			var player = new Player();
			player.constructor(connection, data);
			this.onlineUsersList[player.clientName] = player;

			var response = new Object();
			response.command = "REG_SUCESS";
			response.arguments = new Object();
			response.arguments.clientName = data[player.clientName];
			response.arguments.id = "#########";
			response.arguments.policies = new Object();
			response.arguments.policies.MAX_ABS_IDLE_TIME = "0";

			this.sendMessage(connection, clientType, response);
		}			
	}

	this.sendMessage = function(connection, clientType, message){
		if(clientType=="AI"){			
			connection.write(JSON.stringify(message)+"\n");
		}else{
			connection.emit(JSON.stringify(message)+"\n");
		}
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
				this.register(connection, data, clientType);								
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

module.exports.api = api;