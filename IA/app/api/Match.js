var Player = require('./Player.js').Player;
var Rules = require('./Rules.js').Rules;
var Board = require('./Board.js').Board;

function Match(){
	this.name;
	this.player1Name = null;
	this.player2Name = null;
	this.rules = new Rules();
	this.spectators = new Array();
	this.board = new Board();
	
	this.startTime;
	this.whoStarted;

	this.aceptaGamePlayer1 = false;
	this.aceptaGamePlayer2 = false;
	
	this.newMatch = function(name, player1Name){
		this.name = name;
		this.player1Name = player1Name;
	}
}

module.exports.Match = Match;