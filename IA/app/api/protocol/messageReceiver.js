var MessageValidator = require('./messageValidator.js');
var messageValidator = new MessageValidator.messageValidator();

function messageReceiver(){	
	this.messageFromSocket = function(connection, data){
		try{
			var data = JSON.parse(data);
			messageValidator.protocolManager(connection, data, "BROWSER");
		}catch(error){
			messageValidator.protocolManager(connection, error, "BROWSER");
		}		
	}

	this.messageFromNet = function(connection, data){	
		console.log(data);
		while(data[0]!=123&&data.length>0&&data[1]!=34){
			data = data.slice(1,data.length);
		}
		try{
			var data = JSON.parse(data);
			messageValidator.protocolManager(connection, data, "NET");
		}catch(error){
			messageValidator.protocolManager(connection, error, "NET");
		}
	}
}
module.exports.messageReceiver = messageReceiver;