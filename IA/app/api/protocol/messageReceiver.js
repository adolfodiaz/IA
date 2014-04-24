var MessageValidator = require('./messageValidator.js');
var messageValidator = new MessageValidator.messageValidator();
var TestComponent = require('./TestComponent.js');
var testComponent = new TestComponent.testComponent();

function messageReceiver(){	
	this.messageFromSocket = function(connection, data){ //mensaje desde el navegador
		try{
			var data = JSON.parse(data);
			messageValidator.protocolManager(connection, data, "BROWSER");
		}catch(error){
			messageValidator.protocolManager(connection, error, "BROWSER");
		}		
	}

	this.messageFromNet = function(connection, data){	//mensaje desde aplicaciones conectadas a través de un socket
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