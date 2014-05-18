function Rules(){

	this.board = new Object();
	//importante
	this.board.height = 8;
	this.board.width = 8;
	this.board.maxBoardReqs= 2; //cuántas veces el cliente puede pedir actualizaciones del tablero, 0 son infinitas veces
	this.time = new Object();
	this.time.timedTurn = true;//especifica si habrá turnos con duración limitada
	//importante
	this.time.turnDuration =  10; //cuánto dura cada turno, 0 es sin límite de tiempo
	this.time.immediateTurn = true; //forzar a las IA a no ocupar todo el tiempo del turno innecesariamente si tienen lista su jugada (jugar rápido)
	this.time.maxIdleTime = 600; //cuánto tiempo puede estar un jugador sin enviar un comando durante un juego si timedTurn es falso
	//importante
	this.time.maxRoundTime = 250;//importante      //tiempo total máximo de una ronda (partida)
	this.time.maxMatchTime = 20000;//tiempo total máximo del Match (suma de todas las partidas)
	

	this.time.remainingRoundTime = 200; //(duda)
	this.game = new Object();

	//importante
	this.game.roundsPerMatch = 2; //cuántas partidas se jugarán por Match
	this.game.noConnect3 = false; //si es TRUE, no puedes conectar 3 piezas seguidas (es un movimiento ilegal)
	this.game.tournament = false;//especifica si el Game Manager está en Modo Torneo (SIN USO)
	this.game.penalizeIllegalMoves = [5,-10];//especifica si pierdes puntaje por jugadas ilegales y cuánto (SIN USO?)
	this.game.illegalMoveLose = true;//si es TRUE, pierdes inmediatamente por hacer jugadas ilegales
	this.game.wrongPosLose = true;//si pierdes por intentar colocar fichas donde no puedes (sobre otras fichas, fuera del tablero)
	this.game.noPass = true;//si es TRUE, no puedes saltarte tu turno (pasar)
	this.game.maxPasses = 5;//si noPass es FALSE, cuántas veces puedes saltarte tu turno como máximo
	this.game.timeoutLose = true;//si puedes perder la partida por exceder el tiempo de turno
	this.game.timeoutsForLose = 3;//cuántas veces puedes exceder tu tiempo de turno antes de perder la partida

	//Match Efficiency Limit: termina antes el Match si un jugador es demasiado bueno en comparación a otro
	this.matchEfficiencyLimit = new Object();
	this.matchEfficiencyLimit.enabled = true;//si el Match termina antes de lo especificado por ser un jugador demasiado bueno con respecto a otro
	this.matchEfficiencyLimit.minRounds = 10;//cuántas rondas mínimas deben jugarse antes de terminar el Match
	this.matchEfficiencyLimit.efficiencyLimit  =0.75;//cuál es la relación victorias/total para el mejor jugador que hace que el Match termine	
}

module.exports.Rules = Rules;
