var Round = require('./Round.js').Round;
var Rules = require('./Rules.js').Rules;
var Board = require('./Board.js').Board;
var Player = require('./Player.js').Player;
var Match = require('./Match.js').Match;

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
	var mentira = new Match();
	mentira.name="partida3";
	this.roundsList.partida3 = mentira;
	var mentira = new Match();
	mentira.name="partida4";
	this.roundsList.partida4 = mentira;

	var mentira2 = new Match();
	mentira2.name="mach1";
	this.roundsList.mach1 = mentira2;
	var mentira2 = new Match();
	mentira2.name="mach2";
	this.roundsList.mach2 = mentira2;
	var mentira2 = new Match();
	mentira2.name="mach3";
	this.roundsList.mach3 = mentira2;
	var mentira2 = new Match();
	mentira2.name="mach4";	
	this.roundsList.mach4 = mentira2;

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
}

module.exports.api = api;