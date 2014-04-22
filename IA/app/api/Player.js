function Player(){
	this.clientName;
	this.clientType;
	this.constructor = function(object){
		this.clientName = object.arguments.clientName;
		this.clientType = object.arguments.clientType;
	}
}

module.exports.Player = Player;