function Player(){
	this.clientName;//nombre de usuario
	this.clientType;//Medio de comunicación: NET o BROWSER
	this.id;//Token de conexión?
	this.connection;
	this.match = null;
	this.PlayerClass;//AI o Humano
	this.automataState;
	this.automataPreviousState = null;
	this.sessionStarted = false;

	//Estadísticas del jugador
	this.stats = new Object();
	this.stats.globalEfficiency; //Equivale a Victorias/Rondas jugadas
	this.stats.globalPerformanceFactor; //Factor de performance (ELO o fórmula propia)
	this.stats.globalUsedTimeRatio; //Qué tan rápido es este jugador frente al resto (0.5: promedio, más cerca de 0: más rápido que el resto, más cerca de 1: más lento que el resto)
	this.stats.globalScore; //puntaje global acumulado (si hubiera)
	this.stats.roundsPlayed; //rondas jugadas totales
	this.stats.roundsWon; //rondas ganadas totales
	this.stats.matchesPlayed; //Matches jugados totales
	this.stats.matchesWon; //Matches ganados totales
	this.stats.matchEfficiency; //Matches ganados divididos por Matches jugados
	this.stats.tournamentsPlayed; //Torneos jugados
	this.stats.tournamentsWon; //Torneos ganados
	this.stats.totalScore; //Puntaje acumulado sólo durante torneos

	//TEMPORAL para setear estadísticas, debe cambiarse por la carga de datos desde la BD
	this.stats.globalEfficiency="0.75";
	this.stats.globalPerformanceFactor="0.6";
	this.stats.globalUsedTimeRatio="0.3";
	this.stats.globalScore="22500";
	this.stats.roundsPlayed="700";
	this.stats.roundsWon="518";
	this.stats.matchesPlayed="14";
	this.stats.matchesWon="7";
	this.stats.matchEfficiency="0.5";
	this.stats.tournamentsPlayed="0";
	this.stats.tournamentsWon="0";
	this.stats.totalScore="0";

	this.newPlayer = function(id, clientName, clientType, connection){
		this.id				= id;
		this.clientName 	= clientName;
		this.clientType 	= clientType;
		this.connection 	= connection;
		this.automataState = "register";
	}
	//actualiza el estado en el autómata para este jugador
	this.updateState=function(newState){
		this.automataPreviousState = automataState;
		this.automataState = newState;
		console.log("Estado actualizado para Jugador "+clientName+": "+automataPreviousState+"->"+automataState);
	}

	//devuelve al estado anterior del autómata para este jugador
	//se utiliza al salir del estado de pausa
	this.revertState = function(){
		var tempState = automataState;
		this.automataState = automataPreviousState;
		automataPreviousState = tempState;
	}
}

module.exports.Player = Player;