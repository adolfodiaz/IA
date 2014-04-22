var Player = require('./Player.js').Player;

function Match(){
	this.Player1 = new Player();
	this.Player2 = new Player();
	this.rule = new Rule();
	this.spectators = new Array();
	this.board = new Board();
	this.startTime;
	this.whoStarted;
}