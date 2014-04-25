function Player(){
	this.clientName;//nombre de usuario
	this.clientType;//Medio de comunicación: NET o BROWSER
	this.id;//Token de conexión?
	this.connection;
	this.match = null;
	this.PlayerClass;//AI o Humano
	this.automataState;
	this.automataPreviousState = null;
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