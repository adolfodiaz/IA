function Rules(){
	this.board = new Object();
	this.board.height = 8;
	this.board.width = 8;
	this.board.maxBoardReqs= 2;
	this.time = new Object();
	this.time.timedTurn = true;
	this.time.turnDuration =  60;
	this.time.immediateTurn = true;
	this.time.maxIdleTime = 600;
	this.time.maxRoundTime = 1200;
	this.time.maxMatchTime = 20000;
	this.game = new Object();
	this.game.roundsPerMatch = 200;
	this.game.noConnect3 = false;
	this.game.tournament = false;
	this.game.penalizeIllegalMoves = [5,-10];
	this.game.illegalMoveLose = true;
	this.game.wrongPosLose = true;
	this.game.noPass = true;
	this.game.maxPasses = 5;
	this.game.timeoutLose = true;
	this.game.timeoutsForLose = 3;
	this.matchEficiencyLimit = new Object();
	this.matchEficiencyLimit.enabled = true;
	this.matchEficiencyLimit.minRounds = 10;
	this.matchEficiencyLimit.efficiencyLimit  =0.75;
}

module.exports.Rules = Rules;
