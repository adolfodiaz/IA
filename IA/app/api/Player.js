function Player(){
	this.clientName;
	this.clientType;
	this.id;
	this.connection;
	this.match = null;
	this.automataState;
	this.automataPreviousState = null;
	this.newPlayer = function(id, clientName, clientType, connection){
		this.id				= id;
		this.clientName 	= clientName;
		this.clientType 	= clientType;
		this.connection 	= connection;
		this.automataState = "init";
	}

	//actualiza el estado en el autómata para este jugador
	this.updateState=function(currentState,newState){
		this.automataState = newState;
		this.automataPreviousState = currentState;
	}

	//devuelve al estado anterior del autómata para este jugador
	//se utiliza al salir del estado de pausa
	this.revertState = function(){
		var tempState = this.automataState;
		this.automataState = automataPreviousState;
		automataPreviousState = tempState;
	}
}

module.exports.Player = Player;