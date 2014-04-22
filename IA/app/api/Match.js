var Player = require('./Player.js').Player;
var Rules = require('./Rules.js').Rules;
var Board = require('./Board.js').Board;

function Match(){
	this.name;
	this.Player1 = new Player();
	this.Player2 = new Player();
	this.rules = new Rules();
	this.spectators = new Array();
	this.board = new Board();
	this.startTime;
	this.whoStarted;
}

module.exports.Match = Match;