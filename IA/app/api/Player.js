function Player(){
	this.clientName;
	this.clientType;
	this.id;
	this.connection;
	this.match = null;
	this.newPlayer = function(id, clientName, clientType, connection){
		this.id				= id;
		this.clientName 	= clientName;
		this.clientType 	= clientType;
		this.connection 	= connection;
	}
}

module.exports.Player = Player;