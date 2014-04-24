var Player = require('./Player.js').Player;
var Rules = require('./Rules.js').Rules;
var Board = require('./Board.js').Board;

function Match(){
	this.name;
	this.Player1;
	this.Player2;
	this.rules;
	this.spectators = new Array();
	this.board;
	this.startTime;
	this.whoStarted;
	this.newMatch = function(name, player1){
		this.name = name;
		this.player1 = player1;
	}
}

module.exports.Match = Match;