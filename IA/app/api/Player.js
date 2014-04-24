function Player(){
	this.clientName;
	this.connectionMethod;
	this.id;
	this.connection;
	this.Match = null;
	this.newPlayer = function(clientName, connectionMethod, connection){
		this.clientName 		= clientName;
		this.connectionMethod 	= connectionMethod;
		this.connection 		= connection;
	}
}

module.exports.Player = Player;