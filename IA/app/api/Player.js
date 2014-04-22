function Player(){
	this.clientName;
	this.clientType;
	this.constructor = function(connection, object){
		this.clientName = object.arguments.clientName;
		this.clientType = object.arguments.clientType;
		this.connection = connection;
	}
}

module.exports.Player = Player;