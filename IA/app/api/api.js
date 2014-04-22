var Round = require('./Round.js').Round;
var Rules = require('./Rules.js').Rules;
var Board = require('./Board.js').Board;
var Player = require('./Player.js').Player;
var Match = require('./Match.js').Match;

function api(){
	this.onlineUsersList = new Object();
	this.roundsList = new Object();	
	this.matchesList = new Object();

	this.getListRoundsAndMatchesList = function(showTemplate){
		showTemplate(JSON.stringify(this.onlineUsersList));
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