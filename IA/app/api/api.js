var Round = require('./Round.js').Round;
var Rules = require('./Rules.js').Rules;
var Board = require('./Board.js').Board;
var Player = require('./Player.js').Player;
var Match = require('./Match.js').Match;
var crypto = require('crypto');
var DB = require('./db/DB.js').DB;
var Q = require('q');



db = new DB();
onlineUsersList = new Object();
listIdAndUserName = new Object();

function api(){
	
	this.matchesList = new Object();	

	var mentira = new Match();
	mentira.name="partida1";
	this.matchesList.partida1 = mentira;
	var mentira = new Match();
	mentira.name="partida2";
	this.matchesList.partida2 = mentira;

	var mentira2 = new Match();
	mentira2.name="mach1";
	this.matchesList.mach1 = mentira2;
	var mentira2 = new Match();
	mentira2.name="mach2";
	this.matchesList.mach2 = mentira2;

	this.signUp = function(name){
		var date = new Date();
		var player = new Player();
		var md5 = crypto.createHash('md5');
		md5.update((date.toString()+"puyehue"), "utf8");
		player.id = name+md5.digest("hex");
		db.saludar(function(){
			console.log("hola mundo");
		});
		onlineUsersList[name] = player.id;
		listIdAndUserName[player.id] = name;
	}

	this.getListRoundsAndMatchesList = function(req, showTemplate){		
		var funcionAplazada = Q.defer();

		var list = new Array();
		for(var round in this.roundsList){
			list.push(this.roundsList[round]);
		}
		for(var match in this.matchesList){
			list.push(this.matchesList[match]);
		}
		showTemplate(onlineUsersList[req.user.fullname], Array.prototype.slice.call(list));

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}

	this.prueba = function(){
		return "prueba";
	}

	this.probe = function(OC){
		var funcionAplazada = Q.defer();
		console.log("probe");
		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.protocol = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.proto_use_ok = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.register = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.reg_sucess = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}

	this.session_start = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}

	this.accept = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}

	this.session_quit = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}

	this.stats_query = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}

	this.match_req_info = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}

	this.match_lookup = function(OC){
		var funcionAplazada = Q.defer();

		if(typeof this.matchesList[OC.data.arguments.matchName] === "undefined"){
			//crea la partida y no envia nada al jugador
			var player1 = new Player();
			player1.newPlayer(OC.data.arguments.matchName, clientType, connection);
			this.matchesList[OC.data.arguments.matchName] = new Match();
			this.matchesList[OC.data.arguments.matchName].newMatch(OC.data.arguments.matchName, listIdAndUserName[OC.data.arguments.id]);
		}else{

		}
		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}

	this.match_lookup_cancel = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.match_ready = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.match_reject = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.round_start_ack = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.turn_end = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.turn_query = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.clock_req = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.board_check = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.board_req = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.pass = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.retire_round = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.retire_match = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.projected_tie = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.projected_tie_deact = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.err_unknown_command = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.err_args = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.panic_quit = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.wait = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.resume = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.ping = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}
	this.pong = function(OC){
		var funcionAplazada = Q.defer();

		funcionAplazada.resolve(OC, "");
		return funcionAplazada.promise;
	}




}

module.exports.api = api;