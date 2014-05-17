var Player = require('./Player.js').Player;
var Rules = require('./Rules.js').Rules;
var Board = require('./Board.js').Board;

function Match(){
	this.name;						// ID del match
	this.player1Name = null;		// Nombre que identifica al jugador
	this.player2Name = null;
	this.rules = new Rules();		// Reglas
	this.spectators = new Array();
	this.board = new Board();
	
	this.startTime = new Date();
	this.whoStarted;

	this.aceptaGamePlayer1 = false;
	this.aceptaGamePlayer2 = false;
	this.roundACKPlayer1 = false;
	this.roundACKPlayer2 = false;

	this.putPassOrRetirePLayer1 = true;
	this.putPassOrRetirePLayer2 = true;

	this.turnEnd = false;  
	this.MatchEnd;

	this.lastMovementTimePlayer1;
	this.lastMovementTimePlayer2;
	this.containerGametimeplayer1;
	this.containerGametimeplayer2;

	this.numberOfFinishRound = 0;

	this.newMatch = function(name, player1Name){
		this.name = name;
		this.player1Name = player1Name;
	}
}

module.exports.Match = Match;