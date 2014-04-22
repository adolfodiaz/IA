var Player = require('./Player.js');

function Round(){
	this.Player1 = new Player();
	this.Player2 = new Player();
	this.rules = new Rules();
	this.spectators = new Array();
	this.board = new Board();
	this.startTime;
	this.whoStarted;
}