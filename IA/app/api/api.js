var Round = require('./Round.js').Round;
var Rules = require('./Rules.js').Rules;
var Board = require('./Board.js').Board;
var Player = require('./Player.js').Player;
var Match = require('./Match.js').Match;
var crypto = require('crypto');
var DB = require('./db/DB.js').DB;
db = new DB();
function api(){
	this.onlineUsersList = new Object();
	this.roundsList = new Object();	
	this.matchesList = new Object();	

	var mentira = new Match();
	mentira.name="partida1";
	this.roundsList.partida1 = mentira;
	var mentira = new Match();
	mentira.name="partida2";
	this.roundsList.partida2 = mentira;

	var mentira2 = new Match();
	mentira2.name="mach1";
	this.roundsList.mach1 = mentira2;
	var mentira2 = new Match();
	mentira2.name="mach2";
	this.roundsList.mach2 = mentira2;

	this.signUp = function(name){
		var date = new Date();
		var player = new Player();
		var md5 = crypto.createHash('md5');
		md5.update((date.toString()+"puyehue"), "utf8");
		player.session = md5.digest("hex");
		this.onlineUsersList[name] = player.session;
		db.saludar(function(){
			console.log("hola mundo");
		});
	}

	this.getListRoundsAndMatchesList = function(showTemplate){
		var list = new Array();
		for(var round in this.roundsList){
			list.push(this.roundsList[round]);
		}
		for(var match in this.matchesList){
			list.push(this.matchesList[match]);
		}
		showTemplate(Array.prototype.slice.call(list));
	}

	this.response = function(connection, data, clientType, response, sendMessage){
		this.onlineUsersList[data.arguments.clientName] = data.arguments.clientName;
		sendMessage(connection, clientType, response);
	}
	this.prueba = function(){
		return "prueba";
	}

	this.probe = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.protocol = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.proto_use_ok = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.register = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.reg_sucess = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.session_start = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.accept = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.session_quit = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.stats_query = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.match_req_info = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.match_lookup = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.match_lookup_cancel = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.match_ready = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.match_reject = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.round_start_ack = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.turn_end = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.turn_query = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.clock_req = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.board_check = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.board_req = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.pass = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.retire_round = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.retire_match = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.projected_tie = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.projected_tie_deact = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.err_unknown_command = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.err_args = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.panic_quit = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.wait = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.resume = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.ping = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}
	this.pong = function(connection, data, clientType, sendMessage){
		sendMessage(connection, clientType, response);
	}







}

module.exports.api = api;